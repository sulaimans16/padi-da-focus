import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import { Reveal, SPRING } from "@/components/motion/Reveal";
import { LeagueTable, TierEmblem } from "@/components/game/Widgets";
import { Mascot } from "@/components/mascot/Mascot";
import { useAuth } from "@/hooks/useAuth";
import {
  LEAGUE_TIERS,
  fetchLeague,
  updateGameSettings,
  type LeagueMember,
} from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { useTrack } from "@/hooks/useTrack";
import { localizeHead } from "@/lib/tracks";

export const Route = createFileRoute("/$track/_authenticated/leagues")({
  staticData: { sitemap: false },
  head: ({ params }) =>
    localizeHead(params.track, { meta: [{ title: "Weekly Leagues — PG Prep" }] }),
  component: Leagues,
});

function useCountdown(endsAt: string | undefined) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);
  if (!endsAt) return null;
  const ms = Math.max(0, new Date(endsAt).getTime() - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return days > 0
    ? `${days}d ${hours}h left`
    : `${hours}h ${Math.floor((ms % 3_600_000) / 60_000)}m left`;
}

function ZoneLabel({ tone, children }: { tone: "up" | "down"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "my-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em]",
        tone === "up" ? "text-success" : "text-destructive",
      )}
    >
      <span className="h-0.5 flex-1 rounded bg-current opacity-40" />
      <Icon name={tone === "up" ? "arrow_upward" : "arrow_downward"} className="text-[14px]" />
      {children}
      <span className="h-0.5 flex-1 rounded bg-current opacity-40" />
    </div>
  );
}

function Leagues() {
  const track = useTrack();
  const { user } = useAuth();
  const league = useQuery({
    queryKey: ["league", track.id, user?.id],
    queryFn: fetchLeague,
    retry: false,
  });
  const data = league.data;
  const tier = data?.tier ?? 0;
  const t = LEAGUE_TIERS[tier] ?? LEAGUE_TIERS[0];
  const outcome = data && data.status !== "opted_out" ? data.last_outcome : null;
  const countdown = useCountdown(data?.status === "joined" ? data.ends_at : undefined);

  const members: LeagueMember[] = data?.status === "joined" ? data.members : [];
  const n = members.length;
  const promote = members.filter((m) => m.rank <= 7 && m.xp > 0);
  const demoteFrom = n >= 10 ? n - 5 : Infinity;
  const middle = members.filter((m) => !promote.includes(m) && m.rank <= demoteFrom);
  const demote = members.filter((m) => !promote.includes(m) && m.rank > demoteFrom);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Tier ladder */}
      <Reveal>
        <div className="flex items-center justify-center gap-1.5 py-2 sm:gap-4">
          {LEAGUE_TIERS.map((lt, i) => (
            <motion.div
              key={lt.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: i <= tier ? 1 : 0.35, y: 0 }}
              transition={{ ...SPRING, delay: i * 0.05 }}
              className="flex flex-col items-center"
            >
              {i <= tier ? (
                <TierEmblem tier={i} size={i === tier ? 64 : 34} />
              ) : (
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[38%] bg-surface-2 sm:h-11 sm:w-11">
                  <Icon name="lock" className="text-[18px] text-muted-foreground" />
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-3xl sm:text-4xl" style={{ color: t.color }}>
            {t.name} League
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Top 7 advance to the next league · {countdown ?? "Resets every Monday (UTC)"}
          </p>
        </div>
      </Reveal>

      {outcome && outcome !== "stayed" ? (
        <Reveal delay={0.05}>
          <div
            className={cn(
              "mt-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold",
              outcome === "promoted"
                ? "bg-success/15 text-success"
                : "bg-destructive/12 text-destructive",
            )}
          >
            <Icon name={outcome === "promoted" ? "celebration" : "trending_down"} filled />
            {outcome === "promoted"
              ? `Promoted! Welcome to the ${t.name} League.`
              : `Moved down to ${t.name}. A strong week gets you right back up.`}
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <div className="card-pop mt-6 p-4 sm:p-6">
          {league.isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Finding your league…</p>
          ) : league.error ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Leagues switch on once the latest database update is applied.
            </p>
          ) : data?.status === "opted_out" ? (
            <div className="py-8 text-center">
              <Mascot mood="sleep" size={100} className="mx-auto" />
              <p className="mt-2 font-semibold">You've opted out of leagues</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your XP, streak and badges still count.
              </p>
              <button
                type="button"
                className="btn-base btn-primary mt-4 text-sm"
                onClick={() =>
                  void updateGameSettings({ leagueOptOut: false }).then(() => league.refetch())
                }
              >
                Rejoin leagues
              </button>
            </div>
          ) : data?.status === "not_joined" ? (
            <div className="py-8 text-center">
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={SPRING}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-xp/20 text-xp"
              >
                <Icon name="sports_score" filled className="text-[44px]" />
              </motion.span>
              <p className="mt-4 font-display text-xl font-bold">
                Earn XP to join this week's league
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Answer a question and you'll be placed with up to 30 learners at your level.
              </p>
              <Link
                to="/$track/daily"
                params={{ track: track.slug }}
                className="btn-base btn-primary mt-5 h-12 px-6 text-sm"
              >
                <Icon name="bolt" filled className="text-[18px]" />
                Start the daily challenge
              </Link>
            </div>
          ) : (
            <>
              <LeagueTable members={promote} />
              {promote.length && (middle.length || demote.length) ? (
                <ZoneLabel tone="up">Promotion zone</ZoneLabel>
              ) : null}
              <LeagueTable members={middle} />
              {demote.length ? <ZoneLabel tone="down">Demotion zone</ZoneLabel> : null}
              <LeagueTable members={demote} />
              {n < 5 ? (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  More learners join as they earn XP this week. Invite a study buddy!
                </p>
              ) : null}
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}
