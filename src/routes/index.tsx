import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoalCountdown } from "@/components/GoalCountdown";
import { ProgressRing } from "@/components/ProgressRing";
import { Badge, Icon } from "@/components/Primitives";
import { CountUp, Reveal, SPRING, Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
  DailyGoalRing,
  LevelBar,
  QuestList,
  StreakFlame,
  TierEmblem,
} from "@/components/game/Widgets";
import { MascotSays } from "@/components/mascot/Mascot";
import { useAuth } from "@/hooks/useAuth";
import { dashboardLine } from "@/lib/mascot";
import { useGameState } from "@/hooks/useGameState";
import { doctorName } from "@/lib/doctor-name";
import { LEAGUE_TIERS, fetchLeague } from "@/lib/gamification";
import { loadDailyResults, todayKey } from "@/lib/quiz";
import { cn } from "@/lib/utils";

import { formatClock, loadSessionLog, type CompletedSession } from "@/lib/focus-session";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "PG Prep — NEET PG Revision Console" },
      {
        name: "description",
        content:
          "PG Prep is a NEET PG sprint app by Learners Studio: hard-lockout focus timer, 23,000+ question bank, PYQ vault, subject modules, video lectures and analytics.",
      },
      { property: "og:title", content: "PG Prep — NEET PG Revision Console" },
      {
        property: "og:description",
        content: "Focus-locked NEET PG revision. Questions, PYQs, concepts, analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MODULES = [
  {
    label: "Subject Modules",
    icon: "menu_book",
    note: "Concepts with real figures",
    to: "/learn" as const,
    hue: 205,
  },
  {
    label: "Question Bank",
    icon: "quiz",
    note: "Subject → topic drills",
    to: "/bank" as const,
    hue: 160,
  },
  {
    label: "Mock Tests",
    icon: "timer",
    note: "Timed, exam-clock papers",
    to: "/mock" as const,
    hue: 25,
  },
  {
    label: "PYQ Vault",
    icon: "history_edu",
    note: "Tagged by year & repeats",
    to: "/pyq" as const,
    hue: 85,
  },
  {
    label: "Video Modules",
    icon: "play_circle",
    note: "Curated lectures",
    to: "/videos" as const,
    hue: 0,
  },
  {
    label: "Papers",
    icon: "description",
    note: "Downloadable PYQ papers",
    to: "/papers" as const,
    hue: 270,
  },
  {
    label: "Analytics",
    icon: "monitoring",
    note: "Accuracy & weak areas",
    to: "/tracker" as const,
    hue: 235,
  },
  {
    label: "Fill the bank",
    icon: "cloud_download",
    note: "Web-researched Qs",
    to: "/bank/fill" as const,
    hue: 300,
  },
];

const COMING_SOON = [
  { label: "Flashcards", icon: "style" },
  { label: "Cheatsheets", icon: "sticky_note_2" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const tint = (hue: number) => `oklch(0.75 0.13 ${hue})`;

/** Last 7 days as flame dots: lit where the daily goal was met. */
function WeekStrip({ history, goal }: { history: { day: string; xp: number }[]; goal: number }) {
  const map = new Map(history.map((h) => [h.day, h.xp]));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  return (
    <div className="flex justify-between gap-1">
      {days.map((d, i) => {
        const xp = map.get(todayKey(d)) ?? 0;
        const met = xp >= goal;
        const today = i === 6;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={cn(
                "text-[10px] font-bold",
                today ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {d.toLocaleDateString(undefined, { weekday: "narrow" })}
            </span>
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2",
                met
                  ? "border-streak bg-streak/20 text-streak"
                  : xp > 0
                    ? "border-xp/50 text-xp"
                    : "border-glass-line text-muted-foreground/50",
                today && !met && "border-dashed",
              )}
            >
              <Icon
                name={met ? "local_fire_department" : "circle"}
                filled={met}
                className="text-[16px]"
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Index() {
  const { user, displayName } = useAuth();
  const { state, level, rank } = useGameState();
  const league = useQuery({
    queryKey: ["league", user?.id],
    queryFn: fetchLeague,
    enabled: Boolean(user),
    staleTime: 60_000,
    retry: false,
  });

  const [log, setLog] = useState<CompletedSession[]>([]);
  const [hello, setHello] = useState("Hello");
  const [dailyDone, setDailyDone] = useState(false);
  useEffect(() => {
    setLog(loadSessionLog());
    setHello(greeting());
    setDailyDone(loadDailyResults().some((r) => r.day === todayKey()));
  }, []);

  const todayDateKey = new Date().toDateString();
  const todaySessions = log.filter((s) => new Date(s.startedAt).toDateString() === todayDateKey);
  const todaySec = todaySessions.reduce((acc, s) => acc + s.actualDurationSec, 0);
  const dailyTargetSec = 4 * 60 * 60;
  const name = doctorName(displayName, user?.email);

  const todayXp = state?.todayXp ?? 0;
  const goal = state?.dailyGoal ?? 50;
  const streak = state?.streak ?? 0;
  const lit = Boolean(state?.streakExtendedToday);
  const due = state?.mistakesDue ?? 0;

  // The single most useful next step, Duolingo-style.
  const next = !dailyDone
    ? {
        to: "/daily" as const,
        eyebrow: "Today's lesson",
        title: "Daily Challenge",
        note: "10 mixed questions · +30 XP bonus",
        icon: "bolt",
        cta: "Start",
      }
    : due > 0
      ? {
          to: "/review" as const,
          eyebrow: "Review",
          title: `Fix ${due} mistake${due > 1 ? "s" : ""}`,
          note: "+15 XP for each one you fix",
          icon: "healing",
          cta: "Review",
        }
      : {
          to: "/bank" as const,
          eyebrow: "Keep going",
          title: "Drill the QBank",
          note: "Build a combo for bonus XP",
          icon: "quiz",
          cta: "Practice",
        };

  const [hour, setHour] = useState(12);
  useEffect(() => setHour(new Date().getHours()), []);
  const buddy = dashboardLine(state, name, hour);

  const leagueData = league.data;
  const me = leagueData?.status === "joined" ? leagueData.members.find((m) => m.is_me) : undefined;
  const tier = leagueData?.tier ?? state?.leagueTier ?? 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="label-eyebrow">
            {hello}, {name}
          </p>
          <h1 className="mt-2 text-4xl leading-[1.05] sm:text-5xl">
            <span className="text-gradient">
              {lit
                ? "Goal smashed. Keep it rolling."
                : streak > 0
                  ? "Keep your streak alive"
                  : "Let's start a streak"}
            </span>
          </h1>
          <MascotSays mood={buddy.mood} size={84} className="mt-4 max-w-xl">
            {buddy.text}
          </MascotSays>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary" tooltip="Questions available across all subjects">
            23,000+ Qs
          </Badge>
          {!user ? (
            <Link to="/auth" className="btn-base btn-primary text-xs">
              <Icon name="login" className="text-[16px]" />
              Sign in to save progress
            </Link>
          ) : null}
        </div>
      </motion.div>

      {/* Continue + goal + streak */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Link
            to={next.to}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-primary-foreground transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-1"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 92%, white), color-mix(in oklab, var(--color-accent) 85%, black))",
              boxShadow:
                "0 6px 0 color-mix(in oklab, var(--color-accent) 50%, black), var(--glow-primary)",
            }}
          >
            <span className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
            <span className="pointer-events-none absolute -bottom-16 right-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-80">
                  {next.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl">{next.title}</h2>
                <p className="mt-2 text-sm font-medium opacity-85">{next.note}</p>
              </div>
              <motion.span
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={SPRING}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 animate-bob"
              >
                <Icon name={next.icon} filled className="text-[44px]" />
              </motion.span>
            </div>
            <span className="relative mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white font-display text-base font-bold text-[color:var(--color-accent)] shadow-[0_4px_0_rgba(0,0,0,0.18)] transition-transform group-active:translate-y-1 sm:w-48">
              {next.cta}
              <Icon name="arrow_forward" className="text-[20px]" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-5">
          <div className="card-pop flex h-full flex-col gap-5 p-6">
            <div className="flex items-center gap-5">
              <DailyGoalRing todayXp={todayXp} goal={goal} size={104} strokeWidth={10}>
                <span className="font-display text-2xl font-bold tabular-nums">
                  <CountUp value={todayXp} />
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">/ {goal} XP</span>
              </DailyGoalRing>
              <div className="min-w-0 flex-1">
                <p className="label-eyebrow">Daily goal</p>
                <p className="mt-1 font-display text-xl font-bold leading-tight">
                  {todayXp >= goal ? "Done for today! 🎉" : `${goal - todayXp} XP to go`}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <StreakFlame streak={streak} lit={lit} size="md" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    day streak
                    {state?.streakFreezes ? ` · 🧊 ${state.streakFreezes}` : ""}
                  </span>
                </div>
              </div>
            </div>
            <WeekStrip history={state?.history ?? []} goal={goal} />
            <LevelBar
              level={level.level}
              progress={level.progress}
              xpTotal={state?.xpTotal ?? 0}
              next={level.next}
              rankTitle={rank.title}
            />
          </div>
        </Reveal>
      </div>

      {/* Quests + league */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="card-pop h-full p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Icon name="target" filled className="text-[24px] text-xp" />
                Daily quests
              </h2>
              <span className="chip">Resets at midnight</span>
            </div>
            <QuestList state={state} signedIn={Boolean(user)} />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-5">
          <Link
            to={user ? "/leagues" : "/auth"}
            className="card-pop card-pop-hover flex h-full flex-col p-6"
          >
            <div className="flex items-center gap-4">
              <TierEmblem tier={tier} />
              <div className="min-w-0 flex-1">
                <p className="label-eyebrow">Weekly league</p>
                <p className="font-display text-xl font-bold">
                  {LEAGUE_TIERS[tier]?.name ?? "Bronze"} League
                </p>
              </div>
              <Icon name="chevron_right" className="text-[22px] text-muted-foreground" />
            </div>
            <div className="mt-5 flex-1">
              {!user ? (
                <p className="text-sm text-muted-foreground">
                  Sign in to compete with up to 30 doctors each week. Top 7 get promoted.
                </p>
              ) : leagueData?.status === "joined" ? (
                <div className="space-y-2">
                  {leagueData.members.slice(0, 3).map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm",
                        m.is_me && "bg-primary/15 ring-2 ring-primary/40",
                      )}
                    >
                      <span>{["🥇", "🥈", "🥉"][i]}</span>
                      <span className="min-w-0 flex-1 truncate font-semibold">{m.name}</span>
                      <span className="font-bold tabular-nums">{m.xp} XP</span>
                    </div>
                  ))}
                  {me && me.rank > 3 ? (
                    <p className="pt-1 text-center text-xs font-semibold text-primary">
                      You're #{me.rank} with {me.xp} XP
                    </p>
                  ) : null}
                </div>
              ) : leagueData?.status === "opted_out" ? (
                <p className="text-sm text-muted-foreground">
                  You've opted out of leagues. Rejoin any time from your profile.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Earn your first XP this week to be placed in a league.
                </p>
              )}
            </div>
          </Link>
        </Reveal>
      </div>

      {/* Explore + focus rail */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-10 lg:gap-10">
        <div className="flex flex-col gap-12 lg:col-span-6">
          <section>
            <div className="mb-6 flex items-center gap-6">
              <h2 className="shrink-0 text-xl font-semibold">Explore</h2>
              <span className="fade-rule flex-1" />
            </div>

            <Stagger className="grid grid-cols-2 gap-4">
              {MODULES.map((m) => (
                <StaggerItem key={m.label} className="h-full">
                  <Link
                    to={m.to}
                    className="card-pop card-pop-hover group flex h-full flex-col p-5"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${tint(m.hue)} 22%, transparent)`,
                        color: tint(m.hue),
                      }}
                    >
                      <Icon name={m.icon} filled className="text-[24px]" />
                    </span>
                    <p className="mt-4 text-sm font-bold leading-tight sm:text-base">{m.label}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{m.note}</p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-4 flex flex-wrap gap-2">
              {COMING_SOON.map((c) => (
                <span key={c.label} className="chip opacity-70">
                  <Icon name={c.icon} className="text-[14px]" />
                  {c.label} · soon
                </span>
              ))}
            </div>
          </section>

          {log.length > 0 && (
            <Reveal delay={0.05}>
              <section>
                <div className="mb-4 flex items-center gap-6">
                  <h2 className="shrink-0 text-xl font-semibold">Recent focus sessions</h2>
                  <span className="fade-rule flex-1" />
                </div>
                <ul className="flex flex-col gap-2">
                  {log.slice(0, 6).map((s) => (
                    <li
                      key={s.startedAt}
                      className="flex items-center gap-4 rounded-full px-5 py-3 transition-colors duration-500 ease-out hover:bg-white/5"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {s.subject ?? "General revision"}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {formatClock(s.actualDurationSec)}
                      </span>
                      <Badge tone={s.completed ? "success" : "destructive"}>
                        {s.completed ? "Completed" : "Bailed"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <Reveal>
            <GoalCountdown />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card-pop p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Focus lock</h3>
                <span className="chip text-primary">+1 XP / min</span>
              </div>

              <div className="flex flex-col items-center py-6">
                <ProgressRing
                  progress={Math.min(1, todaySec / dailyTargetSec)}
                  size={150}
                  strokeWidth={10}
                >
                  <span className="font-mono text-2xl font-bold tabular-nums">
                    {formatClock(todaySec)}
                  </span>
                  <span className="label-eyebrow">today</span>
                </ProgressRing>
              </div>

              <p className="text-center text-sm leading-relaxed text-muted-foreground">
                {todaySessions.length} session{todaySessions.length === 1 ? "" : "s"} done · target
                4h. Try to escape mid-session and the deterrent plays.
              </p>
              <Link to="/focus" className="btn-base btn-primary mt-6 h-13 w-full text-sm">
                <Icon name="lock" className="text-[18px]" />
                Start lock-in
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              to="/weak-spots"
              className="card-pop card-pop-hover group flex items-center gap-4 px-6 py-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
                <Icon name="crisis_alert" filled className="text-[22px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">Weak spots</span>
                <span className="block text-xs text-muted-foreground">
                  Topics dragging your accuracy
                </span>
              </span>
              <Icon
                name="chevron_right"
                className="text-[20px] text-muted-foreground transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
