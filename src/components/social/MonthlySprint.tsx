import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { useAuth } from "@/hooks/useAuth";
import { useTrack } from "@/hooks/useTrack";
import { fetchMonthlyEvent } from "@/lib/social";
import { cn } from "@/lib/utils";

function daysLeft(endsAt: string, now: number) {
  const ms = Math.max(0, Date.parse(endsAt) - now);
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  return d > 0 ? `${d}d ${h}h left` : `${h}h left`;
}

/** This month's XP sprint for the track: everyone on one board, top 10 win a badge. */
export function MonthlySprint() {
  const track = useTrack();
  const { user } = useAuth();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);
  const ev = useQuery({
    queryKey: ["monthly-event", track.id, user?.id],
    queryFn: fetchMonthlyEvent,
    enabled: Boolean(user),
    retry: false,
  });

  return (
    <section className="card-pop mt-6 p-4 sm:p-6" aria-label="Monthly sprint">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gem/15 text-gem">
          <Icon name="emoji_events" filled className="text-[24px]" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold">{ev.data?.title ?? "Monthly Sprint"}</h2>
          <p className="text-xs text-muted-foreground">
            Most XP this month on {track.name} · top 10 win the{" "}
            <span className="font-semibold text-gem">Sprint Top 10</span> badge
          </p>
        </div>
        {ev.data ? (
          <span className="chip text-gem">
            <Icon name="schedule" className="text-[14px]" />
            {daysLeft(ev.data.ends_at, now)}
          </span>
        ) : null}
      </div>

      {ev.isLoading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading the sprint…</p>
      ) : ev.error || !ev.data ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          The monthly sprint switches on once the latest database update is applied.
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-surface-2/50 p-3">
              <p className="label-eyebrow">Your rank</p>
              <p className="font-display text-2xl font-bold tabular-nums">
                {ev.data.me ? `#${ev.data.me.rank}` : "—"}
              </p>
            </div>
            <div className="rounded-2xl bg-surface-2/50 p-3">
              <p className="label-eyebrow">Your XP this month</p>
              <p className="font-display text-2xl font-bold tabular-nums text-xp">
                {ev.data.me?.xp ?? 0}
              </p>
            </div>
          </div>
          {ev.data.top.length ? (
            <ol className="mt-4 space-y-1.5">
              {ev.data.top.map((m, i) => (
                <motion.li
                  key={`${m.username ?? m.name}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING, delay: Math.min(i, 12) * 0.03 }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2",
                    m.is_me ? "bg-primary/15 ring-2 ring-primary/50" : "hover:bg-surface-2/50",
                  )}
                >
                  <span
                    className={cn(
                      "w-7 text-center font-display text-sm font-bold tabular-nums",
                      m.rank <= 10 ? "text-gem" : "text-muted-foreground",
                    )}
                  >
                    {m.rank <= 3 ? ["🥇", "🥈", "🥉"][m.rank - 1] : m.rank}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                    {m.name}
                    {m.username ? (
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                        @{m.username}
                      </span>
                    ) : null}
                    {m.is_me ? <span className="ml-1.5 text-xs text-primary">(you)</span> : null}
                  </span>
                  <span className="text-sm font-bold tabular-nums">{m.xp} XP</span>
                </motion.li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              No one has earned XP this month yet. Be the first on the board!
            </p>
          )}
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {ev.data.participants} learner{ev.data.participants === 1 ? "" : "s"} in this sprint ·
            resets on the 1st (UTC)
          </p>
        </>
      )}
    </section>
  );
}
