import { supabase } from "@/integrations/supabase/client";
import { shuffle } from "./quiz";
import type { TrackId } from "./track-state";

/**
 * Institute / batch mode: coaching institutes run batches, students join with a
 * code, faculty see their batch's progress and set assignments. Every call is
 * an RPC from migration 0020_institutes (tables are RPC-only).
 */

export type BatchAssignment = {
  id: string;
  title: string;
  due_at: string | null;
  created_at: string;
  question_ids: string[];
  total: number;
  my_score: number | null;
  my_seconds: number | null;
  avg_score: number | null;
  submissions: number;
};

export type MyBatch = {
  id: string;
  name: string;
  exam: TrackId;
  institute: string;
  city: string;
  verified: boolean;
  joined_at: string;
  members: number;
  assignments: BatchAssignment[];
  leaderboard: {
    rank: number;
    name: string;
    username: string | null;
    xp: number;
    is_me: boolean;
  }[];
};

export type BatchPreview = {
  batch: string;
  institute: string;
  city: string;
  exam: TrackId;
  verified: boolean;
  pro_days: number;
};

export type StaffBatch = {
  id: string;
  name: string;
  exam: TrackId;
  join_code: string;
  pro_days: number;
  active: boolean;
  created_at: string;
  members: number;
  assignments: number;
};

export type StaffInstitute = {
  id: string;
  name: string;
  city: string;
  verified: boolean;
  role: "owner" | "faculty";
  staff: { user_id: string; role: "owner" | "faculty"; username: string | null; name: string }[];
  batches: StaffBatch[];
};

export type DashboardStudent = {
  user_id: string;
  username: string | null;
  name: string;
  joined_at: string;
  last_active: string | null;
  q7: number;
  q30: number;
  accuracy30: number | null;
  streak: number;
  week_xp: number;
  assignments_done: number;
};

export type TopicAccuracy = {
  subject: string;
  topic: string;
  attempts: number;
  students: number;
  accuracy: number;
};

export type BatchDashboard = {
  batch: {
    id: string;
    name: string;
    exam: TrackId;
    join_code: string;
    pro_days: number;
    active: boolean;
  };
  assignments_total: number;
  students: DashboardStudent[];
  weak_topics: TopicAccuracy[];
  subjects: { subject: string; attempts: number; accuracy: number }[];
  activity: { day: string; active: number; questions: number }[];
  assignments: {
    id: string;
    title: string;
    due_at: string | null;
    created_at: string;
    total: number;
    submissions: number;
    avg_score: number | null;
  }[];
};

export type AssignmentResults = {
  id: string;
  title: string;
  due_at: string | null;
  total: number;
  students: {
    user_id: string;
    username: string | null;
    name: string;
    score: number | null;
    seconds: number | null;
    submitted_at: string | null;
  }[];
  questions: {
    id: string;
    stem: string;
    topic: string;
    subject: string;
    answered: number;
    correct: number;
  }[];
};

/** Pull a readable message out of a PostgREST / RPC error. */
function fail(error: { message: string } | null): never {
  throw new Error(error?.message?.replace(/^.*?:\s*(?=[A-Z])/, "") || "Something went wrong.");
}

export const normaliseCode = (raw: string) =>
  raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);

export const CODE_RE = /^[A-Z0-9]{8}$/;

export function joinUrl(code: string) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://pg-pre.learners-studio.com";
  return `${origin}/join/${code}`;
}

// ---------- students ----------

export async function previewBatch(code: string): Promise<BatchPreview | null> {
  const { data, error } = await supabase.rpc("batch_preview", { _code: normaliseCode(code) });
  if (error) return null;
  return (data as unknown as BatchPreview | null) ?? null;
}

export async function joinBatch(
  code: string,
): Promise<{ batch_id: string; exam: TrackId; joined: boolean; pro_days: number }> {
  const { data, error } = await supabase.rpc("join_batch", { _code: normaliseCode(code) });
  if (error) fail(error);
  return data as unknown as { batch_id: string; exam: TrackId; joined: boolean; pro_days: number };
}

export async function leaveBatch(batch: string) {
  const { error } = await supabase.rpc("leave_batch", { _batch: batch });
  if (error) fail(error);
}

/** The signed-in student's batches (empty before migration 0020 or when signed out). */
export async function fetchMyBatches(exam?: TrackId): Promise<MyBatch[]> {
  const { data, error } = await supabase.rpc("my_batches", ...(exam ? [{ _exam: exam }] : []));
  if (error) return [];
  return (data ?? []) as unknown as MyBatch[];
}

export async function submitAssignment(
  id: string,
  answers: Record<string, string>,
  seconds: number,
): Promise<{ score: number; total: number }> {
  const { data, error } = await supabase.rpc("submit_assignment", {
    _id: id,
    _answers: answers,
    _seconds: Math.round(seconds),
  });
  if (error) fail(error);
  return data as unknown as { score: number; total: number };
}

// ---------- join links ----------

const CODE_KEY = "padida.batchCode";

/** Remember a /join/<code> until the visitor is signed in. */
export function captureJoinCode(code: string) {
  const c = normaliseCode(code);
  if (!CODE_RE.test(c)) return;
  try {
    localStorage.setItem(CODE_KEY, c);
  } catch {
    // ignore
  }
}

export function pendingJoinCode(): string | null {
  try {
    return localStorage.getItem(CODE_KEY);
  } catch {
    return null;
  }
}

/** Once signed in, join the remembered batch. Resolves to the join result, or null. */
export async function claimJoinCode() {
  const code = pendingJoinCode();
  if (!code) return null;
  try {
    const res = await joinBatch(code);
    localStorage.removeItem(CODE_KEY);
    return res;
  } catch (e) {
    // An invalid code won't become valid; anything else (offline) retries later.
    if (e instanceof Error && /isn.t valid/.test(e.message)) localStorage.removeItem(CODE_KEY);
    return null;
  }
}

// ---------- staff ----------

export async function fetchStaffOverview(): Promise<StaffInstitute[] | null> {
  const { data, error } = await supabase.rpc("staff_overview");
  if (error) return null;
  return (data ?? []) as unknown as StaffInstitute[];
}

export async function createInstitute(name: string, city: string): Promise<string> {
  const { data, error } = await supabase.rpc("create_institute", { _name: name, _city: city });
  if (error) fail(error);
  return data;
}

export async function addStaff(institute: string, username: string) {
  const { error } = await supabase.rpc("add_institute_staff", {
    _institute: institute,
    _username: username,
  });
  if (error) fail(error);
}

export async function removeStaff(institute: string, user: string) {
  const { error } = await supabase.rpc("remove_institute_staff", {
    _institute: institute,
    _user: user,
  });
  if (error) fail(error);
}

export async function createBatch(
  institute: string,
  name: string,
  exam: TrackId,
  proDays: number,
): Promise<string> {
  const { data, error } = await supabase.rpc("create_batch", {
    _institute: institute,
    _name: name,
    _exam: exam,
    _pro_days: proDays,
  });
  if (error) fail(error);
  return data;
}

export async function updateBatch(batch: string, active: boolean | null, rotateCode = false) {
  const { data, error } = await supabase.rpc("update_batch", {
    _batch: batch,
    // null on the wire keeps the current value (the RPC COALESCEs it).
    _active: (active ?? undefined) as boolean,
    _rotate_code: rotateCode,
  });
  if (error) fail(error);
  return data;
}

export async function fetchBatchDashboard(batch: string): Promise<BatchDashboard> {
  const { data, error } = await supabase.rpc("batch_dashboard", { _batch: batch });
  if (error) fail(error);
  return data as unknown as BatchDashboard;
}

export async function createAssignment(
  batch: string,
  title: string,
  questionIds: string[],
  dueAt: Date | null,
): Promise<string> {
  const { data, error } = await supabase.rpc("create_assignment", {
    _batch: batch,
    _title: title,
    _question_ids: questionIds,
    ...(dueAt ? { _due_at: dueAt.toISOString() } : {}),
  });
  if (error) fail(error);
  return data;
}

export async function deleteAssignment(id: string) {
  const { error } = await supabase.rpc("delete_assignment", { _id: id });
  if (error) fail(error);
}

export async function fetchAssignmentResults(id: string): Promise<AssignmentResults> {
  const { data, error } = await supabase.rpc("assignment_results", { _id: id });
  if (error) fail(error);
  return data as unknown as AssignmentResults;
}

/** Topics in the bank for one subject, for the assignment picker. */
export async function fetchBankTopics(exam: TrackId, subject: string): Promise<string[]> {
  const { data } = await supabase
    .from("questions")
    .select("topic")
    .eq("exam", exam)
    .eq("subject", subject)
    .limit(2000);
  const topics = new Set(
    ((data ?? []) as { topic: string | null }[]).map((r) => r.topic?.trim() || ""),
  );
  topics.delete("");
  return [...topics].sort((a, b) => a.localeCompare(b));
}

/** Random bank questions for an assignment, filtered by subject / topic / PYQ year. */
export async function pickAssignmentQuestions(opts: {
  exam: TrackId;
  count: number;
  subject?: string | undefined;
  topic?: string | undefined;
  pyqYear?: number | undefined;
}): Promise<string[]> {
  let q = supabase.from("questions").select("id").eq("exam", opts.exam);
  if (opts.subject) q = q.eq("subject", opts.subject);
  if (opts.topic) q = q.eq("topic", opts.topic);
  if (opts.pyqYear) q = q.eq("is_pyq", true).eq("pyq_year", opts.pyqYear);
  const { data, error } = await q.limit(500);
  if (error) fail(error);
  const ids = ((data ?? []) as { id: string }[]).map((r) => String(r.id));
  return shuffle(ids).slice(0, opts.count);
}

// ---------- admin ----------

export type AdminInstitute = {
  id: string;
  name: string;
  city: string;
  verified: boolean;
  created_at: string;
  owner: string | null;
  owner_email: string | null;
  batches: number;
  students: number;
};

export async function fetchAdminInstitutes(): Promise<AdminInstitute[]> {
  const { data, error } = await supabase.rpc("admin_list_institutes");
  if (error) return [];
  return (data ?? []) as unknown as AdminInstitute[];
}

export async function verifyInstitute(id: string, verified: boolean) {
  const { error } = await supabase.rpc("admin_verify_institute", { _id: id, _verified: verified });
  if (error) fail(error);
}

// ---------- display helpers ----------

export function relativeDay(iso: string | null) {
  if (!iso) return "Never";
  const days = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export const pct = (x: number | null | undefined) => (x == null ? "–" : `${Math.round(x * 100)}%`);
