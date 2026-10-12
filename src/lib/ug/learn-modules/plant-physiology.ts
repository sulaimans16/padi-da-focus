import type { LearnModule } from "../../learn";

export const plantPhysiology: LearnModule = {
  slug: "plant-physiology",
  group: "Biology",
  subject: "Botany",
  title: "Plant Physiology",
  icon: "eco",
  blurb:
    "Photosynthesis from pigments and the Z-scheme to photophosphorylation, the Calvin cycle, C4 and CAM plants, photorespiration and limiting factors, respiration from glycolysis and fermentation to the Krebs cycle, ETS and RQ, plant growth and development, and plant growth regulators.",
  objectives: [
    "Learner can trace electrons and protons through the light reaction and explain how ATP and NADPH are made.",
    "Learner can account for the ATP and NADPH used per CO₂ and per glucose in the Calvin cycle and compare C3, C4 and CAM strategies.",
    "Learner can explain photorespiration and apply Blackman's law of limiting factors to light, CO₂, temperature and water.",
    "Learner can follow glucose through glycolysis, fermentation, link reaction, Krebs cycle and ETS, totalling ATP per NCERT and calculating RQ.",
    "Learner can describe growth phases and curves, differentiation and redifferentiation, and match each plant growth regulator to its discovery and uses.",
  ],
  concepts: [
    {
      id: "light-reaction",
      title: "Light reaction: pigments, Z-scheme and photophosphorylation",
      minutes: 9,
      summary:
        "Light absorbed by chlorophylls and accessory pigments drives electrons from water through PS II (P680) and PS I (P700) to NADP⁺, releasing O₂; the proton gradient built on the way makes ATP by chemiosmosis.",
      examFocus:
        "Early experiments (Priestley, Ingenhousz, Sachs, Engelmann, van Niel), pigment colours on chromatography, reaction-centre wavelengths, the Z-scheme sequence, where water splitting occurs, cyclic vs non-cyclic photophosphorylation, and the location of CF0 and CF1.",
      mechanism:
        "Accessory pigments (chlorophyll b, xanthophylls, carotenoids) absorb wavelengths that chlorophyll a misses and pass the energy to a reaction-centre chlorophyll a, giving PS II (P680) and PS I (P700); they also protect chlorophyll a from photo-oxidation. Excited P680 hands an electron to a primary acceptor, and the electron runs downhill through cytochromes to PS I, where light boosts it again before it reduces NADP⁺ to NADPH + H⁺ — an uphill–downhill–uphill path shaped like a Z. The hole left in PS II is filled by splitting water, so the O₂ of photosynthesis comes from water, as van Niel inferred. Protons pile up in the thylakoid lumen for three reasons: water is split on the lumen side, the PS II primary acceptor passes electrons to a hydrogen carrier that moves protons from the stroma into the lumen, and NADP reductase on the stroma side consumes stromal protons. Protons can return to the stroma only through the CF0 channel of ATP synthase, and this flow drives CF1 to make ATP on the stroma side, where the Calvin cycle needs it. If electrons from PS I cycle back to the chain instead of reducing NADP⁺, protons are still pumped, so ATP is made without NADPH or O₂.",
      points: [
        "Priestley (1770) showed plants restore air spoiled by a burning candle or a mouse (he discovered O₂ in 1774); Ingenhousz showed sunlight is essential and only green parts release O₂ (bubbles formed around green parts of an aquatic plant in bright light, not in the dark); Sachs (1854) showed green parts make glucose stored as starch.",
        "Engelmann split light with a prism onto Cladophora; aerobic bacteria gathered in blue and red light — the first action spectrum. Van Niel, working with purple and green bacteria, showed O₂ comes from H₂O: 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6H₂O + 6O₂.",
        "Chromatography colours: chlorophyll a — bright or blue-green (chief pigment); chlorophyll b — yellow-green; xanthophylls — yellow; carotenoids — yellow to yellow-orange.",
        "Water splitting is linked to PS II on the inner (lumen) side of the thylakoid: 2H₂O → 4H⁺ + O₂ + 4e⁻.",
        "Non-cyclic photophosphorylation uses PS II and PS I and gives ATP + NADPH + H⁺ with O₂ evolution; cyclic photophosphorylation uses PS I only and gives only ATP.",
        "Cyclic flow occurs in stroma lamellae, which lack PS II and NADP reductase, and may also run when only light beyond 680 nm is available.",
        "ATP synthase: CF0 is embedded in the thylakoid membrane and forms the proton channel; CF1 protrudes on the stroma side and synthesises ATP as protons move out of the lumen.",
        "Light reaction = light absorption, water splitting, O₂ release and formation of ATP and NADPH, in the grana thylakoids; these products are used in the stroma for CO₂ fixation.",
      ],
      flow: {
        title: "Non-cyclic electron flow (Z-scheme)",
        steps: [
          {
            label: "Water splitting",
            detail: "2H₂O → 4H⁺ + O₂ + 4e⁻ on the lumen side, linked to PS II",
          },
          { label: "PS II (P680)", detail: "Light excites electrons to a primary acceptor" },
          {
            label: "Electron transport chain",
            detail: "Downhill through cytochromes; protons moved into the lumen",
          },
          { label: "PS I (P700)", detail: "Re-excited by light to a higher-energy acceptor" },
          {
            label: "NADP⁺ reduction",
            detail: "NADP reductase forms NADPH + H⁺ on the stroma side",
          },
          {
            label: "Chemiosmosis",
            detail: "H⁺ flow from lumen to stroma through CF0 drives ATP synthesis at CF1",
          },
        ],
      },
      table: {
        title: "Cyclic vs non-cyclic photophosphorylation",
        columns: ["Feature", "Non-cyclic", "Cyclic"],
        rows: [
          ["Photosystems", "PS II and PS I", "PS I only"],
          ["Electron source", "Water", "Electrons return to P700"],
          ["Products", "ATP + NADPH; O₂ evolved", "ATP only; no O₂"],
          ["Location", "Grana lamellae", "Stroma lamellae"],
          [
            "Light",
            "Wavelengths that excite both photosystems",
            "Can run when only light beyond 680 nm is available",
          ],
        ],
      },
      pitfalls: [
        "PS I has P700 and PS II has P680 — the numbering reflects order of discovery, not the order of action (PS II acts first).",
        "Protons accumulate in the lumen, not the stroma; ATP is made on the stroma side as they flow out through CF0.",
      ],
      vignette: {
        stem: "Isolated thylakoids are illuminated only with far-red light of 700 nm. ATP formation continues, but no O₂ is released and NADP⁺ is not reduced.",
        answer: "Only cyclic photophosphorylation is running.",
        reasoning:
          "Light beyond 680 nm excites PS I but not PS II, so water is not split; electrons from PS I cycle back through the chain, pumping protons for ATP without forming NADPH or O₂.",
      },
      highYield:
        "PS I = P700, PS II = P680; water split with PS II on lumen side. Stroma lamellae lack PS II and NADP reductase → cyclic → ATP only. CF0 channel, CF1 makes ATP facing stroma.",
      checks: [
        {
          q: "The splitting of water during photosynthesis is associated with:",
          options: [
            "PS I on the stroma side",
            "PS I on the lumen side",
            "Cytochrome complex",
            "PS II on the inner side of the thylakoid",
          ],
          answer: 3,
          why: "The water-splitting complex is linked to PS II, located on the inner (lumen) side of the thylakoid membrane.",
        },
        {
          q: "Cyclic photophosphorylation occurs in stroma lamellae because they lack:",
          options: [
            "PS I and ATP synthase",
            "PS II and NADP reductase",
            "Cytochromes",
            "Chlorophyll a",
          ],
          answer: 1,
          why: "Without PS II and NADP reductase, electrons excited from PS I can only cycle back, generating ATP alone.",
        },
      ],
    },
    {
      id: "calvin-cycle",
      title: "Calvin cycle (C3 pathway)",
      minutes: 7,
      summary:
        "In the stroma, RuBisCO fixes CO₂ onto RuBP to give 3-PGA, which is reduced to sugar using ATP and NADPH; RuBP is regenerated so the cycle continues.",
      examFocus:
        "First stable product (3-PGA), the three stages, ATP and NADPH needed per CO₂ and per glucose (18 ATP, 12 NADPH), and RuBisCO's dual activity.",
      mechanism:
        "Melvin Calvin used radioactive ¹⁴C with algae and found that the first stable product of CO₂ fixation was the 3-carbon 3-phosphoglyceric acid (3-PGA), so this route is called the C3 pathway. The cycle has to regenerate its own CO₂ acceptor, otherwise fixation would stop, and that is why it is a cycle rather than a linear path. In carboxylation, RuBisCO adds CO₂ to the 5-carbon RuBP, giving two molecules of 3-PGA. In reduction, ATP and NADPH from the light reaction convert PGA to carbohydrate; in regeneration, more ATP is spent to rebuild RuBP. Because one turn fixes only one CO₂, six turns are needed for one glucose, which multiplies the costs per CO₂ by six.",
      points: [
        "Carboxylation: RuBP (5C) + CO₂ → 2 molecules of 3-PGA, catalysed by RuBisCO (ribulose bisphosphate carboxylase-oxygenase).",
        "Reduction: 2 ATP and 2 NADPH are used for each CO₂ fixed.",
        "Regeneration of RuBP: 1 ATP per CO₂ fixed.",
        "Per CO₂: 3 ATP + 2 NADPH; per glucose (6 turns): 18 ATP + 12 NADPH.",
        "The Calvin cycle runs in all photosynthetic plants, whether they are C3 or C4.",
        "The dark (biosynthetic) phase does not directly need light but depends on the ATP and NADPH formed in light, so it stops soon after light is withdrawn.",
        "RuBisCO is the most abundant enzyme (protein) in the world.",
      ],
      flow: {
        title: "Calvin cycle per CO₂ fixed",
        steps: [
          { label: "Carboxylation", detail: "RuBP + CO₂ → 2 × 3-PGA (RuBisCO)" },
          { label: "Reduction", detail: "2 ATP + 2 NADPH convert PGA to triose phosphate / sugar" },
          { label: "Regeneration", detail: "1 ATP used to rebuild RuBP, the CO₂ acceptor" },
          {
            label: "Six turns",
            detail: "6 CO₂ + 18 ATP + 12 NADPH → 1 glucose + 18 ADP + 12 NADP⁺",
          },
        ],
      },
      pitfalls: [
        "The CO₂ acceptor in the Calvin cycle is RuBP (5C); the first stable product is 3-PGA (3C). Do not confuse the acceptor with the product.",
        "It takes 3 ATP per CO₂, but 18 ATP per glucose — reading the question for 'per CO₂' vs 'per glucose' saves the mark.",
      ],
      vignette: {
        stem: "A plant fixes 12 molecules of CO₂ through the Calvin cycle.",
        answer: "36 ATP and 24 NADPH are consumed, and 2 glucose molecules can be formed.",
        reasoning:
          "Each CO₂ needs 3 ATP and 2 NADPH, so 12 × 3 = 36 ATP and 12 × 2 = 24 NADPH; six CO₂ make one glucose, so 12 CO₂ make two.",
      },
      highYield:
        "Per CO₂: 3 ATP + 2 NADPH. Per glucose: 6 turns, 18 ATP + 12 NADPH. First product 3-PGA; acceptor RuBP; enzyme RuBisCO.",
      checks: [
        {
          q: "The number of ATP and NADPH molecules needed to make one molecule of glucose through the Calvin cycle is:",
          options: [
            "18 ATP and 12 NADPH",
            "12 ATP and 18 NADPH",
            "3 ATP and 2 NADPH",
            "30 ATP and 12 NADPH",
          ],
          answer: 0,
          why: "Six turns of the cycle each use 3 ATP and 2 NADPH: 18 ATP and 12 NADPH.",
        },
        {
          q: "The primary CO₂ acceptor in the Calvin cycle is:",
          options: ["PEP", "3-PGA", "RuBP", "OAA"],
          answer: 2,
          why: "RuBP (a 5-carbon ketose sugar) accepts CO₂; PEP is the acceptor in C4 mesophyll cells.",
        },
      ],
    },
    {
      id: "c4-cam",
      title: "C4 pathway and CAM plants",
      minutes: 7,
      summary:
        "C4 plants first fix CO₂ into a 4-carbon acid in mesophyll cells and release it in bundle sheath cells, concentrating CO₂ around RuBisCO; CAM plants separate the same steps in time instead of space.",
      examFocus:
        "Kranz anatomy, primary acceptor (PEP) and first product (OAA), which enzyme is in which cell, C4 examples (maize, sorghum), and C3 vs C4 comparisons (photorespiration, temperature optimum).",
      mechanism:
        "RuBisCO can bind O₂ as well as CO₂, so plants in hot, dry, bright conditions lose fixed carbon unless they raise CO₂ around the enzyme. C4 plants do this with a division of labour between two cell types. In mesophyll cells, PEP carboxylase — which does not react with O₂ — fixes CO₂ onto the 3-carbon PEP to form the 4-carbon oxaloacetic acid, which is converted to malic or aspartic acid and moved into bundle sheath cells. There the acid is decarboxylated, releasing CO₂ at high concentration exactly where RuBisCO and the Calvin cycle are located, and the leftover 3-carbon acid returns to the mesophyll to regenerate PEP. Bundle sheath cells have thick walls impervious to gaseous exchange and no intercellular spaces, so the released CO₂ stays trapped there. CAM plants open stomata only at night, fix CO₂ into organic acids stored in the vacuole, and release it to the Calvin cycle during the day with stomata closed — a temporal separation that conserves water.",
      points: [
        "C4 pathway is also called the Hatch and Slack pathway; examples include maize and sorghum, adapted to dry tropical regions.",
        "Kranz ('wreath') anatomy: large bundle sheath cells arranged in layers around the vascular bundles, with many chloroplasts, thick walls and no intercellular spaces.",
        "Primary CO₂ acceptor in mesophyll: phosphoenol pyruvate (PEP, 3C); enzyme: PEP carboxylase (PEPcase); first stable product: oxaloacetic acid (OAA, 4C).",
        "Mesophyll cells lack RuBisCO; bundle sheath cells are rich in RuBisCO but lack PEPcase.",
        "The Calvin cycle in C4 plants runs in bundle sheath cells; the C4 cycle is an additional CO₂-concentrating step, not a replacement.",
        "C4 plants have a higher temperature optimum, tolerate high light intensity and show practically no photorespiration, so they are more productive.",
        "CAM: stomata open at night; CO₂ is fixed by PEPcase into organic acids (malic acid) stored in vacuoles, then decarboxylated by day for the Calvin cycle in the same cell — common in succulents of arid habitats.",
      ],
      table: {
        title: "C3 vs C4 vs CAM",
        columns: ["Feature", "C3", "C4", "CAM"],
        rows: [
          ["Primary CO₂ acceptor", "RuBP", "PEP (mesophyll)", "PEP (at night)"],
          ["First stable product", "3-PGA", "OAA", "OAA → malic acid"],
          [
            "Separation of steps",
            "None",
            "Spatial: mesophyll and bundle sheath",
            "Temporal: night and day",
          ],
          ["Kranz anatomy", "Absent", "Present", "Absent"],
          ["Photorespiration", "Present", "Practically absent", "Low"],
          ["Examples", "Most plants (wheat, rice)", "Maize, sorghum", "Succulents of dry habitats"],
        ],
      },
      pitfalls: [
        "In C4 plants the Calvin cycle still occurs — but in bundle sheath cells, not mesophyll cells; mesophyll cells lack RuBisCO.",
        "PEP is the 3-carbon acceptor and OAA the 4-carbon product; options often call PEP a 4-carbon compound.",
      ],
      vignette: {
        stem: "Leaf sections of a tropical grass show vascular bundles surrounded by a wreath of large, thick-walled, chloroplast-rich cells with no air spaces between them.",
        answer: "The grass is a C4 plant with Kranz anatomy (like maize or sorghum).",
        reasoning:
          "Thick-walled bundle sheath cells without intercellular spaces trap the CO₂ released from C4 acids, letting RuBisCO work with little photorespiration.",
      },
      highYield:
        "C4: PEP + CO₂ → OAA (PEPcase, mesophyll); decarboxylation and Calvin cycle in bundle sheath (RuBisCO). Kranz anatomy. Maize, sorghum.",
      checks: [
        {
          q: "In C4 plants, RuBisCO is located in:",
          options: [
            "Mesophyll cells only",
            "Both mesophyll and bundle sheath",
            "Bundle sheath cells",
            "Guard cells only",
          ],
          answer: 2,
          why: "Bundle sheath cells contain RuBisCO and run the Calvin cycle; mesophyll cells lack it.",
        },
        {
          q: "The first stable product of CO₂ fixation in C4 plants is:",
          options: [
            "Oxaloacetic acid",
            "3-phosphoglyceric acid",
            "Phosphoenol pyruvate",
            "Ribulose bisphosphate",
          ],
          answer: 0,
          why: "PEP carboxylase fixes CO₂ onto PEP to give the 4-carbon OAA.",
        },
      ],
    },
    {
      id: "photorespiration-factors",
      title: "Photorespiration and factors affecting photosynthesis",
      minutes: 7,
      summary:
        "When RuBisCO binds O₂ instead of CO₂, fixed carbon is lost without any ATP or sugar gain; the rate of photosynthesis is also set by whichever external or internal factor is in shortest supply.",
      examFocus:
        "Products of RuBisCO oxygenation, why C4 plants avoid photorespiration, Blackman's law of limiting factors, light saturation at about 10% of full sunlight, CO₂ saturation values for C3 and C4, and greenhouse CO₂ enrichment.",
      mechanism:
        "RuBisCO's active site can accept both CO₂ and O₂; it has a much greater affinity for CO₂, so when the two are present in similar concentrations CO₂ wins, but at higher O₂ some RuBP is oxygenated. Oxygenation gives one molecule of PGA and one of phosphoglycolate instead of two PGA, and recovering that carbon spends ATP and releases CO₂ without making sugar or ATP — a wasteful process. C4 plants pump CO₂ into bundle sheath cells, keeping the CO₂:O₂ ratio high around RuBisCO, which is why they practically do not photorespire. Overall rate depends on many factors at once, and Blackman's law (1905) says the rate is set by the factor closest to its minimum, so improving any other factor has no effect until the limiting one is relieved. That is why tomatoes and bell peppers grown in greenhouses yield more when the air is enriched with CO₂.",
      points: [
        "RuBP + O₂ → 1 phosphoglycolate + 1 PGA; in photorespiration there is neither synthesis of sugar nor of ATP, and ATP is actually used up with release of CO₂.",
        "Blackman's (1905) law of limiting factors: if a chemical process is affected by more than one factor, its rate is determined by the factor nearest its minimal value.",
        "Internal factors: number, size, age and orientation of leaves, mesophyll cells and chloroplasts, internal CO₂ concentration and amount of chlorophyll. External factors: light, CO₂, temperature and water.",
        "Light: rate rises linearly with intensity at low light; saturation occurs at about 10% of full sunlight, so except for shade plants in dense forests light is rarely limiting in nature. Very high light can break down chlorophyll and lower the rate.",
        "CO₂ is the major limiting factor (atmospheric 0.03–0.04%). C3 plants respond to increased CO₂ and saturate only beyond about 450 μL L⁻¹; C4 plants saturate at about 360 μL L⁻¹.",
        "Temperature: dark reactions are enzymatic and temperature-controlled; C4 plants have a higher temperature optimum than C3 plants, and tropical plants a higher optimum than temperate ones.",
        "Water stress affects photosynthesis mainly indirectly: stomata close, reducing CO₂ availability, and wilting reduces leaf surface area and metabolic activity.",
      ],
      table: {
        title: "Carboxylation vs oxygenation by RuBisCO",
        columns: ["Feature", "Carboxylation (Calvin cycle)", "Oxygenation (photorespiration)"],
        rows: [
          ["Substrate with RuBP", "CO₂", "O₂"],
          ["Products", "2 × 3-PGA", "1 PGA + 1 phosphoglycolate"],
          ["Sugar formed", "Yes", "No"],
          ["ATP", "Used, yielding sugar", "Used, with no sugar or ATP gained; CO₂ released"],
          ["Favoured by", "High CO₂:O₂ ratio", "High O₂, low CO₂ (hot, bright conditions)"],
        ],
      },
      pitfalls: [
        "Photorespiration produces no ATP — it consumes ATP; options that equate it with respiration as an ATP source are wrong.",
        "Light saturation occurs at about 10% of full sunlight, so in most natural conditions CO₂, not light, is the limiting factor.",
      ],
      vignette: {
        stem: "A greenhouse grower increases light intensity on a tomato crop but sees no rise in photosynthetic rate. When CO₂ is enriched, the rate rises sharply.",
        answer: "CO₂ was the limiting factor (Blackman's law).",
        reasoning:
          "Light was already above saturation, so raising it could not help; C3 plants like tomato respond to increased CO₂, which is why greenhouse CO₂ enrichment increases yield.",
      },
      highYield:
        "Photorespiration: RuBP + O₂ → PGA + phosphoglycolate; no sugar, no ATP. Absent in C4. Blackman 1905. Light saturation ≈ 10% sunlight; C3 > 450, C4 ≈ 360 μL L⁻¹ CO₂.",
      checks: [
        {
          q: "When RuBisCO acts as an oxygenase, the products are:",
          options: [
            "Two molecules of PGA",
            "One PGA and one phosphoglycolate",
            "OAA and pyruvate",
            "Glucose and O₂",
          ],
          answer: 1,
          why: "Oxygenation of RuBP yields one 3-PGA and one 2-carbon phosphoglycolate.",
        },
        {
          q: "C4 plants show saturation of photosynthesis at a CO₂ concentration of about:",
          options: ["100 μL L⁻¹", "1000 μL L⁻¹", "450 μL L⁻¹ and beyond", "360 μL L⁻¹"],
          answer: 3,
          why: "C4 plants saturate at about 360 μL L⁻¹, while C3 plants respond to CO₂ beyond 450 μL L⁻¹.",
        },
      ],
    },
    {
      id: "glycolysis-fermentation",
      title: "Glycolysis and fermentation",
      minutes: 7,
      summary:
        "Glycolysis breaks one glucose into two pyruvic acid molecules in the cytoplasm with a net gain of 2 ATP and 2 NADH; without oxygen, pyruvate is reduced to ethanol or lactic acid to recycle NAD⁺.",
      examFocus:
        "Steps where ATP is used and produced, the enzymes of fermentation, why fermentation yields so little energy (less than 7%), and the fates of pyruvate.",
      mechanism:
        "Glycolysis (EMP pathway, after Embden, Meyerhof and Parnas) is the only respiratory process in anaerobic organisms and the first stage in all others, which is why it occurs in the cytoplasm of every cell. Glucose is first activated by two phosphorylations that each consume an ATP, so the cell invests 2 ATP before gaining anything. The resulting fructose 1,6-bisphosphate splits into two 3-carbon sugars, and each is oxidised (forming NADH) and its phosphates transferred to ADP, giving 4 ATP by substrate-level phosphorylation — a net of 2 ATP. The cell has only a small pool of NAD⁺, so glycolysis would stop unless NADH is reoxidised; without oxygen, this is done by reducing pyruvate to ethanol (yeast) or lactic acid (muscle, some bacteria). Since glucose is only partly broken down, less than 7% of its energy is released in fermentation.",
      points: [
        "Sucrose is first split by invertase into glucose and fructose, which enter glycolysis.",
        "Glucose → glucose-6-phosphate (hexokinase, 1 ATP used) → fructose-6-phosphate → fructose-1,6-bisphosphate (1 ATP used).",
        "Fructose-1,6-bisphosphate splits into dihydroxyacetone phosphate and 3-phosphoglyceraldehyde (PGAL), which are interconvertible.",
        "PGAL → 1,3-bisphosphoglyceric acid (BPGA) produces NADH + H⁺; BPGA → 3-PGA produces ATP; PEP → pyruvic acid produces ATP.",
        "Per glucose: 2 ATP used, 4 ATP made directly, net 2 ATP + 2 NADH, giving 2 pyruvic acid.",
        "Alcoholic fermentation (yeast): pyruvic acid → CO₂ + ethanol by pyruvic acid decarboxylase and alcohol dehydrogenase. Lactic acid fermentation (some bacteria, muscle under low O₂): pyruvic acid → lactic acid by lactate dehydrogenase; NADH + H⁺ is the reducing agent in both.",
        "Yeasts poison themselves to death when alcohol concentration reaches about 13%.",
      ],
      flow: {
        title: "Fates of pyruvic acid",
        steps: [
          {
            label: "Glycolysis",
            detail: "Glucose → 2 pyruvic acid + net 2 ATP + 2 NADH (cytoplasm)",
          },
          {
            label: "Alcoholic fermentation",
            detail: "Pyruvic acid → CO₂ + ethanol (yeast, anaerobic)",
          },
          {
            label: "Lactic acid fermentation",
            detail: "Pyruvic acid → lactic acid (muscle under low O₂, some bacteria)",
          },
          {
            label: "Aerobic respiration",
            detail: "Pyruvic acid enters mitochondria → CO₂ + H₂O via Krebs cycle and ETS",
          },
        ],
      },
      pitfalls: [
        "Net gain of glycolysis is 2 ATP, not 4: 4 are made directly but 2 were invested in phosphorylating glucose and fructose-6-phosphate.",
        "Lactic acid fermentation releases no CO₂; only alcoholic fermentation produces CO₂.",
      ],
      vignette: {
        stem: "During a sprint, a runner's leg muscles develop fatigue and cramps as oxygen supply falls short.",
        answer:
          "Muscle cells switch to lactic acid fermentation, reducing pyruvic acid to lactic acid via lactate dehydrogenase.",
        reasoning:
          "With inadequate O₂, NADH cannot be reoxidised through the ETS, so muscle uses pyruvate as the electron acceptor to regenerate NAD⁺ and keep glycolysis running.",
      },
      highYield:
        "Glycolysis: cytoplasm, net 2 ATP + 2 NADH per glucose. Fermentation releases < 7% of glucose energy. Yeast dies at about 13% alcohol.",
      checks: [
        {
          q: "In glycolysis, ATP is directly produced in the conversion of:",
          options: [
            "Glucose to glucose-6-phosphate",
            "BPGA to 3-PGA",
            "Fructose-6-phosphate to fructose-1,6-bisphosphate",
            "PGAL to BPGA",
          ],
          answer: 1,
          why: "BPGA → 3-PGA and PEP → pyruvic acid are the ATP-yielding steps; the first and third options consume ATP and PGAL → BPGA forms NADH.",
        },
        {
          q: "The enzymes responsible for alcoholic fermentation in yeast are:",
          options: [
            "Lactate dehydrogenase and hexokinase",
            "Pyruvate dehydrogenase and citrate synthase",
            "Invertase and zymase only",
            "Pyruvic acid decarboxylase and alcohol dehydrogenase",
          ],
          answer: 3,
          why: "Pyruvic acid is decarboxylated to acetaldehyde and then reduced to ethanol by these two enzymes.",
        },
      ],
    },
    {
      id: "aerobic-respiration",
      title: "Krebs cycle, ETS, energy balance and RQ",
      minutes: 9,
      summary:
        "In mitochondria, pyruvate is oxidised to acetyl CoA, fully oxidised in the Krebs cycle, and the reduced coenzymes power ATP synthesis through the electron transport system, giving a net 38 ATP per glucose in NCERT's balance sheet.",
      examFocus:
        "Link reaction equation, Krebs cycle intermediates and where NADH, FADH₂ and GTP form, ETS complexes in order, ATP yield per NADH (3) and FADH₂ (2), net 38 ATP, amphibolic pathway, and RQ values for carbohydrates, fats and proteins.",
      mechanism:
        "Pyruvic acid enters the mitochondrial matrix and is oxidatively decarboxylated by pyruvate dehydrogenase, which needs NAD⁺ and coenzyme A, giving acetyl CoA, CO₂ and NADH. The acetyl group condenses with oxaloacetic acid to form citric acid, and as the cycle turns, two decarboxylations remove carbon as CO₂ while dehydrogenations load electrons onto NAD⁺ and FAD; regenerating oxaloacetate lets the cycle run again. The energy is still locked in NADH and FADH₂, so the ETS in the inner membrane passes their electrons through a series of carriers to oxygen, the final acceptor, which forms water. The carriers pump protons into the intermembrane space, and protons flowing back through the F0 channel drive the F1 head of ATP synthase (complex V) — oxidative phosphorylation. NADH enters at complex I and drives more pumping than FADH₂, which enters at complex II; that is why NADH yields 3 ATP and FADH₂ only 2 in NCERT's accounting.",
      points: [
        "Link reaction: pyruvic acid + CoA + NAD⁺ → acetyl CoA + CO₂ + NADH + H⁺ (pyruvate dehydrogenase, with Mg²⁺); 2 NADH per glucose.",
        "Krebs (TCA / citric acid) cycle, elucidated by Hans Krebs: acetyl CoA + OAA + H₂O → citric acid (citrate synthase) → isocitrate → α-ketoglutaric acid → succinyl CoA → succinic acid → malic acid → OAA.",
        "Per pyruvate entering the cycle: 3 NADH, 1 FADH₂ and 1 GTP (substrate-level phosphorylation during succinyl CoA → succinic acid), the GTP being converted to ATP.",
        "Summary for one pyruvic acid including the link reaction: pyruvic acid + 4NAD⁺ + FAD⁺ + 2H₂O + ADP + Pi → 3CO₂ + 4NADH + 4H⁺ + FADH₂ + ATP.",
        "ETS: complex I (NADH dehydrogenase) → ubiquinone → complex III (cytochrome bc₁) → cytochrome c (a small protein on the outer surface of the inner membrane) → complex IV (cytochrome c oxidase, cytochromes a and a₃ with two copper centres) → O₂. FADH₂ feeds in through complex II.",
        "Complex V (ATP synthase): F1 headpiece is a peripheral membrane protein complex where ATP is made; F0 is an integral membrane protein forming the proton channel; for each ATP produced, 2H⁺ pass through F0 from the intermembrane space to the matrix.",
        "NCERT balance sheet: 1 NADH → 3 ATP, 1 FADH₂ → 2 ATP; net gain of 38 ATP per glucose in aerobic respiration, compared with net 2 ATP in fermentation.",
        "Respiration is an amphibolic pathway: fats give glycerol (enters as PGAL) and fatty acids (to acetyl CoA); proteins give amino acids that enter after deamination as pyruvate, acetyl CoA or Krebs intermediates; the same intermediates are withdrawn for synthesis.",
      ],
      table: {
        title: "ATP balance per glucose (NCERT assumptions)",
        columns: ["Stage", "Direct ATP / GTP", "NADH", "FADH₂", "ATP equivalent"],
        rows: [
          ["Glycolysis", "2 (net)", "2", "0", "2 + 6 = 8"],
          ["Link reaction (2 pyruvate)", "0", "2", "0", "6"],
          ["Krebs cycle (2 turns)", "2", "6", "2", "2 + 18 + 4 = 24"],
          ["Total", "4", "10", "2", "38"],
        ],
      },
      formulae: [
        {
          label: "Respiratory quotient",
          expr: "RQ = volume of CO₂ evolved / volume of O₂ consumed",
        },
        { label: "Carbohydrate", expr: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O; RQ = 6/6 = 1.0" },
        {
          label: "Fat (tripalmitin)",
          expr: "2C₅₁H₉₈O₆ + 145O₂ → 102CO₂ + 98H₂O; RQ = 102/145 ≈ 0.7",
        },
        { label: "Protein", expr: "RQ ≈ 0.9" },
      ],
      pitfalls: [
        "The 38-ATP figure is a theoretical maximum built on assumptions (sequential pathway, glycolytic NADH entering mitochondria, no intermediates withdrawn); real yields are lower.",
        "Oxygen acts only at the end of the ETS as the final electron acceptor — it is not used in glycolysis or the Krebs cycle directly, yet without it the whole aerobic pathway stops.",
      ],
      vignette: {
        stem: "Germinating seeds of a plant consume 145 volumes of O₂ while giving out 102 volumes of CO₂ in a respirometer.",
        answer: "RQ ≈ 0.7, indicating that fats (e.g. tripalmitin) are the respiratory substrate.",
        reasoning:
          "RQ = 102/145 ≈ 0.7; fats are poor in oxygen relative to carbon and hydrogen, so they need more O₂ per CO₂ released than carbohydrates (RQ 1).",
      },
      highYield:
        "Per glucose aerobic: 38 ATP net (NADH = 3, FADH₂ = 2). Krebs per pyruvate: 3 NADH + 1 FADH₂ + 1 GTP. RQ: carbohydrate 1, fat 0.7, protein 0.9.",
      checks: [
        {
          q: "Substrate-level phosphorylation in the Krebs cycle occurs during the conversion of:",
          options: [
            "Succinyl CoA to succinic acid",
            "Citric acid to isocitrate",
            "Malic acid to oxaloacetic acid",
            "α-ketoglutaric acid to succinyl CoA",
          ],
          answer: 0,
          why: "Conversion of succinyl CoA to succinic acid is coupled with GTP synthesis, which yields ATP.",
        },
        {
          q: "Cytochrome c oxidase (complex IV) contains:",
          options: [
            "Cytochrome b and c₁",
            "Cytochromes a and a₃ with two copper centres",
            "Ubiquinone and FMN",
            "F0 and F1 subunits",
          ],
          answer: 1,
          why: "Complex IV comprises cytochromes a and a₃ and two copper centres; bc₁ is complex III and F0–F1 is complex V.",
        },
      ],
    },
    {
      id: "plant-growth",
      title: "Plant growth: phases, curves and differentiation",
      minutes: 7,
      summary:
        "Plant growth is an irreversible permanent increase in size; it is indeterminate because meristems keep dividing, follows arithmetic or geometric patterns, and is coupled to differentiation, dedifferentiation and redifferentiation.",
      examFocus:
        "Open form of growth, phases of growth, arithmetic vs geometric equations, the sigmoid curve, absolute vs relative growth rate, conditions for growth, and examples of dedifferentiation.",
      mechanism:
        "Plants keep meristems at their root and shoot tips (and laterally) throughout life, so new cells are always being added — this is the open form of growth. Each new cell passes through three phases: meristematic (dividing, dense protoplasm, large nucleus), elongation (vacuolation, enlargement, new wall deposition) and maturation (reaching full size and wall thickening). If only one daughter of each division keeps dividing, growth is arithmetic and length rises in a straight line; if both daughters keep dividing, growth is geometric and the curve rises exponentially. In real organs, nutrients become limiting, so geometric growth slows and stops, giving an S-shaped sigmoid curve with lag, log (exponential) and stationary phases. Differentiation shapes the mature cell for its job — for example, tracheary elements lose their protoplasm and build strong, elastic lignocellulosic secondary walls to carry water under tension.",
      points: [
        "Growth is measured as increase in fresh or dry weight, length, area, volume or cell number; a single maize root apical meristem can produce more than 17,500 new cells per hour, and cells in a watermelon may enlarge up to 3,50,000 times.",
        "Arithmetic growth: Lt = L₀ + rt — a straight-line curve (e.g. a root elongating at a constant rate).",
        "Geometric growth: W₁ = W₀eʳᵗ, where r is the relative growth rate (efficiency index); plotted, it gives a sigmoid curve with lag, log/exponential and stationary phases.",
        "Absolute growth rate is the total growth per unit time; relative growth rate is growth per unit time per unit initial size, so two leaves gaining the same area can differ in relative growth rate.",
        "Conditions for growth: water (cell enlargement needs turgidity and is the medium for enzymes), oxygen (metabolic energy), nutrients, an optimum temperature range, and environmental signals such as light and gravity.",
        "Dedifferentiation: differentiated cells regain the ability to divide, e.g. formation of interfascicular cambium and cork cambium from fully differentiated parenchyma; their products, having lost division capacity again, are redifferentiated.",
        "Plants show plasticity — different structures in response to environment or life phase: heterophylly in cotton, coriander and larkspur (juvenile vs mature leaves) and in buttercup (leaves in air vs water).",
        "Development = growth + differentiation; it is under the control of intrinsic factors (genetic and plant growth regulators) and extrinsic factors (light, temperature, water, oxygen, nutrition).",
      ],
      formulae: [
        {
          label: "Arithmetic growth",
          expr: "Lt = L₀ + rt",
          note: "Lt = length at time t; L₀ = length at t = 0; r = growth rate per unit time",
        },
        {
          label: "Geometric (exponential) growth",
          expr: "W₁ = W₀eʳᵗ",
          note: "W₀ initial size, r relative growth rate, e base of natural log",
        },
      ],
      flow: {
        title: "Sequence of development in a plant cell",
        steps: [
          { label: "Meristematic cell", detail: "Cell division" },
          { label: "Expansion", detail: "Elongation with vacuolation" },
          {
            label: "Differentiation / maturation",
            detail: "Mature cell specialised for a function",
          },
          {
            label: "Dedifferentiation",
            detail: "Mature cell regains division (e.g. cork cambium)",
          },
          {
            label: "Redifferentiation",
            detail: "New cells lose division ability and mature again",
          },
        ],
      },
      pitfalls: [
        "Formation of interfascicular cambium and cork cambium is dedifferentiation, not redifferentiation; the secondary tissues they produce are redifferentiated.",
        "A constant absolute growth rate does not mean a constant relative growth rate — relative rate depends on the initial size.",
      ],
      vignette: {
        stem: "Leaf A grows from 5 cm² to 10 cm² and leaf B from 50 cm² to 55 cm² in the same time.",
        answer:
          "Both have the same absolute growth (5 cm²), but leaf A has a much higher relative growth rate.",
        reasoning:
          "Relative growth = increase ÷ initial size: A = 5/5 = 100%, B = 5/50 = 10%; absolute growth is 5 cm² for both.",
      },
      highYield:
        "Lt = L₀ + rt (arithmetic); W₁ = W₀eʳᵗ (geometric, sigmoid: lag → log → stationary). Interfascicular and cork cambium = dedifferentiation. Heterophylly: cotton, coriander, larkspur.",
      checks: [
        {
          q: "In the equation W₁ = W₀eʳᵗ, r represents:",
          options: ["Initial size", "Time of growth", "Relative growth rate", "Final size"],
          answer: 2,
          why: "r is the relative growth rate, also called the efficiency index, measuring the ability to produce new material.",
        },
        {
          q: "Which is an example of dedifferentiation?",
          options: [
            "Formation of cork cambium from mature parenchyma",
            "Formation of tracheids from procambium",
            "Elongation of cells behind the root tip",
            "Formation of root hairs",
          ],
          answer: 0,
          why: "Fully differentiated parenchyma regaining the ability to divide, as in cork cambium formation, is dedifferentiation.",
        },
      ],
    },
    {
      id: "growth-regulators",
      title: "Plant growth regulators",
      minutes: 9,
      summary:
        "Five major PGRs control plant growth: auxins, gibberellins and cytokinins are mainly promoters, abscisic acid is an inhibitor, and ethylene acts largely as an inhibitor of growth but promotes ripening and abscission.",
      examFocus:
        "Discovery history (Darwins, Went, Kurosawa, Skoog and Miller, Cousins, ABA's three names), chemical nature of each PGR, and commercial applications — parthenocarpy, malting, sugarcane yield, bolting, ethephon, 2,4-D, stomatal closure.",
      mechanism:
        "PGRs are small, simple molecules of diverse chemical nature: auxin (IAA) is an indole compound, kinetin an adenine derivative, ABA a carotenoid derivative, gibberellic acid a terpene and ethylene a gas. Each was found by noticing an odd effect: the Darwins saw canary grass coleoptiles bend towards light, and Went later isolated auxin from oat coleoptile tips; Kurosawa found that sterile filtrates of the fungus Gibberella fujikuroi made healthy rice seedlings grow abnormally tall (bakanae, the 'foolish seedling' disease). Auxin made in the apical bud moves down and suppresses lateral buds, so removing the tip (decapitation) releases them — the basis of apical dominance used in tea plantations and hedge-making. ABA and gibberellins usually act as antagonists: GA breaks dormancy and promotes growth, whereas ABA induces dormancy and closes stomata under stress, which is why ABA is called the stress hormone. Ethylene, a gas, spreads easily through tissues and coordinates processes such as fruit ripening and abscission.",
      points: [
        "Auxin (from Greek auxein, to grow) was first isolated from human urine; natural: IAA, IBA; synthetic: NAA, 2,4-D. It promotes rooting in stem cuttings and flowering in pineapple, prevents early fruit and leaf drop but promotes abscission of older leaves and fruits, induces parthenocarpy (tomato), controls xylem differentiation and causes apical dominance; 2,4-D kills dicot weeds without affecting monocots, keeping lawns weed-free.",
        "Gibberellins: over 100 known (GA₁, GA₂, GA₃…); GA₃ was discovered first and is the most studied. They elongate grape stalks, elongate and improve apple shape, delay senescence, speed malting in brewing, increase sugarcane yield by as much as 20 tonnes per acre, hasten maturity of juvenile conifers, and cause bolting in beet and cabbage.",
        "Cytokinins: kinetin was obtained from autoclaved herring sperm DNA by Skoog and Miller; zeatin occurs in corn kernels and coconut milk. They promote cell division, new leaves, chloroplasts, lateral shoot growth and adventitious shoots, overcome apical dominance and delay leaf senescence through nutrient mobilisation.",
        "Ethylene: Cousins confirmed that a volatile from ripened oranges hastened ripening of stored bananas. It causes horizontal growth of seedlings, swelling of the axis and apical hook formation in dicot seedlings, promotes senescence and abscission, fruit ripening with a rise in respiration (respiratory climacteric), breaks seed and bud dormancy (peanut seeds, potato tubers), elongates internodes/petioles of deep water rice, and induces flowering in mango and pineapple.",
        "Ethephon releases ethylene slowly; it hastens ripening of tomatoes and apples, thins cotton, cherry and walnut by accelerating abscission, and promotes female flowers in cucumber. Ethylene is the most widely used PGR in agriculture.",
        "ABA was reported as three separate inhibitors — inhibitor-B, abscission II and dormin — later shown to be identical. It inhibits growth and seed germination, closes stomata, increases tolerance to stress, and promotes seed development, maturation and dormancy so seeds withstand desiccation.",
        "Chemical nature: IAA — indole compound; kinetin (N⁶-furfurylamino purine) — adenine derivative; ABA — carotenoid derivative; GA₃ — terpene; ethylene — gas (C₂H₄).",
      ],
      table: {
        title: "Plant growth regulators at a glance",
        columns: ["PGR", "Discovery", "Nature", "Key uses / effects"],
        rows: [
          [
            "Auxin",
            "Darwins (canary grass phototropism); Went isolated from Avena coleoptile tips",
            "Indole compound (IAA)",
            "Apical dominance, rooting of cuttings, parthenocarpy, 2,4-D weedicide",
          ],
          [
            "Gibberellin",
            "Kurosawa — bakanae disease of rice by Gibberella fujikuroi",
            "Terpene (GA₃)",
            "Stem elongation, bolting, malting, sugarcane yield, grape stalk length",
          ],
          [
            "Cytokinin",
            "Skoog and Miller — kinetin from autoclaved herring sperm DNA",
            "Adenine derivative",
            "Cell division, overcome apical dominance, delay senescence",
          ],
          [
            "Ethylene",
            "Cousins — volatile from ripened oranges",
            "Gas (C₂H₄)",
            "Ripening, abscission, triple response, female flowers in cucumber",
          ],
          [
            "Abscisic acid",
            "Inhibitor-B, abscission II, dormin",
            "Carotenoid derivative",
            "Stomatal closure, seed dormancy, stress hormone",
          ],
        ],
      },
      pitfalls: [
        "Cytokinins overcome apical dominance, whereas auxins cause it — decapitation lowers auxin and lets lateral buds grow.",
        "ABA is an antagonist of gibberellins; GA breaks seed dormancy while ABA induces it.",
      ],
      vignette: {
        stem: "A brewery wants to speed up the malting of barley grains, and a sugarcane farmer wants longer stems for higher sugar yield.",
        answer: "Both should use gibberellins (GA₃).",
        reasoning:
          "GA₃ hastens malting by stimulating hydrolytic activity in germinating grain, and spraying sugarcane with gibberellins increases stem length, raising yield by as much as 20 tonnes per acre.",
      },
      highYield:
        "Auxin → apical dominance, parthenocarpy, 2,4-D; GA → bolting, malting, sugarcane; cytokinin → delays senescence; ethylene → ripening, female flowers in cucumber; ABA → stomatal closure, dormancy.",
      checks: [
        {
          q: "Which PGR promotes female flowers in cucumber, thereby increasing yield?",
          options: ["Gibberellin", "Cytokinin", "Abscisic acid", "Ethylene (via ethephon)"],
          answer: 3,
          why: "Ethylene, applied as ethephon, promotes female flowers in cucumbers.",
        },
        {
          q: "Bakanae ('foolish seedling') disease of rice led to the discovery of:",
          options: ["Auxin", "Gibberellin", "Cytokinin", "Ethylene"],
          answer: 1,
          why: "Kurosawa showed that filtrates of Gibberella fujikuroi caused the disease symptoms; the active substance was gibberellic acid.",
        },
      ],
    },
  ],
};
