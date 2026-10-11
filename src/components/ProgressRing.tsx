type Props = {
  progress: number; // 0..1
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  tone?: "primary" | "accent" | "destructive";
  /** Any CSS color; overrides `tone`. */
  color?: string;
  trackColor?: string;
};

export function ProgressRing({
  progress,
  size = 260,
  strokeWidth = 14,
  children,
  tone = "primary",
  color,
  trackColor = "var(--color-surface-2)",
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, progress));
  const strokeColor =
    color ??
    (tone === "destructive"
      ? "var(--color-destructive)"
      : tone === "accent"
        ? "var(--color-accent)"
        : "var(--color-primary)");

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}
