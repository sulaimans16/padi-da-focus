import type { LearnModule } from "../learn";

export const physiology: LearnModule = {
  slug: "physiology",
  group: "Pre-clinical",
  subject: "Physiology",
  icon: "monitor_heart",
  blurb: "Cardiac cycle, pressure–volume loops, acid–base, nephron transport and action potentials — number-driven concepts with easy marks.",
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
      highYield: "Loss of the isovolumetric contraction segment on the PV loop = mitral regurgitation.",
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
          ["Thiazide", "Distal convoluted tubule", "Excretion ↓", "Hyponatraemia, hyperglycaemia, hyperuricaemia"],
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
        reasoning: "Thiazides enhance distal calcium reabsorption, lowering urinary calcium and reducing stone formation.",
      },
      highYield: "Thiazides cause hypercalcaemia and hypocalciuria; loop diuretics do the opposite.",
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
        reasoning: "Blocking repolarising potassium current lengthens phase 3, prolonging QT and permitting early afterdepolarisations.",
      },
      highYield: "The cardiac plateau (phase 2) is L-type calcium influx — blocking it is how verapamil slows AV conduction.",
      figure: {
        file: "Action potential.svg",
        caption: "Neuronal action potential with depolarisation, repolarisation and hyperpolarisation",
        credit: "Wikimedia Commons",
      },
    },
  ],
};
