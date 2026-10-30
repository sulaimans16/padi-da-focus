import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Primitives";
import { NoteEditor, SourceChip } from "@/components/notes/NoteEditor";
import { useAccess } from "@/hooks/useAccess";
import { useTrack } from "@/hooks/useTrack";
import { contextForNote, newNote, noteTitle, sameSource, useNotes, type Note } from "@/lib/notes";
import { cn } from "@/lib/utils";

const POS_KEY = "padida.notes.pos";
const W = 360;
const H = 460;

function loadPos(): { x: number; y: number } | null {
  try {
    const raw = localStorage.getItem(POS_KEY);
    return raw ? (JSON.parse(raw) as { x: number; y: number }) : null;
  } catch {
    return null;
  }
}

const clampPos = (p: { x: number; y: number }) => ({
  x: Math.min(Math.max(8, p.x), window.innerWidth - W - 8),
  y: Math.min(Math.max(72, p.y), window.innerHeight - 56),
});

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement &&
  (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

/**
 * Floating notepad on every in-app page. Opens the note for what's on screen
 * (the lesson, the question, or the page) or starts one tagged to it. A
 * draggable window on desktop, a bottom sheet on phones. Shortcut: N.
 */
export function NotesDock() {
  const track = useTrack();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { notes, status } = useNotes(track.id);
  const { isPro, loading: accessLoading } = useAccess();
  const desktop = useIsDesktop();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"edit" | "list">("edit");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Note | null>(null);
  const [query, setQuery] = useState("");
  const [minimised, setMinimised] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const active = (activeId ? notes.find((n) => n.id === activeId) : null) ?? draft;

  /** Open the note for what's on screen, or start one tagged to it. */
  const openForContext = () => {
    const ctx = contextForNote(window.location.pathname, track.id);
    const existing = notes.find((n) => sameSource(n, ctx));
    if (existing) {
      setActiveId(existing.id);
      setDraft(null);
    } else {
      const n = newNote(track.id, ctx);
      setDraft(n);
      setActiveId(n.id);
    }
    setView("edit");
  };

  const startNew = () => {
    const n = newNote(track.id, contextForNote(window.location.pathname, track.id));
    setDraft(n);
    setActiveId(n.id);
    setView("edit");
  };

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    openForContext();
    setMinimised(false);
    setOpen(true);
  };

  // Keyboard shortcut: N (when not typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !desktop) setOpen(false);
      if (e.key.toLowerCase() !== "n" || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target))
        return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Track changes: a note belongs to one exam.
  useEffect(() => {
    setOpen(false);
    setDraft(null);
    setActiveId(null);
  }, [track.id]);

  // Desktop window position (remembered).
  useEffect(() => {
    if (!desktop) return;
    const saved = loadPos();
    setPos(clampPos(saved ?? { x: window.innerWidth - W - 24, y: window.innerHeight - H - 120 }));
  }, [desktop]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!desktop || !pos || (e.target as HTMLElement).closest("button")) return;
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPos(clampPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy }));
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    try {
      if (pos) localStorage.setItem(POS_KEY, JSON.stringify(pos));
    } catch {
      // ignore
    }
  };

  const ctxNow = useMemo(
    () => (open ? contextForNote(pathname, track.id) : null),
    [open, pathname, track.id],
  );
  const q = query.trim().toLowerCase();
  const matches = (n: Note) =>
    !q ||
    `${n.title} ${n.body} ${n.subject ?? ""} ${n.source_label ?? ""}`.toLowerCase().includes(q);
  const here = ctxNow ? notes.filter((n) => sameSource(n, ctxNow) && matches(n)) : [];
  const others = notes.filter((n) => !here.includes(n) && matches(n)).slice(0, 30);

  // Sit above Dr. Pulse when it's shown (Pro), otherwise take its spot.
  const aiShown = !accessLoading && isPro;

  const header = (
    <div
      className={cn(
        "flex items-center gap-1 border-b-2 border-glass-line px-3 py-2",
        desktop && "cursor-grab active:cursor-grabbing",
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Icon name="edit_note" filled className="text-[20px] text-primary" />
      <p className="mr-auto text-sm font-bold">Notes</p>
      <button
        type="button"
        onClick={startNew}
        aria-label="New note for this page"
        title="New note for this page"
        className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
      >
        <Icon name="add" className="text-[20px]" />
      </button>
      <button
        type="button"
        onClick={() => {
          setView(view === "list" ? "edit" : "list");
          setMinimised(false);
        }}
        aria-label={view === "list" ? "Back to note" : "All notes"}
        aria-pressed={view === "list"}
        title="All notes"
        className={cn(
          "grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground",
          view === "list" && "bg-primary/15 text-primary",
        )}
      >
        <Icon name="list" className="text-[20px]" />
      </button>
      {desktop ? (
        <button
          type="button"
          onClick={() => setMinimised((m) => !m)}
          aria-label={minimised ? "Expand notes" : "Minimise notes"}
          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
        >
          <Icon name={minimised ? "expand_less" : "remove"} className="text-[20px]" />
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close notes"
        className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground"
      >
        <Icon name="close" className="text-[20px]" />
      </button>
    </div>
  );

  const list = (
    <div className="flex min-h-0 flex-1 flex-col">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes"
        aria-label="Search notes"
        className="w-full rounded-full bg-surface-2/60 px-3 py-1.5 text-sm outline-none ring-1 ring-glass-line focus:ring-primary/50"
      />
      <div className="mt-2 min-h-0 flex-1 space-y-3 overflow-y-auto">
        {[
          { title: "This page", items: here },
          { title: here.length ? "Other notes" : "All notes", items: others },
        ].map((sec) =>
          sec.items.length ? (
            <div key={sec.title}>
              <p className="label-eyebrow">{sec.title}</p>
              <ul className="mt-1 space-y-1">
                {sec.items.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(n.id);
                        setDraft(null);
                        setView("edit");
                      }}
                      className="w-full rounded-xl bg-surface-2/50 px-3 py-2 text-left hover:bg-surface-2"
                    >
                      <span className="flex items-center gap-1 text-sm font-semibold">
                        {n.pinned ? (
                          <Icon name="push_pin" filled className="text-[14px] text-primary" />
                        ) : null}
                        <span className="truncate">{noteTitle(n)}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {n.source_label ?? "Note"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null,
        )}
        {!here.length && !others.length ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {q ? "No notes match." : "No notes yet. Tap + to start one."}
          </p>
        ) : null}
      </div>
      <Link
        to="/$track/notes"
        params={{ track: track.slug }}
        onClick={() => setOpen(false)}
        className="btn-base btn-ghost mt-2 h-9 w-full text-xs"
      >
        Open all notes
      </Link>
    </div>
  );

  const content =
    view === "list" || !active ? (
      list
    ) : (
      <NoteEditor
        note={active}
        status={status}
        autoFocus
        compact={!desktop}
        onDeleted={() => {
          setDraft(null);
          setActiveId(null);
          setView("list");
        }}
      />
    );

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? "Close notes" : "Open notes"}
        aria-expanded={open}
        title="Notes (N)"
        className={cn(
          "fixed right-4 z-[45] grid size-12 place-items-center rounded-full border-2 border-glass-line bg-surface text-primary shadow-[0_4px_0_var(--color-edge)] md:right-6",
          aiShown ? "bottom-[10.75rem] md:bottom-[6.5rem]" : "bottom-24 md:bottom-6",
          open && "bg-primary text-primary-foreground",
        )}
      >
        <Icon name={open ? "close" : "edit_note"} filled className="text-[24px]" />
        {!open && notes.length ? (
          <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground ring-2 ring-background">
            {notes.length > 99 ? "99+" : notes.length}
          </span>
        ) : null}
      </motion.button>

      <AnimatePresence>
        {open ? (
          desktop ? (
            <motion.section
              key="notes-window"
              aria-label="Notes"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              style={
                pos ? { left: pos.x, top: pos.y, width: W } : { right: 24, bottom: 120, width: W }
              }
              className={cn(
                "card-pop fixed z-[55] flex flex-col overflow-hidden !bg-surface",
                minimised ? "h-auto" : "",
              )}
            >
              {header}
              {!minimised ? (
                <div className="flex min-h-0 flex-col p-3" style={{ height: H - 50 }}>
                  {content}
                </div>
              ) : active && view === "edit" ? (
                <div className="px-3 py-2">
                  <SourceChip note={active} />
                </div>
              ) : null}
            </motion.section>
          ) : (
            <motion.div
              key="notes-sheet"
              className="fixed inset-0 z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Close notes"
                onClick={() => setOpen(false)}
                className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"
              />
              <motion.section
                aria-label="Notes"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute inset-x-0 bottom-0 flex h-[72vh] flex-col overflow-hidden rounded-t-[1.75rem] border-t-2 border-glass-line bg-surface pb-[env(safe-area-inset-bottom)]"
              >
                <span aria-hidden className="mx-auto mt-2 h-1 w-10 rounded-full bg-glass-line" />
                {header}
                <div className="flex min-h-0 flex-1 flex-col p-3">{content}</div>
              </motion.section>
            </motion.div>
          )
        ) : null}
      </AnimatePresence>
    </>
  );
}
