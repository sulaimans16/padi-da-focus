import { trackKey } from "@/lib/track-state";
import { registerFocus } from "@/lib/gamification";
import { recordFocusSession } from "@/lib/tracker";

export type FocusSession = {
  startedAt: number;
  durationSec: number;
  subject: string | null;
  escapeAttempts: number;
  cameraWatch?: boolean;
  sensitivity?: number;
};

export type CompletedSession = {
  startedAt: number;
  endedAt: number;
  plannedDurationSec: number;
  actualDurationSec: number;
  subject: string | null;
  escapeAttempts: number;
  completed: boolean;
};

const ACTIVE_KEY = "padida.focus.active";
const LOG_KEY = () => trackKey("focus.log");

const isBrowser = () => typeof window !== "undefined";

export function loadActiveSession(): FocusSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as FocusSession;
    if (remainingSec(session) <= 0) {
      window.localStorage.removeItem(ACTIVE_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/** The stored session even when its timer already ran out (so it can still be recorded). */
export function peekActiveSession(): FocusSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_KEY);
    return raw ? (JSON.parse(raw) as FocusSession) : null;
  } catch {
    return null;
  }
}

export function saveActiveSession(session: FocusSession) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(session));
  emitFocusChange({ kind: "update", session });
}

export function clearActiveSession() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACTIVE_KEY);
}

/** Ask for fullscreen; browsers only allow it from a click, so callers pass one through. */
export function enterFullscreen() {
  const el = document.documentElement;
  if (document.fullscreenElement || !el.requestFullscreen) return;
  void el.requestFullscreen().catch(() => undefined);
}

// ---------- app-wide lock events ----------

export type FocusChange =
  | { kind: "update"; session: FocusSession }
  | { kind: "ended"; session: FocusSession; completed: boolean };

const FOCUS_EVENT = "padida:focus";

function emitFocusChange(detail: FocusChange) {
  window.dispatchEvent(new CustomEvent<FocusChange>(FOCUS_EVENT, { detail }));
}

/** Subscribe to lock start / escape / end, in this tab and in other tabs of the app. */
export function onFocusChange(fn: (change: FocusChange | null) => void) {
  const local = (e: Event) => fn((e as CustomEvent<FocusChange>).detail);
  const other = (e: StorageEvent) => {
    if (e.key === ACTIVE_KEY) fn(null);
  };
  window.addEventListener(FOCUS_EVENT, local);
  window.addEventListener("storage", other);
  return () => {
    window.removeEventListener(FOCUS_EVENT, local);
    window.removeEventListener("storage", other);
  };
}

/** Count one escape (left the tab, tried an outside link) on the running session. */
export function addEscape(): FocusSession | null {
  const active = peekActiveSession();
  if (!active) return null;
  const next = { ...active, escapeAttempts: active.escapeAttempts + 1 };
  saveActiveSession(next);
  return next;
}

/**
 * End the running session exactly once: log it, sync it, award XP when it was
 * completed, then clear it. Safe to call from several places (or tabs) at once:
 * whoever finds the session still stored records it, everyone else gets null.
 */
export function endActiveSession(completed: boolean): FocusSession | null {
  const session = peekActiveSession();
  if (!session) return null;
  clearActiveSession();
  const endedAt = Math.min(Date.now(), session.startedAt + session.durationSec * 1000);
  const minutes = (endedAt - session.startedAt) / 60000;
  logSession({
    startedAt: session.startedAt,
    endedAt,
    plannedDurationSec: session.durationSec,
    actualDurationSec: Math.round((endedAt - session.startedAt) / 1000),
    subject: session.subject,
    escapeAttempts: session.escapeAttempts,
    completed,
  });
  void recordFocusSession({
    minutes,
    plannedMinutes: session.durationSec / 60,
    escapes: session.escapeAttempts,
    completed,
    startedAt: new Date(session.startedAt).toISOString(),
  });
  if (completed) registerFocus(minutes);
  emitFocusChange({ kind: "ended", session, completed });
  return session;
}

export function remainingSec(session: FocusSession) {
  return Math.max(
    0,
    Math.ceil((session.startedAt + session.durationSec * 1000 - Date.now()) / 1000),
  );
}

export function logSession(entry: CompletedSession) {
  if (!isBrowser()) return;
  const log = loadSessionLog();
  log.unshift(entry);
  window.localStorage.setItem(LOG_KEY(), JSON.stringify(log.slice(0, 200)));
}

export function loadSessionLog(): CompletedSession[] {
  if (!isBrowser()) return [];
  try {
    return (JSON.parse(window.localStorage.getItem(LOG_KEY()) ?? "[]") as CompletedSession[]) ?? [];
  } catch {
    return [];
  }
}

export function formatClock(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export const EXAM_DATE_KEY = () => trackKey("examDate");
export const DEFAULT_EXAM_DATE = "2026-08-30";

export function loadExamDate() {
  if (!isBrowser()) return DEFAULT_EXAM_DATE;
  return window.localStorage.getItem(EXAM_DATE_KEY()) ?? DEFAULT_EXAM_DATE;
}

export const SUBJECTS = [
  "Medicine",
  "Surgery",
  "Obstetrics & Gynaecology",
  "Pediatrics",
  "Pharmacology",
  "Pathology",
  "Microbiology",
  "PSM",
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Radiology",
  "Anaesthesia",
  "Ophthalmology",
  "ENT",
  "Orthopaedics",
  "Psychiatry",
  "Dermatology",
  "Forensic Medicine",
] as const;
