import type { LearnModule } from "../learn";

export const biochemistry: LearnModule = {
  slug: "biochemistry",
  group: "Pre-clinical",
  subject: "Biochemistry",
  icon: "science",
  blurb: "Rate-limiting enzymes, vitamin deficiencies, urea cycle and molecular techniques — pure recall points, taught with the logic behind them.",
  cover: {
    file: "Citric acid cycle with aconitate 2.svg",
    caption: "Citric acid (Krebs) cycle",
    credit: "Wikimedia Commons",
  },
  objectives: [
    "Name the committed step of each major pathway and its physiological regulator.",
    "Match a vitamin deficiency to its enzyme defect and clinical syndrome.",
    "Explain hyperammonaemia from the position of the urea cycle block.",
    "Choose the right molecular technique for a given diagnostic question.",
  ],
  concepts: [
    {
      id: "rate-limiting",
      title: "Rate-limiting enzymes and metabolic control",
      minutes: 6,
      summary: "Most metabolism questions reduce to naming the committed step and its regulator.",
      mechanism:
        "A pathway is controlled at the first irreversible step, because regulating anything later would waste intermediates already committed. That step is almost always allosterically sensitive to the pathway's end product or to the cell's energy charge. Phosphofructokinase-1 is the textbook case: ATP inhibits it (energy is plentiful), AMP activates it (energy is scarce), and fructose-2,6-bisphosphate overrides both to link glycolysis to insulin signalling. Once you know the regulator, you can predict the direction of flux in any hormonal state without memorising a table.",
      points: [
        "Glycolysis: phosphofructokinase-1, activated by fructose-2,6-bisphosphate and AMP, inhibited by ATP and citrate.",
        "Gluconeogenesis: fructose-1,6-bisphosphatase, activated by ATP, inhibited by F-2,6-BP and AMP.",
        "TCA cycle: isocitrate dehydrogenase, activated by ADP and calcium.",
        "Cholesterol synthesis: HMG-CoA reductase — the statin target, and the most regulated enzyme in the body.",
        "Heme synthesis: ALA synthase (mitochondrial, B6-dependent), inhibited by heme itself.",
        "Urea cycle: carbamoyl phosphate synthetase I, requires N-acetylglutamate as an obligate activator.",
        "Fatty acid synthesis: acetyl-CoA carboxylase (citrate activates, palmitoyl-CoA inhibits).",
      ],
      table: {
        title: "Fed versus fasting state",
        columns: ["State", "Dominant hormone", "Pathways on", "Pathways off"],
        rows: [
          ["Fed", "Insulin", "Glycolysis, glycogenesis, lipogenesis", "Gluconeogenesis, lipolysis"],
          ["Fasting", "Glucagon", "Glycogenolysis, gluconeogenesis, lipolysis", "Glycolysis, lipogenesis"],
          ["Starvation", "Glucagon + cortisol", "Ketogenesis, proteolysis", "Glycogenolysis (stores gone)"],
        ],
      },
      pitfalls: [
        "Fructose-2,6-bisphosphate is not an intermediate of glycolysis — it is purely a regulator.",
        "Hexokinase is inhibited by its product; glucokinase (liver) is not and has a high Km, so the liver only takes up glucose when it is abundant.",
      ],
      vignette: {
        stem: "A child presents with microcytic anaemia and basophilic stippling. Blood lead is elevated.",
        answer: "Inhibition of ALA dehydratase and ferrochelatase.",
        reasoning: "Both are lead-sensitive heme synthesis enzymes; ribosomal RNA degradation failure produces the basophilic stippling.",
      },
      highYield: "Lead inhibits ALA dehydratase and ferrochelatase → basophilic stippling on the smear.",
      figure: {
        file: "Glycolysis skeletal diagram.png",
        caption: "Glycolysis, with PFK-1 as the committed step",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "vitamins",
      title: "Water-soluble vitamin deficiencies",
      minutes: 7,
      summary: "Each B vitamin has one classic syndrome and one enzyme link.",
      mechanism:
        "B vitamins are coenzymes, so a deficiency is really an enzyme failure and the symptoms map onto the tissues most dependent on that enzyme. Thiamine is the cofactor for pyruvate dehydrogenase and transketolase, so the brain — an obligate glucose oxidiser — fails first, producing Wernicke's encephalopathy. B12 is needed for methylmalonyl-CoA mutase as well as methionine synthase; the mutase step is what folate cannot replace, and accumulated methylmalonyl-CoA disrupts myelin. That single extra reaction explains the entire neurological distinction between B12 and folate deficiency.",
      points: [
        "B1 thiamine → Wernicke–Korsakoff, wet and dry beriberi. Give thiamine *before* glucose in a suspected alcoholic.",
        "B2 riboflavin → angular cheilitis, corneal vascularisation. B3 niacin → pellagra: dermatitis, diarrhoea, dementia.",
        "B6 pyridoxine → sideroblastic anaemia, isoniazid-induced peripheral neuropathy, seizures in infants.",
        "B9 folate → megaloblastic anaemia without neurological signs; deficiency in pregnancy causes neural tube defects.",
        "B12 → megaloblastic anaemia with subacute combined degeneration of the dorsal columns and corticospinal tracts.",
        "Vitamin C → scurvy: defective collagen hydroxylation, perifollicular haemorrhage, poor wound healing.",
      ],
      table: {
        title: "B12 versus folate deficiency",
        columns: ["Feature", "B12", "Folate"],
        rows: [
          ["Anaemia", "Megaloblastic", "Megaloblastic"],
          ["Neurological signs", "Yes (SCD of cord)", "No"],
          ["Methylmalonic acid", "Raised", "Normal"],
          ["Homocysteine", "Raised", "Raised"],
          ["Onset after depletion", "Years", "Months"],
        ],
      },
      pitfalls: [
        "Giving folate alone in B12 deficiency corrects the anaemia while the neurological damage progresses — always check B12 first.",
        "Hartnup disease and carcinoid syndrome cause pellagra through tryptophan diversion, not dietary niacin lack.",
      ],
      mnemonic: "Pellagra's 4 Ds: Dermatitis, Diarrhoea, Dementia, Death.",
      vignette: {
        stem: "A vegan patient has a macrocytic anaemia, absent ankle reflexes and impaired vibration sense. Serum methylmalonic acid is elevated.",
        answer: "Vitamin B12 deficiency.",
        reasoning: "Raised methylmalonic acid is specific to B12, because folate cannot substitute in the methylmalonyl-CoA mutase reaction.",
      },
      highYield: "Neurological signs and a raised methylmalonic acid separate B12 from folate deficiency.",
      figure: {
        file: "Pellagra NIH.jpg",
        caption: "Pellagra — photosensitive dermatitis of niacin deficiency",
        credit: "NIH via Wikimedia Commons",
      },
    },
    {
      id: "urea-cycle",
      title: "Urea cycle and the hyperammonaemias",
      minutes: 7,
      summary:
        "Six enzymes converting toxic ammonia to urea — and the metabolite that tells you exactly where the block is.",
      mechanism:
        "Ammonia from amino acid catabolism is toxic to the brain because it depletes α-ketoglutarate in astrocytes, stalling the TCA cycle and driving glutamine accumulation and cerebral oedema. The urea cycle detoxifies it across two compartments: the first two steps are mitochondrial, the rest cytosolic. A block causes ammonia to back up, and the substrate immediately before the block accumulates. Orotic aciduria is the fingerprint of OTC deficiency, because excess carbamoyl phosphate spills out of the mitochondrion into pyrimidine synthesis.",
      points: [
        "Rate-limiting step: carbamoyl phosphate synthetase I, obligately activated by N-acetylglutamate.",
        "Ornithine transcarbamylase (OTC) deficiency is X-linked and the commonest urea cycle defect.",
        "OTC deficiency = hyperammonaemia + high orotic acid + *normal* BUN, with no megaloblastic anaemia.",
        "Orotic aciduria (UMP synthase deficiency) also gives orotic acid but *with* megaloblastic anaemia and *normal* ammonia.",
        "Treatment: protein restriction, lactulose and rifaximin in liver disease, sodium benzoate/phenylbutyrate to divert nitrogen.",
      ],
      table: {
        title: "Two causes of orotic aciduria",
        columns: ["Feature", "OTC deficiency", "Hereditary orotic aciduria"],
        rows: [
          ["Ammonia", "High", "Normal"],
          ["Megaloblastic anaemia", "Absent", "Present"],
          ["Inheritance", "X-linked", "Autosomal recessive"],
          ["Treatment", "Nitrogen scavengers", "Uridine supplementation"],
        ],
      },
      pitfalls: [
        "A neonate with hyperammonaemia and *respiratory alkalosis* has a urea cycle defect, not an organic acidaemia (which causes acidosis).",
        "Valproate can precipitate hyperammonaemia by depleting carnitine and inhibiting CPS I.",
      ],
      vignette: {
        stem: "A male neonate becomes lethargic and tachypnoeic on day 3. Ammonia is 600 µmol/L, urinary orotic acid is high, and there is no anaemia.",
        answer: "Ornithine transcarbamylase deficiency.",
        reasoning: "Carbamoyl phosphate accumulates and diverts into pyrimidine synthesis; the absence of anaemia excludes UMP synthase deficiency.",
      },
      highYield: "Hyperammonaemia + orotic aciduria + no anaemia = OTC deficiency (X-linked).",
      figure: {
        file: "Urea cycle.svg",
        caption: "The urea cycle across mitochondrial and cytosolic compartments",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "molecular-techniques",
      title: "Choosing the right molecular technique",
      minutes: 6,
      summary: "Blots, PCR, FISH, ELISA — each answers exactly one kind of question.",
      mechanism:
        "Technique questions are decided by the analyte and the resolution needed. Blots separate by size and probe by complementarity: Southern for DNA, Northern for RNA, Western for protein via antibody. PCR amplifies a known sequence, so it is the tool when you already know what you are looking for and need sensitivity. FISH visualises the location of a sequence within an intact nucleus, so it detects translocations and microdeletions that PCR would miss. ELISA quantifies protein using antibody-linked enzymes and is the diagnostic workhorse for serology.",
      points: [
        "Southern = DNA, Northern = RNA, Western = protein (SNoW DRoP).",
        "PCR needs known flanking sequence for primers; RT-PCR starts from RNA using reverse transcriptase.",
        "FISH detects deletions, duplications and translocations at the chromosomal level — used for 22q11, HER2 amplification.",
        "ELISA: sandwich format for antigen detection, indirect format for antibody detection (HIV screening).",
        "Karyotype detects changes above ~5 Mb; microarray detects smaller copy number variants but not balanced translocations.",
      ],
      table: {
        title: "Technique selection",
        columns: ["Question", "Best technique"],
        rows: [
          ["Is this specific mutation present?", "PCR / sequencing"],
          ["Is this gene amplified in tumour tissue?", "FISH"],
          ["Is this protein expressed?", "Western blot"],
          ["Does the patient have antibodies to X?", "Indirect ELISA"],
          ["Is there a balanced translocation?", "Karyotype or FISH"],
        ],
      },
      pitfalls: [
        "Microarray cannot detect balanced translocations — there is no copy number change to see.",
        "A positive ELISA is a screening result; confirm with a more specific assay before counselling.",
      ],
      mnemonic: "SNoW DRoP — Southern/Northern/Western for DNA/RNA/Protein.",
      highYield: "Balanced translocation suspected? Karyotype or FISH — never microarray.",
      figure: {
        file: "Complete neuron cell diagram en.svg",
        caption: "Cellular detail of the kind resolved by molecular and imaging techniques",
        credit: "Wikimedia Commons",
      },
    },
  ],
};
