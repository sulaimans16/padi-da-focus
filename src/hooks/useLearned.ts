import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { XP, claimXp } from "@/lib/gamification";

const KEY = "padida.learn.done";

function readLocal(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

/** Concepts marked as learned — `${moduleSlug}/${conceptId}` — merged from device and account. */
export function useLearned() {
  const { user } = useAuth();
  const [local, setLocal] = useState<string[]>([]);
  useEffect(() => setLocal(readLocal()), []);

  const remote = useQuery({
    queryKey: ["learned", user?.id],
    enabled: Boolean(user),
    retry: false,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("xp_events")
        .select("ref_id")
        .eq("source", "concept_done")
        .limit(2000);
      if (error) throw new Error(error.message);
      return (data ?? []).map((r) => r.ref_id);
    },
  });

  const done = new Set([...local, ...(remote.data ?? [])]);

  const markLearned = useCallback(
    async (ref: string) => {
      const next = Array.from(new Set([...readLocal(), ref]));
      writeLocal(next);
      setLocal(next);
      const granted = await claimXp("concept_done", ref, XP.concept);
      void remote.refetch();
      return granted;
    },
    [remote],
  );

  return { done, markLearned };
}
