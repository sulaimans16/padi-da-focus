import type { LearnModule } from "../../learn";

export const electricity: LearnModule = {
  slug: "electricity",
  group: "Physics",
  subject: "Physics",
  title: "Electrostatics & Current Electricity",
  icon: "bolt",
  blurb:
    "Coulomb's law, electric field and Gauss's law, electric potential and potential energy, capacitors and dielectrics, drift velocity and resistivity, Kirchhoff's laws with the Wheatstone and metre bridges, EMF and internal resistance, and electrical power.",
  objectives: [
    "Learner can apply Coulomb's law and superposition, including charge redistribution between touching conductors.",
    "Learner can use Gauss's law to find fields of a line, sheet and spherical shell and compute dipole fields, torque and energy.",
    "Learner can combine capacitors and predict how Q, V, E and U change when a dielectric is inserted.",
    "Learner can relate current to drift velocity and resistance to resistivity, length, area and temperature.",
    "Learner can solve networks with Kirchhoff's rules, balance a Wheatstone or metre bridge, and handle cells with internal resistance.",
  ],
  concepts: [
    {
      id: "coulomb-law",
      title: "Electric charge and Coulomb's law",
      minutes: 6,
      summary:
        "Charge is quantised, conserved and additive; two point charges exert a force along the line joining them, proportional to the product of charges and inversely proportional to the square of their separation.",
      examFocus:
        "Number of electrons in a given charge, force after identical spheres touch and separate, effect of a dielectric medium, and the net force from several charges by vector superposition.",
      mechanism:
        "All charge comes in whole-number multiples of the electronic charge e = 1.6 × 10⁻¹⁹ C, because it is carried by electrons and protons; ordinary charging simply moves electrons from one body to another, which is why total charge is conserved. The force between two point charges falls as 1/r², like gravity, but can be attractive or repulsive and is enormously stronger. Forces from several charges add as vectors (superposition), because each pair interaction is unaffected by the others. In a medium of dielectric constant K the molecules polarise and partly shield the charges, so the force falls to 1/K of its value in vacuum. When two identical conducting spheres touch, symmetry forces them to share the total charge equally.",
      points: [
        "Quantisation: q = ne, with e = 1.6 × 10⁻¹⁹ C; 1 C corresponds to 6.25 × 10¹⁸ electrons.",
        "Charge is conserved and additive (a scalar); it is unchanged by the speed of the body.",
        "F = (1/4πε₀) q₁q₂/r², with 1/4πε₀ = 9 × 10⁹ N m² C⁻² and ε₀ = 8.854 × 10⁻¹² C² N⁻¹ m⁻².",
        "In a medium F(medium) = F(vacuum)/K; K = ε/ε₀ = εᵣ.",
        "The force obeys Newton's third law and acts along the line joining the charges (central force).",
        "Identical conductors brought into contact share charge equally: each gets (q₁ + q₂)/2.",
        "Charging by induction leaves the inducing body's charge unchanged.",
      ],
      formulae: [
        { label: "Coulomb's law", expr: "F = q₁q₂/(4πε₀r²)" },
        { label: "Quantisation", expr: "q = ne" },
        { label: "In a medium", expr: "F = q₁q₂/(4πε₀Kr²)" },
        { label: "Sharing between identical spheres", expr: "q' = (q₁ + q₂)/2" },
      ],
      table: {
        title: "Electrostatic versus gravitational force",
        columns: ["Feature", "Electrostatic", "Gravitational"],
        rows: [
          ["Dependence on r", "1/r²", "1/r²"],
          ["Nature", "Attractive or repulsive", "Always attractive"],
          ["Depends on medium", "Yes (÷K)", "No"],
          ["Relative strength (two protons)", "About 10³⁶ times stronger", "Much weaker"],
        ],
      },
      pitfalls: [
        "Keep the sign of each charge when sharing: +6 μC and −2 μC give +2 μC each, not +4 μC each.",
        "Net force from several charges is a vector sum — add components, not magnitudes.",
      ],
      vignette: {
        stem: "Two identical small metal spheres carry +6 μC and −2 μC and attract with force F at separation r. They are touched together and returned to the same separation. What is the new force?",
        answer: "F/3, now repulsive",
        reasoning:
          "Initially F ∝ 6 × 2 = 12 (attractive). After contact each has (6 − 2)/2 = +2 μC, so F' ∝ 2 × 2 = 4. F' = F/3, and since both are positive the force is repulsive.",
      },
      highYield:
        "F ∝ q₁q₂/r², reduced by K in a medium; identical spheres in contact share (q₁ + q₂)/2 each.",
      checks: [
        {
          q: "The number of electrons that must be removed from a neutral body to give it a charge of +1.6 μC is:",
          options: ["10¹²", "10¹³", "10¹⁹", "10⁶"],
          answer: 1,
          why: "n = q/e = 1.6 × 10⁻⁶ / 1.6 × 10⁻¹⁹ = 10¹³.",
        },
        {
          q: "Two point charges in air repel with force F. When the space is filled with a liquid of dielectric constant 4 (same separation), the force becomes:",
          options: ["4F", "F/2", "F", "F/4"],
          answer: 3,
          why: "F(medium) = F/K = F/4.",
        },
      ],
    },
    {
      id: "field-gauss",
      title: "Electric field, dipole and Gauss's law",
      minutes: 9,
      summary:
        "The electric field is the force per unit positive test charge; the total flux through any closed surface equals the enclosed charge divided by ε₀, which makes symmetric fields easy to find.",
      examFocus:
        "Axial and equatorial fields of a dipole, torque and energy of a dipole in a uniform field, flux through a cube face, and fields of an infinite line, sheet and spherical shell.",
      mechanism:
        "Field lines leave positive charges and end on negative ones; the number crossing a closed surface counts the net charge inside, which is Gauss's law φ = q(enclosed)/ε₀. Charges outside the surface send in as many lines as they take out, so they contribute no net flux, though they do affect the field at points on the surface. For a symmetric charge distribution we choose a Gaussian surface on which E is constant, and the law gives E directly: 1/r² outside a sphere, 1/r for a long line, and a constant σ/2ε₀ for an infinite sheet. Inside a charged conducting or thin spherical shell no charge is enclosed, so E = 0. A dipole in a uniform field feels equal and opposite forces — zero net force — but they form a couple that tries to align p with E.",
      points: [
        "E = F/q₀; point charge E = kq/r² radially outward for q > 0.",
        "Field lines never cross, start on + and end on − charge, and are perpendicular to a conductor's surface.",
        "Dipole moment p = q × 2a, directed from −q to +q.",
        "Dipole far field: axial E = 2kp/r³ (along p), equatorial E = kp/r³ (opposite to p); ratio 2 : 1.",
        "In a uniform field: net force 0, torque τ = pE sinθ, potential energy U = −pE cosθ (stable at θ = 0).",
        "Gauss's law: φ = ∮E·dA = q(enclosed)/ε₀; charge q at the centre of a cube sends q/6ε₀ through each face.",
        "Infinite line λ: E = λ/(2πε₀r); infinite plane sheet σ: E = σ/(2ε₀); just outside a conductor: E = σ/ε₀.",
        "Thin spherical shell: E = kq/r² outside, zero inside.",
      ],
      formulae: [
        { label: "Point charge field", expr: "E = q/(4πε₀r²)" },
        { label: "Dipole fields", expr: "E(axial) = 2kp/r³, E(equatorial) = kp/r³", note: "r ≫ a" },
        { label: "Dipole in uniform field", expr: "τ = pE sinθ, U = −pE cosθ" },
        { label: "Gauss's law", expr: "φ = q(enclosed)/ε₀" },
        { label: "Line and sheet", expr: "E(line) = λ/(2πε₀r), E(sheet) = σ/(2ε₀)" },
      ],
      table: {
        title: "Fields from Gauss's law",
        columns: ["Charge distribution", "Gaussian surface", "Field"],
        rows: [
          ["Infinite line (λ)", "Coaxial cylinder", "λ/(2πε₀r), ∝ 1/r"],
          ["Infinite sheet (σ)", "Cylinder through the sheet", "σ/(2ε₀), uniform"],
          ["Thin shell, outside (r > R)", "Concentric sphere", "q/(4πε₀r²)"],
          ["Thin shell, inside (r < R)", "Concentric sphere", "0"],
        ],
      },
      pitfalls: [
        "Flux through a closed surface depends only on the enclosed charge, but the field at the surface depends on all charges.",
        "A dipole in a uniform field has zero net force but non-zero torque; in a non-uniform field it also feels a net force.",
      ],
      vignette: {
        stem: "A charge of 8.85 μC sits at the centre of a cube. Find the electric flux through the whole cube and through one face (ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻²).",
        answer: "10⁶ N m² C⁻¹ in total; about 1.67 × 10⁵ N m² C⁻¹ per face",
        reasoning:
          "φ = q/ε₀ = 8.85 × 10⁻⁶ / 8.85 × 10⁻¹² = 10⁶ N m² C⁻¹. By symmetry the six faces share it equally: 10⁶/6 ≈ 1.67 × 10⁵ N m² C⁻¹.",
      },
      highYield:
        "Dipole: axial 2kp/r³, equatorial kp/r³; τ = pE sinθ; line λ/2πε₀r, sheet σ/2ε₀, inside a shell E = 0.",
      checks: [
        {
          q: "At equal large distances, the ratio of a dipole's field on its axis to that on its equatorial line is:",
          options: ["1 : 2", "1 : 1", "2 : 1", "4 : 1"],
          answer: 2,
          why: "E(axial) = 2kp/r³ and E(equatorial) = kp/r³.",
        },
        {
          q: "The electric field at a point inside a uniformly charged thin spherical shell is:",
          options: ["Zero", "Maximum at the centre", "kq/R²", "Proportional to r"],
          answer: 0,
          why: "A Gaussian sphere inside the shell encloses no charge, so E = 0 everywhere inside.",
        },
      ],
    },
    {
      id: "electric-potential",
      title: "Electric potential and potential energy",
      minutes: 7,
      summary:
        "Potential is the work done per unit charge in bringing a test charge from infinity; the field points in the direction of steepest fall of potential, and equipotential surfaces are perpendicular to field lines.",
      examFocus:
        "Potential of point charges and a dipole, work done in moving a charge, potential energy of a system of charges, E = −dV/dr, and properties of equipotential surfaces and conductors.",
      mechanism:
        "Because the electrostatic force is conservative, the work done in moving a charge between two points depends only on the end points, so each point can be given a potential V. The field is the negative gradient of potential: E points from high to low potential, and its magnitude is how quickly V changes with distance. On an equipotential surface V does not change, so no work is done moving a charge along it and the field must be perpendicular to it. Inside a conductor in equilibrium E = 0, so the whole conductor, including its surface, is one equipotential. A dipole's potential is zero everywhere on its equatorial plane because the contributions of +q and −q cancel there, even though the field is not zero.",
      points: [
        "Point charge V = kq/r (scalar, sign matters); potentials of several charges add algebraically.",
        "Work done by external agent W = q(V_B − V_A); 1 eV = 1.6 × 10⁻¹⁹ J.",
        "E = −dV/dr; in a uniform field V = Ed between points d apart along the field.",
        "Dipole: V = kp cosθ/r²; zero on the equatorial line.",
        "Potential energy of two charges U = kq₁q₂/r; for a system, add over every pair.",
        "Equipotentials are perpendicular to field lines; no work is done moving along them.",
        "Inside a charged conductor E = 0 and V equals the surface value; charge resides on the outer surface.",
      ],
      formulae: [
        { label: "Point charge potential", expr: "V = q/(4πε₀r)" },
        { label: "Field–potential", expr: "E = −dV/dr" },
        { label: "Dipole potential", expr: "V = p cosθ/(4πε₀r²)" },
        { label: "Work", expr: "W = q(V_B − V_A)" },
        { label: "Two-charge PE", expr: "U = q₁q₂/(4πε₀r)" },
      ],
      table: {
        title: "Field and potential of a dipole",
        columns: ["Location", "Field", "Potential"],
        rows: [
          ["Axial line", "2kp/r³", "kp/r²"],
          ["Equatorial line", "kp/r³", "0"],
          ["General point (θ)", "(kp/r³)√(1 + 3cos²θ)", "kp cosθ/r²"],
        ],
      },
      pitfalls: [
        "Zero potential at a point does not mean zero field there (dipole equatorial line).",
        "Potential is a scalar: add potentials with signs, never as vectors.",
      ],
      vignette: {
        stem: "How much work is needed to bring a 2 μC charge from infinity to a point 0.3 m from a fixed 5 μC charge (k = 9 × 10⁹ N m² C⁻²)?",
        answer: "0.3 J",
        reasoning: "W = U = kq₁q₂/r = 9 × 10⁹ × 2 × 10⁻⁶ × 5 × 10⁻⁶ / 0.3 = 0.09/0.3 = 0.3 J.",
      },
      highYield:
        "E = −dV/dr; equipotentials ⊥ field lines; dipole potential zero on the equatorial line; conductor = equipotential.",
      checks: [
        {
          q: "The work done in moving a charge of 3 μC along an equipotential surface at 50 V through 10 cm is:",
          options: ["150 μJ", "15 μJ", "Zero", "1.5 mJ"],
          answer: 2,
          why: "ΔV = 0 along an equipotential, so W = qΔV = 0.",
        },
        {
          q: "An electron is accelerated from rest through a potential difference of 100 V. Its kinetic energy is:",
          options: ["1.6 × 10⁻¹⁷ J", "1.6 × 10⁻¹⁹ J", "100 J", "1.6 × 10⁻²¹ J"],
          answer: 0,
          why: "K = eV = 1.6 × 10⁻¹⁹ × 100 = 1.6 × 10⁻¹⁷ J (100 eV).",
        },
      ],
    },
    {
      id: "capacitors",
      title: "Capacitors and dielectrics",
      minutes: 8,
      summary:
        "A capacitor stores charge and energy; its capacitance depends only on geometry and the dielectric between the plates, and inserting a dielectric changes Q, V, E and U differently depending on whether the battery stays connected.",
      examFocus:
        "Series and parallel combinations, energy stored, effect of changing plate separation or inserting a dielectric with the battery connected or removed, and energy density.",
      mechanism:
        "For a parallel-plate capacitor the field between the plates is σ/ε₀, so V = Ed = Qd/(ε₀A) and C = Q/V = ε₀A/d — larger plates hold more charge and closer plates need less voltage. A dielectric becomes polarised and sets up an opposing internal field, reducing the field and hence V for a given Q, which raises C to Kε₀A/d. If the battery stays connected, V is held fixed, so the extra capacitance draws more charge (Q → KQ). If the battery is removed first, Q is trapped, so V and E fall by K and the stored energy falls too. Charging a capacitor requires work against the growing voltage; the average voltage is V/2, which is why the energy stored is ½QV = ½CV².",
      points: [
        "C = Q/V; unit farad (F); parallel plate C = ε₀A/d, with dielectric C = Kε₀A/d.",
        "Parallel: C = C₁ + C₂ + … (same V); series: 1/C = 1/C₁ + 1/C₂ + … (same Q).",
        "Energy U = ½CV² = Q²/2C = ½QV; energy density u = ½ε₀E².",
        "A dielectric slab of thickness t (< d) gives C = ε₀A/(d − t + t/K); a metal slab gives C = ε₀A/(d − t).",
        "When two charged capacitors are joined, charge redistributes to a common potential and some energy is always lost as heat.",
        "Isolated sphere of radius R: C = 4πε₀R.",
      ],
      formulae: [
        { label: "Parallel-plate", expr: "C = Kε₀A/d" },
        { label: "Series", expr: "1/C = 1/C₁ + 1/C₂ + …" },
        { label: "Parallel", expr: "C = C₁ + C₂ + …" },
        { label: "Energy stored", expr: "U = ½CV² = Q²/2C" },
        { label: "Energy density", expr: "u = ½ε₀E²" },
        { label: "Partial dielectric slab", expr: "C = ε₀A/(d − t + t/K)" },
      ],
      table: {
        title: "Inserting a dielectric (constant K) fully between the plates",
        columns: ["Quantity", "Battery connected (V fixed)", "Battery removed (Q fixed)"],
        rows: [
          ["Capacitance", "K times", "K times"],
          ["Charge", "K times", "Unchanged"],
          ["Potential difference", "Unchanged", "1/K times"],
          ["Field between plates", "Unchanged", "1/K times"],
          ["Energy stored", "K times", "1/K times"],
        ],
      },
      pitfalls: [
        "First ask whether the battery is connected: it decides whether V or Q is the fixed quantity.",
        "Series capacitors combine like parallel resistors, and vice versa.",
      ],
      vignette: {
        stem: "Capacitors of 2 μF, 3 μF and 6 μF are connected in series across a 12 V battery. Find the equivalent capacitance, the charge on each and the total energy stored.",
        answer: "1 μF, 12 μC each, 72 μJ",
        reasoning:
          "1/C = 1/2 + 1/3 + 1/6 = 1, so C = 1 μF. In series each carries Q = CV = 1 μF × 12 V = 12 μC. U = ½CV² = ½ × 10⁻⁶ × 144 = 72 μJ.",
      },
      highYield:
        "C = Kε₀A/d; battery connected → V fixed; battery removed → Q fixed; U = ½CV², u = ½ε₀E².",
      checks: [
        {
          q: "A charged parallel-plate capacitor is disconnected from its battery and the plate separation is doubled. The stored energy:",
          options: ["Halves", "Doubles", "Is unchanged", "Becomes four times"],
          answer: 1,
          why: "Q stays fixed and C halves, so U = Q²/2C doubles (the extra energy comes from work done pulling the plates apart).",
        },
        {
          q: "2 μF and 4 μF capacitors are connected in parallel across 10 V. The total charge drawn from the source is:",
          options: ["20 μC", "40 μC", "13.3 μC", "60 μC"],
          answer: 3,
          why: "C(parallel) = 6 μF, so Q = CV = 6 × 10 = 60 μC.",
        },
      ],
    },
    {
      id: "current-resistivity",
      title: "Current, drift velocity and resistivity",
      minutes: 7,
      summary:
        "Current is the net flow of charge; in a metal it is carried by free electrons drifting slowly against the field, and resistance depends on the material, its dimensions and its temperature.",
      examFocus:
        "Drift velocity from I = neAv_d, resistance change when a wire is stretched, mobility, temperature coefficient of resistance, and ohmic vs non-ohmic behaviour.",
      mechanism:
        "Free electrons in a metal move randomly at high speeds, but an applied field gives each a tiny average drift opposite to E; they repeatedly collide with the vibrating ions, so the drift velocity v_d = eEτ/m is set by the mean relaxation time τ. Multiplying by the number of carriers crossing an area gives I = neAv_d. From this, the resistivity ρ = m/(ne²τ) is a property of the material alone, while resistance R = ρL/A also depends on shape. Heating a metal makes the ions vibrate more, shortening τ, so resistivity rises; in a semiconductor heating frees many more carriers (n rises steeply), so resistivity falls. When a wire is stretched its volume stays constant, so the area falls as the length rises and R grows as the square of the stretch factor.",
      points: [
        "I = dq/dt; current density j = I/A = nev_d; Ohm's law in vector form j = σE.",
        "Drift velocity v_d = eEτ/m is of order 10⁻⁴ m s⁻¹ — far smaller than the random thermal speed.",
        "Mobility μ = v_d/E = eτ/m, unit m² V⁻¹ s⁻¹.",
        "R = ρL/A; ρ = m/(ne²τ); conductivity σ = 1/ρ.",
        "Stretching a wire n times (constant volume): R → n²R.",
        "ρ_T = ρ₀[1 + α(T − T₀)]: α > 0 for metals, α < 0 for semiconductors.",
        "Alloys such as manganin and constantan have high resistivity and very weak temperature dependence, so they are used in standard resistors.",
        "Non-ohmic devices (diodes, for example) have non-linear or one-directional V–I graphs.",
      ],
      formulae: [
        { label: "Current and drift", expr: "I = neAv_d" },
        { label: "Drift velocity", expr: "v_d = eEτ/m" },
        { label: "Resistance", expr: "R = ρL/A" },
        { label: "Resistivity", expr: "ρ = m/(ne²τ)" },
        { label: "Temperature dependence", expr: "ρ_T = ρ₀[1 + α(T − T₀)]" },
      ],
      table: {
        title: "Temperature dependence of resistivity",
        columns: ["Material", "Effect of heating", "Reason"],
        rows: [
          ["Metals (copper)", "ρ increases", "τ decreases; n almost constant"],
          ["Semiconductors (Si, Ge)", "ρ decreases", "n increases strongly"],
          ["Alloys (manganin, constantan)", "ρ nearly constant", "Very small α"],
        ],
      },
      pitfalls: [
        "Drift velocity is tiny, yet a bulb lights almost instantly because the field is set up throughout the circuit at nearly the speed of light.",
        "When a wire is stretched, do not keep A fixed — volume is conserved, so R scales as n², not n.",
      ],
      vignette: {
        stem: "A copper wire of cross-section 1 mm² carries 1.36 A. Copper has 8.5 × 10²⁸ free electrons per m³ (e = 1.6 × 10⁻¹⁹ C). Find the drift velocity.",
        answer: "1 × 10⁻⁴ m s⁻¹",
        reasoning:
          "v_d = I/(neA) = 1.36 / (8.5 × 10²⁸ × 1.6 × 10⁻¹⁹ × 10⁻⁶) = 1.36 / (1.36 × 10⁴) = 10⁻⁴ m s⁻¹.",
      },
      highYield:
        "I = neAv_d; R = ρL/A; stretched n times → n²R; metals' ρ rises with T, semiconductors' ρ falls.",
      checks: [
        {
          q: "A wire of resistance R is stretched uniformly to three times its length. Its new resistance is:",
          options: ["3R", "R/3", "6R", "9R"],
          answer: 3,
          why: "With volume constant, A becomes A/3 while L becomes 3L, so R = ρ(3L)/(A/3) = 9R.",
        },
        {
          q: "As temperature increases, the resistivity of an intrinsic semiconductor:",
          options: ["Increases", "Decreases", "Is unchanged", "First increases, then decreases"],
          answer: 1,
          why: "More electron–hole pairs are generated, so n rises sharply and ρ falls (negative temperature coefficient).",
        },
      ],
    },
    {
      id: "kirchhoff-bridges",
      title: "Kirchhoff's laws, Wheatstone and metre bridge",
      minutes: 8,
      summary:
        "Kirchhoff's junction rule conserves charge and the loop rule conserves energy; a Wheatstone bridge is balanced when no current flows through the galvanometer, which the metre bridge uses to measure an unknown resistance.",
      examFocus:
        "Equivalent resistance of series–parallel networks, using the bridge balance condition to drop the middle resistor, metre-bridge balance length problems, and two-loop Kirchhoff calculations.",
      mechanism:
        "Charge cannot pile up at a junction in steady state, so the current flowing in equals the current flowing out (junction rule). Going once around any closed loop returns you to the same potential, so the EMFs must equal the IR drops (loop rule). In a Wheatstone bridge, if P/Q = R/S the two midpoints are at the same potential, so no current flows through the galvanometer and the middle branch can be removed from the calculation. The metre bridge is a Wheatstone bridge in which a uniform 1 m wire forms the ratio arms P and Q; since resistance of a uniform wire is proportional to length, the balance point l gives R/S = l/(100 − l). The method is a null method, so the galvanometer's own resistance does not affect the result.",
      points: [
        "Series: R = R₁ + R₂ + … (same current); parallel: 1/R = 1/R₁ + 1/R₂ + … (same voltage).",
        "n equal resistors R: series nR, parallel R/n.",
        "Junction rule: ΣI(in) = ΣI(out) — conservation of charge.",
        "Loop rule: ΣE = ΣIR around any closed loop — conservation of energy.",
        "Wheatstone balance: P/Q = R/S; the galvanometer branch then carries no current.",
        "Metre bridge: R/S = l/(100 − l), l in cm from the end next to R.",
        "Best accuracy when the balance point is near the middle of the wire; interchanging R and S checks for end errors.",
      ],
      formulae: [
        { label: "Series and parallel", expr: "R_s = ΣRᵢ, 1/R_p = Σ1/Rᵢ" },
        { label: "Junction rule", expr: "ΣI = 0 at a junction" },
        { label: "Loop rule", expr: "ΣE = ΣIR around a loop" },
        { label: "Wheatstone balance", expr: "P/Q = R/S" },
        { label: "Metre bridge", expr: "R = S l/(100 − l)" },
      ],
      flow: {
        title: "Solving a network with Kirchhoff's rules",
        steps: [
          {
            label: "Look for symmetry or balance",
            detail: "A balanced bridge lets you remove the middle resistor.",
          },
          {
            label: "Assign currents",
            detail: "Use the junction rule so each branch has one unknown current.",
          },
          {
            label: "Choose loops",
            detail: "Pick independent loops and a direction to traverse each.",
          },
          {
            label: "Write loop equations",
            detail: "IR drop is −IR along the current; EMF is +E going − to +.",
          },
          {
            label: "Solve and interpret",
            detail: "A negative current simply flows opposite to the assumed direction.",
          },
        ],
      },
      pitfalls: [
        "In the metre-bridge formula, l is measured from the end connected to the resistance in the numerator.",
        "A bridge is balanced only if the ratios match — do not delete the galvanometer branch otherwise.",
      ],
      vignette: {
        stem: "In a metre bridge, an unknown resistance X is in the left gap and 60 Ω in the right gap. The null point is 40 cm from the left end. Find X.",
        answer: "40 Ω",
        reasoning: "X/60 = l/(100 − l) = 40/60, so X = 60 × 40/60 = 40 Ω.",
      },
      highYield:
        "Junction rule = charge conservation; loop rule = energy conservation; balanced bridge P/Q = R/S; metre bridge R/S = l/(100 − l).",
      checks: [
        {
          q: "In a Wheatstone bridge P = 10 Ω, Q = 20 Ω and R = 15 Ω. For balance S must be:",
          options: ["7.5 Ω", "30 Ω", "25 Ω", "45 Ω"],
          answer: 1,
          why: "P/Q = R/S ⇒ S = RQ/P = 15 × 20/10 = 30 Ω.",
        },
        {
          q: "Kirchhoff's loop rule is a consequence of the conservation of:",
          options: ["Charge", "Momentum", "Energy", "Mass"],
          answer: 2,
          why: "The net change in potential around a closed loop is zero because the electrostatic field is conservative — energy conservation.",
        },
      ],
    },
    {
      id: "cells-emf",
      title: "Cells, EMF and internal resistance",
      minutes: 7,
      summary:
        "A cell's EMF is the work it does per unit charge; when current flows, part of it is lost across the internal resistance, so the terminal voltage differs from the EMF.",
      examFocus:
        "Terminal voltage while discharging and charging, current from series and parallel combinations of cells, and the maximum power transfer condition.",
      mechanism:
        "Inside a cell, chemical action pushes charge from the negative to the positive terminal, doing work E per coulomb. The electrolyte itself has resistance r, so when a current I flows a voltage Ir is lost inside and the terminal voltage V = E − Ir is less than the EMF. When a cell is being charged, current is forced backwards through it, and the external source must supply both the EMF and the internal drop, so V = E + Ir exceeds the EMF. Joining cells in series adds both EMFs and internal resistances, which suits a large external resistance; joining identical cells in parallel keeps the EMF but divides the internal resistance, which suits a small external load. The power delivered to an external resistor is greatest when R equals r.",
      points: [
        "EMF E = terminal voltage when no current flows (open circuit).",
        "Current I = E/(R + r); terminal voltage V = E − Ir = IR.",
        "Charging: V = E + Ir; short circuit: I = E/r, V = 0.",
        "n identical cells in series: I = nE/(R + nr).",
        "m identical cells in parallel: I = E/(R + r/m).",
        "Two unlike cells in parallel: E(eq) = (E₁r₂ + E₂r₁)/(r₁ + r₂), r(eq) = r₁r₂/(r₁ + r₂).",
        "Maximum power to the load when R = r: P(max) = E²/4r (efficiency then only 50%).",
      ],
      formulae: [
        { label: "Circuit current", expr: "I = E/(R + r)" },
        { label: "Terminal voltage", expr: "V = E − Ir (discharging), V = E + Ir (charging)" },
        { label: "Internal resistance", expr: "r = R(E/V − 1)" },
        { label: "Parallel cells", expr: "E(eq) = (E₁r₂ + E₂r₁)/(r₁ + r₂)" },
        { label: "Maximum power", expr: "P(max) = E²/4r at R = r" },
      ],
      table: {
        title: "Grouping of identical cells (EMF E, internal resistance r)",
        columns: ["Grouping", "Net EMF", "Net internal resistance", "Best when"],
        rows: [
          ["n in series", "nE", "nr", "R ≫ r"],
          ["m in parallel", "E", "r/m", "R ≪ r"],
          ["Mixed: m rows of n in series", "nE", "nr/m", "Maximum current when R = nr/m"],
        ],
      },
      pitfalls: [
        "Terminal voltage exceeds EMF only while the cell is being charged.",
        "Maximum power transfer is not maximum efficiency — at R = r half the energy is wasted inside the cell.",
      ],
      vignette: {
        stem: "A cell of EMF 2 V and internal resistance 0.5 Ω is connected to a 3.5 Ω resistor. Find the current, the terminal voltage and the power lost inside the cell.",
        answer: "0.5 A, 1.75 V, 0.125 W",
        reasoning:
          "I = E/(R + r) = 2/4 = 0.5 A. V = E − Ir = 2 − 0.25 = 1.75 V (= IR = 0.5 × 3.5). Internal loss = I²r = 0.25 × 0.5 = 0.125 W.",
      },
      highYield: "V = E − Ir on discharge, E + Ir on charge; maximum power E²/4r when R = r.",
      checks: [
        {
          q: "A 12 V battery has an internal resistance of 2 Ω. The maximum power it can deliver to an external resistor is:",
          options: ["72 W", "36 W", "18 W", "9 W"],
          answer: 2,
          why: "P(max) = E²/4r = 144/8 = 18 W, when R = 2 Ω.",
        },
        {
          q: "The terminal voltage of a cell is greater than its EMF when:",
          options: [
            "It is being charged",
            "It is short-circuited",
            "It supplies a large current",
            "The circuit is open",
          ],
          answer: 0,
          why: "During charging current flows into the positive terminal, so V = E + Ir > E.",
        },
      ],
    },
    {
      id: "electric-power",
      title: "Electrical energy, power and heating",
      minutes: 6,
      summary:
        "Electrical power is the rate at which a source does work on charges, P = VI; in a resistor it all appears as heat (Joule heating), which explains bulb brightness, heaters and fuses.",
      examFocus:
        "Choosing the right power formula for series vs parallel, which bulb glows brighter, resistance from a bulb's rating, energy in kWh and electricity bills.",
      mechanism:
        "Moving a charge q through a potential difference V transfers energy qV, so the rate of energy transfer is P = VI. In a resistor this energy is passed to the lattice through collisions and appears as heat, H = I²Rt. Which form of the power formula to use depends on what is common: in series the current is the same, so P = I²R and the larger resistance dissipates more; in parallel the voltage is the same, so P = V²/R and the smaller resistance dissipates more. A bulb rated P at voltage V has R = V²/P, so the lower-wattage bulb has the higher resistance — and therefore glows brighter when bulbs are in series. Household appliances are wired in parallel so each gets the full mains voltage and can be switched independently.",
      points: [
        "P = VI = I²R = V²/R; unit watt.",
        "Joule's law of heating: H = I²Rt.",
        "Rated resistance of a device: R = V(rated)²/P(rated).",
        "Series bulbs: the lower-wattage (higher R) bulb glows brighter; parallel: the higher-wattage bulb glows brighter.",
        "1 kWh (one 'unit') = 3.6 × 10⁶ J.",
        "Power loss in transmission lines = I²R, so power is transmitted at high voltage and low current.",
        "A fuse wire has low melting point and melts when the current exceeds its rating.",
      ],
      formulae: [
        { label: "Power", expr: "P = VI = I²R = V²/R" },
        { label: "Joule heating", expr: "H = I²Rt" },
        { label: "Rated resistance", expr: "R = V²/P" },
        { label: "Energy", expr: "E(kWh) = P(kW) × t(h)" },
      ],
      table: {
        title: "Which formula to use",
        columns: ["Connection", "Common quantity", "Use", "Brighter bulb"],
        rows: [
          ["Series", "Current", "P = I²R", "Higher R (lower rated wattage)"],
          ["Parallel", "Voltage", "P = V²/R", "Lower R (higher rated wattage)"],
        ],
      },
      pitfalls: [
        "A 25 W bulb is not always dimmer than a 100 W bulb — in series it is brighter.",
        "Power ratings assume the rated voltage; at half the voltage a resistor dissipates only a quarter of the power.",
      ],
      vignette: {
        stem: "Bulbs rated 100 W, 220 V and 25 W, 220 V are connected in series across 220 V mains. Find the power consumed by each.",
        answer: "100 W bulb: 4 W; 25 W bulb: 16 W",
        reasoning:
          "R₁ = 220²/100 = 484 Ω; R₂ = 220²/25 = 1936 Ω. I = 220/2420 = 1/11 A. P₁ = I²R₁ = 484/121 = 4 W; P₂ = 1936/121 = 16 W — the 25 W bulb glows brighter.",
      },
      highYield:
        "Series → P = I²R (higher R brighter); parallel → P = V²/R (lower R brighter); R(bulb) = V²/P.",
      checks: [
        {
          q: "A 1000 W heater is used for 2 hours a day for 30 days. The energy consumed is:",
          options: ["60 kWh", "6 kWh", "600 kWh", "2 kWh"],
          answer: 0,
          why: "E = 1 kW × 2 h × 30 = 60 kWh.",
        },
        {
          q: "The voltage across a fixed resistor is halved. The power dissipated becomes:",
          options: ["Half", "Double", "One-fourth", "Unchanged"],
          answer: 2,
          why: "P = V²/R, so halving V gives one-fourth the power.",
        },
      ],
    },
  ],
};
