import { supabase } from "@/integrations/supabase/client";
import type { TrackId } from "./track-state";
import { trackKey } from "./track-state";

/**
 * First-run setup. `profiles.onboarded_at` (migration 0018) is null only for
 * accounts created after it shipped; existing learners were backfilled, so
 * they never see the wizard.
 */

async function uid() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

/** True when the signed-in learner hasn't finished (or skipped) onboarding yet. */
export async function needsOnboarding(): Promise<boolean> {
  const id = await uid();
  if (!id) return false;
  const { data, error } = await supabase
    .from("profiles")
    .select("onboarded_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return false; // column missing (pre-0018) or no profile: don't block
  return data.onboarded_at == null;
}

export async function markOnboarded() {
  const id = await uid();
  if (!id) return;
  await supabase.from("profiles").update({ onboarded_at: new Date().toISOString() }).eq("id", id);
  try {
    localStorage.setItem("padida.onboardedAt", new Date().toISOString());
  } catch {
    // ignore
  }
}

/** When the learner finished onboarding on this device (drives the Getting started card). */
export function onboardedAt(): number | null {
  try {
    const v = localStorage.getItem("padida.onboardedAt");
    return v ? Date.parse(v) : null;
  } catch {
    return null;
  }
}

/** Save the exam date the same way the dashboard countdown does (goals row + local copy). */
export async function saveExamDate(exam: TrackId, title: string, date: Date) {
  const payload = { title, target_at: date.toISOString() };
  try {
    localStorage.setItem(trackKey("localGoal", exam), JSON.stringify({ id: "local", ...payload }));
  } catch {
    // ignore
  }
  const id = await uid();
  if (!id) return;
  const { data } = await supabase.from("goals").select("id").eq("exam", exam).limit(1);
  if (data?.[0]) await supabase.from("goals").update(payload).eq("id", data[0].id);
  else await supabase.from("goals").insert({ ...payload, user_id: id, exam });
}
