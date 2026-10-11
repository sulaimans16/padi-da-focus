import type { LearnModule } from "../learn";

export const surgery: LearnModule = {
  slug: "surgery",
  group: "Clinical",
  subject: "Surgery",
  icon: "content_cut",
  blurb:
    "Trauma, burns, head injury, breast, thyroid, acute abdomen and the biliary tree — the surgical decisions NEET PG asks you to make.",
  objectives: [
    "Run an ATLS primary survey and grade haemorrhagic shock from the vital signs.",
    "Estimate burn area and calculate Parkland fluids for the first 24 hours.",
    "Tell an extradural from a subdural haematoma on history and CT.",
    "Work up a breast lump and a thyroid nodule with the right first investigation.",
    "Score suspected appendicitis and interpret the classic biliary eponyms.",
  ],
  concepts: [
    {
      id: "atls-shock",
      title: "ATLS primary survey and haemorrhagic shock",
      minutes: 8,
      summary:
        "Treat the greatest threat to life first: catastrophic haemorrhage and airway, then breathing, circulation, disability and exposure — and grade blood loss from the vitals.",
      examFocus:
        "A trauma vignette with vital signs: you pick the class of shock, or the very first step (airway with C-spine protection).",
      mechanism:
        "The primary survey is ordered by how fast each failure kills. An obstructed airway kills in minutes, a tension pneumothorax in minutes to an hour, haemorrhage over the first hour. Haemorrhagic shock follows a predictable compensation curve: early loss is hidden by tachycardia and vasoconstriction, so blood pressure is preserved until roughly 30% of volume is gone. A falling systolic pressure is therefore a late sign, and a narrowing pulse pressure with rising heart rate is the earlier warning.",
      points: [
        "Sequence: <C>ABCDE — catastrophic bleeding, Airway with cervical-spine protection, Breathing, Circulation with haemorrhage control, Disability (GCS, pupils), Exposure.",
        "Two large-bore (14–16G) peripheral cannulas; start warm crystalloid but switch early to blood (1:1:1 plasma:platelets:RBC in massive haemorrhage).",
        "Permissive hypotension (target SBP ~80–90 mmHg) until bleeding is controlled — except in traumatic brain injury, where cerebral perfusion matters more.",
        "Tension pneumothorax is a clinical diagnosis: needle decompression first (2nd ICS mid-clavicular, or 4th/5th ICS mid-axillary in adults), X-ray never.",
        "Trimodal death distribution: seconds–minutes (unsalvageable), the 'golden hour' (salvageable — the target of ATLS), and days–weeks (sepsis, multi-organ failure).",
      ],
      table: {
        title: "ATLS classes of haemorrhagic shock (70 kg adult)",
        columns: [
          "Class",
          "Blood loss",
          "Heart rate",
          "Systolic BP",
          "Urine output",
          "Mental state",
        ],
        rows: [
          ["I", "<15% (<750 mL)", "<100", "Normal", ">30 mL/h", "Slightly anxious"],
          ["II", "15–30%", "100–120", "Normal (pulse pressure ↓)", "20–30 mL/h", "Anxious"],
          ["III", "30–40%", "120–140", "Decreased", "5–15 mL/h", "Confused"],
          ["IV", ">40% (>2 L)", ">140", "Markedly decreased", "Negligible", "Lethargic"],
        ],
      },
      flow: {
        title: "Primary survey, in order",
        steps: [
          { label: "Catastrophic external bleeding", detail: "Direct pressure, tourniquet" },
          {
            label: "Airway + C-spine",
            detail: "Jaw thrust, suction; definitive airway if GCS ≤ 8",
          },
          {
            label: "Breathing",
            detail: "Look for tension pneumothorax, flail chest, open chest wound",
          },
          { label: "Circulation", detail: "Two large-bore IVs, bloods, FAST, pelvic binder" },
          { label: "Disability", detail: "GCS, pupils, glucose" },
          { label: "Exposure", detail: "Log-roll, examine fully, prevent hypothermia" },
        ],
      },
      pitfalls: [
        "Hypotension is not an early sign — Class II shock has a normal systolic pressure. Don't call a tachycardic, normotensive trauma patient 'stable'.",
        "Elderly patients on beta-blockers and young athletes may not mount a tachycardia, so shock is under-graded in both.",
      ],
      vignette: {
        stem: "A 28-year-old is brought after a road traffic accident. HR 128/min, BP 96/70 mmHg, RR 28/min, confused, urine output 10 mL/h after catheterisation.",
        answer: "Class III haemorrhagic shock (30–40% blood loss).",
        reasoning:
          "Heart rate 120–140, falling systolic pressure, confusion and urine output of 5–15 mL/h all sit in Class III. This patient needs blood products, not just crystalloid.",
      },
      highYield:
        "First step in any trauma: airway with cervical-spine protection. Systolic BP only falls once ~30% of blood volume is lost (Class III).",
      checks: [
        {
          q: "A trauma patient has HR 110/min, normal systolic BP and a narrowed pulse pressure. Estimated blood loss?",
          options: ["<15%", "15–30%", "30–40%", ">40%"],
          answer: 1,
          why: "Class II shock: tachycardia 100–120 with preserved systolic pressure but narrowed pulse pressure.",
        },
        {
          q: "Best immediate management of suspected tension pneumothorax in a crashing trauma patient?",
          options: [
            "Urgent chest X-ray",
            "CT chest",
            "Needle decompression",
            "Intercostal drain after ABG",
          ],
          answer: 2,
          why: "It is a clinical diagnosis; decompress first. Imaging delays treatment of a rapidly fatal condition.",
        },
      ],
    },
    {
      id: "burns",
      title: "Burns: depth, area and Parkland fluids",
      minutes: 8,
      summary:
        "Burn management rests on three numbers: the depth, the percentage of body surface area (TBSA) and the fluid requirement over the first 24 hours.",
      examFocus:
        "Calculate Parkland fluids for a given weight and TBSA, or estimate TBSA by the rule of nines.",
      mechanism:
        "A significant burn triggers a systemic inflammatory response that makes capillaries leaky everywhere, not just at the wound. Plasma pours into the interstitium, peaking over the first 8–12 hours, so the patient becomes hypovolaemic even with no external blood loss. That is why fluid is front-loaded — half in the first 8 hours from the time of the burn — and why the endpoint is urine output, the best bedside marker of organ perfusion.",
      points: [
        "Rule of nines (adult): head & neck 9%, each upper limb 9%, front of trunk 18%, back of trunk 18%, each lower limb 18%, perineum 1%. Patient's palm with fingers ≈ 1%.",
        "Children have relatively larger heads: use the Lund–Browder chart for accuracy.",
        "Parkland formula: 4 mL × weight (kg) × %TBSA of Ringer's lactate over 24 h; half in the first 8 h from the time of injury, the rest over 16 h.",
        "Count only partial- and full-thickness burns in TBSA — never superficial (first-degree) erythema.",
        "Target urine output: 0.5 mL/kg/h in adults, 1 mL/kg/h in children.",
        "Circumferential full-thickness burns of the chest or limbs need escharotomy to restore ventilation or distal circulation.",
      ],
      table: {
        title: "Burn depth",
        columns: ["Depth", "Appearance", "Pain", "Blanching", "Healing"],
        rows: [
          [
            "Superficial (epidermal)",
            "Red, dry, no blisters",
            "Painful",
            "Yes",
            "~1 week, no scar",
          ],
          [
            "Superficial partial",
            "Blisters, moist pink",
            "Very painful",
            "Yes",
            "2–3 weeks, minimal scar",
          ],
          [
            "Deep partial",
            "Mottled, dry, white-red",
            "Reduced",
            "Sluggish / no",
            ">3 weeks; graft often needed",
          ],
          [
            "Full thickness",
            "Leathery, white/charred",
            "Painless",
            "No",
            "Needs excision and grafting",
          ],
        ],
      },
      pitfalls: [
        "Time the 24 hours from the moment of the burn, not from arrival. A patient arriving 3 hours late gets the first half in the next 5 hours.",
        "Painless burns are the deeper ones (nerve endings destroyed) — don't reassure because the patient feels nothing.",
      ],
      mnemonic: "Parkland: 4 × kg × %TBSA — half in 8, half in 16.",
      vignette: {
        stem: "A 60 kg man has partial-thickness burns over the whole front of his trunk and his entire right upper limb. He arrives 2 hours after the burn.",
        answer: "27% TBSA → 4 × 60 × 27 = 6,480 mL in 24 h; 3,240 mL in the next 6 hours.",
        reasoning:
          "Front of trunk 18% + one upper limb 9% = 27%. Half the 24-hour volume is due within 8 hours of the burn, and 2 hours have already passed.",
      },
      highYield:
        "Parkland = 4 mL × kg × %TBSA of Ringer's lactate, half in the first 8 h from the time of burn. Titrate to urine 0.5 mL/kg/h (adults).",
      checks: [
        {
          q: "A 70 kg adult with 20% TBSA partial-thickness burns. Fluid in the first 8 hours by Parkland?",
          options: ["1,400 mL", "2,800 mL", "5,600 mL", "4,200 mL"],
          answer: 1,
          why: "4 × 70 × 20 = 5,600 mL in 24 h; half (2,800 mL) in the first 8 hours.",
        },
        {
          q: "A burn that is leathery, white and painless is most likely:",
          options: [
            "Superficial",
            "Superficial partial-thickness",
            "Deep partial-thickness",
            "Full-thickness",
          ],
          answer: 3,
          why: "Full-thickness burns destroy dermal nerve endings, so they are painless and do not blanch.",
        },
      ],
    },
    {
      id: "head-injury",
      title: "Head injury: GCS, extradural vs subdural",
      minutes: 7,
      summary:
        "Grade the injury with the Glasgow Coma Scale, then tell the bleeds apart by their source, time course and CT shape.",
      examFocus:
        "A lucid interval after a temporal blow (extradural), or an elderly patient on anticoagulants with slow confusion (chronic subdural); plus GCS calculation.",
      mechanism:
        "The dura is stuck to the inner skull at the sutures. An extradural haematoma is arterial blood (usually the middle meningeal artery under a thin squamous temporal bone) that strips the dura off the skull; it cannot cross sutures, so it bulges inward as a biconvex lens and expands fast. A subdural haematoma is venous blood from torn bridging veins in the potential space beneath the dura; it is free to spread along the hemisphere, so it forms a crescent that crosses sutures, and it accumulates slowly — especially in the elderly and alcoholics whose shrunken brains stretch those veins.",
      points: [
        "GCS = Eye (4) + Verbal (5) + Motor (6); range 3–15. Severe ≤ 8, moderate 9–12, mild 13–15. Intubate to protect the airway at GCS ≤ 8.",
        "Extradural: young patient, temporal fracture, brief loss of consciousness → lucid interval → rapid deterioration with ipsilateral fixed dilated pupil.",
        "Subdural: acute after high-energy trauma; chronic in the elderly, alcoholics, anticoagulated — fluctuating confusion over days to weeks.",
        "Cushing's triad of raised intracranial pressure: hypertension (widened pulse pressure), bradycardia and irregular respiration — a late, pre-terminal sign.",
        "Pupil dilates on the side of the lesion because the uncus herniates and compresses the oculomotor nerve (parasympathetic fibres run on its surface).",
      ],
      table: {
        title: "Extradural vs subdural haematoma",
        columns: ["Feature", "Extradural", "Subdural"],
        rows: [
          ["Vessel", "Middle meningeal artery", "Bridging veins"],
          ["Space", "Between skull and dura", "Between dura and arachnoid"],
          ["CT shape", "Biconvex (lentiform)", "Crescentic"],
          ["Crosses sutures?", "No", "Yes"],
          ["Course", "Lucid interval, rapid", "Slow (chronic) or acute after severe trauma"],
          ["Typical patient", "Young, temporal fracture", "Elderly, alcoholic, anticoagulated"],
        ],
      },
      flow: {
        title: "Scoring GCS",
        steps: [
          { label: "Eyes (E1–E4)", detail: "Spontaneous 4 · to voice 3 · to pain 2 · none 1" },
          {
            label: "Verbal (V1–V5)",
            detail: "Oriented 5 · confused 4 · words 3 · sounds 2 · none 1",
          },
          {
            label: "Motor (M1–M6)",
            detail: "Obeys 6 · localises 5 · withdraws 4 · flexion 3 · extension 2 · none 1",
          },
          { label: "Add them up", detail: "≤ 8 = severe → secure the airway" },
        ],
      },
      pitfalls: [
        "Extradural does not cross sutures; subdural does not cross the midline falx. The question will usually describe one of these limits.",
        "Abnormal flexion (decorticate) scores M3, abnormal extension (decerebrate) scores M2 — extension is worse.",
      ],
      mnemonic: "Extradural = Explosive (artery, lens). Subdural = Slow (veins, crescent).",
      vignette: {
        stem: "A 19-year-old hit on the side of the head by a cricket ball is briefly knocked out, then talks normally for 2 hours before becoming drowsy with a dilated right pupil.",
        answer: "Right extradural haematoma — middle meningeal artery injury.",
        reasoning:
          "Temporal impact, lucid interval and ipsilateral pupil dilation from uncal herniation are the classic triad. Urgent CT and craniotomy.",
      },
      highYield:
        "Lens-shaped bleed that respects sutures + lucid interval = extradural (middle meningeal artery). Crescent crossing sutures in an elderly patient = subdural (bridging veins).",
      checks: [
        {
          q: "Eyes open to pain, inappropriate words, localises to pain. GCS?",
          options: ["8", "9", "10", "11"],
          answer: 2,
          why: "E2 + V3 + M5 = 10.",
        },
        {
          q: "A crescent-shaped hyperdensity crossing suture lines in an elderly anticoagulated patient is from:",
          options: [
            "Middle meningeal artery",
            "Bridging veins",
            "Berry aneurysm",
            "Lenticulostriate arteries",
          ],
          answer: 1,
          why: "Subdural haematoma: torn bridging veins in the subdural space, free to spread along the hemisphere.",
        },
      ],
    },
    {
      id: "breast-cancer",
      title: "Breast lump: triple assessment and carcinoma",
      minutes: 9,
      summary:
        "Every breast lump gets triple assessment — clinical examination, imaging and tissue biopsy — and treatment is guided by stage and receptor status.",
      examFocus:
        "The investigation of choice by age, receptor-based treatment (tamoxifen vs aromatase inhibitor vs trastuzumab), or a classic sign such as peau d'orange.",
      mechanism:
        "Each arm of the triple assessment covers the others' blind spots. Examination is subjective; mammography is poor in young dense breasts, which is why ultrasound is the first image under ~35–40 years; only histology confirms cancer and provides the receptors. Receptors decide therapy because they describe what drives the tumour: oestrogen-receptor-positive cancers depend on oestrogen and respond to blocking it, while HER2-amplified tumours grow through the HER2 tyrosine kinase pathway and respond to trastuzumab.",
      points: [
        "Triple assessment: clinical examination + imaging (USG < 35–40 years, mammography ≥ 40) + core needle biopsy (preferred over FNAC because it gives architecture and receptors).",
        "Most common type: invasive ductal carcinoma (NST). Lobular carcinoma is more often bilateral and multicentric.",
        "Peau d'orange = dermal lymphatic blockage with skin oedema; it is T4 disease (inflammatory carcinoma when diffuse erythema covers ≥ 1/3 of the breast).",
        "Sentinel lymph node biopsy stages the clinically node-negative axilla; positive nodes lead to axillary treatment.",
        "Hormone therapy: tamoxifen (premenopausal) or an aromatase inhibitor such as letrozole/anastrozole (postmenopausal). HER2-positive: trastuzumab.",
        "BRCA1 is linked to triple-negative tumours; BRCA2 to male breast cancer.",
      ],
      table: {
        title: "Common breast lumps",
        columns: ["Lump", "Typical patient", "Clues"],
        rows: [
          ["Fibroadenoma", "15–30 years", "Firm, smooth, very mobile ('breast mouse')"],
          ["Fibrocystic change", "30–50 years", "Cyclical pain, lumpy, varies with cycle"],
          ["Breast cyst", "Perimenopausal", "Smooth, fluctuant; aspirate fluid"],
          ["Fat necrosis", "Any, after trauma", "Hard, irregular, may mimic cancer"],
          ["Carcinoma", "> 40 years", "Hard, irregular, fixed, skin/nipple changes"],
        ],
      },
      flow: {
        title: "Work-up of a breast lump",
        steps: [
          { label: "History and examination" },
          { label: "Imaging", detail: "Ultrasound if < 35–40 years; mammography (± USG) if older" },
          { label: "Core needle biopsy", detail: "Histology + ER/PR/HER2" },
          {
            label: "Stage",
            detail: "Axillary USG ± sentinel node; staging scans if locally advanced",
          },
          {
            label: "Treat",
            detail: "Surgery (BCS or mastectomy) + adjuvant chemo/RT/endocrine/anti-HER2",
          },
        ],
      },
      pitfalls: [
        "FNAC cannot distinguish in-situ from invasive cancer — core biopsy is preferred in exams that ask for the 'best' diagnostic test.",
        "Aromatase inhibitors don't work in premenopausal women whose ovaries still make oestrogen (unless combined with ovarian suppression).",
      ],
      vignette: {
        stem: "A 58-year-old woman has a 3 cm hard, irregular lump in the upper outer quadrant. Core biopsy shows invasive ductal carcinoma, ER-positive, HER2-negative.",
        answer:
          "Surgery with axillary staging, then adjuvant endocrine therapy with an aromatase inhibitor.",
        reasoning:
          "She is postmenopausal and ER-positive, so an aromatase inhibitor (letrozole/anastrozole) blocks peripheral oestrogen production; trastuzumab is not indicated as HER2 is negative.",
      },
      highYield:
        "Triple assessment for every lump; core biopsy beats FNAC. ER+ → tamoxifen (pre) / aromatase inhibitor (post); HER2+ → trastuzumab.",
      checks: [
        {
          q: "First-line imaging for a breast lump in a 25-year-old?",
          options: ["Mammography", "Ultrasonography", "MRI", "PET-CT"],
          answer: 1,
          why: "Young breasts are dense, so mammography is insensitive; ultrasound is first-line under 35–40.",
        },
        {
          q: "A HER2-amplified breast carcinoma is best targeted by:",
          options: ["Tamoxifen", "Letrozole", "Trastuzumab", "Imatinib"],
          answer: 2,
          why: "Trastuzumab is a monoclonal antibody against the HER2 receptor.",
        },
      ],
    },
    {
      id: "thyroid-nodule",
      title: "Thyroid nodule and thyroid cancers",
      minutes: 8,
      summary:
        "A solitary thyroid nodule is worked up with TSH, ultrasound and FNAC; the four cancers differ in cell of origin, spread and the clue the exam uses.",
      examFocus:
        "Match the cancer to its histology or marker: papillary (psammoma, Orphan Annie nuclei), follicular (capsular invasion), medullary (calcitonin, MEN 2), anaplastic (elderly, rapidly fatal).",
      mechanism:
        "Papillary and follicular cancers come from follicular cells, so they keep the follicular cell's machinery: they take up iodine (allowing radioiodine therapy) and make thyroglobulin (a recurrence marker). Medullary cancer comes from parafollicular C cells of neural crest origin, so it ignores iodine and TSH, secretes calcitonin and carries RET mutations linked to MEN 2. Follicular cancer cannot be diagnosed on FNAC because the cells look identical to an adenoma; only capsular or vascular invasion on the excised specimen proves malignancy.",
      points: [
        "Investigate a nodule: TSH first (a 'hot' nodule with low TSH is rarely malignant), then ultrasound, then FNAC reported by the Bethesda system.",
        "Papillary (most common, ~80%): lymphatic spread to neck nodes; best prognosis; radiation exposure is a risk factor.",
        "Follicular: haematogenous spread to bone and lungs; diagnosis needs capsular/vascular invasion on histology.",
        "Medullary: calcitonin as tumour marker; amyloid stroma; RET proto-oncogene; prophylactic thyroidectomy in RET carriers.",
        "Anaplastic: elderly, rapidly enlarging hard mass with compression; very poor prognosis.",
        "Post-thyroidectomy risks: recurrent laryngeal nerve palsy (hoarse voice), hypocalcaemia from parathyroid injury, haematoma causing airway compromise.",
      ],
      table: {
        title: "Thyroid carcinomas",
        columns: ["Type", "Cell", "Spread", "Classic clue"],
        rows: [
          [
            "Papillary",
            "Follicular",
            "Lymphatic",
            "Psammoma bodies, Orphan Annie nuclei, nuclear grooves",
          ],
          ["Follicular", "Follicular", "Blood (bone, lung)", "Capsular/vascular invasion"],
          [
            "Medullary",
            "Parafollicular C cell",
            "Lymph + blood",
            "Calcitonin, amyloid, MEN 2 (RET)",
          ],
          [
            "Anaplastic",
            "Follicular (dedifferentiated)",
            "Local invasion",
            "Elderly, rapid, poor prognosis",
          ],
        ],
      },
      pitfalls: [
        "FNAC diagnoses papillary carcinoma (nuclear features) but cannot diagnose follicular carcinoma — the commonest trap.",
        "Radioiodine and thyroglobulin follow-up are useless in medullary carcinoma; use calcitonin and CEA.",
      ],
      mnemonic: "Papillary = Popular, Palpable nodes, Psammoma. Medullary = MEN 2, calcitonin.",
      vignette: {
        stem: "A 35-year-old with a thyroid nodule has raised serum calcitonin. Her father had a phaeochromocytoma.",
        answer: "Medullary carcinoma of the thyroid as part of MEN 2A.",
        reasoning:
          "Calcitonin comes from C cells; the family history of phaeochromocytoma points to a RET mutation (MEN 2). Screen for phaeochromocytoma before thyroid surgery.",
      },
      highYield:
        "Papillary: psammoma + Orphan Annie nuclei, lymph spread. Follicular: needs capsular invasion (FNAC can't tell). Medullary: calcitonin + RET/MEN 2.",
      checks: [
        {
          q: "Which thyroid carcinoma cannot be diagnosed on FNAC?",
          options: ["Papillary", "Follicular", "Medullary", "Anaplastic"],
          answer: 1,
          why: "Follicular carcinoma needs capsular or vascular invasion, seen only in the excised specimen.",
        },
        {
          q: "Tumour marker used to follow up medullary thyroid carcinoma:",
          options: ["Thyroglobulin", "Calcitonin", "AFP", "CA-125"],
          answer: 1,
          why: "Medullary carcinoma arises from calcitonin-secreting parafollicular C cells.",
        },
      ],
    },
    {
      id: "appendicitis",
      title: "Acute appendicitis",
      minutes: 6,
      summary:
        "Luminal obstruction of the appendix produces pain that migrates from the umbilicus to the right iliac fossa; diagnosis is clinical, supported by the Alvarado score and imaging.",
      examFocus:
        "Migratory pain, McBurney's point tenderness and named signs; Alvarado scoring; management of an appendicular mass.",
      mechanism:
        "Obstruction (faecolith, lymphoid hyperplasia) traps secretions, raising pressure in the lumen. Early on, only the visceral peritoneum is stretched; visceral pain is carried with the midgut's T10 segment, so it is felt vaguely around the umbilicus. As inflammation reaches the parietal peritoneum, which has precise somatic innervation, the pain localises to the right iliac fossa. Rising pressure then compromises venous drainage and blood supply, leading to gangrene and perforation within 24–72 hours.",
      points: [
        "McBurney's point: one-third of the way from the anterior superior iliac spine to the umbilicus.",
        "Rovsing's sign (RIF pain on LIF pressure), psoas sign (retrocaecal appendix), obturator sign (pelvic appendix).",
        "Alvarado (MANTRELS, max 10): Migration 1, Anorexia 1, Nausea/vomiting 1, Tenderness RIF 2, Rebound 1, Elevated temperature 1, Leucocytosis 2, Shift to left 1.",
        "Imaging: ultrasound first in children and pregnancy; CT is the most accurate in adults.",
        "Appendicular mass: conservative 'Ochsner–Sherren' regimen, then interval appendicectomy; abscess needs drainage.",
        "Most common position of the appendix: retrocaecal.",
      ],
      pitfalls: [
        "A retrocaecal appendix may give little anterior tenderness — the psoas sign may be the only clue.",
        "In pregnancy the appendix is pushed upward, so pain may be in the right flank or upper quadrant.",
      ],
      mnemonic: "MANTRELS — the 8 Alvarado items; Tenderness and Leucocytosis score 2.",
      vignette: {
        stem: "A 22-year-old has periumbilical pain that moved to the right iliac fossa over 12 hours, with nausea, temperature 38°C, rebound tenderness at McBurney's point and WBC 14,000/µL.",
        answer: "Acute appendicitis — high Alvarado score; proceed to appendicectomy.",
        reasoning:
          "Migration, nausea, RIF tenderness, rebound, fever and leucocytosis give a high score (≥ 7), so the diagnosis is clinically likely.",
      },
      highYield:
        "Pain begins periumbilical (visceral T10) then shifts to the RIF (parietal peritoneum). Alvarado = MANTRELS; retrocaecal is the commonest position.",
      checks: [
        {
          q: "In the Alvarado score, which two items score 2 points each?",
          options: [
            "Migration and anorexia",
            "RIF tenderness and leucocytosis",
            "Fever and rebound",
            "Nausea and shift to left",
          ],
          answer: 1,
          why: "Tenderness in the RIF and leucocytosis are the two items weighted 2.",
        },
        {
          q: "Pain on extension of the right hip suggests an appendix that is:",
          options: ["Pelvic", "Retrocaecal", "Pre-ileal", "Subhepatic"],
          answer: 1,
          why: "The psoas sign: a retrocaecal appendix irritates the psoas muscle.",
        },
      ],
    },
    {
      id: "biliary",
      title: "Gallstones and obstructive jaundice",
      minutes: 8,
      summary:
        "Gallstones cause a spectrum from biliary colic to cholecystitis, choledocholithiasis and cholangitis; the eponyms tell you where the stone is and how sick the patient is.",
      examFocus:
        "Charcot's triad vs Reynolds' pentad, Courvoisier's law, Murphy's sign, and the first investigation (ultrasound) vs best test for the CBD (MRCP/ERCP).",
      mechanism:
        "Cholesterol stones form when bile is supersaturated with cholesterol relative to bile salts and lecithin, often with gallbladder stasis — hence the risk factors female, fertile, fat and forty. A stone impacted in the cystic duct gives pain and, if persistent, cholecystitis without jaundice. A stone in the common bile duct blocks bile flow and causes jaundice; infection of that stagnant bile is cholangitis. In malignant obstruction of the distal duct the gallbladder distends painlessly, because a healthy gallbladder can stretch, whereas stone disease has usually left it fibrosed and unable to distend.",
      points: [
        "Ultrasound is the investigation of choice for gallstones and cholecystitis; MRCP for suspected CBD stones; ERCP is therapeutic (stone extraction).",
        "Murphy's sign: inspiratory arrest on palpation of the right upper quadrant — acute cholecystitis.",
        "Charcot's triad: fever, jaundice, RUQ pain = ascending cholangitis. Reynolds' pentad adds hypotension and confusion (suppurative cholangitis).",
        "Courvoisier's law: a palpable, non-tender gallbladder with jaundice is unlikely to be due to stones — think carcinoma of the head of pancreas.",
        "Mirizzi syndrome: a stone in the cystic duct or Hartmann's pouch compresses the common hepatic duct, causing jaundice.",
        "Laparoscopic cholecystectomy is the definitive treatment; early (within a week) for acute cholecystitis.",
      ],
      table: {
        title: "Gallstone spectrum",
        columns: ["Condition", "Stone site", "Fever", "Jaundice", "Key sign"],
        rows: [
          ["Biliary colic", "Cystic duct (transient)", "No", "No", "Post-prandial RUQ pain"],
          ["Acute cholecystitis", "Cystic duct (impacted)", "Yes", "Usually no", "Murphy's sign"],
          ["Choledocholithiasis", "Common bile duct", "No", "Yes", "Fluctuating jaundice"],
          ["Cholangitis", "CBD + infection", "Yes", "Yes", "Charcot's triad"],
        ],
      },
      pitfalls: [
        "Courvoisier's law describes a palpable gallbladder in jaundice — it doesn't apply to a tender gallbladder in cholecystitis.",
        "Ultrasound is first-line for gallstones, but it misses many CBD stones — MRCP is the non-invasive test for the duct.",
      ],
      mnemonic: "4 Fs: Female, Fertile, Fat, Forty (and Fair).",
      vignette: {
        stem: "A 62-year-old man has painless progressive jaundice, weight loss, pruritus and a palpable non-tender gallbladder.",
        answer: "Periampullary carcinoma / carcinoma head of pancreas (Courvoisier's law).",
        reasoning:
          "Painless jaundice with a distended gallbladder suggests malignant distal CBD obstruction; stone disease usually leaves a fibrosed gallbladder that cannot distend. CT abdomen next.",
      },
      highYield:
        "Charcot = fever + jaundice + RUQ pain (cholangitis); Reynolds adds shock + confusion. Palpable gallbladder + jaundice → not stones (Courvoisier).",
      checks: [
        {
          q: "Investigation of choice for suspected gallstones:",
          options: ["CT abdomen", "Ultrasound abdomen", "MRCP", "Oral cholecystogram"],
          answer: 1,
          why: "Ultrasound is cheap, safe and highly sensitive for gallbladder stones.",
        },
        {
          q: "Fever, jaundice, RUQ pain, hypotension and confusion together are called:",
          options: ["Charcot's triad", "Reynolds' pentad", "Saint's triad", "Whipple's triad"],
          answer: 1,
          why: "Reynolds' pentad = Charcot's triad + shock + altered sensorium (suppurative cholangitis).",
        },
      ],
    },
    {
      id: "limb-ischaemia",
      title: "Peripheral arterial disease and limb ischaemia",
      minutes: 7,
      summary:
        "Atherosclerotic narrowing causes claudication; sudden occlusion causes acute limb ischaemia — the 6 Ps — which is a surgical emergency.",
      examFocus:
        "The 6 Ps, the ankle–brachial pressure index (ABPI) ranges, embolus vs thrombosis, and Leriche syndrome.",
      mechanism:
        "A stenosis only limits flow when demand rises, so chronic disease first shows as calf pain on walking that settles with rest (claudication). When the reserve is exhausted, even resting flow is inadequate: rest pain, worse at night when the leg is elevated and gravity no longer helps perfusion. An acute occlusion — usually an embolus from the heart in atrial fibrillation — gives no time for collaterals to form, so the limb becomes ischaemic within hours and nerves and muscle die after about 6 hours.",
      points: [
        "6 Ps of acute ischaemia: Pain, Pallor, Pulselessness, Paraesthesia, Paralysis, Perishingly cold. Paraesthesia and paralysis signal a threatened limb.",
        "ABPI: > 0.9 normal; 0.5–0.9 claudication; < 0.5 rest pain/critical ischaemia; > 1.3 suggests calcified, incompressible vessels (diabetes).",
        "Embolus: sudden, AF or recent MI, normal contralateral pulses → embolectomy (Fogarty catheter). Thrombosis: known PAD, more gradual.",
        "Leriche syndrome: aorto-iliac occlusion → buttock claudication, absent femoral pulses, erectile dysfunction.",
        "Buerger's disease (thromboangiitis obliterans): young male smokers, distal vessels; stopping smoking is the key treatment.",
        "Fontaine stages: I asymptomatic, II claudication, III rest pain, IV ulceration/gangrene.",
      ],
      pitfalls: [
        "A falsely normal or high ABPI in diabetics comes from calcified arteries — use toe pressures instead.",
        "Reperfusion after a long ischaemic time can cause compartment syndrome and hyperkalaemia; watch for both after revascularisation.",
      ],
      mnemonic: "The 6 Ps: Pain, Pallor, Pulseless, Paraesthesia, Paralysis, Perishingly cold.",
      vignette: {
        stem: "A 70-year-old with atrial fibrillation develops sudden severe pain in the left leg. The leg is pale, cold and pulseless below the femoral artery; contralateral pulses are normal.",
        answer: "Acute embolic limb ischaemia → heparin and urgent embolectomy.",
        reasoning:
          "Sudden onset, an embolic source (AF) and normal pulses on the other side point to embolus rather than thrombosis in chronic disease.",
      },
      highYield:
        "Acute ischaemia = 6 Ps; paralysis/paraesthesia means act now. ABPI < 0.9 abnormal, < 0.5 critical; > 1.3 = calcified vessels.",
      checks: [
        {
          q: "An ABPI of 0.4 indicates:",
          options: ["Normal", "Mild claudication", "Critical limb ischaemia", "Calcified vessels"],
          answer: 2,
          why: "ABPI below 0.5 corresponds to rest pain and critical limb ischaemia.",
        },
        {
          q: "Buttock claudication, absent femoral pulses and erectile dysfunction suggest:",
          options: [
            "Buerger's disease",
            "Leriche syndrome",
            "Raynaud's disease",
            "Popliteal entrapment",
          ],
          answer: 1,
          why: "Leriche syndrome is aorto-iliac occlusive disease.",
        },
      ],
    },
  ],
};
