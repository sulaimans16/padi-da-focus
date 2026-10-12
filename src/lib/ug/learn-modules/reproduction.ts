import type { LearnModule } from "../../learn";

export const reproduction: LearnModule = {
  slug: "reproduction",
  group: "Biology",
  subject: "Zoology",
  title: "Reproduction",
  icon: "pregnant_woman",
  blurb:
    "Sexual reproduction in flowering plants from pollen and embryo sac to double fertilisation and apomixis, the human reproductive systems, gametogenesis and the menstrual cycle, pregnancy and parturition, and reproductive health.",
  objectives: [
    "Learner can describe the anther wall, microsporogenesis, the pollen grain and the development of the 7-celled, 8-nucleate embryo sac.",
    "Learner can classify pollination types, outbreeding devices and explain double fertilisation, endosperm, seed, apomixis and polyembryony.",
    "Learner can trace sperm and ovum along the human reproductive tracts and compare spermatogenesis with oogenesis.",
    "Learner can link the hormones of the menstrual cycle and pregnancy to the ovarian and uterine events.",
    "Learner can match each contraceptive, STI and assisted reproductive technology to its mechanism or definition.",
  ],
  concepts: [
    {
      id: "microsporogenesis",
      title: "Stamen, microsporangium and pollen grain",
      minutes: 7,
      summary:
        "The anther's microsporangia make pollen by meiosis of microspore mother cells; the mature pollen grain is a male gametophyte with a tough sporopollenin exine.",
      examFocus:
        "Wall layers and the role of tapetum, ploidy of each stage, exine and germ pores, two- vs three-celled shedding and pollen viability.",
      mechanism:
        "A typical anther is bilobed and dithecous, giving four microsporangia, each surrounded by four wall layers. The innermost layer, the tapetum, nourishes the developing pollen, so its cells are dense and often multinucleate. Sporogenous tissue in the centre produces diploid microspore mother cells (pollen mother cells), each of which undergoes meiosis to form a tetrad of haploid microspores; this is microsporogenesis. As the anther dries, the microspores separate and mature into pollen grains. Pollen must survive the journey to a stigma, so its outer exine is made of sporopollenin, one of the most resistant organic materials known, interrupted only at germ pores where sporopollenin is absent and the pollen tube emerges.",
      points: [
        "Anther: bilobed, dithecous, tetrasporangiate; microsporangia become pollen sacs.",
        "Wall layers from outside: epidermis, endothecium, middle layers, tapetum. Outer three protect and help dehiscence; tapetum nourishes pollen.",
        "Microspore mother cell (2n) → meiosis → microspore tetrad (n). Pollen grain is the male gametophyte.",
        "Exine: sporopollenin — withstands high temperature, strong acids and alkali; no enzyme is known that degrades it. Germ pores lack sporopollenin. Intine: thin, continuous, of cellulose and pectin.",
        "Mature pollen: a large vegetative cell with abundant food reserve and an irregular nucleus, and a small spindle-shaped generative cell floating in its cytoplasm.",
        "In over 60% of angiosperms pollen is shed at the 2-celled stage; in the rest the generative cell divides first and pollen is shed 3-celled.",
        "Viability: about 30 minutes in rice and wheat; months in some members of Rosaceae, Leguminosae and Solanaceae. Pollen can be stored for years in liquid nitrogen (−196 °C) in pollen banks.",
        "Parthenium (carrot grass) pollen causes allergies and bronchial afflictions.",
      ],
      flow: {
        title: "Microsporogenesis to mature pollen",
        steps: [
          { label: "Sporogenous tissue", detail: "Centre of microsporangium" },
          { label: "Microspore mother cell (2n)", detail: "Pollen mother cell" },
          { label: "Meiosis", detail: "Microspore tetrad (4 × n)" },
          { label: "Microspores separate", detail: "Anther dehydrates" },
          { label: "Pollen grain", detail: "Mitosis gives vegetative + generative cell" },
        ],
      },
      pitfalls: [
        "The tapetum is the innermost wall layer and nourishes pollen; the endothecium helps dehiscence.",
        "Germ pores are where sporopollenin is absent, not where it is thickest.",
      ],
      vignette: {
        stem: "Fossil pollen grains millions of years old are recovered intact from sedimentary rock.",
        answer: "Their exine of sporopollenin resists decay.",
        reasoning:
          "Sporopollenin withstands high temperatures, strong acids and alkalis and no known enzyme degrades it, so pollen walls are well preserved as fossils.",
      },
      highYield:
        "Wall layers: epidermis, endothecium, middle layers, tapetum (nourishing). Exine = sporopollenin; intine = cellulose + pectin. Most angiosperms shed 2-celled pollen.",
      checks: [
        {
          q: "Which layer of the microsporangium nourishes the developing pollen?",
          options: ["Endothecium", "Middle layer", "Epidermis", "Tapetum"],
          answer: 3,
          why: "The tapetum, innermost wall layer, has dense cytoplasm and supplies nutrients.",
        },
        {
          q: "Pollen viability is only about 30 minutes in:",
          options: [
            "Rice and wheat",
            "Members of Rosaceae",
            "Members of Solanaceae",
            "Members of Leguminosae",
          ],
          answer: 0,
          why: "Cereal pollen such as rice and wheat loses viability within about 30 minutes of release.",
        },
      ],
    },
    {
      id: "megasporogenesis-embryo-sac",
      title: "Ovule, megasporogenesis and embryo sac",
      minutes: 7,
      summary:
        "A megaspore mother cell in the nucellus divides by meiosis; one functional megaspore undergoes three free-nuclear mitoses to form the 8-nucleate, 7-celled embryo sac.",
      examFocus:
        "Parts of the ovule, monosporic development, number of mitoses, cell arrangement of the embryo sac, filiform apparatus and ploidy of each cell.",
      mechanism:
        "The ovule is the integumented megasporangium. Usually a single megaspore mother cell (MMC), differentiated in the micropylar region of the nucellus, undergoes meiosis to form four haploid megaspores. In most flowering plants three degenerate and only one is functional; development from a single megaspore is called monosporic. The functional megaspore's nucleus divides mitotically three times without wall formation (free-nuclear divisions), giving eight nuclei, four at each pole. Cell walls then organise six of them into cells — three at the micropylar end and three at the chalazal end — while the two remaining polar nuclei sit in the large central cell. This arrangement places the egg near the micropyle, where the pollen tube arrives.",
      points: [
        "Ovule parts: funicle (stalk), hilum (junction with funicle), integuments (one or two), micropyle (opening at tip), chalaza (opposite end, basal part), nucellus (food-rich tissue inside integuments).",
        "MMC (2n) → meiosis → 4 megaspores (n) → 3 degenerate → 1 functional megaspore (monosporic development).",
        "Three successive free-nuclear mitoses: 2, 4, then 8 nuclei.",
        "Mature embryo sac: 8 nucleate, 7 celled.",
        "Egg apparatus at micropylar end: two synergids and one egg cell. Synergids have the filiform apparatus that guides the pollen tube.",
        "Three antipodal cells at the chalazal end; the large central cell has two polar nuclei.",
        "The embryo sac is the female gametophyte.",
      ],
      table: {
        title: "Mature embryo sac",
        columns: ["Position", "Cells", "Number"],
        rows: [
          ["Micropylar end", "Egg apparatus: 2 synergids + 1 egg", "3 cells"],
          ["Chalazal end", "Antipodals", "3 cells"],
          ["Centre", "Central cell with 2 polar nuclei", "1 cell (2 nuclei)"],
          ["Total", "", "7 cells, 8 nuclei"],
        ],
      },
      pitfalls: [
        "The embryo sac has 8 nuclei but only 7 cells, because the central cell holds two polar nuclei.",
        "Filiform apparatus is on the synergids, not on the egg.",
      ],
      vignette: {
        stem: "A botanist counts the mitotic divisions needed to form the female gametophyte from the functional megaspore.",
        answer: "Three free-nuclear mitotic divisions.",
        reasoning:
          "1 → 2 → 4 → 8 nuclei requires three divisions; meiosis of the MMC precedes them and produces the megaspores.",
      },
      highYield:
        "Monosporic, 8-nucleate, 7-celled embryo sac: egg apparatus (2 synergids + egg), 3 antipodals, central cell with 2 polar nuclei.",
      checks: [
        {
          q: "How many cells does a typical mature angiosperm embryo sac have?",
          options: ["8", "7", "6", "4"],
          answer: 1,
          why: "Eight nuclei are organised into seven cells; the central cell has two polar nuclei.",
        },
        {
          q: "The filiform apparatus is present on the:",
          options: ["Antipodal cells", "Egg cell", "Synergids", "Central cell"],
          answer: 2,
          why: "Cellular thickenings at the micropylar tip of synergids guide pollen tube entry.",
        },
      ],
    },
    {
      id: "pollination",
      title: "Pollination and outbreeding devices",
      minutes: 7,
      summary:
        "Pollination may be within a flower (autogamy), between flowers of the same plant (geitonogamy) or between plants (xenogamy), using wind, water or animals; plants have devices to discourage selfing.",
      examFocus:
        "Genetic vs functional nature of geitonogamy, cleistogamy, water-pollinated examples, wind- and insect-pollination adaptations, outbreeding devices and emasculation/bagging.",
      mechanism:
        "Only xenogamy brings genetically different pollen to the stigma; geitonogamy needs a pollinating agent and so is functionally cross-pollination, but because both flowers are on the same plant it is genetically similar to autogamy. Continued self-pollination leads to inbreeding depression, so many plants block it. They may release pollen when the stigma is not receptive, place anther and stigma apart, carry a genetic self-incompatibility that stops self pollen germinating, or bear unisexual flowers. Monoecious plants such as castor and maize prevent autogamy but not geitonogamy, while dioecious plants such as papaya prevent both. The pistil can recognise compatible pollen and reject incompatible pollen through pollen-pistil interaction, which plant breeders exploit or bypass by emasculation and bagging.",
      points: [
        "Autogamy needs synchronised anther dehiscence and stigma receptivity. Cleistogamous flowers never open and ensure autogamy (Viola, Oxalis, Commelina); some plants bear both chasmogamous and cleistogamous flowers.",
        "Wind pollination: light, non-sticky pollen; well-exposed stamens; large feathery stigma; often a single ovule per ovary and many flowers in an inflorescence (e.g. corn cob tassels are stigmas and styles). Common in grasses.",
        "Water pollination: Vallisneria (pollen released on the water surface), Hydrilla and Zostera (marine sea-grass, pollen released inside water, with mucilaginous covering). Water hyacinth and water lily are aquatic but pollinated by insects or wind.",
        "Insect-pollinated flowers are large, colourful, fragrant and rich in nectar; Amorphophallus flower is very tall; the moth and Yucca cannot complete life cycles without each other.",
        "Outbreeding devices: non-synchronised pollen release and stigma receptivity, different positions of anther and stigma, self-incompatibility, unisexual flowers.",
        "Pollen-pistil interaction: pistil recognises compatible pollen; compatible pollen germinates and the pollen tube grows through stigma and style to the ovule.",
        "Artificial hybridisation: emasculation (removing anthers from a bisexual flower before dehiscence) and bagging (covering with butter paper to prevent contamination); a unisexual female flower needs no emasculation.",
      ],
      table: {
        title: "Types of pollination",
        columns: ["Type", "Pollen source", "Agent needed", "Genetically"],
        rows: [
          ["Autogamy", "Same flower", "Not always", "Self"],
          ["Geitonogamy", "Another flower, same plant", "Yes", "Self (functionally cross)"],
          ["Xenogamy", "Another plant", "Yes", "Cross — new genotypes"],
        ],
      },
      pitfalls: [
        "Water hyacinth and water lily are aquatic but not water-pollinated — they use insects or wind.",
        "Monoecy prevents autogamy but not geitonogamy; only dioecy prevents both.",
      ],
      vignette: {
        stem: "A breeder wants to cross two bisexual tomato varieties and ensure only the chosen pollen reaches the stigma.",
        answer:
          "Emasculate the female parent before anther dehiscence, bag it, then dust the chosen pollen on the receptive stigma and rebag.",
        reasoning:
          "Removing anthers prevents selfing and bagging prevents contamination by unwanted pollen.",
      },
      highYield:
        "Geitonogamy = functionally cross, genetically self. Cleistogamy: Viola, Oxalis, Commelina. Water pollination: Vallisneria, Hydrilla, Zostera. Papaya (dioecious) prevents both autogamy and geitonogamy.",
      checks: [
        {
          q: "Which plant is pollinated by water?",
          options: ["Water hyacinth", "Water lily", "Zostera", "Maize"],
          answer: 2,
          why: "Zostera, a marine sea-grass, releases pollen inside water; the other aquatics use insects or wind.",
        },
        {
          q: "Which condition prevents both autogamy and geitonogamy?",
          options: ["Dioecy", "Monoecy", "Cleistogamy", "Chasmogamy"],
          answer: 0,
          why: "In dioecious plants male and female flowers are on different plants.",
        },
      ],
    },
    {
      id: "double-fertilisation-seed",
      title: "Double fertilisation, endosperm, embryo, apomixis",
      minutes: 8,
      summary:
        "One male gamete fuses with the egg (syngamy) and the other with the two polar nuclei (triple fusion), giving a diploid zygote and a triploid primary endosperm nucleus; seeds and fruits follow.",
      examFocus:
        "Ploidy of zygote and PEN, free-nuclear vs cellular endosperm (coconut), albuminous vs non-albuminous seeds, perisperm, monocot embryo parts, apomixis and polyembryony examples.",
      mechanism:
        "The pollen tube enters an ovule through the micropyle and one synergid via the filiform apparatus and releases two male gametes into that synergid. One fuses with the egg to give the diploid zygote; the other fuses with the two polar nuclei in the central cell to give the triploid primary endosperm nucleus (PEN). Because two fusions happen in one embryo sac, this is double fertilisation, unique to flowering plants. Endosperm develops before the embryo because it must first build the food supply the young embryo will draw on; PEN commonly divides repeatedly without walls (free-nuclear endosperm) before becoming cellular. In apomixis seeds form without fertilisation, so the offspring are clones — valuable because hybrid vigour would not segregate in later generations.",
      points: [
        "Syngamy: male gamete + egg → zygote (2n). Triple fusion: male gamete + 2 polar nuclei → PEN (3n). Central cell becomes the primary endosperm cell.",
        "Coconut: tender coconut water is free-nuclear endosperm (thousands of nuclei); the surrounding white kernel is cellular endosperm.",
        "Dicot embryo development: proembryo → globular → heart-shaped → mature embryo. Dicot embryo: embryonal axis with two cotyledons, epicotyl, hypocotyl, radicle with root cap.",
        "Monocot embryo: one cotyledon called the scutellum; epicotyl enclosed by coleoptile, radicle and root cap enclosed by coleorhiza.",
        "Non-albuminous seeds (no residual endosperm): pea, groundnut, beans. Albuminous seeds: wheat, maize, barley, castor. Persistent nucellus is perisperm: black pepper, beet.",
        "False fruits develop from the thalamus as well (apple, strawberry, cashew); parthenocarpic fruits develop without fertilisation (banana) and are seedless.",
        "Seed viability: Lupinus arcticus seeds germinated after about 10,000 years; Phoenix dactylifera (date palm) seed about 2000 years old from King Herod's palace near the Dead Sea.",
        "Apomixis: seeds without fertilisation (some Asteraceae and grasses); a form of asexual reproduction mimicking sexual reproduction. Polyembryony: more than one embryo, e.g. nucellar embryos in many Citrus and mango varieties.",
      ],
      flow: {
        title: "Double fertilisation",
        steps: [
          { label: "Pollen tube enters a synergid", detail: "Guided by the filiform apparatus" },
          { label: "Two male gametes released", detail: "Into the cytoplasm of the synergid" },
          { label: "Syngamy", detail: "Male gamete + egg → zygote (2n)" },
          { label: "Triple fusion", detail: "Male gamete + 2 polar nuclei → PEN (3n)" },
          { label: "Endosperm then embryo", detail: "Ovule → seed; ovary → fruit" },
        ],
      },
      pitfalls: [
        "Endosperm is triploid, but perisperm is the diploid remnant of nucellus — different tissues.",
        "Coconut water is free-nuclear, not cellular, endosperm.",
      ],
      vignette: {
        stem: "A seed company sells hybrid seed that farmers must buy every year because the next generation loses hybrid characters.",
        answer: "Introducing apomictic genes into hybrids would let farmers reuse the seed.",
        reasoning:
          "Apomictic seeds form without fertilisation, so there is no segregation of hybrid characters in the progeny.",
      },
      highYield:
        "Zygote 2n, PEN 3n. Coconut water = free-nuclear endosperm. Non-albuminous: pea, groundnut, beans. Perisperm: black pepper, beet. Polyembryony: Citrus, mango.",
      checks: [
        {
          q: "The ploidy of the primary endosperm nucleus is:",
          options: ["n", "2n", "4n", "3n"],
          answer: 3,
          why: "One male gamete (n) fuses with two polar nuclei (n + n) in triple fusion.",
        },
        {
          q: "Which is a non-albuminous seed?",
          options: ["Castor", "Groundnut", "Wheat", "Maize"],
          answer: 1,
          why: "In groundnut the endosperm is fully consumed during embryo development.",
        },
      ],
    },
    {
      id: "human-reproductive-system",
      title: "Male and female reproductive systems",
      minutes: 7,
      summary:
        "The male system makes and delivers sperm through testes, ducts and accessory glands; the female system makes ova and supports fertilisation and pregnancy.",
      examFocus:
        "Scrotal temperature, testicular lobules and tubule cells, duct sequence, accessory glands, parts of the oviduct and uterine wall, and mammary gland structure.",
      mechanism:
        "Sperm formation needs a temperature about 2–2.5 °C lower than normal body temperature, which is why the testes hang outside the abdomen in the scrotum. Inside each testis, seminiferous tubules carry spermatogonia that make sperm and Sertoli cells that nourish them, while the interstitial Leydig cells between tubules make androgens. Sperm then pass through a duct system — rete testis, vasa efferentia, epididymis, vas deferens, ejaculatory duct and urethra — collecting secretions from the seminal vesicles, prostate and bulbourethral glands that make up seminal plasma. In the female, the funnel-shaped infundibulum with its fimbriae collects the ovum released from the ovary, and the ampulla, the widest part of the oviduct, is where fertilisation usually happens; the uterus's endometrium undergoes cyclical change and its myometrium contracts strongly at delivery.",
      points: [
        "Testes: oval, about 4–5 cm long and 2–3 cm wide; each has about 250 testicular lobules, each with 1–3 highly coiled seminiferous tubules.",
        "Seminiferous tubules are lined by male germ cells (spermatogonia) and Sertoli cells; interstitial (Leydig) cells outside the tubules synthesise androgens; other immunologically competent cells are present too.",
        "Duct order: seminiferous tubules → rete testis → vasa efferentia → epididymis → vas deferens → ejaculatory duct (joined by seminal vesicle duct) → urethra → urethral meatus.",
        "Accessory glands: paired seminal vesicles, a prostate and paired bulbourethral glands; their secretions form seminal plasma rich in fructose, calcium and certain enzymes; bulbourethral secretion lubricates the penis.",
        "Ovaries: 2–4 cm long, held by ligaments to the pelvic wall and uterus; stroma divided into peripheral cortex and inner medulla.",
        "Oviduct (10–12 cm): infundibulum with fimbriae → ampulla (wider) → isthmus (narrow lumen, joins uterus). Uterus wall: perimetrium (outer), myometrium (smooth muscle, middle), endometrium (glandular, inner).",
        "Cervical canal and vagina form the birth canal. External genitalia: mons pubis, labia majora, labia minora, hymen, clitoris.",
        "Mammary gland: 15–20 mammary lobes with alveoli secreting milk → mammary tubules → mammary duct → mammary ampulla → lactiferous duct.",
      ],
      flow: {
        title: "Path of sperm",
        steps: [
          { label: "Seminiferous tubules", detail: "Sperm produced" },
          { label: "Rete testis → vasa efferentia", detail: "Leave the testis" },
          { label: "Epididymis", detail: "Along the posterior surface of each testis" },
          { label: "Vas deferens → ejaculatory duct", detail: "Receives seminal vesicle duct" },
          { label: "Urethra → urethral meatus", detail: "Exit through penis" },
        ],
      },
      pitfalls: [
        "Leydig cells (outside the tubules) make testosterone; Sertoli cells (inside) nourish developing sperm.",
        "Fertilisation occurs in the ampulla, not in the uterus or the isthmus.",
      ],
      vignette: {
        stem: "A boy's testes failed to descend into the scrotum and remain in the abdomen into adulthood.",
        answer: "He is likely to be infertile because spermatogenesis is impaired.",
        reasoning:
          "Sperm production needs a temperature 2–2.5 °C below body temperature, which the scrotum provides.",
      },
      highYield:
        "Scrotum keeps testes 2–2.5 °C cooler. ~250 lobules per testis, 1–3 tubules each. Leydig → androgens; Sertoli → nourish sperm. Fertilisation in ampulla.",
      checks: [
        {
          q: "Which is a paired male accessory gland?",
          options: ["Prostate", "Seminal vesicle", "Testis", "Urethra"],
          answer: 1,
          why: "Seminal vesicles and bulbourethral glands are paired; the prostate is single.",
        },
        {
          q: "The innermost glandular layer of the uterus is the:",
          options: ["Endometrium", "Myometrium", "Perimetrium", "Fimbriae"],
          answer: 0,
          why: "The endometrium lines the uterine cavity and changes through the menstrual cycle.",
        },
      ],
    },
    {
      id: "gametogenesis-menstrual-cycle",
      title: "Gametogenesis and the menstrual cycle",
      minutes: 9,
      summary:
        "Spermatogenesis turns each primary spermatocyte into four sperm, oogenesis gives one ovum and polar bodies, and the menstrual cycle is driven by pituitary and ovarian hormones.",
      examFocus:
        "Ploidy at each stage, where meiosis I and II are completed in oogenesis, hormone actions on Leydig and Sertoli cells, phases and the LH surge, and follicle stages.",
      mechanism:
        "At puberty GnRH from the hypothalamus raises pituitary LH and FSH. LH acts on Leydig cells to make androgens, which stimulate spermatogenesis; FSH acts on Sertoli cells to release factors that help spermiogenesis. Oogenesis starts before birth: millions of oogonia form during foetal life and enter meiosis I but arrest in prophase I as primary oocytes, and no more oogonia are added later. In each cycle FSH and LH make follicles grow; growing follicles secrete oestrogen, which rebuilds the endometrium. At mid-cycle LH peaks (the LH surge), rupturing the Graafian follicle and releasing the secondary oocyte (ovulation). The remaining follicle becomes the corpus luteum, whose progesterone keeps the endometrium ready for implantation; without fertilisation it degenerates, progesterone falls and the endometrium is shed as menstruation.",
      points: [
        "Spermatogenesis: spermatogonium (2n) → primary spermatocyte (2n) → meiosis I → two secondary spermatocytes (n) → meiosis II → four spermatids (n) → spermiogenesis → spermatozoa; release from seminiferous tubules is spermiation.",
        "Sperm: head with haploid nucleus and acrosome (enzymes for fertilisation), neck, middle piece with mitochondria (energy for motility), tail. A man ejaculates 200–300 million sperms; for normal fertility at least 60% should have normal shape and at least 40% vigorous motility.",
        "Oogenesis: oogonia in foetal life → primary oocytes arrested in prophase I → primordial → primary → secondary → tertiary follicle (with antrum) → Graafian follicle. 60,000–80,000 primary follicles remain in each ovary at puberty.",
        "Primary oocyte completes meiosis I within the tertiary follicle, forming a large secondary oocyte and a tiny first polar body; meiosis II is completed only after sperm entry.",
        "A new membrane, the zona pellucida, surrounds the secondary oocyte in the Graafian follicle.",
        "Menstrual cycle ≈ 28/29 days: menstrual phase (3–5 days), follicular/proliferative phase, ovulation (about day 14, LH surge), luteal/secretory phase. Menarche is the first menstruation; it stops around 50 years at menopause.",
        "Follicular phase: FSH and LH rise gradually, follicles grow and secrete oestrogen, endometrium proliferates. Luteal phase: corpus luteum secretes large amounts of progesterone.",
        "Lack of menstruation may indicate pregnancy, but can also be caused by stress or poor health.",
      ],
      table: {
        title: "Spermatogenesis vs oogenesis",
        columns: ["Feature", "Spermatogenesis", "Oogenesis"],
        rows: [
          ["Starts", "Puberty", "Foetal life"],
          ["Products per primary cell", "4 sperms", "1 ovum + polar bodies"],
          [
            "Meiosis I completed",
            "Continuously in testis",
            "Just before ovulation (tertiary follicle)",
          ],
          ["Meiosis II completed", "In testis", "Only after sperm entry"],
          ["Hormones", "LH → Leydig, FSH → Sertoli", "FSH and LH → follicle growth and ovulation"],
        ],
      },
      pitfalls: [
        "The human egg released at ovulation is a secondary oocyte, not a mature ovum.",
        "LH acts on Leydig cells and FSH on Sertoli cells — a common swap.",
      ],
      vignette: {
        stem: "A woman with a regular 28-day cycle wants to know when her LH level peaks.",
        answer: "Around day 14, at mid-cycle, triggering ovulation.",
        reasoning:
          "Both LH and FSH peak in the middle of the cycle; the LH surge ruptures the Graafian follicle and releases the secondary oocyte.",
      },
      highYield:
        "One primary spermatocyte → 4 sperms; one primary oocyte → 1 ovum. Ovulation by LH surge on ~day 14. Corpus luteum → progesterone. Meiosis II of the egg completes after sperm entry.",
      checks: [
        {
          q: "Primary oocytes remain arrested at:",
          options: ["Metaphase II", "Prophase II", "Prophase I", "Anaphase I"],
          answer: 2,
          why: "Oocytes formed in foetal life enter meiosis I and are temporarily arrested in prophase I.",
        },
        {
          q: "Ovulation is triggered by a surge of:",
          options: ["FSH", "LH", "Progesterone", "Prolactin"],
          answer: 1,
          why: "The mid-cycle LH surge induces rupture of the Graafian follicle.",
        },
      ],
    },
    {
      id: "fertilisation-to-parturition",
      title: "Fertilisation, implantation, pregnancy and parturition",
      minutes: 8,
      summary:
        "Fertilisation in the ampulla gives a zygote that cleaves into a morula and blastocyst, implants in the endometrium, develops with the support of the placenta and is delivered by an oxytocin-driven reflex.",
      examFocus:
        "Site of fertilisation, block to polyspermy, blastocyst layers, placental hormones, timeline of foetal development, foetal ejection reflex and colostrum.",
      mechanism:
        "Fertilisation is possible only if ovum and sperm reach the ampulla together. The sperm contacts the zona pellucida, which induces changes in the membrane that block entry of further sperm; sperm entry also triggers completion of meiosis II in the secondary oocyte. The zygote divides by cleavage while moving towards the uterus, forming a morula of 8–16 blastomeres and then a blastocyst with an outer trophoblast and an inner cell mass. The trophoblast attaches to the endometrium and the blastocyst becomes embedded (implantation). Chorionic villi and uterine tissue interdigitate to form the placenta, which supplies the embryo and acts as an endocrine tissue. At term, signals from the fully developed foetus and placenta cause mild uterine contractions (the foetal ejection reflex), which trigger oxytocin release from the maternal pituitary; oxytocin causes stronger contractions, which cause more oxytocin, a positive loop ending in delivery.",
      points: [
        "Sex of the baby is determined by the sperm: X-bearing sperm gives a female (XX), Y-bearing sperm a male (XY).",
        "Cleavage: 2, 4, 8, 16 daughter cells (blastomeres); 8–16 cells = morula; morula → blastocyst (trophoblast + inner cell mass).",
        "Inner cell mass differentiates into ectoderm, mesoderm and endoderm and contains stem cells that can give rise to all tissues and organs.",
        "Placenta: links embryo by the umbilical cord; supplies O2 and nutrients and removes CO2 and wastes; produces hCG, hPL, oestrogens and progestogens. Relaxin is secreted by the ovary in later pregnancy.",
        "Development: heart forms after one month; limbs and digits by end of second month; most major organ systems formed by end of 12 weeks (first trimester); first foetal movements and hair on the head during the fifth month; by end of 24 weeks (second trimester) body is covered with fine hair, eyelids separate and eyelashes form.",
        "Human gestation is about 9 months.",
        "Parturition: foetal ejection reflex → oxytocin from maternal pituitary → strong uterine contractions → delivery; placenta expelled after the baby.",
        "Lactation: colostrum, the milk of the first few days, contains antibodies (IgA) that protect the newborn.",
      ],
      flow: {
        title: "From ovulation to implantation",
        steps: [
          { label: "Ovulation", detail: "Secondary oocyte into fallopian tube" },
          {
            label: "Fertilisation in ampulla",
            detail: "Zona pellucida blocks extra sperm; meiosis II completes",
          },
          { label: "Cleavage", detail: "Zygote → morula (8–16 blastomeres)" },
          { label: "Blastocyst", detail: "Trophoblast + inner cell mass" },
          { label: "Implantation", detail: "Trophoblast attaches to and embeds in endometrium" },
        ],
      },
      pitfalls: [
        "hCG, hPL and relaxin appear only during pregnancy; relaxin comes from the ovary, not the placenta, in NCERT.",
        "Oxytocin at parturition comes from the maternal pituitary, not the foetus.",
      ],
      vignette: {
        stem: "A pregnancy test kit detects a hormone in a woman's urine about two weeks after a missed period.",
        answer: "Human chorionic gonadotropin (hCG).",
        reasoning:
          "hCG is produced only in pregnancy by the developing placental tissue, so its presence indicates pregnancy.",
      },
      highYield:
        "Fertilisation in ampulla; morula 8–16 cells; blastocyst = trophoblast + inner cell mass. Placenta: hCG, hPL, oestrogens, progestogens. First trimester ends at 12 weeks with major organs formed.",
      checks: [
        {
          q: "The layer of the blastocyst that attaches to the endometrium is the:",
          options: ["Inner cell mass", "Ectoderm", "Trophoblast", "Endoderm"],
          answer: 2,
          why: "The outer trophoblast attaches to the endometrium during implantation.",
        },
        {
          q: "By the end of which period are most major organ systems formed?",
          options: ["One month", "12 weeks", "Fifth month", "24 weeks"],
          answer: 1,
          why: "By the end of the first trimester (12 weeks) most major organ systems are formed.",
        },
      ],
    },
    {
      id: "reproductive-health",
      title: "Contraception, MTP, STIs and infertility",
      minutes: 9,
      summary:
        "Reproductive health covers birth control by natural, barrier, IUD, hormonal and surgical methods, safe MTP, prevention of STIs and assisted reproductive technologies for infertility.",
      examFocus:
        "Mechanism of each IUD and pill (Saheli), emergency contraception window, MTP limits, incurable STIs, and definitions of IVF, ZIFT, IUT, GIFT, ICSI and IUI.",
      mechanism:
        "Each contraceptive blocks a specific step from gamete to implantation. Natural methods avoid meeting of ovum and sperm, for example by abstaining during the fertile days 10–17 of the cycle. Barriers physically stop sperm. Copper-releasing IUDs release Cu ions that suppress sperm motility and fertilising capacity, while hormone-releasing IUDs make the uterus unsuitable for implantation and the cervix hostile to sperm; IUDs also increase phagocytosis of sperm in the uterus. Oral pills of progestogens or progestogen-oestrogen combinations inhibit ovulation and implantation and alter cervical mucus. Surgical sterilisation cuts the transport route: vasectomy removes a piece of the vas deferens, tubectomy a piece of the fallopian tube. In infertility, ART bypasses the blocked step, for example by fertilising the egg outside the body and transferring the embryo.",
      points: [
        "Natural: periodic abstinence (days 10–17), withdrawal (coitus interruptus), lactational amenorrhea — effective only up to about six months after parturition while breast-feeding is intense.",
        "Barriers: condoms (male; female), diaphragms, cervical caps and vaults (reusable), often used with spermicidal creams, jellies and foams. Condoms also protect against STIs and AIDS.",
        "IUDs: non-medicated (Lippes loop), copper-releasing (CuT, Cu7, Multiload 375), hormone-releasing (Progestasert, LNG-20). Ideal for women who want to delay pregnancy or space children.",
        "Oral pills taken daily for 21 days starting within the first five days of the cycle; Saheli is a once-a-week non-steroidal pill developed at CDRI, Lucknow. Injections and implants under the skin act similarly. Emergency contraception: progestogens/combinations or IUD within 72 hours of coitus.",
        "Surgical (terminal) methods: vasectomy (male) and tubectomy (female); reversibility is very poor.",
        "MTP was legalised in India in 1971; it is relatively safe in the first trimester (up to 12 weeks). It must not be used for female foeticide; amniocentesis for sex determination is legally banned.",
        "STIs: gonorrhoea, syphilis, genital herpes, chlamydiasis, genital warts, trichomoniasis, hepatitis-B, HIV. Except hepatitis-B, genital herpes and HIV infections, the others are completely curable if detected early. Highest incidence in the 15–24 years age group.",
        "ART: IVF-ET (fertilisation outside the body, embryo transfer); ZIFT (zygote or embryo up to 8 blastomeres into the fallopian tube); IUT (embryo with more than 8 blastomeres into the uterus); GIFT (ovum from a donor into the fallopian tube of a woman who cannot produce ova); ICSI (sperm injected directly into the ovum); AI/IUI (semen from husband or donor into vagina or uterus) for low sperm counts.",
      ],
      table: {
        title: "Assisted reproductive technologies",
        columns: ["Technique", "What is transferred", "Where"],
        rows: [
          ["ZIFT", "Zygote or early embryo (up to 8 blastomeres)", "Fallopian tube"],
          ["IUT", "Embryo with more than 8 blastomeres", "Uterus"],
          ["GIFT", "Ovum from a donor", "Fallopian tube"],
          ["ICSI", "Single sperm", "Directly into ovum (in laboratory)"],
          ["AI / IUI", "Semen from husband or donor", "Vagina or uterus"],
        ],
      },
      pitfalls: [
        "ZIFT uses up to 8 blastomeres into the fallopian tube; IUT uses more than 8 blastomeres into the uterus — the cut-off and site are both tested.",
        "Hepatitis-B, genital herpes and HIV are the STIs that are not completely curable.",
      ],
      vignette: {
        stem: "A woman cannot produce ova but can provide a suitable environment for fertilisation and development; her husband is fertile.",
        answer: "GIFT — transfer of an ovum collected from a donor into her fallopian tube.",
        reasoning:
          "GIFT supplies the missing ovum while using her own tube for fertilisation and uterus for pregnancy.",
      },
      highYield:
        "Cu-IUDs suppress sperm motility; hormonal IUDs make the uterus unsuitable for implantation. Saheli: once a week, non-steroidal, CDRI Lucknow. Emergency contraception within 72 h. MTP safest up to 12 weeks.",
      checks: [
        {
          q: "Saheli, the oral contraceptive, is:",
          options: [
            "A daily steroidal pill",
            "A once-a-week non-steroidal pill",
            "A hormone-releasing IUD",
            "A copper-releasing IUD",
          ],
          answer: 1,
          why: "Saheli, developed at CDRI Lucknow, is a once-a-week non-steroidal preparation.",
        },
        {
          q: "Transfer of an embryo with more than 8 blastomeres into the uterus is called:",
          options: ["ZIFT", "GIFT", "ICSI", "IUT"],
          answer: 3,
          why: "IUT (intra-uterine transfer) places embryos of more than 8 blastomeres in the uterus.",
        },
      ],
    },
  ],
};
