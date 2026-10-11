import type { LearnModule } from "../learn";

export const physiology: LearnModule = {
  slug: "physiology",
  group: "Pre-clinical",
  subject: "Physiology",
  icon: "monitor_heart",
  blurb:
    "Cardiac cycle, pressure–volume loops, acid–base, nephron transport and action potentials — number-driven concepts with easy marks.",
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
    "Predict shifts of the oxygen–haemoglobin dissociation curve.",
    "Derive lung capacities from volumes and separate obstructive from restrictive patterns.",
    "Match each GI hormone to its cell, stimulus and action.",
    "Identify sleep stages from EEG waves and link them to sleep disorders.",
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
      highYield:
        "Loss of the isovolumetric contraction segment on the PV loop = mitral regurgitation.",
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
          [
            "Thiazide",
            "Distal convoluted tubule",
            "Excretion ↓",
            "Hyponatraemia, hyperglycaemia, hyperuricaemia",
          ],
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
        reasoning:
          "Thiazides enhance distal calcium reabsorption, lowering urinary calcium and reducing stone formation.",
      },
      highYield:
        "Thiazides cause hypercalcaemia and hypocalciuria; loop diuretics do the opposite.",
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
        reasoning:
          "Blocking repolarising potassium current lengthens phase 3, prolonging QT and permitting early afterdepolarisations.",
      },
      highYield:
        "The cardiac plateau (phase 2) is L-type calcium influx — blocking it is how verapamil slows AV conduction.",
      figure: {
        file: "Action potential.svg",
        caption:
          "Neuronal action potential with depolarisation, repolarisation and hyperpolarisation",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "odc",
      title: "Oxygen–haemoglobin dissociation curve",
      minutes: 7,
      summary:
        "The sigmoid curve shows how saturated haemoglobin is at each oxygen tension; shifting it right or left changes how readily oxygen is released to tissues.",
      examFocus:
        "P50, causes of right and left shift, the Bohr and Haldane effects, fetal haemoglobin and carbon monoxide.",
      mechanism:
        "Haemoglobin has four subunits that bind oxygen cooperatively: once one binds, the molecule shifts from the tense (T) to the relaxed (R) state and the rest bind more easily. That gives the S-shaped curve — flat at the top so arterial saturation stays high even if PO2 falls a little, and steep in the middle so small drops in tissue PO2 unload a lot of oxygen. Acid, CO2, heat and 2,3-BPG stabilise the T state, lowering affinity (right shift) exactly where tissues are working hardest.",
      points: [
        "P50 (PO2 at 50% saturation) is about 26–27 mmHg. A higher P50 = right shift = lower affinity.",
        "Arterial blood: PO2 ~100 mmHg, saturation ~97%. Mixed venous: PO2 ~40 mmHg, saturation ~75%.",
        "Right shift: ↑ CO2, ↑ H+ (↓ pH), ↑ temperature, ↑ 2,3-BPG, exercise, high altitude.",
        "Left shift: fetal haemoglobin (binds 2,3-BPG poorly), carbon monoxide, methaemoglobin, alkalosis, hypothermia, stored blood (low 2,3-BPG).",
        "Bohr effect: CO2 and acid reduce Hb's O2 affinity (helps unloading in tissues). Haldane effect: deoxygenated Hb carries more CO2 (helps loading CO2 in tissues and unloading in lungs).",
        "Myoglobin has a hyperbolic curve far to the left — it releases oxygen only at very low PO2.",
        "Carbon monoxide both occupies binding sites and shifts the curve left; pulse oximetry reads falsely normal.",
      ],
      pitfalls: [
        "Anaemia lowers oxygen content but not saturation or PaO2.",
        "Stored blood has low 2,3-BPG, so it delivers oxygen poorly for the first hours after transfusion.",
      ],
      mnemonic: "Right shift — 'CADET, face Right': CO2, Acid, 2,3-DPG, Exercise, Temperature.",
      vignette: {
        stem: "A mountaineer adapts to 4000 m over a week. Her red cells show a rise in 2,3-BPG.",
        answer: "The curve shifts right — oxygen is unloaded more easily to tissues.",
        reasoning:
          "Hypoxia stimulates 2,3-BPG production in red cells, which lowers haemoglobin affinity and raises P50.",
      },
      highYield:
        "P50 ~27 mmHg. Right shift: CO2, acid, 2,3-BPG, exercise, temperature. Left: HbF, CO, MetHb, alkalosis, cold. Myoglobin hyperbolic, far left.",
      checks: [
        {
          q: "Which shifts the oxygen dissociation curve to the left?",
          options: ["Fever", "Acidosis", "Carbon monoxide", "Raised 2,3-BPG"],
          answer: 2,
          why: "CO increases the affinity of the remaining haem sites, holding on to oxygen.",
        },
        {
          q: "Fetal haemoglobin has a higher oxygen affinity because it:",
          options: [
            "Has more haem groups",
            "Binds 2,3-BPG poorly",
            "Contains beta chains",
            "Is not cooperative",
          ],
          answer: 1,
          why: "Gamma chains bind 2,3-BPG weakly, so HbF stays in the high-affinity state.",
        },
      ],
    },
    {
      id: "lung-volumes",
      title: "Lung volumes, compliance & surfactant",
      minutes: 8,
      summary:
        "Four lung volumes combine into four capacities; spirometry and flow-volume patterns separate obstructive from restrictive disease, and surfactant keeps small alveoli open.",
      examFocus:
        "Values of each volume and capacity, which ones spirometry can't measure, FEV1/FVC patterns, compliance and surfactant.",
      mechanism:
        "A spirometer only measures air that moves in and out, so the residual volume left in the lungs — and any capacity that includes it (FRC, TLC) — needs another method such as helium dilution or body plethysmography. By Laplace's law the pressure tending to collapse an alveolus is 2T/r, so small alveoli would empty into large ones; surfactant lowers surface tension more in small alveoli, stabilising them. In obstruction, air is trapped behind narrowed airways (high RV and TLC); in restriction, stiff lungs shrink all volumes.",
      points: [
        "Volumes (adult male approx.): tidal 500 ml, inspiratory reserve 3000 ml, expiratory reserve 1100 ml, residual 1200 ml.",
        "Capacities: inspiratory capacity = TV + IRV; FRC = ERV + RV (~2.3 l); vital capacity = IRV + TV + ERV (~4.6 l); TLC = all four (~5.8 l).",
        "RV, FRC and TLC cannot be measured by simple spirometry — use helium dilution, nitrogen washout or body plethysmography.",
        "Obstructive (asthma, COPD): FEV1/FVC < 0.7, RV and TLC raised. Restrictive (fibrosis): FEV1/FVC normal or high, TLC reduced.",
        "Compliance rises in emphysema and old age; falls in fibrosis, pulmonary oedema and surfactant deficiency.",
        "Surfactant (dipalmitoyl phosphatidylcholine) from type II pneumocytes appears from ~24 weeks; lecithin/sphingomyelin ratio > 2 means mature lungs.",
        "Anatomical dead space is ~150 ml (Fowler's method); physiological dead space by Bohr's equation. Alveolar ventilation = (TV − dead space) × rate.",
      ],
      table: {
        title: "Obstructive vs restrictive",
        columns: ["Measure", "Obstructive", "Restrictive"],
        rows: [
          ["FEV1", "↓↓", "↓"],
          ["FVC", "↓ or normal", "↓↓"],
          ["FEV1/FVC", "< 0.7", "Normal or ↑"],
          ["TLC", "↑", "↓"],
          ["RV", "↑ (air trapping)", "↓"],
        ],
      },
      pitfalls: [
        "Vital capacity excludes residual volume; total lung capacity includes it.",
        "Rapid shallow breathing wastes ventilation on dead space even if minute ventilation is normal.",
      ],
      vignette: {
        stem: "A 35-year-old has FEV1 60% predicted, FVC 62% predicted, FEV1/FVC 0.85 and reduced TLC.",
        answer: "Restrictive pattern (e.g. interstitial lung disease).",
        reasoning:
          "Both volumes fall proportionately so the ratio is preserved or high, and the reduced TLC confirms restriction.",
      },
      highYield:
        "FRC = ERV + RV; can't be measured by spirometry. Obstructive: ratio < 0.7, TLC ↑. Restrictive: ratio normal/↑, TLC ↓. Surfactant from type II cells; L/S > 2 = mature.",
      checks: [
        {
          q: "Which cannot be measured by simple spirometry?",
          options: [
            "Tidal volume",
            "Vital capacity",
            "Functional residual capacity",
            "Inspiratory capacity",
          ],
          answer: 2,
          why: "FRC includes the residual volume, which never leaves the lungs.",
        },
        {
          q: "Surfactant is secreted by:",
          options: [
            "Type I pneumocytes",
            "Type II pneumocytes",
            "Clara cells only",
            "Alveolar macrophages",
          ],
          answer: 1,
          why: "Type II pneumocytes store surfactant in lamellar bodies.",
        },
      ],
    },
    {
      id: "gi-hormones",
      title: "GI hormones & gastric acid",
      minutes: 7,
      summary:
        "Gut hormones coordinate digestion: gastrin drives acid, secretin neutralises it, CCK brings bile and enzymes, and the incretins prime insulin release.",
      examFocus:
        "Cell of origin and stimulus for each hormone, regulation of acid secretion, and the incretin effect.",
      mechanism:
        "Each hormone is released by what it's meant to handle. Acid entering the duodenum releases secretin, which brings bicarbonate to neutralise it. Fat and protein release CCK, which empties the gallbladder and calls for pancreatic enzymes. Glucose in the gut releases GIP and GLP-1, so oral glucose triggers more insulin than the same glucose given intravenously — the incretin effect. Acid itself switches off gastrin through somatostatin, a classic negative feedback loop.",
      points: [
        "Gastrin — G cells of the gastric antrum: ↑ acid; stimulated by peptides, distension and vagal GRP; inhibited by acid (via somatostatin). Excess in Zollinger–Ellison syndrome.",
        "Secretin — S cells of the duodenum: pancreatic and biliary bicarbonate; stimulated by acid. The first hormone discovered (Bayliss and Starling).",
        "CCK — I cells of the duodenum and jejunum: gallbladder contraction, pancreatic enzymes, relaxes sphincter of Oddi; stimulated by fat and amino acids.",
        "GIP (K cells) and GLP-1 (L cells of ileum): incretins — glucose-dependent insulin release.",
        "Motilin: migrating motor complex in fasting; erythromycin acts on motilin receptors.",
        "Somatostatin (D cells): inhibits almost everything. Ghrelin (stomach): stimulates hunger.",
        "Parietal cell acid: H+/K+ ATPase (proton pump); stimulated by acetylcholine (M3), gastrin and histamine (H2, via cAMP). Parietal cells also make intrinsic factor.",
      ],
      table: {
        title: "Hormone, cell, stimulus",
        columns: ["Hormone", "Cell", "Stimulus", "Main action"],
        rows: [
          ["Gastrin", "G (antrum)", "Peptides, distension, vagus", "Acid secretion"],
          ["Secretin", "S (duodenum)", "Acid in duodenum", "Bicarbonate"],
          ["CCK", "I (duodenum)", "Fat, amino acids", "Gallbladder, enzymes"],
          ["GIP", "K (duodenum)", "Glucose, fat", "Insulin release"],
          ["Motilin", "M (small bowel)", "Fasting", "Migrating motor complex"],
        ],
      },
      pitfalls: [
        "Secretin increases bicarbonate, not enzymes; CCK increases enzymes.",
        "PPIs block the final common pathway of acid; H2 blockers only remove the histamine stimulus.",
      ],
      vignette: {
        stem: "A patient with multiple jejunal ulcers and diarrhoea has a fasting gastrin of 1200 pg/ml that rises further after IV secretin.",
        answer: "Zollinger–Ellison syndrome (gastrinoma).",
        reasoning:
          "Secretin normally suppresses gastrin, but gastrinoma cells paradoxically release more — a positive secretin stimulation test.",
      },
      highYield:
        "Gastrin G cells (acid); secretin S cells (HCO3−); CCK I cells (gallbladder + enzymes); GIP K cells, GLP-1 L cells (incretins). Motilin ↔ erythromycin. Acid via H+/K+ ATPase.",
      checks: [
        {
          q: "The main stimulus for secretin release is:",
          options: [
            "Fat in the duodenum",
            "Acid in the duodenum",
            "Gastric distension",
            "Vagal stimulation",
          ],
          answer: 1,
          why: "Secretin brings bicarbonate to neutralise acid arriving from the stomach.",
        },
        {
          q: "Oral glucose causes more insulin release than IV glucose because of:",
          options: ["Gastrin", "Incretins (GIP, GLP-1)", "Secretin", "Somatostatin"],
          answer: 1,
          why: "Gut glucose releases the incretins, which amplify glucose-stimulated insulin secretion.",
        },
      ],
    },
    {
      id: "sleep-eeg",
      title: "Sleep stages & EEG",
      minutes: 6,
      summary:
        "EEG waves slow and grow larger as sleep deepens from N1 to N3, then REM sleep brings an awake-looking EEG with paralysed muscles and dreams.",
      examFocus:
        "EEG wave frequencies, the markers of N2, what happens in N3 and REM, and the sleep stage of each parasomnia.",
      mechanism:
        "Awake and alert, cortical neurons fire independently, giving fast, low-amplitude beta waves. As sleep deepens they fire in synchrony, so waves become slower and taller until N3's delta waves. In REM sleep the cortex becomes active again (fast EEG) but the brainstem actively paralyses skeletal muscles, so dreams aren't acted out — which is why REM is called paradoxical sleep.",
      points: [
        "Beta (> 13 Hz): alert, eyes open. Alpha (8–13 Hz): awake, relaxed, eyes closed — best over the occiput. Theta (4–7 Hz): N1 drowsiness. Delta (< 4 Hz, high amplitude): N3 deep sleep.",
        "N2: sleep spindles and K complexes; makes up the largest share of sleep (~45–50%).",
        "N3 (slow-wave sleep): hardest to wake, peak growth hormone release; sleepwalking, night terrors and bedwetting arise here.",
        "REM: sawtooth fast waves, rapid eye movements, muscle atonia, dreams and nightmares, penile tumescence, variable pulse and BP. ~20–25% of adult sleep; ~50% in newborns.",
        "First REM period starts ~90 minutes after sleep onset; REM periods lengthen towards morning.",
        "Depression: shortened REM latency, more REM. Narcolepsy: sleep-onset REM, cataplexy, low orexin (hypocretin).",
        "Benzodiazepines reduce N3 and REM.",
      ],
      table: {
        title: "Stage and its waves",
        columns: ["Stage", "EEG", "Clinical link"],
        rows: [
          ["Awake, eyes closed", "Alpha", "Relaxed wakefulness"],
          ["N1", "Theta", "Drowsiness, hypnic jerks"],
          ["N2", "Spindles, K complexes", "Bruxism; most of total sleep"],
          ["N3", "Delta", "Night terrors, sleepwalking, enuresis"],
          ["REM", "Beta-like, sawtooth", "Nightmares, dreams, atonia"],
        ],
      },
      pitfalls: [
        "Night terrors (N3) leave no memory; nightmares (REM) are remembered.",
        "Alpha waves disappear when the eyes open (alpha block).",
      ],
      mnemonic: "Wave frequency, high to low: 'BAT Drop' — Beta, Alpha, Theta, Delta.",
      vignette: {
        stem: "A 6-year-old sits up screaming an hour after falling asleep, can't be consoled, and remembers nothing in the morning.",
        answer: "Night terror — a parasomnia of N3 (slow-wave) sleep.",
        reasoning:
          "Episodes in the first third of the night, with no recall, arise from deep slow-wave sleep rather than REM.",
      },
      highYield:
        "Alpha = relaxed, eyes closed. N2 = spindles + K complexes. N3 = delta, sleepwalking, night terrors, GH. REM = sawtooth, atonia, nightmares. Narcolepsy = sleep-onset REM.",
      checks: [
        {
          q: "Sleep spindles and K complexes are characteristic of:",
          options: ["N1", "N2", "N3", "REM"],
          answer: 1,
          why: "They are the hallmarks of stage N2 sleep.",
        },
        {
          q: "Sleepwalking occurs during:",
          options: ["REM sleep", "N1", "N3 (slow-wave sleep)", "Wakefulness"],
          answer: 2,
          why: "Sleepwalking, like night terrors, is a disorder of arousal from deep slow-wave sleep.",
        },
      ],
    },
  ],
};
