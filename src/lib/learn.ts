import { anatomy } from "./learn-modules/anatomy";
import { physiology } from "./learn-modules/physiology";
import { biochemistry } from "./learn-modules/biochemistry";
import { pharmacology } from "./learn-modules/pharmacology";
import { pathology } from "./learn-modules/pathology";
import { medicine } from "./learn-modules/medicine";
import { surgery } from "./learn-modules/surgery";
import { obgyn } from "./learn-modules/obgyn";
import { pediatrics } from "./learn-modules/pediatrics";

/**
 * Concept modules for the Learn section.
 *
 * Every concept is written to teach, not just to revise: a mechanism paragraph
 * explaining *why* the fact is true, a comparison table, common exam traps, a
 * mnemonic where one genuinely helps, and a clinical vignette to self-test.
 *
 * Reference figures are real images hotlinked from Wikimedia Commons via
 * Special:FilePath (a stable, permanent redirect to the current thumbnail).
 * Every figure keeps its Commons file name so the UI can credit the source.
 */

export type Figure = {
  /** Wikimedia Commons file name, without the "File:" prefix. */
  file: string;
  caption: string;
  credit: string;
};

export type ConceptTable = {
  title: string;
  columns: string[];
  rows: string[][];
};

/** A flowchart / algorithm, rendered as an animated step-by-step path. */
export type Flow = {
  title: string;
  steps: { label: string; detail?: string }[];
};

/** A quick self-check at the end of a concept (secondary to the teaching). */
export type Check = {
  q: string;
  options: string[];
  /** Index into `options`. */
  answer: number;
  why: string;
};

export type Vignette = {
  stem: string;
  answer: string;
  reasoning: string;
};

export type Concept = {
  id: string;
  title: string;
  minutes: number;
  /** One-line orientation: what this concept is about. */
  summary: string;
  /** The teaching paragraph — the mechanism behind the facts. */
  mechanism: string;
  points: string[];
  table?: ConceptTable;
  /** Pathway / algorithm / classification drawn as a flowchart. */
  flow?: Flow;
  /** Where students reliably lose the mark. */
  pitfalls?: string[];
  mnemonic?: string;
  vignette?: Vignette;
  highYield: string;
  /** How this topic tends to be asked in the exam. */
  examFocus?: string;
  figure?: Figure;
  /** Up to two quick self-checks shown after the teaching. */
  checks?: Check[];
};

export type SubjectGroup = "Pre-clinical" | "Para-clinical" | "Clinical";

export type LearnModule = {
  slug: string;
  group: SubjectGroup;
  subject: string;
  icon: string;
  cover?: Figure;
  blurb: string;
  /** What a learner should be able to do after the module. */
  objectives: string[];
  concepts: Concept[];
};

/** Rendered image URL for a Commons file. */
export function figureUrl(file: string, width = 900) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

/** Commons file description page — the attribution target. */
export function figureSource(file: string) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

export const LEARN_MODULES: LearnModule[] = [
  anatomy,
  physiology,
  biochemistry,
  pharmacology,
  pathology,
  medicine,
  surgery,
  obgyn,
  pediatrics,
];

export function getModule(slug: string) {
  return LEARN_MODULES.find((m) => m.slug === slug);
}

export function conceptCount() {
  return LEARN_MODULES.reduce((n, m) => n + m.concepts.length, 0);
}
