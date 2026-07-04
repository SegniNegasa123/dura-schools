import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BedDouble,
  Users,
} from "lucide-react";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: school } = await supabase
    .from("schools")
    .select("name, about")
    .eq("slug", slug)
    .single();

  if (!school) return { title: "School Not Found | Dura Schools" };
  return {
    title: `${school.name} | Dura Schools`,
    description:
      school.about ??
      `Learn more about ${school.name} and apply for admission.`,
  };
}

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: school } = await supabase
    .from("schools")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!school) notFound();

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
              className="text-[13px] text-[#716860] hover:text-[#1A1A1A] transition-colors"
              style={{ fontFamily: SANS }}
            >
              Find a School
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
              href={`/schools/${school.slug}/apply`}
              className="text-[13px] font-semibold bg-[#A51C30] hover:bg-[#8B1627] text-white px-4 py-2 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Apply now
            </Link>
          </div>
        </div>
      </header>

      {/* ── Breadcrumb + Hero ──────────────────────────── */}
      <section className="bg-[#A51C30] pt-[56px]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Link
            href="/schools"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12px] mb-8 transition-colors"
            style={{ fontFamily: SANS }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All schools
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div>
              {(school.city || school.region) && (
                <p
                  className="flex items-center gap-1.5 text-white/60 text-[12px] font-semibold tracking-wide uppercase mb-5"
                  style={{ fontFamily: SANS }}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {[school.city, school.region].filter(Boolean).join(", ")}
                </p>
              )}
              <h1
                className="text-white font-bold"
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(32px, 5vw, 56px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  maxWidth: "620px",
                }}
              >
                {school.name}
              </h1>
            </div>
            <Link
              href={`/schools/${school.slug}/apply`}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#A51C30] font-semibold text-[13px] px-6 py-3.5 hover:bg-[#F8F6F2] transition-colors flex-shrink-0"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Apply for admission <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-14">
          <div className="md:col-span-8">
            <p
              className="text-[#A51C30] text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: SANS }}
            >
              About the school
            </p>
            <p
              className="text-[#3D3530] text-[16px] leading-relaxed"
              style={{ fontFamily: SANS }}
            >
              {school.about ??
                `${school.name} is a boarding and secondary institution managed on the Dura Schools platform. Admissions, academics, and boarding operations are administered digitally, giving families a transparent view of the admissions process from application to enrollment.`}
            </p>

            <div className="grid sm:grid-cols-3 gap-px bg-[#E2DDD7] mt-12">
              {[
                {
                  icon: GraduationCap,
                  label: "Digital admissions",
                  desc: "Apply online, track your status, hear back faster.",
                },
                {
                  icon: BedDouble,
                  label: "Boarding facilities",
                  desc: "Managed dormitory assignments and daily oversight.",
                },
                {
                  icon: Users,
                  label: "Parent visibility",
                  desc: "Attendance and grades available to guardians remotely.",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-[#F8F6F2] p-6">
                  <Icon
                    className="h-[17px] w-[17px] text-[#A51C30] mb-4"
                    strokeWidth={1.5}
                  />
                  <p
                    className="text-[#1A1A1A] font-semibold text-[13px] mb-2"
                    style={{ fontFamily: SANS }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[#716860] text-[12px] leading-relaxed"
                    style={{ fontFamily: SANS }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - contact card */}
          <div className="md:col-span-4">
            <div
              className="bg-[#F8F6F2] p-7 sticky top-24"
              style={{ borderRadius: "2px" }}
            >
              <p
                className="text-[#A51C30] text-[11px] font-semibold tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: SANS }}
              >
                Contact
              </p>
              <div className="space-y-4 mb-8">
                {school.email && (
                  <a
                    href={`mailto:${school.email}`}
                    className="flex items-center gap-3 text-[#3D3530] hover:text-[#A51C30] text-[13px] transition-colors"
                    style={{ fontFamily: SANS }}
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" /> {school.email}
                  </a>
                )}
                {school.phone && (
                  <a
                    href={`tel:${school.phone}`}
                    className="flex items-center gap-3 text-[#3D3530] hover:text-[#A51C30] text-[13px] transition-colors"
                    style={{ fontFamily: SANS }}
                  >
                    <Phone className="h-4 w-4 flex-shrink-0" /> {school.phone}
                  </a>
                )}
                {(school.city || school.region) && (
                  <p
                    className="flex items-center gap-3 text-[#3D3530] text-[13px]"
                    style={{ fontFamily: SANS }}
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0" />{" "}
                    {[school.city, school.region].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
              <Link
                href={`/schools/${school.slug}/apply`}
                className="block text-center bg-[#A51C30] hover:bg-[#8B1627] text-white text-[13px] font-semibold py-3 transition-colors"
                style={{ fontFamily: SANS, borderRadius: "2px" }}
              >
                Start an application
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
