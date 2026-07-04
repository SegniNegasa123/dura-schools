import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/session";

// Any URL whose second segment is one of these is a school-scoped portal page.
const PORTAL_SEGMENTS = [
  "dashboard",
  "teacher",
  "parent",
  "student",
  "boarding",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const segments = path.split("/").filter(Boolean);

  const isAdminRoute = segments[0] === "admin";
  const isSchoolPortalRoute =
    segments.length >= 2 && PORTAL_SEGMENTS.includes(segments[1]);
  const isPortalHub = path === "/portal";
  const isProtectedRoute = isAdminRoute || isSchoolPortalRoute || isPortalHub;

  // Public pages (homepage, /schools, /sign-in, application forms) pass straight through.
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("session")?.value;

  if (!sessionCookie) {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  // Verify the JWT is genuine and not expired. This only confirms "is this
  // a real, logged-in user" — it does NOT check role or school. That check
  // happens inside each portal's layout.tsx, where a real database query
  // to Postgres is possible (middleware's Edge runtime cannot do this safely).
  try {
    const session = await verifyToken(sessionCookie);
    if (new Date(session.expires) < new Date()) {
      throw new Error("Session expired");
    }
  } catch {
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.set("next", path);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete("session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
