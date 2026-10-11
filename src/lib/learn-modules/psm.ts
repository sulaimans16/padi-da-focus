import type { LearnModule } from "../learn";

export const psm: LearnModule = {
  slug: "psm",
  group: "Para-clinical",
  subject: "PSM",
  icon: "groups",
  blurb:
    "Epidemiology, screening, the cold chain, national programmes, biomedical waste, health indicators, water and vitamin A — numbers-heavy and reliably scoring.",
  objectives: [
    "Choose the right study design and the measure of association it yields.",
    "Calculate sensitivity, specificity and predictive values from a 2×2 table.",
    "Store and handle each UIP vaccine correctly in the cold chain.",
    "Segregate biomedical waste into the right colour-coded bin.",
    "Define the core health indicators and the water chlorination standards.",
  ],
  concepts: [
    {
      id: "study-designs",
      title: "Epidemiological study designs",
      minutes: 9,
      summary:
        "Observational designs (cross-sectional, case-control, cohort) describe and associate; the randomised controlled trial tests causation. Each yields its own measure.",
      examFocus:
        "Match a scenario to its design, and the design to its measure — odds ratio for case-control, relative risk for cohort — plus the classic biases.",
      mechanism:
        "The direction of enquiry decides what you can calculate. A cohort starts with exposure and follows people forward, so you observe new cases and can compute incidence — and therefore relative risk and attributable risk. A case-control study starts with disease and looks back at exposure; because the investigator fixes the number of cases and controls, incidence is unknown, and only the odds of exposure can be compared — the odds ratio, which approximates relative risk when the disease is rare. Randomisation distributes known and unknown confounders equally, which is why only an RCT can establish causation directly.",
      points: [
        "Cross-sectional: snapshot of exposure and disease at one time → prevalence; can't show temporality.",
        "Case-control: disease → past exposure; quick, cheap, good for rare diseases; yields odds ratio; prone to recall and selection bias.",
        "Cohort: exposure → future disease; good for rare exposures; yields incidence, relative risk, attributable risk; expensive, loss to follow-up.",
        "RCT: gold standard for causation; randomisation removes selection bias and confounding; blinding removes observer bias.",
        "Berkson's bias: hospital-based case-control studies over-represent people with multiple conditions. Hawthorne effect: people change behaviour when observed.",
        "Attributable risk = incidence in exposed − incidence in unexposed (how much disease the exposure causes).",
      ],
      table: {
        title: "Designs at a glance",
        columns: ["Design", "Starts from", "Measure", "Best for"],
        rows: [
          [
            "Cross-sectional",
            "Population at one time",
            "Prevalence",
            "Burden, hypothesis generation",
          ],
          ["Case-control", "Disease (cases vs controls)", "Odds ratio", "Rare diseases"],
          ["Cohort", "Exposure", "Relative & attributable risk", "Rare exposures, incidence"],
          ["RCT", "Random allocation", "Efficacy, NNT", "Testing interventions"],
        ],
      },
      pitfalls: [
        "Incidence can't be calculated from a case-control study — the investigator chose how many cases to include.",
        "Odds ratio approximates relative risk only when the disease is rare.",
      ],
      vignette: {
        stem: "Researchers compare 100 patients with mesothelioma and 200 matched controls, asking both groups about past asbestos exposure.",
        answer: "Case-control study — measure of association is the odds ratio.",
        reasoning:
          "It starts from disease status and looks back at exposure; the rare outcome makes this design efficient.",
      },
      highYield:
        "Case-control → odds ratio (rare disease). Cohort → relative risk, attributable risk, incidence (rare exposure). RCT → causation.",
      checks: [
        {
          q: "Relative risk is directly calculated from:",
          options: [
            "Case-control study",
            "Cohort study",
            "Cross-sectional study",
            "Ecological study",
          ],
          answer: 1,
          why: "Cohort studies measure incidence in exposed and unexposed groups.",
        },
        {
          q: "Recall bias is most characteristic of:",
          options: ["RCT", "Cohort", "Case-control", "Cross-sectional"],
          answer: 2,
          why: "Cases tend to remember past exposures differently from controls.",
        },
      ],
    },
    {
      id: "screening",
      title: "Screening tests: sensitivity, specificity, predictive values",
      minutes: 8,
      summary:
        "Every screening test is judged from a 2×2 table: sensitivity and specificity describe the test; predictive values describe what a result means for a patient and depend on prevalence.",
      examFocus:
        "Calculate the four values from a table, and know which change with prevalence (predictive values) and which don't.",
      mechanism:
        "Sensitivity and specificity are fixed properties of a test because they are calculated within the diseased and non-diseased groups separately. Predictive values mix the two groups: in a population where disease is rare, even a very specific test produces many false positives simply because there are so many healthy people, so the positive predictive value falls. That is why the same test means different things in a screening camp and a specialist clinic.",
      points: [
        "Sensitivity = TP / (TP + FN): ability to detect the diseased; a highly sensitive test, when negative, rules out (SnNout).",
        "Specificity = TN / (TN + FP): ability to identify the healthy; a highly specific test, when positive, rules in (SpPin).",
        "PPV = TP / (TP + FP) rises with prevalence; NPV = TN / (TN + FN) falls with prevalence.",
        "Screening needs high sensitivity (miss few cases); confirmatory tests need high specificity.",
        "Tests in series (both must be positive) increase specificity; in parallel (either positive) increase sensitivity.",
        "Lead-time bias makes screen-detected cancers seem to survive longer even if death isn't delayed.",
      ],
      table: {
        title: "The 2×2 table",
        columns: ["", "Disease present", "Disease absent"],
        rows: [
          ["Test positive", "True positive (a)", "False positive (b)"],
          ["Test negative", "False negative (c)", "True negative (d)"],
        ],
      },
      flow: {
        title: "From table to values",
        steps: [
          { label: "Sensitivity = a / (a + c)", detail: "Down the 'disease present' column" },
          { label: "Specificity = d / (b + d)", detail: "Down the 'disease absent' column" },
          { label: "PPV = a / (a + b)", detail: "Across the 'test positive' row" },
          { label: "NPV = d / (c + d)", detail: "Across the 'test negative' row" },
        ],
      },
      pitfalls: [
        "Changing the prevalence changes PPV and NPV but never sensitivity or specificity.",
        "Lowering the cut-off of a test raises sensitivity at the cost of specificity.",
      ],
      mnemonic: "SnNout (sensitive, negative, rules out) · SpPin (specific, positive, rules in).",
      vignette: {
        stem: "A test is positive in 90 of 100 diseased people and in 20 of 400 healthy people.",
        answer: "Sensitivity 90%, specificity 95%, PPV 90/110 ≈ 82%, NPV 380/390 ≈ 97%.",
        reasoning:
          "TP 90, FN 10, FP 20, TN 380. Sensitivity 90/100; specificity 380/400; PPV 90/(90+20); NPV 380/(380+10).",
      },
      highYield:
        "Sensitivity & specificity are test properties; PPV/NPV depend on prevalence (PPV ↑ with prevalence). Series ↑ specificity; parallel ↑ sensitivity.",
      checks: [
        {
          q: "As the prevalence of a disease increases, the positive predictive value of a test:",
          options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
          answer: 0,
          why: "With more true disease in the population, a positive result is more likely to be a true positive.",
        },
        {
          q: "Using two tests in series (both must be positive) increases:",
          options: ["Sensitivity", "Specificity", "Negative predictive value", "Prevalence"],
          answer: 1,
          why: "Requiring both positives filters out false positives, increasing specificity.",
        },
      ],
    },
    {
      id: "cold-chain",
      title: "Cold chain and vaccine handling",
      minutes: 7,
      summary:
        "Vaccines lose potency with heat or freezing; the cold chain keeps them at +2 to +8°C from manufacturer to child, with checks like the VVM and shake test.",
      examFocus:
        "Storage temperatures, the most heat- and freeze-sensitive vaccines, the VVM reading and the shake test.",
      mechanism:
        "Live vaccines (OPV, measles, BCG) lose potency with heat because the attenuated organisms die. Adsorbed vaccines (DPT, Hep B, pentavalent, Td) contain antigen bound to an aluminium adjuvant; freezing breaks that bond irreversibly, the aluminium clumps, and the vaccine becomes less effective and more likely to cause abscesses. The shake test exploits this: a frozen-and-thawed vial settles faster with visible flakes.",
      points: [
        "Ice-lined refrigerator (ILR): +2 to +8°C for all UIP vaccines. Deep freezer: −15 to −25°C for ice packs.",
        "Most heat-sensitive: OPV (then measles/MR). Most freeze-sensitive: Hepatitis B (also pentavalent, DPT, Td, IPV, PCV).",
        "Vaccine vial monitor (VVM): usable while the inner square is lighter than the outer circle; discard once it matches or is darker.",
        "Shake test: detects freezing of adsorbed vaccines — a frozen vial shows faster sedimentation with flakes.",
        "Reconstituted BCG, MR and JE: use within 4 hours (or end of session), then discard.",
        "Open vial policy: opened multi-dose vials of OPV, pentavalent, DPT, Td, Hep B, IPV and PCV may be used for up to 28 days if conditions are met.",
      ],
      pitfalls: [
        "VVM shows cumulative heat exposure only — it can't detect freezing; that's what the shake test is for.",
        "Never keep freeze-sensitive vaccines at the bottom of the ILR, which is the coldest part.",
      ],
      vignette: {
        stem: "A health worker finds that the inner square of an OPV vial's VVM is the same colour as the outer circle.",
        answer: "Discard the vial — it has crossed the discard point.",
        reasoning: "A VVM is usable only while the inner square is lighter than the outer circle.",
      },
      highYield:
        "ILR +2 to +8°C. Most heat-sensitive: OPV. Most freeze-sensitive: Hep B. VVM checks heat; shake test checks freezing. Reconstituted BCG/MR: 4 hours.",
      checks: [
        {
          q: "Most heat-sensitive vaccine in the UIP:",
          options: ["Hepatitis B", "OPV", "Td", "BCG"],
          answer: 1,
          why: "Oral polio vaccine is the most heat-labile.",
        },
        {
          q: "The shake test is used to detect:",
          options: ["Heat exposure", "Freezing of adsorbed vaccines", "Contamination", "Expiry"],
          answer: 1,
          why: "Freezing irreversibly damages adsorbed vaccines; the test compares sedimentation with a deliberately frozen control.",
        },
      ],
    },
    {
      id: "ntep",
      title: "National TB Elimination Programme (NTEP)",
      minutes: 8,
      summary:
        "India's TB programme diagnoses with molecular tests upfront, treats drug-sensitive TB with a daily fixed-dose 6-month regimen, and tracks every patient on Ni-kshay.",
      examFocus:
        "The drug-sensitive regimen, upfront NAAT testing, case definitions and the patient support schemes.",
      mechanism:
        "TB bacilli exist in populations that differ in metabolic activity. The intensive phase uses four drugs to rapidly kill the actively multiplying bacilli and prevent resistance emerging by chance; the continuation phase uses fewer drugs for longer to sterilise the slow, semi-dormant organisms that would otherwise cause relapse. Combining drugs is essential because a single drug selects for naturally occurring resistant mutants.",
      points: [
        "Drug-sensitive TB (new and previously treated): 2HRZE (intensive, 2 months) + 4HRE (continuation, 4 months), daily fixed-dose combinations by weight band.",
        "Upfront NAAT (CBNAAT / Truenat) to detect TB and rifampicin resistance in presumptive cases.",
        "Presumptive pulmonary TB: cough ≥ 2 weeks, fever, weight loss, night sweats, haemoptysis, or any abnormal chest X-ray.",
        "Ni-kshay: the case-based web portal for notification and tracking; TB is a notifiable disease in India.",
        "Nikshay Poshan Yojana: monthly nutritional support by direct benefit transfer for the duration of treatment.",
        "TB preventive treatment (TPT) for household contacts and PLHIV, e.g. 3HP (weekly isoniazid + rifapentine for 3 months) or 6H.",
      ],
      table: {
        title: "First-line drugs: key toxicities",
        columns: ["Drug", "Main adverse effect"],
        rows: [
          ["Isoniazid (H)", "Peripheral neuropathy (prevent with pyridoxine), hepatitis"],
          ["Rifampicin (R)", "Orange urine/tears, hepatitis, enzyme induction"],
          ["Pyrazinamide (Z)", "Hepatotoxicity, hyperuricaemia (gout)"],
          ["Ethambutol (E)", "Optic neuritis (red–green colour vision loss)"],
        ],
      },
      pitfalls: [
        "Rifampicin induces liver enzymes and reduces the effect of oral contraceptives and many antiretrovirals.",
        "Ethambutol eye toxicity is dose-related; test colour vision before and during treatment.",
      ],
      mnemonic: "2HRZE + 4HRE — four drugs for 2 months, then three for 4.",
      vignette: {
        stem: "A 35-year-old newly diagnosed with sputum-positive, rifampicin-sensitive pulmonary TB on CBNAAT starts treatment.",
        answer:
          "2 months of HRZE followed by 4 months of HRE, daily FDC by weight, with pyridoxine and Ni-kshay notification.",
        reasoning: "This is the standard NTEP regimen for drug-sensitive TB.",
      },
      highYield:
        "DS-TB: 2HRZE / 4HRE daily FDC. Upfront NAAT for TB + rifampicin resistance. INH → neuropathy (pyridoxine); E → optic neuritis; Z → gout.",
      checks: [
        {
          q: "Continuation phase for drug-sensitive TB under NTEP:",
          options: ["4HR", "4HRE", "4HRZE", "6HE"],
          answer: 1,
          why: "Isoniazid, rifampicin and ethambutol daily for 4 months.",
        },
        {
          q: "Red–green colour blindness during TB treatment is due to:",
          options: ["Isoniazid", "Rifampicin", "Ethambutol", "Pyrazinamide"],
          answer: 2,
          why: "Ethambutol causes dose-dependent optic neuritis.",
        },
      ],
    },
    {
      id: "biomedical-waste",
      title: "Biomedical waste management (2016 rules)",
      minutes: 6,
      summary:
        "Waste is segregated at the source into four colour categories, each with its own treatment and disposal.",
      examFocus: "Which item goes into which colour bag or container — a guaranteed question.",
      mechanism:
        "Segregation at source is the whole system: once infectious waste mixes with general waste, everything must be treated as hazardous, and recyclable plastics are lost. The colours are matched to the treatment route — yellow to incineration or deep burial for material that can't safely be recycled, red to autoclaving and recycling for plastics, white to puncture-proof containers because sharps injure handlers, and blue to disinfection for glass and metal implants.",
      points: [
        "Yellow: human anatomical waste, animal waste, soiled waste (dressings, plaster casts, cotton swabs), expired/discarded medicines, chemical waste, microbiology and lab cultures → incineration / plasma pyrolysis / deep burial.",
        "Red: contaminated recyclable waste — tubing, bottles, IV sets, catheters, urine bags, syringes without needles, gloves → autoclave/microwave, then shredding and recycling.",
        "White (translucent, puncture-proof, tamper-proof): sharps — needles, syringes with fixed needles, scalpels, blades → autoclave, shredding, encapsulation.",
        "Blue (cardboard box with blue marking): broken or discarded glassware and metallic body implants → disinfection, then recycling.",
        "Untreated waste must not be stored beyond 48 hours.",
        "Chlorinated plastic bags are being phased out; the generator must pre-treat lab and blood-bank waste on site.",
      ],
      table: {
        title: "Colour coding",
        columns: ["Colour", "Examples", "Treatment"],
        rows: [
          [
            "Yellow",
            "Body parts, soiled dressings, expired drugs, lab cultures",
            "Incineration / deep burial",
          ],
          [
            "Red",
            "IV sets, catheters, tubing, gloves, syringes (no needle)",
            "Autoclave → shred → recycle",
          ],
          ["White", "Needles, blades, scalpels", "Autoclave → shred / encapsulate"],
          ["Blue", "Glassware, metallic implants", "Disinfect → recycle"],
        ],
      },
      pitfalls: [
        "Gloves and IV sets are red (recyclable), but a soiled cotton swab is yellow.",
        "Expired medicines are yellow, not red.",
      ],
      vignette: {
        stem: "After a dressing change a nurse has a used scalpel blade, blood-soaked gauze and a used plastic IV set.",
        answer: "Scalpel → white container; gauze → yellow bag; IV set → red bag.",
        reasoning:
          "Sharps go in the puncture-proof white container, soiled dressings are yellow, and recyclable plastics are red.",
      },
      highYield:
        "Yellow = anatomical, soiled, expired drugs, cultures. Red = recyclable plastics (IV sets, gloves). White = sharps. Blue = glass & metal implants. Store ≤ 48 h.",
      checks: [
        {
          q: "Used intravenous tubing should be discarded in:",
          options: ["Yellow bag", "Red bag", "White container", "Blue box"],
          answer: 1,
          why: "Contaminated recyclable plastics go into the red category.",
        },
        {
          q: "Broken glass ampoules go into:",
          options: ["Yellow", "Red", "White", "Blue"],
          answer: 3,
          why: "Glassware is collected in blue-marked cardboard boxes.",
        },
      ],
    },
    {
      id: "health-indicators",
      title: "Health and demographic indicators",
      minutes: 7,
      summary:
        "Mortality and fertility indicators measure a population's health; the exam tests their exact denominators and multipliers.",
      examFocus:
        "Definitions of IMR, MMR (ratio), PMR, NMR, TFR, NRR and the dependency ratio — denominators are the usual trap.",
      mechanism:
        "An indicator is only comparable if everyone uses the same numerator, denominator and multiplier. Infant and neonatal deaths are related to live births because only a live-born child can die in infancy. Maternal deaths are expressed per 100,000 rather than per 1,000 live births simply because they are rarer, so a larger multiplier gives a readable number. The infant mortality rate is the best single indicator of a community's health because it is sensitive to nutrition, sanitation, maternal care and immunisation all at once.",
      points: [
        "Infant mortality rate (IMR): deaths under 1 year per 1,000 live births. Neonatal mortality: deaths in the first 28 days per 1,000 live births.",
        "Perinatal mortality: late fetal deaths (≥ 28 weeks) + early neonatal deaths (first 7 days) per 1,000 live births (per 1,000 total births in WHO usage).",
        "Maternal mortality ratio (MMR): maternal deaths per 100,000 live births. Maternal death = death during pregnancy or within 42 days of its end, from causes related to it.",
        "Total fertility rate (TFR): average number of children a woman would have through her reproductive years; replacement level ≈ 2.1.",
        "Net reproduction rate (NRR) = 1 corresponds to replacement-level fertility.",
        "Dependency ratio = (population < 15 + > 64) / population 15–64 × 100.",
      ],
      table: {
        title: "Denominators to remember",
        columns: ["Indicator", "Per", "Denominator"],
        rows: [
          ["IMR", "1,000", "Live births"],
          ["Neonatal mortality rate", "1,000", "Live births"],
          ["Maternal mortality ratio", "100,000", "Live births"],
          ["Crude birth rate", "1,000", "Mid-year population"],
          ["Under-5 mortality rate", "1,000", "Live births"],
        ],
      },
      pitfalls: [
        "MMR is a ratio per 100,000 live births, not per 1,000.",
        "Maternal deaths include deaths up to 42 days after the end of pregnancy (late maternal deaths: 42 days to 1 year).",
      ],
      vignette: {
        stem: "A district records 20,000 live births and 600 deaths of children under 1 year in a year.",
        answer: "IMR = 30 per 1,000 live births.",
        reasoning: "600 / 20,000 × 1,000 = 30.",
      },
      highYield:
        "IMR /1,000 live births (best single health indicator). MMR /100,000 live births, deaths up to 42 days. TFR replacement ≈ 2.1; NRR 1 = replacement.",
      checks: [
        {
          q: "Denominator for maternal mortality ratio:",
          options: [
            "Total population",
            "1,000 live births",
            "100,000 live births",
            "Women of reproductive age",
          ],
          answer: 2,
          why: "MMR is expressed per 100,000 live births.",
        },
        {
          q: "Net reproduction rate of 1 means:",
          options: [
            "Population is doubling",
            "Replacement-level fertility",
            "Zero births",
            "Fertility below replacement",
          ],
          answer: 1,
          why: "Each woman is replaced by exactly one daughter who survives to reproductive age.",
        },
      ],
    },
    {
      id: "water",
      title: "Water purification and chlorination",
      minutes: 6,
      summary:
        "Safe drinking water depends on filtration and disinfection; chlorination is judged by the free residual chlorine left after the contact period.",
      examFocus:
        "Residual chlorine standard, contact time, what Horrock's apparatus and the orthotoluidine test measure, and the slow sand filter's vital layer.",
      mechanism:
        "Chlorine first reacts with organic matter, ammonia and reducing substances in water — the chlorine demand — and only after these are satisfied ('break-point') does free chlorine remain to kill microbes. Free residual chlorine at the end of the contact period proves that disinfection capacity was in excess and continues to protect water in the distribution system. Viruses and cysts need longer contact or higher doses than bacteria.",
      points: [
        "Free residual chlorine of 0.5 mg/L after a contact period of 1 hour is the standard for disinfected water.",
        "Horrock's apparatus estimates the dose of bleaching powder needed to disinfect water (chlorine demand).",
        "Orthotoluidine (OT) test measures free and combined residual chlorine; OTA test separates the two.",
        "Bleaching powder contains ~33% available chlorine; it is unstable and loses strength on storage.",
        "Slow sand filter: the 'Schmutzdecke' (vital layer) of algae and bacteria on the sand surface does the purification.",
        "Rapid sand filter: coagulation with alum before filtration; cleaned by back-washing.",
      ],
      pitfalls: [
        "Chlorine does not reliably kill Cryptosporidium oocysts, Giardia cysts or hepatitis A virus at routine doses.",
        "The test is of residual chlorine after contact time — not the dose added.",
      ],
      vignette: {
        stem: "After a flood a medical officer needs to know how much bleaching powder to add to a well.",
        answer:
          "Use Horrock's apparatus to estimate chlorine demand, chlorinate, and confirm 0.5 mg/L free residual chlorine after 1 hour.",
        reasoning:
          "Horrock's apparatus gives the bleaching powder dose; the OT test confirms the residual.",
      },
      highYield:
        "Free residual chlorine 0.5 mg/L after 1 hour contact. Horrock's = bleaching powder dose; OT test = residual chlorine. Slow sand = Schmutzdecke.",
      checks: [
        {
          q: "Horrock's apparatus is used to estimate:",
          options: [
            "Residual chlorine",
            "Chlorine demand / bleaching powder dose",
            "Hardness",
            "Bacterial count",
          ],
          answer: 1,
          why: "It determines how much bleaching powder is needed to disinfect a volume of water.",
        },
        {
          q: "Recommended free residual chlorine after 1 hour contact:",
          options: ["0.1 mg/L", "0.5 mg/L", "1 mg/L", "2 mg/L"],
          answer: 1,
          why: "0.5 mg/L is the standard.",
        },
      ],
    },
    {
      id: "vitamin-a",
      title: "Vitamin A deficiency and prophylaxis",
      minutes: 6,
      summary:
        "Vitamin A deficiency causes night blindness and xerophthalmia; India gives nine prophylactic doses from 9 months to 5 years.",
      examFocus:
        "The WHO xerophthalmia classification, the earliest symptom and sign, and prophylactic and treatment doses.",
      mechanism:
        "Retinal (from vitamin A) combines with opsin to form rhodopsin in the rods, the pigment for dim-light vision — so the first symptom of deficiency is night blindness. Vitamin A is also needed to maintain mucus-secreting epithelium; without it, the conjunctiva and cornea undergo keratinising metaplasia, producing dryness (xerosis), Bitot's spots, then corneal ulceration and keratomalacia. Its role in epithelial integrity and immunity explains why supplementation lowers child mortality from measles and diarrhoea.",
      points: [
        "Earliest symptom: night blindness (XN). Earliest sign: conjunctival xerosis (X1A).",
        "WHO classification: XN, X1A conjunctival xerosis, X1B Bitot's spots, X2 corneal xerosis, X3A ulceration < 1/3 cornea, X3B keratomalacia ≥ 1/3, XS corneal scar, XF xerophthalmic fundus.",
        "Prophylaxis (India): 1 lakh IU at 9 months with MR-1, then 2 lakh IU every 6 months up to 5 years — 9 doses in total.",
        "Treatment (> 1 year): 2 lakh IU orally on day 0, day 1 and day 14 (half the dose for 6–12 months).",
        "Rich sources: liver, fish liver oil, milk, eggs, green leafy vegetables, yellow/orange fruits (carotene).",
        "Vitamin A is teratogenic in high doses — avoid large doses in pregnancy.",
      ],
      pitfalls: [
        "Night blindness is the earliest symptom, but conjunctival xerosis is the earliest sign — the exam separates the two.",
        "Bitot's spots in older children may be inactive (not responsive to vitamin A).",
      ],
      vignette: {
        stem: "A 3-year-old cannot see well at dusk and has a triangular foamy patch on the temporal conjunctiva.",
        answer: "Vitamin A deficiency (XN + X1B Bitot's spots) — 2 lakh IU on days 0, 1 and 14.",
        reasoning:
          "Night blindness plus Bitot's spots; the treatment schedule for children over a year is three doses.",
      },
      highYield:
        "Night blindness = earliest symptom; conjunctival xerosis = earliest sign. Prophylaxis 1 lakh IU at 9 m, then 2 lakh IU 6-monthly to 5 y (9 doses).",
      checks: [
        {
          q: "Bitot's spots are classified as:",
          options: ["X1A", "X1B", "X2", "X3A"],
          answer: 1,
          why: "X1B = Bitot's spots in the WHO classification.",
        },
        {
          q: "Total number of prophylactic vitamin A doses under the national programme:",
          options: ["5", "7", "9", "10"],
          answer: 2,
          why: "One dose at 9 months, then every 6 months until 5 years: 9 doses.",
        },
      ],
    },
  ],
};
