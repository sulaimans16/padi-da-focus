import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProgressRing } from "@/components/ProgressRing";
import { NagOverlay } from "@/components/NagOverlay";
import { playSuccess } from "@/lib/sfx";
import {
  SUBJECTS,
  clearActiveSession,
  formatClock,
  loadActiveSession,
  logSession,
  remainingSec,
  saveActiveSession,
  type FocusSession,
} from "@/lib/focus-session";

export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "Focus Lock — PadiDa NEET PG Sprint" },
      {
        name: "description",
        content:
          "Lock yourself into a timed NEET PG revision session. Try to escape and the PadiDa nag video plays at full volume.",
      },
      { property: "og:title", content: "Focus Lock — PadiDa" },
      {
        property: "og:description",
        content: "Hard-lockout study timer for the NEET PG final sprint. No excuses.",
      },
    ],
  }),
  component: FocusPage,
});

const PRESETS = [15, 25, 45, 60];
const GRACE_MS = 5000;

function FocusPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<FocusSession | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [nagOpen, setNagOpen] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [custom, setCustom] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [exitOpen, setExitOpen] = useState(false);
  const [exitText, setExitText] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const lastNagRef = useRef(0);
  const hiddenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rehydrate an in-flight lock so a refresh can't dodge it.
  useEffect(() => {
    const active = loadActiveSession();
    if (active) {
      setSession(active);
      setRemaining(remainingSec(active));
    }
  }, []);

  const triggerNag = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      if (Date.now() - lastNagRef.current < 1200) return prev;
      lastNagRef.current = Date.now();
      const next = { ...prev, escapeAttempts: prev.escapeAttempts + 1 };
      saveActiveSession(next);
      setNagOpen(true);
      return next;
    });
  }, []);

  const finish = useCallback(
    (completed: boolean) => {
      setSession((prev) => {
        if (prev) {
          logSession({
            startedAt: prev.startedAt,
            endedAt: Date.now(),
            plannedDurationSec: prev.durationSec,
            actualDurationSec: Math.round((Date.now() - prev.startedAt) / 1000),
            subject: prev.subject,
            escapeAttempts: prev.escapeAttempts,
            completed,
          });
        }
        return null;
      });
      clearActiveSession();
      setNagOpen(false);
      setExitOpen(false);
      setExitText("");
      if (completed) {
        playSuccess();
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 6000);
      }
    },
    [],
  );

  // Timer driven off wall clock, immune to tab throttling.
  useEffect(() => {
    if (!session) return;
    const tick = () => {
      const left = remainingSec(session);
      setRemaining(left);
      if (left <= 0) finish(true);
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [session, finish]);

  // Tab-switch / blur deterrent with grace period.
  useEffect(() => {
    if (!session) return;
    const onVisibility = () => {
      if (document.hidden) {
        hiddenTimerRef.current = setTimeout(triggerNag, GRACE_MS);
      } else if (hiddenTimerRef.current) {
        clearTimeout(hiddenTimerRef.current);
        hiddenTimerRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (hiddenTimerRef.current) clearTimeout(hiddenTimerRef.current);
    };
  }, [session, triggerNag]);

  // Back button + refresh interception.
  useEffect(() => {
    if (!session) return;
    window.history.pushState({ padidaLock: true }, "");
    const onPop = () => {
      window.history.pushState({ padidaLock: true }, "");
      triggerNag();
    };
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Timer running-a irukku da!";
      return e.returnValue;
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [session, triggerNag]);

  const start = () => {
    const dur = Math.max(1, Math.min(300, Number(custom) || minutes));
    const next: FocusSession = {
      startedAt: Date.now(),
      durationSec: dur * 60,
      subject: subject || null,
      escapeAttempts: 0,
    };
    saveActiveSession(next);
    setSession(next);
    setRemaining(next.durationSec);
    setCelebrate(false);
  };

  if (session) {
    const progress = 1 - remaining / session.durationSec;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-10">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Locked in 🔒</p>
          <h1 className="mt-1 text-2xl font-semibold">
            {session.subject ?? "General revision"}
          </h1>
        </div>

        <ProgressRing progress={progress} size={280}>
          <span className="font-mono text-5xl font-bold tabular-nums">{formatClock(remaining)}</span>
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

        <div className="w-full max-w-sm">
          {exitOpen ? (
            <div className="card-surface space-y-3 p-4">
              <p className="text-sm text-muted-foreground">
                Real emergency? Type <span className="font-mono text-destructive">I GIVE UP</span> to
                break the lock.
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
                  onClick={() => finish(false)}
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

        {nagOpen && (
          <NagOverlay attempts={session.escapeAttempts} onDismiss={() => setNagOpen(false)} />
        )}
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
        Pick a duration. Once locked, navigation is dead until the timer hits zero.
      </p>

      <div className="card-surface mt-5 space-y-5 p-4">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">Duration</p>
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
            {SUBJECTS.map((s) => (
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
          Escape attempt = padi da video, full volume. You've been warned.
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
