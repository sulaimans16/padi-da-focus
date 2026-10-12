import type { Question } from "../questions";
import { physicsQuestions } from "./questions/physics";
import { chemistryQuestions } from "./questions/chemistry";
import { botanyQuestions } from "./questions/botany";
import { zoologyQuestions } from "./questions/zoology";

/**
 * Original NEET UG practice questions bundled with the app (NCERT Class 11–12).
 * They keep the track usable offline and before the cloud bank is filled.
 */
export const UG_SEED_QUESTIONS: Question[] = [
  ...physicsQuestions,
  ...chemistryQuestions,
  ...botanyQuestions,
  ...zoologyQuestions,
];
