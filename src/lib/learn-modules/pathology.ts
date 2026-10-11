import type { LearnModule } from "../learn";

export const pathology: LearnModule = {
  slug: "pathology",
  group: "Para-clinical",
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
};
