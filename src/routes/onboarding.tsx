import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Primitives";
import { ProgressBar } from "@/components/game/Widgets";
import { MascotSays } from "@/components/mascot/Mascot";
import { useAuth } from "@/hooks/useAuth";
import { DAILY_GOALS, updateGameSettings } from "@/lib/gamification";
import { markOnboarded, saveExamDate } from "@/lib/onboarding";
import { USERNAME_RE, normaliseUsername, setUsername } from "@/lib/social";
import { setActiveTrack, slugOf, type TrackId } from "@/lib/track-state";
import { TRACK_LIST, TRACKS } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  staticData: { sitemap: false },
  head: () => ({ meta: [{ title: "Set up your prep — Learners Studio" }] }),
  component: Onboarding,
});

const STEPS = ["Exam", "Exam date", "Daily goal", "Username"] as const;

/** A sensible default exam date: NEET UG is usually the first Sunday of May. */
function defaultDate(track: TrackId) {
  const now = new Date();
  if (track === "neet_ug") {
    const year = now.getMonth() >= 4 ? now.getFullYear() + 1 : now.getFullYear();
    const d = new Date(year, 4, 1);
    while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    return d;
  }
  const d = new Date(now);
  d.setMonth(d.getMonth() + 6);
  return d;
}

const toInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function Onboarding() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState<TrackId | null>(null);
  const [date, setDate] = useState("");
  const [goal, setGoal] = useState<number>(50);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) return null;

  const t = track ? TRACKS[track] : null;

  const next = async () => {
    setError("");
    setBusy(true);
    try {
      if (step === 0 && track) {
        setActiveTrack(track);
        setDate((d) => d || toInput(defaultDate(track)));
      } else if (step === 1 && track && date) {
        await saveExamDate(track, `${TRACKS[track].name} exam`, new Date(`${date}T09:00:00`));
      } else if (step === 2) {
        await updateGameSettings({ dailyGoal: goal }).catch(() => undefined);
      } else if (step === 3) {
        const clean = normaliseUsername(name);
        if (clean) {
          if (!USERNAME_RE.test(clean))
            throw new Error("3–20 characters: letters, numbers and _ only.");
          await setUsername(clean);
        }
        await markOnboarded();
        setDone(true);
        return;
      }
      setStep((s) => s + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const finishLater = async () => {
    await markOnboarded();
    if (track) void navigate({ to: "/$track", params: { track: slugOf(track) } });
    else void navigate({ to: "/" });
  };

  const canNext =
    step === 0 ? Boolean(track) : step === 1 ? Boolean(date) : step === 2 ? Boolean(goal) : true;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-6 sm:px-6 lg:py-10">
      <header className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-display text-lg font-bold">
          <BrandMark />
          Learners <span className="text-primary">Studio</span>
        </span>
        {!done ? (
          <button
            type="button"
            className="text-xs text-muted-foreground underline"
            onClick={() => void finishLater()}
          >
            Skip setup
          </button>
        ) : null}
      </header>

      {!done ? (
        <>
          <div className="mt-6">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {STEPS.map((s, i) => (
                <span key={s} className={cn(i <= step && "text-primary")}>
                  {s}
                </span>
              ))}
            </div>
            <ProgressBar
              value={(step + 1) / STEPS.length}
              color="var(--color-primary)"
              className="mt-2 h-3"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="mt-8 flex-1"
            >
              {step === 0 ? (
                <>
                  <MascotSays mood="happy" size={80}>
                    Hi, I'm Dr. Pulse! Let's set up your prep in four quick steps. Which exam are
                    you preparing for?
                  </MascotSays>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {TRACK_LIST.map((tr) => (
                      <button
                        key={tr.id}
                        type="button"
                        onClick={() => setTrack(tr.id)}
                        aria-pressed={track === tr.id}
                        className={cn(
                          "card-pop p-5 text-left transition-all",
                          track === tr.id
                            ? "ring-4 ring-primary/60"
                            : "hover:ring-2 hover:ring-primary/30",
                        )}
                      >
                        <p className="font-display text-2xl font-bold">{tr.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{tr.tagline}</p>
                      </button>
                    ))}
                  </div>
                </>
              ) : step === 1 ? (
                <>
                  <MascotSays mood="think" size={80}>
                    When is your {t?.name} exam? I'll count down the days and pace your plan.
                  </MascotSays>
                  <label className="mt-6 block">
                    <span className="label-eyebrow">Exam date</span>
                    <input
                      type="date"
                      value={date}
                      min={toInput(new Date())}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-2 w-full rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-3 text-base outline-none focus:border-primary"
                    />
                  </label>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Not announced yet? Keep the suggested date. You can change it any time on the
                    dashboard.
                  </p>
                </>
              ) : step === 2 ? (
                <>
                  <MascotSays mood="fire" size={80}>
                    How much do you want to do each day? Hitting your goal keeps your streak alive.
                  </MascotSays>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {DAILY_GOALS.map((g) => (
                      <button
                        key={g.xp}
                        type="button"
                        onClick={() => setGoal(g.xp)}
                        aria-pressed={goal === g.xp}
                        className={cn(
                          "card-pop flex items-center justify-between p-4 text-left",
                          goal === g.xp
                            ? "ring-4 ring-primary/60"
                            : "hover:ring-2 hover:ring-primary/30",
                        )}
                      >
                        <span>
                          <span className="block font-display text-lg font-bold">{g.label}</span>
                          <span className="block text-xs text-muted-foreground">{g.note}</span>
                        </span>
                        <span className="font-display font-bold text-xp">{g.xp} XP</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <MascotSays mood="cheer" size={80}>
                    Last one! Pick a @username so friends can find and challenge you. Invite a
                    friend later and you both get 7 days of Pro.
                  </MascotSays>
                  <div className="mt-6 flex gap-2">
                    <span className="flex items-center rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 text-muted-foreground">
                      @
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={21}
                      placeholder="e.g. asha_md (optional)"
                      aria-label="Username"
                      className="min-w-0 flex-1 rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-3 text-base outline-none focus:border-primary"
                    />
                  </div>
                </>
              )}
            </motion.section>
          </AnimatePresence>

          {error ? (
            <p
              className="mt-4 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex gap-3">
            {step > 0 ? (
              <button
                type="button"
                className="btn-base btn-ghost h-12 px-6"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              disabled={!canNext || busy}
              onClick={() => void next()}
              className="btn-base btn-primary h-12 flex-1 text-base"
            >
              {busy
                ? "Saving…"
                : step === 3
                  ? normaliseUsername(name)
                    ? "Finish"
                    : "Skip & finish"
                  : "Continue"}
            </button>
          </div>
        </>
      ) : (
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 text-center"
        >
          <MascotSays mood="cheer" size={96} className="mx-auto max-w-md text-left">
            You're all set! Let's warm up with a few questions. I'll learn your weak spots as you
            go.
          </MascotSays>
          <div className="mx-auto mt-8 grid max-w-md gap-3">
            <Link
              to="/$track/practice"
              params={{ track: slugOf(track ?? "neet_pg") }}
              className="btn-base btn-primary h-13 text-base"
            >
              <Icon name="play_arrow" filled className="text-[22px]" />
              Start the warm-up
            </Link>
            <Link
              to="/$track"
              params={{ track: slugOf(track ?? "neet_pg") }}
              className="btn-base btn-ghost h-12 text-sm"
            >
              Go to my dashboard
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
}
