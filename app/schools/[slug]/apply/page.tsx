import { db } from "@/lib/db/drizzle";
import { schools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Landmark } from "lucide-react";
import ApplicationWizardForm from "./ApplicationWizardForm";

export const dynamic = "force-dynamic";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

// Next.js 15 requires params to be handled as a Promise asynchronously
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ApplyPage({ params }: PageProps) {
  const { slug } = await params;

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
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#EBE6DF] backdrop-blur-md bg-white/90">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-[60px]">
          <Link
            href={`/schools/${school.slug}`}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-[#716860] hover:text-[#A51C30] transition-colors"
            style={{ fontFamily: SANS }}
          >
            <ArrowLeft className="h-3.5 w-3.5 stroke-[2]" /> Institution Profile
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

      <main className="max-w-3xl mx-auto px-6 pt-[130px] pb-32">
        <div className="border-b border-[#EBE6DF] pb-8 mb-10">
          <div
            className="flex items-center gap-2 text-[#716860] text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: SANS }}
          >
            <Landmark className="h-3.5 w-3.5 text-[#A51C30]" />
            <span>Admissions Gateway</span>
          </div>
          <h1
            style={{ fontFamily: SERIF }}
            className="text-[36px] font-bold tracking-tight text-[#1A1A1A] mb-3"
          >
            Application for Admission
          </h1>
          <p
            style={{ fontFamily: SANS }}
            className="text-[14px] text-[#716860] max-w-xl leading-relaxed"
          >
            Please complete the four operational stages below. Data sent via
            this channel maps instantly into the processing registry files of{" "}
            <span className="font-semibold text-[#1A1A1A]">{school.name}</span>.
          </p>
        </div>

        <ApplicationWizardForm schoolId={school.id} schoolSlug={school.slug} />
      </main>
    </div>
  );
}
