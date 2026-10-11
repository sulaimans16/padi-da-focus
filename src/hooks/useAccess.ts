import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPaddleEnvironment } from "@/lib/paddle";

export type Subscription = {
  id: string;
  plan: string;
  status: string;
  amount_inr: number;
  current_period_end: string;
};

export type AccessState = {
  loading: boolean;
  signedIn: boolean;
  isAdmin: boolean;
  isPro: boolean;
  subscription: Subscription | null;
  /** When Pro access from a redeemed coupon ends, if any. */
  couponUntil: string | null;
  refresh: () => Promise<void>;
};

const ACCESS_EVENT = "padida:access-changed";

/** Tell every useAccess() instance to re-check entitlements (e.g. after a coupon). */
export function notifyAccessChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(ACCESS_EVENT));
}

export function useAccess(): AccessState {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [couponUntil, setCouponUntil] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  const refresh = useCallback(async () => {
    if (!userId) {
      setIsAdmin(false);
      setSubscription(null);
      setCouponUntil(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [roles, subs, coupon] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase
        .from("subscriptions")
        .select("id, plan, status, amount_inr, current_period_end")
        .eq("user_id", userId)
        .eq("status", "active")
        .eq("environment", getPaddleEnvironment())
        .gt("current_period_end", new Date().toISOString())
        .order("current_period_end", { ascending: false })
        .limit(1),
      // Fails harmlessly (no access) until the coupons migration is applied.
      supabase.rpc("my_coupon_access"),
    ]);
    setIsAdmin((roles.data ?? []).some((r) => r.role === "admin"));
    setSubscription((subs.data?.[0] as Subscription | undefined) ?? null);
    setCouponUntil(coupon.error ? null : ((coupon.data as string | null) ?? null));
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  useEffect(() => {
    const onChange = () => void refresh();
    window.addEventListener(ACCESS_EVENT, onChange);
    return () => window.removeEventListener(ACCESS_EVENT, onChange);
  }, [refresh]);

  return {
    loading: authLoading || loading,
    signedIn: Boolean(userId),
    isAdmin,
    isPro: isAdmin || Boolean(subscription) || Boolean(couponUntil),
    subscription,
    couponUntil,
    refresh,
  };
}
