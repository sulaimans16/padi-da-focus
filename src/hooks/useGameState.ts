import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchGameState,
  levelForXp,
  localGameState,
  onGameEvent,
  rankFor,
  type GameState,
} from "@/lib/gamification";

// XP predicted on the client but not yet reflected in a server refetch.
let pending = 0;
const pendingListeners = new Set<() => void>();
const notifyPending = () => pendingListeners.forEach((fn) => fn());

export function addPendingXp(amount: number) {
  pending += amount;
  notifyPending();
}

export function clearPendingXp() {
  if (pending === 0) return;
  pending = 0;
  notifyPending();
}

function usePendingXp() {
  return useSyncExternalStore(
    (fn) => {
      pendingListeners.add(fn);
      return () => pendingListeners.delete(fn);
    },
    () => pending,
    () => 0,
  );
}

export const GAME_QUERY_KEY = ["game-state"] as const;

/** Live game state: server-backed when signed in, local mirror otherwise. */
export function useGameState() {
  const { user, loading: authLoading } = useAuth();
  const [local, setLocal] = useState<GameState | null>(null);
  const extra = usePendingXp();

  const query = useQuery({
    queryKey: [...GAME_QUERY_KEY, user?.id ?? "guest"],
    queryFn: fetchGameState,
    enabled: Boolean(user),
    staleTime: 30_000,
    retry: 1,
  });

  useEffect(() => {
    setLocal(localGameState());
    return onGameEvent((e) => {
      if (e.type === "xp" || e.type === "sync") setLocal(localGameState());
    });
  }, []);

  const server = query.data;
  const base: GameState | null = server ?? local;
  // Server state absorbs predictions on refetch; local mirror already includes them.
  const optimistic = server ? extra : 0;
  const state = base
    ? { ...base, xpTotal: base.xpTotal + optimistic, todayXp: base.todayXp + optimistic }
    : null;
  const level = levelForXp(state?.xpTotal ?? 0);

  return {
    state,
    level,
    rank: rankFor(level.level),
    signedIn: Boolean(user),
    loading: authLoading || (Boolean(user) && query.isLoading && !local),
    serverReady: Boolean(server),
    refetch: query.refetch,
    dataUpdatedAt: query.dataUpdatedAt,
  };
}
