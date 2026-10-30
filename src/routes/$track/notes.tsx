import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Icon } from "@/components/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MascotSays } from "@/components/mascot/Mascot";
import { NoteEditor, SourceChip, StatusText } from "@/components/notes/NoteEditor";
import { useTrack } from "@/hooks/useTrack";
import { newNote, noteTitle, notesToMarkdown, useNotes, type Note } from "@/lib/notes";
import { localizeHead } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$track/notes")({
  staticData: { sitemap: false },
  head: ({ params }) => localizeHead(params.track, { meta: [{ title: "My Notes — PG Prep" }] }),
  component: NotesPage,
});

function ago(iso: string) {
  const mins = Math.floor((Date.now() - Date.parse(iso)) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function snippet(n: Note) {
  return n.body
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/^- /gm, "• ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

function NotesPage() {
  const track = useTrack();
  const { notes, status } = useNotes(track.id);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Note | null>(null);

  const subjects = useMemo(
    () => [...new Set(notes.map((n) => n.subject).filter((s): s is string => Boolean(s)))].sort(),
    [notes],
  );
  const q = query.trim().toLowerCase();
  const shown = notes.filter(
    (n) =>
      (!subject || n.subject === subject) &&
      (!q || `${n.title} ${n.body} ${n.source_label ?? ""}`.toLowerCase().includes(q)),
  );
  const active = (openId ? notes.find((n) => n.id === openId) : null) ?? draft;

  const exportAll = () => {
    const blob = new Blob([notesToMarkdown(notes, track.name)], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${track.slug}-notes.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const create = () => {
    const n = newNote(track.id, {
      subject: subject,
      source_kind: "page",
      source_ref: null,
      source_label: null,
      source_path: null,
    });
    setDraft(n);
    setOpenId(n.id);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Your study notes</p>
        <div className="flex flex-wrap items-end gap-3">
          <h1 className="mr-auto font-display text-3xl font-bold tracking-tight">
            My <span className="text-primary">notes</span>
          </h1>
          <StatusText status={status} />
          <button type="button" onClick={create} className="btn-base btn-primary h-10 px-4 text-sm">
            <Icon name="add" className="text-[18px]" />
            New note
          </button>
          {notes.length ? (
            <button
              type="button"
              onClick={exportAll}
              className="btn-base btn-ghost h-10 px-4 text-sm"
            >
              <Icon name="download" className="text-[18px]" />
              Export
            </button>
          ) : null}
        </div>
      </Reveal>

      {!notes.length && !active ? (
        <MascotSays mood="happy" size={72} className="mt-6">
          Take notes anywhere in the app: tap the note button at the bottom right (or press N) while
          reading a lesson or solving a question. Each note remembers where you wrote it.
        </MascotSays>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className={cn("space-y-3", active && "hidden lg:block")}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
              className="w-full rounded-full border-2 border-glass-line bg-surface-2/40 px-4 py-2 text-sm outline-none focus:border-primary"
            />
            {subjects.length ? (
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by subject">
                {[null, ...subjects].map((s) => (
                  <button
                    key={s ?? "all"}
                    type="button"
                    onClick={() => setSubject(s)}
                    aria-pressed={subject === s}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold",
                      subject === s
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-glass-line text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s ?? "All"}
                  </button>
                ))}
              </div>
            ) : null}
            <ul className="space-y-2">
              {shown.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenId(n.id);
                      setDraft(null);
                    }}
                    className={cn(
                      "card-pop w-full p-4 text-left transition-colors",
                      active?.id === n.id
                        ? "ring-2 ring-primary/60"
                        : "hover:ring-2 hover:ring-primary/30",
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {n.pinned ? (
                        <Icon name="push_pin" filled className="text-[15px] text-primary" />
                      ) : null}
                      <span className="min-w-0 flex-1 truncate font-bold">{noteTitle(n)}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {ago(n.updated_at)}
                      </span>
                    </span>
                    {snippet(n) ? (
                      <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">
                        {snippet(n)}
                      </span>
                    ) : null}
                    {n.source_label ? <SourceChip note={n} className="mt-2" /> : null}
                  </button>
                </li>
              ))}
              {!shown.length ? (
                <li className="py-6 text-center text-sm text-muted-foreground">No notes match.</li>
              ) : null}
            </ul>
          </div>

          {active ? (
            <section className="card-pop flex min-h-[28rem] flex-col p-5" aria-label="Note editor">
              <button
                type="button"
                onClick={() => {
                  setOpenId(null);
                  setDraft(null);
                }}
                className="mb-2 self-start text-xs font-semibold text-muted-foreground hover:text-primary lg:hidden"
              >
                ← All notes
              </button>
              <NoteEditor
                note={active}
                status={status}
                onDeleted={() => {
                  setOpenId(null);
                  setDraft(null);
                }}
              />
            </section>
          ) : (
            <div className="hidden items-center justify-center rounded-[1.75rem] border-2 border-dashed border-glass-line p-8 text-sm text-muted-foreground lg:flex">
              Pick a note to read or edit it.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
