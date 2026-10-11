/*
 * FSRS-4.5 spaced-repetition scheduler (the algorithm behind modern Anki), with the
 * published default weights and a 90% target retention. Pure functions only.
 *
 * Ratings: 1 Again · 2 Hard · 3 Good · 4 Easy.
 */

export type Rating = 1 | 2 | 3 | 4;

export type CardState = {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  /** ISO timestamp of the last review. */
  lastReviewAt: string;
  /** ISO timestamp when the card is next due. */
  dueAt: string;
};

const W = [
  0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461, 2.1072,
  0.0793, 0.3246, 1.587, 0.2272, 2.8755,
] as const;
const w = (i: number) => W[i]!;

const DECAY = -0.5;
const FACTOR = 19 / 81;
const RETENTION = 0.9;
const MAX_INTERVAL_DAYS = 3650;
const DAY_MS = 86_400_000;
/** "Again" brings a card back within the same session. */
const RELEARN_MS = 60_000;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Probability of recall after `elapsedDays` for a memory of the given stability. */
export function retrievability(elapsedDays: number, stability: number) {
  return Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY);
}

function initDifficulty(r: Rating) {
  return clamp(w(4) - (r - 3) * w(5), 1, 10);
}

function nextDifficulty(d: number, r: Rating) {
  const next = d - w(6) * (r - 3);
  // Mean reversion towards the default difficulty of an "Easy" first answer.
  return clamp(w(7) * initDifficulty(4) + (1 - w(7)) * next, 1, 10);
}

function recallStability(d: number, s: number, rr: number, r: Rating) {
  const hard = r === 2 ? w(15) : 1;
  const easy = r === 4 ? w(16) : 1;
  return (
    s *
    (Math.exp(w(8)) *
      (11 - d) *
      Math.pow(s, -w(9)) *
      (Math.exp(w(10) * (1 - rr)) - 1) *
      hard *
      easy +
      1)
  );
}

function forgetStability(d: number, s: number, rr: number) {
  return w(11) * Math.pow(d, -w(12)) * (Math.pow(s + 1, w(13)) - 1) * Math.exp(w(14) * (1 - rr));
}

/** Days until recall probability falls to the target retention. */
export function intervalDays(stability: number) {
  const days = (stability / FACTOR) * (Math.pow(RETENTION, 1 / DECAY) - 1);
  return clamp(Math.round(days), 1, MAX_INTERVAL_DAYS);
}

/** Schedule the next review of a card (or a brand-new card when `prev` is null). */
export function schedule(prev: CardState | null, rating: Rating, now = new Date()): CardState {
  let stability: number;
  let difficulty: number;
  if (!prev) {
    stability = w(rating - 1);
    difficulty = initDifficulty(rating);
  } else {
    const elapsed = Math.max(0, (now.getTime() - new Date(prev.lastReviewAt).getTime()) / DAY_MS);
    const rr = retrievability(elapsed, prev.stability);
    difficulty = nextDifficulty(prev.difficulty, rating);
    stability =
      rating === 1
        ? Math.min(prev.stability, forgetStability(prev.difficulty, prev.stability, rr))
        : recallStability(prev.difficulty, prev.stability, rr, rating);
  }
  stability = clamp(stability, 0.01, 36500);
  const due =
    rating === 1
      ? new Date(now.getTime() + RELEARN_MS)
      : new Date(now.getTime() + intervalDays(stability) * DAY_MS);
  return {
    stability,
    difficulty,
    reps: (prev?.reps ?? 0) + 1,
    lapses: (prev?.lapses ?? 0) + (rating === 1 ? 1 : 0),
    lastReviewAt: now.toISOString(),
    dueAt: due.toISOString(),
  };
}

/** Human label for when a rating would bring the card back ("1m", "3d", "2mo"). */
export function previewLabel(prev: CardState | null, rating: Rating, now = new Date()) {
  const next = schedule(prev, rating, now);
  const ms = new Date(next.dueAt).getTime() - now.getTime();
  if (ms < 3_600_000) return `${Math.max(1, Math.round(ms / 60_000))}m`;
  const days = Math.round(ms / DAY_MS);
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}
