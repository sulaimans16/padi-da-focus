import type { LearnModule } from "../learn";

export const dermatology: LearnModule = {
  slug: "dermatology",
  group: "Clinical",
  subject: "Dermatology",
  icon: "dermatology",
  blurb:
    "Psoriasis, leprosy, blistering diseases, scabies, fungal infections, acne, lichen planus and genital ulcers — signs and eponyms the exam loves.",
  objectives: [
    "Recognise psoriasis and lichen planus by their signs and histology.",
    "Classify leprosy and choose the WHO multidrug regimen.",
    "Separate pemphigus from bullous pemphigoid by blister level and immunofluorescence.",
    "Treat scabies, dermatophytosis and acne by severity.",
    "Differentiate painful from painless genital ulcers.",
  ],
  concepts: [
    {
      id: "psoriasis",
      title: "Psoriasis",
      minutes: 8,
      summary:
        "A chronic immune-mediated disease of rapid keratinocyte turnover producing well-demarcated red plaques with silvery scale on extensor surfaces.",
      examFocus:
        "Auspitz sign, Koebner phenomenon, Munro microabscesses, drugs that aggravate it, and why systemic steroids are avoided.",
      mechanism:
        "Dendritic cells drive an IL-23/Th17 response that releases IL-17 and TNF, making keratinocytes proliferate so fast that a cell reaches the surface in about 4 days instead of 28. Cells arrive still holding their nuclei (parakeratosis) and the granular layer is lost, so the surface flakes as silvery scale. Elongated dermal papillae carry dilated, tortuous capillaries close to a thinned suprapapillary epidermis — scratch the scale off and they bleed in pinpoints (Auspitz sign).",
      points: [
        "Chronic plaque psoriasis: elbows, knees, scalp, lumbosacral area; nail pitting and onycholysis; psoriatic arthritis in up to a third.",
        "Signs: Auspitz (pinpoint bleeding), Koebner (lesions at sites of trauma), candle-grease sign on scraping (grattage).",
        "Histology: Munro microabscesses (neutrophils in stratum corneum), spongiform pustules of Kogoj, regular acanthosis, parakeratosis, loss of granular layer, suprapapillary thinning.",
        "Triggers/aggravators: streptococcal throat infection (guttate psoriasis), lithium, β-blockers, antimalarials, NSAIDs, alcohol, stress.",
        "Treatment: topical steroids, vitamin D analogues (calcipotriol), coal tar, dithranol; NB-UVB phototherapy; methotrexate, ciclosporin, acitretin; biologics (TNF, IL-17, IL-23 inhibitors).",
        "Systemic steroids are avoided — withdrawal can trigger generalised pustular psoriasis.",
      ],
      pitfalls: [
        "Koebner phenomenon also occurs in lichen planus, vitiligo and warts — it isn't specific to psoriasis.",
        "Guttate psoriasis follows a streptococcal sore throat in young people — a frequent vignette.",
      ],
      vignette: {
        stem: "A 30-year-old has well-defined red plaques with silvery scales on both elbows and knees. Removing the scale causes pinpoint bleeding; his nails are pitted.",
        answer: "Chronic plaque psoriasis.",
        reasoning: "Extensor plaques with silvery scale, Auspitz sign and nail pitting.",
      },
      highYield:
        "Auspitz sign, Koebner, nail pitting. Munro microabscess (stratum corneum). Aggravators: lithium, β-blockers, antimalarials. Avoid systemic steroids.",
      checks: [
        {
          q: "Munro microabscesses are found in the:",
          options: ["Stratum basale", "Stratum spinosum", "Stratum corneum", "Papillary dermis"],
          answer: 2,
          why: "Collections of neutrophils in the parakeratotic stratum corneum.",
        },
        {
          q: "Drug known to aggravate psoriasis:",
          options: ["Methotrexate", "Lithium", "Ciclosporin", "Calcipotriol"],
          answer: 1,
          why: "Lithium, β-blockers and antimalarials can precipitate flares.",
        },
      ],
    },
    {
      id: "leprosy",
      title: "Leprosy (Hansen's disease)",
      minutes: 9,
      summary:
        "Mycobacterium leprae infects skin and peripheral nerves; the host's cell-mediated immunity decides where a patient sits on the spectrum from tuberculoid to lepromatous.",
      examFocus:
        "Ridley–Jopling spectrum, WHO PB vs MB classification, MDT drugs and durations, nerves commonly thickened, and lepra reactions.",
      mechanism:
        "M. leprae prefers the cooler parts of the body (skin, superficial nerves, nose, testes) and lives inside Schwann cells and macrophages. Strong cell-mediated immunity walls it into granulomas with very few bacilli — tuberculoid leprosy, with a few well-defined anaesthetic patches and early nerve damage. Weak cell-mediated immunity lets bacilli multiply freely in foamy macrophages — lepromatous leprosy, with many symmetrical lesions, nodules and leonine facies. Nerve damage causes anaesthesia, so most deformity comes from unnoticed injury and secondary infection.",
      points: [
        "Ridley–Jopling spectrum: TT – BT – BB – BL – LL (decreasing cell-mediated immunity, increasing bacillary load). Lepromin test positive in TT, negative in LL.",
        "WHO operational classification: paucibacillary (PB) — up to 5 skin lesions, no bacilli on smear; multibacillary (MB) — 6 or more lesions, or more than one nerve involved, or smear positive.",
        "WHO-recommended MDT (2018): rifampicin 600 mg + clofazimine 300 mg once monthly (supervised), plus dapsone 100 mg and clofazimine 50 mg daily — 6 months for PB, 12 months for MB.",
        "Commonly thickened nerves: ulnar (commonest), common peroneal, posterior tibial, great auricular, radial cutaneous.",
        "Type 1 (reversal) reaction: borderline leprosy, cell-mediated; existing lesions inflame, neuritis → oral steroids.",
        "Type 2 reaction (erythema nodosum leprosum): BL/LL, immune complex; painful nodules, fever → steroids, thalidomide, clofazimine.",
      ],
      table: {
        title: "Tuberculoid vs lepromatous",
        columns: ["Feature", "Tuberculoid", "Lepromatous"],
        rows: [
          ["Cell-mediated immunity", "Strong", "Weak"],
          ["Lesions", "Few, asymmetric, well-defined", "Many, symmetric, ill-defined, nodules"],
          ["Sensation in lesion", "Lost early", "Lost late"],
          ["Bacilli", "Few / none", "Many (globi)"],
          ["Lepromin test", "Positive", "Negative"],
          ["Reaction", "Type 1 (if borderline)", "Type 2 (ENL)"],
        ],
      },
      pitfalls: [
        "The lepromin test assesses immunity (prognosis/classification) — it is not a diagnostic test.",
        "Stopping MDT during a reaction is wrong; continue MDT and treat the reaction.",
      ],
      vignette: {
        stem: "A 30-year-old has 3 hypopigmented, anaesthetic, well-defined patches and a thickened ulnar nerve. Slit-skin smear is negative.",
        answer: "Paucibacillary leprosy — 6 months of WHO MDT.",
        reasoning:
          "≤ 5 lesions, smear negative and a single nerve fit the WHO paucibacillary definition.",
      },
      highYield:
        "TT ↔ LL by cell-mediated immunity; lepromin + in TT. PB ≤ 5 lesions (6 m MDT), MB ≥ 6 or smear + (12 m). Ulnar nerve commonest. Type 1 → steroids; ENL → thalidomide/steroids.",
      checks: [
        {
          q: "Drug of choice for recurrent erythema nodosum leprosum (type 2 reaction):",
          options: ["Dapsone", "Thalidomide", "Rifampicin", "Isoniazid"],
          answer: 1,
          why: "Thalidomide (with steroids) suppresses the TNF-driven immune-complex reaction.",
        },
        {
          q: "Duration of MDT for multibacillary leprosy:",
          options: ["6 months", "9 months", "12 months", "24 months"],
          answer: 2,
          why: "MB leprosy is treated for 12 months.",
        },
      ],
    },
    {
      id: "bullous",
      title: "Pemphigus vulgaris vs bullous pemphigoid",
      minutes: 7,
      summary:
        "Autoimmune blistering diseases are separated by the level of the split: intraepidermal (pemphigus, flaccid blisters) or subepidermal (pemphigoid, tense blisters).",
      examFocus:
        "Target antigens, Nikolsky sign, mucosal involvement, Tzanck smear and immunofluorescence patterns.",
      mechanism:
        "In pemphigus, IgG autoantibodies attack desmogleins — the glue of desmosomes holding keratinocytes together — so cells separate within the epidermis just above the basal layer (acantholysis). The roof is thin, so blisters are flaccid, rupture easily and the skin shears with lateral pressure (Nikolsky positive); desmoglein 3 is abundant in mucosa, so the mouth is almost always involved. In bullous pemphigoid antibodies target hemidesmosome proteins (BP180, BP230) anchoring the basal layer to the basement membrane, so the whole epidermis lifts off as a tense, sturdy blister.",
      points: [
        "Pemphigus vulgaris: middle-aged; antibodies to desmoglein 3 (± 1); flaccid bullae, painful oral erosions, Nikolsky positive.",
        "Tzanck smear in pemphigus: acantholytic (Tzanck) cells; histology: suprabasal split with 'row of tombstones'.",
        "Direct IF in pemphigus: intercellular ('fishnet') IgG and C3 in the epidermis.",
        "Bullous pemphigoid: elderly; antibodies to BP180/BP230; tense bullae on urticarial base, itchy; mucosa rarely involved; Nikolsky negative; eosinophils.",
        "Direct IF in pemphigoid: linear IgG and C3 along the basement membrane zone.",
        "Treatment: systemic steroids; rituximab (pemphigus); potent topical steroids, doxycycline for pemphigoid.",
        "Dermatitis herpetiformis: itchy grouped vesicles on extensors, coeliac disease, granular IgA in dermal papillae → dapsone + gluten-free diet.",
      ],
      table: {
        title: "Pemphigus vs pemphigoid",
        columns: ["Feature", "Pemphigus vulgaris", "Bullous pemphigoid"],
        rows: [
          ["Target", "Desmoglein 3/1", "BP180 / BP230 (hemidesmosome)"],
          ["Split", "Intraepidermal (suprabasal)", "Subepidermal"],
          ["Blister", "Flaccid", "Tense"],
          ["Oral mucosa", "Almost always", "Rare"],
          ["Nikolsky", "Positive", "Negative"],
          ["DIF", "Intercellular, fishnet", "Linear along BMZ"],
        ],
      },
      pitfalls: [
        "Nikolsky is also positive in toxic epidermal necrolysis and staphylococcal scalded skin syndrome.",
        "An elderly patient with tense itchy blisters and no mouth lesions is pemphigoid, not pemphigus.",
      ],
      vignette: {
        stem: "A 45-year-old has painful oral erosions for 2 months followed by flaccid blisters on the trunk that rupture easily; rubbing normal skin causes it to peel.",
        answer: "Pemphigus vulgaris — biopsy with DIF; systemic steroids ± rituximab.",
        reasoning:
          "Mucosal onset, flaccid bullae and a positive Nikolsky sign indicate an intraepidermal acantholytic process.",
      },
      highYield:
        "Pemphigus: desmoglein, intraepidermal, flaccid, oral, Nikolsky +, fishnet IF. Pemphigoid: BP180/230, subepidermal, tense, elderly, linear IF. DH: IgA, coeliac, dapsone.",
      checks: [
        {
          q: "Immunofluorescence in bullous pemphigoid shows:",
          options: [
            "Intercellular IgG",
            "Linear IgG and C3 at the basement membrane",
            "Granular IgA in dermal papillae",
            "No deposits",
          ],
          answer: 1,
          why: "Antibodies bind hemidesmosomal antigens along the BMZ.",
        },
        {
          q: "Target antigen in pemphigus vulgaris:",
          options: ["BP180", "Desmoglein 3", "Type VII collagen", "Transglutaminase"],
          answer: 1,
          why: "Desmoglein 3 (with or without desmoglein 1).",
        },
      ],
    },
    {
      id: "scabies",
      title: "Scabies",
      minutes: 6,
      summary:
        "An intensely itchy infestation by the mite Sarcoptes scabiei that spreads through close contact; burrows are pathognomonic, and everyone in the household must be treated together.",
      examFocus: "Sites of burrows, nocturnal itch, crusted scabies, and permethrin vs ivermectin.",
      mechanism:
        "The fertilised female mite burrows into the stratum corneum, laying eggs as she goes. The itch is largely a delayed hypersensitivity reaction to the mite, its eggs and faeces, which is why it starts 3–6 weeks after the first infestation (but within days of a re-infestation) and is worse at night when the skin is warm. In immunosuppressed people the mite multiplies unchecked into thousands, causing thick crusts that are highly contagious (crusted/Norwegian scabies).",
      points: [
        "Burrows: finger webs, wrists, elbows, axillary folds, around the nipples and umbilicus, genitalia (nodules on the penis/scrotum are characteristic).",
        "Nocturnal itching and similar symptoms in family members.",
        "Infants: lesions on palms, soles, face and scalp.",
        "Treatment: permethrin 5% cream applied from the neck down (whole body in infants), left overnight, repeated after 1 week; treat all contacts at the same time.",
        "Oral ivermectin (200 µg/kg, two doses a week apart) for crusted scabies, institutional outbreaks or when topical therapy fails.",
        "Wash clothes and bedding in hot water; itch may persist for 2–4 weeks after successful treatment.",
      ],
      pitfalls: [
        "Persistent itch after treatment isn't necessarily failure — post-scabetic itch can last weeks.",
        "Crusted scabies needs combined oral ivermectin and topical therapy and isolation.",
      ],
      vignette: {
        stem: "A child and his mother both have intense itching that is worse at night. There are thin grey wavy lines in the finger webs and papules on the wrists.",
        answer: "Scabies — permethrin 5% for the whole family, repeated after a week.",
        reasoning:
          "Burrows in the finger webs, nocturnal itch and affected contacts are diagnostic.",
      },
      highYield:
        "Burrows in finger webs + nocturnal itch + family affected = scabies. Permethrin 5% neck down, repeat in 1 week, treat all contacts; ivermectin for crusted scabies.",
      checks: [
        {
          q: "Drug of choice for scabies:",
          options: ["Permethrin 5%", "Gamma benzene hexachloride", "Clotrimazole", "Mupirocin"],
          answer: 0,
          why: "Permethrin 5% cream is first-line.",
        },
        {
          q: "Crusted (Norwegian) scabies is seen in:",
          options: [
            "Healthy children",
            "Immunocompromised patients",
            "Pregnant women",
            "Psoriasis patients only",
          ],
          answer: 1,
          why: "Reduced immunity allows massive mite proliferation.",
        },
      ],
    },
    {
      id: "fungal",
      title: "Superficial fungal infections",
      minutes: 7,
      summary:
        "Dermatophytes infect keratin (skin, hair, nails); Malassezia causes pityriasis versicolor. A KOH mount confirms both.",
      examFocus:
        "Tinea types, KOH and Wood's lamp findings, why tinea capitis needs oral drugs, and steroid-modified tinea.",
      mechanism:
        "Dermatophytes (Trichophyton, Microsporum, Epidermophyton) produce keratinases and live only in dead keratinised tissue, spreading outward from the point of infection while the centre partly clears — producing the classic annular lesion with an active scaly border. Topical steroids suppress the local immune response that limits the fungus, so it spreads widely and loses its typical look ('tinea incognito') — a major problem in India. Hair and nail infections lie beyond the reach of creams, so they need oral antifungals.",
      points: [
        "Tinea corporis/cruris: annular plaques with an active scaly border and central clearing; diagnose with a KOH mount (branching septate hyphae).",
        "Tinea capitis: children; needs oral griseofulvin or terbinafine; kerion is an inflammatory boggy form.",
        "Wood's lamp: Microsporum hair infections fluoresce green; pityriasis versicolor yellow-orange; erythrasma coral red.",
        "Pityriasis versicolor (Malassezia): hypo- or hyperpigmented scaly macules on the trunk; KOH 'spaghetti and meatballs'; treat with topical azoles/selenium sulphide.",
        "Onychomycosis: oral terbinafine (or itraconazole) for months.",
        "Avoid topical steroid–antifungal combinations — they drive chronic, extensive and recurrent tinea.",
      ],
      pitfalls: [
        "Candida and dermatophytes look different on KOH: budding yeast with pseudohyphae vs septate branching hyphae.",
        "Topical creams can't cure tinea capitis or onychomycosis.",
      ],
      vignette: {
        stem: "A young man has hypopigmented, finely scaly macules over his upper back that become more obvious after sun exposure. KOH shows short hyphae and round spores.",
        answer: "Pityriasis versicolor (Malassezia) — topical azole or selenium sulphide.",
        reasoning: "Truncal scaly macules and the 'spaghetti and meatballs' KOH picture.",
      },
      highYield:
        "Tinea: annular, active border, KOH septate hyphae; tinea capitis/nails need oral drugs. Pityriasis versicolor = spaghetti & meatballs. Avoid steroid creams (tinea incognito).",
      checks: [
        {
          q: "'Spaghetti and meatballs' appearance on KOH mount is seen in:",
          options: ["Tinea corporis", "Pityriasis versicolor", "Candidiasis", "Tinea capitis"],
          answer: 1,
          why: "Malassezia shows short hyphae (spaghetti) and yeasts (meatballs).",
        },
        {
          q: "Tinea capitis is treated with:",
          options: [
            "Topical clotrimazole only",
            "Oral griseofulvin or terbinafine",
            "Topical steroids",
            "Oral fluconazole single dose",
          ],
          answer: 1,
          why: "Hair shaft infection needs systemic therapy.",
        },
      ],
    },
    {
      id: "acne",
      title: "Acne vulgaris",
      minutes: 6,
      summary:
        "Acne is a disease of the pilosebaceous unit driven by sebum, follicular plugging, Cutibacterium acnes and inflammation; treatment escalates with severity.",
      examFocus:
        "The four pathogenic factors, the primary lesion (comedone), the treatment ladder, and isotretinoin precautions.",
      mechanism:
        "At puberty androgens enlarge sebaceous glands. Abnormal keratinisation of the follicle lining plugs the opening, forming a microcomedone — the primary lesion. Trapped sebum feeds C. acnes, which generates inflammatory mediators, turning comedones into papules, pustules and nodules. Each drug targets a step: retinoids normalise follicular keratinisation, benzoyl peroxide and antibiotics reduce C. acnes, and isotretinoin shrinks the sebaceous glands themselves.",
      points: [
        "Primary lesion: comedone (open = blackhead, closed = whitehead).",
        "Comedonal acne: topical retinoid (adapalene, tretinoin).",
        "Mild–moderate inflammatory: topical retinoid + benzoyl peroxide ± topical clindamycin (never antibiotic alone — resistance).",
        "Moderate–severe: add oral doxycycline (or minocycline) for up to 3 months.",
        "Severe nodulocystic or scarring acne: oral isotretinoin — strictly teratogenic (contraception), monitor lipids and liver enzymes; dry lips are the commonest side effect.",
        "Hormonal therapy (combined OCP, spironolactone) helps women with hyperandrogenic acne.",
      ],
      pitfalls: [
        "Isotretinoin is teratogenic; pregnancy must be excluded and prevented during and for a month after treatment.",
        "Don't combine isotretinoin with tetracyclines — both raise intracranial pressure.",
      ],
      vignette: {
        stem: "A 19-year-old has deep painful nodules and cysts on his face and back with early scarring despite 3 months of doxycycline and topical therapy.",
        answer: "Severe nodulocystic acne — oral isotretinoin with lipid and liver monitoring.",
        reasoning:
          "Scarring nodulocystic acne unresponsive to oral antibiotics is the indication for isotretinoin.",
      },
      highYield:
        "Primary lesion = comedone. Retinoids for comedones; + BPO for inflammatory; doxycycline for moderate; isotretinoin for nodulocystic (teratogenic; not with tetracyclines).",
      checks: [
        {
          q: "Primary lesion of acne vulgaris:",
          options: ["Papule", "Pustule", "Comedone", "Nodule"],
          answer: 2,
          why: "The (micro)comedone starts every acne lesion.",
        },
        {
          q: "Isotretinoin should not be combined with tetracyclines because of:",
          options: ["Hepatotoxicity", "Pseudotumour cerebri", "Photosensitivity", "Nephrotoxicity"],
          answer: 1,
          why: "Both can raise intracranial pressure.",
        },
      ],
    },
    {
      id: "lichen-planus",
      title: "Lichen planus",
      minutes: 6,
      summary:
        "An itchy, T-cell-mediated interface dermatitis producing violaceous flat-topped papules, often with oral lacy white streaks.",
      examFocus:
        "The 'P's, Wickham's striae, histology (saw-tooth ridges, band-like infiltrate, Civatte bodies) and the hepatitis C association.",
      mechanism:
        "Cytotoxic T cells attack basal keratinocytes at the dermo-epidermal junction. Dying basal cells form eosinophilic Civatte (colloid) bodies, the junction takes on a 'saw-tooth' outline, and a dense band of lymphocytes hugs the junction. The compensatory thickening of the granular layer creates the fine white lines seen on the surface (Wickham's striae), and pigment dropping into the dermis leaves the long-lasting dark marks after lesions heal.",
      points: [
        "The P's: Purple, Polygonal, Planar (flat-topped), Pruritic Papules and Plaques.",
        "Sites: flexor wrists and forearms, shins, lower back, genitalia; oral reticular lacy white lesions on the buccal mucosa.",
        "Wickham's striae on the surface; Koebner phenomenon present.",
        "Nails: pterygium (dorsal) formation; scalp: scarring alopecia (lichen planopilaris).",
        "Histology: hyperkeratosis, wedge-shaped hypergranulosis, saw-tooth rete ridges, band-like lymphocytic infiltrate, Civatte bodies, Max-Joseph spaces.",
        "Associations: hepatitis C; lichenoid drug eruptions (antimalarials, β-blockers, gold). Treatment: topical steroids, oral steroids or acitretin for extensive disease.",
      ],
      pitfalls: [
        "Erosive oral lichen planus carries a small risk of squamous cell carcinoma — follow it up.",
        "Hypergranulosis (lichen planus) vs loss of granular layer (psoriasis) — a common histology contrast.",
      ],
      mnemonic: "The 6 Ps: Purple, Polygonal, Planar, Pruritic, Papules, Plaques.",
      vignette: {
        stem: "A 40-year-old has intensely itchy flat-topped violaceous papules on both wrists with fine white lines on their surface and lacy white streaks in the buccal mucosa.",
        answer: "Lichen planus — check hepatitis C; topical steroids.",
        reasoning: "Classic 'P' papules with Wickham's striae and reticular oral lesions.",
      },
      highYield:
        "6 Ps + Wickham's striae + oral lacy lesions. Histology: saw-tooth ridges, band-like infiltrate, Civatte bodies, hypergranulosis. Association: hepatitis C.",
      checks: [
        {
          q: "Civatte bodies are seen in:",
          options: ["Psoriasis", "Lichen planus", "Pemphigus", "Scabies"],
          answer: 1,
          why: "Apoptotic basal keratinocytes form Civatte (colloid) bodies.",
        },
        {
          q: "Infection associated with lichen planus:",
          options: ["Hepatitis B", "Hepatitis C", "HIV", "Herpes simplex"],
          answer: 1,
          why: "Hepatitis C is the classic association, particularly with oral lichen planus.",
        },
      ],
    },
    {
      id: "genital-ulcers",
      title: "Genital ulcers: syphilis, chancroid and others",
      minutes: 8,
      summary:
        "Whether a genital ulcer is painful or painless, indurated or soft, and the type of lymph node swelling usually identifies the cause.",
      examFocus:
        "Painless indurated chancre (syphilis) vs painful soft ulcer (chancroid), serology (VDRL vs TPHA), and first-line treatment.",
      mechanism:
        "Treponema pallidum provokes a dense plasma-cell and lymphocytic infiltrate around small vessels (endarteritis), which makes the chancre firm and painless. Haemophilus ducreyi produces a cytolethal toxin and suppurative inflammation, giving a soft, ragged, very painful ulcer and painful nodes that may rupture. Non-treponemal tests (VDRL, RPR) detect antibodies to cardiolipin released from damaged cells, so they track disease activity and fall after treatment; treponemal tests (TPHA, FTA-ABS) detect antibodies to the organism itself and usually stay positive for life.",
      points: [
        "Primary syphilis: single painless indurated (hard) chancre with clean base; painless rubbery inguinal nodes. Dark-field microscopy shows spirochaetes.",
        "Secondary syphilis: rash on palms and soles, condylomata lata, mucous patches, generalised lymphadenopathy.",
        "VDRL/RPR: screening and monitoring (titres fall with treatment; false positives in pregnancy, SLE, malaria). TPHA/FTA-ABS: confirmatory and remain positive.",
        "Treatment of early syphilis: single dose benzathine penicillin 2.4 million units IM; Jarisch–Herxheimer reaction may follow.",
        "Chancroid (H. ducreyi): painful, soft, ragged, purulent ulcers; painful suppurative bubo; 'school of fish' on Gram stain → azithromycin 1 g single dose.",
        "Herpes: painful grouped vesicles/erosions, multinucleated giant cells on Tzanck smear → acyclovir. Donovanosis: painless beefy-red bleeding ulcer, Donovan bodies. LGV: transient painless ulcer, 'groove sign' nodes.",
      ],
      table: {
        title: "Genital ulcers at a glance",
        columns: ["Disease", "Ulcer", "Pain", "Nodes"],
        rows: [
          ["Syphilis (primary)", "Single, indurated, clean", "Painless", "Painless, rubbery"],
          ["Chancroid", "Multiple, soft, ragged, purulent", "Painful", "Painful, suppurative bubo"],
          ["Genital herpes", "Grouped vesicles → erosions", "Painful", "Tender"],
          ["Donovanosis", "Beefy red, bleeds easily", "Painless", "Pseudobubo (subcutaneous)"],
          ["LGV", "Small, transient", "Painless", "Groove sign, suppurative"],
        ],
      },
      pitfalls: [
        "A falling VDRL titre shows treatment response; TPHA does not become negative.",
        "Painful ulcers = chancroid or herpes; painless = syphilis, donovanosis, LGV.",
      ],
      vignette: {
        stem: "A 25-year-old has a single painless, firm ulcer on the penis with a clean base and bilateral painless rubbery inguinal nodes, 3 weeks after unprotected sex.",
        answer:
          "Primary syphilis — dark-field microscopy/serology; benzathine penicillin 2.4 MU IM single dose.",
        reasoning:
          "Painless indurated chancre with painless nodes is classic; penicillin remains first-line.",
      },
      highYield:
        "Painless hard chancre = syphilis (benzathine penicillin 2.4 MU). Painful soft ulcer + bubo = chancroid (azithromycin). VDRL tracks activity; TPHA stays positive.",
      checks: [
        {
          q: "Serological test used to monitor response to syphilis treatment:",
          options: ["TPHA", "FTA-ABS", "VDRL", "TPI"],
          answer: 2,
          why: "Non-treponemal titres fall with successful treatment.",
        },
        {
          q: "A painful, soft, ragged genital ulcer with suppurative inguinal bubo is most likely:",
          options: ["Syphilis", "Chancroid", "Donovanosis", "LGV"],
          answer: 1,
          why: "Haemophilus ducreyi causes painful soft chancres and buboes.",
        },
      ],
    },
  ],
};
