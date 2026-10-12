import type { Roadmap } from "./roadmap.functions";
import { trackKey } from "./track-state";

/** A generated roadmap saved on this device, with the steps ticked off ("phase:step"). */
export type SavedMap = { goal: string; roadmap: Roadmap; done: string[] };

export const LAST_KEY = () => trackKey("roadmap.__last");

export function storageKey(goal: string) {
  return `${trackKey("roadmap")}.${goal
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 60)}`;
}

export function loadSaved(goal: string): SavedMap | null {
  try {
    const raw = localStorage.getItem(storageKey(goal));
    return raw ? (JSON.parse(raw) as SavedMap) : null;
  } catch {
    return null;
  }
}

/** The roadmap the learner opened most recently, if any. */
export function loadLastRoadmap(): SavedMap | null {
  try {
    const last = localStorage.getItem(LAST_KEY());
    return last ? loadSaved(last) : null;
  } catch {
    return null;
  }
}

export function rememberLastRoadmap(goal: string) {
  try {
    localStorage.setItem(LAST_KEY(), goal);
  } catch {
    // ignore
  }
}

/** Progress summary for a saved roadmap. */
export function roadmapProgress(map: SavedMap) {
  const done = new Set(map.done);
  const phases = map.roadmap.phases;
  const total = phases.reduce((n, p) => n + p.steps.length, 0);
  const phaseDone = phases.map((p, pi) => p.steps.every((_, si) => done.has(`${pi}:${si}`)));
  const current = phaseDone.indexOf(false);
  let nextStep: { phase: number; title: string } | null = null;
  if (current >= 0) {
    const si = phases[current]!.steps.findIndex((_, i) => !done.has(`${current}:${i}`));
    nextStep = { phase: current, title: phases[current]!.steps[si]?.title ?? "" };
  }
  return {
    total,
    completed: done.size,
    pct: total ? Math.round((done.size / total) * 100) : 0,
    phaseDone,
    current,
    nextStep,
  };
}
