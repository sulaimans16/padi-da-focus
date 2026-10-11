import type { LearnModule } from "../learn";

export const medicine: LearnModule = {
  slug: "medicine",
  group: "Clinical",
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
};
