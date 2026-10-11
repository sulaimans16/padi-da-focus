import type { LearnModule } from "../learn";

export const radiology: LearnModule = {
  slug: "radiology",
  group: "Clinical",
  subject: "Radiology",
  icon: "radiology",
  blurb:
    "Modalities and radiation safety, chest and abdominal film signs, CT head, contrast reactions, FAST, MRI sequences, radiotherapy and nuclear medicine.",
  objectives: [
    "Choose the right imaging modality and apply radiation protection rules and units.",
    "Recognise classic signs on chest and abdominal radiographs.",
    "Differentiate extradural, subdural and subarachnoid haemorrhage on CT.",
    "Prevent and treat contrast reactions and choose a safe contrast agent.",
    "Read FAST and MRI sequences and know the core radiobiology and isotope scans.",
  ],
  concepts: [
    {
      id: "modalities-safety",
      title: "Modalities & radiation protection",
      minutes: 7,
      summary:
        "X-ray, CT and nuclear medicine use ionising radiation; ultrasound and MRI do not. Every exposure is weighed against benefit and kept As Low As Reasonably Achievable (ALARA).",
      examFocus:
        "Units (gray, sievert, becquerel), dose limits for workers and the public, the law of Bergonié and Tribondeau, and the most radiosensitive cells and cell-cycle phase.",
      mechanism:
        "Ionising radiation knocks electrons off atoms, mostly creating free radicals from water that break DNA. Cells that divide often have less time to repair DNA before copying it, so they are the most radiosensitive — Bergonié and Tribondeau's law. Exposure falls with the inverse square of distance, so stepping back from the source cuts the dose far more than people expect; time, distance and shielding are the three levers of protection.",
      points: [
        "Units: gray (Gy) = absorbed dose; sievert (Sv) = equivalent/effective dose (biological effect); becquerel (Bq) = activity (1 disintegration per second).",
        "Dose limits (ICRP/AERB): radiation workers 20 mSv/year averaged over 5 years (max 50 mSv in any one year); general public 1 mSv/year.",
        "Typical doses: chest X-ray PA ~0.02 mSv; CT abdomen ~8–10 mSv — hundreds of chest films.",
        "Most radiosensitive cell: lymphocyte. Most radiosensitive phase: G2–M; most resistant: late S phase. Nerve and muscle cells are the most radioresistant.",
        "Deterministic effects (cataract, skin burns, sterility) have a threshold and severity rises with dose; stochastic effects (cancer, genetic effects) have no threshold — probability rises with dose.",
        "Personal monitoring: thermoluminescent dosimeter (TLD) badge. Lead aprons are typically 0.25–0.5 mm lead equivalent.",
        "Ultrasound and MRI are preferred in pregnancy and children when they can answer the question.",
      ],
      table: {
        title: "Choosing a modality",
        columns: ["Modality", "Ionising?", "Best for"],
        rows: [
          ["X-ray", "Yes", "Bones, chest, first look"],
          ["CT", "Yes", "Acute bleed, trauma, bone detail, lungs"],
          ["Ultrasound", "No", "Gallbladder, pregnancy, FAST, vessels"],
          ["MRI", "No", "Soft tissue, brain, spinal cord, joints"],
          ["Nuclear medicine", "Yes", "Function — thyroid, bone, kidney, PET"],
        ],
      },
      pitfalls: [
        "Sievert, not gray, compares risk across different radiation types and organs.",
        "Lens cataract is deterministic — it needs a threshold dose; cancer is stochastic.",
      ],
      mnemonic:
        "Protection = Time, Distance, Shielding — and distance follows the inverse square law.",
      vignette: {
        stem: "A radiographer doubles her distance from the X-ray tube during fluoroscopy.",
        answer: "Her dose falls to one-quarter.",
        reasoning: "By the inverse square law, doubling the distance reduces intensity by 2² = 4.",
      },
      highYield:
        "Gy absorbed, Sv effective, Bq activity. Worker 20 mSv/yr, public 1 mSv/yr. Lymphocyte most sensitive; G2–M most sensitive phase. Cataract deterministic, cancer stochastic.",
      checks: [
        {
          q: "The SI unit of effective dose is:",
          options: ["Gray", "Sievert", "Becquerel", "Roentgen"],
          answer: 1,
          why: "The sievert weights the absorbed dose for radiation type and tissue sensitivity.",
        },
        {
          q: "The most radiosensitive phase of the cell cycle is:",
          options: ["G1", "Early S", "Late S", "G2–M"],
          answer: 3,
          why: "Cells in G2–M have the least time to repair DNA damage before division.",
        },
      ],
    },
    {
      id: "chest-xray",
      title: "Chest X-ray signs",
      minutes: 9,
      summary:
        "A chest film is read by its densities and borders: where a normal edge disappears tells you where the disease lies, and a handful of named signs point straight to a diagnosis.",
      examFocus:
        "The silhouette sign, air bronchograms, signs of pulmonary oedema, pneumothorax on a supine film, and named cardiac shapes.",
      mechanism:
        "An X-ray only shows a border where two structures of different density meet. When lung next to the heart or diaphragm fills with fluid, both are now soft-tissue density and the border vanishes — the silhouette sign — which localises the disease to the touching lobe. Air bronchograms appear when air-filled bronchi are outlined by fluid-filled alveoli around them, so they mean alveolar filling, not a mass in the airway.",
      points: [
        "Silhouette sign: loss of right heart border = right middle lobe; left heart border = lingula; hemidiaphragm = lower lobe.",
        "Air bronchogram: consolidation (pneumonia, oedema, haemorrhage).",
        "Pulmonary oedema: upper-lobe venous diversion → Kerley B lines (short horizontal lines at the bases) → bat-wing perihilar shadowing, with effusions.",
        "Pleural effusion: about 200 ml blunts the costophrenic angle on a PA film; the lateral and decubitus views show less, and ultrasound detects the smallest amounts.",
        "Pneumothorax: visible visceral pleural line with no lung markings beyond; on a supine film look for the deep sulcus sign.",
        "Golden S sign: right upper lobe collapse around a central hilar mass — think bronchogenic carcinoma.",
        "Hampton's hump and Westermark's sign: pulmonary embolism (rare but classic).",
        "Water-lily sign: ruptured hydatid cyst. Air-crescent (Monod) sign: aspergilloma in a cavity.",
      ],
      table: {
        title: "Named cardiac shapes",
        columns: ["Sign", "Condition"],
        rows: [
          ["Boot-shaped heart", "Tetralogy of Fallot"],
          ["Egg on a string", "Transposition of great arteries"],
          ["Snowman / figure of 8", "Supracardiac TAPVC"],
          ["Figure of 3 + rib notching", "Coarctation of aorta"],
          ["Water-bottle heart", "Large pericardial effusion"],
        ],
      },
      pitfalls: [
        "A supine film hides a pneumothorax anteriorly — the deep sulcus sign may be the only clue.",
        "Rib notching in coarctation affects the 3rd–9th ribs; the 1st and 2nd are spared because their intercostals arise from the subclavian above the narrowing.",
      ],
      mnemonic: "Kerley B = 'Basal, Brief, horizontal' lines of interstitial oedema.",
      vignette: {
        stem: "A child with cyanotic spells has a chest X-ray showing an upturned apex, a concave pulmonary bay and oligaemic lung fields.",
        answer: "Tetralogy of Fallot — boot-shaped heart.",
        reasoning:
          "Right ventricular hypertrophy lifts the apex and pulmonary stenosis leaves a concave pulmonary segment with reduced lung vascularity.",
      },
      highYield:
        "Silhouette: RML → right heart border, lingula → left border. Air bronchogram = consolidation. Kerley B = interstitial oedema. Deep sulcus = supine pneumothorax. Boot = TOF, egg on string = TGA, snowman = TAPVC.",
      checks: [
        {
          q: "Loss of the right heart border on a PA chest film localises consolidation to the:",
          options: ["Right upper lobe", "Right middle lobe", "Right lower lobe", "Lingula"],
          answer: 1,
          why: "The right middle lobe lies against the right atrium, so filling it erases that border.",
        },
        {
          q: "Deep sulcus sign suggests:",
          options: [
            "Pleural effusion on an erect film",
            "Pneumothorax on a supine film",
            "Lower lobe collapse",
            "Pneumoperitoneum",
          ],
          answer: 1,
          why: "Air collects anteriorly and inferiorly in a supine patient, deepening the costophrenic sulcus.",
        },
      ],
    },
    {
      id: "ct-head",
      title: "CT head: bleeds & stroke",
      minutes: 8,
      summary:
        "Non-contrast CT is the first scan for head injury and acute stroke because it shows fresh blood instantly. The shape of the bleed tells you which layer it is in.",
      examFocus:
        "Extradural vs subdural shape, sutures and midline, SAH in the basal cisterns, density of blood over time, and early CT signs of infarction.",
      mechanism:
        "The dura is tightly stuck to the skull at the sutures. An extradural bleed (usually arterial) has to peel the dura off bone, so it bulges inward as a lens and stops at the sutures. A subdural bleed lies in a potential space with no such tethering, so it spreads along the brain as a crescent across sutures, but it is stopped at the midline by the falx. Fresh clotted blood is dense (bright) because of its protein; as it breaks down over weeks it fades to the same grey as brain and then darker.",
      points: [
        "Extradural haematoma (EDH): biconvex (lentiform), doesn't cross sutures, may cross the midline; middle meningeal artery after temporal bone fracture; classic lucid interval.",
        "Subdural haematoma (SDH): crescentic, crosses sutures, doesn't cross the midline (falx); torn bridging veins — elderly, alcoholics, shaken babies.",
        "Subarachnoid haemorrhage: blood in the basal cisterns and sulci ('star sign'); commonest cause overall is trauma, commonest spontaneous cause is a ruptured berry aneurysm. CT is most sensitive in the first 6 h; if negative, LP for xanthochromia after 12 h.",
        "Blood density over time: acute hyperdense → subacute isodense (1–3 weeks, easy to miss) → chronic hypodense.",
        "Hounsfield units: air −1000, fat about −100, water 0, acute blood about +60 to +80, bone up to +1000.",
        "Acute ischaemic stroke: CT is often normal early; early signs are a hyperdense MCA, loss of the insular ribbon and blurred lentiform nucleus. MRI diffusion-weighted imaging (DWI) shows infarction within minutes.",
        "Diffuse axonal injury: CT may look near-normal; MRI (susceptibility-weighted imaging) shows small haemorrhages at the grey-white junction, corpus callosum and brainstem.",
      ],
      table: {
        title: "EDH vs SDH",
        columns: ["Feature", "Extradural", "Subdural"],
        rows: [
          ["Shape", "Biconvex / lentiform", "Crescentic"],
          ["Crosses sutures", "No", "Yes"],
          ["Crosses midline", "Can", "No (falx)"],
          ["Source", "Middle meningeal artery", "Bridging veins"],
          ["Classic history", "Lucid interval", "Elderly, alcohol, anticoagulants"],
        ],
      },
      pitfalls: [
        "A subacute subdural becomes isodense with brain at 1–3 weeks — look for midline shift and effaced sulci.",
        "A normal CT in the first hours does not exclude ischaemic stroke; its job is to exclude haemorrhage before thrombolysis.",
      ],
      vignette: {
        stem: "A young man hit on the temple with a cricket ball is briefly unconscious, recovers and talks, then deteriorates an hour later. CT shows a biconvex hyperdense collection that stops at the coronal suture.",
        answer: "Extradural haematoma — urgent craniotomy.",
        reasoning:
          "Temporal impact tears the middle meningeal artery; the lens shape bounded by sutures and the lucid interval are classic.",
      },
      highYield:
        "EDH: lens, stops at sutures, arterial, lucid interval. SDH: crescent, crosses sutures, not midline, venous. SAH: basal cisterns; CT then LP. Subacute SDH isodense. DWI earliest for infarct.",
      checks: [
        {
          q: "A crescent-shaped collection that crosses suture lines but not the midline is:",
          options: [
            "Extradural haematoma",
            "Subdural haematoma",
            "Subarachnoid haemorrhage",
            "Intracerebral haemorrhage",
          ],
          answer: 1,
          why: "Subdural blood spreads freely along the brain surface but is stopped by the falx.",
        },
        {
          q: "The most sensitive imaging for an acute ischaemic infarct within the first hour is:",
          options: [
            "Non-contrast CT",
            "CT angiography",
            "MRI diffusion-weighted imaging",
            "Ultrasound",
          ],
          answer: 2,
          why: "Cytotoxic oedema restricts water diffusion almost immediately and lights up on DWI.",
        },
      ],
    },
    {
      id: "abdominal-imaging",
      title: "Abdominal X-ray & GI signs",
      minutes: 8,
      summary:
        "Plain films answer two urgent questions — is there free gas and is the bowel obstructed — while contrast studies and ultrasound give a list of named signs.",
      examFocus:
        "Best film for pneumoperitoneum, small vs large bowel, volvulus, and classic barium and ultrasound signs.",
      mechanism:
        "Free gas rises to the highest point, so on an erect chest film it collects under the domes of the diaphragm, where even a small amount shows up. Small bowel and colon look different because of their folds: small bowel mucosal folds (valvulae conniventes) cross the full width, while colonic haustra only partly cross it. Bowel dilates proximal to an obstruction, and the rule of 3-6-9 gives the upper normal diameters.",
      points: [
        "Pneumoperitoneum: erect chest X-ray is the best plain film (gas under the diaphragm). On a supine film: Rigler's (double-wall) sign; in infants: football sign.",
        "Small bowel: central, valvulae conniventes cross the whole width (stack of coins). Large bowel: peripheral, haustra partly cross.",
        "Rule of 3-6-9: upper limits — small bowel 3 cm, colon 6 cm, caecum 9 cm.",
        "Sigmoid volvulus: coffee-bean sign pointing to the right upper quadrant; caecal volvulus points to the left upper quadrant.",
        "Duodenal atresia: double-bubble sign (associated with Down syndrome).",
        "Hypertrophic pyloric stenosis: ultrasound is the investigation of choice (thickened, elongated pylorus); barium shows string sign and shoulder sign.",
        "Intussusception: target/doughnut sign on ultrasound; claw sign on contrast enema.",
        "Barium signs: bird's beak (achalasia), corkscrew (diffuse oesophageal spasm), string sign of Kantor (Crohn's), lead-pipe colon (ulcerative colitis), apple-core (colon carcinoma), thumbprinting (ischaemic colitis).",
      ],
      table: {
        title: "Small vs large bowel on X-ray",
        columns: ["Feature", "Small bowel", "Large bowel"],
        rows: [
          ["Position", "Central", "Peripheral"],
          ["Folds", "Valvulae conniventes, full width", "Haustra, partial width"],
          ["Upper normal diameter", "3 cm", "6 cm (caecum 9 cm)"],
          ["Contents", "Fluid levels, no faeces", "May contain faeces"],
        ],
      },
      pitfalls: [
        "Never give barium if perforation is suspected — use water-soluble contrast.",
        "Gas under the diaphragm after recent laparotomy can be normal for days.",
      ],
      vignette: {
        stem: "An elderly, constipated nursing-home resident has massive abdominal distension. The X-ray shows a huge inverted-U loop arising from the pelvis and pointing to the right upper quadrant.",
        answer:
          "Sigmoid volvulus — decompress with a flexible sigmoidoscope and flatus tube if there is no gangrene.",
        reasoning:
          "The coffee-bean loop from the pelvis pointing to the right upper quadrant is typical of sigmoid volvulus in the elderly.",
      },
      highYield:
        "Erect CXR for free gas; Rigler's sign supine. 3-6-9 rule. Coffee bean → sigmoid volvulus. Double bubble → duodenal atresia. HPS → ultrasound. Bird's beak achalasia, string of Kantor Crohn's, lead pipe UC.",
      checks: [
        {
          q: "The best plain radiograph to detect a small pneumoperitoneum is:",
          options: [
            "Supine abdominal film",
            "Erect chest X-ray",
            "Lateral abdominal film",
            "Prone abdominal film",
          ],
          answer: 1,
          why: "Free gas rises under the diaphragm in an erect patient and is clearly outlined.",
        },
        {
          q: "'Bird's beak' appearance on barium swallow is typical of:",
          options: [
            "Carcinoma oesophagus",
            "Achalasia cardia",
            "Diffuse oesophageal spasm",
            "Zenker's diverticulum",
          ],
          answer: 1,
          why: "The non-relaxing lower oesophageal sphincter tapers smoothly below a dilated oesophagus.",
        },
      ],
    },
    {
      id: "contrast",
      title: "Contrast agents & reactions",
      minutes: 7,
      summary:
        "Iodinated contrast for X-ray and CT, gadolinium for MRI and barium for the gut each carry their own risks — allergic-like reactions, kidney injury, nephrogenic systemic fibrosis and peritonitis.",
      examFocus:
        "Low-osmolar non-ionic agents, treatment of anaphylactoid reactions, contrast-induced nephropathy, metformin, gadolinium and NSF, and barium in perforation.",
      mechanism:
        "Older ionic, high-osmolar iodinated agents pull fluid and disturb cells, causing more reactions; non-ionic low- or iso-osmolar agents are gentler, which is why they're used now. Most reactions are anaphylactoid — direct mast-cell release rather than IgE — so they can occur on the first exposure and are treated exactly like anaphylaxis. Gadolinium is safe only while it stays bound in its chelate; if kidneys can't clear it, free gadolinium deposits in tissues and drives fibrosis.",
      points: [
        "Use non-ionic, low- or iso-osmolar iodinated contrast; risk factors for reactions are previous reaction, asthma and atopy.",
        "Severe reaction (bronchospasm, hypotension): IM adrenaline 0.5 mg (1:1000) in adults, oxygen, IV fluids.",
        "Premedication for previous reaction: steroids (e.g. prednisolone at 13, 7 and 1 h before) plus an antihistamine.",
        "Contrast-induced nephropathy: creatinine rise within 48–72 h; prevention is IV hydration with isotonic saline.",
        "Metformin: withhold for 48 h after contrast when eGFR is < 30 or there is AKI, because of lactic acidosis risk.",
        "Gadolinium: nephrogenic systemic fibrosis in severe renal failure (eGFR < 30); avoid in pregnancy unless essential.",
        "Barium: never in suspected perforation (barium peritonitis); use water-soluble contrast (gastrografin), but gastrografin aspiration causes pulmonary oedema.",
        "Iodinated contrast blocks thyroid uptake for weeks — schedule radioiodine before it.",
      ],
      flow: {
        title: "Severe contrast reaction",
        steps: [
          {
            label: "Stop the injection, call for help",
            detail: "Assess airway, breathing, circulation",
          },
          {
            label: "IM adrenaline 0.5 mg (1:1000)",
            detail: "Anterolateral thigh; repeat every 5 min if needed",
          },
          { label: "High-flow oxygen, legs up", detail: "Start IV crystalloids for hypotension" },
          { label: "Adjuncts", detail: "Antihistamine, steroids, salbutamol for bronchospasm" },
          { label: "Observe and document", detail: "Flag the allergy for future scans" },
        ],
      },
      pitfalls: [
        "A first-ever contrast exposure can still cause a reaction — it is not IgE-dependent.",
        "Seafood or shellfish allergy is not a specific contraindication to iodinated contrast.",
      ],
      vignette: {
        stem: "A man on dialysis needs an MRI with contrast to characterise a liver lesion.",
        answer: "Avoid gadolinium if possible — risk of nephrogenic systemic fibrosis.",
        reasoning:
          "In severe renal failure gadolinium is retained; if essential, use a low-risk macrocyclic agent and arrange dialysis soon after.",
      },
      highYield:
        "Non-ionic low-osmolar iodinated agents. Severe reaction: IM adrenaline 0.5 mg. CIN at 48–72 h — hydrate. Metformin hold if eGFR < 30. Gadolinium → NSF. No barium in perforation.",
      checks: [
        {
          q: "Nephrogenic systemic fibrosis is associated with:",
          options: ["Iodinated contrast", "Barium sulphate", "Gadolinium", "Microbubble contrast"],
          answer: 2,
          why: "Free gadolinium deposits in tissues when renal clearance is poor.",
        },
        {
          q: "Contrast of choice when bowel perforation is suspected:",
          options: [
            "Barium sulphate",
            "Water-soluble iodinated contrast",
            "Gadolinium",
            "Air only",
          ],
          answer: 1,
          why: "Barium leaking into the peritoneum causes severe granulomatous peritonitis.",
        },
      ],
    },
    {
      id: "ultrasound-fast",
      title: "Ultrasound & FAST",
      minutes: 7,
      summary:
        "Ultrasound is radiation-free, portable and real-time. In trauma the FAST scan looks for free fluid in four windows within minutes at the bedside.",
      examFocus:
        "The four FAST windows and the most sensitive one, eFAST for pneumothorax, frequency vs penetration, and lung ultrasound signs.",
      mechanism:
        "A piezoelectric crystal turns electricity into sound and listens for the echoes. Higher frequencies give finer detail but are absorbed sooner, so superficial structures use high-frequency probes and deep organs use low-frequency ones. Fluid lets sound through without echoes, so blood looks black, and it pools in the most dependent spaces — in a supine patient that's Morison's pouch.",
      points: [
        "FAST windows: pericardial (subxiphoid), right upper quadrant (Morison's pouch — hepatorenal), left upper quadrant (splenorenal), pelvis (pouch of Douglas / rectovesical).",
        "Morison's pouch is the most dependent upper-abdominal space in a supine patient and is usually positive first.",
        "A positive FAST in a haemodynamically unstable patient → laparotomy; stable patients → CT.",
        "eFAST adds the lungs: absent lung sliding and the barcode (stratosphere) sign on M-mode suggest pneumothorax; the lung point is specific. Normal lung gives the seashore sign.",
        "A-lines are normal reverberations; multiple B-lines (comet tails) mean interstitial fluid.",
        "High frequency (7–15 MHz) for thyroid, breast, vessels; low frequency (2–5 MHz) for abdomen and obstetrics.",
        "Gallstones: echogenic foci with posterior acoustic shadowing that move with posture. Ultrasound is the investigation of choice for gallstones.",
      ],
      flow: {
        title: "FAST sequence",
        steps: [
          { label: "Pericardial view", detail: "Subxiphoid — tamponade?" },
          { label: "Right upper quadrant", detail: "Morison's pouch — most sensitive" },
          { label: "Left upper quadrant", detail: "Splenorenal recess" },
          { label: "Pelvis", detail: "Behind the bladder" },
          { label: "eFAST: both lungs", detail: "Lung sliding for pneumothorax" },
        ],
      },
      pitfalls: [
        "FAST misses retroperitoneal and hollow-viscus injuries — a negative scan doesn't exclude them.",
        "Small volumes of fluid (< 200 ml or so) may be missed; repeat the scan if the patient changes.",
      ],
      vignette: {
        stem: "After a road accident a hypotensive patient has free fluid in Morison's pouch on FAST despite two litres of fluid.",
        answer: "Proceed to emergency laparotomy.",
        reasoning: "Unstable patients with a positive FAST go to theatre; there's no time for CT.",
      },
      highYield:
        "FAST = pericardium, Morison's, splenorenal, pelvis. Morison's pouch positive first. Unstable + FAST positive → laparotomy. eFAST: no sliding + barcode sign = pneumothorax.",
      checks: [
        {
          q: "The FAST window most likely to show free fluid first in a supine patient is:",
          options: [
            "Pericardial",
            "Hepatorenal (Morison's pouch)",
            "Splenorenal",
            "Pouch of Douglas",
          ],
          answer: 1,
          why: "Morison's pouch is the most dependent upper-abdominal recess when supine.",
        },
        {
          q: "Barcode (stratosphere) sign on M-mode lung ultrasound indicates:",
          options: ["Pleural effusion", "Pneumothorax", "Consolidation", "Normal lung"],
          answer: 1,
          why: "Without lung sliding, the M-mode pattern is all horizontal lines.",
        },
      ],
    },
    {
      id: "mri",
      title: "MRI sequences & safety",
      minutes: 7,
      summary:
        "MRI uses a strong magnetic field and radio waves to image hydrogen nuclei, giving the best soft-tissue contrast without radiation. Each sequence highlights a different tissue property.",
      examFocus:
        "What looks bright on T1, T2, FLAIR and DWI; MRI contraindications; and the investigation of choice for common clinical questions.",
      mechanism:
        "Protons line up in the magnet, are tipped by a radio pulse, and then relax back at rates that depend on their surroundings. Fat relaxes quickly (short T1), so it is bright on T1; water stays out of phase longer (long T2), so it is bright on T2. Most disease means more water, so T2 shows pathology, while T1 shows anatomy. FLAIR is a T2 image with free CSF signal cancelled so lesions next to ventricles stand out; DWI catches water that can't move freely, as in swollen infarcted cells.",
      points: [
        "T1: fat bright, fluid dark — good for anatomy and, with gadolinium, enhancement.",
        "T2: fluid bright — oedema, cysts, inflammation, most pathology.",
        "FLAIR: T2 with CSF suppressed — periventricular demyelinating plaques in multiple sclerosis.",
        "DWI: acute infarct is bright (restricted diffusion) within minutes; also abscess and epidermoid.",
        "Contraindications: non-MRI-conditional pacemakers and defibrillators, cochlear implants, ferromagnetic aneurysm clips, metallic foreign body in the eye (screen with an orbit X-ray).",
        "MRI without gadolinium is acceptable in pregnancy when needed.",
        "Investigation of choice: MRI for spinal cord compression, posterior fossa lesions, soft-tissue tumours, internal derangement of the knee; MRCP for the biliary tree.",
      ],
      table: {
        title: "Investigation of choice",
        columns: ["Question", "Best test"],
        rows: [
          ["Acute head injury / suspected bleed", "Non-contrast CT"],
          ["Spinal cord compression", "MRI"],
          ["Interstitial lung disease, bronchiectasis", "HRCT"],
          ["Pulmonary embolism", "CT pulmonary angiography"],
          ["Gallstones", "Ultrasound"],
          ["Renal stones", "Non-contrast CT KUB"],
          ["Aortic dissection (stable)", "CT angiography"],
          ["Early osteomyelitis", "MRI"],
        ],
      },
      pitfalls: [
        "Cortical bone and calcification are dark on all MRI sequences — CT is better for fractures and calcification.",
        "A dental filling isn't a contraindication; ferromagnetic fragments near the eye or vessels are.",
      ],
      mnemonic: "'World War 2' — Water is White on T2.",
      vignette: {
        stem: "A 28-year-old woman with optic neuritis has an MRI showing ovoid lesions at right angles to the lateral ventricles, best seen on one sequence.",
        answer: "Multiple sclerosis — FLAIR shows Dawson's fingers best.",
        reasoning:
          "FLAIR suppresses CSF so periventricular plaques stand out instead of blending with the bright ventricles on T2.",
      },
      highYield:
        "T1 fat bright (anatomy), T2 water bright (pathology), FLAIR for MS plaques, DWI for acute infarct. Metal in the eye is a contraindication. MRI for cord compression; HRCT for ILD.",
      checks: [
        {
          q: "Periventricular MS plaques are best seen on:",
          options: ["T1", "FLAIR", "DWI", "Gradient echo"],
          answer: 1,
          why: "FLAIR nulls the bright CSF so lesions next to the ventricles stand out.",
        },
        {
          q: "Investigation of choice for interstitial lung disease:",
          options: ["Chest X-ray", "MRI chest", "HRCT", "PET-CT"],
          answer: 2,
          why: "High-resolution CT shows fine interstitial detail and the pattern of fibrosis.",
        },
      ],
    },
    {
      id: "radiotherapy-nuclear",
      title: "Radiotherapy & nuclear medicine",
      minutes: 8,
      summary:
        "Radiotherapy kills tumour cells by damaging DNA in fractions that spare normal tissue; nuclear medicine uses short-lived isotopes to show organ function.",
      examFocus:
        "The 4 Rs of radiobiology, the oxygen effect, radiosensitive and radioresistant tumours, Co-60 and Tc-99m, and which scan for which question.",
      mechanism:
        "Splitting a dose into fractions exploits the difference between normal and tumour tissue: between fractions normal cells repair sublethal damage better, surviving tumour cells move into sensitive cycle phases (redistribution) and hypoxic tumour cells regain oxygen (reoxygenation). Oxygen 'fixes' radiation damage by forming peroxides from DNA radicals, so well-oxygenated cells are about three times more sensitive — the oxygen enhancement ratio.",
      points: [
        "4 Rs: Repair, Redistribution (reassortment), Reoxygenation, Repopulation — plus intrinsic Radiosensitivity as the 5th R.",
        "Oxygen enhancement ratio ~2.5–3: hypoxic cells are radioresistant.",
        "Very radiosensitive tumours: seminoma, dysgerminoma, lymphoma. Radioresistant: melanoma, osteosarcoma, renal cell carcinoma.",
        "Teletherapy: cobalt-60 (gamma rays ~1.25 MeV, half-life ~5.3 years) and linear accelerators. Brachytherapy (source inside or next to the tumour): iridium-192, caesium-137 — classically for cervical cancer.",
        "Radiosensitisers: cisplatin, 5-FU; radioprotector: amifostine.",
        "Technetium-99m is the commonest isotope: half-life 6 h, pure gamma ~140 keV — ideal for imaging.",
        "PET uses F-18 FDG (half-life ~110 min) to show glucose uptake — staging cancers and detecting recurrence.",
      ],
      table: {
        title: "Which scan?",
        columns: ["Question", "Scan"],
        rows: [
          ["Acute cholecystitis", "HIDA (non-filling gallbladder)"],
          ["Meckel's diverticulum", "Tc-99m pertechnetate"],
          ["Renal scarring (pyelonephritis)", "DMSA"],
          ["Split GFR / obstruction", "DTPA / MAG3"],
          ["Bone metastases", "Tc-99m MDP bone scan"],
          ["Parathyroid adenoma", "Sestamibi"],
          ["Phaeochromocytoma, neuroblastoma", "MIBG"],
          ["Thyroid ablation", "I-131"],
        ],
      },
      pitfalls: [
        "Multiple myeloma lesions are often cold on a bone scan — use skeletal survey, CT or MRI.",
        "Pertechnetate finds Meckel's because it is taken up by ectopic gastric mucosa, not intestinal mucosa.",
      ],
      mnemonic: "Radiobiology's 4 Rs: 'Repair, Redistribute, Reoxygenate, Repopulate'.",
      vignette: {
        stem: "A child with painless rectal bleeding has a normal upper endoscopy and colonoscopy.",
        answer: "Tc-99m pertechnetate scan for Meckel's diverticulum.",
        reasoning:
          "Ectopic gastric mucosa in a Meckel's diverticulum takes up pertechnetate and causes painless bleeding in children.",
      },
      highYield:
        "4 Rs + radiosensitivity. Hypoxia → radioresistance (OER ~3). Seminoma/lymphoma very sensitive; melanoma resistant. Co-60 teletherapy; Ir-192 brachytherapy. Tc-99m t½ 6 h. HIDA cholecystitis, DMSA scarring, MIBG phaeo.",
      checks: [
        {
          q: "Which tumour is the most radiosensitive?",
          options: ["Melanoma", "Osteosarcoma", "Seminoma", "Renal cell carcinoma"],
          answer: 2,
          why: "Seminoma is exquisitely radiosensitive, so low doses cure it.",
        },
        {
          q: "Investigation of choice for renal cortical scarring in a child:",
          options: ["DTPA scan", "DMSA scan", "MAG3 scan", "Micturating cystourethrogram"],
          answer: 1,
          why: "DMSA binds to the proximal tubular cells of the cortex and shows scars as defects.",
        },
      ],
    },
  ],
};
