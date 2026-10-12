import type { LearnModule } from "../../learn";

export const physicalChemistry: LearnModule = {
  slug: "physical-chemistry",
  group: "Chemistry",
  subject: "Chemistry",
  title: "Physical Chemistry",
  icon: "science",
  blurb:
    "Mole concept, atomic structure, thermodynamics, chemical and ionic equilibrium, solutions, electrochemistry and chemical kinetics — the numericals NEET never skips.",
  objectives: [
    "Learner can convert between mass, moles, particles and concentration terms and find the limiting reagent.",
    "Learner can apply Bohr's model, quantum numbers and node formulae to hydrogen-like species.",
    "Learner can predict spontaneity from ΔH, ΔS and ΔG and relate ΔG° to K and E°cell.",
    "Learner can solve equilibrium, pH, buffer, Ksp and colligative-property numericals in under a minute each.",
    "Learner can use the Nernst equation, Kohlrausch's law and integrated rate laws, including half-life and Arrhenius problems.",
  ],
  concepts: [
    {
      id: "mole-concept",
      title: "Mole concept and stoichiometry",
      minutes: 7,
      summary:
        "The mole is the chemist's counting unit; every stoichiometry question is a conversion to moles, a ratio from the balanced equation, and a conversion back.",
      examFocus:
        "Limiting reagent with mass data, number of atoms or molecules in a given mass, molarity/molality/mole fraction conversions, and empirical-formula problems from percentage composition.",
      mechanism:
        "A balanced equation is a statement about numbers of particles, not masses, because atoms are conserved one by one during a reaction. Since 1 mol of anything contains the same number of particles (6.022 × 10²³), the coefficients can be read directly as mole ratios. Masses differ only because particles have different molar masses, so you must convert grams to moles before using the coefficients. The reactant that runs out first — the one giving the smaller amount of product — fixes the yield, and is called the limiting reagent. Concentration terms are just different ways of reporting moles of solute against volume of solution (molarity), mass of solvent (molality) or total moles (mole fraction); molality and mole fraction do not change with temperature because masses do not.",
      points: [
        "1 mol = 6.022 × 10²³ particles (Avogadro constant, NA); molar mass in g mol⁻¹ equals the atomic or molecular mass in u.",
        "Moles n = mass / molar mass = number of particles / NA = volume of gas at STP / molar volume.",
        "Molar volume of an ideal gas: 22.4 L at 273 K and 1 atm; 22.7 L at 273.15 K and 1 bar (current STP).",
        "Molarity M = moles of solute / volume of solution in L; molality m = moles of solute / mass of solvent in kg.",
        "Mole fractions of all components add up to 1; molarity changes with temperature, molality does not.",
        "Empirical formula = simplest whole-number ratio of atoms; molecular formula = n × empirical formula, where n = molar mass / empirical formula mass.",
        "Law of conservation of mass, definite proportions, multiple proportions and Gay-Lussac's law of gaseous volumes all follow from atoms combining in whole-number ratios.",
      ],
      formulae: [
        { label: "Moles", expr: "n = m / M = N / NA", note: "m in g, M in g mol⁻¹" },
        { label: "Molarity", expr: "M = n(solute) / V(solution in L)" },
        { label: "Molality", expr: "m = n(solute) / W(solvent in kg)" },
        { label: "Dilution", expr: "M₁V₁ = M₂V₂", note: "moles of solute unchanged" },
        { label: "Mole fraction", expr: "xA = nA / (nA + nB)", note: "xA + xB = 1" },
      ],
      table: {
        title: "Concentration terms at a glance",
        columns: ["Term", "Definition", "Unit", "Depends on temperature?"],
        rows: [
          ["Molarity (M)", "mol solute per L solution", "mol L⁻¹", "Yes (volume changes)"],
          ["Molality (m)", "mol solute per kg solvent", "mol kg⁻¹", "No"],
          ["Mole fraction (x)", "mol of component / total mol", "none", "No"],
          ["Mass percent", "g solute per 100 g solution", "%", "No"],
          ["ppm", "parts of solute per 10⁶ parts solution", "none", "No (by mass)"],
        ],
      },
      pitfalls: [
        "Using the given masses directly in the coefficient ratio instead of converting to moles first.",
        "Counting molecules when the question asks for atoms (0.5 mol NH₃ has 0.5 NA molecules but 2 NA atoms).",
      ],
      vignette: {
        stem: "4 g of H₂ is mixed with 16 g of O₂ and the mixture is exploded to form water. What mass of water forms and which gas is left over?",
        answer: "18 g of water; 2 g of H₂ remains.",
        reasoning:
          "2H₂ + O₂ → 2H₂O. Moles H₂ = 4/2 = 2 mol; moles O₂ = 16/32 = 0.5 mol. 0.5 mol O₂ needs only 1 mol H₂, so O₂ is limiting. It gives 2 × 0.5 = 1 mol H₂O = 18 g. H₂ left = 2 − 1 = 1 mol = 2 g.",
      },
      highYield:
        "Always go grams → moles → coefficient ratio → moles → grams; the reactant giving less product is limiting.",
      checks: [
        {
          q: "4 g of NaOH (M = 40 g mol⁻¹) is dissolved to make 250 mL of solution. The molarity is:",
          options: ["0.1 M", "0.4 M", "0.25 M", "1.6 M"],
          answer: 1,
          why: "n = 4/40 = 0.1 mol; M = 0.1 / 0.250 L = 0.4 M.",
        },
        {
          q: "Total number of atoms in 0.5 mol of NH₃ is:",
          options: ["0.5 NA", "1.5 NA", "4 NA", "2 NA"],
          answer: 3,
          why: "Each NH₃ has 4 atoms, so 0.5 × 4 = 2 mol of atoms = 2 NA.",
        },
      ],
    },
    {
      id: "atomic-structure",
      title: "Atomic structure: Bohr model and quantum numbers",
      minutes: 9,
      summary:
        "Bohr's model gives exact energies and radii for one-electron species; the quantum-mechanical model gives orbitals, quantum numbers, nodes and filling rules for all atoms.",
      examFocus:
        "Energy, radius and velocity ratios for H-like ions, spectral-line wavelengths and line counts, allowed sets of quantum numbers, radial/angular node counts, and exceptional configurations (Cr, Cu).",
      mechanism:
        "In Bohr's picture the electron's angular momentum is quantised (mvr = nh/2π), so only certain orbits are allowed. Balancing the nuclear attraction against the circular motion then forces the radius to grow as n²/Z and the energy to become less negative as Z²/n², which is why energy levels crowd together at high n. A spectral line is emitted when the electron falls between two levels, and its wavenumber depends on the difference 1/n₁² − 1/n₂². The quantum-mechanical model replaces orbits with orbitals: the Schrödinger equation gives the principal (n), azimuthal (l = 0 to n − 1) and magnetic (ml = −l to +l) quantum numbers, plus spin (ms = ±½). Nodes are places where the wavefunction is zero; an orbital has n − 1 nodes in total, of which l are angular and n − l − 1 are radial. Electrons fill orbitals in order of increasing n + l (lower n first on a tie), one per orbital before pairing (Hund), with no two electrons sharing all four quantum numbers (Pauli).",
      points: [
        "For H-like species: rn = 0.529 n²/Z Å, En = −13.6 Z²/n² eV per atom (−2.18 × 10⁻¹⁸ Z²/n² J), vn = 2.18 × 10⁶ Z/n m s⁻¹.",
        "Series in the H spectrum: Lyman (n₁ = 1, UV), Balmer (n₁ = 2, visible), Paschen (3), Brackett (4), Pfund (5) — the last three in the infrared.",
        "Maximum lines when an electron falls from level n to the ground state = n(n − 1)/2.",
        "Allowed values: l = 0 … n − 1; ml = −l … +l (2l + 1 orbitals); maximum electrons in shell n = 2n².",
        "Nodes: radial = n − l − 1, angular = l, total = n − 1 (3p has 1 radial and 1 angular node).",
        "Exceptional configurations: Cr = [Ar] 3d⁵ 4s¹ and Cu = [Ar] 3d¹⁰ 4s¹, because half-filled and fully filled subshells have extra exchange-energy stabilisation and symmetry.",
        "de Broglie: λ = h/mv; Heisenberg: Δx·Δp ≥ h/4π — significant only for microscopic particles such as electrons.",
        "Photoelectric effect: hν = hν₀ + ½mv²; kinetic energy of ejected electrons depends on frequency, not intensity.",
      ],
      formulae: [
        { label: "Bohr energy", expr: "En = −13.6 Z²/n² eV", note: "one-electron species only" },
        { label: "Bohr radius", expr: "rn = 0.529 n²/Z Å" },
        {
          label: "Rydberg",
          expr: "1/λ = RH Z² (1/n₁² − 1/n₂²)",
          note: "RH = 109 677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹",
        },
        { label: "de Broglie", expr: "λ = h/mv = h/p" },
        { label: "Uncertainty", expr: "Δx · Δp ≥ h/4π" },
        { label: "Nodes", expr: "radial = n − l − 1; angular = l" },
      ],
      table: {
        title: "Nodes and orbitals for common subshells",
        columns: ["Orbital", "n", "l", "Radial nodes", "Angular nodes"],
        rows: [
          ["1s", "1", "0", "0", "0"],
          ["2s", "2", "0", "1", "0"],
          ["2p", "2", "1", "0", "1"],
          ["3s", "3", "0", "2", "0"],
          ["3p", "3", "1", "1", "1"],
          ["3d", "3", "2", "0", "2"],
          ["4f", "4", "3", "0", "3"],
        ],
      },
      pitfalls: [
        "Applying Bohr's formulae to multi-electron atoms such as He or Li — they hold only for H, He⁺, Li²⁺, Be³⁺ and similar one-electron species.",
        "Writing l = n for a subshell: n = 2, l = 2 (a '2d' orbital) does not exist.",
      ],
      vignette: {
        stem: "Calculate the wavelength of the first line of the Balmer series of hydrogen (RH = 109 677 cm⁻¹).",
        answer: "About 656 nm (red line).",
        reasoning:
          "First Balmer line is n₂ = 3 → n₁ = 2. 1/λ = 109 677 × (1/4 − 1/9) = 109 677 × 5/36 = 15 233 cm⁻¹. λ = 1/15 233 cm = 6.565 × 10⁻⁵ cm ≈ 656 nm, in the visible region.",
      },
      highYield:
        "r ∝ n²/Z, E ∝ −Z²/n², v ∝ Z/n; radial nodes = n − l − 1; lines from level n = n(n − 1)/2.",
      checks: [
        {
          q: "Which set of quantum numbers (n, l, ml) is NOT allowed?",
          options: ["3, 2, −2", "2, 1, 0", "2, 2, 1", "4, 0, 0"],
          answer: 2,
          why: "l can only go up to n − 1, so for n = 2, l = 2 is impossible.",
        },
        {
          q: "The number of radial nodes in a 4s orbital is:",
          options: ["3", "4", "2", "0"],
          answer: 0,
          why: "Radial nodes = n − l − 1 = 4 − 0 − 1 = 3.",
        },
      ],
    },
    {
      id: "thermodynamics",
      title: "Chemical thermodynamics: ΔH, ΔS, ΔG and Hess's law",
      minutes: 9,
      summary:
        "The first law tracks energy as heat and work; enthalpy measures heat at constant pressure; entropy and Gibbs energy decide whether a process is spontaneous.",
      examFocus:
        "ΔH − ΔU = Δng RT, sign conventions for q and w, Hess's law and bond-enthalpy calculations, isothermal work, and the four ΔH/ΔS sign combinations for spontaneity.",
      mechanism:
        "Internal energy U is a state function, so its change depends only on the initial and final states; heat and work are path-dependent ways of transferring energy, related by ΔU = q + w (work done on the system positive). At constant pressure some of the heat goes into pushing back the atmosphere, so the heat measured is ΔH = ΔU + pΔV, which for gases becomes ΔU + Δng RT. Because H is a state function, enthalpy changes for steps can be added to give the overall change — this is Hess's law, and it is why formation enthalpies or bond enthalpies can be combined to get a reaction enthalpy. Spontaneity, however, is governed by the total entropy of system plus surroundings; at constant T and p this condition collapses into one quantity for the system alone, ΔG = ΔH − TΔS, which must be negative. The TΔS term grows with temperature, so a reaction with ΔH and ΔS of the same sign changes from non-spontaneous to spontaneous (or vice versa) at T = ΔH/ΔS.",
      points: [
        "First law: ΔU = q + w; q > 0 when the system absorbs heat, w > 0 when work is done on the system (IUPAC convention used by NCERT).",
        "Work against constant external pressure: w = −pext ΔV; isothermal reversible expansion of an ideal gas: w = −2.303 nRT log(V₂/V₁).",
        "Free expansion of an ideal gas into vacuum: w = 0; if isothermal, q = 0 and ΔU = 0.",
        "ΔH = ΔU + Δng RT, where Δng = moles of gaseous products − moles of gaseous reactants; for an ideal gas Cp − Cv = R.",
        "Standard enthalpy of formation of an element in its standard state (e.g. O₂(g), C(graphite)) is zero.",
        "Bond enthalpy route: ΔrH = Σ bond enthalpies of reactants − Σ bond enthalpies of products (gaseous species).",
        "ΔG° = −RT ln K = −2.303 RT log K; at equilibrium ΔG = 0.",
        "Extensive properties (mass, volume, U, H, S, G) depend on amount; intensive properties (T, p, density, molar quantities) do not.",
      ],
      formulae: [
        { label: "First law", expr: "ΔU = q + w" },
        { label: "Enthalpy", expr: "ΔH = ΔU + Δng RT", note: "Δng counts gaseous moles only" },
        { label: "Isothermal reversible work", expr: "w = −2.303 nRT log(V₂/V₁)" },
        { label: "Gibbs energy", expr: "ΔG = ΔH − TΔS" },
        { label: "Equilibrium link", expr: "ΔG° = −2.303 RT log K" },
        { label: "Entropy", expr: "ΔS = qrev / T" },
      ],
      table: {
        title: "Sign of ΔG from ΔH and ΔS",
        columns: ["ΔH", "ΔS", "ΔG = ΔH − TΔS", "Spontaneous?"],
        rows: [
          ["−", "+", "Always −", "At all temperatures"],
          ["+", "−", "Always +", "Never (reverse is spontaneous)"],
          ["−", "−", "− at low T", "Only below T = ΔH/ΔS"],
          ["+", "+", "− at high T", "Only above T = ΔH/ΔS"],
        ],
      },
      pitfalls: [
        "Mixing units: ΔH is usually in kJ and ΔS in J K⁻¹ — convert one before using T = ΔH/ΔS.",
        "Including liquids and solids in Δng; only gaseous species count.",
      ],
      vignette: {
        stem: "For a reaction ΔH = +40 kJ mol⁻¹ and ΔS = +100 J K⁻¹ mol⁻¹. Above what temperature does it become spontaneous?",
        answer: "Above 400 K.",
        reasoning:
          "Spontaneous when ΔG < 0, i.e. TΔS > ΔH. T > ΔH/ΔS = 40 000 J mol⁻¹ / 100 J K⁻¹ mol⁻¹ = 400 K. Both terms positive, so it is a high-temperature-only reaction.",
      },
      highYield:
        "ΔH = ΔU + Δng RT; ΔG = ΔH − TΔS; crossover temperature T = ΔH/ΔS; ΔG° = −2.303 RT log K.",
      checks: [
        {
          q: "For N₂(g) + 3H₂(g) → 2NH₃(g) at constant temperature:",
          options: ["ΔH = ΔU", "ΔH = ΔU + 2RT", "ΔH = ΔU − 2RT", "ΔH = ΔU − RT"],
          answer: 2,
          why: "Δng = 2 − 4 = −2, so ΔH = ΔU − 2RT.",
        },
        {
          q: "A process with ΔH < 0 and ΔS > 0 is:",
          options: [
            "Spontaneous at all temperatures",
            "Spontaneous only at high temperature",
            "Spontaneous only at low temperature",
            "Never spontaneous",
          ],
          answer: 0,
          why: "Both terms make ΔG = ΔH − TΔS negative at every temperature.",
        },
      ],
    },
    {
      id: "chemical-equilibrium",
      title: "Chemical equilibrium: Kc, Kp and Le Chatelier",
      minutes: 7,
      summary:
        "At equilibrium forward and backward rates are equal, so concentrations stop changing and their ratio, the equilibrium constant, is fixed at a given temperature.",
      examFocus:
        "ICE-table Kc calculations, Kp = Kc(RT)^Δn, manipulating K when equations are reversed, multiplied or added, Q versus K, and Le Chatelier predictions including catalyst and inert gas.",
      mechanism:
        "Equilibrium is dynamic: molecules keep reacting in both directions, but the forward and reverse rates have become equal. Writing each rate in terms of concentrations and equating them gives the law of mass action, so the ratio of product to reactant concentrations (each raised to its coefficient) is a constant K. K depends only on temperature, because temperature changes the two rate constants by different amounts; for an exothermic reaction, raising T favours the endothermic backward reaction and K falls. When a stress such as added reactant or a pressure change disturbs the system, the reaction quotient Q no longer equals K, and the net reaction runs in whichever direction brings Q back to K — this is Le Chatelier's principle expressed quantitatively. A catalyst speeds both directions equally, so it shortens the time to reach equilibrium without changing K or the equilibrium composition.",
      points: [
        "Kc uses molar concentrations; Kp uses partial pressures; pure solids and pure liquids are omitted from both expressions.",
        "Kp = Kc(RT)^Δn, with Δn = gaseous moles of products − reactants; Kp = Kc when Δn = 0 (e.g. H₂ + I₂ ⇌ 2HI).",
        "Reverse the equation → K becomes 1/K; multiply the equation by n → Kⁿ; add equations → multiply their K values.",
        "Q < K: net forward reaction; Q > K: net backward reaction; Q = K: at equilibrium.",
        "Increasing pressure shifts equilibrium towards fewer gaseous moles; no effect when Δn = 0.",
        "Adding inert gas at constant volume: no shift (partial pressures unchanged); at constant pressure: shift towards more gaseous moles.",
        "Only temperature changes K; for exothermic reactions K decreases as T increases, for endothermic K increases.",
      ],
      formulae: [
        { label: "Kc", expr: "aA + bB ⇌ cC + dD: Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ" },
        {
          label: "Kp–Kc",
          expr: "Kp = Kc (RT)^Δn",
          note: "R = 0.0831 L bar K⁻¹ mol⁻¹ for pressures in bar",
        },
        { label: "Free energy", expr: "ΔG° = −RT ln K" },
        { label: "Degree of dissociation", expr: "α = moles dissociated / initial moles" },
      ],
      table: {
        title: "Le Chatelier responses for N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0",
        columns: ["Change", "Shift", "Effect on K"],
        rows: [
          ["Add N₂ or H₂", "Forward", "None"],
          ["Remove NH₃", "Forward", "None"],
          ["Increase pressure", "Forward (4 mol → 2 mol)", "None"],
          ["Increase temperature", "Backward", "K decreases"],
          ["Add catalyst", "No shift; equilibrium reached faster", "None"],
          ["Inert gas at constant volume", "No shift", "None"],
        ],
      },
      pitfalls: [
        "Saying a catalyst increases the yield at equilibrium — it does not change the equilibrium position.",
        "Forgetting that changing concentration or pressure shifts the position but leaves K unchanged.",
      ],
      vignette: {
        stem: "1 mol of PCl₅ is heated in a 1 L flask: PCl₅ ⇌ PCl₃ + Cl₂. At equilibrium 20% of PCl₅ has dissociated. Find Kc.",
        answer: "Kc = 0.05 mol L⁻¹.",
        reasoning:
          "Dissociated = 0.2 mol. At equilibrium [PCl₅] = 0.8, [PCl₃] = [Cl₂] = 0.2 mol L⁻¹. Kc = (0.2 × 0.2)/0.8 = 0.04/0.8 = 0.05 mol L⁻¹.",
      },
      highYield:
        "Kp = Kc(RT)^Δn; reverse → 1/K; only temperature changes K; a catalyst never shifts equilibrium.",
      checks: [
        {
          q: "For a reaction K = 4 at a given temperature. K for the reverse reaction at the same temperature is:",
          options: ["4", "−4", "0.25", "2"],
          answer: 2,
          why: "Reversing an equation inverts K: 1/4 = 0.25.",
        },
        {
          q: "For which reaction is Kp = Kc?",
          options: ["N₂ + 3H₂ ⇌ 2NH₃", "H₂ + I₂ ⇌ 2HI", "PCl₅ ⇌ PCl₃ + Cl₂", "2SO₂ + O₂ ⇌ 2SO₃"],
          answer: 1,
          why: "Δn = 2 − 2 = 0, so (RT)⁰ = 1 and Kp = Kc.",
        },
      ],
    },
    {
      id: "ionic-equilibrium",
      title: "Ionic equilibrium: pH, buffers and Ksp",
      minutes: 9,
      summary:
        "Weak acids and bases ionise only partly; their equilibrium constants decide pH, buffer action, salt hydrolysis and whether a sparingly soluble salt precipitates.",
      examFocus:
        "pH of strong and weak acids/bases, Ostwald's dilution law, Henderson–Hasselbalch buffer pH, Ksp–solubility relations, common-ion effect and the precipitation condition.",
      mechanism:
        "Water self-ionises, and at 298 K [H⁺][OH⁻] = Kw = 1.0 × 10⁻¹⁴, so pH + pOH = 14. A weak acid HA sets up HA ⇌ H⁺ + A⁻; when it is only slightly ionised the denominator stays ≈ C, giving α = √(Ka/C) and [H⁺] = √(Ka C), which is why dilution increases α. A buffer contains a weak acid and its conjugate base (or a weak base and its conjugate acid) in comparable amounts: added H⁺ is mopped up by A⁻ and added OH⁻ by HA, so the ratio [A⁻]/[HA] — and hence pH — barely changes. For a sparingly soluble salt the solid is in equilibrium with its ions, and the product of ion concentrations at saturation is Ksp; the stoichiometry of the formula decides how Ksp relates to molar solubility s. Adding a common ion raises one ion's concentration, so the equilibrium shifts back and solubility drops — the same idea used in qualitative analysis to control which sulphides or hydroxides precipitate.",
      points: [
        "pH = −log[H⁺]; at 298 K Kw = 1.0 × 10⁻¹⁴ and pH + pOH = 14; neutral pH is 7 only at 298 K.",
        "Weak acid: α = √(Ka/C) and [H⁺] = √(Ka·C); α increases on dilution (Ostwald's dilution law).",
        "Conjugate pair: Ka × Kb = Kw, so pKa + pKb = 14 at 298 K; a stronger acid has a weaker conjugate base.",
        "Acidic buffer: pH = pKa + log([salt]/[acid]); basic buffer: pOH = pKb + log([salt]/[base]); pH = pKa when [salt] = [acid].",
        "Ksp in terms of solubility s: AB → s²; AB₂ or A₂B → 4s³; AB₃ or A₃B → 27s⁴; A₂B₃ → 108s⁵.",
        "Precipitation occurs when the ionic product exceeds Ksp; a common ion lowers the solubility of a salt.",
        "Salt of strong acid + weak base (e.g. NH₄Cl) is acidic; weak acid + strong base (e.g. CH₃COONa) is basic; strong + strong (NaCl) is neutral.",
        "Very dilute strong acid: for 10⁻⁸ M HCl, water's own 10⁻⁷ M H⁺ dominates and pH is just below 7, not 8.",
      ],
      formulae: [
        { label: "pH", expr: "pH = −log[H⁺]; pH + pOH = 14 (298 K)" },
        { label: "Weak acid", expr: "[H⁺] = √(Ka C); α = √(Ka/C)" },
        { label: "Henderson (acidic)", expr: "pH = pKa + log([salt]/[acid])" },
        { label: "Henderson (basic)", expr: "pOH = pKb + log([salt]/[base])" },
        { label: "Ksp (AxBy)", expr: "Ksp = xˣ yʸ s^(x+y)" },
      ],
      table: {
        title: "Ksp–solubility relations",
        columns: ["Salt type", "Example", "Ions per formula", "Ksp in terms of s"],
        rows: [
          ["AB", "AgCl", "1 + 1", "s²"],
          ["AB₂", "PbI₂, CaF₂", "1 + 2", "4s³"],
          ["A₂B", "Ag₂CrO₄", "2 + 1", "4s³"],
          ["AB₃", "Fe(OH)₃", "1 + 3", "27s⁴"],
          ["A₂B₃", "Bi₂S₃", "2 + 3", "108s⁵"],
        ],
      },
      pitfalls: [
        "Using pH = −log C for a weak acid; that is only for strong acids — weak acids need √(Ka C).",
        "In buffer questions, using moles or concentrations inconsistently; the ratio works with either as long as both are in the same volume.",
      ],
      vignette: {
        stem: "Find the pH and degree of ionisation of 0.1 M solution of a weak monobasic acid with Ka = 1.0 × 10⁻⁵.",
        answer: "pH = 3; α = 0.01 (1%).",
        reasoning:
          "[H⁺] = √(Ka C) = √(1.0 × 10⁻⁵ × 0.1) = √(10⁻⁶) = 10⁻³ M, so pH = 3. α = [H⁺]/C = 10⁻³/0.1 = 0.01. The small α justifies the approximation 1 − α ≈ 1.",
      },
      highYield:
        "[H⁺] = √(Ka C); pH = pKa + log(salt/acid); AB₂ salt Ksp = 4s³; common ion lowers solubility.",
      checks: [
        {
          q: "A buffer is 0.1 M in CH₃COOH and 0.1 M in CH₃COONa (pKa = 4.74). Its pH is:",
          options: ["4.74", "5.74", "3.74", "7.00"],
          answer: 0,
          why: "log(0.1/0.1) = 0, so pH = pKa = 4.74.",
        },
        {
          q: "The molar solubility of CaF₂ is s. Its Ksp is:",
          options: ["s²", "2s³", "27s⁴", "4s³"],
          answer: 3,
          why: "CaF₂ → Ca²⁺ + 2F⁻; Ksp = s × (2s)² = 4s³.",
        },
      ],
    },
    {
      id: "solutions",
      title: "Solutions: Raoult's law and colligative properties",
      minutes: 8,
      summary:
        "Colligative properties depend only on the number of solute particles, not their identity; the van't Hoff factor corrects for dissociation or association.",
      examFocus:
        "ΔTf, ΔTb and π numericals, comparing boiling/freezing points using i × m, van't Hoff factor for electrolytes, positive vs negative deviations and azeotropes, and Henry's law.",
      mechanism:
        "Raoult's law says a volatile component's partial vapour pressure equals its pure vapour pressure times its mole fraction, because only that fraction of surface molecules can escape. A non-volatile solute therefore lowers the vapour pressure of the solvent, and the relative lowering equals the solute's mole fraction. Lower vapour pressure means the liquid must be heated more to reach atmospheric pressure (boiling point elevation) and must be cooled more before the solid's vapour pressure matches it (freezing point depression); osmotic pressure arises from the same reduced escaping tendency of solvent. All four effects scale with the number of solute particles per amount of solvent, so an electrolyte that splits into ions gives a bigger effect, captured by the van't Hoff factor i. Real solutions deviate from Raoult's law when A–B attractions differ from A–A and B–B: weaker A–B attractions give positive deviation (higher vapour pressure, minimum-boiling azeotrope), stronger A–B attractions give negative deviation (lower vapour pressure, maximum-boiling azeotrope).",
      points: [
        "Raoult's law: pA = p°A xA; for a non-volatile solute, (p° − p)/p° = x(solute).",
        "Ideal solutions obey Raoult's law at all concentrations with ΔmixH = 0 and ΔmixV = 0 (e.g. n-hexane + n-heptane, benzene + toluene).",
        "Positive deviation (e.g. ethanol + acetone, ethanol + water) → minimum-boiling azeotrope; ethanol–water azeotrope is about 95% ethanol by volume.",
        "Negative deviation (e.g. chloroform + acetone, nitric acid + water) → maximum-boiling azeotrope; HNO₃–water azeotrope is about 68% HNO₃ by mass.",
        "For water Kb = 0.52 K kg mol⁻¹ and Kf = 1.86 K kg mol⁻¹.",
        "van't Hoff factor: i = 1 + (n − 1)α for dissociation into n ions; i < 1 for association (e.g. ethanoic acid dimerising in benzene).",
        "Osmotic pressure is preferred for molar masses of proteins and polymers: measurable at room temperature and large even for dilute solutions; 0.9% (mass/volume) NaCl is isotonic with blood.",
        "Henry's law: p = KH x; a larger KH means lower solubility of the gas; gas solubility in liquids falls as temperature rises.",
      ],
      formulae: [
        { label: "Raoult (relative lowering)", expr: "(p° − p)/p° = n₂/(n₁ + n₂) ≈ n₂/n₁" },
        { label: "Boiling point elevation", expr: "ΔTb = i Kb m" },
        { label: "Freezing point depression", expr: "ΔTf = i Kf m" },
        { label: "Osmotic pressure", expr: "π = i C R T", note: "C in mol L⁻¹" },
        { label: "Molar mass from ΔTf", expr: "M₂ = Kf × w₂ × 1000 / (ΔTf × w₁)", note: "w in g" },
      ],
      table: {
        title: "Deviations from Raoult's law",
        columns: ["Feature", "Positive deviation", "Negative deviation"],
        rows: [
          ["A–B attraction", "Weaker than A–A, B–B", "Stronger than A–A, B–B"],
          ["Vapour pressure", "Higher than predicted", "Lower than predicted"],
          ["ΔmixH", "Positive (endothermic)", "Negative (exothermic)"],
          ["ΔmixV", "Positive (expansion)", "Negative (contraction)"],
          ["Azeotrope", "Minimum boiling", "Maximum boiling"],
          ["Example", "Ethanol + acetone", "Chloroform + acetone"],
        ],
      },
      pitfalls: [
        "Comparing boiling points by molality alone without multiplying by i (0.1 m CaCl₂ beats 0.1 m NaCl because i = 3 vs 2).",
        "Using molarity in ΔTb/ΔTf formulas or molality in π = CRT.",
      ],
      vignette: {
        stem: "18 g of glucose (M = 180 g mol⁻¹) is dissolved in 1 kg of water. Find the freezing point of the solution (Kf = 1.86 K kg mol⁻¹).",
        answer: "About −0.186 °C (273.15 − 0.186 ≈ 272.96 K).",
        reasoning:
          "Moles glucose = 18/180 = 0.1 mol in 1 kg water, so m = 0.1 mol kg⁻¹. Glucose is a non-electrolyte, i = 1. ΔTf = 1.86 × 0.1 = 0.186 K, so the freezing point falls by 0.186 K below 0 °C.",
      },
      highYield:
        "ΔT = i K m; i = 1 + (n − 1)α; positive deviation → minimum-boiling azeotrope; Kf(water) = 1.86, Kb(water) = 0.52.",
      checks: [
        {
          q: "Which 0.1 m aqueous solution has the highest boiling point (assume complete dissociation of electrolytes)?",
          options: ["Glucose", "Urea", "NaCl", "CaCl₂"],
          answer: 3,
          why: "CaCl₂ gives 3 ions (i = 3), the largest i × m among the four.",
        },
        {
          q: "The van't Hoff factor for K₄[Fe(CN)₆] on complete dissociation is:",
          options: ["4", "5", "2", "10"],
          answer: 1,
          why: "It gives 4 K⁺ + 1 [Fe(CN)₆]⁴⁻ = 5 ions; the complex ion stays intact.",
        },
      ],
    },
    {
      id: "electrochemistry",
      title: "Electrochemistry: Nernst equation, conductance and Kohlrausch's law",
      minutes: 9,
      summary:
        "Galvanic cells turn the Gibbs energy of a redox reaction into electrical work; conductance measurements tell us how ions move and how far weak electrolytes dissociate.",
      examFocus:
        "E°cell from standard potentials, Nernst-equation cell EMF, ΔG° = −nFE° and log K from E°, molar conductivity trends on dilution, Kohlrausch's law for weak electrolytes, and Faraday's laws.",
      mechanism:
        "In a galvanic cell oxidation at the anode releases electrons that flow through the wire to the cathode where reduction occurs; the driving force is the difference in reduction potentials, E°cell = E°cathode − E°anode. The electrical work available equals the decrease in Gibbs energy, so ΔG° = −nFE°, and combining with ΔG° = −RT ln K links E° to the equilibrium constant. When concentrations are not standard, the Nernst equation corrects E using the reaction quotient Q: as products build up Q rises, E falls, and at equilibrium E = 0. In solution, conductivity κ falls on dilution because there are fewer ions per cm³, but molar conductivity Λm (conductance of all the ions from one mole) rises, because ions are freer of interionic drag (strong electrolytes) or because more molecules dissociate (weak electrolytes). Kohlrausch's law states that at infinite dilution each ion contributes independently, which lets us build Λ°m of a weak electrolyte such as acetic acid from strong electrolytes that can be measured.",
      points: [
        "Standard hydrogen electrode is assigned E° = 0.00 V; a more negative E° means a stronger reducing agent (Li is the strongest), a more positive E° a stronger oxidising agent (F₂ is the strongest).",
        "E°cell = E°cathode − E°anode (both as reduction potentials); Daniell cell E° = 1.10 V.",
        "Nernst at 298 K: E = E° − (0.059/n) log Q; at equilibrium E = 0 and E° = (0.059/n) log K.",
        "Conductivity κ = G* / R where cell constant G* = l/A; Λm = κ × 1000 / M (κ in S cm⁻¹, M in mol L⁻¹, Λm in S cm² mol⁻¹).",
        "Strong electrolytes: Λm = Λ°m − A√C (gentle linear rise on dilution); weak electrolytes: Λm rises steeply at low C and Λ°m cannot be found by extrapolation.",
        "Kohlrausch: Λ°m(CH₃COOH) = Λ°m(CH₃COONa) + Λ°m(HCl) − Λ°m(NaCl); degree of dissociation α = Λm/Λ°m.",
        "Faraday's first law: mass deposited = Z I t; 1 F = 96 487 C mol⁻¹ (≈ 96 500) of electrons; charge to deposit 1 mol of Mⁿ⁺ = nF.",
        "Electrolysis of aqueous NaCl gives H₂ at the cathode (not Na) and Cl₂ at the anode (overpotential of O₂); the H₂–O₂ fuel cell and lead storage battery are NCERT examples.",
      ],
      formulae: [
        { label: "Cell EMF", expr: "E°cell = E°cathode − E°anode" },
        { label: "Nernst (298 K)", expr: "E = E° − (0.059/n) log Q" },
        { label: "Gibbs energy", expr: "ΔG° = −nFE°cell" },
        { label: "Equilibrium constant", expr: "log K = nE°cell / 0.059" },
        { label: "Molar conductivity", expr: "Λm = κ × 1000 / M", note: "S cm² mol⁻¹" },
        { label: "Faraday", expr: "w = (M / nF) × I × t" },
      ],
      flow: {
        title: "Solving a cell-EMF question",
        steps: [
          {
            label: "Identify anode and cathode",
            detail: "Lower E° (more negative) is oxidised at the anode.",
          },
          {
            label: "Write E°cell",
            detail: "E°cathode − E°anode, without multiplying by coefficients.",
          },
          {
            label: "Balance electrons",
            detail: "Find n, the electrons transferred in the overall equation.",
          },
          {
            label: "Form Q",
            detail: "Products over reactants; omit solids such as Zn(s) and Cu(s).",
          },
          { label: "Apply Nernst", detail: "E = E° − (0.059/n) log Q; then ΔG = −nFE if asked." },
        ],
      },
      pitfalls: [
        "Multiplying E° by the stoichiometric coefficient — electrode potential is intensive and is never scaled.",
        "Saying conductivity and molar conductivity both rise on dilution; κ falls, Λm rises.",
      ],
      vignette: {
        stem: "Calculate the EMF at 298 K of the cell Zn | Zn²⁺(0.01 M) || Cu²⁺(1 M) | Cu, given E°cell = 1.10 V.",
        answer: "About 1.16 V.",
        reasoning:
          "Zn + Cu²⁺ → Zn²⁺ + Cu, n = 2. Q = [Zn²⁺]/[Cu²⁺] = 0.01/1 = 10⁻². E = 1.10 − (0.059/2) log 10⁻² = 1.10 − 0.0295 × (−2) = 1.10 + 0.059 = 1.159 V. Lowering the product concentration raises the EMF.",
      },
      highYield:
        "E = E° − (0.059/n) log Q; ΔG° = −nFE°; on dilution κ falls but Λm rises; Λ°m(weak) from Kohlrausch.",
      checks: [
        {
          q: "ΔG° for the Daniell cell (E° = 1.10 V, n = 2, F = 96 500 C mol⁻¹) is about:",
          options: ["−106 kJ mol⁻¹", "+212 kJ mol⁻¹", "−212 kJ mol⁻¹", "−424 kJ mol⁻¹"],
          answer: 2,
          why: "ΔG° = −nFE° = −2 × 96 500 × 1.10 = −212 300 J ≈ −212 kJ mol⁻¹.",
        },
        {
          q: "Charge needed to deposit 1 mol of Al from molten Al³⁺ salt is:",
          options: ["3 F", "1 F", "2 F", "0.33 F"],
          answer: 0,
          why: "Al³⁺ + 3e⁻ → Al; each mole needs 3 mol of electrons = 3 F.",
        },
      ],
    },
    {
      id: "chemical-kinetics",
      title: "Chemical kinetics: order, half-life and Arrhenius",
      minutes: 8,
      summary:
        "Rate laws describe how rate depends on concentration; integrated laws give concentration against time; the Arrhenius equation explains why rates rise sharply with temperature.",
      examFocus:
        "Order from rate data, units of k, first-order half-life and percentage-completion problems, zero-order behaviour, Arrhenius two-temperature calculations, and order vs molecularity.",
      mechanism:
        "Rate depends on how often reactant molecules collide with enough energy and the right orientation, so it depends on concentration in a way that must be found by experiment: rate = k[A]ˣ[B]ʸ, with x + y the order. Integrating the rate law gives how concentration falls with time; for a first-order reaction the fraction remaining depends only on time, so the half-life 0.693/k is the same whatever the starting concentration. For zero order the rate is constant, the concentration falls linearly and the half-life is proportional to [A]₀. Only molecules with energy at least Ea above the average react, and the fraction having that energy is e^(−Ea/RT), which grows steeply with temperature — this is the Arrhenius equation and why a 10 K rise roughly doubles many rates. A catalyst gives an alternative path with lower Ea, speeding forward and backward reactions alike, without changing ΔH, ΔG or K.",
      points: [
        "Order is experimental and can be zero, fractional or negative; molecularity is theoretical, applies to elementary steps, and is a whole number (1, 2 or 3).",
        "Units of k for order n: (mol L⁻¹)^(1−n) s⁻¹ — zero order mol L⁻¹ s⁻¹, first order s⁻¹, second order L mol⁻¹ s⁻¹.",
        "First order: k = (2.303/t) log([A]₀/[A]); t½ = 0.693/k, independent of [A]₀; t75% = 2 t½ and t99.9% ≈ 10 t½.",
        "Zero order: [A] = [A]₀ − kt; t½ = [A]₀/2k (e.g. decomposition of NH₃ on a hot platinum surface at high pressure).",
        "Pseudo-first-order reactions: acid hydrolysis of ethyl acetate and inversion of cane sugar, where water is in large excess.",
        "Arrhenius: k = A e^(−Ea/RT); a plot of ln k vs 1/T is a straight line with slope −Ea/R.",
        "For a 10 K rise in temperature the rate constant is nearly doubled for many reactions.",
        "Collision theory: rate = P Z_AB e^(−Ea/RT), where P is the probability (steric) factor for proper orientation.",
      ],
      formulae: [
        { label: "First-order integrated", expr: "k = (2.303/t) log([A]₀/[A])" },
        { label: "First-order half-life", expr: "t½ = 0.693/k" },
        { label: "Zero order", expr: "[A] = [A]₀ − kt; t½ = [A]₀/2k" },
        { label: "Arrhenius", expr: "k = A e^(−Ea/RT)" },
        {
          label: "Two temperatures",
          expr: "log(k₂/k₁) = (Ea / 2.303R) × (T₂ − T₁)/(T₁T₂)",
        },
        { label: "Fraction left after n half-lives", expr: "[A]/[A]₀ = (1/2)ⁿ" },
      ],
      table: {
        title: "Zero vs first order",
        columns: ["Feature", "Zero order", "First order"],
        rows: [
          ["Rate law", "rate = k", "rate = k[A]"],
          ["Integrated form", "[A] = [A]₀ − kt", "ln[A] = ln[A]₀ − kt"],
          ["Linear plot", "[A] vs t (slope −k)", "ln[A] vs t (slope −k)"],
          ["Half-life", "[A]₀/2k (∝ [A]₀)", "0.693/k (constant)"],
          ["Unit of k", "mol L⁻¹ s⁻¹", "s⁻¹"],
        ],
      },
      pitfalls: [
        "Taking order from the coefficients of the balanced equation — order comes from experiment unless the reaction is stated to be elementary.",
        "Thinking a catalyst changes K or ΔH; it lowers Ea for both directions equally.",
      ],
      vignette: {
        stem: "A first-order reaction has k = 0.0693 min⁻¹. How long does it take to reach 75% completion, and what fraction remains after 30 min?",
        answer: "20 min for 75% completion; 1/8 remains after 30 min.",
        reasoning:
          "t½ = 0.693/0.0693 = 10 min. 75% completion leaves 25% = two half-lives = 20 min. 30 min = 3 half-lives, so (1/2)³ = 1/8 remains.",
      },
      highYield:
        "First order: t½ = 0.693/k, independent of [A]₀; unit of k = (mol L⁻¹)^(1−n) s⁻¹; catalyst lowers Ea, not K.",
      checks: [
        {
          q: "Rate = k[A]²[B]. If [A] is doubled and [B] is halved, the rate becomes:",
          options: ["Unchanged", "Four times", "Half", "Two times"],
          answer: 3,
          why: "Rate ∝ (2)² × (1/2) = 2, so it doubles.",
        },
        {
          q: "The unit of the rate constant of a second-order reaction is:",
          options: ["s⁻¹", "L mol⁻¹ s⁻¹", "mol L⁻¹ s⁻¹", "L² mol⁻² s⁻¹"],
          answer: 1,
          why: "(mol L⁻¹)^(1−2) s⁻¹ = L mol⁻¹ s⁻¹.",
        },
      ],
    },
  ],
};
