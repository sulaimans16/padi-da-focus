import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoalCountdown } from "@/components/GoalCountdown";
import { ProgressRing } from "@/components/ProgressRing";
import { Badge, GlassCard, Icon } from "@/components/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useAuth } from "@/hooks/useAuth";
import { doctorName } from "@/lib/doctor-name";

import { formatClock, loadSessionLog, type CompletedSession } from "@/lib/focus-session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PadiDa — NEET PG Last-Mile Revision Console" },
      {
        name: "description",
        content:
          "PadiDa is a NEET PG sprint app: hard-lockout focus timer, 23,000+ question bank, PYQ vault, subject modules, video lectures and analytics.",
      },
      { property: "og:title", content: "PadiDa — NEET PG Revision Console" },
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
  { label: "Mock Tests", icon: "timer", note: "200 Q · 3h30m · NBE" },
  { label: "Rapid Quiz", icon: "bolt", note: "Rapid-fire, 5–15 Q" },
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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="label-eyebrow">Preparation console</p>
          <h1 className="mt-1 text-4xl leading-[1.05] sm:text-5xl">
            <span className="text-gradient">
              {hello}, {name}
            </span>
          </h1>
          <p className="mt-2.5 max-w-md text-sm text-muted-foreground">
            Lock in, drill the vault, and watch the numbers move. One session at a time.
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

      {/* Bento grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <GoalCountdown />

        {/* Focus lock */}
        <Reveal delay={0.05} className="lg:col-span-5">
          <GlassCard interactive className="h-full">
            <div className="card-head">
              <span className="label-eyebrow">Focus lock · today</span>
              <Icon name="lock_clock" className="text-[20px] text-primary" />
            </div>
            <div className="flex flex-col items-center gap-5 p-6 sm:flex-row">
              <ProgressRing
                progress={Math.min(1, todaySec / dailyTargetSec)}
                size={104}
                strokeWidth={9}
              >
                <span className="font-mono text-base font-bold tabular-nums">
                  {formatClock(todaySec)}
                </span>
                <span className="label-eyebrow">today</span>
              </ProgressRing>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  {todaySessions.length} session{todaySessions.length === 1 ? "" : "s"} done · target
                  4h. Try to escape mid-session and the deterrent plays.
                </p>
                <Link to="/focus" className="btn-base btn-primary mt-4 w-full text-sm">
                  <Icon name="lock" className="text-[18px]" />
                  Start lock-in
                </Link>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Modules */}
        <Reveal delay={0.1} className="lg:col-span-12">
          <GlassCard>
            <div className="card-head">
              <span className="label-eyebrow">Study modules</span>
              <Link
                to="/bank"
                className="text-xs font-semibold text-primary transition-colors duration-300 ease-out hover:text-accent"
              >
                Open QBank →
              </Link>
            </div>
            <Stagger className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 lg:grid-cols-4">
              {MODULES.map((m) => {
                const body = (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-primary transition-transform duration-300 ease-out group-hover:scale-110">
                      <Icon name={m.icon} className="text-[22px]" />
                    </span>
                    <p className="mt-3.5 text-sm font-semibold leading-tight">{m.label}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{m.note}</p>
                    <p className="label-eyebrow mt-2.5 text-primary">
                      {"to" in m ? "Open" : "Coming soon"}
                    </p>
                  </>
                );
                return (
                  <StaggerItem key={m.label} className="h-full">
                    {"to" in m && m.to ? (
                      <Link
                        to={m.to}
                        className="group flex h-full flex-col rounded-2xl border border-glass-line bg-surface/50 p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-2/60 hover:glow-ring"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="group flex h-full flex-col rounded-2xl border border-dashed border-glass-line bg-surface-2/25 p-4 opacity-60">
                        {body}
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </GlassCard>
        </Reveal>

        {log.length > 0 && (
          <Reveal delay={0.05} className="lg:col-span-12">
            <GlassCard>
              <div className="card-head">
                <span className="label-eyebrow">Recent focus sessions</span>
                <Icon name="history" className="text-[20px] text-muted-foreground" />
              </div>
              <table className="w-full text-left">
                <tbody>
                  {log.slice(0, 6).map((s) => (
                    <tr
                      key={s.startedAt}
                      className="border-b border-glass-line transition-colors duration-300 ease-out last:border-0 hover:bg-surface-2/40"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium">
                        {s.subject ?? "General revision"}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono text-xs tabular-nums text-muted-foreground">
                        {formatClock(s.actualDurationSec)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Badge tone={s.completed ? "success" : "destructive"}>
                          {s.completed ? "Completed" : "Bailed"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </Reveal>
        )}
      </div>
    </div>
  );
}
