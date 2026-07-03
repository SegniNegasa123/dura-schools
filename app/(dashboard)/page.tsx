import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen,
  Building2,
  BarChart2,
  Bell,
  ClipboardList,
  GraduationCap,
  BedDouble,
  CheckSquare,
  Phone,
  Mail,
  Shield,
  ArrowDown,
} from "lucide-react";

const modules = [
  {
    icon: ClipboardList,
    title: "Admissions",
    body: "The application form lives on your school's public page. Parents fill it out from their phone. You review from your dashboard and notify applicants in one click. No paper, no lost files.",
  },
  {
    icon: GraduationCap,
    title: "Student Records",
    body: "Every enrolled student has a complete digital file — grades, attendance history, guardian contacts, dormitory assignment, and uploaded documents.",
  },
  {
    icon: BookOpen,
    title: "Teacher Portal",
    body: "Attendance in three minutes at the start of class. Grades entered once after an exam. Parents notified the same day. The paper register stays in the drawer.",
  },
  {
    icon: Users,
    title: "Parent Portal",
    body: "A parent in Addis can open their phone and see their child's attendance, most recent exam score, and dormitory room — without calling anyone.",
  },
  {
    icon: Shield,
    title: "Student Dashboard",
    body: "Students see their class schedule, exam results, school notices, and room assignment in one place. Nothing more, nothing less.",
  },
  {
    icon: BedDouble,
    title: "Boarding Management",
    body: "Room assignments, nightly dormitory checks, and house master reports — organized, timestamped, and on record.",
  },
  {
    icon: CheckSquare,
    title: "Attendance & Grades",
    body: "Digital attendance records build automatically each day. When a student is absent, their parent receives an alert before the end of the school day.",
  },
  {
    icon: Bell,
    title: "Communication",
    body: "School-wide announcements reach every parent in seconds. Teachers and parents exchange messages through the platform — not through personal phones.",
  },
  {
    icon: BarChart2,
    title: "Admin Analytics",
    body: "Enrollment numbers, attendance rates, and academic performance are visible to the school director in real time — not compiled manually at end of term.",
  },
];

const pricing = [
  {
    tier: "Starter",
    for: "Secondary schools",
    price: "1,500",
    unit: "ETB / month",
    cap: "Up to 300 students",
    featured: false,
    features: [
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
    price: "3,500",
    unit: "ETB / month",
    cap: "Up to 800 students",
    featured: true,
    features: [
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
    unit: "",
    cap: "Unlimited students",
    featured: false,
    features: [
      "Everything in Professional",
      "Student dashboard",
      "Admin analytics",
      "Custom subdomain",
      "Dedicated onboarding",
      "SLA guarantee",
    ],
  },
];

export default function Page() {
  return (
    <div
      className="bg-white"
      style={{
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      {/* ── Navigation ─────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[58px]">
          <Link href="/" className="flex items-center gap-0.5 select-none">
            <span className="text-[#0B1F3A] font-bold text-[17px] tracking-[-0.01em]">
              Dura
            </span>
            <span className="text-gray-400 font-light text-[17px]">
              Schools
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[13px] text-gray-500 hover:text-[#0B1F3A] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="text-[13px] text-gray-500 hover:text-[#0B1F3A] px-3 py-1.5 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-in"
              className="text-[13px] font-semibold bg-[#0B1F3A] text-white px-4 py-2 hover:bg-[#162f54] transition-colors"
              style={{ borderRadius: "3px" }}
            >
              Request a demo
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-[#0B1F3A] pt-[58px]">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
          <p className="text-[#B08D3C] text-[11px] font-semibold tracking-[0.18em] uppercase mb-8">
            For boarding and secondary schools in Ethiopia
          </p>
          <h1
            className="text-white font-bold leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(38px, 6vw, 68px)", maxWidth: "680px" }}
          >
            The school platform Ethiopia has been waiting for.
          </h1>
          <p
            className="text-[#8FA3BC] text-lg leading-relaxed mb-10"
            style={{ maxWidth: "500px" }}
          >
            Every Ethiopian university has a student portal. Most boarding
            schools still run on paper registers and phone calls. Dura Schools
            is the management platform built to change this.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 bg-[#B08D3C] hover:bg-[#9a7a32] text-white font-semibold text-[13px] px-6 py-3 transition-colors"
              style={{ borderRadius: "3px" }}
            >
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:border-white/30 hover:text-white/90 text-[13px] px-6 py-3 transition-colors"
              style={{ borderRadius: "3px" }}
            >
              See the platform <ArrowDown className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-20 pt-10 border-t border-white/8 flex flex-wrap gap-10">
            {[
              ["9", "platform modules"],
              ["5", "user portals"],
              ["1 day", "to go live"],
              ["0", "paper required"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-white font-bold text-2xl tracking-tight">
                  {n}
                </div>
                <div className="text-[#4D6680] text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Gap We Fill ───────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#B08D3C] text-[11px] font-semibold tracking-[0.18em] uppercase mb-6">
                The problem we solve
              </p>
              <h2
                className="text-[#0B1F3A] font-bold leading-tight tracking-tight"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
              >
                Universities in Ethiopia have digital portals. Boarding schools
                do not.
              </h2>
            </div>
            <div className="space-y-5 pt-1 md:pt-10">
              <p className="text-gray-600 text-[15px] leading-relaxed">
                A parent in Addis Ababa with a child at a boarding school in
                Jimma has no way to check their child's attendance. They call
                the school. Sometimes the school picks up.
              </p>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Students finishing elementary school cannot research and compare
                boarding schools before applying. Applications arrive on paper,
                by hand, and sometimes get lost.
              </p>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                School directors have no view of their own data unless they go
                through each physical file themselves. There is no dashboard.
                There is no system.
              </p>
              <p className="text-[#0B1F3A] text-[15px] font-semibold pt-2">
                Dura Schools fixes all of this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modules ───────────────────────────────────── */}
      <section id="features" className="bg-[#F5F6F8] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-[#B08D3C] text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
              Platform modules
            </p>
            <h2
              className="text-[#0B1F3A] font-bold leading-tight tracking-tight max-w-md"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
            >
              Nine modules. One platform. Every school.
            </h2>
          </div>

          {/* Grid with 1px hairline separators — the signature element */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {modules.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-[#F5F6F8] hover:bg-white transition-colors p-8 group cursor-default"
              >
                <Icon
                  className="h-[18px] w-[18px] text-[#0B1F3A] mb-5 opacity-60"
                  strokeWidth={1.5}
                />
                <h3 className="text-[#0B1F3A] font-semibold text-[14px] mb-3">
                  {title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────── */}
      <section id="how-it-works" className="bg-[#0B1F3A] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#B08D3C] text-[11px] font-semibold tracking-[0.18em] uppercase mb-6">
            Getting started
          </p>
          <h2
            className="text-white font-bold leading-tight tracking-tight mb-20"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", maxWidth: "380px" }}
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
                body: "Each user type — director, teacher, parent, student — logs into their own view with exactly the tools they need and nothing they do not.",
              },
              {
                ord: "Three",
                title: "Your school runs better",
                body: "Admissions are online. Parents are informed. Directors see live data. Teachers use three minutes on attendance instead of twenty.",
              },
            ].map(({ ord, title, body }) => (
              <div key={ord}>
                <p className="text-[#B08D3C] text-[12px] font-semibold mb-4">
                  {ord}
                </p>
                <div className="w-8 h-px bg-[#B08D3C] mb-7" />
                <h3 className="text-white font-semibold text-[15px] mb-3">
                  {title}
                </h3>
                <p className="text-[#8FA3BC] text-[13px] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five Portals ──────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#B08D3C] text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
            Who it's for
          </p>
          <h2
            className="text-[#0B1F3A] font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", maxWidth: "480px" }}
          >
            Five portals. Each one built for the person using it.
          </h2>
          <p className="text-gray-500 text-[15px] mb-14 max-w-lg">
            Everyone at your school uses the same platform — but sees only what
            is relevant to them.
          </p>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                role: "Dura Admin",
                desc: "Platform-wide oversight across all schools on the system.",
                bg: "#F2F0F7",
              },
              {
                role: "School Admin",
                desc: "The director or registrar manages the full school.",
                bg: "#EEF3F9",
              },
              {
                role: "Teachers",
                desc: "Class attendance, grade entry, and messages to parents.",
                bg: "#EEF6F2",
              },
              {
                role: "Parents",
                desc: "Their child's attendance, grades, and dormitory status.",
                bg: "#FBF5E8",
              },
              {
                role: "Students",
                desc: "Schedule, exam results, and school announcements.",
                bg: "#F5EEF8",
              },
            ].map(({ role, desc, bg }) => (
              <div
                key={role}
                className="p-5"
                style={{ backgroundColor: bg, borderRadius: "3px" }}
              >
                <p className="text-[#0B1F3A] font-semibold text-[13px] mb-2">
                  {role}
                </p>
                <p className="text-gray-500 text-[12px] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────── */}
      <section id="pricing" className="bg-[#F5F6F8] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#B08D3C] text-[11px] font-semibold tracking-[0.18em] uppercase mb-5">
            Pricing
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2
              className="text-[#0B1F3A] font-bold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                maxWidth: "320px",
              }}
            >
              Simple, honest pricing.
            </h2>
            <p className="text-gray-500 text-[13px] max-w-xs">
              Monthly subscription. No setup fee. No surprise charges. Cancel
              with 30 days' notice.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {pricing.map(
              ({
                tier,
                for: forLabel,
                price,
                unit,
                cap,
                featured,
                features,
              }) => (
                <div
                  key={tier}
                  className={`flex flex-col p-8 border ${
                    featured
                      ? "bg-[#0B1F3A] border-[#0B1F3A]"
                      : "bg-white border-gray-200"
                  }`}
                  style={{ borderRadius: "3px" }}
                >
                  {featured && (
                    <span
                      className="self-start bg-[#B08D3C] text-white text-[11px] font-semibold px-2.5 py-1 mb-5"
                      style={{ borderRadius: "2px" }}
                    >
                      Most chosen
                    </span>
                  )}
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-widest mb-1.5 ${
                      featured ? "text-[#8FA3BC]" : "text-gray-400"
                    }`}
                  >
                    {forLabel}
                  </p>
                  <h3
                    className={`font-bold text-xl mb-4 ${featured ? "text-white" : "text-[#0B1F3A]"}`}
                  >
                    {tier}
                  </h3>
                  <div className="mb-1">
                    <span
                      className={`font-bold text-2xl tracking-tight ${
                        featured ? "text-white" : "text-[#0B1F3A]"
                      }`}
                    >
                      {price}
                    </span>
                    {unit && (
                      <span
                        className={`text-[12px] ml-1.5 ${featured ? "text-[#8FA3BC]" : "text-gray-400"}`}
                      >
                        {unit}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[12px] mb-8 ${featured ? "text-[#4D6680]" : "text-gray-400"}`}
                  >
                    {cap}
                  </p>
                  <ul className="space-y-2.5 flex-1 mb-9">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle
                          className={`h-4 w-4 flex-shrink-0 mt-px ${featured ? "text-[#B08D3C]" : "text-[#0B1F3A]"}`}
                          strokeWidth={1.5}
                        />
                        <span
                          className={`text-[13px] ${featured ? "text-[#8FA3BC]" : "text-gray-600"}`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-in"
                    className={`block text-center text-[13px] font-semibold py-3 transition-colors ${
                      featured
                        ? "bg-[#B08D3C] hover:bg-[#9a7a32] text-white"
                        : "bg-[#0B1F3A] hover:bg-[#162f54] text-white"
                    }`}
                    style={{ borderRadius: "3px" }}
                  >
                    Get started
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────── */}
      <section className="bg-[#0B1F3A] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ maxWidth: "520px" }}>
            <h2
              className="text-white font-bold leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
            >
              Ready to bring your school online?
            </h2>
            <p className="text-[#8FA3BC] text-[15px] mb-10 leading-relaxed">
              We'll walk you through a live demo using a school set up exactly
              the way yours would be. No slides. No pitch deck. Just the actual
              product.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 bg-[#B08D3C] hover:bg-[#9a7a32] text-white font-semibold text-[13px] px-6 py-3 transition-colors"
              style={{ borderRadius: "3px" }}
            >
              Request a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <a
                href="mailto:info@duraschools.com"
                className="flex items-center gap-2 text-[#4D6680] hover:text-[#8FA3BC] transition-colors text-[13px]"
              >
                <Mail className="h-4 w-4" /> info@duraschools.com
              </a>
              <a
                href="tel:+251900000000"
                className="flex items-center gap-2 text-[#4D6680] hover:text-[#8FA3BC] transition-colors text-[13px]"
              >
                <Phone className="h-4 w-4" /> +251 900 000 000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="bg-[#060E1A] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-0.5 mb-1.5">
              <span className="text-white font-bold text-[15px] tracking-[-0.01em]">
                Dura
              </span>
              <span className="text-[#334155] font-light text-[15px]">
                Schools
              </span>
            </div>
            <p className="text-[#1E3048] text-[12px]">
              A product of Dura Tech &middot; Made in Ethiopia &middot; 2025
            </p>
          </div>
          <nav className="flex gap-8">
            {[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Sign in", href: "/sign-in" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[#334155] hover:text-[#8FA3BC] text-[13px] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-[#1E3048] text-[12px]">
            © 2025 Dura Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
