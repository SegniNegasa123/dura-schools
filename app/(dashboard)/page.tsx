import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen,
  Building2,
  BarChart3,
  MessageSquare,
  ClipboardList,
  GraduationCap,
  BedDouble,
  Bell,
  Phone,
  Mail,
  Shield,
  ChevronRight,
} from "lucide-react";

const modules = [
  {
    icon: ClipboardList,
    title: "Admissions",
    desc: "Digital application forms, online review, and instant accept/reject notifications. no paper.",
  },
  {
    icon: GraduationCap,
    title: "Student Records (SIS)",
    desc: "Complete digital student profiles with academic history, photos, and documents.",
  },
  {
    icon: BookOpen,
    title: "Teacher Portal",
    desc: "Class management, grade entry, and direct parent messaging in one place.",
  },
  {
    icon: Users,
    title: "Parent Portal",
    desc: "Remote monitoring of attendance, grades, and school updates from any device.",
  },
  {
    icon: Shield,
    title: "Student Dashboard",
    desc: "Schedule, grades, announcements, and dormitory info for every enrolled student.",
  },
  {
    icon: BedDouble,
    title: "Boarding Management",
    desc: "Room assignments, dormitory checks, and house master tools for boarding schools.",
  },
  {
    icon: CheckCircle,
    title: "Attendance & Grades",
    desc: "Digital registers, instant parent alerts, and automated grade calculations by term.",
  },
  {
    icon: Bell,
    title: "Communication",
    desc: "School-wide announcements, direct messages, and email notifications; all in one system.",
  },
  {
    icon: BarChart3,
    title: "Admin Analytics",
    desc: "Real-time dashboards for school directors to monitor enrollment, performance, and trends.",
  },
];

const portals = [
  {
    label: "Dura Admin",
    sub: "Full platform control",
    bg: "bg-purple-900",
    border: "border-purple-700",
  },
  {
    label: "School Admin",
    sub: "Manage your school",
    bg: "bg-[#1B3A6B]",
    border: "border-blue-700",
  },
  {
    label: "Teachers",
    sub: "Classes & grades",
    bg: "bg-teal-800",
    border: "border-teal-600",
  },
  {
    label: "Parents",
    sub: "Monitor remotely",
    bg: "bg-emerald-800",
    border: "border-emerald-600",
  },
  {
    label: "Students",
    sub: "Schedules & results",
    bg: "bg-amber-800",
    border: "border-amber-600",
  },
];

const plans = [
  {
    name: "Starter",
    tag: "Secondary schools",
    price: "From 1,500 ETB",
    period: "/month",
    highlight: false,
    features: [
      "Admissions module",
      "Student records (SIS)",
      "Attendance & grades",
      "School admin dashboard",
      "Up to 300 students",
    ],
  },
  {
    name: "Professional",
    tag: "Boarding schools",
    price: "From 3,500 ETB",
    period: "/month",
    highlight: true,
    features: [
      "Everything in Starter",
      "Parent portal",
      "Teacher portal",
      "Communication system",
      "Boarding management",
      "Up to 800 students",
    ],
  },
  {
    name: "Enterprise",
    tag: "Large institutions",
    price: "Custom",
    period: "",
    highlight: false,
    features: [
      "Everything in Professional",
      "Student dashboard",
      "Admin analytics",
      "Custom subdomain",
      "Dedicated support",
      "Unlimited students",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-1 select-none">
            <span className="text-xl font-bold tracking-tight text-[#1B3A6B]">
              Dura
            </span>
            <span className="text-xl font-light text-gray-400">Schools</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link
              href="#features"
              className="hover:text-[#1B3A6B] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-[#1B3A6B] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="hover:text-[#1B3A6B] transition-colors"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex text-sm text-gray-600 hover:text-[#1B3A6B] px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-1.5 text-sm font-medium bg-[#1B3A6B] hover:bg-[#152d54] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Request Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-16 min-h-screen bg-[#1B3A6B] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-500/10" />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium">
                Built in Ethiopia, for Ethiopia
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              Modern School
              <br />
              <span className="text-[#C9A84C]">Management.</span>
              <br />
              Built for Ethiopia.
            </h1>
            <p className="text-lg sm:text-xl text-blue-200/80 mb-10 max-w-xl leading-relaxed">
              Dura Schools digitizes admissions, student records, parent
              communication, and dormitory management — giving Ethiopia's
              boarding schools the platform they deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8933d] text-white font-semibold px-7 py-4 rounded-xl text-base transition-all hover:scale-[1.02]"
              >
                Request a Demo <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-medium px-7 py-4 rounded-xl text-base transition-all"
              >
                See All Features
              </Link>
            </div>
            <div className="flex items-center gap-10">
              {[
                ["9", "Modules"],
                ["5", "Portals"],
                ["1 Day", "To Launch"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold text-white">{n}</div>
                  <div className="text-sm text-blue-300">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-red-500 mb-4">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] leading-tight mb-6">
              Ethiopia's elite schools are running on paper
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              While every Ethiopian university has a digital portal, almost
              every secondary and boarding school still relies on paper
              registers, physical files, and phone calls. This creates real,
              daily problems.
            </p>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 text-[#1B3A6B] font-semibold hover:gap-3 transition-all"
            >
              See how Dura solves this <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {[
              "Students can't find detailed information about boarding schools before applying",
              "Parents can't monitor their children in boarding schools remotely",
              "Admissions are paper-based — slow, disorganized, and impossible to track",
              "Teachers lose paper registers and grade books",
              "School directors have no real-time visibility into their school's performance",
              "Elementary students have no way to discover boarding school opportunities",
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4"
              >
                <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features / Modules ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#1B3A6B] mb-4">
              9 Powerful Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] mb-4">
              Everything your school needs, in one platform
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Enable only what your school needs. Add more modules as you grow.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative p-6 rounded-2xl border border-gray-100 bg-white hover:border-[#1B3A6B]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1B3A6B]/8 group-hover:bg-[#1B3A6B] flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-[#1B3A6B] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#1B3A6B] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-[#1B3A6B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your school goes digital in one day
            </h2>
            <p className="text-blue-300 text-lg max-w-xl mx-auto">
              No complex setup. No technical team required.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "We onboard your school",
                desc: "We set up your school on Dura Schools in one session — users, modules, branding. You don't touch a single line of code.",
              },
              {
                n: "02",
                title: "Everyone gets instant access",
                desc: "Staff, teachers, parents, and students receive login credentials and can access their own portal immediately.",
              },
              {
                n: "03",
                title: "Your school runs better",
                desc: "Admissions go digital. Parents stay informed. Directors see real-time data. Teachers use digital registers.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="relative">
                <div className="text-5xl font-bold text-[#C9A84C]/30 mb-4 select-none">
                  {n}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {title}
                </h3>
                <p className="text-blue-200/80 leading-relaxed text-sm">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 Portals ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#1B3A6B] mb-4">
              5 Dedicated Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] mb-4">
              One platform. Five experiences.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every user type gets a focused, role-specific view. No clutter, no
              confusion.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {portals.map(({ label, sub, bg, border }, i) => (
              <div
                key={label}
                className={`${bg} border ${border} rounded-2xl p-5 text-center`}
              >
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <div className="text-white font-semibold text-sm mb-1">
                  {label}
                </div>
                <div className="text-white/60 text-xs">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A6B] mb-4">
              Affordable for every school
            </h2>
            <p className="text-gray-500 text-lg">
              Monthly subscription. No setup fees. Cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map(({ name, tag, price, period, highlight, features }) => (
              <div
                key={name}
                className={`rounded-2xl p-8 flex flex-col ${highlight ? "bg-[#1B3A6B] shadow-2xl scale-[1.03]" : "bg-white border border-gray-100 shadow-sm"}`}
              >
                {highlight && (
                  <div className="inline-flex items-center bg-[#C9A84C] text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 self-start">
                    Most Popular
                  </div>
                )}
                <div
                  className={`text-xs font-semibold uppercase tracking-widest mb-2 ${highlight ? "text-blue-300" : "text-gray-400"}`}
                >
                  {tag}
                </div>
                <div
                  className={`text-2xl font-bold mb-1 ${highlight ? "text-white" : "text-[#1B3A6B]"}`}
                >
                  {name}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className={`text-xl font-semibold ${highlight ? "text-[#C9A84C]" : "text-gray-700"}`}
                  >
                    {price}
                  </span>
                  {period && (
                    <span
                      className={`text-sm ${highlight ? "text-blue-300" : "text-gray-400"}`}
                    >
                      {period}
                    </span>
                  )}
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle
                        className={`h-4 w-4 flex-shrink-0 ${highlight ? "text-[#C9A84C]" : "text-green-500"}`}
                      />
                      <span
                        className={`text-sm ${highlight ? "text-blue-100" : "text-gray-600"}`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-in"
                  className={`w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-xl text-sm transition-all hover:gap-3 ${highlight ? "bg-[#C9A84C] hover:bg-[#b8933d] text-white" : "bg-[#1B3A6B] hover:bg-[#152d54] text-white"}`}
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-[#1B3A6B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to bring your school into the digital age?
          </h2>
          <p className="text-blue-200/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join the schools already using Dura Schools to modernize their
            operations and improve student outcomes.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8933d] text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:gap-3"
          >
            Request a Free Demo <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <a
              href="mailto:info@duraschools.com"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
            >
              <Mail className="h-4 w-4" /> info@duraschools.com
            </a>
            <a
              href="tel:+251984881662"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
            >
              <Phone className="h-4 w-4" /> +251 984 881 662
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0f2347] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-lg font-bold text-white">Dura</span>
              <span className="text-lg font-light text-gray-500">Schools</span>
            </div>
            <p className="text-xs text-gray-600">
              A product of Dura Tech · Made in Ethiopia
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
          <p className="text-xs text-gray-600">
            © 2026 Dura Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
