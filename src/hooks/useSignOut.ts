import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Signs the current user out cleanly:
 * 1. stops in-flight queries so nothing 401s after the session is gone,
 * 2. drops cached protected data,
 * 3. clears the session,
 * 4. replaces history entry so Back must not restore a protected route.
 */
export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }, [queryClient, navigate]);
}
