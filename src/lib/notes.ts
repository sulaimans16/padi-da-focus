import { useEffect, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAiPageContext } from "./ai-page-context";
import type { TrackId } from "./track-state";
import { TRACKS } from "./tracks";

/**
 * Study notes. Local-first: every edit is written to this device immediately
 * (typing never waits on the network); signed-in learners are also synced to
 * `public.study_notes` (migration 0022) with a short debounce, and the newest
 * edit wins when two devices disagree. Guest notes are uploaded after sign-in.
 */

export type NoteSourceKind = "lesson" | "question" | "page";

export type Note = {
  id: string;
  exam: TrackId;
  title: string;
  body: string;
  subject: string | null;
  source_kind: NoteSourceKind;
  source_ref: string | null;
  source_label: string | null;
  source_path: string | null;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  /** Local only: changed since the last successful sync. */
  dirty?: boolean;
  /** Local only: has existed on the server (so a missing server row means deleted elsewhere). */
  synced?: boolean;
  /** Local only: deleted here, waiting to be deleted on the server. */
  deleted?: boolean;
};

export type NoteContext = Pick<
  Note,
  "subject" | "source_kind" | "source_ref" | "source_label" | "source_path"
>;

export type SyncStatus = "idle" | "saving" | "saved" | "local" | "error";

export const NOTE_LIMITS = { title: 120, body: 20000 };

// ---------- store ----------

const key = (exam: TrackId) => `padida.${exam}.notes`;
const cache = new Map<TrackId, Note[]>();
const listeners = new Set<() => void>();
let status: SyncStatus = "idle";
const timers = new Map<TrackId, ReturnType<typeof setTimeout>>();
const syncedOnce = new Set<string>();

function emit() {
  listeners.forEach((fn) => fn());
}

function setStatus(s: SyncStatus) {
  if (status === s) return;
  status = s;
  emit();
}

function read(exam: TrackId): Note[] {
  const hit = cache.get(exam);
  if (hit) return hit;
  let notes: Note[] = [];
  try {
    notes = JSON.parse(localStorage.getItem(key(exam)) ?? "[]") as Note[];
  } catch {
    notes = [];
  }
  cache.set(exam, notes);
  return notes;
}

function write(exam: TrackId, notes: Note[]) {
  cache.set(exam, notes);
  try {
    localStorage.setItem(key(exam), JSON.stringify(notes));
  } catch {
    // storage full or blocked: keep the in-memory copy
  }
  emit();
}

/** Visible notes, pinned first, then most recently edited. */
export function sortNotes(notes: Note[]) {
  return notes
    .filter((n) => !n.deleted)
    .sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) || Date.parse(b.updated_at) - Date.parse(a.updated_at),
    );
}

export function getNotes(exam: TrackId) {
  return sortNotes([...read(exam)]);
}

async function userId() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

const toRow = (n: Note, uid: string) => ({
  id: n.id,
  user_id: uid,
  exam: n.exam,
  title: n.title.slice(0, NOTE_LIMITS.title),
  body: n.body.slice(0, NOTE_LIMITS.body),
  subject: n.subject,
  source_kind: n.source_kind,
  source_ref: n.source_ref,
  source_label: n.source_label?.slice(0, 160) ?? null,
  source_path: n.source_path?.slice(0, 300) ?? null,
  pinned: n.pinned,
  created_at: n.created_at,
  updated_at: n.updated_at,
});

/** Upload pending changes for one exam. */
async function push(exam: TrackId) {
  const uid = await userId();
  if (!uid) {
    setStatus("local");
    return;
  }
  const pending = read(exam).filter((n) => n.dirty);
  if (!pending.length) {
    setStatus("saved");
    return;
  }
  setStatus("saving");
  try {
    const gone = pending.filter((n) => n.deleted).map((n) => n.id);
    const live = pending.filter((n) => !n.deleted);
    if (gone.length) {
      const { error } = await supabase.from("study_notes").delete().in("id", gone);
      if (error) throw error;
    }
    if (live.length) {
      const { error } = await supabase.from("study_notes").upsert(live.map((n) => toRow(n, uid)));
      if (error) throw error;
    }
    const done = new Map(pending.map((n) => [n.id, n.updated_at]));
    write(
      exam,
      read(exam)
        .filter((n) => !(n.deleted && done.has(n.id)))
        // Only clear the flag if the note hasn't changed again meanwhile.
        .map((n) => (done.get(n.id) === n.updated_at ? { ...n, dirty: false, synced: true } : n)),
    );
    setStatus("saved");
  } catch (e) {
    console.error("[notes] sync failed", e);
    setStatus("error");
  }
}

function schedulePush(exam: TrackId, delay = 800) {
  const t = timers.get(exam);
  if (t) clearTimeout(t);
  timers.set(
    exam,
    setTimeout(() => {
      timers.delete(exam);
      void push(exam);
    }, delay),
  );
}

/** Merge local and server notes (newest edit wins), then upload what's pending. */
export async function syncNotes(exam: TrackId) {
  const uid = await userId();
  if (!uid) {
    setStatus("local");
    return;
  }
  const { data, error } = await supabase
    .from("study_notes")
    .select("*")
    .eq("exam", exam)
    .order("updated_at", { ascending: false })
    .limit(2000);
  if (error) {
    setStatus("error");
    return;
  }
  const remote = new Map((data ?? []).map((r) => [r.id, r]));
  const merged: Note[] = [];
  for (const n of read(exam)) {
    const r = remote.get(n.id);
    remote.delete(n.id);
    if (!r) {
      // Not on the server: upload it if it's new here (or edited offline);
      // drop it if it was synced and is now gone (deleted on another device).
      if (n.deleted) continue;
      if (!n.synced || n.dirty) merged.push({ ...n, dirty: true });
      continue;
    }
    if (n.dirty && Date.parse(n.updated_at) >= Date.parse(r.updated_at)) merged.push(n);
    else merged.push({ ...(r as unknown as Note), exam, dirty: false, synced: true });
  }
  remote.forEach((r) =>
    merged.push({ ...(r as unknown as Note), exam, dirty: false, synced: true }),
  );
  write(exam, merged);
  await push(exam);
}

export function newNote(exam: TrackId, ctx: NoteContext): Note {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    exam,
    title: "",
    body: "",
    pinned: false,
    created_at: now,
    updated_at: now,
    ...ctx,
  };
}

/** Save a note (created or edited) locally now and to the account shortly. */
export function saveNote(note: Note) {
  const updated = { ...note, updated_at: new Date().toISOString(), dirty: true };
  const notes = read(note.exam);
  const i = notes.findIndex((n) => n.id === note.id);
  write(note.exam, i >= 0 ? notes.map((n, j) => (j === i ? updated : n)) : [updated, ...notes]);
  setStatus("saving");
  schedulePush(note.exam);
  return updated;
}

export function deleteNote(exam: TrackId, id: string) {
  const notes = read(exam);
  const target = notes.find((n) => n.id === id);
  if (!target) return;
  write(
    exam,
    target.synced
      ? notes.map((n) =>
          n.id === id
            ? { ...n, deleted: true, dirty: true, updated_at: new Date().toISOString() }
            : n,
        )
      : notes.filter((n) => n.id !== id),
  );
  schedulePush(exam, 0);
}

export const isEmptyNote = (n: Note) => !n.title.trim() && !n.body.trim();

/** Live notes for a track (syncs with the account once per session). */
export function useNotes(exam: TrackId) {
  const notes = useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => read(exam),
    () => EMPTY,
  );
  const s = useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => status,
    () => "idle" as SyncStatus,
  );
  useEffect(() => {
    const syncKey = exam;
    if (syncedOnce.has(syncKey)) return;
    syncedOnce.add(syncKey);
    void syncNotes(exam);
    // Upload guest notes as soon as someone signs in.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") void syncNotes(exam);
    });
    return () => sub.subscription.unsubscribe();
  }, [exam]);
  return { notes: sortNotes([...notes]), status: s };
}

const EMPTY: Note[] = [];

// ---------- context tagging ----------

const PAGE_NAMES: Record<string, string> = {
  "": "Home",
  learn: "Learn",
  practice: "Practice",
  bank: "QBank",
  pyq: "PYQ Vault",
  mock: "Mock test",
  daily: "Daily Challenge",
  flashcards: "Flashcards",
  review: "Fix Mistakes",
  roadmap: "Roadmap",
  videos: "Videos",
  papers: "Papers",
  tracker: "Analytics",
  "weak-spots": "Weak Spots",
  focus: "Focus Lock",
  notes: "Notes",
  friends: "Friends",
  leagues: "Leagues",
  profile: "Profile",
  batch: "My Batch",
};

/** What a new note should be tagged with: the open lesson, the question on screen, or the page. */
export function contextForNote(pathname: string, exam: TrackId): NoteContext {
  const ctx = getAiPageContext(pathname);
  const track = TRACKS[exam];
  if (ctx.lesson) {
    const mod = track.learn.find((m) => m.slug === ctx.lesson!.module);
    const concept = mod?.concepts.find((c) => c.id === ctx.lesson!.concept);
    if (mod && concept)
      return {
        subject: mod.subject,
        source_kind: "lesson",
        source_ref: `${mod.slug}/${concept.id}`,
        source_label: concept.title,
        source_path: `/${track.slug}/learn/${mod.slug}#${concept.id}`,
      };
  }
  if (ctx.question) {
    const stem = ctx.question.stem.replace(/\s+/g, " ").trim();
    return {
      subject: ctx.question.subject || null,
      source_kind: "question",
      source_ref: ctx.question.id ?? null,
      source_label: stem.length > 80 ? `${stem.slice(0, 80)}…` : stem,
      source_path: pathname,
    };
  }
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[1] ?? "";
  let label = PAGE_NAMES[section] ?? "Study notes";
  let subject: string | null = null;
  // Subject pages (QBank / Learn / Videos by subject) carry the subject in the URL.
  if (parts[2] && ["bank", "learn", "videos"].includes(section)) {
    const mod = track.learn.find((m) => m.slug === parts[2]);
    const fromSlug = decodeURIComponent(parts[2]).replace(/-/g, " ");
    subject =
      mod?.subject ??
      track.subjects.find(
        (s) =>
          s
            .toLowerCase()
            .replace(/[^a-z]+/g, " ")
            .trim() === fromSlug.toLowerCase(),
      ) ??
      null;
    if (subject) label = `${label} · ${mod ? (mod.title ?? mod.subject) : subject}`;
  }
  return {
    subject,
    source_kind: "page",
    source_ref: null,
    source_label: label,
    source_path: pathname,
  };
}

/** Same source as a context? (So the dock reopens "this page's" note.) */
export function sameSource(n: Note, ctx: NoteContext) {
  if (ctx.source_kind === "page")
    return n.source_kind === "page" && n.source_path === ctx.source_path;
  return n.source_kind === ctx.source_kind && n.source_ref === ctx.source_ref;
}

/** A note's display title: its title, else its first line. */
export function noteTitle(n: Note) {
  const first =
    n.body
      .split("\n")
      .find((l) => l.trim())
      ?.replace(/^[#\-*\s]+/, "") ?? "";
  return n.title.trim() || first.slice(0, 80) || "Untitled note";
}

export function notesToMarkdown(notes: Note[], trackName: string) {
  const lines = [`# ${trackName} notes`, `Exported ${new Date().toLocaleString()}`, ""];
  for (const n of sortNotes([...notes])) {
    lines.push(`## ${noteTitle(n)}`);
    const meta = [n.subject, n.source_label].filter(Boolean).join(" · ");
    if (meta) lines.push(`_${meta}_`);
    lines.push("", n.body.trim(), "");
  }
  return lines.join("\n");
}
