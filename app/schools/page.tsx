import { db } from "@/lib/db/drizzle";
import { schools } from "@/lib/db/schema";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

// Server-side dynamic query settings
export const dynamic = "force-dynamic";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

const Label = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[#A51C30] text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
    style={{ fontFamily: SANS }}
  >
    {children}
  </p>
);

export default async function SchoolDirectoryPage() {
  let fetchedSchools: any[] = [];

  try {
    // Querying active schools from your Supabase connected instance
    fetchedSchools = await db
      .select({
        id: schools.id,
        name: schools.name,
        slug: schools.slug,
        city: schools.city,
      })
      .from(schools);
  } catch (error) {
    console.error("Database fetch fallback:", error);
    // Graceful placeholder data if table migrations are running
    fetchedSchools = [];
  }

  return (
    <div className="bg-[#F8F6F2] min-h-screen text-[#1A1A1A]">
      {/* ── Fixed Header ─────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#E2DDD7]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[56px]">
          <Link href="/" className="flex items-baseline gap-0.5 select-none">
            <span
              style={{ fontFamily: SERIF }}
              className="font-bold text-[17px] text-[#A51C30] tracking-tight"
            >
              Dura
            </span>
            <span
              style={{ fontFamily: SERIF }}
              className="font-normal text-[17px] text-[#1A1A1A]"
            >
              Schools
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-[13px] text-[#716860] hover:text-[#1A1A1A] transition-colors"
              style={{ fontFamily: SANS }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Directory Section ────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 pt-[120px] pb-24">
        <div className="max-w-2xl mb-16">
          <Label>Public Directory</Label>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
            className="font-bold mb-6 text-[#1A1A1A]"
          >
            Explore Partner Institutions.
          </h1>
          <p
            className="text-[#716860] text-[15px] leading-relaxed"
            style={{ fontFamily: SANS }}
          >
            Select an active school from our dynamic ecosystem to view its
            custom portal, track operational frameworks, or submit immediate
            student admissions documentation.
          </p>
        </div>

        {/* Directory Card Grid */}
        {fetchedSchools.length === 0 ? (
          <div className="bg-white border border-[#E2DDD7] p-12 text-center rounded-[2px]">
            <p
              className="text-[#716860] text-[14px]"
              style={{ fontFamily: SANS }}
            >
              No partner institutions found in the database. Add entries to the
              schools table to see them live.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2DDD7] border border-[#E2DDD7]">
            {fetchedSchools.map((school) => (
              <div
                key={school.id}
                className="bg-white p-8 flex flex-col justify-between hover:bg-[#F8F6F2] transition-colors min-h-[220px]"
              >
                <div>
                  <div
                    className="flex items-center gap-1.5 text-[#A51C30] text-[11px] font-semibold tracking-wider uppercase mb-4"
                    style={{ fontFamily: SANS }}
                  >
                    <MapPin className="h-3.5 w-3.5 stroke-[1.5]" />
                    {school.city || "Ethiopia Network"}
                  </div>
                  <h3
                    className="font-bold text-[20px] tracking-tight text-[#1A1A1A] mb-2"
                    style={{ fontFamily: SERIF, lineHeight: 1.2 }}
                  >
                    {school.name}
                  </h3>
                  <p
                    className="text-[#9A8F87] text-[12px]"
                    style={{ fontFamily: SANS }}
                  >
                    slug: {school.slug}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E2DDD7]/60 flex items-center justify-between">
                  <Link
                    href={`/schools/${school.slug}`}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1A1A1A] hover:text-[#A51C30] transition-colors"
                    style={{ fontFamily: SANS }}
                  >
                    Enter Portal <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/schools/${school.slug}/apply`}
                    className="text-[12px] font-medium border border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-white px-3 py-1.5 transition-colors"
                    style={{ fontFamily: SANS, borderRadius: "2px" }}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
