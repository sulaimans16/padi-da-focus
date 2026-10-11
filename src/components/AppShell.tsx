import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/lib/theme";
import { AskAi } from "@/components/AskAi";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { Icon } from "@/components/Primitives";
import { Aurora } from "@/components/Aurora";
import { PageTransition } from "@/components/motion/Reveal";
import { BrandMark } from "@/components/BrandMark";
import { doctorName } from "@/lib/doctor-name";
import { useAccess } from "@/hooks/useAccess";
import { useGameState } from "@/hooks/useGameState";
import { GameLayer } from "@/components/game/GameLayer";
import { DailyGoalRing, ProgressBar, StreakFlame } from "@/components/game/Widgets";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/SignOutButton";

type NavLink = {
  label: string;
  icon: string;
  to:
    | "/"
    | "/bank"
    | "/roadmap"
    | "/pyq"
    | "/mock"
    | "/daily"
    | "/papers"
    | "/tracker"
    | "/weak-spots"
    | "/bank/fill"
    | "/focus"
    | "/learn"
    | "/videos"
    | "/pricing"
    | "/admin"
    | "/review"
    | "/flashcards"
    | "/leagues"
    | "/profile";
  badge?: number;
};

const PLAY: NavLink[] = [
  { label: "Home", icon: "home", to: "/" },
  { label: "Learn", icon: "menu_book", to: "/learn" },
  { label: "Daily Challenge", icon: "bolt", to: "/daily" },
  { label: "Flashcards", icon: "style", to: "/flashcards" },
  { label: "Fix Mistakes", icon: "healing", to: "/review" },
  { label: "Leagues", icon: "trophy", to: "/leagues" },
];

const PRIMARY: NavLink[] = [
  { label: "QBank", icon: "quiz", to: "/bank" },
  { label: "Mock Tests", icon: "timer", to: "/mock" },
  { label: "PYQ Vault", icon: "history_edu", to: "/pyq" },
  { label: "Roadmap", icon: "route", to: "/roadmap" },
  { label: "Videos", icon: "play_circle", to: "/videos" },
  { label: "Papers", icon: "description", to: "/papers" },
  { label: "Analytics", icon: "monitoring", to: "/tracker" },
  { label: "Weak Spots", icon: "crisis_alert", to: "/weak-spots" },
];

const MOBILE: NavLink[] = [
  { label: "Home", icon: "home", to: "/" },
  { label: "Learn", icon: "menu_book", to: "/learn" },
  { label: "Practice", icon: "bolt", to: "/daily" },
  { label: "Leagues", icon: "trophy", to: "/leagues" },
  { label: "Profile", icon: "person", to: "/profile" },
];

function isActive(to: string, pathname: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

/** Streak, today's XP vs goal, and level — the always-visible game HUD. */
function GameHud({ compact = false }: { compact?: boolean }) {
  const { state, level, signedIn } = useGameState();
  const streak = state?.streak ?? 0;
  const lit = Boolean(state?.streakExtendedToday);
  const to = signedIn ? "/profile" : "/auth";
  return (
    <Link
      to={to}
      className="flex items-center gap-1 rounded-full border-2 border-glass-line bg-surface-2/50 py-1 pl-2 pr-1 transition-colors duration-300 hover:border-primary/40"
      title="Your streak, daily goal and level"
    >
      <StreakFlame streak={streak} lit={lit} size="sm" className="pr-1.5" />
      <span className="flex items-center gap-1.5 border-l-2 border-glass-line px-2">
        <DailyGoalRing
          todayXp={state?.todayXp ?? 0}
          goal={state?.dailyGoal ?? 50}
          size={26}
          strokeWidth={3.5}
        />
        {!compact ? (
          <span className="font-display text-xs font-bold tabular-nums">
            {state?.todayXp ?? 0}
            <span className="text-muted-foreground">/{state?.dailyGoal ?? 50}</span>
          </span>
        ) : null}
      </span>
      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-gem/20 px-2 font-display text-xs font-bold text-gem">
        Lv {level.level}
      </span>
    </Link>
  );
}

const FOCUS_LINK: NavLink = { label: "Focus Lock", icon: "lock_clock", to: "/focus" };
const FILL_LINK: NavLink = { label: "Fill Bank", icon: "cloud_download", to: "/bank/fill" };
const PRICING_LINK: NavLink = { label: "Go Pro", icon: "workspace_premium", to: "/pricing" };
const ADMIN_LINK: NavLink = { label: "Admin", icon: "admin_panel_settings", to: "/admin" };

const FULL_BLEED = ["/focus", "/auth", "/welcome"];

function NavList({ items, pathname }: { items: NavLink[]; pathname: string }) {
  return (
    <>
      {items.map((item, i) => {
        const active = isActive(item.to, pathname);
        return (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={item.to} className={`nav-item ${active ? "nav-item-active" : ""}`}>
              <Icon name={item.icon} filled={active} className="text-[20px]" />
              {item.label}
              {item.badge ? (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              ) : null}
            </Link>
          </motion.div>
        );
      })}
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, displayName } = useAuth();
  const { theme, toggle } = useTheme();
  const { isPro, isAdmin } = useAccess();
  const { state: game, level, rank } = useGameState();
  const play = PLAY.map((l) => (l.to === "/review" ? { ...l, badge: game?.mistakesDue ?? 0 } : l));

  const SECONDARY: NavLink[] = [
    FOCUS_LINK,
    ...(isPro ? [FILL_LINK] : []),
    ...(isPro ? [] : [PRICING_LINK]),
    ...(isAdmin ? [ADMIN_LINK] : []),
  ];

  if (FULL_BLEED.some((p) => pathname.startsWith(p))) {
    return (
      <>
        {children}
        <GameLayer />
      </>
    );
  }

  const name = user ? doctorName(displayName, user.email) : "Guest";

  return (
    <div className="min-h-screen">
      <Aurora />

      {/* Desktop side navigation — dissolves into the background, no column rule */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 min-h-0 flex-col overflow-hidden px-4 py-5 md:flex glass-bar">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5 px-2">
          <BrandMark className="h-9 w-9 transition-transform duration-300 ease-out group-hover:scale-105" />
          <span className="text-base font-bold tracking-tight">
            PG <span className="text-primary">Prep</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="mt-7 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-3"
        >
          <p className="label-eyebrow px-4 pb-1">Play</p>
          <NavList items={play} pathname={pathname} />
          <p className="label-eyebrow px-4 pb-1 pt-4">Prepare</p>
          <NavList items={PRIMARY} pathname={pathname} />
          <p className="label-eyebrow px-4 pb-1 pt-4">Discipline</p>
          <NavList items={SECONDARY} pathname={pathname} />
        </nav>

        <Link
          to={user ? "/profile" : "/auth"}
          className="card-pop card-pop-hover mt-3 block shrink-0 p-3.5"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gem/20 font-display text-base font-bold text-gem ring-2 ring-gem/40">
              {level.level}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-[11px] font-semibold text-muted-foreground">
                {rank.title}
              </p>
            </div>
          </div>
          <ProgressBar value={level.progress} color="var(--color-gem)" className="mt-3 h-2" />
          <p className="mt-2 text-[11px] font-semibold text-primary">
            {user ? "View profile & badges →" : "Sign in to save your XP →"}
          </p>
        </Link>

        {user ? <SignOutButton className="mt-2 shrink-0 justify-start" /> : null}
        <Link
          to="/privacy"
          className="mt-2 inline-block px-2 text-[11px] text-muted-foreground transition-colors duration-300 ease-out hover:text-primary"
        >
          Privacy Policy
        </Link>
      </aside>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 px-4 glass-bar md:pl-[17rem]">
        <Link to="/" className="flex items-center gap-2 md:hidden">
          <BrandMark className="h-8 w-8" />
          <span className="text-sm font-bold">
            PG <span className="text-primary">Prep</span>
          </span>
        </Link>

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 md:justify-between">
          <div className="hidden md:block">
            <GameHud />
          </div>
          <div className="md:hidden">
            <GameHud compact />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              type="button"
              onClick={toggle}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              className="btn-base btn-ghost h-9 w-9 justify-center p-0"
            >
              <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} className="text-[18px]" />
            </motion.button>
            <Link
              to="/focus"
              className="btn-base btn-primary hidden h-9 whitespace-nowrap px-4 text-xs sm:inline-flex"
            >
              <Icon name="lock" className="text-[16px]" />
              Lock in
            </Link>
          </div>
        </div>
      </header>

      <main className="pb-24 pt-16 md:ml-64 md:pb-8">
        <PageTransition routeKey={pathname}>{children}</PageTransition>
      </main>

      {/* Mobile bottom navigation — raised centre "Practice" button */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 items-end glass-bar pb-[env(safe-area-inset-bottom)] md:hidden">
        {MOBILE.map((item) => {
          const active = isActive(item.to, pathname);
          const target = item.to === "/profile" && !user ? "/auth" : item.to;
          if (item.label === "Practice") {
            return (
              <Link key={item.label} to={target} className="flex flex-col items-center pb-2">
                <span
                  className={cn(
                    "btn-base btn-primary -mt-6 h-14 w-14 rounded-2xl p-0",
                    active && "animate-pulse-ring",
                  )}
                >
                  <Icon name={item.icon} filled className="text-[28px]" />
                </span>
                <span className="mt-1 text-[10px] font-bold text-primary">{item.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.label}
              to={target}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-all duration-300 ease-out active:scale-90 ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <Icon name={item.icon} filled={active} className="text-[24px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <AskAi />
      <UsernamePrompt />
      <GameLayer />
    </div>
  );
}
