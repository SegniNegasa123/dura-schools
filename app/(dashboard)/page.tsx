import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle,
  ClipboardList,
  GraduationCap,
  BookOpen,
  Users,
  Shield,
  BedDouble,
  CheckSquare,
  Bell,
  BarChart2,
  Phone,
  Mail,
} from "lucide-react";

const modules = [
  {
    icon: ClipboardList,
    title: "Admissions",
    body: "The application form lives on your school's public page. Parents submit from a phone. You review from your dashboard and respond in one click. No paper, no lost files.",
  },
  {
    icon: GraduationCap,
    title: "Student Records",
    body: "Complete digital student files — academic history, attendance, guardian contacts, dormitory assignment, and uploaded documents, all in one place.",
  },
  {
    icon: BookOpen,
    title: "Teacher Portal",
    body: "Attendance in three minutes at the start of class. Grades entered after an exam. Parents notified the same day. The paper register stays in the drawer.",
  },
  {
    icon: Users,
    title: "Parent Portal",
    body: "A parent in Addis opens their phone and sees their child's attendance for the week, their most recent grade, and what dormitory block they are in — without calling anyone.",
  },
  {
    icon: Shield,
    title: "Student Dashboard",
    body: "Students see their class schedule, exam results, school announcements, and room assignment in one place. Nothing more, nothing less.",
  },
  {
    icon: BedDouble,
    title: "Boarding Management",
    body: "Room assignments, nightly dormitory checks, and house master reports — organized and on record. Incidents notify the school director automatically.",
  },
  {
    icon: CheckSquare,
    title: "Attendance & Grades",
    body: "Digital attendance records that build each day without extra work. When a student is absent, the parent receives an alert before the school day ends.",
  },
  {
    icon: Bell,
    title: "Communication",
    body: "School-wide announcements reach every parent in seconds. Teachers and parents message through the platform — not through personal phones.",
  },
  {
    icon: BarChart2,
    title: "Admin Analytics",
    body: "Enrollment numbers, attendance rates, and academic trends are visible to the director in real time — not compiled by hand at the end of term.",
  },
];

const pricingPlans = [
  {
    tier: "Starter",
    for: "Secondary schools",
    price: "1,500 ETB",
    per: "per month",
    cap: "Up to 300 students",
    featured: false,
    items: [
      "Admissions module",
      "Student records (SIS)",
      "Attendance & grades",
      "School admin dashboard",
      "Email support",
    ],
  },
  {
    tier: "Professional",
    for: "Boarding schools",
    price: "3,500 ETB",
    per: "per month",
    cap: "Up to 800 students",
    featured: true,
    items: [
      "Everything in Starter",
      "Parent portal",
      "Teacher portal",
      "Communication system",
      "Boarding management",
      "Priority support",
    ],
  },
  {
    tier: "Enterprise",
    for: "Large institutions",
    price: "Custom",
    per: "",
    cap: "Unlimited students",
    featured: false,
    items: [
      "Everything in Professional",
      "Student dashboard",
      "Admin analytics",
      "Custom subdomain",
      "Dedicated onboarding",
      "SLA guarantee",
    ],
  },
];

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

const H2 = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <h2
    className="text-[#1A1A1A] font-bold leading-tight"
    style={{
      fontFamily: SERIF,
      fontSize: "clamp(26px, 3.2vw, 40px)",
      letterSpacing: "-0.015em",
      ...style,
    }}
  >
    {children}
  </h2>
);

export default function Page() {
  return (
    <div className="bg-white text-[#1A1A1A]">
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
            {[
              ["Features", "#features"],
              ["How It Works", "#how-it-works"],
              ["Pricing", "#pricing"],
            ].map(([l, h]) => (
              <Link
                key={l}
                href={h}
                className="text-[13px] text-[#716860] hover:text-[#1A1A1A] transition-colors"
                style={{ fontFamily: SANS }}
              >
                {l}
              </Link>
            ))}
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
              href="/sign-in"
              className="text-[13px] font-semibold bg-[#A51C30] hover:bg-[#8B1627] text-white px-4 py-2 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Request a demo
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-[#A51C30] pt-[56px]">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
          <p
            className="text-white/60 text-[11px] font-semibold tracking-[0.22em] uppercase mb-8"
            style={{ fontFamily: SANS }}
          >
            For boarding and secondary schools in Ethiopia
          </p>
          <h1
            className="text-white font-bold mb-8"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(38px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "680px",
            }}
          >
            Digital infrastructure for Ethiopia's boarding schools.
          </h1>
          <p
            className="text-white/75 text-[17px] leading-relaxed mb-10"
            style={{ fontFamily: SANS, maxWidth: "500px" }}
          >
            Every Ethiopian university has a student portal. Most boarding
            schools still run on paper registers and phone calls. Dura Schools
            is the management platform built to change this.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#A51C30] font-semibold text-[13px] px-6 py-3 hover:bg-[#F8F6F2] transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Request a demonstration <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white hover:border-white/45 text-[13px] px-6 py-3 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Explore the platform <ArrowDown className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-20 pt-10 border-t border-white/12 flex flex-wrap gap-12">
            {[
              ["9", "platform modules"],
              ["5", "user portals"],
              ["1 day", "to go live"],
              ["0", "paper required"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  className="text-white font-bold text-[28px] leading-none"
                  style={{ fontFamily: SERIF }}
                >
                  {n}
                </div>
                <div
                  className="text-white/45 text-[12px] mt-1.5"
                  style={{ fontFamily: SANS }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Label>The gap we fill</Label>
              <H2>
                Universities in Ethiopia have digital portals.
                <br />
                Boarding schools do not.
              </H2>
            </div>
            <div className="md:col-span-7 md:pt-14 space-y-5">
              {[
                "A parent in Addis Ababa with a child at a boarding school in Jimma has no way to check their child's attendance. They call the school. Sometimes the school picks up.",
                "Students finishing elementary school cannot research and compare boarding schools before applying. Applications arrive on paper, by hand, and sometimes get lost.",
                "School directors have no view of their own data unless they go through each physical file themselves. There is no dashboard. There is no system.",
              ].map((p, i) => (
                <p
                  key={i}
                  className="text-[#3D3530] text-[15px] leading-relaxed"
                  style={{ fontFamily: SANS }}
                >
                  {p}
                </p>
              ))}
              <p
                className="text-[#1A1A1A] text-[15px] font-semibold pt-1"
                style={{ fontFamily: SANS }}
              >
                Dura Schools addresses all of this.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-[#E2DDD7]" />
      </div>

      {/* ── Modules ─────────────────────────────────────── */}
      <section id="features" className="bg-[#F8F6F2] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <Label>Platform modules</Label>
            <H2 style={{ maxWidth: "400px" }}>
              Nine modules.
              <br />
              One platform. Every school.
            </H2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2DDD7]">
            {modules.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-[#F8F6F2] hover:bg-white transition-colors p-8"
              >
                <Icon
                  className="h-[17px] w-[17px] text-[#A51C30] mb-5"
                  strokeWidth={1.5}
                />
                <h3
                  className="font-semibold text-[#1A1A1A] text-[14px] mb-3"
                  style={{ fontFamily: SANS }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#716860] text-[13px] leading-relaxed"
                  style={{ fontFamily: SANS }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────── */}
      <section id="how-it-works" className="bg-[#1A1A1A] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Label>Getting started</Label>
          <h2
            className="text-white font-bold leading-tight mb-20"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(26px, 3.2vw, 40px)",
              letterSpacing: "-0.015em",
              maxWidth: "360px",
            }}
          >
            Your school is live in one day.
          </h2>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                ord: "One",
                title: "We set everything up",
                body: "We onboard your school, configure your modules, and create accounts for your staff, teachers, parents, and students. You don't touch a single setting.",
              },
              {
                ord: "Two",
                title: "Everyone gets their portal",
                body: "Each user type logs into their own view with exactly the tools they need and nothing they do not. Teachers see classes. Parents see their child.",
              },
              {
                ord: "Three",
                title: "Your school runs better",
                body: "Admissions are online. Parents are informed. Directors see live data. Teachers spend three minutes on attendance instead of twenty.",
              },
            ].map(({ ord, title, body }) => (
              <div key={ord}>
                <p
                  className="text-[#A51C30] text-[12px] font-semibold mb-4"
                  style={{ fontFamily: SANS }}
                >
                  {ord}
                </p>
                <div className="w-8 h-px bg-[#A51C30] mb-6" />
                <h3
                  className="text-white font-semibold text-[15px] mb-3"
                  style={{ fontFamily: SANS }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#8A7F78] text-[13px] leading-relaxed"
                  style={{ fontFamily: SANS }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five Portals ────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Label>Who it's for</Label>
          <H2 style={{ maxWidth: "480px", marginBottom: "12px" }}>
            Five portals. Each built for the person using it.
          </H2>
          <p
            className="text-[#716860] text-[15px] mb-14 max-w-lg"
            style={{ fontFamily: SANS }}
          >
            Everyone in your school uses the same platform — but sees only what
            is relevant to their role.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#E2DDD7]">
            {[
              {
                role: "Dura Admin",
                desc: "Platform-wide oversight across all schools on the system.",
              },
              {
                role: "School Admin",
                desc: "The director or registrar manages the entire school.",
              },
              {
                role: "Teachers",
                desc: "Attendance, grade entry, and parent communication.",
              },
              {
                role: "Parents",
                desc: "Their child's attendance, grades, and dormitory status.",
              },
              {
                role: "Students",
                desc: "Schedule, exam results, and school announcements.",
              },
            ].map(({ role, desc }) => (
              <div
                key={role}
                className="bg-white hover:bg-[#F8F6F2] transition-colors p-7"
              >
                <div className="w-5 h-px bg-[#A51C30] mb-5" />
                <p
                  className="text-[#1A1A1A] font-semibold text-[13px] mb-2"
                  style={{ fontFamily: SANS }}
                >
                  {role}
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
      </section>

      {/* ── Pricing ─────────────────────────────────────── */}
      <section id="pricing" className="bg-[#F8F6F2] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Label>Pricing</Label>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <H2 style={{ maxWidth: "280px" }}>Straightforward pricing.</H2>
            <p
              className="text-[#716860] text-[13px] max-w-xs"
              style={{ fontFamily: SANS }}
            >
              Monthly subscription. No setup fee. No hidden charges.
              <br />
              Cancel with 30 days' notice.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#E2DDD7]">
            {pricingPlans.map(
              ({ tier, for: fl, price, per, cap, featured, items }) => (
                <div
                  key={tier}
                  className={`flex flex-col p-8 ${featured ? "bg-[#A51C30]" : "bg-[#F8F6F2] hover:bg-white transition-colors"}`}
                >
                  {featured && (
                    <span
                      className="self-start bg-white text-[#A51C30] text-[11px] font-bold px-2.5 py-1 mb-5"
                      style={{ fontFamily: SANS, borderRadius: "2px" }}
                    >
                      Most chosen
                    </span>
                  )}
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${featured ? "text-white/55" : "text-[#9A8F87]"}`}
                    style={{ fontFamily: SANS }}
                  >
                    {fl}
                  </p>
                  <h3
                    className={`font-bold text-xl mb-3 ${featured ? "text-white" : "text-[#1A1A1A]"}`}
                    style={{ fontFamily: SERIF }}
                  >
                    {tier}
                  </h3>
                  <div className="mb-1">
                    <span
                      className={`font-bold text-[26px] tracking-tight ${featured ? "text-white" : "text-[#1A1A1A]"}`}
                      style={{ fontFamily: SERIF }}
                    >
                      {price}
                    </span>
                    {per && (
                      <span
                        className={`text-[12px] ml-2 ${featured ? "text-white/55" : "text-[#9A8F87]"}`}
                        style={{ fontFamily: SANS }}
                      >
                        {per}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[12px] mb-8 ${featured ? "text-white/55" : "text-[#9A8F87]"}`}
                    style={{ fontFamily: SANS }}
                  >
                    {cap}
                  </p>
                  <ul className="space-y-2.5 flex-1 mb-9">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle
                          className={`h-4 w-4 flex-shrink-0 mt-px ${featured ? "text-white/65" : "text-[#A51C30]"}`}
                          strokeWidth={1.5}
                        />
                        <span
                          className={`text-[13px] ${featured ? "text-white/75" : "text-[#3D3530]"}`}
                          style={{ fontFamily: SANS }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-in"
                    className={`block text-center text-[13px] font-semibold py-3 transition-colors ${featured ? "bg-white text-[#A51C30] hover:bg-[#F8F6F2]" : "bg-[#A51C30] text-white hover:bg-[#8B1627]"}`}
                    style={{ fontFamily: SANS, borderRadius: "2px" }}
                  >
                    Get started
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="bg-[#A51C30] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ maxWidth: "520px" }}>
            <h2
              className="text-white font-bold leading-tight mb-5"
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                letterSpacing: "-0.015em",
              }}
            >
              Start the conversation.
            </h2>
            <p
              className="text-white/70 text-[16px] leading-relaxed mb-10"
              style={{ fontFamily: SANS }}
            >
              We will walk you through a demonstration using a school configured
              exactly as yours would be. No slides. No pitch deck. The actual
              product.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 bg-white text-[#A51C30] font-semibold text-[13px] px-6 py-3 hover:bg-[#F8F6F2] transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Request a demonstration <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <a
                href="mailto:info@duraschools.com"
                className="flex items-center gap-2 text-white/45 hover:text-white/75 transition-colors text-[13px]"
                style={{ fontFamily: SANS }}
              >
                <Mail className="h-4 w-4" /> info@duraschools.com
              </a>
              <a
                href="tel:+251900000000"
                className="flex items-center gap-2 text-white/45 hover:text-white/75 transition-colors text-[13px]"
                style={{ fontFamily: SANS }}
              >
                <Phone className="h-4 w-4" /> +251 900 000 000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="bg-[#111111] pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/6">
            <div>
              <div className="flex items-baseline gap-0.5 mb-3">
                <span
                  className="font-bold text-[16px] text-[#A51C30]"
                  style={{ fontFamily: SERIF }}
                >
                  Dura
                </span>
                <span
                  className="font-normal text-[16px] text-white/70"
                  style={{ fontFamily: SERIF }}
                >
                  Schools
                </span>
              </div>
              <p
                className="text-[#4A4440] text-[12px] leading-relaxed"
                style={{ fontFamily: SANS }}
              >
                A product of Dura Tech.
                <br />
                Made in Ethiopia. 2026.
              </p>
            </div>
            {[
              {
                heading: "Platform",
                links: [
                  ["Features", "#features"],
                  ["How It Works", "#how-it-works"],
                  ["Pricing", "#pricing"],
                ],
              },
              {
                heading: "Company",
                links: [
                  ["About Dura Tech", "#"],
                  ["Request a Demo", "/sign-in"],
                  ["Sign In", "/sign-in"],
                ],
              },
              {
                heading: "Contact",
                links: [
                  ["info@duraschools.com", "mailto:info@duraschools.com"],
                  ["+251 900 000 000", "tel:+25190"],
                  ["Addis Ababa, Ethiopia", "#"],
                ],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p
                  className="text-[#A51C30] text-[11px] font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: SANS }}
                >
                  {heading}
                </p>
                <ul className="space-y-2.5">
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[#4A4440] hover:text-white text-[13px] transition-colors"
                        style={{ fontFamily: SANS }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p
            className="text-[#252220] text-[12px] mt-6"
            style={{ fontFamily: SANS }}
          >
            © 2026 Dura Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
