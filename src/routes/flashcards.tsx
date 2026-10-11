import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Primitives";
import { Reveal, SPRING } from "@/components/motion/Reveal";
import { ProgressBar } from "@/components/game/Widgets";
import { MascotSays } from "@/components/mascot/Mascot";
import { FlashcardSession } from "@/components/flashcards/FlashcardSession";
import {
  NEW_PER_DAY,
  addCustomCard,
  buildSession,
  customDeck,
  deckStats,
  deleteCustomCard,
  fetchReviews,
  learnDecks,
  newCardsToday,
  savedQuestionDeck,
  type Deck,
  type Flashcard,
  type ReviewMap,
} from "@/lib/flashcards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flashcards")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Flashcards — PG Prep" },
      {
        name: "description",
        content:
          "Spaced-repetition flashcards for NEET PG: high-yield facts, mnemonics, exam traps and clinical cases, scheduled with FSRS so you review right before you'd forget.",
      },
    ],
  }),
  component: FlashcardsPage,
});

const tint = (hue: number) => `oklch(0.75 0.13 ${hue})`;

function AddCardForm({ onAdded }: { onAdded: () => void }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!front.trim() || !back.trim()) return;
        setBusy(true);
        setError("");
        try {
          await addCustomCard(front, back);
          setFront("");
          setBack("");
          onAdded();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Couldn't save the card");
        } finally {
          setBusy(false);
        }
      }}
      className="mt-4 space-y-2"
    >
      <textarea
        value={front}
        onChange={(e) => setFront(e.target.value)}
        maxLength={600}
        rows={2}
        placeholder="Front, e.g. Drug of choice for absence seizures?"
        className="w-full rounded-2xl border-2 border-glass-line bg-surface-2 px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <textarea
        value={back}
        onChange={(e) => setBack(e.target.value)}
        maxLength={1200}
        rows={2}
        placeholder="Back, e.g. Ethosuximide (valproate if mixed seizures)"
        className="w-full rounded-2xl border-2 border-glass-line bg-surface-2 px-4 py-3 text-sm outline-none focus:border-primary"
      />
      {error ? <p className="text-xs font-semibold text-destructive">{error}</p> : null}
      <button
        type="submit"
        disabled={busy || !front.trim() || !back.trim()}
        className="btn-base btn-primary h-11 w-full text-sm"
      >
        <Icon name="add" className="text-[18px]" />
        {busy ? "Saving…" : "Add card"}
      </button>
    </form>
  );
}

function DeckCard({
  deck,
  reviews,
  onStudy,
  children,
}: {
  deck: Deck;
  reviews: ReviewMap;
  onStudy: () => void;
  children?: React.ReactNode;
}) {
  const s = deckStats(deck, reviews);
  const color = tint(deck.hue);
  return (
    <div className="card-pop flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `color-mix(in oklab, ${color} 22%, transparent)`, color }}
        >
          <Icon name={deck.icon} filled className="text-[24px]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold">{deck.title}</p>
          <p className="text-xs text-muted-foreground">{s.total} cards</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={cn("chip", s.due ? "text-destructive" : "")}>{s.due} due</span>
        <span className="chip text-primary">{s.fresh} new</span>
      </div>
      <ProgressBar value={s.total ? s.learned / s.total : 0} color={color} className="mt-4 h-2.5" />
      <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground">
        {s.learned}/{s.total} started
      </p>
      {children}
      <button
        type="button"
        disabled={!s.due && !s.fresh}
        onClick={onStudy}
        className="btn-base btn-ghost mt-auto h-11 w-full pt-2 text-sm"
        style={{ marginTop: "1rem" }}
      >
        <Icon name="style" filled className="text-[18px]" />
        {s.due ? `Review ${s.due}` : s.fresh ? "Learn new cards" : "All caught up"}
      </button>
    </div>
  );
}

function FlashcardsPage() {
  const decks = useMemo(() => learnDecks(), []);
  const [saved, setSaved] = useState<Deck | null>(null);
  const [custom, setCustom] = useState<Deck | null>(null);
  const [reviews, setReviews] = useState<ReviewMap>({});
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Flashcard[] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newToday, setNewToday] = useState(0);

  const refresh = useCallback(async () => {
    // Learn decks are bundled; show them as soon as review state is in, and let the
    // network-backed decks (saved questions, my cards) fill in when they arrive.
    void savedQuestionDeck()
      .then(setSaved)
      .catch(() => setSaved(null));
    void customDeck()
      .then(setCustom)
      .catch(() => setCustom(null));
    setReviews(await fetchReviews().catch(() => ({})));
    setNewToday(newCardsToday());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const allDecks = useMemo(
    () => [
      ...(custom?.cards.length ? [custom] : []),
      ...(saved?.cards.length ? [saved] : []),
      ...decks,
    ],
    [decks, saved, custom],
  );
  const totals = useMemo(() => {
    let due = 0;
    let learned = 0;
    allDecks.forEach((d) => {
      const s = deckStats(d, reviews);
      due += s.due;
      learned += s.learned;
    });
    return { due, learned };
  }, [allDecks, reviews]);

  const start = (deckList: Deck[]) => {
    const cards = buildSession(deckList, reviews);
    setSession(cards);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <FlashcardSession
          cards={session}
          reviews={reviews}
          onReviewed={(id, state) => setReviews((r) => ({ ...r, [id]: state }))}
          onExit={() => {
            setSession(null);
            void refresh();
          }}
        />
      </div>
    );
  }

  const newLeft = Math.max(0, NEW_PER_DAY - newToday);
  const sessionSize = buildSession(allDecks, reviews).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Spaced repetition</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Flashcards</h1>
        <MascotSays
          mood={totals.due ? "think" : totals.learned ? "happy" : "idle"}
          size={80}
          className="mt-4 max-w-xl"
        >
          {loading
            ? "Shuffling your decks…"
            : totals.due
              ? `${totals.due} card${totals.due > 1 ? "s are" : " is"} due. Review them now, right before you'd forget.`
              : totals.learned
                ? "Nothing due right now. Learn a few new cards or come back later."
                : "Flashcards come back right before you'd forget them. Start with 20 new cards a day."}
        </MascotSays>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="card-pop mt-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <div className="grid flex-1 grid-cols-3 gap-3">
            {[
              { label: "Due now", value: totals.due, color: "var(--color-destructive)" },
              { label: "New left today", value: newLeft, color: "var(--color-primary)" },
              { label: "Cards started", value: totals.learned, color: "var(--color-xp)" },
            ].map((t) => (
              <div key={t.label}>
                <p
                  className="font-display text-3xl font-bold tabular-nums"
                  style={{ color: t.color }}
                >
                  {loading ? "…" : t.value}
                </p>
                <p className="label-eyebrow">{t.label}</p>
              </div>
            ))}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            disabled={loading || !sessionSize}
            onClick={() => start(allDecks)}
            className="btn-base btn-primary h-14 w-full px-8 text-base sm:w-auto"
          >
            <Icon name="play_arrow" filled className="text-[22px]" />
            {sessionSize ? `Start review · ${sessionSize}` : "All caught up"}
          </motion.button>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal>
          <div className="card-pop flex h-full flex-col p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gem/20 text-gem">
                <Icon name="edit_note" filled className="text-[24px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-bold">My cards</p>
                <p className="text-xs text-muted-foreground">
                  {custom?.cards.length ?? 0} cards you wrote
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAdd((v) => !v)}
                aria-expanded={showAdd}
                className="btn-base btn-ghost h-9 w-9 p-0"
                aria-label="Add a card"
              >
                <Icon name={showAdd ? "close" : "add"} className="text-[20px]" />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {showAdd ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <AddCardForm
                    onAdded={() => {
                      void refresh();
                    }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            {custom?.cards.length ? (
              <ul className="mt-4 max-h-40 space-y-1.5 overflow-y-auto">
                {custom.cards.slice(0, 20).map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-2 rounded-xl bg-surface-2/50 px-3 py-2 text-xs"
                  >
                    <span className="min-w-0 flex-1 truncate">{c.front}</span>
                    <button
                      type="button"
                      onClick={() => void deleteCustomCard(c.id).then(refresh)}
                      aria-label="Delete card"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Icon name="delete" className="text-[16px]" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : !showAdd ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Write your own cards for anything the decks miss. Tap + to add one.
              </p>
            ) : null}
            {custom?.cards.length ? (
              <button
                type="button"
                onClick={() => start([custom])}
                className="btn-base btn-ghost mt-4 h-11 w-full text-sm"
              >
                <Icon name="style" filled className="text-[18px]" />
                Study my cards
              </button>
            ) : null}
          </div>
        </Reveal>

        {saved?.cards.length ? (
          <Reveal>
            <DeckCard deck={saved} reviews={reviews} onStudy={() => start([saved])} />
          </Reveal>
        ) : (
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-[1.75rem] border-2 border-dashed border-glass-line p-5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2 font-semibold text-foreground">
                <Icon name="bookmark" className="text-[20px]" />
                Saved questions deck
              </p>
              <p className="mt-1">
                Bookmark questions in the QBank or PYQ Vault and they turn into cards here.
              </p>
            </div>
          </Reveal>
        )}

        {decks.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: Math.min(i, 6) * 0.04 }}
          >
            <DeckCard deck={d} reviews={reviews} onStudy={() => start([d])} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
