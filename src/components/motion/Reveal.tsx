import { animate, motion, useMotionValue, useTransform, type HTMLMotionProps } from "motion/react";
import { useEffect, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Bouncy spring used for game feedback (pops, badges, toasts). */
export const SPRING = { type: "spring", stiffness: 520, damping: 22, mass: 0.7 } as const;

/** Fade + slide-up on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: _as,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: never;
} & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — pair with <StaggerItem />. */
export function Stagger({
  children,
  className,
  gap = 0.06,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Route-level entrance wrapper. */
export function PageTransition({
  children,
  routeKey,
}: {
  children: ReactNode;
  routeKey: string;
}) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Animated integer counter — rolls from the previous value to the new one. */
export function CountUp({
  value,
  className,
  duration = 0.8,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [mv, value, duration]);
  return <motion.span className={className}>{text}</motion.span>;
}

/** Springy scale-in for rewards and status chips. */
export function Pop({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}
