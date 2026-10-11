import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { askStudyAi } from "@/lib/ai-help.functions";
import { AnimatePresence, motion } from "motion/react";
import { useAccess } from "@/hooks/useAccess";
import { Mascot } from "@/components/mascot/Mascot";

type Turn = { role: "you" | "ai"; text: string };

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

const SUGGESTIONS = [
  "Explain the renin–angiotensin system simply",
  "Difference between transudate and exudate?",
  "Fastest way to read a 12-lead ECG",
];

export function AskAi() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ask = useServerFn(askStudyAi);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { isPro, loading: accessLoading } = useAccess();
  const [hint, setHint] = useState(false);

  // A one-time nudge per session so learners discover Dr. Pulse can answer doubts.
  useEffect(() => {
    if (accessLoading || !isPro) return;
    try {
      if (sessionStorage.getItem("padida.askai.hint")) return;
      sessionStorage.setItem("padida.askai.hint", "1");
    } catch {
      return;
    }
    const show = window.setTimeout(() => setHint(true), 2500);
    const hide = window.setTimeout(() => setHint(false), 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [accessLoading, isPro]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [turns, busy]);

  async function send(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setError("");
    setInput("");
    setTurns((t) => [...t, { role: "you", text: q }]);
    setBusy(true);
    try {
      const res = await ask({ data: { question: q, context: `app page ${pathname}` } });
      setTurns((t) => [...t, { role: "ai", text: res.answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI request failed.");
    } finally {
      setBusy(false);
    }
  }

  if (accessLoading || !isPro) return null;

  return (
    <>
      <div className="fixed bottom-24 right-3 z-[45] flex items-end gap-2 md:bottom-5 md:right-5">
        <AnimatePresence>
          {hint && !open ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                setHint(false);
                setOpen(true);
              }}
              className="mb-6 max-w-[11rem] rounded-2xl rounded-br-md border-2 border-glass-line bg-surface px-3 py-2 text-left text-xs font-semibold shadow-[0_4px_0_var(--color-edge)]"
            >
              Stuck on a concept? Ask me anything!
            </motion.button>
          ) : null}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={() => {
            setHint(false);
            setOpen((o) => !o);
          }}
          whileHover={{ scale: 1.08, rotate: -4 }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? "Close Dr. Pulse" : "Ask Dr. Pulse for help"}
          className="relative"
        >
          <Mascot
            mood={busy ? "think" : open ? "happy" : "idle"}
            size={64}
            title="Dr. Pulse, AI study help"
          />
          {open ? (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-surface-3 text-foreground ring-2 ring-background">
              <Icon name="close" className="text-[14px]" />
            </span>
          ) : null}
        </motion.button>
      </div>

      {open ? (
        <section
          aria-label="AI study help"
          className="card-pop fixed bottom-44 right-3 z-50 flex max-h-[65vh] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden !bg-surface md:bottom-28 md:right-5"
        >
          <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b-2 border-glass-line px-4 py-3">
            <Mascot mood={busy ? "think" : "happy"} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Ask Dr. Pulse</p>
              <p className="label-eyebrow">2am-friendly answers to any doubt</p>
            </div>
            {turns.length ? (
              <button
                type="button"
                onClick={() => setTurns([])}
                className="btn-base btn-ghost shrink-0 px-2 py-1 text-xs"
              >
                Clear
              </button>
            ) : null}
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {turns.length === 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Hi! Ask me anything: a concept, a distractor you got wrong, a mnemonic.
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="option-tile py-2 text-xs font-semibold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            {turns.map((t, i) =>
              t.role === "you" ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                >
                  {t.text}
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <Mascot mood="happy" size={30} className="mt-1" />
                  <div className="max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-tl-md border-2 border-glass-line bg-surface-2 px-3 py-2 text-sm leading-relaxed">
                    {t.text}
                  </div>
                </motion.div>
              ),
            )}

            {busy ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mascot mood="think" size={30} />
                Dr. Pulse is thinking…
              </div>
            ) : null}
            {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t-2 border-glass-line p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a doubt…"
              className="min-w-0 flex-1 rounded-full border-2 border-glass-line bg-surface-2 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="btn-base btn-primary h-9 w-9 justify-center p-0 disabled:opacity-50"
              aria-label="Send question"
            >
              <Icon name="send" className="text-[18px]" />
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
