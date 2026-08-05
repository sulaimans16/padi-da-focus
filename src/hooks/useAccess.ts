import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  refresh: () => Promise<void>;
};

export function useAccess(): AccessState {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  const refresh = useCallback(async () => {
    if (!userId) {
      setIsAdmin(false);
      setSubscription(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [roles, subs] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase
        .from("subscriptions")
        .select("id, plan, status, amount_inr, current_period_end")
        .eq("user_id", userId)
        .eq("status", "active")
        .gt("current_period_end", new Date().toISOString())
        .order("current_period_end", { ascending: false })
        .limit(1),
    ]);
    setIsAdmin((roles.data ?? []).some((r) => r.role === "admin"));
    setSubscription((subs.data?.[0] as Subscription | undefined) ?? null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  return {
    loading: authLoading || loading,
    signedIn: Boolean(userId),
    isAdmin,
    isPro: isAdmin || Boolean(subscription),
    subscription,
    refresh,
  };
}
