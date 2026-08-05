/**
 * Concept modules for the Learn section.
 *
 * Every concept is written to teach, not just to revise: a mechanism paragraph
 * explaining *why* the fact is true, a comparison table, common exam traps, a
 * mnemonic where one genuinely helps, and a clinical vignette to self-test.
 *
 * Reference figures are real images hotlinked from Wikimedia Commons via
 * Special:FilePath (a stable, permanent redirect to the current thumbnail).
 * Every figure keeps its Commons file name so the UI can credit the source.
 */

export type Figure = {
  /** Wikimedia Commons file name, without the "File:" prefix. */
  file: string;
  caption: string;
  credit: string;
};

export type ConceptTable = {
  title: string;
  columns: string[];
  rows: string[][];
};

export type Vignette = {
  stem: string;
  answer: string;
  reasoning: string;
};

export type Concept = {
  id: string;
  title: string;
  minutes: number;
  /** One-line orientation: what this concept is about. */
  summary: string;
  /** The teaching paragraph — the mechanism behind the facts. */
  mechanism: string;
  points: string[];
  table?: ConceptTable;
  /** Where students reliably lose the mark. */
  pitfalls?: string[];
  mnemonic?: string;
  vignette?: Vignette;
  highYield: string;
  figure: Figure;
};

export type LearnModule = {
  slug: string;
  subject: string;
  icon: string;
  cover: Figure;
  blurb: string;
  /** What a learner should be able to do after the module. */
  objectives: string[];
  concepts: Concept[];
};

/** Rendered image URL for a Commons file. */
export function figureUrl(file: string, width = 900) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

/** Commons file description page — the attribution target. */
export function figureSource(file: string) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

export const LEARN_MODULES: LearnModule[] = [
  {
    slug: "anatomy",
    subject: "Anatomy",
    icon: "accessibility_new",
    blurb: "Brachial plexus, inguinal canal, cranial nerves and muscle mechanics — the diagrams NBE keeps returning to.",
    cover: {
      file: "Human skeleton front en.svg",
      caption: "Human skeleton, anterior view",
      credit: "Wikimedia Commons (public domain)",
    },
    objectives: [
      "Localise a peripheral nerve lesion from the motor and sensory deficit alone.",
      "Explain hernia types from the relationship to the inferior epigastric vessels.",
      "Map each cranial nerve to its exit foramen and the sign produced by its palsy.",
      "Relate sarcomere architecture to the length–tension behaviour of muscle.",
    ],
    concepts: [
      {
        id: "brachial-plexus",
        title: "Brachial plexus — roots to branches",
        minutes: 9,
        summary:
          "C5–T1 ventral rami form roots → trunks → divisions → cords → terminal branches. Lesion level predicts the deficit exactly.",
        mechanism:
          "The plexus exists because the upper limb bud drags spinal segments with it during development, then rotates. Fibres from several roots must be re-sorted so that one nerve can supply one functional muscle group rather than one embryonic segment. That re-sorting is what the trunks, divisions and cords accomplish: anterior divisions carry flexor-compartment fibres, posterior divisions carry extensor-compartment fibres. This is why the posterior cord — built purely from posterior divisions — supplies every extensor of the arm through the radial and axillary nerves, and why a posterior cord lesion never weakens flexion.",
        points: [
          "Erb's palsy (C5–C6, upper trunk): adducted, internally rotated, pronated arm — the 'waiter's tip'. Caused by shoulder depression: birth injury, motorcycle fall.",
          "Klumpke (C8–T1, lower trunk): claw hand from intrinsic hand muscle loss; may add Horner's syndrome because T1 carries the sympathetic outflow to the head.",
          "Posterior cord → axillary + radial. Lateral cord → musculocutaneous + lateral root of median. Medial cord → ulnar + medial root of median.",
          "Long thoracic nerve (C5–C7) is pre-trunk and supplies serratus anterior — injury gives a winged scapula, classically after axillary node dissection.",
          "Axillary nerve wraps the surgical neck of the humerus: fracture there gives deltoid weakness plus a numb 'regimental badge' patch.",
        ],
        table: {
          title: "Nerve lesion → deficit map",
          columns: ["Nerve", "Motor loss", "Sensory loss", "Classic cause"],
          rows: [
            ["Axillary", "Abduction 15–90°", "Regimental badge patch", "Surgical neck fracture"],
            ["Radial", "Wrist and finger extension (wrist drop)", "First dorsal web space", "Midshaft humerus / 'Saturday night'"],
            ["Median", "Thumb opposition, LOAF muscles", "Lateral 3½ digits, palmar", "Carpal tunnel, supracondylar fracture"],
            ["Ulnar", "Interossei, adductor pollicis (claw)", "Medial 1½ digits", "Medial epicondyle, Guyon's canal"],
            ["Musculocutaneous", "Elbow flexion and supination", "Lateral forearm", "Direct axillary trauma"],
          ],
        },
        pitfalls: [
          "Ulnar claw is *worse* with a distal (wrist) lesion — the intact flexor digitorum profundus still flexes the fingers. This is the ulnar paradox.",
          "A supracondylar fracture threatens the median nerve and brachial artery; a midshaft fracture threatens the radial nerve. Don't swap them.",
        ],
        mnemonic: "Randy Travis Drinks Cold Beer — Roots, Trunks, Divisions, Cords, Branches.",
        vignette: {
          stem: "A 34-year-old falls from a motorbike and lands on his shoulder. His right arm hangs adducted and internally rotated with the forearm pronated. Sensation is reduced over the lateral arm; hand grip is normal.",
          answer: "Upper trunk (C5–C6) injury — Erb's palsy.",
          reasoning:
            "Normal grip excludes C8–T1. The posture reflects unopposed adductors and internal rotators after loss of deltoid, supraspinatus, infraspinatus and biceps — all C5–C6.",
        },
        highYield:
          "Winged scapula with medial border lift = long thoracic nerve. Add Horner's and the lesion is lower trunk / T1.",
        figure: {
          file: "Brachial plexus 2-2.png",
          caption: "Brachial plexus: roots, trunks, divisions, cords and terminal branches",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "inguinal-canal",
        title: "Inguinal canal and hernia anatomy",
        minutes: 7,
        summary:
          "A 4 cm oblique passage with four walls. Hesselbach's triangle — inguinal ligament, rectus sheath, inferior epigastric vessels — defines direct hernias.",
        mechanism:
          "The canal is the scar of testicular descent: the processus vaginalis pulls a sleeve of each abdominal wall layer down with it, which is why the spermatic coverings mirror the wall layer for layer. If that processus fails to obliterate, bowel follows the same congenital track through the deep ring — lateral to the inferior epigastric vessels. A direct hernia has no such track; it is a late-life failure of the posterior wall, pushing straight through the weak transversalis fascia of Hesselbach's triangle, medial to those vessels. The vessel relationship is therefore not arbitrary trivia — it is the embryology.",
        points: [
          "Indirect hernia: lateral to the inferior epigastric artery, through the deep ring, congenital, may reach the scrotum.",
          "Direct hernia: medial to the inferior epigastric artery, through Hesselbach's triangle, acquired, rarely enters the scrotum.",
          "Anterior wall: external oblique aponeurosis. Posterior wall: transversalis fascia + conjoint tendon. Roof: arching internal oblique and transversus. Floor: inguinal ligament.",
          "Femoral hernia passes *below* the inguinal ligament, lateral to the pubic tubercle — commoner in women and far likelier to strangulate.",
          "Contents in the male: spermatic cord (plus ilioinguinal nerve, which runs through the canal but is not in the cord).",
        ],
        table: {
          title: "Groin hernia differentiation",
          columns: ["Feature", "Indirect", "Direct", "Femoral"],
          rows: [
            ["Relation to epigastric vessels", "Lateral", "Medial", "Below inguinal ligament"],
            ["Relation to pubic tubercle", "Above and medial", "Above and medial", "Below and lateral"],
            ["Age", "Any, often young", "Older", "Older women"],
            ["Strangulation risk", "Moderate", "Low", "High"],
          ],
        },
        pitfalls: [
          "The deep ring occlusion test is unreliable in exams and in clinic — decide on the vessel relationship at operation.",
          "'Above and medial to the pubic tubercle' distinguishes inguinal from femoral, not direct from indirect.",
        ],
        vignette: {
          stem: "A 68-year-old woman presents with a tender irreducible lump in the groin, vomiting, and absolute constipation. The lump lies below and lateral to the pubic tubercle.",
          answer: "Strangulated femoral hernia — needs urgent surgery.",
          reasoning:
            "The position below and lateral to the tubercle is femoral. The narrow, rigid femoral ring explains why obstruction and strangulation dominate the presentation.",
        },
        highYield:
          "Lateral to the inferior epigastric vessels = indirect. Medial = direct. Nothing else decides it.",
        figure: {
          file: "Inguinal Region Interior View.jpg",
          caption: "Inguinal region, interior view — rings, vessels and Hesselbach's triangle",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "cranial-nerves",
        title: "Cranial nerves — foramina, function and palsy signs",
        minutes: 8,
        summary:
          "Twelve nerves, each with an exit foramen and a single unmistakable bedside sign when it fails.",
        mechanism:
          "Cranial nerve questions are really questions about skull base topography. Nerves that share a foramen fail together, so the *combination* of deficits localises the lesion better than any single one. The superior orbital fissure carries III, IV, V1 and VI, so a cavernous sinus lesion produces a complete ophthalmoplegia with facial numbness but a normal optic nerve. The jugular foramen carries IX, X and XI, so a skull base tumour there gives dysphagia, hoarseness and trapezius weakness together. Learn the groupings and the individual facts follow.",
        points: [
          "CN III palsy: down-and-out eye, ptosis, dilated pupil. Pupil involvement suggests compression (posterior communicating aneurysm); pupil sparing suggests ischaemia (diabetes).",
          "CN IV (superior oblique) palsy: vertical diplopia worse on looking down and inward — patients tilt the head away from the lesion.",
          "CN VII: an upper motor neuron lesion spares the forehead (bilateral cortical input); a lower motor neuron lesion (Bell's palsy) does not.",
          "CN X palsy: the uvula deviates *away* from the lesion; CN XII palsy: the tongue deviates *towards* the lesion.",
          "CN V motor supplies the muscles of mastication; the jaw deviates towards the weak side.",
        ],
        table: {
          title: "Exit foramina worth knowing",
          columns: ["Foramen", "Nerves"],
          rows: [
            ["Cribriform plate", "I (olfactory)"],
            ["Optic canal", "II + ophthalmic artery"],
            ["Superior orbital fissure", "III, IV, V1, VI"],
            ["Foramen rotundum", "V2"],
            ["Foramen ovale", "V3"],
            ["Internal acoustic meatus", "VII, VIII"],
            ["Jugular foramen", "IX, X, XI"],
            ["Hypoglossal canal", "XII"],
          ],
        },
        pitfalls: [
          "A 'pupil-sparing' third nerve palsy is not benign in a young patient — image it.",
          "Forehead sparing points to a stroke, not Bell's palsy; missing this delays thrombolysis.",
        ],
        mnemonic: "Standing Room Only — Superior orbital fissure, foramen Rotundum, foramen Ovale for V1, V2, V3.",
        vignette: {
          stem: "A 58-year-old diabetic develops sudden ptosis with the right eye deviated down and out. The pupil is 3 mm and reactive.",
          answer: "Ischaemic (microvascular) third nerve palsy.",
          reasoning:
            "Parasympathetic pupillomotor fibres run superficially and are supplied by pial vessels, so they survive small-vessel ischaemia but are crushed first by an aneurysm. A reactive pupil favours ischaemia.",
        },
        highYield:
          "Pupil-involving CN III palsy = compressive until proven otherwise — think posterior communicating artery aneurysm.",
        figure: {
          file: "Brain human normal inferior view with labels en.svg",
          caption: "Inferior surface of the brain with cranial nerve origins labelled",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "sarcomere",
        title: "Sarcomere architecture and the length–tension curve",
        minutes: 6,
        summary:
          "Bands, zones and cross-bridges — the structural basis of why a stretched muscle can be a weak muscle.",
        mechanism:
          "Force is produced by myosin heads binding actin, so tension is proportional to the number of cross-bridges that can form. At optimal sarcomere length (~2.2 µm) every myosin head overlaps thin filament. Stretch further and the filaments slide apart, overlap falls and so does force. Shorten too far and thin filaments collide in the middle while thick filaments hit the Z-line, again reducing force. During contraction the A band (thick filament length) never changes; the I band and H zone shrink. That single fact answers most sarcomere questions.",
        points: [
          "A band = thick filament length, constant. I band = thin filament only. H zone = thick filament only. Z-line anchors actin; M-line anchors myosin.",
          "On contraction the I band and H zone narrow; the A band is unchanged.",
          "Calcium binds troponin C → tropomyosin shifts → myosin binding sites exposed (steric blocking model).",
          "Rigor mortis: no ATP means myosin cannot detach from actin, so muscle stays locked.",
          "Cardiac muscle operates on the ascending limb of the curve — this is the cellular basis of the Frank–Starling relationship.",
        ],
        pitfalls: [
          "ATP is required for *detachment*, not attachment — the classic reversed statement.",
          "The A band shortening is a distractor in almost every version of this question.",
        ],
        vignette: {
          stem: "A researcher stretches an isolated skeletal muscle fibre well beyond its resting length and stimulates it. Active tension falls sharply.",
          answer: "Reduced thick–thin filament overlap.",
          reasoning: "Fewer cross-bridges can form, and active tension tracks cross-bridge number almost linearly.",
        },
        highYield: "During contraction the A band stays the same width — only the I band and H zone shrink.",
        figure: {
          file: "Sarcomere.svg",
          caption: "Sarcomere showing A band, I band, H zone, Z-line and M-line",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "physiology",
    subject: "Physiology",
    icon: "monitor_heart",
    blurb: "Cardiac cycle, pressure–volume loops, acid–base, nephron transport and action potentials — number-driven concepts with easy marks.",
    cover: {
      file: "Wiggers Diagram 2.svg",
      caption: "Wiggers diagram of the cardiac cycle",
      credit: "Wikimedia Commons",
    },
    objectives: [
      "Predict how preload, afterload and contractility deform the PV loop.",
      "Work through any arterial blood gas in four ordered steps.",
      "Localise a diuretic's action and predict its electrolyte side effects.",
      "Explain each phase of the cardiac and neuronal action potential by ion current.",
    ],
    concepts: [
      {
        id: "pv-loop",
        title: "Pressure–volume loop of the left ventricle",
        minutes: 8,
        summary:
          "Four phases: isovolumetric contraction, ejection, isovolumetric relaxation, filling. Loop width = stroke volume; loop area = stroke work.",
        mechanism:
          "The loop is simply pressure plotted against volume through one beat, bounded by two physiological limits. The end-systolic pressure–volume relationship (ESPVR) is the maximum pressure the ventricle can generate at any volume — its slope *is* contractility, independent of load. The end-diastolic pressure–volume relationship (EDPVR) is passive ventricular compliance. Every haemodynamic intervention moves the loop between these two curves: preload shifts the right-hand corner, afterload shifts where ejection begins, and inotropes rotate the ESPVR itself. Reading a loop is therefore reading which of those three was changed.",
        points: [
          "Increased preload → loop widens rightward, stroke volume rises (Frank–Starling), end-systolic volume barely changes.",
          "Increased afterload → ejection starts at a higher pressure, stroke volume falls, end-systolic volume rises.",
          "Increased contractility → steeper ESPVR, smaller end-systolic volume, larger stroke volume at the same preload.",
          "Aortic stenosis: tall, narrow loop with a high systolic pressure. Aortic regurgitation: wide loop with no true isovolumetric relaxation.",
          "Mitral regurgitation loses the isovolumetric contraction phase — blood escapes backwards as soon as pressure rises.",
        ],
        table: {
          title: "Valve lesion → loop signature",
          columns: ["Lesion", "Loop change", "Missing phase"],
          rows: [
            ["Aortic stenosis", "Tall and narrow, high peak pressure", "None"],
            ["Aortic regurgitation", "Wide, shifted right", "Isovolumetric relaxation"],
            ["Mitral regurgitation", "Wide, low end-systolic volume", "Isovolumetric contraction"],
            ["Mitral stenosis", "Small loop, low preload", "None"],
          ],
        },
        pitfalls: [
          "Ejection fraction looks deceptively normal in mitral regurgitation because the ventricle unloads into the low-pressure atrium.",
          "Contractility cannot be judged from stroke volume alone — only the ESPVR slope is load-independent.",
        ],
        vignette: {
          stem: "A patient's PV loop shows no isovolumetric contraction segment and a markedly increased loop width with reduced end-systolic volume.",
          answer: "Mitral regurgitation.",
          reasoning:
            "The incompetent mitral valve allows immediate volume loss into the atrium the moment tension rises, so volume falls before the aortic valve opens.",
        },
        highYield: "Loss of the isovolumetric contraction segment on the PV loop = mitral regurgitation.",
        figure: {
          file: "PV loop example of left ventricle.svg",
          caption: "Left ventricular pressure–volume loop with its four phases",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "acid-base",
        title: "Acid–base: a disciplined 4-step read",
        minutes: 7,
        summary:
          "Read pH → primary disorder, then the compensating variable, then compute expected compensation, then check the anion gap.",
        mechanism:
          "The body defends pH with three lines: chemical buffers in seconds, respiratory compensation in minutes, and renal compensation in days. Compensation never fully corrects pH — if it appears to, there are two disorders. This is why the ordered steps matter more than pattern recognition: a normal pCO₂ in a patient with severe metabolic acidosis is *not* reassuring, it means a failing respiratory drive superimposed on the acidosis. Computing expected compensation converts a vague gas into a precise diagnosis.",
        points: [
          "Winter's formula: expected pCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 in metabolic acidosis.",
          "Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻), normally 8–12 mEq/L; correct upward by 2.5 for every 1 g/dL fall in albumin.",
          "High anion gap causes: MUDPILES — methanol, uraemia, DKA, propylene glycol, isoniazid, lactate, ethylene glycol, salicylates.",
          "Normal gap (hyperchloraemic) acidosis: diarrhoea, renal tubular acidosis, saline overload, acetazolamide.",
          "Delta ratio > 2 suggests a coexisting metabolic alkalosis; < 1 suggests a coexisting normal gap acidosis.",
        ],
        table: {
          title: "Expected compensation rules",
          columns: ["Primary disorder", "Expected compensation"],
          rows: [
            ["Metabolic acidosis", "pCO₂ = 1.5 × HCO₃⁻ + 8 ± 2"],
            ["Metabolic alkalosis", "pCO₂ rises 0.7 mmHg per 1 mEq/L rise in HCO₃⁻"],
            ["Acute respiratory acidosis", "HCO₃⁻ rises 1 per 10 mmHg rise in pCO₂"],
            ["Chronic respiratory acidosis", "HCO₃⁻ rises 3.5 per 10 mmHg rise in pCO₂"],
            ["Acute respiratory alkalosis", "HCO₃⁻ falls 2 per 10 mmHg fall in pCO₂"],
          ],
        },
        pitfalls: [
          "Salicylate poisoning classically gives a *mixed* respiratory alkalosis and high-gap metabolic acidosis — a near-normal pH hides both.",
          "Never call compensation 'overcorrection': the body does not overshoot, so a pH on the wrong side means a second primary disorder.",
        ],
        vignette: {
          stem: "pH 7.32, pCO₂ 30 mmHg, HCO₃⁻ 15 mEq/L, Na⁺ 140, Cl⁻ 100.",
          answer: "High anion gap metabolic acidosis with appropriate respiratory compensation.",
          reasoning:
            "Gap = 140 − (100 + 15) = 25, clearly raised. Winter's predicts pCO₂ = 1.5 × 15 + 8 = 30.5 ± 2 — the measured 30 fits, so there is no added respiratory disorder.",
        },
        highYield: "Measured pCO₂ above the Winter's estimate means an added respiratory acidosis.",
        figure: {
          file: "Davenport Fig 6.jpg",
          caption: "Davenport diagram — bicarbonate against pH with pCO₂ isobars",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "nephron",
        title: "Nephron transport and where each diuretic acts",
        minutes: 8,
        summary:
          "Segment by segment: what is reabsorbed, by which transporter, and which drug blocks it.",
        mechanism:
          "Every nephron segment is defined by one dominant apical transporter, all ultimately powered by the basolateral Na⁺/K⁺-ATPase that keeps intracellular sodium low. Blocking a transporter delivers more sodium downstream, and the *consequences* of a diuretic follow from what the downstream segment does with that sodium. Loop diuretics abolish the medullary concentration gradient, so urine cannot be concentrated. Anything that raises distal sodium delivery increases sodium-for-potassium exchange in the collecting duct — which is exactly why loop and thiazide diuretics both cause hypokalaemia and metabolic alkalosis.",
        points: [
          "Proximal tubule: 65% of Na⁺ and nearly all glucose, amino acids and bicarbonate. Acetazolamide blocks carbonic anhydrase here.",
          "Thick ascending limb: NKCC2 cotransporter, impermeable to water — the diluting segment. Furosemide blocks NKCC2.",
          "Distal convoluted tubule: NCC cotransporter; thiazides block it and *increase* calcium reabsorption.",
          "Collecting duct: ENaC channels under aldosterone; amiloride blocks ENaC, spironolactone blocks the receptor — both spare potassium.",
          "ADH inserts aquaporin-2 into the collecting duct apical membrane; without it, dilute urine pours out.",
        ],
        table: {
          title: "Diuretic effects at a glance",
          columns: ["Drug class", "Site", "Calcium", "Key adverse effect"],
          rows: [
            ["Acetazolamide", "Proximal tubule", "—", "Normal gap metabolic acidosis"],
            ["Loop (furosemide)", "Thick ascending limb", "Excretion ↑", "Ototoxicity, hypokalaemia"],
            ["Thiazide", "Distal convoluted tubule", "Excretion ↓", "Hyponatraemia, hyperglycaemia, hyperuricaemia"],
            ["Spironolactone", "Collecting duct", "—", "Hyperkalaemia, gynaecomastia"],
          ],
        },
        pitfalls: [
          "Loops waste calcium, thiazides retain it — thiazides are therefore used in recurrent calcium stones.",
          "Hypokalaemia makes metabolic alkalosis resistant to treatment; replace potassium before chasing the bicarbonate.",
        ],
        mnemonic: "Thiazides Take calcium in; Loops Lose it.",
        vignette: {
          stem: "A woman on long-term therapy for hypertension develops recurrent calcium oxalate stones. Her physician switches her diuretic and stone formation stops.",
          answer: "She was switched to a thiazide.",
          reasoning: "Thiazides enhance distal calcium reabsorption, lowering urinary calcium and reducing stone formation.",
        },
        highYield: "Thiazides cause hypercalcaemia and hypocalciuria; loop diuretics do the opposite.",
        figure: {
          file: "Physiology of Nephron.png",
          caption: "Nephron segments with their reabsorption and secretion profiles",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "action-potential",
        title: "Action potentials — nerve versus cardiac muscle",
        minutes: 7,
        summary:
          "Same principle, different ion choreography — and the differences explain arrhythmia drugs.",
        mechanism:
          "An action potential is a positive-feedback opening of voltage-gated sodium channels, terminated by their own inactivation gate and by delayed potassium efflux. Cardiac ventricular myocytes add a plateau: L-type calcium channels stay open long enough to balance potassium efflux, producing phase 2. That plateau is what makes the cardiac refractory period long enough to prevent tetany — a heart that could tetanise could not pump. Pacemaker cells lack a stable resting potential entirely; the funny current (I_f) drags them slowly to threshold, and calcium rather than sodium generates their upstroke.",
        points: [
          "Ventricular myocyte: phase 0 Na⁺ in, phase 1 transient K⁺ out, phase 2 Ca²⁺ in balancing K⁺ out, phase 3 K⁺ out, phase 4 resting.",
          "Pacemaker (SA node): phase 4 funny current depolarisation, phase 0 by L-type calcium, phase 3 potassium efflux. No phase 1 or 2.",
          "Absolute refractory period exists because sodium channels need repolarisation to reset their inactivation gate.",
          "Class I antiarrhythmics block sodium channels (phase 0); class III block potassium channels and prolong repolarisation and QT.",
          "Hyperkalaemia raises resting membrane potential, inactivating sodium channels — peaked T waves then a sine wave pattern.",
        ],
        pitfalls: [
          "Phase 2 is not 'no current' — it is a near-perfect balance of inward calcium and outward potassium.",
          "Beta blockers slow the heart by reducing the funny current slope, not by blocking calcium channels.",
        ],
        vignette: {
          stem: "A patient on an antiarrhythmic develops a prolonged QT interval and torsades de pointes.",
          answer: "A class III (potassium channel blocking) agent such as sotalol or amiodarone.",
          reasoning: "Blocking repolarising potassium current lengthens phase 3, prolonging QT and permitting early afterdepolarisations.",
        },
        highYield: "The cardiac plateau (phase 2) is L-type calcium influx — blocking it is how verapamil slows AV conduction.",
        figure: {
          file: "Action potential.svg",
          caption: "Neuronal action potential with depolarisation, repolarisation and hyperpolarisation",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "biochemistry",
    subject: "Biochemistry",
    icon: "science",
    blurb: "Rate-limiting enzymes, vitamin deficiencies, urea cycle and molecular techniques — pure recall points, taught with the logic behind them.",
    cover: {
      file: "Citric acid cycle with aconitate 2.svg",
      caption: "Citric acid (Krebs) cycle",
      credit: "Wikimedia Commons",
    },
    objectives: [
      "Name the committed step of each major pathway and its physiological regulator.",
      "Match a vitamin deficiency to its enzyme defect and clinical syndrome.",
      "Explain hyperammonaemia from the position of the urea cycle block.",
      "Choose the right molecular technique for a given diagnostic question.",
    ],
    concepts: [
      {
        id: "rate-limiting",
        title: "Rate-limiting enzymes and metabolic control",
        minutes: 6,
        summary: "Most metabolism questions reduce to naming the committed step and its regulator.",
        mechanism:
          "A pathway is controlled at the first irreversible step, because regulating anything later would waste intermediates already committed. That step is almost always allosterically sensitive to the pathway's end product or to the cell's energy charge. Phosphofructokinase-1 is the textbook case: ATP inhibits it (energy is plentiful), AMP activates it (energy is scarce), and fructose-2,6-bisphosphate overrides both to link glycolysis to insulin signalling. Once you know the regulator, you can predict the direction of flux in any hormonal state without memorising a table.",
        points: [
          "Glycolysis: phosphofructokinase-1, activated by fructose-2,6-bisphosphate and AMP, inhibited by ATP and citrate.",
          "Gluconeogenesis: fructose-1,6-bisphosphatase, activated by ATP, inhibited by F-2,6-BP and AMP.",
          "TCA cycle: isocitrate dehydrogenase, activated by ADP and calcium.",
          "Cholesterol synthesis: HMG-CoA reductase — the statin target, and the most regulated enzyme in the body.",
          "Heme synthesis: ALA synthase (mitochondrial, B6-dependent), inhibited by heme itself.",
          "Urea cycle: carbamoyl phosphate synthetase I, requires N-acetylglutamate as an obligate activator.",
          "Fatty acid synthesis: acetyl-CoA carboxylase (citrate activates, palmitoyl-CoA inhibits).",
        ],
        table: {
          title: "Fed versus fasting state",
          columns: ["State", "Dominant hormone", "Pathways on", "Pathways off"],
          rows: [
            ["Fed", "Insulin", "Glycolysis, glycogenesis, lipogenesis", "Gluconeogenesis, lipolysis"],
            ["Fasting", "Glucagon", "Glycogenolysis, gluconeogenesis, lipolysis", "Glycolysis, lipogenesis"],
            ["Starvation", "Glucagon + cortisol", "Ketogenesis, proteolysis", "Glycogenolysis (stores gone)"],
          ],
        },
        pitfalls: [
          "Fructose-2,6-bisphosphate is not an intermediate of glycolysis — it is purely a regulator.",
          "Hexokinase is inhibited by its product; glucokinase (liver) is not and has a high Km, so the liver only takes up glucose when it is abundant.",
        ],
        vignette: {
          stem: "A child presents with microcytic anaemia and basophilic stippling. Blood lead is elevated.",
          answer: "Inhibition of ALA dehydratase and ferrochelatase.",
          reasoning: "Both are lead-sensitive heme synthesis enzymes; ribosomal RNA degradation failure produces the basophilic stippling.",
        },
        highYield: "Lead inhibits ALA dehydratase and ferrochelatase → basophilic stippling on the smear.",
        figure: {
          file: "Glycolysis skeletal diagram.png",
          caption: "Glycolysis, with PFK-1 as the committed step",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "vitamins",
        title: "Water-soluble vitamin deficiencies",
        minutes: 7,
        summary: "Each B vitamin has one classic syndrome and one enzyme link.",
        mechanism:
          "B vitamins are coenzymes, so a deficiency is really an enzyme failure and the symptoms map onto the tissues most dependent on that enzyme. Thiamine is the cofactor for pyruvate dehydrogenase and transketolase, so the brain — an obligate glucose oxidiser — fails first, producing Wernicke's encephalopathy. B12 is needed for methylmalonyl-CoA mutase as well as methionine synthase; the mutase step is what folate cannot replace, and accumulated methylmalonyl-CoA disrupts myelin. That single extra reaction explains the entire neurological distinction between B12 and folate deficiency.",
        points: [
          "B1 thiamine → Wernicke–Korsakoff, wet and dry beriberi. Give thiamine *before* glucose in a suspected alcoholic.",
          "B2 riboflavin → angular cheilitis, corneal vascularisation. B3 niacin → pellagra: dermatitis, diarrhoea, dementia.",
          "B6 pyridoxine → sideroblastic anaemia, isoniazid-induced peripheral neuropathy, seizures in infants.",
          "B9 folate → megaloblastic anaemia without neurological signs; deficiency in pregnancy causes neural tube defects.",
          "B12 → megaloblastic anaemia with subacute combined degeneration of the dorsal columns and corticospinal tracts.",
          "Vitamin C → scurvy: defective collagen hydroxylation, perifollicular haemorrhage, poor wound healing.",
        ],
        table: {
          title: "B12 versus folate deficiency",
          columns: ["Feature", "B12", "Folate"],
          rows: [
            ["Anaemia", "Megaloblastic", "Megaloblastic"],
            ["Neurological signs", "Yes (SCD of cord)", "No"],
            ["Methylmalonic acid", "Raised", "Normal"],
            ["Homocysteine", "Raised", "Raised"],
            ["Onset after depletion", "Years", "Months"],
          ],
        },
        pitfalls: [
          "Giving folate alone in B12 deficiency corrects the anaemia while the neurological damage progresses — always check B12 first.",
          "Hartnup disease and carcinoid syndrome cause pellagra through tryptophan diversion, not dietary niacin lack.",
        ],
        mnemonic: "Pellagra's 4 Ds: Dermatitis, Diarrhoea, Dementia, Death.",
        vignette: {
          stem: "A vegan patient has a macrocytic anaemia, absent ankle reflexes and impaired vibration sense. Serum methylmalonic acid is elevated.",
          answer: "Vitamin B12 deficiency.",
          reasoning: "Raised methylmalonic acid is specific to B12, because folate cannot substitute in the methylmalonyl-CoA mutase reaction.",
        },
        highYield: "Neurological signs and a raised methylmalonic acid separate B12 from folate deficiency.",
        figure: {
          file: "Pellagra NIH.jpg",
          caption: "Pellagra — photosensitive dermatitis of niacin deficiency",
          credit: "NIH via Wikimedia Commons",
        },
      },
      {
        id: "urea-cycle",
        title: "Urea cycle and the hyperammonaemias",
        minutes: 7,
        summary:
          "Six enzymes converting toxic ammonia to urea — and the metabolite that tells you exactly where the block is.",
        mechanism:
          "Ammonia from amino acid catabolism is toxic to the brain because it depletes α-ketoglutarate in astrocytes, stalling the TCA cycle and driving glutamine accumulation and cerebral oedema. The urea cycle detoxifies it across two compartments: the first two steps are mitochondrial, the rest cytosolic. A block causes ammonia to back up, and the substrate immediately before the block accumulates. Orotic aciduria is the fingerprint of OTC deficiency, because excess carbamoyl phosphate spills out of the mitochondrion into pyrimidine synthesis.",
        points: [
          "Rate-limiting step: carbamoyl phosphate synthetase I, obligately activated by N-acetylglutamate.",
          "Ornithine transcarbamylase (OTC) deficiency is X-linked and the commonest urea cycle defect.",
          "OTC deficiency = hyperammonaemia + high orotic acid + *normal* BUN, with no megaloblastic anaemia.",
          "Orotic aciduria (UMP synthase deficiency) also gives orotic acid but *with* megaloblastic anaemia and *normal* ammonia.",
          "Treatment: protein restriction, lactulose and rifaximin in liver disease, sodium benzoate/phenylbutyrate to divert nitrogen.",
        ],
        table: {
          title: "Two causes of orotic aciduria",
          columns: ["Feature", "OTC deficiency", "Hereditary orotic aciduria"],
          rows: [
            ["Ammonia", "High", "Normal"],
            ["Megaloblastic anaemia", "Absent", "Present"],
            ["Inheritance", "X-linked", "Autosomal recessive"],
            ["Treatment", "Nitrogen scavengers", "Uridine supplementation"],
          ],
        },
        pitfalls: [
          "A neonate with hyperammonaemia and *respiratory alkalosis* has a urea cycle defect, not an organic acidaemia (which causes acidosis).",
          "Valproate can precipitate hyperammonaemia by depleting carnitine and inhibiting CPS I.",
        ],
        vignette: {
          stem: "A male neonate becomes lethargic and tachypnoeic on day 3. Ammonia is 600 µmol/L, urinary orotic acid is high, and there is no anaemia.",
          answer: "Ornithine transcarbamylase deficiency.",
          reasoning: "Carbamoyl phosphate accumulates and diverts into pyrimidine synthesis; the absence of anaemia excludes UMP synthase deficiency.",
        },
        highYield: "Hyperammonaemia + orotic aciduria + no anaemia = OTC deficiency (X-linked).",
        figure: {
          file: "Urea cycle.svg",
          caption: "The urea cycle across mitochondrial and cytosolic compartments",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "molecular-techniques",
        title: "Choosing the right molecular technique",
        minutes: 6,
        summary: "Blots, PCR, FISH, ELISA — each answers exactly one kind of question.",
        mechanism:
          "Technique questions are decided by the analyte and the resolution needed. Blots separate by size and probe by complementarity: Southern for DNA, Northern for RNA, Western for protein via antibody. PCR amplifies a known sequence, so it is the tool when you already know what you are looking for and need sensitivity. FISH visualises the location of a sequence within an intact nucleus, so it detects translocations and microdeletions that PCR would miss. ELISA quantifies protein using antibody-linked enzymes and is the diagnostic workhorse for serology.",
        points: [
          "Southern = DNA, Northern = RNA, Western = protein (SNoW DRoP).",
          "PCR needs known flanking sequence for primers; RT-PCR starts from RNA using reverse transcriptase.",
          "FISH detects deletions, duplications and translocations at the chromosomal level — used for 22q11, HER2 amplification.",
          "ELISA: sandwich format for antigen detection, indirect format for antibody detection (HIV screening).",
          "Karyotype detects changes above ~5 Mb; microarray detects smaller copy number variants but not balanced translocations.",
        ],
        table: {
          title: "Technique selection",
          columns: ["Question", "Best technique"],
          rows: [
            ["Is this specific mutation present?", "PCR / sequencing"],
            ["Is this gene amplified in tumour tissue?", "FISH"],
            ["Is this protein expressed?", "Western blot"],
            ["Does the patient have antibodies to X?", "Indirect ELISA"],
            ["Is there a balanced translocation?", "Karyotype or FISH"],
          ],
        },
        pitfalls: [
          "Microarray cannot detect balanced translocations — there is no copy number change to see.",
          "A positive ELISA is a screening result; confirm with a more specific assay before counselling.",
        ],
        mnemonic: "SNoW DRoP — Southern/Northern/Western for DNA/RNA/Protein.",
        highYield: "Balanced translocation suspected? Karyotype or FISH — never microarray.",
        figure: {
          file: "Complete neuron cell diagram en.svg",
          caption: "Cellular detail of the kind resolved by molecular and imaging techniques",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "pharmacology",
    subject: "Pharmacology",
    icon: "medication",
    blurb: "Receptor signalling, pharmacokinetics, antidotes and antimicrobial mechanisms — with the reasoning behind the drug-of-choice tables.",
    cover: {
      file: "GPCR mechanism.png",
      caption: "G-protein coupled receptor signalling",
      credit: "Wikimedia Commons",
    },
    objectives: [
      "Predict a drug's cardiovascular effect from its receptor and G-protein.",
      "Interpret dose–response curves for potency, efficacy and antagonist type.",
      "Apply first-order kinetics to loading dose, half-life and steady state.",
      "Match an antimicrobial to its target and its resistance mechanism.",
    ],
    concepts: [
      {
        id: "receptors",
        title: "Autonomic receptors and their second messengers",
        minutes: 7,
        summary: "These questions collapse into knowing which G-protein is coupled where.",
        mechanism:
          "There are only three G-protein outcomes to learn. Gs raises cyclic AMP, Gi lowers it, and Gq raises IP₃ and diacylglycerol, releasing intracellular calcium. The tissue then decides what that second messenger does: rising cAMP is stimulatory in the heart (β1) but relaxing in bronchial smooth muscle (β2), because smooth muscle protein kinase A phosphorylates and inactivates myosin light chain kinase. So the same messenger produces opposite mechanical effects in different tissues — which is precisely the trick most exam questions exploit.",
        points: [
          "α1 → Gq → IP₃/DAG → vasoconstriction, mydriasis, bladder sphincter contraction.",
          "α2 → Gi → ↓cAMP → presynaptic inhibition, central sympatholysis (clonidine, dexmedetomidine).",
          "β1 → Gs → ↑cAMP → heart rate, contractility, renin release.",
          "β2 → Gs → bronchodilation, uterine relaxation, skeletal muscle vasodilation, potassium shift into cells.",
          "M2 → Gi (cardiac slowing); M1, M3 → Gq (secretions, gut motility, bronchoconstriction).",
          "D1 → Gs (renal vasodilation); D2 → Gi (antipsychotic target).",
        ],
        table: {
          title: "Pressor effects compared",
          columns: ["Drug", "Receptors", "Heart rate", "Use"],
          rows: [
            ["Phenylephrine", "α1", "Reflex fall", "Hypotension with tachycardia"],
            ["Norepinephrine", "α1 > β1", "Slight fall", "Septic shock"],
            ["Epinephrine", "α and β", "Rise", "Anaphylaxis, cardiac arrest"],
            ["Dobutamine", "β1", "Rise", "Cardiogenic shock"],
            ["Isoproterenol", "β1 = β2", "Marked rise", "Bradycardia (rare now)"],
          ],
        },
        pitfalls: [
          "Beta blockade in anaphylaxis makes adrenaline less effective — glucagon is the rescue because it bypasses the β receptor.",
          "Unopposed α stimulation after a non-selective beta blocker in cocaine toxicity worsens vasoconstriction.",
        ],
        mnemonic: "Qiss and Qiq — α1, M1, M3 are Gq; α2, M2, D2 are Gi; the rest are Gs.",
        vignette: {
          stem: "After an intravenous drug the mean arterial pressure rises and the heart rate falls, though the drug has no direct cardiac action.",
          answer: "A pure α1 agonist such as phenylephrine.",
          reasoning: "The bradycardia is baroreceptor-mediated reflex vagal tone, not a direct effect.",
        },
        highYield: "Reflex bradycardia after phenylephrine; no reflex change after a pure β1 agonist.",
        figure: {
          file: "GPCR mechanism.png",
          caption: "Ligand binding, G-protein activation and second messenger generation",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "kinetics",
        title: "Pharmacokinetics you can calculate under pressure",
        minutes: 7,
        summary: "Volume of distribution, clearance, half-life, loading and maintenance dose — four equations, endless questions.",
        mechanism:
          "Volume of distribution is not an anatomical volume; it is the theoretical volume needed to contain the total drug at the measured plasma concentration. A drug that hides in fat or binds tissue has a huge Vd and a plasma level that says little about total body burden — which is why dialysis fails to remove such drugs. Clearance, not half-life, determines steady-state concentration on a repeated dose; half-life only determines how long steady state takes to reach. Separating those two ideas answers most dosing questions correctly.",
        points: [
          "Vd = total drug in body ÷ plasma concentration. High Vd means tissue sequestration and poor dialysability.",
          "Half-life t½ = 0.693 × Vd ÷ clearance. Steady state is reached after 4–5 half-lives regardless of dosing interval.",
          "Loading dose = target concentration × Vd ÷ bioavailability — unchanged in renal failure.",
          "Maintenance dose = target concentration × clearance ÷ bioavailability — reduced in renal or hepatic failure.",
          "Zero-order kinetics (constant amount per hour): phenytoin at high dose, ethanol, aspirin in overdose.",
        ],
        table: {
          title: "First-order versus zero-order",
          columns: ["Feature", "First-order", "Zero-order"],
          rows: [
            ["Rate", "Proportional to concentration", "Constant amount per unit time"],
            ["Half-life", "Constant", "Varies with concentration"],
            ["Examples", "Most drugs", "Phenytoin (high dose), ethanol, aspirin"],
            ["Overdose risk", "Predictable", "Small dose rise → large level rise"],
          ],
        },
        pitfalls: [
          "Renal failure changes the maintenance dose, never the loading dose — the volume of distribution has not changed.",
          "Urine alkalinisation traps weak acids (aspirin); acidification traps weak bases. Ionised drug cannot be reabsorbed.",
        ],
        vignette: {
          stem: "A patient on phenytoin has a level of 12 mg/L. The dose is raised by 15% and the level rises to 28 mg/L with nystagmus.",
          answer: "Saturation (zero-order) kinetics.",
          reasoning: "Once the metabolising enzyme is saturated, elimination becomes constant and small dose increments produce disproportionate level rises.",
        },
        highYield: "Loading dose depends on Vd; maintenance dose depends on clearance. Renal failure only alters the latter.",
        figure: {
          file: "Potency pharmacology.svg",
          caption: "Dose–response curves illustrating potency and efficacy",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "antidotes",
        title: "Antidotes and toxidromes",
        minutes: 6,
        summary: "Recognise the syndrome first, then reach for the specific antidote.",
        mechanism:
          "Toxidromes exist because most poisons act on a limited set of receptor systems, so the vital signs and pupils cluster into recognisable patterns. Distinguishing cholinergic from anticholinergic toxicity comes down to sweat: muscarinic overdrive gives a wet, secreting patient, while blockade gives a dry, flushed one. The antidote logic then follows the mechanism — atropine blocks the excess muscarinic drive symptomatically, while pralidoxime reactivates the enzyme itself, but only before the phosphorylated enzyme 'ages' irreversibly.",
        points: [
          "Organophosphates: atropine (titrate to dry secretions) plus pralidoxime, given early.",
          "Paracetamol: N-acetylcysteine, which replenishes glutathione to detoxify NAPQI. Plot the level on the nomogram.",
          "Benzodiazepines: flumazenil (avoid if chronic use — precipitates seizures). Opioids: naloxone.",
          "Warfarin: vitamin K plus 4-factor prothrombin complex concentrate. Heparin: protamine sulfate.",
          "Methanol / ethylene glycol: fomepizole, preferred over ethanol; dialysis for severe acidosis.",
          "Digoxin: digoxin-specific Fab fragments, indicated for hyperkalaemia or life-threatening arrhythmia.",
        ],
        table: {
          title: "Toxidrome recognition",
          columns: ["Toxidrome", "Pupils", "Skin", "Other"],
          rows: [
            ["Cholinergic", "Constricted", "Sweaty", "SLUDGE, bronchorrhoea, bradycardia"],
            ["Anticholinergic", "Dilated", "Dry and flushed", "Delirium, urinary retention, fever"],
            ["Opioid", "Pinpoint", "Normal", "Respiratory depression, coma"],
            ["Sympathomimetic", "Dilated", "Sweaty", "Tachycardia, hypertension, agitation"],
          ],
        },
        pitfalls: [
          "Cholinergic and sympathomimetic patients are both sweaty — the pupils separate them.",
          "Physostigmine for anticholinergic delirium is contraindicated in tricyclic overdose (asystole risk); use sodium bicarbonate instead.",
        ],
        mnemonic: "Anticholinergic: hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter.",
        vignette: {
          stem: "A farmer is brought in confused, drooling, with pinpoint pupils, bradycardia and copious bronchial secretions.",
          answer: "Organophosphate poisoning — atropine plus pralidoxime.",
          reasoning: "Muscarinic overdrive from cholinesterase inhibition; atropine is titrated to secretion control, not to pupil size.",
        },
        highYield: "Pralidoxime reactivates cholinesterase only before enzyme ageing — give it early.",
        figure: {
          file: "Atropine.svg",
          caption: "Atropine — the antimuscarinic first line in organophosphate poisoning",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "antimicrobials",
        title: "Antimicrobials — target, spectrum and resistance",
        minutes: 8,
        summary: "Every antibiotic class attacks one structure; resistance is the bug's answer to that attack.",
        mechanism:
          "Selective toxicity depends on targeting something bacterial that human cells lack: peptidoglycan, the 70S ribosome, bacterial DNA gyrase, or folate synthesis (humans absorb folate rather than making it). Resistance therefore takes three predictable forms — destroy the drug (β-lactamase), modify the target (altered PBP2a in MRSA, ribosomal methylation in macrolide resistance), or pump it out (efflux in tetracycline resistance). Knowing which of the three applies tells you whether a β-lactamase inhibitor will help: it rescues drug destruction, but does nothing against an altered target, which is why MRSA is resistant to every β-lactam except ceftaroline.",
        points: [
          "Cell wall: penicillins, cephalosporins, carbapenems (bind PBPs); vancomycin binds D-ala-D-ala.",
          "30S ribosome: aminoglycosides (bactericidal), tetracyclines (bacteriostatic). 50S: macrolides, clindamycin, linezolid, chloramphenicol.",
          "DNA gyrase / topoisomerase IV: fluoroquinolones. RNA polymerase: rifampicin (rapid resistance if used alone).",
          "Folate synthesis: sulfonamides (dihydropteroate synthase) plus trimethoprim (dihydrofolate reductase) — sequential blockade.",
          "MRSA resistance is altered PBP2a; VRE resistance is D-ala-D-lac substitution. Neither is β-lactamase.",
        ],
        table: {
          title: "Class-defining toxicities",
          columns: ["Class", "Signature toxicity"],
          rows: [
            ["Aminoglycosides", "Nephrotoxicity and ototoxicity"],
            ["Fluoroquinolones", "Tendon rupture, QT prolongation"],
            ["Vancomycin", "Infusion-related flushing, nephrotoxicity"],
            ["Chloramphenicol", "Aplastic anaemia, grey baby syndrome"],
            ["Linezolid", "Thrombocytopenia, serotonin syndrome"],
          ],
        },
        pitfalls: [
          "Adding clavulanate does not restore activity against MRSA — the target, not the drug, is the problem.",
          "Rifampicin is a potent CYP450 inducer; it fails oral contraceptives and warfarin control.",
        ],
        vignette: {
          stem: "A wound isolate is resistant to oxacillin. The laboratory reports mecA gene positivity.",
          answer: "MRSA — treat with vancomycin, not a β-lactam plus inhibitor.",
          reasoning: "mecA encodes PBP2a, a low-affinity penicillin binding protein; no β-lactamase inhibitor can overcome an altered target.",
        },
        highYield: "β-lactamase inhibitors rescue drug destruction only — altered-target resistance (MRSA, VRE) is untouched.",
        figure: {
          file: "P450cycle.svg",
          caption: "Cytochrome P450 catalytic cycle — the hub of antimicrobial drug interactions",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "pathology",
    subject: "Pathology",
    icon: "biotech",
    blurb: "Cell injury, inflammation, neoplasia and haematology — the framework every clinical subject borrows.",
    cover: {
      file: "Histopathology of coagulative necrosis of cardiomyocytes.jpg",
      caption: "Coagulative necrosis of cardiomyocytes",
      credit: "Wikimedia Commons",
    },
    objectives: [
      "Distinguish reversible from irreversible injury on morphological grounds.",
      "Interpret a granuloma and generate a causal differential.",
      "Use tumour markers correctly — for monitoring rather than screening.",
      "Read a peripheral smear and reason from red cell morphology to diagnosis.",
    ],
    concepts: [
      {
        id: "cell-injury",
        title: "Reversible vs irreversible cell injury",
        minutes: 7,
        summary:
          "The dividing line is mitochondrial permeability and membrane integrity — not swelling or blebbing.",
        mechanism:
          "Injury begins with ATP depletion: the Na⁺/K⁺-ATPase fails, sodium and water enter, and the cell swells. All of that is recoverable. The point of no return is opening of the mitochondrial permeability transition pore, which collapses the proton gradient so that even restored oxygen cannot regenerate ATP, and releases cytochrome c. Combined with plasma membrane defects and massive calcium influx activating phospholipases and proteases, the cell can no longer be rescued. This is also why restoring blood flow can *worsen* infarction — oxygen returning to damaged mitochondria generates free radicals rather than ATP.",
        points: [
          "Reversible: cellular swelling, membrane blebs, ribosomal detachment, chromatin clumping, fatty change.",
          "Irreversible: mitochondrial vacuolisation with amorphous densities, lysosomal rupture, plasma membrane defects, nuclear pyknosis → karyorrhexis → karyolysis.",
          "Coagulative necrosis everywhere except brain (liquefactive), TB (caseous), pancreas and breast (fat necrosis), vessels (fibrinoid).",
          "Apoptosis is ATP-dependent, affects single cells, and does not incite inflammation — necrosis does both opposites.",
          "Intrinsic apoptosis: BAX/BAK release cytochrome c; extrinsic: Fas–FasL or TNF activating caspase-8. Both converge on caspase-3.",
        ],
        table: {
          title: "Necrosis patterns",
          columns: ["Pattern", "Typical site", "Mechanism"],
          rows: [
            ["Coagulative", "Heart, kidney, spleen", "Ischaemia with protein denaturation"],
            ["Liquefactive", "Brain, abscess", "Enzymatic digestion"],
            ["Caseous", "Tuberculosis, fungi", "Granulomatous inflammation"],
            ["Fat", "Pancreas, breast", "Lipase-mediated saponification"],
            ["Fibrinoid", "Vessel walls", "Immune complex deposition"],
          ],
        },
        pitfalls: [
          "Cellular swelling is reversible; mitochondrial vacuolisation is not. Both look like 'swelling' in a stem.",
          "Apoptotic bodies are cleared without inflammation — a stem mentioning a neutrophil infiltrate is describing necrosis.",
        ],
        vignette: {
          stem: "Three days after successful thrombolysis a myocardial infarct is larger than the initial perfusion defect predicted.",
          answer: "Reperfusion injury.",
          reasoning: "Reoxygenation of damaged mitochondria generates oxygen free radicals, and calcium overload activates degradative enzymes.",
        },
        highYield: "Reperfusion injury is oxygen-radical and calcium mediated, worsening the initial infarct.",
        figure: {
          file: "Histopathology of coagulative necrosis of cardiomyocytes.jpg",
          caption: "Coagulative necrosis: preserved outlines, loss of nuclei",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "granuloma",
        title: "Granulomatous inflammation",
        minutes: 6,
        summary: "An organised collection of epithelioid macrophages — the immune system's containment strategy.",
        mechanism:
          "A granuloma forms when macrophages cannot digest what they have phagocytosed. Antigen-presenting cells drive a Th1 response; interferon-γ from those T cells transforms macrophages into epithelioid cells and fuses some into Langhans giant cells, while TNF-α holds the structure together. That TNF dependence has a direct clinical consequence: anti-TNF biologics dissolve existing granulomas and reactivate latent tuberculosis, which is why every patient is screened before starting them.",
        points: [
          "Caseating granulomas: tuberculosis, histoplasmosis, some fungal infections.",
          "Non-caseating granulomas: sarcoidosis, Crohn's disease, berylliosis, foreign body reaction, cat-scratch (stellate).",
          "Sarcoidosis: bilateral hilar lymphadenopathy, raised ACE, hypercalcaemia from macrophage 1α-hydroxylase activity.",
          "Th1 cytokines interferon-γ and TNF-α are essential; anti-TNF therapy reactivates latent TB.",
          "Chronic granulomatous disease: NADPH oxidase defect, catalase-positive organisms, abnormal dihydrorhodamine test.",
        ],
        pitfalls: [
          "Hypercalcaemia in sarcoidosis comes from unregulated macrophage vitamin D activation, not from PTH.",
          "Crohn's granulomas are non-caseating and often absent on biopsy — their absence does not exclude the disease.",
        ],
        vignette: {
          stem: "A young Black woman has dyspnoea, bilateral hilar lymphadenopathy, hypercalcaemia and non-caseating granulomas on biopsy.",
          answer: "Sarcoidosis.",
          reasoning: "The triad of hilar nodes, non-caseating granulomas and macrophage-driven hypercalcaemia is characteristic.",
        },
        highYield: "Screen for latent TB before any anti-TNF biologic — TNF maintains granuloma integrity.",
        figure: {
          file: "Histopathology of granuloma of colonic mucosa.jpg",
          caption: "Non-caseating granuloma in colonic mucosa",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "neoplasia",
        title: "Tumour markers and paraneoplastic syndromes",
        minutes: 7,
        summary: "Markers are for monitoring, not screening — with a few exceptions.",
        mechanism:
          "Tumour markers are normal fetal or tissue proteins re-expressed by malignant cells. Because benign conditions also raise them, their specificity is too low for population screening; their value is in tracking a known tumour, where a rising level after treatment signals recurrence long before imaging. Paraneoplastic syndromes work differently — the tumour secretes a hormone or triggers antibodies that cross-react with host tissue. Small cell lung cancer, being neuroendocrine in origin, has the secretory machinery to make ADH and ACTH, which is why it dominates paraneoplastic endocrine questions.",
        points: [
          "AFP: hepatocellular carcinoma, non-seminomatous germ cell tumours, and neural tube defects in pregnancy.",
          "CA-125: ovarian epithelial cancer. CA-19-9: pancreatic. CEA: colorectal (monitoring only).",
          "β-hCG: choriocarcinoma, hydatidiform mole, germ cell tumours. PSA: prostate, but also raised in BPH and prostatitis.",
          "SIADH and Cushing's from small cell lung cancer; PTH-related peptide from squamous cell carcinoma.",
          "Calcitonin: medullary thyroid carcinoma (RET mutation, MEN2A and 2B).",
          "Lambert–Eaton: antibodies to presynaptic calcium channels; strength *improves* with repeated effort.",
        ],
        table: {
          title: "Paraneoplastic pairings",
          columns: ["Syndrome", "Tumour", "Mediator"],
          rows: [
            ["SIADH", "Small cell lung cancer", "ADH"],
            ["Cushing's", "Small cell lung cancer", "ACTH"],
            ["Hypercalcaemia", "Squamous cell carcinoma", "PTH-related peptide"],
            ["Polycythaemia", "Renal cell carcinoma", "Erythropoietin"],
            ["Lambert–Eaton", "Small cell lung cancer", "Anti-VGCC antibodies"],
          ],
        },
        pitfalls: [
          "In PTH-rp hypercalcaemia the measured PTH is *suppressed* — that is how it separates from hyperparathyroidism.",
          "Myasthenia gravis worsens with effort; Lambert–Eaton improves. The stem always tests this direction.",
        ],
        vignette: {
          stem: "A smoker has a central lung mass, calcium 3.2 mmol/L, low PTH and elevated PTH-related peptide.",
          answer: "Squamous cell carcinoma of the lung.",
          reasoning: "PTH-rp is the classic squamous mediator; it suppresses native PTH through the calcium feedback loop.",
        },
        highYield: "Hypercalcaemia + squamous lung mass = PTH-related peptide, with suppressed real PTH.",
        figure: {
          file: "Histopathology of lung adenocarcinoma with solid pattern.jpg",
          caption: "Lung adenocarcinoma, solid pattern — glandular differentiation lost",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "smear",
        title: "Reading the peripheral smear",
        minutes: 7,
        summary: "Red cell shape is a diagnosis in itself — start from the MCV, then look at morphology.",
        mechanism:
          "Red cells have no nucleus and no organelles, so their shape reflects only membrane, haemoglobin and the mechanical stresses they meet. Membrane protein defects (spectrin, ankyrin) give spherocytes that lose deformability and are trapped in the spleen. Abnormal haemoglobin polymerisation gives sickle cells. Mechanical shearing in fibrin strands or on prosthetic valves gives schistocytes — which is why schistocytes plus thrombocytopenia is a microangiopathy until proven otherwise, and demands an urgent decision about plasma exchange.",
        points: [
          "Microcytic: iron deficiency, thalassaemia, anaemia of chronic disease, sideroblastic. Mentzer index < 13 favours thalassaemia.",
          "Macrocytic megaloblastic: B12/folate deficiency with hypersegmented neutrophils. Non-megaloblastic: alcohol, liver disease, hypothyroidism.",
          "Schistocytes: DIC, TTP, HUS, mechanical valve. Spherocytes: hereditary spherocytosis, autoimmune haemolysis.",
          "Target cells: thalassaemia, liver disease, post-splenectomy. Howell–Jolly bodies: asplenia.",
          "Sickle cells with a positive solubility test: sickle cell disease — confirm with haemoglobin electrophoresis.",
        ],
        table: {
          title: "Microcytic anaemia workup",
          columns: ["Test", "Iron deficiency", "Chronic disease", "Thalassaemia"],
          rows: [
            ["Serum iron", "Low", "Low", "Normal"],
            ["Ferritin", "Low", "High", "Normal or high"],
            ["TIBC", "High", "Low", "Normal"],
            ["RDW", "High", "Normal", "Normal"],
          ],
        },
        pitfalls: [
          "Ferritin is an acute phase reactant — a 'normal' ferritin during infection does not exclude iron deficiency.",
          "TTP is treated with plasma exchange, not platelet transfusion; platelets fuel further thrombosis.",
        ],
        vignette: {
          stem: "A woman has fever, confusion, renal impairment, thrombocytopenia and schistocytes on the smear. Coagulation studies are normal.",
          answer: "Thrombotic thrombocytopenic purpura.",
          reasoning: "Normal PT/aPTT excludes DIC; the pentad with ADAMTS13 deficiency defines TTP and mandates urgent plasma exchange.",
        },
        highYield: "Schistocytes with normal coagulation studies = TTP/HUS, not DIC.",
        figure: {
          file: "Sickle cell 01.jpg",
          caption: "Peripheral smear showing sickled erythrocytes",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "medicine",
    subject: "Medicine",
    icon: "stethoscope",
    blurb: "ECG reads, endocrine algorithms, respiratory patterns and acute care decisions in vignette form.",
    cover: {
      file: "12leadECG.jpg",
      caption: "A standard 12-lead electrocardiogram",
      credit: "Wikimedia Commons",
    },
    objectives: [
      "Localise an infarct to a coronary territory from the ECG alone.",
      "Interpret thyroid function tests and act on the pattern.",
      "Classify a pleural effusion and pick the next investigation.",
      "Sequence the management of diabetic ketoacidosis safely.",
    ],
    concepts: [
      {
        id: "stemi",
        title: "Reading a STEMI and localising the vessel",
        minutes: 9,
        summary:
          "ST elevation in contiguous leads with reciprocal depression. Lead groups map to coronary territories.",
        mechanism:
          "Each ECG lead looks at the heart from a fixed angle, so a transmurally injured wall produces elevation in the leads facing it and depression in those facing the opposite wall. Because coronary supply is territorial, the group of leads showing elevation names the occluded artery. The clinical importance is not academic: an inferior infarct is right coronary in most people, and the same artery supplies the right ventricle and the SA/AV nodes — which is why inferior infarcts cause bradycardia and become dangerously preload-dependent.",
        points: [
          "II, III, aVF → inferior → right coronary artery. Get right-sided leads (V4R) to check for RV involvement.",
          "V1–V4 → anteroseptal → left anterior descending.",
          "I, aVL, V5–V6 → lateral → left circumflex.",
          "Tall R with ST depression in V1–V2 → posterior infarct; confirm with posterior leads V7–V9.",
          "New left bundle branch block with ischaemic symptoms is treated as a STEMI equivalent.",
          "Door-to-balloon target is 90 minutes for primary PCI; thrombolyse if PCI is unavailable within 120 minutes.",
        ],
        table: {
          title: "Cardiac biomarkers",
          columns: ["Marker", "Rises", "Peaks", "Returns to normal"],
          rows: [
            ["High-sensitivity troponin", "2–3 h", "24–48 h", "7–10 days"],
            ["CK-MB", "4–6 h", "24 h", "48–72 h"],
            ["Myoglobin", "1–2 h", "6–8 h", "24 h"],
          ],
        },
        pitfalls: [
          "Nitrates in a right ventricular infarct cause profound hypotension — the RV needs preload. Give fluids first.",
          "CK-MB is the marker for *re*infarction within 72 hours, because troponin is still elevated from the first event.",
        ],
        vignette: {
          stem: "A man with inferior ST elevation becomes hypotensive minutes after sublingual nitroglycerin. Lungs are clear and JVP is raised.",
          answer: "Right ventricular infarction — give intravenous fluids.",
          reasoning: "Clear lungs with raised JVP and preload sensitivity indicates RV involvement of an inferior infarct.",
        },
        highYield: "Inferior MI with hypotension after nitrates suggests RV infarction — give fluids.",
        figure: {
          file: "12leadECG.jpg",
          caption: "12-lead layout — read leads in contiguous territorial groups",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "thyroid",
        title: "Interpreting thyroid function tests",
        minutes: 6,
        summary: "TSH is the screening test; free T4 defines severity and site.",
        mechanism:
          "The pituitary senses intracellular T3 with far greater sensitivity than any assay senses thyroid hormone, so TSH moves logarithmically for small linear changes in T4. That amplification is why TSH is the best single screening test and why it becomes abnormal before free T4 leaves the reference range — the definition of subclinical disease. The exception is central disease: if the pituitary itself is the problem, TSH is uninformative and free T4 must be measured directly.",
        points: [
          "Low TSH + high free T4 → primary hyperthyroidism. Diffuse uptake on scan = Graves'; focal = toxic nodule; absent uptake = thyroiditis.",
          "High TSH + low free T4 → primary hypothyroidism, most often Hashimoto's (anti-TPO antibodies).",
          "Low TSH + low free T4 → central hypothyroidism; assess the rest of the pituitary axis and image.",
          "Subclinical disease: abnormal TSH with a normal free T4 — treat if TSH > 10 or antibodies positive or pregnant.",
          "Sick euthyroid syndrome: low T3 with normal or low TSH in acute illness — do not test or treat during the illness.",
        ],
        table: {
          title: "Pattern recognition",
          columns: ["TSH", "Free T4", "Interpretation"],
          rows: [
            ["Low", "High", "Primary hyperthyroidism"],
            ["Low", "Normal", "Subclinical hyperthyroidism"],
            ["High", "Low", "Primary hypothyroidism"],
            ["High", "Normal", "Subclinical hypothyroidism"],
            ["Low or normal", "Low", "Central hypothyroidism"],
          ],
        },
        pitfalls: [
          "Thyroiditis and Graves' both cause thyrotoxicosis; only the radioiodine uptake distinguishes them, and only thyroiditis is self-limiting.",
          "Amiodarone can cause both hyper- and hypothyroidism — check the pattern rather than assuming.",
        ],
        vignette: {
          stem: "A pregnant woman at 9 weeks has TSH 8.5 mIU/L, normal free T4 and positive anti-TPO antibodies.",
          answer: "Start levothyroxine.",
          reasoning: "Subclinical hypothyroidism with positive antibodies in pregnancy is treated because of fetal neurodevelopmental risk.",
        },
        highYield: "In pregnancy treat overt hypothyroidism immediately — levothyroxine requirements rise about 30%.",
        figure: {
          file: "Thyroid system.svg",
          caption: "Hypothalamic–pituitary–thyroid axis with negative feedback",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "effusion",
        title: "Pleural effusion — transudate or exudate",
        minutes: 6,
        summary: "Light's criteria first; the differential and the next test follow from that single split.",
        mechanism:
          "Transudates arise from altered Starling forces — raised hydrostatic pressure in heart failure, or low oncotic pressure in cirrhosis and nephrotic syndrome — with an intact pleura, so protein stays in the vessels. Exudates arise from increased capillary permeability or blocked lymphatic drainage, letting protein and cells escape. Light's criteria simply detect that protein and LDH leak. Because they were designed to be highly sensitive for exudates, they occasionally misclassify a diuresed heart failure effusion — the serum-to-pleural albumin gradient rescues that case.",
        points: [
          "Light's criteria (any one means exudate): pleural/serum protein > 0.5; pleural/serum LDH > 0.6; pleural LDH > two-thirds the upper serum limit.",
          "Transudate: heart failure, cirrhosis, nephrotic syndrome, hypoalbuminaemia.",
          "Exudate: infection, malignancy, pulmonary embolism, tuberculosis, connective tissue disease.",
          "Low pleural glucose (< 3.3 mmol/L): empyema, rheumatoid effusion, malignancy, tuberculosis.",
          "Raised adenosine deaminase with lymphocyte predominance strongly suggests tuberculous pleuritis.",
          "pH < 7.2 in a parapneumonic effusion mandates chest tube drainage.",
        ],
        pitfalls: [
          "A diuresed heart failure effusion can meet exudate criteria — use the serum–pleural albumin gradient (> 12 g/L still means transudate).",
          "Rheumatoid effusions have the lowest glucose of all — often near zero.",
        ],
        vignette: {
          stem: "A patient with pneumonia has an effusion with pH 7.10, glucose 2.0 mmol/L and LDH ratio 0.9.",
          answer: "Complicated parapneumonic effusion — insert a chest drain.",
          reasoning: "pH below 7.2 with low glucose predicts loculation and failure of antibiotics alone.",
        },
        highYield: "Parapneumonic effusion with pH < 7.2 needs drainage, not just antibiotics.",
        figure: {
          file: "Lobar pneumonia illustrated.jpg",
          caption: "Lobar pneumonia — the commonest setting for a parapneumonic effusion",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "dka",
        title: "Diabetic ketoacidosis — sequencing the management",
        minutes: 8,
        summary: "Fluids, then potassium, then insulin — in that order, every time.",
        mechanism:
          "Absolute insulin deficiency with counter-regulatory hormone excess drives lipolysis and unrestrained ketogenesis, producing a high anion gap acidosis, while hyperglycaemia causes an osmotic diuresis and profound volume depletion. Total body potassium is depleted by that diuresis, yet serum potassium often reads normal or high because acidosis shifts potassium out of cells. Insulin reverses that shift within minutes. This is why insulin given before potassium is checked can precipitate fatal hypokalaemia — the order of treatment is a direct consequence of the pathophysiology.",
        points: [
          "Diagnosis: glucose > 13.9 mmol/L (250 mg/dL), pH < 7.3, bicarbonate < 18, ketonaemia.",
          "Start isotonic saline resuscitation first; the average adult deficit is 3–6 litres.",
          "Hold insulin until serum potassium is above 3.3 mEq/L; replace potassium whenever it is below 5.3.",
          "Use a fixed-rate insulin infusion; add dextrose once glucose falls below 11 mmol/L to allow the infusion to continue clearing ketones.",
          "Resolution is defined by closure of the anion gap, not by normoglycaemia. Overlap subcutaneous insulin before stopping the infusion.",
          "Bicarbonate only for pH < 6.9; it risks cerebral oedema and paradoxical CNS acidosis.",
        ],
        table: {
          title: "DKA versus hyperosmolar hyperglycaemic state",
          columns: ["Feature", "DKA", "HHS"],
          rows: [
            ["Typical diabetes type", "Type 1", "Type 2"],
            ["Glucose", "> 250 mg/dL", "> 600 mg/dL"],
            ["Ketones", "Marked", "Minimal"],
            ["pH", "< 7.3", "> 7.3"],
            ["Osmolality", "Variable", "> 320 mOsm/kg"],
          ],
        },
        pitfalls: [
          "Euglycaemic DKA occurs with SGLT2 inhibitors — check ketones even when glucose is near normal.",
          "Cerebral oedema in children follows overly rapid fluid or osmolality correction; watch for headache and falling consciousness.",
        ],
        vignette: {
          stem: "A patient in DKA has potassium 3.1 mEq/L on arrival.",
          answer: "Give fluids and potassium first; delay insulin until potassium exceeds 3.3 mEq/L.",
          reasoning: "Insulin drives potassium intracellularly and can precipitate arrhythmia in an already depleted patient.",
        },
        highYield: "Insulin waits for potassium above 3.3 mEq/L, and DKA is resolved when the anion gap closes.",
        figure: {
          file: "Renin-angiotensin system in man shadow.svg",
          caption: "Volume regulation pathways activated by the dehydration of DKA",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
];

export function getModule(slug: string) {
  return LEARN_MODULES.find((m) => m.slug === slug);
}

export function conceptCount() {
  return LEARN_MODULES.reduce((n, m) => n + m.concepts.length, 0);
}
