import { LEARN_MODULES, type LearnModule } from "./learn";
import { VIDEO_MODULES, type VideoModule } from "./videos";
import { UG_LEARN_MODULES } from "./ug/learn";
import { UG_VIDEO_MODULES } from "./ug/videos";
import { slugOf, type TrackId, type TrackSlug } from "./track-state";

export type { TrackId, TrackSlug } from "./track-state";

export type MockLength = { id: string; label: string; count: number; minutes: number };

/**
 * Everything that differs between exam tracks. Screens are shared; they read
 * their subjects, content, copy and exam pattern from here.
 */
export type Track = {
  id: TrackId;
  slug: TrackSlug;
  category: "medical";
  /** Full exam name, e.g. "NEET UG". */
  name: string;
  /** Short brand pair rendered as "<a> <b>" — "UG Prep". */
  brand: { a: string; b: string };
  tagline: string;
  /** Who the exam is for, shown on the picker. */
  audience: string;
  subjects: string[];
  /** Learn groups in display order, each with a one-line note. */
  learnGroups: { id: string; note: string }[];
  learn: LearnModule[];
  videos: VideoModule[];
  mock: { lengths: MockLength[]; marking: { correct: number; wrong: number } };
  /** Label for the self-test case in a concept. */
  caseLabel: string;
  /** Default exam date for the countdown (ISO date). */
  examDateDefault: string;
  /** Wording used in AI prompts. */
  ai: {
    /** "senior NEET PG question setter…" */
    setter: string;
    /** "NEET PG/AIIMS/INICET papers" — where real past questions come from. */
    papers: string;
    /** Style of the items, e.g. clinical vignettes vs NCERT-based. */
    style: string;
    mentor: string;
    books: string;
    tutor: string;
  };
};

export const TRACKS: Record<TrackId, Track> = {
  neet_pg: {
    id: "neet_pg",
    slug: slugOf("neet_pg"),
    category: "medical",
    name: "NEET PG",
    brand: { a: "PG", b: "Prep" },
    tagline: "Postgraduate medical entrance — 19 subjects, clinical vignettes.",
    audience: "MBBS graduates and interns",
    subjects: [
      "Medicine",
      "Surgery",
      "Obstetrics & Gynaecology",
      "Pediatrics",
      "Pharmacology",
      "Pathology",
      "Microbiology",
      "PSM",
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Radiology",
      "Anaesthesia",
      "Ophthalmology",
      "ENT",
      "Orthopaedics",
      "Psychiatry",
      "Dermatology",
      "Forensic Medicine",
    ],
    learnGroups: [
      { id: "Pre-clinical", note: "The foundations everything else is built on" },
      { id: "Para-clinical", note: "Mechanisms of disease and treatment" },
      { id: "Clinical", note: "Where most exam questions come from" },
    ],
    learn: LEARN_MODULES,
    videos: VIDEO_MODULES,
    mock: {
      lengths: [
        { id: "blitz", label: "Quick blitz", count: 25, minutes: 25 },
        { id: "half", label: "Half paper", count: 50, minutes: 55 },
        { id: "grand", label: "Grand test", count: 100, minutes: 110 },
        { id: "full", label: "Full length", count: 200, minutes: 210 },
      ],
      marking: { correct: 4, wrong: -1 },
    },
    caseLabel: "Clinical case",
    examDateDefault: "2026-08-30",
    ai: {
      setter: "a senior NEET PG question setter",
      papers: "NEET PG/AIIMS/INICET papers",
      style:
        "NBE-style single-best-answer MCQs, mostly clinical vignettes, with one-liner, explanation and why each distractor is wrong",
      mentor: "a senior NEET PG / INICET mentor",
      books:
        "standard MBBS textbooks and review books (e.g. Harrison, Bailey & Love, Robbins, KDT, Park, Williams Obstetrics)",
      tutor:
        "an expert medical tutor helping a student prepare for Indian postgraduate medical entrance exams (NEET PG / INICET)",
    },
  },
  neet_ug: {
    id: "neet_ug",
    slug: slugOf("neet_ug"),
    category: "medical",
    name: "NEET UG",
    brand: { a: "UG", b: "Prep" },
    tagline: "Undergraduate medical entrance — Physics, Chemistry, Biology from NCERT.",
    audience: "Class 11–12 students and droppers",
    subjects: ["Physics", "Chemistry", "Botany", "Zoology"],
    learnGroups: [
      { id: "Physics", note: "Concepts, formulae and the numericals NTA repeats" },
      { id: "Chemistry", note: "Physical, inorganic and organic — NCERT line by line" },
      { id: "Biology", note: "Half the paper — Botany and Zoology from NCERT" },
    ],
    learn: UG_LEARN_MODULES,
    videos: UG_VIDEO_MODULES,
    mock: {
      lengths: [
        { id: "blitz", label: "Subject blitz", count: 45, minutes: 45 },
        { id: "half", label: "Half paper", count: 90, minutes: 90 },
        { id: "full", label: "Full paper (NTA pattern)", count: 180, minutes: 180 },
      ],
      marking: { correct: 4, wrong: -1 },
    },
    caseLabel: "Worked example",
    examDateDefault: "2027-05-02",
    ai: {
      setter: "a senior NTA NEET UG question setter",
      papers: "NEET UG / AIPMT papers",
      style:
        "NTA-style single-correct MCQs strictly within the NCERT Class 11–12 syllabus (statement, assertion-reason, match-the-column and numerical types), with one-liner, explanation and why each distractor is wrong",
      mentor: "a senior NEET UG mentor who has coached toppers",
      books:
        "NCERT Class 11 and 12 textbooks first, then standard references (HC Verma, DC Pandey, MS Chouhan, NCERT Exemplar, Trueman's Biology)",
      tutor:
        "an expert tutor helping a Class 11–12 student prepare for NEET UG, the Indian undergraduate medical entrance exam, strictly from the NCERT syllabus",
    },
  },
};

export const TRACK_LIST: Track[] = [TRACKS.neet_ug, TRACKS.neet_pg];

export function trackBySlug(slug: string | undefined | null): Track | undefined {
  return TRACK_LIST.find((t) => t.slug === slug);
}

export function trackById(id: string | undefined | null): Track {
  return id === "neet_ug" ? TRACKS.neet_ug : TRACKS.neet_pg;
}

export function getTrackModule(track: Track, slug: string) {
  return track.learn.find((m) => m.slug === slug);
}

export function getTrackVideoModule(track: Track, slug: string) {
  return track.videos.find((m) => m.slug === slug);
}

/**
 * Route `head()` helper: page meta is written once (NEET PG wording) and
 * re-labelled for the track in the URL, so each track gets its own titles.
 */
export function localizeHead<T>(slug: string | undefined, head: T): T {
  const track = trackBySlug(slug) ?? TRACKS.neet_pg;
  if (track.id === "neet_pg") return head;
  return JSON.parse(
    JSON.stringify(head)
      .replaceAll("NEET PG", track.name)
      .replaceAll("PG Prep", `${track.brand.a} Prep`),
  ) as T;
}

/** Same re-labelling for a single string of body copy. */
export function localizeText(track: Track, text: string) {
  if (track.id === "neet_pg") return text;
  return text.replaceAll("NEET PG", track.name).replaceAll("PG Prep", `${track.brand.a} Prep`);
}
