import type { LearnModule } from "../learn";

export const pharmacology: LearnModule = {
  slug: "pharmacology",
  group: "Para-clinical",
  subject: "Pharmacology",
  icon: "medication",
  blurb: "Receptor signalling, pharmacokinetics, antidotes and antimicrobial mechanisms — with the reasoning behind the drug-of-choice tables.",
  cover: {
    file: "GPCR mechanism.png",
    caption: "G-protein coupled receptor signalling",
    credit: "Wikimedia Commons",
  },
  objectives: [
    "Predict a drug's cardiovascular effect from its receptor and G-protein.",
    "Interpret dose–response curves for potency, efficacy and antagonist type.",
    "Apply first-order kinetics to loading dose, half-life and steady state.",
    "Match an antimicrobial to its target and its resistance mechanism.",
  ],
  concepts: [
    {
      id: "receptors",
      title: "Autonomic receptors and their second messengers",
      minutes: 7,
      summary: "These questions collapse into knowing which G-protein is coupled where.",
      mechanism:
        "There are only three G-protein outcomes to learn. Gs raises cyclic AMP, Gi lowers it, and Gq raises IP₃ and diacylglycerol, releasing intracellular calcium. The tissue then decides what that second messenger does: rising cAMP is stimulatory in the heart (β1) but relaxing in bronchial smooth muscle (β2), because smooth muscle protein kinase A phosphorylates and inactivates myosin light chain kinase. So the same messenger produces opposite mechanical effects in different tissues — which is precisely the trick most exam questions exploit.",
      points: [
        "α1 → Gq → IP₃/DAG → vasoconstriction, mydriasis, bladder sphincter contraction.",
        "α2 → Gi → ↓cAMP → presynaptic inhibition, central sympatholysis (clonidine, dexmedetomidine).",
        "β1 → Gs → ↑cAMP → heart rate, contractility, renin release.",
        "β2 → Gs → bronchodilation, uterine relaxation, skeletal muscle vasodilation, potassium shift into cells.",
        "M2 → Gi (cardiac slowing); M1, M3 → Gq (secretions, gut motility, bronchoconstriction).",
        "D1 → Gs (renal vasodilation); D2 → Gi (antipsychotic target).",
      ],
      table: {
        title: "Pressor effects compared",
        columns: ["Drug", "Receptors", "Heart rate", "Use"],
        rows: [
          ["Phenylephrine", "α1", "Reflex fall", "Hypotension with tachycardia"],
          ["Norepinephrine", "α1 > β1", "Slight fall", "Septic shock"],
          ["Epinephrine", "α and β", "Rise", "Anaphylaxis, cardiac arrest"],
          ["Dobutamine", "β1", "Rise", "Cardiogenic shock"],
          ["Isoproterenol", "β1 = β2", "Marked rise", "Bradycardia (rare now)"],
        ],
      },
      pitfalls: [
        "Beta blockade in anaphylaxis makes adrenaline less effective — glucagon is the rescue because it bypasses the β receptor.",
        "Unopposed α stimulation after a non-selective beta blocker in cocaine toxicity worsens vasoconstriction.",
      ],
      mnemonic: "Qiss and Qiq — α1, M1, M3 are Gq; α2, M2, D2 are Gi; the rest are Gs.",
      vignette: {
        stem: "After an intravenous drug the mean arterial pressure rises and the heart rate falls, though the drug has no direct cardiac action.",
        answer: "A pure α1 agonist such as phenylephrine.",
        reasoning: "The bradycardia is baroreceptor-mediated reflex vagal tone, not a direct effect.",
      },
      highYield: "Reflex bradycardia after phenylephrine; no reflex change after a pure β1 agonist.",
      figure: {
        file: "GPCR mechanism.png",
        caption: "Ligand binding, G-protein activation and second messenger generation",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "kinetics",
      title: "Pharmacokinetics you can calculate under pressure",
      minutes: 7,
      summary: "Volume of distribution, clearance, half-life, loading and maintenance dose — four equations, endless questions.",
      mechanism:
        "Volume of distribution is not an anatomical volume; it is the theoretical volume needed to contain the total drug at the measured plasma concentration. A drug that hides in fat or binds tissue has a huge Vd and a plasma level that says little about total body burden — which is why dialysis fails to remove such drugs. Clearance, not half-life, determines steady-state concentration on a repeated dose; half-life only determines how long steady state takes to reach. Separating those two ideas answers most dosing questions correctly.",
      points: [
        "Vd = total drug in body ÷ plasma concentration. High Vd means tissue sequestration and poor dialysability.",
        "Half-life t½ = 0.693 × Vd ÷ clearance. Steady state is reached after 4–5 half-lives regardless of dosing interval.",
        "Loading dose = target concentration × Vd ÷ bioavailability — unchanged in renal failure.",
        "Maintenance dose = target concentration × clearance ÷ bioavailability — reduced in renal or hepatic failure.",
        "Zero-order kinetics (constant amount per hour): phenytoin at high dose, ethanol, aspirin in overdose.",
      ],
      table: {
        title: "First-order versus zero-order",
        columns: ["Feature", "First-order", "Zero-order"],
        rows: [
          ["Rate", "Proportional to concentration", "Constant amount per unit time"],
          ["Half-life", "Constant", "Varies with concentration"],
          ["Examples", "Most drugs", "Phenytoin (high dose), ethanol, aspirin"],
          ["Overdose risk", "Predictable", "Small dose rise → large level rise"],
        ],
      },
      pitfalls: [
        "Renal failure changes the maintenance dose, never the loading dose — the volume of distribution has not changed.",
        "Urine alkalinisation traps weak acids (aspirin); acidification traps weak bases. Ionised drug cannot be reabsorbed.",
      ],
      vignette: {
        stem: "A patient on phenytoin has a level of 12 mg/L. The dose is raised by 15% and the level rises to 28 mg/L with nystagmus.",
        answer: "Saturation (zero-order) kinetics.",
        reasoning: "Once the metabolising enzyme is saturated, elimination becomes constant and small dose increments produce disproportionate level rises.",
      },
      highYield: "Loading dose depends on Vd; maintenance dose depends on clearance. Renal failure only alters the latter.",
      figure: {
        file: "Potency pharmacology.svg",
        caption: "Dose–response curves illustrating potency and efficacy",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "antidotes",
      title: "Antidotes and toxidromes",
      minutes: 6,
      summary: "Recognise the syndrome first, then reach for the specific antidote.",
      mechanism:
        "Toxidromes exist because most poisons act on a limited set of receptor systems, so the vital signs and pupils cluster into recognisable patterns. Distinguishing cholinergic from anticholinergic toxicity comes down to sweat: muscarinic overdrive gives a wet, secreting patient, while blockade gives a dry, flushed one. The antidote logic then follows the mechanism — atropine blocks the excess muscarinic drive symptomatically, while pralidoxime reactivates the enzyme itself, but only before the phosphorylated enzyme 'ages' irreversibly.",
      points: [
        "Organophosphates: atropine (titrate to dry secretions) plus pralidoxime, given early.",
        "Paracetamol: N-acetylcysteine, which replenishes glutathione to detoxify NAPQI. Plot the level on the nomogram.",
        "Benzodiazepines: flumazenil (avoid if chronic use — precipitates seizures). Opioids: naloxone.",
        "Warfarin: vitamin K plus 4-factor prothrombin complex concentrate. Heparin: protamine sulfate.",
        "Methanol / ethylene glycol: fomepizole, preferred over ethanol; dialysis for severe acidosis.",
        "Digoxin: digoxin-specific Fab fragments, indicated for hyperkalaemia or life-threatening arrhythmia.",
      ],
      table: {
        title: "Toxidrome recognition",
        columns: ["Toxidrome", "Pupils", "Skin", "Other"],
        rows: [
          ["Cholinergic", "Constricted", "Sweaty", "SLUDGE, bronchorrhoea, bradycardia"],
          ["Anticholinergic", "Dilated", "Dry and flushed", "Delirium, urinary retention, fever"],
          ["Opioid", "Pinpoint", "Normal", "Respiratory depression, coma"],
          ["Sympathomimetic", "Dilated", "Sweaty", "Tachycardia, hypertension, agitation"],
        ],
      },
      pitfalls: [
        "Cholinergic and sympathomimetic patients are both sweaty — the pupils separate them.",
        "Physostigmine for anticholinergic delirium is contraindicated in tricyclic overdose (asystole risk); use sodium bicarbonate instead.",
      ],
      mnemonic: "Anticholinergic: hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter.",
      vignette: {
        stem: "A farmer is brought in confused, drooling, with pinpoint pupils, bradycardia and copious bronchial secretions.",
        answer: "Organophosphate poisoning — atropine plus pralidoxime.",
        reasoning: "Muscarinic overdrive from cholinesterase inhibition; atropine is titrated to secretion control, not to pupil size.",
      },
      highYield: "Pralidoxime reactivates cholinesterase only before enzyme ageing — give it early.",
      figure: {
        file: "Atropine.svg",
        caption: "Atropine — the antimuscarinic first line in organophosphate poisoning",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "antimicrobials",
      title: "Antimicrobials — target, spectrum and resistance",
      minutes: 8,
      summary: "Every antibiotic class attacks one structure; resistance is the bug's answer to that attack.",
      mechanism:
        "Selective toxicity depends on targeting something bacterial that human cells lack: peptidoglycan, the 70S ribosome, bacterial DNA gyrase, or folate synthesis (humans absorb folate rather than making it). Resistance therefore takes three predictable forms — destroy the drug (β-lactamase), modify the target (altered PBP2a in MRSA, ribosomal methylation in macrolide resistance), or pump it out (efflux in tetracycline resistance). Knowing which of the three applies tells you whether a β-lactamase inhibitor will help: it rescues drug destruction, but does nothing against an altered target, which is why MRSA is resistant to every β-lactam except ceftaroline.",
      points: [
        "Cell wall: penicillins, cephalosporins, carbapenems (bind PBPs); vancomycin binds D-ala-D-ala.",
        "30S ribosome: aminoglycosides (bactericidal), tetracyclines (bacteriostatic). 50S: macrolides, clindamycin, linezolid, chloramphenicol.",
        "DNA gyrase / topoisomerase IV: fluoroquinolones. RNA polymerase: rifampicin (rapid resistance if used alone).",
        "Folate synthesis: sulfonamides (dihydropteroate synthase) plus trimethoprim (dihydrofolate reductase) — sequential blockade.",
        "MRSA resistance is altered PBP2a; VRE resistance is D-ala-D-lac substitution. Neither is β-lactamase.",
      ],
      table: {
        title: "Class-defining toxicities",
        columns: ["Class", "Signature toxicity"],
        rows: [
          ["Aminoglycosides", "Nephrotoxicity and ototoxicity"],
          ["Fluoroquinolones", "Tendon rupture, QT prolongation"],
          ["Vancomycin", "Infusion-related flushing, nephrotoxicity"],
          ["Chloramphenicol", "Aplastic anaemia, grey baby syndrome"],
          ["Linezolid", "Thrombocytopenia, serotonin syndrome"],
        ],
      },
      pitfalls: [
        "Adding clavulanate does not restore activity against MRSA — the target, not the drug, is the problem.",
        "Rifampicin is a potent CYP450 inducer; it fails oral contraceptives and warfarin control.",
      ],
      vignette: {
        stem: "A wound isolate is resistant to oxacillin. The laboratory reports mecA gene positivity.",
        answer: "MRSA — treat with vancomycin, not a β-lactam plus inhibitor.",
        reasoning: "mecA encodes PBP2a, a low-affinity penicillin binding protein; no β-lactamase inhibitor can overcome an altered target.",
      },
      highYield: "β-lactamase inhibitors rescue drug destruction only — altered-target resistance (MRSA, VRE) is untouched.",
      figure: {
        file: "P450cycle.svg",
        caption: "Cytochrome P450 catalytic cycle — the hub of antimicrobial drug interactions",
        credit: "Wikimedia Commons",
      },
    },
  ],
};
