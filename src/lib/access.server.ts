import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side entitlement check. Throws when the signed-in user has neither an
 * admin role nor an active paid subscription. Runs with the caller's RLS.
 */
export async function assertPro(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ isAdmin: boolean }> {
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  const isAdmin = (roles ?? []).some((r: { role: string }) => r.role === "admin");
  if (isAdmin) return { isAdmin: true };

  const { data: subs } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("current_period_end", new Date().toISOString())
    .limit(1);

  if (!subs || subs.length === 0) {
    // Promo coupon (e.g. MINI_TRIP) grants Pro until the coupon expires.
    const { data: couponUntil } = await supabase.rpc("my_coupon_access");
    if (couponUntil) return { isAdmin: false };
    throw new Error("AI tools are part of PG Prep Pro. Upgrade from the Pricing page to unlock them.");
  }
  return { isAdmin: false };
}
