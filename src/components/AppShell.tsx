import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

type NavLink = {
  label: string;
  icon: string;
  to: "/" | "/bank" | "/pyq" | "/tracker" | "/bank/fill" | "/focus";
};

const PRIMARY: NavLink[] = [
  { label: "Dashboard", icon: "dashboard", to: "/" },
  { label: "QBank", icon: "quiz", to: "/bank" },
  { label: "PYQ Vault", icon: "history_edu", to: "/pyq" },
  { label: "Analytics", icon: "monitoring", to: "/tracker" },
];

const SECONDARY: NavLink[] = [
  { label: "Focus Lock", icon: "lock_clock", to: "/focus" },
  { label: "Fill Bank", icon: "cloud_download", to: "/bank/fill" },
];

const FULL_BLEED = ["/focus", "/auth"];

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function NavList({ items, pathname }: { items: NavLink[]; pathname: string }) {
  return (
    <>
      {items.map((item) => {
        const active =
          item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-item ${active ? "nav-item-active" : ""}`}
          >
            <Icon name={item.icon} className="text-[20px]" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, displayName } = useAuth();

  if (FULL_BLEED.some((p) => pathname.startsWith(p))) return <>{children}</>;

  const name = displayName || user?.email?.split("@")[0] || "Guest";

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop side navigation */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-surface px-4 py-5 md:flex">
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon name="stethoscope" className="text-[20px]" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight">
              Padi<span className="text-primary">Da</span>
            </span>
            <span className="label-eyebrow">NEET PG 2026</span>
          </span>
        </Link>

        <nav className="mt-7 flex flex-col gap-1">
          <p className="label-eyebrow px-4 pb-1">Prepare</p>
          <NavList items={PRIMARY} pathname={pathname} />
          <p className="label-eyebrow px-4 pb-1 pt-4">Discipline</p>
          <NavList items={SECONDARY} pathname={pathname} />
        </nav>

        <div className="mt-auto rounded-xl border border-border bg-surface-2 p-3">
          <p className="label-eyebrow">Signed in as</p>
          <p className="mt-1 truncate text-sm font-bold">{name}</p>
          {user ? (
            <Link to="/tracker" className="mt-2 block text-xs font-bold text-primary">
              View my analytics →
            </Link>
          ) : (
            <Link to="/auth" className="mt-2 block text-xs font-bold text-primary">
              Sign in to sync →
            </Link>
          )}
        </div>
      </aside>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur md:pl-[17rem]">
        <Link to="/" className="flex items-center gap-2 md:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon name="stethoscope" className="text-[18px]" />
          </span>
          <span className="text-sm font-extrabold">
            Padi<span className="text-primary">Da</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2 md:ml-0 md:w-full md:max-w-md">
          <div className="hidden w-full items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-muted-foreground md:flex">
            <Icon name="search" className="text-[18px]" />
            <span>Search topics, PYQs, high-yield facts</span>
          </div>
          <Link to="/focus" className="btn-base btn-primary px-3 py-2 text-xs">
            <Icon name="lock" className="text-[16px]" />
            Lock in
          </Link>
        </div>
      </header>

      <main className="pb-24 pt-16 md:ml-64 md:pb-8">{children}</main>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface md:hidden">
        {[...PRIMARY, SECONDARY[0]!].map((item) => {
          const active =
            item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-bold ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <Icon name={item.icon} className="text-[22px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
