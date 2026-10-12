import type { LearnModule } from "../../learn";

export const magnetism: LearnModule = {
  slug: "magnetism",
  group: "Physics",
  subject: "Physics",
  title: "Magnetism, EMI & AC",
  icon: "explore",
  blurb:
    "Biot–Savart and Ampere's laws, forces on moving charges and current-carrying conductors, the moving coil galvanometer and its conversions, magnetism and matter, Faraday's and Lenz's laws, self and mutual inductance, AC circuits with resonance and power factor, transformers and electromagnetic waves.",
  objectives: [
    "Learner can find the magnetic field of a wire, loop, solenoid and toroid using Biot–Savart or Ampere's law.",
    "Learner can describe the motion of a charge in a magnetic field and the forces and torques on current-carrying conductors.",
    "Learner can convert a galvanometer into an ammeter or voltmeter and classify materials as dia-, para- or ferromagnetic.",
    "Learner can calculate induced EMF from changing flux, motional EMF and self-induction, and give the direction using Lenz's law.",
    "Learner can solve series LCR circuits for impedance, phase, resonance and power, and apply transformer and EM-wave relations.",
  ],
  concepts: [
    {
      id: "biot-savart-ampere",
      title: "Biot–Savart law and Ampere's circuital law",
      minutes: 8,
      summary:
        "Moving charges create magnetic fields; Biot–Savart gives the field of each small current element, and Ampere's law gives the field directly when the current distribution is symmetric.",
      examFocus:
        "Field at the centre and on the axis of a circular loop, field of a long straight wire, field inside a solenoid and toroid, and direction by the right-hand rule.",
      mechanism:
        "A small current element I dl produces a field proportional to I dl sinθ/r², perpendicular to both dl and the line to the point — so there is no field along the wire's own line. Adding these contributions around a circular loop, every element is at the same distance from the centre and contributes in the same direction, giving μ₀I/2R. For long straight wires and solenoids, Ampere's law is easier: the line integral of B around a closed loop equals μ₀ times the current threading it. Around a long wire B is the same on a circle, giving μ₀I/2πr; inside a long solenoid the field is uniform and nearly zero outside, so B = μ₀nI. A toroid is a solenoid bent into a ring, so its field is confined inside the core.",
      points: [
        "μ₀ = 4π × 10⁻⁷ T m A⁻¹.",
        "Biot–Savart: dB = (μ₀/4π) I dl sinθ/r², direction of dl × r̂.",
        "Long straight wire: B = μ₀I/2πr; field lines are concentric circles (right-hand thumb rule).",
        "Centre of a circular coil of N turns: B = μ₀NI/2R; on the axis: B = μ₀NIR²/[2(R² + x²)^(3/2)].",
        "Ampere's law: ∮B·dl = μ₀I(enclosed).",
        "Long solenoid: B = μ₀nI inside (n = turns per unit length), uniform; about half this value at the ends.",
        "Toroid: B = μ₀NI/2πr inside the core, zero in the open space inside and outside.",
      ],
      formulae: [
        { label: "Biot–Savart", expr: "dB = (μ₀/4π) I dl sinθ/r²" },
        { label: "Straight wire", expr: "B = μ₀I/(2πr)" },
        { label: "Circular loop (centre)", expr: "B = μ₀NI/(2R)" },
        { label: "Ampere's law", expr: "∮B·dl = μ₀I(enclosed)" },
        { label: "Solenoid", expr: "B = μ₀nI" },
        { label: "Toroid", expr: "B = μ₀NI/(2πr)" },
      ],
      table: {
        title: "Magnetic fields of standard current distributions",
        columns: ["Source", "Field", "Depends on"],
        rows: [
          ["Long straight wire", "μ₀I/2πr", "1/r"],
          ["Circular loop, centre", "μ₀NI/2R", "1/R"],
          ["Circular loop, far on axis", "μ₀NIR²/2x³", "1/x³ (dipole-like)"],
          ["Long solenoid, inside", "μ₀nI", "Turns per length only"],
          ["Toroid, inside core", "μ₀NI/2πr", "Mean radius"],
        ],
      },
      pitfalls: [
        "In B = μ₀nI, n is turns per metre, not the total number of turns.",
        "A point on the line of a straight current element gets no field from it (sinθ = 0).",
      ],
      vignette: {
        stem: "A solenoid 0.5 m long has 500 turns and carries 2 A. Find the magnetic field inside it.",
        answer: "About 2.5 × 10⁻³ T",
        reasoning:
          "n = 500/0.5 = 1000 m⁻¹. B = μ₀nI = 4π × 10⁻⁷ × 1000 × 2 = 8π × 10⁻⁴ ≈ 2.51 × 10⁻³ T.",
      },
      highYield:
        "Wire μ₀I/2πr; loop centre μ₀NI/2R; solenoid μ₀nI; toroid μ₀NI/2πr.",
      checks: [
        {
          q: "The magnetic field 5 cm from a long straight wire carrying 10 A is:",
          options: ["2 × 10⁻⁵ T", "4 × 10⁻⁵ T", "4 × 10⁻⁶ T", "2 × 10⁻⁴ T"],
          answer: 1,
          why: "B = μ₀I/2πr = 2 × 10⁻⁷ × 10/0.05 = 4 × 10⁻⁵ T.",
        },
        {
          q: "The magnetic field inside a long ideal solenoid is:",
          options: [
            "Zero",
            "Maximum near the walls",
            "Uniform along and across the solenoid",
            "Inversely proportional to the radius",
          ],
          answer: 2,
          why: "Ampere's law gives B = μ₀nI throughout the interior, independent of position and radius.",
        },
      ],
    },
    {
      id: "lorentz-force",
      title: "Force on moving charges and current-carrying conductors",
      minutes: 8,
      summary:
        "A magnetic field exerts a force qv × B on a moving charge, perpendicular to its velocity, so it bends the path without changing speed; on a wire this becomes IL × B, and on a loop it produces a torque.",
      examFocus:
        "Radius and period of circular motion of a charge, velocity selector, force between parallel wires, and torque on a current loop.",
      mechanism:
        "Because the magnetic force qv × B is always perpendicular to v, it does no work, so the speed and kinetic energy of the charge never change — only its direction. For v perpendicular to a uniform B, this constant-magnitude sideways force provides the centripetal force, so qvB = mv²/r and r = mv/qB. The period 2πm/qB does not depend on the speed, since a faster particle moves on a proportionally larger circle. If v has a component along B, that component is unaffected and the path becomes a helix. Two parallel wires each sit in the other's field; working out the directions shows that currents in the same direction attract and opposite currents repel. A current loop in a field feels no net force but a torque that turns its magnetic moment m = NIA towards B.",
      points: [
        "Lorentz force F = q(E + v × B); magnetic part qvB sinθ.",
        "Magnetic force does no work; speed and KE stay constant.",
        "v ⊥ B: circle with r = mv/qB = p/qB = √(2mK)/qB; period T = 2πm/qB, independent of v.",
        "v at an angle to B: helical path; pitch = (2πm/qB) v cosθ.",
        "Crossed E and B fields pass undeviated only those charges with v = E/B (velocity selector).",
        "Force on a wire F = IL × B; parallel wires: F/L = μ₀I₁I₂/2πd, like currents attract.",
        "Torque on a loop τ = m × B = NIAB sinθ, where θ is the angle between the loop's normal and B.",
      ],
      formulae: [
        { label: "Lorentz force", expr: "F = q(E + v × B)" },
        { label: "Radius of path", expr: "r = mv/(qB)" },
        { label: "Period", expr: "T = 2πm/(qB)" },
        { label: "Force on a conductor", expr: "F = IL × B" },
        { label: "Parallel wires", expr: "F/L = μ₀I₁I₂/(2πd)" },
        { label: "Torque on a loop", expr: "τ = NIAB sinθ" },
      ],
      table: {
        title: "Path of a charge in a uniform magnetic field",
        columns: ["Angle between v and B", "Path", "Key result"],
        rows: [
          ["0° or 180°", "Straight line", "No force"],
          ["90°", "Circle", "r = mv/qB"],
          ["Any other angle", "Helix", "Pitch = v cosθ × 2πm/qB"],
        ],
      },
      pitfalls: [
        "A magnetic field cannot change the kinetic energy of a charge — options claiming it speeds the charge up are wrong.",
        "For particles with the same kinetic energy, r ∝ √m/q, not m/q.",
      ],
      vignette: {
        stem: "A proton (m = 1.67 × 10⁻²⁷ kg, q = 1.6 × 10⁻¹⁹ C) moves at 10⁶ m s⁻¹ perpendicular to a uniform field of 0.1 T. Find the radius of its path.",
        answer: "About 0.10 m",
        reasoning:
          "r = mv/qB = (1.67 × 10⁻²⁷ × 10⁶)/(1.6 × 10⁻¹⁹ × 0.1) = 1.67 × 10⁻²¹/1.6 × 10⁻²⁰ ≈ 0.104 m.",
      },
      highYield:
        "r = mv/qB, T = 2πm/qB (speed-independent); magnetic force does no work; like currents attract.",
      checks: [
        {
          q: "Two long parallel wires 1 m apart in vacuum each carry 1 A in the same direction. The force per metre between them is:",
          options: ["2 × 10⁻⁷ N, repulsive", "2 × 10⁻⁷ N, attractive", "4π × 10⁻⁷ N, attractive", "10⁻⁷ N, attractive"],
          answer: 1,
          why: "F/L = μ₀I₁I₂/2πd = 2 × 10⁻⁷ × 1 × 1/1 = 2 × 10⁻⁷ N m⁻¹; like currents attract.",
        },
        {
          q: "A charged particle moves in a circle in a uniform magnetic field. If its speed is doubled, its period of revolution:",
          options: ["Doubles", "Halves", "Becomes four times", "Is unchanged"],
          answer: 3,
          why: "T = 2πm/qB does not contain v.",
        },
      ],
    },
    {
      id: "galvanometer",
      title: "Moving coil galvanometer and its conversions",
      minutes: 7,
      summary:
        "A coil in a radial magnetic field turns until the spring's restoring torque balances the magnetic torque, so the deflection is proportional to current; a shunt turns it into an ammeter and a series resistance into a voltmeter.",
      examFocus:
        "Shunt for an ammeter, series resistance for a voltmeter, current and voltage sensitivity, and the effect of changing the number of turns.",
      mechanism:
        "The pole pieces are curved and a soft-iron core sits inside the coil, so the field is radial and the coil's plane is always parallel to B — the torque is therefore NIAB at every deflection. This is balanced by the spring's torque kφ, giving φ = (NAB/k)I, a linear scale. To measure a large current, most of it must bypass the delicate coil, so a small shunt resistance is placed in parallel; the combination has a very low resistance, as an ammeter should. To measure voltage, a large resistance is placed in series so that only a tiny current flows and the meter draws little from the circuit. Adding turns raises the current sensitivity, but also raises the coil's resistance in the same ratio, so the voltage sensitivity does not change.",
      points: [
        "Radial field and soft-iron core make τ = NIAB constant in form for all deflections.",
        "Equilibrium: NIAB = kφ, so φ ∝ I (linear scale).",
        "Current sensitivity φ/I = NAB/k; voltage sensitivity φ/V = NAB/(kG).",
        "Ammeter: shunt S = I_gG/(I − I_g) in parallel; ideal ammeter has zero resistance.",
        "Voltmeter: series R = V/I_g − G; ideal voltmeter has infinite resistance.",
        "Ammeter goes in series with the circuit element; voltmeter goes in parallel across it.",
      ],
      formulae: [
        { label: "Deflection", expr: "φ = (NAB/k) I" },
        { label: "Current sensitivity", expr: "I_s = NAB/k" },
        { label: "Voltage sensitivity", expr: "V_s = NAB/(kG)" },
        { label: "Shunt for ammeter", expr: "S = I_gG/(I − I_g)" },
        { label: "Series resistance for voltmeter", expr: "R = V/I_g − G" },
      ],
      table: {
        title: "Converting a galvanometer (resistance G, full-scale current I_g)",
        columns: ["Meter", "Added resistance", "How connected", "Net resistance"],
        rows: [
          ["Ammeter (range I)", "S = I_gG/(I − I_g), small", "Parallel to coil", "Very low (≈ S)"],
          ["Voltmeter (range V)", "R = V/I_g − G, large", "Series with coil", "Very high (R + G)"],
        ],
      },
      pitfalls: [
        "Doubling the number of turns doubles current sensitivity but leaves voltage sensitivity unchanged (G also doubles).",
        "Shunt goes in parallel and is small; the voltmeter resistance goes in series and is large — do not swap them.",
      ],
      vignette: {
        stem: "A galvanometer of resistance 50 Ω gives full-scale deflection at 5 mA. What resistance is needed to convert it into (a) an ammeter of range 0–5 A and (b) a voltmeter of range 0–10 V?",
        answer: "(a) about 0.05 Ω shunt in parallel; (b) 1950 Ω in series",
        reasoning:
          "(a) S = I_gG/(I − I_g) = 0.005 × 50/4.995 ≈ 0.050 Ω. (b) R = V/I_g − G = 10/0.005 − 50 = 2000 − 50 = 1950 Ω.",
      },
      highYield:
        "Ammeter: small shunt in parallel; voltmeter: large resistance in series; voltage sensitivity is independent of N.",
      checks: [
        {
          q: "To convert a galvanometer into a voltmeter, one must connect:",
          options: [
            "A low resistance in parallel",
            "A high resistance in parallel",
            "A low resistance in series",
            "A high resistance in series",
          ],
          answer: 3,
          why: "A large series resistance limits the current to I_g at the full-scale voltage and makes the meter's resistance high.",
        },
        {
          q: "If the number of turns of a galvanometer coil is doubled (other factors constant), its voltage sensitivity:",
          options: ["Doubles", "Is unchanged", "Halves", "Becomes four times"],
          answer: 1,
          why: "Current sensitivity doubles, but coil resistance G also doubles, so NAB/(kG) is unchanged.",
        },
      ],
    },
    {
      id: "magnetism-matter",
      title: "Magnetism and matter",
      minutes: 8,
      summary:
        "A bar magnet behaves like a solenoid — a magnetic dipole; materials respond to an applied field as diamagnetic, paramagnetic or ferromagnetic depending on their atomic magnetic moments.",
      examFocus:
        "Axial and equatorial fields of a bar magnet, torque and energy of a dipole in a field, classifying a material from χ or μᵣ, Curie's law, and examples of each class.",
      mechanism:
        "Circulating electrons and their spins give atoms magnetic moments, so a bar magnet behaves like a solenoid with moment m and its far field has the same dipole form as an electric dipole. In a diamagnetic substance atoms have no net moment; an applied field induces a small opposing moment, so the material is weakly repelled and moves from stronger to weaker field. In a paramagnet each atom has a permanent moment, but thermal agitation randomises them; a field aligns them partly, so χ is small and positive and falls as 1/T (Curie's law). In a ferromagnet neighbouring moments line up spontaneously in domains, so even a weak field aligns domains and produces a very large magnetisation. Above the Curie temperature this ordering is destroyed and the ferromagnet becomes paramagnetic.",
      points: [
        "Bar magnet field: axial B = μ₀2m/4πr³, equatorial B = μ₀m/4πr³ (far field).",
        "Torque τ = m × B; energy U = −mB cosθ; work to turn from θ = 0 to 180° = 2mB.",
        "Magnetic field lines form closed loops; there are no isolated magnetic poles.",
        "B = μ₀(H + M); susceptibility χ = M/H; relative permeability μᵣ = 1 + χ.",
        "Diamagnetic: χ small negative (−1 ≤ χ < 0), μᵣ < 1 — bismuth, copper, lead, water, nitrogen (STP); superconductors are perfect diamagnets (Meissner effect).",
        "Paramagnetic: χ small positive, μᵣ slightly > 1 — aluminium, sodium, calcium, oxygen (STP).",
        "Ferromagnetic: χ ≫ 1 — iron, cobalt, nickel, gadolinium; become paramagnetic above the Curie temperature.",
        "Curie's law for paramagnets: χ = C/T.",
      ],
      formulae: [
        { label: "Dipole field (axial)", expr: "B = μ₀2m/(4πr³)" },
        { label: "Dipole field (equatorial)", expr: "B = μ₀m/(4πr³)" },
        { label: "Torque and energy", expr: "τ = mB sinθ, U = −mB cosθ" },
        { label: "Magnetic induction", expr: "B = μ₀(H + M)" },
        { label: "Permeability", expr: "μᵣ = 1 + χ" },
        { label: "Curie's law", expr: "χ = C/T", note: "paramagnets" },
      ],
      table: {
        title: "Classes of magnetic materials",
        columns: ["Property", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          ["Susceptibility χ", "Small, negative", "Small, positive", "Very large, positive"],
          ["μᵣ", "Slightly < 1", "Slightly > 1", "≫ 1"],
          ["In a non-uniform field", "Moves to weaker field", "Moves to stronger field", "Strongly attracted"],
          ["Temperature dependence", "Practically none", "χ ∝ 1/T", "Para above Curie temperature"],
          ["Examples", "Bi, Cu, Pb, H₂O", "Al, Na, Ca, O₂", "Fe, Co, Ni, Gd"],
        ],
      },
      pitfalls: [
        "Copper and water are diamagnetic, while aluminium is paramagnetic — a frequent trap.",
        "Curie's law applies to paramagnets; diamagnetism is essentially independent of temperature.",
      ],
      vignette: {
        stem: "A bar magnet of moment 0.5 A m² lies at 30° to a uniform field of 0.2 T. Find the torque on it and the work needed to turn it from the aligned position to the anti-aligned position.",
        answer: "0.05 N m; 0.2 J",
        reasoning:
          "τ = mB sinθ = 0.5 × 0.2 × 0.5 = 0.05 N m. W = U(180°) − U(0°) = mB − (−mB) = 2mB = 2 × 0.5 × 0.2 = 0.2 J.",
      },
      highYield:
        "Dia: χ < 0 (Cu, Bi, water); para: small χ > 0, χ ∝ 1/T (Al, O₂); ferro: huge χ, para above Curie point (Fe, Co, Ni, Gd).",
      checks: [
        {
          q: "A small rod of a material, placed in a non-uniform magnetic field, moves towards the weaker field region. The material is:",
          options: ["Ferromagnetic", "Paramagnetic", "Diamagnetic", "Any of these"],
          answer: 2,
          why: "Diamagnets acquire a moment opposing the field and are pushed from stronger to weaker regions.",
        },
        {
          q: "For a paramagnetic substance, if absolute temperature is doubled the susceptibility becomes:",
          options: ["Half", "Double", "Four times", "Unchanged"],
          answer: 0,
          why: "Curie's law χ = C/T: doubling T halves χ.",
        },
      ],
    },
    {
      id: "faraday-lenz",
      title: "Faraday's law, Lenz's law and motional EMF",
      minutes: 8,
      summary:
        "An EMF is induced whenever the magnetic flux linked with a circuit changes; its size is the rate of change of flux and its direction always opposes the change that caused it.",
      examFocus:
        "Induced EMF from a flux–time change, motional EMF Blv and the force needed to keep a rod moving, EMF of a rotating rod, eddy currents and the AC generator.",
      mechanism:
        "Flux φ = BA cosθ can change if B changes, if the area changes, or if the orientation changes, and any of these induces an EMF ε = −N dφ/dt. The minus sign is Lenz's law: the induced current sets up its own field to oppose the change in flux. This is required by energy conservation — if the induced current aided the change, it would accelerate itself and create energy from nothing. In a rod moving through a field, the magnetic force on its free charges pushes them to one end, creating the motional EMF Blv; the induced current then feels a force opposing the motion, so you must do work to keep the rod moving, and that work appears as heat in the circuit. Bulk conductors in changing flux develop swirling eddy currents, which waste energy but are also exploited in brakes, damping and induction furnaces.",
      points: [
        "Magnetic flux φ = B·A = BA cosθ; unit weber (Wb) = T m².",
        "Faraday: ε = −N dφ/dt; induced charge Δq = NΔφ/R depends only on the total flux change, not on how fast.",
        "Lenz's law is a consequence of conservation of energy.",
        "Motional EMF ε = Blv (rod, velocity and B mutually perpendicular).",
        "Rod of length l rotating about one end with angular speed ω: ε = ½Bωl².",
        "Eddy currents: reduced by laminating cores; used in magnetic brakes in trains, electromagnetic damping, induction furnaces and electric power meters.",
        "AC generator: ε = NBAω sin ωt, peak ε₀ = NBAω.",
      ],
      formulae: [
        { label: "Faraday's law", expr: "ε = −N dφ/dt" },
        { label: "Motional EMF", expr: "ε = Blv" },
        { label: "Rotating rod", expr: "ε = ½Bωl²" },
        { label: "Induced charge", expr: "Δq = NΔφ/R" },
        { label: "AC generator", expr: "ε = NBAω sin ωt" },
      ],
      flow: {
        title: "Finding the direction of induced current (Lenz's law)",
        steps: [
          { label: "Original field", detail: "Note the direction of B through the loop." },
          { label: "Change", detail: "Is the flux through the loop increasing or decreasing?" },
          { label: "Opposition", detail: "Induced B opposes an increase, or supports a decrease." },
          { label: "Current direction", detail: "Use the right-hand rule to get the current that makes that induced B." },
        ],
      },
      pitfalls: [
        "Induced charge depends on the total change in flux and the resistance, not on the rate of change.",
        "A loop moving through a uniform field with no change in flux has no induced EMF, even though it is moving.",
      ],
      vignette: {
        stem: "A 0.5 m rod slides at 4 m s⁻¹ on rails perpendicular to a 0.2 T field; the circuit resistance is 2 Ω. Find the EMF, the current and the force needed to keep the rod moving at constant speed.",
        answer: "0.4 V, 0.2 A, 0.02 N",
        reasoning:
          "ε = Blv = 0.2 × 0.5 × 4 = 0.4 V. I = ε/R = 0.2 A. Opposing magnetic force = BIl = 0.2 × 0.2 × 0.5 = 0.02 N, so an equal applied force is needed (power 0.08 W = I²R).",
      },
      highYield:
        "ε = −N dφ/dt; Lenz = energy conservation; motional EMF Blv; rotating rod ½Bωl²; laminate cores to cut eddy currents.",
      checks: [
        {
          q: "The flux through a 100-turn coil falls from 5 mWb to 1 mWb in 0.1 s. The average induced EMF is:",
          options: ["0.4 V", "40 V", "4 V", "6 V"],
          answer: 2,
          why: "ε = NΔφ/Δt = 100 × 4 × 10⁻³/0.1 = 4 V.",
        },
        {
          q: "Lenz's law is a consequence of the conservation of:",
          options: ["Charge", "Energy", "Momentum", "Mass"],
          answer: 1,
          why: "If the induced current aided the flux change, energy would be created without any work being done.",
        },
      ],
    },
    {
      id: "inductance",
      title: "Self and mutual inductance",
      minutes: 6,
      summary:
        "A coil opposes changes in its own current (self-inductance) and induces an EMF in a nearby coil when its current changes (mutual inductance); inductance stores energy in the magnetic field.",
      examFocus:
        "Self-induced EMF from dI/dt, inductance of a solenoid and its dependence on N, energy stored ½LI², and mutual inductance of coaxial solenoids.",
      mechanism:
        "A current in a coil produces flux through its own turns proportional to the current, Nφ = LI. When the current changes, this self-linked flux changes and, by Faraday and Lenz, induces a back EMF −L dI/dt that resists the change — inductance is the electrical analogue of inertia. For a long solenoid the field μ₀nI fills the volume Al and links all N turns, so L = μ₀N²A/l: it grows as the square of the number of turns. Building up the current requires work against this back EMF, which is stored in the magnetic field as ½LI². Mutual inductance arises the same way between two coils, and for two coaxial solenoids M depends on both turn densities and the common area.",
      points: [
        "Self-inductance: Nφ = LI; ε = −L dI/dt; unit henry (H) = Wb A⁻¹ = V s A⁻¹.",
        "Long solenoid: L = μ₀n²Al = μ₀N²A/l; with a core of relative permeability μᵣ, L = μᵣμ₀N²A/l.",
        "Mutual inductance: N₂φ₂ = MI₁; ε₂ = −M dI₁/dt; coaxial solenoids M = μ₀n₁n₂πr₁²l (r₁ = inner radius).",
        "M₁₂ = M₂₁ (reciprocity).",
        "Energy stored U = ½LI²; magnetic energy density u = B²/2μ₀.",
        "Inductance acts like inertia: it opposes changes in current, not the current itself.",
      ],
      formulae: [
        { label: "Self-induced EMF", expr: "ε = −L dI/dt" },
        { label: "Solenoid inductance", expr: "L = μ₀N²A/l" },
        { label: "Mutual EMF", expr: "ε₂ = −M dI₁/dt" },
        { label: "Coaxial solenoids", expr: "M = μ₀n₁n₂πr₁²l" },
        { label: "Energy stored", expr: "U = ½LI²" },
        { label: "Energy density", expr: "u = B²/2μ₀" },
      ],
      table: {
        title: "Mechanical analogy for inductance",
        columns: ["Mechanics", "Electricity"],
        rows: [
          ["Mass m (inertia)", "Inductance L"],
          ["Velocity v", "Current I"],
          ["Kinetic energy ½mv²", "Magnetic energy ½LI²"],
          ["Force opposes change in motion", "Back EMF opposes change in current"],
        ],
      },
      pitfalls: [
        "L depends on N², so doubling the turns at the same length and area quadruples L.",
        "A steady current through an ideal inductor induces no EMF — only a changing current does.",
      ],
      vignette: {
        stem: "The current in a 0.5 H coil falls uniformly from 2 A to zero in 0.05 s. Find the average self-induced EMF and the energy initially stored.",
        answer: "20 V; 1 J",
        reasoning:
          "ε = L ΔI/Δt = 0.5 × 2/0.05 = 20 V. U = ½LI² = ½ × 0.5 × 2² = 1 J.",
      },
      highYield:
        "ε = −L dI/dt; L = μ₀N²A/l ∝ N²; U = ½LI²; inductance is electrical inertia.",
      checks: [
        {
          q: "The number of turns of a solenoid is doubled keeping its length and area fixed. Its self-inductance becomes:",
          options: ["Double", "Half", "Unchanged", "Four times"],
          answer: 3,
          why: "L = μ₀N²A/l ∝ N², so it becomes 4 times.",
        },
        {
          q: "The SI unit henry is equivalent to:",
          options: ["Wb A", "V s A⁻¹", "V A s⁻¹", "T m A"],
          answer: 1,
          why: "From ε = L dI/dt, L = ε/(dI/dt) has unit V/(A s⁻¹) = V s A⁻¹ (also Wb A⁻¹).",
        },
      ],
    },
    {
      id: "ac-lcr",
      title: "AC circuits, LCR resonance and power factor",
      minutes: 9,
      summary:
        "In AC, resistors keep current in phase with voltage while inductors make it lag and capacitors make it lead by 90°; in a series LCR circuit the reactances partly cancel, giving impedance, resonance and a power factor.",
      examFocus:
        "rms values, reactances and their frequency dependence, impedance and phase angle, resonant frequency and quality factor, and average power with power factor (wattless current).",
      mechanism:
        "An inductor's back EMF opposes changes in current, so the current reaches its peak a quarter cycle after the voltage, and the opposition X_L = ωL grows with frequency. A capacitor must charge before its voltage builds, so the current peaks a quarter cycle before the voltage, and X_C = 1/ωC falls with frequency. In series, the inductor and capacitor voltages are exactly opposite in phase, so their reactances subtract and Z = √(R² + (X_L − X_C)²). At the resonant frequency ω₀ = 1/√(LC) they cancel completely, Z = R is minimum and the current is maximum. Only the resistor dissipates energy on average, because in L and C energy is stored for half a cycle and returned in the next; hence average power is V(rms)I(rms) cosφ with cosφ = R/Z.",
      points: [
        "I(rms) = I₀/√2, V(rms) = V₀/√2; AC meters read rms values; 220 V mains has a peak of about 311 V.",
        "X_L = ωL ∝ ν; X_C = 1/ωC ∝ 1/ν; a capacitor blocks DC, an inductor passes it.",
        "Series LCR: Z = √(R² + (X_L − X_C)²), tanφ = (X_L − X_C)/R.",
        "Resonance: X_L = X_C, ω₀ = 1/√(LC), Z = R, current maximum, cosφ = 1.",
        "Quality factor Q = ω₀L/R = 1/(ω₀CR); higher Q means sharper resonance.",
        "Average power P = V(rms)I(rms) cosφ; power factor cosφ = R/Z.",
        "Purely inductive or capacitive circuit: φ = 90°, P = 0 — the current is wattless.",
      ],
      formulae: [
        { label: "rms value", expr: "I(rms) = I₀/√2" },
        { label: "Reactances", expr: "X_L = ωL, X_C = 1/(ωC)" },
        { label: "Impedance", expr: "Z = √(R² + (X_L − X_C)²)" },
        { label: "Resonance", expr: "ω₀ = 1/√(LC), ν₀ = 1/(2π√(LC))" },
        { label: "Average power", expr: "P = V(rms) I(rms) cosφ, cosφ = R/Z" },
        { label: "Quality factor", expr: "Q = ω₀L/R" },
      ],
      table: {
        title: "Single elements in an AC circuit",
        columns: ["Element", "Opposition", "Phase of current vs voltage", "Average power"],
        rows: [
          ["Resistor R", "R", "In phase", "V(rms)I(rms)"],
          ["Inductor L", "X_L = ωL", "Lags by π/2", "Zero"],
          ["Capacitor C", "X_C = 1/ωC", "Leads by π/2", "Zero"],
        ],
      },
      pitfalls: [
        "At resonance the voltages across L and C can each exceed the source voltage; they cancel each other, not vanish.",
        "Power factor cosφ = R/Z, not X/Z; for a pure L or C it is zero.",
      ],
      vignette: {
        stem: "A series LCR circuit has R = 30 Ω, X_L = 80 Ω and X_C = 40 Ω and is connected to a 200 V (rms) supply. Find Z, the rms current, the power factor and the average power.",
        answer: "Z = 50 Ω, I = 4 A, cosφ = 0.6, P = 480 W",
        reasoning:
          "Z = √(30² + 40²) = 50 Ω. I = 200/50 = 4 A. cosφ = R/Z = 0.6. P = VI cosφ = 200 × 4 × 0.6 = 480 W (check: I²R = 16 × 30 = 480 W). Since X_L > X_C, current lags the voltage.",
      },
      highYield:
        "Z = √(R² + (X_L − X_C)²); resonance ω₀ = 1/√(LC) with Z = R; P = V(rms)I(rms) cosφ; pure L or C draws wattless current.",
      checks: [
        {
          q: "A series LCR circuit has L = 0.1 H and C = 10 μF. Its resonant angular frequency is:",
          options: ["100 rad s⁻¹", "10⁴ rad s⁻¹", "1000 rad s⁻¹", "10 rad s⁻¹"],
          answer: 2,
          why: "ω₀ = 1/√(LC) = 1/√(0.1 × 10⁻⁵) = 1/√(10⁻⁶) = 1000 rad s⁻¹.",
        },
        {
          q: "At resonance in a series LCR circuit, the power factor is:",
          options: ["1", "0", "0.5", "1/√2"],
          answer: 0,
          why: "X_L = X_C, so Z = R and cosφ = R/Z = 1.",
        },
      ],
    },
    {
      id: "transformer-em-waves",
      title: "Transformers and electromagnetic waves",
      minutes: 7,
      summary:
        "A transformer uses mutual induction to step AC voltage up or down; Maxwell's displacement current completes Ampere's law and predicts electromagnetic waves travelling at c.",
      examFocus:
        "Turns ratio and current in an ideal transformer, sources of energy loss, displacement current, E₀ = cB₀, and the order and uses of the EM spectrum.",
      mechanism:
        "The alternating primary current drives a changing flux through a shared soft-iron core, and every turn of either coil links the same flux, so the induced voltage per turn is the same in both coils: Vₛ/Vₚ = Nₛ/Nₚ. For an ideal transformer no power is lost, so VₚIₚ = VₛIₛ, and stepping up voltage steps down current — which is why power is transmitted at high voltage to cut I²R losses. Maxwell noticed that Ampere's law fails between capacitor plates, where there is no conduction current but the electric flux is changing, and added the displacement current ε₀ dφ_E/dt. With this term a changing E produces B and a changing B produces E, so the two fields can sustain each other and travel through empty space. The predicted speed 1/√(μ₀ε₀) equals the speed of light, showing that light is an electromagnetic wave.",
      points: [
        "Ideal transformer: Vₛ/Vₚ = Nₛ/Nₚ = Iₚ/Iₛ; step-up has Nₛ > Nₚ; works only with AC.",
        "Losses: copper (I²R) loss, eddy currents (reduced by a laminated core), hysteresis loss (reduced by a soft-iron core), and flux leakage.",
        "Displacement current I_d = ε₀ dφ_E/dt; it equals the conduction current in the wires charging a capacitor.",
        "EM waves are transverse: E, B and the direction of travel are mutually perpendicular; E₀/B₀ = c.",
        "c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m s⁻¹ in vacuum; EM waves need no medium and carry energy and momentum.",
        "Spectrum in order of decreasing wavelength: radio, microwave, infrared, visible, ultraviolet, X-rays, gamma rays.",
        "Uses: microwaves for radar and ovens; infrared for remote controls and physical therapy; UV for sterilising water and LASIK; X-rays for medical imaging; gamma rays for cancer treatment.",
      ],
      formulae: [
        { label: "Transformer ratio", expr: "Vₛ/Vₚ = Nₛ/Nₚ = Iₚ/Iₛ", note: "ideal transformer" },
        { label: "Efficiency", expr: "η = output power / input power" },
        { label: "Displacement current", expr: "I_d = ε₀ dφ_E/dt" },
        { label: "Speed of EM waves", expr: "c = 1/√(μ₀ε₀) = E₀/B₀" },
      ],
      table: {
        title: "The electromagnetic spectrum (decreasing wavelength)",
        columns: ["Band", "Typical source", "One use"],
        rows: [
          ["Radio waves", "Accelerating charges in antennas", "Radio and TV communication"],
          ["Microwaves", "Klystron, magnetron", "Radar, microwave ovens"],
          ["Infrared", "Hot bodies and molecules", "Remote controls, physical therapy"],
          ["Visible", "Electron transitions in atoms", "Vision"],
          ["Ultraviolet", "Very hot bodies, the Sun", "Sterilising water, LASIK"],
          ["X-rays", "Electrons hitting a metal target", "Medical imaging"],
          ["Gamma rays", "Nuclear reactions and decay", "Cancer treatment"],
        ],
      },
      pitfalls: [
        "A step-up transformer raises voltage but lowers current — it does not create power.",
        "A transformer does not work on steady DC because a constant current produces no change of flux.",
      ],
      vignette: {
        stem: "An ideal transformer has 2000 turns on the primary connected to 220 V AC and must supply 11 V. Find the number of secondary turns and the primary current when the secondary supplies 4 A.",
        answer: "100 turns; 0.2 A",
        reasoning:
          "Nₛ = Nₚ × Vₛ/Vₚ = 2000 × 11/220 = 100. Power balance: Iₚ = VₛIₛ/Vₚ = 11 × 4/220 = 0.2 A.",
      },
      highYield:
        "Vₛ/Vₚ = Nₛ/Nₚ = Iₚ/Iₛ; laminated core cuts eddy losses; E₀ = cB₀; radio → gamma is decreasing wavelength.",
      checks: [
        {
          q: "In a plane EM wave in vacuum the peak magnetic field is 2 × 10⁻⁸ T. The peak electric field is:",
          options: ["6 V m⁻¹", "1.5 × 10⁻¹⁶ V m⁻¹", "60 V m⁻¹", "0.6 V m⁻¹"],
          answer: 0,
          why: "E₀ = cB₀ = 3 × 10⁸ × 2 × 10⁻⁸ = 6 V m⁻¹.",
        },
        {
          q: "The core of a transformer is laminated mainly to reduce:",
          options: ["Copper loss", "Flux leakage", "Eddy current loss", "Hysteresis loss"],
          answer: 2,
          why: "Thin insulated laminations break up the paths of eddy currents in the core.",
        },
      ],
    },
  ],
};
