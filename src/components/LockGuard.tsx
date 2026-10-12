import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { loadActiveSession, saveActiveSession } from "@/lib/focus-session";
import { activeTrackId, slugOf } from "@/lib/track-state";

/**
 * Global backstop: while a Focus Lock session is running, no route other than
 * /focus is allowed to stay on screen. Any escape (link, browser back/forward,
 * typed URL, refresh into another page) counts as an escape attempt and yanks
 * the user straight back to the locked timer.
 */
export function LockGuard() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (/^\/neet-(pg|ug)\/focus$/.test(pathname)) return;
    const check = () => {
      const active = loadActiveSession();
      if (!active) return;
      saveActiveSession({ ...active, escapeAttempts: active.escapeAttempts + 1 });
      window.sessionStorage.setItem("padida.focus.escaped", "1");
      navigate({
        to: "/$track/focus",
        params: { track: slugOf(activeTrackId()) },
        replace: true,
      });
    };
    check();
    const id = setInterval(check, 500);
    return () => clearInterval(id);
  }, [pathname, navigate]);

  return null;
}
