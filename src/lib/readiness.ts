/**
 * Exam readiness: one 0–100 estimate built from the learner's attempt history.
 * Pure — no I/O — so it can be unit-checked and reused on any screen.
 *
 *   score = 100 × (0.60 × accuracy′ + 0.25 × coverage + 0.15 × consistency)
 *
 * - accuracy′: per-subject accuracy, recency-weighted (30-day half-life, last 60
 *   days) and shrunk toward chance (25%) so a handful of lucky answers can't
 *   spike it; averaged across ALL the track's subjects (unpractised = chance),
 *   then mapped 25%→0, 90%→1.
 * - coverage: share of the track's subjects with at least 15 attempts.
 * - consistency: days studied in the last 14.
 */

export type ReadinessAttempt = { subject: string; correct: boolean; created_at: string };

export type Readiness = {
  /** null until there is enough history to say anything (see MIN_ATTEMPTS). */
  score: number | null;
  band: "Getting started" | "Building" | "On track" | "Exam ready";
  accuracy: number;
  coverage: number;
  consistency: number;
  attempts: number;
  /** Subjects to practise next: practised-but-weak ones first, then ones not started. */
  focus: string[];
};

export const MIN_ATTEMPTS = 30;
const CHANCE = 0.25;
const SHRINK_K = 6;
const HALF_LIFE_DAYS = 30;
const WINDOW_DAYS = 60;
const COVERAGE_MIN = 15;
const DAY = 86_400_000;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function bandFor(score: number): Readiness["band"] {
  if (score < 40) return "Getting started";
  if (score < 60) return "Building";
  if (score < 80) return "On track";
  return "Exam ready";
}

export function readiness(
  rows: ReadinessAttempt[],
  subjects: string[],
  now: number = Date.now(),
): Readiness {
  const recent = rows.filter((r) => now - Date.parse(r.created_at) <= WINDOW_DAYS * DAY);

  // Recency-weighted, shrunk accuracy per subject.
  const per = new Map<string, { w: number; wc: number; n: number }>();
  recent.forEach((r) => {
    const age = Math.max(0, (now - Date.parse(r.created_at)) / DAY);
    const w = 0.5 ** (age / HALF_LIFE_DAYS);
    const cur = per.get(r.subject) ?? { w: 0, wc: 0, n: 0 };
    cur.w += w;
    cur.n += 1;
    if (r.correct) cur.wc += w;
    per.set(r.subject, cur);
  });
  const subjAcc = new Map<string, number>();
  per.forEach((v, s) => {
    const raw = v.w ? v.wc / v.w : CHANCE;
    subjAcc.set(s, (raw * v.n + CHANCE * SHRINK_K) / (v.n + SHRINK_K));
  });

  const known = subjects.length ? subjects : [...per.keys()];
  const accuracy = known.length
    ? known.reduce((sum, s) => sum + (subjAcc.get(s) ?? CHANCE), 0) / known.length
    : 0;
  const covered = known.filter((s) => (per.get(s)?.n ?? 0) >= COVERAGE_MIN).length;
  const coverage = known.length ? covered / known.length : 0;

  const days = new Set(
    rows
      .filter((r) => now - Date.parse(r.created_at) < 14 * DAY)
      .map((r) => new Date(r.created_at).toDateString()),
  );
  const consistency = Math.min(1, days.size / 14);

  // Practised-but-weak subjects first (weakest first), then ones not yet started.
  const weak = known
    .filter((s) => (per.get(s)?.n ?? 0) >= 5 && (subjAcc.get(s) ?? 0) < 0.7)
    .sort((a, b) => (subjAcc.get(a) ?? 0) - (subjAcc.get(b) ?? 0));
  const untouched = known.filter((s) => (per.get(s)?.n ?? 0) < 5);
  const focus = [...weak, ...untouched].slice(0, 3);

  const norm = clamp01((accuracy - CHANCE) / (0.9 - CHANCE));
  const raw = Math.round(100 * (0.6 * norm + 0.25 * coverage + 0.15 * consistency));
  const score = rows.length >= MIN_ATTEMPTS ? raw : null;

  return {
    score,
    band: bandFor(score ?? 0),
    accuracy,
    coverage,
    consistency,
    attempts: rows.length,
    focus,
  };
}
