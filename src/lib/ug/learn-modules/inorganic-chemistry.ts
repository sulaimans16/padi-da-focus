import type { LearnModule } from "../../learn";

export const inorganicChemistry: LearnModule = {
  slug: "inorganic-chemistry",
  group: "Chemistry",
  subject: "Chemistry",
  title: "Inorganic Chemistry",
  icon: "grid_view",
  blurb:
    "Periodic trends, VSEPR and hybridisation, molecular orbital theory, p-block groups 13–18, d- and f-block elements, coordination compounds and salt analysis.",
  objectives: [
    "Learner can rank atoms and ions by radius, ionisation enthalpy, electron gain enthalpy and electronegativity, including the standard exceptions.",
    "Learner can predict shape, hybridisation, bond order and magnetic behaviour of molecules and ions.",
    "Learner can explain group trends and anomalies across groups 13–18 using size, inert pair effect and d-orbital availability.",
    "Learner can work out d-electron counts, spin-only magnetic moments, colour and isomers of transition-metal ions and complexes.",
    "Learner can identify the common cations and anions of the NCERT practical syllabus from group reagents and confirmatory tests.",
  ],
  concepts: [
    {
      id: "periodic-trends",
      title: "Periodic properties and trends",
      minutes: 7,
      summary:
        "Atomic size, ionisation enthalpy, electron gain enthalpy and electronegativity all follow from effective nuclear charge and the shell number of the outermost electrons.",
      examFocus:
        "Ordering ionisation enthalpies with the Be/B and N/O exceptions, radii of isoelectronic species, Cl vs F electron gain enthalpy, nature of oxides across a period, and IUPAC names for Z > 100.",
      mechanism:
        "Across a period electrons are added to the same shell while the nuclear charge rises, and electrons in the same shell shield each other poorly, so effective nuclear charge increases. The outer electrons are pulled closer: atomic radius falls and ionisation enthalpy, electron gain enthalpy (more negative) and electronegativity rise. Down a group a new shell is added each time, which outweighs the rising nuclear charge, so size increases and these properties fall. The exceptions come from subshell stability: B has lower ionisation enthalpy than Be because its 2p electron is less penetrating than a 2s electron, and O is lower than N because removing one of the paired 2p electrons relieves electron–electron repulsion, whereas N's half-filled 2p³ is extra stable. Fluorine's electron gain enthalpy is less negative than chlorine's because the incoming electron enters the very compact 2p shell and is repelled by the electrons already there.",
      points: [
        "Modern periodic law: properties are a periodic function of atomic number (Moseley).",
        "First ionisation enthalpy: B (801) < Be (899) and O (1314) < N (1402) kJ mol⁻¹ — the classic exceptions to the across-period rise.",
        "Electron gain enthalpy is most negative for Cl (−349 kJ mol⁻¹), more negative than F (−328 kJ mol⁻¹); noble gases have positive values.",
        "Electronegativity is highest for F (4.0 on the Pauling scale); it is not a measurable energy but a tendency within a bond.",
        "Isoelectronic species: radius decreases as nuclear charge increases — O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺.",
        "Cation is smaller than its parent atom; anion is larger.",
        "Oxides become less basic and more acidic across a period (Na₂O basic, Al₂O₃ amphoteric, Cl₂O₇ acidic).",
        "IUPAC names for Z > 100 use digit roots nil (0), un (1), bi (2), tri (3), quad (4), pent (5), hex (6), sept (7), oct (8), enn (9) + 'ium': Z = 120 is unbinilium (Ubn).",
      ],
      formulae: [
        {
          label: "Effective nuclear charge",
          expr: "Zeff = Z − σ",
          note: "σ = shielding by inner electrons",
        },
        { label: "Isoelectronic size", expr: "radius ∝ 1/Zeff" },
        { label: "Pauling electronegativity (fluorine)", expr: "χ(F) = 4.0" },
      ],
      table: {
        title: "Trends in the main group",
        columns: ["Property", "Across a period (→)", "Down a group (↓)"],
        rows: [
          ["Atomic radius", "Decreases", "Increases"],
          ["Ionisation enthalpy", "Increases (exceptions: group 13 < 2, 16 < 15)", "Decreases"],
          ["Electron gain enthalpy", "More negative", "Less negative (Cl > F exception)"],
          ["Electronegativity", "Increases", "Decreases"],
          ["Metallic character", "Decreases", "Increases"],
        ],
      },
      pitfalls: [
        "Writing F as having the most negative electron gain enthalpy — it is Cl.",
        "Ranking isoelectronic ions by mass instead of by nuclear charge.",
      ],
      vignette: {
        stem: "Arrange Be, B, N and O in increasing order of first ionisation enthalpy and justify the two inversions.",
        answer: "B < Be < O < N.",
        reasoning:
          "General rise across period 2, but B's single 2p electron is removed more easily than Be's 2s electron (2s penetrates closer to the nucleus). O loses a paired 2p electron, helped by pairing repulsion, while N has a stable half-filled 2p³ subshell, so IE(O) < IE(N).",
      },
      highYield:
        "IE: B < Be, O < N; most negative ΔegH: Cl; highest electronegativity: F; isoelectronic ions shrink as Z increases.",
      checks: [
        {
          q: "Which of the following has the largest radius?",
          options: ["Na⁺", "F⁻", "Mg²⁺", "O²⁻"],
          answer: 3,
          why: "All have 10 electrons; O²⁻ has the lowest nuclear charge (8), so it is largest.",
        },
        {
          q: "The element with the most negative electron gain enthalpy is:",
          options: ["F", "Cl", "O", "Br"],
          answer: 1,
          why: "Cl; fluorine's compact 2p shell causes repulsion with the added electron.",
        },
      ],
    },
    {
      id: "vsepr-hybridisation",
      title: "Chemical bonding: VSEPR and hybridisation",
      minutes: 8,
      summary:
        "Shapes come from electron pairs around the central atom repelling each other; hybridisation is the orbital description that matches that geometry.",
      examFocus:
        "Shape and hybridisation of molecules with lone pairs (SF₄, ClF₃, XeF₄, BrF₅), bond-angle order in CH₄/NH₃/H₂O, dipole moment zero vs non-zero, and formal charge.",
      mechanism:
        "Electron pairs in the valence shell of the central atom — bonding and lone — arrange themselves as far apart as possible to minimise repulsion; the number of such pairs (the steric number) fixes the electron geometry. Lone pairs are held only by one nucleus, so they spread out more and repel more strongly than bond pairs (lp–lp > lp–bp > bp–bp). That extra push squeezes the bond angles, which is why CH₄, NH₃ and H₂O, all with four electron pairs, have angles of 109.5°, 107° and 104.5°. The shape is named from the positions of atoms only, so lone pairs change the name (tetrahedral pairs with one lone pair give a pyramidal molecule). Hybridisation mixes atomic orbitals to produce equivalent orbitals pointing in exactly the directions VSEPR predicts: steric number 2, 3, 4, 5 and 6 correspond to sp, sp², sp³, sp³d and sp³d².",
      points: [
        "Steric number = number of σ-bonded atoms + number of lone pairs on the central atom.",
        "In trigonal bipyramidal geometry lone pairs occupy equatorial positions (SF₄ see-saw, ClF₃ T-shaped, XeF₂ linear).",
        "In octahedral geometry two lone pairs occupy opposite (trans) positions, giving square planar XeF₄; one lone pair gives square pyramidal BrF₅.",
        "Bond angles: CH₄ 109.5° > NH₃ 107° > H₂O 104.5° because the number of lone pairs increases.",
        "Symmetrical molecules have zero dipole moment even with polar bonds: CO₂, BF₃, CH₄, CCl₄, PCl₅, SF₆; NH₃ has a larger dipole moment than NF₃ because the lone-pair and bond moments reinforce in NH₃ but oppose in NF₃.",
        "In PCl₅ the axial P–Cl bonds are longer than the equatorial bonds because axial pairs experience more repulsion.",
        "Formal charge = valence electrons − non-bonding electrons − ½ (bonding electrons); the most stable Lewis structure has the smallest formal charges.",
        "Fajans' rules: covalent character increases with smaller, more highly charged cation and larger anion.",
      ],
      formulae: [
        {
          label: "Hybridisation count",
          expr: "H = ½ (V + M − C + A)",
          note: "V = valence e⁻ of central atom, M = monovalent atoms, C = cation charge, A = anion charge",
        },
        { label: "Formal charge", expr: "FC = V − L − ½B" },
        { label: "Dipole moment", expr: "μ = q × d", note: "unit debye; 1 D = 3.336 × 10⁻³⁰ C m" },
      ],
      table: {
        title: "Steric number, hybridisation and shape",
        columns: ["Bond pairs + lone pairs", "Hybridisation", "Shape", "Example"],
        rows: [
          ["2 + 0", "sp", "Linear", "BeCl₂, CO₂"],
          ["3 + 0", "sp²", "Trigonal planar", "BF₃"],
          ["4 + 0", "sp³", "Tetrahedral", "CH₄, NH₄⁺"],
          ["3 + 1", "sp³", "Trigonal pyramidal", "NH₃"],
          ["2 + 2", "sp³", "Bent", "H₂O"],
          ["5 + 0", "sp³d", "Trigonal bipyramidal", "PCl₅"],
          ["4 + 1", "sp³d", "See-saw", "SF₄"],
          ["3 + 2", "sp³d", "T-shaped", "ClF₃"],
          ["2 + 3", "sp³d", "Linear", "XeF₂, I₃⁻"],
          ["6 + 0", "sp³d²", "Octahedral", "SF₆"],
          ["5 + 1", "sp³d²", "Square pyramidal", "BrF₅"],
          ["4 + 2", "sp³d²", "Square planar", "XeF₄"],
        ],
      },
      pitfalls: [
        "Naming the shape from the electron geometry (calling NH₃ 'tetrahedral') instead of from atom positions.",
        "Assuming any molecule with polar bonds has a dipole moment; symmetry can cancel them.",
      ],
      vignette: {
        stem: "Predict the hybridisation and shape of XeF₄.",
        answer: "sp³d²; square planar.",
        reasoning:
          "Xe has 8 valence electrons; 4 are used in Xe–F bonds, leaving 4 electrons = 2 lone pairs. Steric number = 4 + 2 = 6 → sp³d², octahedral electron geometry. The two lone pairs sit trans to each other, leaving the four F atoms in a square plane.",
      },
      highYield:
        "Steric number 5: SF₄ see-saw, ClF₃ T-shape, XeF₂ linear; steric number 6: BrF₅ square pyramidal, XeF₄ square planar.",
      checks: [
        {
          q: "The shape of ClF₃ is:",
          options: ["Trigonal planar", "Trigonal pyramidal", "T-shaped", "See-saw"],
          answer: 2,
          why: "3 bond pairs + 2 lone pairs (sp³d); both lone pairs equatorial give a T-shape.",
        },
        {
          q: "Which molecule has zero dipole moment?",
          options: ["BF₃", "NH₃", "H₂O", "CHCl₃"],
          answer: 0,
          why: "Trigonal planar BF₃ is symmetrical, so the three B–F bond moments cancel.",
        },
      ],
    },
    {
      id: "mot-bond-order",
      title: "Molecular orbital theory and bond parameters",
      minutes: 7,
      summary:
        "Molecular orbital theory fills bonding and antibonding orbitals spread over the whole molecule, and correctly predicts bond order and magnetism — including O₂'s paramagnetism.",
      examFocus:
        "Bond order and unpaired electrons for O₂, O₂⁺, O₂⁻, O₂²⁻, N₂ and its ions, the s–p mixing order switch after N₂, ranking bond length and bond energy, and hydrogen bonding effects.",
      mechanism:
        "When atomic orbitals combine, constructive overlap builds a bonding MO with electron density between the nuclei (lower energy), and destructive overlap builds an antibonding MO with a node between them (higher energy). Bond order is half the excess of bonding over antibonding electrons; a higher bond order means more net 'glue', so a shorter and stronger bond, and a bond order of zero (He₂) means no molecule. For B₂, C₂ and N₂ (up to 14 electrons) 2s–2p mixing pushes σ2p above π2p, while from O₂ onward σ2p lies below π2p. In O₂ the last two electrons go singly into the two degenerate π* orbitals (Hund's rule), so O₂ has two unpaired electrons and is paramagnetic — something a simple Lewis structure cannot explain. Removing electrons from π* (O₂ → O₂⁺) raises bond order, while removing them from bonding orbitals (N₂ → N₂⁺) lowers it.",
      points: [
        "Bond order = ½ (Nb − Na); bond order 0 means the species does not exist (He₂).",
        "Order up to N₂: σ1s < σ*1s < σ2s < σ*2s < (π2px = π2py) < σ2pz < (π*2px = π*2py) < σ*2pz.",
        "Order from O₂: σ2pz lies below (π2px = π2py).",
        "Bond orders: N₂ 3, O₂⁺ 2.5, O₂ 2, O₂⁻ 1.5, O₂²⁻ 1, F₂ 1; B₂ 1 (paramagnetic), C₂ 2 (diamagnetic).",
        "Paramagnetic: O₂ (2 unpaired), O₂⁺, O₂⁻, B₂, N₂⁺; diamagnetic: N₂, C₂, F₂, O₂²⁻.",
        "Higher bond order → shorter bond and higher bond dissociation enthalpy: O₂⁺ < O₂ < O₂⁻ < O₂²⁻ in bond length.",
        "Intramolecular hydrogen bonding (o-nitrophenol) lowers boiling point and water solubility relative to intermolecular H-bonding (p-nitrophenol).",
      ],
      formulae: [
        { label: "Bond order", expr: "BO = ½ (Nb − Na)" },
        {
          label: "Spin-only magnetic moment",
          expr: "μ = √(n(n + 2)) BM",
          note: "n = unpaired electrons",
        },
        { label: "Trend", expr: "bond length ∝ 1/bond order" },
      ],
      table: {
        title: "Oxygen species",
        columns: ["Species", "Total electrons", "Bond order", "Unpaired e⁻", "Magnetic nature"],
        rows: [
          ["O₂⁺", "15", "2.5", "1", "Paramagnetic"],
          ["O₂", "16", "2", "2", "Paramagnetic"],
          ["O₂⁻ (superoxide)", "17", "1.5", "1", "Paramagnetic"],
          ["O₂²⁻ (peroxide)", "18", "1", "0", "Diamagnetic"],
        ],
      },
      pitfalls: [
        "Using the O₂-type orbital order for N₂ — it changes which orbital loses the electron in N₂⁺.",
        "Calling O₂ diamagnetic because its Lewis structure shows all electrons paired.",
      ],
      vignette: {
        stem: "Find the bond order of N₂⁺ and state whether it is paramagnetic.",
        answer: "Bond order 2.5; paramagnetic.",
        reasoning:
          "N₂⁺ has 13 electrons: σ1s² σ*1s² σ2s² σ*2s² (π2p)⁴ σ2pz¹. Nb = 2 + 2 + 4 + 1 = 9, Na = 2 + 2 = 4. BO = ½(9 − 4) = 2.5. One unpaired electron in σ2pz makes it paramagnetic.",
      },
      highYield:
        "BO = ½(Nb − Na); O₂ is paramagnetic with two unpaired π* electrons; σ2p sits above π2p only up to N₂.",
      checks: [
        {
          q: "Which species has the shortest bond?",
          options: ["O₂²⁻", "O₂⁻", "O₂", "O₂⁺"],
          answer: 3,
          why: "O₂⁺ has the highest bond order (2.5) in the series, so the shortest bond.",
        },
        {
          q: "Which of the following is diamagnetic?",
          options: ["O₂", "B₂", "C₂", "O₂⁻"],
          answer: 2,
          why: "C₂ has 12 electrons with (π2p)⁴ completely paired; the others have unpaired electrons.",
        },
      ],
    },
    {
      id: "p-block-13-14",
      title: "p-Block: groups 13 and 14",
      minutes: 7,
      summary:
        "Groups 13 and 14 show the main p-block themes: the first element behaves differently, the lower oxidation state becomes more stable down the group (inert pair effect), and electron-deficient compounds act as Lewis acids.",
      examFocus:
        "Inert pair effect (Tl⁺, Pb²⁺), Ga smaller than Al, Lewis acidity of boron halides, boric acid as a Lewis acid, diborane bonding, anomalous behaviour of B and C, and allotropes of carbon.",
      mechanism:
        "Down groups 13 and 14 the ns² pair becomes increasingly reluctant to take part in bonding, partly because poorly shielding d and f electrons leave it tightly held; this inert pair effect makes the oxidation state two below the group valency more stable (Tl⁺ over Tl³⁺, Pb²⁺ over Pb⁴⁺). The same poor shielding by 3d electrons explains why gallium is slightly smaller than aluminium. Boron's compounds have only six electrons around boron, so BX₃ and B(OH)₃ accept electron pairs; B(OH)₃ is acidic not by releasing its own H⁺ but by accepting OH⁻ from water. The first members (B, C) are small, highly electronegative and lack d-orbitals, so their maximum covalency is four and C forms strong pπ–pπ multiple bonds (CO₂ is a gas of discrete molecules), whereas Si cannot, and SiO₂ is a giant network solid.",
      points: [
        "Group 13 valence configuration ns² np¹; group 14 ns² np²; stability of +1 (group 13) and +2 (group 14) rises down the group.",
        "Tl⁺ is more stable than Tl³⁺; Pb⁴⁺ is a strong oxidising agent; Sn²⁺ is a reducing agent.",
        "Atomic radius of Ga (135 pm) is less than Al (143 pm) because the 3d electrons shield poorly.",
        "Lewis acid strength: BF₃ < BCl₃ < BBr₃, because pπ–pπ back donation from F to B is most effective (similar orbital size).",
        "Boric acid is a weak monobasic Lewis acid: B(OH)₃ + 2H₂O → [B(OH)₄]⁻ + H₃O⁺.",
        "Diborane B₂H₆ has four terminal 2-centre-2-electron B–H bonds and two bridging 3-centre-2-electron B–H–B bonds.",
        "Carbon shows the greatest catenation; CCl₄ is not hydrolysed but SiCl₄ is (Si has vacant 3d orbitals); [SiF₆]²⁻ exists, [CF₆]²⁻ does not.",
        "Allotropes of carbon: diamond (sp³, hard, insulator), graphite (sp², layered, conducts), fullerene C₆₀ (sp², 20 hexagons and 12 pentagons).",
      ],
      formulae: [
        { label: "Boric acid ionisation", expr: "B(OH)₃ + 2H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺" },
        { label: "Lewis acidity", expr: "BF₃ < BCl₃ < BBr₃" },
        { label: "Inert pair stability", expr: "Tl⁺ > Tl³⁺; Pb²⁺ > Pb⁴⁺" },
      ],
      table: {
        title: "Anomalous first members",
        columns: ["Feature", "Boron / Carbon", "Heavier members"],
        rows: [
          ["Maximum covalency", "4 (no d-orbitals)", "Can exceed 4 (e.g. [AlF₆]³⁻, [SiF₆]²⁻)"],
          ["Multiple bonding", "Strong pπ–pπ (C=C, C≡C, C=O)", "Weak"],
          ["Oxide structure", "CO₂ discrete linear molecules", "SiO₂ 3-D network solid"],
          ["Character", "B non-metal; C non-metal", "Al metal; Sn, Pb metals"],
        ],
      },
      pitfalls: [
        "Explaining boric acid's acidity as loss of its own proton — it is a Lewis acid accepting OH⁻.",
        "Expecting BF₃ to be the strongest Lewis acid of the boron halides because F is most electronegative; back bonding reverses the order.",
      ],
      vignette: {
        stem: "PbO₂ oxidises concentrated HCl to Cl₂, but SnO₂ does not. Explain using group trends.",
        answer:
          "Inert pair effect: Pb prefers +2, so Pb(IV) readily gains electrons; Sn(IV) is stable.",
        reasoning:
          "Down group 14 the +2 state becomes more stable. Pb(IV) in PbO₂ is unstable relative to Pb(II), so it acts as a strong oxidant, accepting 2 electrons from chloride. For tin the +4 state is the stable one, so SnO₂ has no such tendency.",
      },
      highYield:
        "Inert pair effect: Tl⁺ and Pb²⁺ stable; Ga < Al in size; BF₃ < BCl₃ < BBr₃ (Lewis acid); diborane has two 3c–2e bridges.",
      checks: [
        {
          q: "Boric acid is best described as:",
          options: [
            "A tribasic protonic acid",
            "A monobasic Lewis acid",
            "A strong Brønsted acid",
            "An amphoteric hydroxide",
          ],
          answer: 1,
          why: "It accepts OH⁻ from water to form [B(OH)₄]⁻ and releases H₃O⁺, behaving as a weak monobasic Lewis acid.",
        },
        {
          q: "The number of 3-centre-2-electron bonds in diborane is:",
          options: ["4", "1", "6", "2"],
          answer: 3,
          why: "There are two bridging B–H–B bonds; the other four B–H bonds are normal 2c–2e terminal bonds.",
        },
      ],
    },
    {
      id: "p-block-15-18",
      title: "p-Block: groups 15 to 18 trends",
      minutes: 8,
      summary:
        "Groups 15–18 show the same size-driven trends — falling hydride stability, rising acid strength of hydrides, inert pair effect and anomalous first members — plus the chemistry of halogens and noble gases.",
      examFocus:
        "Trends in hydride basicity/acidity and stability, oxidation-state stability, bond enthalpy of halogens (F₂ anomaly), oxoacid acid strength, basicity of phosphorus oxoacids, and shapes of interhalogens and xenon fluorides.",
      mechanism:
        "Going down groups 15–17 the central atom becomes larger, so its bond to hydrogen gets longer and weaker; hydrides therefore become less thermally stable, better reducing agents and (for groups 16 and 17) stronger acids because the H–X bond breaks more easily — HF is the weakest hydrohalic acid despite fluorine's electronegativity. Basicity of group 15 hydrides falls from NH₃ to BiH₃ because the lone pair spreads over a larger, more diffuse orbital. The first member of each group (N, O, F) is small, highly electronegative and has no d-orbitals, so it forms pπ–pπ multiple bonds (N≡N, O=O), shows strong hydrogen bonding and cannot expand its octet. The F–F bond is unusually weak because the lone pairs on two very small atoms repel strongly. In oxoacids, each extra oxygen on the central atom pulls electron density and stabilises the conjugate base by delocalising the negative charge, so acid strength rises with the number of oxygens (HClO₄ strongest of the chlorine oxoacids).",
      points: [
        "Group 15: basicity NH₃ > PH₃ > AsH₃ > SbH₃ > BiH₃; thermal stability falls and reducing character rises in the same direction.",
        "Stability of +5 state decreases and +3 increases down group 15 (inert pair effect); Bi(V) is a strong oxidant.",
        "Basicity of phosphorus oxoacids = number of P–OH groups: H₃PO₂ monobasic, H₃PO₃ dibasic, H₃PO₄ tribasic; P–H bonds make H₃PO₂ and H₃PO₃ reducing.",
        "Group 16 hydrides: acid strength H₂O < H₂S < H₂Se < H₂Te; water is a liquid because of extensive hydrogen bonding.",
        "Group 17: bond dissociation enthalpy Cl₂ > Br₂ > F₂ > I₂; acid strength HF < HCl < HBr < HI; fluorine shows only −1 oxidation state.",
        "Chlorine oxoacid strength: HOCl < HClO₂ < HClO₃ < HClO₄; for hypohalous acids HOCl > HOBr > HOI.",
        "Interhalogen shapes: ClF₃ T-shaped, BrF₅ square pyramidal, IF₇ pentagonal bipyramidal.",
        "Group 18: Bartlett made the first noble gas compound (Xe⁺PtF₆⁻) after O₂⁺PtF₆⁻, because the ionisation enthalpies of Xe and O₂ are similar; XeF₂ linear, XeF₄ square planar, XeF₆ distorted octahedral.",
      ],
      formulae: [
        { label: "Group 16 hydride acidity", expr: "H₂O < H₂S < H₂Se < H₂Te" },
        { label: "Halogen bond enthalpy", expr: "Cl₂ > Br₂ > F₂ > I₂" },
        { label: "Hydrohalic acid strength", expr: "HF < HCl < HBr < HI" },
        { label: "Oxoacid basicity", expr: "basicity = number of ionisable P–OH groups" },
      ],
      table: {
        title: "Down-the-group trends for hydrides",
        columns: [
          "Property",
          "Group 15 (NH₃ → BiH₃)",
          "Group 16 (H₂O → H₂Te)",
          "Group 17 (HF → HI)",
        ],
        rows: [
          ["Bond strength E–H", "Decreases", "Decreases", "Decreases"],
          ["Thermal stability", "Decreases", "Decreases", "Decreases"],
          ["Reducing character", "Increases", "Increases", "Increases"],
          ["Acid / base nature", "Basicity decreases", "Acidity increases", "Acidity increases"],
        ],
      },
      pitfalls: [
        "Calling HF the strongest acid because F is the most electronegative — the very strong H–F bond makes it the weakest.",
        "Counting all hydrogens in H₃PO₃ as acidic; one H is bonded directly to P and is not ionisable.",
      ],
      vignette: {
        stem: "How many moles of NaOH are needed to completely neutralise 1 mol of H₃PO₃? Justify from its structure.",
        answer: "2 mol.",
        reasoning:
          "H₃PO₃ has the structure HP(O)(OH)₂: one H is bonded directly to P and is not ionisable, and two are in P–OH groups. It is dibasic, so 1 mol needs 2 mol of NaOH, forming Na₂HPO₃.",
      },
      highYield:
        "HF weakest hydrohalic acid; bond enthalpy Cl₂ > Br₂ > F₂ > I₂; H₃PO₂/H₃PO₃/H₃PO₄ are mono/di/tribasic; HClO₄ strongest chlorine oxoacid.",
      checks: [
        {
          q: "Which is the strongest acid?",
          options: ["H₂O", "H₂S", "H₂Te", "H₂Se"],
          answer: 2,
          why: "The H–Te bond is longest and weakest, so H₂Te ionises most easily.",
        },
        {
          q: "The halogen with the lowest X–X bond dissociation enthalpy among F₂, Cl₂, Br₂ and I₂ is:",
          options: ["I₂", "F₂", "Cl₂", "Br₂"],
          answer: 0,
          why: "Order is Cl₂ > Br₂ > F₂ > I₂; F₂ is anomalously low but I₂ is lowest of all.",
        },
      ],
    },
    {
      id: "d-f-block",
      title: "d- and f-block elements",
      minutes: 9,
      summary:
        "Transition metals have partly filled d-orbitals, which give them variable oxidation states, coloured ions, paramagnetism and catalytic ability; lanthanoids show steady contraction in size.",
      examFocus:
        "Electronic configurations (Cr, Cu), spin-only magnetic moments, why some ions are colourless, lanthanoid contraction (Zr/Hf), common oxidation states (+3 for lanthanoids, Ce⁴⁺, Eu²⁺), and the preparation and redox reactions of KMnO₄ and K₂Cr₂O₇.",
      mechanism:
        "Because the (n−1)d and ns orbitals are close in energy, transition metals can lose a variable number of electrons, giving several oxidation states, with the maximum around the middle of the series (Mn up to +7). In a complex or a hydrated ion the ligands split the d-orbitals; an electron can absorb visible light to jump between them (d–d transition), and the colour we see is the complementary colour — so d⁰ (Sc³⁺, Ti⁴⁺) and d¹⁰ (Zn²⁺, Cu⁺) ions are colourless. Unpaired d-electrons make the ions paramagnetic, with spin-only moment √(n(n + 2)) BM. In the lanthanoids electrons enter 4f orbitals that shield the outer electrons very poorly, so effective nuclear charge rises steadily and the radii shrink across the series — the lanthanoid contraction — which makes the 5d elements almost the same size as their 4d partners (Zr and Hf). KMnO₄ and K₂Cr₂O₇ are powerful oxidants because Mn(VII) and Cr(VI) strongly favour lower states in acid: MnO₄⁻ takes 5 electrons to become Mn²⁺ and Cr₂O₇²⁻ takes 6 to become 2Cr³⁺.",
      points: [
        "Cr = [Ar] 3d⁵ 4s¹, Cu = [Ar] 3d¹⁰ 4s¹; on ionisation 4s electrons are lost before 3d (Fe²⁺ = 3d⁶).",
        "Zn, Cd and Hg have full d¹⁰ configurations in their ground state and common ions, so they are not regarded as transition elements.",
        "Spin-only moment μ = √(n(n + 2)) BM: n = 1 → 1.73, 2 → 2.83, 3 → 3.87, 4 → 4.90, 5 → 5.92 BM.",
        "Lanthanoids commonly show +3; Ce⁴⁺ is an oxidant (goes to Ce³⁺) and Eu²⁺ a reductant (goes to Eu³⁺); actinoid contraction is greater than lanthanoid contraction because 5f shields even less.",
        "K₂Cr₂O₇ from chromite (FeCr₂O₄): fuse with Na₂CO₃ in air → Na₂CrO₄ → acidify → Na₂Cr₂O₇ → KCl → K₂Cr₂O₇; dichromate (orange) ⇌ chromate (yellow) depends on pH.",
        "KMnO₄: fuse MnO₂ with KOH and an oxidant (KNO₃) → green K₂MnO₄, which disproportionates in neutral/acid solution or is oxidised electrolytically to purple KMnO₄.",
        "Acidic MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O; neutral/faintly alkaline MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻; Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.",
        "KMnO₄ titrations use H₂SO₄, not HCl, because HCl would be oxidised to Cl₂; KMnO₄ acts as its own indicator.",
      ],
      formulae: [
        { label: "Spin-only moment", expr: "μ = √(n(n + 2)) BM" },
        { label: "Permanganate (acid)", expr: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O" },
        { label: "Dichromate (acid)", expr: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O" },
        { label: "Chromate–dichromate", expr: "2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O" },
      ],
      table: {
        title: "3d ions: electrons and magnetism",
        columns: ["Ion", "Configuration", "Unpaired e⁻", "μ (BM)", "Colour in water"],
        rows: [
          ["Sc³⁺", "3d⁰", "0", "0", "Colourless"],
          ["Ti³⁺", "3d¹", "1", "1.73", "Purple"],
          ["Cr³⁺", "3d³", "3", "3.87", "Violet"],
          ["Mn²⁺", "3d⁵", "5", "5.92", "Pale pink"],
          ["Fe³⁺", "3d⁵", "5", "5.92", "Yellow"],
          ["Cu²⁺", "3d⁹", "1", "1.73", "Blue"],
          ["Zn²⁺", "3d¹⁰", "0", "0", "Colourless"],
        ],
      },
      pitfalls: [
        "Removing 3d electrons before 4s when writing ion configurations (Fe²⁺ is 3d⁶, not 3d⁴4s²).",
        "Assuming every transition metal ion is coloured — d⁰ and d¹⁰ ions cannot show d–d transitions.",
      ],
      vignette: {
        stem: "Calculate the spin-only magnetic moment of Fe²⁺ (Z = 26) in a weak-field (high-spin) environment.",
        answer: "About 4.90 BM.",
        reasoning:
          "Fe = [Ar] 3d⁶ 4s²; Fe²⁺ = [Ar] 3d⁶. High spin: five d-orbitals take one electron each, the sixth pairs, leaving 4 unpaired. μ = √(4 × 6) = √24 ≈ 4.90 BM.",
      },
      highYield:
        "μ = √(n(n + 2)); d⁰ and d¹⁰ ions colourless; lanthanoid contraction makes Zr ≈ Hf; MnO₄⁻ gains 5e⁻ and Cr₂O₇²⁻ 6e⁻ in acid.",
      checks: [
        {
          q: "Which ion has a spin-only magnetic moment of 3.87 BM?",
          options: ["Cr³⁺", "Mn²⁺", "Cu²⁺", "Ti³⁺"],
          answer: 0,
          why: "Cr³⁺ is 3d³ with 3 unpaired electrons: √(3 × 5) = √15 ≈ 3.87 BM.",
        },
        {
          q: "Zr and Hf have almost identical atomic radii because of:",
          options: [
            "Inert pair effect",
            "Lanthanoid contraction",
            "Actinoid contraction",
            "Diagonal relationship",
          ],
          answer: 1,
          why: "Poor shielding by 14 intervening 4f electrons cancels the expected size increase from Zr (4d) to Hf (5d).",
        },
      ],
    },
    {
      id: "coordination-compounds",
      title: "Coordination compounds",
      minutes: 9,
      summary:
        "A central metal bound to ligands by coordinate bonds; naming, isomerism, and the bonding models (VBT and CFT) that explain geometry, colour and magnetism.",
      examFocus:
        "IUPAC names and formulae, counting geometrical and optical isomers, structural isomerism types, hybridisation and unpaired electrons via VBT, crystal-field splitting and the spectrochemical series, and Werner's conductivity/AgCl data.",
      mechanism:
        "Ligands donate lone pairs into vacant metal orbitals, so the number of donor atoms (coordination number) and the d-electron count of the metal fix the geometry. In crystal field theory the ligands are treated as point charges: in an octahedron the eg orbitals point straight at the ligands and are pushed up, while the t2g orbitals lie between them, giving a splitting Δo. If Δo is larger than the pairing energy (strong-field ligands such as CN⁻ and CO), electrons pair up in t2g before entering eg, giving low-spin, often diamagnetic complexes; weak-field ligands (F⁻, H₂O) give high-spin complexes with more unpaired electrons. Absorption of light to promote an electron from t2g to eg gives colour, and a stronger-field ligand absorbs at shorter wavelength. Valence bond theory says the same thing in hybridisation language: inner-orbital d²sp³ complexes are low spin, outer-orbital sp³d² complexes are high spin.",
      points: [
        "Werner: primary valency = oxidation state (ionisable, satisfied by anions); secondary valency = coordination number (non-ionisable, fixed geometry). CoCl₃·6NH₃, ·5NH₃, ·4NH₃ precipitate 3, 2 and 1 mol AgCl respectively.",
        "Naming: cation first; ligands in alphabetical order before the metal; anionic ligands end in -ido (chlorido, cyanido); neutral: aqua, ammine, carbonyl; anionic complex takes -ate (ferrate, cuprate, argentate, plumbate).",
        "Spectrochemical series (increasing Δ): I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO.",
        "Δt = (4/9) Δo, so tetrahedral complexes are almost always high spin.",
        "[Co(NH₃)₆]³⁺ is d²sp³, low spin, diamagnetic; [CoF₆]³⁻ is sp³d², high spin, 4 unpaired electrons.",
        "[Ni(CN)₄]²⁻ is square planar (dsp²) and diamagnetic; [NiCl₄]²⁻ is tetrahedral (sp³) with 2 unpaired electrons; [Ni(CO)₄] is tetrahedral and diamagnetic.",
        "Structural isomerism: ionisation ([Co(NH₃)₅SO₄]Br / [Co(NH₃)₅Br]SO₄), linkage (–NO₂ / –ONO), coordination ([Co(NH₃)₆][Cr(CN)₆] / [Cr(NH₃)₆][Co(CN)₆]), solvate/hydrate (CrCl₃·6H₂O).",
        "Stereoisomerism: [MA₄B₂] cis/trans; [MA₃B₃] fac/mer; cis-[M(AA)₂B₂] is optically active, trans is not; [M(AA)₃] exists as a pair of enantiomers.",
      ],
      formulae: [
        {
          label: "Crystal field stabilisation (octahedral)",
          expr: "CFSE = (−0.4 x + 0.6 y) Δo",
          note: "x = t2g electrons, y = eg electrons",
        },
        { label: "Tetrahedral splitting", expr: "Δt = (4/9) Δo" },
        {
          label: "Oxidation state of metal",
          expr: "x + Σ(ligand charges) = charge on complex ion",
        },
        { label: "Spin-only moment", expr: "μ = √(n(n + 2)) BM" },
      ],
      table: {
        title: "Common geometries and isomer counts",
        columns: ["Type", "Geometry", "Isomers"],
        rows: [
          ["[MA₄B₂]", "Octahedral", "2 geometrical (cis, trans); none optically active"],
          ["[MA₃B₃]", "Octahedral", "2 geometrical (fac, mer)"],
          ["[M(AA)₂B₂]", "Octahedral", "cis (pair of enantiomers) + trans = 3 stereoisomers"],
          ["[M(AA)₃]", "Octahedral", "2 optical isomers (d and l)"],
          ["[MA₂B₂]", "Square planar", "2 geometrical (cis, trans)"],
          ["[MA₂B₂]", "Tetrahedral", "No geometrical isomers"],
        ],
      },
      pitfalls: [
        "Forgetting that tetrahedral complexes show no geometrical isomerism.",
        "Deciding spin from the metal alone; the same Co³⁺ is low spin with NH₃ and high spin with F⁻.",
      ],
      vignette: {
        stem: "Give the IUPAC name, oxidation state of iron and number of unpaired electrons in K₃[Fe(CN)₆].",
        answer: "Potassium hexacyanidoferrate(III); Fe +3; 1 unpaired electron.",
        reasoning:
          "Charge balance: 3(+1) + x + 6(−1) = 0 → x = +3, so Fe³⁺ is 3d⁵. CN⁻ is strong field, so all five electrons go into t2g (t2g⁵), leaving 1 unpaired electron (d²sp³, inner orbital). Anionic complex → 'ferrate'.",
      },
      highYield:
        "Strong field (CN⁻, CO) → low spin, inner-orbital d²sp³; weak field (F⁻, H₂O) → high spin, outer-orbital sp³d²; Δt = 4/9 Δo.",
      checks: [
        {
          q: "The number of geometrical isomers of [Co(NH₃)₄Cl₂]⁺ is:",
          options: ["1", "3", "2", "4"],
          answer: 2,
          why: "An [MA₄B₂] octahedral complex has cis and trans forms only.",
        },
        {
          q: "Which complex is paramagnetic?",
          options: ["[Ni(CN)₄]²⁻", "[Co(NH₃)₆]³⁺", "[Ni(CO)₄]", "[NiCl₄]²⁻"],
          answer: 3,
          why: "Tetrahedral [NiCl₄]²⁻ with weak-field Cl⁻ keeps two unpaired 3d electrons (Ni²⁺, 3d⁸).",
        },
      ],
    },
    {
      id: "salt-analysis",
      title: "Salt analysis: cations and anions",
      minutes: 8,
      summary:
        "Qualitative analysis separates cations into groups by precipitating them with group reagents in a fixed order, then confirms each ion with a characteristic colour or precipitate.",
      examFocus:
        "Group reagents and the reason for the acidic/ammoniacal medium, colours of characteristic precipitates and flames, the brown ring test for nitrate, and confirmatory tests for Fe³⁺, Cu²⁺, Ni²⁺, Pb²⁺, Ba²⁺ and halides.",
      mechanism:
        "Group separation is applied ionic equilibrium. In group II, H₂S is passed in dilute HCl: the common ion H⁺ suppresses ionisation of H₂S, so [S²⁻] stays very low and only sulphides with very small Ksp (CuS, PbS) exceed their solubility product. In group IV, H₂S is passed in ammoniacal solution; OH⁻ removes H⁺, [S²⁻] rises, and sulphides with larger Ksp (ZnS, NiS) now precipitate. In group III, NH₄Cl is added with NH₄OH so that the common ion NH₄⁺ suppresses ionisation of NH₄OH; [OH⁻] stays just high enough to precipitate Fe(OH)₃ and Al(OH)₃ (very low Ksp) but not Mg(OH)₂ or group IV hydroxides. Each group is therefore removed before the next reagent is added, and the leftover ions reach their own group cleanly.",
      points: [
        "Group 0: NH₄⁺ — heat with NaOH gives NH₃; with Nessler's reagent a brown precipitate.",
        "Group I: Pb²⁺ with dilute HCl → white PbCl₂, soluble in hot water; confirm with KI (yellow PbI₂) or K₂CrO₄ (yellow PbCrO₄).",
        "Group II: Cu²⁺ (and Pb²⁺) with H₂S in dilute HCl → black CuS; Cu²⁺ + excess NH₃ → deep blue [Cu(NH₃)₄]²⁺; with K₄[Fe(CN)₆] → chocolate-brown precipitate.",
        "Group III: Fe³⁺, Al³⁺ with NH₄OH + NH₄Cl → reddish-brown Fe(OH)₃ / white gelatinous Al(OH)₃; Fe³⁺ + K₄[Fe(CN)₆] → Prussian blue, + KSCN → blood-red colour; Al³⁺ → blue lake test.",
        "Group IV: Zn²⁺, Ni²⁺ with H₂S in ammoniacal medium → white ZnS / black NiS; Ni²⁺ + dimethylglyoxime → rosy-red precipitate.",
        "Group V: Ca²⁺, Ba²⁺ with (NH₄)₂CO₃ + NH₄OH + NH₄Cl → white carbonates; Ca²⁺ flame brick red, ammonium oxalate gives white precipitate; Ba²⁺ flame apple green, K₂CrO₄ gives yellow BaCrO₄.",
        "Group VI: Mg²⁺ — with disodium hydrogen phosphate (in ammoniacal medium) a white precipitate of Mg(NH₄)PO₄.",
        "Anions: CO₃²⁻ effervescence turns lime water milky; S²⁻ blackens lead acetate paper and gives violet colour with sodium nitroprusside; NO₂⁻ gives brown fumes with dilute H₂SO₄; NO₃⁻ brown ring [Fe(H₂O)₅(NO)]²⁺; SO₄²⁻ white BaSO₄ insoluble in HCl; Cl⁻/Br⁻/I⁻ with AgNO₃ white (soluble in NH₄OH) / pale yellow (partly soluble) / yellow (insoluble).",
      ],
      formulae: [
        {
          label: "Group II condition",
          expr: "[M²⁺][S²⁻] > Ksp only for very insoluble sulphides",
          note: "H⁺ lowers [S²⁻]",
        },
        { label: "Brown ring", expr: "[Fe(H₂O)₆]²⁺ + NO → [Fe(H₂O)₅(NO)]²⁺ + H₂O" },
        { label: "Prussian blue", expr: "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃" },
      ],
      flow: {
        title: "Cation group separation (one solution, in order)",
        steps: [
          { label: "Group 0", detail: "Test original salt for NH₄⁺ with NaOH and heat." },
          { label: "Group I — dil. HCl", detail: "Pb²⁺ as white PbCl₂." },
          { label: "Group II — H₂S in dil. HCl", detail: "Cu²⁺ as black CuS (low [S²⁻])." },
          {
            label: "Group III — NH₄Cl + NH₄OH",
            detail: "Fe³⁺, Al³⁺ as hydroxides (controlled [OH⁻]).",
          },
          {
            label: "Group IV — H₂S in NH₄OH",
            detail: "Zn²⁺ (white ZnS), Ni²⁺ (black NiS) (high [S²⁻]).",
          },
          {
            label: "Group V — (NH₄)₂CO₃ in NH₄OH/NH₄Cl",
            detail: "Ca²⁺, Ba²⁺ as white carbonates.",
          },
          { label: "Group VI", detail: "Mg²⁺ with Na₂HPO₄ — white Mg(NH₄)PO₄." },
        ],
      },
      pitfalls: [
        "Forgetting why group II needs acid — without H⁺ the higher [S²⁻] would precipitate ZnS and NiS too.",
        "Mixing up Prussian blue (Fe³⁺ + ferrocyanide) with the chocolate-brown precipitate (Cu²⁺ + ferrocyanide).",
      ],
      vignette: {
        stem: "An aqueous salt gives no precipitate with dilute HCl or with H₂S in acid, but on adding NH₄Cl and NH₄OH a reddish-brown precipitate forms. The original solution gives a blood-red colour with KSCN. Identify the cation.",
        answer: "Fe³⁺.",
        reasoning:
          "Absence of group I and II precipitates rules out Pb²⁺ and Cu²⁺. A reddish-brown group III precipitate is Fe(OH)₃ (Al(OH)₃ would be white). The blood-red [Fe(SCN)]²⁺ colour with thiocyanate confirms Fe³⁺.",
      },
      highYield:
        "Group II: H₂S in acid (low S²⁻); group IV: H₂S in NH₄OH (high S²⁻); NH₄Cl in group III suppresses OH⁻; Ni²⁺ + DMG rosy red; Fe³⁺ + KSCN blood red.",
      checks: [
        {
          q: "NH₄Cl is added before NH₄OH in group III analysis to:",
          options: [
            "Increase the concentration of OH⁻",
            "Suppress the ionisation of NH₄OH so that group IV and Mg²⁺ hydroxides do not precipitate",
            "Convert Fe²⁺ to Fe³⁺",
            "Dissolve Al(OH)₃",
          ],
          answer: 1,
          why: "Common ion NH₄⁺ lowers [OH⁻], so only the very insoluble Fe(OH)₃ and Al(OH)₃ exceed Ksp.",
        },
        {
          q: "A rosy-red precipitate with dimethylglyoxime in ammoniacal solution confirms:",
          options: ["Zn²⁺", "Cu²⁺", "Co²⁺", "Ni²⁺"],
          answer: 3,
          why: "Ni²⁺ forms the red nickel–dimethylglyoxime chelate.",
        },
      ],
    },
  ],
};
