import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { currentExam } from "./exam-query";
import type { Roadmap } from "./roadmap.functions";
import { trackKey } from "./track-state";

/**
 * A generated roadmap with the steps ticked off ("phase:step"). Cached in
 * localStorage per track; for signed-in learners also synced to
 * `public.study_roadmaps` so the plan follows them across devices.
 */
export type SavedMap = {
  goal: string;
  roadmap: Roadmap;
  done: string[];
  /** ISO time of the last change to the plan or its progress. */
  updatedAt?: string | undefined;
  /** ISO time the learner last opened it. */
  openedAt?: string | undefined;
};

export const LAST_KEY = () => trackKey("roadmap.__last");

/** Stable id for a goal (also the server's `goal_key`). */
export function goalKey(goal: string) {
  return goal
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 60);
}

export function storageKey(goal: string) {
  return `${trackKey("roadmap")}.${goalKey(goal)}`;
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

function writeLocal(map: SavedMap) {
  try {
    localStorage.setItem(storageKey(map.goal), JSON.stringify(map));
  } catch {
    // storage full — the plan still shows for this session
  }
}

/** Every roadmap cached on this device for the current track. */
function localMaps(): SavedMap[] {
  const prefix = `${trackKey("roadmap")}.`;
  const out: SavedMap[] = [];
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (!k?.startsWith(prefix) || k === LAST_KEY()) continue;
      const m = JSON.parse(localStorage.getItem(k) ?? "null") as SavedMap | null;
      if (m?.goal && m.roadmap) out.push(m);
    }
  } catch {
    // ignore
  }
  return out;
}

// ---------- account sync ----------

type Row = {
  goal_key: string;
  goal: string;
  roadmap: Json;
  done: string[];
  opened_at: string;
  updated_at: string;
};

async function signedInUserId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

const toRow = (userId: string, m: SavedMap) => ({
  user_id: userId,
  exam: currentExam(),
  goal_key: goalKey(m.goal),
  goal: m.goal,
  roadmap: m.roadmap as unknown as Json,
  done: m.done,
  opened_at: m.openedAt ?? m.updatedAt ?? new Date().toISOString(),
  updated_at: m.updatedAt ?? new Date().toISOString(),
});

const fromRow = (r: Row): SavedMap => ({
  goal: r.goal,
  roadmap: r.roadmap as unknown as Roadmap,
  done: r.done ?? [],
  updatedAt: r.updated_at,
  openedAt: r.opened_at,
});

const time = (iso?: string) => (iso ? Date.parse(iso) || 0 : 0);

/**
 * Merge this device's roadmaps with the account's. Per goal the newer
 * `updatedAt` wins (the server on a tie); local-only maps are returned in
 * `push` so a guest's plans move into the account on first sign-in.
 */
export function mergeRoadmaps(local: SavedMap[], remote: SavedMap[]) {
  const byKey = new Map<string, SavedMap>();
  remote.forEach((m) => byKey.set(goalKey(m.goal), m));
  const push: SavedMap[] = [];
  local.forEach((m) => {
    const k = goalKey(m.goal);
    const r = byKey.get(k);
    if (!r) {
      byKey.set(k, m);
      push.push(m);
    } else if (time(m.updatedAt) > time(r.updatedAt)) {
      byKey.set(k, {
        ...m,
        openedAt: time(m.openedAt) > time(r.openedAt) ? m.openedAt : r.openedAt,
      });
      push.push(byKey.get(k)!);
    } else if (time(m.openedAt) > time(r.openedAt)) {
      byKey.set(k, { ...r, openedAt: m.openedAt });
    }
  });
  const merged = [...byKey.values()];
  const last = merged.reduce<SavedMap | null>(
    (best, m) => (!best || time(m.openedAt) > time(best.openedAt) ? m : best),
    null,
  );
  return { merged, push, last };
}

const pending = new Map<string, number>();

async function upload(maps: SavedMap[]) {
  const userId = await signedInUserId();
  if (!userId || !maps.length) return;
  await supabase.from("study_roadmaps").upsert(
    maps.map((m) => toRow(userId, m)),
    { onConflict: "user_id,exam,goal_key" },
  );
}

/**
 * Save a roadmap (new, or with changed progress): cache it on the device now and
 * push it to the account. `debounce` coalesces rapid step ticking into one write.
 */
export function saveRoadmap(map: SavedMap, { debounce = 0 }: { debounce?: number } = {}) {
  const stamped: SavedMap = { ...map, updatedAt: new Date().toISOString() };
  stamped.openedAt ??= stamped.updatedAt;
  writeLocal(stamped);
  const k = goalKey(map.goal);
  const t = pending.get(k);
  if (t) window.clearTimeout(t);
  const send = () => {
    pending.delete(k);
    void upload([stamped]).catch(() => undefined);
  };
  if (debounce > 0) pending.set(k, window.setTimeout(send, debounce));
  else send();
  return stamped;
}

/** The learner opened this roadmap: make it the "continue" plan here and on other devices. */
export function markOpened(map: SavedMap) {
  rememberLastRoadmap(map.goal);
  const openedAt = new Date().toISOString();
  const opened: SavedMap = { ...map, openedAt };
  writeLocal(opened);
  void (async () => {
    const userId = await signedInUserId();
    if (!userId) return;
    await supabase
      .from("study_roadmaps")
      .update({ opened_at: openedAt })
      .eq("exam", currentExam())
      .eq("goal_key", goalKey(map.goal));
  })().catch(() => undefined);
  return opened;
}

/**
 * Pull the account's roadmaps for this track into the device cache (and push
 * any the account lacks). Resolves to the plan to continue, or null. Never
 * throws: signed-out users, offline devices and databases without the table
 * simply keep the local behaviour.
 */
export async function syncRoadmaps(): Promise<SavedMap | null> {
  try {
    if (!(await signedInUserId())) return loadLastRoadmap();
    const { data, error } = await supabase
      .from("study_roadmaps")
      .select("goal_key, goal, roadmap, done, opened_at, updated_at")
      .eq("exam", currentExam())
      .order("opened_at", { ascending: false })
      .limit(50);
    if (error) return loadLastRoadmap();
    const { merged, push, last } = mergeRoadmaps(localMaps(), (data ?? []).map(fromRow));
    merged.forEach(writeLocal);
    if (push.length) await upload(push).catch(() => undefined);
    const localLast = loadLastRoadmap();
    const pick =
      last && (!localLast || time(last.openedAt) >= time(localLast.openedAt)) ? last : localLast;
    if (pick) rememberLastRoadmap(pick.goal);
    return pick ? loadSaved(pick.goal) : null;
  } catch {
    return loadLastRoadmap();
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
