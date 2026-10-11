import type { LearnModule } from "../learn";

export const psychiatry: LearnModule = {
  slug: "psychiatry",
  group: "Clinical",
  subject: "Psychiatry",
  icon: "psychology",
  blurb:
    "Schizophrenia, mood disorders and lithium, anxiety and OCD, alcohol, antipsychotic side effects, delirium vs dementia and defence mechanisms.",
  objectives: [
    "Identify Schneider's first-rank symptoms and the prognostic factors in schizophrenia.",
    "Diagnose depression and mania and choose SSRIs, lithium or ECT appropriately.",
    "Time the stages of alcohol withdrawal and prevent Wernicke's encephalopathy.",
    "Recognise and treat each antipsychotic adverse effect, including NMS.",
    "Distinguish delirium from dementia and name the defence mechanism in a vignette.",
  ],
  concepts: [
    {
      id: "schizophrenia",
      title: "Schizophrenia",
      minutes: 8,
      summary:
        "A psychotic disorder with positive symptoms (delusions, hallucinations, disorganisation) and negative symptoms (blunted affect, avolition, alogia) lasting at least 6 months (DSM-5).",
      examFocus:
        "Schneider's first-rank symptoms, the dopamine pathways, good prognostic factors, and when to use clozapine.",
      mechanism:
        "The dopamine hypothesis explains much of the clinical picture. Excess dopamine activity in the mesolimbic pathway gives positive symptoms, which is why D2-blocking antipsychotics relieve hallucinations and delusions. Reduced activity in the mesocortical pathway to the prefrontal cortex contributes to negative and cognitive symptoms, which respond poorly to D2 blockade. Blocking dopamine elsewhere produces the side effects: in the nigrostriatal pathway (extrapyramidal symptoms) and the tuberoinfundibular pathway (raised prolactin).",
      points: [
        "Schneider's first-rank symptoms: audible thoughts, voices arguing or discussing (third person), voices commenting on actions, thought insertion/withdrawal/broadcasting, made feelings/impulses/actions, somatic passivity, delusional perception.",
        "DSM-5: ≥ 6 months of disturbance including ≥ 1 month of active symptoms.",
        "Good prognosis: acute onset, later onset, clear precipitant, prominent positive or mood symptoms, good premorbid functioning, married, family history of mood (not schizophrenic) disorder.",
        "Treatment: antipsychotics (atypicals first-line), psychosocial rehabilitation, depot injections for poor adherence.",
        "Treatment-resistant schizophrenia (failure of two adequate antipsychotic trials): clozapine — also reduces suicide risk; monitor absolute neutrophil count.",
        "Catatonic features respond to lorazepam and ECT.",
      ],
      pitfalls: [
        "Second-person hallucinations commenting are less specific than third-person 'voices discussing the patient'.",
        "Negative symptoms predict poorer outcome than positive symptoms.",
      ],
      vignette: {
        stem: "A 22-year-old believes a chip in his brain lets others read his thoughts and hears two voices discussing him for the past 8 months. His affect is blunted and he has withdrawn from college.",
        answer: "Schizophrenia — start an atypical antipsychotic.",
        reasoning:
          "Thought broadcasting and third-person voices are first-rank symptoms; duration > 6 months with functional decline meets criteria.",
      },
      highYield:
        "First-rank: thought insertion/withdrawal/broadcast, third-person voices, passivity, delusional perception. Mesolimbic ↑DA = positive symptoms. Treatment-resistant → clozapine.",
      checks: [
        {
          q: "Which is a Schneiderian first-rank symptom?",
          options: [
            "Visual hallucinations",
            "Thought broadcasting",
            "Grandiose delusions",
            "Formal thought disorder",
          ],
          answer: 1,
          why: "Thought broadcasting is one of the passivity experiences among first-rank symptoms.",
        },
        {
          q: "Drug of choice in treatment-resistant schizophrenia:",
          options: ["Haloperidol", "Risperidone", "Clozapine", "Lithium"],
          answer: 2,
          why: "Clozapine is effective after two failed adequate trials.",
        },
      ],
    },
    {
      id: "depression",
      title: "Major depressive disorder",
      minutes: 7,
      summary:
        "Depressed mood or loss of interest for at least two weeks with other somatic and cognitive symptoms; treated with SSRIs, psychotherapy, and ECT in severe or urgent cases.",
      examFocus:
        "Diagnostic criteria (SIG E CAPS), first-line drugs, ECT indications and its commonest side effect, and serotonin syndrome.",
      mechanism:
        "Antidepressants raise synaptic monoamines within hours, yet mood takes 2–4 weeks to improve, which tells us the monoamine change is only the trigger. The delayed effect reflects downstream adaptation — receptor down-regulation and increased neurotrophic signalling (BDNF) that restore synaptic plasticity in mood circuits. ECT works faster, inducing a generalised seizure that produces broad neurochemical and neuroplastic changes, which is why it's chosen when waiting weeks is unsafe.",
      points: [
        "Criteria: ≥ 5 of 9 symptoms for ≥ 2 weeks, including depressed mood or anhedonia (SIG E CAPS: Sleep, Interest, Guilt, Energy, Concentration, Appetite, Psychomotor change, Suicidal thoughts).",
        "First-line: SSRIs (fluoxetine, sertraline, escitalopram); sertraline is preferred in cardiac disease. Response takes 2–4 weeks.",
        "Continue antidepressants for 6–12 months after remission of a first episode to prevent relapse.",
        "ECT indications: severe depression with high suicide risk, psychotic depression, refusal to eat or drink, catatonia, depression in pregnancy needing rapid response.",
        "Commonest side effect of ECT: transient memory impairment (retrograde and anterograde amnesia).",
        "Serotonin syndrome (SSRI + MAOI/tramadol): agitation, hyperthermia, clonus, hyperreflexia, diarrhoea → stop drugs, cyproheptadine.",
      ],
      pitfalls: [
        "Suicide risk can rise early in treatment as energy improves before mood does.",
        "Antidepressant monotherapy in bipolar depression can switch the patient into mania.",
      ],
      mnemonic:
        "SIG E CAPS — Sleep, Interest, Guilt, Energy, Concentration, Appetite, Psychomotor, Suicide.",
      vignette: {
        stem: "A 55-year-old has stopped eating and drinking, believes his organs are rotting and that he deserves to die, and has not responded to an antidepressant.",
        answer:
          "Severe depression with psychotic features (nihilistic delusions) and food refusal — ECT.",
        reasoning:
          "Psychotic depression with refusal to eat is a classic indication for urgent ECT.",
      },
      highYield:
        "≥ 2 weeks, ≥ 5 symptoms incl. mood/anhedonia. SSRIs first-line (2–4 wk lag). ECT: psychotic depression, suicidal, food refusal, catatonia; side effect = memory loss.",
      checks: [
        {
          q: "Most common side effect of ECT:",
          options: ["Fractures", "Memory impairment", "Arrhythmia", "Status epilepticus"],
          answer: 1,
          why: "Transient amnesia is the commonest adverse effect.",
        },
        {
          q: "Minimum duration of symptoms required for major depressive episode:",
          options: ["1 week", "2 weeks", "1 month", "6 months"],
          answer: 1,
          why: "At least 2 weeks of symptoms most of the day, nearly every day.",
        },
      ],
    },
    {
      id: "bipolar-lithium",
      title: "Bipolar disorder and lithium",
      minutes: 8,
      summary:
        "Bipolar I needs at least one manic episode; lithium is the classic mood stabiliser, with a narrow therapeutic range and important toxicities.",
      examFocus:
        "Mania criteria (DIGFAST), lithium levels and toxicity, long-term side effects, drug interactions and teratogenicity.",
      mechanism:
        "Lithium behaves like sodium in the kidney: it is filtered and largely reabsorbed in the proximal tubule along with sodium. Anything that makes the kidney retain sodium — dehydration, a low-salt diet, thiazides, NSAIDs, ACE inhibitors — also retains lithium, pushing a drug with a narrow window into toxicity. Lithium also blocks ADH's action on collecting duct cells (nephrogenic diabetes insipidus) and inhibits thyroid hormone release (hypothyroidism), which explains the long-term monitoring.",
      points: [
        "Mania: ≥ 1 week (or any duration if hospitalised) — DIGFAST: Distractibility, Indiscretion, Grandiosity, Flight of ideas, Activity increase, Sleep need decreased, Talkativeness.",
        "Bipolar I: mania; Bipolar II: hypomania + major depression.",
        "Lithium levels: maintenance 0.6–0.8 mEq/L (up to ~1.0–1.2 in acute mania); toxicity above ~1.5 mEq/L.",
        "Toxicity: coarse tremor, vomiting, diarrhoea, ataxia, dysarthria, confusion, seizures → stop lithium, fluids; haemodialysis in severe toxicity.",
        "Long-term: hypothyroidism, nephrogenic diabetes insipidus, weight gain, acne/psoriasis flares; check TSH and creatinine.",
        "Teratogenic: Ebstein's anomaly. Valproate (neural tube defects) and carbamazepine are alternatives; atypical antipsychotics treat acute mania.",
      ],
      pitfalls: [
        "Fine tremor is a common side effect at therapeutic levels; coarse tremor suggests toxicity.",
        "Starting a thiazide or NSAID in a patient on lithium can precipitate toxicity.",
      ],
      mnemonic: "DIGFAST for mania.",
      vignette: {
        stem: "A man stable on lithium starts hydrochlorothiazide for hypertension. A week later he has vomiting, diarrhoea, coarse tremor and confusion.",
        answer: "Lithium toxicity precipitated by a thiazide.",
        reasoning:
          "Thiazides increase proximal sodium (and lithium) reabsorption, raising serum lithium.",
      },
      highYield:
        "Mania ≥ 1 week (DIGFAST). Lithium 0.6–1.0 mEq/L; toxic > 1.5 (coarse tremor, ataxia, confusion). Thiazides/NSAIDs/ACEi ↑ levels. Hypothyroidism, nephrogenic DI, Ebstein's.",
      checks: [
        {
          q: "Congenital anomaly associated with lithium:",
          options: ["Neural tube defect", "Ebstein's anomaly", "Cleft palate", "Phocomelia"],
          answer: 1,
          why: "Lithium in the first trimester is linked to Ebstein's anomaly.",
        },
        {
          q: "Which drug increases serum lithium levels?",
          options: ["Theophylline", "Acetazolamide", "Hydrochlorothiazide", "Caffeine"],
          answer: 2,
          why: "Thiazides increase proximal tubular lithium reabsorption.",
        },
      ],
    },
    {
      id: "anxiety-ocd",
      title: "Anxiety disorders and OCD",
      minutes: 7,
      summary:
        "Panic disorder, generalised anxiety disorder, phobias and OCD share excessive fear or worry; SSRIs and CBT are first-line for all.",
      examFocus:
        "Distinguishing panic vs GAD vs phobia vs OCD, and the specific psychological therapy for each.",
      mechanism:
        "Anxiety disorders involve an over-reactive threat system (amygdala) that the prefrontal cortex fails to regulate, along with learned avoidance. Avoidance relieves anxiety in the short term, which reinforces it — so behavioural treatments work by exposure without escape until the fear response habituates. In OCD, compulsions play the same role as avoidance: they briefly reduce the anxiety caused by an intrusive obsession, which is why exposure and response prevention (resisting the compulsion) is the core therapy.",
      points: [
        "Panic disorder: recurrent unexpected panic attacks peaking within minutes, with persistent worry about further attacks.",
        "GAD: excessive worry about many things on most days for ≥ 6 months, with restlessness, fatigue, poor concentration, muscle tension, poor sleep.",
        "Specific phobia: fear of a specific object/situation → systematic desensitisation (Wolpe), flooding.",
        "OCD: obsessions (intrusive, ego-dystonic thoughts) and compulsions (repetitive acts to reduce anxiety); insight usually present.",
        "OCD treatment: SSRIs at higher doses or clomipramine, plus exposure and response prevention (ERP).",
        "Benzodiazepines only for short-term relief (dependence risk); SSRIs and CBT are long-term first-line.",
      ],
      pitfalls: [
        "Obsessions are ego-dystonic (unwanted); in obsessive-compulsive personality disorder traits are ego-syntonic.",
        "Exclude medical mimics of anxiety: hyperthyroidism, phaeochromocytoma, caffeine, hypoglycaemia.",
      ],
      vignette: {
        stem: "A 26-year-old washes her hands 40 times a day because she cannot stop thinking her hands are contaminated. She knows this is excessive but feels unbearable anxiety if she doesn't.",
        answer:
          "Obsessive-compulsive disorder — SSRI (e.g. fluoxetine at higher doses) with exposure and response prevention.",
        reasoning:
          "Ego-dystonic contamination obsessions with compulsive washing and preserved insight.",
      },
      highYield:
        "OCD: ego-dystonic obsessions + compulsions → high-dose SSRI/clomipramine + ERP. Phobia → systematic desensitisation. GAD ≥ 6 months. Panic: unexpected attacks.",
      checks: [
        {
          q: "Psychotherapy of choice for OCD:",
          options: [
            "Psychoanalysis",
            "Exposure and response prevention",
            "Supportive therapy",
            "Hypnosis",
          ],
          answer: 1,
          why: "ERP breaks the obsession–compulsion cycle.",
        },
        {
          q: "Systematic desensitisation is the treatment of choice for:",
          options: ["Specific phobia", "Schizophrenia", "Mania", "Delirium"],
          answer: 0,
          why: "Graded exposure paired with relaxation (Wolpe) treats phobias.",
        },
      ],
    },
    {
      id: "alcohol",
      title: "Alcohol withdrawal, Wernicke and relapse prevention",
      minutes: 8,
      summary:
        "Alcohol withdrawal follows a predictable timeline from tremor to delirium tremens; benzodiazepines treat it and thiamine prevents Wernicke's encephalopathy.",
      examFocus:
        "Timing of withdrawal features, drug of choice (and in liver disease), thiamine before glucose, and drugs for relapse prevention.",
      mechanism:
        "Chronic alcohol enhances inhibitory GABA-A signalling and suppresses excitatory NMDA (glutamate) signalling; the brain compensates by down-regulating GABA receptors and up-regulating NMDA receptors. When alcohol stops, the brain is left over-excited — tremor, autonomic overactivity, seizures and, at the extreme, delirium tremens. Benzodiazepines act on the same GABA-A receptor, substituting for alcohol and allowing a controlled taper. Thiamine is a cofactor for glucose metabolism; giving glucose to a thiamine-depleted patient can precipitate Wernicke's encephalopathy.",
      points: [
        "6–24 h: tremors, sweating, anxiety, tachycardia. 12–48 h: withdrawal seizures ('rum fits'); alcoholic hallucinosis (auditory, clear consciousness).",
        "48–96 h: delirium tremens — disorientation, vivid visual hallucinations, autonomic instability; significant mortality.",
        "Treatment: long-acting benzodiazepines (chlordiazepoxide, diazepam); lorazepam or oxazepam in liver disease.",
        "Give parenteral thiamine before glucose to prevent Wernicke's encephalopathy (confusion, ophthalmoplegia, ataxia).",
        "Korsakoff syndrome: anterograde amnesia and confabulation; damage to mammillary bodies and dorsomedial thalamus.",
        "Relapse prevention: disulfiram (aldehyde dehydrogenase inhibitor — aversive), naltrexone (reduces craving), acamprosate (NMDA modulator; safe in liver disease, avoid in renal failure).",
      ],
      table: {
        title: "Withdrawal timeline",
        columns: ["Time after last drink", "Feature"],
        rows: [
          ["6–24 h", "Tremor, sweating, anxiety"],
          ["12–48 h", "Seizures; alcoholic hallucinosis"],
          ["48–96 h", "Delirium tremens"],
        ],
      },
      pitfalls: [
        "Alcoholic hallucinosis has a clear sensorium — confusion points to delirium tremens.",
        "Disulfiram must never be given to an intoxicated patient or without consent.",
      ],
      mnemonic: "Wernicke's triad: Confusion, Ophthalmoplegia, Ataxia — 'COAT'.",
      vignette: {
        stem: "Three days after admission for a fracture, a heavy drinker becomes disoriented, sweaty and tremulous, sees insects crawling on the walls, and has HR 130/min with fever.",
        answer:
          "Delirium tremens — high-dose benzodiazepines, IV thiamine, fluids and electrolyte correction.",
        reasoning:
          "Onset at 48–96 hours with confusion, visual hallucinations and autonomic hyperactivity.",
      },
      highYield:
        "Tremor 6–24 h → seizures/hallucinosis 12–48 h → DT 48–96 h. Chlordiazepoxide (lorazepam in liver disease). Thiamine before glucose. Disulfiram, naltrexone, acamprosate.",
      checks: [
        {
          q: "Benzodiazepine preferred for alcohol withdrawal in a patient with liver cirrhosis:",
          options: ["Chlordiazepoxide", "Diazepam", "Lorazepam", "Clonazepam"],
          answer: 2,
          why: "Lorazepam undergoes glucuronidation only, with no active metabolites.",
        },
        {
          q: "Drug for alcohol dependence that is safe in liver disease:",
          options: ["Disulfiram", "Naltrexone", "Acamprosate", "Chlordiazepoxide"],
          answer: 2,
          why: "Acamprosate is renally excreted and doesn't burden the liver.",
        },
      ],
    },
    {
      id: "antipsychotic-se",
      title: "Antipsychotic side effects and NMS",
      minutes: 7,
      summary:
        "Each extrapyramidal side effect has a typical time of onset and its own treatment; neuroleptic malignant syndrome is a medical emergency.",
      examFocus:
        "Order of onset of acute dystonia, akathisia, parkinsonism and tardive dyskinesia, NMS vs serotonin syndrome, and clozapine's adverse effects.",
      mechanism:
        "Blocking D2 receptors in the nigrostriatal pathway disturbs the dopamine–acetylcholine balance in the basal ganglia, producing acute dystonia and parkinsonism within days to weeks — both relieved by anticholinergics. Long-term blockade makes the receptors supersensitive, so involuntary choreiform movements (tardive dyskinesia) emerge after months to years and may persist. Neuroleptic malignant syndrome is thought to reflect sudden, severe central dopamine blockade in the hypothalamus and striatum, causing hyperthermia and lead-pipe rigidity.",
      points: [
        "Acute dystonia (hours–days): torticollis, oculogyric crisis → IM anticholinergic (promethazine, benztropine).",
        "Akathisia (days–weeks): subjective restlessness → propranolol, reduce dose.",
        "Drug-induced parkinsonism (weeks): rigidity, tremor, bradykinesia → anticholinergic, reduce dose or switch.",
        "Tardive dyskinesia (months–years): orofacial choreiform movements → stop/switch (clozapine), VMAT2 inhibitors (valbenazine, tetrabenazine); anticholinergics worsen it.",
        "NMS: fever, lead-pipe rigidity, autonomic instability, altered sensorium, very high CPK → stop the drug, cooling, dantrolene, bromocriptine.",
        "Clozapine: agranulocytosis (ANC monitoring), seizures, myocarditis, sialorrhoea, weight gain/metabolic syndrome. Typicals and risperidone: hyperprolactinaemia.",
      ],
      table: {
        title: "NMS vs serotonin syndrome",
        columns: ["Feature", "NMS", "Serotonin syndrome"],
        rows: [
          ["Drug", "Antipsychotics (D2 block)", "SSRIs, MAOIs, tramadol"],
          ["Onset", "Days", "Hours"],
          ["Muscles", "Lead-pipe rigidity, bradyreflexia", "Clonus, hyperreflexia"],
          ["Treatment", "Dantrolene, bromocriptine", "Cyproheptadine"],
        ],
      },
      pitfalls: [
        "Anticholinergics help dystonia and parkinsonism but worsen tardive dyskinesia.",
        "Hyperreflexia and clonus point to serotonin syndrome, not NMS.",
      ],
      vignette: {
        stem: "Two days after starting IM haloperidol, a patient develops fever 40°C, generalised rigidity, fluctuating BP, confusion and CPK of 12,000 U/L.",
        answer:
          "Neuroleptic malignant syndrome — stop haloperidol, cool, hydrate, dantrolene/bromocriptine.",
        reasoning:
          "Fever, rigidity, autonomic instability and altered consciousness after a high-potency antipsychotic.",
      },
      highYield:
        "Dystonia (hours) → akathisia (days) → parkinsonism (weeks) → TD (months–years). NMS: fever + lead-pipe rigidity + ↑CPK → dantrolene. Clozapine → agranulocytosis.",
      checks: [
        {
          q: "Drug of choice for antipsychotic-induced akathisia:",
          options: ["Benztropine", "Propranolol", "Levodopa", "Haloperidol"],
          answer: 1,
          why: "Low-dose propranolol is most effective for akathisia.",
        },
        {
          q: "Which worsens tardive dyskinesia?",
          options: ["Clozapine", "Valbenazine", "Anticholinergic drugs", "Dose reduction"],
          answer: 2,
          why: "Anticholinergics aggravate tardive dyskinesia.",
        },
      ],
    },
    {
      id: "delirium-dementia",
      title: "Delirium vs dementia",
      minutes: 6,
      summary:
        "Delirium is an acute, fluctuating disturbance of attention and consciousness with an underlying medical cause; dementia is a chronic progressive decline in cognition with clear consciousness.",
      examFocus:
        "Distinguishing features, the core feature of delirium (inattention), and Alzheimer's pathology and drugs.",
      mechanism:
        "Delirium is acute brain failure: infection, drugs, hypoxia, metabolic disturbance or withdrawal disrupt widespread neurotransmission (cholinergic deficiency, dopaminergic excess), so attention and arousal fluctuate across the day. It is usually reversible if the cause is treated. In Alzheimer's disease, extracellular amyloid plaques and intracellular tau neurofibrillary tangles accumulate, first in the entorhinal cortex and hippocampus — which is why recent memory goes first — with loss of cholinergic neurons in the nucleus basalis of Meynert, the rationale for cholinesterase inhibitors.",
      points: [
        "Delirium: acute onset, fluctuating course, inattention (core), clouded consciousness, visual hallucinations, worse at night; reversible.",
        "Dementia: insidious, progressive, clear consciousness; memory impairment early; usually irreversible.",
        "Delirium management: find and treat the cause, reorientation, avoid sedatives; low-dose haloperidol for severe agitation.",
        "Alzheimer's: commonest dementia; amyloid plaques, neurofibrillary tangles, cortical atrophy (hippocampus); treat with donepezil/rivastigmine/galantamine (mild–moderate) and memantine (moderate–severe).",
        "Reversible dementias: hypothyroidism, B12 deficiency, normal-pressure hydrocephalus (wet, wobbly, wacky), neurosyphilis, depression (pseudodementia).",
        "Lewy body dementia: fluctuations, visual hallucinations, parkinsonism, severe antipsychotic sensitivity.",
      ],
      table: {
        title: "Delirium vs dementia",
        columns: ["Feature", "Delirium", "Dementia"],
        rows: [
          ["Onset", "Acute (hours–days)", "Insidious (months–years)"],
          ["Course", "Fluctuating", "Progressive"],
          ["Consciousness", "Altered", "Clear"],
          ["Attention", "Impaired (core)", "Normal early"],
          ["Hallucinations", "Common (visual)", "Less common"],
          ["Reversibility", "Usually reversible", "Usually irreversible"],
        ],
      },
      pitfalls: [
        "Delirium is often superimposed on dementia — a sudden worsening in a demented patient needs a search for infection or drugs.",
        "Avoid antipsychotics in Lewy body dementia — severe sensitivity reactions.",
      ],
      vignette: {
        stem: "An 80-year-old becomes acutely confused overnight, inattentive and picking at the bedsheets, with lucid periods in the morning. Urine dipstick is positive for nitrites.",
        answer: "Delirium secondary to urinary tract infection.",
        reasoning: "Acute onset, fluctuation and inattention define delirium; treat the UTI.",
      },
      highYield:
        "Delirium: acute, fluctuating, inattention, altered consciousness, reversible. Dementia: insidious, clear consciousness. Alzheimer's: plaques + tangles → donepezil, memantine.",
      checks: [
        {
          q: "The cardinal feature of delirium:",
          options: ["Memory loss", "Inattention", "Hallucinations", "Aphasia"],
          answer: 1,
          why: "Disturbed attention is the core diagnostic feature.",
        },
        {
          q: "NMDA receptor antagonist used in moderate-to-severe Alzheimer's disease:",
          options: ["Donepezil", "Memantine", "Rivastigmine", "Galantamine"],
          answer: 1,
          why: "Memantine blocks NMDA receptors; the others are cholinesterase inhibitors.",
        },
      ],
    },
    {
      id: "defence-mechanisms",
      title: "Defence mechanisms and personality disorders",
      minutes: 7,
      summary:
        "Defence mechanisms are unconscious strategies that reduce anxiety; personality disorders are enduring maladaptive patterns grouped into three clusters.",
      examFocus:
        "Identify the defence mechanism in a one-line scenario, mature vs immature defences, and the clusters of personality disorder.",
      mechanism:
        "In psychodynamic theory the ego protects itself from anxiety arising from unacceptable impulses or painful reality by distorting perception or feeling, usually without awareness. Immature defences (projection, splitting, acting out) distort reality a lot and damage relationships; mature defences (sublimation, humour, altruism, suppression) channel the same energy into adaptive behaviour. Personality disorders are partly defined by the defences people rely on — splitting is characteristic of borderline personality disorder.",
      points: [
        "Mature: sublimation (channelling impulses into acceptable activity), altruism, humour, suppression (conscious), anticipation.",
        "Neurotic: repression (unconscious forgetting), displacement (redirecting feelings to a safer target), reaction formation (doing the opposite), intellectualisation, rationalisation, isolation of affect.",
        "Immature: projection (attributing own feelings to others), splitting (all good or all bad), acting out, regression, denial, passive aggression.",
        "Cluster A (odd): paranoid, schizoid, schizotypal.",
        "Cluster B (dramatic): antisocial, borderline, histrionic, narcissistic.",
        "Cluster C (anxious): avoidant, dependent, obsessive-compulsive. Borderline PD: unstable relationships, self-harm, splitting → dialectical behaviour therapy (DBT).",
      ],
      table: {
        title: "Spot the defence",
        columns: ["Scenario", "Defence"],
        rows: [
          ["Angry at boss, shouts at spouse", "Displacement"],
          ["Aggressive person becomes a surgeon", "Sublimation"],
          ["Dislikes a colleague, but is excessively nice to him", "Reaction formation"],
          ["Unfaithful spouse accuses partner of cheating", "Projection"],
          ["Student who failed says the exam was unfair", "Rationalisation"],
          ["Deliberately decides not to think about a worry till later", "Suppression"],
        ],
      },
      pitfalls: [
        "Repression is unconscious; suppression is conscious — the commonest pair to confuse.",
        "Antisocial personality disorder requires age ≥ 18 with evidence of conduct disorder before 15.",
      ],
      mnemonic: "Personality clusters: A = Weird, B = Wild, C = Worried.",
      vignette: {
        stem: "After being reprimanded by his consultant, a resident goes home and yells at his younger brother for a minor mistake.",
        answer: "Displacement.",
        reasoning: "Feelings toward a threatening figure are redirected onto a safer target.",
      },
      highYield:
        "Mature: sublimation, altruism, humour, suppression. Repression = unconscious, suppression = conscious. Splitting → borderline. Clusters A weird, B wild, C worried.",
      checks: [
        {
          q: "Channelling aggressive impulses into contact sports is an example of:",
          options: ["Displacement", "Sublimation", "Reaction formation", "Projection"],
          answer: 1,
          why: "Sublimation redirects unacceptable impulses into socially valued activity.",
        },
        {
          q: "Splitting is characteristic of which personality disorder?",
          options: ["Schizoid", "Borderline", "Avoidant", "Obsessive-compulsive"],
          answer: 1,
          why: "Borderline patients see people as all good or all bad.",
        },
      ],
    },
  ],
};
