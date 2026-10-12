import type { LearnModule } from "../../learn";

export const ecology: LearnModule = {
  slug: "ecology",
  group: "Biology",
  subject: "Botany",
  title: "Ecology",
  icon: "forest",
  blurb:
    "Population attributes and growth models, population interactions, ecosystem structure and productivity, decomposition and energy flow, ecological pyramids, biodiversity patterns and importance, and the loss and conservation of biodiversity.",
  objectives: [
    "Learner can calculate birth and death rates, read age pyramids and apply the exponential and logistic growth equations.",
    "Learner can classify any population interaction by its +/−/0 effects and recall the NCERT example for each.",
    "Learner can distinguish GPP, NPP and secondary productivity and describe the steps and controls of decomposition.",
    "Learner can apply the 10 per cent law and explain when pyramids of number and biomass are inverted.",
    "Learner can explain latitudinal and species–area patterns of biodiversity, the causes of its loss, and in-situ versus ex-situ conservation.",
  ],
  concepts: [
    {
      id: "population-attributes",
      title: "Population attributes",
      minutes: 6,
      summary:
        "A population has properties that an individual does not: density, birth rate, death rate, sex ratio and age distribution.",
      examFocus:
        "Per capita birth and death rate calculations, the shape of expanding, stable and declining age pyramids, the factors that change density, and when biomass or cover is better than numbers.",
      mechanism:
        "An individual is born once and dies once, so 'birth rate' and 'death rate' only make sense for a group; that is why these are population attributes. Expressing them per capita (per individual per unit time) lets populations of different sizes be compared. Density changes only through four processes: natality and immigration add individuals, while mortality and emigration remove them, so the net change is the balance of these inputs and outputs. The age structure tells us the future: a population with a broad base of pre-reproductive individuals will grow, one with roughly equal classes is stable, and one with a narrow base will shrink.",
      points: [
        "Birth rate and death rate are expressed per capita: number of births or deaths divided by the number of individuals over a given period.",
        "Example of death rate: if 4 of 40 fruit flies die in a week, the death rate is 4/40 = 0.1 individuals per fruit fly per week.",
        "Sex ratio is another attribute, e.g. 60% females and 40% males.",
        "Age pyramids: expanding (triangular, broad base), stable (bell-shaped), declining (urn-shaped, narrow base).",
        "Density increases by natality (B) and immigration (I) and decreases by mortality (D) and emigration (E).",
        "Numbers are not always the best measure: one large banyan tree versus 200 Parthenium plants is better compared by percent cover or biomass.",
        "Some populations are counted indirectly: tiger census in national parks uses pug marks and fecal pellets.",
      ],
      formulae: [
        {
          label: "Change in density",
          expr: "Nₜ₊₁ = Nₜ + [(B + I) − (D + E)]",
          note: "B births, I immigrants, D deaths, E emigrants in the interval",
        },
      ],
      table: {
        title: "Age pyramids",
        columns: ["Shape", "Population trend", "Base (pre-reproductive)"],
        rows: [
          ["Triangular", "Expanding", "Very broad"],
          ["Bell-shaped", "Stable", "About equal to reproductive group"],
          ["Urn-shaped", "Declining", "Narrower than reproductive group"],
        ],
      },
      pitfalls: [
        "Per capita birth rate is divided by the original population, not by the population after the births are added.",
        "Immigration raises density; emigration lowers it. Students reverse their signs in the density equation.",
      ],
      vignette: {
        stem: "A pond had 30 lotus plants last year. Through reproduction 9 new plants were added this year.",
        answer: "Birth rate = 0.3 offspring per lotus per year.",
        reasoning: "Per capita birth rate = new individuals / original population = 9/30 = 0.3.",
      },
      highYield:
        "Density ↑ by natality and immigration, ↓ by mortality and emigration; expanding = triangular, stable = bell, declining = urn.",
      checks: [
        {
          q: "An urn-shaped age pyramid indicates a population that is:",
          options: ["Expanding", "Stable", "Declining", "At carrying capacity and growing"],
          answer: 2,
          why: "A narrow pre-reproductive base means fewer future breeders, so the population will decline.",
        },
        {
          q: "Of 200 individuals of a species, 20 die in a month. The death rate is:",
          options: [
            "0.1 per individual per month",
            "10 per individual per month",
            "20 per month per individual",
            "0.2 per individual per month",
          ],
          answer: 0,
          why: "Death rate = deaths / original population = 20/200 = 0.1 individuals per individual per month.",
        },
      ],
    },
    {
      id: "population-growth",
      title: "Population growth models",
      minutes: 7,
      summary:
        "With unlimited resources a population grows exponentially (J-shaped curve); with limited resources growth slows and levels off at the carrying capacity (logistic, sigmoid curve).",
      examFocus:
        "Identifying the J and S curves, the meaning of r and K, writing the two differential equations, and why the logistic model is more realistic.",
      mechanism:
        "If every individual has all the food and space it needs, each one adds offspring at the same per capita rate, so the more individuals there are, the faster numbers rise; growth rate is proportional to N, which gives the exponential J curve. Real habitats have limited resources, so as N approaches the number the habitat can support (K), competition increases and the per capita growth falls. The logistic term (K − N)/K captures this: when N is small it is close to 1 and growth is almost exponential, and when N reaches K it becomes zero and growth stops. This explains the lag, acceleration, deceleration and asymptote phases of the sigmoid curve.",
      points: [
        "Exponential growth: dN/dt = rN; integrated form Nₜ = N₀eʳᵗ; plotted against time it gives a J-shaped curve.",
        "r is the intrinsic rate of natural increase; for the Norway rat r is 0.015 and for the flour beetle 0.12; for the human population of India in 1981 it was 0.0205.",
        "Logistic (Verhulst–Pearl) growth: dN/dt = rN(K − N)/K; plotted against time it gives a sigmoid curve.",
        "K is the carrying capacity: the maximum population the habitat's resources can sustain.",
        "Phases of the logistic curve: lag phase, acceleration, deceleration and asymptote (when N = K).",
        "The logistic model is considered more realistic because no population has unlimited resources for long.",
        "Life-history traits evolve to maximise reproductive fitness: Pacific salmon and bamboo breed only once in their lifetime, most birds and mammals breed many times.",
      ],
      formulae: [
        {
          label: "Exponential growth",
          expr: "dN/dt = rN",
          note: "unlimited resources, J-shaped curve",
        },
        {
          label: "Integrated exponential form",
          expr: "Nₜ = N₀eʳᵗ",
          note: "e = 2.71828, base of natural logarithms",
        },
        {
          label: "Logistic growth",
          expr: "dN/dt = rN(K − N)/K",
          note: "limited resources, sigmoid curve; K = carrying capacity",
        },
      ],
      table: {
        title: "Exponential vs logistic growth",
        columns: ["Feature", "Exponential", "Logistic"],
        rows: [
          ["Resources", "Unlimited", "Limited"],
          ["Curve", "J-shaped", "Sigmoid (S-shaped)"],
          ["Carrying capacity", "Not considered", "Growth stops at K"],
          ["Realism", "Short periods only", "More realistic"],
        ],
      },
      pitfalls: [
        "At N = K the growth rate dN/dt is zero, but the population is not zero; it is maximal and stable.",
        "r is a per capita rate, not the total number added per unit time.",
      ],
      vignette: {
        stem: "A population of yeast in a closed flask increases slowly at first, then rapidly, then levels off at about the same number for several days.",
        answer: "Logistic (sigmoid) growth reaching the carrying capacity K.",
        reasoning:
          "Limited nutrients in the flask mean growth slows as N approaches K; the plateau is the asymptote phase where dN/dt = 0.",
      },
      highYield:
        "Exponential dN/dt = rN (J curve); logistic dN/dt = rN(K − N)/K (S curve); K = carrying capacity.",
      checks: [
        {
          q: "In the logistic equation, the growth rate becomes zero when:",
          options: ["N = 0 only", "N = K", "r = K", "N = K/2"],
          answer: 1,
          why: "When N = K the term (K − N)/K becomes zero, so dN/dt = 0 and the curve reaches its asymptote.",
        },
        {
          q: "A J-shaped growth curve is obtained when:",
          options: [
            "Resources are limited",
            "The population has reached carrying capacity",
            "Emigration exceeds immigration",
            "Resources are unlimited",
          ],
          answer: 3,
          why: "Unlimited resources allow full per capita growth at all densities, giving exponential, J-shaped growth.",
        },
      ],
    },
    {
      id: "population-interactions",
      title: "Population interactions",
      minutes: 8,
      summary:
        "Interactions between species are classed by whether each partner benefits (+), is harmed (−) or is unaffected (0).",
      examFocus:
        "Matching NCERT examples to mutualism, commensalism, parasitism, predation, competition and amensalism; Gause's principle, resource partitioning, and the fig–wasp and Ophrys–bee examples.",
      mechanism:
        "Each interaction is defined by its net effect on the two populations, which is why a sign pair is the clearest way to remember them. Predators gain energy at the prey's cost, but this also keeps prey populations in check, which is why introducing a natural enemy can control an invasive species. When two species use the same limiting resource, the better competitor can push the other out, which Gause called competitive exclusion; coexistence becomes possible when they divide the resource, for example by feeding at different times or in different parts of a tree. Plants cannot run away, so many defend themselves chemically; and parasites, living on one host, tend to evolve to be host-specific and to reduce non-essential organs.",
      points: [
        "Predation: the prickly pear cactus introduced into Australia was brought under control by a cactus-feeding predator (a moth) from its native area.",
        "Plant defences: Calotropis produces highly poisonous cardiac glycosides, so cattle and goats do not browse it; the Monarch butterfly is distasteful to birds because of a chemical acquired by its caterpillar from a poisonous weed.",
        "Competition: the Abingdon tortoise in the Galapagos became extinct within a decade after goats were introduced; flamingoes and resident fishes compete for zooplankton in South American lakes.",
        "Connell showed that on the rocky sea coasts of Scotland the larger barnacle Balanus excludes the smaller Chthamalus from the intertidal area.",
        "Resource partitioning: MacArthur showed five closely related warbler species coexist by foraging differently on the same tree.",
        "Parasitism: Cuscuta grows on hedge plants and has lost chlorophyll and leaves; the cuckoo (koel) lays eggs in the crow's nest (brood parasitism); the human liver fluke needs two intermediate hosts, a snail and a fish.",
        "Commensalism: orchid as an epiphyte on a mango branch, barnacles on a whale, cattle egret with grazing cattle, sea anemone and clown fish.",
        "Mutualism: lichens (fungus + photosynthesising algae or cyanobacteria), mycorrhizae, fig and its species-specific pollinator wasp, and Mediterranean orchid Ophrys, whose petal resembles a female bee (sexual deceit).",
      ],
      table: {
        title: "Interaction sign table",
        columns: ["Interaction", "Species A", "Species B", "Example"],
        rows: [
          ["Mutualism", "+", "+", "Lichen; fig and wasp"],
          ["Competition", "−", "−", "Flamingoes and fishes for zooplankton"],
          ["Predation", "+", "−", "Tiger and deer"],
          ["Parasitism", "+", "−", "Cuscuta on hedge plants"],
          ["Commensalism", "+", "0", "Orchid on mango branch"],
          ["Amensalism", "−", "0", "One species harmed, other unaffected"],
        ],
      },
      pitfalls: [
        "Orchid on a mango branch is commensalism, not parasitism: the orchid takes no food from the mango.",
        "Competition can occur between totally unrelated species (flamingoes and fishes), and even when resources are not limiting, through interference.",
      ],
      vignette: {
        stem: "A plant species is introduced to a new island and spreads uncontrollably. Botanists then bring in an insect that feeds on it in its native land, and its spread is checked.",
        answer:
          "Biological control by introducing a predator (herbivore), as with prickly pear in Australia.",
        reasoning:
          "In the new land the plant had escaped the predators that controlled it at home; restoring a predator brings back that check on its population.",
      },
      highYield:
        "Mutualism +/+, competition −/−, predation and parasitism +/−, commensalism +/0, amensalism −/0.",
      checks: [
        {
          q: "Cattle egret foraging close to grazing cattle is an example of:",
          options: ["Mutualism", "Commensalism", "Parasitism", "Competition"],
          answer: 1,
          why: "The egret catches insects stirred up by the cattle and benefits; the cattle are neither harmed nor helped.",
        },
        {
          q: "Sexual deceit by the Mediterranean orchid Ophrys involves:",
          options: [
            "A petal that resembles a female bee and attracts male bees",
            "Releasing toxic glycosides to repel bees",
            "Laying eggs in a bee's nest",
            "Producing nectar only at night for moths",
          ],
          answer: 0,
          why: "The male bee 'pseudocopulates' with the bee-like petal and gets dusted with pollen, transferring it to the next flower.",
        },
      ],
    },
    {
      id: "ecosystem-productivity",
      title: "Ecosystem structure and productivity",
      minutes: 7,
      summary:
        "An ecosystem is a functional unit where biotic and abiotic components interact; its producers convert solar energy into biomass, measured as productivity.",
      examFocus:
        "GPP − R = NPP, units of productivity, secondary productivity, stratification, and the global and oceanic NPP figures.",
      mechanism:
        "Plants fix energy by photosynthesis, but they must also spend part of it on their own respiration to stay alive. Only what remains after respiration is added as new plant body and is available to herbivores and decomposers, so NPP = GPP − R is the energy that actually enters the food web. Productivity is a rate, so it is measured per unit area per unit time, in weight or energy terms. It varies widely because it depends on the plant species, sunlight, temperature, moisture and nutrients, which is why the open ocean, despite its huge area, has a lower total productivity than one might expect.",
      points: [
        "Components: biotic (producers, consumers, decomposers) and abiotic (light, water, nutrients, soil, temperature).",
        "Stratification is the vertical distribution of species in different layers: trees at the top, shrubs below, herbs and grasses at the bottom.",
        "Primary production is the amount of biomass or organic matter produced per unit area over a time period by plants during photosynthesis.",
        "Units: weight (g m⁻²) or energy (kcal m⁻²); productivity as g m⁻² yr⁻¹ or kcal m⁻² yr⁻¹.",
        "GPP is the rate of production of organic matter during photosynthesis; NPP = GPP − R (respiration losses).",
        "Secondary productivity is the rate of formation of new organic matter by consumers.",
        "Annual NPP of the whole biosphere is about 170 billion tons (dry weight); oceans contribute only about 55 billion tons despite covering about 70% of the surface.",
      ],
      formulae: [
        {
          label: "Net primary productivity",
          expr: "NPP = GPP − R",
          note: "R = respiration losses of the producers",
        },
      ],
      table: {
        title: "Productivity terms",
        columns: ["Term", "Meaning"],
        rows: [
          ["Primary production", "Biomass made by plants per unit area over a period"],
          ["Gross primary productivity", "Rate of organic matter production in photosynthesis"],
          ["Net primary productivity", "GPP minus respiration; available to heterotrophs"],
          ["Secondary productivity", "Rate of new organic matter formation by consumers"],
        ],
      },
      pitfalls: [
        "Productivity is a rate (per unit time); production or standing crop is an amount at a point in time.",
        "Oceans cover about 70% of the surface but give only about 55 of the 170 billion tons of annual NPP.",
      ],
      vignette: {
        stem: "A grassland plot fixes 2000 kcal m⁻² yr⁻¹ by photosynthesis, and the plants use 800 kcal m⁻² yr⁻¹ in respiration.",
        answer: "NPP = 1200 kcal m⁻² yr⁻¹.",
        reasoning:
          "NPP = GPP − R = 2000 − 800 = 1200 kcal m⁻² yr⁻¹; this is the energy available to consumers and decomposers.",
      },
      highYield:
        "NPP = GPP − R; biosphere NPP about 170 billion t yr⁻¹, oceans only about 55 billion t.",
      checks: [
        {
          q: "Net primary productivity is:",
          options: [
            "GPP plus respiration loss",
            "Rate of formation of new organic matter by consumers",
            "GPP minus respiration loss",
            "Total biomass present at a given time",
          ],
          answer: 2,
          why: "NPP is what remains of gross production after the plants' own respiration.",
        },
        {
          q: "Vertical distribution of different species occupying different levels in a forest is called:",
          options: [
            "Stratification",
            "Succession",
            "Zonation by latitude",
            "Resource partitioning",
          ],
          answer: 0,
          why: "Stratification describes layering: trees on top, then shrubs, then herbs and grasses.",
        },
      ],
    },
    {
      id: "decomposition-energy-flow",
      title: "Decomposition and energy flow",
      minutes: 8,
      summary:
        "Decomposers break detritus down into inorganic nutrients in a series of steps, while energy enters through producers and flows one way through trophic levels.",
      examFocus:
        "Order of the steps of decomposition, what speeds or slows it, PAR and the fraction captured, unidirectional flow, the 10 per cent law, and grazing vs detritus food chains.",
      mechanism:
        "Decomposition is the reverse of production: complex organic matter in dead remains is broken back into CO₂, water and nutrients. It proceeds physically first (detritivores fragment the detritus and increase its surface area), then chemically, as bacterial and fungal enzymes degrade it. Because enzymes and microbes need water and warmth and most decomposers need oxygen, warm humid conditions speed decomposition while cold and anaerobiosis slow it; tough polymers like lignin and chitin also resist breakdown. Energy behaves differently from nutrients: it cannot be recycled, because at each trophic level most of it is lost as heat in respiration, so it flows only one way from the sun and only about 10% passes to the next level.",
      points: [
        "Detritus: dead plant remains such as leaves, bark and flowers, and dead remains of animals including fecal matter.",
        "Steps: fragmentation (by detritivores such as earthworm), leaching (water-soluble nutrients move down into the soil and precipitate as unavailable salts), catabolism (enzymatic degradation), humification and mineralisation.",
        "Humus is dark, amorphous, highly resistant to microbial action, decomposes extremely slowly, is colloidal and acts as a reservoir of nutrients.",
        "Decomposition is slower when detritus is rich in lignin and chitin, and quicker when rich in nitrogen and water-soluble substances like sugars; warm, moist conditions favour it, low temperature and anaerobiosis inhibit it.",
        "The sun is the only source of energy for all ecosystems on Earth except deep-sea hydrothermal ecosystems; less than 50% of incident solar radiation is photosynthetically active radiation (PAR).",
        "Plants capture only 2–10% of PAR, and this small amount sustains the entire living world.",
        "Energy flow is unidirectional; only about 10% of energy is transferred from one trophic level to the next (10 per cent law).",
        "In aquatic ecosystems the grazing food chain (GFC) is the major conduit of energy flow; in terrestrial ecosystems a much larger fraction flows through the detritus food chain (DFC).",
      ],
      flow: {
        title: "Steps of decomposition",
        steps: [
          { label: "Fragmentation", detail: "Detritivores break detritus into smaller particles" },
          {
            label: "Leaching",
            detail: "Water-soluble inorganic nutrients go down into soil horizons",
          },
          {
            label: "Catabolism",
            detail:
              "Bacterial and fungal enzymes degrade detritus into simpler inorganic substances",
          },
          { label: "Humification", detail: "Accumulation of dark, amorphous humus" },
          {
            label: "Mineralisation",
            detail: "Humus degraded by some microbes, releasing inorganic nutrients",
          },
        ],
      },
      pitfalls: [
        "Fragmentation is done by detritivores; catabolism is done by bacterial and fungal enzymes. Do not swap them.",
        "Plants capture 2–10% of PAR, not 2–10% of total incident radiation, and PAR itself is less than 50% of incident radiation.",
      ],
      vignette: {
        stem: "Leaf litter on a cold, waterlogged peat bog accumulates for centuries, while litter on a warm, moist tropical forest floor disappears within months.",
        answer: "Low temperature and anaerobic conditions in the bog inhibit decomposition.",
        reasoning:
          "Decomposers need warmth and, mostly, oxygen; waterlogging cuts off oxygen and cold slows enzyme activity, so detritus builds up.",
      },
      highYield:
        "Fragmentation → leaching → catabolism → humification → mineralisation; plants trap 2–10% of PAR; 10 per cent law.",
      checks: [
        {
          q: "Which detritus will decompose fastest?",
          options: [
            "Lignin-rich wood",
            "Chitin-rich insect exoskeletons",
            "Waxy, dry bark",
            "Nitrogen-rich leaves with water-soluble sugars",
          ],
          answer: 3,
          why: "Nitrogen and water-soluble substances like sugars speed decomposition; lignin and chitin slow it.",
        },
        {
          q: "If producers in an ecosystem fix 10,000 J of energy, how much is expected to reach the secondary consumers?",
          options: ["1000 J", "100 J", "10 J", "1 J"],
          answer: 1,
          why: "By the 10 per cent law: 10,000 J → 1000 J (primary consumers) → 100 J (secondary consumers).",
        },
      ],
    },
    {
      id: "ecological-pyramids",
      title: "Ecological pyramids",
      minutes: 6,
      summary:
        "Pyramids of number, biomass and energy show the relationship between trophic levels; the first two can be inverted, the pyramid of energy never.",
      examFocus:
        "Which pyramid is inverted in a tree ecosystem and in the sea, why the energy pyramid is always upright, and the limitations of pyramids.",
      mechanism:
        "A pyramid stacks trophic levels with producers at the base. Energy decreases at every step because each level loses most of what it receives in respiration, so an energy pyramid must always narrow upward. Numbers and biomass are only snapshots of standing crop, not of flow, so they can mislead. A single large tree can feed thousands of insects, inverting the number pyramid; in the sea, phytoplankton are few in standing biomass at any moment but reproduce so fast that they support a larger standing crop of fish, inverting the biomass pyramid.",
      points: [
        "The base of every pyramid is formed by producers, and successive levels are herbivores, carnivores and top carnivores.",
        "Pyramid of energy is always upright because energy is lost as heat at each step.",
        "Pyramid of biomass in the sea is generally inverted because the biomass of fishes far exceeds that of phytoplankton at any given time.",
        "Pyramid of numbers is inverted where one large producer, such as a tree, supports many small herbivores, such as insects.",
        "In most terrestrial ecosystems (e.g. grassland) the pyramids of number and biomass are upright.",
        "Limitations: they do not take into account the same species belonging to two or more trophic levels, assume a simple food chain rather than a food web, and give no place to saprophytes.",
      ],
      table: {
        title: "Which pyramids can be inverted",
        columns: ["Pyramid", "Can it be inverted?", "Example"],
        rows: [
          ["Number", "Yes", "Tree ecosystem: one tree supports many insects"],
          ["Biomass", "Yes", "Sea: fish biomass exceeds phytoplankton standing crop"],
          ["Energy", "Never", "Always upright in every ecosystem"],
        ],
      },
      pitfalls: [
        "Students say the pyramid of numbers in the sea is inverted; it is the biomass pyramid that is inverted there.",
        "No ecosystem has an inverted pyramid of energy.",
      ],
      vignette: {
        stem: "In a single banyan tree, ecologists count one tree, thousands of leaf-eating insects and a few dozen insectivorous birds.",
        answer: "The pyramid of numbers is inverted at its base (spindle-shaped overall).",
        reasoning:
          "One producer supports many herbivores, so the producer level is narrower than the herbivore level, then numbers fall again at the bird level.",
      },
      highYield:
        "Energy pyramid always upright; biomass inverted in sea; numbers inverted in a tree ecosystem.",
      checks: [
        {
          q: "Which pyramid is always upright?",
          options: [
            "Pyramid of numbers",
            "Pyramid of biomass",
            "Pyramid of energy",
            "None of these",
          ],
          answer: 2,
          why: "Energy is lost as heat at each trophic level, so the energy pyramid always narrows upward.",
        },
        {
          q: "A limitation of ecological pyramids is that they:",
          options: [
            "Always show producers at the top",
            "Give no place to saprophytes",
            "Can only be drawn for aquatic ecosystems",
            "Ignore the loss of energy between levels",
          ],
          answer: 1,
          why: "Saprophytes, though vital, are not placed in pyramids; pyramids also ignore species at multiple levels and food webs.",
        },
      ],
    },
    {
      id: "biodiversity-patterns",
      title: "Biodiversity: levels, patterns and importance",
      minutes: 8,
      summary:
        "Biodiversity exists at genetic, species and ecological levels; it is highest near the equator, rises with area, and greater diversity makes ecosystems more stable and productive.",
      examFocus:
        "Examples for the three levels, India's share of global diversity, latitudinal gradient figures, the species–area equation and its Z values, Tilman's experiments and the rivet popper hypothesis.",
      mechanism:
        "The tropics hold the most species for reasons that build on each other. They escaped the repeated glaciations that disturbed temperate regions, so species have had more evolutionary time to diversify. Their environment is less seasonal, more constant and predictable, which lets species specialise into narrow niches. And they receive more solar energy, which supports higher productivity and so can sustain more species. Within a region, larger areas hold more species because they include more habitats, but the gain shrinks as area grows, giving a straight line only on a log–log plot. Diverse communities buffer change: if one species fails, others performing similar roles compensate, which is why Tilman's species-rich plots varied less from year to year.",
      points: [
        "The term biodiversity was popularised by sociobiologist Edward Wilson.",
        "Genetic diversity: Rauwolfia vomitoria in different Himalayan ranges varies in the potency and concentration of reserpine; India has more than 50,000 genetically different strains of rice and 1,000 varieties of mango.",
        "Species diversity: the Western Ghats have greater amphibian species diversity than the Eastern Ghats. Ecological diversity: India's deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows exceed those of a Scandinavian country.",
        "IUCN (2004): slightly more than 1.5 million species described; Robert May's global estimate is about 7 million. More than 70% of recorded species are animals; plants make up no more than 22%; among animals, insects are the richest group.",
        "India has only 2.4% of the world's land area but 8.1% of global species diversity and is one of the 12 mega diversity countries.",
        "Latitudinal gradient: Colombia near the equator has nearly 1,400 bird species, New York at 41°N has 105 and Greenland at 71°N only 56; India has more than 1,200.",
        "The Amazonian rain forest has the greatest biodiversity on Earth, with more than 40,000 plant species and 1,300 bird species.",
        "Importance: David Tilman found that plots with more species showed less year-to-year variation in total biomass and higher productivity; Paul Ehrlich's rivet popper hypothesis compares species to rivets in an aeroplane wing.",
      ],
      formulae: [
        {
          label: "Species–area relationship (Humboldt)",
          expr: "log S = log C + Z log A",
          note: "S species richness, A area, Z slope (0.1–0.2 for most regions; 0.6–1.2 for very large areas such as whole continents)",
        },
      ],
      table: {
        title: "Levels of biodiversity",
        columns: ["Level", "Meaning", "NCERT example"],
        rows: [
          [
            "Genetic",
            "Variation within a species",
            "Reserpine in Rauwolfia vomitoria; rice and mango varieties",
          ],
          ["Species", "Variety of species in a region", "Amphibians: Western vs Eastern Ghats"],
          ["Ecological", "Variety of ecosystems", "India's many ecosystem types vs Scandinavia"],
        ],
      },
      pitfalls: [
        "The species–area relationship is a rectangular hyperbola on normal axes and a straight line only on a log scale.",
        "Z is steeper (0.6–1.2) for very large areas such as entire continents; frugivorous birds and mammals in tropical forests of different continents show a slope of 1.15.",
      ],
      vignette: {
        stem: "A student compares bird counts from Colombia, New York and Greenland and notices a steady decline northward.",
        answer:
          "Latitudinal gradient in diversity: species richness falls from the equator towards the poles.",
        reasoning:
          "Tropical regions have had longer undisturbed evolutionary time, a less seasonal and more predictable climate, and more solar energy driving higher productivity.",
      },
      highYield:
        "India: 2.4% land, 8.1% species, one of 12 megadiversity nations. log S = log C + Z log A; Z = 0.1–0.2.",
      checks: [
        {
          q: "Variation in the potency of reserpine in Rauwolfia vomitoria from different Himalayan ranges illustrates:",
          options: [
            "Species diversity",
            "Ecological diversity",
            "Genetic diversity",
            "Latitudinal gradient",
          ],
          answer: 2,
          why: "It is variation within a single species, i.e. genetic diversity.",
        },
        {
          q: "In the species–area relationship, the value of Z for most regions lies between:",
          options: ["0.1 and 0.2", "0.6 and 1.2", "1.5 and 2.0", "0.01 and 0.02"],
          answer: 0,
          why: "For most regions and taxa the slope is 0.1–0.2; it is steeper only for very large areas like whole continents.",
        },
      ],
    },
    {
      id: "biodiversity-conservation",
      title: "Loss of biodiversity and conservation",
      minutes: 8,
      summary:
        "Human activities are driving extinctions far faster than background rates; biodiversity is protected in its natural habitat (in situ) or outside it (ex situ).",
      examFocus:
        "The 'Evil Quartet' with NCERT examples, recent extinctions, India's three hotspots, sacred groves by state, in-situ vs ex-situ methods, and the Earth Summit.",
      mechanism:
        "Species go extinct when their populations can no longer replace themselves, and human activity attacks this from four sides. Destroying and fragmenting habitat removes the space and resources a population needs, which is why it is the most important cause. Over-harvesting removes individuals faster than they reproduce, introduced alien species compete with or prey on natives that have no adaptations against them, and when one species is lost, others that depend on it obligately, like its parasites or specialist pollinators, go with it. Conservation in situ protects the whole ecosystem, so the species keeps its interactions and evolution continues; ex situ methods save threatened species or their gametes outside their habitat when the habitat itself can no longer protect them.",
      points: [
        "IUCN Red List (2004) documents the extinction of 784 species in the last 500 years; recent extinctions include dodo (Mauritius), quagga (Africa), thylacine (Australia), Steller's sea cow (Russia) and three subspecies of tiger (Bali, Javan, Caspian).",
        "Current extinction rates are estimated to be 100 to 1,000 times faster than in pre-human times; we are in the sixth extinction.",
        "Evil Quartet: habitat loss and fragmentation (most important), over-exploitation, alien species invasions and co-extinctions.",
        "Tropical rain forests once covered 14% of the Earth's land surface and now cover no more than 6%; the Amazon rain forest, called the 'lungs of the planet', produces about 20% of the oxygen in Earth's atmosphere.",
        "Alien invasions: Nile perch introduced into Lake Victoria led to the extinction of more than 200 species of cichlid fish; Parthenium, Lantana and water hyacinth (Eichhornia) threaten natives; African catfish Clarias gariepinus threatens indigenous catfishes.",
        "Biodiversity hotspots: 34 in the world; India has the Western Ghats and Sri Lanka, Indo-Burma, and Himalaya; together hotspots cover less than 2% of Earth's land area, and their strict protection could reduce ongoing mass extinctions by up to 30%.",
        "Sacred groves: Khasi and Jaintia Hills (Meghalaya), Aravalli Hills (Rajasthan), Western Ghats regions of Karnataka and Maharashtra, and Sarguja, Chanda and Bastar areas of Madhya Pradesh.",
        "Ex situ: zoological parks, botanical gardens, wildlife safari parks, cryopreservation of gametes, in vitro fertilisation, tissue culture and seed banks. Earth Summit (Rio de Janeiro, 1992) and World Summit on Sustainable Development (Johannesburg, 2002).",
      ],
      table: {
        title: "In situ vs ex situ conservation",
        columns: ["Approach", "Where", "Examples"],
        rows: [
          [
            "In situ",
            "In the natural habitat",
            "Biodiversity hotspots, biosphere reserves, national parks, wildlife sanctuaries, sacred groves",
          ],
          [
            "Ex situ",
            "Outside the natural habitat",
            "Zoos, botanical gardens, wildlife safari parks, seed banks, cryopreservation",
          ],
        ],
      },
      pitfalls: [
        "Sacred groves are in-situ conservation even though they are protected by tradition rather than law.",
        "The most important cause of biodiversity loss is habitat loss and fragmentation, not over-exploitation.",
      ],
      vignette: {
        stem: "An exotic fish released into a large lake to boost fisheries soon leads to the disappearance of many native fish species of the lake.",
        answer: "Alien species invasion, as with the Nile perch in Lake Victoria.",
        reasoning:
          "The native species have no evolved defence against the new predator or competitor, so their populations collapse; this is one of the Evil Quartet.",
      },
      highYield:
        "Evil Quartet: habitat loss, over-exploitation, alien invasions, co-extinctions. India's hotspots: Western Ghats–Sri Lanka, Indo-Burma, Himalaya.",
      checks: [
        {
          q: "Which of the following is an ex-situ method of conservation?",
          options: ["Sacred groves", "Biosphere reserves", "National parks", "Seed banks"],
          answer: 3,
          why: "Seed banks preserve genetic material outside the natural habitat; the others protect species in their habitat.",
        },
        {
          q: "Extinction of more than 200 species of cichlid fish in Lake Victoria followed the introduction of:",
          options: ["Nile perch", "African catfish", "Water hyacinth", "Tilapia"],
          answer: 0,
          why: "The introduced Nile perch, a predator, caused the loss of many endemic cichlids, an example of alien species invasion.",
        },
      ],
    },
  ],
};
