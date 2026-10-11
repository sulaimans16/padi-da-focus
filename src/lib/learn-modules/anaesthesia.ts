import type { LearnModule } from "../learn";

export const anaesthesia: LearnModule = {
  slug: "anaesthesia",
  group: "Clinical",
  subject: "Anaesthesia",
  icon: "airwave",
  blurb:
    "Pre-op assessment, the airway, inhalational and IV agents, muscle relaxants, local anaesthetics, neuraxial blocks and malignant hyperthermia.",
  objectives: [
    "Grade a patient by ASA and apply the fasting guidelines.",
    "Predict a difficult airway and confirm tube placement correctly.",
    "Pick the induction agent and inhalational agent for a given patient.",
    "Use succinylcholine, rocuronium and their reversal safely.",
    "Recognise local anaesthetic toxicity, spinal complications and malignant hyperthermia.",
  ],
  concepts: [
    {
      id: "preop",
      title: "Pre-anaesthetic assessment: ASA and fasting",
      minutes: 6,
      summary:
        "Before any anaesthetic, classify physical status with the ASA scale and ensure appropriate fasting to minimise the risk of aspiration.",
      examFocus:
        "ASA classes I–VI and fasting times for clear fluids, breast milk, formula and solids.",
      mechanism:
        "General anaesthesia abolishes protective airway reflexes and relaxes the lower oesophageal sphincter, so gastric contents can be regurgitated and aspirated into the lungs (Mendelson's syndrome). Fasting times reflect how quickly each substance leaves the stomach: clear fluids empty within an hour or two, breast milk faster than formula, and fat- or protein-rich meals slowest. ASA grading summarises the patient's systemic disease burden, which correlates with perioperative risk.",
      points: [
        "ASA I: healthy. II: mild systemic disease. III: severe systemic disease. IV: severe systemic disease that is a constant threat to life. V: moribund, not expected to survive without the operation. VI: brain-dead organ donor. 'E' suffix for emergency.",
        "Fasting: clear fluids 2 h, breast milk 4 h, infant formula/non-human milk 6 h, light meal 6 h, fried/fatty meal 8 h.",
        "Continue most antihypertensives (except usually ACE inhibitors/ARBs on the morning of surgery) and β-blockers; stop anticoagulants per guidance.",
        "Rapid sequence induction for patients at risk of aspiration (full stomach, pregnancy, bowel obstruction): preoxygenation, cricoid pressure, rapid-onset relaxant, no bag-mask ventilation.",
        "Aspiration prophylaxis: H2 blockers/PPIs, sodium citrate, metoclopramide.",
      ],
      table: {
        title: "Fasting guidelines (ASA)",
        columns: ["Intake", "Minimum fast"],
        rows: [
          ["Clear fluids", "2 hours"],
          ["Breast milk", "4 hours"],
          ["Infant formula / non-human milk", "6 hours"],
          ["Light meal", "6 hours"],
          ["Fried / fatty meal", "8 hours"],
        ],
      },
      pitfalls: [
        "Breast milk (4 h) and formula (6 h) have different fasting times.",
        "A well-controlled hypertensive is ASA II; ASA III requires severe disease with functional limitation.",
      ],
      vignette: {
        stem: "A 60-year-old with poorly controlled diabetes, stable angina limiting activity, and morbid obesity is posted for elective hernia repair.",
        answer: "ASA III.",
        reasoning:
          "Severe systemic disease with functional limitation, but not a constant threat to life.",
      },
      highYield:
        "ASA I healthy → VI brain-dead donor; 'E' for emergency. Fasting: clear 2 h, breast milk 4 h, formula 6 h, light meal 6 h, fatty 8 h.",
      checks: [
        {
          q: "Minimum fasting time for breast milk before anaesthesia:",
          options: ["2 hours", "4 hours", "6 hours", "8 hours"],
          answer: 1,
          why: "Breast milk empties faster than formula; 4 hours is recommended.",
        },
        {
          q: "A brain-dead patient for organ harvest is ASA class:",
          options: ["IV", "V", "VI", "E"],
          answer: 2,
          why: "ASA VI is a declared brain-dead organ donor.",
        },
      ],
    },
    {
      id: "airway",
      title: "Airway assessment and intubation",
      minutes: 7,
      summary:
        "Predict difficulty before induction (Mallampati, thyromental distance), have a plan for failure, and confirm tube placement with capnography.",
      examFocus:
        "Mallampati classes, the gold standard for confirming tracheal intubation, and the difficult airway rescue sequence.",
      mechanism:
        "The view of the larynx depends on how much the tongue and soft tissues obstruct the line of sight and how far the jaw can be displaced. Mallampati grading uses the visible pharyngeal structures as a proxy for tongue size relative to the oral cavity, and a short thyromental distance means little space to displace the tongue during laryngoscopy. Capnography confirms intubation physiologically: only a tube in the airway returns a sustained CO₂ waveform from the lungs breath after breath.",
      points: [
        "Mallampati: I — soft palate, fauces, uvula, pillars visible; II — soft palate, fauces, uvula; III — soft palate, base of uvula; IV — only hard palate.",
        "Other predictors: thyromental distance < 6 cm, mouth opening < 3 cm, limited neck extension, obesity, beard ('LEMON' assessment).",
        "Cormack–Lehane grades describe the actual laryngoscopic view (grade 1 full glottis → grade 4 no laryngeal structures).",
        "Confirm tube placement: sustained end-tidal CO₂ (capnography waveform) is the gold standard; chest rise and auscultation support it.",
        "Difficult airway plan: optimise and re-attempt intubation (video laryngoscope, bougie) → supraglottic airway (LMA) → bag-mask → 'can't intubate, can't oxygenate' → front-of-neck access (cricothyroidotomy).",
        "Cricoid pressure (Sellick's manoeuvre) is applied during rapid sequence induction.",
      ],
      pitfalls: [
        "Bilateral breath sounds can be heard with oesophageal intubation — trust the capnograph.",
        "Mallampati is assessed with the patient sitting, mouth fully open, tongue protruded and no phonation.",
      ],
      vignette: {
        stem: "After intubation, the capnograph shows a small CO₂ trace that disappears after a few breaths, and SpO₂ begins to fall.",
        answer: "Oesophageal intubation — remove the tube and reoxygenate.",
        reasoning:
          "A transient CO₂ trace (from gastric gas) that fades indicates the tube is not in the trachea.",
      },
      highYield:
        "Mallampati I–IV (IV = hard palate only). Capnography = gold standard for tube confirmation. CICO → cricothyroidotomy. Sellick's in RSI.",
      checks: [
        {
          q: "Best method to confirm correct placement of an endotracheal tube:",
          options: [
            "Auscultation",
            "Chest X-ray",
            "End-tidal CO₂ (capnography)",
            "Misting of the tube",
          ],
          answer: 2,
          why: "A sustained capnography waveform is the most reliable confirmation.",
        },
        {
          q: "In Mallampati class III, the structures visible are:",
          options: [
            "Soft palate, fauces, uvula, pillars",
            "Soft palate, base of uvula",
            "Hard palate only",
            "Soft palate, fauces, uvula",
          ],
          answer: 1,
          why: "Class III shows the soft palate and base of uvula.",
        },
      ],
    },
    {
      id: "inhalational",
      title: "Inhalational anaesthetic agents",
      minutes: 8,
      summary:
        "Potency is measured by MAC and speed of induction by the blood:gas partition coefficient; each agent has a signature feature the exam tests.",
      examFocus:
        "MAC concept, blood:gas coefficients, agent of choice for inhalational induction, and N₂O effects.",
      mechanism:
        "Anaesthesia depends on the partial pressure of agent in the brain, which follows the partial pressure in the alveoli. An agent that is poorly soluble in blood (low blood:gas coefficient) saturates the blood quickly, so alveolar and brain partial pressures rise fast — rapid induction and recovery. MAC, the alveolar concentration that prevents movement to incision in 50% of patients, is the potency index: the lower the MAC, the more potent the agent.",
      points: [
        "Lower blood:gas coefficient = faster induction and recovery: desflurane (0.42) < N₂O (0.47) < sevoflurane (0.65) < isoflurane (1.4) < halothane (2.4).",
        "MAC (approx.): halothane 0.75%, isoflurane 1.15%, sevoflurane 2%, desflurane 6%, N₂O 104%. MAC falls with age, hypothermia, pregnancy, opioids.",
        "Sevoflurane: non-pungent, sweet — inhalational induction of choice (children); forms compound A with CO₂ absorbents.",
        "Desflurane: pungent (not for inhalational induction), needs a heated, pressurised vaporiser; fastest recovery.",
        "Halothane: halothane hepatitis, sensitises the myocardium to catecholamines (arrhythmias), bronchodilator.",
        "N₂O: weak, second gas effect, diffusion hypoxia at the end (give 100% O₂), expands air spaces (avoid in pneumothorax, bowel obstruction, middle ear surgery), inactivates vitamin B12.",
      ],
      table: {
        title: "Inhalational agents",
        columns: ["Agent", "Blood:gas", "Key feature"],
        rows: [
          ["Desflurane", "0.42", "Fastest recovery; pungent; heated vaporiser"],
          ["Nitrous oxide", "0.47", "Diffusion hypoxia; expands air spaces"],
          ["Sevoflurane", "0.65", "Induction of choice (children); compound A"],
          ["Isoflurane", "1.4", "Coronary steal (theoretical)"],
          ["Halothane", "2.4", "Hepatitis; arrhythmias with adrenaline"],
        ],
      },
      pitfalls: [
        "Low MAC means high potency — don't confuse MAC with speed.",
        "Diffusion hypoxia occurs at the end of anaesthesia when N₂O floods back into the alveoli.",
      ],
      vignette: {
        stem: "A 4-year-old with a needle phobia needs a general anaesthetic for a short procedure, without an IV line at induction.",
        answer: "Inhalational induction with sevoflurane.",
        reasoning:
          "Sevoflurane is non-irritant, pleasant and fast — ideal for gas induction in children.",
      },
      highYield:
        "Low blood:gas = fast (desflurane fastest). Low MAC = potent. Sevoflurane for gas induction. N₂O: diffusion hypoxia, expands air spaces, B12. Halothane: hepatitis.",
      checks: [
        {
          q: "Inhalational agent of choice for induction in children:",
          options: ["Desflurane", "Isoflurane", "Sevoflurane", "Halothane"],
          answer: 2,
          why: "Sevoflurane is non-pungent with rapid onset.",
        },
        {
          q: "Diffusion hypoxia is associated with:",
          options: ["Halothane", "Nitrous oxide", "Sevoflurane", "Ketamine"],
          answer: 1,
          why: "At the end of anaesthesia N₂O diffuses into alveoli and dilutes oxygen.",
        },
      ],
    },
    {
      id: "iv-agents",
      title: "Intravenous induction agents",
      minutes: 7,
      summary:
        "Propofol, thiopentone, ketamine and etomidate differ mainly in their cardiovascular effects — which decides the agent for a given patient.",
      examFocus:
        "Agent of choice for day-care, shock, asthma, cardiac disease; contraindications (porphyria, raised ICP) and signature side effects.",
      mechanism:
        "Propofol, thiopentone and etomidate enhance GABA-A inhibition, producing rapid unconsciousness. Propofol and thiopentone also vasodilate and depress the myocardium, so blood pressure falls — dangerous in hypovolaemia. Etomidate leaves the heart and vessels largely unaffected, making it the cardiostable choice, but it inhibits adrenal 11β-hydroxylase. Ketamine works differently, blocking NMDA receptors to produce dissociative anaesthesia with analgesia, and it stimulates the sympathetic system — so blood pressure is maintained and the bronchi dilate.",
      points: [
        "Propofol: commonest induction agent; smooth rapid recovery (day care), antiemetic; pain on injection, hypotension; used for TIVA; propofol infusion syndrome with prolonged high doses.",
        "Thiopentone: barbiturate; cerebroprotective (↓ ICP and cerebral O₂ consumption); contraindicated in acute porphyria; intra-arterial injection causes gangrene.",
        "Ketamine: dissociative anaesthesia with analgesia; maintains BP (induction of choice in shock/hypovolaemia), bronchodilator (asthma); emergence delirium, ↑ secretions, ↑ ICP/IOP.",
        "Etomidate: cardiostable (cardiac disease); adrenal suppression, myoclonus, PONV.",
        "Midazolam: sedation with anterograde amnesia; reversed by flumazenil.",
      ],
      table: {
        title: "Choose the agent",
        columns: ["Situation", "Agent"],
        rows: [
          ["Day-care surgery", "Propofol"],
          ["Shock / hypovolaemia", "Ketamine"],
          ["Bronchial asthma", "Ketamine (or propofol)"],
          ["Cardiac disease", "Etomidate"],
          ["Raised ICP", "Thiopentone / propofol"],
          ["Acute porphyria", "Avoid thiopentone (use propofol)"],
        ],
      },
      pitfalls: [
        "Ketamine raises intracranial and intraocular pressure — avoid in head injury with raised ICP and open globe injuries (relative).",
        "Etomidate's adrenal suppression is a concern in sepsis or with repeated doses.",
      ],
      vignette: {
        stem: "A road traffic victim with BP 80/50 mmHg needs emergency laparotomy.",
        answer: "Ketamine for induction.",
        reasoning: "Its sympathomimetic action maintains blood pressure in hypovolaemic shock.",
      },
      highYield:
        "Propofol → day care, antiemetic. Ketamine → shock, asthma (↑BP, bronchodilator, dissociative). Etomidate → cardiac (adrenal suppression). Thiopentone: no in porphyria.",
      checks: [
        {
          q: "Induction agent of choice in a patient with hypovolaemic shock:",
          options: ["Propofol", "Thiopentone", "Ketamine", "Midazolam"],
          answer: 2,
          why: "Ketamine maintains blood pressure through sympathetic stimulation.",
        },
        {
          q: "Induction agent that causes adrenal suppression:",
          options: ["Propofol", "Ketamine", "Etomidate", "Thiopentone"],
          answer: 2,
          why: "Etomidate inhibits 11β-hydroxylase.",
        },
      ],
    },
    {
      id: "muscle-relaxants",
      title: "Neuromuscular blockers and reversal",
      minutes: 8,
      summary:
        "Succinylcholine is the fastest-onset, shortest-acting relaxant but has dangerous side effects; non-depolarising agents are reversed with neostigmine or sugammadex.",
      examFocus:
        "Succinylcholine adverse effects and contraindications, Hofmann elimination, and the reversal combination.",
      mechanism:
        "Succinylcholine mimics acetylcholine: it depolarises the motor end-plate (visible fasciculations) and then keeps it depolarised, so the muscle can't respond (phase I block). It is broken down by plasma pseudocholinesterase, hence its short action and prolonged apnoea in enzyme deficiency. Non-depolarising agents competitively block acetylcholine at nicotinic receptors without activating them. Neostigmine reverses this by raising acetylcholine (cholinesterase inhibition), so an anticholinergic must accompany it to block the muscarinic effects; sugammadex reverses rocuronium directly by encapsulating it.",
      points: [
        "Succinylcholine: fastest onset (~60 s), shortest duration (5–10 min) — ideal for rapid sequence induction.",
        "Succinylcholine side effects: hyperkalaemia (dangerous in burns, crush, denervation, after ~24–48 h), malignant hyperthermia trigger, bradycardia, myalgia, ↑ IOP/ICP/intragastric pressure.",
        "Prolonged apnoea after succinylcholine: pseudocholinesterase deficiency (dibucaine number).",
        "Rocuronium: rapid onset (RSI alternative); reversed by sugammadex. Atracurium/cisatracurium: Hofmann elimination — choice in renal and hepatic failure. Pancuronium: vagolytic (tachycardia).",
        "Reversal: neostigmine + glycopyrrolate (or atropine) to counter muscarinic effects.",
        "Monitor block with train-of-four; fade is a feature of non-depolarising block.",
      ],
      pitfalls: [
        "Succinylcholine is safe in the first hours after a burn; hyperkalaemia risk starts after 24–48 hours as extrajunctional receptors proliferate.",
        "Neostigmine alone would cause bradycardia and secretions — always give an anticholinergic with it.",
      ],
      vignette: {
        stem: "A 30-year-old who sustained 40% burns 5 days ago needs debridement under general anaesthesia.",
        answer:
          "Avoid succinylcholine (risk of fatal hyperkalaemia); use a non-depolarising relaxant such as rocuronium.",
        reasoning:
          "Burns cause proliferation of extrajunctional acetylcholine receptors after 24–48 hours.",
      },
      highYield:
        "Sux: fastest, shortest, RSI; hyperkalaemia (burns/crush after 24–48 h), MH trigger, pseudocholinesterase. Atracurium = Hofmann (organ failure). Neostigmine + glycopyrrolate; sugammadex for rocuronium.",
      checks: [
        {
          q: "Muscle relaxant of choice in combined renal and hepatic failure:",
          options: ["Vecuronium", "Pancuronium", "Cisatracurium", "Rocuronium"],
          answer: 2,
          why: "Cisatracurium undergoes organ-independent Hofmann elimination.",
        },
        {
          q: "Sugammadex reverses:",
          options: ["Succinylcholine", "Rocuronium", "Atracurium", "Neostigmine"],
          answer: 1,
          why: "It encapsulates steroidal relaxants, especially rocuronium.",
        },
      ],
    },
    {
      id: "local-anaesthetics",
      title: "Local anaesthetics and toxicity",
      minutes: 7,
      summary:
        "Local anaesthetics block sodium channels; esters and amides differ in metabolism, and systemic toxicity progresses from CNS to cardiovascular collapse, treated with lipid emulsion.",
      examFocus:
        "Ester vs amide, maximum doses with and without adrenaline, toxicity sequence, bupivacaine cardiotoxicity, and lipid emulsion.",
      mechanism:
        "Local anaesthetics enter the nerve in their uncharged form and block voltage-gated sodium channels from inside, stopping action potentials. Small myelinated fibres are blocked first, so autonomic and pain sensation go before touch and motor power. Adding adrenaline vasoconstricts, slowing absorption — prolonging the block and allowing a higher dose. If too much reaches the circulation, the brain is affected first (excitation, then seizures), and at higher levels the heart's sodium channels are blocked, causing arrhythmias and collapse; lipid emulsion acts as a 'sink' that pulls the drug out of tissues.",
      points: [
        "Esters (one 'i'): procaine, chloroprocaine, cocaine, tetracaine — plasma cholinesterase, PABA allergy. Amides (two 'i's): lignocaine, bupivacaine, ropivacaine, prilocaine — liver.",
        "Maximum doses: lignocaine 3 mg/kg (7 mg/kg with adrenaline); bupivacaine 2 mg/kg.",
        "Toxicity sequence: circumoral numbness, metallic taste, tinnitus → muscle twitching → seizures → coma → cardiovascular collapse.",
        "Bupivacaine is the most cardiotoxic (avoid IV regional anaesthesia); ropivacaine is less cardiotoxic.",
        "Treatment of LAST: stop injection, airway and oxygen, benzodiazepines for seizures, 20% lipid emulsion (1.5 mL/kg bolus then infusion), prolonged CPR.",
        "Avoid adrenaline in end-arterial areas (fingers, toes, penis, nose tip, pinna). Cocaine is the only local anaesthetic that vasoconstricts. Prilocaine causes methaemoglobinaemia.",
      ],
      pitfalls: [
        "Bupivacaine is contraindicated for Bier's block (IV regional anaesthesia) because of cardiotoxicity.",
        "Seizures are not the first sign — circumoral numbness and tinnitus come earlier.",
      ],
      mnemonic: "Amides have two 'i's (lIdocaIne, bupIvacaIne); esters have one.",
      vignette: {
        stem: "During a brachial plexus block with bupivacaine, the patient complains of a metallic taste and tinnitus, then has a seizure and develops ventricular arrhythmia.",
        answer:
          "Local anaesthetic systemic toxicity — airway, benzodiazepines, 20% lipid emulsion, ACLS.",
        reasoning:
          "CNS prodrome then seizures and cardiotoxicity typical of bupivacaine; lipid emulsion is the specific antidote.",
      },
      highYield:
        "Lignocaine max 3 mg/kg (7 with adrenaline); bupivacaine 2 mg/kg, most cardiotoxic. LAST: perioral numbness → seizures → arrest → 20% lipid emulsion. No adrenaline in end-arteries.",
      checks: [
        {
          q: "Maximum safe dose of lignocaine with adrenaline:",
          options: ["3 mg/kg", "5 mg/kg", "7 mg/kg", "10 mg/kg"],
          answer: 2,
          why: "Adrenaline slows absorption, raising the limit from 3 to 7 mg/kg.",
        },
        {
          q: "Specific treatment for severe local anaesthetic systemic toxicity:",
          options: ["Naloxone", "20% lipid emulsion", "Flumazenil", "Dantrolene"],
          answer: 1,
          why: "Intralipid sequesters the lipophilic drug.",
        },
      ],
    },
    {
      id: "neuraxial",
      title: "Spinal vs epidural anaesthesia",
      minutes: 7,
      summary:
        "Spinal anaesthesia injects a small dose into the CSF for a dense, rapid block; epidural uses a catheter in the epidural space for a titratable block — each has typical complications.",
      examFocus:
        "Site of injection and why, commonest complication (hypotension), post-dural puncture headache, and contraindications.",
      mechanism:
        "In adults the spinal cord usually ends at L1–L2, so a spinal needle is placed at L3–4 or L4–5 to avoid it; Tuffier's line between the iliac crests crosses L4. Local anaesthetic in the CSF blocks sympathetic fibres too, causing vasodilatation and hypotension (and bradycardia if cardioaccelerator fibres T1–T4 are blocked). A dural hole leaks CSF faster than it is made; the brain sags on standing and stretches pain-sensitive structures, giving a postural headache that is relieved lying flat.",
      points: [
        "Spinal (subarachnoid): L3–4 or L4–5; small dose, rapid dense block; hyperbaric bupivacaine.",
        "Epidural: loss-of-resistance technique; catheter allows top-ups and prolonged analgesia (labour, postoperative); larger volumes.",
        "Commonest complication: hypotension → IV fluids and vasopressors (phenylephrine, ephedrine).",
        "Post-dural puncture headache: postural (worse sitting/standing), occipital/frontal; reduce with small pencil-point needles (25–27G Whitacre); treat with fluids, analgesics, caffeine, epidural blood patch.",
        "Other complications: high/total spinal, urinary retention, epidural haematoma or abscess, nerve injury.",
        "Contraindications: patient refusal, coagulopathy/anticoagulation, infection at the site, raised ICP, severe uncorrected hypovolaemia.",
      ],
      table: {
        title: "Spinal vs epidural",
        columns: ["Feature", "Spinal", "Epidural"],
        rows: [
          ["Space", "Subarachnoid (CSF)", "Epidural"],
          ["Dose / volume", "Small", "Large"],
          ["Onset", "Rapid (minutes)", "Slower"],
          ["Block", "Dense, fixed duration", "Segmental, titratable via catheter"],
          ["PDPH", "Possible (small needle reduces)", "Only with accidental dural puncture"],
        ],
      },
      pitfalls: [
        "PDPH is postural — a headache that doesn't change with posture suggests another cause (e.g. meningitis).",
        "Raised ICP is a contraindication because a dural puncture can precipitate coning.",
      ],
      vignette: {
        stem: "A day after caesarean section under spinal anaesthesia, a woman has a severe frontal headache when she sits up, relieved on lying flat.",
        answer:
          "Post-dural puncture headache — fluids, analgesics, caffeine; epidural blood patch if persistent.",
        reasoning: "A postural headache after dural puncture reflects CSF leak.",
      },
      highYield:
        "Spinal at L3–4/L4–5 (cord ends L1–2). Hypotension = commonest complication. PDPH = postural; prevent with pencil-point 25–27G; treat with blood patch.",
      checks: [
        {
          q: "Commonest complication of spinal anaesthesia:",
          options: ["Headache", "Hypotension", "Urinary retention", "Meningitis"],
          answer: 1,
          why: "Sympathetic blockade causes vasodilatation and hypotension.",
        },
        {
          q: "Definitive treatment for persistent post-dural puncture headache:",
          options: ["Caffeine", "Epidural blood patch", "IV fluids", "NSAIDs"],
          answer: 1,
          why: "Autologous blood seals the dural leak.",
        },
      ],
    },
    {
      id: "malignant-hyperthermia",
      title: "Malignant hyperthermia",
      minutes: 6,
      summary:
        "A rare inherited skeletal-muscle disorder in which volatile agents or succinylcholine trigger a life-threatening hypermetabolic crisis; dantrolene is the antidote.",
      examFocus:
        "Triggers, the earliest sign (rising EtCO₂), the gene (RYR1), safe agents, and dantrolene.",
      mechanism:
        "A mutation in the ryanodine receptor (RYR1) on the sarcoplasmic reticulum makes it leak calcium when exposed to triggering agents. Uncontrolled calcium release causes sustained muscle contraction (rigidity, masseter spasm) and a huge rise in metabolism — oxygen consumption and CO₂ production soar, so the earliest sign is an unexplained rise in end-tidal CO₂ with tachycardia. Heat, acidosis, hyperkalaemia and rhabdomyolysis follow. Dantrolene blocks calcium release from the ryanodine receptor.",
      points: [
        "Inheritance: autosomal dominant; RYR1 gene (ryanodine receptor).",
        "Triggers: all volatile anaesthetics (halothane, sevoflurane, isoflurane, desflurane) and succinylcholine.",
        "Earliest sign: unexplained rise in end-tidal CO₂ with tachycardia; masseter spasm; hyperthermia is a late sign.",
        "Other features: generalised rigidity, metabolic and respiratory acidosis, hyperkalaemia, arrhythmias, myoglobinuria, raised CK.",
        "Treatment: stop triggers, hyperventilate with 100% O₂, dantrolene 2.5 mg/kg IV repeated (up to ~10 mg/kg), active cooling, treat hyperkalaemia and arrhythmias.",
        "Diagnosis of susceptibility: caffeine–halothane contracture test on muscle biopsy. Safe agents: propofol, opioids, N₂O, non-depolarising relaxants, local anaesthetics.",
      ],
      pitfalls: [
        "Fever is a late sign — rising EtCO₂ is the earliest clue.",
        "Nitrous oxide is not a trigger; volatile halogenated agents are.",
      ],
      vignette: {
        stem: "Twenty minutes into a sevoflurane anaesthetic after succinylcholine, a young patient's end-tidal CO₂ rises steadily despite increased ventilation, with tachycardia and jaw rigidity.",
        answer:
          "Malignant hyperthermia — stop sevoflurane, 100% O₂, IV dantrolene, cool and treat complications.",
        reasoning:
          "Unexplained hypercarbia and rigidity after triggering agents; temperature rise comes later.",
      },
      highYield:
        "MH: RYR1, autosomal dominant; triggers volatiles + succinylcholine. Earliest sign ↑ EtCO₂. Dantrolene 2.5 mg/kg. Safe: propofol, opioids, N₂O, non-depolarisers.",
      checks: [
        {
          q: "Earliest sign of malignant hyperthermia:",
          options: ["Hyperthermia", "Rise in end-tidal CO₂", "Myoglobinuria", "Hyperkalaemia"],
          answer: 1,
          why: "Hypermetabolism raises CO₂ production first.",
        },
        {
          q: "Drug of choice for malignant hyperthermia:",
          options: ["Diazepam", "Dantrolene", "Paracetamol", "Bromocriptine"],
          answer: 1,
          why: "Dantrolene inhibits calcium release from the ryanodine receptor.",
        },
      ],
    },
  ],
};
