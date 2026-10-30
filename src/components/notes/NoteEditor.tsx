import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/Primitives";
import { MiniMarkdown } from "@/components/MiniMarkdown";
import { addCustomCard } from "@/lib/flashcards";
import {
  NOTE_LIMITS,
  deleteNote,
  noteTitle,
  saveNote,
  type Note,
  type SyncStatus,
} from "@/lib/notes";
import { cn } from "@/lib/utils";

const SOURCE_ICON = { lesson: "menu_book", question: "quiz", page: "bookmark" } as const;

export function SourceChip({ note, className }: { note: Note; className?: string }) {
  const router = useRouter();
  if (!note.source_label) return null;
  const label = [
    note.subject && !note.source_label.includes(note.subject) ? note.subject : null,
    note.source_label,
  ]
    .filter(Boolean)
    .join(" · ");
  const body = (
    <>
      <Icon name={SOURCE_ICON[note.source_kind]} className="text-[14px]" />
      <span className="truncate">{label}</span>
    </>
  );
  const cls = cn(
    "inline-flex max-w-full items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary",
    className,
  );
  return note.source_path ? (
    <a
      href={note.source_path}
      onClick={(e) => {
        e.preventDefault();
        router.history.push(note.source_path!);
      }}
      className={cn(cls, "hover:bg-primary/20")}
      data-source-link
    >
      {body}
    </a>
  ) : (
    <span className={cls}>{body}</span>
  );
}

export function StatusText({ status }: { status: SyncStatus }) {
  const text =
    status === "saving"
      ? "Saving…"
      : status === "saved"
        ? "Saved"
        : status === "local"
          ? "Saved on this device"
          : status === "error"
            ? "Saved on this device · will sync later"
            : "";
  return <span className="text-[11px] text-muted-foreground">{text}</span>;
}

/** Wrap or prefix the textarea selection, keeping the cursor sensible. */
function applyFormat(el: HTMLTextAreaElement, kind: "bold" | "bullet" | "heading") {
  const { selectionStart: a, selectionEnd: b, value } = el;
  if (kind === "bold") {
    const sel = value.slice(a, b) || "bold text";
    const next = `${value.slice(0, a)}**${sel}**${value.slice(b)}`;
    return { next, start: a + 2, end: a + 2 + sel.length };
  }
  const lineStart = value.lastIndexOf("\n", a - 1) + 1;
  const prefix = kind === "bullet" ? "- " : "## ";
  const line = value.slice(lineStart);
  if (line.startsWith(prefix)) {
    const next = value.slice(0, lineStart) + line.slice(prefix.length);
    return { next, start: a - prefix.length, end: b - prefix.length };
  }
  const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
  return { next, start: a + prefix.length, end: b + prefix.length };
}

/** Title + markdown-lite body with autosave, preview, make-flashcard, pin and delete. */
export function NoteEditor({
  note,
  status,
  onDeleted,
  autoFocus = false,
  compact = false,
}: {
  note: Note;
  status: SyncStatus;
  onDeleted?: () => void;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [preview, setPreview] = useState(false);
  const [card, setCard] = useState<{ front: string; back: string } | null>(null);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ta = useRef<HTMLTextAreaElement | null>(null);
  // Selection to restore right after a programmatic edit (same commit, so typing can't race it).
  const caret = useRef<[number, number] | null>(null);
  const latest = useRef(note);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deleted = useRef(false);

  // Switching to another note resets the draft.
  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
    setPreview(false);
    setCard(null);
    setConfirmDelete(false);
    latest.current = note;
    deleted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  const flush = (t: string, b: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (deleted.current) return;
    const cur = latest.current;
    if (cur.title === t && cur.body === b) return;
    // Don't store a note nobody has typed into yet.
    if (!t.trim() && !b.trim() && !cur.title && !cur.body) return;
    latest.current = saveNote({ ...cur, title: t, body: b });
  };

  const schedule = (t: string, b: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(t, b), 400);
  };

  // Save whatever is pending when the editor closes or switches note.
  const pending = useRef({ title, body });
  pending.current = { title, body };
  useEffect(
    () => () => flush(pending.current.title, pending.current.body),

    [note.id],
  );

  useLayoutEffect(() => {
    const el = ta.current;
    if (!el || !caret.current) return;
    el.focus();
    el.setSelectionRange(caret.current[0], caret.current[1]);
    caret.current = null;
  }, [body]);

  const format = (kind: "bold" | "bullet" | "heading") => {
    const el = ta.current;
    if (!el) return;
    const { next, start, end } = applyFormat(el, kind);
    setBody(next);
    schedule(title, next);
    caret.current = [start, end];
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      format("bold");
      return;
    }
    // Enter inside a bullet continues the list; on an empty bullet it ends it.
    if (e.key === "Enter" && !e.shiftKey) {
      const el = e.currentTarget;
      const a = el.selectionStart;
      const lineStart = body.lastIndexOf("\n", a - 1) + 1;
      const line = body.slice(lineStart, a);
      if (/^- /.test(line)) {
        e.preventDefault();
        const next =
          line === "- "
            ? body.slice(0, lineStart) + body.slice(a)
            : `${body.slice(0, a)}\n- ${body.slice(el.selectionEnd)}`;
        const pos = line === "- " ? lineStart : a + 3;
        setBody(next);
        schedule(title, next);
        caret.current = [pos, pos];
      }
    }
  };

  const openCard = () => {
    const el = ta.current;
    const sel = el ? body.slice(el.selectionStart, el.selectionEnd).trim() : "";
    if (sel) {
      // Selection: first line is the question, the rest (or the next line) the answer.
      const [front, ...rest] = sel.split("\n");
      const after =
        body
          .slice(el!.selectionEnd)
          .split("\n")
          .find((l) => l.trim()) ?? "";
      setCard({
        front: front!.replace(/^[-#*\s]+/, ""),
        back: (rest.join("\n") || after).replace(/^[-\s]+/, ""),
      });
    } else {
      setCard({
        front: title.trim() || noteTitle({ ...note, title, body }),
        back: body.trim().slice(0, 1200),
      });
    }
  };

  const saveCard = async () => {
    if (!card?.front.trim() || !card.back.trim()) return;
    try {
      await addCustomCard(card.front.slice(0, 600), card.back.slice(0, 1200));
      setCard(null);
      setToast("Added to My cards in Flashcards");
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Couldn't add the card.");
    }
    setTimeout(() => setToast(""), 2500);
  };

  const go = (href: string) => router.history.push(href);

  const tool =
    "grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <SourceChip note={note} />
        <span className="ml-auto">
          <StatusText status={status} />
        </span>
      </div>
      <input
        value={title}
        maxLength={NOTE_LIMITS.title}
        onChange={(e) => {
          setTitle(e.target.value);
          schedule(e.target.value, body);
        }}
        onBlur={() => flush(title, body)}
        placeholder="Title"
        aria-label="Note title"
        className="mt-2 w-full bg-transparent font-display text-lg font-bold outline-none placeholder:text-muted-foreground/60"
      />

      <div className="mt-1 flex items-center gap-0.5 border-b border-glass-line pb-1">
        <button
          type="button"
          aria-label="Bold"
          onMouseDown={(e) => e.preventDefault()}
          title="Bold (Ctrl/⌘+B)"
          onClick={() => format("bold")}
          className={tool}
          disabled={preview}
        >
          <Icon name="format_bold" className="text-[18px]" />
        </button>
        <button
          type="button"
          aria-label="Bullet list"
          onMouseDown={(e) => e.preventDefault()}
          title="Bullet list"
          onClick={() => format("bullet")}
          className={tool}
          disabled={preview}
        >
          <Icon name="format_list_bulleted" className="text-[18px]" />
        </button>
        <button
          type="button"
          aria-label="Heading"
          onMouseDown={(e) => e.preventDefault()}
          title="Heading"
          onClick={() => format("heading")}
          className={tool}
          disabled={preview}
        >
          <Icon name="title" className="text-[18px]" />
        </button>
        <button
          type="button"
          aria-pressed={preview}
          onClick={() => {
            flush(title, body);
            setPreview((p) => !p);
          }}
          className={cn(
            tool,
            "ml-1 w-auto px-2 text-xs font-semibold",
            preview && "bg-primary/15 text-primary",
          )}
        >
          {preview ? "Edit" : "Preview"}
        </button>
        <span className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Make flashcard"
            title="Make a flashcard from this note (or the selected text)"
            onClick={openCard}
            className={tool}
          >
            <Icon name="style" className="text-[18px]" />
          </button>
          <button
            type="button"
            aria-label={note.pinned ? "Unpin note" : "Pin note"}
            aria-pressed={note.pinned}
            onClick={() => {
              flush(title, body);
              latest.current = saveNote({
                ...latest.current,
                title,
                body,
                pinned: !latest.current.pinned,
              });
            }}
            className={cn(tool, note.pinned && "text-primary")}
          >
            <Icon name="push_pin" filled={note.pinned} className="text-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Delete note"
            onClick={() => setConfirmDelete(true)}
            className={cn(tool, "hover:text-destructive")}
          >
            <Icon name="delete" className="text-[18px]" />
          </button>
        </span>
      </div>

      {confirmDelete ? (
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-xs">
          <span className="mr-auto font-semibold text-destructive">Delete this note?</span>
          <button
            type="button"
            onClick={() => {
              if (timer.current) clearTimeout(timer.current);
              deleted.current = true;
              deleteNote(note.exam, note.id);
              onDeleted?.();
            }}
            className="font-bold text-destructive"
          >
            Delete
          </button>
          <button type="button" onClick={() => setConfirmDelete(false)} className="font-bold">
            Cancel
          </button>
        </div>
      ) : null}

      {preview ? (
        <div
          className={cn(
            "mt-2 min-h-0 flex-1 overflow-y-auto text-sm leading-relaxed",
            compact ? "max-h-none" : "",
          )}
        >
          {body.trim() ? (
            <MiniMarkdown text={body} go={go} headings />
          ) : (
            <p className="text-muted-foreground">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <textarea
          ref={ta}
          value={body}
          autoFocus={autoFocus}
          maxLength={NOTE_LIMITS.body}
          onChange={(e) => {
            setBody(e.target.value);
            schedule(title, e.target.value);
          }}
          onBlur={() => flush(title, body)}
          onKeyDown={onKeyDown}
          placeholder={
            "Write while you study…\n- Use bullets for quick points\n**Bold** the high-yield bits"
          }
          aria-label="Note"
          className={cn(
            "mt-2 min-h-[8rem] w-full flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground/50",
          )}
        />
      )}

      {card ? (
        <div
          className="mt-2 space-y-2 rounded-2xl border-2 border-glass-line bg-surface-2/60 p-3"
          role="dialog"
          aria-label="Make flashcard"
        >
          <p className="text-xs font-bold">New flashcard</p>
          <input
            value={card.front}
            onChange={(e) => setCard({ ...card, front: e.target.value })}
            maxLength={600}
            aria-label="Flashcard front"
            placeholder="Question / prompt"
            className="w-full rounded-lg bg-background/60 px-2.5 py-1.5 text-sm outline-none ring-1 ring-glass-line focus:ring-primary/50"
          />
          <textarea
            value={card.back}
            onChange={(e) => setCard({ ...card, back: e.target.value })}
            maxLength={1200}
            rows={3}
            aria-label="Flashcard back"
            placeholder="Answer"
            className="w-full resize-none rounded-lg bg-background/60 px-2.5 py-1.5 text-sm outline-none ring-1 ring-glass-line focus:ring-primary/50"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void saveCard()}
              disabled={!card.front.trim() || !card.back.trim()}
              className="btn-base btn-primary h-9 flex-1 text-xs"
            >
              Add to My cards
            </button>
            <button
              type="button"
              onClick={() => setCard(null)}
              className="btn-base btn-ghost h-9 px-3 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {toast ? (
        <p
          role="status"
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-success"
        >
          <Icon name="check_circle" className="text-[16px]" />
          {toast}
          {toast.startsWith("Added") ? (
            <Link
              to="/$track/flashcards"
              params={{ track: note.exam === "neet_ug" ? "neet-ug" : "neet-pg" }}
              className="ml-1 underline"
            >
              Open
            </Link>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
