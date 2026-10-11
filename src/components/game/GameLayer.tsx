import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { ConfettiBurst } from "@/components/game/Confetti";
import { GAME_QUERY_KEY, addPendingXp, clearPendingXp, useGameState } from "@/hooks/useGameState";
import {
  STREAK_MILESTONES,
  rankFor,
  badgeById,
  browserTimezone,
  emitGameEvent,
  onGameEvent,
  updateGameSettings,
  type GameEvent,
} from "@/lib/gamification";
import { playLevelUp } from "@/lib/sfx";
import { cn } from "@/lib/utils";

type Toast = { id: number; amount: number; combo: number };
type Celebration = Extract<GameEvent, { type: "celebrate" }> & { id: number };

const CELEBRATION_ICON: Record<Celebration["kind"], string> = {
  level: "military_tech",
  streak: "local_fire_department",
  badge: "workspace_premium",
  goal: "flag",
  lesson: "school",
};

const CELEBRATION_COLOR: Record<Celebration["kind"], string> = {
  level: "var(--color-gem)",
  streak: "var(--color-streak)",
  badge: "var(--color-xp)",
  goal: "var(--color-success)",
  lesson: "var(--color-primary)",
};

let seq = 0;

/**
 * Mounted once at the app root: keeps server state fresh after answers, shows the
 * floating XP toasts, and turns state transitions (level up, streak, badges) into
 * full-screen celebrations.
 */
export function GameLayer() {
  const qc = useQueryClient();
  const { state, level, rank, dataUpdatedAt, serverReady } = useGameState();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Celebration[]>([]);
  const [confetti, setConfetti] = useState(0);
  const syncTimer = useRef<number | null>(null);
  const prev = useRef<{ level: number; extended: boolean; badges: Set<string>; source: string } | null>(null);
  const tzSynced = useRef(false);

  // Event bus → toasts, pending XP, debounced refetch, celebrations.
  useEffect(
    () =>
      onGameEvent((e) => {
        if (e.type === "xp") {
          addPendingXp(e.amount);
          if (e.silent) return;
          const id = ++seq;
          setToasts((t) => [...t.slice(-2), { id, amount: e.amount, combo: e.combo }]);
          window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 1500);
        } else if (e.type === "sync") {
          if (syncTimer.current) window.clearTimeout(syncTimer.current);
          syncTimer.current = window.setTimeout(() => {
            void qc.invalidateQueries({ queryKey: GAME_QUERY_KEY });
          }, 700);
        } else if (e.type === "confetti") {
          setConfetti((c) => c + 1);
        } else if (e.type === "celebrate") {
          setQueue((q) => [...q, { ...e, id: ++seq }]);
        }
      }),
    [qc],
  );

  // A refetch has absorbed whatever we predicted.
  useEffect(() => {
    if (dataUpdatedAt) clearPendingXp();
  }, [dataUpdatedAt]);

  // Keep the server's day boundary at the learner's local midnight.
  useEffect(() => {
    if (!serverReady || tzSynced.current) return;
    tzSynced.current = true;
    const tz = browserTimezone();
    if (tz) void updateGameSettings({ timezone: tz }).catch(() => undefined);
  }, [serverReady]);

  // Turn transitions into celebrations.
  useEffect(() => {
    if (!state) return;
    const snapshot = {
      level: level.level,
      extended: state.streakExtendedToday,
      badges: new Set(state.badges.map((b) => b.id)),
      source: state.source,
    };
    const before = prev.current;
    prev.current = snapshot;
    // First load, or switching between local and server data, is not an achievement.
    if (!before || before.source !== snapshot.source) {
      if (state.freezesUsed > 0) {
        emitGameEvent({
          type: "celebrate",
          kind: "streak",
          title: "Streak saved!",
          subtitle: `${state.freezesUsed} streak freeze${state.freezesUsed > 1 ? "s" : ""} covered the days you missed.`,
          icon: "ac_unit",
        });
      }
      return;
    }
    if (snapshot.level > before.level) {
      const promoted = rankFor(before.level).title !== rank.title;
      emitGameEvent({
        type: "celebrate",
        kind: "level",
        title: promoted ? `Promoted to ${rank.title}!` : `Level ${snapshot.level}!`,
        subtitle: promoted
          ? `Level ${snapshot.level} reached. Your new rank shows on your profile.`
          : `${(level.next - (state.xpTotal ?? 0)).toLocaleString()} XP to level ${snapshot.level + 1}. Keep stacking.`,
        icon: promoted ? rank.icon : "military_tech",
      });
    }
    if (snapshot.extended && !before.extended) {
      const milestone = STREAK_MILESTONES.includes(state.streak);
      emitGameEvent({
        type: "celebrate",
        kind: "streak",
        title: `${state.streak} day streak!`,
        subtitle: milestone
          ? "Milestone unlocked. This is how toppers are made."
          : "Daily goal smashed. Come back tomorrow to keep it burning.",
      });
    }
    snapshot.badges.forEach((id) => {
      if (before.badges.has(id)) return;
      const b = badgeById(id);
      if (b)
        emitGameEvent({
          type: "celebrate",
          kind: "badge",
          title: b.title,
          subtitle: `Badge unlocked: ${b.description}`,
          icon: b.icon,
        });
    });
  }, [state, level.level, level.next, rank.title, rank.icon]);

  const current = queue[0];
  useEffect(() => {
    if (!current) return;
    playLevelUp();
    setConfetti((c) => c + 1);
  }, [current]);

  return (
    <>
      <ConfettiBurst fire={confetti} />

      {/* Floating XP toasts */}
      <div className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.9 }}
              transition={SPRING}
              className="flex items-center gap-2 rounded-full bg-surface/90 px-4 py-2 font-display text-sm font-bold shadow-lg ring-2 ring-xp/50 backdrop-blur"
            >
              <Icon name="bolt" filled className="text-[18px] text-xp" />
              <span className="text-xp">+{t.amount} XP</span>
              {t.combo >= 2 ? (
                <span className="flex items-center gap-0.5 text-streak">
                  <Icon name="local_fire_department" filled className="text-[16px]" />
                  {t.combo}×
                </span>
              ) : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Celebration modal */}
      <AnimatePresence>
        {current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
            onClick={() => setQueue((q) => q.slice(1))}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <motion.div
              initial={{ scale: 0.6, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={SPRING}
              onClick={(e) => e.stopPropagation()}
              className="card-pop w-full max-w-sm p-8 text-center"
            >
              <motion.span
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full animate-bob"
                style={{
                  backgroundColor: `color-mix(in oklab, ${CELEBRATION_COLOR[current.kind]} 22%, transparent)`,
                  color: CELEBRATION_COLOR[current.kind],
                  boxShadow: `0 0 0 6px color-mix(in oklab, ${CELEBRATION_COLOR[current.kind]} 25%, transparent)`,
                }}
              >
                <Icon
                  name={current.icon ?? CELEBRATION_ICON[current.kind]}
                  filled
                  className={cn("text-[56px]", current.kind === "streak" && "animate-flame")}
                />
              </motion.span>
              <h2 className="mt-6 text-3xl">{current.title}</h2>
              {current.subtitle ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{current.subtitle}</p>
              ) : null}
              <button
                type="button"
                autoFocus
                onClick={() => setQueue((q) => q.slice(1))}
                className="btn-base btn-primary mt-7 h-12 w-full text-base"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
