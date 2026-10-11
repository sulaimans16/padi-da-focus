import type { LearnModule } from "../learn";

export const orthopaedics: LearnModule = {
  slug: "orthopaedics",
  group: "Clinical",
  subject: "Orthopaedics",
  icon: "orthopedics",
  blurb:
    "Supracondylar fractures, compartment syndrome, hip fractures, dislocations, osteomyelitis, bone tumours, Pott's spine and paediatric deformities.",
  objectives: [
    "Recognise the complications of a supracondylar humerus fracture and of compartment syndrome.",
    "Choose fixation vs replacement for femoral neck and intertrochanteric fractures.",
    "Identify shoulder and hip dislocations from posture and the nerve at risk.",
    "Match bone tumours to age, site and X-ray sign.",
    "Apply the Ponseti method and the newborn hip tests.",
  ],
  concepts: [
    {
      id: "supracondylar",
      title: "Supracondylar fracture of the humerus",
      minutes: 7,
      summary:
        "The commonest elbow fracture in children, usually extension-type after a fall on the outstretched hand; its danger is to the brachial artery and nearby nerves.",
      examFocus:
        "The nerve most commonly injured (anterior interosseous), Volkmann's ischaemic contracture, and the commonest late deformity (cubitus varus).",
      mechanism:
        "In children the supracondylar region is thin and weak, so a fall on the outstretched hand hyperextends the elbow and the distal fragment is displaced backwards. The sharp proximal fragment is then driven forward into the antecubital fossa, where it can tear or kink the brachial artery and stretch the median nerve (especially its anterior interosseous branch). If arterial flow is compromised, the forearm flexor muscles become ischaemic, swell inside their fascia (compartment syndrome) and later fibrose — Volkmann's ischaemic contracture.",
      points: [
        "Extension type ~95%; fall on outstretched hand; Gartland classification (I undisplaced, II angulated with intact posterior cortex, III completely displaced).",
        "Nerve most commonly injured: anterior interosseous nerve (median) — can't make the 'OK' sign. Radial nerve with posteromedial displacement; ulnar in flexion type or with a medial pin.",
        "Brachial artery injury → pulseless hand; if perfusion fails → compartment syndrome → Volkmann's ischaemic contracture (flexor digitorum profundus most affected).",
        "Commonest late complication: malunion causing cubitus varus ('gunstock deformity').",
        "Treatment: displaced fractures → closed reduction and percutaneous K-wire fixation.",
        "Three-point bony relationship (olecranon and epicondyles) is preserved — unlike posterior elbow dislocation.",
      ],
      pitfalls: [
        "A pink, pulseless hand may still be perfused; a white, pulseless hand needs urgent exploration.",
        "The three-point relationship is maintained in supracondylar fracture but disturbed in elbow dislocation.",
      ],
      vignette: {
        stem: "A 7-year-old fell on his outstretched hand. The elbow is swollen and he can't flex the tip of his thumb and index finger to make an 'O'. Radial pulse is present.",
        answer: "Extension-type supracondylar fracture with anterior interosseous nerve palsy.",
        reasoning:
          "Loss of FPL and FDP to the index finger (pinch) with intact sensation points to the anterior interosseous nerve.",
      },
      highYield:
        "Commonest nerve injured: anterior interosseous (median). Commonest late deformity: cubitus varus. Brachial artery injury → Volkmann's contracture.",
      checks: [
        {
          q: "Commonest late complication of supracondylar fracture of the humerus:",
          options: ["Cubitus valgus", "Cubitus varus", "Myositis ossificans", "Non-union"],
          answer: 1,
          why: "Malunion produces cubitus varus (gunstock deformity).",
        },
        {
          q: "Volkmann's ischaemic contracture most commonly affects:",
          options: [
            "Extensor digitorum",
            "Flexor digitorum profundus",
            "Brachioradialis",
            "Pronator quadratus",
          ],
          answer: 1,
          why: "The deep flexors of the forearm are most vulnerable to ischaemia.",
        },
      ],
    },
    {
      id: "compartment-syndrome",
      title: "Compartment syndrome",
      minutes: 6,
      summary:
        "Rising pressure inside a closed fascial compartment cuts off capillary perfusion; it is a clinical diagnosis and a surgical emergency treated by fasciotomy.",
      examFocus:
        "The earliest and most reliable sign (pain on passive stretch), why pulses are a late sign, and the pressure thresholds.",
      mechanism:
        "Fascia doesn't stretch. When bleeding or swelling raises pressure within a compartment, it first collapses the low-pressure veins and capillaries, so tissue perfusion stops while the large arteries — at much higher pressure — keep pulsing. Muscle and nerve become ischaemic within hours; ischaemic muscle swells further, creating a vicious cycle. Stretching the ischaemic muscle passively is excruciating, which is why it is the earliest reliable sign, long before pulses disappear.",
      points: [
        "Common sites: anterior compartment of the leg (tibial fracture), volar forearm (supracondylar fracture, crush).",
        "Earliest sign: pain out of proportion to the injury, worse on passive stretch of the muscles in the compartment.",
        "Late signs: paraesthesia, paralysis, pallor; pulses are usually present until very late.",
        "Pressure: fasciotomy if compartment pressure > 30 mmHg or ΔP (diastolic BP − compartment pressure) < 30 mmHg.",
        "First steps: remove tight casts and dressings, keep the limb at heart level (not elevated), then urgent fasciotomy.",
        "Complications: Volkmann's contracture, rhabdomyolysis with renal failure.",
      ],
      pitfalls: [
        "A palpable pulse does not rule out compartment syndrome.",
        "Elevating the limb reduces arterial inflow and worsens ischaemia — keep it at heart level.",
      ],
      vignette: {
        stem: "Six hours after plaster for a tibial shaft fracture, a man has severe leg pain unrelieved by morphine and screams when his toes are passively plantar-flexed. Dorsalis pedis pulse is felt.",
        answer: "Anterior compartment syndrome — split the cast and perform urgent fasciotomy.",
        reasoning:
          "Pain on passive stretch of the anterior compartment muscles is the key early sign; the pulse is irrelevant.",
      },
      highYield:
        "Earliest sign = pain on passive stretch. Pulses persist till late. Pressure > 30 mmHg or ΔP < 30 → fasciotomy. Don't elevate.",
      checks: [
        {
          q: "Most reliable early sign of compartment syndrome:",
          options: ["Absent pulse", "Pallor", "Pain on passive stretch", "Paralysis"],
          answer: 2,
          why: "Stretching ischaemic muscle causes disproportionate pain early on.",
        },
        {
          q: "Definitive treatment of established compartment syndrome:",
          options: ["Limb elevation", "Analgesics", "Fasciotomy", "Ice packs"],
          answer: 2,
          why: "Opening the fascia decompresses the compartment.",
        },
      ],
    },
    {
      id: "neck-of-femur",
      title: "Fracture neck of femur vs intertrochanteric fracture",
      minutes: 8,
      summary:
        "Intracapsular neck-of-femur fractures threaten the femoral head's blood supply (AVN, non-union); extracapsular intertrochanteric fractures heal well but can malunite.",
      examFocus:
        "Blood supply to the head, Garden classification, choice of fixation vs arthroplasty by age, and leg posture.",
      mechanism:
        "In adults the femoral head is supplied mainly by retinacular branches of the medial circumflex femoral artery, which run up the neck inside the capsule. An intracapsular fracture tears these vessels, so the head loses its blood supply (avascular necrosis) and the fragments, bathed in synovial fluid without periosteum, heal poorly (non-union). The intertrochanteric region, outside the capsule, has rich cancellous bone and blood supply, so it unites readily — but its fragments are pulled into varus, causing malunion if not fixed well.",
      points: [
        "Typical patient: elderly woman with osteoporosis after a trivial fall; leg shortened and externally rotated (more marked in intertrochanteric fractures).",
        "Garden classification of neck fractures: I incomplete/valgus impacted, II complete undisplaced, III partly displaced, IV fully displaced.",
        "Intracapsular complications: avascular necrosis and non-union.",
        "Treatment of neck fractures: young patients → urgent reduction and internal fixation (cannulated screws); elderly displaced → hemiarthroplasty or total hip replacement.",
        "Intertrochanteric (extracapsular): unites well; fixed with a dynamic hip screw or proximal femoral nail; complication is malunion (coxa vara).",
        "Early mobilisation prevents pneumonia, bedsores and DVT in the elderly.",
      ],
      table: {
        title: "Neck vs intertrochanteric",
        columns: ["Feature", "Neck of femur", "Intertrochanteric"],
        rows: [
          ["Location", "Intracapsular", "Extracapsular"],
          ["Blood supply risk", "High (AVN)", "Low"],
          ["Union", "Poor (non-union)", "Good"],
          ["Main complication", "AVN, non-union", "Malunion (coxa vara)"],
          ["External rotation", "Less", "More marked"],
          ["Surgery (elderly)", "Hemi/total arthroplasty if displaced", "DHS / PFN fixation"],
        ],
      },
      pitfalls: [
        "A displaced neck fracture in an elderly patient is replaced, not fixed — fixation fails because the head dies.",
        "In a young adult, the same fracture is an emergency for anatomical reduction to save the head.",
      ],
      vignette: {
        stem: "A 78-year-old woman trips at home and cannot bear weight. Her right leg is short and externally rotated. X-ray: completely displaced subcapital fracture (Garden IV).",
        answer:
          "Displaced intracapsular neck-of-femur fracture — hemiarthroplasty (or total hip replacement).",
        reasoning:
          "Displacement disrupts the retinacular vessels; in the elderly, replacement allows early mobilisation and avoids AVN/non-union.",
      },
      highYield:
        "Intracapsular neck fracture → AVN & non-union (medial circumflex femoral artery). Elderly displaced → arthroplasty. Intertrochanteric → unites well, DHS/PFN, coxa vara.",
      checks: [
        {
          q: "Main blood supply to the adult femoral head:",
          options: [
            "Artery of ligamentum teres",
            "Medial circumflex femoral artery",
            "Superior gluteal artery",
            "Nutrient artery of femur",
          ],
          answer: 1,
          why: "Retinacular branches of the medial circumflex femoral artery supply most of the head.",
        },
        {
          q: "Commonest complication of intertrochanteric fracture:",
          options: ["Avascular necrosis", "Non-union", "Malunion (coxa vara)", "Infection"],
          answer: 2,
          why: "It unites readily but tends to collapse into varus.",
        },
      ],
    },
    {
      id: "dislocations",
      title: "Shoulder and hip dislocations",
      minutes: 7,
      summary:
        "Shoulder dislocations are usually anterior and threaten the axillary nerve; hip dislocations are usually posterior and threaten the sciatic nerve and femoral head.",
      examFocus:
        "Posture of each dislocation, the nerve at risk, Bankart and Hill–Sachs lesions, and the urgency of hip reduction.",
      mechanism:
        "The glenohumeral joint trades stability for mobility: a shallow glenoid lets the head escape forward when the arm is abducted and externally rotated, tearing the anterior labrum (Bankart) and dinting the back of the head against the glenoid rim (Hill–Sachs) — lesions that predispose to recurrence. The axillary nerve wraps around the surgical neck just below the joint, so it is stretched. In a dashboard injury the flexed knee drives the femur backwards out of the acetabulum, endangering the sciatic nerve behind the joint and the retinacular vessels, so delay in reduction raises the risk of AVN.",
      points: [
        "Anterior shoulder dislocation (> 95%): arm held abducted and externally rotated, loss of the rounded shoulder contour; axillary nerve injury (regimental badge numbness).",
        "Bankart lesion: anterior labral tear; Hill–Sachs: posterolateral humeral head defect — both cause recurrent dislocation.",
        "Posterior shoulder dislocation: epileptic fits, electric shock; arm internally rotated; 'light bulb' sign on AP X-ray.",
        "Posterior hip dislocation (commonest): dashboard injury; hip flexed, adducted, internally rotated; sciatic nerve injury.",
        "Anterior hip dislocation: hip flexed, abducted, externally rotated.",
        "Reduce a dislocated hip urgently (ideally within 6 hours) to reduce the risk of AVN.",
      ],
      table: {
        title: "Posture of dislocations",
        columns: ["Dislocation", "Posture", "Nerve at risk"],
        rows: [
          ["Anterior shoulder", "Abducted, externally rotated", "Axillary"],
          ["Posterior shoulder", "Adducted, internally rotated", "—"],
          ["Posterior hip", "Flexed, adducted, internally rotated", "Sciatic"],
          ["Anterior hip", "Flexed, abducted, externally rotated", "Femoral"],
        ],
      },
      pitfalls: [
        "Posterior shoulder dislocation is easily missed on an AP film — look for the light bulb sign or take an axillary view.",
        "Check the axillary and sciatic nerves before and after reduction and document both.",
      ],
      vignette: {
        stem: "A car passenger's knee hit the dashboard. His right hip is flexed, adducted and internally rotated, and he can't dorsiflex his foot.",
        answer:
          "Posterior hip dislocation with sciatic (common peroneal division) nerve injury — urgent closed reduction.",
        reasoning:
          "Dashboard injury and the classic flexed–adducted–internally rotated posture; foot drop indicates sciatic involvement.",
      },
      highYield:
        "Shoulder: anterior commonest, axillary nerve, Bankart + Hill–Sachs. Hip: posterior commonest (dashboard), flexed–adducted–internally rotated, sciatic nerve; reduce < 6 h.",
      checks: [
        {
          q: "Nerve most commonly injured in anterior shoulder dislocation:",
          options: ["Radial", "Axillary", "Musculocutaneous", "Ulnar"],
          answer: 1,
          why: "The axillary nerve winds around the surgical neck just below the joint.",
        },
        {
          q: "Posture in posterior dislocation of the hip:",
          options: [
            "Flexion, abduction, external rotation",
            "Flexion, adduction, internal rotation",
            "Extension, abduction, external rotation",
            "Extension, adduction, internal rotation",
          ],
          answer: 1,
          why: "The femoral head is pushed backwards with the hip flexed, adducted and internally rotated.",
        },
      ],
    },
    {
      id: "osteomyelitis",
      title: "Acute and chronic osteomyelitis",
      minutes: 7,
      summary:
        "Haematogenous osteomyelitis in children starts in the metaphysis; untreated it becomes chronic, with dead bone (sequestrum) inside new bone (involucrum).",
      examFocus:
        "Why the metaphysis, the commonest organism, earliest imaging, and the terms sequestrum, involucrum, cloaca and Brodie's abscess.",
      mechanism:
        "In the metaphysis of a growing bone, nutrient arteries end in hairpin loops that open into wide, slow-flowing venous sinusoids with few phagocytes — bacteria from the blood settle there easily. Pus under pressure strips the periosteum, cutting off the cortex's blood supply, so a segment of bone dies (sequestrum). The lifted periosteum lays down new bone around it (involucrum), and pus escapes through holes in it (cloacae). Plain X-ray changes lag about 10–14 days because 30–50% of mineral must be lost before it shows.",
      points: [
        "Commonest organism: Staphylococcus aureus; Salmonella in sickle cell disease; Pseudomonas after puncture wounds through shoes.",
        "Commonest site: metaphysis of long bones (distal femur, proximal tibia) in children.",
        "Earliest imaging: MRI (bone marrow oedema); X-ray changes appear after 10–14 days.",
        "Treatment of acute disease: blood cultures, IV antibiotics (anti-staphylococcal), drainage if pus collects.",
        "Chronic: sequestrum (dead bone), involucrum (new periosteal bone), cloaca (opening for pus); treated by sequestrectomy and saucerisation.",
        "Brodie's abscess: subacute localised abscess in the metaphysis (often tibia) with a sclerotic rim.",
      ],
      pitfalls: [
        "A normal X-ray in the first week doesn't exclude osteomyelitis.",
        "Fever with a 'tumour' that has onion-peel periosteal reaction may be Ewing sarcoma mimicking osteomyelitis.",
      ],
      vignette: {
        stem: "An 8-year-old has fever and severe pain above the knee for 3 days and won't bear weight. There is tenderness over the distal femoral metaphysis; X-ray is normal.",
        answer:
          "Acute haematogenous osteomyelitis — blood cultures, MRI, IV anti-staphylococcal antibiotics.",
        reasoning: "Metaphyseal tenderness with fever in a child; X-ray is normal this early.",
      },
      highYield:
        "Children: metaphysis, Staph aureus (Salmonella in sickle cell). MRI earliest; X-ray after 10–14 days. Sequestrum = dead bone; involucrum = new bone; Brodie's = subacute abscess.",
      checks: [
        {
          q: "Commonest organism causing osteomyelitis in sickle cell disease (relatively characteristic):",
          options: ["Staph aureus", "Salmonella", "Streptococcus pyogenes", "Pseudomonas"],
          answer: 1,
          why: "Salmonella osteomyelitis is classically associated with sickle cell disease (though Staph aureus remains common).",
        },
        {
          q: "Sequestrum refers to:",
          options: [
            "New periosteal bone",
            "A piece of dead bone",
            "An opening in the involucrum",
            "A subacute abscess",
          ],
          answer: 1,
          why: "A sequestrum is avascular dead bone in chronic osteomyelitis.",
        },
      ],
    },
    {
      id: "bone-tumours",
      title: "Bone tumours",
      minutes: 8,
      summary:
        "Age, site within the bone and the X-ray pattern narrow down most bone tumours before biopsy.",
      examFocus:
        "Codman's triangle and sunburst (osteosarcoma), onion peel (Ewing), soap bubble in the epiphysis (giant cell tumour), and the commonest benign tumour.",
      mechanism:
        "Tumours tend to arise where cells are most active at a given age. In adolescents, the metaphysis around the knee hosts the fastest bone growth, so osteosarcoma — a malignancy of bone-forming cells — arises there; its rapid growth lifts the periosteum, which forms a reactive triangle at the edge (Codman's) and spicules of tumour bone along radiating vessels (sunburst). Giant cell tumour arises in the epiphysis only after the growth plate closes, so it appears in young adults and extends to the joint surface.",
      points: [
        "Osteosarcoma: 10–25 years, metaphysis around the knee (distal femur > proximal tibia); Codman's triangle, sunburst; raised ALP; lung metastases; associated with Rb and p53 mutations, and Paget's disease in the elderly.",
        "Ewing sarcoma: 5–15 years, diaphysis; onion-peel periosteal reaction; small round blue cells, CD99, t(11;22) EWS-FLI1; fever and raised ESR mimic infection; radiosensitive.",
        "Giant cell tumour (osteoclastoma): 20–40 years, epiphysis after physeal closure (distal femur, proximal tibia, distal radius); eccentric lytic 'soap bubble'; recurs; denosumab for unresectable cases.",
        "Osteochondroma: commonest benign bone tumour; metaphyseal bony outgrowth with a cartilage cap pointing away from the joint.",
        "Osteoid osteoma: night pain relieved by aspirin/NSAIDs; small nidus with surrounding sclerosis.",
        "Commonest malignant tumour of bone overall: metastasis (breast, prostate, lung, kidney, thyroid).",
      ],
      table: {
        title: "Tumour clues",
        columns: ["Tumour", "Age", "Site", "X-ray sign"],
        rows: [
          ["Osteosarcoma", "10–25", "Metaphysis (knee)", "Codman's triangle, sunburst"],
          ["Ewing sarcoma", "5–15", "Diaphysis", "Onion peel"],
          ["Giant cell tumour", "20–40", "Epiphysis", "Soap bubble, eccentric"],
          ["Osteochondroma", "Adolescent", "Metaphysis", "Exostosis pointing away from joint"],
          ["Osteoid osteoma", "Young", "Cortex of long bone", "Nidus with sclerosis"],
        ],
      },
      pitfalls: [
        "Giant cell tumour is an epiphyseal lesion of skeletally mature patients — not seen with an open growth plate.",
        "Ewing sarcoma's fever and leucocytosis can be mistaken for osteomyelitis; onion peel is the clue.",
      ],
      vignette: {
        stem: "A 15-year-old has a painful swelling above the knee. X-ray shows a destructive lesion in the distal femoral metaphysis with a sunburst pattern and Codman's triangle; ALP is raised.",
        answer: "Osteosarcoma — biopsy, neoadjuvant chemotherapy and limb-salvage surgery.",
        reasoning: "Age, metaphysis around the knee, sunburst and Codman's triangle are textbook.",
      },
      highYield:
        "Osteosarcoma: knee metaphysis, sunburst + Codman. Ewing: diaphysis, onion peel, t(11;22). GCT: epiphysis, soap bubble, after physeal closure. Osteochondroma = commonest benign.",
      checks: [
        {
          q: "'Onion peel' periosteal reaction is characteristic of:",
          options: ["Osteosarcoma", "Ewing sarcoma", "Giant cell tumour", "Chondrosarcoma"],
          answer: 1,
          why: "Layered periosteal new bone in Ewing sarcoma.",
        },
        {
          q: "Giant cell tumour of bone typically arises in the:",
          options: [
            "Diaphysis of a child",
            "Metaphysis of an adolescent",
            "Epiphysis after physeal closure",
            "Vertebral body of the elderly",
          ],
          answer: 2,
          why: "It is an epiphyseal tumour of young adults whose growth plates have fused.",
        },
      ],
    },
    {
      id: "potts-spine",
      title: "Tuberculosis of the spine (Pott's disease)",
      minutes: 7,
      summary:
        "Spinal TB destroys adjacent vertebrae and the disc between them, causing kyphosis (gibbus), cold abscesses and sometimes paraplegia.",
      examFocus:
        "Commonest site and type, early X-ray sign, cold abscess routes, and the management of Pott's paraplegia.",
      mechanism:
        "TB reaches the spine through the blood, usually lodging in the vascular cancellous bone next to the end plates of two adjacent vertebrae (paradiscal). The disc, nourished from these end plates, is starved and destroyed, so disc-space narrowing is an early sign — unlike tumours, which spare the disc. Collapse of the anterior vertebral bodies produces a sharp angular kyphosis (gibbus). Caseous material tracks along tissue planes as a 'cold' abscess without heat or redness, for example down the psoas sheath to the groin.",
      points: [
        "Commonest site: thoracolumbar (lower thoracic) spine; commonest type: paradiscal.",
        "Early X-ray sign: narrowing of the disc space with fuzzy end plates; later vertebral collapse and gibbus.",
        "Cold abscess: psoas abscess presenting in the groin; retropharyngeal abscess in cervical disease.",
        "MRI is the investigation of choice; CT-guided biopsy confirms (CBNAAT, histology).",
        "Treatment: antitubercular therapy for at least 9–12 months, bracing; surgery for neurological deficit, instability or failed medical treatment (anterior decompression and fusion).",
        "Pott's paraplegia: early-onset (active disease) has a better prognosis than late-onset (healed disease with cord stretching).",
      ],
      pitfalls: [
        "Disc space destruction suggests infection; preserved disc with destroyed vertebra suggests malignancy.",
        "A groin swelling in a patient with back pain may be a psoas cold abscess, not a hernia.",
      ],
      vignette: {
        stem: "A 25-year-old has had back pain, evening fever and weight loss for 3 months and now a painless swelling in the right groin. X-ray shows narrowing of the T12–L1 disc space with destruction of adjacent end plates.",
        answer: "Tuberculosis of the spine (paradiscal, thoracolumbar) with a psoas cold abscess.",
        reasoning:
          "Paradiscal destruction with disc narrowing, constitutional symptoms and a painless groin swelling tracking down the psoas sheath.",
      },
      highYield:
        "Pott's spine: thoracolumbar, paradiscal; disc narrowing early (tumours spare the disc). Cold abscess (psoas → groin). MRI best; ATT ± decompression.",
      checks: [
        {
          q: "Commonest type of spinal tuberculosis:",
          options: ["Central", "Anterior", "Paradiscal", "Posterior"],
          answer: 2,
          why: "Infection usually involves adjacent end plates and the intervening disc.",
        },
        {
          q: "Earliest radiological sign of spinal TB:",
          options: [
            "Gibbus",
            "Narrowing of the disc space",
            "Vertebral wedging",
            "Cold abscess shadow",
          ],
          answer: 1,
          why: "Disc nutrition fails early, so the space narrows before collapse.",
        },
      ],
    },
    {
      id: "ctev-ddh",
      title: "Clubfoot (CTEV) and developmental dysplasia of the hip",
      minutes: 7,
      summary:
        "Two newborn deformities with excellent results if found early: clubfoot is corrected by Ponseti casting, and hip dysplasia is detected by Barlow and Ortolani tests and treated with a Pavlik harness.",
      examFocus:
        "CAVE components and the order of Ponseti correction, tendo-Achilles tenotomy, and the newborn hip tests.",
      mechanism:
        "In clubfoot the tarsal bones are malaligned and the soft tissues on the medial and posterior side are tight. Because a newborn's ligaments are lax under maternal hormones and cartilage is malleable, gentle serial stretching and casting can remodel the joints. The deformities must be corrected in a set order — cavus first, then adductus and varus together, equinus last — because correcting the heel before the midfoot jams the joints. In DDH, a shallow acetabulum lets the femoral head slip out; keeping the hips flexed and abducted in a harness centres the head so the acetabulum deepens around it.",
      points: [
        "CTEV components (CAVE): Cavus, forefoot Adductus, hindfoot Varus, Equinus.",
        "Ponseti method: weekly manipulation and long-leg casts correcting C → A → V; percutaneous tendo-Achilles tenotomy for residual equinus; then a foot abduction brace (Denis Browne) until about 4 years.",
        "Begin Ponseti in the first weeks of life for best results.",
        "DDH risk factors: female, firstborn, breech, family history, oligohydramnios.",
        "Barlow test dislocates an unstable hip; Ortolani test reduces a dislocated hip with a 'clunk'. Galeazzi sign: apparent femoral shortening.",
        "Imaging: ultrasound (Graf) under 4–6 months; X-ray after the head ossifies. Treatment: Pavlik harness under 6 months; closed/open reduction later.",
      ],
      pitfalls: [
        "Never correct equinus first in clubfoot — it produces a rocker-bottom foot.",
        "Ultrasound, not X-ray, is used in early infancy because the femoral head is still cartilaginous.",
      ],
      mnemonic: "CAVE — corrected in the same order: Cavus, Adductus, Varus, Equinus.",
      vignette: {
        stem: "A newborn has a foot pointing downward and inward with a deep medial crease. Mild hindfoot equinus remains after six weekly casts.",
        answer:
          "Congenital talipes equinovarus — percutaneous tendo-Achilles tenotomy, final cast, then foot abduction brace.",
        reasoning:
          "Ponseti corrects cavus, adductus and varus with casts; residual equinus usually needs tenotomy.",
      },
      highYield:
        "CTEV = CAVE, corrected in that order (Ponseti), equinus last via TA tenotomy, then brace to ~4 y. DDH: Barlow dislocates, Ortolani reduces; USG < 6 m; Pavlik harness.",
      checks: [
        {
          q: "In the Ponseti method, the first deformity corrected is:",
          options: ["Equinus", "Varus", "Cavus", "Adductus"],
          answer: 2,
          why: "Cavus is corrected first by supinating the forefoot.",
        },
        {
          q: "The Ortolani test in DDH:",
          options: [
            "Dislocates a reducible hip",
            "Reduces a dislocated hip",
            "Measures leg length",
            "Tests hip abductors",
          ],
          answer: 1,
          why: "Ortolani produces a clunk as the dislocated head reduces into the acetabulum.",
        },
      ],
    },
  ],
};
