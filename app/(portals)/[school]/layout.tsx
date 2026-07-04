import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BedDouble,
  LogOut,
} from "lucide-react";
import { getUserWithSchool } from "@/lib/db/queries";
import { signOut } from "@/app/(login)/actions";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

// Which URL segment each role is allowed to land on, if we need to redirect them.
const ROLE_SEGMENT: Record<string, string> = {
  school_admin: "dashboard",
  teacher: "teacher",
  parent: "parent",
  student: "student",
};

// Sidebar links per role. Extend these as we build out each portal.
const NAV_ITEMS: Record<string, { label: string; href: string; icon: any }[]> =
  {
    school_admin: [
      { label: "Overview", href: "dashboard", icon: LayoutDashboard },
      { label: "Students", href: "dashboard/students", icon: Users },
      { label: "Applications", href: "dashboard/applications", icon: BookOpen },
      { label: "Boarding", href: "boarding", icon: BedDouble },
    ],
    teacher: [
      { label: "My Classes", href: "teacher", icon: BookOpen },
      { label: "Attendance", href: "teacher/attendance", icon: Users },
    ],
    parent: [{ label: "Overview", href: "parent", icon: LayoutDashboard }],
    student: [{ label: "Overview", href: "student", icon: LayoutDashboard }],
  };

export default async function SchoolPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ school: string }>;
}) {
  const { school: urlSlug } = await params;
  const result = await getUserWithSchool();

  // Not logged in at all.
  if (!result || !result.user) {
    redirect(`/sign-in?next=/${urlSlug}`);
  }

  const { school, schoolRole } = result;

  // Logged in, but no role has been assigned yet by a school admin.
  if (!schoolRole) {
    redirect("/pending-approval");
  }

  // Dura's own super admins may browse any school's portals freely.
  const isSuperAdmin = schoolRole === "super_admin";

  if (!isSuperAdmin) {
    if (!school) {
      redirect("/pending-approval");
    }
    // Wrong school in the URL — send them to their own.
    if (school!.slug !== urlSlug) {
      redirect(`/${school!.slug}/${ROLE_SEGMENT[schoolRole] ?? "dashboard"}`);
    }
  }

  const navItems = NAV_ITEMS[schoolRole] ?? [];

  return (
    <div className="min-h-screen flex bg-[#F8F6F2]">
      <aside className="w-64 bg-[#1A1A1A] flex flex-col flex-shrink-0">
        <div className="h-[56px] flex items-center px-6 border-b border-white/8">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span
              style={{ fontFamily: SERIF }}
              className="font-bold text-[16px] text-[#A51C30]"
            >
              Dura
            </span>
            <span
              style={{ fontFamily: SERIF }}
              className="font-normal text-[16px] text-white/80"
            >
              Schools
            </span>
          </Link>
        </div>

        <div className="px-6 py-5 border-b border-white/8">
          <p
            className="text-white text-[13px] font-semibold truncate"
            style={{ fontFamily: SANS }}
          >
            {school ? school.name : "All Schools"}
          </p>
          <p
            className="text-white/40 text-[11px] uppercase tracking-wide mt-1"
            style={{ fontFamily: SANS }}
          >
            {schoolRole.replace("_", " ")}
          </p>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={`/${urlSlug}/${href}`}
              className="flex items-center gap-3 px-6 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-[13px] transition-colors"
              style={{ fontFamily: SANS }}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>

        <form action={signOut} className="border-t border-white/8 p-4">
          <button
            className="flex items-center gap-3 text-white/50 hover:text-white text-[13px] transition-colors"
            style={{ fontFamily: SANS }}
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} /> Sign out
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
