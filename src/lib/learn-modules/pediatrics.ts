import type { LearnModule } from "../learn";

export const pediatrics: LearnModule = {
  slug: "pediatrics",
  group: "Clinical",
  subject: "Pediatrics",
  icon: "child_care",
  blurb:
    "Milestones, newborn jaundice and resuscitation, the Indian immunisation schedule, malnutrition, dehydration, heart disease and nephrotic syndrome.",
  objectives: [
    "Place a child's development on the milestone timeline in all four domains.",
    "Separate physiological from pathological neonatal jaundice and choose phototherapy or exchange.",
    "Recite India's Universal Immunisation Programme schedule.",
    "Grade dehydration and malnutrition by WHO criteria and treat each correctly.",
    "Recognise the classic congenital heart lesions from murmur and X-ray clues.",
  ],
  concepts: [
    {
      id: "milestones",
      title: "Developmental milestones",
      minutes: 8,
      summary:
        "Development is assessed in four domains — gross motor, fine motor, language and social — and each has anchor milestones the exam expects you to know by month.",
      examFocus:
        '"A child can do X and Y but not Z — what is the age?" Pick the age where all the listed skills fit.',
      mechanism:
        "Motor development follows myelination, which proceeds cephalocaudally (head control before sitting before walking) and proximodistally (whole-hand grasp before the pincer grasp). That is why head holding comes at 3 months but walking at 12, and why fine motor control of the fingertips is one of the last things to mature. Language and social skills depend on cortical maturation and interaction, so they are the domains most affected by hearing loss or deprivation.",
      points: [
        "Social smile 2 months; recognises mother 3 months; stranger anxiety 6–9 months; waves bye-bye 9–10 months.",
        "Head control 3 months; rolls over 5 months; sits with support 6, without support 8 months; stands holding 9; walks alone 12–13; runs 18 months.",
        "Bidextrous reach 4 months; transfers objects 6 months; immature pincer 9, mature pincer 12 months.",
        "Monosyllables 6 months; bisyllables ('mama') 9 months; first words with meaning 12 months; 2-word phrases 2 years; sentences 3 years.",
        "Copies: circle 3 years, cross 4 years, square 4½ years, triangle 5 years. Rides a tricycle 3 years.",
        "Red flags: no social smile by 3 months, not sitting by 9 months, not walking by 18 months, any loss of skills.",
      ],
      table: {
        title: "Anchor milestones",
        columns: ["Age", "Gross motor", "Fine motor", "Language", "Social"],
        rows: [
          ["3 months", "Neck holding", "Hands open", "Cooing", "Recognises mother"],
          [
            "6 months",
            "Sits with support",
            "Transfers objects",
            "Monosyllables",
            "Stranger anxiety begins",
          ],
          ["9 months", "Stands holding on", "Immature pincer", "Bisyllables", "Waves bye-bye"],
          ["12 months", "Walks alone", "Mature pincer", "1–2 words", "Plays simple games"],
          ["2 years", "Runs, climbs stairs", "Tower of 6 cubes", "2-word phrases", "Parallel play"],
          ["3 years", "Rides tricycle", "Copies a circle", "Sentences", "Knows own gender"],
        ],
      },
      pitfalls: [
        "Correct for prematurity up to 2 years: a baby born 2 months early is assessed against their corrected age.",
        "When several milestones are listed, the answer is the age at which the most advanced one is achieved.",
      ],
      mnemonic: "Circle at 3, cross at 4, square at 4½, triangle at 5.",
      vignette: {
        stem: "A child sits without support, transfers objects hand to hand and says 'ba', but does not yet stand holding on or say 'mama'.",
        answer: "About 7–8 months.",
        reasoning:
          "Sitting unsupported (8 months) and transferring (6 months) are present; standing with support and bisyllables (9 months) are not.",
      },
      highYield:
        "Social smile 2 m, neck holding 3 m, sitting 6–8 m, standing 9 m, walking 12 m. Pincer: immature 9 m, mature 12 m. Circle 3 y, square 4½ y.",
      checks: [
        {
          q: "A child who can copy a cross but not a square is approximately:",
          options: ["2 years", "3 years", "4 years", "5 years"],
          answer: 2,
          why: "Cross at 4 years, square at 4½ years.",
        },
        {
          q: "Mature pincer grasp is achieved at:",
          options: ["6 months", "9 months", "12 months", "18 months"],
          answer: 2,
          why: "Immature pincer appears around 9 months; mature (tip-to-tip) around 12 months.",
        },
      ],
    },
    {
      id: "neonatal-jaundice",
      title: "Neonatal jaundice",
      minutes: 8,
      summary:
        "Most newborn jaundice is physiological unconjugated hyperbilirubinaemia; the job is to spot the pathological pattern early and prevent kernicterus.",
      examFocus:
        "Features of physiological jaundice, red flags for pathological jaundice, and how phototherapy works.",
      mechanism:
        "A newborn has a high red cell mass with a shorter red cell life span, so it makes more bilirubin, while the liver's conjugating enzyme (UGT1A1) is still immature and the gut reabsorbs more bilirubin before bacteria colonise it. The result is a predictable rise in unconjugated bilirubin peaking around day 3–4. Unconjugated bilirubin is lipid-soluble and, when very high or when albumin binding is displaced, crosses the blood–brain barrier and stains the basal ganglia — kernicterus. Phototherapy converts bilirubin in the skin into water-soluble isomers (mainly lumirubin) that can be excreted without conjugation.",
      points: [
        "Physiological: appears after 24 hours, peaks day 3–4 (term), resolves by 14 days (term) or ~21 days (preterm); unconjugated.",
        "Pathological: appears within 24 hours, rises > 5 mg/dL/day, exceeds phototherapy thresholds, conjugated > 2 mg/dL (or > 20% of total), or persists > 2 weeks in term babies.",
        "Jaundice within 24 hours is pathological until proven otherwise — usually haemolysis (Rh or ABO incompatibility, G6PD deficiency).",
        "Kramer's rule: jaundice spreads head to toe as bilirubin rises (face ~5 mg/dL, palms and soles ~15+ mg/dL).",
        "Phototherapy uses blue light around 460–490 nm; exchange transfusion when bilirubin approaches toxic levels or signs of encephalopathy appear.",
        "Persistent conjugated jaundice with pale stools needs urgent evaluation for biliary atresia (Kasai procedure ideally before 60 days).",
      ],
      pitfalls: [
        "Pale stools and dark urine in a jaundiced 3-week-old are not 'breast-milk jaundice' — think biliary atresia.",
        "Phototherapy is useless for conjugated hyperbilirubinaemia and can cause 'bronze baby' syndrome.",
      ],
      vignette: {
        stem: "A 20-hour-old term baby, blood group A positive, mother O positive, is visibly jaundiced to the chest.",
        answer:
          "Pathological jaundice — likely ABO haemolytic disease; check bilirubin, Coombs test and start phototherapy as per thresholds.",
        reasoning:
          "Any jaundice in the first 24 hours is pathological; O mother with A baby is the classic ABO set-up.",
      },
      highYield:
        "Jaundice < 24 h = pathological (haemolysis). Physiological peaks day 3–4, gone by 14 days. Phototherapy → lumirubin. Pale stools = biliary atresia.",
      checks: [
        {
          q: "Which feature indicates pathological neonatal jaundice?",
          options: [
            "Appears on day 3",
            "Peaks on day 4",
            "Appears within 24 hours",
            "Unconjugated bilirubin of 8 mg/dL on day 3",
          ],
          answer: 2,
          why: "Jaundice in the first 24 hours is always pathological.",
        },
        {
          q: "Phototherapy lowers bilirubin mainly by converting it to:",
          options: ["Biliverdin", "Lumirubin", "Urobilinogen", "Conjugated bilirubin"],
          answer: 1,
          why: "Structural isomerisation to lumirubin allows excretion in bile and urine without conjugation.",
        },
      ],
    },
    {
      id: "immunisation",
      title: "National Immunisation Schedule (UIP)",
      minutes: 8,
      summary:
        "India's Universal Immunisation Programme gives vaccines at birth, 6/10/14 weeks, 9–12 months, 16–24 months, 5–6 years and adolescence.",
      examFocus:
        "Which vaccine at which visit, routes, and the vaccines that are live (and so avoided in immunodeficiency).",
      mechanism:
        "The schedule is shaped by two forces: when a disease strikes and when the infant's immune system can respond. Maternal antibodies protect against measles for several months but also neutralise a live measles vaccine, which is why MR waits until 9 months. Diseases that strike early, such as tuberculous meningitis and perinatal hepatitis B, are covered at birth. Primary series at 6, 10 and 14 weeks give repeated priming before maternal antibody wanes, and boosters later sustain memory.",
      points: [
        "Birth: BCG (intradermal, left upper arm), OPV-0, Hepatitis B birth dose (within 24 hours).",
        "6, 10, 14 weeks: OPV 1-2-3, Pentavalent 1-2-3 (DPT + HepB + Hib), Rotavirus 1-2-3; fIPV at 6 and 14 weeks; PCV at 6 and 14 weeks.",
        "9–12 months: MR-1, JE-1 (endemic districts), PCV booster, fIPV 3rd dose, vitamin A first dose.",
        "16–24 months: MR-2, JE-2, DPT booster-1, OPV booster.",
        "5–6 years: DPT booster-2. 10 and 16 years: Td. Pregnant women: Td (two doses, or one booster).",
        "Live vaccines in the schedule: BCG, OPV, MR, rotavirus, JE (live attenuated SA 14-14-2).",
      ],
      table: {
        title: "UIP at a glance",
        columns: ["Age", "Vaccines"],
        rows: [
          ["Birth", "BCG, OPV-0, Hep B-0"],
          ["6 weeks", "OPV-1, Penta-1, RVV-1, fIPV-1, PCV-1"],
          ["10 weeks", "OPV-2, Penta-2, RVV-2"],
          ["14 weeks", "OPV-3, Penta-3, RVV-3, fIPV-2, PCV-2"],
          ["9–12 months", "MR-1, JE-1*, PCV booster, fIPV-3, Vit A"],
          ["16–24 months", "MR-2, JE-2*, DPT B-1, OPV booster"],
          ["5–6 years", "DPT B-2"],
          ["10 & 16 years", "Td"],
        ],
      },
      pitfalls: [
        "PCV is given at 6 and 14 weeks (not 10) with a booster at 9 months under UIP.",
        "BCG is intradermal; MR is subcutaneous; Pentavalent is intramuscular (anterolateral thigh).",
      ],
      vignette: {
        stem: "A mother brings her 14-week-old for vaccination. The baby received all due vaccines at birth, 6 and 10 weeks.",
        answer: "OPV-3, Pentavalent-3, Rotavirus-3, fIPV-2 and PCV-2.",
        reasoning:
          "The 14-week visit completes the primary series and adds the second fractional IPV and PCV doses.",
      },
      highYield:
        "Birth: BCG + OPV-0 + Hep B. 6/10/14 wk: OPV, Penta, RVV (+ fIPV & PCV at 6 & 14). 9 m: MR-1, PCV booster, fIPV-3. 16–24 m: MR-2, DPT B-1.",
      checks: [
        {
          q: "Under UIP, the first dose of measles–rubella (MR) vaccine is given at:",
          options: ["6 weeks", "14 weeks", "9–12 months", "16–24 months"],
          answer: 2,
          why: "MR-1 at 9–12 months, after maternal antibody has waned.",
        },
        {
          q: "Route of BCG vaccination:",
          options: ["Subcutaneous", "Intramuscular", "Intradermal", "Oral"],
          answer: 2,
          why: "BCG is given intradermally, usually over the left deltoid region.",
        },
      ],
    },
    {
      id: "sam",
      title: "Severe acute malnutrition",
      minutes: 7,
      summary:
        "SAM in children 6–59 months is defined by very low weight-for-height, a small MUAC or bilateral pedal oedema, and is managed by the WHO 10-step protocol.",
      examFocus:
        "Diagnostic cut-offs (WHZ < −3 SD, MUAC < 11.5 cm, oedema) and the F-75 → F-100 sequence.",
      mechanism:
        "In severe malnutrition the body has adapted to scarcity: metabolism slows, the liver's capacity to handle protein falls, cell membranes leak sodium in and potassium out, and the heart shrinks. Feeding or hydrating too fast overwhelms these adaptations — sodium and fluid overload cause heart failure, and sudden carbohydrate intake shifts phosphate and potassium into cells (refeeding syndrome). That is why stabilisation uses a low-protein, low-sodium F-75 formula and cautious rehydration, before catch-up growth with F-100.",
      points: [
        "Criteria (6–59 months): weight-for-height < −3 SD, or MUAC < 11.5 cm, or bilateral pitting oedema.",
        "Kwashiorkor: oedema, flaky-paint dermatosis, sparse hair (flag sign), fatty liver. Marasmus: severe wasting, 'old man' face, no oedema.",
        "Stabilisation (days 1–7): treat hypoglycaemia, hypothermia, dehydration, electrolytes, infection (antibiotics for all), micronutrients; start F-75 (75 kcal/100 mL).",
        "Rehabilitation: F-100 (100 kcal/100 mL) or RUTF for catch-up growth.",
        "Rehydrate with ReSoMal (lower sodium, higher potassium) orally; IV fluids only for shock.",
        "Do not give iron in the stabilisation phase.",
      ],
      pitfalls: [
        "Standard ORS has too much sodium for a severely malnourished child — use ReSoMal.",
        "Bilateral pedal oedema alone qualifies as SAM regardless of weight.",
      ],
      mnemonic: "F-75 to stabilise, F-100 to grow.",
      vignette: {
        stem: "A 2-year-old has MUAC 11 cm, no oedema, and is alert with a good appetite.",
        answer: "Uncomplicated SAM — community management with RUTF.",
        reasoning:
          "MUAC < 11.5 cm defines SAM; with a passed appetite test and no complications, the child can be treated as an outpatient.",
      },
      highYield:
        "SAM = WHZ < −3 SD or MUAC < 11.5 cm or bilateral oedema. F-75 (stabilise) → F-100 (rehabilitate). ReSoMal, not ORS. No iron early.",
      checks: [
        {
          q: "MUAC cut-off for SAM in children 6–59 months:",
          options: ["< 12.5 cm", "< 11.5 cm", "< 13.5 cm", "< 10.5 cm"],
          answer: 1,
          why: "MUAC < 11.5 cm defines SAM; 11.5–12.5 cm is moderate acute malnutrition.",
        },
        {
          q: "Formula used in the stabilisation phase:",
          options: ["F-100", "F-75", "RUTF", "Standard infant formula"],
          answer: 1,
          why: "F-75 is low in protein and sodium to avoid overloading a fragile metabolism.",
        },
      ],
    },
    {
      id: "dehydration",
      title: "Diarrhoea, dehydration and ORS",
      minutes: 7,
      summary:
        "Grade dehydration with the WHO signs, then follow Plan A, B or C; low-osmolarity ORS and zinc are the backbone of treatment.",
      examFocus:
        "Composition and osmolarity of low-osmolarity ORS, the Plan B volume, Plan C timings, and the zinc dose.",
      mechanism:
        "ORS works because sodium–glucose co-transport (SGLT1) in the small intestine stays intact even in secretory diarrhoea such as cholera. Glucose drags sodium into the enterocyte, and water follows osmotically. Reducing osmolarity from 311 to 245 mOsm/L made the solution closer to plasma, so less water is pulled back into the gut lumen: stool output and vomiting fall and the need for IV fluids drops.",
      points: [
        "Low-osmolarity ORS (mmol/L): sodium 75, chloride 65, glucose 75, potassium 20, citrate 10; total osmolarity 245 mOsm/L.",
        "Plan A (no dehydration): ORS after each loose stool at home, continue feeding, zinc.",
        "Plan B (some dehydration): ORS 75 mL/kg over 4 hours, then reassess.",
        "Plan C (severe): IV Ringer's lactate 100 mL/kg — infants < 12 months: 30 mL/kg in 1 h then 70 mL/kg in 5 h; older children: 30 mL/kg in 30 min then 70 mL/kg in 2½ h.",
        "Zinc: 20 mg/day for 14 days (10 mg/day if under 6 months) — shortens and prevents episodes.",
        "Severe signs: lethargy/unconsciousness, sunken eyes, unable to drink or drinks poorly, skin pinch goes back very slowly (> 2 seconds).",
      ],
      table: {
        title: "WHO grading of dehydration",
        columns: ["Sign", "No dehydration", "Some", "Severe"],
        rows: [
          ["General condition", "Well, alert", "Restless, irritable", "Lethargic or unconscious"],
          ["Eyes", "Normal", "Sunken", "Sunken"],
          ["Thirst", "Drinks normally", "Drinks eagerly", "Drinks poorly / unable"],
          ["Skin pinch", "Goes back quickly", "Slowly", "Very slowly (> 2 s)"],
          ["Plan", "A", "B", "C"],
        ],
      },
      pitfalls: [
        "Antibiotics are not routine in childhood diarrhoea — only for dysentery (blood), suspected cholera with severe dehydration, or other specific infections.",
        "Two signs from a column are needed to classify, including at least one of the starred signs (general condition or skin pinch).",
      ],
      vignette: {
        stem: "A 2-year-old (10 kg) with watery diarrhoea is irritable, drinks eagerly, has sunken eyes and a skin pinch that goes back slowly.",
        answer: "Some dehydration — Plan B: 750 mL ORS over 4 hours, plus zinc.",
        reasoning:
          "75 mL/kg × 10 kg = 750 mL. Irritability, eager thirst and slow skin pinch place him in 'some dehydration'.",
      },
      highYield:
        "Low-osm ORS: Na 75, glucose 75, total 245 mOsm/L. Plan B = 75 mL/kg in 4 h. Plan C = RL 100 mL/kg (30 then 70). Zinc 20 mg × 14 days.",
      checks: [
        {
          q: "Osmolarity of WHO low-osmolarity ORS:",
          options: ["311 mOsm/L", "245 mOsm/L", "200 mOsm/L", "290 mOsm/L"],
          answer: 1,
          why: "The reduced-osmolarity formula is 245 mOsm/L.",
        },
        {
          q: "Zinc dose for a 1-year-old with acute diarrhoea:",
          options: [
            "10 mg/day × 7 days",
            "20 mg/day × 14 days",
            "20 mg/day × 7 days",
            "5 mg/day × 14 days",
          ],
          answer: 1,
          why: "20 mg/day for 14 days for children over 6 months.",
        },
      ],
    },
    {
      id: "chd",
      title: "Congenital heart disease",
      minutes: 9,
      summary:
        "Classify lesions as acyanotic (left-to-right shunts, obstructions) or cyanotic (right-to-left), then recognise each from its murmur and chest X-ray sign.",
      examFocus:
        "Commonest lesions, Tetralogy of Fallot and tet spells, X-ray signs, and which lesions need prostaglandin to keep the duct open.",
      mechanism:
        "Left-to-right shunts (VSD, ASD, PDA) add blood to the pulmonary circulation, causing breathlessness and failure to thrive; if untreated, the pulmonary vascular bed remodels and pressures rise until the shunt reverses — Eisenmenger syndrome, with late cyanosis. In Tetralogy of Fallot, right ventricular outflow obstruction pushes deoxygenated blood across the VSD into the overriding aorta; anything that lowers systemic resistance or tightens the infundibulum (crying, exertion) increases the right-to-left shunt and triggers a hypercyanotic spell. Squatting raises systemic resistance and reverses it.",
      points: [
        "Commonest CHD overall: VSD. Commonest cyanotic CHD beyond infancy: Tetralogy of Fallot. Commonest cyanotic at birth: transposition of the great arteries.",
        "TOF: VSD, overriding aorta, RV outflow obstruction, RV hypertrophy; boot-shaped heart with oligaemic lungs.",
        "Tet spell: knee-chest position, oxygen, morphine, IV fluids, propranolol; phenylephrine if needed.",
        "PDA: continuous 'machinery' murmur; closed with indomethacin or ibuprofen (or paracetamol) in preterms.",
        "Duct-dependent lesions (e.g. TGA, pulmonary atresia, critical coarctation): keep the duct open with prostaglandin E1.",
        "ASD (secundum): wide, fixed split S2. Coarctation: radio-femoral delay, rib notching, '3' sign.",
      ],
      table: {
        title: "X-ray signs",
        columns: ["Lesion", "Chest X-ray"],
        rows: [
          ["Tetralogy of Fallot", "Boot-shaped heart (coeur en sabot), oligaemic lungs"],
          ["Transposition of great arteries", "Egg on a string"],
          ["Supracardiac TAPVC", "Snowman / figure of 8"],
          ["Coarctation of aorta", "Rib notching, '3' sign"],
          ["Ebstein anomaly", "Box-shaped heart"],
        ],
      },
      pitfalls: [
        "Never give indomethacin to a baby with a duct-dependent lesion — it closes the lifeline.",
        "In TOF the murmur is from pulmonary stenosis, not the VSD; it softens during a tet spell as flow falls.",
      ],
      mnemonic: "PDA: Prostaglandin keeps it Patent; Indomethacin closes it.",
      vignette: {
        stem: "A 2-year-old cyanotic child squats after playing. Chest X-ray shows a boot-shaped heart with decreased pulmonary markings.",
        answer: "Tetralogy of Fallot.",
        reasoning:
          "Squatting raises systemic vascular resistance and reduces the right-to-left shunt; the boot shape comes from RVH with a small pulmonary artery.",
      },
      highYield:
        "VSD commonest overall; TOF commonest cyanotic after infancy; TGA commonest cyanotic at birth. Boot = TOF, egg on string = TGA, snowman = TAPVC.",
      checks: [
        {
          q: "'Egg on a string' on chest X-ray suggests:",
          options: [
            "Tetralogy of Fallot",
            "Transposition of the great arteries",
            "TAPVC",
            "Coarctation",
          ],
          answer: 1,
          why: "A narrow superior mediastinum with an oval heart is classic for TGA.",
        },
        {
          q: "Drug used to keep the ductus arteriosus open in duct-dependent CHD:",
          options: ["Indomethacin", "Ibuprofen", "Prostaglandin E1", "Propranolol"],
          answer: 2,
          why: "PGE1 (alprostadil) maintains ductal patency until surgery.",
        },
      ],
    },
    {
      id: "nrp",
      title: "Neonatal resuscitation and APGAR",
      minutes: 7,
      summary:
        "Most newborns need only warmth, drying and stimulation; those who don't breathe get effective positive-pressure ventilation within the 'golden minute'.",
      examFocus:
        "The golden minute, PPV rate, compression ratio, when to start compressions and adrenaline, and APGAR components.",
      mechanism:
        "A newborn who fails to breathe is almost always hypoxic because the lungs never inflated, not because the heart is primarily diseased. Opening the lungs with effective ventilation reverses the hypoxia, and the heart rate rises — which is why ventilation, not compressions, is the single most important step and why heart rate is the main indicator of success. Compressions are added only when the heart rate stays below 60/min despite 30 seconds of effective ventilation.",
      points: [
        "Initial steps (first ~30 s): provide warmth, position the head, clear the airway only if needed, dry and stimulate.",
        "Start PPV within 60 seconds (the golden minute) if the baby is apnoeic, gasping or the heart rate is < 100/min.",
        "PPV rate 40–60 breaths/min; start with room air (21% O₂) in term babies.",
        "Heart rate < 60/min after 30 s of effective PPV → chest compressions at 3:1 (90 compressions + 30 breaths per minute) with 100% oxygen.",
        "Persistent heart rate < 60/min despite compressions → adrenaline (epinephrine) 0.01–0.03 mg/kg IV/IO.",
        "APGAR at 1 and 5 minutes: Appearance, Pulse, Grimace, Activity, Respiration (each 0–2).",
      ],
      table: {
        title: "APGAR score",
        columns: ["Sign", "0", "1", "2"],
        rows: [
          [
            "Appearance (colour)",
            "Blue/pale all over",
            "Body pink, extremities blue",
            "Pink all over",
          ],
          ["Pulse", "Absent", "< 100", "≥ 100"],
          ["Grimace (reflex)", "None", "Grimace", "Cry / cough"],
          ["Activity (tone)", "Limp", "Some flexion", "Active motion"],
          ["Respiration", "Absent", "Weak, irregular", "Strong cry"],
        ],
      },
      pitfalls: [
        "APGAR is not used to decide whether to start resuscitation — don't wait for the 1-minute score.",
        "Routine suctioning of vigorous babies (even with meconium) is no longer recommended.",
      ],
      vignette: {
        stem: "A term baby is apnoeic after drying and stimulation. Heart rate is 80/min.",
        answer: "Start positive-pressure ventilation with room air at 40–60 breaths/min.",
        reasoning:
          "Apnoea with heart rate < 100 after the initial steps is the indication for PPV within the golden minute.",
      },
      highYield:
        "Golden minute: PPV by 60 s if apnoeic or HR < 100. Compressions if HR < 60 after 30 s of good PPV, ratio 3:1. APGAR at 1 & 5 min.",
      checks: [
        {
          q: "Compression-to-ventilation ratio in neonatal resuscitation:",
          options: ["15:2", "30:2", "3:1", "5:1"],
          answer: 2,
          why: "3 compressions to 1 breath, giving 90 compressions and 30 breaths per minute.",
        },
        {
          q: "Chest compressions are started when the heart rate after 30 s of effective PPV is below:",
          options: ["100/min", "80/min", "60/min", "40/min"],
          answer: 2,
          why: "Heart rate < 60/min despite effective ventilation is the trigger.",
        },
      ],
    },
    {
      id: "nephrotic",
      title: "Nephrotic syndrome in children",
      minutes: 7,
      summary:
        "Heavy proteinuria, hypoalbuminaemia and oedema in a young child is usually minimal change disease, which responds to steroids.",
      examFocus:
        "Definitions (nephrotic-range proteinuria, relapse, steroid resistance), the standard steroid regimen and complications.",
      mechanism:
        "In minimal change disease the podocyte foot processes efface and the glomerular basement membrane loses its negative charge, so albumin leaks selectively into the urine. Falling albumin lowers plasma oncotic pressure, fluid shifts into tissues (oedema) and the liver ramps up synthesis of lipoproteins (hyperlipidaemia) and clotting factors. Urinary loss of antithrombin III and immunoglobulins explains the two big complications: thrombosis and infections (especially pneumococcal peritonitis).",
      points: [
        "Definition: proteinuria > 40 mg/m²/h (or spot urine protein:creatinine > 2), serum albumin < 2.5 g/dL, oedema; hyperlipidaemia usually present.",
        "Commonest cause in children: minimal change disease (selective proteinuria, normal light microscopy, foot process effacement on electron microscopy).",
        "Initial treatment (ISPN): prednisolone 2 mg/kg/day (60 mg/m²) for 6 weeks, then 1.5 mg/kg on alternate days for 6 weeks.",
        "Relapse: urine albumin 3+ or more for 3 consecutive days after remission.",
        "Steroid resistance: no remission after 4–6 weeks of daily prednisolone → renal biopsy (often FSGS).",
        "Complications: infections (spontaneous bacterial peritonitis — pneumococcus), thrombosis (renal vein), hypovolaemia, AKI.",
      ],
      pitfalls: [
        "Haematuria, hypertension, low complement or age < 1 or > 12 years are atypical — biopsy before treating as minimal change.",
        "Steroid-resistant nephrotic syndrome in children is most often FSGS, not minimal change disease.",
      ],
      vignette: {
        stem: "A 4-year-old has periorbital puffiness and generalised oedema. Urine protein 4+, no haematuria, serum albumin 1.8 g/dL, cholesterol raised, normal BP and complement.",
        answer:
          "Idiopathic nephrotic syndrome, likely minimal change disease — start prednisolone 2 mg/kg/day.",
        reasoning:
          "A typical presentation with no atypical features (no haematuria, normal BP and C3) doesn't need a biopsy first.",
      },
      highYield:
        "Child + nephrotic = minimal change (steroid responsive). Prednisolone 2 mg/kg/day × 6 wk, then 1.5 mg/kg alternate days × 6 wk. Steroid resistant → biopsy (FSGS).",
      checks: [
        {
          q: "Most common cause of nephrotic syndrome in children:",
          options: ["FSGS", "Membranous nephropathy", "Minimal change disease", "MPGN"],
          answer: 2,
          why: "Minimal change disease accounts for most childhood nephrotic syndrome.",
        },
        {
          q: "Commonest organism causing spontaneous peritonitis in nephrotic children:",
          options: ["E. coli", "Streptococcus pneumoniae", "Staphylococcus aureus", "Klebsiella"],
          answer: 1,
          why: "Loss of immunoglobulins and complement predisposes to pneumococcal infection.",
        },
      ],
    },
  ],
};
