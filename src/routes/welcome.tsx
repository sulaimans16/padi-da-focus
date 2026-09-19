import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Aurora } from "@/components/Aurora";
import { Icon } from "@/components/Primitives";
import { VideoTour } from "@/components/VideoTour";
import { BrandMark } from "@/components/BrandMark";

export const Route = createFileRoute("/welcome")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "PG Prep — Smarter NEET PG Preparation" },
      {
        name: "description",
        content:
          "PG Prep by Learners Studio: NBE-pattern question bank, eight years of PYQs, timed mocks, Focus Lock sessions and weak-spot analytics for NEET PG.",
      },
      { property: "og:title", content: "PG Prep — Smarter NEET PG Preparation" },
      {
        property: "og:description",
        content:
          "Question bank, PYQ vault, timed mocks, Focus Lock and weak-spot analytics for NEET PG aspirants.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pg-pre.learners-studio.com/welcome" },
    ],
    links: [{ rel: "canonical", href: "https://pg-pre.learners-studio.com/welcome" }],
  }),
  component: WelcomePage,
});

const HERO_POINTS = [
  { icon: "menu_book", title: "Expert-curated", sub: "study material" },
  { icon: "quiz", title: "Real exam", sub: "pattern MCQs" },
  { icon: "monitoring", title: "AI-powered", sub: "performance tracking" },
  { icon: "event_available", title: "Personalised", sub: "study plans" },
];

const FEATURES = [
  {
    icon: "school",
    title: "Subject-wise learning",
    body: "In-depth, structured concepts with figures for every major subject.",
  },
  {
    icon: "quiz",
    title: "MCQ practice",
    body: "23,000+ exam-oriented questions with detailed explanations.",
  },
  {
    icon: "timer",
    title: "Mock tests",
    body: "Timed 25 to 200 question papers that simulate the real exam.",
  },
  {
    icon: "monitoring",
    title: "Performance analytics",
    body: "Track accuracy, find weak areas and watch them improve.",
  },
  {
    icon: "support_agent",
    title: "Doubt support",
    body: "Ask the AI study tutor whenever a concept refuses to click.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Set your exam date",
    body: "A live countdown keeps every session tied to the day that matters.",
  },
  {
    n: "02",
    title: "Drill the vault",
    body: "Subject practice, tricky mode and eight years of previous-year recalls.",
  },
  {
    n: "03",
    title: "Lock in and revise",
    body: "Focus Lock sessions plus weak-spot lists tell you exactly what to fix.",
  },
];

/** Miniature app preview built from markup — no screenshots, always on-brand. */
function Preview() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 rounded-[3rem] bg-primary/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[2rem] bg-white/5 p-5 ring-1 ring-inset ring-glass-line"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm">
            Good morning, <span className="text-primary">Dr. Sulaiman</span>
          </p>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-muted-foreground">
            118 days left
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ["Study streak", "12", "days"],
            ["Accuracy", "78%", "+6% wk"],
            ["Mock score", "642", "of 1050"],
          ].map(([k, v, s]) => (
            <div
              key={k}
              className="rounded-[1.25rem] bg-white/5 p-3 ring-1 ring-inset ring-glass-line"
            >
              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{k}</p>
              <p className="mt-1 text-lg leading-none">{v}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-[1.25rem] bg-white/5 p-4 ring-1 ring-inset ring-glass-line">
          <p className="text-[11px] text-muted-foreground">Continue learning</p>
          <p className="mt-1 text-sm">General Medicine</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            ["Pathology", "85% complete"],
            ["Pharmacology", "72% complete"],
          ].map(([k, s]) => (
            <div
              key={k}
              className="rounded-[1.25rem] bg-white/5 p-3 ring-1 ring-inset ring-glass-line"
            >
              <p className="text-xs">{k}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* floating question card, like a phone resting in front of the dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-14 -left-4 w-56 lg:-left-16 rounded-[1.75rem] bg-background/80 p-4 ring-1 ring-inset ring-glass-line backdrop-blur-xl sm:-left-10"
      >
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>12 / 50</span>
          <span className="font-mono text-primary">00:38</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed">
          Most common cause of nephrotic syndrome in children?
        </p>
        <div className="mt-3 space-y-1.5">
          {["Minimal change disease", "Membranous nephropathy"].map((o, i) => (
            <p
              key={o}
              className={`rounded-full px-3 py-1.5 text-[10px] ring-1 ring-inset ${
                i === 0
                  ? "bg-primary/15 ring-primary/40"
                  : "bg-white/5 text-muted-foreground ring-glass-line"
              }`}
            >
              {o}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function WelcomePage() {
  const navigate = useNavigate();
  const [tour, setTour] = useState(false);

  const guest = () => void navigate({ to: "/", replace: true });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Aurora intensity="full" />

      <header className="sticky top-0 z-40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <BrandMark className="h-10 w-10" />
            <div className="leading-none">
              <p className="text-lg font-semibold tracking-tight">
                PG <span className="text-primary">Prep</span>
              </p>
              <p className="mt-1 text-[10px] tracking-[0.14em] text-muted-foreground">
                STUDY SMARTER. SCORE HIGHER.
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <Link to="/pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link to="/papers" className="transition-colors hover:text-foreground">
              Free papers
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/auth" className="btn-base btn-ghost h-11 px-5 text-sm">
              Login
            </Link>
            <button onClick={guest} className="btn-base btn-primary h-11 px-5 text-sm">
              Get started
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs text-primary ring-1 ring-inset ring-primary/30">
                <Icon name="school" className="text-[16px]" />
                NEET PG
              </span>
              <span className="text-xs text-muted-foreground">Your next step in medicine</span>
            </div>

            <h1 className="mt-7 text-5xl leading-[1.03] tracking-tight sm:text-6xl">
              Smarter preparation.
              <br />
              <span className="text-gradient">Higher dreams.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Comprehensive, structured NEET PG preparation — an NBE-pattern question bank, eight
              years of previous-year recalls, timed mocks, Focus Lock sessions and weak-spot
              analytics, all in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={guest} className="btn-base btn-primary h-12 px-7 text-sm">
                Login as guest
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
              <button
                onClick={() => setTour(true)}
                className="btn-base btn-ghost h-12 px-6 text-sm"
              >
                <Icon name="play_circle" className="text-[20px]" />
                Watch how it works
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {HERO_POINTS.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-glass-line">
                    <Icon name={p.icon} className="text-[18px] text-primary" />
                  </span>
                  <p className="text-xs leading-snug">
                    {p.title}
                    <br />
                    <span className="text-muted-foreground">{p.sub}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-6">
            <Preview />
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl leading-tight sm:text-4xl">
              Built for NEET PG. Designed for your success.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Everything you need to prepare smarter, stay consistent and hit your target score.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-glass-line">
                  <Icon name={f.icon} className="text-[22px] text-primary" />
                </span>
                <h3 className="mt-4 text-sm">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="label-eyebrow">The roadmap</p>
            <h2 className="mt-2 text-3xl leading-tight sm:text-4xl">Your exam. Our mission.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              From your first question to your final score — we&apos;re with you at every step.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2rem] bg-white/5 p-7 ring-1 ring-inset ring-glass-line"
              >
                <p className="font-mono text-xs text-primary">{s.n}</p>
                <h3 className="mt-3 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <button onClick={() => setTour(true)} className="btn-base btn-ghost h-12 px-6 text-sm">
              <Icon name="play_circle" className="text-[20px]" />
              Take the interactive tour
            </button>
            <p className="text-xs text-muted-foreground">
              No sign-up needed —{" "}
              <button onClick={guest} className="text-primary hover:underline">
                login as guest
              </button>{" "}
              and start practising.
            </p>
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 pb-16 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            PG Prep by Learners Studio · Built for NEET PG aspirants
          </p>
        </footer>
      </main>

      <AnimatePresence>{tour && <VideoTour onClose={() => setTour(false)} />}</AnimatePresence>
    </div>
  );
}
