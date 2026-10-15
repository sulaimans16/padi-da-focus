import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Aurora } from "@/components/Aurora";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Primitives";

export const Route = createFileRoute("/partners")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "For coaching institutes — Learners Studio" },
      {
        name: "description",
        content:
          "Learners Studio for NEET PG and NEET UG coaching institutes: batch dashboards, weak-topic analytics, server-graded assignments and an AI tutor for your students between classes.",
      },
      { property: "og:title", content: "Learners Studio for coaching institutes" },
      { property: "og:site_name", content: "Learners Studio" },
    ],
  }),
  component: PartnersPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const FACULTY = [
  {
    icon: "groups",
    title: "Every student at a glance",
    body: "Questions done this week, 30-day accuracy, streak and last active, with flags for anyone inactive or below 50%.",
  },
  {
    icon: "crisis_alert",
    title: "Your batch's weak topics",
    body: "The topics the whole batch gets wrong most, so the next class or revision session targets them.",
  },
  {
    icon: "assignment",
    title: "Assignments after class",
    body: "Pick a subject, topic or PYQ year and a question count. Graded on the server, with question-by-question results.",
  },
  {
    icon: "person_add",
    title: "One link to onboard a batch",
    body: "Share a code or link in your WhatsApp group. Optionally unlock Pro for every student who joins.",
  },
];

const STUDENTS = [
  {
    icon: "neurology",
    title: "Dr. Pulse AI",
    body: "Doubts answered at 2am, grounded in their own progress.",
  },
  {
    icon: "lock_clock",
    title: "Focus Lock",
    body: "Timed study sessions that keep them inside the app.",
  },
  { icon: "style", title: "Flashcards", body: "Spaced repetition so what you teach sticks." },
  {
    icon: "bolt",
    title: "Smart Practice",
    body: "Daily sets built from their weak topics and mistakes.",
  },
];

const STEPS = [
  ["Set up your institute", "Create it in a minute and add your faculty by @username."],
  ["Create batches", "One per class group, for NEET PG or NEET UG."],
  ["Share the code", "Students join in one tap and their progress starts flowing in."],
];

function PartnersPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Aurora intensity="full" />
      <header className="sticky top-0 z-40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link to="/welcome" className="flex min-w-0 items-center gap-2">
            <BrandMark className="h-9 w-9 shrink-0" />
            <span className="whitespace-nowrap font-display text-base font-bold sm:text-lg">
              Learners <span className="text-primary">Studio</span>
            </span>
          </Link>
          <Link to="/institute" className="btn-base btn-primary h-10 shrink-0 px-4 text-sm">
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Set up your institute</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-4xl px-6 pb-16 pt-10 text-center lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs text-primary ring-1 ring-inset ring-primary/30">
              <Icon name="domain" className="text-[16px]" />
              For coaching institutes
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] tracking-tight sm:text-6xl">
              Your classes.
              <br />
              <span className="text-gradient">Our app between them.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Learners Studio works alongside your faculty, classes and test series. It doesn&apos;t
              replace them. Students practise, revise and stay consistent every day, and you see
              exactly where your batch stands before the next grand test.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/institute/demo" className="btn-base btn-primary h-12 px-7 text-sm">
                <Icon name="dashboard" className="text-[18px]" />
                See the demo dashboard
              </Link>
              <Link to="/institute" className="btn-base btn-ghost h-12 px-6 text-sm">
                Set up your institute
                <Icon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <p className="label-eyebrow text-center">For your faculty</p>
          <h2 className="mt-2 text-center text-3xl leading-tight sm:text-4xl">
            See your batch, not just their test scores.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {FACULTY.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="flex gap-4 rounded-[1.5rem] bg-white/5 p-6 ring-1 ring-inset ring-glass-line"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 ring-1 ring-inset ring-primary/25">
                  <Icon name={f.icon} className="text-[24px] text-primary" />
                </span>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <p className="label-eyebrow text-center">For your students</p>
          <h2 className="mt-2 text-center text-3xl leading-tight sm:text-4xl">
            Everything they need between classes.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STUDENTS.map((s) => (
              <div
                key={s.title}
                className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-inset ring-glass-line"
              >
                <Icon name={s.icon} className="text-[26px] text-primary" />
                <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            Plus lessons for every subject, a question bank, previous-year questions, timed mocks,
            streaks and leagues, for NEET PG and NEET UG.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <p className="label-eyebrow text-center">Getting started</p>
          <h2 className="mt-2 text-center text-3xl leading-tight sm:text-4xl">
            Live in an afternoon.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map(([title, body], i) => (
              <div
                key={title}
                className="rounded-[2rem] bg-white/5 p-7 ring-1 ring-inset ring-glass-line"
              >
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-3 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-[2rem] bg-white/5 p-7 ring-1 ring-inset ring-glass-line sm:p-9">
            <h2 className="flex items-center gap-2 text-xl">
              <Icon name="shield_person" className="text-[24px] text-primary" />
              Student privacy, built in
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <li>Students see exactly what faculty can view before they join.</li>
              <li>
                Faculty see progress on that exam only: accuracy, activity, streak and assignment
                scores.
              </li>
              <li>
                Students can leave a batch any time, and their data leaves the dashboard with them.
              </li>
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20 pt-8">
          <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-primary/10 px-6 py-12 text-center ring-1 ring-inset ring-primary/25">
            <h2 className="text-3xl leading-tight sm:text-4xl">See it with your own batch.</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Explore the demo dashboard, then set up your institute. Verified partners can unlock
              Pro for every student.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/institute/demo" className="btn-base btn-primary h-12 px-7 text-sm">
                See the demo dashboard
              </Link>
              <Link to="/institute" className="btn-base btn-ghost h-12 px-6 text-sm">
                Set up your institute
              </Link>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-glass-line px-6 py-10 text-xs text-muted-foreground sm:flex-row">
          <p>Learners Studio · For NEET UG and NEET PG coaching institutes</p>
          <nav className="flex flex-wrap justify-center gap-5 font-semibold">
            <Link to="/welcome" className="transition-colors hover:text-primary">
              For students
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
