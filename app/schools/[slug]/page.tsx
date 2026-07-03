import { db } from "@/lib/db/drizzle";
import { schools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  HelpCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndividualSchoolPage({ params }: PageProps) {
  const { slug } = await params;

  // Query school details from the multi-tenant database
  const targetSchool = await db
    .select()
    .from(schools)
    .where(eq(schools.slug, slug))
    .limit(1);

  if (!targetSchool || targetSchool.length === 0) {
    notFound();
  }

  const school = targetSchool[0];

  return (
    <div className="bg-[#FBF9F6] min-h-screen text-[#1A1A1A] antialiased">
      {/* ── Institutional Header Bar ───────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#EBE6DF] backdrop-blur-md bg-white/90">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-[60px]">
          <Link
            href="/schools"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest font-semibold text-[#716860] hover:text-[#A51C30] transition-colors"
            style={{ fontFamily: SANS }}
          >
            <ArrowLeft className="h-3.5 w-3.5 stroke-[2]" /> Registry Directory
          </Link>
          <div className="flex items-baseline gap-0.5 select-none">
            <span
              style={{ fontFamily: SERIF }}
              className="font-bold text-[18px] text-[#A51C30] tracking-tight"
            >
              Dura
            </span>
            <span
              style={{ fontFamily: SERIF }}
              className="font-normal text-[18px] text-[#1A1A1A]"
            >
              Schools
            </span>
          </div>
        </div>
      </header>

      {/* ── Master Profile Layout ──────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-8 pt-[140px] pb-32">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* ── Left Column: Structural Academic Profile (8 Columns) ── */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              {/* Regional Matrix Location Badge */}
              <div
                className="flex items-center gap-2 text-[#A51C30] text-[11px] font-bold tracking-[0.25em] uppercase mb-4"
                style={{ fontFamily: SANS }}
              >
                <MapPin className="h-3.5 w-3.5 text-[#A51C30] stroke-[2]" />
                <span>
                  {school.city
                    ? `${school.city} • ${school.region || "Ethiopia Network"}`
                    : "Ethiopia Strategic Node"}
                </span>
              </div>

              {/* Elite Large Title */}
              <h1
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(34px, 5vw, 52px)",
                  lineHeight: 1.05,
                }}
                className="font-bold text-[#1A1A1A] tracking-tight mb-8 max-w-3xl"
              >
                {school.name}
              </h1>

              {/* Status Verification Bar */}
              <div className="inline-flex items-center gap-2 bg-[#F0ECE6] border border-[#E2DDD7] px-4 py-2 rounded-[2px] mb-4">
                <ShieldCheck className="h-4 w-4 text-[#A51C30]" />
                <span
                  className="text-[12px] font-medium text-[#3A3530]"
                  style={{ fontFamily: SANS }}
                >
                  Verified Active Tenant • Dura Core Framework v4.1
                </span>
              </div>
            </div>

            {/* Core Narrative Profile */}
            <div className="border-t border-[#EBE6DF] pt-10">
              <h2
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#716860] mb-6"
                style={{ fontFamily: SANS }}
              >
                Institutional Abstract & Charter
              </h2>
              <p
                style={{ fontFamily: SERIF }}
                className="text-[#262421] text-[18px] leading-relaxed whitespace-pre-wrap italic pl-6 border-l-2 border-[#A51C30]/40"
              >
                {school.about ||
                  "This legacy educational establishment is currently operating within the Dura Schools centralized digital management network. Full dynamic structural parameters are active and managed via the administrative dashboard configuration modules."}
              </p>
            </div>

            {/* Operational Framework Features List */}
            <div className="border-t border-[#EBE6DF] pt-10">
              <h2
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#716860] mb-6"
                style={{ fontFamily: SANS }}
              >
                Active Governance Modules
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Centralized Admissions",
                    desc: "Cryptographically bound public registration pipelines handling direct guardian processing.",
                  },
                  {
                    title: "Dormitory Real-Time Matrix",
                    desc: "Automated block occupancy calculation systems monitoring physical housing allocations.",
                  },
                  {
                    title: "Parent Portal Integration",
                    desc: "Asynchronous secure transmission of biometric attendance and daily grading data.",
                  },
                  {
                    title: "Direct Cryptographic Auditing",
                    desc: "End-to-end transparent visibility of system analytics directly by institutional directors.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#EBE6DF] bg-white p-6 rounded-[2px]"
                  >
                    <h3
                      className="font-bold text-[15px] mb-2"
                      style={{ fontFamily: SERIF }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#716860] text-[13px] leading-relaxed"
                      style={{ fontFamily: SANS }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: The Elite Sidebar Panel (4 Columns) ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-[100px]">
            <div className="bg-white border-2 border-[#1A1A1A] p-8 rounded-[2px] space-y-6 shadow-[4px_4px_0px_0px_rgba(165,28,48,0.1)]">
              <div>
                <p
                  className="text-[#A51C30] text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                  style={{ fontFamily: SANS }}
                >
                  Admissions Status
                </p>
                <h3
                  className="font-bold text-[24px] tracking-tight text-[#1A1A1A]"
                  style={{ fontFamily: SERIF }}
                >
                  Intake Open
                </h3>
                <p
                  className="text-[13px] text-[#716860] mt-1"
                  style={{ fontFamily: SANS }}
                >
                  Academic Term: 2026 Entry Cycles
                </p>
              </div>

              {/* The Master Action Trigger Button */}
              <Link
                href={`/schools/${school.slug}/apply`}
                className="w-full text-center block bg-[#A51C30] hover:bg-[#1A1A1A] text-white text-[13px] font-bold tracking-widest uppercase py-4 transition-colors rounded-[2px]"
                style={{ fontFamily: SANS }}
              >
                Initiate Online Application
              </Link>

              {/* Dynamic Metadata Registry Stack */}
              <div className="border-t border-[#EBE6DF] pt-6 space-y-4">
                <h4
                  className="text-[10px] font-bold text-[#716860] tracking-[0.15em] uppercase mb-2"
                  style={{ fontFamily: SANS }}
                >
                  Verified School Registrars
                </h4>

                {school.email && (
                  <div className="flex items-center gap-3 text-[13px] text-[#262421]">
                    <Mail className="h-4 w-4 text-[#A51C30] shrink-0 stroke-[1.5]" />
                    <span className="truncate underline underline-offset-4 decoration-[#EBE6DF]">
                      {school.email}
                    </span>
                  </div>
                )}

                {school.phone && (
                  <div className="flex items-center gap-3 text-[13px] text-[#262421]">
                    <Phone className="h-4 w-4 text-[#A51C30] shrink-0 stroke-[1.5]" />
                    <span className="tabular-nums">{school.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-[13px] text-[#262421]">
                  <Calendar className="h-4 w-4 text-[#A51C30] shrink-0 stroke-[1.5]" />
                  <span style={{ fontFamily: SANS }}>Sync Status: Online</span>
                </div>
              </div>

              {/* Fine Print Compliance Anchor */}
              <div className="bg-[#FBF9F6] border border-[#EBE6DF] p-4 flex items-start gap-2.5">
                <HelpCircle className="h-4 w-4 text-[#716860] shrink-0 mt-0.5" />
                <p
                  className="text-[11px] text-[#716860] leading-normal"
                  style={{ fontFamily: SANS }}
                >
                  Submissions processed through this gateway route completely
                  eliminate paper dependencies and report straight to internal
                  management ledgers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
