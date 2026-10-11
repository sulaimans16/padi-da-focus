import type { LearnModule } from "../learn";

export const forensicMedicine: LearnModule = {
  slug: "forensic-medicine",
  group: "Para-clinical",
  subject: "Forensic Medicine",
  icon: "gavel",
  blurb:
    "Postmortem changes, wounds and firearm injuries, asphyxia, identification, toxicology, medical law under the new criminal codes, and thermal and electrical injuries.",
  objectives: [
    "Estimate the time since death from cooling, rigor, hypostasis and decomposition.",
    "Classify mechanical and firearm wounds and read what they say about weapon, range and manner.",
    "Distinguish hanging, strangulation, throttling and drowning at autopsy.",
    "Estimate age, sex and stature from teeth and bones.",
    "Manage common poisonings and know the medicolegal duties of a doctor under BNS, BNSS and BSA.",
  ],
  concepts: [
    {
      id: "postmortem-changes",
      title: "Postmortem changes & time since death",
      minutes: 8,
      summary:
        "After death the body cools (algor mortis), blood settles (livor mortis), muscles stiffen and relax (rigor mortis) and finally the body decomposes — each on a rough clock that helps estimate the time since death.",
      examFocus:
        "Order and timing of rigor (Nysten's rule), colour of hypostasis in specific poisonings, cadaveric spasm vs rigor, and the first sign of decomposition.",
      mechanism:
        "After death ATP is no longer regenerated. Without ATP, myosin heads cannot detach from actin, so muscles lock — rigor mortis. It passes off only when the proteins themselves break down during decomposition. Livor mortis is simple gravity: blood pools in dependent vessels while it is still fluid, and once haemoglobin leaks into the tissues the stain becomes 'fixed' and no longer shifts when the body is turned. The colour of that blood shows the pigment carried in it, which is why carboxyhaemoglobin looks cherry-red and methaemoglobin chocolate-brown.",
      points: [
        "Algor mortis: body cools roughly 0.5–1 °C per hour in Indian conditions; rectal temperature is the standard reading. Henssge's nomogram corrects for body weight and environment.",
        "Postmortem caloricity (temperature rises after death): heat stroke, tetanus, strychnine, septicaemia, cholera.",
        "Livor mortis (hypostasis): appears within 1–2 h, fixed by about 6–8 h. Areas pressed against a surface stay pale (contact pallor).",
        "Rigor mortis: starts in the myocardium, then the eyelids; externally it follows Nysten's rule — face and neck → upper limbs → trunk → lower limbs, and passes off in the same order. In India it develops in ~2–3 h, is complete by ~12 h, and lasts another ~12 h.",
        "Cadaveric spasm: instant stiffening of a group of muscles at death without primary flaccidity (e.g. weapon gripped in hand, weeds clutched in drowning) — it records the last act and helps establish manner of death.",
        "Decomposition: first external sign is greenish discolouration of the right iliac fossa (caecum lies close to the skin) at ~12–18 h; then marbling and gas bloating.",
        "Modified decomposition: adipocere (saponification of fat) in warm, moist conditions; mummification (desiccation) in hot, dry conditions.",
      ],
      table: {
        title: "Colour of hypostasis",
        columns: ["Colour", "Cause"],
        rows: [
          ["Cherry-red", "Carbon monoxide (carboxyhaemoglobin)"],
          ["Bright / brick-red", "Cyanide; hypothermia"],
          ["Chocolate-brown", "Nitrites, chlorates, aniline (methaemoglobin)"],
          ["Bluish-green", "Hydrogen sulphide"],
          ["Dark brown / yellow", "Phosphorus"],
        ],
      },
      pitfalls: [
        "Heat stiffening (pugilistic attitude in burns) and cold stiffening are not rigor mortis — they don't follow Nysten's rule.",
        "Hypostasis can mimic bruising; cutting the area shows blood confined to vessels in hypostasis, but extravasated blood in a bruise.",
      ],
      mnemonic: "Rigor '12–12–12': ~12 h to develop fully, stays ~12 h, passes off over ~12 h.",
      vignette: {
        stem: "A man is found dead in a closed garage with the car engine running. Postmortem staining is a bright cherry-red colour.",
        answer: "Carbon monoxide poisoning.",
        reasoning:
          "CO binds haemoglobin to form carboxyhaemoglobin, which gives the cherry-red colour to hypostasis, blood and muscles.",
      },
      highYield:
        "Rigor: myocardium first, then Nysten's order. Hypostasis fixed by ~6–8 h. CO cherry-red, nitrites chocolate-brown. Decomposition starts at the right iliac fossa. Cadaveric spasm = no primary flaccidity.",
      checks: [
        {
          q: "Cadaveric spasm differs from rigor mortis because it:",
          options: [
            "Starts in the myocardium",
            "Has no stage of primary flaccidity",
            "Appears only after 6 hours",
            "Involves all muscles together",
          ],
          answer: 1,
          why: "Cadaveric spasm develops instantly at death in a group of muscles, skipping the primary relaxation seen before rigor.",
        },
        {
          q: "Chocolate-brown postmortem staining suggests poisoning by:",
          options: ["Carbon monoxide", "Cyanide", "Sodium nitrite", "Hydrogen sulphide"],
          answer: 2,
          why: "Nitrites form methaemoglobin, which is chocolate-brown.",
        },
      ],
    },
    {
      id: "injuries",
      title: "Mechanical injuries",
      minutes: 8,
      summary:
        "Blunt force gives abrasions, contusions and lacerations; sharp force gives incised and stab wounds. Reading the wound tells you the weapon, the age of the injury and often the manner of death.",
      examFocus:
        "Laceration vs incised wound, colour changes in a bruise, hesitation cuts vs defence wounds, and the definition of grievous hurt.",
      mechanism:
        "A blunt object crushes and stretches tissue until it tears, so a laceration has ragged edges, bruised margins and strands of nerves and vessels bridging the gap. A sharp edge divides tissue cleanly, leaving straight margins with no bridges. A bruise ages in colour because haemoglobin is broken down by macrophages — first to haemosiderin, then biliverdin and bilirubin — so the colour roughly dates the injury.",
      points: [
        "Abrasion: only the epidermis is lost; heals without a scar. It can show the pattern of the weapon (patterned abrasion) and the direction of force (heaped epithelium at the far end).",
        "Contusion (bruise): bleeding under intact skin. It may appear away from the point of impact (ectopic bruising, e.g. black eye from a blow to the forehead).",
        "Laceration: irregular edges, bruised margins, tissue bridges, crushed hair bulbs. Over bone (scalp, shin) a 'split laceration' can look incised — look for the bridges.",
        "Incised wound: length > depth, clean edges, no tissue bridges, gaping.",
        "Stab wound: depth > length; the shape at the skin hints at single- or double-edged blade.",
        "Suicide: hesitation (tentative) cuts — multiple, parallel, superficial, on accessible sites like the wrist and neck.",
        "Homicide: defence wounds — on palms and the ulnar side of the forearms as the victim tries to ward off the weapon.",
        "Grievous hurt (BNS 116, earlier IPC 320) includes emasculation, permanent loss of sight or hearing of either eye or ear, loss or impairment of a limb or joint, permanent disfigurement of head or face, fracture or dislocation of bone or tooth, and hurt endangering life or disabling the victim for 15 days (20 days under the old IPC).",
      ],
      table: {
        title: "Ageing a bruise",
        columns: ["Colour", "Approx. age", "Pigment"],
        rows: [
          ["Red", "Fresh", "Oxyhaemoglobin"],
          ["Blue / purple", "Hours – 3 days", "Deoxyhaemoglobin"],
          ["Brown", "~4 days", "Haemosiderin"],
          ["Green", "5–6 days", "Biliverdin / haematoidin"],
          ["Yellow", "7–12 days", "Bilirubin"],
          ["Normal", "~2 weeks", "Resolved"],
        ],
      },
      pitfalls: [
        "A scalp laceration from a blunt blow can look like an incised wound — tissue bridges in the depth give it away.",
        "Colour ageing of bruises is approximate and varies with depth, size and the person.",
      ],
      vignette: {
        stem: "A woman found dead has several superficial, parallel cuts on the left wrist beside one deep cut. There are no other injuries.",
        answer: "Suicide — hesitation cuts beside the fatal wound.",
        reasoning:
          "Tentative cuts on an accessible site on the non-dominant side are typical of self-infliction; defence wounds would point to homicide.",
      },
      highYield:
        "Laceration = ragged + tissue bridges; incised = clean, length > depth; stab = depth > length. Hesitation cuts = suicide; defence wounds = homicide. Bruise: red → blue → brown → green → yellow.",
      checks: [
        {
          q: "Which feature distinguishes a laceration from an incised wound?",
          options: [
            "Bleeding",
            "Tissue bridges in the wound",
            "Gaping",
            "Length greater than depth",
          ],
          answer: 1,
          why: "Blunt force tears tissue unevenly, leaving bridging strands; a sharp edge cuts everything cleanly.",
        },
        {
          q: "Defence wounds are usually found on:",
          options: [
            "Front of the wrist",
            "Palms and ulnar border of forearms",
            "Back of the neck",
            "Soles of the feet",
          ],
          answer: 1,
          why: "Victims raise their hands and forearms to grab or block the weapon.",
        },
      ],
    },
    {
      id: "firearm",
      title: "Firearm injuries",
      minutes: 7,
      summary:
        "The entry wound, the soot and powder around it and the bevelling of bone tell you which way the bullet went and from how far it was fired.",
      examFocus:
        "Entry vs exit wound, range of fire from burning/blackening/tattooing, bevelling of the skull and the contact wound over bone.",
      mechanism:
        "A discharge throws out more than the bullet: flame, smoke (soot) and unburnt powder grains travel only a short distance. Flame burns at very close range, light soot settles a little further, and heavier powder grains embed in the skin (tattooing) further still. Beyond that only the bullet arrives, rubbing a ring of abrasion as it punches in. In a skull the bullet chips out a wider crater on the side it leaves, so the inner table is bevelled at entry and the outer table at exit.",
      points: [
        "Entry wound: smaller, inverted edges, abrasion collar and grease (dirt) collar.",
        "Exit wound: larger, everted, irregular, no collar — except a 'shored' exit when the skin is supported by a belt or wall.",
        "Contact wound: muzzle imprint; over bone (e.g. temple) gases spread under the skin to give a stellate, cruciate split. Soot and burning lie inside the track.",
        "Close range: burning and singeing of hair, blackening (soot), tattooing (powder grains) — each zone extends further from the muzzle than the previous.",
        "Distant shot: only the abrasion and grease collars — range can't be judged beyond the powder zone.",
        "Skull: entry bevels the inner table, exit bevels the outer table.",
        "Tattooing cannot be wiped off; blackening (soot) can be washed away.",
        "Gunshot residue on the hands: dermal nitrate (paraffin) test is old; modern tests use SEM-EDX for lead, barium and antimony.",
      ],
      flow: {
        title: "Reading the range",
        steps: [
          { label: "Muzzle imprint, stellate split", detail: "Contact shot" },
          { label: "Burning + blackening + tattooing", detail: "Very close range" },
          { label: "Blackening + tattooing", detail: "Close range" },
          { label: "Tattooing only", detail: "Near range — grains travel furthest" },
          { label: "Collars only", detail: "Distant shot" },
        ],
      },
      pitfalls: [
        "A contact entry over bone can be larger and more ragged than the exit — don't rely on size alone.",
        "Clothing can filter soot and powder, making a close shot look distant; examine the clothes too.",
      ],
      vignette: {
        stem: "A bullet wound of the right temple has a stellate laceration with a muzzle imprint and soot inside the wound track.",
        answer: "Contact entry wound — consistent with suicide if the scene fits.",
        reasoning:
          "Gas from a contact discharge lifts the scalp off bone, splitting it in a star shape; temple contact wounds are typical of self-infliction.",
      },
      highYield:
        "Entry: inverted + abrasion collar; exit: everted, no collar. Skull: inner table bevelled at entry. Contact over bone = stellate. Tattooing can't be wiped off.",
      checks: [
        {
          q: "In a bullet wound of the skull, the entry is identified by bevelling of:",
          options: ["The outer table", "The inner table", "Both tables equally", "Neither table"],
          answer: 1,
          why: "The bullet pushes out a cone of bone, wider on the side it travels towards — the inner table at entry.",
        },
        {
          q: "Which close-range sign cannot be washed off?",
          options: ["Blackening", "Singeing", "Tattooing", "Grease collar"],
          answer: 2,
          why: "Powder grains embed in the skin, unlike soot that lies on the surface.",
        },
      ],
    },
    {
      id: "asphyxia",
      title: "Asphyxial deaths",
      minutes: 9,
      summary:
        "Hanging, ligature strangulation, throttling, smothering and drowning all deprive the body of oxygen, but each leaves a different signature on the neck and lungs.",
      examFocus:
        "Hanging vs strangulation ligature mark, hyoid fracture patterns, salivary dribbling, and the signs of antemortem drowning.",
      mechanism:
        "In hanging the body weight pulls the noose upward towards the knot, so the mark rides obliquely high on the neck and is broken where the knot sits. In strangulation a hand or ligature pulls horizontally with less force than body weight but more struggle, so the mark is low, horizontal and complete, and the deeper neck structures are injured. Drowning is proven by vital reaction: a living person inhales water, forming fine froth and carrying diatoms into the circulation and bone marrow.",
      points: [
        "Hanging is usually suicidal; strangulation and throttling are usually homicidal.",
        "Salivary dribbling from the angle of the mouth is the most reliable sign that hanging occurred in life.",
        "Judicial hanging: fracture of C2 pedicles with C2–C3 dislocation (hangman's fracture).",
        "Throttling (manual strangulation): crescentic fingernail abrasions and fingertip bruises; hyoid fracture is commoner and inward (adduction).",
        "Special terms: bansdola (neck compressed between bamboo sticks), garrotting (ligature from behind), mugging (forearm lock), smothering (nose and mouth closed), choking (obstruction inside the airway — 'café coronary').",
        "Drowning: fine, white, persistent froth at mouth and nostrils is the best external sign; emphysema aquosum and Paltauf's haemorrhages in the lungs; cadaveric spasm with weeds in the hand.",
        "Diatom test: diatoms in the femur bone marrow prove the person was alive when they entered the water.",
      ],
      table: {
        title: "Hanging vs ligature strangulation",
        columns: ["Feature", "Hanging", "Strangulation"],
        rows: [
          ["Mark direction", "Oblique, rising to the knot", "Horizontal"],
          ["Continuity", "Incomplete (gap at knot)", "Complete, encircles neck"],
          ["Level", "Above thyroid cartilage", "At or below thyroid cartilage"],
          ["Base of mark", "Dry, hard, parchment-like", "Soft, reddish"],
          ["Neck injury", "Less", "More extensive bruising"],
          ["Salivary dribble", "Present", "Absent"],
          ["Usual manner", "Suicide", "Homicide"],
        ],
      },
      pitfalls: [
        "A hyoid fracture is not required for death in throttling and is uncommon in the young because the bone is flexible.",
        "Froth can also follow pulmonary oedema — it must be fine, tenacious and reform after wiping to suggest drowning.",
      ],
      vignette: {
        stem: "A body is found with a horizontal, continuous ligature mark below the thyroid cartilage and extensive bruising of the neck muscles. There is no dribbling of saliva.",
        answer: "Ligature strangulation — likely homicide.",
        reasoning:
          "A low, complete, horizontal mark with deep neck injury fits strangulation; hanging gives an oblique mark interrupted at the knot.",
      },
      highYield:
        "Hanging: oblique, incomplete, high, dribbling saliva, suicide. Strangulation: horizontal, complete, low, homicide. Throttling: fingernail marks. Drowning: fine froth + diatoms in bone marrow.",
      checks: [
        {
          q: "The most reliable sign that hanging occurred during life is:",
          options: [
            "Ligature mark",
            "Dribbling of saliva",
            "Fracture of hyoid",
            "Protrusion of tongue",
          ],
          answer: 1,
          why: "Salivary secretion needs a living person; the other signs can occur when a body is suspended after death.",
        },
        {
          q: "The diatom test in drowning is best done on:",
          options: ["Stomach water", "Lung tissue", "Femoral bone marrow", "Skin"],
          answer: 2,
          why: "Diatoms reach the marrow only via circulation in a living person; lung and stomach can be contaminated after death.",
        },
      ],
    },
    {
      id: "identification",
      title: "Identification: age, sex & stature",
      minutes: 8,
      summary:
        "Teeth, ossification centres, the pelvis and skull, long-bone lengths and fingerprints help establish who a person — living or dead — is.",
      examFocus:
        "Eruption of the first permanent tooth, Gustafson's method, the most reliable bone for sex, the commonest fingerprint pattern, and the age of majority from x-rays.",
      mechanism:
        "Growth follows a predictable timetable: teeth erupt and epiphyses fuse to the shaft at fairly constant ages, so in the young these events give a narrow age window. Once growth stops, estimates rely on slower wear-and-tear changes in teeth and bone, so the range widens with age. Sex shows most in the pelvis because it is shaped for childbirth, and stature is calculated from long bones because their length scales with height.",
      points: [
        "Deciduous teeth: 20, complete by about 2½ years. Permanent: 32; first to erupt is the first molar at about 6 years.",
        "Gustafson's method estimates adult age from 6 dental changes (attrition, periodontosis, secondary dentine, cementum apposition, root resorption, root transparency) — root transparency is the most reliable.",
        "Ossification: union of the lower ends of radius and ulna around 18–20 years helps estimate the age of majority; the medial end of the clavicle is the last epiphysis to fuse (~22–25 years).",
        "Sex: pelvis is the single most reliable bone (wider subpubic angle and greater sciatic notch in females); pelvis plus skull gives ~98% accuracy.",
        "Stature: femur is the most reliable bone (Pearson's and Trotter–Gleser formulae).",
        "Fingerprints (dactylography, Galton): loops are commonest (~65%), then whorls, then arches (rarest). Prints are unique, even in identical twins.",
        "Other methods: poroscopy (sweat pores, Locard), cheiloscopy (lip prints), rugoscopy (palate ridges), DNA fingerprinting (Alec Jeffreys).",
        "Locard's exchange principle: every contact leaves a trace.",
      ],
      pitfalls: [
        "Identical twins share DNA but not fingerprints.",
        "Age from x-rays is a range, not a precise figure — courts accept a margin of about ±2 years.",
      ],
      mnemonic: "Fingerprints, most to least common: 'Loops Win Always' — Loops, Whorls, Arches.",
      vignette: {
        stem: "Skeletal remains include a pelvis with a wide subpubic angle and a broad greater sciatic notch. The femur measures 45 cm.",
        answer: "Female; estimate stature from the femur length with a regression formula.",
        reasoning:
          "A wide subpubic angle and broad sciatic notch are female pelvic features; femur length gives the best estimate of height.",
      },
      highYield:
        "First permanent tooth = 1st molar at 6 years. Gustafson: root transparency most reliable. Sex: pelvis best. Stature: femur. Fingerprints: loops commonest, arches rarest.",
      checks: [
        {
          q: "The most reliable single bone for determining sex is:",
          options: ["Skull", "Femur", "Pelvis", "Sternum"],
          answer: 2,
          why: "The pelvis shows the clearest sex differences because it is adapted for childbirth.",
        },
        {
          q: "Which fingerprint pattern is the commonest?",
          options: ["Arch", "Loop", "Whorl", "Composite"],
          answer: 1,
          why: "Loops form about two-thirds of fingerprint patterns.",
        },
      ],
    },
    {
      id: "toxicology",
      title: "Clinical toxicology",
      minutes: 9,
      summary:
        "Common Indian poisonings — organophosphates, snake bite, dhatura, and heavy metals — each have a recognisable toxidrome and a specific antidote.",
      examFocus:
        "Atropinisation end point in OP poisoning, the 20-minute whole blood clotting test, the anticholinergic toxidrome and classic antidotes.",
      mechanism:
        "Organophosphates block acetylcholinesterase, so acetylcholine accumulates at muscarinic, nicotinic and central synapses. Atropine blocks only muscarinic receptors, which is why it dries secretions but cannot reverse muscle weakness. Pralidoxime reactivates the enzyme only before the phosphorylated enzyme 'ages', so it must be given early. Dhatura does the opposite — it blocks muscarinic receptors — giving a hot, dry, flushed, delirious patient with dilated pupils.",
      points: [
        "Organophosphate: miosis, salivation, bronchorrhoea, bradycardia, fasciculations; kerosene-like smell. Give atropine until the chest is clear (drying of secretions is the target), plus early pralidoxime.",
        "Snake bite — neurotoxic (cobra, krait): ptosis is an early sign; krait bites are painless, often at night while asleep. Anticholinesterase (neostigmine with atropine) helps in cobra envenomation.",
        "Snake bite — vasculotoxic (Russell's viper, saw-scaled viper): local swelling and bleeding; 20WBCT (20-minute whole blood clotting test) detects coagulopathy.",
        "Polyvalent anti-snake venom in India covers the 'Big Four': cobra, common krait, Russell's viper, saw-scaled viper.",
        "Dhatura: anticholinergic toxidrome — dilated pupils, dry skin, flushing, hyperthermia, delirium; antidote physostigmine. Seeds are used by robbers to stupefy victims (road poisoning).",
        "Arsenic: rice-water diarrhoea mimicking cholera, Mees' lines on nails, raindrop pigmentation; detectable in hair and nails long after; antidote dimercaprol (BAL).",
        "Lead: Burton's blue line on gums, basophilic stippling, wrist drop, abdominal colic.",
        "Methanol: visual blurring and optic atrophy with high anion gap acidosis; fomepizole or ethanol.",
      ],
      table: {
        title: "Poison and antidote",
        columns: ["Poison", "Antidote"],
        rows: [
          ["Organophosphate", "Atropine + pralidoxime"],
          ["Dhatura / anticholinergics", "Physostigmine"],
          ["Paracetamol", "N-acetylcysteine"],
          ["Methanol / ethylene glycol", "Fomepizole (or ethanol)"],
          ["Cyanide", "Hydroxocobalamin; nitrites + thiosulphate"],
          ["Arsenic / mercury", "Dimercaprol (BAL)"],
          ["Iron", "Desferrioxamine"],
          ["Opioids", "Naloxone"],
          ["Benzodiazepines", "Flumazenil"],
        ],
      },
      pitfalls: [
        "Heart rate is not the target of atropinisation — tachycardia can come from hypoxia or pneumonia; aim for a clear chest.",
        "A normal 20WBCT at presentation should be repeated; viper coagulopathy can develop over hours.",
      ],
      mnemonic:
        "Anticholinergic: 'Hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter.'",
      vignette: {
        stem: "A farmer is brought in with pinpoint pupils, profuse sweating, frothy secretions, a heart rate of 50/min and muscle twitching. His clothes smell of kerosene.",
        answer: "Organophosphate poisoning — atropine until secretions dry, plus pralidoxime.",
        reasoning:
          "Muscarinic (miosis, secretions, bradycardia) and nicotinic (fasciculations) features with the solvent smell point to acetylcholinesterase inhibition.",
      },
      highYield:
        "OP: atropine to a clear chest + early pralidoxime. Krait: painless night bite, no local signs. Vipers: 20WBCT. Dhatura: physostigmine. Arsenic: Mees' lines, BAL.",
      checks: [
        {
          q: "The end point of atropinisation in organophosphate poisoning is:",
          options: [
            "Pupil dilatation",
            "Heart rate above 120/min",
            "Clear chest on auscultation",
            "Return of muscle power",
          ],
          answer: 2,
          why: "Bronchorrhoea is what kills; drying of chest secretions is the target. Atropine doesn't reverse nicotinic weakness.",
        },
        {
          q: "A painless bite while sleeping, followed hours later by ptosis and abdominal pain, suggests:",
          options: ["Russell's viper", "Common krait", "Saw-scaled viper", "Sea snake"],
          answer: 1,
          why: "Krait bites at night, often unnoticed, cause neurotoxicity with little local reaction.",
        },
      ],
    },
    {
      id: "medical-law",
      title: "Medical law & procedures",
      minutes: 9,
      summary:
        "From 1 July 2024 the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS) and Bharatiya Sakshya Adhiniyam (BSA) replaced the IPC, CrPC and Indian Evidence Act. A doctor must know the rules on inquest, dying declaration, consent, negligence and sexual offences.",
      examFocus:
        "Types of inquest, who records a dying declaration, consent rules by age, the test for criminal negligence, and POCSO reporting.",
      mechanism:
        "The law treats a doctor as both a healer and an expert witness. Consent works because touching without it is legally an assault, so the patient's agreement — given freely, informed and by someone legally competent — is what makes treatment lawful. A dying declaration is admitted without cross-examination on the reasoning that a person facing death has no motive to lie, which is why the doctor's certificate that the person was mentally fit matters so much.",
      points: [
        "Police inquest (BNSS 194, earlier CrPC 174) is the commonest type in India. Magistrate inquest (BNSS 196, earlier CrPC 176) is needed for deaths in police custody, dowry deaths within 7 years of marriage, and exhumation.",
        "Dying declaration (BSA 26, earlier Evidence Act 32): best recorded by a magistrate, but anyone can record it if time is short; no oath; the doctor certifies the person is conscious and oriented (compos mentis). If the person survives, it is no longer a dying declaration.",
        "Consent: a child under 12 needs a guardian's consent (BNS 27, earlier IPC 89); 18 years is the age for consenting to procedures with risk. Emergency treatment can proceed in good faith without consent (BNS 30, earlier IPC 92).",
        "Criminal negligence (BNS 106, earlier IPC 304A) requires gross negligence (Jacob Mathew v State of Punjab, 2005); civil negligence follows the Bolam test — what a reasonable body of doctors would do. 'Res ipsa loquitur': the thing speaks for itself (e.g. swab left in the abdomen).",
        "Rape is BNS 63–64 (earlier IPC 375–376). Examine the survivor with consent, without delay; the two-finger test is banned by the Supreme Court. Free first aid and treatment are mandatory for all hospitals.",
        "POCSO Act 2012 covers everyone under 18; failure to report a known offence is punishable.",
        "Evidence order in court: examination-in-chief → cross-examination → re-examination. Leading questions are allowed in cross-examination.",
      ],
      flow: {
        title: "Recording a dying declaration",
        steps: [
          {
            label: "Doctor certifies fitness",
            detail: "Conscious, oriented, able to speak — compos mentis",
          },
          {
            label: "Call the magistrate",
            detail: "If no time, the doctor or anyone present can record it",
          },
          {
            label: "Record in the person's own words",
            detail: "Question-answer format; no oath; no leading questions",
          },
          { label: "Read back and sign", detail: "Signature or thumb print, witnesses sign" },
          { label: "Doctor re-certifies", detail: "Fitness confirmed at the end too" },
        ],
      },
      pitfalls: [
        "Exams may still quote IPC/CrPC numbers — learn both the new and the old section.",
        "Cross-examination by the accused is not needed for a dying declaration; that is the feature of a dying deposition.",
      ],
      vignette: {
        stem: "A burns patient with 70% TBSA is conscious and oriented. Police want her statement, but the magistrate will take two hours to arrive and her condition is worsening.",
        answer:
          "The doctor records the dying declaration after certifying her fit, with witnesses present.",
        reasoning:
          "A magistrate is preferred, but when death may be imminent any person — ideally the doctor — may record it, certifying fitness before and after.",
      },
      highYield:
        "BNS/BNSS/BSA replaced IPC/CrPC/IEA from 1 July 2024. Police inquest commonest (BNSS 194). Dying declaration: no oath, magistrate preferred. Under 12 → guardian consent. Criminal negligence must be gross. Two-finger test banned.",
      checks: [
        {
          q: "Which inquest is mandatory for a death in police custody?",
          options: [
            "Police inquest",
            "Magistrate inquest",
            "Coroner's inquest",
            "Medical examiner's inquest",
          ],
          answer: 1,
          why: "Custodial deaths, dowry deaths and exhumations need a magistrate inquest.",
        },
        {
          q: "For a doctor to be criminally liable, the negligence must be:",
          options: [
            "Any deviation from protocol",
            "Gross or reckless",
            "Proved by an expert committee only",
            "Related to surgery",
          ],
          answer: 1,
          why: "Jacob Mathew (2005) held that only gross negligence attracts criminal liability.",
        },
      ],
    },
    {
      id: "thermal-electrical",
      title: "Thermal & electrical injuries",
      minutes: 7,
      summary:
        "At autopsy, burns, electrocution and lightning leave distinctive marks; the key question in burns is whether the person was alive in the fire.",
      examFocus:
        "Signs of antemortem burns, the pugilistic attitude, heat ruptures and heat haematoma, the Joule burn and Lichtenberg figures.",
      mechanism:
        "A person alive in a fire breathes smoke and carbon monoxide, so soot appears below the vocal cords and carboxyhaemoglobin rises in the blood — both impossible after death. Heat coagulates muscle proteins; the stronger flexors contract more than extensors, producing the boxer-like pugilistic posture in anyone, alive or dead. Electricity heats tissue where current density is highest — the small contact point at the entry — giving a pale, cratered Joule burn.",
      points: [
        "Antemortem burns: soot in the trachea below the cords, COHb > 10%, red flare and blisters with protein-rich fluid around the burns.",
        "Pugilistic attitude: heat coagulation of muscles — not a sign of life.",
        "Heat ruptures: splits in the skin that mimic incised wounds but have no vital reaction or bleeding.",
        "Heat haematoma: brick-red, honeycombed extradural collection from heated skull — mimics an antemortem extradural haematoma.",
        "Electrical injury: Joule burn (entry mark) — a crater with a raised pale rim and a halo; current through the chest (hand to hand) causes ventricular fibrillation.",
        "AC is more dangerous than DC at the same voltage: it causes tetanic spasm so the victim cannot let go.",
        "Lightning: Lichtenberg (arborescent, fern-like) figures that fade within hours; magnetisation and fusion of metal objects; clothes may be torn off.",
      ],
      table: {
        title: "Antemortem vs postmortem burns",
        columns: ["Feature", "Antemortem", "Postmortem"],
        rows: [
          ["Soot below vocal cords", "Present", "Absent"],
          ["Carboxyhaemoglobin", "Raised", "Normal"],
          ["Line of redness", "Present", "Absent"],
          ["Blister fluid", "Protein-rich, red base", "Little protein, pale base"],
        ],
      },
      pitfalls: [
        "A heat haematoma is postmortem — don't call it head trauma.",
        "Lichtenberg figures disappear within a day; their absence at autopsy doesn't exclude lightning.",
      ],
      vignette: {
        stem: "A charred body recovered from a house fire has soot in the trachea below the vocal cords and blood COHb of 40%.",
        answer: "The person was alive during the fire.",
        reasoning:
          "Soot inhalation and raised carboxyhaemoglobin need breathing; a body burned after death shows neither.",
      },
      highYield:
        "Alive in fire: soot below cords + raised COHb. Pugilistic attitude and heat ruptures are not vital signs. Joule burn = entry of current. Lightning = Lichtenberg figures.",
      checks: [
        {
          q: "Which finding proves the victim was alive during a fire?",
          options: [
            "Pugilistic attitude",
            "Heat ruptures",
            "Soot in the trachea below the vocal cords",
            "Heat haematoma",
          ],
          answer: 2,
          why: "Only a breathing person draws soot deep into the airway.",
        },
        {
          q: "Arborescent, fern-like markings on the skin are seen in:",
          options: ["High-voltage AC injury", "Lightning", "Scalds", "Chemical burns"],
          answer: 1,
          why: "Lichtenberg figures are characteristic of lightning strikes.",
        },
      ],
    },
  ],
};
