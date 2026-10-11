import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/Primitives";
import { ProgressRing } from "@/components/ProgressRing";
import { CountUp, SPRING } from "@/components/motion/Reveal";
import {
  BADGES,
  LEAGUE_TIERS,
  claimXp,
  type GameState,
  type LeagueMember,
  type Quest,
} from "@/lib/gamification";
import { playTick } from "@/lib/sfx";
import { cn } from "@/lib/utils";

/** Animated flame + day count. Lit once today's goal is met. */
export function StreakFlame({
  streak,
  lit,
  size = "md",
  className,
}: {
  streak: number;
  lit: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const icon = { sm: "text-[20px]", md: "text-[28px]", lg: "text-[64px]" }[size];
  const text = { sm: "text-sm", md: "text-lg", lg: "text-4xl" }[size];
  return (
    <span className={cn("inline-flex items-center gap-1 font-display font-bold", className)}>
      <Icon
        name="local_fire_department"
        filled
        className={cn(icon, lit ? "animate-flame text-streak" : "text-muted-foreground/70")}
      />
      <span className={cn(text, "tabular-nums", lit ? "text-streak" : "text-muted-foreground")}>
        {streak}
      </span>
    </span>
  );
}

/** Ring showing today's XP against the daily goal. */
export function DailyGoalRing({
  todayXp,
  goal,
  size = 36,
  strokeWidth = 4,
  children,
}: {
  todayXp: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) {
  const done = todayXp >= goal;
  return (
    <ProgressRing
      progress={goal ? todayXp / goal : 0}
      size={size}
      strokeWidth={strokeWidth}
      color={done ? "var(--color-success)" : "var(--color-xp)"}
      trackColor="color-mix(in oklab, var(--color-surface-3) 80%, transparent)"
    >
      {children ?? (
        <Icon
          name={done ? "check" : "bolt"}
          filled
          className={cn("text-[16px]", done ? "text-success" : "text-xp")}
        />
      )}
    </ProgressRing>
  );
}

/** Horizontal bar with a glossy fill. */
export function ProgressBar({
  value,
  color = "var(--color-primary)",
  className,
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("progress-track h-3", className)}>
      <div
        className="progress-fill"
        style={{ width: `${Math.max(4, Math.min(1, value) * 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function LevelBar({
  level,
  progress,
  xpTotal,
  next,
  rankTitle,
}: {
  level: number;
  progress: number;
  xpTotal: number;
  next: number;
  rankTitle: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gem/20 font-display text-xl font-bold text-gem ring-2 ring-gem/40">
            {level}
          </span>
          <div>
            <p className="label-eyebrow">Level {level}</p>
            <p className="font-display text-lg font-bold leading-tight">{rankTitle}</p>
          </div>
        </div>
        <p className="text-xs font-semibold text-muted-foreground tabular-nums">
          <CountUp value={xpTotal} /> / {next.toLocaleString()} XP
        </p>
      </div>
      <ProgressBar value={progress} color="var(--color-gem)" className="mt-3" />
    </div>
  );
}

/** Combo badge that pops every time the combo grows. */
export function ComboMeter({ combo }: { combo: number }) {
  return (
    <AnimatePresence mode="popLayout">
      {combo >= 2 ? (
        <motion.span
          key={combo}
          initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={SPRING}
          className="inline-flex items-center gap-1 rounded-full bg-streak/15 px-2.5 py-1 font-display text-xs font-bold text-streak ring-1 ring-streak/40"
        >
          <Icon name="local_fire_department" filled className="text-[16px]" />
          {combo}× combo
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

export function QuestList({ state, signedIn }: { state: GameState | null; signedIn: boolean }) {
  const [claiming, setClaiming] = useState<string | null>(null);

  if (!signedIn || !state || state.source === "local") {
    return (
      <div className="space-y-3">
        {["Answer 20 questions", "Hit a 5-answer combo", "Fix 3 past mistakes"].map((t) => (
          <div key={t} className="flex items-center gap-3 opacity-60">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-2">
              <Icon name="lock" className="text-[18px] text-muted-foreground" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t}</p>
              <ProgressBar value={0} className="mt-1.5 h-2.5" />
            </div>
          </div>
        ))}
        <Link to="/auth" className="btn-base btn-primary mt-2 w-full text-sm">
          <Icon name="login" className="text-[18px]" />
          Sign in to unlock daily quests
        </Link>
      </div>
    );
  }

  const claim = async (q: Quest) => {
    setClaiming(q.key);
    playTick();
    try {
      await claimXp("quest_complete", q.key);
    } finally {
      setClaiming(null);
    }
  };

  return (
    <div className="space-y-3.5">
      {state.quests.map((q, i) => {
        const done = q.progress >= q.target;
        return (
          <motion.div
            key={q.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, ...SPRING }}
            className="flex items-center gap-3"
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                q.claimed ? "bg-success/20 text-success" : done ? "bg-xp/20 text-xp" : "bg-surface-2 text-muted-foreground",
              )}
            >
              <Icon
                name={q.claimed ? "check_circle" : done ? "redeem" : "flag"}
                filled
                className={cn("text-[22px]", done && !q.claimed && "animate-wiggle")}
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold">{q.title}</p>
                <span className="shrink-0 text-[11px] font-bold text-xp">+{q.reward} XP</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <ProgressBar
                  value={q.progress / q.target}
                  color={q.claimed ? "var(--color-success)" : "var(--color-xp)"}
                  className="h-2.5 flex-1"
                />
                <span className="w-10 text-right text-[11px] font-semibold tabular-nums text-muted-foreground">
                  {q.progress}/{q.target}
                </span>
              </div>
            </div>
            {done && !q.claimed ? (
              <button
                type="button"
                onClick={() => void claim(q)}
                disabled={claiming === q.key}
                className="btn-base btn-xp shrink-0 px-3 py-1.5 text-xs"
              >
                Claim
              </button>
            ) : null}
          </motion.div>
        );
      })}
      {state.quests.length > 0 && state.quests.every((q) => q.claimed) ? (
        <p className="rounded-2xl bg-success/10 px-3 py-2 text-center text-xs font-semibold text-success">
          All quests cleared: you earned a streak freeze 🧊
        </p>
      ) : (
        <p className="text-center text-[11px] text-muted-foreground">
          Clear all three for a bonus streak freeze
        </p>
      )}
    </div>
  );
}

export function BadgeGrid({ unlocked }: { unlocked: { id: string; unlockedAt: string }[] }) {
  const have = new Map(unlocked.map((b) => [b.id, b.unlockedAt]));
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {BADGES.map((b, i) => {
        const at = have.get(b.id);
        return (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: i * 0.025 }}
            whileHover={{ y: -4, rotate: at ? -3 : 0 }}
            title={b.description}
            className={cn(
              "flex flex-col items-center rounded-3xl p-3 text-center",
              at ? "card-pop" : "border-2 border-dashed border-glass-line opacity-55",
            )}
          >
            <span
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full",
                at ? "bg-xp/20 text-xp ring-2 ring-xp/50" : "bg-surface-2 text-muted-foreground",
              )}
            >
              <Icon name={at ? b.icon : "lock"} filled={Boolean(at)} className="text-[28px]" />
            </span>
            <p className="mt-2 text-xs font-bold leading-tight">{b.title}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
              {at ? new Date(at).toLocaleDateString() : b.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export function TierEmblem({ tier, size = 56 }: { tier: number; size?: number }) {
  const t = LEAGUE_TIERS[Math.max(0, Math.min(LEAGUE_TIERS.length - 1, tier))]!;
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-[38%]"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(160deg, color-mix(in oklab, ${t.color} 85%, white), ${t.color})`,
        boxShadow: `0 4px 0 color-mix(in oklab, ${t.color} 55%, black), 0 14px 30px -12px ${t.color}`,
      }}
      aria-label={`${t.name} league`}
    >
      <Icon name="shield" filled className="text-white/90" />
    </span>
  );
}

export function LeagueTable({ members }: { members: LeagueMember[] }) {
  const n = members.length;
  return (
    <ol className="space-y-1.5">
      {members.map((m, i) => {
        const promote = m.rank <= 7 && m.xp > 0;
        const demote = n >= 10 && m.rank > n - 5;
        return (
          <motion.li
            key={`${m.name}-${i}`}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING, delay: Math.min(i, 15) * 0.03 }}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2.5",
              m.is_me ? "bg-primary/15 ring-2 ring-primary/50" : "hover:bg-surface-2/50",
            )}
          >
            <span
              className={cn(
                "w-7 text-center font-display text-sm font-bold tabular-nums",
                promote ? "text-success" : demote ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {m.rank <= 3 ? ["🥇", "🥈", "🥉"][m.rank - 1] : m.rank}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-3 font-display text-sm font-bold uppercase">
              {m.name.slice(0, 1)}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {m.name}
              {m.is_me ? <span className="ml-1.5 text-xs text-primary">(you)</span> : null}
            </span>
            <span className="text-sm font-bold tabular-nums">{m.xp} XP</span>
          </motion.li>
        );
      })}
    </ol>
  );
}
