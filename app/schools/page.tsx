import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { MapPin, Search, ArrowRight, ArrowLeft } from "lucide-react";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

export const metadata = {
  title: "School Directory | Dura Schools",
  description:
    "Browse boarding and secondary schools using Dura Schools across Ethiopia.",
};

interface School {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  region: string | null;
  logo_url: string | null;
  about: string | null;
}

export default async function SchoolDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; region?: string }>;
}) {
  const { q, region } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("schools")
    .select("id, name, slug, city, region, logo_url, about")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }
  if (region) {
    query = query.eq("region", region);
  }

  const { data: schools, error } = await query;

  const { data: regionRows } = await supabase
    .from("schools")
    .select("region")
    .eq("is_active", true);

  const regions = Array.from(
    new Set((regionRows ?? []).map((r) => r.region).filter(Boolean)),
  ) as string[];

  const list: School[] = schools ?? [];

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen">
      {/* ── Header ─────────────────────────────────────── */}
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
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/schools"
              className="text-[13px] text-[#A51C30] font-semibold"
              style={{ fontFamily: SANS }}
            >
              Find a School
            </Link>
            <Link
              href="/#pricing"
              className="text-[13px] text-[#716860] hover:text-[#1A1A1A] transition-colors"
              style={{ fontFamily: SANS }}
            >
              For Schools
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-[13px] text-[#716860] hover:text-[#1A1A1A] transition-colors"
              style={{ fontFamily: SANS }}
            >
              Sign in
            </Link>
            <Link
              href="/#pricing"
              className="text-[13px] font-semibold bg-[#A51C30] hover:bg-[#8B1627] text-white px-4 py-2 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Request a demo
            </Link>
          </div>
        </div>
      </header>

      {/* ── Page Header ────────────────────────────────── */}
      <section className="bg-[#1A1A1A] pt-[56px]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p
            className="text-white/50 text-[11px] font-semibold tracking-[0.22em] uppercase mb-6"
            style={{ fontFamily: SANS }}
          >
            School directory
          </p>
          <h1
            className="text-white font-bold mb-6"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(32px, 4.5vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "620px",
            }}
          >
            Find a boarding or secondary school near you.
          </h1>
          <p
            className="text-white/60 text-[15px] leading-relaxed mb-10"
            style={{ fontFamily: SANS, maxWidth: "480px" }}
          >
            Every school listed here manages admissions digitally. Applying
            takes minutes, not a trip to the registrar's office.
          </p>

          {/* Search + region filter */}
          <form className="flex flex-col sm:flex-row gap-3" method="GET">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35" />
              <input
                type="text"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Search by school name"
                className="w-full bg-white/8 border border-white/15 focus:border-white/35 outline-none text-white placeholder:text-white/35 text-[14px] pl-11 pr-4 py-3 transition-colors"
                style={{ fontFamily: SANS, borderRadius: "2px" }}
              />
            </div>
            <select
              name="region"
              defaultValue={region ?? ""}
              className="bg-white/8 border border-white/15 text-white text-[14px] px-4 py-3 outline-none"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              <option value="" className="text-black">
                All regions
              </option>
              {regions.map((r) => (
                <option key={r} value={r} className="text-black">
                  {r}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-[#A51C30] hover:bg-[#8B1627] text-white text-[13px] font-semibold px-6 py-3 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────── */}
      <section className="bg-[#F8F6F2] py-16 md:py-20 min-h-[50vh]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <p
              className="text-[#716860] text-[13px]"
              style={{ fontFamily: SANS }}
            >
              {error
                ? "We could not load schools right now."
                : `${list.length} school${list.length === 1 ? "" : "s"} found`}
              {q && <span> for &ldquo;{q}&rdquo;</span>}
            </p>
            {(q || region) && (
              <Link
                href="/schools"
                className="text-[13px] text-[#A51C30] font-semibold hover:underline"
                style={{ fontFamily: SANS }}
              >
                Clear filters
              </Link>
            )}
          </div>

          {list.length === 0 && !error && (
            <div
              className="bg-white border border-[#E2DDD7] p-16 text-center"
              style={{ borderRadius: "2px" }}
            >
              <p
                className="text-[#1A1A1A] font-semibold text-[15px] mb-2"
                style={{ fontFamily: SANS }}
              >
                No schools match your search
              </p>
              <p
                className="text-[#716860] text-[13px] mb-6"
                style={{ fontFamily: SANS }}
              >
                Try a different name, or browse without a filter.
              </p>
              <Link
                href="/schools"
                className="inline-flex items-center gap-2 text-[#A51C30] text-[13px] font-semibold hover:underline"
                style={{ fontFamily: SANS }}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> View all schools
              </Link>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2DDD7]">
            {list.map((school) => (
              <Link
                key={school.id}
                href={`/schools/${school.slug}`}
                className="group bg-white hover:bg-[#FCFBF9] transition-colors p-8 flex flex-col"
              >
                <div
                  className="w-11 h-11 bg-[#A51C30]/8 flex items-center justify-center mb-6 text-[#A51C30] font-bold text-[15px]"
                  style={{ fontFamily: SERIF, borderRadius: "2px" }}
                >
                  {school.name.trim().charAt(0).toUpperCase()}
                </div>
                <h3
                  className="text-[#1A1A1A] font-bold text-[17px] mb-2 leading-snug"
                  style={{ fontFamily: SERIF }}
                >
                  {school.name}
                </h3>
                {(school.city || school.region) && (
                  <p
                    className="flex items-center gap-1.5 text-[#9A8F87] text-[12px] mb-4"
                    style={{ fontFamily: SANS }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {[school.city, school.region].filter(Boolean).join(", ")}
                  </p>
                )}
                {school.about && (
                  <p className="text-[#716860] text-[13px] leading-relaxed mb-6 line-clamp-3">
                    {school.about}
                  </p>
                )}
                <div
                  className="mt-auto pt-4 flex items-center gap-2 text-[#A51C30] text-[13px] font-semibold"
                  style={{ fontFamily: SANS }}
                >
                  View school{" "}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA strip ───────────────────────────── */}
      <section className="bg-white py-16 border-t border-[#E2DDD7]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-[#1A1A1A] font-semibold text-[15px]"
            style={{ fontFamily: SERIF }}
          >
            Is your school not listed yet?
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-[#A51C30] hover:bg-[#8B1627] text-white text-[13px] font-semibold px-6 py-3 transition-colors"
            style={{ fontFamily: SANS, borderRadius: "2px" }}
          >
            Bring Dura Schools to your school <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
