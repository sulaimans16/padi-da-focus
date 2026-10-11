import type { LearnModule } from "../learn";

export const biochemistry: LearnModule = {
  slug: "biochemistry",
  group: "Pre-clinical",
  subject: "Biochemistry",
  icon: "science",
  blurb:
    "Rate-limiting enzymes, vitamins, urea cycle, molecular techniques, glycogen and lysosomal storage diseases, lipoproteins and porphyrias — taught with the logic behind them.",
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
    "Predict the biochemical picture of each glycogen storage disease from the missing enzyme.",
    "Match lysosomal storage disorders to their enzyme and distinguishing signs.",
    "Describe the lipoprotein pathways and the familial dyslipidaemias.",
    "Explain the porphyrias and lead poisoning from the haem synthesis pathway.",
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
          [
            "Fasting",
            "Glucagon",
            "Glycogenolysis, gluconeogenesis, lipolysis",
            "Glycolysis, lipogenesis",
          ],
          [
            "Starvation",
            "Glucagon + cortisol",
            "Ketogenesis, proteolysis",
            "Glycogenolysis (stores gone)",
          ],
        ],
      },
      pitfalls: [
        "Fructose-2,6-bisphosphate is not an intermediate of glycolysis — it is purely a regulator.",
        "Hexokinase is inhibited by its product; glucokinase (liver) is not and has a high Km, so the liver only takes up glucose when it is abundant.",
      ],
      vignette: {
        stem: "A child presents with microcytic anaemia and basophilic stippling. Blood lead is elevated.",
        answer: "Inhibition of ALA dehydratase and ferrochelatase.",
        reasoning:
          "Both are lead-sensitive heme synthesis enzymes; ribosomal RNA degradation failure produces the basophilic stippling.",
      },
      highYield:
        "Lead inhibits ALA dehydratase and ferrochelatase → basophilic stippling on the smear.",
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
        reasoning:
          "Raised methylmalonic acid is specific to B12, because folate cannot substitute in the methylmalonyl-CoA mutase reaction.",
      },
      highYield:
        "Neurological signs and a raised methylmalonic acid separate B12 from folate deficiency.",
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
        reasoning:
          "Carbamoyl phosphate accumulates and diverts into pyrimidine synthesis; the absence of anaemia excludes UMP synthase deficiency.",
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
    {
      id: "glycogen-storage",
      title: "Glycogen storage diseases",
      minutes: 7,
      summary:
        "Missing enzymes of glycogen breakdown cause liver disease with fasting hypoglycaemia or muscle disease with exercise cramps, depending on where the glycogen is needed.",
      examFocus:
        "Enzyme of each type, why von Gierke causes lactic acidosis and gout, Pompe as the lysosomal GSD, and McArdle's exercise picture.",
      mechanism:
        "The liver breaks down glycogen to keep blood glucose up; muscle uses its glycogen only for itself. Glucose-6-phosphatase is the last step of both glycogenolysis and gluconeogenesis, so without it (von Gierke) the liver can release no glucose at all — severe fasting hypoglycaemia. The trapped glucose-6-phosphate is pushed down glycolysis (lactate), into fat synthesis (high triglycerides) and the pentose phosphate pathway (more purines → uric acid). A muscle phosphorylase defect (McArdle) spares blood glucose but starves the exercising muscle.",
      points: [
        "Type I — von Gierke: glucose-6-phosphatase; severe fasting hypoglycaemia, lactic acidosis, hyperuricaemia, hyperlipidaemia, hepatomegaly, 'doll face'. Treat with frequent feeds and uncooked cornstarch.",
        "Type II — Pompe: lysosomal acid maltase (acid α-glucosidase); cardiomegaly, hypotonia, early death in the infantile form; enzyme replacement available.",
        "Type III — Cori: debranching enzyme; like a milder von Gierke but with normal lactate; abnormal 'limit dextrin' glycogen.",
        "Type IV — Andersen: branching enzyme; abnormal glycogen causes early cirrhosis.",
        "Type V — McArdle: muscle phosphorylase; exercise cramps, myoglobinuria, no rise in lactate on ischaemic forearm test, 'second wind' phenomenon.",
        "Glucagon doesn't raise glucose in von Gierke — the block is downstream of glucagon's action.",
      ],
      table: {
        title: "GSD summary",
        columns: ["Type", "Enzyme", "Key feature"],
        rows: [
          ["I von Gierke", "Glucose-6-phosphatase", "Hypoglycaemia, lactic acidosis, gout"],
          ["II Pompe", "Lysosomal acid maltase", "Cardiomegaly, hypotonia"],
          ["III Cori", "Debranching enzyme", "Milder; normal lactate"],
          ["IV Andersen", "Branching enzyme", "Cirrhosis"],
          ["V McArdle", "Muscle phosphorylase", "Exercise cramps, myoglobinuria"],
        ],
      },
      pitfalls: [
        "Pompe is the only GSD that is a lysosomal storage disease — and its main organ is the heart.",
        "Lactate rises in von Gierke but fails to rise with exercise in McArdle.",
      ],
      mnemonic:
        "Types I, II, III, V: 'Very Poor Carbohydrate Metabolism' — von Gierke, Pompe, Cori, McArdle.",
      vignette: {
        stem: "A 6-month-old has hypoglycaemic seizures after short fasts, a large liver, high lactate, high uric acid and high triglycerides. Glucagon does not raise blood glucose.",
        answer: "Von Gierke disease (glucose-6-phosphatase deficiency).",
        reasoning:
          "Without the final enzyme neither glycogenolysis nor gluconeogenesis can release free glucose; G6P is shunted to lactate, lipid and urate.",
      },
      highYield:
        "Von Gierke: G6Pase — hypoglycaemia + lactic acidosis + gout + lipids. Pompe: acid maltase, heart. Cori: debranching. McArdle: muscle phosphorylase, cramps, myoglobinuria.",
      checks: [
        {
          q: "Cardiomegaly in an infant with hypotonia suggests deficiency of:",
          options: [
            "Glucose-6-phosphatase",
            "Acid maltase",
            "Debranching enzyme",
            "Muscle phosphorylase",
          ],
          answer: 1,
          why: "Pompe disease (acid maltase) stores glycogen in lysosomes, especially in heart muscle.",
        },
        {
          q: "Exercise-induced cramps with myoglobinuria and no rise in lactate point to:",
          options: ["Von Gierke", "Cori", "McArdle", "Andersen"],
          answer: 2,
          why: "Muscle phosphorylase deficiency stops muscle from breaking down glycogen during exercise.",
        },
      ],
    },
    {
      id: "lysosomal-storage",
      title: "Lysosomal storage disorders",
      minutes: 8,
      summary:
        "Inherited lysosomal enzyme defects let undigested lipids or mucopolysaccharides build up in cells, giving organomegaly, neurological decline and a few classic clues.",
      examFocus:
        "Enzyme for each disease, cherry-red spot with or without hepatosplenomegaly, the X-linked ones, and Hurler vs Hunter.",
      mechanism:
        "Lysosomes are the cell's recycling bins; each enzyme cuts one specific bond. When one is missing, its substrate accumulates in the cells that handle it most — macrophages in Gaucher (large spleen, bone marrow), neurons in Tay–Sachs (neurodegeneration). The macula looks cherry-red because the surrounding retina is swollen with stored lipid and pale, while the fovea has no ganglion cells and shows the red choroid through.",
      points: [
        "Gaucher (commonest): glucocerebrosidase; hepatosplenomegaly, bone pain and crises, Erlenmeyer-flask femur; 'crumpled tissue paper' macrophages; treat with enzyme replacement.",
        "Niemann–Pick: sphingomyelinase; hepatosplenomegaly, cherry-red spot, foam cells, neurodegeneration.",
        "Tay–Sachs: hexosaminidase A; cherry-red spot, exaggerated startle, no hepatosplenomegaly.",
        "Fabry (X-linked): α-galactosidase A; burning pain in hands and feet, angiokeratomas, renal failure, cardiomyopathy.",
        "Krabbe: galactocerebrosidase; globoid cells, optic atrophy, peripheral neuropathy. Metachromatic leukodystrophy: arylsulfatase A.",
        "Hurler (MPS I): α-L-iduronidase; coarse face, corneal clouding, developmental delay. Hunter (MPS II, X-linked): iduronate sulfatase; no corneal clouding, aggressive behaviour.",
        "I-cell disease: phosphotransferase defect — enzymes miss their mannose-6-phosphate tag and are secreted into blood instead of reaching lysosomes.",
        "All are autosomal recessive except Fabry and Hunter (X-linked).",
      ],
      table: {
        title: "Cherry-red spot and the spleen",
        columns: ["Disease", "Enzyme", "Cherry-red spot", "Hepatosplenomegaly"],
        rows: [
          ["Tay–Sachs", "Hexosaminidase A", "Yes", "No"],
          ["Niemann–Pick", "Sphingomyelinase", "Yes", "Yes"],
          ["Gaucher", "Glucocerebrosidase", "No (usually)", "Yes"],
        ],
      },
      pitfalls: [
        "A cherry-red spot is also seen in central retinal artery occlusion — context decides.",
        "Hunter has no corneal clouding; Hurler does.",
      ],
      mnemonic: "'Hunters see clearly and aim for the X' — Hunter: clear cornea, X-linked.",
      vignette: {
        stem: "A 20-year-old man has burning pain in his hands and feet, small dark-red skin papules around the umbilicus, proteinuria and left ventricular hypertrophy. His maternal uncle died of kidney failure.",
        answer: "Fabry disease — α-galactosidase A deficiency (X-linked).",
        reasoning:
          "Neuropathic pain, angiokeratomas, renal and cardiac involvement, and maternal-line inheritance in males fit Fabry.",
      },
      highYield:
        "Gaucher commonest: glucocerebrosidase. Tay–Sachs: cherry-red, no HSM. Niemann–Pick: cherry-red + HSM. Fabry and Hunter X-linked. I-cell: no mannose-6-phosphate.",
      checks: [
        {
          q: "Cherry-red spot without hepatosplenomegaly suggests:",
          options: [
            "Gaucher disease",
            "Niemann–Pick disease",
            "Tay–Sachs disease",
            "Hurler syndrome",
          ],
          answer: 2,
          why: "Tay–Sachs stores GM2 ganglioside in neurons, sparing the liver and spleen.",
        },
        {
          q: "Which lysosomal storage disorder is X-linked?",
          options: ["Gaucher", "Fabry", "Tay–Sachs", "Krabbe"],
          answer: 1,
          why: "Fabry and Hunter are the X-linked ones; the rest are autosomal recessive.",
        },
      ],
    },
    {
      id: "lipoproteins",
      title: "Lipoproteins & dyslipidaemias",
      minutes: 7,
      summary:
        "Lipoproteins ferry fats through blood: chylomicrons carry dietary fat, VLDL carries liver-made fat, LDL delivers cholesterol to tissues and HDL brings it back.",
      examFocus:
        "Apolipoprotein functions, density and electrophoretic order, and the Fredrickson types — especially familial hypercholesterolaemia.",
      mechanism:
        "Fat doesn't dissolve in plasma, so it travels in particles with a lipid core and a protein coat. The more triglyceride a particle holds the larger and less dense it is; as lipoprotein lipase strips out triglyceride, particles shrink and become denser, turning VLDL into IDL and then cholesterol-rich LDL. Apolipoproteins are the address labels: ApoC-II switches on lipoprotein lipase, ApoB-100 docks LDL on its receptor, and ApoE lets the liver take up remnants.",
      points: [
        "Chylomicrons: largest, least dense, richest in triglyceride; carry dietary fat from the intestine (ApoB-48).",
        "VLDL: endogenous triglyceride from the liver (ApoB-100). LDL: richest in cholesterol; delivers it to tissues. HDL: densest, most protein; reverse cholesterol transport.",
        "ApoA-I activates LCAT; ApoC-II activates lipoprotein lipase; ApoB-100 binds the LDL receptor; ApoE mediates remnant uptake.",
        "Electrophoresis: chylomicrons stay at the origin; LDL = β band; VLDL = pre-β; HDL = α (moves furthest).",
        "Type I (lipoprotein lipase or ApoC-II deficiency): very high triglycerides, acute pancreatitis, eruptive xanthomas, lipaemia retinalis.",
        "Type IIa familial hypercholesterolaemia (LDL receptor defect, autosomal dominant): very high LDL, tendon xanthomas, premature coronary disease.",
        "Type III (ApoE2 homozygosity): remnant accumulation, palmar xanthomas. Type IV: high VLDL (hypertriglyceridaemia).",
      ],
      table: {
        title: "Fredrickson types",
        columns: ["Type", "Raised", "Defect", "Clue"],
        rows: [
          ["I", "Chylomicrons", "LPL / ApoC-II", "Pancreatitis, eruptive xanthomas"],
          ["IIa", "LDL", "LDL receptor", "Tendon xanthomas, early MI"],
          ["IIb", "LDL + VLDL", "Polygenic / ApoB", "Mixed"],
          ["III", "IDL / remnants", "ApoE2", "Palmar xanthomas"],
          ["IV", "VLDL", "Overproduction", "High triglycerides"],
        ],
      },
      pitfalls: [
        "HDL moves furthest on electrophoresis (α), even though it is the smallest and densest.",
        "Type I hyperlipidaemia doesn't raise coronary risk much — pancreatitis is the danger.",
      ],
      vignette: {
        stem: "A 25-year-old with Achilles tendon thickening has LDL of 320 mg/dl. His father had a myocardial infarction at 38.",
        answer: "Familial hypercholesterolaemia (type IIa) — LDL receptor defect.",
        reasoning:
          "Very high LDL with tendon xanthomas and early coronary disease in a first-degree relative suggests an autosomal dominant LDL receptor defect.",
      },
      highYield:
        "Chylomicron: dietary TG, B-48. VLDL: liver TG, B-100. LDL: cholesterol to tissues. HDL: reverse transport, A-I activates LCAT. C-II activates LPL. Type IIa = LDL receptor, tendon xanthomas.",
      checks: [
        {
          q: "Lipoprotein lipase is activated by:",
          options: ["ApoA-I", "ApoB-100", "ApoC-II", "ApoE"],
          answer: 2,
          why: "ApoC-II on chylomicrons and VLDL switches on lipoprotein lipase in capillaries.",
        },
        {
          q: "Tendon xanthomas with premature coronary disease suggest a defect in:",
          options: ["Lipoprotein lipase", "LDL receptor", "ApoE", "LCAT"],
          answer: 1,
          why: "Familial hypercholesterolaemia (type IIa) is caused by a defective LDL receptor.",
        },
      ],
    },
    {
      id: "haem-porphyrias",
      title: "Haem synthesis & porphyrias",
      minutes: 8,
      summary:
        "Haem is built in eight steps split between mitochondria and cytosol. A block at a step causes a porphyria — with abdominal and neurological attacks, skin photosensitivity, or both.",
      examFocus:
        "Rate-limiting enzyme and its cofactor, enzymes in AIP and PCT, the effect of lead, and precipitants of acute attacks.",
      mechanism:
        "ALA synthase, the first and rate-limiting step, is switched off by haem. When a downstream enzyme is deficient, haem is low, so ALA synthase is switched on harder and intermediates before the block pile up. Early intermediates (ALA, PBG) are neurotoxic and cause abdominal pain and neuropathy; later porphyrin rings absorb light and generate free radicals in sun-exposed skin. That's why giving haem (hemin) or glucose — both of which suppress ALA synthase — treats an acute attack.",
      points: [
        "Step 1 (mitochondria): succinyl-CoA + glycine → ALA by ALA synthase, the rate-limiting enzyme; needs pyridoxal phosphate (vitamin B6).",
        "Lead inhibits ALA dehydratase and ferrochelatase → raised ALA and zinc protoporphyrin, microcytic anaemia, basophilic stippling.",
        "Acute intermittent porphyria (AIP): porphobilinogen (PBG) deaminase; autosomal dominant; abdominal pain, neuropathy, psychiatric symptoms, urine darkens on standing; no photosensitivity.",
        "AIP attacks are triggered by drugs that induce cytochrome P450 (barbiturates, phenytoin, sulfonamides), alcohol, fasting and progesterone; treat with IV hemin and glucose.",
        "Porphyria cutanea tarda (commonest porphyria): uroporphyrinogen decarboxylase; blisters on sun-exposed skin, hypertrichosis; linked to hepatitis C, alcohol, iron overload. Treat with phlebotomy or low-dose hydroxychloroquine.",
        "Erythropoietic protoporphyria: ferrochelatase; painful photosensitivity soon after sun exposure.",
        "X-linked sideroblastic anaemia: ALA synthase deficiency; ring sideroblasts; may respond to B6. Isoniazid can cause it by depleting B6.",
      ],
      flow: {
        title: "Haem pathway — where it breaks",
        steps: [
          {
            label: "Glycine + succinyl-CoA → ALA",
            detail: "ALA synthase (B6), mitochondria — sideroblastic anaemia",
          },
          { label: "ALA → porphobilinogen", detail: "ALA dehydratase — inhibited by lead" },
          {
            label: "PBG → hydroxymethylbilane",
            detail: "PBG deaminase — acute intermittent porphyria",
          },
          {
            label: "Uroporphyrinogen → coproporphyrinogen",
            detail: "UROD — porphyria cutanea tarda",
          },
          {
            label: "Protoporphyrin + Fe²⁺ → haem",
            detail: "Ferrochelatase — lead; erythropoietic protoporphyria",
          },
        ],
      },
      pitfalls: [
        "AIP has no skin lesions; PCT has no acute attacks.",
        "Barbiturates are dangerous in AIP because they induce ALA synthase.",
      ],
      mnemonic:
        "AIP's 5 Ps: Painful abdomen, Port-wine urine, Polyneuropathy, Psychological disturbance, Precipitated by drugs.",
      vignette: {
        stem: "A 28-year-old woman develops severe abdominal pain, confusion and weakness after starting a barbiturate. Examination of the abdomen is unremarkable and her urine turns dark on standing.",
        answer:
          "Acute intermittent porphyria — PBG deaminase deficiency; give IV hemin and glucose.",
        reasoning:
          "A P450 inducer upregulated ALA synthase, flooding the pathway above the PBG deaminase block with neurotoxic ALA and PBG.",
      },
      highYield:
        "ALA synthase rate-limiting, needs B6. Lead: ALA dehydratase + ferrochelatase. AIP: PBG deaminase, no photosensitivity, hemin. PCT: UROD, commonest, blisters, HCV.",
      checks: [
        {
          q: "The rate-limiting enzyme of haem synthesis requires:",
          options: ["Thiamine", "Pyridoxal phosphate", "Biotin", "Folate"],
          answer: 1,
          why: "ALA synthase uses pyridoxal phosphate (B6) to condense glycine with succinyl-CoA.",
        },
        {
          q: "The commonest porphyria, presenting with blisters on sun-exposed skin, is due to deficiency of:",
          options: [
            "PBG deaminase",
            "Uroporphyrinogen decarboxylase",
            "Ferrochelatase",
            "ALA dehydratase",
          ],
          answer: 1,
          why: "Porphyria cutanea tarda results from reduced UROD activity.",
        },
      ],
    },
  ],
};
