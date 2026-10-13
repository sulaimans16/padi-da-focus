import { supabase } from "@/integrations/supabase/client";
import { todayKey } from "./quiz";
import { trackKey } from "@/lib/track-state";
import { currentExam, examRpc, scoped } from "./exam-query";

/*
 * Gamification model — XP, levels, streaks, quests, badges and leagues.
 *
 * The server (see the gamification migration) is the source of truth for signed-in users:
 * XP is awarded by triggers on `attempts` / `focus_sessions` and validated RPCs. The client
 * predicts the same numbers for instant feedback and keeps a local mirror so guests (and
 * environments where the migration hasn't been applied yet) still get the full loop.
 */

// ---------- rules shared with the server ----------

export const XP = {
  correct: 10,
  wrong: 2,
  comboStep: 2,
  comboCap: 10,
  mistakeFixed: 15,
  concept: 15,
  daily: 30,
} as const;

export function answerXp(correct: boolean, combo: number) {
  if (!correct) return XP.wrong;
  return XP.correct + Math.min(XP.comboCap, XP.comboStep * Math.max(0, combo - 1));
}

export const DAILY_GOALS = [
  { xp: 30, label: "Casual", note: "~3 questions a sitting" },
  { xp: 50, label: "Regular", note: "A focused 10 minutes" },
  { xp: 100, label: "Serious", note: "Proper revision block" },
  { xp: 200, label: "Intense", note: "Exam-month mode" },
] as const;

/** Cumulative XP needed to reach `level` (level 1 starts at 0). */
export function xpForLevel(level: number) {
  return Math.round(50 * Math.pow(Math.max(0, level - 1), 1.5));
}

export function levelForXp(xp: number) {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level += 1;
  const floor = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return { level, floor, next, progress: (xp - floor) / Math.max(1, next - floor) };
}

const RANKS = [
  { from: 50, title: "Professor", icon: "school" },
  { from: 35, title: "Consultant", icon: "stethoscope" },
  { from: 20, title: "Registrar", icon: "clinical_notes" },
  { from: 10, title: "Resident", icon: "medical_services" },
  { from: 5, title: "House Officer", icon: "badge" },
  { from: 1, title: "Intern", icon: "person" },
] as const;

export function rankFor(level: number) {
  return RANKS.find((r) => level >= r.from) ?? RANKS[RANKS.length - 1]!;
}

export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 365];

export const LEAGUE_TIERS = [
  { name: "Bronze", color: "oklch(0.68 0.11 55)" },
  { name: "Silver", color: "oklch(0.8 0.02 250)" },
  { name: "Gold", color: "oklch(0.83 0.14 85)" },
  { name: "Sapphire", color: "oklch(0.66 0.15 255)" },
  { name: "Ruby", color: "oklch(0.64 0.2 15)" },
  { name: "Emerald", color: "oklch(0.72 0.15 155)" },
  { name: "Diamond", color: "oklch(0.85 0.08 215)" },
] as const;

export type BadgeDef = { id: string; title: string; description: string; icon: string };

export const BADGES: BadgeDef[] = [
  {
    id: "first_blood",
    title: "First Blood",
    description: "Your first correct answer",
    icon: "water_drop",
  },
  { id: "century", title: "Century", description: "100 correct answers", icon: "military_tech" },
  {
    id: "thousand",
    title: "Thousand Club",
    description: "1,000 correct answers",
    icon: "workspace_premium",
  },
  {
    id: "combo_10",
    title: "On Fire",
    description: "A 10-answer combo",
    icon: "local_fire_department",
  },
  { id: "combo_25", title: "Unstoppable", description: "A 25-answer combo", icon: "bolt" },
  { id: "streak_7", title: "Week Warrior", description: "7-day streak", icon: "calendar_month" },
  { id: "streak_30", title: "Habit Formed", description: "30-day streak", icon: "event_available" },
  { id: "streak_100", title: "Centurion", description: "100-day streak", icon: "shield" },
  {
    id: "pyq_hunter",
    title: "PYQ Hunter",
    description: "50 PYQs answered right",
    icon: "history_edu",
  },
  {
    id: "mistake_slayer",
    title: "Mistake Slayer",
    description: "Fixed 25 past mistakes",
    icon: "healing",
  },
  { id: "scholar", title: "Scholar", description: "Finished 10 Learn concepts", icon: "menu_book" },
  {
    id: "daily_devotee",
    title: "Daily Devotee",
    description: "7 daily challenges done",
    icon: "today",
  },
  {
    id: "focus_ten",
    title: "Deep Worker",
    description: "10 focus sessions completed",
    icon: "lock_clock",
  },
  { id: "iron_focus", title: "Iron Focus", description: "A 60-minute focus lock", icon: "timer" },
  {
    id: "subject_master",
    title: "Subject Master",
    description: "80%+ over 50 Qs in a subject",
    icon: "trophy",
  },
  { id: "xp_5000", title: "5K Club", description: "Earned 5,000 XP", icon: "star" },
];

export const badgeById = (id: string) => BADGES.find((b) => b.id === id);

// ---------- shapes ----------

export type Quest = {
  key: string;
  title: string;
  target: number;
  reward: number;
  progress: number;
  claimed: boolean;
};

export type GameState = {
  source: "server" | "local";
  xpTotal: number;
  todayXp: number;
  dailyGoal: number;
  streak: number;
  longestStreak: number;
  streakExtendedToday: boolean;
  streakFreezes: number;
  freezesUsed: number;
  bestCombo: number;
  leagueTier: number;
  leagueOptOut: boolean;
  today: string;
  quests: Quest[];
  badges: { id: string; unlockedAt: string }[];
  history: { day: string; xp: number }[];
  mistakesDue: number;
  mistakesTotal: number;
};

export type LeagueMember = { name: string; xp: number; rank: number; is_me: boolean };

export type LeagueState =
  | { status: "opted_out"; tier: number }
  | { status: "not_joined"; tier: number; week_start: string; last_outcome: string | null }
  | {
      status: "joined";
      tier: number;
      week_start: string;
      ends_at: string;
      last_outcome: string | null;
      members: LeagueMember[];
    };

// ---------- event bus (instant feedback across components) ----------

export type GameEvent =
  | { type: "xp"; amount: number; combo: number; correct: boolean; silent?: boolean }
  | { type: "sync" }
  | { type: "confetti" }
  | {
      type: "celebrate";
      kind: "level" | "streak" | "badge" | "goal" | "lesson";
      title: string;
      subtitle?: string;
      icon?: string;
      /** Present on achievements worth sharing; powers the share-card button. */
      share?: { streak: number; level: number; rank: string; xpTotal: number };
    };

type Listener = (e: GameEvent) => void;
const listeners = new Set<Listener>();

export function onGameEvent(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function emitGameEvent(e: GameEvent) {
  listeners.forEach((fn) => fn(e));
}

// ---------- local mirror ----------

const LOCAL_KEY = () => trackKey("game.local");

type LocalGame = {
  xp: number;
  days: Record<string, number>;
  combo: number;
  bestCombo: number;
  lastAt: number;
  dailyGoal: number;
  claims: string[];
};

const EMPTY_LOCAL: LocalGame = {
  xp: 0,
  days: {},
  combo: 0,
  bestCombo: 0,
  lastAt: 0,
  dailyGoal: 50,
  claims: [],
};

export function loadLocalGame(): LocalGame {
  if (typeof window === "undefined") return EMPTY_LOCAL;
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY());
    return raw ? { ...EMPTY_LOCAL, ...(JSON.parse(raw) as Partial<LocalGame>) } : EMPTY_LOCAL;
  } catch {
    return EMPTY_LOCAL;
  }
}

function saveLocalGame(next: LocalGame) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_KEY(), JSON.stringify(next));
  } catch {
    /* storage full or blocked — feedback still works for this session */
  }
}

function addLocalXp(g: LocalGame, amount: number): LocalGame {
  const day = todayKey();
  return { ...g, xp: g.xp + amount, days: { ...g.days, [day]: (g.days[day] ?? 0) + amount } };
}

/** Streak from the local per-day XP log: consecutive days meeting the goal. */
function localStreak(g: LocalGame) {
  let streak = 0;
  const cursor = new Date();
  // Today only counts once the goal is met; an unfinished today doesn't break yesterday's run.
  if ((g.days[todayKey(cursor)] ?? 0) < g.dailyGoal) cursor.setDate(cursor.getDate() - 1);
  while ((g.days[todayKey(cursor)] ?? 0) >= g.dailyGoal) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function localGameState(g: LocalGame = loadLocalGame()): GameState {
  const today = todayKey();
  const todayXp = g.days[today] ?? 0;
  return {
    source: "local",
    xpTotal: g.xp,
    todayXp,
    dailyGoal: g.dailyGoal,
    streak: localStreak(g),
    longestStreak: localStreak(g),
    streakExtendedToday: todayXp >= g.dailyGoal,
    streakFreezes: 0,
    freezesUsed: 0,
    bestCombo: g.bestCombo,
    leagueTier: 0,
    leagueOptOut: false,
    today,
    quests: [],
    badges: [],
    history: Object.entries(g.days).map(([day, xp]) => ({ day, xp })),
    mistakesDue: 0,
    mistakesTotal: 0,
  };
}

// ---------- answering ----------

/**
 * Call when a learner answers. Predicts the XP the server will grant, emits instant
 * feedback and updates the local mirror. Returns the predicted reward.
 */
export function registerAnswer(correct: boolean, opts: { silent?: boolean } = {}) {
  const g = loadLocalGame();
  const now = Date.now();
  const combo = correct ? (now - g.lastAt < 15 * 60_000 ? g.combo + 1 : 1) : 0;
  const amount = answerXp(correct, combo);
  saveLocalGame({
    ...addLocalXp(g, amount),
    combo,
    bestCombo: Math.max(g.bestCombo, combo),
    lastAt: now,
  });
  emitGameEvent({ type: "xp", amount, combo, correct, silent: Boolean(opts.silent) });
  return { amount, combo };
}

/** A completed focus lock earns 1 XP per minute (max 60); the server grants it on insert. */
export function registerFocus(minutes: number) {
  const amount = Math.max(0, Math.min(60, Math.round(minutes)));
  if (!amount) return 0;
  saveLocalGame(addLocalXp(loadLocalGame(), amount));
  emitGameEvent({ type: "xp", amount, combo: 0, correct: true });
  return amount;
}

/** Generic XP feedback (e.g. a flashcard review the server already rewarded). */
export function registerBonusXp(amount: number, opts: { silent?: boolean } = {}) {
  if (amount <= 0) return 0;
  saveLocalGame(addLocalXp(loadLocalGame(), amount));
  emitGameEvent({ type: "xp", amount, combo: 0, correct: true, silent: Boolean(opts.silent) });
  return amount;
}

/** Ask listeners (the game-state hook) to refetch from the server. */
export function requestGameSync() {
  emitGameEvent({ type: "sync" });
}

// ---------- server calls ----------

type RawState = {
  xp_total: number;
  today_xp: number;
  daily_goal: number;
  streak: number;
  longest_streak: number;
  streak_extended_today: boolean | null;
  streak_freezes: number;
  freezes_used: number;
  best_combo: number;
  league_tier: number;
  league_opt_out: boolean;
  today: string;
  quests: Quest[];
  badges: { id: string; unlocked_at: string }[];
  history: { day: string; xp: number }[];
  mistakes_due: number;
  mistakes_total: number;
};

export async function fetchGameState(): Promise<GameState> {
  const { data, error } = await examRpc((on) =>
    on ? supabase.rpc("get_game_state", { _exam: currentExam() }) : supabase.rpc("get_game_state"),
  );
  if (error) throw new Error(error.message);
  const r = data as unknown as RawState;
  return {
    source: "server",
    xpTotal: r.xp_total,
    todayXp: r.today_xp,
    dailyGoal: r.daily_goal,
    streak: r.streak,
    longestStreak: r.longest_streak,
    streakExtendedToday: Boolean(r.streak_extended_today),
    streakFreezes: r.streak_freezes,
    freezesUsed: r.freezes_used,
    bestCombo: r.best_combo,
    leagueTier: r.league_tier,
    leagueOptOut: r.league_opt_out,
    today: r.today,
    quests: r.quests ?? [],
    badges: (r.badges ?? []).map((b) => ({ id: b.id, unlockedAt: b.unlocked_at })),
    history: r.history ?? [],
    mistakesDue: r.mistakes_due,
    mistakesTotal: r.mistakes_total,
  };
}

async function signedIn() {
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session);
}

/**
 * Claims a one-off reward (concept finished, daily challenge, quest). Returns XP granted.
 * Signed-out learners get it in the local mirror, once per ref.
 */
export async function claimXp(
  source: "concept_done" | "daily_complete" | "quest_complete",
  ref: string,
  localAmount = 0,
): Promise<number> {
  if (await signedIn()) {
    const { data, error } = await examRpc((on) =>
      supabase.rpc("claim_xp", {
        _source: source,
        _ref: ref,
        ...(on ? { _exam: currentExam() } : {}),
      }),
    );
    if (!error) {
      const granted = Number(data ?? 0);
      if (granted > 0) emitGameEvent({ type: "xp", amount: granted, combo: 0, correct: true });
      requestGameSync();
      return granted;
    }
    console.error("[game] claim failed", error.message);
  }
  const g = loadLocalGame();
  const key = `${source}:${ref}`;
  if (!localAmount || g.claims.includes(key)) return 0;
  saveLocalGame({ ...addLocalXp(g, localAmount), claims: [...g.claims, key].slice(-500) });
  emitGameEvent({ type: "xp", amount: localAmount, combo: 0, correct: true });
  requestGameSync();
  return localAmount;
}

export async function updateGameSettings(input: {
  dailyGoal?: number;
  timezone?: string;
  leagueOptOut?: boolean;
}) {
  const g = loadLocalGame();
  if (input.dailyGoal) saveLocalGame({ ...g, dailyGoal: input.dailyGoal });
  if (await signedIn()) {
    const { error } = await examRpc((on) =>
      supabase.rpc("update_game_settings", {
        ...(input.dailyGoal != null ? { _daily_goal: input.dailyGoal } : {}),
        ...(input.timezone != null ? { _timezone: input.timezone } : {}),
        ...(input.leagueOptOut != null ? { _league_opt_out: input.leagueOptOut } : {}),
        ...(on ? { _exam: currentExam() } : {}),
      }),
    );
    if (error) throw new Error(error.message);
  }
  requestGameSync();
}

export async function fetchLeague(): Promise<LeagueState> {
  const { data, error } = await examRpc((on) =>
    on ? supabase.rpc("get_league", { _exam: currentExam() }) : supabase.rpc("get_league"),
  );
  if (error) throw new Error(error.message);
  return data as unknown as LeagueState;
}

export type MistakeRow = { question_id: string; subject: string; stage: number; due_at: string };

export async function fetchMistakes(): Promise<MistakeRow[]> {
  const { data, error } = await scoped((on) => {
    const q = supabase.from("mistake_queue").select("question_id, subject, stage, due_at");
    return (on ? q.eq("exam", currentExam()) : q).order("due_at", { ascending: true }).limit(500);
  });
  if (error) throw new Error(error.message);
  return (data ?? []) as MistakeRow[];
}

/** The browser's IANA timezone, used so streak days roll over at local midnight. */
export function browserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}
