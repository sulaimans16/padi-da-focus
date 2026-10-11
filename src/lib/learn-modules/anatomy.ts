import type { LearnModule } from "../learn";

export const anatomy: LearnModule = {
  slug: "anatomy",
  group: "Pre-clinical",
  subject: "Anatomy",
  icon: "accessibility_new",
  blurb:
    "Brachial plexus, inguinal canal, cranial nerves and muscle mechanics — the diagrams NBE keeps returning to.",
  cover: {
    file: "Human skeleton front en.svg",
    caption: "Human skeleton, anterior view",
    credit: "Wikimedia Commons (public domain)",
  },
  objectives: [
    "Localise a peripheral nerve lesion from the motor and sensory deficit alone.",
    "Explain hernia types from the relationship to the inferior epigastric vessels.",
    "Map each cranial nerve to its exit foramen and the sign produced by its palsy.",
    "Relate sarcomere architecture to the length–tension behaviour of muscle.",
    "Predict the gait and deficit from a lower-limb nerve injury.",
    "Trace each pharyngeal arch and pouch to its adult derivatives.",
    "Name the portosystemic anastomoses and the varices each produces.",
    "Localise a stroke syndrome to its artery from the clinical signs.",
  ],
  concepts: [
    {
      id: "brachial-plexus",
      title: "Brachial plexus — roots to branches",
      minutes: 9,
      summary:
        "C5–T1 ventral rami form roots → trunks → divisions → cords → terminal branches. Lesion level predicts the deficit exactly.",
      mechanism:
        "The plexus exists because the upper limb bud drags spinal segments with it during development, then rotates. Fibres from several roots must be re-sorted so that one nerve can supply one functional muscle group rather than one embryonic segment. That re-sorting is what the trunks, divisions and cords accomplish: anterior divisions carry flexor-compartment fibres, posterior divisions carry extensor-compartment fibres. This is why the posterior cord — built purely from posterior divisions — supplies every extensor of the arm through the radial and axillary nerves, and why a posterior cord lesion never weakens flexion.",
      points: [
        "Erb's palsy (C5–C6, upper trunk): adducted, internally rotated, pronated arm — the 'waiter's tip'. Caused by shoulder depression: birth injury, motorcycle fall.",
        "Klumpke (C8–T1, lower trunk): claw hand from intrinsic hand muscle loss; may add Horner's syndrome because T1 carries the sympathetic outflow to the head.",
        "Posterior cord → axillary + radial. Lateral cord → musculocutaneous + lateral root of median. Medial cord → ulnar + medial root of median.",
        "Long thoracic nerve (C5–C7) is pre-trunk and supplies serratus anterior — injury gives a winged scapula, classically after axillary node dissection.",
        "Axillary nerve wraps the surgical neck of the humerus: fracture there gives deltoid weakness plus a numb 'regimental badge' patch.",
      ],
      table: {
        title: "Nerve lesion → deficit map",
        columns: ["Nerve", "Motor loss", "Sensory loss", "Classic cause"],
        rows: [
          ["Axillary", "Abduction 15–90°", "Regimental badge patch", "Surgical neck fracture"],
          [
            "Radial",
            "Wrist and finger extension (wrist drop)",
            "First dorsal web space",
            "Midshaft humerus / 'Saturday night'",
          ],
          [
            "Median",
            "Thumb opposition, LOAF muscles",
            "Lateral 3½ digits, palmar",
            "Carpal tunnel, supracondylar fracture",
          ],
          [
            "Ulnar",
            "Interossei, adductor pollicis (claw)",
            "Medial 1½ digits",
            "Medial epicondyle, Guyon's canal",
          ],
          [
            "Musculocutaneous",
            "Elbow flexion and supination",
            "Lateral forearm",
            "Direct axillary trauma",
          ],
        ],
      },
      pitfalls: [
        "Ulnar claw is *worse* with a distal (wrist) lesion — the intact flexor digitorum profundus still flexes the fingers. This is the ulnar paradox.",
        "A supracondylar fracture threatens the median nerve and brachial artery; a midshaft fracture threatens the radial nerve. Don't swap them.",
      ],
      mnemonic: "Randy Travis Drinks Cold Beer — Roots, Trunks, Divisions, Cords, Branches.",
      vignette: {
        stem: "A 34-year-old falls from a motorbike and lands on his shoulder. His right arm hangs adducted and internally rotated with the forearm pronated. Sensation is reduced over the lateral arm; hand grip is normal.",
        answer: "Upper trunk (C5–C6) injury — Erb's palsy.",
        reasoning:
          "Normal grip excludes C8–T1. The posture reflects unopposed adductors and internal rotators after loss of deltoid, supraspinatus, infraspinatus and biceps — all C5–C6.",
      },
      highYield:
        "Winged scapula with medial border lift = long thoracic nerve. Add Horner's and the lesion is lower trunk / T1.",
      figure: {
        file: "Brachial plexus 2-2.png",
        caption: "Brachial plexus: roots, trunks, divisions, cords and terminal branches",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "inguinal-canal",
      title: "Inguinal canal and hernia anatomy",
      minutes: 7,
      summary:
        "A 4 cm oblique passage with four walls. Hesselbach's triangle — inguinal ligament, rectus sheath, inferior epigastric vessels — defines direct hernias.",
      mechanism:
        "The canal is the scar of testicular descent: the processus vaginalis pulls a sleeve of each abdominal wall layer down with it, which is why the spermatic coverings mirror the wall layer for layer. If that processus fails to obliterate, bowel follows the same congenital track through the deep ring — lateral to the inferior epigastric vessels. A direct hernia has no such track; it is a late-life failure of the posterior wall, pushing straight through the weak transversalis fascia of Hesselbach's triangle, medial to those vessels. The vessel relationship is therefore not arbitrary trivia — it is the embryology.",
      points: [
        "Indirect hernia: lateral to the inferior epigastric artery, through the deep ring, congenital, may reach the scrotum.",
        "Direct hernia: medial to the inferior epigastric artery, through Hesselbach's triangle, acquired, rarely enters the scrotum.",
        "Anterior wall: external oblique aponeurosis. Posterior wall: transversalis fascia + conjoint tendon. Roof: arching internal oblique and transversus. Floor: inguinal ligament.",
        "Femoral hernia passes *below* the inguinal ligament, lateral to the pubic tubercle — commoner in women and far likelier to strangulate.",
        "Contents in the male: spermatic cord (plus ilioinguinal nerve, which runs through the canal but is not in the cord).",
      ],
      table: {
        title: "Groin hernia differentiation",
        columns: ["Feature", "Indirect", "Direct", "Femoral"],
        rows: [
          ["Relation to epigastric vessels", "Lateral", "Medial", "Below inguinal ligament"],
          [
            "Relation to pubic tubercle",
            "Above and medial",
            "Above and medial",
            "Below and lateral",
          ],
          ["Age", "Any, often young", "Older", "Older women"],
          ["Strangulation risk", "Moderate", "Low", "High"],
        ],
      },
      pitfalls: [
        "The deep ring occlusion test is unreliable in exams and in clinic — decide on the vessel relationship at operation.",
        "'Above and medial to the pubic tubercle' distinguishes inguinal from femoral, not direct from indirect.",
      ],
      vignette: {
        stem: "A 68-year-old woman presents with a tender irreducible lump in the groin, vomiting, and absolute constipation. The lump lies below and lateral to the pubic tubercle.",
        answer: "Strangulated femoral hernia — needs urgent surgery.",
        reasoning:
          "The position below and lateral to the tubercle is femoral. The narrow, rigid femoral ring explains why obstruction and strangulation dominate the presentation.",
      },
      highYield:
        "Lateral to the inferior epigastric vessels = indirect. Medial = direct. Nothing else decides it.",
      figure: {
        file: "Inguinal Region Interior View.jpg",
        caption: "Inguinal region, interior view — rings, vessels and Hesselbach's triangle",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "cranial-nerves",
      title: "Cranial nerves — foramina, function and palsy signs",
      minutes: 8,
      summary:
        "Twelve nerves, each with an exit foramen and a single unmistakable bedside sign when it fails.",
      mechanism:
        "Cranial nerve questions are really questions about skull base topography. Nerves that share a foramen fail together, so the *combination* of deficits localises the lesion better than any single one. The superior orbital fissure carries III, IV, V1 and VI, so a cavernous sinus lesion produces a complete ophthalmoplegia with facial numbness but a normal optic nerve. The jugular foramen carries IX, X and XI, so a skull base tumour there gives dysphagia, hoarseness and trapezius weakness together. Learn the groupings and the individual facts follow.",
      points: [
        "CN III palsy: down-and-out eye, ptosis, dilated pupil. Pupil involvement suggests compression (posterior communicating aneurysm); pupil sparing suggests ischaemia (diabetes).",
        "CN IV (superior oblique) palsy: vertical diplopia worse on looking down and inward — patients tilt the head away from the lesion.",
        "CN VII: an upper motor neuron lesion spares the forehead (bilateral cortical input); a lower motor neuron lesion (Bell's palsy) does not.",
        "CN X palsy: the uvula deviates *away* from the lesion; CN XII palsy: the tongue deviates *towards* the lesion.",
        "CN V motor supplies the muscles of mastication; the jaw deviates towards the weak side.",
      ],
      table: {
        title: "Exit foramina worth knowing",
        columns: ["Foramen", "Nerves"],
        rows: [
          ["Cribriform plate", "I (olfactory)"],
          ["Optic canal", "II + ophthalmic artery"],
          ["Superior orbital fissure", "III, IV, V1, VI"],
          ["Foramen rotundum", "V2"],
          ["Foramen ovale", "V3"],
          ["Internal acoustic meatus", "VII, VIII"],
          ["Jugular foramen", "IX, X, XI"],
          ["Hypoglossal canal", "XII"],
        ],
      },
      pitfalls: [
        "A 'pupil-sparing' third nerve palsy is not benign in a young patient — image it.",
        "Forehead sparing points to a stroke, not Bell's palsy; missing this delays thrombolysis.",
      ],
      mnemonic:
        "Standing Room Only — Superior orbital fissure, foramen Rotundum, foramen Ovale for V1, V2, V3.",
      vignette: {
        stem: "A 58-year-old diabetic develops sudden ptosis with the right eye deviated down and out. The pupil is 3 mm and reactive.",
        answer: "Ischaemic (microvascular) third nerve palsy.",
        reasoning:
          "Parasympathetic pupillomotor fibres run superficially and are supplied by pial vessels, so they survive small-vessel ischaemia but are crushed first by an aneurysm. A reactive pupil favours ischaemia.",
      },
      highYield:
        "Pupil-involving CN III palsy = compressive until proven otherwise — think posterior communicating artery aneurysm.",
      figure: {
        file: "Brain human normal inferior view with labels en.svg",
        caption: "Inferior surface of the brain with cranial nerve origins labelled",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "sarcomere",
      title: "Sarcomere architecture and the length–tension curve",
      minutes: 6,
      summary:
        "Bands, zones and cross-bridges — the structural basis of why a stretched muscle can be a weak muscle.",
      mechanism:
        "Force is produced by myosin heads binding actin, so tension is proportional to the number of cross-bridges that can form. At optimal sarcomere length (~2.2 µm) every myosin head overlaps thin filament. Stretch further and the filaments slide apart, overlap falls and so does force. Shorten too far and thin filaments collide in the middle while thick filaments hit the Z-line, again reducing force. During contraction the A band (thick filament length) never changes; the I band and H zone shrink. That single fact answers most sarcomere questions.",
      points: [
        "A band = thick filament length, constant. I band = thin filament only. H zone = thick filament only. Z-line anchors actin; M-line anchors myosin.",
        "On contraction the I band and H zone narrow; the A band is unchanged.",
        "Calcium binds troponin C → tropomyosin shifts → myosin binding sites exposed (steric blocking model).",
        "Rigor mortis: no ATP means myosin cannot detach from actin, so muscle stays locked.",
        "Cardiac muscle operates on the ascending limb of the curve — this is the cellular basis of the Frank–Starling relationship.",
      ],
      pitfalls: [
        "ATP is required for *detachment*, not attachment — the classic reversed statement.",
        "The A band shortening is a distractor in almost every version of this question.",
      ],
      vignette: {
        stem: "A researcher stretches an isolated skeletal muscle fibre well beyond its resting length and stimulates it. Active tension falls sharply.",
        answer: "Reduced thick–thin filament overlap.",
        reasoning:
          "Fewer cross-bridges can form, and active tension tracks cross-bridge number almost linearly.",
      },
      highYield:
        "During contraction the A band stays the same width — only the I band and H zone shrink.",
      figure: {
        file: "Sarcomere.svg",
        caption: "Sarcomere showing A band, I band, H zone, Z-line and M-line",
        credit: "Wikimedia Commons",
      },
    },
    {
      id: "lower-limb-nerves",
      title: "Lower-limb nerve injuries",
      minutes: 7,
      summary:
        "Each lower-limb nerve has a vulnerable spot, a muscle group it powers and a gait or posture that gives the lesion away.",
      examFocus:
        "Foot drop after fibular neck fracture, Trendelenburg sign, safe intramuscular injection site, and the root values of the knee and ankle jerks.",
      mechanism:
        "A nerve is most easily injured where it runs superficially over bone or close to a joint. The common peroneal nerve wraps around the neck of the fibula just under the skin, so a fracture or a tight plaster there paralyses the dorsiflexors and evertors and the foot hangs. Gluteus medius and minimus hold the pelvis level when you stand on one leg; if the superior gluteal nerve is cut they can't, and the pelvis sags towards the unsupported side.",
      points: [
        "Common peroneal (fibular) nerve: at the fibular neck — foot drop, loss of dorsiflexion and eversion, high-stepping gait, sensory loss over the dorsum of the foot and lateral leg.",
        "Deep peroneal branch supplies skin of the first web space; superficial peroneal supplies most of the dorsum and the evertors.",
        "Tibial nerve: plantarflexion and inversion; lesion → can't stand on tiptoe, loss of sensation on the sole (tarsal tunnel at the medial malleolus).",
        "Femoral nerve (L2–L4): quadriceps — weak knee extension, absent knee jerk, numb anterior thigh and medial leg (saphenous branch).",
        "Obturator nerve (L2–L4): adductors of the thigh; sensory patch on the medial thigh.",
        "Superior gluteal nerve: positive Trendelenburg sign — standing on the affected leg, the pelvis drops on the opposite side.",
        "Inferior gluteal nerve: gluteus maximus — difficulty rising from a chair and climbing stairs.",
        "Sciatic nerve: injured in posterior hip dislocation or a wrongly placed gluteal injection — give injections in the upper outer quadrant.",
        "Reflexes: knee jerk L3–L4; ankle jerk S1–S2.",
      ],
      table: {
        title: "Nerve, muscle, deficit",
        columns: ["Nerve", "Key action", "Lesion sign"],
        rows: [
          ["Common peroneal", "Dorsiflexion, eversion", "Foot drop, high-stepping gait"],
          ["Tibial", "Plantarflexion, inversion", "Can't tiptoe; numb sole"],
          ["Femoral", "Knee extension", "Lost knee jerk; knee buckles"],
          ["Obturator", "Thigh adduction", "Weak adduction"],
          ["Superior gluteal", "Hip abduction", "Trendelenburg sign"],
          ["Inferior gluteal", "Hip extension", "Can't climb stairs"],
        ],
      },
      pitfalls: [
        "In a Trendelenburg sign the pelvis drops on the sound (opposite) side, not the side of the lesion.",
        "Foot drop with weak inversion too suggests an L5 root or sciatic lesion, not the peroneal nerve — the tibial nerve does inversion.",
      ],
      mnemonic: "PED and TIP: Peroneal Everts and Dorsiflexes; Tibial Inverts and Plantarflexes.",
      vignette: {
        stem: "After a below-knee plaster for an ankle fracture, a man cannot lift his foot and has numbness over the dorsum of the foot.",
        answer: "Common peroneal nerve compression at the neck of the fibula.",
        reasoning:
          "The nerve lies superficially on the fibular neck where a tight cast presses it, causing foot drop and dorsal sensory loss.",
      },
      highYield:
        "Fibular neck → common peroneal → foot drop. Superior gluteal → Trendelenburg. Sciatic → posterior hip dislocation. Knee jerk L3–4, ankle jerk S1–2.",
      checks: [
        {
          q: "Fracture of the neck of the fibula most commonly causes:",
          options: ["Claw toes", "Foot drop", "Loss of knee jerk", "Trendelenburg gait"],
          answer: 1,
          why: "The common peroneal nerve winds around the fibular neck and supplies the dorsiflexors.",
        },
        {
          q: "A positive Trendelenburg sign indicates weakness of:",
          options: ["Gluteus maximus", "Gluteus medius and minimus", "Quadriceps", "Hamstrings"],
          answer: 1,
          why: "These abductors, supplied by the superior gluteal nerve, keep the pelvis level in single-leg stance.",
        },
      ],
    },
    {
      id: "pharyngeal-arches",
      title: "Pharyngeal arches & pouches",
      minutes: 8,
      summary:
        "The head and neck develop from a series of pharyngeal arches, each with its own nerve, muscles, cartilage and artery, plus the pouches and clefts between them.",
      examFocus:
        "The nerve of each arch, derivatives of the 1st and 2nd arch cartilages, the parathyroid and thymus pouches, and DiGeorge syndrome.",
      mechanism:
        "Each arch is a package: a cartilage rod, a block of muscle, an artery and one cranial nerve that grows in with the muscle. Because a muscle keeps the nerve of its arch for life, you can predict a muscle's innervation from its origin — every muscle from the 2nd arch, from stapedius to the facial muscles, is supplied by the facial nerve. The pouches line the inside; the 3rd and 4th pouches migrate down the neck, which is why the inferior parathyroid comes from a higher pouch than the superior one.",
      points: [
        "1st arch (mandibular nerve, V3): muscles of mastication, mylohyoid, anterior belly of digastric, tensor tympani, tensor veli palatini. Meckel's cartilage → malleus, incus, sphenomandibular ligament.",
        "2nd arch (facial nerve, VII): muscles of facial expression, stapedius, stylohyoid, posterior belly of digastric. Reichert's cartilage → stapes, styloid process, lesser horn of hyoid.",
        "3rd arch (glossopharyngeal, IX): stylopharyngeus only; greater horn of hyoid; common and internal carotid arteries.",
        "4th arch (superior laryngeal, X): cricothyroid, pharyngeal constrictors; thyroid cartilage; arch of aorta (left), right subclavian.",
        "6th arch (recurrent laryngeal, X): all intrinsic laryngeal muscles except cricothyroid; pulmonary arteries and ductus arteriosus.",
        "Pouches: 1st → middle ear and Eustachian tube; 2nd → palatine tonsil; 3rd → inferior parathyroid and thymus; 4th → superior parathyroid and parafollicular C cells.",
        "1st cleft → external acoustic meatus. A persisting 2nd cleft gives a branchial cyst at the anterior border of sternocleidomastoid.",
        "DiGeorge syndrome (22q11 deletion): 3rd and 4th pouches fail → hypocalcaemia, absent thymus (T-cell deficiency), conotruncal heart defects.",
      ],
      table: {
        title: "Arch at a glance",
        columns: ["Arch", "Nerve", "Muscle clue", "Cartilage clue"],
        rows: [
          ["1st", "V3", "Mastication", "Malleus, incus"],
          ["2nd", "VII", "Facial expression, stapedius", "Stapes, styloid"],
          ["3rd", "IX", "Stylopharyngeus", "Greater horn of hyoid"],
          ["4th", "X (superior laryngeal)", "Cricothyroid", "Thyroid cartilage"],
          ["6th", "X (recurrent laryngeal)", "Intrinsic laryngeal", "Cricoid, arytenoid"],
        ],
      },
      pitfalls: [
        "The inferior parathyroid comes from the 3rd pouch and the superior from the 4th — the 3rd pouch tissue migrates further down with the thymus.",
        "There is no adult derivative from the 5th arch.",
      ],
      mnemonic:
        "Arch nerves in order: 5, 7, 9, 10, 10 (V3, VII, IX, superior laryngeal, recurrent laryngeal).",
      vignette: {
        stem: "A neonate has tetany on day 2, recurrent infections, a cleft palate and an interrupted aortic arch.",
        answer: "DiGeorge syndrome — failure of the 3rd and 4th pharyngeal pouches.",
        reasoning:
          "Absent parathyroids cause hypocalcaemia and an absent thymus causes T-cell deficiency, with conotruncal heart defects.",
      },
      highYield:
        "1st arch V3 + malleus/incus; 2nd arch VII + stapes; 3rd IX + stylopharyngeus; 4th/6th vagus. 3rd pouch → inferior parathyroid + thymus. DiGeorge = 3rd/4th pouch.",
      checks: [
        {
          q: "Stapedius is derived from the:",
          options: ["1st arch", "2nd arch", "3rd arch", "4th arch"],
          answer: 1,
          why: "Stapedius is a 2nd-arch muscle and so is supplied by the facial nerve.",
        },
        {
          q: "The inferior parathyroid gland develops from the:",
          options: ["2nd pouch", "3rd pouch", "4th pouch", "1st cleft"],
          answer: 1,
          why: "The 3rd pouch forms the inferior parathyroid and thymus, which descend together.",
        },
      ],
    },
    {
      id: "portosystemic",
      title: "Portal vein & portosystemic anastomoses",
      minutes: 6,
      summary:
        "Where portal and systemic veins meet, blood can bypass the liver. In portal hypertension these connections swell into varices.",
      examFocus:
        "Formation of the portal vein, each anastomosis and the varix it forms, and caput medusae.",
      mechanism:
        "The portal system has no valves, so when flow through a cirrhotic liver is obstructed and pressure rises, blood takes any route back to the systemic veins. The small veins at these meeting points dilate under the extra flow. The lower oesophagus matters most clinically because the varices there sit in thin submucosa, exposed to acid and food, and can bleed torrentially.",
      points: [
        "Portal vein: formed behind the neck of the pancreas by the superior mesenteric and splenic veins (at about L1–L2).",
        "Lower oesophagus: left gastric (portal) ↔ oesophageal tributaries of the azygos (systemic) → oesophageal varices.",
        "Anorectal junction: superior rectal (portal) ↔ middle and inferior rectal (systemic) → anorectal varices.",
        "Umbilicus: paraumbilical veins (portal) ↔ superficial epigastric veins (systemic) → caput medusae.",
        "Retroperitoneum: colonic veins ↔ retroperitoneal veins (veins of Retzius).",
        "Bare area of the liver: portal ↔ phrenic veins (veins of Sappey).",
        "Clinically significant portal hypertension: hepatic venous pressure gradient ≥ 10 mmHg; varices bleed above ~12 mmHg.",
        "TIPS connects the portal vein to a hepatic vein within the liver to decompress the portal system.",
      ],
      table: {
        title: "Anastomoses and their varices",
        columns: ["Site", "Portal side", "Systemic side", "Result"],
        rows: [
          ["Lower oesophagus", "Left gastric", "Azygos tributaries", "Oesophageal varices"],
          ["Anorectum", "Superior rectal", "Middle/inferior rectal", "Anorectal varices"],
          ["Umbilicus", "Paraumbilical", "Superficial epigastric", "Caput medusae"],
          ["Retroperitoneum", "Colic veins", "Veins of Retzius", "Retroperitoneal varices"],
        ],
      },
      pitfalls: [
        "Anorectal varices are not the same as haemorrhoids — haemorrhoids are vascular cushions and are no commoner in portal hypertension.",
        "In caput medusae from portal hypertension, blood flows away from the umbilicus; in IVC obstruction, flow in the abdominal wall veins is upwards.",
      ],
      vignette: {
        stem: "A man with alcoholic cirrhosis vomits a large amount of fresh blood. He has prominent veins radiating from the umbilicus.",
        answer:
          "Bleeding oesophageal varices from left gastric–azygos anastomosis; caput medusae from paraumbilical veins.",
        reasoning:
          "Portal hypertension opens all portosystemic channels; the oesophageal one is the one that bleeds dangerously.",
      },
      highYield:
        "Portal vein = SMV + splenic vein behind pancreatic neck. Oesophageal: left gastric ↔ azygos. Rectal: superior ↔ middle/inferior rectal. Umbilical: paraumbilical → caput medusae.",
      checks: [
        {
          q: "Oesophageal varices form at the anastomosis between the left gastric vein and:",
          options: [
            "Inferior phrenic vein",
            "Azygos tributaries",
            "Splenic vein",
            "Inferior rectal vein",
          ],
          answer: 1,
          why: "Oesophageal tributaries of the azygos system drain the lower oesophagus into the systemic circulation.",
        },
        {
          q: "Caput medusae is due to dilatation of:",
          options: [
            "Paraumbilical veins",
            "Veins of Retzius",
            "Veins of Sappey",
            "Superior rectal veins",
          ],
          answer: 0,
          why: "Paraumbilical veins along the ligamentum teres connect the portal vein to abdominal wall veins.",
        },
      ],
    },
    {
      id: "brain-blood-supply",
      title: "Blood supply of the brain & stroke syndromes",
      minutes: 9,
      summary:
        "The circle of Willis links carotid and vertebrobasilar territories. The pattern of weakness, sensory loss and cranial nerve signs tells you which artery is blocked.",
      examFocus:
        "ACA vs MCA vs PCA deficits, lenticulostriate arteries, lateral and medial medullary syndromes, and Weber syndrome.",
      mechanism:
        "The motor and sensory homunculus is laid out over the cortex with the leg on the medial surface and the face and arm on the lateral surface. The anterior cerebral artery supplies the medial surface and the middle cerebral the lateral, so an ACA stroke weakens the leg while an MCA stroke weakens the face and arm. In the brainstem, a crossed picture — cranial nerve signs on one side and limb signs on the other — localises the lesion because the cranial nerve nuclei are ipsilateral while the long tracts have not yet crossed or already have.",
      points: [
        "Circle of Willis: anterior communicating, anterior cerebral, internal carotid, posterior communicating and posterior cerebral arteries. The commonest site of a berry aneurysm is the anterior communicating artery.",
        "ACA: contralateral leg weakness and sensory loss, urinary incontinence, apathy (frontal lobe).",
        "MCA: contralateral face and arm > leg weakness and sensory loss, homonymous hemianopia; aphasia if the dominant hemisphere, neglect if non-dominant.",
        "Lenticulostriate branches of the MCA supply the internal capsule — pure motor lacunar strokes and hypertensive haemorrhage (Charcot–Bouchard microaneurysms).",
        "PCA: contralateral homonymous hemianopia with macular sparing (the occipital pole has MCA collateral supply).",
        "Lateral medullary (Wallenberg) syndrome — vertebral or PICA: ipsilateral facial pain/temperature loss, contralateral body pain/temperature loss, ipsilateral Horner's, dysphagia and hoarseness (nucleus ambiguus), vertigo, ataxia. No limb weakness.",
        "Medial medullary syndrome — anterior spinal artery: contralateral hemiplegia and loss of proprioception, tongue deviates to the side of the lesion (XII).",
        "Weber syndrome (midbrain): ipsilateral oculomotor palsy with contralateral hemiplegia.",
      ],
      table: {
        title: "Brainstem syndromes",
        columns: ["Syndrome", "Artery", "Ipsilateral", "Contralateral"],
        rows: [
          ["Weber (midbrain)", "PCA branches", "CN III palsy", "Hemiplegia"],
          [
            "Lateral medullary",
            "Vertebral / PICA",
            "Face pain-temp loss, Horner's, IX/X",
            "Body pain-temp loss",
          ],
          [
            "Medial medullary",
            "Anterior spinal",
            "Tongue deviation (XII)",
            "Hemiplegia, proprioception loss",
          ],
        ],
      },
      pitfalls: [
        "Lateral medullary syndrome has no limb weakness — the pyramids are medial.",
        "In a hypoglossal lesion the tongue deviates towards the side of the lesion.",
      ],
      mnemonic:
        "Lateral medullary — the 'D's: Dysphagia, Dysarthria, Dysphonia, Diplopia, Dizziness (vertigo), and crossed sensory loss.",
      vignette: {
        stem: "A 60-year-old has sudden vertigo, hoarseness and difficulty swallowing. There is loss of pain sensation on the left face and right side of the body, with a left Horner's syndrome. Power is normal.",
        answer: "Left lateral medullary syndrome — left vertebral artery / PICA.",
        reasoning:
          "Crossed pain-temperature loss, nucleus ambiguus involvement and Horner's without weakness localise to the lateral medulla.",
      },
      highYield:
        "ACA = leg; MCA = face + arm, aphasia; PCA = hemianopia with macular sparing. Lenticulostriate = capsular stroke + hypertensive bleed. Wallenberg: crossed sensory loss, no weakness.",
      checks: [
        {
          q: "Contralateral leg weakness with urinary incontinence suggests occlusion of the:",
          options: [
            "Middle cerebral artery",
            "Anterior cerebral artery",
            "Posterior cerebral artery",
            "Basilar artery",
          ],
          answer: 1,
          why: "The ACA supplies the medial surface where the leg area and frontal micturition centre lie.",
        },
        {
          q: "Which feature is NOT seen in lateral medullary syndrome?",
          options: [
            "Ipsilateral Horner's syndrome",
            "Dysphagia",
            "Contralateral hemiplegia",
            "Vertigo",
          ],
          answer: 2,
          why: "The corticospinal tracts run medially, sparing them in a lateral medullary infarct.",
        },
      ],
    },
  ],
};
