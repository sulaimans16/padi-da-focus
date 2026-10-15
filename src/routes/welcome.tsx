import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Aurora } from "@/components/Aurora";
import { Icon } from "@/components/Primitives";
import { VideoTour } from "@/components/VideoTour";
import { BrandMark } from "@/components/BrandMark";
import { Showcase } from "@/components/welcome/Showcase";
import { StatsStrip } from "@/components/welcome/StatsStrip";
import { TRACKS } from "@/lib/tracks";

export const Route = createFileRoute("/welcome")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Smarter NEET UG & NEET PG Preparation — Learners Studio" },
      {
        name: "description",
        content:
          "Learners Studio: NEET UG and NEET PG tracks with teaching-first lessons, question banks, PYQs, timed mocks, Focus Lock sessions and weak-spot analytics.",
      },
      { property: "og:title", content: "Smarter NEET UG & NEET PG Preparation" },
      {
        property: "og:description",
        content:
          "Lessons, question banks, PYQ vault, timed mocks, Focus Lock and weak-spot analytics for NEET UG and NEET PG aspirants.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Learners Studio" },
      { property: "og:url", content: "https://pg-pre.learners-studio.com/welcome" },
    ],
    links: [{ rel: "canonical", href: "https://pg-pre.learners-studio.com/welcome" }],
  }),
  component: WelcomePage,
});

const FEATURES = [
  {
    icon: "school",
    title: "Teaching-first lessons",
    body: "Concepts explained from the mechanism up, with figures, checks and high-yield lines.",
  },
  {
    icon: "quiz",
    title: "QBank & PYQ vault",
    body: "Exam-pattern questions with full explanations, and real past papers by year.",
  },
  {
    icon: "timer",
    title: "Timed mocks",
    body: "25 to 200 question papers with the real marking scheme.",
  },
  {
    icon: "monitoring",
    title: "Analytics & readiness",
    body: "Accuracy by subject and topic, a readiness score and your weak spots.",
  },
  {
    icon: "neurology",
    title: "Dr. Pulse AI",
    body: "Doubts answered, progress explained and the next step suggested.",
  },
  {
    icon: "lock_clock",
    title: "Focus Lock",
    body: "Timed sessions that keep you inside the app until the timer ends.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick your exam and date",
    body: "NEET UG or NEET PG. A live countdown ties every session to the day that matters.",
  },
  {
    n: "02",
    title: "Learn, then drill",
    body: "Lessons first, then the question bank, PYQs by year and timed mocks.",
  },
  {
    n: "03",
    title: "Fix what's weak",
    body: "Readiness, weak spots and Smart Practice tell you exactly what to work on next.",
  },
];

const TRACK_CARDS = [
  {
    id: "neet_ug" as const,
    who: "Class 11–12",
    detail: "Physics · Chemistry · Botany · Zoology, aligned to NCERT.",
  },
  {
    id: "neet_pg" as const,
    who: "MBBS graduates",
    detail: "All 19 subjects with clinical vignettes, for NEET PG and INICET.",
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
            Good morning, <span className="text-primary">Dr. Asha</span>
          </p>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-muted-foreground">
            118 days left
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ["Readiness", "64", "On track"],
            ["Streak", "12", "days"],
            ["Today", "40/50", "XP goal"],
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

        <div className="mt-3 flex items-start gap-3 rounded-[1.25rem] bg-primary/10 p-4 ring-1 ring-inset ring-primary/25">
          <Icon name="neurology" className="mt-0.5 text-[20px] text-primary" />
          <p className="text-xs leading-relaxed">
            <span className="font-semibold">Dr. Pulse:</span> Renal pathology is your weakest topic
            (41%). Try a <span className="text-primary underline">Smart Practice</span> set next.
          </p>
        </div>
        <div className="mt-3 rounded-[1.25rem] bg-white/5 p-4 ring-1 ring-inset ring-glass-line">
          <p className="text-[11px] text-muted-foreground">Continue learning</p>
          <p className="mt-1 text-sm">Pathology · Renal</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
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

const EASE = [0.22, 1, 0.36, 1] as const;

function WelcomePage() {
  const navigate = useNavigate();
  const [tour, setTour] = useState(false);

  const guest = () => void navigate({ to: "/", replace: true });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Aurora intensity="full" />

      <header className="sticky top-0 z-40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
          <Link to="/welcome" className="flex min-w-0 items-center gap-2">
            <BrandMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
            <div className="leading-none">
              <p className="whitespace-nowrap text-base font-semibold tracking-tight sm:text-lg">
                Learners <span className="text-primary">Studio</span>
              </p>
              <p className="mt-1 hidden text-[10px] tracking-[0.14em] text-muted-foreground sm:block">
                NEET UG · NEET PG
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#showcase" className="transition-colors hover:text-foreground">
              Inside the app
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <Link to="/pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link to="/partners" className="transition-colors hover:text-foreground">
              For institutes
            </Link>
            <Link
              to="/$track/papers"
              params={{ track: "neet-pg" }}
              className="transition-colors hover:text-foreground"
            >
              Free papers
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link to="/auth" className="btn-base btn-ghost h-10 px-3 text-sm sm:h-11 sm:px-5">
              Login
            </Link>
            <button
              onClick={guest}
              className="btn-base btn-primary h-10 px-3 text-sm sm:h-11 sm:px-5"
            >
              <span className="sm:hidden">Start</span>
              <span className="hidden sm:inline">Get started</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-8 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs text-primary ring-1 ring-inset ring-primary/30">
              <Icon name="school" className="text-[16px]" />
              NEET UG · NEET PG
            </span>

            <h1 className="mt-7 text-5xl leading-[1.03] tracking-tight sm:text-6xl">
              Smarter preparation.
              <br />
              <span className="text-gradient">Higher dreams.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              One place to learn, practise and stay consistent, whether you&apos;re in Class 11–12
              heading for NEET UG or a doctor preparing for NEET PG. Lessons, questions, mocks and
              an AI tutor that knows your progress.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={guest} className="btn-base btn-primary h-12 px-7 text-sm">
                Start free as guest
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
            <p className="mt-4 text-xs text-muted-foreground">
              No sign-up needed to try it. Create an account to save progress.
            </p>
          </motion.div>

          <div className="lg:col-span-6">
            <Preview />
          </div>
        </section>

        <StatsStrip />

        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-8 pt-24">
          <div className="text-center">
            <p className="label-eyebrow">Everything in one place</p>
            <h2 className="mt-2 text-3xl leading-tight sm:text-4xl">
              Built for NEET UG and NEET PG.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Two separate tracks, each with its own syllabus, questions and exam pattern.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="flex gap-4 rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-inset ring-glass-line"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 ring-1 ring-inset ring-primary/25">
                  <Icon name={f.icon} className="text-[22px] text-primary" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Showcase />

        <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <div className="text-center">
            <p className="label-eyebrow">How it works</p>
            <h2 className="mt-2 text-3xl leading-tight sm:text-4xl">Your exam. Our mission.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              From your first question to your final score, we&apos;re with you at every step.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="rounded-[2rem] bg-white/5 p-7 ring-1 ring-inset ring-glass-line"
              >
                <p className="font-mono text-xs text-primary">{s.n}</p>
                <h3 className="mt-3 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {TRACK_CARDS.map((c) => {
              const t = TRACKS[c.id];
              return (
                <Link
                  key={c.id}
                  to="/$track"
                  params={{ track: t.slug }}
                  className="group flex items-center justify-between gap-4 rounded-[2rem] bg-white/5 p-7 ring-1 ring-inset ring-glass-line transition-colors hover:ring-primary/40"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {c.who}
                    </p>
                    <p className="mt-1 text-2xl font-semibold">{t.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
                  </div>
                  <Icon
                    name="arrow_forward"
                    className="shrink-0 text-[24px] text-primary transition-transform group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-primary/10 px-6 py-12 text-center ring-1 ring-inset ring-primary/25">
            <h2 className="text-3xl leading-tight sm:text-4xl">Start free in 10 seconds.</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Try lessons, questions and Focus Lock as a guest. Sign up when you want your progress,
              streak and friends saved.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={guest} className="btn-base btn-primary h-12 px-7 text-sm">
                Start free as guest
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
              <button
                onClick={() => setTour(true)}
                className="btn-base btn-ghost h-12 px-6 text-sm"
              >
                <Icon name="play_circle" className="text-[20px]" />
                Take the tour
              </button>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-glass-line px-6 py-10 text-xs text-muted-foreground sm:flex-row">
          <p>Learners Studio · Built for NEET UG and NEET PG aspirants</p>
          <nav className="flex flex-wrap justify-center gap-5 font-semibold">
            <Link to="/pricing" className="transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link
              to="/$track/papers"
              params={{ track: "neet-pg" }}
              className="transition-colors hover:text-primary"
            >
              Free papers
            </Link>
            <Link to="/partners" className="transition-colors hover:text-primary">
              For institutes
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
          </nav>
        </footer>
      </main>

      <AnimatePresence>{tour && <VideoTour onClose={() => setTour(false)} />}</AnimatePresence>
    </div>
  );
}
