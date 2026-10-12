import type { LearnModule } from "../../learn";

export const animalDiversity: LearnModule = {
  slug: "animal-diversity",
  group: "Biology",
  subject: "Zoology",
  title: "Animal Kingdom & Structure",
  icon: "pets",
  blurb:
    "Basis of animal classification, the non-chordate phyla from Porifera to Hemichordata, chordate classes with their examples, animal tissues and the structural organisation of the frog.",
  objectives: [
    "Learner can classify an animal using level of organisation, symmetry, germ layers, coelom and segmentation.",
    "Learner can state the diagnostic feature and standard NCERT examples of every non-chordate phylum.",
    "Learner can separate protochordates from vertebrates and list the key features of each vertebrate class.",
    "Learner can match each epithelial, connective, muscular and neural tissue type to its location and function.",
    "Learner can describe the digestive, circulatory, respiratory, excretory, nervous and reproductive systems of the frog.",
  ],
  concepts: [
    {
      id: "basis-of-classification",
      title: "Basis of classification",
      minutes: 7,
      summary:
        "Animals are grouped by a handful of body-plan features: level of organisation, symmetry, number of germ layers, the nature of the body cavity, segmentation and the notochord.",
      examFocus:
        "Matching phyla to acoelomate/pseudocoelomate/coelomate, diploblastic vs triploblastic, radial vs bilateral symmetry, and open vs closed circulation.",
      mechanism:
        "Each feature records a step in building a more complex body. Cells working loosely together (sponges) came before cells organised into tissues (coelenterates), and tissues before organs (flatworms) and organ systems. Adding a third germ layer, the mesoderm, between ectoderm and endoderm gave material for muscles and organs, so every phylum from Platyhelminthes onwards is triploblastic. A body cavity lined fully by mesoderm (a true coelom) lets the gut and body wall move independently; where mesoderm forms only scattered pouches between ectoderm and endoderm the cavity is a pseudocoelom, and where there is no cavity the animal is acoelomate. Because these traits are structural, they let you place an unfamiliar animal in its phylum.",
      points: [
        "Levels of organisation: cellular (Porifera), tissue (Coelenterata/Cnidaria, Ctenophora), organ (Platyhelminthes), organ system (Aschelminthes onwards).",
        "Symmetry: sponges are mostly asymmetrical; coelenterates, ctenophores and adult echinoderms are radial; annelids, arthropods and most others are bilateral.",
        "Diploblastic (ectoderm + endoderm with an undifferentiated mesoglea between): coelenterates and ctenophores. Triploblastic: Platyhelminthes to Chordata.",
        "Acoelomate: Platyhelminthes. Pseudocoelomate: Aschelminthes. Coelomate: Annelida, Mollusca, Arthropoda, Echinodermata, Hemichordata, Chordata.",
        "Metameric segmentation (serial repetition of segments) is shown by earthworm (Annelida).",
        "Notochord: a mesodermally derived rod formed on the dorsal side during embryonic development; chordates have it, non-chordates do not.",
        "Digestive system is incomplete (single opening) in Platyhelminthes and complete (mouth and anus) from Aschelminthes onwards.",
        "Open circulation (blood in open spaces): arthropods and molluscs. Closed circulation (blood in vessels): annelids and chordates.",
      ],
      table: {
        title: "Body plan by phylum",
        columns: ["Phylum", "Organisation", "Symmetry", "Germ layers", "Coelom"],
        rows: [
          ["Porifera", "Cellular", "Mostly asymmetrical", "—", "—"],
          ["Coelenterata", "Tissue", "Radial", "Diploblastic", "—"],
          ["Ctenophora", "Tissue", "Radial", "Diploblastic", "—"],
          ["Platyhelminthes", "Organ", "Bilateral", "Triploblastic", "Acoelomate"],
          ["Aschelminthes", "Organ system", "Bilateral", "Triploblastic", "Pseudocoelomate"],
          ["Annelida", "Organ system", "Bilateral", "Triploblastic", "Coelomate"],
          [
            "Echinodermata",
            "Organ system",
            "Radial (adult), bilateral (larva)",
            "Triploblastic",
            "Coelomate",
          ],
        ],
      },
      pitfalls: [
        'Echinoderms are radial only as adults; their larvae are bilateral — questions that say "echinoderms are radially symmetrical" mean the adult.',
        "Aschelminthes are pseudocoelomate, not acoelomate; the flatworms are the acoelomates.",
      ],
      vignette: {
        stem: "A student examines an animal that is triploblastic and bilaterally symmetrical, has a complete gut and a body cavity not lined completely by mesoderm, and is circular in cross-section.",
        answer: "It belongs to Aschelminthes (roundworms).",
        reasoning:
          "Triploblastic + bilateral rules out sponges and coelenterates; a complete gut rules out flatworms; a pseudocoelom with a round cross-section is diagnostic of roundworms.",
      },
      highYield:
        "Acoelomate = Platyhelminthes; pseudocoelomate = Aschelminthes; diploblastic = Coelenterata and Ctenophora; open circulation = Arthropoda and Mollusca.",
      checks: [
        {
          q: "Which group is pseudocoelomate?",
          options: ["Platyhelminthes", "Annelida", "Aschelminthes", "Mollusca"],
          answer: 2,
          why: "In roundworms mesoderm lies as scattered pouches between ectoderm and endoderm, so the cavity is a pseudocoelom.",
        },
        {
          q: "Open circulatory system is found in:",
          options: [
            "Annelids and chordates",
            "Arthropods and molluscs",
            "Annelids and molluscs",
            "Chordates and arthropods",
          ],
          answer: 1,
          why: "In arthropods and molluscs blood is pumped into open spaces bathing the tissues.",
        },
      ],
    },
    {
      id: "porifera-to-aschelminthes",
      title: "Porifera to Aschelminthes",
      minutes: 8,
      summary:
        "The lower non-chordates: sponges with a water canal system, cnidarians with stinging cnidoblasts, comb jellies, flatworms and roundworms.",
      examFocus:
        "Diagnostic structures (choanocytes, cnidoblasts, comb plates, flame cells), metagenesis in Obelia, and matching common names to genera.",
      mechanism:
        "Each phylum is defined by the structure that solved its main problem. Sponges have no gut, so flagellated collar cells (choanocytes) drive water in through ostia, across the spongocoel and out through the osculum, collecting food and oxygen and removing wastes. Cnidarians catch moving prey, so they carry cnidoblasts that fire stinging threads for anchorage, defence and capture. Ctenophores swim using eight rows of ciliated comb plates. Flatworms lack a coelom and blood system, so flame cells handle osmoregulation and excretion, and parasitic forms hold on with hooks and suckers and absorb food through the body surface.",
      points: [
        "Porifera: mostly marine, asymmetrical, cellular level; water canal system (ostia → spongocoel → osculum); choanocytes line the spongocoel; intracellular digestion; skeleton of spicules or spongin fibres; hermaphrodite, internal fertilisation, indirect development. Sycon (Scypha), Spongilla (freshwater sponge), Euspongia (bath sponge).",
        "Coelenterata (Cnidaria): cnidoblasts on tentacles; tissue level, diploblastic, radial; gastro-vascular cavity with a single opening (hypostome); both extracellular and intracellular digestion; corals have a CaCO₃ skeleton.",
        "Polyp (sessile, cylindrical, e.g. Hydra, Adamsia) and medusa (umbrella-shaped, free-swimming, e.g. Aurelia); in Obelia polyps produce medusae asexually and medusae form polyps sexually — metagenesis.",
        "Cnidarian examples: Physalia (Portuguese man-of-war), Adamsia (sea anemone), Pennatula (sea-pen), Gorgonia (sea-fan), Meandrina (brain coral).",
        "Ctenophora: sea walnuts or comb jellies; exclusively marine, radial, diploblastic; eight external rows of ciliated comb plates for locomotion; bioluminescence well marked; only sexual reproduction, external fertilisation, indirect development. Pleurobrachia, Ctenoplana.",
        "Platyhelminthes: dorso-ventrally flattened, mostly endoparasites; bilateral, triploblastic, acoelomate; flame cells; Planaria shows high regeneration. Taenia (tapeworm), Fasciola (liver fluke).",
        "Aschelminthes: circular in cross-section; complete alimentary canal with muscular pharynx; sexes separate, females longer than males. Ascaris (roundworm), Wuchereria (filarial worm), Ancylostoma (hookworm).",
      ],
      table: {
        title: "Diagnostic structure and examples",
        columns: ["Phylum", "Hallmark", "Examples"],
        rows: [
          ["Porifera", "Choanocytes, water canal system", "Sycon, Spongilla, Euspongia"],
          [
            "Coelenterata",
            "Cnidoblasts, polyp/medusa",
            "Physalia, Adamsia, Pennatula, Gorgonia, Meandrina",
          ],
          ["Ctenophora", "8 rows of comb plates, bioluminescence", "Pleurobrachia, Ctenoplana"],
          ["Platyhelminthes", "Flame cells, hooks and suckers", "Taenia, Fasciola"],
          ["Aschelminthes", "Pseudocoelom, muscular pharynx", "Ascaris, Wuchereria, Ancylostoma"],
        ],
      },
      pitfalls: [
        "Sponges are hermaphrodite with internal fertilisation and indirect development — students often assume external fertilisation for such simple animals.",
        "Spongilla is the freshwater sponge; Euspongia is the bath sponge — the pair is commonly swapped.",
      ],
      vignette: {
        stem: "A marine animal that is transparent, diploblastic and radially symmetrical glows at night and moves using rows of ciliated plates; it has no stinging cells.",
        answer: "A ctenophore such as Pleurobrachia.",
        reasoning:
          "Comb plates and well-marked bioluminescence without cnidoblasts separate ctenophores from cnidarians.",
      },
      highYield:
        "Choanocytes → sponges; cnidoblasts → cnidarians; comb plates → ctenophores; flame cells → flatworms; metagenesis → Obelia.",
      checks: [
        {
          q: "Flame cells are the excretory structures of:",
          options: ["Aschelminthes", "Platyhelminthes", "Annelida", "Porifera"],
          answer: 1,
          why: "Specialised flame cells help in osmoregulation and excretion in flatworms.",
        },
        {
          q: "Which of these is the sea-fan?",
          options: ["Pennatula", "Meandrina", "Adamsia", "Gorgonia"],
          answer: 3,
          why: "Gorgonia is the sea-fan; Pennatula is the sea-pen, Meandrina brain coral and Adamsia sea anemone.",
        },
      ],
    },
    {
      id: "annelida-to-hemichordata",
      title: "Annelida to Hemichordata",
      minutes: 8,
      summary:
        "The coelomate non-chordates: segmented annelids, arthropods (the largest phylum), molluscs, echinoderms with a water vascular system, and hemichordates.",
      examFocus:
        "Respiratory and excretory organs per phylum, radula and water vascular system, living fossil Limulus, and genus-to-common-name matching.",
      mechanism:
        "A true coelom allowed larger, more active bodies, and each phylum shaped it differently. Annelids divide the body into metameres, each with its own nephridia and ganglia, so the body can move by alternating longitudinal and circular muscles. Arthropods wrap a segmented body in a chitinous exoskeleton with jointed appendages, which protects and supports but forces growth by moulting; with an open circulation they evolved tracheae, gills, book gills and book lungs to carry gases. Echinoderms are built around a water vascular system of fluid-filled canals and tube feet that serves locomotion, food capture and respiration, which is why they need no separate excretory system.",
      points: [
        "Annelida: metamerically segmented, coelomate; nephridia for osmoregulation and excretion; closed circulation; double ventral nerve cord. Nereis (aquatic, parapodia, dioecious), Pheretima (earthworm) and Hirudinaria (blood-sucking leech) are monoecious.",
        "Arthropoda: largest phylum (about two-thirds of named species); chitinous exoskeleton, jointed appendages; head, thorax, abdomen; respiration by gills, book gills, book lungs or tracheae; open circulation; excretion by Malpighian tubules; mostly oviparous.",
        "Arthropod examples: economic — Apis (honey bee), Bombyx (silkworm), Laccifer (lac insect); vectors — Anopheles, Culex, Aedes; gregarious pest — Locusta; living fossil — Limulus (king crab).",
        "Mollusca: second largest phylum; soft unsegmented body with head, muscular foot and visceral hump covered by a calcareous shell; mantle; feather-like gills; radula is a file-like rasping organ in the mouth.",
        "Mollusc examples: Pila (apple snail), Pinctada (pearl oyster), Sepia (cuttlefish), Loligo (squid), Octopus (devil fish), Aplysia (sea-hare), Dentalium (tusk shell), Chaetopleura (chiton).",
        "Echinodermata: calcareous ossicle endoskeleton, all marine, adult radial, larva bilateral; mouth ventral, anus dorsal; water vascular system; no excretory system; sexes separate, external fertilisation, free-swimming larva.",
        "Echinoderm examples: Asterias (star fish), Echinus (sea urchin), Antedon (sea lily), Cucumaria (sea cucumber), Ophiura (brittle star).",
        "Hemichordata: once a chordate sub-phylum, now a separate non-chordate phylum; body of proboscis, collar and trunk; stomochord in the collar; open circulation; gills; proboscis gland for excretion. Balanoglossus, Saccoglossus.",
      ],
      table: {
        title: "Excretory and respiratory organs",
        columns: ["Phylum", "Excretion", "Respiration", "Circulation"],
        rows: [
          ["Annelida", "Nephridia", "Body surface (earthworm)", "Closed"],
          ["Arthropoda", "Malpighian tubules", "Gills, book gills, book lungs, tracheae", "Open"],
          ["Mollusca", "—", "Feather-like gills in mantle cavity", "Open"],
          ["Echinodermata", "Absent", "Water vascular system", "—"],
          ["Hemichordata", "Proboscis gland", "Gills", "Open"],
        ],
      },
      pitfalls: [
        "Hemichordates have a stomochord, not a true notochord, so they are now placed with the non-chordates.",
        "Earthworm and leech are monoecious, but Nereis is dioecious — do not generalise one sexual pattern to all annelids.",
      ],
      vignette: {
        stem: "A marine animal has a spiny skin, tube feet, a mouth on its lower surface and no excretory organs; its free-swimming larva is bilaterally symmetrical.",
        answer: "An echinoderm such as Asterias.",
        reasoning:
          "The water vascular system with tube feet, ventral mouth, absent excretory system and bilateral larva with radial adult are hallmarks of Echinodermata.",
      },
      highYield:
        "Radula → Mollusca; water vascular system → Echinodermata; Malpighian tubules → Arthropoda; Limulus = living fossil; Balanoglossus = Hemichordata.",
      checks: [
        {
          q: "Which animal is a living fossil?",
          options: ["Limulus", "Locusta", "Laccifer", "Loligo"],
          answer: 0,
          why: "Limulus, the king crab, is the arthropod NCERT cites as a living fossil.",
        },
        {
          q: "The excretory organ of Balanoglossus is the:",
          options: ["Nephridium", "Flame cell", "Proboscis gland", "Malpighian tubule"],
          answer: 2,
          why: "Hemichordates excrete through the proboscis gland.",
        },
      ],
    },
    {
      id: "chordate-features-and-fishes",
      title: "Chordate features, protochordates and fishes",
      minutes: 8,
      summary:
        "All chordates share a notochord, dorsal hollow nerve cord and pharyngeal gill slits; protochordates keep the notochord, vertebrates replace it with a vertebral column.",
      examFocus:
        "Chordate vs non-chordate contrasts, Urochordata vs Cephalochordata notochord, cyclostome features, and Chondrichthyes vs Osteichthyes.",
      mechanism:
        "The three fundamental chordate characters are laid down in the embryo: a notochord for support, a nerve cord dorsal to it that is hollow, and paired slits in the pharynx. Non-chordates instead have a solid, double, ventral nerve cord and a dorsal heart, so chordates are recognised by their ventral heart and dorsal nervous axis. In vertebrates the notochord is replaced in the adult by a vertebral column, which is why all vertebrates are chordates but not all chordates are vertebrates. Among fishes, the presence or absence of a swim (air) bladder decides how they stay afloat: cartilaginous fishes lack one and must swim constantly, while bony fishes use it for buoyancy.",
      points: [
        "Chordates: notochord, dorsal hollow single nerve cord, paired pharyngeal gill slits, ventral heart, post-anal tail present. Non-chordates: no notochord, ventral solid double nerve cord, dorsal heart.",
        "Urochordata: notochord only in the larval tail (Ascidia, Salpa, Doliolum). Cephalochordata: notochord from head to tail, persistent throughout life (Branchiostoma, Amphioxus or lancelet).",
        "Cyclostomata (Agnatha): ectoparasites on some fishes; 6–15 pairs of gill slits; circular sucking mouth without jaws; no scales or paired fins; cartilaginous cranium and vertebral column; migrate to fresh water to spawn and die. Petromyzon (lamprey), Myxine (hagfish).",
        "Chondrichthyes: cartilaginous endoskeleton, ventral mouth, persistent notochord, gill slits without operculum, placoid scales, teeth are modified placoid scales; no air bladder; claspers on male pelvic fins; internal fertilisation; many viviparous.",
        "Chondrichthyes examples: Scoliodon (dog fish), Pristis (saw fish), Carcharodon (great white shark), Trygon (sting ray, poison sting); Torpedo has electric organs.",
        "Osteichthyes: bony endoskeleton, mostly terminal mouth, four pairs of gills covered by an operculum, cycloid/ctenoid scales, air bladder for buoyancy, mostly external fertilisation, oviparous, direct development.",
        "Bony fish examples: marine — Exocoetus (flying fish), Hippocampus (sea horse); freshwater — Labeo (rohu), Catla (katla), Clarias (magur); aquarium — Betta (fighting fish), Pterophyllum (angel fish).",
        "All fishes have a two-chambered heart (one auricle, one ventricle) and are cold-blooded (poikilothermous).",
      ],
      table: {
        title: "Cartilaginous vs bony fishes",
        columns: ["Feature", "Chondrichthyes", "Osteichthyes"],
        rows: [
          ["Endoskeleton", "Cartilaginous", "Bony"],
          ["Mouth", "Ventral", "Mostly terminal"],
          ["Gill cover", "No operculum", "Operculum present"],
          ["Scales", "Placoid", "Cycloid/ctenoid"],
          ["Air bladder", "Absent — must keep swimming", "Present — buoyancy"],
          ["Fertilisation", "Internal (claspers)", "Mostly external"],
        ],
      },
      pitfalls: [
        "Not every chordate is a vertebrate — Ascidia and Branchiostoma are chordates without a vertebral column.",
        "In Urochordata the notochord is only in the larval tail; it is the Cephalochordates whose notochord runs head to tail for life.",
      ],
      vignette: {
        stem: "A shark-like fish in an aquarium has gill slits without a cover, tooth-like scales on its skin and sinks whenever it stops swimming.",
        answer: "A cartilaginous fish (Chondrichthyes), e.g. Scoliodon.",
        reasoning:
          "Uncovered gill slits and placoid scales are cartilaginous-fish features; with no air bladder it must swim constantly to avoid sinking.",
      },
      highYield:
        "All vertebrates are chordates but not all chordates are vertebrates. Urochordate notochord = larval tail only; Cephalochordate = head to tail, lifelong.",
      checks: [
        {
          q: "Jawless vertebrates with a circular sucking mouth belong to:",
          options: ["Chondrichthyes", "Cephalochordata", "Cyclostomata", "Urochordata"],
          answer: 2,
          why: "Cyclostomes such as Petromyzon and Myxine are agnathans with a sucking circular mouth.",
        },
        {
          q: "Which fish has an air bladder?",
          options: ["Labeo", "Scoliodon", "Pristis", "Trygon"],
          answer: 0,
          why: "Labeo (rohu) is a bony fish; the others are cartilaginous and lack an air bladder.",
        },
      ],
    },
    {
      id: "tetrapod-classes",
      title: "Amphibia, Reptilia, Aves and Mammalia",
      minutes: 8,
      summary:
        "The four tetrapod classes differ in skin covering, heart chambers, body temperature control and mode of reproduction.",
      examFocus:
        "Heart chambers (three in amphibians and most reptiles, four in crocodiles, birds, mammals), warm vs cold blooded, unusual examples (Ichthyophis, Ornithorhynchus), and genus names.",
      mechanism:
        "Moving onto land and becoming warm-blooded both demanded better oxygen delivery and water conservation, and the class features follow from that. Amphibians still depend on water for breeding and use moist skin for gas exchange, so their skin is scale-less and glandular. Reptiles conquered dry land with dry, cornified skin bearing scales or scutes and internal fertilisation. Birds and mammals keep a constant body temperature (homoiothermy), which needs a fully separated four-chambered heart so oxygenated and deoxygenated blood never mix; crocodiles share the four chambers even though they are cold-blooded. Flight in birds explains pneumatic (hollow, air-filled) long bones and the air sacs that supplement lungs.",
      points: [
        "Amphibia: two pairs of limbs, moist scale-less skin, eyelids, tympanum as ear, cloaca, respiration by gills, lungs and skin, three-chambered heart, cold-blooded, external fertilisation, indirect development. Bufo (toad), Rana (frog), Hyla (tree frog), Salamandra (salamander), Ichthyophis (limbless amphibian).",
        "Reptilia: dry cornified skin with epidermal scales or scutes; no external ear opening, tympanum represents ear; heart usually three-chambered but four-chambered in crocodiles; cold-blooded; snakes and lizards shed scales as skin cast; internal fertilisation, oviparous, direct development.",
        "Reptile examples: Chelone (turtle), Testudo (tortoise), Chameleon (tree lizard), Calotes (garden lizard), Crocodilus, Alligator, Hemidactylus (wall lizard); poisonous snakes Naja (cobra), Bangarus (krait), Vipera (viper).",
        "Aves: feathers, beak, forelimbs modified into wings, scaly hind limbs; skin dry without glands except the oil gland at the base of the tail; pneumatic long bones; crop and gizzard; four-chambered heart; warm-blooded; air sacs supplement lungs; oviparous, direct development.",
        "Bird examples: Corvus (crow), Columba (pigeon), Psittacula (parrot), Struthio (ostrich, flightless), Pavo (peacock), Aptenodytes (penguin), Neophron (vulture).",
        "Mammalia: mammary glands, hair, external ears (pinnae), different types of teeth, four-chambered heart, warm-blooded, viviparous with few exceptions; Ornithorhynchus (platypus) is oviparous.",
        "Mammal examples: Macropus (kangaroo), Pteropus (flying fox), Camelus, Macaca (monkey), Rattus, Canis, Felis, Elephas, Equus, Delphinus (common dolphin), Balaenoptera (blue whale), Panthera tigris (tiger), Panthera leo (lion).",
      ],
      table: {
        title: "Tetrapod comparison",
        columns: ["Class", "Skin", "Heart", "Temperature", "Fertilisation"],
        rows: [
          ["Amphibia", "Moist, no scales", "3 chambers", "Cold-blooded", "External"],
          ["Reptilia", "Dry, scales/scutes", "3 (4 in crocodiles)", "Cold-blooded", "Internal"],
          ["Aves", "Feathers, only oil gland", "4 chambers", "Warm-blooded", "Internal"],
          ["Mammalia", "Hair, glands", "4 chambers", "Warm-blooded", "Internal"],
        ],
      },
      pitfalls: [
        "Ichthyophis is a limbless amphibian, not a snake or fish — the name misleads.",
        "Crocodiles have a four-chambered heart but are still poikilothermous; heart chambers alone do not make an animal warm-blooded.",
      ],
      vignette: {
        stem: "A furry, egg-laying animal with a duck-like bill feeds its young on milk.",
        answer: "Ornithorhynchus (platypus), a mammal.",
        reasoning:
          "Hair and mammary glands make it a mammal; it is the NCERT example of an oviparous mammal.",
      },
      highYield:
        "Four-chambered heart: crocodiles, birds, mammals. Oviparous mammal: Ornithorhynchus. Limbless amphibian: Ichthyophis. Only skin gland in birds: oil gland at the tail base.",
      checks: [
        {
          q: "Which reptile has a four-chambered heart?",
          options: ["Calotes", "Chelone", "Crocodilus", "Hemidactylus"],
          answer: 2,
          why: "Reptiles usually have a three-chambered heart; crocodiles are the exception with four chambers.",
        },
        {
          q: "Pneumatic bones and air sacs are features of:",
          options: ["Reptilia", "Mammalia", "Amphibia", "Aves"],
          answer: 3,
          why: "Bird long bones are hollow with air cavities and air sacs supplement the lungs, both suiting flight.",
        },
      ],
    },
    {
      id: "epithelial-tissue",
      title: "Epithelial tissue and cell junctions",
      minutes: 6,
      summary:
        "Epithelium covers surfaces and lines cavities; it is simple (one layer) or compound (many layers) and its cells are bound by tight, adhering and gap junctions.",
      examFocus:
        "Matching each epithelium to its location (squamous — air sacs; cuboidal — nephron tubules; ciliated — fallopian tube), compound epithelium function, and the three cell junctions.",
      mechanism:
        "An epithelium's shape tracks its job. Where substances must pass quickly — air sacs of lungs, walls of blood vessels — a single layer of flat squamous cells keeps the barrier thin for diffusion. Where secretion and absorption are heavy, taller cuboidal or columnar cells hold more cytoplasm, and microvilli on their free surface increase absorptive area, as in the proximal convoluted tubule and intestine. Ciliated cells move mucus or eggs along tubes. Surfaces exposed to wear, such as dry skin and the buccal cavity, need several cell layers, so compound epithelium is protective rather than absorptive. Cells are tied together by junctions that seal (tight), cement (adhering) or communicate (gap).",
      points: [
        "Simple squamous: single layer of flat cells with irregular borders; walls of blood vessels and air sacs of lungs; forms a diffusion boundary.",
        "Simple cuboidal: cube-like cells; ducts of glands and tubular parts of nephrons; secretion and absorption; PCT cells bear microvilli.",
        "Simple columnar: tall slender cells with basal nuclei; lining of stomach and intestine; microvilli on free surface in the intestine.",
        "Ciliated epithelium: cuboidal or columnar cells with cilia; inner surface of bronchioles and fallopian tubes; moves particles or mucus in one direction.",
        "Glandular epithelium: unicellular (goblet cells of the alimentary canal) or multicellular (salivary gland); exocrine glands secrete through ducts, endocrine glands release hormones directly into the fluid bathing the gland.",
        "Compound epithelium: more than one layer; limited role in secretion and absorption; protects against chemical and mechanical stress; covers the dry surface of skin, moist surface of buccal cavity and pharynx, and lines ducts of salivary glands and pancreatic ducts.",
        "Cell junctions: tight junctions stop substances leaking across a tissue; adhering junctions cement neighbouring cells; gap junctions connect cytoplasm of adjoining cells for rapid transfer of ions, small molecules and sometimes big molecules.",
      ],
      table: {
        title: "Epithelium, location and job",
        columns: ["Type", "Location", "Function"],
        rows: [
          ["Simple squamous", "Blood vessel walls, lung air sacs", "Diffusion boundary"],
          ["Simple cuboidal", "Gland ducts, nephron tubules", "Secretion, absorption"],
          ["Simple columnar", "Stomach and intestine lining", "Secretion, absorption"],
          ["Ciliated", "Bronchioles, fallopian tubes", "Move particles/mucus"],
          ["Compound", "Skin, buccal cavity, pharynx, salivary and pancreatic ducts", "Protection"],
        ],
      },
      pitfalls: [
        "The lining of salivary and pancreatic ducts is compound epithelium in NCERT, while the ducts of glands in general are listed under cuboidal — read the exact location asked.",
        "Gap junctions are for communication, tight junctions for sealing — do not swap their functions.",
      ],
      vignette: {
        stem: "A histology slide shows a single layer of cube-shaped cells with a brush border lining a kidney tubule close to Bowman's capsule.",
        answer: "Simple cuboidal epithelium with microvilli, from the proximal convoluted tubule.",
        reasoning:
          "Cuboidal cells line nephron tubules, and the PCT's microvilli enlarge the surface for reabsorption.",
      },
      highYield:
        "Squamous — air sacs and vessels; cuboidal — nephron tubules; columnar — gut; ciliated — bronchioles and fallopian tubes; compound — protection.",
      checks: [
        {
          q: "Which junction allows ions and small molecules to pass between adjacent cells?",
          options: ["Tight junction", "Adhering junction", "Gap junction", "Synaptic junction"],
          answer: 2,
          why: "Gap junctions connect the cytoplasm of adjoining cells for rapid transfer.",
        },
        {
          q: "Inner surface of fallopian tubes is lined by:",
          options: [
            "Ciliated epithelium",
            "Compound epithelium",
            "Squamous epithelium",
            "Keratinised epithelium",
          ],
          answer: 0,
          why: "Cilia move the ovum and fluids along the fallopian tube.",
        },
      ],
    },
    {
      id: "connective-muscle-neural",
      title: "Connective, muscular and neural tissue",
      minutes: 8,
      summary:
        "Connective tissue links and supports (loose, dense, specialised), muscle contracts (skeletal, smooth, cardiac) and neural tissue carries signals.",
      examFocus:
        "Tendon vs ligament, areolar vs adipose, cartilage vs bone cells, the one fluid connective tissue (blood), and features of the three muscle types.",
      mechanism:
        "Connective tissue is defined by cells scattered in an extracellular matrix that the cells themselves make; except in blood, they secrete fibres of collagen or elastin that give strength and elasticity. How tightly those fibres pack decides the type: loosely arranged in areolar tissue beneath skin, parallel bundles in tendons and ligaments that pull in one direction, and multi-directional in the skin's dense irregular layer. Cartilage and bone are hardened matrices with their cells trapped in lacunae. Muscle is classified by striations and control: skeletal muscle is striated and voluntary, smooth muscle is non-striated and involuntary, and cardiac muscle is striated yet involuntary, with cell junctions (intercalated discs) that let the heart contract as a unit.",
      points: [
        "Loose connective: areolar tissue (beneath skin; fibroblasts, macrophages, mast cells) and adipose tissue (stores fat, beneath skin).",
        "Dense regular: tendons attach skeletal muscle to bone; ligaments attach bone to bone. Dense irregular: skin.",
        "Cartilage: chondrocytes in matrix; found at the tip of the nose, outer ear joints, between adjacent bones of the vertebral column, limbs and hands in adults.",
        "Bone: hard, non-pliable matrix rich in calcium salts and collagen; osteocytes in lacunae; bone marrow in some bones is the site of blood cell production.",
        "Blood is a fluid connective tissue containing plasma, RBCs, WBCs and platelets.",
        "Skeletal muscle: striated, voluntary (e.g. biceps). Smooth muscle: fusiform, no striations, involuntary; walls of blood vessels, stomach and intestine. Cardiac muscle: branched, striated, involuntary, with cell junctions that let cells contract as a unit.",
        "Neural tissue: neurons are the excitable unit; neuroglial cells protect and support neurons and make up more than half the volume of neural tissue.",
      ],
      table: {
        title: "Muscle types",
        columns: ["Feature", "Skeletal", "Smooth", "Cardiac"],
        rows: [
          ["Striations", "Present", "Absent", "Present"],
          ["Control", "Voluntary", "Involuntary", "Involuntary"],
          ["Cell shape", "Long, cylindrical, bundled", "Fusiform", "Branched"],
          ["Location", "Attached to bones", "Vessel walls, stomach, intestine", "Heart wall"],
        ],
      },
      pitfalls: [
        "Tendon = muscle to bone; ligament = bone to bone. Reversing them is the commonest error.",
        "Cardiac muscle is striated but involuntary — do not use striation as a proxy for voluntary control.",
      ],
      vignette: {
        stem: "A footballer tears the structure joining his calf muscle to the heel bone.",
        answer: "A tendon (dense regular connective tissue).",
        reasoning:
          "Tendons attach skeletal muscle to bone; their collagen fibres run in parallel bundles to transmit pull in one direction.",
      },
      highYield:
        "Except blood, all connective tissue cells secrete collagen or elastin. Neuroglia make up more than half the volume of neural tissue.",
      checks: [
        {
          q: "Which connective tissue is fluid?",
          options: ["Cartilage", "Blood", "Areolar tissue", "Adipose tissue"],
          answer: 1,
          why: "Blood is the fluid connective tissue.",
        },
        {
          q: "Bone joined to bone by:",
          options: ["Ligament", "Tendon", "Areolar tissue", "Cartilage only"],
          answer: 0,
          why: "Ligaments are dense regular connective tissue connecting bones.",
        },
      ],
    },
    {
      id: "frog",
      title: "Frog: structural organisation",
      minutes: 8,
      summary:
        "The common Indian frog (Rana tigrina) shows the vertebrate organ systems in amphibian form: skin and lung breathing, a three-chambered heart, ureotelic kidneys and external fertilisation.",
      examFocus:
        "Respiration in water vs on land and during aestivation, heart chambers and portal systems, urinogenital duct in males, brain divisions and cranial nerves, sexual dimorphism.",
      mechanism:
        "The frog lives in two worlds, and its organs reflect that. Its moist, mucus-covered skin is thin and well supplied with blood, so it can absorb water (frogs do not drink) and serve as the main respiratory surface in water and during aestivation and hibernation; on land the buccal cavity and lungs join in. Being cold-blooded, it avoids extremes by summer sleep (aestivation) and winter sleep (hibernation). Its three-chambered heart (two atria, one ventricle) is fed by a sinus venosus and leads out through a conus arteriosus, with hepatic and renal portal systems carrying blood through the liver and kidneys. It excretes urea and breeds in water, laying many eggs fertilised externally that hatch into tadpoles and metamorphose into adults.",
      points: [
        "Body of head and trunk; no neck and tail. Eyes have a nictitating membrane; tympanum receives sound. Forelimbs have four digits; hind limbs five, webbed for swimming.",
        "Sexual dimorphism: males have vocal sacs and a copulatory pad on the first digit of the forelimb.",
        "Digestive system: short alimentary canal (carnivore); bilobed tongue; liver secretes bile stored in the gall bladder; pancreas produces pancreatic juice.",
        "Respiration: through skin in water (cutaneous); through skin, buccal cavity and lungs on land; only through skin during aestivation and hibernation.",
        "Circulation: closed; heart has three chambers (two atria, one ventricle) with sinus venosus and conus arteriosus; hepatic portal and renal portal systems; RBCs are nucleated; a lymphatic system is present.",
        "Excretion: a pair of kidneys; ureotelic. In males the ureters act as urinogenital ducts; the cloaca receives faeces, urine and gametes.",
        "Nervous system: brain in a cranium, divided into forebrain (olfactory lobes, cerebral hemispheres, diencephalon), midbrain (pair of optic lobes) and hindbrain (cerebellum, medulla oblongata); 10 pairs of cranial nerves.",
        "Reproduction: testes attached to the kidneys by mesorchium, with 10–12 vasa efferentia; female lays 2500–3000 ova at a time; external fertilisation in water; tadpole larva metamorphoses into adult.",
      ],
      table: {
        title: "Where the frog breathes",
        columns: ["Situation", "Respiratory surface"],
        rows: [
          ["In water", "Skin (cutaneous respiration)"],
          ["On land", "Skin, buccal cavity and lungs"],
          ["Aestivation / hibernation", "Skin only"],
        ],
      },
      pitfalls: [
        "Frogs do not drink water; they absorb it through the skin.",
        "Frog is ureotelic, not uricotelic or ammonotelic in the adult — NCERT lists the adult frog as ureotelic.",
      ],
      vignette: {
        stem: "During a hot, dry summer a frog buries itself in mud for weeks without using its lungs.",
        answer: "It is aestivating and exchanges gases through its moist skin.",
        reasoning:
          "Being poikilothermous, the frog escapes heat by aestivation, when cutaneous respiration alone meets its low oxygen need.",
      },
      highYield:
        "Frog: three-chambered heart with sinus venosus and conus arteriosus, hepatic and renal portal systems, ureotelic, 10 pairs of cranial nerves, male copulatory pad on first digit.",
      checks: [
        {
          q: "In male frogs, the urinogenital duct is the:",
          options: ["Ureter", "Vasa efferentia", "Bidder's canal only", "Oviduct"],
          answer: 0,
          why: "In males the ureters carry both urine and sperms to the cloaca.",
        },
        {
          q: "Number of cranial nerves in frog:",
          options: ["12 pairs", "8 pairs", "10 pairs", "11 pairs"],
          answer: 2,
          why: "The frog has 10 pairs of cranial nerves arising from the brain.",
        },
      ],
    },
  ],
};
