export type VideoLesson = {
  id: string; // YouTube video id
  title: string;
  channel: string;
  topic: string;
  minutes: number;
  blurb: string;
};

export type VideoModule = {
  slug: string;
  subject: string;
  icon: string;
  blurb: string;
  lessons: VideoLesson[];
};

export const VIDEO_MODULES: VideoModule[] = [
  {
    slug: "anatomy",
    subject: "Anatomy",
    icon: "accessibility_new",
    blurb: "Board-style regional anatomy walkthroughs drawn live on the whiteboard.",
    lessons: [
      {
        id: "UlDFSlRBeCE",
        title: "Brachial Plexus",
        channel: "Ninja Nerd",
        topic: "Upper limb",
        minutes: 52,
        blurb: "Roots to terminal branches, then every classic injury pattern tested in NEET PG.",
      },
      {
        id: "gpIDVyM8V4U",
        title: "Cranial Nerves — Overview",
        channel: "Ninja Nerd",
        topic: "Neuroanatomy",
        minutes: 46,
        blurb: "Nuclei, exits and functional columns for all twelve nerves in one pass.",
      },
      {
        id: "_gU8HJ-VSOE",
        title: "Inguinal Canal Anatomy and Hernias",
        channel: "Anatomy lecture series",
        topic: "Abdomen",
        minutes: 22,
        blurb: "Canal walls and contents, then direct vs indirect hernia in relation to the deep ring.",
      },
      {
        id: "7ERVxf5eD7k",
        title: "Anatomy of the Heart and Coronary Circulation",
        channel: "Armando Hasudungan",
        topic: "Thorax",
        minutes: 18,
        blurb: "Chambers, valves and the coronary territories that map onto ECG leads.",
      },
    ],
  },
  {
    slug: "physiology",
    subject: "Physiology",
    icon: "monitor_heart",
    blurb: "Mechanism-first physiology: pressure curves, channels and transporters.",
    lessons: [
      {
        id: "xamYVlNF5Zo",
        title: "Cardiac Cycle",
        channel: "Ninja Nerd",
        topic: "Cardiovascular",
        minutes: 58,
        blurb: "Pressure–volume events phase by phase, with heart sounds and murmur timing.",
      },
      {
        id: "1kX6Tp8CWFw",
        title: "Intrinsic Cardiac Electrophysiology",
        channel: "Ninja Nerd",
        topic: "Cardiovascular",
        minutes: 44,
        blurb: "Pacemaker vs ventricular action potentials and the ionic basis of each phase.",
      },
      {
        id: "rwZIT_N75Bs",
        title: "Filtration, Reabsorption and Secretion",
        channel: "Ninja Nerd",
        topic: "Renal",
        minutes: 41,
        blurb: "How GFR is set, plus segment-by-segment handling of solutes and water.",
      },
      {
        id: "myag4d5uGa4",
        title: "Acid–Base: Respiratory Regulation",
        channel: "Armando Hasudungan",
        topic: "Respiratory",
        minutes: 15,
        blurb: "Buffering, compensation and how to read an arterial blood gas cleanly.",
      },
    ],
  },
  {
    slug: "biochemistry",
    subject: "Biochemistry",
    icon: "science",
    blurb: "Metabolic maps that finally make the pathway questions feel guessable.",
    lessons: [
      {
        id: "xoqyF6DJZ-Y",
        title: "Regulation of Glycolysis",
        channel: "Ninja Nerd",
        topic: "Carbohydrate metabolism",
        minutes: 38,
        blurb: "Rate-limiting steps, hormonal control and the enzyme deficiencies asked about.",
      },
      {
        id: "rr7IRYLqleg",
        title: "The Krebs Cycle",
        channel: "Ninja Nerd",
        topic: "Energy metabolism",
        minutes: 42,
        blurb: "Every intermediate, cofactor and ATP yield, with the classic inhibitors.",
      },
      {
        id: "itqDqf7XZDU",
        title: "Vitamins A, D, E, K and B complex",
        channel: "Biochemistry Step 1 series",
        topic: "Micronutrients",
        minutes: 51,
        blurb: "Deficiency syndromes and enzyme cofactor roles in an exam-ready order.",
      },
      {
        id: "U1nK68V3SeA",
        title: "Regulation of the Transition Stage",
        channel: "Ninja Nerd",
        topic: "Carbohydrate metabolism",
        minutes: 24,
        blurb: "Pyruvate dehydrogenase control and why deficiency causes lactic acidosis.",
      },
    ],
  },
  {
    slug: "pharmacology",
    subject: "Pharmacology",
    icon: "medication",
    blurb: "Receptors, mechanisms and side-effect profiles with memory hooks.",
    lessons: [
      {
        id: "cI8G2KSQdMo",
        title: "Autonomic Nervous System Pharmacology",
        channel: "Dirty Medicine",
        topic: "Autonomics",
        minutes: 27,
        blurb: "Receptor subtypes and second messengers, then drugs mapped onto them.",
      },
      {
        id: "lCJke5YtZZo",
        title: "Cholinergic Agonists",
        channel: "Ninja Nerd",
        topic: "Autonomics",
        minutes: 33,
        blurb: "Direct and indirect agonists, organophosphate poisoning and antidotes.",
      },
      {
        id: "aSRI6BGXX70",
        title: "Antiplatelet, Anticoagulant and Thrombolytic Agents",
        channel: "Ninja Nerd",
        topic: "Haematology",
        minutes: 49,
        blurb: "Heparin vs warfarin vs DOACs, monitoring targets and reversal agents.",
      },
      {
        id: "GGtwJ-SGXTA",
        title: "Antibiotics",
        channel: "Armando Hasudungan",
        topic: "Antimicrobials",
        minutes: 20,
        blurb: "Cell wall, protein synthesis and DNA-targeting classes with resistance mechanisms.",
      },
    ],
  },
  {
    slug: "pathology",
    subject: "Pathology",
    icon: "biotech",
    blurb: "Cell injury to neoplasia, taught as processes rather than lists.",
    lessons: [
      {
        id: "q3JvDATUr8Y",
        title: "Cell Injury — Apoptosis vs Necrosis",
        channel: "Ninja Nerd",
        topic: "General pathology",
        minutes: 47,
        blurb: "Reversible vs irreversible injury, necrosis patterns and gangrene types.",
      },
      {
        id: "LArxUakFsFs",
        title: "Inflammation — Vascular Events",
        channel: "Ninja Nerd",
        topic: "Inflammation",
        minutes: 36,
        blurb: "Mediators, permeability changes and the exudate that follows.",
      },
      {
        id: "yTIZpzoaIT0",
        title: "Inflammation — Cellular Events",
        channel: "Ninja Nerd",
        topic: "Inflammation",
        minutes: 39,
        blurb: "Margination to phagocytosis, plus the leukocyte adhesion defects.",
      },
      {
        id: "OOKc97eFnmY",
        title: "Neoplasia — Comprehensive Review",
        channel: "Pathology Step 1 review",
        topic: "Neoplasia",
        minutes: 55,
        blurb: "Oncogenes, tumour suppressors, grading vs staging and tumour markers.",
      },
    ],
  },
  {
    slug: "medicine",
    subject: "Medicine",
    icon: "stethoscope",
    blurb: "Clinical medicine lectures built around presentation, workup and management.",
    lessons: [
      {
        id: "TBG9Jw3yd9I",
        title: "Acute Coronary Syndrome — Detailed Overview",
        channel: "Armando Hasudungan",
        topic: "Cardiology",
        minutes: 25,
        blurb: "STEMI vs NSTEMI, troponin kinetics and reperfusion decision-making.",
      },
      {
        id: "Gsu8NT1yYes",
        title: "Congestive Heart Failure",
        channel: "Ninja Nerd",
        topic: "Cardiology",
        minutes: 62,
        blurb: "Systolic vs diastolic failure, compensations and mortality-reducing therapy.",
      },
      {
        id: "FxOXPVW4ZCc",
        title: "Diabetic Ketoacidosis — Management",
        channel: "Armando Hasudungan",
        topic: "Endocrinology",
        minutes: 16,
        blurb: "Fluids, insulin and potassium sequencing, plus the anion gap arithmetic.",
      },
      {
        id: "rh8ycjPCj18",
        title: "Diabetes Mellitus",
        channel: "Ninja Nerd",
        topic: "Endocrinology",
        minutes: 57,
        blurb: "Pathogenesis, complications and the full stepwise drug ladder.",
      },
    ],
  },
];

export function getVideoModule(slug: string) {
  return VIDEO_MODULES.find((m) => m.slug === slug);
}

export function videoThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function videoWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videoEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}

export const TOTAL_VIDEO_LESSONS = VIDEO_MODULES.reduce((n, m) => n + m.lessons.length, 0);
