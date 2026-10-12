import type { LearnModule } from "../../learn";

export const humanPhysiology: LearnModule = {
  slug: "human-physiology",
  group: "Biology",
  subject: "Zoology",
  title: "Human Physiology",
  icon: "cardiology",
  blurb:
    "Breathing and gas transport, blood and the heart, the nephron and its hormonal control, muscle contraction and joints, nerve impulse and brain, and the endocrine glands with their hormones.",
  objectives: [
    "Learner can calculate respiratory capacities from volumes and explain the oxygen dissociation curve and the control of breathing.",
    "Learner can describe blood composition, blood groups, coagulation, the cardiac cycle and the ECG.",
    "Learner can trace filtrate through the nephron and explain the counter-current mechanism and ADH, RAAS and ANF control.",
    "Learner can explain the sliding filament theory and classify joints and skeletal disorders.",
    "Learner can explain resting and action potentials, synaptic transmission, the parts of the brain and the source, action and disorders of each hormone.",
  ],
  concepts: [
    {
      id: "breathing-and-volumes",
      title: "Mechanism of breathing and respiratory volumes",
      minutes: 7,
      summary:
        "Breathing works by changing the volume of the thoracic cavity, which changes intra-pulmonary pressure; spirometry measures the volumes and capacities moved.",
      examFocus:
        "Muscles of inspiration, TV/IRV/ERV/RV values, deriving VC, FRC, IC and TLC, and why RV cannot be measured by a spirometer.",
      mechanism:
        "Air moves only down a pressure gradient. During inspiration the diaphragm contracts and flattens and the external intercostal muscles lift the ribs and sternum, enlarging the thorax in the antero-posterior and dorso-ventral axes; the lungs follow, intra-pulmonary pressure falls below atmospheric and air flows in. Expiration is normally passive: the muscles relax, the thorax and lungs recoil, pressure rises above atmospheric and air leaves. Additional abdominal muscles can increase the force of both phases. Some air always stays in the lungs even after forcible expiration (the residual volume), which is why total lung capacity exceeds vital capacity and why RV cannot be read from a spirometer.",
      points: [
        "A healthy human breathes 12–16 times per minute.",
        "Tidal volume (TV): about 500 mL; a healthy man inspires or expires about 6000–8000 mL per minute.",
        "Inspiratory reserve volume (IRV): 2500–3000 mL. Expiratory reserve volume (ERV): 1000–1100 mL. Residual volume (RV): 1100–1200 mL.",
        "Inspiratory capacity (IC) = TV + IRV. Expiratory capacity (EC) = TV + ERV.",
        "Functional residual capacity (FRC) = ERV + RV.",
        "Vital capacity (VC) = ERV + TV + IRV: the maximum volume breathed out after a forced inspiration.",
        "Total lung capacity (TLC) = RV + ERV + TV + IRV, i.e. VC + RV.",
        "Disorders: asthma (inflammation of bronchi and bronchioles causing wheezing), emphysema (alveolar walls damaged, mainly by cigarette smoking), occupational respiratory disorders (fibrosis from dust in grinding or stone-breaking industries).",
      ],
      formulae: [
        { label: "Vital capacity", expr: "VC = IRV + TV + ERV" },
        { label: "Functional residual capacity", expr: "FRC = ERV + RV" },
        { label: "Total lung capacity", expr: "TLC = VC + RV" },
      ],
      flow: {
        title: "Inspiration",
        steps: [
          {
            label: "Diaphragm and external intercostals contract",
            detail: "Ribs and sternum lifted, diaphragm flattened",
          },
          { label: "Thoracic volume increases", detail: "Antero-posterior and dorso-ventral axes" },
          { label: "Pulmonary volume increases", detail: "Lungs follow the chest wall" },
          {
            label: "Intra-pulmonary pressure falls below atmospheric",
            detail: "Negative pressure in lungs",
          },
          { label: "Air rushes in", detail: "Expiration reverses this when muscles relax" },
        ],
      },
      pitfalls: [
        "Residual volume cannot be measured by simple spirometry, so FRC and TLC also cannot be measured directly that way.",
        "Normal expiration is passive; the internal intercostals and abdominal muscles act only in forced breathing.",
      ],
      vignette: {
        stem: "A spirometer shows TV 500 mL, IRV 2500 mL and ERV 1000 mL; the subject's RV is 1200 mL.",
        answer: "VC = 4000 mL; TLC = 5200 mL; FRC = 2200 mL.",
        reasoning:
          "VC = IRV + TV + ERV = 2500 + 500 + 1000 = 4000 mL; TLC = VC + RV = 5200 mL; FRC = ERV + RV = 1000 + 1200 = 2200 mL.",
      },
      highYield:
        "TV 500, IRV 2500–3000, ERV 1000–1100, RV 1100–1200 mL. VC = IRV + TV + ERV. FRC = ERV + RV.",
      checks: [
        {
          q: "Functional residual capacity equals:",
          options: ["TV + ERV", "ERV + RV", "TV + IRV", "IRV + ERV"],
          answer: 1,
          why: "FRC is the air left in the lungs after a normal expiration: ERV + RV.",
        },
        {
          q: "Inspiration begins when:",
          options: [
            "Intra-pulmonary pressure rises above atmospheric",
            "Diaphragm relaxes and domes up",
            "Diaphragm and external intercostal muscles contract",
            "Internal intercostal muscles contract",
          ],
          answer: 2,
          why: "Their contraction enlarges the thorax, lowering intra-pulmonary pressure so air flows in.",
        },
      ],
    },
    {
      id: "gas-transport",
      title: "Exchange, transport and regulation of gases",
      minutes: 8,
      summary:
        "Gases move by diffusion down partial pressure gradients; oxygen travels mainly as oxyhaemoglobin, carbon dioxide mainly as bicarbonate, and breathing is set by the medulla and pons.",
      examFocus:
        "Partial pressure values, percentage of O2 and CO2 carried in each form, factors that shift the dissociation curve, and the role of CO2/H⁺ vs O2 in regulation.",
      mechanism:
        "Each gas diffuses from where its partial pressure is higher to where it is lower, so O2 moves from alveoli (104 mm Hg) into blood and CO2 from blood (45 mm Hg) into alveoli (40 mm Hg). CO2 crosses the membrane more readily because it is 20–25 times more soluble than O2. Haemoglobin's binding of O2 depends on conditions: in the alveoli, high pO2, low pCO2, low H⁺ and lower temperature favour oxyhaemoglobin formation, while in tissues the reverse conditions (low pO2, high pCO2, high H⁺, higher temperature) favour release. Plotting saturation against pO2 gives a sigmoid curve. Because the chemosensitive area of the medulla responds to CO2 and H⁺, rising CO2 is the main drive for breathing; oxygen's role in regulating rhythm is insignificant.",
      points: [
        "Partial pressures (mm Hg): atmosphere O2 159, CO2 0.3; alveoli O2 104, CO2 40; deoxygenated blood O2 40, CO2 45; oxygenated blood O2 95, CO2 40; tissues O2 40, CO2 45.",
        "Diffusion membrane has three layers: thin squamous alveolar epithelium, endothelium of alveolar capillaries, and the basement substance between them; total thickness much less than a millimetre.",
        "About 97% of O2 is carried by RBCs as oxyhaemoglobin; about 3% dissolved in plasma. Each haemoglobin can carry up to four O2 molecules.",
        "Every 100 mL of oxygenated blood delivers about 5 mL of O2 to tissues under normal physiological conditions.",
        "CO2: 20–25% as carbamino-haemoglobin, about 70% as bicarbonate, about 7% dissolved in plasma. Every 100 mL of deoxygenated blood delivers about 4 mL of CO2 to the alveoli.",
        "Carbonic anhydrase in RBCs (and in small amounts in plasma) catalyses CO2 + H2O ⇌ H2CO3 ⇌ HCO3⁻ + H⁺ in both directions.",
        "Respiratory rhythm centre: medulla. Pneumotaxic centre: pons — moderates the rhythm centre and can reduce the duration of inspiration. Chemosensitive area beside the rhythm centre senses CO2 and H⁺; receptors in the aortic arch and carotid artery also respond.",
      ],
      table: {
        title: "Shifting oxyhaemoglobin formation",
        columns: ["Factor", "Alveoli (binding favoured)", "Tissues (release favoured)"],
        rows: [
          ["pO2", "High", "Low"],
          ["pCO2", "Low", "High"],
          ["H⁺ concentration", "Low", "High"],
          ["Temperature", "Lower", "Higher"],
        ],
      },
      pitfalls: [
        "Oxygen is not the main chemical regulator of breathing; the role of O2 in regulating respiratory rhythm is quite insignificant.",
        "The pneumotaxic centre is in the pons, not the medulla.",
      ],
      vignette: {
        stem: "During vigorous exercise a runner's muscles produce more CO2 and heat and their pH falls.",
        answer: "Haemoglobin unloads more oxygen in the muscles, and breathing rate rises.",
        reasoning:
          "High pCO2, high H⁺ and higher temperature favour dissociation of oxyhaemoglobin; the rising CO2 and H⁺ stimulate the medullary chemosensitive area.",
      },
      highYield:
        "O2: 97% as HbO2, 3% plasma. CO2: 20–25% carbamino-Hb, 70% bicarbonate, 7% plasma. Alveolar pO2 104, pCO2 40 mm Hg.",
      checks: [
        {
          q: "The major form in which CO2 is transported in blood is:",
          options: ["Dissolved in plasma", "Carbamino-haemoglobin", "Bicarbonate", "Carbonic acid"],
          answer: 2,
          why: "About 70% of CO2 is carried as bicarbonate formed with the help of carbonic anhydrase.",
        },
        {
          q: "The pneumotaxic centre is located in the:",
          options: ["Pons", "Medulla", "Hypothalamus", "Cerebellum"],
          answer: 0,
          why: "The pons pneumotaxic centre moderates the medullary rhythm centre.",
        },
      ],
    },
    {
      id: "blood-and-lymph",
      title: "Blood, blood groups, coagulation and lymph",
      minutes: 7,
      summary:
        "Blood is plasma (about 55%) plus formed elements (about 45%); ABO and Rh antigens decide compatibility, and coagulation converts fibrinogen to fibrin.",
      examFocus:
        "Counts of RBC, WBC, platelets; percentage of each WBC type; donor/recipient compatibility; erythroblastosis foetalis; the clotting cascade and Ca²⁺.",
      mechanism:
        "Blood group compatibility comes down to antigens on RBCs and the natural antibodies in plasma. A person makes antibodies against the A or B antigen they lack, so group O blood (no A or B antigens) can be given to anyone, while group AB plasma has no anti-A or anti-B and can receive any group. Rh works differently: an Rh-negative person forms anti-Rh antibodies only after exposure. If an Rh-negative mother carries an Rh-positive foetus, she is sensitised at the first delivery; in the next Rh-positive pregnancy her antibodies cross the placenta and destroy foetal RBCs (erythroblastosis foetalis), which is prevented by giving anti-Rh antibodies after the first delivery. Coagulation is a cascade: an injury activates thrombokinase, which converts prothrombin to thrombin, which converts soluble fibrinogen into a fibrin mesh; calcium ions are essential.",
      points: [
        "Plasma: 90–92% water, 6–8% proteins — fibrinogen (clotting), globulins (defence), albumins (osmotic balance). Serum is plasma without clotting factors.",
        "RBCs: 5–5.5 million per mm³; red bone marrow in adults; no nucleus in most mammals; biconcave; about 120 days lifespan; destroyed in the spleen (graveyard of RBCs). Haemoglobin 12–16 g per 100 mL.",
        "WBCs: 6000–8000 per mm³. Neutrophils 60–65%, eosinophils 2–3%, basophils 0.5–1%, lymphocytes 20–25%, monocytes 6–8%.",
        "Neutrophils and monocytes are phagocytic; basophils secrete histamine, serotonin and heparin; eosinophils resist infection and are associated with allergic reactions; B and T lymphocytes give immune responses.",
        "Platelets (thrombocytes): fragments of megakaryocytes; 1.5–3.5 lakh per mm³; release clotting factors.",
        "About 80% of humans are Rh-positive. Group O is the universal donor; group AB the universal recipient.",
        "Lymph (tissue fluid) has the same mineral distribution as plasma but fewer large proteins; lymphatic vessels return it to the major veins; lacteals in intestinal villi absorb fats.",
      ],
      table: {
        title: "ABO groups",
        columns: ["Group", "Antigen on RBC", "Antibody in plasma", "Can receive from"],
        rows: [
          ["A", "A", "anti-B", "A, O"],
          ["B", "B", "anti-A", "B, O"],
          ["AB", "A and B", "None", "AB, A, B, O"],
          ["O", "None", "anti-A and anti-B", "O"],
        ],
      },
      flow: {
        title: "Coagulation",
        steps: [
          { label: "Injury", detail: "Platelets and damaged tissue release factors" },
          { label: "Thrombokinase activated", detail: "Cascade of enzyme activations" },
          { label: "Prothrombin → thrombin", detail: "Ca²⁺ required" },
          {
            label: "Fibrinogen → fibrin",
            detail: "Fibrin threads trap formed elements into a clot",
          },
        ],
      },
      pitfalls: [
        "An Rh-negative mother's first Rh-positive baby is usually safe; the danger is in subsequent Rh-positive pregnancies.",
        "Neutrophils are the most abundant WBC, basophils the least — not lymphocytes and eosinophils.",
      ],
      vignette: {
        stem: "An Rh-negative woman delivers an Rh-positive child. Doctors give her an injection soon after delivery.",
        answer:
          "Anti-Rh antibodies, to prevent erythroblastosis foetalis in a later Rh-positive pregnancy.",
        reasoning:
          "The injected antibodies destroy foetal Rh antigens before the mother's immune system is sensitised.",
      },
      highYield:
        "Neutrophils 60–65% (most), basophils 0.5–1% (least). RBC life 120 days. O = universal donor, AB = universal recipient. Clotting needs Ca²⁺.",
      checks: [
        {
          q: "Which WBC secretes histamine, serotonin and heparin?",
          options: ["Neutrophil", "Monocyte", "Eosinophil", "Basophil"],
          answer: 3,
          why: "Basophils release these mediators involved in inflammation.",
        },
        {
          q: "A person of blood group B has in their plasma:",
          options: [
            "anti-A antibodies",
            "anti-B antibodies",
            "No antibodies",
            "Both anti-A and anti-B",
          ],
          answer: 0,
          why: "Group B RBCs carry antigen B, so plasma has antibodies against the missing antigen A.",
        },
      ],
    },
    {
      id: "heart-cardiac-cycle-ecg",
      title: "Heart, cardiac cycle and ECG",
      minutes: 8,
      summary:
        "The human heart has four chambers and its own pacemaker; one cardiac cycle takes 0.8 s, and the ECG records the waves of depolarisation and repolarisation.",
      examFocus:
        "Conducting system order, events and duration of the cardiac cycle, origin of heart sounds, ECG waves, double circulation and neural/hormonal control.",
      mechanism:
        "Human cardiac muscle is myogenic: the sino-atrial node (SAN) in the upper right atrium generates the maximum number of action potentials, 70–75 per minute, so it sets the heart rate as the pacemaker. The impulse spreads across the atria (atrial systole) and reaches the atrio-ventricular node (AVN), from where the AV bundle (bundle of His), its branches and the Purkinje fibres carry it through the ventricles. During ventricular systole rising pressure snaps the tricuspid and bicuspid valves shut (first sound, lub) and opens the semilunar valves; as the ventricles relax, the semilunar valves close (second sound, dub). The ECG is a surface recording of these electrical events: P for atrial depolarisation, QRS for ventricular depolarisation and T for ventricular repolarisation.",
      points: [
        "Heart is mesodermal, lies in the thoracic cavity between the lungs, slightly tilted left, enclosed in a double-walled pericardium.",
        "Valves: tricuspid between right atrium and ventricle; bicuspid (mitral) between left atrium and ventricle; semilunar valves at the openings of the pulmonary artery and aorta.",
        "Cardiac cycle: 0.8 s at 72 beats per minute; stroke volume about 70 mL; cardiac output = stroke volume × heart rate ≈ 5000 mL (5 L) per minute.",
        "Heart sounds: lub — closure of tricuspid and bicuspid valves; dub — closure of semilunar valves.",
        "ECG: P wave = atrial depolarisation (excitation); QRS = ventricular depolarisation (starts ventricular contraction); T wave = return of ventricles from excited to normal (repolarisation); end of T marks end of systole. Counting QRS complexes in a period gives heart rate.",
        "Double circulation: pulmonary (right ventricle → pulmonary artery → lungs → pulmonary veins → left atrium) and systemic (left ventricle → aorta → tissues → venae cavae → right atrium).",
        "Hepatic portal system carries blood from the intestine to the liver before systemic circulation; the coronary system supplies heart muscle.",
        "Control: neural centres in the medulla oblongata; sympathetic nerves and adrenal medullary hormones increase rate and output; parasympathetic nerves decrease them.",
      ],
      formulae: [
        {
          label: "Cardiac output",
          expr: "Cardiac output = stroke volume × heart rate ≈ 70 mL × 72/min ≈ 5 L/min",
        },
      ],
      flow: {
        title: "Conducting system",
        steps: [
          { label: "SA node", detail: "Pacemaker, 70–75 impulses per minute" },
          { label: "Atrial walls", detail: "Atrial systole, P wave" },
          { label: "AV node", detail: "Lower left corner of right atrium near AV septum" },
          {
            label: "Bundle of His",
            detail: "Passes through AV septum, divides into right and left bundles",
          },
          { label: "Purkinje fibres", detail: "Ventricular systole, QRS complex" },
        ],
      },
      pitfalls: [
        "The T wave is ventricular repolarisation; atrial repolarisation is not shown as a separate NCERT wave.",
        "The first heart sound lub is AV valve closure, not semilunar valve opening.",
      ],
      vignette: {
        stem: "An ECG strip shows 75 QRS complexes in one minute and normal P and T waves.",
        answer: "Heart rate 75 beats per minute, in normal sinus rhythm.",
        reasoning:
          "Each QRS marks one ventricular depolarisation, so counting QRS complexes per minute gives the rate; preceding P waves show the SAN is driving it.",
      },
      highYield:
        "SAN = pacemaker (70–75/min). Cardiac cycle 0.8 s, stroke volume 70 mL, cardiac output 5 L/min. P atrial depolarisation, QRS ventricular depolarisation, T ventricular repolarisation.",
      checks: [
        {
          q: "The QRS complex of an ECG represents:",
          options: [
            "Atrial depolarisation",
            "Ventricular depolarisation",
            "Ventricular repolarisation",
            "Atrial repolarisation",
          ],
          answer: 1,
          why: "QRS marks depolarisation of the ventricles that initiates their contraction.",
        },
        {
          q: "The second heart sound 'dub' is due to closure of:",
          options: ["Tricuspid valve", "Bicuspid valve", "Both AV valves", "Semilunar valves"],
          answer: 3,
          why: "Dub follows ventricular systole when the semilunar valves close.",
        },
      ],
    },
    {
      id: "nephron-and-urine-formation",
      title: "Nephron, urine formation and its regulation",
      minutes: 9,
      summary:
        "Urine forms in three steps — glomerular filtration, reabsorption and secretion — the counter-current mechanism concentrates it up to about four times the filtrate, and ADH, RAAS and ANF regulate it.",
      examFocus:
        "GFR and daily volumes, permeability of the limbs of Henle's loop, the 300 → 1200 mOsmol/L medullary gradient, and the triggers and actions of ADH, RAAS and ANF.",
      mechanism:
        "Blood pressure in the glomerulus forces plasma through three layers — the glomerular capillary endothelium, the epithelium of Bowman's capsule (podocytes with filtration slits) and the basement membrane between them — so everything except plasma proteins and cells enters the filtrate. Because about 180 L of filtrate forms daily while only 1–1.5 L of urine is passed, nearly 99% must be reabsorbed. The two limbs of Henle's loop run in opposite directions with different permeability: the descending limb lets water out but not electrolytes, while the ascending limb pumps electrolytes out but holds water back. This counter-current flow, together with the vasa recta and urea cycling from the collecting duct, builds an osmotic gradient from 300 mOsmol/L in the cortex to about 1200 mOsmol/L in the inner medulla, which draws water out of the collecting duct. How much water actually leaves is set by hormones: ADH from the neurohypophysis increases water reabsorption when body fluid falls, and a fall in glomerular flow makes JG cells release renin, whose product angiotensin II raises blood pressure and triggers aldosterone. ANF from the atria does the opposite, dilating vessels and lowering blood pressure.",
      points: [
        "Ammonotelic: many bony fishes, aquatic amphibians, aquatic insects. Ureotelic: mammals, many terrestrial amphibians, marine fishes. Uricotelic: reptiles, birds, land snails, insects. Urea is made in the liver from ammonia.",
        "Each kidney has nearly one million nephrons. Cortical nephrons have short loops; juxtamedullary nephrons have very long loops; vasa recta is minute or absent in cortical nephrons.",
        "GFR in a healthy person ≈ 125 mL/min, i.e. 180 L/day; about 1.5 L of urine is excreted per day, carrying on average 25–30 g of urea.",
        "PCT: simple cuboidal brush-border epithelium; reabsorbs nearly all essential nutrients and 70–80% of electrolytes and water; secretes H⁺, ammonia and K⁺ and absorbs HCO3⁻.",
        "Henle's loop: descending limb permeable to water, almost impermeable to electrolytes; ascending limb impermeable to water, transports electrolytes. DCT: conditional reabsorption of Na⁺ and water. Collecting duct: large water reabsorption and passes small amounts of urea into the medullary interstitium.",
        "ADH (vasopressin), made in the hypothalamus and released from the neurohypophysis, increases water reabsorption from the later tubule; its deficiency causes diabetes insipidus.",
        "JGA (modified DCT and afferent arteriole) releases renin when glomerular blood flow, pressure or GFR falls → angiotensin II (vasoconstrictor) → aldosterone from adrenal cortex → Na⁺ and water reabsorption. ANF from the atria causes vasodilation and lowers BP, checking RAAS.",
        "Disorders: uremia (treated by haemodialysis with heparin as anticoagulant), renal calculi (crystallised salts such as oxalates), glomerulonephritis (inflammation of glomeruli); kidney transplantation is the ultimate treatment for kidney failure.",
      ],
      table: {
        title: "Segment by segment",
        columns: ["Segment", "Water", "Solutes"],
        rows: [
          [
            "PCT",
            "70–80% reabsorbed",
            "Nutrients and 70–80% electrolytes reabsorbed; H⁺, NH3, K⁺ secreted",
          ],
          ["Descending limb", "Permeable", "Almost impermeable — filtrate concentrates"],
          ["Ascending limb", "Impermeable", "Electrolytes transported out — filtrate dilutes"],
          ["DCT", "Conditional", "Na⁺, HCO3⁻ reabsorbed; H⁺, K⁺, NH3 secreted"],
          ["Collecting duct", "Large amounts reabsorbed", "Urea to interstitium; H⁺, K⁺ secreted"],
        ],
      },
      flow: {
        title: "Renin-angiotensin-aldosterone mechanism",
        steps: [
          { label: "Fall in glomerular blood flow, pressure or GFR", detail: "Sensed by JG cells" },
          { label: "Renin released", detail: "From JG cells" },
          {
            label: "Angiotensinogen → angiotensin I → angiotensin II",
            detail: "Angiotensin II is a powerful vasoconstrictor",
          },
          {
            label: "Adrenal cortex releases aldosterone",
            detail: "Na⁺ and water reabsorbed from distal tubule",
          },
          { label: "Blood pressure and GFR rise", detail: "ANF from atria opposes this" },
        ],
      },
      pitfalls: [
        "The descending limb is permeable to water and the ascending limb to electrolytes — swapping these is the classic error.",
        "ADH is made in the hypothalamus; the neurohypophysis only stores and releases it. ANF opposes RAAS rather than being part of it.",
      ],
      vignette: {
        stem: "A patient's filtrate leaving the ascending limb of Henle's loop is found to be hypotonic to plasma.",
        answer: "Normal — the ascending limb removes electrolytes but not water.",
        reasoning:
          "Because the ascending limb is impermeable to water but pumps out NaCl, the filtrate becomes progressively dilute as it rises to the cortex.",
      },
      highYield:
        "GFR 125 mL/min = 180 L/day; ~99% reabsorbed; medullary gradient 300 → 1200 mOsmol/L from NaCl and urea; ADH conserves water, RAAS raises BP, ANF lowers it.",
      checks: [
        {
          q: "Which part of the nephron is impermeable to water?",
          options: [
            "PCT",
            "Descending limb of Henle's loop",
            "Ascending limb of Henle's loop",
            "Collecting duct",
          ],
          answer: 2,
          why: "The ascending limb transports electrolytes but does not let water out.",
        },
        {
          q: "Atrial natriuretic factor causes:",
          options: [
            "Vasoconstriction",
            "Vasodilation and fall in blood pressure",
            "Release of renin",
            "Increased ADH release",
          ],
          answer: 1,
          why: "ANF dilates vessels and lowers blood pressure, acting as a check on the renin-angiotensin mechanism.",
        },
      ],
    },
    {
      id: "muscle-contraction-skeleton",
      title: "Muscle contraction, skeleton and joints",
      minutes: 9,
      summary:
        "Skeletal muscle shortens as actin filaments slide over myosin within each sarcomere, powered by ATP and switched on by calcium; bones and joints convert this into movement.",
      examFocus:
        "Bands that change in contraction, steps from neural signal to cross-bridge, roles of troponin and tropomyosin, bone counts, joint examples, and disorders.",
      mechanism:
        "A sarcomere, the unit between two Z lines, contains thin actin filaments anchored at the Z lines and thick myosin filaments in the centre. At rest troponin and tropomyosin mask the myosin-binding sites on actin. A motor neuron releases acetylcholine at the neuromuscular junction, generating an action potential that spreads along the sarcolemma and releases Ca²⁺ from the sarcoplasmic reticulum. Ca²⁺ binds troponin, unmasking the active sites, and the myosin head — already energised by hydrolysing ATP — binds actin to form a cross bridge and pulls the thin filaments towards the centre of the A band. The Z lines move closer, so the sarcomere and I band shorten while the A band length stays the same; a fresh ATP molecule then detaches the head, and the cycle repeats until Ca²⁺ is pumped back.",
      points: [
        "Light I band (isotropic) contains actin; dark A band (anisotropic) contains myosin; Z line bisects the I band; H zone is the central part of the A band without overlapping actin; M line holds thick filaments in the middle.",
        "Actin filament: two F-actin helically wound, each a polymer of G-actin; tropomyosin runs along it; troponin at intervals masks binding sites. Myosin filament: polymer of meromyosins, each with a globular head (heavy meromyosin, with ATPase and actin-binding sites) and a tail (light meromyosin).",
        "During contraction: I band and H zone shorten, sarcomere shortens, A band length is unchanged.",
        "Red fibres: rich in myoglobin and mitochondria, aerobic. White fibres: little myoglobin, fewer mitochondria, more sarcoplasmic reticulum, anaerobic. Lactic acid accumulation in repeated activation causes fatigue.",
        "Skeleton: 206 bones — axial 80 (skull, vertebral column, sternum, ribs), appendicular 126 (limbs and girdles). Skull 22 bones (8 cranial, 14 facial); 26 vertebrae (7 cervical); 12 pairs of ribs.",
        "Ribs 1–7 are true ribs (attached to sternum directly); 8, 9 and 10 are vertebrochondral (false) ribs; 11 and 12 are floating ribs.",
        "Joints: fibrous (flat skull bones, sutures), cartilaginous (between adjacent vertebrae), synovial: ball and socket (humerus and pectoral girdle), hinge (knee), pivot (atlas and axis), gliding (between carpals), saddle (carpal and metacarpal of thumb).",
        "Disorders: myasthenia gravis (autoimmune, affects neuromuscular junction), muscular dystrophy (genetic degeneration), tetany (rapid spasms from low Ca²⁺), arthritis, osteoporosis (age-related bone loss; decreased oestrogen is a common cause), gout (uric acid crystals in joints).",
      ],
      flow: {
        title: "From nerve to contraction",
        steps: [
          {
            label: "Acetylcholine released at neuromuscular junction",
            detail: "Action potential in sarcolemma",
          },
          {
            label: "Ca²⁺ released from sarcoplasmic reticulum",
            detail: "Rise in sarcoplasmic Ca²⁺",
          },
          { label: "Ca²⁺ binds troponin", detail: "Active sites on actin unmasked" },
          {
            label: "Energised myosin head binds actin",
            detail: "Cross bridge formed; ADP + Pi released",
          },
          {
            label: "Actin pulled to centre of A band",
            detail: "Z lines approach, sarcomere shortens",
          },
          { label: "New ATP binds myosin", detail: "Cross bridge broken; cycle repeats" },
        ],
      },
      pitfalls: [
        "The A band does not shorten during contraction; the I band and H zone do.",
        "Ca²⁺ binds troponin, not tropomyosin or myosin.",
      ],
      vignette: {
        stem: "A young woman has drooping eyelids and muscle weakness that worsens with use; tests show antibodies against her own neuromuscular junction receptors.",
        answer: "Myasthenia gravis.",
        reasoning:
          "It is an autoimmune disorder affecting the neuromuscular junction, leading to fatigue, weakening and paralysis of skeletal muscle.",
      },
      highYield:
        "In contraction I band and H zone shorten, A band constant. Ca²⁺ binds troponin. 206 bones: 80 axial + 126 appendicular. Atlas–axis = pivot; knee = hinge.",
      checks: [
        {
          q: "Joint between the carpal and metacarpal of the thumb is a:",
          options: ["Saddle joint", "Pivot joint", "Gliding joint", "Hinge joint"],
          answer: 0,
          why: "NCERT gives the thumb carpometacarpal joint as the example of a saddle joint.",
        },
        {
          q: "During muscle contraction, which remains unchanged in length?",
          options: ["I band", "H zone", "A band", "Sarcomere"],
          answer: 2,
          why: "Myosin filaments do not shorten; actin slides over them, so the A band keeps its length.",
        },
      ],
    },
    {
      id: "nerve-impulse-and-brain",
      title: "Nerve impulse, synapse and the brain",
      minutes: 8,
      summary:
        "Neurons keep a resting potential with the Na⁺-K⁺ pump, fire action potentials by Na⁺ influx, pass signals across synapses, and are organised into forebrain, midbrain and hindbrain.",
      examFocus:
        "Ionic basis of resting and action potentials, electrical vs chemical synapses, functions of brain parts, and somatic vs autonomic divisions.",
      mechanism:
        "At rest the axonal membrane is far more permeable to K⁺ than to Na⁺ and nearly impermeable to the negatively charged proteins inside; the sodium-potassium pump moves 3 Na⁺ out for every 2 K⁺ in. The result is a polarised membrane, positive outside and negative inside — the resting potential. A stimulus makes the membrane freely permeable to Na⁺ at that site; Na⁺ rushes in and the polarity reverses (inside positive), which is the action potential or nerve impulse. Local currents depolarise the next site, so the impulse travels along the axon, while behind it the rise in K⁺ permeability restores the resting potential. At a chemical synapse the impulse releases neurotransmitter from vesicles into the synaptic cleft; it binds receptors on the post-synaptic membrane, opening ion channels that may excite or inhibit the next neuron.",
      points: [
        "Neuron: cell body with Nissl's granules, dendrites (carry impulses towards cell body) and axon (carries impulses away to synaptic knobs). Types: multipolar (cerebral cortex), bipolar (retina), unipolar (embryonic stage).",
        "Myelinated fibres (spinal and cranial nerves) have Schwann cells forming a myelin sheath with nodes of Ranvier; non-myelinated fibres are found in autonomous and somatic neural systems.",
        "Resting potential: outside positive, inside negative (polarised); maintained by the Na⁺-K⁺ pump (3 Na⁺ out, 2 K⁺ in).",
        "Action potential: rapid Na⁺ influx reverses polarity; repolarisation by K⁺ diffusing out restores resting state.",
        "Electrical synapse: membranes very close, impulse passes directly, faster, rare in humans. Chemical synapse: synaptic cleft and neurotransmitters (e.g. acetylcholine).",
        "Forebrain: cerebrum (hemispheres joined by corpus callosum; cerebral cortex is grey matter with motor, sensory and association areas), thalamus (major relay for sensory and motor signals), hypothalamus (body temperature, urge for eating and drinking, neurosecretory cells making hypothalamic hormones).",
        "Limbic system (amygdala, hippocampus, with hypothalamus) regulates sexual behaviour and expression of emotional reactions. Midbrain: corpora quadrigemina. Hindbrain: pons, cerebellum (very convoluted surface for more neurons), medulla (respiration, cardiovascular reflexes, gastric secretions). Brain stem = midbrain + pons + medulla.",
        "PNS: somatic neural system (CNS to skeletal muscles) and autonomic neural system (CNS to involuntary organs and smooth muscles), the latter divided into sympathetic and parasympathetic. The visceral nervous system is the part of the PNS linking CNS and viscera.",
      ],
      flow: {
        title: "Impulse conduction",
        steps: [
          { label: "Resting membrane", detail: "Outside +, inside −; Na⁺-K⁺ pump" },
          { label: "Stimulus at site A", detail: "Membrane becomes freely permeable to Na⁺" },
          { label: "Depolarisation", detail: "Na⁺ influx; inside +, outside − (action potential)" },
          { label: "Local current to site B", detail: "Next site depolarises; impulse propagates" },
          {
            label: "Repolarisation at site A",
            detail: "K⁺ diffuses out; resting potential restored",
          },
        ],
      },
      pitfalls: [
        "Resting membrane is more permeable to K⁺ than Na⁺; the action potential is driven by Na⁺ entry, repolarisation by K⁺ exit.",
        "Hypothalamus, not thalamus, controls temperature, hunger and thirst; the thalamus is the relay centre.",
      ],
      vignette: {
        stem: "A drug blocks the Na⁺-K⁺ pump in an isolated nerve for several hours.",
        answer:
          "The resting potential gradually runs down and the nerve fails to conduct impulses.",
        reasoning:
          "The pump maintains the ionic gradients (3 Na⁺ out, 2 K⁺ in) on which both the resting potential and the Na⁺ influx of the action potential depend.",
      },
      highYield:
        "Resting: outside +, inside −. Action potential = Na⁺ influx. Corpus callosum joins hemispheres; corpora quadrigemina in midbrain; brain stem = midbrain + pons + medulla.",
      checks: [
        {
          q: "During the action potential, the axonal membrane becomes highly permeable to:",
          options: ["K⁺", "Na⁺", "Cl⁻", "Ca²⁺"],
          answer: 1,
          why: "Rapid influx of Na⁺ reverses the polarity at the stimulated site.",
        },
        {
          q: "Corpora quadrigemina are part of the:",
          options: ["Forebrain", "Hindbrain", "Midbrain", "Spinal cord"],
          answer: 2,
          why: "The dorsal midbrain has four round swellings called corpora quadrigemina.",
        },
      ],
    },
    {
      id: "endocrine-system",
      title: "Endocrine glands, hormones and mechanism of action",
      minutes: 9,
      summary:
        "Endocrine glands release hormones into blood; the hypothalamus-pituitary axis controls many of them, and hormones act through membrane receptors with second messengers or intracellular receptors that alter genes.",
      examFocus:
        "Source of each hormone, hyper- and hypo-secretion disorders, hypothalamic control of pituitary, and protein vs steroid mechanism of action.",
      mechanism:
        "Hormones are non-nutrient chemicals produced in trace amounts that act as intercellular messengers, and each acts only on target cells carrying its specific receptor. Hormones that cannot cross the plasma membrane — peptides, polypeptides, proteins and amino-acid derivatives such as adrenaline — bind receptors on the cell surface and work through second messengers such as cyclic AMP, IP3 and Ca²⁺, which change existing enzyme activity. Lipid-soluble hormones — steroids and iodothyronines (thyroid hormones) — enter the cell and bind intracellular (mostly nuclear) receptors; the hormone-receptor complex interacts with the genome to change gene expression. Much of the system is hierarchical: hypothalamic releasing and inhibiting hormones, carried by the hypophyseal portal system, control the anterior pituitary, whose tropic hormones control the thyroid, adrenal cortex and gonads.",
      points: [
        "Hypothalamus: releasing hormones (e.g. GnRH stimulates pituitary gonadotrophins) and inhibiting hormones (e.g. somatostatin inhibits growth hormone release).",
        "Adenohypophysis — pars distalis: GH, PRL, TSH, ACTH, LH, FSH; pars intermedia: MSH. Neurohypophysis (pars nervosa) stores and releases oxytocin and vasopressin made by the hypothalamus.",
        "GH: excess in childhood → gigantism, deficiency → pituitary dwarfism, excess in adults → acromegaly. Low ADH → diabetes insipidus. Oxytocin contracts uterine muscle at birth and ejects milk.",
        "Pineal: melatonin — diurnal rhythm, sleep-wake cycle, body temperature. Thyroid: T4 and T3 (need iodine) — basal metabolic rate, RBC formation; thyrocalcitonin (TCT) lowers blood Ca²⁺. Hypothyroidism in pregnancy → stunted growth (cretinism) and mental retardation in the baby; exophthalmic goitre (Graves' disease) is hyperthyroidism.",
        "Parathyroid: PTH raises blood Ca²⁺ (hypercalcaemic) by bone resorption and increased renal and intestinal Ca²⁺ uptake. Thymus: thymosins for T-lymphocyte differentiation; degenerates in old age.",
        "Adrenal medulla: adrenaline and noradrenaline (catecholamines, emergency hormones) — raise heart rate, alertness, glycogenolysis. Adrenal cortex: zona glomerulosa (outer), fasciculata (middle), reticularis (inner); glucocorticoids (cortisol), mineralocorticoids (aldosterone), small amounts of androgens. Deficiency of cortex hormones → Addison's disease.",
        "Pancreatic islets of Langerhans: α-cells secrete glucagon (hyperglycaemic), β-cells secrete insulin (hypoglycaemic); prolonged hyperglycaemia → diabetes mellitus.",
        "Testis: Leydig (interstitial) cells make androgens, mainly testosterone. Ovary: oestrogen from growing follicles, progesterone from the corpus luteum. Heart atria: ANF. Kidney JG cells: erythropoietin. GI tract: gastrin, secretin, cholecystokinin (CCK), gastric inhibitory peptide (GIP).",
      ],
      table: {
        title: "Mechanism of hormone action",
        columns: ["Feature", "Membrane-bound receptor", "Intracellular receptor"],
        rows: [
          [
            "Hormone types",
            "Peptides, proteins, amino-acid derivatives (adrenaline)",
            "Steroids, iodothyronines",
          ],
          ["Enters cell?", "No", "Yes"],
          [
            "Messenger",
            "Second messengers (cAMP, IP3, Ca²⁺)",
            "Hormone-receptor complex acts on genome",
          ],
          ["Effect", "Alters cell metabolism quickly", "Alters gene expression"],
        ],
      },
      pitfalls: [
        "Oxytocin and vasopressin are made in the hypothalamus; the posterior pituitary only releases them.",
        "Thyroid hormones are amino-acid derived but lipid-soluble and act on intracellular receptors, unlike adrenaline.",
      ],
      vignette: {
        stem: "A man in his forties notices his hands and jaw growing larger; tests show high growth hormone levels.",
        answer: "Acromegaly from adult GH excess.",
        reasoning:
          "Excess GH after growth plates close causes severe disfigurement, especially of the face, rather than gigantism.",
      },
      highYield:
        "PTH raises, TCT lowers blood Ca²⁺. Glucagon from α-cells, insulin from β-cells. Steroids and iodothyronines act on intracellular receptors; proteins via cAMP.",
      checks: [
        {
          q: "Which hormone acts through an intracellular receptor?",
          options: ["Insulin", "Adrenaline", "Glucagon", "Cortisol"],
          answer: 3,
          why: "Cortisol is a steroid; it enters the cell and its receptor complex alters gene expression.",
        },
        {
          q: "MSH is secreted by the:",
          options: ["Pars intermedia", "Pars distalis", "Pars nervosa", "Hypothalamus"],
          answer: 0,
          why: "The pars intermedia of the adenohypophysis secretes melanocyte stimulating hormone.",
        },
      ],
    },
  ],
};
