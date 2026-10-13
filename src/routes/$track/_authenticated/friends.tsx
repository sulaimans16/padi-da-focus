import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Icon, Pill } from "@/components/Primitives";
import { QuizRunner, type QuizSummary } from "@/components/QuizRunner";
import { Reveal } from "@/components/motion/Reveal";
import { MascotSays } from "@/components/mascot/Mascot";
import { useTrack } from "@/hooks/useTrack";
import { levelForXp } from "@/lib/gamification";
import type { Question } from "@/lib/questions";
import { fetchQuestionsByIds } from "@/lib/quiz";
import { inviteUrl } from "@/lib/share-card";
import {
  USERNAME_RE,
  createChallenge,
  fetchChallenges,
  fetchFriends,
  fetchMyUsername,
  normaliseUsername,
  removeFriend,
  requestFriend,
  respondFriend,
  setUsername,
  submitChallenge,
  type Challenge,
  type Friend,
} from "@/lib/social";
import { localizeHead } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$track/_authenticated/friends")({
  staticData: { sitemap: false },
  head: ({ params }) =>
    localizeHead(params.track, { meta: [{ title: "Friends & Challenges — PG Prep" }] }),
  component: FriendsPage,
});

function msg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong.";
}

function Section({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("card-pop p-5", className)}>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        <Icon name={icon} filled className="text-[20px] text-primary" />
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function UsernameCard({ username, onSaved }: { username: string | null; onSaved: () => void }) {
  const [editing, setEditing] = useState(!username);
  const [value, setValue] = useState(username ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const clean = normaliseUsername(value);

  if (username && !editing) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm">
          You're <span className="font-display text-lg font-bold text-primary">@{username}</span>
        </p>
        <button
          type="button"
          className="btn-base btn-ghost h-9 text-xs"
          onClick={() => setEditing(true)}
        >
          Change
        </button>
      </div>
    );
  }
  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!USERNAME_RE.test(clean)) {
          setError("3–20 characters: letters, numbers and _ only.");
          return;
        }
        setBusy(true);
        setError("");
        setUsername(clean)
          .then(() => {
            setEditing(false);
            onSaved();
          })
          .catch((err: unknown) => setError(msg(err)))
          .finally(() => setBusy(false));
      }}
    >
      <p className="text-sm text-muted-foreground">
        Pick a unique @username so friends can find you.
      </p>
      <div className="flex gap-2">
        <span className="flex items-center rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 text-muted-foreground">
          @
        </span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={21}
          placeholder="e.g. asha_md"
          aria-label="Username"
          className="min-w-0 flex-1 rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button type="submit" disabled={busy} className="btn-base btn-primary h-11 px-5 text-sm">
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </form>
  );
}

function InviteCard({
  username,
  trackSlug,
  trackName,
}: {
  username: string | null;
  trackSlug: string;
  trackName: string;
}) {
  const [copied, setCopied] = useState(false);
  if (!username) {
    return (
      <p className="text-sm text-muted-foreground">
        Save a @username first. Your invite link adds people as friends automatically.
      </p>
    );
  }
  const link = inviteUrl(trackSlug);
  const text = `Study ${trackName} with me on Learners Studio Prep, and we'll be friends there automatically:`;
  return (
    <div className="space-y-3">
      <p className="truncate rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2 font-mono text-xs">
        {link}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-base btn-ghost h-10 flex-1 text-sm"
          onClick={() => {
            void navigator.clipboard?.writeText(`${text} ${link}`).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            });
          }}
        >
          <Icon name={copied ? "check" : "content_copy"} className="text-[18px]" />
          {copied ? "Copied" : "Copy link"}
        </button>
        {typeof navigator !== "undefined" && "share" in navigator ? (
          <button
            type="button"
            className="btn-base btn-primary h-10 flex-1 text-sm"
            onClick={() =>
              void navigator
                .share({ title: "Study with me", text, url: link })
                .catch(() => undefined)
            }
          >
            <Icon name="ios_share" className="text-[18px]" />
            Share
          </button>
        ) : null}
      </div>
    </div>
  );
}

function AddFriend({ onAdded }: { onAdded: () => void }) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        const name = normaliseUsername(value);
        if (!name) return;
        setBusy(true);
        setNote(null);
        requestFriend(name)
          .then((status) => {
            setNote({
              ok: true,
              text:
                status === "accepted"
                  ? `You and @${name} are now friends!`
                  : `Request sent to @${name}.`,
            });
            setValue("");
            onAdded();
          })
          .catch((err: unknown) => setNote({ ok: false, text: msg(err) }))
          .finally(() => setBusy(false));
      }}
    >
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="@username"
          aria-label="Friend's username"
          className="min-w-0 flex-1 rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button type="submit" disabled={busy} className="btn-base btn-primary h-11 px-5 text-sm">
          <Icon name="person_add" className="text-[18px]" />
          Add
        </button>
      </div>
      {note ? (
        <p className={cn("text-xs", note.ok ? "text-success" : "text-destructive")}>{note.text}</p>
      ) : null}
    </form>
  );
}

function FriendRow({
  f,
  onChallenge,
  onRemove,
  busy,
}: {
  f: Friend;
  onChallenge: () => void;
  onRemove: () => void;
  busy: boolean;
}) {
  const lvl = levelForXp(f.xp_total ?? 0).level;
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl px-2 py-2 hover:bg-surface-2/50">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gem/20 font-display font-bold uppercase text-gem">
        {f.name.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {f.name}
          {f.username ? (
            <span className="ml-1.5 text-xs font-normal text-muted-foreground">@{f.username}</span>
          ) : null}
        </p>
        <p className="flex flex-wrap gap-x-3 text-xs text-muted-foreground">
          <span className="text-streak">🔥 {f.streak ?? 0}</span>
          <span className="text-gem">Lv {lvl}</span>
          <span className="text-xp">{f.week_xp ?? 0} XP this week</span>
        </p>
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={onChallenge}
        className="btn-base btn-primary h-9 px-4 text-xs"
      >
        <Icon name="swords" className="text-[16px]" />
        Challenge
      </button>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${f.name}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2"
      >
        <Icon name="person_remove" className="text-[18px]" />
      </button>
    </li>
  );
}

function ChallengeRow({ c, onPlay }: { c: Challenge; onPlay: () => void }) {
  const result =
    c.state === "done" && c.my_score != null && c.their_score != null
      ? c.my_score > c.their_score
        ? { label: "You won", tone: "text-success", icon: "emoji_events" }
        : c.my_score < c.their_score
          ? { label: "You lost", tone: "text-destructive", icon: "sentiment_dissatisfied" }
          : { label: "Draw", tone: "text-xp", icon: "handshake" }
      : null;
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl bg-surface-2/40 px-3 py-3">
      <Icon
        name={result?.icon ?? "swords"}
        filled
        className={cn("text-[22px]", result?.tone ?? "text-primary")}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {c.mine ? "You vs " : ""}
          {c.opponent_name}
          {c.mine ? "" : " challenged you"}
        </p>
        <p className="text-xs text-muted-foreground">
          {c.state === "done"
            ? `${c.my_score}/${c.total} vs ${c.their_score}/${c.total}`
            : c.state === "waiting"
              ? `You scored ${c.my_score}/${c.total} · waiting for ${c.opponent_name}`
              : c.state === "expired"
                ? "Expired"
                : `${c.total} questions${c.they_played ? ` · ${c.opponent_name} has played` : ""}`}
        </p>
      </div>
      {result ? <span className={cn("text-sm font-bold", result.tone)}>{result.label}</span> : null}
      {c.state === "to_play" ? (
        <button type="button" onClick={onPlay} className="btn-base btn-primary h-9 px-4 text-xs">
          <Icon name="play_arrow" filled className="text-[16px]" />
          Play
        </button>
      ) : null}
    </li>
  );
}

function FriendsPage() {
  const track = useTrack();
  const qc = useQueryClient();
  const me = useQuery({ queryKey: ["my-username"], queryFn: fetchMyUsername });
  const friends = useQuery({
    queryKey: ["friends", track.id],
    queryFn: fetchFriends,
    retry: false,
  });
  const challenges = useQuery({
    queryKey: ["challenges", track.id],
    queryFn: fetchChallenges,
    retry: false,
  });
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState<{ c: Challenge; questions: Question[] } | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["friends", track.id] });
    void qc.invalidateQueries({ queryKey: ["challenges", track.id] });
  };

  const act = async (key: string, fn: () => Promise<unknown>) => {
    setBusy(key);
    setError("");
    try {
      await fn();
      refresh();
    } catch (e) {
      setError(msg(e));
    } finally {
      setBusy(null);
    }
  };

  const play = (c: Challenge) =>
    act(`play:${c.id}`, async () => {
      const questions = await fetchQuestionsByIds(c.question_ids);
      setResult(null);
      setPlaying({ c, questions });
    });

  const finish = (s: QuizSummary) => {
    if (!playing) return;
    const c = playing.c;
    void submitChallenge(c.id, s.answers, s.seconds)
      .then((r) =>
        setResult(
          `Submitted: ${r.score}/${r.total}. ${c.opponent_name} will see your score once they play.`,
        ),
      )
      .catch((e: unknown) => setResult(msg(e)))
      .finally(refresh);
  };

  if (playing) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="font-display text-xl font-bold">Challenge vs {playing.c.opponent_name}</h1>
          <Pill className="ml-auto" onClick={() => setPlaying(null)}>
            <Icon name="arrow_back" className="text-[18px]" />
            Friends
          </Pill>
        </div>
        {result ? (
          <p
            className="mb-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold"
            role="status"
          >
            {result}
          </p>
        ) : null}
        <QuizRunner
          questions={playing.questions}
          context="friend_challenge"
          reveal="onSubmit"
          onFinish={finish}
        />
      </div>
    );
  }

  const list = friends.data ?? [];
  const accepted = list.filter((f) => f.direction === "friend");
  const incoming = list.filter((f) => f.direction === "incoming");
  const outgoing = list.filter((f) => f.direction === "outgoing");
  const toPlay = (challenges.data ?? []).filter((c) => c.state === "to_play").length;
  const unavailable = friends.isError && !friends.data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Study together</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Friends &amp; <span className="text-primary">challenges</span>
        </h1>
        <MascotSays mood="happy" size={72} className="mt-4">
          {accepted.length
            ? toPlay
              ? `You have ${toPlay} challenge${toPlay > 1 ? "s" : ""} waiting. Show them how it's done!`
              : "Challenge a friend to the same 10 questions. Best score wins."
            : "Learning sticks better with a buddy. Add a friend or share your invite link."}
        </MascotSays>
      </Reveal>

      {error ? (
        <p
          className="mt-4 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {unavailable ? (
        <p className="mt-4 rounded-2xl bg-surface-2/60 px-4 py-3 text-sm text-muted-foreground">
          Friends switch on once the latest database update is applied.
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {incoming.length ? (
            <Section title="Friend requests" icon="mark_email_unread">
              <ul className="space-y-2">
                {incoming.map((f) => (
                  <li key={f.user_id} className="flex flex-wrap items-center gap-3">
                    <p className="min-w-0 flex-1 truncate text-sm font-semibold">
                      {f.name}
                      {f.username ? (
                        <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                          @{f.username}
                        </span>
                      ) : null}
                    </p>
                    <button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() =>
                        void act(`acc:${f.user_id}`, () => respondFriend(f.user_id, true))
                      }
                      className="btn-base btn-primary h-9 px-4 text-xs"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() =>
                        void act(`dec:${f.user_id}`, () => respondFriend(f.user_id, false))
                      }
                      className="btn-base btn-ghost h-9 px-4 text-xs"
                    >
                      Decline
                    </button>
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section title={`Friends${accepted.length ? ` · ${accepted.length}` : ""}`} icon="group">
            {friends.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : accepted.length ? (
              <ul className="space-y-1">
                {accepted.map((f) => (
                  <FriendRow
                    key={f.user_id}
                    f={f}
                    busy={busy === `ch:${f.user_id}`}
                    onChallenge={() =>
                      void act(`ch:${f.user_id}`, () => createChallenge(f.user_id))
                    }
                    onRemove={() => {
                      if (window.confirm(`Remove ${f.name} from your friends?`))
                        void act(`rm:${f.user_id}`, () => removeFriend(f.user_id));
                    }}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No friends yet. Add someone by @username or send your invite link.
              </p>
            )}
            {outgoing.length ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Waiting on: {outgoing.map((f) => `@${f.username ?? f.name}`).join(", ")}
              </p>
            ) : null}
          </Section>

          <Section title="Challenges" icon="swords">
            {challenges.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (challenges.data ?? []).length ? (
              <ul className="space-y-2">
                {(challenges.data ?? []).map((c) => (
                  <ChallengeRow key={c.id} c={c} onPlay={() => void play(c)} />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tap <strong>Challenge</strong> next to a friend: you both answer the same 10
                questions, and the higher score wins.
              </p>
            )}
          </Section>
        </div>

        <div className="space-y-5">
          <Section title="Your username" icon="alternate_email">
            {me.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              <UsernameCard
                username={me.data ?? null}
                onSaved={() => void qc.invalidateQueries({ queryKey: ["my-username"] })}
              />
            )}
          </Section>
          <Section title="Add a friend" icon="person_add">
            <AddFriend onAdded={refresh} />
          </Section>
          <Section title="Invite link" icon="link">
            <InviteCard username={me.data ?? null} trackSlug={track.slug} trackName={track.name} />
          </Section>
        </div>
      </div>
    </div>
  );
}
