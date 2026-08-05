import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProgressRing } from "@/components/ProgressRing";
import { useAuth } from "@/hooks/useAuth";
import {
  DEFAULT_EXAM_DATE,
  formatClock,
  loadSessionLog,
  type CompletedSession,
} from "@/lib/focus-session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PadiDa — NEET PG 2026 Last-Mile Revision" },
      {
        name: "description",
        content:
          "PadiDa is a NEET PG 2026 sprint app: hard-lockout focus timer, question bank, PYQs, mocks, flashcards and cheatsheets. 30 days. 200 questions. No excuses.",
      },
      { property: "og:title", content: "PadiDa — NEET PG 2026 Sprint" },
      {
        property: "og:description",
        content: "Focus-locked NEET PG revision. 30 days. 200 questions. No excuses.",
      },
    ],
  }),
  component: Index,
});

const MODULES = [
  { label: "Question Bank", icon: "quiz", note: "Subject → topic drills", to: "/bank" as const },
  { label: "PYQ Vault", icon: "history_edu", note: "Tagged by year & repeats", to: "/pyq" as const },
  { label: "Analytics", icon: "monitoring", note: "Accuracy & weak areas", to: "/tracker" as const },
  { label: "Fill the bank", icon: "cloud_download", note: "Web-researched Qs", to: "/bank/fill" as const },
  { label: "Mock Tests", icon: "timer", note: "200 Q · 3h30m · NBE" },
  { label: "Rapid Quiz", icon: "bolt", note: "Rapid-fire, 5–15 Q" },
  { label: "Flashcards", icon: "style", note: "Spaced repetition" },
  { label: "Cheatsheets", icon: "description", note: "High-yield one-pagers" },
];

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function useCountdown(dateStr: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(`${dateStr}T09:00:00+05:30`).getTime();
  if (now === null) return null;
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Index() {
  const { user, displayName } = useAuth();
  const countdown = useCountdown(DEFAULT_EXAM_DATE);
  const [log, setLog] = useState<CompletedSession[]>([]);
  useEffect(() => setLog(loadSessionLog()), []);

  const todayKey = new Date().toDateString();
  const todaySessions = log.filter((s) => new Date(s.startedAt).toDateString() === todayKey);
  const todaySec = todaySessions.reduce((acc, s) => acc + s.actualDurationSec, 0);
  const dailyTargetSec = 4 * 60 * 60;
  const name = (displayName || user?.email?.split("@")[0] || "Doctor").split(" ")[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow">Preparation console</p>
          <h1 className="text-3xl sm:text-4xl">
            {greeting()}, {name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            30 days. 200 questions. No excuses.
          </p>
        </div>
        {user ? (
          <Link to="/tracker" className="btn-base btn-ghost text-xs">
            <Icon name="monitoring" className="text-[16px]" />
            My analytics
          </Link>
        ) : (
          <Link to="/auth" className="btn-base btn-ghost text-xs">
            <Icon name="login" className="text-[16px]" />
            Sign in to sync
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Countdown */}
        <section className="card-surface overflow-hidden lg:col-span-7">
          <div className="card-head">
            <span className="label-eyebrow">Exam countdown · 30 Aug 2026</span>
            <Icon name="event" className="text-[20px] text-primary" />
          </div>
          <div className="grid grid-cols-4 gap-3 p-5">
            {[
              ["Days", countdown?.days],
              ["Hrs", countdown?.hours],
              ["Min", countdown?.minutes],
              ["Sec", countdown?.seconds],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-xl border border-border bg-surface-2 px-2 py-4 text-center"
              >
                <p className="font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                  {value === undefined || value === null ? "--" : String(value).padStart(2, "0")}
                </p>
                <p className="label-eyebrow mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Focus lock */}
        <section className="card-surface overflow-hidden lg:col-span-5">
          <div className="card-head">
            <span className="label-eyebrow">Focus lock · today</span>
            <Icon name="lock_clock" className="text-[20px] text-primary" />
          </div>
          <div className="flex items-center gap-4 p-5">
            <ProgressRing progress={Math.min(1, todaySec / dailyTargetSec)} size={104} strokeWidth={9}>
              <span className="font-mono text-base font-bold tabular-nums">{formatClock(todaySec)}</span>
              <span className="label-eyebrow">today</span>
            </ProgressRing>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {todaySessions.length} session{todaySessions.length === 1 ? "" : "s"} done · target 4h.
                Try to escape mid-session and the deterrent plays.
              </p>
              <Link to="/focus" className="btn-base btn-primary mt-3 w-full text-sm">
                <Icon name="lock" className="text-[18px]" />
                Start lock-in
              </Link>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="card-surface overflow-hidden lg:col-span-12">
          <div className="card-head">
            <span className="label-eyebrow">Study modules</span>
            <Link to="/bank" className="text-xs font-bold text-primary">
              Open QBank
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 lg:grid-cols-4">
            {MODULES.map((m) => {
              const body = (
                <>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-primary">
                    <Icon name={m.icon} className="text-[22px]" />
                  </span>
                  <p className="mt-3 text-sm font-bold leading-tight">{m.label}</p>
                  <p className="text-xs leading-tight text-muted-foreground">{m.note}</p>
                  <p className="label-eyebrow mt-2 text-primary">
                    {"to" in m ? "Open" : "Coming soon"}
                  </p>
                </>
              );
              return "to" in m && m.to ? (
                <Link
                  key={m.label}
                  to={m.to}
                  className="rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2"
                >
                  {body}
                </Link>
              ) : (
                <div
                  key={m.label}
                  className="rounded-xl border border-dashed border-border bg-surface-2/50 p-4 opacity-70"
                >
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        {log.length > 0 && (
          <section className="card-surface overflow-hidden lg:col-span-12">
            <div className="card-head">
              <span className="label-eyebrow">Recent focus sessions</span>
              <Icon name="history" className="text-[20px] text-muted-foreground" />
            </div>
            <table className="w-full text-left">
              <tbody>
                {log.slice(0, 6).map((s) => (
                  <tr key={s.startedAt} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-3 text-sm font-semibold">{s.subject ?? "General revision"}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">
                      {formatClock(s.actualDurationSec)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`chip ${s.completed ? "text-success" : "text-destructive"}`}
                      >
                        {s.completed ? "Completed" : "Bailed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
}
