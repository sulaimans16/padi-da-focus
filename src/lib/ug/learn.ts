import type { LearnModule } from "../learn";
import { mechanics } from "./learn-modules/mechanics";
import { thermodynamics } from "./learn-modules/thermodynamics";
import { electricity } from "./learn-modules/electricity";
import { magnetism } from "./learn-modules/magnetism";
import { opticsModern } from "./learn-modules/optics-modern";
import { physicalChemistry } from "./learn-modules/physical-chemistry";
import { inorganicChemistry } from "./learn-modules/inorganic-chemistry";
import { organicChemistry } from "./learn-modules/organic-chemistry";
import { cellBiology } from "./learn-modules/cell-biology";
import { plantDiversity } from "./learn-modules/plant-diversity";
import { plantPhysiology } from "./learn-modules/plant-physiology";
import { geneticsEvolution } from "./learn-modules/genetics-evolution";
import { ecology } from "./learn-modules/ecology";
import { animalDiversity } from "./learn-modules/animal-diversity";
import { humanPhysiology } from "./learn-modules/human-physiology";
import { reproduction } from "./learn-modules/reproduction";
import { biotechnology } from "./learn-modules/biotechnology";

/**
 * NEET UG concept modules — NMC NEET UG syllabus (rationalised NCERT Class 11–12),
 * grouped Physics / Chemistry / Biology. Teaching-first, like the NEET PG modules:
 * why it's true, key points, formulae, a table or flow, traps, a worked example
 * and two quick checks.
 */
export const UG_LEARN_MODULES: LearnModule[] = [
  mechanics,
  thermodynamics,
  electricity,
  magnetism,
  opticsModern,
  physicalChemistry,
  inorganicChemistry,
  organicChemistry,
  cellBiology,
  plantDiversity,
  plantPhysiology,
  geneticsEvolution,
  ecology,
  animalDiversity,
  humanPhysiology,
  reproduction,
  biotechnology,
];
