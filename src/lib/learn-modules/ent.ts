import type { LearnModule } from "../learn";

export const ent: LearnModule = {
  slug: "ent",
  group: "Clinical",
  subject: "ENT",
  icon: "hearing",
  blurb:
    "Tuning-fork tests, chronic otitis media, otosclerosis, Ménière's, epistaxis, facial palsy, angiofibroma and the larynx — small subject, dependable marks.",
  objectives: [
    "Interpret Rinne and Weber to classify hearing loss, including the false-negative Rinne.",
    "Separate safe from unsafe CSOM and list cholesteatoma's complications.",
    "Recognise otosclerosis and Ménière's from history and audiometry.",
    "Manage anterior epistaxis and identify juvenile nasopharyngeal angiofibroma.",
    "Distinguish UMN from LMN facial palsy and left from bilateral RLN palsy.",
  ],
  concepts: [
    {
      id: "tuning-fork",
      title: "Tuning-fork tests: Rinne and Weber",
      minutes: 7,
      summary:
        "A 512 Hz tuning fork separates conductive from sensorineural hearing loss at the bedside: Rinne compares air and bone conduction in one ear, Weber compares the two ears.",
      examFocus:
        "Interpret a combination of Rinne and Weber results, and the false-negative Rinne in severe unilateral SNHL.",
      mechanism:
        "Normally the middle ear's impedance-matching makes air conduction more efficient than bone conduction, so the fork is heard longer by air (Rinne positive). In conductive loss, sound through air is attenuated but bone conduction bypasses the middle ear, so bone wins (Rinne negative) — and because the affected ear is also shielded from room noise, Weber lateralises to it. In sensorineural loss the cochlea or nerve is damaged, so both routes are reduced proportionally (Rinne stays positive) and Weber lateralises to the better cochlea.",
      points: [
        "Use a 512 Hz fork — low enough not to decay fast, high enough to avoid vibrotactile sensation.",
        "Rinne positive (AC > BC): normal ear or sensorineural loss. Rinne negative (BC > AC): conductive loss of roughly ≥ 15–20 dB.",
        "Weber: lateralises to the worse ear in conductive loss, to the better ear in sensorineural loss; central if normal or symmetrical.",
        "False-negative Rinne: severe unilateral SNHL — the bone-conducted sound is heard by the opposite cochlea; detect by masking the good ear (Bárány noise box).",
        "Absolute bone conduction (ABC) test: reduced in SNHL, normal in conductive loss.",
        "Confirm with pure tone audiometry (air–bone gap = conductive) and tympanometry.",
      ],
      table: {
        title: "Reading the tests",
        columns: ["Condition", "Rinne (affected ear)", "Weber"],
        rows: [
          ["Normal", "Positive", "Central"],
          ["Conductive loss (right)", "Negative", "To the right (worse ear)"],
          ["Sensorineural loss (right)", "Positive", "To the left (better ear)"],
          ["Severe unilateral SNHL (right)", "False negative", "To the left"],
        ],
      },
      pitfalls: [
        "A negative Rinne with Weber going to the opposite ear means a dead ear (false negative), not conductive loss.",
        "Rinne positive does not mean normal hearing — it is also positive in sensorineural loss.",
      ],
      mnemonic:
        "Weber goes to the Worse ear in conductive (Conductive = Comes towards), the better ear in SNHL.",
      vignette: {
        stem: "A patient's Rinne is negative on the left and Weber lateralises to the left.",
        answer: "Left conductive hearing loss.",
        reasoning:
          "Bone conduction exceeding air conduction on the left with Weber lateralising to the same side indicates a conductive problem in that ear.",
      },
      highYield:
        "Rinne negative = conductive. Weber → worse ear in conductive, better ear in SNHL. False-negative Rinne = severe SNHL (mask the good ear). Fork = 512 Hz.",
      checks: [
        {
          q: "Weber lateralises to the right ear and Rinne is positive bilaterally. Diagnosis?",
          options: [
            "Right conductive loss",
            "Left sensorineural loss",
            "Right sensorineural loss",
            "Normal hearing",
          ],
          answer: 1,
          why: "Rinne positive (no conductive loss) with Weber to the right means the left cochlea is worse — left SNHL.",
        },
        {
          q: "Frequency of tuning fork routinely used:",
          options: ["128 Hz", "256 Hz", "512 Hz", "1024 Hz"],
          answer: 2,
          why: "512 Hz balances tone decay and vibrotactile sensation.",
        },
      ],
    },
    {
      id: "csom",
      title: "Chronic otitis media and cholesteatoma",
      minutes: 8,
      summary:
        "CSOM is either mucosal (safe, central perforation) or squamosal (unsafe, attic/marginal perforation with cholesteatoma) — the second erodes bone and causes intracranial complications.",
      examFocus:
        "Safe vs unsafe features, what cholesteatoma is, the commonest intracranial complication and the operation.",
      mechanism:
        "A cholesteatoma is keratinising squamous epithelium growing in the middle ear — 'skin in the wrong place'. It sheds keratin that accumulates as a sac, harbours anaerobic infection (foul-smelling discharge), and releases enzymes and inflammatory mediators that activate osteoclasts. That bone erosion is what makes it unsafe: it eats through the ossicles, the lateral semicircular canal, the facial canal and the tegmen, giving infection a route to the labyrinth and the brain. Mucosal disease involves the middle-ear lining only, so it rarely spreads.",
      points: [
        "Safe (tubotympanic / mucosal): central perforation, profuse mucoid, odourless discharge; treated with aural toilet, antibiotics, myringoplasty.",
        "Unsafe (atticoantral / squamosal): attic or posterosuperior marginal perforation, scanty foul-smelling discharge, cholesteatoma, granulations.",
        "Complications: mastoiditis, labyrinthine fistula (positive fistula test, commonly lateral semicircular canal), facial palsy, meningitis, brain abscess, lateral sinus thrombophlebitis.",
        "Commonest intracranial complication: meningitis; commonest site of otogenic brain abscess: temporal lobe.",
        "Lateral sinus thrombophlebitis: picket-fence fever, Griesinger's sign (oedema over the mastoid emissary vein).",
        "Treatment of cholesteatoma: surgery — modified radical mastoidectomy (canal wall down) or canal wall up techniques.",
      ],
      table: {
        title: "Safe vs unsafe CSOM",
        columns: ["Feature", "Safe (mucosal)", "Unsafe (squamosal)"],
        rows: [
          ["Perforation", "Central", "Attic / marginal"],
          ["Discharge", "Profuse, mucoid, odourless", "Scanty, foul-smelling"],
          ["Cholesteatoma", "Absent", "Present"],
          ["Bone erosion", "Rare", "Common"],
          ["Treatment", "Medical, myringoplasty", "Mastoid surgery"],
        ],
      },
      pitfalls: [
        "Scanty, foul discharge is more dangerous than profuse discharge — it suggests cholesteatoma.",
        "Cholesteatoma is not a tumour and has no cholesterol crystals as its main content; it is keratin.",
      ],
      vignette: {
        stem: "A 20-year-old with long-standing scanty foul-smelling ear discharge now has headache, fever and vomiting. Otoscopy shows an attic perforation with white flakes.",
        answer:
          "Unsafe CSOM with cholesteatoma complicated by an intracranial infection (meningitis or temporal lobe abscess).",
        reasoning:
          "Attic perforation with keratin flakes means cholesteatoma; new headache and vomiting signal intracranial spread — urgent imaging.",
      },
      highYield:
        "Unsafe = attic/marginal perforation + scanty foul discharge + cholesteatoma (bone erosion). Commonest intracranial complication: meningitis; abscess: temporal lobe.",
      checks: [
        {
          q: "A central perforation with profuse mucoid discharge suggests:",
          options: ["Unsafe CSOM", "Safe CSOM", "Cholesteatoma", "Malignant otitis externa"],
          answer: 1,
          why: "Central perforations are typical of tubotympanic (mucosal) disease.",
        },
        {
          q: "Griesinger's sign is seen in:",
          options: ["Mastoiditis", "Lateral sinus thrombophlebitis", "Petrositis", "Labyrinthitis"],
          answer: 1,
          why: "Oedema over the mastoid emissary vein from thrombosis of the lateral (sigmoid) sinus.",
        },
      ],
    },
    {
      id: "otosclerosis",
      title: "Otosclerosis",
      minutes: 6,
      summary:
        "Abnormal bone remodelling fixes the stapes footplate, causing progressive conductive deafness in young women with a normal-looking eardrum.",
      examFocus:
        "Carhart's notch, Schwartze sign, paracusis Willisii, the tympanogram type and treatment (stapedotomy).",
      mechanism:
        "In otosclerosis the dense bone of the otic capsule is replaced by spongy, vascular bone, most often at the fissula ante fenestram just in front of the oval window. This new bone fixes the stapes footplate, so sound energy can't be transmitted into the cochlea — a conductive loss with an intact, mobile-looking drum. Fixation also changes the resonance of the middle ear, artificially reducing bone conduction around 2 kHz (Carhart's notch), which recovers after surgery.",
      points: [
        "Typically young women, bilateral, often a family history (autosomal dominant with variable penetrance); worsens in pregnancy.",
        "Paracusis Willisii: hears better in noisy surroundings (others raise their voices). Schwartze sign: flamingo-pink blush behind the drum in active disease.",
        "Audiometry: conductive loss with Carhart's notch — a dip in bone conduction at 2000 Hz.",
        "Tympanometry: As type (stiff, low compliance); stapedial reflex absent.",
        "Treatment: stapedotomy/stapedectomy with a prosthesis, or hearing aid; sodium fluoride for cochlear (sensorineural) involvement.",
      ],
      pitfalls: [
        "The eardrum is usually normal — conductive loss with a normal drum and As tympanogram should make you think of otosclerosis.",
        "Carhart's notch is in bone conduction, not air conduction.",
      ],
      vignette: {
        stem: "A 28-year-old woman notices slowly worsening hearing in both ears since her pregnancy; she hears better in a noisy bus. Drums look normal; audiogram shows a conductive loss with a bone-conduction dip at 2 kHz.",
        answer: "Otosclerosis — stapedotomy (or hearing aid).",
        reasoning:
          "Paracusis Willisii, normal drums, worsening with pregnancy and Carhart's notch are classic.",
      },
      highYield:
        "Young woman + bilateral conductive loss + normal drum + worse in pregnancy. Carhart's notch (BC at 2 kHz), Schwartze sign, As tympanogram → stapedotomy.",
      checks: [
        {
          q: "Carhart's notch in otosclerosis is seen at:",
          options: [
            "500 Hz in air conduction",
            "2000 Hz in bone conduction",
            "4000 Hz in air conduction",
            "1000 Hz in bone conduction",
          ],
          answer: 1,
          why: "A characteristic dip in bone conduction at 2 kHz.",
        },
        {
          q: "Tympanogram typical of otosclerosis:",
          options: ["Type A", "Type As", "Type B", "Type C"],
          answer: 1,
          why: "A stiff ossicular chain gives low compliance — As.",
        },
      ],
    },
    {
      id: "meniere",
      title: "Ménière's disease",
      minutes: 6,
      summary:
        "Endolymphatic hydrops produces episodes of vertigo with fluctuating low-frequency hearing loss, tinnitus and aural fullness.",
      examFocus:
        "The classic tetrad, the investigation (electrocochleography / glycerol test) and staged treatment.",
      mechanism:
        "Endolymph is produced by the stria vascularis and absorbed by the endolymphatic sac. When absorption fails, the membranous labyrinth distends (hydrops), the apical (low-frequency) part of the cochlea is affected first, and ruptures or ionic leaks between endolymph and perilymph intermittently depolarise vestibular hair cells, causing attacks of rotatory vertigo lasting minutes to hours. Repeated attacks gradually damage hair cells, so hearing loss becomes permanent and flatter over time.",
      points: [
        "Tetrad: episodic rotatory vertigo (20 min to 12 h), fluctuating sensorineural hearing loss (low frequencies early), tinnitus, aural fullness.",
        "Usually unilateral at first; middle-aged adults.",
        "Electrocochleography: raised SP/AP ratio. Glycerol test: hearing improves after oral glycerol (dehydration reduces hydrops).",
        "Acute attack: vestibular sedatives (prochlorperazine, cinnarizine).",
        "Maintenance: low-salt diet, betahistine, diuretics; then intratympanic steroid or gentamicin (chemical labyrinthectomy), endolymphatic sac surgery, vestibular neurectomy.",
      ],
      pitfalls: [
        "Vertigo lasting seconds with head position is BPPV, not Ménière's; vertigo for days without hearing loss suggests vestibular neuritis.",
        "Gentamicin is used deliberately here for its vestibulotoxicity — an exam favourite.",
      ],
      vignette: {
        stem: "A 45-year-old has recurrent attacks of spinning vertigo lasting 2–3 hours with roaring tinnitus and fullness in the right ear. Audiometry shows low-frequency sensorineural loss on the right.",
        answer: "Ménière's disease (right).",
        reasoning:
          "Episodic vertigo lasting hours with tinnitus, aural fullness and low-frequency SNHL is the classic tetrad.",
      },
      highYield:
        "Vertigo (hours) + fluctuating low-frequency SNHL + tinnitus + fullness = Ménière's (hydrops). ECochG ↑ SP/AP. Salt restriction, betahistine; IT gentamicin if refractory.",
      checks: [
        {
          q: "Pathology of Ménière's disease:",
          options: [
            "Otoconia in posterior canal",
            "Endolymphatic hydrops",
            "Vestibular nerve inflammation",
            "Stapes fixation",
          ],
          answer: 1,
          why: "Distension of the endolymphatic system.",
        },
        {
          q: "Hearing loss in early Ménière's typically affects:",
          options: ["High frequencies", "Low frequencies", "All frequencies equally", "Only 4 kHz"],
          answer: 1,
          why: "The apical cochlea (low frequencies) is affected first.",
        },
      ],
    },
    {
      id: "epistaxis",
      title: "Epistaxis",
      minutes: 6,
      summary:
        "Most nosebleeds come from Little's area on the anterior septum and stop with simple pressure; posterior bleeds in older hypertensive patients are heavier and need packing or ligation.",
      examFocus: "Vessels in Kiesselbach's plexus, first aid, and escalation of management.",
      mechanism:
        "Little's area, on the anteroinferior septum, is where several arteries anastomose (Kiesselbach's plexus) under thin mucosa exposed to dry inspired air and finger trauma — so it bleeds easily but at low pressure, which is why pinching the soft nose compresses it effectively. Posterior bleeding from Woodruff's plexus or the sphenopalatine artery occurs further back, can't be reached by pinching, and is often driven by hypertension and atherosclerotic vessels in older adults.",
      points: [
        "Kiesselbach's plexus: anterior ethmoidal, sphenopalatine (septal branch), greater palatine and superior labial (septal branch of facial) arteries.",
        "First aid (Trotter's method): sit up, lean forward, pinch the soft part of the nose for 10–15 minutes, breathe through the mouth.",
        "Next steps: chemical (silver nitrate) or electrocautery, then anterior nasal packing.",
        "Posterior epistaxis: posterior pack or balloon catheter; endoscopic sphenopalatine artery ligation for persistent bleeding.",
        "Recurrent epistaxis in an adolescent boy with nasal obstruction: juvenile nasopharyngeal angiofibroma.",
        "Look for causes: hypertension, anticoagulants, bleeding disorders, hereditary haemorrhagic telangiectasia.",
      ],
      pitfalls: [
        "Don't tilt the head back — blood is swallowed (vomiting) and the bleed is hidden.",
        "Pinching the nasal bones does nothing; pressure must be on the soft cartilaginous part.",
      ],
      mnemonic:
        "Little's area vessels: 'Let's Go Spend Super' — anterior ethmoidal (Let's), Greater palatine, Sphenopalatine, Superior labial.",
      vignette: {
        stem: "A 10-year-old has a nosebleed after picking his nose. He is otherwise well.",
        answer:
          "Anterior epistaxis from Little's area — sit forward and pinch the soft nose for 10–15 minutes; cauterise if recurrent.",
        reasoning: "Digital trauma to Kiesselbach's plexus is the commonest cause in children.",
      },
      highYield:
        "Little's area (Kiesselbach's plexus) = commonest site. Trotter's: sit forward, pinch 10–15 min. Posterior bleeds (elderly, HTN) → posterior pack / SPA ligation.",
      checks: [
        {
          q: "Commonest site of epistaxis:",
          options: ["Woodruff's plexus", "Little's area", "Inferior turbinate", "Nasopharynx"],
          answer: 1,
          why: "The anteroinferior septum (Kiesselbach's plexus) bleeds in most cases.",
        },
        {
          q: "Which artery does NOT contribute to Kiesselbach's plexus?",
          options: [
            "Anterior ethmoidal",
            "Sphenopalatine",
            "Posterior auricular",
            "Superior labial",
          ],
          answer: 2,
          why: "The posterior auricular artery supplies the ear and scalp, not the septum.",
        },
      ],
    },
    {
      id: "facial-palsy",
      title: "Facial nerve palsy and Bell's palsy",
      minutes: 7,
      summary:
        "Whether the forehead is spared separates upper from lower motor neuron facial palsy; Bell's palsy is the commonest LMN cause and is treated with early steroids.",
      examFocus:
        "UMN vs LMN, Bell's palsy treatment, Ramsay Hunt syndrome, and topodiagnostic tests.",
      mechanism:
        "The part of the facial motor nucleus supplying the upper face receives input from both cerebral hemispheres, while the lower-face part receives only contralateral input. So a cortical or internal capsule lesion (UMN) weakens only the lower face on the opposite side — the forehead still wrinkles. A lesion of the nucleus or nerve (LMN) paralyses the whole half of the face. Along its course the nerve gives off branches for tearing, the stapedius and taste, so testing those functions localises the level of the lesion.",
      points: [
        "UMN (stroke): contralateral lower face only; forehead spared.",
        "LMN (Bell's palsy, trauma, CSOM, parotid tumour): ipsilateral whole face; can't close the eye (Bell's phenomenon — eyeball rolls up).",
        "Bell's palsy: idiopathic (likely HSV); oral prednisolone within 72 hours ± antivirals; protect the eye (lubricants, taping).",
        "Ramsay Hunt syndrome: VZV — vesicles in the ear canal/pinna, facial palsy, often SNHL and vertigo; worse prognosis.",
        "Topodiagnosis: Schirmer test (greater petrosal → lacrimation), stapedial reflex (nerve to stapedius), taste anterior 2/3 tongue (chorda tympani).",
        "Facial palsy is more common with transverse than longitudinal temporal bone fractures.",
      ],
      pitfalls: [
        "Forehead sparing = UMN = think stroke, not Bell's palsy.",
        "Vesicles in the ear canal change the diagnosis to Ramsay Hunt — add antivirals and expect a worse outcome.",
      ],
      vignette: {
        stem: "A 35-year-old woke with drooping of the right side of her face. She cannot wrinkle her right forehead or close her right eye. No ear vesicles.",
        answer: "Right Bell's palsy (LMN) — oral prednisolone within 72 hours, eye protection.",
        reasoning:
          "Whole-face involvement including the forehead indicates an LMN lesion; absence of vesicles excludes Ramsay Hunt.",
      },
      highYield:
        "Forehead spared = UMN (stroke); whole face = LMN (Bell's). Bell's: steroids within 72 h + eye care. Ramsay Hunt = VZV + ear vesicles.",
      checks: [
        {
          q: "Forehead sparing in facial weakness indicates:",
          options: [
            "Bell's palsy",
            "Parotid tumour",
            "Upper motor neuron lesion",
            "Ramsay Hunt syndrome",
          ],
          answer: 2,
          why: "Bilateral cortical supply to the upper face spares it in UMN lesions.",
        },
        {
          q: "Schirmer's test assesses the function of the:",
          options: [
            "Chorda tympani",
            "Greater petrosal nerve",
            "Nerve to stapedius",
            "Marginal mandibular nerve",
          ],
          answer: 1,
          why: "The greater petrosal nerve carries secretomotor fibres to the lacrimal gland.",
        },
      ],
    },
    {
      id: "jna",
      title: "Juvenile nasopharyngeal angiofibroma",
      minutes: 5,
      summary:
        "A benign but highly vascular, locally destructive tumour of adolescent boys that presents with recurrent profuse epistaxis and nasal obstruction.",
      examFocus:
        "The patient profile, the Holman–Miller sign on imaging, why biopsy is contraindicated, and treatment.",
      mechanism:
        "The tumour arises near the sphenopalatine foramen and is made of thin-walled vessels without muscular coats in a fibrous stroma — so it bleeds profusely and the vessels can't contract. It expresses androgen receptors, which explains why it occurs almost exclusively in adolescent males. Growing through natural foramina, it pushes forward into the pterygopalatine fossa, bowing the posterior wall of the maxilla — the Holman–Miller (antral) sign.",
      points: [
        "Adolescent boys (10–20 years) with recurrent profuse epistaxis and progressive unilateral nasal obstruction.",
        "Site of origin: near the sphenopalatine foramen (posterolateral nasal wall).",
        "Imaging: contrast CT/MRI; Holman–Miller sign — anterior bowing of the posterior maxillary wall.",
        "Biopsy is contraindicated because of torrential bleeding; diagnosis is clinico-radiological.",
        "Treatment: surgical excision (often endoscopic) after preoperative embolisation; radiotherapy for unresectable intracranial extension.",
      ],
      pitfalls: [
        "Never biopsy a vascular nasopharyngeal mass in an adolescent boy.",
        "It's benign histologically but locally aggressive, spreading into the orbit and skull base.",
      ],
      vignette: {
        stem: "A 15-year-old boy has repeated heavy nosebleeds and a blocked left nostril. CT shows a mass in the nasopharynx with forward bowing of the posterior wall of the left maxilla.",
        answer: "Juvenile nasopharyngeal angiofibroma — embolise, then excise; do not biopsy.",
        reasoning: "Adolescent male, profuse epistaxis and the Holman–Miller sign are diagnostic.",
      },
      highYield:
        "Adolescent boy + profuse recurrent epistaxis + nasal block = JNA. Holman–Miller sign. No biopsy. Embolisation then excision.",
      checks: [
        {
          q: "Holman–Miller sign is seen in:",
          options: [
            "Carcinoma maxilla",
            "Juvenile nasopharyngeal angiofibroma",
            "Antrochoanal polyp",
            "Inverted papilloma",
          ],
          answer: 1,
          why: "Anterior bowing of the posterior maxillary wall by tumour in the pterygopalatine fossa.",
        },
        {
          q: "Which is contraindicated in suspected JNA?",
          options: ["CT scan", "MRI", "Biopsy", "Angiography"],
          answer: 2,
          why: "Biopsy risks life-threatening haemorrhage.",
        },
      ],
    },
    {
      id: "larynx",
      title: "Vocal cord palsy and laryngeal cancer",
      minutes: 7,
      summary:
        "Hoarseness may be the first sign of a recurrent laryngeal nerve palsy or a glottic carcinoma — both need direct visualisation of the larynx.",
      examFocus:
        "Why left RLN palsy is commoner, causes (thyroid surgery, lung/oesophageal cancer, Ortner's), bilateral palsy → stridor, and glottic cancer's good prognosis.",
      mechanism:
        "The left recurrent laryngeal nerve loops under the arch of the aorta and runs a long course through the chest, so it is exposed to more disease (bronchogenic and oesophageal cancer, aortic aneurysm, an enlarged left atrium) than the right, which hooks under the subclavian artery. Losing the RLN paralyses all intrinsic laryngeal muscles except cricothyroid, so the cord lies near the midline: one cord gives hoarseness, both cords together leave a narrow glottis and stridor. Glottic carcinoma presents early with hoarseness and spreads to nodes late because the true cords have very sparse lymphatics — hence its good prognosis.",
      points: [
        "Left RLN palsy is commoner (longer intrathoracic course around the aortic arch).",
        "Causes: thyroid surgery (commonest iatrogenic), bronchogenic and oesophageal carcinoma, mediastinal nodes, aortic aneurysm, mitral stenosis with large left atrium (Ortner's syndrome).",
        "Unilateral RLN palsy: hoarseness, breathy voice; cord in paramedian position.",
        "Bilateral RLN palsy: cords near the midline → stridor and airway obstruction; may need tracheostomy.",
        "Laryngeal cancer: squamous cell carcinoma, smoking; glottic is commonest, presents early with hoarseness, rarely spreads to nodes → good prognosis.",
        "Supraglottic cancer presents late with early nodal spread; subglottic is rare. Early glottic cancer: radiotherapy or laser cordectomy.",
      ],
      pitfalls: [
        "Hoarseness for more than 3 weeks in a smoker needs laryngoscopy to exclude carcinoma.",
        "Bilateral RLN palsy threatens the airway, while the voice may be surprisingly good.",
      ],
      vignette: {
        stem: "A 60-year-old smoker has had a hoarse voice for 2 months. Laryngoscopy shows a growth on the anterior part of the right vocal cord with normal cord mobility; no neck nodes.",
        answer:
          "Early glottic carcinoma (T1) — radiotherapy or transoral laser excision, good prognosis.",
        reasoning:
          "Glottic tumours cause hoarseness early and rarely metastasise to nodes because the cords have scant lymphatics.",
      },
      highYield:
        "Left RLN palsy commoner (aortic arch). Bilateral RLN palsy → stridor. Glottic cancer = commonest, early hoarseness, rare nodes → best prognosis.",
      checks: [
        {
          q: "Why is left recurrent laryngeal nerve palsy more common?",
          options: [
            "It is thinner",
            "Longer intrathoracic course around the aortic arch",
            "It supplies cricothyroid",
            "It lies in the tracheo-oesophageal groove only on the left",
          ],
          answer: 1,
          why: "Its loop under the aortic arch exposes it to thoracic disease.",
        },
        {
          q: "Laryngeal carcinoma with the best prognosis:",
          options: ["Supraglottic", "Glottic", "Subglottic", "Transglottic"],
          answer: 1,
          why: "Early symptoms and sparse lymphatics make glottic cancer the most curable.",
        },
      ],
    },
  ],
};
