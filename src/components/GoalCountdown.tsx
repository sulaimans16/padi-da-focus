import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { trackKey } from "@/lib/track-state";
import { useTrack } from "@/hooks/useTrack";
import { examColumnKnownMissing, scoped } from "@/lib/exam-query";

type Goal = { id: string; title: string; target_at: string };

const LOCAL_KEY = () => trackKey("localGoal");

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function toInputValue(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function readLocalGoal(): Goal | null {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY());
    return raw ? (JSON.parse(raw) as Goal) : null;
  } catch {
    return null;
  }
}

function useTicker() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function GoalCountdown({ className = "" }: { className?: string }) {
  const { user, loading } = useAuth();
  const track = useTrack();
  const now = useTicker();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (user) {
      const { data } = await scoped((on) => {
        const q = supabase.from("goals").select("id, title, target_at");
        return (on ? q.eq("exam", track.id) : q).order("target_at", { ascending: true }).limit(1);
      }, track.id);
      setGoal(data?.[0] ?? null);
    } else {
      setGoal(readLocalGoal());
    }
  }, [user, track.id]);

  useEffect(() => {
    if (loading) return;
    void load();
  }, [loading, load]);

  function openEditor() {
    setTitle(goal?.title ?? "My goal");
    setWhen(
      goal
        ? toInputValue(goal.target_at)
        : toInputValue(new Date(Date.now() + 30 * 86400000).toISOString()),
    );
    setEditing(true);
  }

  async function save() {
    if (!when) return;
    setSaving(true);
    const payload = { title: title.trim() || "My goal", target_at: new Date(when).toISOString() };
    if (user) {
      if (goal) {
        await supabase.from("goals").update(payload).eq("id", goal.id);
      } else {
        if (!examColumnKnownMissing()) {
          await supabase.from("goals").insert({ ...payload, user_id: user.id, exam: track.id });
        } else if (track.id === "neet_pg") {
          await supabase.from("goals").insert({ ...payload, user_id: user.id });
        }
      }
      await load();
    } else {
      const next = { id: "local", ...payload };
      window.localStorage.setItem(LOCAL_KEY(), JSON.stringify(next));
      setGoal(next);
    }
    setSaving(false);
    setEditing(false);
  }

  async function clear() {
    if (user && goal) await supabase.from("goals").delete().eq("id", goal.id);
    else window.localStorage.removeItem(LOCAL_KEY());
    setGoal(null);
    setEditing(false);
  }

  const target = goal ? new Date(goal.target_at).getTime() : null;
  const diff = target !== null && now !== null ? Math.max(0, target - now) : null;
  const parts: [string, number | null][] = [
    ["Days", diff === null ? null : Math.floor(diff / 86400000)],
    ["Hrs", diff === null ? null : Math.floor((diff % 86400000) / 3600000)],
    ["Min", diff === null ? null : Math.floor((diff % 3600000) / 60000)],
    ["Sec", diff === null ? null : Math.floor((diff % 60000) / 1000)],
  ];

  return (
    <section className={`card-surface overflow-hidden ${className}`}>
      <div className="card-head grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <span className="label-eyebrow truncate">
          {goal
            ? `${goal.title} · ${new Date(goal.target_at).toLocaleString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Set your goal countdown"}
        </span>
        <button
          type="button"
          onClick={openEditor}
          className="btn-base btn-ghost shrink-0 px-2.5 py-1.5 text-xs"
        >
          <Icon name={goal ? "edit_calendar" : "add"} className="text-[16px]" />
          {goal ? "Edit" : "Set goal"}
        </button>
      </div>

      {editing ? (
        <div className="space-y-3 p-5">
          <div>
            <label className="label-eyebrow" htmlFor="goal-title">
              Goal name
            </label>
            <input
              id="goal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Exam attempt, mock #4, revision deadline…"
              className="mt-1.5 h-11 w-full rounded-full bg-white/5 px-4 text-sm outline-none ring-1 ring-inset ring-glass-line transition-all duration-300 focus:bg-white/10 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="label-eyebrow" htmlFor="goal-when">
              Target date & time
            </label>
            <input
              id="goal-when"
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-full bg-white/5 px-4 text-sm outline-none ring-1 ring-inset ring-glass-line transition-all duration-300 focus:bg-white/10 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="btn-base btn-primary text-sm"
            >
              <Icon name="check" className="text-[18px]" />
              {saving ? "Saving…" : "Save goal"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn-base btn-ghost text-sm"
            >
              Cancel
            </button>
            {goal ? (
              <button
                type="button"
                onClick={() => void clear()}
                className="btn-base btn-ghost text-sm text-muted-foreground"
              >
                <Icon name="delete" className="text-[18px]" />
                Remove
              </button>
            ) : null}
          </div>
          {!user ? (
            <p className="text-xs text-muted-foreground">
              Saved on this device only.{" "}
              <Link to="/auth" className="font-bold text-primary">
                Sign in
              </Link>{" "}
              to sync your goals.
            </p>
          ) : null}
        </div>
      ) : goal ? (
        <div className="grid grid-cols-4 gap-3 p-5">
          {parts.map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white/5 px-2 py-4 text-center">
              <p className="font-mono text-2xl font-bold tabular-nums text-primary sm:text-3xl">
                {value === null ? "--" : String(value).padStart(2, "0")}
              </p>
              <p className="label-eyebrow mt-1">{label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5">
          <p className="text-sm text-muted-foreground">
            No countdown yet. Set a personal target — exam day, a mock, or a revision deadline — and
            it ticks down here.
          </p>
          <button type="button" onClick={openEditor} className="btn-base btn-primary mt-3 text-sm">
            <Icon name="event" className="text-[18px]" />
            Set my countdown
          </button>
        </div>
      )}
    </section>
  );
}
