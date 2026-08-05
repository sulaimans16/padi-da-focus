import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAccess } from "@/hooks/useAccess";

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

/**
 * Renders children only for admins and paying members. Free users see a compact
 * upsell instead — no AI controls, no AI copy.
 */
export function ProGate({
  feature,
  children,
  quiet = false,
}: {
  feature: string;
  children: ReactNode;
  quiet?: boolean;
}) {
  const { loading, isPro, signedIn } = useAccess();

  if (loading) return null;
  if (isPro) return <>{children}</>;
  if (quiet) return null;

  return (
    <section className="card-surface flex flex-col gap-2 p-4">
      <p className="flex items-center gap-2 text-sm font-bold">
        <Icon name="workspace_premium" className="text-[18px] text-primary" />
        {feature} is a Pro feature
      </p>
      <p className="text-xs text-muted-foreground">
        PadiDa Pro unlocks every AI tool — ₹50 for 3 months or ₹100 for a year.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link to="/pricing" className="btn-base btn-primary h-9 px-3 text-xs">
          See plans
        </Link>
        {!signedIn ? (
          <Link to="/auth" className="btn-base btn-ghost h-9 px-3 text-xs">
            Sign in
          </Link>
        ) : null}
      </div>
    </section>
  );
}
