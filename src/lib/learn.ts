import anatomyImg from "@/assets/learn-anatomy.jpg";
import physiologyImg from "@/assets/learn-physiology.jpg";
import biochemistryImg from "@/assets/learn-biochemistry.jpg";
import pharmacologyImg from "@/assets/learn-pharmacology.jpg";
import pathologyImg from "@/assets/learn-pathology.jpg";
import medicineImg from "@/assets/learn-medicine.jpg";

export type Concept = {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  points: string[];
  highYield: string;
};

export type LearnModule = {
  slug: string;
  subject: string;
  icon: string;
  image: string;
  blurb: string;
  concepts: Concept[];
};

export const LEARN_MODULES: LearnModule[] = [
  {
    slug: "anatomy",
    subject: "Anatomy",
    icon: "accessibility_new",
    image: anatomyImg,
    blurb: "Brachial plexus, thoracic wall, embryology hooks — the diagrams NBE keeps returning to.",
    concepts: [
      {
        id: "brachial-plexus",
        title: "Brachial plexus — roots to branches",
        minutes: 8,
        summary:
          "C5–T1 ventral rami form roots → trunks (upper, middle, lower) → divisions → cords (lateral, posterior, medial) → terminal branches. Lesion level predicts the deficit exactly.",
        points: [
          "Erb's palsy (C5–C6, upper trunk): adductor + internally rotated arm, 'waiter's tip'.",
          "Klumpke (C8–T1, lower trunk): claw hand, may add Horner's syndrome via T1 sympathetics.",
          "Posterior cord → axillary + radial nerves; lateral cord → musculocutaneous + lateral root of median.",
          "Long thoracic nerve (C5–C7) injury → winged scapula from serratus anterior palsy.",
        ],
        highYield:
          "Winged scapula + medial border lift = long thoracic nerve. Add Horner's and the lesion is lower trunk / T1.",
      },
      {
        id: "inguinal-canal",
        title: "Inguinal canal and hernia anatomy",
        minutes: 6,
        summary:
          "A 4 cm oblique passage with 4 walls. Hesselbach's triangle (inguinal ligament, rectus sheath, inferior epigastric vessels) defines direct hernias.",
        points: [
          "Indirect hernia: lateral to inferior epigastric artery, through deep ring, congenital.",
          "Direct hernia: medial to inferior epigastric artery, through Hesselbach's triangle, acquired.",
          "Anterior wall: external oblique aponeurosis; posterior wall: transversalis fascia + conjoint tendon.",
        ],
        highYield: "Lateral to inferior epigastric vessels = indirect. Medial = direct. Nothing else decides it.",
      },
    ],
  },
  {
    slug: "physiology",
    subject: "Physiology",
    icon: "monitor_heart",
    image: physiologyImg,
    blurb: "Cardiac cycle, pressure–volume loops, acid–base — number-driven concepts with easy marks.",
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
          "Aortic stenosis: tall narrow loop. Mitral regurgitation: loses isovolumetric contraction phase.",
        ],
        highYield: "Loss of the isovolumetric contraction segment on the PV loop = mitral regurgitation.",
      },
      {
        id: "acid-base",
        title: "Acid–base: a 4-step read",
        minutes: 6,
        summary:
          "Read pH → primary disorder, then check the compensating variable, then compute the expected compensation, then check the anion gap.",
        points: [
          "Winter's formula: expected pCO₂ = 1.5 × HCO₃⁻ + 8 ± 2 in metabolic acidosis.",
          "Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻); high gap → MUDPILES.",
          "Delta ratio > 2 suggests a coexisting metabolic alkalosis.",
        ],
        highYield: "Measured pCO₂ above the Winter's estimate means an added respiratory acidosis.",
      },
    ],
  },
  {
    slug: "biochemistry",
    subject: "Biochemistry",
    icon: "science",
    image: biochemistryImg,
    blurb: "Rate-limiting enzymes, vitamin deficiencies and inborn errors — pure recall points.",
    concepts: [
      {
        id: "rate-limiting",
        title: "Rate-limiting enzymes worth memorising",
        minutes: 5,
        summary: "Most metabolism questions reduce to naming the committed step and its regulator.",
        points: [
          "Glycolysis: phosphofructokinase-1 (activated by F-2,6-BP, AMP).",
          "Gluconeogenesis: fructose-1,6-bisphosphatase.",
          "Cholesterol synthesis: HMG-CoA reductase (statin target).",
          "Heme synthesis: ALA synthase (mitochondrial, B6-dependent).",
          "Urea cycle: carbamoyl phosphate synthetase I (activated by N-acetylglutamate).",
        ],
        highYield: "Lead poisoning inhibits ALA dehydratase and ferrochelatase → basophilic stippling.",
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
        highYield: "Neurological signs distinguish B12 from folate deficiency — both give a macrocytic anaemia.",
      },
    ],
  },
  {
    slug: "pharmacology",
    subject: "Pharmacology",
    icon: "medication",
    image: pharmacologyImg,
    blurb: "Receptor pharmacology, antidotes and drug-of-choice tables.",
    concepts: [
      {
        id: "receptors",
        title: "Autonomic receptors and their second messengers",
        minutes: 6,
        summary: "Kinetics questions collapse into knowing which G-protein is coupled where.",
        points: [
          "α1 → Gq → IP3/DAG → vasoconstriction, mydriasis.",
          "α2 → Gi → ↓cAMP → presynaptic inhibition, central sympatholysis (clonidine).",
          "β1 → Gs → ↑cAMP → heart rate, contractility, renin.",
          "β2 → Gs → bronchodilation, uterine relaxation, skeletal muscle vasodilation.",
          "M2 → Gi (cardiac slowing); M1/M3 → Gq.",
        ],
        highYield: "Reflex bradycardia after phenylephrine; no reflex change after a pure β1 agonist.",
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
          "Methanol / ethylene glycol: fomepizole (preferred over ethanol).",
        ],
        highYield: "Pralidoxime reactivates cholinesterase only before ageing of the enzyme — give it early.",
      },
    ],
  },
  {
    slug: "pathology",
    subject: "Pathology",
    icon: "biotech",
    image: pathologyImg,
    blurb: "Cell injury, inflammation and neoplasia — the framework every clinical subject borrows.",
    concepts: [
      {
        id: "cell-injury",
        title: "Reversible vs irreversible cell injury",
        minutes: 6,
        summary:
          "The dividing line is mitochondrial permeability and membrane integrity, not swelling or blebbing.",
        points: [
          "Reversible: cellular swelling, blebs, ribosomal detachment, chromatin clumping.",
          "Irreversible: mitochondrial vacuolisation, lysosomal rupture, membrane defects.",
          "Coagulative necrosis everywhere except brain (liquefactive) and TB (caseous).",
          "Apoptosis is ATP-dependent and does not incite inflammation.",
        ],
        highYield: "Reperfusion injury is oxygen-radical and calcium mediated, worsening the initial infarct.",
      },
      {
        id: "neoplasia",
        title: "Tumour markers and paraneoplastic pairs",
        minutes: 7,
        summary: "Markers are for monitoring, not screening — except a few.",
        points: [
          "AFP: hepatocellular carcinoma, non-seminomatous germ cell tumours.",
          "CA-125: ovarian epithelial cancer; CA-19-9: pancreatic.",
          "SIADH and Cushing's from small cell lung cancer; PTH-rp from squamous cell.",
          "Calcitonin: medullary thyroid carcinoma (RET, MEN2).",
        ],
        highYield: "Hypercalcaemia + squamous lung mass = PTH-related peptide, with suppressed real PTH.",
      },
    ],
  },
  {
    slug: "medicine",
    subject: "Medicine",
    icon: "stethoscope",
    image: medicineImg,
    blurb: "ECG reads, sepsis bundles and endocrine algorithms in vignette form.",
    concepts: [
      {
        id: "stemi",
        title: "Reading a STEMI and localising the vessel",
        minutes: 8,
        summary:
          "ST elevation in contiguous leads with reciprocal depression. Lead groups map to coronary territories.",
        points: [
          "II, III, aVF → inferior → right coronary artery (check for RV involvement and avoid nitrates).",
          "V1–V4 → anteroseptal → left anterior descending.",
          "I, aVL, V5–V6 → lateral → left circumflex.",
          "Tall R with ST depression in V1–V2 → posterior infarct.",
        ],
        highYield: "Inferior MI with hypotension after nitrates suggests RV infarction — give fluids.",
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
          "Subclinical: abnormal TSH with normal free T4.",
        ],
        highYield: "In pregnancy, treat overt hypothyroidism immediately — levothyroxine needs rise ~30%.",
      },
    ],
  },
];

export function getModule(slug: string) {
  return LEARN_MODULES.find((m) => m.slug === slug);
}
