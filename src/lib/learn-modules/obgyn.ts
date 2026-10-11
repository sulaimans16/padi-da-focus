import type { LearnModule } from "../learn";

export const obgyn: LearnModule = {
  slug: "obgyn",
  group: "Clinical",
  subject: "Obstetrics & Gynaecology",
  icon: "pregnant_woman",
  blurb:
    "Antepartum and postpartum haemorrhage, hypertension in pregnancy, ectopic, GDM, labour, cervical cancer and PCOS — the clinical calls NEET PG tests every year.",
  objectives: [
    "Tell placenta praevia from abruption at the bedside and manage both safely.",
    "Diagnose pre-eclampsia, give the MgSO₄ regimen and recognise its toxicity.",
    "Run the PPH drill using the 4 Ts and the right drug sequence.",
    "Decide between methotrexate and surgery for an ectopic pregnancy.",
    "Apply the Rotterdam criteria and the Indian GDM screening test.",
  ],
  concepts: [
    {
      id: "aph",
      title: "Antepartum haemorrhage: praevia vs abruption",
      minutes: 8,
      summary:
        "Bleeding after 28 weeks (in India; 20–24 weeks elsewhere) is placenta praevia or abruptio placentae until proven otherwise — and they look opposite at the bedside.",
      examFocus:
        "A vignette of painless vs painful bleeding: identify the cause, the investigation (ultrasound) and the one thing never to do (a vaginal examination in praevia).",
      mechanism:
        "In placenta praevia the placenta implants over or near the internal os. As the lower segment forms and stretches in the third trimester, the inelastic placenta shears off its bed, opening maternal sinuses: bleeding is painless, bright red, recurrent, and the uterus stays soft because nothing irritates the myometrium. In abruption a normally sited placenta separates early, usually from vasospastic disease such as pre-eclampsia; blood tracks into the myometrium and behind the placenta, so the uterus becomes tense and tender, much of the bleed may be concealed, and placental thromboplastin release can trigger DIC.",
      points: [
        "Praevia: painless, causeless, recurrent bright-red bleeding; soft non-tender uterus; malpresentation and a high presenting part are common.",
        "Never do a digital vaginal examination in suspected praevia — it can provoke torrential bleeding. Diagnose by transabdominal then transvaginal ultrasound.",
        "Abruption: painful bleeding, tense 'woody' tender uterus, fetal distress; risk factors are hypertension, trauma, cocaine, smoking, sudden decompression (polyhydramnios).",
        "Couvelaire uterus: blood extravasated into the myometrium in severe abruption — the uterus looks purple and may contract poorly.",
        "Abruption is the commonest obstetric cause of DIC; check coagulation early.",
        "Praevia with previous caesarean scar raises the risk of placenta accreta spectrum.",
      ],
      table: {
        title: "Placenta praevia vs abruptio placentae",
        columns: ["Feature", "Placenta praevia", "Abruptio placentae"],
        rows: [
          ["Pain", "Painless", "Painful"],
          ["Bleeding", "Revealed, bright red, recurrent", "Revealed, concealed or mixed; dark"],
          ["Uterus", "Soft, non-tender", "Tense, tender, woody hard"],
          ["Fetal parts / lie", "Easily felt; malpresentation", "Difficult to feel"],
          ["Fetal heart", "Usually normal", "Often distressed or absent"],
          ["Shock", "Proportional to visible loss", "Out of proportion to visible loss"],
          ["Key association", "Previous caesarean, multiparity", "Hypertension, trauma"],
        ],
      },
      pitfalls: [
        "Shock out of proportion to the visible bleeding points to abruption with concealed haemorrhage.",
        "A 'warning haemorrhage' in praevia is typically small; don't be falsely reassured by its size.",
      ],
      vignette: {
        stem: "A 32-week primigravida with severe pre-eclampsia develops sudden abdominal pain and a small amount of dark vaginal bleeding. BP 90/60 mmHg, pulse 120/min, the uterus is tense and tender and the fetal heart is not heard.",
        answer: "Abruptio placentae with concealed haemorrhage.",
        reasoning:
          "Painful bleeding, a hard tender uterus, shock out of proportion to visible loss and a hypertensive background are classic. Resuscitate, check for DIC and expedite delivery.",
      },
      highYield:
        "Painless + soft uterus = praevia (no PV exam; ultrasound). Painful + tense uterus + hypertension = abruption (watch for DIC).",
      checks: [
        {
          q: "Which is contraindicated in a woman with suspected placenta praevia?",
          options: [
            "Transabdominal USG",
            "Speculum examination",
            "Digital vaginal examination",
            "Blood grouping",
          ],
          answer: 2,
          why: "A digital examination can dislodge the placenta and cause massive haemorrhage.",
        },
        {
          q: "Commonest obstetric cause of DIC:",
          options: ["Placenta praevia", "Abruptio placentae", "Ectopic pregnancy", "Hyperemesis"],
          answer: 1,
          why: "Thromboplastin released from the separated placenta triggers consumptive coagulopathy.",
        },
      ],
    },
    {
      id: "preeclampsia",
      title: "Pre-eclampsia, eclampsia and magnesium sulphate",
      minutes: 9,
      summary:
        "New hypertension after 20 weeks with proteinuria or organ dysfunction is pre-eclampsia; seizures make it eclampsia, and magnesium sulphate is the drug of choice to prevent and treat them.",
      examFocus:
        "Diagnostic thresholds, the Pritchard regimen, the toxicity monitoring checklist and its antidote; also HELLP.",
      mechanism:
        "In normal pregnancy, trophoblast invades the spiral arteries and converts them into wide, low-resistance channels. In pre-eclampsia this remodelling is shallow, so the placenta is under-perfused and releases anti-angiogenic factors (sFlt-1, soluble endoglin) into the maternal circulation. The result is widespread endothelial dysfunction: vasoconstriction (hypertension), leaky glomeruli (proteinuria), cerebral oedema (headache, visual symptoms, seizures), liver injury and platelet consumption (HELLP). Delivery of the placenta is the only cure because it removes the source.",
      points: [
        "Pre-eclampsia: BP ≥ 140/90 mmHg after 20 weeks + proteinuria ≥ 300 mg/24 h (or features of end-organ damage). Severe: BP ≥ 160/110, headache, visual change, epigastric pain, low platelets, raised creatinine or liver enzymes.",
        "Antihypertensives: labetalol, nifedipine, methyldopa. ACE inhibitors and ARBs are contraindicated in pregnancy.",
        "MgSO₄ Pritchard regimen: loading 4 g IV (20%) slowly + 10 g IM (5 g deep IM in each buttock); maintenance 5 g IM every 4 h in alternate buttocks for 24 h after delivery or the last fit.",
        "Before each maintenance dose check: patellar reflex present, respiratory rate > 12–16/min, urine output ≥ 30 mL/h (100 mL in 4 h).",
        "Antidote: 10 mL of 10% calcium gluconate IV slowly.",
        "HELLP: Haemolysis, Elevated Liver enzymes, Low Platelets — a severe variant needing delivery.",
        "Low-dose aspirin from 12 weeks reduces risk in high-risk women.",
      ],
      table: {
        title: "Serum magnesium and its effects",
        columns: ["Level (mEq/L)", "Effect"],
        rows: [
          ["4–7", "Therapeutic range"],
          ["8–10", "Loss of patellar reflex — first sign of toxicity"],
          ["12–15", "Respiratory depression"],
          ["> 25", "Cardiac arrest"],
        ],
      },
      pitfalls: [
        "Loss of the knee jerk comes before respiratory depression — that's why reflexes are checked before every dose.",
        "Magnesium is renally excreted: oliguria means the next dose must be withheld or reduced.",
      ],
      mnemonic: "MgSO₄ checks before each dose: Reflex, Respiration, Renal output (the 3 Rs).",
      vignette: {
        stem: "A 34-week primigravida with BP 170/112 mmHg and 3+ proteinuria has a generalised tonic–clonic seizure.",
        answer:
          "Eclampsia — secure airway, start MgSO₄ (Pritchard regimen), control BP, then plan delivery once stable.",
        reasoning:
          "Magnesium sulphate is superior to diazepam and phenytoin for preventing recurrent eclamptic fits (Collaborative Eclampsia Trial).",
      },
      highYield:
        "MgSO₄ is the anticonvulsant of choice in eclampsia. Monitor reflexes (lost first, 8–10 mEq/L), respiration and urine output; antidote = calcium gluconate.",
      checks: [
        {
          q: "Earliest clinical sign of magnesium toxicity:",
          options: [
            "Respiratory depression",
            "Loss of deep tendon reflexes",
            "Cardiac arrest",
            "Oliguria",
          ],
          answer: 1,
          why: "Patellar reflexes disappear at 8–10 mEq/L, before respiratory depression at 12–15.",
        },
        {
          q: "Antihypertensive contraindicated in pregnancy:",
          options: ["Labetalol", "Nifedipine", "Methyldopa", "Enalapril"],
          answer: 3,
          why: "ACE inhibitors are teratogenic (fetal renal dysgenesis, oligohydramnios).",
        },
      ],
    },
    {
      id: "pph",
      title: "Postpartum haemorrhage: the 4 Ts",
      minutes: 8,
      summary:
        "PPH is the leading cause of maternal death in India; most is due to uterine atony, and both prevention and treatment follow a fixed drug and procedure sequence.",
      examFocus:
        "The commonest cause (atony), the first-line drug (oxytocin), contraindications of the others (ergometrine in hypertension, carboprost in asthma), and active management of the third stage.",
      mechanism:
        "After delivery the placental bed is a raw area of open spiral arteries carrying around 500–700 mL/min at term. These vessels have no muscular sphincters of their own; bleeding is stopped mechanically by the contracting, retracting myometrium that kinks them — the 'living ligatures'. Anything that prevents contraction (overdistension, prolonged labour, retained tissue, infection) leads to atonic bleeding, which is why uterotonics and uterine massage are the core of treatment.",
      points: [
        "Definition: blood loss ≥ 500 mL after vaginal delivery or ≥ 1000 mL after caesarean (or any loss causing haemodynamic compromise).",
        "4 Ts: Tone (atony, ~70%), Trauma (tears, rupture), Tissue (retained placenta), Thrombin (coagulopathy).",
        "Active management of the third stage (AMTSL): oxytocin 10 IU IM after delivery of the baby, controlled cord traction, then uterine massage.",
        "Treatment sequence: call for help, two IV lines, bimanual compression/massage, oxytocin → ergometrine → carboprost (15-methyl PGF2α) → misoprostol; add tranexamic acid 1 g IV within 3 hours of birth.",
        "Persistent bleeding: balloon tamponade, then surgery — B-Lynch compression suture, uterine/internal iliac artery ligation, hysterectomy.",
      ],
      table: {
        title: "Uterotonics in PPH",
        columns: ["Drug", "Dose", "Avoid in"],
        rows: [
          ["Oxytocin", "10 IU IM / 20–40 IU infusion", "— (first line)"],
          [
            "Ergometrine / methylergometrine",
            "0.2 mg IM",
            "Hypertension, pre-eclampsia, heart disease",
          ],
          ["Carboprost (15-methyl PGF2α)", "250 µg IM every 15 min, max 8 doses", "Asthma"],
          [
            "Misoprostol (PGE1)",
            "800–1000 µg rectal/sublingual",
            "— (useful where cold chain is lacking)",
          ],
        ],
      },
      flow: {
        title: "PPH drill",
        steps: [
          {
            label: "Call for help, ABC, two large-bore IV lines",
            detail: "Group & cross-match, start fluids",
          },
          { label: "Massage the uterus / bimanual compression" },
          { label: "Uterotonics", detail: "Oxytocin → ergometrine → carboprost → misoprostol" },
          { label: "Tranexamic acid 1 g IV", detail: "Within 3 hours of birth" },
          {
            label: "Examine for tears and retained tissue",
            detail: "Repair; manual removal of placenta",
          },
          { label: "Balloon tamponade", detail: "If still bleeding" },
          { label: "Surgery", detail: "B-Lynch suture → artery ligation → hysterectomy" },
        ],
      },
      pitfalls: [
        "Ergometrine is contraindicated in pre-eclampsia (it raises blood pressure); carboprost in asthma (bronchospasm).",
        "A well-contracted uterus with continuing bleeding means trauma — look for tears before giving more uterotonics.",
      ],
      mnemonic: "4 Ts — Tone, Trauma, Tissue, Thrombin.",
      vignette: {
        stem: "Ten minutes after a vaginal delivery of a 4.2 kg baby, a woman bleeds heavily. The uterus is boggy and above the umbilicus. She is asthmatic.",
        answer:
          "Atonic PPH — massage, oxytocin, then ergometrine; avoid carboprost because of asthma; tranexamic acid.",
        reasoning:
          "A large baby overdistended the uterus; a soft, high fundus means atony. Carboprost (PGF2α) can cause bronchospasm in asthma.",
      },
      highYield:
        "PPH ≥ 500 mL (vaginal) / ≥ 1000 mL (CS); atony is commonest. Oxytocin first. No ergometrine in hypertension, no carboprost in asthma; TXA within 3 h.",
      checks: [
        {
          q: "Drug of choice for prevention of PPH in active management of the third stage:",
          options: ["Ergometrine", "Oxytocin", "Carboprost", "Misoprostol"],
          answer: 1,
          why: "Oxytocin 10 IU IM is the recommended uterotonic for AMTSL.",
        },
        {
          q: "Carboprost should be avoided in a woman with:",
          options: ["Hypertension", "Bronchial asthma", "Diabetes", "Anaemia"],
          answer: 1,
          why: "PGF2α causes bronchoconstriction.",
        },
      ],
    },
    {
      id: "ectopic",
      title: "Ectopic pregnancy",
      minutes: 7,
      summary:
        "Any woman of reproductive age with abdominal pain, amenorrhoea and vaginal spotting has an ectopic pregnancy until a positive pregnancy test is located inside the uterus.",
      examFocus:
        "The commonest site (ampulla), the discriminatory β-hCG zone, criteria for methotrexate, and management of a ruptured ectopic.",
      mechanism:
        "Fertilisation happens in the ampulla and the embryo is normally carried to the uterus by tubal cilia and peristalsis. Anything that damages the tube — pelvic inflammatory disease (especially chlamydia), previous tubal surgery, an IUCD in situ, IVF — slows transport, so the blastocyst implants in the tube. The tube cannot accommodate a growing pregnancy, so it ruptures, typically at 6–8 weeks, causing intraperitoneal haemorrhage and shock.",
      points: [
        "Commonest site: ampulla of the fallopian tube; isthmic ectopics rupture earliest; interstitial (cornual) ones rupture late but bleed catastrophically.",
        "Classic triad: amenorrhoea, abdominal pain, vaginal bleeding; shoulder-tip pain suggests haemoperitoneum.",
        "Discriminatory zone: an intrauterine sac should be seen on transvaginal ultrasound once β-hCG exceeds ~1500–2000 IU/L.",
        "Methotrexate (single dose 50 mg/m² IM) if haemodynamically stable, unruptured, mass < 3.5–4 cm, no fetal cardiac activity, β-hCG < 5000 IU/L, and able to follow up.",
        "Ruptured ectopic with shock: resuscitate and operate (laparotomy or laparoscopic salpingectomy).",
        "Arias–Stella reaction in the endometrium may be seen with an ectopic pregnancy.",
      ],
      pitfalls: [
        "A normal-looking uterus on ultrasound with β-hCG above the discriminatory zone is ectopic until proven otherwise.",
        "Methotrexate is not for a ruptured or haemodynamically unstable ectopic.",
      ],
      vignette: {
        stem: "A 26-year-old with 7 weeks of amenorrhoea and a past history of PID presents with lower abdominal pain, shoulder-tip pain, pulse 124/min and BP 80/50 mmHg. Urine pregnancy test is positive.",
        answer:
          "Ruptured tubal ectopic pregnancy — resuscitate and take for emergency laparotomy/salpingectomy.",
        reasoning:
          "Shock with a positive pregnancy test and shoulder-tip pain (diaphragmatic irritation from blood) means haemoperitoneum; surgery, not methotrexate.",
      },
      highYield:
        "Ampulla is commonest. No intrauterine sac with β-hCG > 1500–2000 = ectopic. Methotrexate only if stable, unruptured, < 3.5–4 cm, no cardiac activity, β-hCG < 5000.",
      checks: [
        {
          q: "Most common site of ectopic pregnancy:",
          options: ["Isthmus", "Ampulla", "Ovary", "Cervix"],
          answer: 1,
          why: "The ampulla, where fertilisation occurs, accounts for most tubal pregnancies.",
        },
        {
          q: "Which contraindicates methotrexate for ectopic pregnancy?",
          options: [
            "β-hCG 2000 IU/L",
            "Mass 2.5 cm",
            "Haemodynamic instability",
            "Absent cardiac activity",
          ],
          answer: 2,
          why: "An unstable patient (likely ruptured) needs surgery.",
        },
      ],
    },
    {
      id: "gdm",
      title: "Gestational diabetes",
      minutes: 7,
      summary:
        "Glucose intolerance first recognised in pregnancy; screened for universally in India with a single-step 75 g OGTT, because it raises the risks of macrosomia, shoulder dystocia and neonatal hypoglycaemia.",
      examFocus:
        "The DIPSI criterion (2-h ≥ 140 mg/dL), fetal complications, and the first-line treatment (diet, then insulin/metformin).",
      mechanism:
        "Placental hormones — human placental lactogen, progesterone, cortisol — create insulin resistance that rises through the second and third trimesters to divert glucose to the fetus. Women whose pancreas cannot compensate become hyperglycaemic. Glucose crosses the placenta but maternal insulin does not, so the fetal pancreas over-secretes insulin. Fetal hyperinsulinism drives growth (macrosomia, shoulder dystocia) and, after the cord is cut, neonatal hypoglycaemia.",
      points: [
        "India (DIPSI / Government of India): 75 g oral glucose irrespective of fasting status; plasma glucose at 2 h ≥ 140 mg/dL = GDM.",
        "IADPSG (fasting 75 g OGTT): fasting ≥ 92, 1 h ≥ 180, or 2 h ≥ 153 mg/dL — any one value is diagnostic.",
        "Screen at the first antenatal visit and repeat at 24–28 weeks if negative.",
        "Treatment: medical nutrition therapy and exercise; insulin if targets are not met (metformin is an alternative).",
        "Fetal/neonatal risks: macrosomia, shoulder dystocia, polyhydramnios, neonatal hypoglycaemia, hypocalcaemia, polycythaemia, jaundice, RDS.",
        "Pre-gestational (not gestational) diabetes causes congenital anomalies — caudal regression syndrome is the most specific.",
        "Re-test with an OGTT 6–12 weeks postpartum; lifelong risk of type 2 diabetes.",
      ],
      pitfalls: [
        "Congenital anomalies come from hyperglycaemia during organogenesis — they belong to pre-existing diabetes, not GDM diagnosed at 24–28 weeks.",
        "Neonatal hypoglycaemia is from fetal hyperinsulinism, so it appears after the cord is clamped.",
      ],
      vignette: {
        stem: "A 27-year-old at 26 weeks has a non-fasting 75 g OGTT with 2-hour plasma glucose of 152 mg/dL.",
        answer:
          "Gestational diabetes by DIPSI criteria — start medical nutrition therapy and monitor; insulin if targets are not met.",
        reasoning:
          "A 2-hour value ≥ 140 mg/dL after a 75 g load, irrespective of fasting, is diagnostic in Indian guidelines.",
      },
      highYield:
        "DIPSI: 75 g glucose, 2-h ≥ 140 mg/dL = GDM. Caudal regression = pre-existing diabetes. Neonate: hypoglycaemia, hypocalcaemia, polycythaemia.",
      checks: [
        {
          q: "By DIPSI criteria, GDM is diagnosed when the 2-hour plasma glucose after 75 g is:",
          options: ["≥ 120 mg/dL", "≥ 140 mg/dL", "≥ 153 mg/dL", "≥ 200 mg/dL"],
          answer: 1,
          why: "The Government of India / DIPSI single-step test uses a 2-hour cut-off of 140 mg/dL.",
        },
        {
          q: "Most specific congenital anomaly of maternal (pre-existing) diabetes:",
          options: ["Anencephaly", "Caudal regression syndrome", "VSD", "Cleft lip"],
          answer: 1,
          why: "Caudal regression syndrome is rare but strongly associated with maternal diabetes.",
        },
      ],
    },
    {
      id: "labour",
      title: "Normal labour, partograph and Bishop score",
      minutes: 7,
      summary:
        "Labour is divided into four stages; the partograph tracks progress against expected cervical dilatation, and the Bishop score predicts whether induction will succeed.",
      examFocus:
        "Durations of the stages, the partograph's alert and action lines, Bishop score components and what a favourable score is.",
      mechanism:
        "Effective labour needs a ripe cervix and coordinated contractions. Cervical ripening is a remodelling of collagen and ground substance, driven by prostaglandins, that makes the cervix soft and effaceable; the Bishop score quantifies this ripeness, which is why it predicts the success of induction. Once in the active phase, the cervix should dilate at about 1 cm per hour; the partograph plots dilatation against time so that slow progress is recognised early, before obstruction harms mother or baby.",
      points: [
        "Stages: 1st — onset of true labour to full dilatation (latent and active phases); 2nd — full dilatation to delivery of the baby; 3rd — delivery of the placenta; 4th — first hour after delivery (observation for PPH).",
        "WHO partograph: alert line starts at the beginning of the active phase and rises 1 cm/h; the action line is 4 hours to its right.",
        "Crossing the alert line means review and closer monitoring; crossing the action line means intervention.",
        "Bishop score items: dilatation, effacement (or length), station, consistency, position of the cervix (each 0–3 or 0–2; max 13). A score ≥ 8 is favourable (induction likely to succeed).",
        "Cardinal movements: engagement, descent, flexion, internal rotation, extension, restitution, external rotation, expulsion.",
      ],
      table: {
        title: "Bishop score",
        columns: ["Factor", "0", "1", "2", "3"],
        rows: [
          ["Dilatation (cm)", "Closed", "1–2", "3–4", "≥ 5"],
          ["Effacement (%)", "0–30", "40–50", "60–70", "≥ 80"],
          ["Station", "−3", "−2", "−1, 0", "+1, +2"],
          ["Consistency", "Firm", "Medium", "Soft", "—"],
          ["Position", "Posterior", "Mid", "Anterior", "—"],
        ],
      },
      pitfalls: [
        "The third stage ends with delivery of the placenta, not the baby.",
        "A low Bishop score means ripen the cervix first (prostaglandins, Foley catheter) rather than start oxytocin directly.",
      ],
      mnemonic: "Bishop = 'Call PEDS': Consistency, Position, Effacement, Dilatation, Station.",
      vignette: {
        stem: "A primigravida at term has a cervix 2 cm dilated, 50% effaced, station −2, medium consistency and mid-position. Induction is planned.",
        answer:
          "Bishop score 5 — unfavourable; ripen the cervix (e.g. dinoprostone or Foley) before oxytocin.",
        reasoning:
          "Dilatation 1 + effacement 1 + station 1 + consistency 1 + position 1 = 5, below the favourable threshold of 8.",
      },
      highYield:
        "Partograph: alert line 1 cm/h, action line 4 h to the right. Bishop ≥ 8 favourable. 3rd stage = placenta; 4th stage = first hour after.",
      checks: [
        {
          q: "The action line on the WHO partograph is drawn how far to the right of the alert line?",
          options: ["2 hours", "4 hours", "6 hours", "8 hours"],
          answer: 1,
          why: "Four hours — crossing it calls for intervention.",
        },
        {
          q: "Which is NOT part of the Bishop score?",
          options: ["Station", "Cervical position", "Fetal heart rate", "Effacement"],
          answer: 2,
          why: "Bishop scores the cervix (dilatation, effacement, consistency, position) and the station of the head.",
        },
      ],
    },
    {
      id: "cervical-cancer",
      title: "Cervical cancer: HPV, screening and staging",
      minutes: 8,
      summary:
        "Cervical cancer is caused by persistent high-risk HPV infection of the transformation zone; it is preventable by vaccination and screening, and treated by stage.",
      examFocus:
        "HPV types 16 and 18, VIA screening in India, CIN progression, and the FIGO stage at which surgery gives way to chemoradiation.",
      mechanism:
        "The transformation zone is where columnar epithelium undergoes squamous metaplasia — a region of actively dividing, immature cells that HPV infects easily. High-risk HPV proteins E6 and E7 inactivate the tumour suppressors p53 and Rb, removing the cell's brakes on proliferation. Most infections clear, but persistent infection drives a slow progression through cervical intraepithelial neoplasia (CIN 1 → 3) to invasive cancer over 10–15 years — the long window that makes screening so effective.",
      points: [
        "HPV 16 and 18 cause ~70% of cervical cancers; HPV 6 and 11 cause genital warts.",
        "Most common histology: squamous cell carcinoma; earliest symptom is often post-coital bleeding.",
        "India's screening: visual inspection with acetic acid (VIA) every 5 years for women 30–65; HPV DNA testing where available; Pap smear in many settings.",
        "Prevention: HPV vaccine (India's programme targets girls 9–14 years).",
        "FIGO: stage I confined to the cervix; IIA upper vagina; IIB parametrium; IIIA lower vagina; IIIB pelvic wall or hydronephrosis; IV bladder/rectum or distant.",
        "Early disease (IA–IIA) → surgery (radical / Wertheim hysterectomy); IIB onwards → concurrent chemoradiation with cisplatin.",
        "Commonest cause of death: uraemia from bilateral ureteric obstruction.",
      ],
      pitfalls: [
        "Hydronephrosis from tumour automatically upstages to IIIB, regardless of other findings.",
        "E6 targets p53; E7 targets Rb — a favourite matching question.",
      ],
      mnemonic: "E6 → p53 ('six' and 'fifty-three' both start with an S sound); E7 → Rb.",
      vignette: {
        stem: "A 48-year-old with post-coital bleeding has a cervical growth extending into the left parametrium but not to the pelvic wall; renal ultrasound is normal.",
        answer: "FIGO stage IIB — concurrent chemoradiation with cisplatin.",
        reasoning:
          "Parametrial involvement without pelvic wall extension or hydronephrosis is IIB, beyond the reach of curative surgery.",
      },
      highYield:
        "HPV 16/18; E6 → p53, E7 → Rb. VIA every 5 years (30–65) in India. Parametrium = IIB → chemoradiation; hydronephrosis = IIIB.",
      checks: [
        {
          q: "HPV E7 oncoprotein inactivates:",
          options: ["p53", "Rb", "BRCA1", "APC"],
          answer: 1,
          why: "E7 binds Rb; E6 promotes degradation of p53.",
        },
        {
          q: "Cervical cancer with hydronephrosis is FIGO stage:",
          options: ["IIA", "IIB", "IIIB", "IVA"],
          answer: 2,
          why: "Pelvic wall extension or hydronephrosis/non-functioning kidney defines IIIB.",
        },
      ],
    },
    {
      id: "pcos",
      title: "PCOS and anovulation",
      minutes: 7,
      summary:
        "Polycystic ovary syndrome is the commonest cause of anovulatory infertility and hirsutism; it is diagnosed by the Rotterdam criteria and treated according to the woman's goal.",
      examFocus:
        "Rotterdam criteria, the hormonal picture (high LH:FSH), and first-line ovulation induction (letrozole).",
      mechanism:
        "Insulin resistance and high LH act together on the ovary. LH stimulates theca cells to make androgens, and hyperinsulinaemia amplifies that and lowers SHBG, raising free androgen. Relatively low FSH means follicles start to grow but none becomes dominant, so they arrest as many small antral follicles — the 'polycystic' appearance — and ovulation fails. Unopposed oestrogen on an endometrium that never gets progesterone withdrawal explains the long-term risk of endometrial hyperplasia and cancer.",
      points: [
        "Rotterdam criteria (2 of 3): oligo/anovulation; clinical or biochemical hyperandrogenism; polycystic ovaries on ultrasound — after excluding other causes.",
        "Ultrasound: ≥ 20 follicles per ovary (2–9 mm) on modern transvaginal probes (older cut-off ≥ 12) and/or ovarian volume > 10 mL.",
        "Hormones: LH:FSH often > 2:1, raised testosterone, low SHBG; check TSH and prolactin to exclude mimics.",
        "Ovulation induction: letrozole is now first line; clomiphene citrate is the alternative; metformin helps insulin resistance.",
        "Not trying to conceive: combined oral contraceptive pills (regulate cycles, protect the endometrium, reduce androgens), anti-androgens for hirsutism, weight loss.",
        "Long-term risks: type 2 diabetes, dyslipidaemia, endometrial hyperplasia and carcinoma.",
      ],
      pitfalls: [
        "Polycystic ovaries on ultrasound alone are not PCOS — you need two of the three criteria.",
        "Anti-androgens (spironolactone, cyproterone) are teratogenic; combine them with reliable contraception.",
      ],
      vignette: {
        stem: "A 24-year-old with irregular cycles every 2–3 months, acne and hirsutism wants to conceive. Ultrasound shows 22 small peripheral follicles in each ovary; TSH and prolactin are normal.",
        answer: "PCOS — lifestyle modification and letrozole for ovulation induction.",
        reasoning:
          "She meets all three Rotterdam criteria with mimics excluded; letrozole now has better live-birth rates than clomiphene in PCOS.",
      },
      highYield:
        "Rotterdam: 2 of 3 (anovulation, hyperandrogenism, PCO morphology). LH:FSH > 2. Letrozole first for ovulation; COCP if not planning pregnancy.",
      checks: [
        {
          q: "First-line drug for ovulation induction in PCOS:",
          options: ["Metformin", "Letrozole", "Gonadotropins", "Bromocriptine"],
          answer: 1,
          why: "Letrozole gives higher ovulation and live-birth rates than clomiphene in PCOS.",
        },
        {
          q: "Long-term malignancy risk in untreated PCOS:",
          options: [
            "Ovarian germ cell tumour",
            "Endometrial carcinoma",
            "Cervical carcinoma",
            "Breast sarcoma",
          ],
          answer: 1,
          why: "Chronic anovulation leaves the endometrium exposed to unopposed oestrogen.",
        },
      ],
    },
  ],
};
