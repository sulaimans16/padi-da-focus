import { supabase } from "@/integrations/supabase/client";
import { currentExam } from "./exam-query";
import { fetchMockQuestions } from "./quiz";

/**
 * Social layer: @usernames, friends (requests + invite links), friend challenges
 * (graded on the server) and the monthly sprint. All writes are RPCs defined in
 * migration 0015_social.
 */

export type Friend = {
  user_id: string;
  username: string | null;
  name: string;
  status: "pending" | "accepted";
  direction: "friend" | "incoming" | "outgoing";
  streak: number | null;
  xp_total: number | null;
  week_xp: number | null;
};

export type Challenge = {
  id: string;
  created_at: string;
  expires_at: string;
  question_ids: string[];
  mine: boolean;
  opponent_name: string;
  opponent_username: string | null;
  total: number;
  my_score: number | null;
  my_seconds: number | null;
  their_score: number | null;
  their_seconds: number | null;
  they_played: boolean;
  state: "to_play" | "waiting" | "done" | "expired";
};

export type SprintEntry = {
  rank: number;
  xp: number;
  is_me: boolean;
  name: string;
  username: string | null;
};

export type MonthlyEvent = {
  title: string;
  starts_at: string;
  ends_at: string;
  participants: number;
  me: { rank: number; xp: number } | null;
  top: SprintEntry[];
  reward: string;
};

/** Pull a readable message out of a PostgREST / RPC error. */
function fail(error: { message: string } | null): never {
  throw new Error(error?.message?.replace(/^.*?:\s*(?=[A-Z])/, "") || "Something went wrong.");
}

export const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

export function normaliseUsername(raw: string) {
  return raw.trim().replace(/^@/, "").toLowerCase();
}

/** The signed-in user's @username, or null (also null before migration 0015). */
export async function fetchMyUsername(): Promise<string | null> {
  const { data: s } = await supabase.auth.getSession();
  const uid = s.session?.user.id;
  if (!uid) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", uid)
    .maybeSingle();
  if (error) return null;
  return data?.username ?? null;
}

export async function setUsername(name: string): Promise<string> {
  const { data, error } = await supabase.rpc("set_username", { _name: normaliseUsername(name) });
  if (error) fail(error);
  rememberUsername(data);
  return data;
}

export async function fetchFriends(): Promise<Friend[]> {
  const { data, error } = await supabase.rpc("get_friends", { _exam: currentExam() });
  if (error) fail(error);
  return (data ?? []) as unknown as Friend[];
}

export async function requestFriend(username: string): Promise<"pending" | "accepted"> {
  const { data, error } = await supabase.rpc("request_friend", {
    _username: normaliseUsername(username),
  });
  if (error) fail(error);
  return data as "pending" | "accepted";
}

export async function respondFriend(other: string, accept: boolean) {
  const { error } = await supabase.rpc("respond_friend", { _other: other, _accept: accept });
  if (error) fail(error);
}

export async function removeFriend(other: string) {
  const { error } = await supabase.rpc("remove_friend", { _other: other });
  if (error) fail(error);
}

export async function fetchChallenges(): Promise<Challenge[]> {
  const { data, error } = await supabase.rpc("list_challenges", { _exam: currentExam() });
  if (error) fail(error);
  return (data ?? []) as unknown as Challenge[];
}

/** Ten bank questions for a challenge (the server only grades bank questions). */
export async function pickChallengeQuestions(count = 10): Promise<string[]> {
  const UUID = /^[0-9a-f-]{36}$/i;
  const qs = await fetchMockQuestions(count * 2);
  return [...new Set(qs.map((q) => q.id).filter((id) => UUID.test(id)))].slice(0, count);
}

export async function createChallenge(opponent: string): Promise<string> {
  const ids = await pickChallengeQuestions();
  if (ids.length < 5) throw new Error("Not enough bank questions on this track yet.");
  const { data, error } = await supabase.rpc("create_challenge", {
    _exam: currentExam(),
    _opponent: opponent,
    _question_ids: ids,
  });
  if (error) fail(error);
  return data;
}

export async function submitChallenge(
  id: string,
  answers: Record<string, string>,
  seconds: number,
): Promise<{ score: number; total: number }> {
  const { data, error } = await supabase.rpc("submit_challenge", {
    _id: id,
    _answers: answers,
    _seconds: Math.round(seconds),
  });
  if (error) fail(error);
  return data as unknown as { score: number; total: number };
}

export async function fetchMonthlyEvent(): Promise<MonthlyEvent> {
  const { data, error } = await supabase.rpc("get_monthly_event", { _exam: currentExam() });
  if (error) fail(error);
  return data as unknown as MonthlyEvent;
}

// ---------- invite links ----------

const REF_KEY = "padida.inviteRef";
const ME_KEY = "padida.username";

/** Cache the user's own @username so share links can carry it without a fetch. */
export function rememberUsername(name: string | null) {
  try {
    if (name) localStorage.setItem(ME_KEY, name);
    else localStorage.removeItem(ME_KEY);
  } catch {
    // ignore
  }
}

export function cachedUsername(): string | null {
  try {
    return localStorage.getItem(ME_KEY);
  } catch {
    return null;
  }
}

/** Remember `?ref=<username>` from an invite link until the visitor is signed in. */
export function captureInviteRef(search: string) {
  try {
    const ref = new URLSearchParams(search).get("ref");
    const name = ref ? normaliseUsername(ref) : "";
    if (USERNAME_RE.test(name)) localStorage.setItem(REF_KEY, name);
  } catch {
    // ignore
  }
}

/** Once signed in, turn a captured invite into a friendship. Returns the inviter's name. */
export async function claimInviteRef(): Promise<string | null> {
  let ref: string | null = null;
  try {
    ref = localStorage.getItem(REF_KEY);
  } catch {
    return null;
  }
  if (!ref) return null;
  const { data, error } = await supabase.rpc("accept_invite", { _username: ref });
  if (error) return null; // keep it for a later try (e.g. offline)
  // New learners also earn a referral: 7 days of Pro each after their first 10 answers.
  await supabase.rpc("record_referral", { _username: ref }).then(
    () => undefined,
    () => undefined,
  );
  try {
    localStorage.removeItem(REF_KEY);
  } catch {
    // ignore
  }
  return data === "accepted" ? ref : null;
}

// ---------- referrals ----------

export type MyReferrals = {
  invited: number;
  qualified: number;
  days_earned: number;
  pending: string[];
  referred_by: string | null;
};

export const REFERRAL_DAYS = 7;

export async function fetchMyReferrals(): Promise<MyReferrals | null> {
  const { data, error } = await supabase.rpc("my_referrals");
  if (error) return null; // before migration 0018
  return data as unknown as MyReferrals;
}
