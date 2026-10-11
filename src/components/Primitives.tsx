import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Material symbol icon. `filled` uses the solid variant (game icons: flame, bolt, trophy). */
export function Icon({
  name,
  className = "",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span aria-hidden className={cn("material-symbols-outlined", filled && "icon-fill", className)}>
      {name}
    </span>
  );
}

const PILL_VARIANT = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  success: "btn-success",
  danger: "btn-danger",
  xp: "btn-xp",
} as const;

/** Chunky pill button that presses down on tap (depth comes from the CSS). */
export function Pill({
  children,
  variant = "ghost",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: keyof typeof PILL_VARIANT;
} & Omit<React.ComponentProps<typeof motion.button>, "children">) {
  return (
    <motion.button
      type="button"
      className={cn("btn-base", PILL_VARIANT[variant], className)}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/** Badge with an optional tooltip on hover/focus. */
export function Badge({
  children,
  tooltip,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tooltip?: string;
  tone?: "muted" | "primary" | "success" | "warning" | "destructive";
  className?: string;
}) {
  const toneClass = {
    muted: "",
    primary: "text-primary border-primary/40",
    success: "text-success border-success/40",
    warning: "text-warning border-warning/40",
    destructive: "text-destructive border-destructive/40",
  }[tone];

  return (
    <span className={cn("group/badge relative inline-flex", className)}>
      <span className={cn("chip", toneClass)}>{children}</span>
      {tooltip ? (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-glass-line bg-popover px-2.5 py-1.5 text-[11px] font-medium normal-case tracking-normal text-popover-foreground opacity-0 shadow-lg transition-all duration-200 ease-out group-hover/badge:translate-y-0 group-hover/badge:opacity-100"
        >
          {tooltip}
        </span>
      ) : null}
    </span>
  );
}

/** Floating glass card for bento sections. */
export function GlassCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div className={cn("card-surface overflow-hidden", interactive && "hover-lift", className)}>
      {children}
    </div>
  );
}

/** Collapsible dropdown section. */
export function Collapsible({
  label,
  children,
  defaultOpen = false,
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn("card-surface overflow-hidden", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-semibold transition-colors duration-300 ease-out hover:bg-surface-2/60"
      >
        {label}
        <Icon
          name="expand_more"
          className={cn(
            "text-[20px] text-muted-foreground transition-transform duration-300 ease-out",
            open && "rotate-180",
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="border-t border-glass-line px-5 py-4">{children}</div>
      </motion.div>
    </div>
  );
}
