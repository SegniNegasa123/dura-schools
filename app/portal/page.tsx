import { redirect } from "next/navigation";
import { getUserWithSchool } from "@/lib/db/queries";

// The universal "smart link" — every login redirects here, and this page
// figures out where that specific user actually belongs and sends them on.
const ROLE_SEGMENT: Record<string, string> = {
  school_admin: "dashboard",
  teacher: "teacher",
  parent: "parent",
  student: "student",
};

export default async function PortalHubPage() {
  const result = await getUserWithSchool();

  if (!result || !result.user) {
    redirect("/sign-in");
  }

  const { school, schoolRole } = result;

  if (!schoolRole) {
    redirect("/pending-approval");
  }

  if (schoolRole === "super_admin") {
    redirect("/admin");
  }

  if (!school) {
    redirect("/pending-approval");
  }

  const segment = ROLE_SEGMENT[schoolRole] ?? "dashboard";
  redirect(`/${school.slug}/${segment}`);
}
