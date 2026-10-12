/**
 * Which exam track the app is currently in. Kept free of imports so any data
 * module (questions, flashcards, gamification…) can read it without cycles.
 *
 * Tracks never share data: every per-user store is keyed by the track id, both
 * in localStorage (`padida.<track>.<key>`) and in Supabase (`exam` column).
 */
export type TrackId = "neet_pg" | "neet_ug";
export type TrackSlug = "neet-pg" | "neet-ug";

export const TRACK_IDS: TrackId[] = ["neet_ug", "neet_pg"];
export const DEFAULT_TRACK: TrackId = "neet_pg";

export const slugOf = (id: TrackId): TrackSlug => (id === "neet_pg" ? "neet-pg" : "neet-ug");

export function idOfSlug(slug: string | undefined | null): TrackId | null {
  if (slug === "neet-pg") return "neet_pg";
  if (slug === "neet-ug") return "neet_ug";
  return null;
}

const LAST_KEY = "padida.track";
const isBrowser = () => typeof window !== "undefined";

let active: TrackId | null = null;

/** The last track the user entered — used outside track URLs (pricing, admin…). */
export function lastTrack(): TrackId | null {
  if (!isBrowser()) return null;
  try {
    const v = window.localStorage.getItem(LAST_KEY);
    return v === "neet_pg" || v === "neet_ug" ? v : null;
  } catch {
    return null;
  }
}

export function setActiveTrack(id: TrackId) {
  active = id;
  if (!isBrowser()) return;
  try {
    if (window.localStorage.getItem(LAST_KEY) !== id) window.localStorage.setItem(LAST_KEY, id);
  } catch {
    /* ignore */
  }
}

export function activeTrackId(): TrackId {
  return active ?? lastTrack() ?? DEFAULT_TRACK;
}

/** Namespaced localStorage key for per-track study data. */
export const trackKey = (key: string, track: TrackId = activeTrackId()) => `padida.${track}.${key}`;

/** Study-data keys that lived un-namespaced before tracks existed (all NEET PG). */
const LEGACY_KEYS = [
  "attempts",
  "bookmarks",
  "questions.custom",
  "daily.results",
  "examDate",
  "focus.log",
  "flashcards.custom",
  "flashcards.reviews",
  "flashcards.new",
  "game.local",
  "learn.done",
  "localGoal",
];

/** One-time move of pre-track localStorage data into the NEET PG namespace. */
export function migrateLegacyStorage() {
  if (!isBrowser()) return;
  try {
    const ls = window.localStorage;
    if (ls.getItem("padida.tracks.migrated") === "1") return;
    const move = (from: string, to: string) => {
      const v = ls.getItem(from);
      if (v === null) return;
      if (ls.getItem(to) === null) ls.setItem(to, v);
      ls.removeItem(from);
    };
    LEGACY_KEYS.forEach((k) => move(`padida.${k}`, `padida.neet_pg.${k}`));
    for (let i = ls.length - 1; i >= 0; i -= 1) {
      const k = ls.key(i);
      if (k?.startsWith("padida.roadmap.")) move(k, k.replace("padida.", "padida.neet_pg."));
    }
    ls.setItem("padida.tracks.migrated", "1");
  } catch {
    /* storage unavailable — nothing to migrate */
  }
}
