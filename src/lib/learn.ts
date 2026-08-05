/**
 * Concept modules for the Learn section.
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

export type Concept = {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  points: string[];
  highYield: string;
  figure: Figure;
};

export type LearnModule = {
  slug: string;
  subject: string;
  icon: string;
  cover: Figure;
  blurb: string;
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
    blurb: "Brachial plexus, inguinal canal, embryology hooks — the diagrams NBE keeps returning to.",
    cover: {
      file: "Human skeleton front en.svg",
      caption: "Human skeleton, anterior view",
      credit: "Wikimedia Commons (public domain)",
    },
    concepts: [
      {
        id: "brachial-plexus",
        title: "Brachial plexus — roots to branches",
        minutes: 8,
        summary:
          "C5–T1 ventral rami form roots → trunks (upper, middle, lower) → divisions → cords (lateral, posterior, medial) → terminal branches. Lesion level predicts the deficit exactly.",
        points: [
          "Erb's palsy (C5–C6, upper trunk): adducted, internally rotated arm — 'waiter's tip'.",
          "Klumpke (C8–T1, lower trunk): claw hand, may add Horner's syndrome via T1 sympathetics.",
          "Posterior cord → axillary + radial nerves; lateral cord → musculocutaneous + lateral root of median.",
          "Long thoracic nerve (C5–C7) injury → winged scapula from serratus anterior palsy.",
        ],
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
        minutes: 6,
        summary:
          "A 4 cm oblique passage with four walls. Hesselbach's triangle — inguinal ligament, rectus sheath, inferior epigastric vessels — defines direct hernias.",
        points: [
          "Indirect hernia: lateral to the inferior epigastric artery, through the deep ring, congenital.",
          "Direct hernia: medial to the inferior epigastric artery, through Hesselbach's triangle, acquired.",
          "Anterior wall: external oblique aponeurosis. Posterior wall: transversalis fascia + conjoint tendon.",
        ],
        highYield:
          "Lateral to the inferior epigastric vessels = indirect. Medial = direct. Nothing else decides it.",
        figure: {
          file: "Inguinal Region Interior View.jpg",
          caption: "Inguinal region, interior view — rings, vessels and Hesselbach's triangle",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "physiology",
    subject: "Physiology",
    icon: "monitor_heart",
    blurb: "Cardiac cycle, pressure–volume loops, acid–base — number-driven concepts with easy marks.",
    cover: {
      file: "Wiggers Diagram 2.svg",
      caption: "Wiggers diagram of the cardiac cycle",
      credit: "Wikimedia Commons",
    },
    concepts: [
      {
        id: "pv-loop",
        title: "Pressure–volume loop of the left ventricle",
        minutes: 7,
        summary:
          "Four phases: isovolumetric contraction, ejection, isovolumetric relaxation, filling. Loop width = stroke volume; loop area = stroke work.",
        points: [
          "Increased preload → loop widens rightward, stroke volume rises (Frank–Starling).",
          "Increased afterload → higher end-systolic pressure, reduced stroke volume, higher ESV.",
          "Increased contractility → steeper ESPVR, smaller ESV, larger stroke volume.",
          "Aortic stenosis: tall narrow loop. Mitral regurgitation: loses the isovolumetric contraction phase.",
        ],
        highYield: "Loss of the isovolumetric contraction segment on the PV loop = mitral regurgitation.",
        figure: {
          file: "PV loop example of left ventricle.svg",
          caption: "Left ventricular pressure–volume loop with its four phases",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "acid-base",
        title: "Acid–base: a 4-step read",
        minutes: 6,
        summary:
          "Read pH → primary disorder, then the compensating variable, then compute expected compensation, then check the anion gap.",
        points: [
          "Winter's formula: expected pCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 in metabolic acidosis.",
          "Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻); a high gap points to MUDPILES.",
          "A delta ratio > 2 suggests a coexisting metabolic alkalosis.",
        ],
        highYield: "Measured pCO₂ above the Winter's estimate means an added respiratory acidosis.",
        figure: {
          file: "Davenport Fig 6.jpg",
          caption: "Davenport diagram — bicarbonate against pH with isobars",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "biochemistry",
    subject: "Biochemistry",
    icon: "science",
    blurb: "Rate-limiting enzymes, vitamin deficiencies and inborn errors — pure recall points.",
    cover: {
      file: "Citric acid cycle with aconitate 2.svg",
      caption: "Citric acid (Krebs) cycle",
      credit: "Wikimedia Commons",
    },
    concepts: [
      {
        id: "rate-limiting",
        title: "Rate-limiting enzymes worth memorising",
        minutes: 5,
        summary: "Most metabolism questions reduce to naming the committed step and its regulator.",
        points: [
          "Glycolysis: phosphofructokinase-1 (activated by F-2,6-BP and AMP).",
          "Gluconeogenesis: fructose-1,6-bisphosphatase.",
          "Cholesterol synthesis: HMG-CoA reductase (statin target).",
          "Heme synthesis: ALA synthase (mitochondrial, B6-dependent).",
          "Urea cycle: carbamoyl phosphate synthetase I (activated by N-acetylglutamate).",
        ],
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
        minutes: 6,
        summary: "Each B vitamin has one classic syndrome and one enzyme link.",
        points: [
          "B1 thiamine → Wernicke–Korsakoff, wet beriberi; cofactor for pyruvate dehydrogenase.",
          "B3 niacin → pellagra: dermatitis, diarrhoea, dementia.",
          "B6 pyridoxine → sideroblastic anaemia, isoniazid-induced neuropathy.",
          "B12 → megaloblastic anaemia with subacute combined degeneration; folate spares the cord.",
        ],
        highYield: "Neurological signs separate B12 from folate deficiency — both give a macrocytic anaemia.",
        figure: {
          file: "Pellagra NIH.jpg",
          caption: "Pellagra — photosensitive dermatitis of niacin deficiency",
          credit: "NIH via Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "pharmacology",
    subject: "Pharmacology",
    icon: "medication",
    blurb: "Receptor pharmacology, antidotes and drug-of-choice tables.",
    cover: {
      file: "GPCR mechanism.png",
      caption: "G-protein coupled receptor signalling",
      credit: "Wikimedia Commons",
    },
    concepts: [
      {
        id: "receptors",
        title: "Autonomic receptors and their second messengers",
        minutes: 6,
        summary: "These questions collapse into knowing which G-protein is coupled where.",
        points: [
          "α1 → Gq → IP3/DAG → vasoconstriction, mydriasis.",
          "α2 → Gi → ↓cAMP → presynaptic inhibition, central sympatholysis (clonidine).",
          "β1 → Gs → ↑cAMP → heart rate, contractility, renin.",
          "β2 → Gs → bronchodilation, uterine relaxation, skeletal muscle vasodilation.",
          "M2 → Gi (cardiac slowing); M1/M3 → Gq.",
        ],
        highYield: "Reflex bradycardia after phenylephrine; no reflex change after a pure β1 agonist.",
        figure: {
          file: "GPCR mechanism.png",
          caption: "Ligand binding, G-protein activation and second messenger generation",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "antidotes",
        title: "Antidotes you must not confuse",
        minutes: 5,
        summary: "Fast, one-to-one mapping questions appear every year.",
        points: [
          "Organophosphates: atropine + pralidoxime.",
          "Paracetamol: N-acetylcysteine (replenishes glutathione).",
          "Benzodiazepines: flumazenil; opioids: naloxone.",
          "Warfarin: vitamin K + 4-factor PCC; heparin: protamine sulfate.",
          "Methanol / ethylene glycol: fomepizole, preferred over ethanol.",
        ],
        highYield: "Pralidoxime reactivates cholinesterase only before enzyme ageing — give it early.",
        figure: {
          file: "Atropine.svg",
          caption: "Atropine — the antimuscarinic first line in organophosphate poisoning",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "pathology",
    subject: "Pathology",
    icon: "biotech",
    blurb: "Cell injury, inflammation and neoplasia — the framework every clinical subject borrows.",
    cover: {
      file: "Histopathology of coagulative necrosis of cardiomyocytes.jpg",
      caption: "Coagulative necrosis of cardiomyocytes",
      credit: "Wikimedia Commons",
    },
    concepts: [
      {
        id: "cell-injury",
        title: "Reversible vs irreversible cell injury",
        minutes: 6,
        summary:
          "The dividing line is mitochondrial permeability and membrane integrity — not swelling or blebbing.",
        points: [
          "Reversible: cellular swelling, blebs, ribosomal detachment, chromatin clumping.",
          "Irreversible: mitochondrial vacuolisation, lysosomal rupture, membrane defects.",
          "Coagulative necrosis everywhere except brain (liquefactive) and TB (caseous).",
          "Apoptosis is ATP-dependent and does not incite inflammation.",
        ],
        highYield: "Reperfusion injury is oxygen-radical and calcium mediated, worsening the initial infarct.",
        figure: {
          file: "Histopathology of coagulative necrosis of cardiomyocytes.jpg",
          caption: "Coagulative necrosis: preserved outlines, loss of nuclei",
          credit: "Wikimedia Commons",
        },
      },
      {
        id: "neoplasia",
        title: "Tumour markers and paraneoplastic pairs",
        minutes: 7,
        summary: "Markers are for monitoring, not screening — with a few exceptions.",
        points: [
          "AFP: hepatocellular carcinoma, non-seminomatous germ cell tumours.",
          "CA-125: ovarian epithelial cancer; CA-19-9: pancreatic.",
          "SIADH and Cushing's from small cell lung cancer; PTH-rp from squamous cell.",
          "Calcitonin: medullary thyroid carcinoma (RET, MEN2).",
        ],
        highYield: "Hypercalcaemia + squamous lung mass = PTH-related peptide, with suppressed real PTH.",
        figure: {
          file: "Histopathology of lung adenocarcinoma with solid pattern.jpg",
          caption: "Lung adenocarcinoma, solid pattern — glandular differentiation lost",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
  {
    slug: "medicine",
    subject: "Medicine",
    icon: "stethoscope",
    blurb: "ECG reads, endocrine algorithms and acute care decisions in vignette form.",
    cover: {
      file: "12leadECG.jpg",
      caption: "A standard 12-lead electrocardiogram",
      credit: "Wikimedia Commons",
    },
    concepts: [
      {
        id: "stemi",
        title: "Reading a STEMI and localising the vessel",
        minutes: 8,
        summary:
          "ST elevation in contiguous leads with reciprocal depression. Lead groups map to coronary territories.",
        points: [
          "II, III, aVF → inferior → right coronary artery (check for RV involvement, avoid nitrates).",
          "V1–V4 → anteroseptal → left anterior descending.",
          "I, aVL, V5–V6 → lateral → left circumflex.",
          "Tall R with ST depression in V1–V2 → posterior infarct.",
        ],
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
        minutes: 5,
        summary: "TSH is the screening test; free T4 defines severity and site.",
        points: [
          "Low TSH + high T4 → primary hyperthyroidism (Graves' if diffuse uptake).",
          "High TSH + low T4 → primary hypothyroidism (Hashimoto's most common).",
          "Low TSH + low T4 → central hypothyroidism; check the rest of the pituitary axis.",
          "Subclinical disease: abnormal TSH with a normal free T4.",
        ],
        highYield: "In pregnancy treat overt hypothyroidism immediately — levothyroxine needs rise ~30%.",
        figure: {
          file: "Thyroid system.svg",
          caption: "Hypothalamic–pituitary–thyroid axis with negative feedback",
          credit: "Wikimedia Commons",
        },
      },
    ],
  },
];

export function getModule(slug: string) {
  return LEARN_MODULES.find((m) => m.slug === slug);
}
