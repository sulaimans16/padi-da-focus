import { supabase } from "@/integrations/supabase/client";
import type { LearnModule } from "./learn";
import { loadBookmarks } from "./questions";
import { fetchQuestionsByIds, todayKey } from "./quiz";
import { fetchBookmarkIds } from "./tracker";
import { registerBonusXp, requestGameSync } from "./gamification";
import { schedule, type CardState, type Rating } from "./fsrs";
import { trackKey } from "@/lib/track-state";
import { currentExam } from "./exam-query";

/*
 * Flashcards: cards come from Learn concepts (high-yield facts, mnemonics, traps,
 * vignettes), bookmarked questions and the learner's own cards. Review state is
 * FSRS-scheduled, stored in Supabase for signed-in learners and on-device for guests.
 */

export const NEW_PER_DAY = 20;

export type Flashcard = {
  id: string;
  deck: string;
  front: string;
  back: string;
  /** Extra line under the answer (e.g. a high-yield pearl). */
  note?: string;
  kind: "fact" | "mnemonic" | "trap" | "case" | "question" | "custom";
};

export type Deck = {
  id: string;
  title: string;
  icon: string;
  hue: number;
  cards: Flashcard[];
};

export type ReviewMap = Record<string, CardState>;

// ---------- card sources ----------

const KIND_LABEL: Record<Flashcard["kind"], string> = {
  fact: "High-yield",
  mnemonic: "Mnemonic",
  trap: "Exam trap",
  case: "Clinical case",
  question: "Saved question",
  custom: "My card",
};
export const kindLabel = (k: Flashcard["kind"]) => KIND_LABEL[k];

const HUES = [205, 160, 25, 85, 0, 270, 235, 300, 140, 50, 330, 190];

/** Every Learn module becomes a deck. Deterministic, so ids stay stable. */
export function learnDecks(modules: LearnModule[]): Deck[] {
  return modules.map((m, i) => {
    const cards: Flashcard[] = [];
    m.concepts.forEach((c) => {
      const base = `learn:${m.slug}/${c.id}`;
      cards.push({
        id: `${base}:hy`,
        deck: m.slug,
        kind: "fact",
        front: `${c.title}: what's the one line the exam tests?`,
        back: c.highYield,
        note: c.summary,
      });
      if (c.mnemonic) {
        cards.push({
          id: `${base}:mn`,
          deck: m.slug,
          kind: "mnemonic",
          front: `What's the mnemonic for ${c.title.toLowerCase()}?`,
          back: c.mnemonic,
        });
      }
      c.pitfalls?.forEach((p, pi) => {
        cards.push({
          id: `${base}:trap${pi}`,
          deck: m.slug,
          kind: "trap",
          front: `${c.title}: name a classic exam trap (#${pi + 1}).`,
          back: p,
        });
      });
      if (c.vignette) {
        cards.push({
          id: `${base}:case`,
          deck: m.slug,
          kind: "case",
          front: c.vignette.stem,
          back: c.vignette.answer,
          note: c.vignette.reasoning,
        });
      }
    });
    return { id: m.slug, title: m.title ?? m.subject, icon: m.icon, hue: HUES[i % HUES.length]!, cards };
  });
}

/** Bookmarked questions as recall cards. */
export async function savedQuestionDeck(): Promise<Deck> {
  let ids = loadBookmarks();
  try {
    ids = Array.from(new Set([...(await fetchBookmarkIds()), ...ids]));
  } catch {
    /* signed out or offline — local bookmarks only */
  }
  const questions = ids.length ? await fetchQuestionsByIds(ids.slice(0, 300)) : [];
  return {
    id: "saved",
    title: "Saved questions",
    icon: "bookmark",
    hue: 45,
    cards: questions.map((q) => ({
      id: `q:${q.id}`,
      deck: "saved",
      kind: "question",
      front: q.stem,
      back: q.options.find((o) => o.id === q.correctOptionId)?.text ?? "",
      note: q.oneLiner || q.highYield,
    })),
  };
}

// ---------- custom cards ----------

const CUSTOM_KEY = () => trackKey("flashcards.custom");

type CustomRow = { id: string; front: string; back: string; created_at: string };

function readLocalCustom(): CustomRow[] {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_KEY()) ?? "[]") as CustomRow[];
  } catch {
    return [];
  }
}

async function signedInUserId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function customDeck(): Promise<Deck> {
  let rows: CustomRow[] = readLocalCustom();
  if (await signedInUserId()) {
    const { data, error } = await supabase
      .from("flashcards_custom")
      .select("id, front, back, created_at")
      .eq("exam", currentExam())
      .order("created_at", { ascending: false })
      .limit(1000);
    if (!error) rows = data ?? [];
  }
  return {
    id: "custom",
    title: "My cards",
    icon: "edit_note",
    hue: 300,
    cards: rows.map((r) => ({
      id: `c:${r.id}`,
      deck: "custom",
      kind: "custom",
      front: r.front,
      back: r.back,
    })),
  };
}

export async function addCustomCard(front: string, back: string) {
  const userId = await signedInUserId();
  if (userId) {
    const { error } = await supabase
      .from("flashcards_custom")
      .insert({ user_id: userId, exam: currentExam(), front: front.trim(), back: back.trim() });
    if (error) throw new Error(error.message);
    return;
  }
  const row: CustomRow = {
    id: crypto.randomUUID(),
    front: front.trim(),
    back: back.trim(),
    created_at: new Date().toISOString(),
  };
  localStorage.setItem(CUSTOM_KEY(), JSON.stringify([row, ...readLocalCustom()].slice(0, 1000)));
}

export async function deleteCustomCard(cardId: string) {
  const id = cardId.replace(/^c:/, "");
  if (await signedInUserId()) {
    await supabase.from("flashcards_custom").delete().eq("id", id);
  }
  localStorage.setItem(CUSTOM_KEY(), JSON.stringify(readLocalCustom().filter((r) => r.id !== id)));
}

// ---------- review state ----------

const REVIEWS_KEY = () => trackKey("flashcards.reviews");
const NEW_COUNT_KEY = () => trackKey("flashcards.new");

function readLocalReviews(): ReviewMap {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY()) ?? "{}") as ReviewMap;
  } catch {
    return {};
  }
}

function writeLocalReviews(map: ReviewMap) {
  try {
    localStorage.setItem(REVIEWS_KEY(), JSON.stringify(map));
  } catch {
    /* storage full */
  }
}

export async function fetchReviews(): Promise<ReviewMap> {
  const local = readLocalReviews();
  if (!(await signedInUserId())) return local;
  const { data, error } = await supabase
    .from("flashcard_reviews")
    .select("card_id, stability, difficulty, reps, lapses, last_review_at, due_at")
    .eq("exam", currentExam())
    .limit(10000);
  if (error) return local;
  const remote: ReviewMap = {};
  (data ?? []).forEach((r) => {
    remote[r.card_id] = {
      stability: r.stability,
      difficulty: r.difficulty,
      reps: r.reps,
      lapses: r.lapses,
      lastReviewAt: r.last_review_at,
      dueAt: r.due_at,
    };
  });
  // Account wins; device-only reviews (e.g. done while signed out) are kept too.
  return { ...local, ...remote };
}

/** New cards introduced today (on this device), for the daily new-card limit. */
export function newCardsToday(): number {
  try {
    const raw = JSON.parse(localStorage.getItem(NEW_COUNT_KEY()) ?? "{}") as {
      day?: string;
      n?: number;
    };
    return raw.day === todayKey() ? (raw.n ?? 0) : 0;
  } catch {
    return 0;
  }
}

function bumpNewCards() {
  try {
    localStorage.setItem(
      NEW_COUNT_KEY(),
      JSON.stringify({ day: todayKey(), n: newCardsToday() + 1 }),
    );
  } catch {
    /* ignore */
  }
}

/**
 * Grade a card: computes the next FSRS schedule, saves it, and awards XP (server-checked
 * when signed in). Returns the new state and XP granted.
 */
export async function reviewCard(card: Flashcard, rating: Rating, prev: CardState | null) {
  const next = schedule(prev, rating);
  const wasDue = !prev || new Date(prev.dueAt).getTime() <= Date.now() + 60_000;
  if (!prev) bumpNewCards();
  const local = readLocalReviews();
  local[card.id] = next;
  writeLocalReviews(local);

  let granted = 0;
  if (await signedInUserId()) {
    const { data, error } = await supabase.rpc("review_flashcard", {
      _card_id: card.id,
      _rating: rating,
      _stability: next.stability,
      _difficulty: next.difficulty,
      _due_at: next.dueAt,
      _deck: card.deck,
      _exam: currentExam(),
    });
    if (!error) {
      granted = Number(data ?? 0);
      if (granted > 0) registerBonusXp(granted);
      requestGameSync();
    } else if (wasDue) {
      // Database not migrated yet: still give on-device feedback.
      granted = registerBonusXp(2);
    }
  } else if (wasDue) {
    granted = registerBonusXp(2);
  }
  return { next, granted };
}

// ---------- sessions ----------

export function isDue(state: CardState | undefined, now = Date.now()) {
  return Boolean(state) && new Date(state!.dueAt).getTime() <= now;
}

export function deckStats(deck: Deck, reviews: ReviewMap, now = Date.now()) {
  let due = 0;
  let fresh = 0;
  let learned = 0;
  deck.cards.forEach((c) => {
    const s = reviews[c.id];
    if (!s) fresh += 1;
    else {
      learned += 1;
      if (new Date(s.dueAt).getTime() <= now) due += 1;
    }
  });
  return { total: deck.cards.length, due, fresh, learned };
}

/** Due cards first (most overdue first), then new cards up to today's allowance. */
export function buildSession(
  decks: Deck[],
  reviews: ReviewMap,
  opts: { maxNew?: number; max?: number } = {},
) {
  const now = Date.now();
  const all = decks.flatMap((d) => d.cards);
  const due = all
    .filter((c) => isDue(reviews[c.id], now))
    .sort(
      (a, b) => new Date(reviews[a.id]!.dueAt).getTime() - new Date(reviews[b.id]!.dueAt).getTime(),
    );
  const allowance = Math.max(0, opts.maxNew ?? NEW_PER_DAY - newCardsToday());
  const fresh = all.filter((c) => !reviews[c.id]).slice(0, allowance);
  return [...due, ...fresh].slice(0, opts.max ?? 50);
}
