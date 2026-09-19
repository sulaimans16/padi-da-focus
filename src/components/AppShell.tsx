import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/lib/theme";
import { AskAi } from "@/components/AskAi";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { Icon } from "@/components/Primitives";
import { PageTransition } from "@/components/motion/Reveal";
import { doctorName } from "@/lib/doctor-name";
import { useAccess } from "@/hooks/useAccess";

type NavLink = {
  label: string;
  icon: string;
  to:
    | "/"
    | "/bank"
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
    | "/admin";
};

const PRIMARY: NavLink[] = [
  { label: "Dashboard", icon: "dashboard", to: "/" },
  { label: "Learn", icon: "menu_book", to: "/learn" },
  { label: "Videos", icon: "play_circle", to: "/videos" },
  { label: "QBank", icon: "quiz", to: "/bank" },
  { label: "Mock Tests", icon: "timer", to: "/mock" },
  { label: "Daily Challenge", icon: "bolt", to: "/daily" },
  { label: "PYQ Vault", icon: "history_edu", to: "/pyq" },
  { label: "Papers", icon: "description", to: "/papers" },
  { label: "Analytics", icon: "monitoring", to: "/tracker" },
];

const FOCUS_LINK: NavLink = { label: "Focus Lock", icon: "lock_clock", to: "/focus" };
const FILL_LINK: NavLink = { label: "Fill Bank", icon: "cloud_download", to: "/bank/fill" };
const PRICING_LINK: NavLink = { label: "Go Pro", icon: "workspace_premium", to: "/pricing" };
const ADMIN_LINK: NavLink = { label: "Admin", icon: "admin_panel_settings", to: "/admin" };

const FULL_BLEED = ["/focus", "/auth"];

function NavList({ items, pathname }: { items: NavLink[]; pathname: string }) {
  return (
    <>
      {items.map((item, i) => {
        const active =
          item.to === "/"
            ? pathname === "/"
            : pathname === item.to || pathname.startsWith(`${item.to}/`);
        return (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={item.to} className={`nav-item ${active ? "nav-item-active" : ""}`}>
              <Icon name={item.icon} className="text-[20px]" />
              {item.label}
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

  const SECONDARY: NavLink[] = [
    FOCUS_LINK,
    ...(isPro ? [FILL_LINK] : []),
    ...(isPro ? [] : [PRICING_LINK]),
    ...(isAdmin ? [ADMIN_LINK] : []),
  ];

  if (FULL_BLEED.some((p) => pathname.startsWith(p))) {
    return <>{children}</>;
  }

  const name = user ? doctorName(displayName, user.email) : "Guest";

  return (
    <div className="min-h-screen">
      {/* Desktop side navigation */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-glass-line px-4 py-5 md:flex glass-bar">
        <Link to="/" className="group flex items-center gap-2.5 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 ease-out group-hover:scale-105 group-hover:glow-ring">
            <Icon name="stethoscope" className="text-[20px]" />
          </span>
          <span className="text-base font-bold tracking-tight">
            Padi<span className="text-primary">Da</span>
          </span>
        </Link>

        <nav className="mt-7 flex flex-col gap-1">
          <p className="label-eyebrow px-4 pb-1">Prepare</p>
          <NavList items={PRIMARY} pathname={pathname} />
          <p className="label-eyebrow px-4 pb-1 pt-4">Discipline</p>
          <NavList items={SECONDARY} pathname={pathname} />
        </nav>

        <div className="mt-auto glass p-3.5">
          <p className="label-eyebrow">Signed in as</p>
          <p className="mt-1 truncate text-sm font-semibold">{name}</p>
          {user ? (
            <Link
              to="/tracker"
              className="mt-2 inline-block transition-colors duration-300 ease-out hover:text-accent text-xs font-semibold text-primary"
            >
              View my analytics →
            </Link>
          ) : (
            <Link
              to="/auth"
              className="mt-2 inline-block transition-colors duration-300 ease-out hover:text-accent text-xs font-semibold text-primary"
            >
              Sign in to sync →
            </Link>
          )}
        </div>
      </aside>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 border-b border-glass-line px-4 glass-bar md:pl-[17rem]">
        <Link to="/" className="flex items-center gap-2 md:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icon name="stethoscope" className="text-[18px]" />
          </span>
          <span className="text-sm font-bold">
            Padi<span className="text-primary">Da</span>
          </span>
        </Link>

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 md:justify-between">
          <button
            type="button"
            className="hidden min-w-0 flex-1 items-center gap-2 rounded-full border border-glass-line bg-surface-2/50 px-4 py-2 text-left text-sm text-muted-foreground transition-all duration-300 ease-out hover:border-primary/40 hover:text-foreground md:flex md:max-w-md"
          >
            <Icon name="search" className="shrink-0 text-[18px]" />
            <span className="truncate">Search topics, PYQs, high-yield facts</span>
          </button>
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
            <Link to="/focus" className="btn-base btn-primary h-9 whitespace-nowrap px-4 text-xs">
              <Icon name="lock" className="text-[16px]" />
              Lock in
            </Link>
          </div>
        </div>
      </header>

      <main className="pb-24 pt-16 md:ml-64 md:pb-8">
        <PageTransition routeKey={pathname}>{children}</PageTransition>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-glass-line glass-bar md:hidden">
        {[...PRIMARY.filter((i) => !["/tracker", "/videos", "/papers", "/mock"].includes(i.to)), FOCUS_LINK].map(
          (item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-all duration-300 ease-out active:scale-95 ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon name={item.icon} className="text-[22px]" />
                {item.label}
              </Link>
            );
          },
        )}
      </nav>

      <AskAi />
      <UsernamePrompt />
    </div>
  );
}
