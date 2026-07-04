import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { getUserWithSchool } from "@/lib/db/queries";
import { signOut } from "@/app/(login)/actions";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getUserWithSchool();

  if (!result || !result.user) {
    redirect("/sign-in?next=/admin");
  }

  if (result.schoolRole !== "super_admin") {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen flex bg-[#F8F6F2]">
      <aside className="w-64 bg-[#A51C30] flex flex-col flex-shrink-0">
        <div className="h-[56px] flex items-center px-6 border-b border-white/15">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span
              style={{ fontFamily: SERIF }}
              className="font-bold text-[16px] text-white"
            >
              Dura
            </span>
            <span
              style={{ fontFamily: SERIF }}
              className="font-normal text-[16px] text-white/70"
            >
              Admin
            </span>
          </Link>
        </div>
        <nav className="flex-1 py-4">
          <Link
            href="/admin"
            className="block px-6 py-2.5 text-white/85 hover:text-white hover:bg-white/10 text-[13px] transition-colors"
            style={{ fontFamily: SANS }}
          >
            All Schools
          </Link>
        </nav>
        <form action={signOut} className="border-t border-white/15 p-4">
          <button
            className="flex items-center gap-3 text-white/70 hover:text-white text-[13px] transition-colors"
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
