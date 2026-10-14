import { useQuery } from "@tanstack/react-query";
import { CountUp } from "@/components/motion/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { TRACKS } from "@/lib/tracks";

/**
 * Real numbers only: questions and PYQs counted live from the bank, lessons and
 * subjects from the content that ships with the app. A count that fails (or is
 * zero) is simply left out — never a made-up figure.
 */

const LESSONS = TRACKS.neet_pg.learn
  .concat(TRACKS.neet_ug.learn)
  .reduce((n, m) => n + m.concepts.length, 0);
const SUBJECTS = TRACKS.neet_pg.subjects.length + TRACKS.neet_ug.subjects.length;

async function count(pyq: boolean) {
  const q = supabase.from("questions").select("id", { count: "exact", head: true });
  const { count: n, error } = await (pyq ? q.eq("is_pyq", true) : q);
  return error ? 0 : (n ?? 0);
}

/** 1,616 → 1,600 so the "+" is honest. */
function floorNice(n: number) {
  if (n < 100) return n;
  const step = n < 1000 ? 50 : n < 10000 ? 100 : 1000;
  return Math.floor(n / step) * step;
}

export function StatsStrip() {
  const { data } = useQuery({
    queryKey: ["welcome-stats"],
    queryFn: async () => {
      const [questions, pyqs] = await Promise.all([count(false), count(true)]);
      return { questions, pyqs };
    },
    staleTime: 10 * 60_000,
    retry: false,
  });

  const items = [
    { value: data?.questions ?? 0, plus: true, label: "Practice questions" },
    { value: data?.pyqs ?? 0, plus: true, label: "Previous-year questions" },
    { value: LESSONS, plus: false, label: "Teaching-first lessons" },
    { value: SUBJECTS, plus: false, label: "Subjects across 2 exams" },
  ].filter((s) => s.value > 0);

  return (
    <section aria-label="Learners Studio in numbers" className="mx-auto max-w-6xl px-6">
      <div
        className={`grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-glass-line ring-1 ring-inset ring-glass-line ${
          items.length === 4 ? "md:grid-cols-4" : ""
        }`}
      >
        {items.map((s) => (
          <div key={s.label} className="bg-background/70 px-5 py-6 text-center backdrop-blur-xl">
            <p className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
              <CountUp value={s.plus ? floorNice(s.value) : s.value} />
              {s.plus ? <span className="text-primary">+</span> : null}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
