import type { LearnModule } from "../learn";

export const pathology: LearnModule = {
  slug: "pathology",
  group: "Para-clinical",
  subject: "Pathology",
  icon: "biotech",
  blurb:
    "Cell injury, granulomas, neoplasia, the peripheral smear, acute inflammation, bleeding disorders, amyloidosis and haematological cancers — the framework every clinical subject borrows.",
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
    "Sequence the vascular and cellular events of acute inflammation and name each mediator's role.",
    "Read PT, aPTT, bleeding time and platelet count to localise a bleeding disorder.",
    "Classify amyloid by precursor protein and recognise it on Congo red staining.",
    "Match leukaemias and lymphomas to their markers and translocations.",
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
        reasoning:
          "Reoxygenation of damaged mitochondria generates oxygen free radicals, and calcium overload activates degradative enzymes.",
      },
      highYield:
        "Reperfusion injury is oxygen-radical and calcium mediated, worsening the initial infarct.",
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
      summary:
        "An organised collection of epithelioid macrophages — the immune system's containment strategy.",
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
        reasoning:
          "The triad of hilar nodes, non-caseating granulomas and macrophage-driven hypercalcaemia is characteristic.",
      },
      highYield:
        "Screen for latent TB before any anti-TNF biologic — TNF maintains granuloma integrity.",
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
        reasoning:
          "PTH-rp is the classic squamous mediator; it suppresses native PTH through the calcium feedback loop.",
      },
      highYield:
        "Hypercalcaemia + squamous lung mass = PTH-related peptide, with suppressed real PTH.",
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
      summary:
        "Red cell shape is a diagnosis in itself — start from the MCV, then look at morphology.",
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
        reasoning:
          "Normal PT/aPTT excludes DIC; the pentad with ADAMTS13 deficiency defines TTP and mandates urgent plasma exchange.",
      },
      highYield: "Schistocytes with normal coagulation studies = TTP/HUS, not DIC.",
      figure: {
        file: "Sickle cell 01.jpg",
        caption: "Peripheral smear showing sickled erythrocytes",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "acute-inflammation",
      title: "Acute inflammation & mediators",
      minutes: 8,
      summary:
        "Acute inflammation brings fluid and neutrophils to injured tissue within minutes to hours, choreographed by mediators from mast cells, plasma and the leukocytes themselves.",
      examFocus:
        "Sequence of leukocyte recruitment and the adhesion molecules, the main mediators and their actions, and the classic phagocyte defects.",
      mechanism:
        "Histamine released from mast cells makes endothelial cells in post-capillary venules contract, opening gaps that let protein-rich fluid out — the swelling. Neutrophils then leave the bloodstream in steps: selectins slow them so they roll along the vessel wall, integrins bind them firmly, and they squeeze between endothelial cells (PECAM-1) towards chemical signals. Inside tissue they engulf microbes and kill them with a burst of reactive oxygen species made by NADPH oxidase — so defects at any step leave a recognisable immune deficiency.",
      points: [
        "Vascular: brief vasoconstriction → vasodilation (histamine, nitric oxide, PGI2) → increased permeability (endothelial contraction in venules is the commonest mechanism).",
        "Leukocyte steps: margination → rolling (E- and P-selectin with sialyl-Lewis X) → firm adhesion (integrins LFA-1/Mac-1 to ICAM-1) → transmigration (PECAM-1) → chemotaxis (C5a, LTB4, IL-8, bacterial peptides).",
        "Neutrophils dominate for the first 6–24 h; monocytes/macrophages take over by 24–48 h.",
        "Killing: NADPH oxidase respiratory burst → H2O2 → myeloperoxidase converts it to hypochlorous acid (the most efficient bactericidal system).",
        "Arachidonic acid products: PGE2 (fever, pain), PGI2 (vasodilation, inhibits platelets), TXA2 (vasoconstriction, platelet aggregation), LTB4 (chemotaxis), LTC4/D4/E4 (bronchospasm, permeability), lipoxins (stop inflammation).",
        "Cytokines IL-1, IL-6 and TNF cause fever and the acute-phase response; IL-8 recruits neutrophils.",
        "Complement: C3b opsonises, C3a and C5a are anaphylatoxins, C5a is chemotactic, C5b–9 forms the membrane attack complex.",
        "Defects: leukocyte adhesion deficiency type 1 (CD18) — delayed cord separation, no pus; chronic granulomatous disease (NADPH oxidase) — infections with catalase-positive organisms (Staph aureus, Aspergillus); Chédiak–Higashi (LYST) — giant granules, albinism, neuropathy.",
      ],
      flow: {
        title: "Neutrophil recruitment",
        steps: [
          { label: "Margination", detail: "Slower flow pushes cells to the vessel wall" },
          { label: "Rolling", detail: "Selectins ↔ sialyl-Lewis X" },
          { label: "Firm adhesion", detail: "Integrins (LFA-1) ↔ ICAM-1" },
          { label: "Transmigration", detail: "PECAM-1 (CD31) between endothelial cells" },
          {
            label: "Chemotaxis and phagocytosis",
            detail: "C5a, LTB4, IL-8; killing by oxidative burst",
          },
        ],
      },
      pitfalls: [
        "The nitroblue tetrazolium test is abnormal (no colour change) in chronic granulomatous disease; the modern test is dihydrorhodamine flow cytometry.",
        "Prostacyclin (PGI2) inhibits platelets; thromboxane A2 activates them — easily swapped.",
      ],
      mnemonic:
        "Interleukins 1–6: 'Hot T-Bone stEAK' — IL-1 fever (Hot), IL-2 T cells, IL-3 Bone marrow, IL-4 IgE, IL-5 IgA and eosinophils, IL-6 aKute-phase proteins.",
      vignette: {
        stem: "A 2-year-old boy has recurrent staphylococcal abscesses and a liver abscess due to Aspergillus. Dihydrorhodamine testing shows no oxidative burst.",
        answer: "Chronic granulomatous disease — NADPH oxidase defect.",
        reasoning:
          "Without the respiratory burst, neutrophils can't kill catalase-positive organisms, which destroy their own H2O2.",
      },
      highYield:
        "Rolling = selectins; adhesion = integrins/ICAM-1; transmigration = PECAM-1. Neutrophils first, macrophages by 48 h. MPO–H2O2–halide most potent. CGD = NADPH oxidase, catalase-positive organisms.",
      checks: [
        {
          q: "Firm adhesion of leukocytes to endothelium is mediated by:",
          options: ["Selectins", "Integrins", "PECAM-1", "Sialyl-Lewis X"],
          answer: 1,
          why: "Integrins on leukocytes bind ICAM-1 and VCAM-1 on activated endothelium.",
        },
        {
          q: "Delayed separation of the umbilical cord with no pus formation suggests a defect in:",
          options: ["NADPH oxidase", "CD18 integrin", "Myeloperoxidase", "Complement C3"],
          answer: 1,
          why: "Leukocyte adhesion deficiency type 1 stops neutrophils leaving vessels, so no pus forms.",
        },
      ],
    },
    {
      id: "haemostasis",
      title: "Bleeding disorders & coagulation tests",
      minutes: 8,
      summary:
        "Platelet problems cause mucosal bleeding and a long bleeding time; clotting factor problems cause deep bleeds and prolonged PT or aPTT. Four tests localise almost any disorder.",
      examFocus:
        "Which pathway PT and aPTT test, the pattern in haemophilia, von Willebrand disease, vitamin K deficiency, DIC and ITP, and mixing studies.",
      mechanism:
        "Primary haemostasis is the platelet plug: platelets stick to exposed collagen through von Willebrand factor (GpIb) and to each other through fibrinogen (GpIIb/IIIa). Defects here cause oozing from skin and mucosa and a long bleeding time. Secondary haemostasis is the coagulation cascade making fibrin; PT measures the extrinsic (factor VII) and common pathways, aPTT the intrinsic (XII, XI, IX, VIII) and common pathways. A factor deficiency causes deep bleeding into joints and muscles.",
      points: [
        "PT/INR: factor VII + common pathway — monitors warfarin. aPTT: XII, XI, IX, VIII + common pathway — monitors unfractionated heparin.",
        "Haemophilia A (factor VIII) and B (IX): X-linked; haemarthrosis; aPTT prolonged, PT and bleeding time normal.",
        "Von Willebrand disease (commonest inherited bleeding disorder, mostly autosomal dominant): mucosal bleeding, long bleeding time, aPTT may be long (vWF carries factor VIII); treat with desmopressin.",
        "Vitamin K deficiency and warfarin: factors II, VII, IX, X (and proteins C and S); PT prolongs first because factor VII has the shortest half-life.",
        "DIC: long PT and aPTT, low platelets and fibrinogen, high D-dimer, schistocytes on smear.",
        "ITP: low platelets only, normal PT and aPTT.",
        "Bernard–Soulier (GpIb): giant platelets, no agglutination with ristocetin. Glanzmann thrombasthenia (GpIIb/IIIa): normal count, no aggregation with ADP or collagen.",
        "Mixing study: if mixing with normal plasma corrects the aPTT → factor deficiency; if not → inhibitor (lupus anticoagulant, acquired factor VIII inhibitor).",
      ],
      table: {
        title: "Lab patterns",
        columns: ["Disorder", "Platelets", "BT", "PT", "aPTT"],
        rows: [
          ["Haemophilia A/B", "Normal", "Normal", "Normal", "↑"],
          ["von Willebrand", "Normal", "↑", "Normal", "Normal / ↑"],
          ["Vitamin K deficiency", "Normal", "Normal", "↑", "Normal / ↑"],
          ["ITP", "↓", "↑", "Normal", "Normal"],
          ["DIC", "↓", "↑", "↑", "↑"],
          ["Glanzmann", "Normal", "↑", "Normal", "Normal"],
        ],
      },
      pitfalls: [
        "Lupus anticoagulant prolongs aPTT in the lab but causes thrombosis, not bleeding.",
        "Haemophilia has a normal bleeding time — the platelet plug forms, but it isn't stabilised by fibrin.",
      ],
      vignette: {
        stem: "A 10-year-old boy has a swollen, painful knee after minor trauma. His maternal uncle had similar bleeds. Platelets, bleeding time and PT are normal; aPTT is prolonged and corrects on mixing.",
        answer: "Haemophilia (A or B) — check factor VIII and IX levels.",
        reasoning:
          "X-linked inheritance, haemarthrosis and an isolated aPTT that corrects with normal plasma point to an intrinsic factor deficiency.",
      },
      highYield:
        "PT = VII (warfarin); aPTT = intrinsic (heparin). Haemophilia: only aPTT ↑. vWD: BT ↑ ± aPTT ↑. DIC: everything abnormal + D-dimer. ITP: only platelets ↓. Mixing corrects = deficiency.",
      checks: [
        {
          q: "Isolated prolonged PT with normal aPTT suggests deficiency of factor:",
          options: ["VIII", "IX", "VII", "XII"],
          answer: 2,
          why: "Factor VII is the only factor tested by PT alone (extrinsic pathway).",
        },
        {
          q: "A prolonged aPTT that does NOT correct on mixing with normal plasma indicates:",
          options: [
            "Haemophilia A",
            "Factor IX deficiency",
            "A circulating inhibitor",
            "Vitamin K deficiency",
          ],
          answer: 2,
          why: "Normal plasma replaces missing factors; failure to correct means something is inhibiting them.",
        },
      ],
    },
    {
      id: "amyloidosis",
      title: "Amyloidosis",
      minutes: 7,
      summary:
        "Amyloid is misfolded protein laid down outside cells as rigid fibrils. Different precursor proteins give different diseases, but all stain the same way.",
      examFocus:
        "Congo red and apple-green birefringence, AL vs AA amyloid and their causes, dialysis-related amyloid, and the organ involvement pattern.",
      mechanism:
        "Normally folded proteins can misfold into β-pleated sheets that stack into insoluble fibrils. These resist breakdown, so they accumulate between cells and squeeze out normal tissue — stiffening the heart, leaking protein through the kidney and enlarging the tongue. The regular fibril structure lines up Congo red dye so that it bends polarised light, giving the diagnostic apple-green birefringence.",
      points: [
        "Stains: Congo red → pink-red on light microscopy, apple-green birefringence under polarised light. Electron microscopy: non-branching fibrils ~7.5–10 nm.",
        "AL (primary): immunoglobulin light chains (λ more than κ) from a plasma cell dyscrasia or myeloma — macroglossia, heart, kidney, periorbital purpura, carpal tunnel syndrome.",
        "AA (secondary): serum amyloid A in chronic inflammation — rheumatoid arthritis, tuberculosis, bronchiectasis, osteomyelitis, familial Mediterranean fever. Kidney is the main organ.",
        "Aβ2-microglobulin: long-term haemodialysis — carpal tunnel syndrome and joint disease.",
        "ATTR (transthyretin): mutant form → familial amyloid polyneuropathy; wild-type → senile cardiac amyloidosis.",
        "Localised: Aβ in Alzheimer's disease, amylin (IAPP) in type 2 diabetes islets, calcitonin in medullary carcinoma thyroid.",
        "Kidney is the commonest organ involved (nephrotic syndrome, large kidneys). Biopsy: abdominal fat pad aspirate (least invasive) or rectal biopsy.",
        "Heart: restrictive cardiomyopathy, low-voltage ECG despite thick walls, 'sparkling' myocardium on echo. Spleen: sago (follicles) or lardaceous (red pulp).",
      ],
      table: {
        title: "Types of amyloid",
        columns: ["Type", "Precursor", "Setting"],
        rows: [
          ["AL", "Light chains", "Myeloma, plasma cell dyscrasia"],
          ["AA", "Serum amyloid A", "Chronic inflammation"],
          ["Aβ2M", "β2-microglobulin", "Long-term haemodialysis"],
          ["ATTR", "Transthyretin", "Familial neuropathy; senile cardiac"],
          ["Aβ", "Amyloid precursor protein", "Alzheimer's disease"],
          ["A-Cal", "Calcitonin", "Medullary thyroid carcinoma"],
        ],
      },
      pitfalls: [
        "Apple-green birefringence needs polarised light — under ordinary light Congo red just looks pink-red.",
        "A thick-walled heart with a low-voltage ECG is amyloid until proved otherwise.",
      ],
      vignette: {
        stem: "A 65-year-old man has nephrotic-range proteinuria, a large tongue and bruising around the eyes. Serum shows a monoclonal λ light chain.",
        answer: "AL amyloidosis — confirm with fat pad aspirate and Congo red.",
        reasoning:
          "Macroglossia, periorbital purpura and renal involvement with a monoclonal light chain point to light-chain amyloid.",
      },
      highYield:
        "Congo red + polarised light = apple-green birefringence. AL = light chains (macroglossia). AA = chronic inflammation (kidney). β2M = dialysis. ATTR = neuropathy/senile heart. Fat pad aspirate.",
      checks: [
        {
          q: "Amyloid stained with Congo red shows what under polarised light?",
          options: [
            "Red fluorescence",
            "Apple-green birefringence",
            "Metachromasia",
            "Blue granules",
          ],
          answer: 1,
          why: "The aligned fibrils bend polarised light, producing apple-green birefringence.",
        },
        {
          q: "Amyloid in long-term haemodialysis patients is derived from:",
          options: ["Light chains", "Serum amyloid A", "β2-microglobulin", "Transthyretin"],
          answer: 2,
          why: "β2-microglobulin isn't filtered by standard dialysis membranes and accumulates.",
        },
      ],
    },
    {
      id: "leukaemia-lymphoma",
      title: "Leukaemias & lymphomas",
      minutes: 9,
      summary:
        "Haematological cancers are told apart by age, blood picture, cell markers and signature chromosomal translocations — many of which also guide targeted treatment.",
      examFocus:
        "ALL vs AML features, APL and DIC, CML and the Philadelphia chromosome, CLL smudge cells, hairy cell leukaemia, Reed–Sternberg cells, and NHL translocations.",
      mechanism:
        "Many translocations work by putting a growth gene next to a highly active promoter, or by fusing two genes into a constantly active protein. In Burkitt lymphoma c-MYC moves next to the immunoglobulin heavy-chain promoter on chromosome 14 and drives division; in follicular lymphoma BCL2 is placed there and blocks apoptosis, so cells accumulate slowly. In CML the BCR-ABL fusion creates a permanently switched-on tyrosine kinase — which is exactly what imatinib blocks.",
      points: [
        "ALL: commonest childhood cancer (peak 2–5 years); TdT-positive lymphoblasts, mostly B-cell (CD10, CD19). Good prognosis: age 1–10, t(12;21), hyperdiploidy. Poor: t(9;22), MLL (t(4;11)), infants. T-ALL: adolescent boys with a mediastinal mass.",
        "AML: adults; myeloperoxidase-positive blasts with Auer rods. Acute promyelocytic leukaemia t(15;17) PML-RARA → DIC; treat with all-trans retinoic acid and arsenic trioxide. Monocytic types infiltrate gums.",
        "CML: t(9;22) BCR-ABL (Philadelphia chromosome), massive splenomegaly, low LAP score, all stages of myeloid maturation; imatinib.",
        "CLL: elderly; smudge cells; CD5+, CD23+ B cells; hypogammaglobulinaemia, autoimmune haemolytic anaemia; Richter transformation to aggressive lymphoma.",
        "Hairy cell leukaemia: TRAP-positive, CD11c/CD103, BRAF V600E; splenomegaly, pancytopenia, dry tap; cladribine.",
        "Hodgkin lymphoma: Reed–Sternberg cells (CD15+, CD30+). Nodular sclerosis is the commonest type worldwide (lacunar cells); lymphocyte-depleted has the worst prognosis. Nodular lymphocyte-predominant: 'popcorn' cells, CD20+, CD15− CD30−.",
        "Non-Hodgkin: diffuse large B-cell is the commonest; Burkitt t(8;14) c-MYC with starry-sky pattern; follicular t(14;18) BCL2; mantle cell t(11;14) cyclin D1, CD5+ CD23−; gastric MALT lymphoma linked to H. pylori.",
      ],
      table: {
        title: "Translocations to know",
        columns: ["Translocation", "Gene", "Disease"],
        rows: [
          ["t(9;22)", "BCR-ABL", "CML (also poor-risk ALL)"],
          ["t(15;17)", "PML-RARA", "Acute promyelocytic leukaemia"],
          ["t(8;14)", "c-MYC", "Burkitt lymphoma"],
          ["t(14;18)", "BCL2", "Follicular lymphoma"],
          ["t(11;14)", "Cyclin D1", "Mantle cell lymphoma"],
          ["t(12;21)", "ETV6-RUNX1", "Good-prognosis childhood ALL"],
        ],
      },
      pitfalls: [
        "Both CLL and mantle cell lymphoma are CD5+; CD23 separates them (CLL positive, mantle cell negative).",
        "A leukaemoid reaction can mimic CML but has a high LAP score and no BCR-ABL.",
      ],
      vignette: {
        stem: "A 30-year-old presents with gum bleeding and bruises. Blood shows blasts with many Auer rods (faggot cells), low fibrinogen and high D-dimer.",
        answer: "Acute promyelocytic leukaemia, t(15;17) — start all-trans retinoic acid urgently.",
        reasoning:
          "Promyelocyte granules trigger DIC; ATRA makes the abnormal promyelocytes mature, reversing the coagulopathy.",
      },
      highYield:
        "ALL: children, TdT+. AML: Auer rods, MPO+. APL t(15;17) → DIC → ATRA. CML t(9;22) → imatinib. CLL: smudge cells, CD5+CD23+. Hairy cell: TRAP, BRAF. Hodgkin: RS cells CD15/CD30. Burkitt t(8;14), follicular t(14;18), mantle t(11;14).",
      checks: [
        {
          q: "Smudge cells on a peripheral smear are characteristic of:",
          options: ["AML", "CML", "CLL", "Hairy cell leukaemia"],
          answer: 2,
          why: "Fragile CLL lymphocytes rupture when the smear is made, leaving smudge cells.",
        },
        {
          q: "Follicular lymphoma is associated with:",
          options: ["t(8;14)", "t(14;18)", "t(11;14)", "t(9;22)"],
          answer: 1,
          why: "t(14;18) places BCL2 next to the heavy-chain promoter, blocking apoptosis.",
        },
      ],
    },
  ],
};
