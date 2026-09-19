import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Aurora } from "@/components/Aurora";

const OFFERINGS = [
  "23,000+ NEET PG questions with exam-style traps",
  "Timed mocks, daily challenges & PYQ vault",
  "Focus Lock that keeps you honest",
  "Weak-spot analytics that find your leaks",
];

const HOLD_MS = 3600;

/**
 * First-visit loading screen: introduces what PG Prep offers, then fluidly
 * dissolves into the app (sign-in for new visitors, dashboard otherwise).
 * Shown once per browser session.
 */
export function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const rotate = window.setInterval(() => setStep((s) => s + 1), HOLD_MS / OFFERINGS.length);
    const t = window.setTimeout(() => setLeaving(true), HOLD_MS);
    const t2 = window.setTimeout(onDone, HOLD_MS + 650);
    return () => {
      window.clearInterval(rotate);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  const skip = () => {
    setLeaving(true);
    window.setTimeout(onDone, 500);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="splash"
          role="button"
          aria-label="Skip intro"
          onClick={skip}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-background"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Aurora intensity="full" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl font-bold tracking-tight"
            >
              PG <span className="text-primary">Prep</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              by Learners Studio
            </motion.p>

            <div className="mt-10 h-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step % OFFERINGS.length}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm text-foreground/90"
                >
                  {OFFERINGS[step % OFFERINGS.length]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 h-[3px] w-40 overflow-hidden rounded-full bg-foreground/10"
            >
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: HOLD_MS / 1000 - 0.4, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
