import type { LearnModule } from "../learn";

export const ophthalmology: LearnModule = {
  slug: "ophthalmology",
  group: "Clinical",
  subject: "Ophthalmology",
  icon: "visibility",
  blurb:
    "Glaucoma, cataract, diabetic retinopathy, the red eye, refraction, retinal emergencies, visual pathway lesions and corneal ulcers.",
  objectives: [
    "Differentiate open-angle from angle-closure glaucoma and manage an acute attack.",
    "Separate the causes of a red eye using pupil, vision, pain and congestion.",
    "Stage diabetic retinopathy and pick laser vs anti-VEGF.",
    "Localise a lesion in the visual pathway from the field defect.",
    "Tell bacterial, fungal, herpetic and Acanthamoeba keratitis apart.",
  ],
  concepts: [
    {
      id: "glaucoma",
      title: "Glaucoma: open-angle vs angle-closure",
      minutes: 9,
      summary:
        "Glaucoma is a progressive optic neuropathy with characteristic cupping and field loss, usually with raised intraocular pressure; the angle decides whether it is a silent thief or an emergency.",
      examFocus:
        "Field defects of POAG in order, first-line drugs and their side effects, and the management of acute angle-closure.",
      mechanism:
        "Aqueous is produced by the ciliary body, flows through the pupil and drains through the trabecular meshwork in the angle. In primary open-angle glaucoma the angle is open but the meshwork resists outflow, so pressure rises slowly and painlessly, gradually damaging ganglion-cell axons at the optic disc — the arcuate fibres first, which is why the earliest field defects curve around fixation. In angle closure the peripheral iris is pushed forward against the meshwork (often when the pupil is mid-dilated in dim light), blocking drainage abruptly: pressure can exceed 50 mmHg within hours, causing pain, corneal oedema and haloes.",
      points: [
        "POAG: IOP > 21 mmHg (not always), open angle on gonioscopy, cup:disc ratio > 0.6 or asymmetry > 0.2, progressive field loss.",
        "POAG field defects: paracentral scotoma → Bjerrum's arcuate scotoma → nasal step (Roenne) → tubular vision with a temporal island.",
        "First-line drugs: prostaglandin analogues (latanoprost — ↑ uveoscleral outflow; side effects iris darkening, long lashes); β-blockers (timolol — ↓ aqueous; avoid in asthma).",
        "Acute angle-closure: painful red eye, haloes, nausea/vomiting, corneal oedema, shallow anterior chamber, fixed mid-dilated vertically oval pupil.",
        "Acute attack: IV acetazolamide ± mannitol, topical β-blocker, pilocarpine once IOP falls, then laser peripheral iridotomy in both eyes.",
        "Avoid mydriatics (atropine, antihistamines, anticholinergics) in narrow angles — they can precipitate angle closure.",
      ],
      table: {
        title: "POAG vs acute PACG",
        columns: ["Feature", "POAG", "Acute PACG"],
        rows: [
          ["Onset", "Insidious, painless", "Sudden, painful"],
          ["Angle", "Open", "Closed"],
          ["Pupil", "Normal", "Fixed, mid-dilated, vertically oval"],
          ["Cornea", "Clear", "Oedematous (haloes)"],
          [
            "Treatment",
            "Drops, SLT, trabeculectomy",
            "Lower IOP, then laser iridotomy (both eyes)",
          ],
        ],
      },
      pitfalls: [
        "Normal IOP doesn't exclude glaucoma — normal-tension glaucoma exists; diagnosis rests on disc and field.",
        "Treat the fellow eye with prophylactic iridotomy after an acute angle-closure attack.",
      ],
      vignette: {
        stem: "A 60-year-old hypermetropic woman develops severe eye pain, blurred vision with coloured haloes and vomiting after watching a film in a dark hall. The pupil is fixed and mid-dilated, the cornea hazy.",
        answer: "Acute primary angle-closure glaucoma.",
        reasoning:
          "Short hypermetropic eyes have shallow angles; dim light mid-dilates the pupil and closes the angle. Lower IOP urgently, then laser iridotomy in both eyes.",
      },
      highYield:
        "POAG fields: paracentral → Bjerrum's arcuate → nasal step → tubular. Acute angle-closure: fixed mid-dilated oval pupil, haloes; acetazolamide then iridotomy (both eyes).",
      checks: [
        {
          q: "Earliest field defect in primary open-angle glaucoma:",
          options: [
            "Bitemporal hemianopia",
            "Paracentral scotoma",
            "Tubular vision",
            "Central scotoma",
          ],
          answer: 1,
          why: "Paracentral scotomas in the Bjerrum area appear first.",
        },
        {
          q: "Definitive treatment of acute angle-closure glaucoma:",
          options: ["Trabeculectomy", "Laser peripheral iridotomy", "Cataract surgery", "Atropine"],
          answer: 1,
          why: "Iridotomy bypasses the pupillary block; it is also done prophylactically in the other eye.",
        },
      ],
    },
    {
      id: "cataract",
      title: "Cataract",
      minutes: 7,
      summary:
        "Cataract — opacity of the lens — is the leading cause of reversible blindness in India; its type hints at the cause, and surgery with an intraocular lens is the cure.",
      examFocus:
        "Cataract types linked to diseases, 'second sight', and after-cataract treated with Nd:YAG.",
      mechanism:
        "The lens is transparent because its fibres are tightly packed and its crystallin proteins are orderly. Ageing, oxidation, glycation (diabetes), osmotic stress (galactosaemia — galactitol accumulates) and drugs disturb this order, scattering light. A hardening nucleus has a higher refractive index, making the eye more myopic, so an older person may suddenly read without glasses ('second sight') before vision worsens. After surgery, residual lens epithelial cells can proliferate on the posterior capsule, causing the commonest late complication.",
      points: [
        "Types: senile cortical (cuneiform spokes), nuclear (myopic shift, 'second sight'), posterior subcapsular (steroids, diabetes — glare and near-vision loss).",
        "Disease clues: diabetes — snowflake; galactosaemia — oil droplet; Wilson's — sunflower; congenital rubella — pearly nuclear; trauma — rosette; myotonic dystrophy — Christmas tree.",
        "Surgery: phacoemulsification or manual small-incision cataract surgery (SICS — widely used in India) with a posterior chamber IOL.",
        "Commonest late complication: posterior capsular opacification ('after-cataract') → Nd:YAG laser capsulotomy.",
        "Most dreaded complication: endophthalmitis (usually Staphylococcus epidermidis).",
        "Congenital cataract must be removed early to prevent stimulus-deprivation amblyopia.",
      ],
      table: {
        title: "Cataract and its clue",
        columns: ["Cause", "Cataract"],
        rows: [
          ["Diabetes", "Snowflake (and early senile)"],
          ["Galactosaemia", "Oil droplet"],
          ["Wilson's disease", "Sunflower"],
          ["Congenital rubella", "Pearly nuclear"],
          ["Blunt trauma", "Rosette"],
          ["Myotonic dystrophy", "Christmas tree"],
          ["Steroids", "Posterior subcapsular"],
        ],
      },
      pitfalls: [
        "A nuclear cataract improves near vision temporarily (myopic shift) — that is 'second sight', not improvement.",
        "After-cataract is treated with a laser (Nd:YAG), not repeat surgery.",
      ],
      vignette: {
        stem: "A 68-year-old who had cataract surgery 2 years ago reports gradually worsening blurred vision. The IOL is in place and the posterior capsule looks hazy.",
        answer: "Posterior capsular opacification — Nd:YAG laser capsulotomy.",
        reasoning:
          "Residual lens epithelial cells migrate onto the capsule behind the IOL; the laser opens a clear window.",
      },
      highYield:
        "Snowflake = diabetes; oil droplet = galactosaemia; sunflower = Wilson; Christmas tree = myotonic dystrophy. After-cataract → Nd:YAG capsulotomy.",
      checks: [
        {
          q: "'Oil droplet' cataract is seen in:",
          options: ["Diabetes", "Galactosaemia", "Wilson's disease", "Rubella"],
          answer: 1,
          why: "Galactitol accumulation in the lens produces an oil droplet appearance.",
        },
        {
          q: "Treatment of posterior capsular opacification:",
          options: [
            "Argon laser",
            "Nd:YAG capsulotomy",
            "Repeat cataract surgery",
            "Topical steroids",
          ],
          answer: 1,
          why: "Nd:YAG laser creates an opening in the opacified posterior capsule.",
        },
      ],
    },
    {
      id: "diabetic-retinopathy",
      title: "Diabetic retinopathy",
      minutes: 8,
      summary:
        "Chronic hyperglycaemia damages retinal capillaries, causing leakage (exudates, macular oedema) and non-perfusion (ischaemia, new vessels).",
      examFocus:
        "The earliest sign, the 4-2-1 rule, the commonest cause of vision loss, and laser vs anti-VEGF.",
      mechanism:
        "Hyperglycaemia kills pericytes that support retinal capillaries; the weakened walls balloon into microaneurysms — the earliest visible sign. Leaky capillaries spill plasma and lipid (hard exudates); fluid collecting at the macula causes macular oedema, the commonest cause of visual loss. Where capillaries close, the retina becomes ischaemic and releases VEGF, which drives fragile new vessels on the disc and retina; these bleed into the vitreous and pull on the retina with fibrous tissue, causing tractional detachment.",
      points: [
        "Earliest sign: microaneurysms. Others in NPDR: dot-blot haemorrhages, hard exudates, cotton-wool spots, venous beading, IRMA.",
        "Severe NPDR (4-2-1 rule): haemorrhages in 4 quadrants, or venous beading in 2, or IRMA in 1 quadrant.",
        "Proliferative DR: neovascularisation of the disc (NVD) or elsewhere (NVE) → vitreous haemorrhage, tractional retinal detachment, neovascular glaucoma.",
        "Commonest cause of visual loss: diabetic macular oedema → intravitreal anti-VEGF (ranibizumab, bevacizumab, aflibercept).",
        "PDR → panretinal photocoagulation (destroys ischaemic retina, reducing VEGF) or anti-VEGF.",
        "Screen at diagnosis of type 2 diabetes, and 5 years after diagnosis in type 1; then yearly.",
      ],
      pitfalls: [
        "Cotton-wool spots are infarcts of the nerve fibre layer (ischaemia), not exudates.",
        "Pregnancy and rapid tightening of glucose control can transiently worsen retinopathy.",
      ],
      mnemonic: "4-2-1: haemorrhages in 4 quadrants, beading in 2, IRMA in 1 = severe NPDR.",
      vignette: {
        stem: "A 52-year-old with poorly controlled diabetes has new vessels on the optic disc and a recent vitreous haemorrhage.",
        answer:
          "Proliferative diabetic retinopathy — panretinal photocoagulation (± anti-VEGF); vitrectomy if the haemorrhage doesn't clear.",
        reasoning: "NVD defines PDR; PRP reduces the ischaemic drive for VEGF.",
      },
      highYield:
        "Earliest sign = microaneurysm. Commonest cause of vision loss = macular oedema (anti-VEGF). PDR = new vessels (PRP). 4-2-1 = severe NPDR.",
      checks: [
        {
          q: "Earliest clinically visible sign of diabetic retinopathy:",
          options: ["Hard exudates", "Microaneurysms", "Cotton-wool spots", "Neovascularisation"],
          answer: 1,
          why: "Pericyte loss leads to capillary outpouchings — microaneurysms.",
        },
        {
          q: "Commonest cause of visual impairment in diabetic retinopathy:",
          options: [
            "Vitreous haemorrhage",
            "Macular oedema",
            "Retinal detachment",
            "Neovascular glaucoma",
          ],
          answer: 1,
          why: "Diabetic macular oedema is the leading cause of vision loss.",
        },
      ],
    },
    {
      id: "red-eye",
      title: "The red eye",
      minutes: 7,
      summary:
        "Most red eyes are conjunctivitis, but a few — keratitis, acute uveitis and angle-closure glaucoma — threaten sight; vision, pain, pupil and pattern of congestion separate them.",
      examFocus:
        "Distinguish conjunctivitis, iridocyclitis and acute glaucoma from a short vignette.",
      mechanism:
        "Where the redness sits reflects which tissue is inflamed. Conjunctival vessels are superficial, move with the conjunctiva and are most marked away from the cornea, so conjunctivitis gives peripheral redness with discharge and normal vision. Deep ciliary vessels around the limbus supply the iris, ciliary body and cornea, so inflammation of these structures causes circumcorneal (ciliary) flush, pain, photophobia and reduced vision. The pupil helps: inflamed iris constricts (miosis) in uveitis; ischaemic sphincter is mid-dilated and fixed in angle closure.",
      points: [
        "Conjunctivitis: discharge, gritty discomfort, normal vision and pupil, superficial congestion.",
        "Acute anterior uveitis: pain, photophobia, ciliary flush, small irregular pupil, keratic precipitates, aqueous flare; associated with HLA-B27 diseases.",
        "Uveitis treatment: topical steroids + cycloplegic-mydriatic (atropine) to relieve ciliary spasm and prevent posterior synechiae.",
        "Acute angle-closure: fixed mid-dilated pupil, very high IOP, corneal haze, haloes.",
        "Keratitis: pain, photophobia, reduced vision, corneal opacity that stains with fluorescein.",
        "Subconjunctival haemorrhage: painless bright red patch, normal vision — usually benign.",
      ],
      table: {
        title: "Telling red eyes apart",
        columns: ["Feature", "Conjunctivitis", "Anterior uveitis", "Acute glaucoma"],
        rows: [
          ["Vision", "Normal", "Reduced", "Markedly reduced"],
          ["Pain", "Gritty", "Moderate, photophobia", "Severe, with vomiting"],
          ["Congestion", "Superficial", "Ciliary flush", "Ciliary / mixed"],
          ["Pupil", "Normal", "Small, irregular", "Mid-dilated, fixed"],
          ["IOP", "Normal", "Normal/low", "Very high"],
        ],
      },
      pitfalls: [
        "Atropine helps uveitis but can precipitate angle closure — the pupil size and IOP decide which red eye you are treating.",
        "Never give topical steroids for an undiagnosed red eye — they worsen herpetic and fungal keratitis.",
      ],
      vignette: {
        stem: "A 28-year-old man with low back stiffness has a painful red right eye, photophobia, a small irregular pupil and circumcorneal congestion.",
        answer: "Acute anterior uveitis associated with ankylosing spondylitis (HLA-B27).",
        reasoning:
          "Ciliary flush, miosis and photophobia indicate iridocyclitis; back stiffness suggests the HLA-B27 link.",
      },
      highYield:
        "Small pupil + ciliary flush + photophobia = uveitis (steroid + atropine). Fixed mid-dilated pupil + high IOP = angle closure. Normal vision + discharge = conjunctivitis.",
      checks: [
        {
          q: "Drug used along with steroids in acute anterior uveitis to prevent synechiae:",
          options: ["Pilocarpine", "Atropine", "Timolol", "Acetazolamide"],
          answer: 1,
          why: "Cycloplegic-mydriatics relieve ciliary spasm and keep the pupil from sticking to the lens.",
        },
        {
          q: "A red eye with normal vision, normal pupil and mucopurulent discharge is most likely:",
          options: ["Acute glaucoma", "Iridocyclitis", "Bacterial conjunctivitis", "Keratitis"],
          answer: 2,
          why: "Conjunctivitis spares vision and the pupil.",
        },
      ],
    },
    {
      id: "refraction",
      title: "Refractive errors",
      minutes: 6,
      summary:
        "When the eye's optical power doesn't match its length, light focuses in front of or behind the retina; the corrective lens moves the focus back onto it.",
      examFocus: "Which lens corrects which error, the commonest type of myopia, and presbyopia.",
      mechanism:
        "In myopia the eye is too long (axial) or too powerful, so parallel rays focus in front of the retina; a concave (minus) lens diverges them. In hypermetropia the eye is too short, so rays focus behind the retina; a convex (plus) lens converges them — young people can partly compensate by accommodating, which is why hypermetropia may be latent. Presbyopia is not a refractive error of the resting eye but loss of accommodation as the lens hardens with age, usually noticed around 40.",
      points: [
        "Myopia: concave (minus) lens; axial myopia is commonest; high myopia predisposes to retinal detachment.",
        "Hypermetropia: convex (plus) lens; predisposes to angle-closure glaucoma (shallow anterior chamber).",
        "Astigmatism: unequal curvature in different meridians → cylindrical lens.",
        "Presbyopia: age-related loss of accommodation, from ~40 years → convex lens for near.",
        "Aphakia (lens absent): highly hypermetropic → high plus lens or IOL.",
        "Anisometropia: difference in refraction between eyes — a cause of amblyopia in children.",
      ],
      pitfalls: [
        "Hypermetropes, not myopes, are at risk of angle closure; myopes are at risk of retinal detachment.",
        "Presbyopia is corrected with plus lenses even in an emmetrope.",
      ],
      vignette: {
        stem: "A 12-year-old has trouble seeing the blackboard but reads comfortably. Retinoscopy shows the eye focuses images in front of the retina.",
        answer: "Myopia — correct with a concave (minus) lens.",
        reasoning:
          "Poor distance vision with good near vision and focus anterior to the retina is myopia.",
      },
      highYield:
        "Myopia → concave; hypermetropia → convex; astigmatism → cylindrical; presbyopia (~40 y) → convex for near. Myopia ↔ RD; hypermetropia ↔ angle closure.",
      checks: [
        {
          q: "Lens used to correct myopia:",
          options: ["Convex", "Concave", "Cylindrical", "Prism"],
          answer: 1,
          why: "A concave lens diverges light so it focuses further back, on the retina.",
        },
        {
          q: "High myopia is a risk factor for:",
          options: ["Angle-closure glaucoma", "Retinal detachment", "Pterygium", "Presbyopia"],
          answer: 1,
          why: "Long myopic eyes have thin peripheral retina prone to tears.",
        },
      ],
    },
    {
      id: "retinal-emergencies",
      title: "Retinal vascular occlusion and detachment",
      minutes: 7,
      summary:
        "Sudden painless loss of vision usually means a retinal artery or vein occlusion, retinal detachment or vitreous haemorrhage.",
      examFocus:
        "Cherry-red spot (CRAO and storage disorders), 'blood and thunder' fundus (CRVO), and the symptoms of retinal detachment.",
      mechanism:
        "In central retinal artery occlusion the inner retina, supplied by that artery, becomes ischaemic and opaque white. The fovea has no inner retinal layers and is nourished by the choroid, so it keeps its normal red colour, standing out as a 'cherry-red spot'. In central retinal vein occlusion, blood can't leave, so veins dilate and haemorrhages appear in all quadrants; the resulting ischaemia drives VEGF and new iris vessels, causing neovascular glaucoma about three months later. Rhegmatogenous detachment begins with a retinal tear; fluid passes through it and separates the retina, which the patient sees as a spreading curtain.",
      points: [
        "CRAO: sudden painless profound loss, pale retina with cherry-red spot, RAPD; often embolic — check carotids and heart; consider giant cell arteritis in the elderly.",
        "Cherry-red spot also in Tay–Sachs, Niemann–Pick, Sandhoff disease (lipid-laden ganglion cells around the fovea).",
        "CRVO: 'blood and thunder' fundus — haemorrhages in all quadrants, dilated tortuous veins; risks: hypertension, diabetes, glaucoma.",
        "Ischaemic CRVO → neovascular glaucoma at about 90–100 days ('100-day glaucoma').",
        "Retinal detachment: flashes (photopsia), floaters, then a curtain over the vision; commonest type rhegmatogenous (myopia, trauma, after cataract surgery).",
        "Treatment of rhegmatogenous RD: surgery (scleral buckle, vitrectomy, pneumatic retinopexy).",
      ],
      pitfalls: [
        "The fovea is red in CRAO because it is perfused by the choroid, not because it is haemorrhagic.",
        "Floaters with flashes need a dilated fundus examination — they may be a retinal tear.",
      ],
      vignette: {
        stem: "A 70-year-old with atrial fibrillation suddenly loses vision in one eye painlessly. Fundus: pale retina with a cherry-red spot at the macula.",
        answer: "Central retinal artery occlusion (likely embolic).",
        reasoning:
          "Ischaemic, opaque inner retina with the choroid-supplied fovea showing through as a cherry-red spot.",
      },
      highYield:
        "Cherry-red spot: CRAO, Tay–Sachs, Niemann–Pick. Blood and thunder = CRVO → neovascular glaucoma at ~100 days. Flashes + floaters + curtain = RD.",
      checks: [
        {
          q: "'Blood and thunder' fundus appearance is seen in:",
          options: ["CRAO", "CRVO", "Retinal detachment", "Hypertensive retinopathy"],
          answer: 1,
          why: "Extensive haemorrhages in all quadrants with dilated veins characterise CRVO.",
        },
        {
          q: "Neovascular glaucoma after CRVO typically develops after about:",
          options: ["1 week", "1 month", "3 months", "1 year"],
          answer: 2,
          why: "It is called '100-day glaucoma'.",
        },
      ],
    },
    {
      id: "visual-pathway",
      title: "Visual pathway lesions and pupils",
      minutes: 8,
      summary:
        "Each site along the visual pathway produces a signature field defect; pupillary reflexes add the afferent/efferent picture.",
      examFocus:
        "Match lesion to field defect (pituitary → bitemporal; temporal lobe → superior quadrantanopia) and pupil syndromes (RAPD, Argyll Robertson).",
      mechanism:
        "Nasal retinal fibres, which carry the temporal field, cross at the chiasm; temporal retinal fibres stay on the same side. So a lesion of one optic nerve blinds that eye, a central chiasmal lesion (pituitary tumour pushing up) cuts the crossing fibres from both nasal retinas — losing both temporal fields — and anything behind the chiasm affects the same half of the field in both eyes. In the radiation, inferior fibres (upper field) loop through the temporal lobe (Meyer's loop) and superior fibres (lower field) run in the parietal lobe.",
      points: [
        "Optic nerve: ipsilateral monocular blindness with a relative afferent pupillary defect (Marcus Gunn pupil).",
        "Chiasm (pituitary adenoma, craniopharyngioma): bitemporal hemianopia.",
        "Optic tract: contralateral incongruous homonymous hemianopia.",
        "Temporal lobe (Meyer's loop): contralateral superior quadrantanopia — 'pie in the sky'. Parietal lobe: inferior quadrantanopia — 'pie on the floor'.",
        "Occipital cortex (posterior cerebral artery infarct): contralateral homonymous hemianopia with macular sparing (dual MCA/PCA supply of the macular cortex).",
        "Argyll Robertson pupil (neurosyphilis): small irregular pupils that accommodate but don't react to light. Adie's tonic pupil: dilated, slow; Horner's: miosis, ptosis, anhidrosis.",
      ],
      table: {
        title: "Lesion → field defect",
        columns: ["Site", "Field defect"],
        rows: [
          ["Optic nerve", "Ipsilateral blindness + RAPD"],
          ["Chiasm", "Bitemporal hemianopia"],
          ["Optic tract", "Contralateral incongruous homonymous hemianopia"],
          ["Meyer's loop (temporal)", "Contralateral superior quadrantanopia"],
          ["Parietal radiation", "Contralateral inferior quadrantanopia"],
          ["Occipital cortex", "Homonymous hemianopia with macular sparing"],
        ],
      },
      pitfalls: [
        "Pituitary tumours compress from below, so the upper temporal quadrants are lost first; craniopharyngiomas from above affect lower quadrants first.",
        "RAPD is an afferent defect — the affected pupil still constricts when light is shone in the normal eye.",
      ],
      mnemonic: "Temporal = 'pie in the sky' (superior); Parietal = 'pie on the floor' (inferior).",
      vignette: {
        stem: "A 40-year-old with headaches and galactorrhoea keeps bumping into door frames on both sides. Fields show loss of both temporal halves.",
        answer:
          "Bitemporal hemianopia from a pituitary adenoma (prolactinoma) compressing the chiasm.",
        reasoning:
          "Crossing nasal fibres carrying temporal fields are compressed at the chiasm; galactorrhoea suggests prolactin excess.",
      },
      highYield:
        "Chiasm → bitemporal. Temporal lobe → superior quadrantanopia; parietal → inferior. Occipital → macular sparing. Argyll Robertson = accommodates, doesn't react.",
      checks: [
        {
          q: "A lesion of Meyer's loop produces:",
          options: [
            "Inferior quadrantanopia",
            "Superior quadrantanopia",
            "Bitemporal hemianopia",
            "Central scotoma",
          ],
          answer: 1,
          why: "Meyer's loop carries the upper field through the temporal lobe — 'pie in the sky'.",
        },
        {
          q: "Argyll Robertson pupil is characteristic of:",
          options: ["Diabetes", "Neurosyphilis", "Multiple sclerosis", "Horner's syndrome"],
          answer: 1,
          why: "Light–near dissociation with small irregular pupils is classic of tertiary syphilis.",
        },
      ],
    },
    {
      id: "corneal-ulcer",
      title: "Infective keratitis (corneal ulcer)",
      minutes: 7,
      summary:
        "Bacterial, fungal, viral and Acanthamoeba keratitis each have a typical history and slit-lamp picture, and the wrong treatment (especially steroids) can destroy the eye.",
      examFocus:
        "Fungal ulcer after vegetative trauma with satellite lesions, dendritic HSV ulcer, Acanthamoeba in contact lens users.",
      mechanism:
        "The intact corneal epithelium is an excellent barrier, so most keratitis follows a breach: trauma, contact lens wear or exposure. The organism and portal predict the picture — vegetable-matter injury in farmers inoculates filamentous fungi, which grow slowly with feathery edges and satellite lesions; contact lenses and contaminated water carry Pseudomonas and Acanthamoeba; HSV reactivates in the corneal nerves, branching along the epithelium as a dendrite and reducing corneal sensation. Hypopyon forms when inflammatory cells collect in the anterior chamber.",
      points: [
        "Bacterial: commonest overall; Pseudomonas in contact lens users — rapid, greenish discharge, may perforate.",
        "Fungal (Fusarium, Aspergillus — common in India): after injury with vegetable matter; dry, raised slough, feathery margins, satellite lesions, immune ring, thick immobile hypopyon. Treat with natamycin 5%.",
        "Herpes simplex: dendritic ulcer (terminal bulbs) staining with fluorescein, reduced corneal sensation; treat with topical acyclovir/ganciclovir.",
        "Acanthamoeba: contact lens with tap water; pain out of proportion to signs, ring infiltrate, radial keratoneuritis.",
        "Diagnosis: corneal scraping — Gram stain, KOH mount (fungi), culture.",
        "Steroids are contraindicated in fungal and active epithelial herpetic keratitis.",
      ],
      table: {
        title: "Types of keratitis",
        columns: ["Type", "Clue", "Key sign"],
        rows: [
          ["Bacterial (Pseudomonas)", "Contact lens", "Rapid ulcer, copious discharge"],
          ["Fungal", "Vegetative trauma (farmer)", "Feathery margins, satellite lesions"],
          ["HSV", "Recurrent, fever, stress", "Dendritic ulcer, ↓ sensation"],
          ["Acanthamoeba", "Contact lens + tap water", "Severe pain, ring infiltrate"],
        ],
      },
      pitfalls: [
        "Steroids make fungal and herpetic epithelial keratitis dramatically worse.",
        "Don't pad a contact-lens-related ulcer — it creates a warm incubator for Pseudomonas.",
      ],
      vignette: {
        stem: "A farmer's eye was scratched by a paddy leaf 10 days ago. There is a dry, greyish ulcer with feathery margins, satellite lesions and a hypopyon.",
        answer: "Fungal keratitis — KOH mount and culture; topical natamycin 5%.",
        reasoning:
          "Vegetative trauma, feathery edges and satellite lesions are classic of filamentous fungi such as Fusarium/Aspergillus.",
      },
      highYield:
        "Vegetative trauma + feathery margins + satellite lesions = fungal (natamycin). Dendritic ulcer + ↓ sensation = HSV. Contact lens + severe pain = Acanthamoeba.",
      checks: [
        {
          q: "Satellite lesions in a corneal ulcer suggest:",
          options: [
            "Bacterial keratitis",
            "Fungal keratitis",
            "Herpetic keratitis",
            "Exposure keratitis",
          ],
          answer: 1,
          why: "Satellite lesions and feathery margins are typical of fungal ulcers.",
        },
        {
          q: "Drug of choice for filamentous fungal keratitis:",
          options: ["Fluconazole", "Natamycin", "Amphotericin B (systemic)", "Acyclovir"],
          answer: 1,
          why: "Topical natamycin 5% is first-line for filamentous fungi.",
        },
      ],
    },
  ],
};
