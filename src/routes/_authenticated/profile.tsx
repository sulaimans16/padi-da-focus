import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import { CountUp, Reveal, SPRING } from "@/components/motion/Reveal";
import { BadgeGrid, LevelBar, StreakFlame } from "@/components/game/Widgets";
import { useAuth } from "@/hooks/useAuth";
import { useGameState } from "@/hooks/useGameState";
import { doctorName } from "@/lib/doctor-name";
import { SignOutButton } from "@/components/SignOutButton";
import { BADGES, DAILY_GOALS, updateGameSettings } from "@/lib/gamification";
import { todayKey } from "@/lib/quiz";
import { isMuted, setMuted } from "@/lib/sfx";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/profile")({
  staticData: { sitemap: false },
  head: () => ({ meta: [{ title: "Profile & Badges — PG Prep" }] }),
  component: Profile,
});

const WEEKS = 15;

/** GitHub-style activity grid: one cell per day, brightness by XP vs goal. */
function StreakCalendar({
  history,
  goal,
}: {
  history: { day: string; xp: number }[];
  goal: number;
}) {
  const map = new Map(history.map((h) => [h.day, h.xp]));
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (WEEKS * 7 - 1) - end.getDay());
  const days: Date[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(new Date(d));
  return (
    <div className="overflow-x-auto pb-1">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1.5">
        {days.map((d) => {
          const xp = map.get(todayKey(d)) ?? 0;
          const ratio = goal ? xp / goal : 0;
          return (
            <span
              key={d.toISOString()}
              title={`${d.toDateString()}: ${xp} XP`}
              className="h-3.5 w-3.5 rounded-[5px]"
              style={{
                backgroundColor:
                  xp === 0
                    ? "color-mix(in oklab, var(--color-surface-3) 70%, transparent)"
                    : ratio >= 1
                      ? `color-mix(in oklab, var(--color-streak) ${Math.min(100, 60 + ratio * 15)}%, transparent)`
                      : `color-mix(in oklab, var(--color-xp) ${25 + ratio * 40}%, transparent)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Profile() {
  const { user, displayName } = useAuth();
  const { state, level, rank } = useGameState();
  const [muted, setMutedState] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setMutedState(isMuted()), []);

  const name = doctorName(displayName, user?.email);
  const goal = state?.dailyGoal ?? 50;

  const save = async (key: string, input: Parameters<typeof updateGameSettings>[0]) => {
    setSaving(key);
    setError(null);
    try {
      await updateGameSettings(input);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save");
    } finally {
      setSaving(null);
    }
  };

  const tiles = [
    {
      label: "Total XP",
      value: <CountUp value={state?.xpTotal ?? 0} />,
      icon: "bolt",
      color: "var(--color-xp)",
    },
    {
      label: "Longest streak",
      value: `${state?.longestStreak ?? 0} days`,
      icon: "local_fire_department",
      color: "var(--color-streak)",
    },
    {
      label: "Best combo",
      value: `${state?.bestCombo ?? 0}×`,
      icon: "whatshot",
      color: "var(--color-destructive)",
    },
    {
      label: "Streak freezes",
      value: `${state?.streakFreezes ?? 0} / 2`,
      icon: "ac_unit",
      color: "var(--color-accent)",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Reveal>
        <div className="card-pop flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <motion.span
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={SPRING}
            className="flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-[2rem] bg-gem/20 font-display text-4xl font-bold uppercase text-gem ring-4 ring-gem/30"
          >
            {name.replace(/^Dr\.?\s*/i, "").slice(0, 1) || "D"}
          </motion.span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl">{name}</h1>
              <span className="chip text-gem">
                <Icon name={rank.icon} filled className="text-[14px]" />
                {rank.title}
              </span>
            </div>
            <div className="mt-4">
              <LevelBar
                level={level.level}
                progress={level.progress}
                xpTotal={state?.xpTotal ?? 0}
                next={level.next}
                rankTitle={`${(level.next - (state?.xpTotal ?? 0)).toLocaleString()} XP to level ${level.level + 1}`}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: i * 0.05 }}
              className="card-pop p-4"
            >
              <Icon name={t.icon} filled className="text-[26px]" />
              <p
                className="mt-2 font-display text-2xl font-bold tabular-nums"
                style={{ color: t.color }}
              >
                {t.value}
              </p>
              <p className="label-eyebrow mt-0.5">{t.label}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <section className="card-pop mt-5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Streak</h2>
            <StreakFlame
              streak={state?.streak ?? 0}
              lit={Boolean(state?.streakExtendedToday)}
              size="md"
            />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Hit your daily goal to extend it. Streak freezes cover a missed day automatically. Earn
            one every 7 days, or by clearing all three daily quests.
          </p>
          <div className="mt-5">
            <StreakCalendar history={state?.history ?? []} goal={goal} />
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-surface-3" /> No XP
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-xp/50" /> Some XP
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-streak" /> Goal met
            </span>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="card-pop mt-5 p-6">
          <h2 className="text-xl font-semibold">Daily goal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a pace you can keep every day. Consistency beats intensity.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DAILY_GOALS.map((g) => {
              const active = goal === g.xp;
              return (
                <button
                  key={g.xp}
                  type="button"
                  disabled={saving === "goal"}
                  onClick={() => void save("goal", { dailyGoal: g.xp })}
                  data-state={active ? "selected" : undefined}
                  className="option-tile flex-col items-start gap-1"
                >
                  <span className="font-display text-lg font-bold">{g.label}</span>
                  <span className="text-sm font-bold text-xp">{g.xp} XP / day</span>
                  <span className="text-xs text-muted-foreground">{g.note}</span>
                </button>
              );
            })}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="card-pop mt-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Badges</h2>
            <span className="chip">
              {state?.badges.length ?? 0} / {BADGES.length}
            </span>
          </div>
          <div className="mt-5">
            <BadgeGrid unlocked={state?.badges ?? []} />
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.12}>
        <section className="card-pop mt-5 divide-y-2 divide-glass-line">
          {[
            {
              key: "sound",
              icon: muted ? "volume_off" : "volume_up",
              title: "Sound effects",
              note: "Dings, combos and fanfares while you practise",
              on: !muted,
              toggle: () => {
                setMuted(!muted);
                setMutedState(!muted);
              },
            },
            {
              key: "league",
              icon: "trophy",
              title: "Weekly leagues",
              note: "Compete with up to 30 learners each week. Turn off if competition stresses you.",
              on: !(state?.leagueOptOut ?? false),
              toggle: () => void save("league", { leagueOptOut: !(state?.leagueOptOut ?? false) }),
            },
          ].map((row) => (
            <div key={row.key} className="flex items-center gap-4 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-tint text-primary">
                <Icon name={row.icon} filled className="text-[20px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.note}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={row.on}
                aria-label={row.title}
                disabled={saving === row.key}
                onClick={row.toggle}
                className={cn(
                  "relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300",
                  row.on ? "bg-success" : "bg-surface-3",
                )}
              >
                <motion.span
                  layout
                  transition={SPRING}
                  className={cn(
                    "absolute top-1 h-6 w-6 rounded-full bg-white shadow",
                    row.on ? "right-1" : "left-1",
                  )}
                />
              </button>
            </div>
          ))}
        </section>
        {error ? (
          <p className="mt-3 text-sm text-destructive">
            {error}. Game settings switch on once the latest database update is applied.
          </p>
        ) : null}
      </Reveal>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Want the numbers behind the game?{" "}
        <Link to="/tracker" className="font-semibold text-primary">
          Open your analytics →
        </Link>
      </p>
    </div>
  );
}
