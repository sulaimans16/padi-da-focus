import type { LearnModule } from "../../learn";

export const organicChemistry: LearnModule = {
  slug: "organic-chemistry",
  group: "Chemistry",
  subject: "Chemistry",
  title: "Organic Chemistry",
  icon: "hexagon",
  blurb:
    "General organic chemistry, isomerism, hydrocarbons, haloalkanes, alcohols/phenols/ethers, carbonyl compounds, carboxylic acids and amines, and biomolecules — mechanisms first, named reactions second.",
  objectives: [
    "Learner can use inductive, resonance and hyperconjugation effects to rank acidity, basicity and intermediate stability.",
    "Learner can count structural and stereoisomers and identify chiral centres, enantiomers and meso forms.",
    "Learner can predict the major product of addition, substitution and elimination reactions, including Markovnikov, peroxide, SN1 and SN2 outcomes.",
    "Learner can match each NCERT named reaction to its reagent and product and use distinguishing tests (Lucas, Tollens', Fehling's, iodoform, Hinsberg, carbylamine).",
    "Learner can describe the structures of glucose, sucrose, starch, proteins and nucleic acids and recall vitamin deficiency diseases.",
  ],
  concepts: [
    {
      id: "goc-electronic-effects",
      title: "GOC: electronic effects and reactive intermediates",
      minutes: 9,
      summary:
        "Inductive, resonance (mesomeric), electromeric and hyperconjugation effects move electron density; they decide the stability of carbocations, carbanions and free radicals and the strength of acids and bases.",
      examFocus:
        "Ranking carbocation stability, acid strength of substituted acids and phenols, counting hyperconjugative structures, identifying electrophiles and nucleophiles, and +R/−R groups.",
      mechanism:
        "A carbocation is an sp² carbon with an empty p-orbital and only six electrons, so anything that pushes electron density into it spreads the positive charge and stabilises it. Alkyl groups do this in two ways: by the +I effect through σ-bonds, and more powerfully by hyperconjugation, in which an adjacent C–H σ-bond overlaps with the empty p-orbital. A tertiary carbocation has the most α-hydrogens around it (nine in (CH₃)₃C⁺), so stability runs 3° > 2° > 1° > CH₃⁺; allyl and benzyl cations gain extra stability because the charge is delocalised by resonance. Acidity follows the stability of the conjugate base: electron-withdrawing (−I, −R) groups pull density away from the negative charge of a carboxylate or phenoxide and make the acid stronger, with the inductive effect fading rapidly with distance. Carbanions, being electron-rich, follow exactly the opposite order to carbocations.",
      points: [
        "−I order (common groups): −NO₂ > −CN > −COOH > −F > −Cl > −Br > −I; alkyl groups are +I.",
        "+R groups donate a lone pair to the π-system: −OH, −OR, −NH₂, −NHCOCH₃, halogens; −R groups withdraw: −NO₂, −CN, −CHO, −COR, −COOH.",
        "Carbocation stability: benzyl/allyl (resonance) and 3° > 2° > 1° > CH₃⁺; free radicals follow the same order; carbanions the reverse.",
        "Number of hyperconjugative structures = number of α-H atoms (C–H bonds on the carbon next to the cationic or sp² carbon).",
        "Carbocation and free radical carbons are sp² (planar); a simple carbanion is sp³ (pyramidal).",
        "Electrophiles are electron-seeking (H⁺, NO₂⁺, R⁺, BF₃, AlCl₃); nucleophiles are electron-rich (OH⁻, CN⁻, RO⁻, NH₃, H₂O).",
        "Acid strength: Cl₃CCOOH > Cl₂CHCOOH > ClCH₂COOH > CH₃COOH; FCH₂COOH > ClCH₂COOH > BrCH₂COOH.",
        "Electromeric effect is temporary and operates only when an attacking reagent is present at a multiple bond.",
      ],
      formulae: [
        { label: "Hyperconjugative structures", expr: "count = number of α-hydrogens" },
        {
          label: "Acid strength link",
          expr: "stronger acid ⇔ more stable conjugate base ⇔ lower pKa",
        },
        { label: "Carbocation order", expr: "3° > 2° > 1° > CH₃⁺" },
      ],
      table: {
        title: "Reactive intermediates",
        columns: ["Intermediate", "Hybridisation", "Electrons on C", "Stability order"],
        rows: [
          ["Carbocation (R₃C⁺)", "sp², planar", "6 (empty p)", "3° > 2° > 1° > CH₃⁺"],
          ["Free radical (R₃C•)", "sp², planar", "7", "3° > 2° > 1° > CH₃•"],
          ["Carbanion (R₃C⁻)", "sp³, pyramidal", "8", "CH₃⁻ > 1° > 2° > 3°"],
        ],
      },
      pitfalls: [
        "Applying the inductive order to carbanions in the same direction as carbocations — alkyl groups destabilise carbanions.",
        "Ignoring distance: the −I effect of Cl at the α-carbon is much stronger than at the γ-carbon.",
      ],
      vignette: {
        stem: "How many hyperconjugative structures can be drawn for the isopropyl cation, (CH₃)₂CH⁺, and for the tert-butyl cation?",
        answer: "6 for (CH₃)₂CH⁺; 9 for (CH₃)₃C⁺.",
        reasoning:
          "Each C–H bond on a carbon adjacent to the cationic carbon can donate. Isopropyl has two CH₃ groups = 6 α-H; tert-butyl has three CH₃ groups = 9 α-H. More hyperconjugative structures means greater stability, so tert-butyl is more stable.",
      },
      highYield:
        "Carbocation: 3° > 2° > 1° (hyperconjugation + I); EWG strengthens acids; hyperconjugative structures = α-H count.",
      checks: [
        {
          q: "Which is the strongest acid?",
          options: ["CH₃COOH", "ClCH₂COOH", "Cl₂CHCOOH", "Cl₃CCOOH"],
          answer: 3,
          why: "Three −I chlorine atoms stabilise the carboxylate most.",
        },
        {
          q: "Which of these is an electrophile?",
          options: ["NH₃", "BF₃", "CN⁻", "H₂O"],
          answer: 1,
          why: "BF₃ has an incomplete octet on boron and accepts an electron pair.",
        },
      ],
    },
    {
      id: "isomerism",
      title: "Isomerism: structural, geometrical and optical",
      minutes: 8,
      summary:
        "Isomers share a molecular formula but differ in connectivity (structural) or in spatial arrangement (stereoisomers: geometrical and optical).",
      examFocus:
        "Counting structural isomers (C₄H₁₀O, C₅H₁₂, C₄H₈), recognising chiral centres, number of stereoisomers including meso forms, cis/trans physical properties, and metamerism/tautomerism examples.",
      mechanism:
        "Rotation about a C=C double bond would require breaking the π-bond, so groups on either side are locked, giving cis and trans isomers whenever each alkene carbon carries two different groups. Optical isomerism arises when a molecule is not superimposable on its mirror image, most often because a carbon carries four different groups (a chiral centre); the two mirror-image forms (enantiomers) have identical physical properties but rotate plane-polarised light equally in opposite directions. With n dissimilar chiral centres there can be up to 2ⁿ stereoisomers, but if the molecule has an internal plane of symmetry, one form is identical to its mirror image — a meso compound, optically inactive by internal compensation. A racemic mixture is also inactive, but by external compensation: equal amounts of the two enantiomers cancel each other. Cis isomers usually have a net dipole and higher boiling points, while trans isomers pack better in a crystal and usually have higher melting points.",
      points: [
        "Structural isomerism: chain, position, functional group, metamerism (e.g. diethyl ether vs methyl propyl ether) and tautomerism (keto–enol).",
        "C₄H₁₀O has 7 structural isomers: 4 alcohols (butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol) and 3 ethers.",
        "C₅H₁₂ has 3 structural isomers (pentane, isopentane, neopentane).",
        "Geometrical isomerism needs restricted rotation and two different groups on each doubly bonded carbon; but-2-ene shows it, but-1-ene and 2-methylpropene do not.",
        "Chiral centre = sp³ carbon with four different groups; butan-2-ol and 2-chlorobutane are chiral, glycine is not.",
        "Maximum stereoisomers = 2ⁿ for n dissimilar chiral centres; tartaric acid (2 similar centres) has only 3: (+), (−) and meso.",
        "Racemic mixture: 50:50 enantiomers, inactive by external compensation; meso: inactive by internal compensation.",
        "Conformations (staggered/eclipsed) interconvert by rotation and are not isolable isomers; staggered ethane is more stable by about 12.5 kJ mol⁻¹.",
      ],
      formulae: [
        {
          label: "Stereoisomer limit",
          expr: "maximum = 2ⁿ",
          note: "n = dissimilar chiral centres",
        },
        { label: "Specific rotation", expr: "[α] = α / (l × c)", note: "l in dm, c in g mL⁻¹" },
        { label: "Degree of unsaturation", expr: "DU = C − H/2 − X/2 + N/2 + 1" },
      ],
      table: {
        title: "Kinds of isomerism",
        columns: ["Type", "Basis", "Example"],
        rows: [
          ["Chain", "Different carbon skeleton", "Butane / isobutane"],
          ["Position", "Different position of group", "Propan-1-ol / propan-2-ol"],
          ["Functional", "Different functional group", "Ethanol / methoxymethane"],
          [
            "Metamerism",
            "Different alkyl groups on a polyvalent group",
            "Diethyl ether / methyl propyl ether",
          ],
          ["Tautomerism", "Proton shift, interconverting", "Acetone keto / enol"],
          ["Geometrical", "Restricted rotation", "cis- / trans-but-2-ene"],
          ["Optical", "Non-superimposable mirror images", "(+)- / (−)-butan-2-ol"],
        ],
      },
      pitfalls: [
        "Using 2ⁿ blindly for molecules with symmetry — tartaric acid gives 3, not 4.",
        "Calling a racemic mixture a meso compound; one is a mixture, the other a single compound.",
      ],
      vignette: {
        stem: "How many isomers, including stereoisomers, are there for open-chain alkenes of formula C₄H₈?",
        answer: "4: but-1-ene, cis-but-2-ene, trans-but-2-ene and 2-methylpropene.",
        reasoning:
          "Structural alkene isomers are but-1-ene, but-2-ene and 2-methylpropene. Only but-2-ene has two different groups on both sp² carbons (CH₃ and H), so it alone splits into cis and trans: 3 + 1 = 4. (Cyclobutane and methylcyclopropane are not alkenes.)",
      },
      highYield:
        "C₄H₁₀O = 7 structural isomers; tartaric acid = 3 stereoisomers; enantiomers differ only in direction of optical rotation.",
      checks: [
        {
          q: "Which compound is optically active?",
          options: ["Propan-2-ol", "Butan-2-ol", "Glycine", "2-Methylpropan-2-ol"],
          answer: 1,
          why: "C-2 of butan-2-ol carries H, OH, CH₃ and C₂H₅ — four different groups.",
        },
        {
          q: "Diethyl ether and methyl propyl ether are:",
          options: ["Chain isomers", "Functional isomers", "Metamers", "Position isomers"],
          answer: 2,
          why: "Same functional group (ether) with different alkyl groups on oxygen — metamerism.",
        },
      ],
    },
    {
      id: "hydrocarbons",
      title: "Hydrocarbons: alkanes, alkenes, alkynes and benzene",
      minutes: 9,
      summary:
        "Alkanes react by free-radical substitution, alkenes and alkynes by electrophilic addition, and benzene by electrophilic substitution that preserves its aromatic sextet.",
      examFocus:
        "Markovnikov vs anti-Markovnikov (peroxide) addition, ozonolysis products, Wurtz/Kolbe/decarboxylation carbon counts, acidity of terminal alkynes, Lindlar vs Na/NH₃ reduction, aromaticity and directive influence of substituents.",
      mechanism:
        "In electrophilic addition of HX to an unsymmetrical alkene, H⁺ adds first to give the more stable carbocation, and X⁻ then attaches to that carbon — so the halogen ends up on the more substituted carbon (Markovnikov's rule). With HBr in the presence of a peroxide the mechanism changes to a free-radical chain: Br• adds first to give the more stable radical, so Br ends up on the less substituted carbon; this works only for HBr, because for HCl and HI one of the radical steps is energetically unfavourable. Terminal alkynes are weakly acidic because the sp carbon has 50% s-character and holds the C–H electrons close, stabilising the acetylide anion. Benzene's six π-electrons are delocalised over the ring (4n + 2 with n = 1), giving it large resonance stabilisation; addition would destroy this, so benzene prefers substitution, in which an electrophile adds to form a sigma complex and H⁺ is then lost to restore aromaticity. Electron-donating substituents stabilise the sigma complex for ortho/para attack and speed the reaction; electron-withdrawing groups slow it and direct meta.",
      points: [
        "Wurtz: 2RX + 2Na (dry ether) → R–R (even-carbon alkanes; methane cannot be made); Kolbe electrolysis of RCOONa gives R–R at the anode.",
        "Decarboxylation: RCOONa + NaOH (soda lime, CaO) → R–H + Na₂CO₃ — one carbon fewer.",
        "Alkane halogenation proceeds by free radicals: initiation (Cl₂ → 2Cl• in light), propagation, termination.",
        "Ozonolysis (O₃, then Zn/H₂O) cleaves C=C into two C=O compounds; cold dilute alkaline KMnO₄ (Baeyer's reagent) gives a diol and is decolourised (test for unsaturation).",
        "Lindlar's catalyst (palladium partially deactivated with quinoline or sulphur compounds) → cis-alkene; Na in liquid NH₃ → trans-alkene.",
        "Hydration of alkynes with dil. H₂SO₄/HgSO₄: ethyne gives ethanal; higher alkynes give ketones. Terminal alkynes react with Na and ammoniacal AgNO₃.",
        "Aromatic: planar, cyclic, fully conjugated with (4n + 2) π-electrons (Hückel); all C–C bonds in benzene are 139 pm.",
        "Directive influence: o/p-directing activators —OH, —NH₂, —OCH₃, —CH₃; halogens are o/p-directing but deactivating; meta-directors —NO₂, —CN, —CHO, —COOH, —SO₃H.",
      ],
      formulae: [
        { label: "Markovnikov", expr: "CH₃CH=CH₂ + HBr → CH₃CHBrCH₃" },
        { label: "Peroxide effect", expr: "CH₃CH=CH₂ + HBr (ROOR) → CH₃CH₂CH₂Br" },
        { label: "Nitrating electrophile", expr: "HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻" },
        { label: "Hückel rule", expr: "π electrons = 4n + 2" },
        { label: "Decarboxylation", expr: "RCOONa + NaOH → RH + Na₂CO₃ (CaO, heat)" },
      ],
      table: {
        title: "Typical reactions by class",
        columns: ["Class", "Characteristic reaction", "Key reagent / condition"],
        rows: [
          ["Alkane", "Free-radical substitution", "Cl₂, hν"],
          ["Alkene", "Electrophilic addition", "HX, X₂, H₂O/H⁺, O₃"],
          ["Alkyne", "Addition; acidic terminal H", "HgSO₄/H₂SO₄; Na, NaNH₂"],
          ["Benzene", "Electrophilic substitution", "HNO₃/H₂SO₄; X₂/FeX₃; RCl/AlCl₃"],
        ],
      },
      pitfalls: [
        "Applying the peroxide effect to HCl or HI — it is observed only with HBr.",
        "Treating chlorobenzene's —Cl as meta-directing because it deactivates; halogens are deactivating but o/p-directing.",
      ],
      vignette: {
        stem: "An alkene C₅H₁₀ on ozonolysis gives propanone and ethanal. Identify it.",
        answer: "2-Methylbut-2-ene, (CH₃)₂C=CHCH₃.",
        reasoning:
          "Join the carbonyl carbons with a double bond: (CH₃)₂C=O + O=CHCH₃ → (CH₃)₂C=CHCH₃. Carbon count 3 + 2 = 5, matching C₅H₁₀.",
      },
      highYield:
        "Markovnikov via the more stable carbocation; peroxide effect only with HBr; Lindlar → cis, Na/NH₃ → trans; halogens deactivate but direct o/p.",
      checks: [
        {
          q: "Propene reacts with HBr in the presence of benzoyl peroxide to give mainly:",
          options: ["2-Bromopropane", "1-Bromopropane", "1,2-Dibromopropane", "Propane"],
          answer: 1,
          why: "Free-radical (anti-Markovnikov) addition puts Br on the terminal carbon.",
        },
        {
          q: "Which compound is aromatic?",
          options: ["Cyclooctatetraene", "Cyclohexene", "Benzene", "Cyclobutadiene"],
          answer: 2,
          why: "Benzene is planar, cyclic and conjugated with 6 π-electrons (n = 1).",
        },
      ],
    },
    {
      id: "haloalkanes-haloarenes",
      title: "Haloalkanes and haloarenes: SN1 vs SN2",
      minutes: 9,
      summary:
        "Haloalkanes undergo nucleophilic substitution by a one-step SN2 or a two-step SN1 path; haloarenes resist it because of resonance and an sp² carbon.",
      examFocus:
        "Choosing SN1 vs SN2 from substrate, stereochemistry (inversion vs racemisation), reactivity orders, named reactions (Finkelstein, Swarts, Wurtz–Fittig, Sandmeyer), Saytzeff elimination and why haloarenes are unreactive.",
      mechanism:
        "In SN2 the nucleophile attacks the carbon from the side opposite the leaving halide, and the C–Nu bond forms as the C–X bond breaks in one concerted step; both species are in the rate law, bulky groups block the backside approach, and the configuration is inverted (Walden inversion). In SN1 the C–X bond first ionises slowly to a planar carbocation, then the nucleophile adds from either face; the rate depends only on the haloalkane, tertiary substrates react fastest because they form the most stable carbocation, and a chiral substrate gives mainly racemic product. Allylic and benzylic halides are very reactive by SN1 because their carbocations are resonance-stabilised. In chlorobenzene a lone pair on Cl is delocalised into the ring, giving the C–Cl bond partial double-bond character; the carbon is also sp² (more electronegative), and a phenyl cation would be very unstable, so nucleophilic substitution needs harsh conditions unless –NO₂ groups at ortho/para positions withdraw electron density and stabilise the intermediate.",
      points: [
        "SN2 reactivity: CH₃X > 1° > 2° > 3°; second order; one step; inversion of configuration.",
        "SN1 reactivity: 3° > 2° > 1° > CH₃X; first order; carbocation intermediate; racemisation (largely).",
        "For the same alkyl group, reactivity R–I > R–Br > R–Cl > R–F (C–I bond weakest).",
        "Finkelstein: R–Cl/R–Br + NaI in dry acetone → R–I (NaCl/NaBr precipitate); Swarts: R–Cl/R–Br + AgF, Hg₂F₂, CoF₂ or SbF₃ → R–F.",
        "Wurtz–Fittig: ArX + RX + Na (dry ether) → Ar–R; Fittig: 2ArX + 2Na → Ar–Ar; Sandmeyer: ArN₂⁺ + CuCl/HCl or CuBr/HBr → ArCl/ArBr.",
        "Dehydrohalogenation with alcoholic KOH follows Saytzeff's rule: the more substituted alkene is the major product.",
        "Boiling points rise with molar mass (RI > RBr > RCl > RF) and fall with branching; p-dichlorobenzene melts higher than its o- and m-isomers due to symmetry.",
        "Chloroform is oxidised by air in light to poisonous phosgene (COCl₂), so it is stored in closed dark bottles filled to the brim.",
      ],
      formulae: [
        { label: "SN2 rate", expr: "rate = k[RX][Nu⁻]" },
        { label: "SN1 rate", expr: "rate = k[RX]" },
        { label: "Finkelstein", expr: "R–Br + NaI → R–I + NaBr (dry acetone)" },
        { label: "Grignard with water", expr: "RMgX + H₂O → RH + Mg(OH)X" },
      ],
      table: {
        title: "SN1 versus SN2",
        columns: ["Feature", "SN1", "SN2"],
        rows: [
          ["Steps", "Two (carbocation)", "One (concerted)"],
          ["Rate law", "k[RX]", "k[RX][Nu]"],
          ["Best substrate", "3°, benzylic, allylic", "CH₃, 1°"],
          ["Stereochemistry", "Racemisation", "Inversion"],
          ["Favoured solvent", "Polar protic", "Polar aprotic"],
          ["Rearrangement", "Possible", "Not possible"],
        ],
      },
      pitfalls: [
        "Predicting SN2 for tert-butyl bromide; steric hindrance blocks backside attack, so it reacts by SN1.",
        "Thinking chlorobenzene is unreactive because Cl is weakly bonded — it is the opposite: the C–Cl bond is strengthened by resonance.",
      ],
      vignette: {
        stem: "(R)-2-Bromobutane is heated with aqueous NaOH under conditions where the reaction is purely SN2. What is the product and its configuration?",
        answer: "(S)-Butan-2-ol.",
        reasoning:
          "SN2 proceeds by backside attack and inverts the configuration at C-2. The OH group takes the same CIP priority rank as Br had (highest), so the geometric inversion appears as a change of descriptor from R to S.",
      },
      highYield:
        "SN2: CH₃ > 1° > 2° > 3°, inversion; SN1: 3° > 2° > 1°, racemisation; Finkelstein NaI/acetone, Swarts AgF/SbF₃.",
      checks: [
        {
          q: "Which reacts fastest by the SN1 mechanism?",
          options: ["CH₃Br", "CH₃CH₂Br", "(CH₃)₃CBr", "(CH₃)₂CHBr"],
          answer: 2,
          why: "The tertiary halide forms the most stable carbocation.",
        },
        {
          q: "Conversion of CH₃CH₂Br to CH₃CH₂F using AgF is called:",
          options: [
            "Swarts reaction",
            "Finkelstein reaction",
            "Wurtz reaction",
            "Sandmeyer reaction",
          ],
          answer: 0,
          why: "Swarts reaction uses metallic fluorides such as AgF, Hg₂F₂, CoF₂ or SbF₃.",
        },
      ],
    },
    {
      id: "alcohols-phenols-ethers",
      title: "Alcohols, phenols and ethers",
      minutes: 9,
      summary:
        "The –OH group gives alcohols hydrogen bonding and weak acidity; on a benzene ring it becomes much more acidic and strongly activates the ring; ethers are prepared by Williamson synthesis and cleaved by HI.",
      examFocus:
        "Lucas test for 1°/2°/3° alcohols, acidity of phenols with substituents, Grignard routes to 1°/2°/3° alcohols, Reimer–Tiemann and Kolbe reactions, ether cleavage products, and dehydration temperatures.",
      mechanism:
        "Phenol is far more acidic than ethanol because the phenoxide ion's negative charge is delocalised into the benzene ring by resonance, whereas the ethoxide charge sits on oxygen and is further destabilised by the +I ethyl group. Electron-withdrawing groups at ortho/para positions (especially –NO₂) delocalise the charge further and increase acidity; electron-donating groups such as –CH₃ decrease it. The same lone-pair donation into the ring makes phenol highly reactive towards electrophiles, so bromine water gives 2,4,6-tribromophenol at once without a catalyst. Alcohols react with HCl/ZnCl₂ (Lucas reagent) through carbocations, so tertiary alcohols react immediately, secondary ones after a few minutes and primary ones not at room temperature. Ethers are cleaved by HI at the C–O bond whose fragment can best take part: in alkyl aryl ethers the O–aryl bond has partial double-bond character, so the alkyl side breaks and the products are phenol and alkyl iodide.",
      points: [
        "Grignard + HCHO → 1° alcohol; + other aldehydes → 2° alcohol; + ketones → 3° alcohol (after hydrolysis).",
        "Hydroboration–oxidation (B₂H₆ then H₂O₂/OH⁻) gives the anti-Markovnikov alcohol; acid-catalysed hydration gives the Markovnikov alcohol.",
        "Lucas test (conc. HCl + anhydrous ZnCl₂): 3° turbidity immediately, 2° within minutes, 1° no turbidity at room temperature.",
        "Acidity: p-nitrophenol > phenol > p-cresol > ethanol; phenol pKa about 10, ethanol about 16 — phenol reacts with NaOH, ethanol does not.",
        "Kolbe reaction: sodium phenoxide + CO₂ then H⁺ → salicylic acid; Reimer–Tiemann: phenol + CHCl₃ + NaOH → salicylaldehyde.",
        "Nitration with dilute HNO₃ gives o- and p-nitrophenol; o-nitrophenol is steam-volatile because of intramolecular hydrogen bonding.",
        "Ethanol + conc. H₂SO₄: 443 K → ethene; 413 K → ethoxyethane. Cu at 573 K: 1° → aldehyde, 2° → ketone, 3° → alkene.",
        "Williamson synthesis uses alkoxide + primary alkyl halide; a tertiary halide gives alkene by elimination instead. Anisole + HI → phenol + CH₃I.",
      ],
      formulae: [
        { label: "Grignard (2° alcohol)", expr: "RCHO + R′MgX → RCH(OMgX)R′ → RCH(OH)R′" },
        { label: "Williamson", expr: "RO⁻Na⁺ + R′X → R–O–R′ + NaX" },
        { label: "Ether cleavage", expr: "C₆H₅OCH₃ + HI → C₆H₅OH + CH₃I" },
        { label: "Bromination", expr: "C₆H₅OH + 3Br₂ (aq) → 2,4,6-tribromophenol + 3HBr" },
      ],
      table: {
        title: "Distinguishing alcohols",
        columns: ["Test", "1° alcohol", "2° alcohol", "3° alcohol"],
        rows: [
          [
            "Lucas reagent",
            "No turbidity at room temperature",
            "Turbidity in a few minutes",
            "Turbidity immediately",
          ],
          ["Cu, 573 K", "Aldehyde", "Ketone", "Alkene"],
          ["PCC", "Aldehyde", "Ketone", "No reaction"],
          ["Acidified K₂Cr₂O₇", "Carboxylic acid (via aldehyde)", "Ketone", "Resists"],
        ],
      },
      pitfalls: [
        "Writing iodobenzene + methanol for anisole + HI; the aryl–O bond does not break.",
        "Making a tert-butyl ether from tert-butyl bromide + sodium methoxide — elimination wins; use (CH₃)₃CO⁻Na⁺ + CH₃Br instead.",
      ],
      vignette: {
        stem: "Methylmagnesium bromide is added to propanone and the product is hydrolysed with dilute acid. Name the alcohol formed and its class.",
        answer: "2-Methylpropan-2-ol, a tertiary alcohol.",
        reasoning:
          "CH₃⁻ (from CH₃MgBr) adds to the carbonyl carbon of (CH₃)₂C=O, giving (CH₃)₃C–OMgBr. Hydrolysis replaces MgBr with H: (CH₃)₃C–OH. The OH carbon carries three alkyl groups — tertiary.",
      },
      highYield:
        "Phenoxide is resonance-stabilised (phenol ≫ ethanol in acidity); Lucas: 3° immediate; Grignard + ketone → 3° alcohol; anisole + HI → phenol + CH₃I.",
      checks: [
        {
          q: "Which is the strongest acid?",
          options: ["Phenol", "p-Cresol", "p-Nitrophenol", "Ethanol"],
          answer: 2,
          why: "–NO₂ at para withdraws electron density by −R and −I, stabilising the phenoxide most.",
        },
        {
          q: "Phenol with CHCl₃ and aqueous NaOH, followed by acidification, gives:",
          options: ["Salicylaldehyde", "Salicylic acid", "Benzaldehyde", "Benzoic acid"],
          answer: 0,
          why: "This is the Reimer–Tiemann reaction, which introduces –CHO at the ortho position.",
        },
      ],
    },
    {
      id: "aldehydes-ketones",
      title: "Aldehydes and ketones: nucleophilic addition and named reactions",
      minutes: 9,
      summary:
        "The polar C=O group is attacked by nucleophiles at carbon; α-hydrogens make aldol condensation possible, and their absence allows the Cannizzaro reaction.",
      examFocus:
        "Relative reactivity towards nucleophiles, aldol vs Cannizzaro (α-H rule), Clemmensen and Wolff–Kishner reductions, Tollens'/Fehling's/iodoform tests, and preparation reactions (Rosenmund, Stephen, Etard, Gattermann–Koch).",
      mechanism:
        "Oxygen is more electronegative than carbon, so the carbonyl carbon carries a partial positive charge and is attacked by nucleophiles; the sp² carbon becomes sp³ in the tetrahedral intermediate. Aldehydes are more reactive than ketones for two reasons: a ketone's two alkyl groups push electron density onto the carbonyl carbon (+I) and also crowd the approaching nucleophile. Hydrogens on the carbon next to C=O (α-hydrogens) are acidic because the resulting carbanion (enolate) is resonance-stabilised by the carbonyl; in dilute base this enolate attacks a second carbonyl molecule — aldol addition — and heating eliminates water to give an α,β-unsaturated carbonyl compound. An aldehyde with no α-hydrogen cannot form an enolate, so in concentrated alkali hydroxide adds to it and a hydride is transferred to a second molecule: one is oxidised to the carboxylate and one reduced to the alcohol (Cannizzaro, a disproportionation).",
      points: [
        "Reactivity towards nucleophilic addition: HCHO > CH₃CHO > CH₃COCH₃; benzaldehyde is less reactive than propanal because resonance reduces the carbon's positive charge.",
        "Addition products: HCN → cyanohydrin; NaHSO₃ → crystalline bisulphite adduct; NH₂OH → oxime; NH₂NH₂ → hydrazone; 2,4-DNP → orange/yellow 2,4-dinitrophenylhydrazone; semicarbazide → semicarbazone.",
        "Aldol (dilute NaOH) needs at least one α-H: 2CH₃CHO → CH₃CH(OH)CH₂CHO → (heat) CH₃CH=CHCHO.",
        "Cannizzaro (conc. alkali) needs no α-H: 2HCHO → CH₃OH + HCOO⁻Na⁺; benzaldehyde gives benzyl alcohol + sodium benzoate.",
        "Clemmensen (Zn–Hg/conc. HCl) and Wolff–Kishner (NH₂NH₂, then KOH/ethylene glycol, heat) both reduce C=O to CH₂.",
        "Tollens' reagent gives a silver mirror with aldehydes; Fehling's gives red Cu₂O with aliphatic aldehydes but not with benzaldehyde; ketones give neither.",
        "Iodoform test (I₂/NaOH, yellow CHI₃) is positive for CH₃CO– compounds and CH₃CH(OH)– alcohols (ethanal, ethanol, propanone, propan-2-ol, butan-2-one).",
        "Preparations: Rosenmund (RCOCl + H₂, Pd–BaSO₄), Stephen (RCN + SnCl₂/HCl then H₃O⁺), Etard (toluene + CrO₂Cl₂ → benzaldehyde), Gattermann–Koch (benzene + CO + HCl, anhydrous AlCl₃/CuCl), DIBAL-H on nitriles/esters.",
      ],
      formulae: [
        { label: "Cyanohydrin", expr: "R₂C=O + HCN → R₂C(OH)CN" },
        { label: "Cannizzaro", expr: "2C₆H₅CHO + NaOH (conc.) → C₆H₅CH₂OH + C₆H₅COONa" },
        { label: "Iodoform", expr: "CH₃COR + 3I₂ + 4NaOH → CHI₃ + RCOONa + 3NaI + 3H₂O" },
        { label: "Clemmensen", expr: "R₂C=O → R₂CH₂ (Zn–Hg, conc. HCl)" },
      ],
      table: {
        title: "Aldol or Cannizzaro?",
        columns: ["Compound", "α-H present?", "Reaction with alkali"],
        rows: [
          ["HCHO", "No", "Cannizzaro (conc. alkali)"],
          ["CH₃CHO", "Yes", "Aldol (dilute alkali)"],
          ["C₆H₅CHO", "No", "Cannizzaro (conc. alkali)"],
          ["(CH₃)₃CCHO", "No", "Cannizzaro (conc. alkali)"],
          ["CH₃COCH₃", "Yes", "Aldol (dilute alkali)"],
        ],
      },
      pitfalls: [
        "Saying benzaldehyde gives Fehling's test — aromatic aldehydes do not reduce Fehling's solution.",
        "Applying the iodoform test to propanal or pentan-3-one; neither has a CH₃CO– group.",
      ],
      vignette: {
        stem: "Compound X, C₃H₆O, forms a 2,4-DNP derivative and gives a yellow precipitate with I₂/NaOH, but does not reduce Tollens' reagent. Identify X.",
        answer: "Propanone (acetone), CH₃COCH₃.",
        reasoning:
          "2,4-DNP positive → carbonyl compound. No Tollens' reaction → ketone, not aldehyde (rules out propanal). Positive iodoform → CH₃CO– group. The only C₃ ketone is CH₃COCH₃.",
      },
      highYield:
        "α-H present → aldol; no α-H → Cannizzaro; Fehling's: aliphatic aldehydes only; iodoform: CH₃CO– or CH₃CH(OH)–.",
      checks: [
        {
          q: "Which compound undergoes the Cannizzaro reaction?",
          options: ["Ethanal", "Propanal", "Benzaldehyde", "Propanone"],
          answer: 2,
          why: "Benzaldehyde has no α-hydrogen, so it disproportionates in concentrated alkali.",
        },
        {
          q: "Which compound gives a positive iodoform test?",
          options: ["Pentan-3-one", "Propan-2-ol", "Methanol", "Propanal"],
          answer: 1,
          why: "Propan-2-ol is oxidised to propanone (CH₃CO–) under the test conditions.",
        },
      ],
    },
    {
      id: "acids-amines",
      title: "Carboxylic acids and amines",
      minutes: 9,
      summary:
        "Carboxylic acids owe their acidity to a resonance-stabilised carboxylate; amines are bases because of the nitrogen lone pair; diazonium salts are the gateway to substituted benzenes.",
      examFocus:
        "Acid strength with substituents, HVZ reaction, basicity order of methyl/ethyl amines and aniline, Hinsberg and carbylamine tests, Hoffmann bromamide and Gabriel syntheses, and diazonium replacement and coupling reactions.",
      mechanism:
        "In the carboxylate ion the negative charge is shared equally between two oxygens by resonance, which is why carboxylic acids are stronger than phenols and alcohols; electron-withdrawing groups strengthen them further. Amines are basic because nitrogen's lone pair accepts a proton; alkyl groups push electron density onto nitrogen (+I) and raise basicity, but in water the ammonium ion is also stabilised by hydrogen bonding with water, which is best for RNH₃⁺ and worst for R₃NH⁺, and bulky groups hinder solvation. The balance of these effects gives the NCERT aqueous order (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃. In aniline the lone pair is delocalised into the benzene ring, so it is much less available and aniline is a weaker base than ammonia. Arenediazonium salts are stabilised by resonance with the ring, so they can be kept cold in solution and used to replace –N₂⁺ by many groups, with N₂ gas as a superb leaving group.",
      points: [
        "pKa values: HCOOH 3.75, C₆H₅COOH 4.19, CH₃COOH 4.76 — formic and benzoic acids are stronger than acetic acid.",
        "HVZ reaction: RCH₂COOH + X₂ (red P) → RCHXCOOH (α-halogenation); LiAlH₄ reduces –COOH to –CH₂OH.",
        "Basicity (aqueous): (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ and (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃; aniline pKb 9.38 is weaker than NH₃ (4.75).",
        "Gabriel phthalimide synthesis gives only 1° aliphatic amines (aryl halides do not react with phthalimide anion).",
        "Hoffmann bromamide: RCONH₂ + Br₂ + 4NaOH → RNH₂ (one carbon less) + Na₂CO₃ + 2NaBr + 2H₂O.",
        "Carbylamine test (CHCl₃ + alc. KOH, foul-smelling isocyanide) is given only by 1° amines; Hinsberg (C₆H₅SO₂Cl): 1° → sulphonamide soluble in alkali, 2° → insoluble, 3° → no reaction.",
        "Diazotisation: aniline + NaNO₂ + HCl at 273–278 K → C₆H₅N₂⁺Cl⁻; replacements: CuCl/HCl → ArCl, CuCN/KCN → ArCN, KI → ArI, HBF₄ then heat → ArF, H₃PO₂ → ArH, warm water → ArOH.",
        "Coupling: with phenol (alkaline) → p-hydroxyazobenzene (orange); with aniline (mildly acidic) → p-aminoazobenzene (yellow). Aniline does not undergo Friedel–Crafts reactions (it complexes AlCl₃).",
      ],
      formulae: [
        {
          label: "Hoffmann bromamide",
          expr: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O",
        },
        { label: "Carbylamine", expr: "RNH₂ + CHCl₃ + 3KOH → RNC + 3KCl + 3H₂O" },
        {
          label: "Diazotisation",
          expr: "C₆H₅NH₂ + NaNO₂ + 2HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O (273–278 K)",
        },
        { label: "Acid–base link", expr: "pKa + pKb = 14 for a conjugate pair (298 K)" },
      ],
      table: {
        title: "Tests for amines",
        columns: ["Test", "1° amine", "2° amine", "3° amine"],
        rows: [
          ["Carbylamine (CHCl₃/KOH)", "Isocyanide (foul smell)", "No reaction", "No reaction"],
          [
            "Hinsberg (C₆H₅SO₂Cl)",
            "Sulphonamide soluble in KOH",
            "Sulphonamide insoluble in KOH",
            "No reaction",
          ],
        ],
      },
      pitfalls: [
        "Ranking methylamines purely by +I (3° > 2° > 1°); that order holds in the gas phase, not in water.",
        "Making aniline by Gabriel synthesis — aryl halides do not undergo nucleophilic substitution with phthalimide anion.",
      ],
      vignette: {
        stem: "Propanamide is treated with Br₂ and aqueous NaOH. Name the product and explain the carbon count.",
        answer: "Ethanamine (ethylamine), C₂H₅NH₂.",
        reasoning:
          "In the Hoffmann bromamide degradation the carbonyl carbon of the amide is lost as carbonate, and the alkyl group migrates to nitrogen. CH₃CH₂CONH₂ (3 C) → CH₃CH₂NH₂ (2 C).",
      },
      highYield:
        "Aqueous basicity (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ > C₆H₅NH₂; carbylamine for 1° only; Hoffmann bromamide removes one carbon.",
      checks: [
        {
          q: "Which amine gives the carbylamine test?",
          options: ["(CH₃)₂NH", "(CH₃)₃N", "C₆H₅NHCH₃", "C₆H₅NH₂"],
          answer: 3,
          why: "Only primary amines (aliphatic or aromatic) form isocyanides; aniline is primary.",
        },
        {
          q: "Benzenediazonium chloride is converted to benzene by:",
          options: ["H₃PO₂", "CuCN/KCN", "Warm water", "HBF₄"],
          answer: 0,
          why: "Hypophosphorous acid reduces –N₂⁺ to –H.",
        },
      ],
    },
    {
      id: "biomolecules",
      title: "Biomolecules: carbohydrates, proteins, nucleic acids and vitamins",
      minutes: 8,
      summary:
        "Carbohydrates are polyhydroxy aldehydes or ketones and their polymers; proteins are polymers of α-amino acids; nucleic acids are polynucleotides; vitamins are needed in small amounts for normal health.",
      examFocus:
        "Evidence for glucose's open-chain and cyclic structures, reducing vs non-reducing sugars, glycosidic linkages in sucrose/maltose/lactose/starch/cellulose, levels of protein structure and denaturation, DNA vs RNA, and vitamin–deficiency matches.",
      mechanism:
        "Glucose is an aldohexose whose open chain is shown by reactions such as HI giving n-hexane, Br₂ water giving gluconic acid and acetylation giving a pentaacetate (five –OH groups). But glucose does not give Schiff's test or form a bisulphite adduct, because in solution the C-5 –OH has added to the aldehyde to form a six-membered pyranose ring; the new chiral centre at C-1 gives α and β anomers, which interconvert in water (mutarotation). A sugar is reducing only if it has a free hemiacetal/hemiketal carbon that can reopen to a carbonyl. In sucrose the glycosidic bond joins C-1 of α-glucose to C-2 of β-fructose, locking both reducing carbons, so sucrose is non-reducing; maltose and lactose leave one free and are reducing. In proteins the sequence of amino acids (primary structure) determines how the chain folds by hydrogen bonds into α-helices and β-pleated sheets and then into a 3-D shape; denaturation by heat or pH destroys the higher structures while the peptide bonds of the primary structure remain intact.",
      points: [
        "Glucose: aldohexose, pyranose ring; fructose: ketohexose, furanose ring in combination.",
        "Sucrose (α-D-glucose C1 – β-D-fructose C2) is non-reducing; hydrolysis gives invert sugar because fructose (−92.4°) outweighs glucose (+52.5°), turning dextrorotatory to laevorotatory.",
        "Maltose: two α-D-glucose units, C1–C4, reducing; lactose: β-D-galactose C1 – β-D-glucose C4, reducing.",
        "Starch = amylose (15–20%, unbranched, α-C1–C4, water-soluble) + amylopectin (80–85%, branched via C1–C6); cellulose = β-D-glucose units C1–C4; glycogen is highly branched like amylopectin.",
        "Amino acids exist as zwitterions; all except glycine are optically active; essential amino acids include valine, leucine, isoleucine, lysine, threonine, methionine, phenylalanine, tryptophan, arginine and histidine.",
        "Protein structure: primary (sequence), secondary (α-helix, β-pleated sheet), tertiary (overall folding), quaternary (subunit arrangement); boiling an egg or curdling milk is denaturation.",
        "DNA: 2-deoxyribose, bases A, G, C, T, double helix with A=T and G≡C pairing; RNA: ribose, A, G, C, U. Nucleoside = base + sugar; nucleotide = nucleoside + phosphate; linked by 5′–3′ phosphodiester bonds.",
        "Fat-soluble vitamins A, D, E, K are stored in the body; water-soluble B-group and C must be supplied regularly (except B₁₂). Deficiencies: A — xerophthalmia, night blindness; B₁ — beriberi; B₂ — cheilosis; B₆ — convulsions; B₁₂ — pernicious anaemia; C — scurvy; D — rickets/osteomalacia; E — RBC fragility, muscular weakness; K — increased blood-clotting time.",
      ],
      formulae: [
        { label: "Peptide bonds", expr: "n amino acids in a chain → n − 1 peptide bonds" },
        {
          label: "Peptide sequences",
          expr: "n different amino acids each used once → n! sequences",
        },
        {
          label: "Sucrose hydrolysis",
          expr: "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose)",
        },
        { label: "Nucleotide", expr: "base + pentose sugar + phosphate" },
      ],
      table: {
        title: "Disaccharides and polysaccharides",
        columns: ["Carbohydrate", "Units", "Linkage", "Reducing?"],
        rows: [
          ["Sucrose", "α-D-glucose + β-D-fructose", "C1 (glc) – C2 (fru)", "No"],
          ["Maltose", "2 α-D-glucose", "C1 – C4", "Yes"],
          ["Lactose", "β-D-galactose + β-D-glucose", "C1 (gal) – C4 (glc)", "Yes"],
          ["Amylose", "α-D-glucose", "C1 – C4, unbranched", "—"],
          ["Amylopectin", "α-D-glucose", "C1 – C4 with C1 – C6 branches", "—"],
          ["Cellulose", "β-D-glucose", "C1 – C4", "—"],
        ],
      },
      pitfalls: [
        "Calling sucrose a reducing sugar because its components are; the glycosidic bond uses both anomeric carbons.",
        "Thinking denaturation breaks peptide bonds — the primary structure survives.",
      ],
      vignette: {
        stem: "How many peptide bonds are in a pentapeptide, and how many different tripeptides can be made using glycine, alanine and valine, each exactly once?",
        answer: "4 peptide bonds; 6 tripeptides.",
        reasoning:
          "A chain of 5 amino acids has 5 − 1 = 4 peptide bonds. With three different amino acids each used once, the order matters (N- to C-terminus), so 3! = 3 × 2 × 1 = 6 sequences.",
      },
      highYield:
        "Sucrose non-reducing (C1–C2); amylose 15–20%, amylopectin 80–85%; glycine is optically inactive; RNA has U and ribose; vitamin C deficiency → scurvy.",
      checks: [
        {
          q: "Glucose does not react with NaHSO₃ or give Schiff's test because:",
          options: [
            "It has no carbonyl group at all",
            "It is a ketose",
            "It exists mainly in a cyclic hemiacetal form",
            "It is a non-reducing sugar",
          ],
          answer: 2,
          why: "The –CHO is tied up in the pyranose ring, with only a tiny fraction of open chain.",
        },
        {
          q: "Deficiency of vitamin K causes:",
          options: [
            "Increased blood-clotting time",
            "Pernicious anaemia",
            "Scurvy",
            "Night blindness",
          ],
          answer: 0,
          why: "Vitamin K is needed for blood clotting; its deficiency prolongs clotting time.",
        },
      ],
    },
  ],
};
