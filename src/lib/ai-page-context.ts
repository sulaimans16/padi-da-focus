import type { Question } from "./questions";

/**
 * What the learner is looking at right now, for Dr. Pulse: the question on
 * screen (quiz, QBank, PYQ) or the lesson that is open. Screens publish it,
 * AskAi reads it when a doubt is sent. A plain module store, no React state.
 */
export type AiQuestion = {
  subject: string;
  topic: string;
  stem: string;
  options: string[];
  answer: string;
  explanation: string;
  /** False while the learner hasn't answered yet (Dr. Pulse then hints first). */
  answered: boolean;
};

export type AiPageContext = {
  question?: AiQuestion | undefined;
  lesson?: { module: string; concept: string } | undefined;
};

let current: { path: string; ctx: AiPageContext } | null = null;

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}…` : s);

export function aiQuestion(q: Question, answered: boolean): AiQuestion {
  const letter = (i: number) => String.fromCharCode(65 + i);
  const correct = q.options.findIndex((o) => o.id === q.correctOptionId);
  return {
    subject: q.subject,
    topic: q.topic,
    stem: clip(q.stem, 1500),
    options: q.options.slice(0, 6).map((o, i) => `${letter(i)}. ${clip(o.text, 200)}`),
    answer: correct >= 0 ? `${letter(correct)}. ${clip(q.options[correct]!.text, 200)}` : "",
    explanation: clip(q.explanation || q.oneLiner || "", 1200),
    answered,
  };
}

/** Publish the page context for the current URL (cleared automatically on navigation). */
export function setAiPageContext(ctx: AiPageContext) {
  if (typeof window === "undefined") return;
  current = { path: window.location.pathname, ctx };
}

export function clearAiPageContext() {
  current = null;
}

/** The context for `path`, or empty when it was published on another page. */
export function getAiPageContext(path: string): AiPageContext {
  return current && current.path === path ? current.ctx : {};
}
