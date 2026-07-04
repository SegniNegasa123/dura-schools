import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import ApplicationForm from "./application-form";

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
    .select("name")
    .eq("slug", slug)
    .single();
  return { title: school ? `Apply | ${school.name}` : "Apply | Dura Schools" };
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: school } = await supabase
    .from("schools")
    .select("id, name, slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!school) notFound();

  return (
    <div className="bg-[#F8F6F2] text-[#1A1A1A] min-h-screen">
      {/* ── Header ─────────────────────────────────────── */}
      <header className="bg-white border-b border-[#E2DDD7]">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-[56px]">
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
          <Link
            href={`/schools/${school.slug}`}
            className="flex items-center gap-2 text-[13px] text-[#716860] hover:text-[#1A1A1A] transition-colors"
            style={{ fontFamily: SANS }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to school
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p
          className="text-[#A51C30] text-[11px] font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: SANS }}
        >
          Admissions application
        </p>
        <h1
          className="text-[#1A1A1A] font-bold mb-3"
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-0.015em",
          }}
        >
          Apply to {school.name}
        </h1>
        <p
          className="text-[#716860] text-[14px] leading-relaxed mb-12"
          style={{ fontFamily: SANS, maxWidth: "480px" }}
        >
          This application takes about five minutes. A member of the admissions
          team will review it and contact the parent or guardian listed below.
        </p>

        <ApplicationForm schoolSlug={school.slug} schoolName={school.name} />
      </div>
    </div>
  );
}
