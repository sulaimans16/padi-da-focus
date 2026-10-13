import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProgressRing } from "@/components/ProgressRing";
import {
  endActiveSession,
  enterFullscreen,
  formatClock,
  onFocusChange,
  peekActiveSession,
  remainingSec,
  saveActiveSession,
  type FocusSession,
} from "@/lib/focus-session";
import { useTrack } from "@/hooks/useTrack";
import { localizeHead } from "@/lib/tracks";

export const Route = createFileRoute("/$track/focus")({
  staticData: { sitemap: true },
  head: ({ params }) =>
    localizeHead(params.track, {
      meta: [
        { title: "Focus Lock — PG Prep NEET PG Sprint" },
        {
          name: "description",
          content:
            "Lock yourself into a timed NEET PG revision session. Try to escape and the PG Prep focus video plays at full volume.",
        },
        { property: "og:title", content: "Focus Lock — PG Prep" },
        {
          property: "og:description",
          content: "Hard-lockout study timer for the NEET PG final sprint. No excuses.",
        },
      ],
    }),
  component: FocusPage,
});

const PRESETS = [15, 25, 45, 60];

const SHORTCUTS = [
  { to: "/$track/practice", label: "Practice", icon: "bolt" },
  { to: "/$track/bank", label: "QBank", icon: "quiz" },
  { to: "/$track/learn", label: "Learn", icon: "school" },
  { to: "/$track/flashcards", label: "Flashcards", icon: "style" },
] as const;

/**
 * The Focus Lock timer. The lock itself (countdown, escape detection, outside-link
 * block, finishing the session) lives in FocusLockLayer so it keeps running on
 * every page of the app; this page starts it and shows the big timer.
 */
function FocusPage() {
  const track = useTrack();
  const navigate = useNavigate();
  const [session, setSession] = useState<FocusSession | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [custom, setCustom] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [exitOpen, setExitOpen] = useState(false);
  const [exitText, setExitText] = useState("");
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setSession(peekActiveSession());
    return onFocusChange((change) => {
      setSession(peekActiveSession());
      if (change?.kind === "ended") {
        setExitOpen(false);
        setExitText("");
        setCelebrate(change.completed);
      }
    });
  }, []);

  useEffect(() => {
    if (!session) return;
    const tick = () => setRemaining(remainingSec(session));
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [session]);

  const start = () => {
    const dur = Math.max(1, Math.min(300, Number(custom) || minutes));
    enterFullscreen();
    setCelebrate(false);
    saveActiveSession({
      startedAt: Date.now(),
      durationSec: dur * 60,
      subject: subject || null,
      escapeAttempts: 0,
    });
  };

  if (session) {
    const progress = 1 - remaining / session.durationSec;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-10">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Locked in 🔒</p>
          <h1 className="mt-1 text-2xl font-semibold">{session.subject ?? "General revision"}</h1>
        </div>

        <ProgressRing progress={progress} size={280}>
          <span className="font-mono text-5xl font-bold tabular-nums">
            {formatClock(remaining)}
          </span>
          <span className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
            {Math.round(session.durationSec / 60)} min session
          </span>
        </ProgressRing>

        <div className="grid w-full max-w-sm grid-cols-3 gap-2 text-center">
          {[
            ["Escapes", session.escapeAttempts],
            ["Elapsed", formatClock(session.durationSec - remaining)],
            ["Done", `${Math.round(progress * 100)}%`],
          ].map(([label, value]) => (
            <div key={String(label)} className="card-surface px-2 py-3">
              <p className="font-mono text-lg font-bold tabular-nums">{value}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm text-center">
          <p className="text-sm text-muted-foreground">
            Study anywhere in the app while the timer runs. Leaving the app counts as an escape.
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                params={{ track: track.slug }}
                className="card-surface flex flex-col items-center gap-1 px-1 py-2 text-[11px] font-semibold"
              >
                <span aria-hidden className="material-symbols-outlined text-[20px] text-primary">
                  {s.icon}
                </span>
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm">
          {exitOpen ? (
            <div className="card-surface space-y-3 p-4">
              <p className="text-sm text-muted-foreground">
                Real emergency? Type <span className="font-mono text-destructive">I GIVE UP</span>{" "}
                to break the lock.
              </p>
              <input
                value={exitText}
                onChange={(e) => setExitText(e.target.value)}
                placeholder="I GIVE UP"
                className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm outline-none focus:border-ring"
              />
              <div className="flex gap-2">
                <button
                  disabled={exitText.trim() !== "I GIVE UP"}
                  onClick={() => {
                    endActiveSession(false);
                    if (document.fullscreenElement)
                      void document.exitFullscreen().catch(() => undefined);
                  }}
                  className="btn-base flex-1 bg-destructive text-destructive-foreground disabled:opacity-40"
                >
                  Break lock
                </button>
                <button onClick={() => setExitOpen(false)} className="btn-base btn-ghost flex-1">
                  Stay
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setExitOpen(true)}
              className="w-full text-center text-xs text-muted-foreground underline underline-offset-4"
            >
              Emergency exit
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg px-4 py-8">
      {celebrate && (
        <div className="card-surface mb-5 border-success/60 p-4 text-center">
          <p className="font-display text-2xl text-success">Semma! Session complete 🎉</p>
          <p className="text-sm text-muted-foreground">Kudos. Logged to your analytics.</p>
        </div>
      )}

      <h1 className="text-3xl font-bold">Focus Lock</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a duration. Once locked you can use any part of the app, but leaving it (other tabs,
        other sites) counts as an escape until the timer hits zero.
      </p>

      <div className="card-surface mt-5 space-y-5 p-4">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            Duration
          </p>
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMinutes(m);
                  setCustom("");
                }}
                className={`btn-base ${!custom && minutes === m ? "btn-primary" : "btn-ghost"}`}
              >
                {m}m
              </button>
            ))}
          </div>
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            placeholder="Custom minutes"
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            Studying (optional)
          </p>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
          >
            <option value="">General revision</option>
            {track.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button onClick={start} className="btn-base btn-primary w-full py-3.5 text-base">
          Lock in — 30 days la neeye than paakanum 🔒
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Escape attempt = {track.brand.a} Prep video, full volume. You've been warned.
        </p>
      </div>

      <button
        onClick={() => navigate({ to: "/" })}
        className="mt-5 w-full text-center text-xs text-muted-foreground underline underline-offset-4"
      >
        Back to dashboard
      </button>
    </main>
  );
}
