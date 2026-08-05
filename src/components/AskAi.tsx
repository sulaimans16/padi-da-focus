import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { askStudyAi } from "@/lib/ai-help.functions";
import { useAccess } from "@/hooks/useAccess";

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
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI help" : "Ask AI for help"}
        className="fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"
      >
        <Icon name={open ? "close" : "psychology"} className="text-[24px]" />
      </button>

      {open ? (
        <section
          aria-label="AI study help"
          className="fixed bottom-40 right-4 z-50 flex max-h-[70vh] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl md:bottom-22 md:right-6"
        >
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Ask PadiDa AI</p>
              <p className="label-eyebrow">Stuck? Get a 2am-friendly answer</p>
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
                  Ask anything — a concept, a distractor you got wrong, a mnemonic.
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-left text-xs font-semibold hover:bg-tint"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            {turns.map((t, i) => (
              <div
                key={i}
                className={
                  t.role === "you"
                    ? "ml-auto max-w-[85%] rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "max-w-[95%] whitespace-pre-wrap rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm leading-relaxed"
                }
              >
                {t.text}
              </div>
            ))}

            {busy ? <p className="text-xs text-muted-foreground">Thinking…</p> : null}
            {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a doubt…"
              className="min-w-0 flex-1 rounded-full border border-border bg-surface-2 px-3 py-2 text-sm"
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
