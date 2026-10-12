import { trackKey } from "@/lib/track-state";

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

export function saveActiveSession(session: FocusSession) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(session));
}

export function clearActiveSession() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACTIVE_KEY);
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
