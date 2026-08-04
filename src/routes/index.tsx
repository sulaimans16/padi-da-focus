import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProgressRing } from "@/components/ProgressRing";
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

const FEATURES = [
  { label: "Question Bank", icon: "🧠", note: "Subject → topic drills", to: "/bank" as const },
  { label: "PYQs", icon: "🔥", note: "Tagged by year & repeats", to: "/pyq" as const },
  { label: "Mock Tests", icon: "⏱️", note: "200 Q · 3h30m · NBE" },
  { label: "Quizzes", icon: "⚡", note: "Rapid-fire, 5–15 Q" },
  { label: "Flashcards", icon: "🗂️", note: "Spaced repetition" },
  { label: "Cheatsheets", icon: "📄", note: "High-yield one-pagers" },
  { label: "Analytics", icon: "📊", note: "Weak-area heatmap" },
  { label: "Planner", icon: "🗓️", note: "Day-by-day allocation" },
];

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

function Index() {
  const countdown = useCountdown(DEFAULT_EXAM_DATE);
  const [log, setLog] = useState<CompletedSession[]>([]);
  useEffect(() => setLog(loadSessionLog()), []);

  const todayKey = new Date().toDateString();
  const todaySessions = log.filter((s) => new Date(s.startedAt).toDateString() === todayKey);
  const todaySec = todaySessions.reduce((acc, s) => acc + s.actualDurationSec, 0);
  const dailyTargetSec = 4 * 60 * 60;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <header className="flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Padi<span className="text-primary">Da</span>
          </h1>
          <p className="text-xs text-muted-foreground">30 days. 200 questions. No excuses.</p>
        </div>
        <span className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          NEET PG 2026
        </span>
      </header>

      <section className="card-surface mt-5 p-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Exam countdown · 30 Aug 2026
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2 text-center">
          {[
            ["Days", countdown?.days],
            ["Hrs", countdown?.hours],
            ["Min", countdown?.minutes],
            ["Sec", countdown?.seconds],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-md bg-surface-2 px-2 py-3">
              <p className="font-mono text-2xl font-bold tabular-nums text-primary">
                {value === undefined || value === null ? "--" : String(value).padStart(2, "0")}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 flex flex-col items-center gap-4 rounded-lg border border-primary/40 bg-surface p-5 sm:flex-row sm:items-center">
        <ProgressRing progress={Math.min(1, todaySec / dailyTargetSec)} size={120} strokeWidth={10}>
          <span className="font-mono text-lg font-bold tabular-nums">{formatClock(todaySec)}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">today</span>
        </ProgressRing>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold">Focus Lock</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {todaySessions.length} session{todaySessions.length === 1 ? "" : "s"} done · target 4h.
            Try to escape mid-session and the nag video plays.
          </p>
          <Link to="/focus" className="btn-base btn-primary mt-3 w-full sm:w-auto">
            Start lock-in 🔒
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Study modules</h2>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.label} className="card-surface p-3 opacity-60">
              <span className="text-xl">{f.icon}</span>
              <p className="mt-1 text-sm font-semibold leading-tight">{f.label}</p>
              <p className="text-[11px] leading-tight text-muted-foreground">{f.note}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-primary">Next up</p>
            </div>
          ))}
        </div>
      </section>

      {log.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
            Recent focus sessions
          </h2>
          <ul className="mt-2 divide-y divide-border overflow-hidden rounded-lg border border-border">
            {log.slice(0, 6).map((s) => (
              <li key={s.startedAt} className="flex items-center justify-between bg-surface px-3 py-2 text-sm">
                <span className="truncate">{s.subject ?? "General revision"}</span>
                <span className="flex items-center gap-3 font-mono text-xs">
                  <span className="tabular-nums">{formatClock(s.actualDurationSec)}</span>
                  <span className={s.completed ? "text-success" : "text-destructive"}>
                    {s.completed ? "done" : "bailed"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
