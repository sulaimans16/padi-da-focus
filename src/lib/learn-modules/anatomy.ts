import type { LearnModule } from "../learn";

export const anatomy: LearnModule = {
  slug: "anatomy",
  group: "Pre-clinical",
  subject: "Anatomy",
  icon: "accessibility_new",
  blurb: "Brachial plexus, inguinal canal, cranial nerves and muscle mechanics — the diagrams NBE keeps returning to.",
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
          ["Radial", "Wrist and finger extension (wrist drop)", "First dorsal web space", "Midshaft humerus / 'Saturday night'"],
          ["Median", "Thumb opposition, LOAF muscles", "Lateral 3½ digits, palmar", "Carpal tunnel, supracondylar fracture"],
          ["Ulnar", "Interossei, adductor pollicis (claw)", "Medial 1½ digits", "Medial epicondyle, Guyon's canal"],
          ["Musculocutaneous", "Elbow flexion and supination", "Lateral forearm", "Direct axillary trauma"],
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
          ["Relation to pubic tubercle", "Above and medial", "Above and medial", "Below and lateral"],
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
      mnemonic: "Standing Room Only — Superior orbital fissure, foramen Rotundum, foramen Ovale for V1, V2, V3.",
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
        reasoning: "Fewer cross-bridges can form, and active tension tracks cross-bridge number almost linearly.",
      },
      highYield: "During contraction the A band stays the same width — only the I band and H zone shrink.",
      figure: {
        file: "Sarcomere.svg",
        caption: "Sarcomere showing A band, I band, H zone, Z-line and M-line",
        credit: "Wikimedia Commons",
      },
    },
  ],
};
