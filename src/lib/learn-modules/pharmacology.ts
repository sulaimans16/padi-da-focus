import type { LearnModule } from "../learn";

export const pharmacology: LearnModule = {
  slug: "pharmacology",
  group: "Para-clinical",
  subject: "Pharmacology",
  icon: "medication",
  blurb:
    "Receptors, kinetics, antidotes, antimicrobials, antiepileptics, anticancer drugs, antidiabetics and heart-failure drugs — with the reasoning behind the drug-of-choice tables.",
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
    "Pick an antiepileptic by seizure type and recognise each drug's signature toxicity.",
    "Link each anticancer drug to its cell-cycle phase, toxicity and protective agent.",
    "Choose an antidiabetic drug from its mechanism, benefits and risks.",
    "Separate heart-failure drugs that save lives from those that only relieve symptoms.",
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
        reasoning:
          "The bradycardia is baroreceptor-mediated reflex vagal tone, not a direct effect.",
      },
      highYield:
        "Reflex bradycardia after phenylephrine; no reflex change after a pure β1 agonist.",
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
      summary:
        "Volume of distribution, clearance, half-life, loading and maintenance dose — four equations, endless questions.",
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
        reasoning:
          "Once the metabolising enzyme is saturated, elimination becomes constant and small dose increments produce disproportionate level rises.",
      },
      highYield:
        "Loading dose depends on Vd; maintenance dose depends on clearance. Renal failure only alters the latter.",
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
      mnemonic:
        "Anticholinergic: hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter.",
      vignette: {
        stem: "A farmer is brought in confused, drooling, with pinpoint pupils, bradycardia and copious bronchial secretions.",
        answer: "Organophosphate poisoning — atropine plus pralidoxime.",
        reasoning:
          "Muscarinic overdrive from cholinesterase inhibition; atropine is titrated to secretion control, not to pupil size.",
      },
      highYield:
        "Pralidoxime reactivates cholinesterase only before enzyme ageing — give it early.",
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
      summary:
        "Every antibiotic class attacks one structure; resistance is the bug's answer to that attack.",
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
        reasoning:
          "mecA encodes PBP2a, a low-affinity penicillin binding protein; no β-lactamase inhibitor can overcome an altered target.",
      },
      highYield:
        "β-lactamase inhibitors rescue drug destruction only — altered-target resistance (MRSA, VRE) is untouched.",
      figure: {
        file: "P450cycle.svg",
        caption: "Cytochrome P450 catalytic cycle — the hub of antimicrobial drug interactions",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "antiepileptics",
      title: "Antiepileptic drugs",
      minutes: 8,
      summary:
        "The seizure type decides the drug, and each antiepileptic has a signature adverse effect that exams love — from gum overgrowth to neural tube defects.",
      examFocus:
        "Drug of choice by seizure type, status epilepticus steps, and the classic toxicities of phenytoin, carbamazepine and valproate.",
      mechanism:
        "Most focal seizures are driven by repetitive neuronal firing, which sodium-channel blockers (phenytoin, carbamazepine, lamotrigine) dampen by holding channels in the inactivated state — they act preferentially on rapidly firing neurons, so normal activity is spared. Absence seizures come from thalamic T-type calcium currents that generate 3-Hz spike-and-wave, so ethosuximide, a T-type channel blocker, works there while sodium blockers can make absences and myoclonus worse.",
      points: [
        "Generalised tonic-clonic and myoclonic (juvenile myoclonic epilepsy): valproate — but in women who may become pregnant prefer lamotrigine or levetiracetam.",
        "Absence: ethosuximide or valproate. Carbamazepine and phenytoin can worsen absence and myoclonic seizures.",
        "Focal seizures: carbamazepine, oxcarbazepine, lamotrigine or levetiracetam.",
        "Infantile spasms (West syndrome): ACTH or vigabatrin (vigabatrin first if tuberous sclerosis).",
        "Phenytoin: zero-order kinetics at therapeutic levels, gum hypertrophy, hirsutism, coarse facies, nystagmus and ataxia, megaloblastic anaemia, fetal hydantoin syndrome, enzyme inducer.",
        "Carbamazepine: SJS/TEN (HLA-B*1502 in Asians), hyponatraemia (SIADH), aplastic anaemia, autoinduction; drug of choice for trigeminal neuralgia.",
        "Valproate: hepatotoxicity (especially < 2 years), pancreatitis, neural tube defects, weight gain, tremor, hair loss; enzyme inhibitor.",
        "Others: lamotrigine — rash/SJS (titrate slowly, especially with valproate); vigabatrin — visual field loss; topiramate — weight loss, kidney stones, angle-closure glaucoma.",
      ],
      flow: {
        title: "Status epilepticus",
        steps: [
          { label: "0–5 min: ABC, glucose", detail: "Oxygen, IV access, check capillary glucose" },
          {
            label: "5–20 min: benzodiazepine",
            detail: "IV lorazepam (or IM midazolam / IV diazepam), may repeat once",
          },
          {
            label: "20–40 min: second-line",
            detail: "IV fosphenytoin/phenytoin, valproate or levetiracetam",
          },
          {
            label: "40+ min: refractory",
            detail: "ICU — midazolam, propofol or thiopentone infusion with EEG",
          },
        ],
      },
      pitfalls: [
        "Phenytoin's zero-order kinetics mean a small dose increase can cause a large rise in level and toxicity.",
        "Eclamptic seizures are treated with magnesium sulphate, not antiepileptics.",
      ],
      vignette: {
        stem: "A 7-year-old girl has many brief staring spells a day; hyperventilation triggers one, and EEG shows 3-Hz spike-and-wave.",
        answer: "Childhood absence epilepsy — ethosuximide.",
        reasoning:
          "Absence seizures arise from thalamic T-type calcium currents, which ethosuximide blocks; sodium-channel blockers may worsen them.",
      },
      highYield:
        "Absence → ethosuximide. JME → valproate. Status → lorazepam then phenytoin/valproate/levetiracetam. Phenytoin: gums, hirsutism, zero-order. Carbamazepine: SJS (HLA-B*1502), SIADH. Valproate: liver, NTD.",
      checks: [
        {
          q: "Gingival hyperplasia is a classic adverse effect of:",
          options: ["Valproate", "Phenytoin", "Ethosuximide", "Levetiracetam"],
          answer: 1,
          why: "Phenytoin stimulates gingival fibroblasts; good oral hygiene reduces it.",
        },
        {
          q: "Which antiepileptic can worsen absence seizures?",
          options: ["Ethosuximide", "Valproate", "Carbamazepine", "Lamotrigine"],
          answer: 2,
          why: "Carbamazepine (like phenytoin) can aggravate absence and myoclonic seizures.",
        },
      ],
    },
    {
      id: "anticancer",
      title: "Anticancer drugs",
      minutes: 9,
      summary:
        "Chemotherapy targets dividing cells at specific phases of the cell cycle; its toxicities follow from which tissues divide fast and from each drug's quirks — with specific agents to prevent several of them.",
      examFocus:
        "Cell-cycle specificity, the signature toxicity of each drug and its protective agent, and targeted therapies.",
      mechanism:
        "Cancer cells divide more often than most normal cells, so drugs that damage DNA synthesis or mitosis hit them harder — but also hit bone marrow, gut lining and hair follicles, causing the shared toxicities of myelosuppression, mucositis and alopecia. Drug-specific toxicities come from where a drug concentrates or how it is metabolised: cyclophosphamide's metabolite acrolein collects in the bladder, and doxorubicin generates free radicals in heart muscle, which has little antioxidant defence.",
      points: [
        "S-phase specific: antimetabolites — methotrexate, 5-FU, cytarabine, 6-mercaptopurine. M-phase: vinca alkaloids and taxanes. G2: bleomycin, etoposide.",
        "Cell-cycle non-specific: alkylating agents (cyclophosphamide), platinum compounds, most anthracyclines.",
        "Methotrexate: inhibits dihydrofolate reductase; myelosuppression and mucositis — rescued by leucovorin (folinic acid).",
        "Cisplatin: nephrotoxicity and ototoxicity, most emetogenic — hydration, amifostine; antiemetics ondansetron and aprepitant.",
        "Vincristine: peripheral neuropathy (marrow-sparing). Vinblastine: myelosuppression.",
        "Tamoxifen: endometrial cancer and thromboembolism. Trastuzumab (HER2): reversible cardiotoxicity.",
        "Targeted: imatinib (BCR-ABL tyrosine kinase) for CML; rituximab (anti-CD20) for B-cell lymphoma; all-trans retinoic acid for acute promyelocytic leukaemia.",
        "Tumour lysis syndrome (hyperkalaemia, hyperphosphataemia, hyperuricaemia, hypocalcaemia): prevent with hydration and allopurinol or rasburicase.",
      ],
      table: {
        title: "Toxicity and protector",
        columns: ["Drug", "Signature toxicity", "Protection"],
        rows: [
          ["Doxorubicin", "Dilated cardiomyopathy", "Dexrazoxane; cap cumulative dose"],
          ["Cyclophosphamide / ifosfamide", "Haemorrhagic cystitis", "Mesna + hydration"],
          ["Bleomycin", "Pulmonary fibrosis", "Limit dose"],
          ["Cisplatin", "Nephro- and ototoxicity", "Hydration, amifostine"],
          ["Methotrexate", "Marrow suppression, mucositis", "Leucovorin rescue"],
          ["Vincristine", "Peripheral neuropathy", "Dose reduction"],
          ["L-asparaginase", "Pancreatitis, thrombosis", "Monitoring"],
        ],
      },
      pitfalls: [
        "Leucovorin rescues methotrexate toxicity but enhances the effect of 5-FU.",
        "Vincristine spares the marrow — vinblastine is the one that suppresses it.",
      ],
      mnemonic: "'Vincristine Crisps the nerves; vinBlastine Blasts the Bone marrow.'",
      vignette: {
        stem: "A man receiving chemotherapy for lymphoma develops painless haematuria. One of his drugs is an alkylating agent.",
        answer: "Haemorrhagic cystitis from cyclophosphamide — prevent with mesna and hydration.",
        reasoning:
          "Acrolein, a cyclophosphamide metabolite, irritates the bladder; mesna binds and inactivates it in urine.",
      },
      highYield:
        "Doxorubicin → heart (dexrazoxane). Cyclophosphamide → bladder (mesna). Bleomycin → lungs. Cisplatin → kidney, ear, vomiting. Methotrexate → leucovorin. Vincristine → neuropathy.",
      checks: [
        {
          q: "Mesna is used to prevent toxicity of:",
          options: ["Doxorubicin", "Cyclophosphamide", "Cisplatin", "Methotrexate"],
          answer: 1,
          why: "Mesna neutralises acrolein in urine, preventing haemorrhagic cystitis.",
        },
        {
          q: "Pulmonary fibrosis is a characteristic adverse effect of:",
          options: ["Vincristine", "Bleomycin", "5-Fluorouracil", "Cytarabine"],
          answer: 1,
          why: "Lung tissue lacks the enzyme that inactivates bleomycin, so it accumulates there.",
        },
      ],
    },
    {
      id: "antidiabetics",
      title: "Antidiabetic drugs",
      minutes: 8,
      summary:
        "Type 2 diabetes drugs work by different routes — reducing liver glucose output, releasing insulin, sensitising tissues, boosting incretins or spilling glucose in urine — and each has its own benefits and risks.",
      examFocus:
        "Mechanism of each class, which cause hypoglycaemia or weight gain, cardiorenal benefits of SGLT2 inhibitors and GLP-1 agonists, and insulin types.",
      mechanism:
        "Drugs that make the pancreas release insulin regardless of glucose level (sulfonylureas) can drive glucose too low; drugs that act only when glucose is high (incretin-based) or that don't touch insulin secretion (metformin, SGLT2 inhibitors) rarely do. Insulin is anabolic, so drugs that raise insulin or improve its action tend to add weight, while those that waste calories in urine (SGLT2 inhibitors) or reduce appetite (GLP-1 agonists) cause weight loss.",
      points: [
        "Metformin (first-line): reduces hepatic gluconeogenesis (AMPK activation); no hypoglycaemia alone, weight neutral; GI upset, B12 deficiency, lactic acidosis — avoid if eGFR < 30.",
        "Sulfonylureas (glimepiride, gliclazide, glibenclamide): close β-cell K-ATP channels → insulin release; hypoglycaemia and weight gain.",
        "Pioglitazone (PPAR-γ agonist): improves insulin sensitivity; fluid retention (avoid in heart failure), weight gain, fractures.",
        "DPP-4 inhibitors (sitagliptin, vildagliptin): weight neutral, low hypoglycaemia risk.",
        "GLP-1 receptor agonists (liraglutide, semaglutide): weight loss and cardiovascular benefit; nausea; avoid with a history of medullary thyroid cancer or MEN2.",
        "SGLT2 inhibitors (dapagliflozin, empagliflozin): glycosuria; weight loss and BP fall; benefit in heart failure and CKD; genital fungal infections, euglycaemic DKA, volume depletion.",
        "Acarbose (α-glucosidase inhibitor): flatulence; treat hypoglycaemia with glucose, not sucrose.",
        "Insulins: rapid (lispro, aspart), short (regular — the one used IV in DKA), intermediate (NPH), long (glargine, detemir, degludec).",
      ],
      table: {
        title: "Class at a glance",
        columns: ["Class", "Hypoglycaemia", "Weight", "Extra"],
        rows: [
          ["Metformin", "No", "Neutral / ↓", "B12 deficiency"],
          ["Sulfonylureas", "Yes", "↑", "Cheap, potent"],
          ["Pioglitazone", "No", "↑", "Avoid in heart failure"],
          ["DPP-4 inhibitors", "No", "Neutral", "Well tolerated"],
          ["GLP-1 agonists", "No", "↓↓", "CV benefit"],
          ["SGLT2 inhibitors", "No", "↓", "Heart failure and CKD benefit"],
        ],
      },
      pitfalls: [
        "Only regular (soluble) insulin is given intravenously.",
        "SGLT2 inhibitors can cause DKA with near-normal glucose — check ketones in an unwell patient.",
      ],
      vignette: {
        stem: "A 55-year-old with type 2 diabetes on metformin has heart failure with reduced ejection fraction and an eGFR of 50.",
        answer: "Add an SGLT2 inhibitor (e.g. dapagliflozin or empagliflozin).",
        reasoning:
          "SGLT2 inhibitors lower glucose and reduce heart-failure hospitalisation and CKD progression; pioglitazone would worsen heart failure.",
      },
      highYield:
        "Metformin first-line, no hypo, B12. Sulfonylureas: hypo + weight gain. Pioglitazone: fluid, avoid in HF. GLP-1: weight loss, CV benefit. SGLT2: HF + CKD benefit, euglycaemic DKA.",
      checks: [
        {
          q: "Which antidiabetic class most often causes hypoglycaemia?",
          options: ["Biguanides", "Sulfonylureas", "DPP-4 inhibitors", "SGLT2 inhibitors"],
          answer: 1,
          why: "Sulfonylureas release insulin regardless of the blood glucose level.",
        },
        {
          q: "Euglycaemic ketoacidosis is a recognised risk with:",
          options: ["Metformin", "Pioglitazone", "Empagliflozin", "Acarbose"],
          answer: 2,
          why: "SGLT2 inhibitors lower glucose while promoting ketogenesis, so DKA can occur with near-normal glucose.",
        },
      ],
    },
    {
      id: "heart-failure-drugs",
      title: "Heart failure drugs",
      minutes: 8,
      summary:
        "In heart failure with reduced ejection fraction, four drug classes reduce deaths, while diuretics and digoxin only relieve symptoms or admissions.",
      examFocus:
        "The four pillars with mortality benefit, drugs without it, digoxin mechanism and toxicity, and acute pulmonary oedema.",
      mechanism:
        "A failing heart triggers the renin–angiotensin–aldosterone and sympathetic systems. They help in the short term but cause salt retention, vasoconstriction and remodelling that worsen the heart over time. Drugs that block these systems — ACE inhibitors/ARNI, beta-blockers and mineralocorticoid antagonists — slow remodelling and so prolong life. Diuretics remove fluid and relieve breathlessness but don't change the underlying process.",
      points: [
        "Four pillars (mortality benefit): ACE inhibitor/ARB or ARNI (sacubitril–valsartan), beta-blocker (bisoprolol, carvedilol, metoprolol succinate), mineralocorticoid antagonist (spironolactone, eplerenone), SGLT2 inhibitor.",
        "Beta-blockers: start low, go slow, only when the patient is stable (not in acute decompensation).",
        "Hydralazine + isosorbide dinitrate: an option when ACE inhibitors/ARBs aren't tolerated.",
        "Ivabradine (If 'funny' current blocker): for sinus rhythm with heart rate ≥ 70 despite beta-blockade; reduces hospitalisation.",
        "Loop diuretics: relieve congestion — no mortality benefit.",
        "Digoxin: inhibits Na+/K+ ATPase → more intracellular calcium; reduces hospitalisation but not mortality.",
        "Digoxin toxicity: nausea, yellow vision (xanthopsia), confusion, any arrhythmia (ventricular ectopics commonest; bidirectional VT and atrial tachycardia with block are characteristic). Hypokalaemia worsens it. Antidote: digoxin-specific Fab fragments.",
        "Sacubitril–valsartan needs a 36-hour gap after stopping an ACE inhibitor (angioedema risk).",
      ],
      table: {
        title: "Does it save lives?",
        columns: ["Drug", "Mortality benefit", "Main role"],
        rows: [
          ["ACEi / ARB / ARNI", "Yes", "Block RAAS, reverse remodelling"],
          ["Beta-blockers", "Yes", "Block sympathetic drive"],
          ["Spironolactone / eplerenone", "Yes", "Block aldosterone"],
          ["SGLT2 inhibitors", "Yes", "Natriuresis, cardiorenal protection"],
          ["Loop diuretics", "No", "Relieve congestion"],
          ["Digoxin", "No", "Fewer admissions; rate control in AF"],
        ],
      },
      pitfalls: [
        "Combining ACE inhibitor, spironolactone and potassium supplements can cause dangerous hyperkalaemia.",
        "Non-dihydropyridine calcium-channel blockers (verapamil, diltiazem) worsen HFrEF.",
      ],
      vignette: {
        stem: "An elderly woman with heart failure on digoxin and furosemide has nausea, sees yellow halos around lights and has frequent ventricular ectopics. Serum potassium is 3.0 mmol/l.",
        answer: "Digoxin toxicity, aggravated by diuretic-induced hypokalaemia.",
        reasoning:
          "Low potassium increases digoxin binding to Na+/K+ ATPase; visual changes and ectopics are classic toxicity signs.",
      },
      highYield:
        "Four pillars: ACEi/ARNI, beta-blocker, MRA, SGLT2i. No mortality benefit: loop diuretics, digoxin. Digoxin toxicity: yellow vision, arrhythmias, worse with low K+, antidote Fab.",
      checks: [
        {
          q: "Which drug does NOT reduce mortality in HFrEF?",
          options: ["Bisoprolol", "Spironolactone", "Furosemide", "Sacubitril–valsartan"],
          answer: 2,
          why: "Loop diuretics relieve congestion but don't alter survival.",
        },
        {
          q: "Digoxin toxicity is precipitated by:",
          options: ["Hyperkalaemia", "Hypokalaemia", "Hypermagnesaemia", "Hyponatraemia"],
          answer: 1,
          why: "Digoxin competes with potassium for the Na+/K+ ATPase; low potassium increases its binding.",
        },
      ],
    },
  ],
};
