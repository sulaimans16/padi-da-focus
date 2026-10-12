import type { LearnModule } from "../../learn";

export const plantDiversity: LearnModule = {
  slug: "plant-diversity",
  group: "Biology",
  subject: "Botany",
  title: "Plant Diversity & Structure",
  icon: "park",
  blurb:
    "Taxonomy and taxonomic categories, the five-kingdom system with Monera, Protista, Fungi, viruses, viroids and lichens, the plant kingdom from algae to angiosperms, morphology of flowering plants with Fabaceae, Solanaceae and Liliaceae, and anatomy of dicot and monocot organs.",
  objectives: [
    "Learner can apply the rules of binomial nomenclature and arrange taxonomic categories in their correct hierarchy.",
    "Learner can place an organism in Whittaker's five kingdoms and identify its subgroup from salient features and examples.",
    "Learner can distinguish algae, bryophytes, pteridophytes, gymnosperms and angiosperms by pigments, dominant generation and reproductive features.",
    "Learner can describe root, stem, leaf, inflorescence and flower types and read the floral formulae of Fabaceae, Solanaceae and Liliaceae.",
    "Learner can identify plant tissues and tell a dicot from a monocot root, stem and leaf in transverse section.",
  ],
  concepts: [
    {
      id: "taxonomy-categories",
      title: "The living world: nomenclature and taxonomic categories",
      minutes: 6,
      summary:
        "About 1.7–1.8 million species have been described; taxonomy names and arranges them using binomial nomenclature and a hierarchy of categories from species to kingdom.",
      examFocus:
        "Rules of writing scientific names, the order of taxonomic categories, which family/order a familiar organism belongs to (mango, wheat, man, housefly), and ICBN vs ICZN.",
      mechanism:
        "Common names differ from place to place, so scientists needed one universal, unambiguous name for each organism. Linnaeus's binomial system gives each a generic name and a specific epithet, written in Latin (or Latinised) because a dead language does not change, and it is governed by codes — ICBN for plants and ICZN for animals — so a name means the same thing everywhere. Classification then groups organisms by shared characters into ranks; each rank (taxon) is broader than the one below it. As you move up from species to kingdom, the number of shared characters decreases, which is why two species in the same genus resemble each other far more than two members of the same class. Taxonomy rests on four steps — characterisation, identification, nomenclature and classification.",
      points: [
        "Binomial nomenclature was proposed by Carolus Linnaeus; the first word (genus) begins with a capital letter, the specific epithet with a small letter.",
        "Printed names are in italics; handwritten names have the genus and epithet underlined separately. The author's name may follow in abbreviated form, e.g. Mangifera indica Linn.",
        "Hierarchy (ascending): species → genus → family → order → class → phylum (division in plants) → kingdom.",
        "Panthera leo (lion), P. pardus (leopard) and P. tigris (tiger) share genus Panthera; Solanum tuberosum (potato), S. melongena (brinjal) and S. nigrum share genus Solanum.",
        "Family Solanaceae includes Solanum, Petunia and Datura; Felidae (Panthera, Felis) and Canidae are placed in order Carnivora.",
        "Order Polymoniales contains families Convolvulaceae and Solanaceae, grouped largely on floral characters.",
        "Mango: Anacardiaceae, Sapindales, Dicotyledonae, Angiospermae; wheat: Poaceae, Poales, Monocotyledonae, Angiospermae.",
      ],
      table: {
        title: "Organisms with their taxonomic categories (NCERT examples)",
        columns: ["Common name", "Genus species", "Family", "Order", "Class", "Phylum / Division"],
        rows: [
          ["Man", "Homo sapiens", "Hominidae", "Primata", "Mammalia", "Chordata"],
          ["Housefly", "Musca domestica", "Muscidae", "Diptera", "Insecta", "Arthropoda"],
          [
            "Mango",
            "Mangifera indica",
            "Anacardiaceae",
            "Sapindales",
            "Dicotyledonae",
            "Angiospermae",
          ],
          ["Wheat", "Triticum aestivum", "Poaceae", "Poales", "Monocotyledonae", "Angiospermae"],
        ],
      },
      pitfalls: [
        "In plants the rank between class and kingdom is called division, not phylum.",
        "Mango belongs to order Sapindales and family Anacardiaceae; Poales/Poaceae belong to wheat — these pairs are often swapped in options.",
      ],
      vignette: {
        stem: "A student writes the scientific name of mango on a chart as 'mangifera Indica' in plain handwriting without underlining.",
        answer:
          "Correct form: Mangifera indica, with genus and epithet underlined separately when handwritten.",
        reasoning:
          "The generic name starts with a capital, the specific epithet with a small letter, and handwritten names are underlined (italics in print) to show their Latin origin.",
      },
      highYield:
        "Species → genus → family → order → class → phylum/division → kingdom. Mango: Anacardiaceae, Sapindales; wheat: Poaceae, Poales.",
      checks: [
        {
          q: "Which taxonomic category contains the most closely similar organisms?",
          options: ["Genus", "Species", "Family", "Order"],
          answer: 1,
          why: "Species is the lowest category; members share the largest number of characters.",
        },
        {
          q: "Families Convolvulaceae and Solanaceae are included in the order:",
          options: ["Sapindales", "Poales", "Polymoniales", "Carnivora"],
          answer: 2,
          why: "Both are placed in Polymoniales mainly on the basis of floral characters.",
        },
      ],
    },
    {
      id: "five-kingdoms-monera",
      title: "Five kingdoms, Monera, viruses and lichens",
      minutes: 8,
      summary:
        "Whittaker (1969) divided organisms into Monera, Protista, Fungi, Plantae and Animalia; Monera are the prokaryotes, while acellular viruses, viroids and prions, and the algal–fungal partnership of lichens, sit outside this scheme.",
      examFocus:
        "Whittaker's criteria, archaebacteria types (methanogens, halophiles, thermoacidophiles), cyanobacteria and heterocysts, Mycoplasma, virus discoverers and dates (Ivanowsky, Beijerinek, Stanley, Diener), viroid features, and lichen partners.",
      mechanism:
        "The two-kingdom system lumped prokaryotes with eukaryotes and photosynthetic algae with non-photosynthetic fungi simply because all had cell walls, so Whittaker separated them using cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships. Monera, the only prokaryotes, owe their success to metabolic diversity: some photosynthesise, chemosynthetic forms oxidise nitrates, nitrites and ammonia for energy, and many are decomposers or parasites, so bacteria drive the recycling of nitrogen, phosphorus, iron and sulphur. Archaebacteria survive extreme habitats because their cell wall structure differs from that of other bacteria. Viruses are left out of the five kingdoms because they are not cellular and have no metabolism of their own: outside a host they are inert particles, and inside one they use the host machinery to copy themselves. A virus is just nucleic acid (RNA or DNA) inside a protein capsid, and viroids are even simpler — naked RNA with no coat. Lichens work because each partner supplies what the other lacks: the alga makes food, the fungus gives shelter and absorbs water and minerals.",
      points: [
        "Whittaker's five kingdoms (1969): Monera, Protista, Fungi, Plantae, Animalia; criteria — cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships.",
        "Archaebacteria: halophiles (salty areas), thermoacidophiles (hot springs) and methanogens (marshy areas and the gut of ruminants such as cows and buffaloes, producing methane / biogas).",
        "Cyanobacteria (blue-green algae) have chlorophyll a like plants, may be unicellular, colonial or filamentous, often form blooms in polluted water, and Nostoc and Anabaena fix nitrogen in heterocysts.",
        "Heterotrophic bacteria are the most abundant; they are decomposers, make curd from milk, produce antibiotics and fix nitrogen in legume roots, while some cause cholera, typhoid, tetanus and citrus canker. Bacteria reproduce mainly by fission.",
        "Mycoplasma lack a cell wall, are the smallest living cells known, can survive without oxygen and are pathogenic in animals and plants.",
        "Viruses: Ivanowsky (1892) found the tobacco mosaic agent passes through bacteria-proof filters; Beijerinek (1898) called it Contagium vivum fluidum; Stanley (1935) crystallised viruses. Plant viruses usually have ssRNA, bacteriophages usually dsDNA; the capsid is made of capsomeres in helical or polyhedral forms.",
        "Viroids (T.O. Diener, 1971) cause potato spindle tuber disease and are free low-molecular-weight RNA lacking a protein coat; prions are abnormally folded proteins causing BSE (mad cow disease) and Cr–Jacob disease.",
        "Lichens: algal partner (phycobiont, autotrophic) + fungal partner (mycobiont, heterotrophic); they do not grow in polluted areas and are very good pollution indicators.",
      ],
      table: {
        title: "Whittaker's five kingdoms",
        columns: ["Kingdom", "Cell type", "Cell wall", "Body", "Nutrition"],
        rows: [
          [
            "Monera",
            "Prokaryotic",
            "Non-cellulosic (polysaccharide + amino acid); absent in Mycoplasma",
            "Cellular",
            "Autotrophic or heterotrophic",
          ],
          [
            "Protista",
            "Eukaryotic",
            "Present in some",
            "Unicellular",
            "Autotrophic or heterotrophic",
          ],
          [
            "Fungi",
            "Eukaryotic",
            "Chitin",
            "Multicellular / loose tissue",
            "Heterotrophic (saprophytic or parasitic)",
          ],
          ["Plantae", "Eukaryotic", "Cellulose", "Tissue / organ", "Autotrophic (photosynthetic)"],
          [
            "Animalia",
            "Eukaryotic",
            "Absent",
            "Tissue / organ / organ system",
            "Heterotrophic (holozoic)",
          ],
        ],
      },
      pitfalls: [
        "Methanogens are archaebacteria living in ruminant guts — not eubacteria; cyanobacteria ('blue-green algae') are also Monera, not true algae.",
        "Viroids lack a protein coat while viruses have one; in a lichen the alga is the phycobiont and the fungus the mycobiont — both pairs are often swapped in options.",
      ],
      vignette: {
        stem: "A biogas plant is fed with cattle dung. The gas produced is mostly methane.",
        answer:
          "Methanogens (archaebacteria) from the rumen present in the dung produce the methane.",
        reasoning:
          "Methanogens live in the gut of ruminants and in marshy areas and are responsible for methane (biogas) production from dung.",
      },
      highYield:
        "Whittaker 1969 — five kingdoms. Methanogens in ruminant gut. Mycoplasma: no wall. TMV — Ivanowsky 1892; viroid — Diener 1971 (RNA, no coat). Lichen = phycobiont + mycobiont.",
      checks: [
        {
          q: "Which bacteria are found in the gut of ruminants and produce methane?",
          options: ["Halophiles", "Methanogens", "Thermoacidophiles", "Cyanobacteria"],
          answer: 1,
          why: "Methanogens are archaebacteria responsible for methane production in ruminants and marshes.",
        },
        {
          q: "Viroids differ from viruses in having:",
          options: [
            "DNA with a protein coat",
            "RNA with a protein coat",
            "Free RNA without a protein coat",
            "Protein without nucleic acid",
          ],
          answer: 2,
          why: "Viroids are free low-molecular-weight RNA lacking the protein coat that viruses possess.",
        },
      ],
    },
    {
      id: "protista-fungi",
      title: "Kingdom Protista and Kingdom Fungi",
      minutes: 8,
      summary:
        "Protista are single-celled eukaryotes linking plants, animals and fungi; Fungi are heterotrophic eukaryotes with chitin walls, classified by spore type and fruiting body.",
      examFocus:
        "Diatoms and diatomaceous earth, red tides (Gonyaulax), euglenoid pellicle, slime mould spores, protozoan groups with examples, and the four fungal classes with their spores and examples.",
      mechanism:
        "Protists are all unicellular eukaryotes, so they share a true nucleus and organelles but differ widely in nutrition, which is why the kingdom is a mixed bag of plant-like, animal-like and fungus-like forms. Diatom walls are impregnated with silica and therefore do not decay; their deposits accumulate over billions of years as diatomaceous earth. Fungi cannot photosynthesise, so they live as saprophytes, parasites or symbionts and absorb food through a network of hyphae. Their sexual cycle has three steps — plasmogamy (fusion of protoplasms), karyogamy (fusion of nuclei) and meiosis — and in ascomycetes and basidiomycetes karyogamy is delayed, giving a dikaryotic (n + n) phase. Fungal classes are defined mainly by how sexual spores are formed: zygospores in phycomycetes, ascospores inside asci in ascomycetes, basidiospores on basidia in basidiomycetes, and no known sexual stage in deuteromycetes.",
      points: [
        "Chrysophytes (diatoms, golden algae/desmids): walls form two overlapping shells like a soap box; diatomaceous earth is used for polishing and filtration of oils and syrups; diatoms are the chief producers in the oceans.",
        "Dinoflagellates: mostly marine, photosynthetic, with stiff cellulose plates and two flagella (one longitudinal, one transverse in a furrow); red dinoflagellates such as Gonyaulax cause red tides whose toxins may kill fish.",
        "Euglenoids (Euglena): fresh-water forms with a protein-rich pellicle instead of a cell wall and two flagella; photosynthetic in light but heterotrophic when deprived of sunlight.",
        "Slime moulds: saprophytic protists forming a plasmodium; under unfavourable conditions they form fruiting bodies bearing spores with true walls, highly resistant and dispersed by air currents.",
        "Protozoans: amoeboid (Amoeba; Entamoeba parasitic), flagellated (Trypanosoma causes sleeping sickness), ciliated (Paramoecium, with a gullet) and sporozoans (Plasmodium causes malaria).",
        "Fungal cell wall is made of chitin and polysaccharides; most fungi are filamentous with hyphae forming a mycelium; yeast is unicellular.",
        "Phycomycetes: aseptate, coenocytic mycelium; asexual zoospores or aplanospores; zygospores; e.g. Mucor, Rhizopus, Albugo (parasite on mustard).",
        "Ascomycetes (sac fungi): septate mycelium, conidia, ascospores in asci within ascocarps — Penicillium, Aspergillus, Claviceps, Neurospora; morels and truffles are edible. Basidiomycetes: no sex organs, basidiospores on basidia — Agaricus, Ustilago (smut), Puccinia (rust). Deuteromycetes: only asexual phase known — Alternaria, Colletotrichum, Trichoderma.",
      ],
      table: {
        title: "Classes of fungi",
        columns: ["Class", "Mycelium", "Sexual spore", "Examples"],
        rows: [
          ["Phycomycetes", "Aseptate, coenocytic", "Zygospore", "Mucor, Rhizopus, Albugo"],
          [
            "Ascomycetes",
            "Septate, branched",
            "Ascospores (endogenous, in asci)",
            "Penicillium, Aspergillus, Claviceps, Neurospora, yeast",
          ],
          [
            "Basidiomycetes",
            "Septate, branched",
            "Basidiospores (exogenous, on basidia)",
            "Agaricus, Ustilago, Puccinia",
          ],
          [
            "Deuteromycetes (imperfect fungi)",
            "Septate, branched",
            "Not known; only conidia",
            "Alternaria, Colletotrichum, Trichoderma",
          ],
        ],
      },
      pitfalls: [
        "Neurospora (used in biochemical and genetic work) is an ascomycete; Albugo is a phycomycete, not an ascomycete.",
        "Basidiomycetes lack sex organs — plasmogamy occurs by fusion of two somatic cells — and asexual spores are generally absent.",
      ],
      vignette: {
        stem: "A coastal fishing community reports that the sea has turned red and many fish have died after a sudden bloom of microscopic organisms.",
        answer: "A red tide caused by red dinoflagellates such as Gonyaulax.",
        reasoning:
          "Rapid multiplication of red dinoflagellates colours the sea red, and their toxins can kill marine animals such as fish.",
      },
      highYield:
        "Diatoms: silica walls → diatomaceous earth. Gonyaulax → red tide. Trypanosoma → sleeping sickness. Ustilago = smut, Puccinia = rust (basidiomycetes).",
      checks: [
        {
          q: "Which of the following is a member of Deuteromycetes?",
          options: ["Trichoderma", "Agaricus", "Rhizopus", "Claviceps"],
          answer: 0,
          why: "Trichoderma, Alternaria and Colletotrichum are imperfect fungi; Agaricus is a basidiomycete, Rhizopus a phycomycete and Claviceps an ascomycete.",
        },
        {
          q: "Protists that have a protein-rich pellicle instead of a cell wall are:",
          options: ["Dinoflagellates", "Diatoms", "Euglenoids", "Slime moulds"],
          answer: 2,
          why: "Euglenoids such as Euglena have a flexible protein-rich pellicle.",
        },
      ],
    },
    {
      id: "algae-bryophytes",
      title: "Algae and bryophytes",
      minutes: 8,
      summary:
        "Algae are chlorophyll-bearing, simple, thalloid, largely aquatic plants grouped by pigment and stored food; bryophytes are the amphibians of the plant kingdom with a dominant gametophyte.",
      examFocus:
        "Pigments, stored food and wall composition of the three algal classes with examples, isogamy/anisogamy/oogamy examples, commercial products (agar, algin, carrageen), and liverworts vs mosses with protonema and gemmae.",
      mechanism:
        "Algal classes differ mainly in their accessory pigments, which decide which wavelengths they can use: green algae have chlorophyll a and b like land plants, brown algae add fucoxanthin, and red algae add r-phycoerythrin, which absorbs the blue-green light that penetrates deepest, so red algae can grow at great depths. Each class also stores its food differently — starch, laminarin or mannitol, or floridean starch. Bryophytes moved onto land but kept a dependence on water because their male gametes (antherozoids) must swim to the egg in the archegonium. Their main plant body is the haploid gametophyte, and the diploid sporophyte stays attached to it and depends on it for nutrition. Meiosis in the capsule produces haploid spores that grow into new gametophytes.",
      points: [
        "Sexual reproduction in algae: isogamous (flagellated as in Chlamydomonas, or non-flagellated as in Spirogyra), anisogamous (species of Eudorina) and oogamous (Volvox, Fucus).",
        "Algae carry out at least half of total CO₂ fixation on earth; about 70 species of marine algae (e.g. Porphyra, Laminaria, Sargassum) are eaten.",
        "Algin comes from brown algae and carrageen from red algae; agar, used in microbial culture and ice-creams/jellies, comes from Gelidium and Gracilaria. Chlorella is a protein-rich food supplement used even by space travellers.",
        "Brown algae have a holdfast, stipe and leaf-like frond; their zoospores are pear-shaped with two unequal laterally attached flagella.",
        "Red algae lack flagellated stages; their sexual reproduction is oogamous with complex post-fertilisation development.",
        "Bryophyte body: thallus-like, prostrate or erect, attached by unicellular or multicellular rhizoids; sex organs multicellular — antheridium (biflagellate antherozoids) and flask-shaped archegonium (one egg).",
        "Liverworts (Marchantia): thalloid; asexual reproduction by gemmae formed in gemma cups. Mosses (Funaria, Polytrichum, Sphagnum): protonema stage from the spore, then a leafy stage with spirally arranged leaves and multicellular branched rhizoids.",
        "Sphagnum provides peat used as fuel and as packing material because of its water-holding capacity; mosses with lichens are the first organisms to colonise rocks.",
      ],
      table: {
        title: "Classes of algae",
        columns: ["Class", "Pigments", "Stored food", "Cell wall", "Examples"],
        rows: [
          [
            "Chlorophyceae (green)",
            "Chlorophyll a, b",
            "Starch (pyrenoids)",
            "Cellulose",
            "Chlamydomonas, Volvox, Ulothrix, Spirogyra, Chara",
          ],
          [
            "Phaeophyceae (brown)",
            "Chlorophyll a, c, fucoxanthin",
            "Mannitol, laminarin",
            "Cellulose + algin",
            "Ectocarpus, Dictyota, Laminaria, Sargassum, Fucus",
          ],
          [
            "Rhodophyceae (red)",
            "Chlorophyll a, d, phycoerythrin",
            "Floridean starch",
            "Cellulose, pectin, polysulphate esters",
            "Polysiphonia, Porphyra, Gracilaria, Gelidium",
          ],
        ],
      },
      pitfalls: [
        "Agar comes from red algae (Gelidium, Gracilaria), algin from brown algae — not the other way round.",
        "In bryophytes the sporophyte is NOT free-living; it remains attached to and partly dependent on the dominant gametophyte.",
      ],
      vignette: {
        stem: "A microbiology lab orders a gelling agent to solidify culture media. The supplier states it is extracted from marine seaweeds.",
        answer: "Agar, obtained from red algae such as Gelidium and Gracilaria.",
        reasoning:
          "Agar is a commercial product of red algae used to grow microbes and in ice-creams and jellies; brown algae provide algin instead.",
      },
      highYield:
        "Green: chl a, b, starch. Brown: chl a, c, fucoxanthin, laminarin/mannitol, algin. Red: chl a, d, phycoerythrin, floridean starch, agar. Bryophytes: gametophyte dominant.",
      checks: [
        {
          q: "Which alga stores food as floridean starch?",
          options: ["Laminaria", "Polysiphonia", "Volvox", "Ectocarpus"],
          answer: 1,
          why: "Polysiphonia is a red alga; red algae store floridean starch.",
        },
        {
          q: "Gemma cups are characteristic of:",
          options: ["Funaria", "Sphagnum", "Selaginella", "Marchantia"],
          answer: 3,
          why: "Marchantia, a liverwort, reproduces asexually by gemmae formed in gemma cups.",
        },
      ],
    },
    {
      id: "pteridophytes-seed-plants",
      title: "Pteridophytes, gymnosperms and angiosperms",
      minutes: 7,
      summary:
        "Pteridophytes are the first terrestrial plants with xylem and phloem; gymnosperms bear naked seeds; angiosperms enclose their seeds in fruits.",
      examFocus:
        "Classes of pteridophytes with examples, heterospory in Selaginella and Salvinia as precursor to the seed habit, coralloid roots of Cycas and mycorrhiza of Pinus, and record sizes (Sequoia, Wolffia, Eucalyptus).",
      mechanism:
        "Vascular tissue let pteridophytes grow true roots, stems and leaves, so the diploid sporophyte became the dominant, long-lived plant. Their gametophyte, the prothallus, is still small, free-living and needs water for fertilisation, which restricts ferns to cool, damp, shady places. A key evolutionary step appeared in a few heterosporous pteridophytes such as Selaginella and Salvinia: the female gametophyte is retained on the parent sporophyte for a while and the zygote develops inside it, which foreshadows the seed. Gymnosperms complete this move: the ovule stays on the sporophyte, pollen carries male gametes by air and a pollen tube, so water is no longer needed, and the fertilised ovule becomes a seed — but no ovary encloses it. Angiosperms add an ovary, so ovules develop into seeds inside a fruit.",
      points: [
        "Pteridophytes are used for medicinal purposes, as soil-binders and as ornamentals; leaves are small microphylls (Selaginella) or large macrophylls (ferns).",
        "Sporangia are borne on sporophylls; in Selaginella and Equisetum sporophylls form compact strobili or cones.",
        "Classes: Psilopsida (Psilotum), Lycopsida (Selaginella, Lycopodium), Sphenopsida (Equisetum), Pteropsida (Dryopteris, Pteris, Adiantum).",
        "Most pteridophytes are homosporous; Selaginella and Salvinia are heterosporous (megaspores and microspores).",
        "Gymnosperms: ovules not enclosed by an ovary wall; giant redwood Sequoia is one of the tallest tree species; Cycas has coralloid roots associated with N₂-fixing cyanobacteria; Pinus roots have fungal mycorrhiza.",
        "Gymnosperms are heterosporous; microsporophylls and megasporophylls form male and female cones. In Pinus both cones are on the same tree; in Cycas male cones and megasporophylls are on different trees.",
        "Gymnosperm gametophytes have no independent free-living existence; the female gametophyte bears two or more archegonia.",
        "Angiosperms (flowering plants) are divided into dicotyledons and monocotyledons; they range from the tiny Wolffia to tall Eucalyptus trees (over 100 m).",
      ],
      table: {
        title: "Groups of the plant kingdom",
        columns: [
          "Group",
          "Dominant generation",
          "Vascular tissue",
          "Seeds",
          "Water for fertilisation",
        ],
        rows: [
          ["Bryophytes", "Gametophyte", "Absent", "Absent", "Needed"],
          ["Pteridophytes", "Sporophyte", "Present", "Absent", "Needed"],
          ["Gymnosperms", "Sporophyte", "Present", "Naked (no ovary)", "Not needed — pollen tube"],
          ["Angiosperms", "Sporophyte", "Present", "Enclosed in fruit", "Not needed — pollen tube"],
        ],
      },
      pitfalls: [
        "Heterospory in Selaginella and Salvinia is described as a precursor to the seed habit — they still do not form seeds.",
        "Coralloid roots (Cycas) carry cyanobacteria; mycorrhiza (Pinus) is a fungal association — options often swap the two.",
      ],
      vignette: {
        stem: "Small blue-green, coral-like root outgrowths are seen near the soil surface around a palm-like plant with an unbranched stem and pinnate leaves.",
        answer: "The plant is Cycas; the coralloid roots harbour nitrogen-fixing cyanobacteria.",
        reasoning:
          "Cycas, a gymnosperm with an unbranched stem and pinnate leaves, has specialised coralloid roots associated with cyanobacteria.",
      },
      highYield:
        "Heterosporous pteridophytes: Selaginella, Salvinia → seed habit precursor. Cycas: coralloid roots (cyanobacteria); Pinus: mycorrhiza. Sequoia — tallest; Wolffia — smallest angiosperm.",
      checks: [
        {
          q: "Which pteridophyte is heterosporous?",
          options: ["Salvinia", "Dryopteris", "Pteris", "Adiantum"],
          answer: 0,
          why: "Salvinia and Selaginella produce two kinds of spores; the ferns Dryopteris, Pteris and Adiantum are homosporous.",
        },
        {
          q: "Equisetum belongs to class:",
          options: ["Psilopsida", "Lycopsida", "Sphenopsida", "Pteropsida"],
          answer: 2,
          why: "Equisetum (horsetail) is in Sphenopsida.",
        },
      ],
    },
    {
      id: "morphology-vegetative",
      title: "Morphology: root, stem and leaf",
      minutes: 7,
      summary:
        "Flowering plants show tap, fibrous and adventitious roots, stems with nodes and buds, and leaves with distinct venation and phyllotaxy; all three are modified for storage, support, climbing or protection.",
      examFocus:
        "Identifying the organ behind a modification (tuber, rhizome, tendril, thorn, phylloclade, pneumatophore, prop root), phyllotaxy examples, compound leaf types, and sub-aerial stems for vegetative propagation.",
      mechanism:
        "A modification is diagnosed by origin, not appearance: a stem tendril arises from an axillary bud, whereas a leaf tendril replaces a leaf or leaflet, so the position on the plant reveals the organ. Stems always carry nodes, internodes and buds, which is why a potato tuber with eyes (buds at nodes) is a stem and a sweet potato without them is a root. Roots are modified when the soil cannot meet a need: prop and stilt roots give extra support, while pneumatophores grow upward out of waterlogged swamp mud to obtain oxygen. Leaves are modified when the plant must reduce water loss or gain nutrients, as in cactus spines, Australian Acacia phyllodes or insect-trapping leaves.",
      points: [
        "Tap root system in dicots (mustard); fibrous roots in monocots (wheat); adventitious roots arise from parts other than the radicle (grass, Monstera, banyan).",
        "Root regions: root cap, meristematic zone, zone of elongation, and zone of maturation bearing root hairs.",
        "Root modifications: storage — carrot, turnip (tap); sweet potato (adventitious); prop roots — banyan; stilt roots — maize, sugarcane; pneumatophores — Rhizophora.",
        "Underground stems for storage and perennation: potato, ginger, turmeric, zaminkand, Colocasia.",
        "Stem tendrils from axillary buds: cucumber, pumpkin, watermelon, grapevine; thorns from axillary buds: Citrus, Bougainvillea; flattened photosynthetic stem in Opuntia, fleshy cylindrical in Euphorbia.",
        "Sub-aerial stems: spreading runners (grass, strawberry), arching lateral branches (mint, jasmine), offsets one internode long in aquatic Pistia and Eichhornia, and suckers in banana, pineapple and Chrysanthemum.",
        "Compound leaves: pinnate (neem), palmate (silk cotton). Phyllotaxy: alternate (china rose, mustard, sunflower), opposite (Calotropis, guava), whorled (Alstonia).",
        "Leaf modifications: tendrils (peas), spines (cacti), fleshy food-storing leaves (onion, garlic), green expanded petiole in Australian Acacia, insect-trapping in pitcher plant and Venus fly trap.",
      ],
      table: {
        title: "Modifications by organ",
        columns: ["Function", "Root", "Stem", "Leaf"],
        rows: [
          [
            "Storage",
            "Carrot, turnip, sweet potato",
            "Potato, ginger, turmeric, Colocasia",
            "Onion, garlic",
          ],
          [
            "Support / climbing",
            "Prop (banyan), stilt (maize, sugarcane)",
            "Tendrils (cucumber, grapevine)",
            "Tendrils (peas)",
          ],
          ["Protection", "—", "Thorns (Citrus, Bougainvillea)", "Spines (cacti)"],
          [
            "Photosynthesis in xerophytes",
            "—",
            "Flattened stem (Opuntia)",
            "Phyllode (Australian Acacia)",
          ],
          ["Respiration", "Pneumatophores (Rhizophora)", "—", "—"],
        ],
      },
      pitfalls: [
        "Sweet potato is a modified adventitious root, while potato is a stem tuber — eyes (nodes with buds) give the potato away.",
        "Tendrils of cucumber/grapevine are stem tendrils (from axillary buds); tendrils of pea are leaf tendrils.",
      ],
      vignette: {
        stem: "In a mangrove swamp, many conical structures project vertically upward out of the mud around Rhizophora trees.",
        answer: "Pneumatophores — negatively geotropic respiratory roots.",
        reasoning:
          "Swamp mud is waterlogged and oxygen-poor; these roots grow upward above the soil to obtain oxygen for respiration.",
      },
      highYield:
        "Prop root — banyan; stilt root — maize, sugarcane; pneumatophore — Rhizophora. Offset — Pistia, Eichhornia; sucker — banana, pineapple, Chrysanthemum. Whorled phyllotaxy — Alstonia.",
      checks: [
        {
          q: "Thorns of Bougainvillea are modifications of:",
          options: ["Leaves", "Stipules", "Adventitious roots", "Axillary buds (stem)"],
          answer: 3,
          why: "Thorns of Citrus and Bougainvillea develop from axillary buds and are stem modifications.",
        },
        {
          q: "Which pair shows opposite phyllotaxy?",
          options: [
            "China rose and mustard",
            "Calotropis and guava",
            "Alstonia and sunflower",
            "Mustard and Alstonia",
          ],
          answer: 1,
          why: "Calotropis and guava have a pair of leaves at each node opposite each other.",
        },
      ],
    },
    {
      id: "flower-families",
      title: "Inflorescence, flower and families (Fabaceae, Solanaceae, Liliaceae)",
      minutes: 9,
      summary:
        "Flowers are arranged in racemose or cymose inflorescences and described by symmetry, ovary position, aestivation and placentation — information compressed into a floral formula.",
      examFocus:
        "Racemose vs cymose, hypogynous/perigynous/epigynous examples, aestivation and placentation examples, and reading or matching the floral formulae and economic importance of the three NCERT families.",
      mechanism:
        "Inflorescence type follows from what happens to the main axis: if it keeps growing and flowers form laterally in acropetal order, the inflorescence is racemose; if the axis ends in a flower, growth is limited and flowers open in basipetal order (cymose). Ovary position depends on how the thalamus grows: the ovary sits on top in hypogynous flowers (superior ovary), the thalamus forms a cup around it in perigynous flowers (half-inferior), and the thalamus fuses with the ovary wall in epigynous flowers (inferior). A floral formula records these choices compactly: ⊕ for actinomorphic, % for zygomorphic, ⚥ for bisexual, Br for bracteate, K calyx, C corolla, P perianth, A androecium and G gynoecium, with brackets for fusion and numbers for count. Families are recognised by such combinations — Fabaceae by its papilionaceous corolla and diadelphous stamens, Solanaceae by epipetalous stamens and an obliquely placed bicarpellary ovary, and Liliaceae by a trimerous perianth.",
      points: [
        "Actinomorphic flowers: mustard, datura, chilli; zygomorphic: pea, gulmohur, bean, Cassia; asymmetric: canna.",
        "Hypogynous (superior ovary): mustard, china rose, brinjal; perigynous (half-inferior): plum, rose, peach; epigynous (inferior): guava, cucumber, ray florets of sunflower.",
        "Aestivation: valvate (Calotropis), twisted (china rose, lady's finger, cotton), imbricate (Cassia, gulmohur), vexillary or papilionaceous (pea, bean).",
        "Placentation: marginal (pea), axile (china rose, tomato, lemon), parietal (mustard, Argemone), free central (Dianthus, Primrose), basal (sunflower, marigold).",
        "Fabaceae: % ⚥ K(5) C1+2+(2) A(9)+1 G1 — papilionaceous corolla (standard, two wings, two fused keel petals), diadelphous stamens, monocarpellary superior ovary, marginal placentation, legume fruit. Uses: pulses (gram, arhar, moong, soyabean), oils (soyabean, groundnut), dye (Indigofera), fibre (sunhemp), fodder (Sesbania, Trifolium), ornamentals (lupin, sweet pea), medicine (muliathi).",
        "Solanaceae (potato family): ⊕ ⚥ K(5) C(5) A5 G(2) — calyx persistent, stamens epipetalous, ovary bicarpellary, obliquely placed, bilocular with swollen placenta, axile; fruit berry or capsule. Uses: tomato, brinjal, potato, chilli, belladonna, ashwagandha, tobacco, petunia.",
        "Liliaceae (lily family, monocot): Br ⊕ ⚥ P(3+3) A3+3 G(3) — six tepals often united, six epitepalous stamens, tricarpellary syncarpous superior trilocular ovary, axile; fruit capsule, rarely berry. Uses: tulip and Gloriosa (ornamental), Aloe (medicine), Asparagus (vegetable), colchicine from Colchicum autumnale.",
        "Mango and coconut fruits are drupes from monocarpellary superior ovaries; the edible part of mango is the fleshy mesocarp, while coconut's mesocarp is fibrous.",
      ],
      table: {
        title: "The three NCERT families",
        columns: ["Feature", "Fabaceae", "Solanaceae", "Liliaceae"],
        rows: [
          ["Class", "Dicot", "Dicot", "Monocot"],
          ["Symmetry", "Zygomorphic", "Actinomorphic", "Actinomorphic"],
          [
            "Perianth",
            "K(5), C1+2+(2) papilionaceous, vexillary",
            "K(5) persistent, C(5) valvate",
            "P(3+3) tepals, valvate",
          ],
          ["Androecium", "A(9)+1 diadelphous", "A5 epipetalous", "A3+3 epitepalous"],
          [
            "Gynoecium",
            "G1, unilocular, marginal",
            "G(2), oblique, bilocular, axile",
            "G(3), trilocular, axile",
          ],
          ["Fruit", "Legume", "Berry or capsule", "Capsule, rarely berry"],
        ],
      },
      pitfalls: [
        "Diadelphous (9)+1 stamens belong to Fabaceae; epipetalous stamens are the Solanaceae marker — options often attach them to the wrong family.",
        "Ray florets of sunflower are epigynous, but the placentation of sunflower is basal — do not mix up ovary position with placentation.",
      ],
      vignette: {
        stem: "A flower has five united persistent sepals, five united petals, five stamens attached to the petals and a bicarpellary ovary that is obliquely placed with many ovules on a swollen axile placenta. The fruit is a berry.",
        answer: "Family Solanaceae — floral formula ⊕ ⚥ K(5) C(5) A5 G(2).",
        reasoning:
          "Epipetalous stamens with an obliquely placed bicarpellary, bilocular ovary and swollen placenta are diagnostic of Solanaceae (e.g. tomato, brinjal).",
      },
      highYield:
        "Fabaceae % ⚥ K(5) C1+2+(2) A(9)+1 G1; Solanaceae ⊕ ⚥ K(5) C(5) A5 G(2) epipetalous; Liliaceae Br ⊕ ⚥ P(3+3) A3+3 G(3).",
      checks: [
        {
          q: "Free central placentation is found in:",
          options: ["Pea", "Dianthus", "Mustard", "Marigold"],
          answer: 1,
          why: "Dianthus and Primrose have ovules on a central axis without septa; pea is marginal, mustard parietal and marigold basal.",
        },
        {
          q: "The floral formula Br ⊕ ⚥ P(3+3) A3+3 G(3) belongs to:",
          options: ["Fabaceae", "Solanaceae", "Brassicaceae", "Liliaceae"],
          answer: 3,
          why: "A trimerous perianth of six tepals with six stamens and a tricarpellary ovary marks Liliaceae.",
        },
      ],
    },
    {
      id: "anatomy-flowering-plants",
      title: "Anatomy: tissues and dicot vs monocot organs",
      minutes: 9,
      summary:
        "Plant tissues are meristematic or permanent (simple and complex); arranged into epidermal, ground and vascular tissue systems, they give distinct anatomies to dicot and monocot roots, stems and leaves.",
      examFocus:
        "Features of collenchyma vs sclerenchyma, the only living xylem element, protoxylem position (endarch vs exarch), types of vascular bundles, Casparian strips, and identifying a TS of dicot/monocot root, stem and leaf.",
      mechanism:
        "Tissue structure follows function: collenchyma has cellulose, hemicellulose and pectin thickening at its corners, so it supports young, growing organs while staying flexible, whereas sclerenchyma has lignified walls and dies at maturity, giving rigid support. In xylem, water travels through dead tracheids and vessels, and xylem parenchyma is the only living element. In roots the first-formed protoxylem lies towards the periphery (exarch), but in stems it lies towards the centre (endarch), which is why xylem position helps tell a root from a stem. In roots xylem and phloem alternate on different radii (radial bundles); in stems and leaves they lie together on one radius (conjoint). Dicot stem bundles have cambium between xylem and phloem (open), but monocot bundles lack it (closed). The endodermis of roots has suberin-rich Casparian strips that block water flow along the walls, forcing water through living cells.",
      points: [
        "Meristems: apical (shoot and root tips), intercalary (between mature tissues, e.g. grasses, regenerating parts removed by grazers) and lateral (cambium, increasing girth).",
        "Sclerenchyma: fibres (elongated, pointed) and sclereids (pulp of guava and pear, seed coats of legumes, shells of nuts); collenchyma lies below the epidermis of dicot stems (hypodermis), as a layer or in patches.",
        "Xylem: tracheids, vessels (characteristic of angiosperms; absent in gymnosperms), xylem fibres and xylem parenchyma (the only living element).",
        "Phloem in angiosperms: sieve tube elements, companion cells, phloem parenchyma (absent in most monocots) and phloem fibres (bast, used for jute, flax and hemp); gymnosperms have albuminous cells and sieve cells instead.",
        "Stomata: guard cells are bean-shaped in dicots and dumb-bell shaped in grasses; epidermal appendages include unicellular root hairs and usually multicellular trichomes on stems.",
        "Dicot root: 2–4 xylem bundles (diarch to tetrarch), endodermis with Casparian strips, pericycle that gives lateral roots, small or absent pith. Monocot root: more than six xylem bundles (polyarch) and a large, well-developed pith.",
        "Dicot stem: collenchymatous hypodermis, starch sheath (endodermis), semilunar sclerenchyma patches in the pericycle, conjoint collateral open bundles in a ring, endarch protoxylem. Monocot stem: sclerenchymatous hypodermis, many scattered bundles each with a sclerenchymatous bundle sheath, closed, with water-containing cavities.",
        "Dorsiventral (dicot) leaf: palisade parenchyma towards the adaxial side, spongy parenchyma below, more stomata on the abaxial side. Isobilateral (monocot) leaf: stomata on both surfaces, undifferentiated mesophyll, and bulliform cells on the adaxial epidermis of grasses that make leaves roll inward under water stress.",
      ],
      table: {
        title: "Dicot vs monocot root and stem",
        columns: ["Feature", "Dicot root", "Monocot root", "Dicot stem", "Monocot stem"],
        rows: [
          [
            "Xylem bundles / arrangement",
            "2–4, radial",
            "More than 6, radial (polyarch)",
            "Ring, conjoint collateral",
            "Scattered, conjoint collateral",
          ],
          ["Cambium", "Absent in primary structure", "Absent", "Present — open", "Absent — closed"],
          ["Protoxylem", "Exarch", "Exarch", "Endarch", "Endarch"],
          [
            "Pith",
            "Small or inconspicuous",
            "Large, well developed",
            "Present",
            "Not distinct (ground tissue)",
          ],
          ["Hypodermis", "—", "—", "Collenchyma", "Sclerenchyma"],
        ],
      },
      pitfalls: [
        "Xylem parenchyma is the only living component of xylem; tracheids, vessels and xylem fibres are dead at maturity.",
        "Phloem parenchyma is absent in most monocots, and vessels are absent in gymnosperms — both are favourite statement-type traps.",
      ],
      vignette: {
        stem: "A transverse section shows numerous scattered vascular bundles surrounded by sclerenchymatous sheaths, no cambium, water-containing cavities in the bundles and a sclerenchymatous hypodermis.",
        answer: "Monocot stem.",
        reasoning:
          "Scattered closed bundles with sheaths, water cavities and sclerenchymatous hypodermis are characteristic of monocot stems; a dicot stem has a ring of open bundles and collenchymatous hypodermis.",
      },
      highYield:
        "Root: radial bundles, exarch; stem: conjoint, endarch. Dicot stem bundles open, monocot closed. Bulliform cells → leaf rolling in grasses. Casparian strips = suberin.",
      checks: [
        {
          q: "Which of the following is the only living component of xylem?",
          options: ["Xylem parenchyma", "Tracheids", "Vessels", "Xylem fibres"],
          answer: 0,
          why: "Xylem parenchyma cells are living and store food; the other elements are dead at maturity.",
        },
        {
          q: "A section shows more than six xylem bundles alternating with phloem and a large pith. It is a:",
          options: ["Dicot stem", "Monocot stem", "Monocot root", "Dicot root"],
          answer: 2,
          why: "Polyarch radial bundles with a well-developed pith identify a monocot root; dicot roots have 2–4 xylem bundles.",
        },
      ],
    },
  ],
};
