import type { LearnModule } from "../learn";

export const medicine: LearnModule = {
  slug: "medicine",
  group: "Clinical",
  subject: "Medicine",
  icon: "stethoscope",
  blurb:
    "ECG, thyroid, pleural effusion, DKA, hyponatraemia, autoantibodies, cirrhosis and AKI — clinical algorithms in vignette form.",
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
    "Work up hyponatraemia by osmolality and volume status, and correct it safely.",
    "Match autoantibodies to the rheumatological and organ-specific diseases they mark.",
    "Manage the complications of cirrhosis — ascites, SBP, encephalopathy and variceal bleeding.",
    "Classify acute kidney injury and recognise the indications for urgent dialysis.",
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
        reasoning:
          "Clear lungs with raised JVP and preload sensitivity indicates RV involvement of an inferior infarct.",
      },
      highYield:
        "Inferior MI with hypotension after nitrates suggests RV infarction — give fluids.",
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
        reasoning:
          "Subclinical hypothyroidism with positive antibodies in pregnancy is treated because of fetal neurodevelopmental risk.",
      },
      highYield:
        "In pregnancy treat overt hypothyroidism immediately — levothyroxine requirements rise about 30%.",
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
      summary:
        "Light's criteria first; the differential and the next test follow from that single split.",
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
        reasoning:
          "pH below 7.2 with low glucose predicts loculation and failure of antibiotics alone.",
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
        reasoning:
          "Insulin drives potassium intracellularly and can precipitate arrhythmia in an already depleted patient.",
      },
      highYield:
        "Insulin waits for potassium above 3.3 mEq/L, and DKA is resolved when the anion gap closes.",
      figure: {
        file: "Renin-angiotensin system in man shadow.svg",
        caption: "Volume regulation pathways activated by the dehydration of DKA",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "hyponatraemia",
      title: "Hyponatraemia",
      minutes: 8,
      summary:
        "The commonest electrolyte disorder in hospital. Work it up through serum osmolality, urine osmolality and volume status — and correct it slowly to protect the brain.",
      examFocus:
        "Diagnostic criteria for SIADH, causes by volume status, emergency treatment with 3% saline, and the safe correction limit.",
      mechanism:
        "Serum sodium mostly reflects water balance, not total sodium. When ADH is secreted inappropriately, the kidney keeps water and dilutes the blood. Brain cells adapt to chronic low sodium over about 48 hours by shedding solutes so they don't swell. If sodium is then raised too quickly, water rushes out of these adapted cells and the pontine myelin is damaged — osmotic demyelination syndrome — which is why correction is capped.",
      points: [
        "Pseudohyponatraemia (normal osmolality): severe hyperlipidaemia or hyperproteinaemia. Hypertonic hyponatraemia: hyperglycaemia or mannitol pulls water out of cells.",
        "Urine osmolality < 100 mOsm/kg: primary polydipsia, beer potomania, low solute intake.",
        "Hypovolaemic: urine Na < 20 → extrarenal loss (vomiting, diarrhoea); urine Na > 20 → renal loss (diuretics, adrenal insufficiency, salt-wasting).",
        "Euvolaemic: SIADH, hypothyroidism, glucocorticoid deficiency.",
        "Hypervolaemic: heart failure, cirrhosis, nephrotic syndrome (urine Na low); advanced renal failure (urine Na high).",
        "SIADH: low serum osmolality, inappropriately concentrated urine (> 100), urine Na > 30–40, euvolaemia, normal thyroid, adrenal and renal function; low uric acid. Causes: small-cell lung cancer, CNS disease, pneumonia/TB, drugs (carbamazepine, SSRIs, cyclophosphamide, vincristine).",
        "SIADH treatment: fluid restriction; then tolvaptan (V2 antagonist), urea or demeclocycline.",
        "Severe symptoms (seizures, coma): 150 ml of 3% saline over 20 min, repeat as needed to raise sodium by 4–6 mmol/l. Limit correction to 8–10 mmol/l in 24 h.",
      ],
      flow: {
        title: "Hyponatraemia work-up",
        steps: [
          {
            label: "Serum osmolality",
            detail: "Normal → pseudo; high → glucose/mannitol; low → true hypotonic",
          },
          {
            label: "Urine osmolality",
            detail: "< 100 → polydipsia/low solute; > 100 → ADH acting",
          },
          { label: "Volume status", detail: "Hypo-, eu- or hypervolaemic" },
          { label: "Urine sodium", detail: "Separates renal from extrarenal losses" },
          { label: "Treat cause, correct slowly", detail: "≤ 8–10 mmol/l per 24 h" },
        ],
      },
      pitfalls: [
        "Normal saline can worsen hyponatraemia in SIADH — the salt is excreted and the water retained.",
        "Alcoholics, malnourished and hypokalaemic patients are at the highest risk of osmotic demyelination.",
      ],
      vignette: {
        stem: "A 62-year-old smoker has sodium 118 mmol/l, serum osmolality 250, urine osmolality 480, urine sodium 50 mmol/l and is clinically euvolaemic. Thyroid and cortisol are normal.",
        answer: "SIADH — likely small-cell lung cancer; fluid restrict and image the chest.",
        reasoning:
          "Hypotonic hyponatraemia with concentrated urine and high urine sodium in a euvolaemic patient with normal endocrine tests fits SIADH.",
      },
      highYield:
        "Check osmolality first. SIADH: euvolaemic, urine osm > 100, urine Na > 30–40, low urate. Severe: 3% saline 150 ml boluses. Max 8–10 mmol/l per 24 h — else osmotic demyelination.",
      checks: [
        {
          q: "Rapid correction of chronic hyponatraemia risks:",
          options: [
            "Cerebral oedema",
            "Osmotic demyelination syndrome",
            "Hyperkalaemia",
            "Diabetes insipidus",
          ],
          answer: 1,
          why: "Brain cells adapted to low sodium shrink when it rises fast, damaging pontine myelin.",
        },
        {
          q: "Which finding is typical of SIADH?",
          options: [
            "Hypovolaemia",
            "Urine osmolality < 100 mOsm/kg",
            "Urine sodium > 30 mmol/l with euvolaemia",
            "High serum uric acid",
          ],
          answer: 2,
          why: "Euvolaemia with continued urinary sodium loss and concentrated urine is the SIADH pattern; uric acid is low.",
        },
      ],
    },
    {
      id: "autoantibodies",
      title: "Autoantibodies in rheumatology",
      minutes: 7,
      summary:
        "Autoantibodies are the fastest route to a diagnosis in autoimmune disease — some are sensitive screening tests, others are specific enough to confirm a disease.",
      examFocus:
        "Sensitive vs specific antibodies in SLE and RA, drug-induced lupus, scleroderma subtypes, myositis, vasculitis (ANCA) and organ-specific antibodies.",
      mechanism:
        "A screening test must be sensitive (rarely negative in disease), while a confirmatory test must be specific (rarely positive in health). ANA is positive in almost every SLE patient but also in many healthy people, so a negative ANA is useful to rule SLE out. Anti-dsDNA and anti-Smith are rarely positive outside SLE, so they rule it in — and anti-dsDNA levels track disease activity and kidney involvement.",
      points: [
        "SLE: ANA most sensitive (screening); anti-dsDNA and anti-Smith most specific; anti-dsDNA rises with activity and lupus nephritis.",
        "Drug-induced lupus (hydralazine, procainamide, isoniazid): anti-histone antibodies; kidneys and CNS usually spared.",
        "Anti-Ro (SSA) / anti-La (SSB): Sjögren syndrome; in pregnancy → neonatal lupus and congenital heart block.",
        "Rheumatoid arthritis: anti-CCP is the most specific; rheumatoid factor is sensitive but not specific.",
        "Systemic sclerosis: anti-centromere → limited (CREST); anti-Scl-70 (topoisomerase I) → diffuse with lung fibrosis; anti-RNA polymerase III → renal crisis.",
        "Myositis: anti-Jo-1 (antisynthetase syndrome — ILD, mechanic's hands). Mixed connective tissue disease: anti-U1 RNP.",
        "Vasculitis: c-ANCA (PR3) → granulomatosis with polyangiitis; p-ANCA (MPO) → microscopic polyangiitis, EGPA. Anti-GBM → Goodpasture syndrome.",
        "Antiphospholipid syndrome: lupus anticoagulant, anticardiolipin, anti-β2 glycoprotein I — arterial/venous thrombosis and recurrent miscarriage.",
      ],
      table: {
        title: "Antibody → disease",
        columns: ["Antibody", "Disease"],
        rows: [
          ["Anti-dsDNA, anti-Smith", "SLE (specific)"],
          ["Anti-histone", "Drug-induced lupus"],
          ["Anti-CCP", "Rheumatoid arthritis"],
          ["Anti-centromere", "Limited systemic sclerosis (CREST)"],
          ["Anti-Scl-70", "Diffuse systemic sclerosis"],
          ["Anti-Jo-1", "Polymyositis / dermatomyositis"],
          ["c-ANCA (PR3)", "Granulomatosis with polyangiitis"],
          ["Anti-mitochondrial", "Primary biliary cholangitis"],
          ["Anti-tTG IgA", "Coeliac disease"],
          ["Anti-AChR", "Myasthenia gravis"],
        ],
      },
      pitfalls: [
        "A positive ANA alone doesn't make the diagnosis — low titres are common in healthy people, especially older women.",
        "Lupus anticoagulant prolongs the aPTT but predisposes to clotting.",
      ],
      vignette: {
        stem: "A pregnant woman's fetus develops complete heart block at 22 weeks. She has dry eyes and dry mouth.",
        answer: "Maternal anti-Ro (SSA) antibodies — Sjögren syndrome causing neonatal lupus.",
        reasoning: "Anti-Ro crosses the placenta and damages the fetal conduction system.",
      },
      highYield:
        "ANA sensitive; anti-dsDNA/Smith specific for SLE. Anti-histone → drug-induced. Anti-Ro → congenital heart block. Anti-CCP → RA. Centromere → CREST, Scl-70 → diffuse. c-ANCA → GPA, p-ANCA → MPA/EGPA.",
      checks: [
        {
          q: "The antibody that best reflects lupus nephritis activity is:",
          options: ["ANA", "Anti-Smith", "Anti-dsDNA", "Anti-histone"],
          answer: 2,
          why: "Anti-dsDNA titres rise with disease activity, particularly renal involvement.",
        },
        {
          q: "c-ANCA (anti-PR3) is most associated with:",
          options: [
            "Microscopic polyangiitis",
            "Granulomatosis with polyangiitis",
            "Polyarteritis nodosa",
            "Takayasu arteritis",
          ],
          answer: 1,
          why: "PR3-ANCA with a cytoplasmic pattern is characteristic of GPA (Wegener's).",
        },
      ],
    },
    {
      id: "cirrhosis",
      title: "Cirrhosis & its complications",
      minutes: 9,
      summary:
        "Cirrhosis causes portal hypertension and liver failure, which together produce ascites, infection of the ascites, encephalopathy and variceal bleeding — each with a defined management.",
      examFocus:
        "SAAG, SBP diagnosis and treatment, precipitants and treatment of hepatic encephalopathy, variceal bleed management, and Child-Pugh vs MELD.",
      mechanism:
        "Scarring raises resistance to portal flow, and the body responds with splanchnic vasodilation. Effective arterial volume falls, so renin–angiotensin–aldosterone and ADH switch on and the kidneys retain salt and water, which leaks into the peritoneum as ascites. Because the fluid comes from high portal pressure, its albumin level is low compared with serum — a serum–ascites albumin gradient (SAAG) ≥ 1.1 g/dl. Ammonia from gut bacteria bypasses the failing liver and reaches the brain, causing encephalopathy.",
      points: [
        "SAAG ≥ 1.1 g/dl = portal hypertension (cirrhosis, heart failure, Budd–Chiari). < 1.1 = peritoneal disease (tuberculosis, carcinomatosis, pancreatitis, nephrotic).",
        "Ascites: salt restriction, spironolactone ± furosemide (ratio 100:40). Large-volume paracentesis (> 5 l) → give albumin ~8 g per litre removed.",
        "SBP: ascitic neutrophils ≥ 250/mm³; E. coli commonest; treat with cefotaxime (third-generation cephalosporin) plus albumin to prevent hepatorenal syndrome; then norfloxacin or ciprofloxacin prophylaxis.",
        "Hepatic encephalopathy: asterixis, confusion; precipitants — GI bleed, infection, constipation, hypokalaemia, sedatives, dehydration. Treat with lactulose (traps ammonia as NH4+) plus rifaximin.",
        "Primary prevention of variceal bleeding: non-selective beta-blocker (propranolol, carvedilol) or band ligation.",
        "Hepatorenal syndrome: terlipressin plus albumin.",
        "Severity scores: Child-Pugh (bilirubin, albumin, INR, ascites, encephalopathy); MELD (bilirubin, INR, creatinine ± sodium) for transplant priority.",
        "HCC surveillance: ultrasound ± AFP every 6 months.",
      ],
      flow: {
        title: "Acute variceal bleed",
        steps: [
          {
            label: "Resuscitate",
            detail: "Two large-bore cannulas; restrictive transfusion to Hb 7–8 g/dl",
          },
          { label: "Vasoactive drug", detail: "Terlipressin or octreotide as early as possible" },
          {
            label: "IV antibiotics",
            detail: "Ceftriaxone — reduces infection, rebleeding and death",
          },
          {
            label: "Endoscopy within 12 h",
            detail: "Band ligation (oesophageal); glue for gastric varices",
          },
          { label: "Rescue", detail: "Balloon tamponade as a bridge → TIPS" },
        ],
      },
      pitfalls: [
        "Over-transfusing raises portal pressure and increases rebleeding — aim for Hb 7–8 g/dl.",
        "High protein ascites with a high SAAG suggests cardiac ascites or Budd–Chiari rather than cirrhosis.",
      ],
      vignette: {
        stem: "A man with cirrhosis and ascites has fever and abdominal tenderness. Ascitic tap shows 600 neutrophils/mm³ and SAAG 1.6 g/dl.",
        answer: "Spontaneous bacterial peritonitis — IV cefotaxime plus albumin.",
        reasoning:
          "Ascitic neutrophils ≥ 250/mm³ define SBP; albumin reduces the risk of hepatorenal syndrome and death.",
      },
      highYield:
        "SAAG ≥ 1.1 = portal hypertension. SBP: PMN ≥ 250 → cefotaxime + albumin. HE: lactulose + rifaximin. Variceal bleed: terlipressin + antibiotics + EVL within 12 h. MELD for transplant.",
      checks: [
        {
          q: "SBP is diagnosed when the ascitic fluid neutrophil count is at least:",
          options: ["100/mm³", "250/mm³", "500/mm³", "1000/mm³"],
          answer: 1,
          why: "A neutrophil count ≥ 250/mm³ is diagnostic even before culture results.",
        },
        {
          q: "A SAAG of 0.8 g/dl suggests:",
          options: [
            "Cirrhosis",
            "Congestive heart failure",
            "Tuberculous peritonitis",
            "Budd–Chiari syndrome",
          ],
          answer: 2,
          why: "A low gradient means the fluid is from peritoneal disease, not portal hypertension.",
        },
      ],
    },
    {
      id: "aki",
      title: "Acute kidney injury",
      minutes: 8,
      summary:
        "AKI is a rapid fall in kidney function — prerenal, intrinsic or postrenal. Urine indices and casts locate the problem, and a few emergencies mandate dialysis.",
      examFocus:
        "KDIGO definition, prerenal vs ATN indices, urinary casts, hyperkalaemia management, and the indications for urgent dialysis.",
      mechanism:
        "In prerenal AKI the tubules are healthy and working hard to save salt and water, so urine sodium is low and urine is concentrated. In acute tubular necrosis the tubular cells are damaged and can no longer reabsorb sodium or concentrate urine, so urine sodium is high and the osmolality approaches plasma; the dead cells slough into the urine as muddy-brown granular casts.",
      points: [
        "KDIGO AKI: creatinine rise ≥ 0.3 mg/dl within 48 h, or ≥ 1.5 × baseline within 7 days, or urine output < 0.5 ml/kg/h for 6 h.",
        "Prerenal: urine Na < 20, FENa < 1%, urine osmolality > 500, BUN:creatinine > 20, bland sediment (hyaline casts). Use FEUrea < 35% if on diuretics.",
        "ATN: urine Na > 40, FENa > 2%, urine osmolality < 350, muddy-brown granular casts. Causes: ischaemia (commonest), aminoglycosides, contrast, myoglobin (rhabdomyolysis), cisplatin, amphotericin.",
        "Casts: RBC casts → glomerulonephritis; WBC casts → pyelonephritis/interstitial nephritis; waxy casts → CKD; fatty casts → nephrotic syndrome.",
        "Postrenal: obstruction — ultrasound shows hydronephrosis; relieve with catheter or nephrostomy.",
        "Hyperkalaemia: ECG changes (peaked T, wide QRS, sine wave) → IV calcium gluconate to stabilise the heart, then insulin + dextrose and salbutamol to shift K+ into cells, then remove it (binders, diuretics, dialysis).",
        "Urgent dialysis (AEIOU): refractory Acidosis, refractory hyperkalaemia (Electrolytes), dialysable Intoxication (methanol, ethylene glycol, lithium, salicylates), fluid Overload, Uraemic pericarditis or encephalopathy.",
      ],
      table: {
        title: "Prerenal vs ATN",
        columns: ["Index", "Prerenal", "ATN"],
        rows: [
          ["Urine sodium (mmol/l)", "< 20", "> 40"],
          ["FENa", "< 1%", "> 2%"],
          ["Urine osmolality", "> 500", "< 350"],
          ["BUN : creatinine", "> 20", "< 15"],
          ["Sediment", "Hyaline casts", "Muddy-brown granular casts"],
        ],
      },
      pitfalls: [
        "Calcium gluconate protects the heart but doesn't lower potassium — follow it with shifting and removal.",
        "Contrast nephropathy and myoglobinuria can give a low FENa early despite being intrinsic injury.",
      ],
      mnemonic: "Urgent dialysis: AEIOU — Acidosis, Electrolytes, Intoxication, Overload, Uraemia.",
      vignette: {
        stem: "After 3 days of vomiting, an elderly man has creatinine 2.4 mg/dl (baseline 1.0), urine sodium 10 mmol/l, FENa 0.4% and hyaline casts.",
        answer: "Prerenal AKI from volume depletion — IV fluids.",
        reasoning:
          "Intact tubules avidly retain sodium (FENa < 1%) with a bland sediment; restoring perfusion should reverse it.",
      },
      highYield:
        "KDIGO: +0.3 in 48 h or ×1.5 in 7 days or UO < 0.5 ml/kg/h × 6 h. Prerenal FENa < 1%; ATN > 2% + muddy-brown casts. RBC casts = GN. Hyperkalaemia: calcium first. Dialysis: AEIOU.",
      checks: [
        {
          q: "Muddy-brown granular casts are typical of:",
          options: [
            "Prerenal azotaemia",
            "Acute tubular necrosis",
            "Acute glomerulonephritis",
            "Pyelonephritis",
          ],
          answer: 1,
          why: "Sloughed tubular epithelial cells form granular casts in ATN.",
        },
        {
          q: "First drug for hyperkalaemia with ECG changes:",
          options: [
            "Insulin with dextrose",
            "Calcium gluconate",
            "Sodium bicarbonate",
            "Furosemide",
          ],
          answer: 1,
          why: "Calcium immediately stabilises the cardiac membrane while other measures lower potassium.",
        },
      ],
    },
  ],
};
