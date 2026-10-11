import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Dr. Pulse — PG Prep's study buddy. A small heart with a stethoscope, drawn inline as SVG
 * so it themes with the app and can react: blink, bob, cheer, droop, walk.
 */

export type MascotMood = "idle" | "happy" | "cheer" | "fire" | "sad" | "think" | "sleep" | "walk";

const BODY = "oklch(0.72 0.17 18)";
const BODY_DARK = "oklch(0.56 0.17 18)";
const BODY_LIGHT = "oklch(0.82 0.12 18)";
const INK = "oklch(0.24 0.04 260)";
const STEEL = "oklch(0.86 0.02 240)";

const HEART =
  "M60 100 C 30 84, 10 64, 10 42 C 10 25, 22 13, 37 13 C 47 13, 55 19, 60 28 C 65 19, 73 13, 83 13 C 98 13, 110 25, 110 42 C 110 64, 90 84, 60 100 Z";

const BOB: Record<MascotMood, TargetAndTransition> = {
  idle: { y: [0, -2.5, 0], transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } },
  think: { y: [0, -1.5, 0], rotate: [0, -3, 0], transition: { duration: 3, repeat: Infinity } },
  happy: { y: [0, -9, 0], transition: { duration: 0.55, repeat: 2, ease: "easeOut" } },
  cheer: { y: [0, -12, 0], transition: { duration: 0.5, repeat: Infinity, ease: "easeOut" } },
  fire: { y: [0, -6, 0], scale: [1, 1.04, 1], transition: { duration: 0.6, repeat: Infinity } },
  sad: { y: 3, rotate: -4, transition: { type: "spring", stiffness: 200, damping: 12 } },
  sleep: { y: [2, 3.5, 2], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } },
  walk: { y: [0, -4, 0], rotate: [-3, 3, -3], transition: { duration: 0.45, repeat: Infinity } },
};

function Eyes({ mood }: { mood: MascotMood }) {
  if (mood === "happy" || mood === "cheer") {
    return (
      <g stroke={INK} strokeWidth={4.5} strokeLinecap="round" fill="none">
        <path d="M37 50 Q45 40 53 50" />
        <path d="M67 50 Q75 40 83 50" />
      </g>
    );
  }
  if (mood === "sleep") {
    return (
      <g stroke={INK} strokeWidth={4} strokeLinecap="round" fill="none">
        <path d="M37 50 Q45 56 53 50" />
        <path d="M67 50 Q75 56 83 50" />
      </g>
    );
  }
  const look =
    mood === "think" ? { x: 2, y: -4 } : mood === "sad" ? { x: 0, y: 3 } : { x: 1, y: 0 };
  return (
    <g className="mascot-blink" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      {[45, 75].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={48} rx={10} ry={12} fill="white" />
          <circle cx={cx + look.x} cy={49 + look.y} r={mood === "fire" ? 6.5 : 5.5} fill={INK} />
          <circle cx={cx + look.x + 2} cy={46 + look.y} r={1.8} fill="white" />
        </g>
      ))}
    </g>
  );
}

function Brows({ mood }: { mood: MascotMood }) {
  if (mood === "sad")
    return (
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <path d="M36 34 L52 30" />
        <path d="M84 34 L68 30" />
      </g>
    );
  if (mood === "think")
    return (
      <g stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none">
        <path d="M37 31 Q45 27 52 31" />
        <path d="M68 29 Q76 24 83 28" />
      </g>
    );
  if (mood === "fire")
    return (
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <path d="M36 30 L52 34" />
        <path d="M84 30 L68 34" />
      </g>
    );
  return null;
}

function Mouth({ mood }: { mood: MascotMood }) {
  switch (mood) {
    case "happy":
    case "cheer":
    case "fire":
      return (
        <g>
          <path d="M47 64 Q60 82 73 64 Z" fill={INK} />
          <path d="M53 71 Q60 77 67 71 Q60 74 53 71 Z" fill="oklch(0.7 0.16 15)" />
        </g>
      );
    case "sad":
      return (
        <path
          d="M51 73 Q60 66 69 73"
          stroke={INK}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
      );
    case "think":
      return (
        <path
          d="M54 70 Q62 68 68 71"
          stroke={INK}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
      );
    case "sleep":
      return <ellipse cx={60} cy={70} rx={4} ry={3} fill={INK} />;
    default:
      return (
        <path
          d="M50 66 Q60 76 70 66"
          stroke={INK}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
      );
  }
}

function Arms({ mood }: { mood: MascotMood }) {
  const up = mood === "cheer" || mood === "fire";
  return (
    <g stroke={BODY_DARK} strokeWidth={7} strokeLinecap="round" fill="none">
      <motion.path
        d={up ? "M16 50 Q6 34 10 22" : mood === "sad" ? "M16 58 Q8 68 10 76" : "M16 56 Q4 60 6 70"}
        animate={up ? { rotate: [0, -10, 0] } : mood === "walk" ? { rotate: [-12, 12, -12] } : {}}
        transition={{ duration: up ? 0.5 : 0.45, repeat: Infinity }}
        style={{ transformBox: "fill-box", transformOrigin: "bottom right" }}
      />
      <motion.path
        d={
          up
            ? "M104 50 Q114 34 110 22"
            : mood === "think"
              ? "M104 56 Q100 66 88 66"
              : mood === "sad"
                ? "M104 58 Q112 68 110 76"
                : "M104 56 Q116 60 114 70"
        }
        animate={up ? { rotate: [0, 10, 0] } : mood === "walk" ? { rotate: [12, -12, 12] } : {}}
        transition={{ duration: up ? 0.5 : 0.45, repeat: Infinity }}
        style={{ transformBox: "fill-box", transformOrigin: "bottom left" }}
      />
    </g>
  );
}

function Feet({ mood }: { mood: MascotMood }) {
  const walking = mood === "walk";
  return (
    <g fill={BODY_DARK}>
      <motion.ellipse
        cx={50}
        cy={104}
        rx={8}
        ry={5}
        animate={walking ? { y: [0, -4, 0], x: [0, -2, 0] } : {}}
        transition={{ duration: 0.45, repeat: Infinity }}
      />
      <motion.ellipse
        cx={70}
        cy={104}
        rx={8}
        ry={5}
        animate={walking ? { y: [-4, 0, -4], x: [2, 0, 2] } : {}}
        transition={{ duration: 0.45, repeat: Infinity }}
      />
    </g>
  );
}

function Extras({ mood }: { mood: MascotMood }) {
  return (
    <AnimatePresence>
      {mood === "cheer" ? (
        <motion.g
          key="sparkles"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {[
            [8, 10, "var(--color-xp)"],
            [112, 14, "var(--color-primary)"],
            [114, 80, "var(--color-xp)"],
          ].map(([x, y, c], i) => (
            <motion.path
              key={i}
              d={`M${x} ${Number(y) - 7} L${Number(x) + 2} ${Number(y) - 2} L${Number(x) + 7} ${y} L${Number(x) + 2} ${Number(y) + 2} L${x} ${Number(y) + 7} L${Number(x) - 2} ${Number(y) + 2} L${Number(x) - 7} ${y} L${Number(x) - 2} ${Number(y) - 2} Z`}
              fill={String(c)}
              animate={{ scale: [0.6, 1.2, 0.6], rotate: [0, 45, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </motion.g>
      ) : null}
      {mood === "fire" ? (
        <motion.path
          key="flame"
          d="M60 -2 C 70 8, 72 14, 66 20 C 68 12, 62 10, 60 6 C 58 12, 50 12, 54 20 C 46 14, 50 6, 60 -2 Z"
          fill="var(--color-streak)"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.15, 1] }}
          exit={{ opacity: 0 }}
          transition={{ scale: { duration: 0.5, repeat: Infinity } }}
          style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
        />
      ) : null}
      {mood === "sleep" ? (
        <motion.text
          key="zzz"
          x={92}
          y={16}
          fontSize={16}
          fontWeight={800}
          fill="var(--color-muted-foreground)"
          animate={{ y: [16, 6, 16], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          z
        </motion.text>
      ) : null}
      {mood === "think" ? (
        <motion.g
          key="dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={92 + i * 9}
              cy={8}
              r={3}
              fill="var(--color-muted-foreground)"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.g>
      ) : null}
    </AnimatePresence>
  );
}

/** Dr. Pulse. `size` is the rendered width in px. */
export function Mascot({
  mood = "idle",
  size = 96,
  className,
  flip = false,
  title = "Dr. Pulse",
}: {
  mood?: MascotMood;
  size?: number;
  className?: string;
  flip?: boolean;
  title?: string;
}) {
  return (
    <motion.svg
      viewBox="-8 -10 136 124"
      width={size}
      height={(size * 124) / 136}
      className={cn("shrink-0 overflow-visible", className)}
      style={{ scaleX: flip ? -1 : 1 }}
      role="img"
      aria-label={title}
    >
      {/* ground shadow */}
      <ellipse cx={60} cy={110} rx={30} ry={4} fill="black" opacity={0.18} />
      <motion.g
        key={mood}
        animate={BOB[mood]}
        style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
      >
        <Feet mood={mood} />
        <Arms mood={mood} />
        {/* body with a darker lip, matching the app's tactile style */}
        <path d={HEART} fill={BODY_DARK} transform="translate(0 4)" />
        <path d={HEART} fill={BODY} />
        <path
          d="M24 34 C 26 24, 34 19, 42 20"
          stroke={BODY_LIGHT}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
        {/* cheeks */}
        <ellipse cx={30} cy={62} rx={6} ry={4} fill="oklch(0.8 0.13 10)" opacity={0.8} />
        <ellipse cx={90} cy={62} rx={6} ry={4} fill="oklch(0.8 0.13 10)" opacity={0.8} />
        <Brows mood={mood} />
        <Eyes mood={mood} />
        <Mouth mood={mood} />
        {/* stethoscope */}
        <path
          d="M26 70 C 34 92, 86 92, 94 70"
          stroke={STEEL}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={76} cy={86} r={5.5} fill={STEEL} stroke="oklch(0.7 0.02 240)" strokeWidth={2} />
        <Extras mood={mood} />
      </motion.g>
    </motion.svg>
  );
}

/** Mascot with a speech bubble. */
export function MascotSays({
  mood = "idle",
  size = 88,
  children,
  side = "right",
  className,
}: {
  mood?: MascotMood;
  size?: number;
  children: ReactNode;
  side?: "right" | "left";
  className?: string;
}) {
  return (
    <div className={cn("flex items-end gap-3", side === "left" && "flex-row-reverse", className)}>
      <Mascot mood={mood} size={size} />
      <motion.div
        key={typeof children === "string" ? children : undefined}
        initial={{ opacity: 0, scale: 0.85, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className={cn(
          "relative mb-5 min-w-0 rounded-2xl border-2 border-glass-line bg-surface px-4 py-3 text-sm font-semibold leading-snug shadow-[0_4px_0_var(--color-edge)]",
          side === "right" ? "rounded-bl-md" : "rounded-br-md",
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
