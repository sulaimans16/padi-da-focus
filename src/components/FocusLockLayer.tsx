import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { NagOverlay } from "@/components/NagOverlay";
import { emitGameEvent } from "@/lib/gamification";
import { playSuccess } from "@/lib/sfx";
import {
  addEscape,
  endActiveSession,
  enterFullscreen,
  formatClock,
  onFocusChange,
  peekActiveSession,
  remainingSec,
  type FocusSession,
} from "@/lib/focus-session";
import { activeTrackId, slugOf } from "@/lib/track-state";

const GRACE_MS = 5000;
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const FOCUS_PATH = /^\/neet-(pg|ug)\/focus\/?$/;

/** Links that would take the learner out of this tab: other sites, new tabs, mail and phone. */
function leavesTheTab(a: HTMLAnchorElement, e: MouseEvent) {
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#")) return false;
  if (e.button === 1 || e.metaKey || e.ctrlKey || e.shiftKey) return true;
  if (a.target && a.target !== "_self") return true;
  if (a.hasAttribute("download")) return false;
  try {
    const url = new URL(href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return true;
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * App-wide Focus Lock. While a session runs the learner can use any page of the
 * app, but leaving it is deterred: a timer pill follows them everywhere, outside
 * links and new tabs are blocked, switching away for more than a few seconds
 * counts as an escape (with the PADI DA nag on return), closing the tab asks for
 * confirmation, and the session asks for fullscreen. A web page can't physically
 * stop a tab switch, so this is the strongest lock a browser allows.
 */
export function FocusLockLayer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [session, setSession] = useState<FocusSession | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [nag, setNag] = useState(false);
  const [toast, setToast] = useState("");
  const [fullscreen, setFullscreen] = useState(true);
  const awayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const escapedWhileAway = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Follow the stored session (start, escapes, end — in this tab or another).
  useEffect(() => {
    const sync = () => setSession(peekActiveSession());
    sync();
    return onFocusChange(sync);
  }, []);

  const showToast = useCallback((text: string) => {
    setToast(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
  }, []);

  // Wall-clock countdown; the session finishes here whichever page is open.
  useEffect(() => {
    if (!session) return;
    const tick = () => {
      const left = remainingSec(session);
      setRemaining(left);
      if (left > 0) return;
      const ended = endActiveSession(true);
      if (!ended) return;
      setNag(false);
      playSuccess();
      emitGameEvent({
        type: "celebrate",
        kind: "goal",
        icon: "lock_clock",
        title: "Focus session complete!",
        subtitle: `${plural(Math.round(ended.durationSec / 60), "minute")} locked in · ${
          ended.escapeAttempts ? plural(ended.escapeAttempts, "escape attempt") : "zero escapes"
        }`,
      });
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [session]);

  // Leaving the tab or window: a short grace, then it counts as an escape.
  useEffect(() => {
    if (!session) return;
    const away = () => document.hidden || !document.hasFocus();
    const onLeave = () => {
      if (awayTimer.current || !away()) return;
      awayTimer.current = setTimeout(() => {
        awayTimer.current = null;
        if (!away() || !peekActiveSession()) return;
        addEscape();
        escapedWhileAway.current = true;
        if (!document.hidden) setNag(true);
      }, GRACE_MS);
    };
    const onReturn = () => {
      if (away()) return;
      if (awayTimer.current) {
        clearTimeout(awayTimer.current);
        awayTimer.current = null;
      }
      if (escapedWhileAway.current) {
        escapedWhileAway.current = false;
        setNag(true);
      }
    };
    const onVisibility = () => (document.hidden ? onLeave() : onReturn());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onLeave);
    window.addEventListener("focus", onReturn);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("focus", onReturn);
      if (awayTimer.current) clearTimeout(awayTimer.current);
      awayTimer.current = null;
    };
  }, [session]);

  // Closing or reloading the tab asks for confirmation.
  useEffect(() => {
    if (!session) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Timer running-a irukku da!";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [session]);

  // Outside links, new tabs and window.open are blocked until the timer ends.
  useEffect(() => {
    if (!session) return;
    const blocked = () => {
      addEscape();
      showToast("Outside links and new tabs are locked until your timer ends.");
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!(a instanceof HTMLAnchorElement) || !leavesTheTab(a, e)) return;
      e.preventDefault();
      e.stopPropagation();
      blocked();
    };
    const realOpen = window.open;
    window.open = (() => {
      blocked();
      return null;
    }) as typeof window.open;
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      window.open = realOpen;
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, [session, showToast]);

  // Track fullscreen so the pill can offer to go back in.
  useEffect(() => {
    if (!session) return;
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    sync();
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, [session]);

  const onTimerPage = FOCUS_PATH.test(pathname);
  const canFullscreen =
    typeof document !== "undefined" && Boolean(document.documentElement.requestFullscreen);

  return (
    <>
      <AnimatePresence>
        {session && !onTimerPage && remaining > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            role="status"
            aria-label="Focus Lock running"
            className="fixed left-1/2 top-[4.5rem] z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border-2 border-primary/50 bg-surface py-1.5 pl-3 pr-1.5 text-xs font-semibold shadow-[0_4px_0_var(--color-edge)]"
          >
            <span aria-hidden className="material-symbols-outlined text-[18px] text-primary">
              lock_clock
            </span>
            <span className="font-mono text-sm font-bold tabular-nums">
              {formatClock(remaining)}
            </span>
            <span className="hidden truncate text-muted-foreground sm:inline">
              {session.subject ?? "Focus Lock"}
            </span>
            {canFullscreen && !fullscreen ? (
              <button
                type="button"
                onClick={enterFullscreen}
                className="btn-base btn-ghost h-7 px-2 text-[11px]"
              >
                Fullscreen
              </button>
            ) : null}
            <Link
              to="/$track/focus"
              params={{ track: slugOf(activeTrackId()) }}
              className="btn-base btn-primary h-7 px-2.5 text-[11px]"
            >
              Timer
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="alert"
            className="fixed bottom-28 left-1/2 z-[60] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border-2 border-destructive/50 bg-surface px-4 py-3 text-center text-sm font-semibold shadow-[0_4px_0_var(--color-edge)] md:bottom-8"
          >
            🔒 {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {nag && session ? (
        <NagOverlay attempts={session.escapeAttempts} onDismiss={() => setNag(false)} />
      ) : null}
    </>
  );
}
