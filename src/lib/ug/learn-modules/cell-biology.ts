import type { LearnModule } from "../../learn";

export const cellBiology: LearnModule = {
  slug: "cell-biology",
  group: "Biology",
  subject: "Botany",
  title: "Cell & Biomolecules",
  icon: "biotech",
  blurb:
    "Cell theory and prokaryotic vs eukaryotic cells, the fluid mosaic membrane and endomembrane system, mitochondria, plastids, ribosomes, the nucleus and cytoskeleton, biomolecules, enzymes, the cell cycle with mitosis, and meiosis.",
  objectives: [
    "Learner can state cell theory with its contributors and contrast a prokaryotic cell with a eukaryotic plant and animal cell.",
    "Learner can explain the fluid mosaic model and assign each membrane-bound organelle its structure and function.",
    "Learner can classify biomolecules, name the bonds that link their monomers and describe the levels of protein structure.",
    "Learner can name the six enzyme classes, read a substrate–velocity curve and distinguish competitive inhibition and the types of cofactor.",
    "Learner can sequence the phases of the cell cycle, mitosis and meiosis and track chromosome number and DNA content through each.",
  ],
  concepts: [
    {
      id: "cell-theory-prokaryotes",
      title: "Cell theory, prokaryotic and eukaryotic cells",
      minutes: 7,
      summary:
        "The cell is the structural and functional unit of life; prokaryotes lack a membrane-bound nucleus and organelles, while eukaryotes compartmentalise their cytoplasm with membranes.",
      examFocus:
        "Who contributed what to cell theory (Schleiden, Schwann, Virchow), the layers of the bacterial cell envelope, mesosomes and inclusion bodies, 70S vs 80S ribosomes, and plant vs animal cell differences.",
      mechanism:
        "Cell theory grew in two steps: Schleiden (1838) and Schwann (1839) showed that plants and animals are built of cells, but they could not say where cells came from. Rudolf Virchow (1855) completed it by stating that new cells arise only from pre-existing cells (omnis cellula-e cellula), which is why the modern theory has two parts. Prokaryotes are small and simple because they never evolved internal membranes: their DNA lies naked in the cytoplasm as a nucleoid, and jobs that eukaryotes give to organelles are handled by infoldings of the plasma membrane called mesosomes. Eukaryotes, by contrast, wall off reactions inside membrane-bound compartments, which lets incompatible chemistry run side by side in one cell and allows much larger cell size. Plant and animal cells share this plan but differ in what their lifestyle needs: plants have a cell wall, plastids and a large central vacuole, while animal cells have centrioles.",
      points: [
        "Schleiden (1838, plants) and Schwann (1839, animals; noted the plasma membrane and that the cell wall is unique to plant cells) proposed cell theory; Virchow (1855) added omnis cellula-e cellula.",
        "Size range: Mycoplasma, the smallest cells, are about 0.3 μm; bacteria 3–5 μm; human RBC about 7.0 μm in diameter; the largest isolated single cell is the egg of an ostrich.",
        "Prokaryotes include bacteria, blue-green algae (cyanobacteria), mycoplasma and PPLO (pleuro-pneumonia like organisms).",
        "Bacterial cell envelope has three layers: outer glycocalyx (loose slime layer or tough capsule), cell wall, and plasma membrane; Gram-positive bacteria retain the Gram stain, Gram-negative do not.",
        "Mesosomes are plasma membrane extensions that help in cell wall formation, DNA replication and distribution to daughter cells, respiration, secretion and increasing surface area.",
        "Plasmids are small circular extra-chromosomal DNA that can confer antibiotic resistance and are used as vectors to transform bacteria with foreign DNA.",
        "Prokaryotic ribosomes are 70S (50S + 30S); several ribosomes on one mRNA form a polysome. Eukaryotic cytoplasmic ribosomes are 80S (60S + 40S).",
        "Inclusion bodies lie free in prokaryotic cytoplasm: phosphate granules, cyanophycean granules and glycogen granules; gas vacuoles occur in blue-green, purple and green photosynthetic bacteria.",
      ],
      table: {
        title: "Prokaryotic vs eukaryotic cell",
        columns: ["Feature", "Prokaryotic", "Eukaryotic"],
        rows: [
          ["Nucleus", "Nucleoid, no nuclear envelope", "True nucleus with double nuclear envelope"],
          [
            "Membrane-bound organelles",
            "Absent",
            "ER, Golgi, mitochondria, plastids (plants), lysosomes, vacuoles",
          ],
          ["Ribosomes", "70S", "80S in cytoplasm; 70S in mitochondria and chloroplasts"],
          [
            "Genetic material",
            "Single circular DNA + plasmids",
            "Linear DNA in several chromosomes with histones",
          ],
          ["Membrane infolding", "Mesosomes; chromatophores in cyanobacteria", "Absent as such"],
          [
            "Examples",
            "Bacteria, cyanobacteria, mycoplasma, PPLO",
            "Protists, fungi, plants, animals",
          ],
        ],
      },
      pitfalls: [
        "Schwann, not Schleiden, recognised the plasma membrane and concluded that the cell wall is a unique plant feature; Virchow, not either of them, explained the origin of cells.",
        "Mitochondria and chloroplasts are inside eukaryotic cells yet carry 70S ribosomes; a question asking 'which ribosome type occurs in eukaryotic cells' can therefore have two right answers.",
      ],
      vignette: {
        stem: "A student examines an unknown cell under the electron microscope. It has a cell wall, 70S ribosomes, a nucleoid and membrane infoldings, but no nuclear envelope or mitochondria.",
        answer: "It is a prokaryotic (bacterial) cell; the infoldings are mesosomes.",
        reasoning:
          "Absence of a nuclear envelope and of membrane-bound organelles with 70S ribosomes is diagnostic of prokaryotes; mesosomes take over the respiratory and secretory roles that mitochondria and the Golgi play in eukaryotes.",
      },
      highYield:
        "Omnis cellula-e cellula — Virchow (1855). Prokaryotes: 70S ribosomes, nucleoid, mesosomes; Mycoplasma about 0.3 μm is the smallest cell.",
      checks: [
        {
          q: "Which structure in a bacterial cell helps in cell wall formation, DNA replication and respiration?",
          options: ["Plasmid", "Pilus", "Mesosome", "Capsule"],
          answer: 2,
          why: "Mesosomes are infoldings of the plasma membrane that carry out these functions in prokaryotes.",
        },
        {
          q: "Who first explained that new cells arise from pre-existing cells?",
          options: ["Rudolf Virchow", "Theodor Schwann", "Matthias Schleiden", "Robert Brown"],
          answer: 0,
          why: "Virchow (1855) gave omnis cellula-e cellula, completing cell theory.",
        },
      ],
    },
    {
      id: "membrane-endomembrane",
      title: "Cell membrane, cell wall and endomembrane system",
      minutes: 8,
      summary:
        "The plasma membrane is a fluid lipid bilayer studded with proteins; plant cells add a cellulose wall, and the ER, Golgi, lysosomes and vacuoles work together as one endomembrane system.",
      examFocus:
        "Singer and Nicolson's fluid mosaic model, protein:lipid ratio in RBC membrane, cis and trans faces of the Golgi, which organelles belong to the endomembrane system, and functions of SER vs RER.",
      mechanism:
        "Membrane lipids, mainly phosphoglycerides, have polar heads and non-polar tails, so in water they arrange themselves as a bilayer with heads facing outward and tails hidden inside. Because the lipids are not bonded to each other, they and the embedded proteins can move sideways, which is why Singer and Nicolson (1972) called the membrane a fluid mosaic; this fluidity is what allows cell growth, secretion, endocytosis and division. The hydrophobic core lets neutral solutes diffuse through but blocks polar molecules, so those need carrier proteins, and moving anything against its gradient needs ATP (for example the Na⁺/K⁺ pump). The ER, Golgi, lysosomes and vacuoles are grouped as the endomembrane system because their functions are coordinated: proteins made on RER are packaged and modified in the Golgi and dispatched to lysosomes, vacuoles or the cell surface. Mitochondria, chloroplasts and peroxisomes are excluded because their functions are not coordinated with this pathway.",
      points: [
        "Human RBC membrane has about 52% protein and 40% lipids; proteins are peripheral (on the surface) or integral (buried partly or fully in the bilayer).",
        "Plant cell wall: cellulose, hemicellulose, pectins and proteins; algal wall: cellulose, galactans, mannans and minerals like calcium carbonate.",
        "The middle lamella is mainly calcium pectate and glues neighbouring cells; plasmodesmata connect the cytoplasm of adjacent cells through the wall.",
        "Primary wall is laid first and can grow; the secondary wall is formed later on the inner side (towards the membrane).",
        "RER bears ribosomes and is active in protein synthesis and secretion; SER is the main site of lipid synthesis, including steroidal hormones in animal cells.",
        "Golgi apparatus (Camillo Golgi, 1898): stacked cisternae with a convex cis (forming) face and a concave trans (maturing) face; it packages materials and is the site where glycoproteins and glycolipids are formed.",
        "Lysosomes bud off from the Golgi and contain hydrolytic enzymes (lipases, proteases, carbohydrases) that are active at acidic pH.",
        "The plant vacuole is bounded by the tonoplast and can occupy up to 90% of the cell volume; the tonoplast moves ions into the vacuole against the gradient, so their concentration is much higher in the vacuole than in the cytoplasm.",
      ],
      flow: {
        title: "Secretory route through the endomembrane system",
        steps: [
          { label: "RER", detail: "Ribosomes synthesise proteins into the ER lumen" },
          {
            label: "Transport vesicles",
            detail: "Bud from ER and fuse with the cis face of the Golgi",
          },
          {
            label: "Golgi cisternae",
            detail: "Proteins are modified; glycoproteins and glycolipids are formed",
          },
          { label: "Trans face", detail: "Packaged vesicles leave the maturing face" },
          {
            label: "Destination",
            detail: "Lysosomes, vacuole, or fusion with the plasma membrane for secretion",
          },
        ],
      },
      pitfalls: [
        "Mitochondria, chloroplasts and peroxisomes are membrane-bound but are NOT part of the endomembrane system.",
        "The cis face of the Golgi is the convex receiving face; the trans face is concave and sends products out — students often reverse them.",
      ],
      vignette: {
        stem: "Cells of the adrenal cortex synthesise large amounts of steroid hormones, while pancreatic acinar cells secrete large amounts of digestive enzymes.",
        answer:
          "Adrenal cortex cells are rich in SER; pancreatic acinar cells are rich in RER and Golgi.",
        reasoning:
          "Steroids are lipids, made on smooth ER; secretory proteins are made on ribosome-studded RER and packaged in the Golgi before exocytosis.",
      },
      highYield:
        "Fluid mosaic model — Singer and Nicolson (1972). Endomembrane system = ER + Golgi + lysosomes + vacuoles. Middle lamella = calcium pectate.",
      checks: [
        {
          q: "Which of the following is NOT a part of the endomembrane system?",
          options: ["Golgi complex", "Lysosome", "Vacuole", "Mitochondrion"],
          answer: 3,
          why: "Mitochondria function independently of the ER–Golgi pathway and are excluded from the endomembrane system.",
        },
        {
          q: "The middle lamella of plant cells is chiefly made of:",
          options: ["Cellulose", "Calcium pectate", "Lignin", "Suberin"],
          answer: 1,
          why: "Calcium pectate in the middle lamella cements neighbouring cells together.",
        },
      ],
    },
    {
      id: "mitochondria-plastids-ribosomes",
      title: "Mitochondria, plastids and ribosomes",
      minutes: 7,
      summary:
        "Mitochondria and chloroplasts are double-membraned, semi-autonomous energy organelles with their own DNA and 70S ribosomes; ribosomes themselves are non-membranous sites of protein synthesis.",
      examFocus:
        "Cristae and matrix contents, types of plastids (amyloplast, elaioplast, aleuroplast), grana vs stroma lamellae, chloroplast dimensions, and ribosome subunits with the meaning of S.",
      mechanism:
        "Both mitochondria and chloroplasts make ATP by pumping protons across an inner membrane, so they need a large internal membrane surface: mitochondria fold the inner membrane into cristae, and chloroplasts stack flattened sacs called thylakoids into grana. Because each carries its own circular DNA, RNA and 70S ribosomes, they can make some of their own proteins and divide by fission, which is why they are called semi-autonomous. Plastids are interconvertible and are named by what they hold: chlorophyll-containing chloroplasts photosynthesise, carotenoid-rich chromoplasts give yellow, orange or red colours, and colourless leucoplasts store food. Ribosomes have no membrane at all; they are built of RNA and protein, and their size is expressed in Svedberg units (S), a sedimentation coefficient that reflects both size and density, so subunit values do not simply add up.",
      points: [
        "Mitochondria are sausage-shaped or cylindrical, about 0.2–1.0 μm (average 0.5 μm) in diameter and 1.0–4.1 μm long; the outer membrane is smooth and the inner membrane forms cristae.",
        "The mitochondrial matrix has a single circular DNA, a few RNA molecules, 70S ribosomes and enzymes of aerobic respiration; mitochondria divide by fission.",
        "Leucoplasts: amyloplasts store starch (potato), elaioplasts store oils and fats, aleuroplasts store proteins.",
        "Chromoplasts contain fat-soluble carotenoid pigments such as carotene and xanthophylls.",
        "Chloroplasts are lens-shaped, oval, spherical or ribbon-like, about 5–10 μm long and 2–4 μm wide; Chlamydomonas has a single chloroplast, mesophyll cells have 20–40 per cell.",
        "Inside the chloroplast, thylakoids stack as grana, joined by stroma lamellae; the stroma holds enzymes for carbohydrate and protein synthesis, circular DNA and 70S ribosomes.",
        "Ribosomes were first observed by George Palade (1953) as dense particles; they are made of RNA and protein, eukaryotic 80S = 60S + 40S, prokaryotic 70S = 50S + 30S.",
      ],
      table: {
        title: "Plastid types",
        columns: ["Plastid", "Pigment / content", "Example role"],
        rows: [
          ["Chloroplast", "Chlorophyll and carotenoids", "Traps light for photosynthesis"],
          [
            "Chromoplast",
            "Carotenoids (carotene, xanthophylls)",
            "Yellow, orange or red colour of plant parts",
          ],
          ["Amyloplast", "Starch", "Starch storage in potato"],
          ["Elaioplast", "Oils and fats", "Lipid storage"],
          ["Aleuroplast", "Proteins", "Protein storage"],
        ],
      },
      pitfalls: [
        "60S + 40S gives 80S, not 100S — Svedberg units are not additive because sedimentation depends on shape and density as well as mass.",
        "Ribosomes are found in the cytoplasm, on RER, in mitochondria and chloroplasts — but they are never membrane-bound themselves.",
      ],
      vignette: {
        stem: "A section of potato tuber stained with iodine shows blue-black granules inside colourless plastids.",
        answer: "The plastids are amyloplasts (leucoplasts storing starch).",
        reasoning:
          "Iodine stains starch blue-black; colourless plastids storing starch are amyloplasts, a type of leucoplast.",
      },
      highYield:
        "Mitochondria and chloroplasts: double membrane, circular DNA, 70S ribosomes — semi-autonomous. Amyloplast = starch, elaioplast = oil, aleuroplast = protein.",
      checks: [
        {
          q: "Aleuroplasts store:",
          options: ["Starch", "Oils", "Proteins", "Carotenoids"],
          answer: 2,
          why: "Aleuroplasts are leucoplasts that store proteins; amyloplasts store starch and elaioplasts store oils.",
        },
        {
          q: "Which statement about mitochondria is correct?",
          options: [
            "They have 80S ribosomes and linear DNA",
            "Their matrix contains circular DNA and 70S ribosomes",
            "Their outer membrane forms cristae",
            "They cannot divide",
          ],
          answer: 1,
          why: "The matrix has circular DNA, RNA and 70S ribosomes; cristae are formed by the inner membrane, and mitochondria divide by fission.",
        },
      ],
    },
    {
      id: "nucleus-cytoskeleton",
      title: "Nucleus, cytoskeleton, cilia and centrioles",
      minutes: 7,
      summary:
        "The nucleus stores and controls genetic information; protein filaments of the cytoskeleton give shape and movement, and microtubules build cilia, flagella and centrioles.",
      examFocus:
        "9+2 axoneme of cilia vs 9 triplets of centrioles and basal bodies, nuclear pores and nucleolus function, chromosome types by centromere position, and satellite chromosomes.",
      mechanism:
        "The nucleus separates the genome from the cytoplasm by a double nuclear envelope, so traffic between the two must pass through nuclear pores, which allow RNA and proteins to move in both directions. The nucleolus is not membrane-bound; it is where rRNA is made, which explains why it is larger and more numerous in cells that are actively making protein. The cytoskeleton is a network of microtubules, microfilaments and intermediate filaments that provides mechanical support, motility and shape. Microtubules can be arranged in two very different patterns: a 9+2 axoneme (nine doublets around a central pair) bends to beat in cilia and flagella, while nine triplets with no central microtubules form the rigid cartwheel of centrioles and basal bodies. This is why a basal body, which anchors a cilium, looks like a centriole and not like the cilium it bears.",
      points: [
        "The nucleus was first described by Robert Brown (1831); Flemming named the stainable material chromatin.",
        "The nuclear envelope has two membranes separated by the perinuclear space (10–50 nm); the outer membrane is continuous with the ER and bears ribosomes.",
        "Interphase nucleus has a loose chromatin network, nuclear matrix and one or more nucleoli; nucleoli are sites of active rRNA synthesis.",
        "Each chromosome has a primary constriction, the centromere, bearing disc-shaped kinetochores; by centromere position chromosomes are metacentric (middle), sub-metacentric, acrocentric (near end) or telocentric (terminal).",
        "Some chromosomes have a secondary constriction that marks off a small fragment called the satellite.",
        "Cilia are small and work like oars; flagella are longer and responsible for cell movement; prokaryotic flagella are structurally different from eukaryotic ones.",
        "Axoneme: nine peripheral doublets and a central pair (9+2), joined by radial spokes and linkers, enclosed by membrane and arising from a basal body.",
        "Centrosome: two cylindrical centrioles lying perpendicular to each other, each with nine evenly spaced peripheral triplets of tubulin, a central hub and radial spokes; centrioles form basal bodies and the spindle apparatus in animal cells.",
      ],
      table: {
        title: "Microtubule arrangements",
        columns: ["Structure", "Arrangement", "Central microtubules", "Role"],
        rows: [
          [
            "Cilium / flagellum (axoneme)",
            "9 doublets",
            "Present (central pair) — 9+2",
            "Beating movement",
          ],
          ["Basal body", "9 triplets", "Absent", "Anchors and gives rise to cilia and flagella"],
          [
            "Centriole",
            "9 triplets (cartwheel)",
            "Absent; central hub of protein",
            "Spindle formation in animal cells",
          ],
        ],
      },
      pitfalls: [
        "The axoneme has doublets (9+2); centrioles and basal bodies have triplets with no central pair (often written 9+0).",
        "The nucleolus has no membrane — questions often list it among membrane-bound organelles as a distractor.",
      ],
      vignette: {
        stem: "Electron micrographs of a cross-section through the base of a cilium show nine sets of three microtubules arranged like a cartwheel, with no central microtubules.",
        answer: "The section is through the basal body, not the ciliary shaft.",
        reasoning:
          "The ciliary shaft (axoneme) shows nine doublets plus a central pair; nine triplets without a central pair is the centriole-like basal body from which the cilium arises.",
      },
      highYield:
        "Cilia/flagella axoneme = 9+2 doublets; centriole/basal body = 9 triplets, cartwheel. Nucleolus = rRNA synthesis, not membrane-bound.",
      checks: [
        {
          q: "A chromosome whose centromere lies close to one end, giving one very short and one very long arm, is:",
          options: ["Metacentric", "Sub-metacentric", "Telocentric", "Acrocentric"],
          answer: 3,
          why: "Acrocentric chromosomes have the centromere close to the end; in telocentric ones it is terminal.",
        },
        {
          q: "The arrangement of microtubules in the axoneme of a eukaryotic flagellum is:",
          options: [
            "9+2 with doublets",
            "9+0 with triplets",
            "9+2 with triplets",
            "9+0 with doublets",
          ],
          answer: 0,
          why: "Nine peripheral doublets surround a central pair of single microtubules.",
        },
      ],
    },
    {
      id: "biomolecules",
      title: "Biomolecules: proteins, carbohydrates, lipids and nucleic acids",
      minutes: 8,
      summary:
        "Living tissue is made of small molecules (amino acids, sugars, fatty acids, nucleotides) that polymerise into proteins, polysaccharides and nucleic acids; lipids remain small but associate into membranes.",
      examFocus:
        "Classifying amino acids and nitrogen bases, the acid-insoluble fraction and why lipids fall into it, starch vs cellulose with iodine, nucleoside vs nucleotide, and levels of protein structure (haemoglobin as quaternary).",
      mechanism:
        "When tissue is ground in trichloroacetic acid, small molecules stay dissolved (acid-soluble pool) and large polymers precipitate (acid-insoluble fraction), so this simple test separates micromolecules from macromolecules. Lipids have molecular weights below 800 Da yet land in the insoluble fraction, because grinding breaks membranes into vesicles that do not dissolve; that is why lipids are not true macromolecules even though they appear with them. The properties of a polymer depend on its monomers and bonds: amino acids join by peptide bonds, sugars by glycosidic bonds and nucleotides by phosphodiester bonds. Starch forms helices that can trap iodine and turn blue, while cellulose chains lack such helices, so cellulose does not give the iodine test. In proteins, the amino acid sequence (primary structure) determines how the chain folds into helices (secondary), a three-dimensional shape (tertiary), and in some cases an assembly of several chains (quaternary).",
      points: [
        "Amino acids carry an amino group, a carboxyl group, a hydrogen and a variable R group on the same α-carbon; 20 types occur in proteins. Acidic: glutamic acid; basic: lysine; neutral: valine; aromatic: tyrosine, phenylalanine, tryptophan.",
        "Amino acids exist as zwitterions at certain pH because their amino and carboxyl groups are ionisable.",
        "Fatty acids have a carboxyl group attached to an R group: palmitic acid has 16 carbons including the carboxyl carbon, arachidonic acid has 20; lecithin is a phospholipid.",
        "Nitrogen bases: adenine and guanine are purines (substituted purines); cytosine, uracil and thymine are pyrimidines. Base + sugar = nucleoside (adenosine, uridine); nucleoside + phosphate = nucleotide (adenylic acid).",
        "Polysaccharides: cellulose (homopolymer of glucose, plant cell walls; paper and cotton fibre), starch (stores energy, gives blue with iodine), glycogen (animal storage), inulin (polymer of fructose), chitin (complex polysaccharide in arthropod exoskeleton).",
        "Water is the most abundant chemical in living organisms (70–90% of cell mass).",
        "RuBisCO is the most abundant protein in the whole biosphere; collagen is the most abundant protein in the animal world.",
        "In a protein the first amino acid is the N-terminal and the last is the C-terminal amino acid; adult human haemoglobin has 4 subunits — 2 α and 2 β — showing quaternary structure.",
      ],
      table: {
        title: "Monomers, polymers and linking bonds",
        columns: ["Polymer", "Monomer", "Bond", "Example"],
        rows: [
          ["Protein", "Amino acid", "Peptide bond", "RuBisCO, collagen, haemoglobin"],
          [
            "Polysaccharide",
            "Monosaccharide",
            "Glycosidic bond",
            "Starch, cellulose, glycogen, inulin",
          ],
          ["Nucleic acid", "Nucleotide", "Phosphodiester bond", "DNA, RNA"],
          ["Lipid (not a polymer)", "Fatty acid + glycerol", "Ester bond", "Oils, fats, lecithin"],
        ],
      },
      pitfalls: [
        "Lipids appear in the acid-insoluble fraction only because they form membrane vesicles; they are not macromolecules (molecular weight does not exceed 800 Da).",
        "Uracil is a pyrimidine found in RNA instead of thymine; adenine and guanine are the only purines.",
      ],
      vignette: {
        stem: "A student adds iodine solution to two white powders. Powder X turns blue-black; powder Y, extracted from cotton, shows no colour change.",
        answer: "X is starch; Y is cellulose.",
        reasoning:
          "Starch forms helical secondary structures that hold iodine and give a blue colour; cellulose, a glucose homopolymer without such helices, cannot hold iodine.",
      },
      highYield:
        "Most abundant protein: RuBisCO (biosphere), collagen (animals). Inulin = fructose polymer. Lipids < 800 Da, in acid-insoluble fraction due to membranes.",
      checks: [
        {
          q: "Which amino acid is aromatic?",
          options: ["Lysine", "Valine", "Glutamic acid", "Tryptophan"],
          answer: 3,
          why: "Tyrosine, phenylalanine and tryptophan are the aromatic amino acids; lysine is basic, glutamic acid acidic and valine neutral.",
        },
        {
          q: "Adenosine is a:",
          options: ["Nucleotide", "Nucleoside", "Purine base alone", "Pyrimidine nucleoside"],
          answer: 1,
          why: "Adenosine = adenine + sugar, i.e. a nucleoside; adding phosphate gives adenylic acid, a nucleotide.",
        },
      ],
    },
    {
      id: "enzymes",
      title: "Enzymes: action, kinetics, inhibition and cofactors",
      minutes: 8,
      summary:
        "Enzymes are mostly proteins (some are RNA ribozymes) that speed reactions by lowering activation energy at an active site; their rate depends on temperature, pH and substrate concentration.",
      examFocus:
        "The six classes with examples, Vmax and Km on the substrate–velocity curve, competitive inhibition (malonate and succinic dehydrogenase), and prosthetic group vs coenzyme vs metal ion.",
      mechanism:
        "A reaction needs an energy push (activation energy) to reach its transition state; an enzyme binds the substrate in its active site, forming an enzyme–substrate complex that reaches the transition state more easily, so the reaction runs far faster without the enzyme being used up. Because the active site depends on the protein's three-dimensional shape, anything that disturbs folding — high temperature or a pH far from optimum — destroys activity, while low temperature only slows it reversibly. As substrate concentration rises, more active sites are occupied until all are busy, so velocity levels off at Vmax; Km is the substrate concentration at half Vmax. A competitive inhibitor resembles the substrate and competes for the active site, which is why malonate, similar to succinate, inhibits succinic dehydrogenase. Many enzymes need a non-protein partner: a tightly bound prosthetic group, a loosely and transiently bound coenzyme, or a metal ion that bridges the enzyme and substrate.",
      points: [
        "Carbonic anhydrase speeds formation of carbonic acid from about 200 molecules per hour (uncatalysed) to about 600,000 molecules per second — roughly a 10 million-fold increase.",
        "Enzymes from thermophilic organisms in hot vents and sulphur springs remain stable and active at 80–90 °C.",
        "Six classes: oxidoreductases/dehydrogenases, transferases, hydrolases, lyases (remove groups leaving double bonds), isomerases, ligases (join two compounds).",
        "Each enzyme has an optimum temperature and pH; activity falls on either side. Low temperature keeps an enzyme temporarily inactive; high temperature denatures it.",
        "Competitive inhibitors bind the active site because they resemble the substrate; such inhibitors are used to control bacterial pathogens.",
        "Apoenzyme = protein part; cofactor = non-protein part. Haem is the prosthetic group of peroxidase and catalase; NAD and NADP contain the vitamin niacin; zinc is the cofactor of carboxypeptidase.",
        "Removing the cofactor abolishes catalytic activity — the cofactor is essential.",
      ],
      table: {
        title: "Cofactor types",
        columns: ["Type", "Binding", "Example"],
        rows: [
          ["Prosthetic group", "Tightly bound to apoenzyme", "Haem in peroxidase and catalase"],
          ["Coenzyme", "Transient association during catalysis", "NAD, NADP (contain niacin)"],
          ["Metal ion", "Coordinates with active site and substrate", "Zn²⁺ in carboxypeptidase"],
        ],
      },
      flow: {
        title: "Catalytic cycle",
        steps: [
          { label: "Binding", detail: "Substrate binds the active site" },
          { label: "Induced fit", detail: "Enzyme alters shape to fit the substrate more tightly" },
          {
            label: "Catalysis",
            detail:
              "Active site breaks or forms bonds — E–S complex passes through the transition state",
          },
          { label: "Release", detail: "Product leaves; free enzyme binds another substrate" },
        ],
      },
      pitfalls: [
        "Not all enzymes are proteins: ribozymes are catalytic RNA molecules.",
        "Lyases remove groups to form double bonds without hydrolysis; ligases join two molecules — the names look alike but the actions are opposite.",
      ],
      vignette: {
        stem: "Malonate is added to isolated mitochondria. Succinate accumulates and the activity of succinic dehydrogenase falls; adding excess succinate restores activity.",
        answer: "Malonate is a competitive inhibitor of succinic dehydrogenase.",
        reasoning:
          "Malonate resembles succinate and occupies the active site; raising substrate concentration outcompetes it, which is the signature of competitive inhibition.",
      },
      highYield:
        "Km = substrate concentration at ½ Vmax. Malonate competitively inhibits succinic dehydrogenase. Haem — prosthetic group of catalase/peroxidase; Zn²⁺ — carboxypeptidase.",
      checks: [
        {
          q: "Enzymes that catalyse removal of groups from substrates by mechanisms other than hydrolysis, leaving double bonds, are:",
          options: ["Ligases", "Lyases", "Hydrolases", "Transferases"],
          answer: 1,
          why: "Lyases remove groups non-hydrolytically and leave double bonds.",
        },
        {
          q: "Which pair is correctly matched?",
          options: [
            "Carboxypeptidase — haem",
            "Catalase — zinc",
            "NAD — niacin",
            "Peroxidase — coenzyme A",
          ],
          answer: 2,
          why: "NAD and NADP contain niacin; haem belongs to catalase and peroxidase and zinc to carboxypeptidase.",
        },
      ],
    },
    {
      id: "cell-cycle-mitosis",
      title: "Cell cycle and mitosis",
      minutes: 8,
      summary:
        "A dividing cell spends most of its time in interphase (G1, S, G2) preparing for division, then divides by mitosis (M phase) to give two genetically identical daughter cells.",
      examFocus:
        "What happens in G1, S and G2 (DNA 2C → 4C but chromosome number unchanged), G0, events of each mitotic stage, metaphase as the stage for studying chromosome morphology, and cell plate vs furrow in cytokinesis.",
      mechanism:
        "Before a cell divides it must double everything it will share, so interphase is the longest part of the cycle (over 95% of it). DNA is copied in S phase, so DNA content rises from 2C to 4C, but because the two copies stay joined at the centromere as sister chromatids, the chromosome number does not change. Mitosis then separates those chromatids precisely: chromosomes condense in prophase, line up at the metaphase plate attached to spindle fibres by kinetochores, split at the centromere in anaphase, and are enclosed in new nuclei in telophase. Mitosis is equational, so each daughter receives the same chromosome number as the parent, which makes it suitable for growth, repair and replacing cells. Plant cells cannot pinch in because of their rigid wall, so they build a cell plate from the centre outward, whereas animal cells form a furrow from the edge inward.",
      points: [
        "A typical human cell in culture divides about once every 24 hours; yeast takes about 90 minutes. M phase lasts only about an hour of the 24.",
        "G1: cell is metabolically active and grows but DNA is not replicated. S: DNA doubles (2C → 4C); in animal cells the centriole duplicates in the cytoplasm. G2: proteins are made for mitosis and growth continues.",
        "G0 (quiescent stage): cells that do not divide further exit G1 into G0; they stay metabolically active but no longer proliferate unless called on by the organism. Some adult animal cells, such as heart cells, do not appear to divide at all.",
        "Prophase: chromatin condenses, centrosomes move to opposite poles and initiate the spindle; by its end Golgi, ER, nucleolus and nuclear envelope are no longer seen.",
        "Metaphase: chromosomes, each of two sister chromatids, align at the metaphase plate; spindle fibres attach to kinetochores. This is the best stage to study chromosome morphology.",
        "Anaphase: centromeres split and chromatids move to opposite poles, centromere leading and arms trailing.",
        "Telophase: chromosomes decondense at the poles, and the nuclear envelope, nucleolus, Golgi and ER reform.",
        "Cytokinesis: furrow in animal cells; cell plate (future middle lamella) in plant cells. Karyokinesis without cytokinesis gives a multinucleate condition (syncytium), as in the liquid endosperm of coconut.",
      ],
      flow: {
        title: "Cell cycle",
        steps: [
          { label: "G1", detail: "Growth; DNA content 2C" },
          { label: "S", detail: "DNA replication 2C → 4C; centriole duplication in animal cells" },
          { label: "G2", detail: "Protein synthesis; preparation for mitosis" },
          {
            label: "Prophase",
            detail: "Condensation; spindle begins; envelope and nucleolus disappear by end",
          },
          {
            label: "Metaphase",
            detail: "Chromosomes at equator, kinetochores attached to spindle",
          },
          { label: "Anaphase", detail: "Centromere splits; sister chromatids to opposite poles" },
          {
            label: "Telophase + cytokinesis",
            detail: "Nuclei reform; furrow or cell plate divides the cytoplasm",
          },
        ],
      },
      mnemonic: "PMAT — Prophase, Metaphase, Anaphase, Telophase.",
      pitfalls: [
        "After S phase the DNA content is 4C but the chromosome number is still 2n — do not double the chromosome count.",
        "The nuclear envelope begins to break down in prophase but its complete disintegration marks the start of metaphase.",
      ],
      vignette: {
        stem: "Onion root-tip cells are treated with a drug that keeps spindle fibres from forming. A student wants to count chromosomes clearly.",
        answer:
          "Cells will be held at metaphase-like condensation, the best stage to count and study chromosome morphology.",
        reasoning:
          "Without a spindle, chromatids cannot move apart; condensed chromosomes accumulate in the metaphase-like state, where they are most compact and easily counted.",
      },
      highYield:
        "S phase: DNA 2C → 4C, chromosome number unchanged. Metaphase = best for chromosome morphology. Plant cytokinesis = cell plate.",
      checks: [
        {
          q: "A diploid cell has 2n = 16 and DNA content 2C in G1. After S phase, the chromosome number and DNA content are:",
          options: ["32 and 4C", "16 and 2C", "16 and 4C", "8 and 2C"],
          answer: 2,
          why: "Replication doubles DNA to 4C, but sister chromatids remain joined, so the chromosome number stays 16.",
        },
        {
          q: "In which stage do centromeres split and sister chromatids move to opposite poles?",
          options: ["Anaphase", "Metaphase", "Telophase", "Prophase"],
          answer: 0,
          why: "Anaphase begins with splitting of centromeres and poleward movement of chromatids.",
        },
      ],
    },
    {
      id: "meiosis",
      title: "Meiosis",
      minutes: 8,
      summary:
        "Meiosis is two successive divisions after a single round of DNA replication, giving four haploid cells and generating variation through crossing over and independent assortment.",
      examFocus:
        "The five sub-stages of prophase I with their events (synaptonemal complex, recombinase, chiasmata, terminalisation), anaphase I vs anaphase II, interkinesis, and significance of meiosis.",
      mechanism:
        "Sexual reproduction fuses two gametes, so if gametes were diploid the chromosome number would double every generation; meiosis prevents this by halving the number. It does so because DNA is replicated only once, but the cell divides twice: meiosis I separates homologous chromosomes (reductional) and meiosis II separates sister chromatids (equational, like mitosis). To segregate homologues correctly they must first pair (synapsis), held together by a synaptonemal complex; while paired, non-sister chromatids exchange segments (crossing over) using the enzyme recombinase. When the synaptonemal complex dissolves in diplotene, the homologues stay attached only at crossover points, which appear as X-shaped chiasmata. Crossing over plus random orientation of bivalents makes every gamete genetically different, which is why meiosis is a source of variation.",
      points: [
        "Leptotene: chromosomes become gradually visible under the light microscope as compaction proceeds.",
        "Zygotene: homologous chromosomes pair (synapsis) with the help of the synaptonemal complex; each pair is a bivalent or tetrad.",
        "Pachytene: crossing over occurs between non-sister chromatids of homologous chromosomes at recombination nodules, catalysed by recombinase; this is the longer stage compared to leptotene and zygotene.",
        "Diplotene: the synaptonemal complex dissolves and homologues separate except at chiasmata; in oocytes of some vertebrates diplotene can last months or years.",
        "Diakinesis: chiasmata terminalise, chromosomes condense fully, spindle assembles, nucleolus disappears and the nuclear envelope breaks down.",
        "Anaphase I: homologous chromosomes separate while sister chromatids stay together at their centromeres.",
        "Interkinesis is generally short and is NOT followed by DNA replication; meiosis II resembles mitosis, with centromeres splitting in anaphase II.",
        "Significance: conserves chromosome number across generations of sexually reproducing organisms and increases genetic variability.",
      ],
      table: {
        title: "Mitosis vs meiosis",
        columns: ["Feature", "Mitosis", "Meiosis"],
        rows: [
          ["Divisions after one replication", "One", "Two (meiosis I and II)"],
          ["Daughter cells", "Two, identical, same ploidy", "Four, haploid, genetically varied"],
          ["Synapsis and crossing over", "Absent", "Zygotene and pachytene of prophase I"],
          ["Anaphase separates", "Sister chromatids", "Homologues (I); sister chromatids (II)"],
          [
            "Occurs in",
            "Haploid and diploid cells; somatic growth",
            "Diploid meiocytes forming gametes or spores",
          ],
        ],
      },
      pitfalls: [
        "Crossing over is between NON-sister chromatids of homologous chromosomes, and it happens in pachytene — chiasmata only become visible in diplotene.",
        "Centromeres do not split in anaphase I; they split in anaphase II.",
      ],
      vignette: {
        stem: "Primary oocytes of a vertebrate are observed to remain arrested for years in a stage where homologous chromosomes have separated except at X-shaped points.",
        answer: "They are in diplotene of prophase I.",
        reasoning:
          "Dissolution of the synaptonemal complex with homologues held only at chiasmata defines diplotene, which NCERT notes can last months or years in oocytes of some vertebrates.",
      },
      highYield:
        "Leptotene → zygotene (synapsis) → pachytene (crossing over, recombinase) → diplotene (chiasmata) → diakinesis (terminalisation). No DNA replication in interkinesis.",
      checks: [
        {
          q: "The enzyme involved in crossing over during pachytene is:",
          options: ["Ligase", "Helicase", "Topoisomerase", "Recombinase"],
          answer: 3,
          why: "Recombinase mediates exchange of segments between non-sister chromatids at recombination nodules.",
        },
        {
          q: "Terminalisation of chiasmata is seen in:",
          options: ["Diakinesis", "Zygotene", "Pachytene", "Leptotene"],
          answer: 0,
          why: "Diakinesis, the last sub-stage of prophase I, is marked by terminalisation of chiasmata.",
        },
      ],
    },
  ],
};
