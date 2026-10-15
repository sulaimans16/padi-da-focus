import { seededRandom } from "./quiz";
import type { AssignmentResults, BatchDashboard, DashboardStudent } from "./institute";

/**
 * Sample data for /institute/demo: a NEET PG batch of 24 students with a
 * realistic spread (a few stars, a solid middle, some drifting). Seeded, so it
 * looks the same on every visit. No database access.
 */

const NAMES = [
  "Aarthi R",
  "Bala Murugan",
  "Chitra S",
  "Deepak K",
  "Divya N",
  "Farhan A",
  "Gayathri P",
  "Harish V",
  "Indhu M",
  "Janani L",
  "Karthik S",
  "Keerthana R",
  "Lokesh B",
  "Meena T",
  "Naveen J",
  "Nivetha G",
  "Pranav D",
  "Priya R",
  "Rahul M",
  "Sandhya K",
  "Suresh P",
  "Swathi V",
  "Vignesh A",
  "Yamini S",
];

const DAY = 86_400_000;

function iso(daysAgo: number, now: number) {
  return new Date(now - daysAgo * DAY).toISOString();
}

export function demoDashboard(now: number = Date.now()): BatchDashboard {
  const rng = seededRandom("learners-studio-demo");
  const students: DashboardStudent[] = NAMES.map((name, i) => {
    // Every 8th student a star, every 6th drifting, the rest steady.
    const tier = i % 8 === 0 ? "star" : i % 6 === 5 ? "drift" : "steady";
    const acc =
      tier === "star"
        ? 0.78 + rng() * 0.12
        : tier === "drift"
          ? 0.38 + rng() * 0.14
          : 0.56 + rng() * 0.16;
    const q7 =
      tier === "star"
        ? 180 + Math.round(rng() * 140)
        : tier === "drift"
          ? Math.round(rng() * 12)
          : 60 + Math.round(rng() * 90);
    const idle = tier === "drift" ? 6 + Math.round(rng() * 9) : Math.round(rng() * 2);
    return {
      user_id: `demo-${i}`,
      username: name
        .toLowerCase()
        .replace(/[^a-z]+/g, "_")
        .replace(/_$/, ""),
      name,
      joined_at: iso(40 - (i % 7), now),
      last_active: iso(idle, now),
      q7,
      q30: q7 * 4 + Math.round(rng() * 40),
      accuracy30: Math.round(acc * 1000) / 1000,
      streak:
        tier === "drift"
          ? 0
          : tier === "star"
            ? 20 + Math.round(rng() * 25)
            : Math.round(rng() * 12),
      week_xp: Math.round(q7 * (8 + rng() * 4)),
      assignments_done:
        tier === "drift" ? Math.round(rng()) : tier === "star" ? 3 : 2 + Math.round(rng()),
    };
  });

  const activity = Array.from({ length: 30 }, (_, k) => {
    const d = new Date(now - (29 - k) * DAY);
    const weekend = d.getUTCDay() === 0;
    const testDay = k === 12 || k === 26;
    const active = Math.min(24, Math.round((weekend ? 11 : 16) + rng() * 5 + (testDay ? 4 : 0)));
    return {
      day: d.toISOString().slice(0, 10),
      active,
      questions: active * (35 + Math.round(rng() * 30)),
    };
  });

  return {
    batch: {
      id: "demo",
      name: "NEET PG 2026 · Morning",
      exam: "neet_pg",
      join_code: "DEMO26PG",
      pro_days: 90,
      active: true,
    },
    assignments_total: 3,
    students,
    weak_topics: [
      {
        subject: "Pathology",
        topic: "Renal pathology",
        attempts: 412,
        students: 21,
        accuracy: 0.41,
      },
      {
        subject: "Pharmacology",
        topic: "Antiarrhythmics",
        attempts: 296,
        students: 19,
        accuracy: 0.44,
      },
      { subject: "Microbiology", topic: "Mycology", attempts: 188, students: 17, accuracy: 0.47 },
      { subject: "Anatomy", topic: "Brachial plexus", attempts: 254, students: 20, accuracy: 0.5 },
      { subject: "PSM", topic: "Biostatistics", attempts: 341, students: 22, accuracy: 0.52 },
      {
        subject: "Medicine",
        topic: "Acid–base disorders",
        attempts: 228,
        students: 18,
        accuracy: 0.55,
      },
      {
        subject: "Biochemistry",
        topic: "Lysosomal storage disorders",
        attempts: 143,
        students: 14,
        accuracy: 0.57,
      },
      {
        subject: "Obstetrics & Gynaecology",
        topic: "Partograph",
        attempts: 121,
        students: 13,
        accuracy: 0.6,
      },
    ],
    subjects: [
      { subject: "Pathology", attempts: 1840, accuracy: 0.58 },
      { subject: "Pharmacology", attempts: 1522, accuracy: 0.6 },
      { subject: "PSM", attempts: 1388, accuracy: 0.62 },
      { subject: "Microbiology", attempts: 980, accuracy: 0.63 },
      { subject: "Anatomy", attempts: 1210, accuracy: 0.64 },
      { subject: "Medicine", attempts: 2104, accuracy: 0.66 },
      { subject: "Physiology", attempts: 1176, accuracy: 0.7 },
      { subject: "Surgery", attempts: 1460, accuracy: 0.71 },
    ],
    activity,
    assignments: [
      {
        id: "demo-a1",
        title: "Renal pathology · post-class drill",
        due_at: iso(-2, now),
        created_at: iso(1, now),
        total: 20,
        submissions: 14,
        avg_score: 11.6,
      },
      {
        id: "demo-a2",
        title: "Pharmacology · PYQ 2023",
        due_at: iso(4, now),
        created_at: iso(8, now),
        total: 30,
        submissions: 21,
        avg_score: 19.2,
      },
      {
        id: "demo-a3",
        title: "Grand test revision · mixed",
        due_at: iso(11, now),
        created_at: iso(15, now),
        total: 50,
        submissions: 22,
        avg_score: 33.4,
      },
    ],
  };
}

export function demoResults(dash: BatchDashboard): AssignmentResults {
  const rng = seededRandom("learners-studio-demo-results");
  const stems = [
    ["Most common cause of nephrotic syndrome in children", "Glomerular diseases"],
    ["Crescents are characteristic of which glomerulonephritis pattern", "Glomerular diseases"],
    ["Kimmelstiel–Wilson lesion is seen in", "Diabetic nephropathy"],
    ["'Spike and dome' appearance on silver stain", "Membranous nephropathy"],
    ["Apple-green birefringence under polarised light", "Amyloidosis"],
    ["Most common type of renal cell carcinoma", "Renal tumours"],
    ["Thyroidisation of the kidney is seen in", "Chronic pyelonephritis"],
    ["Flea-bitten kidney is seen in", "Malignant hypertension"],
    ["Tram-track appearance on renal biopsy", "MPGN"],
    ["Commonest renal tumour of childhood", "Renal tumours"],
  ];
  const questions = Array.from({ length: 20 }, (_, i) => {
    const [stem, topic] = stems[i % stems.length]!;
    const answered = 14;
    return {
      id: `demo-q${i}`,
      stem: `${stem}?`,
      topic: topic!,
      subject: "Pathology",
      answered,
      correct: Math.round(answered * (0.3 + rng() * 0.6)),
    };
  });
  const students = dash.students.map((s, i) => {
    const done = i % 6 !== 5 && i < 20;
    return {
      user_id: s.user_id,
      username: s.username,
      name: s.name,
      score: done
        ? Math.max(4, Math.min(20, Math.round((s.accuracy30 ?? 0.5) * 20 + (rng() * 4 - 2))))
        : null,
      seconds: done ? 600 + Math.round(rng() * 900) : null,
      submitted_at: done ? new Date().toISOString() : null,
    };
  });
  students.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  return {
    id: "demo-a1",
    title: "Renal pathology · post-class drill",
    due_at: dash.assignments[0]!.due_at,
    total: 20,
    students,
    questions,
  };
}
