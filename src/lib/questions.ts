export type Difficulty = "easy" | "med" | "hard";

export type Question = {
  id: string;
  subject: string;
  topic: string;
  stem: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  oneLiner: string;
  explanation: string;
  distractors: Record<string, string>;
  highYield: string;
  difficulty: Difficulty;
  isPyq: boolean;
  pyqYear?: number;
  repeatCount?: number;
  source?: string;
  imageUrl?: string;
  createdBy?: string;
};

/**
 * PLACEHOLDER CONTENT ONLY.
 * Real NEET PG content must be imported from a trusted source (see spec §15).
 */
export const SEED_QUESTIONS: Question[] = [
  {
    id: "q-med-1",
    subject: "Medicine",
    topic: "Cardiology",
    stem: "A 58-year-old man has crushing retrosternal chest pain for 40 minutes. ECG shows ST elevation in II, III and aVF with hypotension and raised JVP. Which is the single best next step?",
    options: [
      { id: "a", text: "IV fluid bolus" },
      { id: "b", text: "IV furosemide" },
      { id: "c", text: "IV nitroglycerin infusion" },
      { id: "d", text: "IV beta blocker" },
    ],
    correctOptionId: "a",
    oneLiner: "Inferior MI with RV involvement — preload dependent, so fluids first.",
    explanation:
      "ST elevation in II, III, aVF with hypotension, raised JVP and clear lungs suggests right ventricular infarction. RV failure is preload dependent, so cautious IV fluid loading restores cardiac output before revascularisation.",
    distractors: {
      b: "Furosemide drops preload further and worsens hypotension.",
      c: "Nitrates are contraindicated in RV infarct — they cause severe hypotension.",
      d: "Beta blockers reduce contractility and are withheld in cardiogenic shock.",
    },
    highYield: "Inferior MI + hypotension + clear lungs = RV infarct. Fluids yes, nitrates never.",
    difficulty: "med",
    isPyq: true,
    pyqYear: 2023,
    repeatCount: 3,
    source: "NEET PG 2023",
  },
  {
    id: "q-med-2",
    subject: "Medicine",
    topic: "Nephrology",
    stem: "Which urinary finding best distinguishes acute tubular necrosis from prerenal azotaemia?",
    options: [
      { id: "a", text: "Urine sodium < 20 mEq/L" },
      { id: "b", text: "FeNa > 2%" },
      { id: "c", text: "Urine osmolality > 500 mOsm/kg" },
      { id: "d", text: "BUN:creatinine ratio > 20:1" },
    ],
    correctOptionId: "b",
    oneLiner: "Damaged tubules cannot reabsorb sodium — FeNa > 2%.",
    explanation:
      "In ATN tubular injury impairs sodium reabsorption, giving FeNa > 2%, urine Na > 40 mEq/L and isotonic urine. Prerenal states retain sodium avidly (FeNa < 1%).",
    distractors: {
      a: "Low urine sodium indicates prerenal avid reabsorption.",
      c: "Concentrated urine implies intact tubules, i.e. prerenal.",
      d: "A high BUN:Cr ratio is classic for prerenal azotaemia.",
    },
    highYield: "FeNa <1% prerenal · >2% ATN. Muddy brown casts = ATN.",
    difficulty: "easy",
    isPyq: false,
  },
  {
    id: "q-pharm-1",
    subject: "Pharmacology",
    topic: "Autonomic drugs",
    stem: "Which antihypertensive is safest in pregnancy-induced hypertension with a heart rate of 110/min?",
    options: [
      { id: "a", text: "Enalapril" },
      { id: "b", text: "Labetalol" },
      { id: "c", text: "Sodium nitroprusside" },
      { id: "d", text: "Atenolol" },
    ],
    correctOptionId: "b",
    oneLiner: "Labetalol — first-line in pregnancy, also controls tachycardia.",
    explanation:
      "Labetalol (combined alpha-1 and non-selective beta blockade) is first-line for hypertension in pregnancy along with methyldopa and nifedipine, and its beta blockade also blunts maternal tachycardia.",
    distractors: {
      a: "ACE inhibitors are teratogenic — fetal renal dysgenesis and oligohydramnios.",
      c: "Nitroprusside risks fetal cyanide accumulation; reserved for refractory crises.",
      d: "Atenolol is linked to fetal growth restriction.",
    },
    highYield: "Pregnancy safe: labetalol, methyldopa, nifedipine, hydralazine. Avoid ACEI/ARB/atenolol.",
    difficulty: "easy",
    isPyq: true,
    pyqYear: 2022,
    repeatCount: 4,
    source: "NEET PG 2022",
  },
  {
    id: "q-obg-1",
    subject: "Obstetrics & Gynaecology",
    topic: "Obstetric haemorrhage",
    stem: "First-line uterotonic for atonic postpartum haemorrhage in a woman with uncontrolled asthma?",
    options: [
      { id: "a", text: "Carboprost" },
      { id: "b", text: "Methylergometrine" },
      { id: "c", text: "Oxytocin" },
      { id: "d", text: "Misoprostol only" },
    ],
    correctOptionId: "c",
    oneLiner: "Oxytocin — no bronchospasm, no hypertension risk.",
    explanation:
      "Oxytocin remains the first-line uterotonic for atonic PPH. Carboprost (PGF2-alpha) can precipitate severe bronchospasm in asthma, and ergometrine is avoided in hypertension and cardiac disease.",
    distractors: {
      a: "Carboprost is contraindicated in asthma.",
      b: "Ergot alkaloids are contraindicated in hypertension/pre-eclampsia and cardiac disease.",
      d: "Misoprostol is used when oxytocin is unavailable or as adjunct.",
    },
    highYield: "Asthma → avoid carboprost. Hypertension → avoid methylergometrine.",
    difficulty: "med",
    isPyq: true,
    pyqYear: 2021,
    repeatCount: 2,
    source: "NEET PG 2021",
  },
  {
    id: "q-path-1",
    subject: "Pathology",
    topic: "Neoplasia",
    stem: "Psammoma bodies are characteristically seen in which tumour?",
    options: [
      { id: "a", text: "Follicular carcinoma thyroid" },
      { id: "b", text: "Papillary carcinoma thyroid" },
      { id: "c", text: "Medullary carcinoma thyroid" },
      { id: "d", text: "Anaplastic carcinoma thyroid" },
    ],
    correctOptionId: "b",
    oneLiner: "Papillary carcinoma — Orphan Annie nuclei plus psammoma bodies.",
    explanation:
      "Papillary thyroid carcinoma shows papillae with fibrovascular cores, ground-glass 'Orphan Annie eye' nuclei, nuclear grooves and laminated calcific psammoma bodies. Spread is lymphatic with excellent prognosis.",
    distractors: {
      a: "Follicular carcinoma spreads haematogenously; diagnosis needs capsular invasion.",
      c: "Medullary carcinoma shows amyloid stroma and calcitonin positivity.",
      d: "Anaplastic carcinoma shows pleomorphic giant cells, dismal prognosis.",
    },
    highYield: "Psammoma bodies: papillary thyroid, meningioma, serous ovarian carcinoma, mesothelioma.",
    difficulty: "easy",
    isPyq: true,
    pyqYear: 2020,
    repeatCount: 5,
    source: "NEET PG 2020",
  },
  {
    id: "q-micro-1",
    subject: "Microbiology",
    topic: "Bacteriology",
    stem: "A culture on Thayer-Martin medium grows oxidase-positive gram-negative diplococci from a urethral swab. Most likely organism?",
    options: [
      { id: "a", text: "Neisseria gonorrhoeae" },
      { id: "b", text: "Haemophilus ducreyi" },
      { id: "c", text: "Chlamydia trachomatis" },
      { id: "d", text: "Treponema pallidum" },
    ],
    correctOptionId: "a",
    oneLiner: "Thayer-Martin + oxidase-positive GN diplococci = gonococcus.",
    explanation:
      "Modified Thayer-Martin (vancomycin, colistin, nystatin, trimethoprim) is selective for pathogenic Neisseria. Gonococcus ferments glucose only; meningococcus ferments glucose and maltose.",
    distractors: {
      b: "H. ducreyi needs chocolate agar with factor X; causes painful chancroid.",
      c: "Chlamydia is obligate intracellular and not culturable on this medium.",
      d: "T. pallidum cannot be cultured on artificial media.",
    },
    highYield: "Gonococcus: glucose only. Meningococcus: glucose + maltose (MG mnemonic).",
    difficulty: "easy",
    isPyq: false,
  },
  {
    id: "q-surg-1",
    subject: "Surgery",
    topic: "Acute abdomen",
    stem: "Which parameter is NOT part of Ranson's criteria for acute pancreatitis on admission?",
    options: [
      { id: "a", text: "Age > 55 years" },
      { id: "b", text: "Serum amylase level" },
      { id: "c", text: "Serum LDH > 350 IU/L" },
      { id: "d", text: "WBC > 16,000/mm³" },
    ],
    correctOptionId: "b",
    oneLiner: "Amylase level never predicts severity — it is not in Ranson's.",
    explanation:
      "On-admission Ranson criteria: Age >55, WBC >16000, glucose >200 mg/dL, LDH >350, AST >250. The absolute amylase or lipase value has no prognostic value.",
    distractors: {
      a: "Age >55 is an admission criterion.",
      c: "LDH >350 IU/L is an admission criterion.",
      d: "WBC >16000 is an admission criterion.",
    },
    highYield: "Admission Ranson: GA LAW — Glucose, Age, LDH, AST, WBC.",
    difficulty: "med",
    isPyq: true,
    pyqYear: 2023,
    repeatCount: 2,
    source: "NEET PG 2023",
  },
  {
    id: "q-peds-1",
    subject: "Pediatrics",
    topic: "Neonatology",
    stem: "A term neonate has bilious vomiting with a 'double bubble' sign and no distal gas. Most likely diagnosis?",
    options: [
      { id: "a", text: "Duodenal atresia" },
      { id: "b", text: "Hypertrophic pyloric stenosis" },
      { id: "c", text: "Jejunal atresia" },
      { id: "d", text: "Hirschsprung disease" },
    ],
    correctOptionId: "a",
    oneLiner: "Double bubble without distal gas = duodenal atresia.",
    explanation:
      "Duodenal atresia presents with bilious vomiting in the first day, a double bubble on X-ray and absent distal bowel gas; about 30% associate with Down syndrome and polyhydramnios is common antenatally.",
    distractors: {
      b: "Pyloric stenosis causes non-bilious projectile vomiting at 3-6 weeks.",
      c: "Jejunal atresia shows multiple dilated loops (triple bubble).",
      d: "Hirschsprung presents with delayed meconium and distension.",
    },
    highYield: "Duodenal atresia ↔ Down syndrome; bilious vomiting day 1.",
    difficulty: "easy",
    isPyq: true,
    pyqYear: 2024,
    repeatCount: 3,
    source: "NEET PG 2024",
  },
  {
    id: "q-psm-1",
    subject: "PSM",
    topic: "Epidemiology",
    stem: "In a screening test, increasing the cut-off value to declare disease will most likely?",
    options: [
      { id: "a", text: "Increase sensitivity" },
      { id: "b", text: "Increase specificity" },
      { id: "c", text: "Increase false positives" },
      { id: "d", text: "Not change predictive values" },
    ],
    correctOptionId: "b",
    oneLiner: "Higher cut-off = fewer positives = more specific, less sensitive.",
    explanation:
      "Raising the threshold reduces the number labelled positive, so false positives fall and specificity plus PPV rise, while sensitivity and NPV fall. This is the sensitivity-specificity trade-off shown on an ROC curve.",
    distractors: {
      a: "Sensitivity falls as the cut-off rises.",
      c: "False positives decrease.",
      d: "Predictive values shift with both cut-off and prevalence.",
    },
    highYield: "SnNout / SpPin. Prevalence up → PPV up, NPV down.",
    difficulty: "med",
    isPyq: false,
  },
  {
    id: "q-anat-1",
    subject: "Anatomy",
    topic: "Upper limb",
    stem: "Injury at the surgical neck of humerus most commonly damages which nerve?",
    options: [
      { id: "a", text: "Radial nerve" },
      { id: "b", text: "Axillary nerve" },
      { id: "c", text: "Median nerve" },
      { id: "d", text: "Musculocutaneous nerve" },
    ],
    correctOptionId: "b",
    oneLiner: "Surgical neck → axillary nerve → deltoid paralysis.",
    explanation:
      "The axillary nerve with the posterior circumflex humeral artery wraps around the surgical neck, so fractures there cause deltoid wasting, loss of abduction beyond 15 degrees and sensory loss over the regimental badge area.",
    distractors: {
      a: "Radial nerve accompanies mid-shaft (spiral groove) fractures.",
      c: "Median nerve is injured in supracondylar fractures.",
      d: "Musculocutaneous injury is uncommon and follows penetrating axillary trauma.",
    },
    highYield: "Surgical neck → axillary · Shaft → radial · Supracondylar → median.",
    difficulty: "easy",
    isPyq: true,
    pyqYear: 2021,
    repeatCount: 4,
    source: "NEET PG 2021",
  },
  {
    id: "q-oph-1",
    subject: "Ophthalmology",
    topic: "Glaucoma",
    stem: "Drug to avoid in a patient with acute angle-closure glaucoma and sulfa allergy?",
    options: [
      { id: "a", text: "Timolol" },
      { id: "b", text: "Pilocarpine" },
      { id: "c", text: "Acetazolamide" },
      { id: "d", text: "Mannitol" },
    ],
    correctOptionId: "c",
    oneLiner: "Acetazolamide is a sulfonamide derivative.",
    explanation:
      "Carbonic anhydrase inhibitors such as acetazolamide and dorzolamide are sulfonamide derivatives and are avoided in documented sulfa hypersensitivity; timolol, pilocarpine and osmotic mannitol remain usable.",
    distractors: {
      a: "Timolol is a beta blocker, avoid in asthma not sulfa allergy.",
      b: "Pilocarpine is a muscarinic agonist, safe here.",
      d: "Mannitol is an osmotic agent, safe here.",
    },
    highYield: "Sulfa-containing: acetazolamide, dorzolamide, furosemide, thiazides, celecoxib.",
    difficulty: "med",
    isPyq: false,
  },
  {
    id: "q-forensic-1",
    subject: "Forensic Medicine",
    topic: "Thanatology",
    stem: "Rigor mortis appears first in which muscle group?",
    options: [
      { id: "a", text: "Lower limb muscles" },
      { id: "b", text: "Eyelids and facial muscles" },
      { id: "c", text: "Muscles of the trunk" },
      { id: "d", text: "Upper limb muscles" },
    ],
    correctOptionId: "b",
    oneLiner: "Starts in involuntary/small muscles — eyelids first.",
    explanation:
      "Rigor mortis begins in the myocardium and small muscles of the eyelids and face, then progresses downward to neck, trunk and limbs, and disappears in the same order.",
    distractors: {
      a: "Lower limbs are affected late.",
      c: "Trunk follows the face and neck.",
      d: "Upper limbs precede lower limbs but follow the face.",
    },
    highYield: "Order of onset = order of disappearance (top-down).",
    difficulty: "easy",
    isPyq: true,
    pyqYear: 2022,
    repeatCount: 2,
    source: "NEET PG 2022",
  },
];

// ---------- local persistence (moves to Lovable Cloud later) ----------

const CUSTOM_KEY = "padida.questions.custom";
const BOOKMARK_KEY = "padida.bookmarks";
const ATTEMPT_KEY = "padida.attempts";

const isBrowser = () => typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const loadCustomQuestions = () => read<Question[]>(CUSTOM_KEY, []);

export function saveCustomQuestion(q: Question) {
  write(CUSTOM_KEY, [q, ...loadCustomQuestions()]);
}

export const loadBookmarks = () => read<string[]>(BOOKMARK_KEY, []);

export function toggleBookmark(id: string) {
  const list = loadBookmarks();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [id, ...list];
  write(BOOKMARK_KEY, next);
  return next;
}

export type Attempt = {
  questionId: string;
  subject: string;
  selectedOptionId: string;
  isCorrect: boolean;
  context: "question_bank" | "pyq";
  attemptedAt: number;
};

export const loadAttempts = () => read<Attempt[]>(ATTEMPT_KEY, []);

export function logAttempt(attempt: Attempt) {
  write(ATTEMPT_KEY, [attempt, ...loadAttempts()].slice(0, 2000));
}

export function allQuestions() {
  return [...loadCustomQuestions(), ...SEED_QUESTIONS];
}

export const SUBJECT_HUE: Record<string, number> = {
  Medicine: 25,
  Surgery: 5,
  "Obstetrics & Gynaecology": 330,
  Pediatrics: 300,
  Pharmacology: 265,
  Pathology: 230,
  Microbiology: 195,
  PSM: 165,
  Anatomy: 135,
  Physiology: 105,
  Biochemistry: 85,
  Radiology: 60,
  Anaesthesia: 45,
  Ophthalmology: 210,
  ENT: 180,
  Orthopaedics: 15,
  Psychiatry: 285,
  Dermatology: 345,
  "Forensic Medicine": 120,
};

export const subjectColor = (subject: string) =>
  `oklch(0.72 0.15 ${SUBJECT_HUE[subject] ?? 250})`;
