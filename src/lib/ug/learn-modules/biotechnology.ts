import type { LearnModule } from "../../learn";

export const biotechnology: LearnModule = {
  slug: "biotechnology",
  group: "Biology",
  subject: "Zoology",
  title: "Biotechnology & Human Welfare",
  icon: "labs",
  blurb:
    "Tools and processes of recombinant DNA technology, its uses in agriculture and medicine with the ethics around them, human diseases and immunity, AIDS, cancer and drug abuse, and microbes in human welfare.",
  objectives: [
    "Learner can explain how restriction enzymes, ligase, vectors such as pBR322 and competent hosts are used to make recombinant DNA.",
    "Learner can describe PCR, gel electrophoresis, bioreactors and downstream processing in order.",
    "Learner can explain how Bt crops, RNAi, recombinant insulin, ADA gene therapy and transgenic animals work, and outline biopiracy and GEAC.",
    "Learner can name the pathogen, vector and key feature of common human diseases and distinguish types of immunity.",
    "Learner can match microbes to the household, industrial, sewage, biogas, biocontrol and biofertiliser uses given in NCERT.",
  ],
  concepts: [
    {
      id: "restriction-enzymes",
      title: "Restriction enzymes, ligase and gel electrophoresis",
      minutes: 7,
      summary:
        "Restriction endonucleases cut DNA at specific palindromic sequences, often leaving sticky ends that DNA ligase can join; agarose gel electrophoresis separates the fragments by size.",
      examFocus:
        "Naming of EcoRI, palindrome recognition, sticky ends, direction of DNA migration in the gel, and ethidium bromide staining with elution.",
      mechanism:
        "Bacteria use restriction enzymes to cut foreign DNA, and each enzyme inspects the length of a DNA molecule until it finds its specific recognition sequence, binds and cuts both strands at particular sugar-phosphate bonds. Recognition sites are palindromes: the sequence reads the same on both strands when read in the same orientation (5′ → 3′). Many enzymes cut a little away from the centre of the palindrome, leaving single-stranded overhangs called sticky ends; any two DNA pieces cut with the same enzyme have complementary sticky ends that hydrogen bond, and DNA ligase then seals the backbone, creating recombinant DNA. Because DNA is negatively charged, fragments placed in agarose gel under an electric field move towards the anode, and the gel's sieving effect makes smaller fragments travel farther.",
      points: [
        "Restriction enzymes belong to the nucleases: exonucleases remove nucleotides from the ends; endonucleases cut at specific positions within the DNA.",
        "The first restriction endonuclease characterised for sequence-specific cutting was Hind II, which recognises a specific six base-pair sequence.",
        "Naming EcoRI: E = genus Escherichia, co = species coli, R = strain RY13, I = first enzyme isolated from that strain (Roman numeral = order of isolation).",
        "EcoRI recognises 5′-GAATTC-3′ (3′-CTTAAG-5′) and cuts between G and A on both strands, leaving sticky ends.",
        "DNA ligase joins the sugar-phosphate backbones of complementary sticky ends.",
        "Gel electrophoresis: agarose (extracted from sea weeds) acts as a sieve; fragments move towards the anode; smaller fragments move farther.",
        "DNA is stained with ethidium bromide and seen as bright orange bands under UV light; bands are cut out and extracted from the gel piece (elution).",
      ],
      flow: {
        title: "Making recombinant DNA",
        steps: [
          {
            label: "Cut source DNA and vector with the same restriction enzyme",
            detail: "Complementary sticky ends",
          },
          {
            label: "Separate fragments",
            detail: "Agarose gel electrophoresis; elute desired band",
          },
          { label: "Mix gene of interest with cut vector", detail: "Sticky ends pair" },
          { label: "Seal with DNA ligase", detail: "Recombinant DNA formed" },
          { label: "Transfer into host", detail: "Competent cells take up rDNA" },
        ],
      },
      pitfalls: [
        "DNA fragments move towards the anode (positive) because DNA is negatively charged.",
        "In EcoRI, R stands for the strain RY13, not for 'restriction'.",
      ],
      vignette: {
        stem: "After digesting plasmid DNA a student sees three bands on an agarose gel under UV light; the band farthest from the well is needed.",
        answer: "It is the smallest fragment; it is cut out and eluted from the gel.",
        reasoning:
          "Agarose sieves DNA so smaller fragments move farther towards the anode; the stained band is excised and purified by elution.",
      },
      highYield:
        "EcoRI: E-co-R-I = Escherichia coli RY13, first enzyme. Palindrome GAATTC. Smaller fragments run farther towards the anode; ethidium bromide + UV = orange bands.",
      checks: [
        {
          q: "In gel electrophoresis, DNA fragments move towards the:",
          options: ["Cathode", "Anode", "Well", "Both electrodes equally"],
          answer: 1,
          why: "DNA is negatively charged and migrates towards the positive anode.",
        },
        {
          q: "In the name EcoRI, the letter 'R' denotes:",
          options: ["Restriction", "Recombinant", "Strain RY13", "Ribonuclease"],
          answer: 2,
          why: "R refers to the strain RY13 of Escherichia coli.",
        },
      ],
    },
    {
      id: "vectors-and-hosts",
      title: "Cloning vectors and competent hosts",
      minutes: 8,
      summary:
        "A cloning vector needs an origin of replication, a selectable marker and cloning sites; pBR322 is the model, and the host must be made competent to take up DNA.",
      examFocus:
        "Features of pBR322, insertional inactivation and blue-white selection, Ti plasmid and retroviruses as vectors, and methods of introducing DNA into hosts.",
      mechanism:
        "A vector is useful only if it can replicate in the host, can be selected, and can accept foreign DNA at a single site. The origin of replication (ori) is where replication starts and also controls copy number. A selectable marker, usually an antibiotic resistance gene, lets only transformants survive on a medium containing that antibiotic. In pBR322, the BamHI site lies inside the tetracycline-resistance gene, so inserting foreign DNA there destroys tetracycline resistance — insertional inactivation — and recombinants grow on ampicillin but not on tetracycline. A more convenient screen inserts DNA into the lacZ gene for β-galactosidase: with a chromogenic substrate, non-recombinants give blue colonies while recombinants, with the enzyme inactivated, give colourless colonies. DNA is hydrophilic and cannot pass cell membranes, so hosts are made competent, for example by divalent cations like calcium followed by heat shock.",
      points: [
        "pBR322 (E. coli plasmid) carries ori, rop (proteins for plasmid replication), ampR and tetR, plus recognition sites such as Hind III, EcoRI, BamHI, Sal I, Pvu II, Pst I, Cla I.",
        "BamHI and Sal I sites are in tetR; Pvu I and Pst I sites are in ampR.",
        "Insertional inactivation: insertion into a resistance gene or lacZ inactivates it; with lacZ, recombinants give colourless colonies and non-recombinants blue colonies on a chromogenic substrate.",
        "Agrobacterium tumefaciens Ti plasmid has been modified into a non-pathogenic cloning vector for plants; disarmed retroviruses are used to deliver genes into animal cells.",
        "Competent host: treat bacterial cells with a specific concentration of divalent cation (e.g. calcium), incubate with rDNA on ice, give a heat shock at 42 °C, then put back on ice.",
        "Micro-injection: rDNA injected directly into the nucleus of an animal cell. Biolistics (gene gun): high-velocity micro-particles of gold or tungsten coated with DNA, suited to plants.",
        "Disarmed pathogen vectors that infect a cell transfer the recombinant DNA into the host.",
      ],
      table: {
        title: "Selecting recombinants in pBR322 (insert at BamHI)",
        columns: ["Cell type", "Ampicillin plate", "Tetracycline plate"],
        rows: [
          ["Non-transformant", "No growth", "No growth"],
          ["Non-recombinant transformant", "Grows", "Grows"],
          ["Recombinant", "Grows", "No growth (tetR inactivated)"],
        ],
      },
      pitfalls: [
        "In blue-white screening, recombinants are colourless (white); blue colonies lack an insert.",
        "Inserting DNA at Pst I or Pvu I inactivates ampicillin resistance, not tetracycline resistance.",
      ],
      vignette: {
        stem: "A gene is ligated into the BamHI site of pBR322 and transformed into E. coli. Colonies are replica-plated on ampicillin and tetracycline.",
        answer: "Recombinants grow on ampicillin but not on tetracycline.",
        reasoning:
          "BamHI lies in tetR, so the insert inactivates tetracycline resistance while ampR remains intact.",
      },
      highYield:
        "Vector needs ori, selectable marker, cloning sites. pBR322: BamHI in tetR; Pst I and Pvu I in ampR. Competence by Ca²⁺ + heat shock (42 °C).",
      checks: [
        {
          q: "Which feature of a vector controls the copy number of linked DNA?",
          options: ["Selectable marker", "Origin of replication", "Cloning site", "rop gene only"],
          answer: 1,
          why: "Ori is where replication starts and it also controls the copy number of the linked DNA.",
        },
        {
          q: "Bacterial cells are made competent to take up DNA by treatment with:",
          options: ["Lysozyme", "Ethidium bromide", "Divalent calcium ions", "Chilled ethanol"],
          answer: 2,
          why: "Divalent cations such as Ca²⁺ followed by heat shock help DNA enter bacterial cells.",
        },
      ],
    },
    {
      id: "pcr-and-bioprocessing",
      title: "Isolating DNA, PCR, bioreactors and downstream processing",
      minutes: 7,
      summary:
        "DNA is released from cells with enzymes, purified and precipitated; PCR amplifies a gene, and products are made at scale in bioreactors and then purified and formulated.",
      examFocus:
        "Enzymes used to break specific cell walls, the three PCR steps and Taq polymerase, stirred-tank bioreactor parts, and what downstream processing includes.",
      mechanism:
        "DNA in a cell is enclosed by membranes and bound with other macromolecules, so isolation must remove each barrier: the cell wall is digested by an enzyme matched to its material (lysozyme for bacteria, cellulase for plant cells, chitinase for fungi), RNA by ribonuclease and proteins by protease. Purified DNA precipitates when chilled ethanol is added and can be spooled out as fine threads. PCR copies a chosen region by repeated cycles: heating separates the strands (denaturation), short primers bind the flanking sequences (annealing), and a polymerase extends them (extension). The polymerase must survive the high denaturation temperature, so the thermostable enzyme from the bacterium Thermus aquaticus (Taq polymerase) is used. Scale-up needs bioreactors that keep temperature, pH, oxygen and mixing optimal, after which the product is separated, purified and formulated.",
      points: [
        "Enzymes for cell lysis: lysozyme (bacteria), cellulase (plant cells), chitinase (fungus). RNA removed with ribonuclease, proteins with protease.",
        "Chilled ethanol precipitates purified DNA, seen as fine threads in suspension.",
        "PCR steps: denaturation → annealing of two sets of primers → extension by DNA polymerase. Repeated cycles can amplify the DNA segment to approximately a billion copies.",
        "Taq polymerase from Thermus aquaticus remains active at the high temperatures used to denature DNA.",
        "Bioreactors (100–1000 litres) provide optimal temperature, pH, substrate, salts, vitamins and oxygen. A stirred-tank bioreactor is usually cylindrical or with a curved base for mixing.",
        "Stirred-tank parts: agitator system, oxygen delivery system, foam control system, temperature control system, pH control system and sampling ports. Sparged stirred-tank: air bubbled through.",
        "Downstream processing: separation and purification, then formulation with suitable preservatives; quality control testing and clinical trials for drugs.",
      ],
      flow: {
        title: "One PCR cycle",
        steps: [
          { label: "Denaturation", detail: "High temperature separates the two DNA strands" },
          { label: "Annealing", detail: "Primers bind complementary flanking sequences" },
          { label: "Extension", detail: "Taq polymerase extends primers using dNTPs" },
          {
            label: "Repeat",
            detail: "Many cycles amplify the target region about a billion times",
          },
        ],
      },
      pitfalls: [
        "Chitinase is for fungal cell walls, cellulase for plant walls — lysozyme only for bacteria.",
        "Taq polymerase is used because it is thermostable, not because it is faster.",
      ],
      vignette: {
        stem: "A lab wants to extract DNA from a mushroom.",
        answer:
          "Break the cell walls with chitinase, then remove RNA and proteins with ribonuclease and protease, and precipitate DNA with chilled ethanol.",
        reasoning:
          "Fungal walls contain chitin, so chitinase is the matching wall-digesting enzyme; the later steps are the same for all sources.",
      },
      highYield:
        "Lysozyme–bacteria, cellulase–plant, chitinase–fungus. PCR: denaturation, annealing, extension with Taq polymerase (Thermus aquaticus). Downstream = separation, purification, formulation.",
      checks: [
        {
          q: "Taq polymerase is obtained from:",
          options: [
            "Thermus aquaticus",
            "Escherichia coli",
            "Agrobacterium tumefaciens",
            "Bacillus thuringiensis",
          ],
          answer: 0,
          why: "Thermus aquaticus is a thermophilic bacterium whose DNA polymerase survives denaturation temperatures.",
        },
        {
          q: "Downstream processing includes:",
          options: [
            "Inserting gene into vector",
            "Separation and purification of product",
            "Making cells competent",
            "Annealing of primers",
          ],
          answer: 1,
          why: "After biosynthesis the product is separated, purified and formulated before marketing.",
        },
      ],
    },
    {
      id: "agriculture-applications",
      title: "Bt crops and RNA interference",
      minutes: 6,
      summary:
        "Bt crops carry cry genes from Bacillus thuringiensis whose protoxin becomes active in the alkaline insect gut; RNAi silences an essential gene of a nematode pest.",
      examFocus:
        "Why Bt toxin does not kill the bacterium, alkaline activation in the gut, cry genes and their target pests, and the dsRNA mechanism against Meloidogyne incognita.",
      mechanism:
        "Bacillus thuringiensis forms protein crystals containing an insecticidal protein, but the protein exists as an inactive protoxin, which is why it does not harm the bacterium itself. When an insect eats it, the alkaline pH of the insect gut solubilises the crystals and activates the toxin, which binds to the surface of midgut epithelial cells and creates pores; the cells swell and lyse, and the insect dies. The genes encoding these proteins, the cry genes, have been introduced into crops such as cotton. RNA interference works at the level of messenger RNA: a complementary double-stranded RNA binds and prevents translation of a specific mRNA, silencing that gene. Using Agrobacterium vectors, nematode-specific genes were introduced into tobacco so the plant makes both sense and antisense RNA; these form dsRNA that silences the parasite's mRNA, so the nematode cannot survive in the root.",
      points: [
        "GM plants: more tolerant of abiotic stresses, less reliance on chemical pesticides, reduced post-harvest losses, increased mineral use efficiency, enhanced nutritional value (e.g. Golden rice rich in vitamin A).",
        "Bt toxin is effective against lepidopterans (tobacco budworm, armyworm), coleopterans (beetles) and dipterans (flies, mosquitoes).",
        "Protoxin is activated by the alkaline pH of the insect gut; it binds midgut epithelial cells, forms pores and causes swelling and lysis.",
        "cryIAc and cryIIAb control cotton bollworms; cryIAb controls corn borer.",
        "Nematode Meloidogyne incognita infects tobacco roots and reduces yield.",
        "RNAi is a method of cellular defence in all eukaryotic organisms; the dsRNA may come from viruses with RNA genomes or from mobile genetic elements (transposons) that replicate via an RNA intermediate.",
        "Transgenic tobacco producing sense and antisense RNA against the nematode gene is protected from infestation.",
      ],
      flow: {
        title: "Bt toxin action",
        steps: [
          { label: "Insect eats Bt plant tissue", detail: "Ingests inactive protoxin crystals" },
          { label: "Alkaline gut pH", detail: "Crystals solubilise; toxin activated" },
          { label: "Binds midgut epithelial cells", detail: "Creates pores in membranes" },
          { label: "Cells swell and lyse", detail: "Insect dies" },
        ],
      },
      pitfalls: [
        "The toxin is activated by alkaline, not acidic, gut pH.",
        "RNAi silences mRNA (translation) — it does not delete the nematode gene.",
      ],
      vignette: {
        stem: "Bollworm larvae feeding on a cotton variety die after their midgut cells swell and burst; the bacterium that donated the gene is unaffected by its own protein.",
        answer:
          "Bt cotton expressing cry protein; the bacterium stores it as an inactive protoxin.",
        reasoning:
          "The protoxin becomes active only in the alkaline insect gut, so it harms the insect but not the Bacillus.",
      },
      highYield:
        "Bt protoxin activated by alkaline insect gut pH. cryIAc, cryIIAb → cotton bollworm; cryIAb → corn borer. RNAi against Meloidogyne incognita in tobacco uses sense + antisense RNA via Agrobacterium.",
      checks: [
        {
          q: "Which gene controls the corn borer?",
          options: ["cryIAc", "cryIIAb", "cryIAb", "lacZ"],
          answer: 2,
          why: "cryIAb protein controls corn borer; cryIAc and cryIIAb control cotton bollworms.",
        },
        {
          q: "In RNAi-based nematode resistance, gene silencing results from:",
          options: [
            "Deletion of the nematode gene",
            "dsRNA formed from sense and antisense RNA blocking translation",
            "A toxin produced in the root",
            "Antibodies against the nematode",
          ],
          answer: 1,
          why: "Complementary sense and antisense RNA form dsRNA that silences the target mRNA.",
        },
      ],
    },
    {
      id: "medical-applications",
      title: "Insulin, gene therapy, diagnosis, transgenic animals and ethics",
      minutes: 8,
      summary:
        "rDNA technology makes human insulin in bacteria, treated the first ADA-deficiency patient by gene therapy, enables early diagnosis, creates transgenic animals and raises issues of biosafety and biopiracy.",
      examFocus:
        "Proinsulin and C-peptide, Eli Lilly's two-chain approach, ADA gene therapy details, PCR/ELISA in diagnosis, Rosie the cow, GEAC and the basmati case.",
      mechanism:
        "Human insulin has two short polypeptide chains, A and B, linked by disulphide bridges; in the body it is made as proinsulin with an extra C peptide that is removed during maturation. Because getting bacteria to process proinsulin was difficult, Eli Lilly in 1983 prepared two DNA sequences for the A and B chains, introduced them into plasmids of E. coli, produced the chains separately and joined them by disulphide bonds. Gene therapy corrects a defective gene by delivering a normal one. The first case, in 1990, was a 4-year-old girl with adenosine deaminase (ADA) deficiency, a gene deletion that cripples the immune system; her lymphocytes were grown outside the body, given a functional ADA cDNA by a retroviral vector and returned. Since these lymphocytes are not immortal, infusions must be repeated; introducing the gene into bone marrow cells at early embryonic stages could be a permanent cure.",
      points: [
        "Insulin earlier came from slaughtered cattle and pigs, which caused allergy or other reactions in some patients.",
        "Eli Lilly (1983): A and B chain DNA sequences in E. coli plasmids, chains produced separately and combined by disulphide bonds to form human insulin.",
        "ADA deficiency can sometimes be cured by bone marrow transplantation or enzyme replacement therapy by injection, but these are not completely curative.",
        "Molecular diagnosis: recombinant DNA technology, PCR (detects very low amounts of pathogen DNA, e.g. HIV in suspected AIDS patients, mutations in suspected cancer patients) and ELISA (antigen-antibody interaction).",
        "Transgenic animals: over 95% are mice. Uses: study of normal physiology and development, study of disease, biological products (e.g. α-1-antitrypsin for emphysema), vaccine safety (polio vaccine tested on transgenic mice), chemical safety testing.",
        "Rosie, the first transgenic cow (1997), produced human protein-enriched milk (2.4 g per litre) containing human α-lactalbumin, nutritionally more balanced for babies than natural cow milk.",
        "GEAC (Genetic Engineering Approval Committee) decides on validity of GM research and the safety of introducing GM organisms for public services.",
        "Biopiracy: use of bio-resources by multinational companies without authorisation or compensation; e.g. an American company got patent rights on basmati rice (1997) through the US Patent and Trademark Office. India has 27 documented varieties of basmati. Turmeric and neem have also been patented elsewhere; India amended its Patents Bill to address such issues.",
      ],
      table: {
        title: "Medical applications",
        columns: ["Application", "Key fact"],
        rows: [
          ["Recombinant insulin", "Eli Lilly 1983; A and B chains made separately in E. coli"],
          ["Gene therapy", "1990; ADA deficiency; retroviral vector into lymphocytes"],
          ["Diagnosis", "PCR, recombinant DNA, ELISA"],
          ["Transgenic animals", ">95% mice; Rosie cow 1997, human α-lactalbumin milk"],
          ["Regulation", "GEAC; biopiracy and patents (basmati)"],
        ],
      },
      pitfalls: [
        "Mature insulin lacks the C peptide; proinsulin contains it.",
        "Gene therapy with lymphocytes is not permanent; a permanent cure needs the gene in early embryonic bone marrow cells.",
      ],
      vignette: {
        stem: "A child with severe combined immune problems is found to lack a functional adenosine deaminase gene. Doctors culture her lymphocytes, insert a normal gene and reinfuse them, repeating this periodically.",
        answer: "Gene therapy for ADA deficiency using a retroviral vector.",
        reasoning:
          "Functional ADA cDNA is delivered by a retrovirus into lymphocytes; because these cells are not immortal, the patient needs periodic infusions.",
      },
      highYield:
        "Eli Lilly 1983 — insulin A and B chains. First gene therapy 1990 — ADA deficiency, 4-year-old girl. Rosie 1997 — 2.4 g/L human protein milk. GEAC regulates GM organisms.",
      checks: [
        {
          q: "In proinsulin, the peptide removed during maturation is the:",
          options: ["A peptide", "B peptide", "C peptide", "D peptide"],
          answer: 2,
          why: "Proinsulin has an extra C peptide that is removed to give mature insulin.",
        },
        {
          q: "The first clinical gene therapy (1990) was for:",
          options: ["Cystic fibrosis", "ADA deficiency", "Haemophilia", "Diabetes"],
          answer: 1,
          why: "A 4-year-old girl with adenosine deaminase deficiency received gene therapy in 1990.",
        },
      ],
    },
    {
      id: "diseases-and-immunity",
      title: "Common diseases and immunity",
      minutes: 9,
      summary:
        "Bacteria, viruses, protozoa, helminths and fungi cause common human diseases; the body defends itself with innate and acquired immunity based on antibodies and T cells.",
      examFocus:
        "Pathogen-disease-vector matching, Plasmodium life cycle stages, innate barrier types, antibody structure, active vs passive immunity, allergy and lymphoid organs.",
      mechanism:
        "Innate immunity is present from birth and is non-specific: physical barriers (skin, mucus), physiological barriers (stomach acid, saliva, tears), cellular barriers (neutrophils, monocytes, natural killer cells, macrophages) and cytokine barriers (interferons from virus-infected cells). Acquired immunity is pathogen-specific and has memory: the first encounter gives a low-intensity primary response, and a later encounter with the same pathogen gives a highly intensified secondary (anamnestic) response because memory cells were left behind. B lymphocytes produce antibodies into blood (humoral immunity), while T lymphocytes mediate cell-mediated immunity, which is why graft rejection depends on T cells. Vaccines use inactivated or weakened pathogens or antigenic proteins to generate memory without disease, giving active immunity; ready-made antibodies give passive, quick but short-lived protection.",
      points: [
        "Typhoid: Salmonella typhi; contaminated food and water; sustained high fever (39–40 °C); confirmed by Widal test. Pneumonia: Streptococcus pneumoniae and Haemophilus influenzae; alveoli fill with fluid. Common cold: rhinoviruses; nose and respiratory passage, not lungs.",
        "Malaria: Plasmodium vivax, P. malariae, P. falciparum (malignant, may be fatal); female Anopheles vector. Sporozoites (infectious form) enter by bite → multiply in liver cells → attack RBCs → rupture releases haemozoin, causing chill and high recurring fever. Gametocytes develop in RBCs; fertilisation occurs in the mosquito's stomach; sporozoites stored in its salivary glands.",
        "Amoebiasis: Entamoeba histolytica in the large intestine; houseflies are mechanical carriers. Ascariasis: Ascaris, intestinal; eggs in soil contaminate water and vegetables. Filariasis (elephantiasis): Wuchereria bancrofti and W. malayi; female mosquito vectors. Ringworm: Microsporum, Trichophyton, Epidermophyton.",
        "Antibody: four peptide chains — two small light and two longer heavy (H2L2). Types: IgA, IgM, IgE, IgG.",
        "Active immunity: body makes antibodies after exposure or vaccination; slow. Passive immunity: ready-made antibodies given; e.g. IgA in colostrum, IgG across the placenta, anti-tetanus or anti-venom injections.",
        "Hepatitis B vaccine is produced from yeast using recombinant DNA technology.",
        "Allergy: exaggerated response to allergens (mites, pollen, animal dander); IgE type antibodies; mast cells release histamine and serotonin; treated with antihistamines, adrenaline and steroids. Autoimmunity: body attacks self cells, e.g. rheumatoid arthritis.",
        "Primary lymphoid organs: bone marrow and thymus (lymphocytes form and mature). Secondary: spleen, lymph nodes, tonsils, Peyer's patches, appendix; MALT forms about 50% of lymphoid tissue in the body.",
      ],
      table: {
        title: "Disease, pathogen, spread",
        columns: ["Disease", "Pathogen", "Spread / vector", "Hallmark"],
        rows: [
          ["Typhoid", "Salmonella typhi", "Contaminated food and water", "Widal test"],
          [
            "Pneumonia",
            "Streptococcus pneumoniae, Haemophilus influenzae",
            "Droplets, shared utensils",
            "Alveoli fill with fluid",
          ],
          ["Malaria", "Plasmodium spp.", "Female Anopheles", "Haemozoin, recurring fever"],
          [
            "Amoebiasis",
            "Entamoeba histolytica",
            "Houseflies (mechanical carriers)",
            "Stools with mucus and blood",
          ],
          ["Filariasis", "Wuchereria bancrofti, W. malayi", "Female mosquito", "Elephantiasis"],
          [
            "Ringworm",
            "Microsporum, Trichophyton, Epidermophyton",
            "Contact, moist skin folds",
            "Dry scaly lesions",
          ],
        ],
      },
      pitfalls: [
        "Sporozoites are the infective stage injected by the mosquito; gametocytes are the stage the mosquito picks up.",
        "Colostrum gives passive, not active, immunity to the newborn.",
      ],
      vignette: {
        stem: "A patient has chill followed by high fever recurring every few days after visiting a mosquito-infested area; blood smears show parasites inside RBCs.",
        answer: "Malaria, caused by Plasmodium transmitted by female Anopheles.",
        reasoning:
          "The rupture of RBCs releases haemozoin, which is responsible for the recurring chill and high fever.",
      },
      highYield:
        "Widal → typhoid. Haemozoin → malarial fever. Antibody = H2L2. Bone marrow and thymus are primary lymphoid organs. Colostrum IgA = passive immunity. Allergy = IgE, histamine.",
      checks: [
        {
          q: "Which is a primary lymphoid organ?",
          options: ["Spleen", "Lymph node", "Thymus", "Tonsil"],
          answer: 2,
          why: "Bone marrow and thymus are primary lymphoid organs where lymphocytes form and mature.",
        },
        {
          q: "The toxin responsible for the chill and high fever in malaria is:",
          options: ["Haemozoin", "Histamine", "Interferon", "Serotonin"],
          answer: 0,
          why: "Haemozoin is released when infected RBCs rupture.",
        },
      ],
    },
    {
      id: "aids-cancer-drugs",
      title: "AIDS, cancer and drug abuse",
      minutes: 8,
      summary:
        "HIV destroys helper T cells, cancer arises when cells lose contact inhibition and divide uncontrollably, and opioids, cannabinoids and cocaine act on the nervous system with serious harm.",
      examFocus:
        "HIV replication via reverse transcriptase and macrophages as an HIV factory, ELISA diagnosis, benign vs malignant tumours and carcinogens, and source plants and effects of each drug class.",
      mechanism:
        "HIV is a retrovirus with an RNA genome. Inside a macrophage, its reverse transcriptase copies the RNA into viral DNA, which integrates into the host DNA and directs production of virus particles, so the macrophage keeps producing virus and acts like an HIV factory. HIV then enters helper T lymphocytes, replicates and destroys them; as their number falls, the person becomes open to infections they could normally fight, which is AIDS. Normal cells stop dividing when they touch neighbours (contact inhibition); cancer cells have lost this property, so they keep dividing into tumours, and malignant tumours invade and spread to distant sites (metastasis). Cellular oncogenes (proto-oncogenes), present in normal cells, can be activated by carcinogens into oncogenes that drive this transformation.",
      points: [
        "AIDS first reported in 1981; transmitted by sexual contact with an infected person, transfusion of contaminated blood, sharing infected needles, and from infected mother to child through the placenta.",
        "Time lag between infection and AIDS symptoms may vary from a few months to many years (usually 5–10 years). ELISA is a widely used diagnostic test; antiretroviral drugs only prolong life. NACO and NGOs educate on prevention.",
        "Benign tumours stay confined to their original location. Malignant tumours grow rapidly, invade surrounding tissue and spread via blood (metastasis).",
        "Carcinogens: ionising radiations (X-rays, gamma rays), non-ionising radiations (UV), chemical carcinogens (tobacco smoke), and oncogenic viruses.",
        "Detection: biopsy and histopathology, blood and bone marrow tests for leukaemia, radiography, CT, MRI, and antibodies against cancer-specific antigens. Treatment: surgery, radiotherapy, chemotherapy and immunotherapy with biological response modifiers such as α-interferon.",
        "Opioids (heroin/smack = diacetylmorphine, from morphine of the poppy Papaver somniferum) bind opioid receptors in the CNS and gut; heroin is a depressant that slows body functions.",
        "Cannabinoids (Cannabis sativa: marijuana, hashish, charas, ganja) interact with cannabinoid receptors in the brain and affect the cardiovascular system. Cocaine (coca alkaloid from Erythroxylum coca) interferes with dopamine transport, causing euphoria and, in excess, hallucinations. Atropa belladonna and Datura are also hallucinogenic.",
        "Tobacco: nicotine stimulates the adrenal gland to release adrenaline and noradrenaline, raising blood pressure and heart rate; smoking raises carbon monoxide-bound haemoglobin, reducing oxygen in blood.",
      ],
      flow: {
        title: "HIV replication",
        steps: [
          { label: "HIV enters macrophage", detail: "RNA genome" },
          { label: "Reverse transcriptase", detail: "Viral RNA → viral DNA" },
          {
            label: "Viral DNA integrates into host DNA",
            detail: "Macrophage keeps producing virus — HIV factory",
          },
          { label: "HIV enters helper T lymphocytes", detail: "Replicates, destroys T cells" },
          { label: "Helper T count falls", detail: "Opportunistic infections — AIDS" },
        ],
      },
      pitfalls: [
        "HIV's RNA is copied into DNA by reverse transcriptase — information flows RNA → DNA, opposite to transcription.",
        "Cocaine interferes with dopamine transport; heroin is a depressant, not a stimulant.",
      ],
      vignette: {
        stem: "A patient's tumour cells are found in lymph nodes and lungs far from the original breast lump.",
        answer: "A malignant tumour showing metastasis.",
        reasoning:
          "Malignant cells lose contact inhibition, invade surrounding tissue and travel through blood or lymph to form secondary tumours.",
      },
      highYield:
        "HIV: retrovirus, reverse transcriptase, macrophage = HIV factory, kills helper T cells; ELISA. Cancer = loss of contact inhibition. Heroin from morphine (depressant); cocaine blocks dopamine transport.",
      checks: [
        {
          q: "Which cells act as an 'HIV factory'?",
          options: ["Helper T cells", "B lymphocytes", "Macrophages", "Neutrophils"],
          answer: 2,
          why: "Infected macrophages continue to produce virus particles.",
        },
        {
          q: "Cocaine produces its effect by:",
          options: [
            "Binding opioid receptors",
            "Interfering with dopamine transport",
            "Binding cannabinoid receptors",
            "Blocking acetylcholine receptors",
          ],
          answer: 1,
          why: "Cocaine interferes with the transport of the neurotransmitter dopamine.",
        },
      ],
    },
    {
      id: "microbes-in-human-welfare",
      title: "Microbes in human welfare",
      minutes: 8,
      summary:
        "Microbes ferment household foods, make antibiotics, acids, alcohol, enzymes and drugs, treat sewage, produce biogas and act as biocontrol agents and biofertilisers.",
      examFocus:
        "Microbe-product matching (citric acid, statins, cyclosporin A, streptokinase), Swiss cheese holes, BOD and activated sludge, methanogens, and biofertiliser examples.",
      mechanism:
        "Most of these uses rest on microbial metabolism. Lactic acid bacteria convert milk to curd by producing acids that coagulate and partially digest milk proteins, and also raise its vitamin B12 content. Yeast ferments sugars to CO2, which raises bread dough, and to ethanol in beverages. In sewage treatment, aerobic microbes in the secondary stage form flocs that consume organic matter, sharply lowering BOD — the amount of oxygen bacteria would consume to oxidise the organic matter in water, so a high BOD means high pollution. The settled activated sludge is then digested anaerobically, where bacteria produce a mixture of gases such as methane, hydrogen sulphide and CO2 that forms biogas. Methanogens like Methanobacterium do the same in the rumen of cattle, which is why cattle dung is used in biogas plants.",
      points: [
        "Household: Lactobacillus (lactic acid bacteria) — curd, vitamin B12; dough for dosa and idli fermented by bacteria; bread by baker's yeast Saccharomyces cerevisiae. Large holes in Swiss cheese: CO2 from Propionibacterium sharmanii; Roquefort cheese ripened by fungi.",
        "Antibiotics: penicillin discovered by Alexander Fleming from Penicillium notatum while working on Staphylococci; its full potential was established by Ernest Chain and Howard Florey (Nobel Prize 1945).",
        "Acids: Aspergillus niger — citric acid; Acetobacter aceti — acetic acid; Clostridium butylicum — butyric acid; Lactobacillus — lactic acid. Ethanol: Saccharomyces cerevisiae (brewer's yeast).",
        "Enzymes: lipases in detergents (remove oily stains); pectinases and proteases clarify bottled juices; streptokinase from Streptococcus (modified by genetic engineering) is a clot buster for myocardial infarction.",
        "Bioactive molecules: cyclosporin A from Trichoderma polysporum (immunosuppressant for organ transplant); statins from Monascus purpureus (lower blood cholesterol by competitively inhibiting the enzyme of cholesterol synthesis).",
        "Sewage: primary treatment physical (filtration, sedimentation); secondary/biological treatment with aerobic flocs lowers BOD; activated sludge partly returned as inoculum, rest to anaerobic sludge digesters producing biogas. Ministry of Environment and Forests initiated the Ganga Action Plan and Yamuna Action Plan.",
        "Biogas: mainly methane, with CO2 and H2; methanogens (Methanobacterium) grow anaerobically on cellulosic material, including in the rumen of cattle; technology developed mainly by IARI and KVIC.",
        "Biocontrol: ladybird (aphids), dragonflies (mosquitoes), Bacillus thuringiensis (butterfly caterpillars), Trichoderma (plant pathogens), Baculoviruses of genus Nucleopolyhedrovirus (narrow-spectrum insecticides). Biofertilisers: Rhizobium (symbiotic, legume root nodules), Azotobacter and Azospirillum (free-living), mycorrhiza by Glomus (phosphorus absorption), cyanobacteria Anabaena, Nostoc, Oscillatoria (paddy fields).",
      ],
      table: {
        title: "Microbe and product",
        columns: ["Microbe", "Product / use"],
        rows: [
          ["Aspergillus niger", "Citric acid"],
          ["Acetobacter aceti", "Acetic acid"],
          ["Clostridium butylicum", "Butyric acid"],
          ["Propionibacterium sharmanii", "Swiss cheese (CO2 holes)"],
          ["Trichoderma polysporum", "Cyclosporin A (immunosuppressant)"],
          ["Monascus purpureus", "Statins (lower cholesterol)"],
          ["Streptococcus", "Streptokinase (clot buster)"],
          ["Methanobacterium", "Biogas (methane)"],
        ],
      },
      pitfalls: [
        "Trichoderma polysporum gives cyclosporin A, while Trichoderma species in general are biocontrol agents — read the context.",
        "A higher BOD means more organic pollution, not cleaner water.",
      ],
      vignette: {
        stem: "A transplant surgeon needs a drug to stop the recipient's immune system from rejecting a new kidney.",
        answer: "Cyclosporin A, produced by the fungus Trichoderma polysporum.",
        reasoning: "Cyclosporin A is an immunosuppressive agent used in organ-transplant patients.",
      },
      highYield:
        "Citric acid — Aspergillus niger; statins — Monascus purpureus; cyclosporin A — Trichoderma polysporum; streptokinase — Streptococcus; Swiss cheese — Propionibacterium sharmanii; biogas — methanogens.",
      checks: [
        {
          q: "Statins are obtained from:",
          options: [
            "Trichoderma polysporum",
            "Aspergillus niger",
            "Monascus purpureus",
            "Streptococcus",
          ],
          answer: 2,
          why: "Statins produced by the yeast Monascus purpureus inhibit cholesterol synthesis.",
        },
        {
          q: "The large holes in Swiss cheese are due to CO2 released by:",
          options: [
            "Propionibacterium sharmanii",
            "Lactobacillus",
            "Saccharomyces cerevisiae",
            "Penicillium roqueforti",
          ],
          answer: 0,
          why: "Propionibacterium sharmanii produces large amounts of CO2 in Swiss cheese.",
        },
      ],
    },
  ],
};
