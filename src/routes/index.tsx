import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoalCountdown } from "@/components/GoalCountdown";
import { ProgressRing } from "@/components/ProgressRing";
import { Badge, Icon } from "@/components/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useAuth } from "@/hooks/useAuth";
import { doctorName } from "@/lib/doctor-name";

import { formatClock, loadSessionLog, type CompletedSession } from "@/lib/focus-session";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "PG Prep — NEET PG Revision Console" },
      {
        name: "description",
        content:
          "PG Prep is a NEET PG sprint app by Learners Studio: hard-lockout focus timer, 23,000+ question bank, PYQ vault, subject modules, video lectures and analytics.",
      },
      { property: "og:title", content: "PG Prep — NEET PG Revision Console" },
      {
        property: "og:description",
        content: "Focus-locked NEET PG revision. Questions, PYQs, concepts, analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MODULES = [
  {
    label: "Subject Modules",
    icon: "menu_book",
    note: "Concepts with real figures",
    to: "/learn" as const,
  },
  { label: "Question Bank", icon: "quiz", note: "Subject → topic drills", to: "/bank" as const },
  {
    label: "Mock Tests",
    icon: "timer",
    note: "Timed, exam-clock papers",
    to: "/mock" as const,
  },
  {
    label: "Daily Challenge",
    icon: "bolt",
    note: "10 questions, keep the streak",
    to: "/daily" as const,
  },
  {
    label: "PYQ Vault",
    icon: "history_edu",
    note: "Tagged by year & repeats",
    to: "/pyq" as const,
  },
  { label: "Video Modules", icon: "play_circle", note: "Curated lectures", to: "/videos" as const },
  { label: "Papers", icon: "description", note: "Downloadable PYQ papers", to: "/papers" as const },
  {
    label: "Analytics",
    icon: "monitoring",
    note: "Accuracy & weak areas",
    to: "/tracker" as const,
  },
  {
    label: "Fill the bank",
    icon: "cloud_download",
    note: "Web-researched Qs",
    to: "/bank/fill" as const,
  },
  { label: "Flashcards", icon: "style", note: "Spaced repetition" },
  { label: "Cheatsheets", icon: "sticky_note_2", note: "High-yield one-pagers" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Index() {
  const { user, displayName } = useAuth();

  const [log, setLog] = useState<CompletedSession[]>([]);
  const [hello, setHello] = useState("Hello");
  useEffect(() => {
    setLog(loadSessionLog());
    setHello(greeting());
  }, []);

  const todayKey = new Date().toDateString();
  const todaySessions = log.filter((s) => new Date(s.startedAt).toDateString() === todayKey);
  const todaySec = todaySessions.reduce((acc, s) => acc + s.actualDurationSec, 0);
  const dailyTargetSec = 4 * 60 * 60;
  const name = doctorName(displayName, user?.email);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="label-eyebrow">
            {hello}, {name}
          </p>
          <h1 className="mt-2 text-4xl leading-[1.05] sm:text-5xl">
            <span className="text-gradient">NEET PG Revision Console</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Focus-locked study sprints, a 23,000+ question bank, PYQ vault and accuracy
            analytics — lock in, drill the vault, and watch the numbers move.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary" tooltip="Questions available across all subjects">
            23,000+ Qs
          </Badge>
          <Badge tone="success" tooltip="Deterrent video plays if you bail mid-session">
            Focus lock
          </Badge>
          {user ? (
            <Link to="/tracker" className="btn-base btn-ghost text-xs">
              <Icon name="monitoring" className="text-[16px]" />
              My analytics
            </Link>
          ) : (
            <Link to="/auth" className="btn-base btn-primary text-xs">
              <Icon name="login" className="text-[16px]" />
              Sign in to sync
            </Link>
          )}
        </div>
      </motion.div>

      {/* Asymmetric 60/40 rhythm */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-10 lg:gap-10">
        {/* Wide side — learning pathways */}
        <div className="flex flex-col gap-12 lg:col-span-6">
          <section>
            <div className="mb-6 flex items-center gap-6">
              <h2 className="shrink-0 text-xl font-semibold">Learning pathways</h2>
              <span className="fade-rule flex-1" />
              <Link
                to="/bank"
                className="shrink-0 text-xs font-semibold text-primary transition-colors duration-300 ease-out hover:text-accent"
              >
                Open QBank →
              </Link>
            </div>

            <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {MODULES.map((m) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-tint text-primary transition-transform duration-500 ease-out group-hover:scale-110">
                      <Icon name={m.icon} className="text-[22px]" />
                    </span>
                    <div className="mt-5">
                      <p className="text-base font-semibold leading-tight">{m.label}</p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">{m.note}</p>
                    </div>
                  </>
                );
                return (
                  <StaggerItem key={m.label} className="h-full">
                    {"to" in m && m.to ? (
                      <Link
                        to={m.to}
                        className="group flex h-full flex-col rounded-[2rem] bg-white/5 p-6 ring-1 ring-inset ring-glass-line transition-all duration-500 ease-out hover:bg-white/10 hover:ring-primary/25 hover:glow-ring"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="group flex h-full flex-col rounded-[2rem] bg-white/[0.02] p-6 opacity-50">
                        {body}
                        <p className="label-eyebrow mt-3">Coming soon</p>
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </section>

          {log.length > 0 && (
            <Reveal delay={0.05}>
              <section>
                <div className="mb-4 flex items-center gap-6">
                  <h2 className="shrink-0 text-xl font-semibold">Recent focus sessions</h2>
                  <span className="fade-rule flex-1" />
                </div>
                <ul className="flex flex-col gap-2">
                  {log.slice(0, 6).map((s) => (
                    <li
                      key={s.startedAt}
                      className="flex items-center gap-4 rounded-full px-5 py-3 transition-colors duration-500 ease-out hover:bg-white/5"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {s.subject ?? "General revision"}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {formatClock(s.actualDurationSec)}
                      </span>
                      <Badge tone={s.completed ? "success" : "destructive"}>
                        {s.completed ? "Completed" : "Bailed"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}
        </div>

        {/* Narrow side — goal + focus rail */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Reveal>
            <GoalCountdown />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card-surface p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Focus lock</h3>
                <span className="chip text-primary">Today</span>
              </div>

              <div className="flex flex-col items-center py-7">
                <ProgressRing
                  progress={Math.min(1, todaySec / dailyTargetSec)}
                  size={150}
                  strokeWidth={8}
                >
                  <span className="font-mono text-2xl font-bold tabular-nums">
                    {formatClock(todaySec)}
                  </span>
                  <span className="label-eyebrow">today</span>
                </ProgressRing>
              </div>

              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                {todaySessions.length} session{todaySessions.length === 1 ? "" : "s"} done · target
                4h. Try to escape mid-session and the deterrent plays.
              </p>
              <Link to="/focus" className="btn-base btn-primary mt-6 h-13 w-full text-sm">
                <Icon name="lock" className="text-[18px]" />
                Start lock-in
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              to="/weak-spots"
              className="group flex items-center gap-4 rounded-[2rem] bg-white/5 px-6 py-5 ring-1 ring-inset ring-glass-line transition-all duration-500 ease-out hover:bg-white/10 hover:ring-primary/25"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tint text-primary">
                <Icon name="crisis_alert" className="text-[20px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Weak spots</span>
                <span className="block text-xs text-muted-foreground">
                  Topics dragging your accuracy
                </span>
              </span>
              <Icon
                name="chevron_right"
                className="text-[20px] text-muted-foreground transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
