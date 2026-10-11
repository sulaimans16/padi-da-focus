import type { LearnModule } from "../learn";

export const microbiology: LearnModule = {
  slug: "microbiology",
  group: "Para-clinical",
  subject: "Microbiology",
  icon: "coronavirus",
  blurb:
    "Stains, sterilisation, immunoglobulins, hepatitis B serology, HIV, malaria, toxins and culture media — the facts microbiology papers recycle every year.",
  objectives: [
    "Explain how Gram and acid-fast stains separate bacteria by cell-wall structure.",
    "Match each sterilisation method to its conditions and biological indicator.",
    "Read a hepatitis B serology panel, including the window period.",
    "Tell P. falciparum from P. vivax and choose the Indian treatment regimen.",
    "Link each bacterial toxin to its molecular mechanism and each organism to its medium.",
  ],
  concepts: [
    {
      id: "staining",
      title: "Gram stain and acid-fast staining",
      minutes: 7,
      summary:
        "Stains exploit differences in the bacterial cell wall: Gram staining separates thick-peptidoglycan from outer-membrane bacteria, and Ziehl–Neelsen detects the waxy mycolic acid wall of mycobacteria.",
      examFocus:
        "Order of Gram stain reagents, the step that differentiates, and acid concentrations used in modified ZN stains.",
      mechanism:
        "Crystal violet enters every cell and iodine fixes it as a large dye–iodine complex. The decolouriser is the deciding step: in Gram-positive bacteria it dehydrates the thick peptidoglycan mesh, shrinking the pores and trapping the complex, so they stay purple. In Gram-negative bacteria it dissolves the lipid-rich outer membrane, and the thin peptidoglycan cannot hold the complex, so the cells lose colour and take up the pink counterstain. Mycobacteria have mycolic acids that resist stain entry but, once stained with hot carbol fuchsin, also resist decolourisation by acid — they are 'acid-fast'.",
      points: [
        "Gram stain order: crystal violet (primary) → Gram's iodine (mordant) → acetone/alcohol (decolouriser) → safranin (counterstain).",
        "Decolourisation is the critical (differential) step.",
        "Ziehl–Neelsen: hot carbol fuchsin → 20% sulphuric acid (M. tuberculosis) → methylene blue; acid-fast bacilli appear red on blue.",
        "Weaker acid for less acid-fast organisms: 5% H₂SO₄ for M. leprae, 1% for Nocardia (modified ZN / Kinyoun).",
        "Albert's stain shows metachromatic (volutin) granules of Corynebacterium diphtheriae.",
        "India ink (negative staining) shows the capsule of Cryptococcus neoformans.",
      ],
      flow: {
        title: "Gram stain, step by step",
        steps: [
          { label: "Crystal violet", detail: "Everything stains purple" },
          { label: "Gram's iodine", detail: "Mordant forms the crystal violet–iodine complex" },
          { label: "Acetone / alcohol", detail: "Differential step — Gram-negatives lose the dye" },
          { label: "Safranin", detail: "Gram-negatives counterstained pink" },
        ],
      },
      pitfalls: [
        "Over-decolourising makes Gram-positives look Gram-negative; old cultures can also stain variably.",
        "Mycobacteria are technically Gram-positive but stain poorly — use ZN or auramine.",
      ],
      vignette: {
        stem: "A skin smear from a patient with thickened ulnar nerves shows red bacilli in clumps after ZN staining with 5% sulphuric acid.",
        answer: "Mycobacterium leprae (globi).",
        reasoning:
          "M. leprae is less acid-fast than M. tuberculosis, so 5% acid is used; bacilli in clumps form globi.",
      },
      highYield:
        "Gram: CV → iodine (mordant) → decolouriser (critical step) → safranin. ZN acid: 20% M. tb, 5% M. leprae, 1% Nocardia. Albert's = diphtheria granules.",
      checks: [
        {
          q: "The mordant in Gram staining is:",
          options: ["Crystal violet", "Iodine", "Acetone", "Safranin"],
          answer: 1,
          why: "Gram's iodine fixes crystal violet inside the cell as a complex.",
        },
        {
          q: "Concentration of sulphuric acid used to decolourise M. leprae in ZN staining:",
          options: ["1%", "5%", "20%", "25%"],
          answer: 1,
          why: "M. leprae is less acid-fast, so 5% is used instead of 20%.",
        },
      ],
    },
    {
      id: "sterilisation",
      title: "Sterilisation and disinfection",
      minutes: 7,
      summary:
        "Sterilisation kills all life including spores; each method has standard conditions and a biological indicator spore used to prove it worked.",
      examFocus:
        "Autoclave and hot air oven conditions, biological indicators, and which method suits which material.",
      mechanism:
        "Bacterial spores are the hardest living forms to kill, so a sterilisation cycle that kills a known high count of resistant spores is assumed to have killed everything else. Moist heat (autoclave) is more efficient than dry heat because steam condensing on objects releases latent heat and coagulates proteins at lower temperatures; dry heat kills by oxidation and needs higher temperatures for longer. Prions resist all routine methods and need extended high-temperature autoclaving with sodium hydroxide.",
      points: [
        "Autoclave: 121°C at 15 lb/in² for 15 minutes (or 134°C for 3 minutes) — surgical instruments, linen, culture media.",
        "Hot air oven: 160°C for 2 hours — glassware, powders, oils, sharp instruments.",
        "Biological indicators: autoclave → Geobacillus stearothermophilus; hot air oven and ethylene oxide → Bacillus atrophaeus; ionising radiation → Bacillus pumilus; plasma → G. stearothermophilus.",
        "Ethylene oxide: heat-sensitive items (plastics, catheters, heart–lung machines).",
        "Glutaraldehyde 2%: high-level disinfection of endoscopes (sporicidal with prolonged exposure).",
        "Gamma radiation (cold sterilisation): disposable syringes, catheters, sutures.",
      ],
      table: {
        title: "Methods and indicators",
        columns: ["Method", "Conditions", "Biological indicator"],
        rows: [
          ["Autoclave", "121°C, 15 psi, 15 min", "Geobacillus stearothermophilus"],
          ["Hot air oven", "160°C, 2 h", "Bacillus atrophaeus"],
          ["Ethylene oxide", "Gas, 50–60°C", "Bacillus atrophaeus"],
          ["Ionising radiation", "Gamma rays", "Bacillus pumilus"],
          ["Plasma (H₂O₂)", "Low-temperature plasma", "Geobacillus stearothermophilus"],
        ],
      },
      pitfalls: [
        "Pasteurisation is not sterilisation — it kills vegetative pathogens but not spores.",
        "Prions need autoclaving at 134°C for 18 minutes (or NaOH treatment); routine autoclaving is not enough.",
      ],
      mnemonic:
        "Steam = Stearothermophilus; dry heat & gas = Atrophaeus; Pumilus = Photons (radiation).",
      vignette: {
        stem: "A hospital needs to sterilise a batch of glass Petri dishes and a jar of liquid paraffin.",
        answer: "Hot air oven at 160°C for 2 hours.",
        reasoning:
          "Glassware, oils and powders are sterilised by dry heat; steam cannot penetrate oils.",
      },
      highYield:
        "Autoclave 121°C/15 psi/15 min → G. stearothermophilus. Hot air oven 160°C/2 h → B. atrophaeus. Radiation → B. pumilus. Endoscopes → 2% glutaraldehyde.",
      checks: [
        {
          q: "Biological indicator for an autoclave:",
          options: [
            "Bacillus atrophaeus",
            "Geobacillus stearothermophilus",
            "Bacillus pumilus",
            "Clostridium tetani",
          ],
          answer: 1,
          why: "Spores of G. stearothermophilus are used to validate moist heat.",
        },
        {
          q: "Best method to sterilise oils and powders:",
          options: ["Autoclave", "Hot air oven", "Pasteurisation", "Boiling"],
          answer: 1,
          why: "Steam can't penetrate anhydrous materials, so dry heat is used.",
        },
      ],
    },
    {
      id: "immunoglobulins",
      title: "Immunoglobulins",
      minutes: 6,
      summary:
        "Five antibody classes share a basic Y structure but differ in heavy chain, form and job.",
      examFocus:
        "Which immunoglobulin crosses the placenta, appears first, protects mucosae, mediates allergy, or fixes complement best.",
      mechanism:
        "Each class has a different heavy chain constant region, and that region decides where the antibody goes and what it can do. IgG's Fc binds the neonatal Fc receptor on the placenta, so it is actively transported to the fetus. IgM is a pentamer with ten binding sites, giving high avidity and making it the best activator of the classical complement pathway, which suits it to the early, low-affinity primary response. IgA dimers pick up a secretory component as they are transported across epithelia, protecting them from enzymes in secretions.",
      points: [
        "IgG: most abundant in serum, only one to cross the placenta, longest half-life (~23 days), main secondary response antibody.",
        "IgM: pentamer, largest, first antibody in a primary response and first made by the fetus; best complement activator.",
        "IgA: dimer with J chain and secretory component in secretions — tears, saliva, breast milk (colostrum), gut.",
        "IgE: lowest serum concentration; binds mast cells and basophils — type I hypersensitivity and helminth defence.",
        "IgD: mainly on the surface of naive B cells as an antigen receptor.",
        "IgM in a newborn's serum indicates intrauterine infection (it can't have come from the mother).",
      ],
      table: {
        title: "Immunoglobulin classes",
        columns: ["Class", "Form", "Key role"],
        rows: [
          ["IgG", "Monomer", "Crosses placenta, secondary response, opsonisation"],
          ["IgM", "Pentamer", "Primary response, complement activation"],
          ["IgA", "Dimer (secretory)", "Mucosal immunity, breast milk"],
          ["IgE", "Monomer", "Allergy (type I), parasites"],
          ["IgD", "Monomer", "B-cell surface receptor"],
        ],
      },
      pitfalls: [
        "IgM is the best complement activator, but IgG is the most abundant — don't swap them.",
        "Raised cord-blood IgM points to congenital infection; raised IgG may just be maternal.",
      ],
      mnemonic:
        "IgG = Goes across placenta; IgM = Made first; IgA = At mucosa; IgE = Eosinophils & allergy.",
      vignette: {
        stem: "A newborn's cord blood shows raised levels of specific IgM antibodies against rubella.",
        answer: "Congenital rubella infection.",
        reasoning:
          "IgM does not cross the placenta, so it must have been produced by the fetus in response to infection.",
      },
      highYield:
        "IgG crosses the placenta; IgM is first and best for complement; IgA in secretions/colostrum; IgE in allergy and worms; IgD on naive B cells.",
      checks: [
        {
          q: "The only immunoglobulin that crosses the placenta:",
          options: ["IgA", "IgM", "IgG", "IgE"],
          answer: 2,
          why: "IgG is transported via the neonatal Fc receptor.",
        },
        {
          q: "Immunoglobulin present in highest amount in colostrum:",
          options: ["IgG", "IgA", "IgM", "IgD"],
          answer: 1,
          why: "Secretory IgA protects the infant's gut mucosa.",
        },
      ],
    },
    {
      id: "hbv-serology",
      title: "Hepatitis B serology",
      minutes: 7,
      summary:
        "Hepatitis B markers appear in a predictable sequence; reading which are positive tells you whether infection is acute, chronic, resolved or vaccine-induced immunity.",
      examFocus:
        "The first marker, the window period, and interpreting a full panel (HBsAg, anti-HBc IgM/IgG, HBeAg, anti-HBs).",
      mechanism:
        "HBsAg is the surface coat, made in excess, so it appears first — even before symptoms. The core antigen stays inside infected liver cells, so it isn't measured, but the immune response to it (anti-HBc) appears early and lasts for life; its IgM form marks recent infection. HBeAg is secreted when the virus is actively replicating, so it signals high infectivity. Anti-HBs is the protective, neutralising antibody — it appears after recovery or vaccination. Between the disappearance of HBsAg and the appearance of anti-HBs there is a gap (window period) when only anti-HBc IgM is positive.",
      points: [
        "First marker to appear: HBsAg (1–10 weeks after exposure).",
        "Acute infection: HBsAg + anti-HBc IgM.",
        "Window period: HBsAg negative, anti-HBs negative, anti-HBc IgM positive — the only marker of infection then.",
        "Chronic infection: HBsAg persisting > 6 months with anti-HBc IgG.",
        "HBeAg = active replication and high infectivity; anti-HBe = lower infectivity.",
        "Vaccinated: anti-HBs only (vaccine contains HBsAg, so no anti-HBc). Past infection with recovery: anti-HBs + anti-HBc IgG.",
      ],
      table: {
        title: "Reading a hepatitis B panel",
        columns: ["HBsAg", "Anti-HBc", "Anti-HBs", "Interpretation"],
        rows: [
          ["+", "IgM +", "−", "Acute infection"],
          ["−", "IgM +", "−", "Window period"],
          ["+", "IgG +", "−", "Chronic infection"],
          ["−", "IgG +", "+", "Recovered, immune"],
          ["−", "−", "+", "Immunised by vaccine"],
        ],
      },
      pitfalls: [
        "A vaccinated person never has anti-HBc — its presence means natural infection.",
        "During the window period HBsAg is negative; testing for HBsAg alone misses the infection.",
      ],
      vignette: {
        stem: "A healthcare worker's screening shows HBsAg negative, anti-HBs positive and anti-HBc negative.",
        answer: "Immune from hepatitis B vaccination.",
        reasoning:
          "Only anti-HBs is present; the absence of anti-HBc rules out past natural infection.",
      },
      highYield:
        "First marker: HBsAg. Window period: only anti-HBc IgM. Chronic: HBsAg > 6 months. Vaccinated: anti-HBs alone. HBeAg = high infectivity.",
      checks: [
        {
          q: "During the window period of hepatitis B, the marker present is:",
          options: ["HBsAg", "Anti-HBs", "Anti-HBc IgM", "HBeAg"],
          answer: 2,
          why: "Between HBsAg clearance and anti-HBs appearance, only IgM anti-HBc is detectable.",
        },
        {
          q: "Marker indicating high infectivity:",
          options: ["Anti-HBs", "HBeAg", "Anti-HBe", "Anti-HBc IgG"],
          answer: 1,
          why: "HBeAg reflects active viral replication.",
        },
      ],
    },
    {
      id: "hiv",
      title: "HIV: structure, diagnosis and monitoring",
      minutes: 8,
      summary:
        "HIV is a retrovirus that infects CD4 cells; it is diagnosed with antibody/antigen tests in adults and nucleic acid tests in infants, and staged by CD4 count.",
      examFocus:
        "gp120/CD4 and co-receptors, the NACO testing strategy, why infants need PCR, and the window period.",
      mechanism:
        "The envelope glycoprotein gp120 binds CD4 and a chemokine co-receptor (CCR5 early, CXCR4 later), and gp41 then fuses the envelope with the cell membrane. Reverse transcriptase copies the RNA genome into DNA, which integrase inserts into the host genome — making infection lifelong. Progressive loss of CD4 T-helper cells cripples cell-mediated immunity, so opportunistic infections appear in a predictable order as the CD4 count falls.",
      points: [
        "Family Retroviridae, genus Lentivirus; enzymes: reverse transcriptase, integrase, protease.",
        "Entry: gp120 binds CD4 + CCR5/CXCR4; people homozygous for the CCR5-Δ32 deletion resist R5 strains.",
        "NACO diagnosis in adults: three different rapid tests/ELISAs using different antigens or principles (all three reactive = positive).",
        "Infants < 18 months: maternal IgG crosses the placenta, so antibody tests are unreliable — use HIV DNA PCR (early infant diagnosis from 6 weeks).",
        "Window period: antibodies take ~3–12 weeks; p24 antigen and nucleic acid tests detect infection earlier.",
        "AIDS: CD4 < 200 cells/µL or an AIDS-defining illness; viral load monitors treatment response.",
      ],
      pitfalls: [
        "A positive antibody test in a 9-month-old may be maternal antibody — confirm with DNA PCR.",
        "Antibody tests can be negative in the window period despite high viral load and infectivity.",
      ],
      vignette: {
        stem: "An 8-month-old born to an HIV-positive mother is reactive on an HIV antibody test.",
        answer: "Not diagnostic — confirm with HIV DNA PCR.",
        reasoning:
          "Maternal IgG antibodies persist up to 18 months; only a nucleic acid test can confirm infection in the infant.",
      },
      highYield:
        "gp120 + CD4 + CCR5/CXCR4 for entry. Adults: 3 tests with different antigens (NACO). Infants < 18 m: DNA PCR. AIDS = CD4 < 200.",
      checks: [
        {
          q: "Test of choice for HIV diagnosis in a 6-month-old infant:",
          options: ["ELISA", "Rapid antibody test", "HIV DNA PCR", "Western blot"],
          answer: 2,
          why: "Antibody tests detect transplacental maternal IgG; DNA PCR detects the virus itself.",
        },
        {
          q: "HIV glycoprotein that binds CD4:",
          options: ["gp41", "gp120", "p24", "p17"],
          answer: 1,
          why: "gp120 binds CD4; gp41 mediates fusion.",
        },
      ],
    },
    {
      id: "malaria",
      title: "Malaria: species, diagnosis and treatment",
      minutes: 8,
      summary:
        "P. falciparum causes severe and cerebral malaria; P. vivax and P. ovale relapse from liver hypnozoites. Species decides treatment.",
      examFocus:
        "Smear features of each species, why primaquine is added, and India's national drug policy (ACT for falciparum, chloroquine for vivax).",
      mechanism:
        "Sporozoites from the mosquito infect hepatocytes; in P. vivax and P. ovale some become dormant hypnozoites that reactivate weeks to months later — that is why these species relapse and why primaquine, which kills liver stages, is needed for a radical cure. P. falciparum invades red cells of any age, producing very high parasitaemia; infected cells express knobs (PfEMP1) that stick to capillary endothelium (cytoadherence), blocking microcirculation in the brain, kidneys and placenta — the basis of cerebral malaria and multi-organ failure.",
      points: [
        "P. falciparum: banana-shaped gametocytes, multiple and accolé ring forms, Maurer's dots; no hypnozoites; severe/cerebral malaria.",
        "P. vivax: enlarged red cells with Schüffner's dots; prefers reticulocytes; needs the Duffy antigen; hypnozoites → relapses.",
        "P. malariae: quartan (72-hour) fever, band forms, associated nephrotic syndrome. P. knowlesi: zoonotic, 24-hour cycle.",
        "Diagnosis: thick smear detects parasites (sensitive); thin smear identifies species; rapid tests detect HRP-2 (falciparum) or pLDH.",
        "India — vivax: chloroquine for 3 days + primaquine 0.25 mg/kg daily for 14 days (after G6PD testing).",
        "India — falciparum: ACT (artesunate + sulfadoxine-pyrimethamine; artemether-lumefantrine in north-eastern states) + single-dose primaquine 0.75 mg/kg as a gametocytocide. Severe malaria: IV artesunate.",
      ],
      table: {
        title: "Species comparison",
        columns: ["Feature", "P. falciparum", "P. vivax"],
        rows: [
          ["Red cells infected", "All ages", "Young (reticulocytes)"],
          ["Infected RBC size", "Normal", "Enlarged"],
          ["Dots", "Maurer's", "Schüffner's"],
          ["Gametocyte", "Crescent/banana", "Round"],
          ["Hypnozoites / relapse", "No", "Yes"],
          ["Severe disease", "Common", "Less common"],
        ],
      },
      pitfalls: [
        "Primaquine causes haemolysis in G6PD deficiency — test before the 14-day course.",
        "Falciparum doesn't relapse (no hypnozoites); recurrence is recrudescence from inadequately cleared blood stages.",
      ],
      vignette: {
        stem: "A peripheral smear shows enlarged red cells with fine stippling (Schüffner's dots) and amoeboid trophozoites.",
        answer:
          "P. vivax malaria — chloroquine for 3 days plus primaquine for 14 days after G6PD testing.",
        reasoning:
          "Enlarged RBCs with Schüffner's dots identify vivax; primaquine eradicates hypnozoites to prevent relapse.",
      },
      highYield:
        "Falciparum: banana gametocytes, Maurer's dots, cerebral malaria, ACT. Vivax/ovale: Schüffner's dots, hypnozoites → primaquine 14 days (G6PD first).",
      checks: [
        {
          q: "Hypnozoites are formed by:",
          options: [
            "P. falciparum and P. malariae",
            "P. vivax and P. ovale",
            "P. falciparum only",
            "P. knowlesi",
          ],
          answer: 1,
          why: "Only vivax and ovale have dormant liver stages that cause relapses.",
        },
        {
          q: "Drug used for radical cure of vivax malaria:",
          options: ["Chloroquine", "Artesunate", "Primaquine", "Quinine"],
          answer: 2,
          why: "Primaquine kills liver hypnozoites.",
        },
      ],
    },
    {
      id: "toxins",
      title: "Bacterial exotoxins and their mechanisms",
      minutes: 7,
      summary:
        "Many bacterial diseases are really toxin diseases; the exam pairs each toxin with its molecular target.",
      examFocus:
        "Diphtheria and Pseudomonas exotoxin A (EF-2), cholera and pertussis (cAMP via Gs vs Gi), tetanus vs botulinum, Shiga toxin.",
      mechanism:
        "Most protein exotoxins are A–B toxins: the B subunit binds a receptor and the A subunit is the enzyme that acts inside the cell. Several A subunits are ADP-ribosyltransferases that attach ADP-ribose to a host protein. On elongation factor-2 this halts protein synthesis and kills the cell (diphtheria). On the Gs protein it locks adenylate cyclase 'on', so cAMP accumulates and the gut secretes chloride and water (cholera). On Gi it removes the brake on adenylate cyclase (pertussis). Clostridial neurotoxins are proteases that cleave the SNARE proteins needed to release neurotransmitter.",
      points: [
        "Diphtheria toxin and Pseudomonas exotoxin A: ADP-ribosylate EF-2 → stop protein synthesis.",
        "Cholera toxin (and ETEC heat-labile toxin): ADP-ribosylate Gs → ↑ cAMP → rice-water diarrhoea.",
        "Pertussis toxin: ADP-ribosylates Gi (inhibiting the inhibitor) → ↑ cAMP; lymphocytosis.",
        "ETEC heat-stable toxin: activates guanylate cyclase → ↑ cGMP.",
        "Tetanus toxin: cleaves synaptobrevin in inhibitory interneurons, blocking glycine/GABA release → spastic paralysis, trismus.",
        "Botulinum toxin: cleaves SNARE proteins at the neuromuscular junction, blocking acetylcholine release → descending flaccid paralysis.",
        "Shiga toxin: inactivates the 60S ribosomal subunit (cleaves 28S rRNA) → HUS.",
      ],
      table: {
        title: "Toxin → target",
        columns: ["Toxin", "Target", "Result"],
        rows: [
          ["Diphtheria / Pseudomonas exotoxin A", "EF-2", "Protein synthesis stops"],
          ["Cholera / ETEC-LT", "Gs (↑ cAMP)", "Secretory diarrhoea"],
          ["Pertussis", "Gi (↑ cAMP)", "Whooping cough, lymphocytosis"],
          ["ETEC-ST", "Guanylate cyclase (↑ cGMP)", "Secretory diarrhoea"],
          ["Tetanus", "Inhibitory interneurons", "Spastic paralysis"],
          ["Botulinum", "Neuromuscular junction (ACh)", "Flaccid paralysis"],
          ["Shiga", "60S ribosome", "Dysentery, HUS"],
        ],
      },
      pitfalls: [
        "Both cholera and pertussis raise cAMP — cholera activates Gs, pertussis inactivates Gi.",
        "Tetanus and botulinum toxins are both zinc proteases cleaving SNAREs; the difference is where they act (spastic vs flaccid).",
      ],
      mnemonic:
        "Diphtheria & Pseudomonas → EF-2 ('Don't Progress'); Cholera → Gs ('C' turns cAMP on).",
      vignette: {
        stem: "After eating home-canned food, a patient develops diplopia, dysphagia and a descending symmetrical flaccid paralysis with clear consciousness.",
        answer: "Botulism — toxin blocks acetylcholine release at the neuromuscular junction.",
        reasoning:
          "Cranial nerve signs first, descending flaccid paralysis and preserved sensation are classic.",
      },
      highYield:
        "EF-2: diphtheria & Pseudomonas. ↑cAMP: cholera (Gs) & pertussis (Gi). Tetanus = spastic (inhibitory neurons); botulinum = flaccid (NMJ).",
      checks: [
        {
          q: "Diphtheria toxin acts by ADP-ribosylation of:",
          options: ["Gs protein", "Elongation factor-2", "60S ribosome", "Gi protein"],
          answer: 1,
          why: "Inactivating EF-2 halts protein synthesis.",
        },
        {
          q: "Spastic paralysis with trismus is caused by:",
          options: ["Botulinum toxin", "Tetanus toxin", "Diphtheria toxin", "Shiga toxin"],
          answer: 1,
          why: "Tetanus toxin blocks inhibitory neurotransmitter release in the spinal cord.",
        },
      ],
    },
    {
      id: "culture-media",
      title: "Culture media: which organism grows where",
      minutes: 6,
      summary:
        "Special media favour particular organisms — enriched, selective or differential — and media–organism pairs are a staple one-liner.",
      examFocus: "Straight matching: organism ↔ medium.",
      mechanism:
        "Media are designed around an organism's needs and tolerances. Enriched media add nutrients for fastidious organisms (chocolate agar supplies X and V factors for Haemophilus). Selective media contain substances that suppress competitors — bile salts, high pH, tellurite or antibiotics — so the target grows from a mixed sample. Differential media add an indicator so colonies of interest look different, such as pink lactose fermenters on MacConkey or yellow sucrose fermenters (V. cholerae) on TCBS.",
      points: [
        "Mycobacterium tuberculosis: Lowenstein–Jensen (LJ) medium; liquid culture MGIT is faster.",
        "Corynebacterium diphtheriae: Loeffler's serum slope (rapid growth), potassium tellurite (black colonies).",
        "Vibrio cholerae: TCBS (yellow colonies); alkaline peptone water as enrichment.",
        "Neisseria gonorrhoeae: Thayer–Martin (modified) medium. Haemophilus influenzae: chocolate agar.",
        "Bordetella pertussis: Bordet–Gengou or Regan–Lowe (charcoal blood) medium. Legionella: BCYE agar.",
        "Salmonella typhi: Wilson–Blair (black colonies); blood culture in the first week. Fungi: Sabouraud dextrose agar.",
        "MacConkey agar: lactose fermenters (E. coli, Klebsiella) pink; non-fermenters (Salmonella, Shigella) pale.",
      ],
      table: {
        title: "Organism ↔ medium",
        columns: ["Organism", "Medium"],
        rows: [
          ["M. tuberculosis", "Lowenstein–Jensen"],
          ["C. diphtheriae", "Loeffler's serum slope; potassium tellurite"],
          ["V. cholerae", "TCBS; alkaline peptone water"],
          ["N. gonorrhoeae", "Thayer–Martin"],
          ["B. pertussis", "Bordet–Gengou / Regan–Lowe"],
          ["Legionella", "BCYE"],
          ["H. influenzae", "Chocolate agar"],
          ["Fungi", "Sabouraud dextrose agar"],
        ],
      },
      pitfalls: [
        "Loeffler's serum slope is for speed (6–8 hours); tellurite is the selective medium for diphtheria.",
        "In typhoid, blood culture is positive in the first week; stool and urine cultures later; Widal from the second week.",
      ],
      vignette: {
        stem: "Stool from a patient with profuse rice-water diarrhoea is plated on a green alkaline medium and grows yellow colonies.",
        answer: "Vibrio cholerae on TCBS agar.",
        reasoning:
          "TCBS is selective for vibrios; V. cholerae ferments sucrose, producing yellow colonies.",
      },
      highYield:
        "LJ → TB; Loeffler's/tellurite → diphtheria; TCBS → cholera; Thayer–Martin → gonococcus; Bordet–Gengou → pertussis; BCYE → Legionella; SDA → fungi.",
      checks: [
        {
          q: "Selective medium for Vibrio cholerae:",
          options: ["MacConkey", "TCBS", "Thayer–Martin", "Lowenstein–Jensen"],
          answer: 1,
          why: "Thiosulphate-citrate-bile salt-sucrose agar is selective for vibrios.",
        },
        {
          q: "Legionella is cultured on:",
          options: ["Chocolate agar", "BCYE agar", "Blood agar", "Sabouraud agar"],
          answer: 1,
          why: "Buffered charcoal yeast extract supplies the cysteine and iron Legionella needs.",
        },
      ],
    },
  ],
};
