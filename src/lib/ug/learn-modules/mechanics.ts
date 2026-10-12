import type { LearnModule } from "../../learn";

export const mechanics: LearnModule = {
  slug: "mechanics",
  group: "Physics",
  subject: "Physics",
  title: "Mechanics",
  icon: "speed",
  blurb:
    "Units, dimensions and errors, kinematics and projectiles, Newton's laws and friction, work–energy–power and collisions, circular motion, rotational motion, gravitation, and the mechanical properties of solids and fluids.",
  objectives: [
    "Learner can check an equation by dimensional analysis and propagate percentage errors through a formula.",
    "Learner can solve straight-line and projectile problems using the constant-acceleration equations.",
    "Learner can draw free-body diagrams and decide whether friction is static, limiting or kinetic.",
    "Learner can apply work–energy, momentum and angular-momentum conservation to collisions, rolling bodies and satellites.",
    "Learner can use Young's modulus, Bernoulli's principle, Stokes' law and surface tension formulae with correct units.",
  ],
  concepts: [
    {
      id: "units-dimensions-errors",
      title: "Units, dimensions and errors",
      minutes: 6,
      summary:
        "Every physical quantity can be written in terms of seven SI base quantities; dimensions let you check equations and convert units, and error analysis tells you how reliable a measured result is.",
      examFocus:
        "Dimensional formula of a derived quantity (Planck's constant, G, viscosity, surface tension), checking which equation is dimensionally correct, percentage error in a product/power formula, and counting significant figures.",
      mechanism:
        "A physical equation equates quantities of the same kind, so every term on both sides must carry the same powers of M, L and T — this is the principle of homogeneity. That is why you can reject a wrong formula without knowing the physics behind it, and why two quantities with the same dimensions (work and torque, or Planck's constant and angular momentum) can still be different physical ideas. Errors combine because a result is computed from several measured quantities: in a sum or difference the absolute errors add, while in a product or quotient the fractional errors add. A quantity raised to the power n contributes n times its fractional error, so the quantity with the highest power dominates the error budget. Dimensional analysis cannot find pure numbers like 2π, and cannot handle trigonometric, exponential or logarithmic terms, because these are dimensionless.",
      points: [
        "SI base units: metre, kilogram, second, ampere, kelvin, mole and candela; radian and steradian are dimensionless.",
        "Principle of homogeneity: only quantities with identical dimensions can be added, subtracted or equated.",
        "Planck's constant and angular momentum both have dimensions [ML²T⁻¹]; work, energy and torque share [ML²T⁻²].",
        "For Z = A ± B, ΔZ = ΔA + ΔB; for Z = AᵖBᵠ/Cʳ, ΔZ/Z = pΔA/A + qΔB/B + rΔC/C.",
        "Significant figures: all non-zero digits count; zeros to the left of the first non-zero digit do not; trailing zeros after a decimal point do (0.00340 has 3).",
        "In multiplication or division, keep as many significant figures as the least precise factor; in addition or subtraction, keep the fewest decimal places.",
        "Vernier least count = 1 MSD − 1 VSD; screw gauge least count = pitch ÷ number of circular-scale divisions.",
      ],
      formulae: [
        { label: "Force", expr: "[F] = [MLT⁻²]", note: "newton = kg m s⁻²" },
        {
          label: "Error in a product/power",
          expr: "ΔZ/Z = pΔA/A + qΔB/B + rΔC/C",
          note: "for Z = AᵖBᵠ/Cʳ; errors always add",
        },
        { label: "Error in a sum or difference", expr: "ΔZ = ΔA + ΔB", note: "absolute errors add" },
        { label: "Vernier callipers", expr: "LC = 1 MSD − 1 VSD" },
        { label: "Screw gauge", expr: "LC = pitch / number of circular divisions" },
      ],
      table: {
        title: "Dimensional formulae worth memorising",
        columns: ["Quantity", "Defining relation", "Dimensions"],
        rows: [
          ["Power", "work / time", "[ML²T⁻³]"],
          ["Pressure, stress, Young's modulus", "force / area", "[ML⁻¹T⁻²]"],
          ["Planck's constant h", "E / ν", "[ML²T⁻¹]"],
          ["Gravitational constant G", "Fr² / m₁m₂", "[M⁻¹L³T⁻²]"],
          ["Surface tension", "force / length", "[MT⁻²]"],
          ["Coefficient of viscosity η", "F / (A · dv/dx)", "[ML⁻¹T⁻¹]"],
          ["Impulse, momentum", "F × t", "[MLT⁻¹]"],
        ],
      },
      pitfalls: [
        "Errors never subtract: for Z = A/B or Z = A − B the error terms are still added.",
        "A dimensionally correct equation need not be physically correct — the check only rules equations out.",
      ],
      vignette: {
        stem: "g is found from a simple pendulum using g = 4π²L/T². L is measured with a 1% error and T with a 2% error. What is the maximum percentage error in g?",
        answer: "5%",
        reasoning:
          "Δg/g = ΔL/L + 2ΔT/T = 1% + 2 × 2% = 5%. The constant 4π² carries no error, and T contributes twice because it is squared.",
      },
      highYield:
        "Fractional errors add, weighted by the power: the quantity with the largest exponent dominates the percentage error.",
      checks: [
        {
          q: "Which pair of quantities has the same dimensions?",
          options: [
            "Force and power",
            "Planck's constant and angular momentum",
            "Pressure and surface tension",
            "Momentum and energy",
          ],
          answer: 1,
          why: "h = E/ν gives [ML²T⁻²][T] = [ML²T⁻¹], the same as angular momentum mvr.",
        },
        {
          q: "The number of significant figures in 0.003050 is:",
          options: ["3", "6", "7", "4"],
          answer: 3,
          why: "Leading zeros do not count; 3, 0, 5 and the trailing 0 after the decimal point do, giving 4.",
        },
      ],
    },
    {
      id: "kinematics-projectile",
      title: "Kinematics and projectile motion",
      minutes: 8,
      summary:
        "Motion with constant acceleration is described by three linked equations; a projectile is two independent straight-line motions — uniform horizontally and uniformly accelerated vertically.",
      examFocus:
        "Reading slopes and areas of x–t and v–t graphs, distance in the nth second, time of flight, maximum height and range of a projectile, and complementary angles giving equal range.",
      mechanism:
        "Acceleration is the rate of change of velocity, so a constant acceleration makes velocity a straight-line function of time; the displacement is the area under that v–t line, which gives s = ut + ½at², and eliminating t gives v² = u² + 2as. In projectile motion gravity acts only vertically, so the horizontal component u cosθ never changes while the vertical component u sinθ falls at g per second. The time of flight is set entirely by the vertical motion (the body rises and falls back through the same vertical velocity), and the range is simply the horizontal velocity multiplied by that time. Because R depends on sin 2θ, the range is maximum at 45° and is the same for θ and 90° − θ. At the highest point the vertical velocity is zero but the horizontal velocity, and the acceleration g, remain.",
      points: [
        "Slope of x–t graph = velocity; slope of v–t graph = acceleration; area under v–t graph = displacement.",
        "Body dropped from rest: distances covered in successive equal intervals are in the ratio 1 : 3 : 5 : 7 …",
        "Projectile: T = 2u sinθ/g, H = u²sin²θ/2g, R = u²sin2θ/g; the trajectory is a parabola.",
        "Maximum range R_max = u²/g at θ = 45°, when H = R_max/4.",
        "Angles θ and (90° − θ) give the same range but different heights and flight times.",
        "At the top, speed = u cosθ (minimum), velocity is horizontal and acceleration is still g downward.",
        "R = 4H cotθ links range and height for any launch angle.",
        "River crossing: to cross in least time, head perpendicular to the bank, t = d/v(swimmer); to cross along the shortest path, head upstream so the resultant is perpendicular.",
      ],
      formulae: [
        { label: "Velocity–time", expr: "v = u + at", note: "constant acceleration only" },
        { label: "Displacement", expr: "s = ut + ½at²" },
        { label: "Velocity–displacement", expr: "v² = u² + 2as" },
        { label: "Distance in nth second", expr: "sₙ = u + a(2n − 1)/2" },
        { label: "Projectile", expr: "T = 2u sinθ/g, H = u²sin²θ/2g, R = u²sin2θ/g", note: "launch and landing at the same level" },
        { label: "Trajectory", expr: "y = x tanθ − gx²/(2u²cos²θ)" },
      ],
      table: {
        title: "Projectile at a glance",
        columns: ["Quantity", "Horizontal (x)", "Vertical (y)"],
        rows: [
          ["Initial velocity", "u cosθ", "u sinθ"],
          ["Acceleration", "0", "−g"],
          ["Velocity at time t", "u cosθ (constant)", "u sinθ − gt"],
          ["At the highest point", "u cosθ", "0"],
        ],
      },
      pitfalls: [
        "At the highest point the velocity is not zero — only its vertical component is; the acceleration is still g.",
        "Distance and displacement differ when the body reverses direction: for a ball thrown up and caught, displacement is zero but distance is 2H.",
      ],
      vignette: {
        stem: "A ball is thrown at 20 m s⁻¹ at 30° above the horizontal from level ground (g = 10 m s⁻²). Find its time of flight, maximum height and range.",
        answer: "T = 2 s, H = 5 m, R = 20√3 ≈ 34.6 m",
        reasoning:
          "Vertical component = 20 sin30° = 10 m s⁻¹, so T = 2 × 10/10 = 2 s and H = 10²/(2 × 10) = 5 m. Horizontal component = 20 cos30° = 10√3 m s⁻¹, so R = 10√3 × 2 = 20√3 ≈ 34.6 m.",
      },
      highYield:
        "R = u²sin2θ/g: maximum at 45°, equal for complementary angles; at the top only u cosθ survives.",
      checks: [
        {
          q: "Two projectiles are launched with the same speed at 30° and 60°. Their ranges are in the ratio:",
          options: ["1 : √3", "1 : 1", "√3 : 1", "1 : 2"],
          answer: 1,
          why: "sin 60° = sin 120°, so complementary angles give equal ranges.",
        },
        {
          q: "A body starts from rest with uniform acceleration. Distances covered in the 1st, 2nd and 3rd seconds are in the ratio:",
          options: ["1 : 2 : 3", "1 : 4 : 9", "1 : 3 : 5", "1 : 1 : 1"],
          answer: 2,
          why: "sₙ = a(2n − 1)/2 with u = 0 gives 1 : 3 : 5.",
        },
      ],
    },
    {
      id: "newtons-laws-friction",
      title: "Newton's laws and friction",
      minutes: 8,
      summary:
        "Force equals the rate of change of momentum; action–reaction pairs act on different bodies; friction opposes relative motion and is self-adjusting up to a limiting value μₛN.",
      examFocus:
        "Connected bodies (Atwood machine, blocks on a table), apparent weight in a lift, impulse and recoil, whether a block moves under a given push, and angle of repose.",
      mechanism:
        "The second law in its general form, F = dp/dt, says a net force changes momentum; for constant mass it reduces to F = ma. When no external force acts, total momentum cannot change, which is why a gun recoils and why momentum is conserved in every collision. Static friction is not a fixed number: it rises to match the applied force exactly, keeping the body at rest, until it reaches the limiting value μₛN. Once sliding begins, the microscopic contact welds have less time to form, so kinetic friction μₖN is smaller than limiting friction. The normal reaction, not the weight, sets friction — so anything that changes N (an inclined push, a lift's acceleration, a slope) changes friction too.",
      points: [
        "First law defines inertia; mass is the measure of inertia.",
        "Third-law pairs are equal, opposite, of the same type and act on different bodies, so they never cancel each other.",
        "Impulse J = FΔt = Δp; spreading Δp over a longer time (catching a ball by pulling the hands back) reduces the force.",
        "Lift: apparent weight = m(g + a) when accelerating up, m(g − a) when accelerating down, zero in free fall.",
        "Static friction is self-adjusting: fₛ ≤ μₛN; kinetic friction fₖ = μₖN with μₖ < μₛ.",
        "Friction is, to a good approximation, independent of the area of contact.",
        "Angle of repose θ satisfies tanθ = μₛ; on a smooth incline a = g sinθ, with friction a = g(sinθ − μₖcosθ).",
        "Rolling friction is much smaller than sliding friction, which is why wheels and ball bearings work.",
      ],
      formulae: [
        { label: "Second law", expr: "F = dp/dt = ma", note: "ma form for constant mass" },
        { label: "Impulse", expr: "J = FΔt = Δp" },
        { label: "Friction", expr: "fₛ ≤ μₛN, fₖ = μₖN" },
        { label: "Atwood machine", expr: "a = (m₁ − m₂)g/(m₁ + m₂), T = 2m₁m₂g/(m₁ + m₂)", note: "light string, frictionless pulley" },
        { label: "Angle of repose", expr: "tanθ = μₛ" },
      ],
      table: {
        title: "Kinds of friction",
        columns: ["Type", "Acts when", "Magnitude"],
        rows: [
          ["Static", "Body at rest relative to surface", "Equal to applied force, up to μₛN"],
          ["Limiting", "Body just about to slide", "μₛN (maximum static friction)"],
          ["Kinetic", "Body sliding", "μₖN, roughly constant, less than μₛN"],
          ["Rolling", "Body rolling without slipping", "Much smaller than sliding friction"],
        ],
      },
      pitfalls: [
        "If the applied force is less than μₛN, friction equals the applied force — do not write μₛN or μₖN for a body at rest.",
        "Normal reaction equals mg only on a horizontal surface with no vertical push or pull; on an incline N = mg cosθ.",
      ],
      vignette: {
        stem: "A 5 kg block rests on a horizontal floor with μₛ = 0.4 and μₖ = 0.3. A horizontal force of 15 N is applied (g = 10 m s⁻²). Find the friction force and the acceleration.",
        answer: "Friction = 15 N, acceleration = 0",
        reasoning:
          "Limiting friction = μₛmg = 0.4 × 5 × 10 = 20 N. Since 15 N < 20 N the block stays at rest, and static friction adjusts to exactly 15 N.",
      },
      highYield:
        "Static friction matches the push until μₛN; only after sliding does friction become μₖN.",
      checks: [
        {
          q: "In an Atwood machine, masses 3 kg and 2 kg hang over a light frictionless pulley (g = 10 m s⁻²). The tension in the string is:",
          options: ["20 N", "24 N", "30 N", "12 N"],
          answer: 1,
          why: "T = 2m₁m₂g/(m₁ + m₂) = 2 × 3 × 2 × 10/5 = 24 N (and a = 2 m s⁻²).",
        },
        {
          q: "A person stands on a weighing scale in a lift. The reading becomes zero when the lift:",
          options: [
            "Moves up with uniform velocity",
            "Accelerates upward at g",
            "Is at rest",
            "Falls freely",
          ],
          answer: 3,
          why: "In free fall a = g downward, so N = m(g − g) = 0.",
        },
      ],
    },
    {
      id: "work-energy-power",
      title: "Work, energy, power and collisions",
      minutes: 8,
      summary:
        "Work transfers energy; the net work on a body equals its change in kinetic energy. Momentum is conserved in every collision, but kinetic energy only in elastic ones.",
      examFocus:
        "Work–energy theorem with friction, KE–momentum relations (KE = p²/2m), power as F·v, elastic and perfectly inelastic collisions, and coefficient of restitution.",
      mechanism:
        "Work is the component of force along the displacement times the displacement, so a force perpendicular to motion (a centripetal force, a normal reaction on a flat floor) does no work. Adding the work of all forces gives the change in kinetic energy, which is the work–energy theorem. For a conservative force such as gravity or a spring, the work depends only on the end points, so it can be stored as potential energy and the total mechanical energy is conserved; friction is non-conservative and turns mechanical energy into heat. In a collision the impulsive forces are internal, so total momentum is always conserved, but some kinetic energy may go into deformation, sound and heat. The coefficient of restitution e measures how much relative velocity of separation survives: e = 1 for elastic and e = 0 for perfectly inelastic collisions.",
      points: [
        "W = F·s = Fs cosθ; work is zero when force ⊥ displacement.",
        "Work–energy theorem: W(net) = K(final) − K(initial), valid for all forces.",
        "Conservative force: work is path-independent and zero over a closed loop (gravity, spring, electrostatic); friction is non-conservative.",
        "KE = p²/2m: for the same momentum the lighter body has more KE; for the same KE the heavier body has more momentum.",
        "Power P = dW/dt = F·v; 1 horsepower = 746 W; 1 kWh = 3.6 × 10⁶ J.",
        "Elastic collision of equal masses in 1D: velocities are exchanged.",
        "A heavy body hitting a light one at rest elastically sends it off at about twice its own speed.",
        "Perfectly inelastic: bodies stick together, maximum KE loss, momentum still conserved.",
      ],
      formulae: [
        { label: "Work", expr: "W = Fs cosθ" },
        { label: "KE and momentum", expr: "K = p²/2m" },
        { label: "Spring PE", expr: "U = ½kx²" },
        { label: "Power", expr: "P = F·v" },
        {
          label: "1D elastic, m₂ at rest",
          expr: "v₁ = (m₁ − m₂)u₁/(m₁ + m₂), v₂ = 2m₁u₁/(m₁ + m₂)",
        },
        { label: "Restitution", expr: "e = (v₂ − v₁)/(u₁ − u₂)", note: "separation speed / approach speed" },
      ],
      table: {
        title: "Types of collision",
        columns: ["Type", "Momentum", "Kinetic energy", "e"],
        rows: [
          ["Elastic", "Conserved", "Conserved", "1"],
          ["Inelastic", "Conserved", "Partly lost", "0 < e < 1"],
          ["Perfectly inelastic", "Conserved", "Maximum loss; bodies move together", "0"],
        ],
      },
      pitfalls: [
        "Momentum is conserved even in inelastic collisions; only kinetic energy is not.",
        "Doubling KE does not double momentum — p = √(2mK), so p rises by √2.",
      ],
      vignette: {
        stem: "A 2 kg ball moving at 3 m s⁻¹ collides with a 1 kg ball at rest and they stick together. Find the common velocity and the kinetic energy lost.",
        answer: "2 m s⁻¹; 3 J lost",
        reasoning:
          "Momentum: 2 × 3 = 3v, so v = 2 m s⁻¹. KE before = ½ × 2 × 3² = 9 J; KE after = ½ × 3 × 2² = 6 J; loss = 3 J.",
      },
      highYield:
        "Momentum is conserved in all collisions; KE only in elastic ones; equal masses colliding elastically swap velocities.",
      checks: [
        {
          q: "If the kinetic energy of a body is increased by 300%, its momentum increases by:",
          options: ["100%", "200%", "300%", "50%"],
          answer: 0,
          why: "K becomes 4K, so p = √(2mK) doubles — an increase of 100%.",
        },
        {
          q: "A ball of mass m moving at v collides head-on elastically with an identical ball at rest. After the collision:",
          options: [
            "Both move with v/2",
            "The first ball rebounds with v",
            "The first stops and the second moves with v",
            "Both stop",
          ],
          answer: 2,
          why: "With m₁ = m₂ the 1D elastic formulae give v₁ = 0 and v₂ = u₁: the velocities are exchanged.",
        },
      ],
    },
    {
      id: "circular-motion",
      title: "Circular motion",
      minutes: 7,
      summary:
        "Motion in a circle needs a net inward (centripetal) force mv²/r; friction or the tilt of a banked road can supply it, and in a vertical circle gravity adds or subtracts from the tension.",
      examFocus:
        "Maximum safe speed on a level or banked road, angle of banking, minimum speed at the top of a vertical circle, and the tension difference between bottom and top.",
      mechanism:
        "Even at constant speed, a body moving in a circle keeps changing the direction of its velocity, so it is accelerating towards the centre with a = v²/r = ω²r. Some real force — tension, friction, gravity, a normal reaction — must provide this inward pull; centripetal force is a role, not a new kind of force. On a level road only static friction points inward, so the speed is limited to √(μrg). Tilting the road makes the horizontal component of the normal reaction point inward, so a banked road can hold a car even without friction at v = √(rg tanθ). In a vertical circle on a string, tension is least at the top because gravity there already supplies part of the inward force; the string goes slack if v at the top falls below √(gr).",
      points: [
        "Uniform circular motion: speed constant, velocity and acceleration change direction; acceleration is v²/r towards the centre.",
        "Centripetal force does no work because it is perpendicular to velocity.",
        "Non-uniform circular motion adds a tangential acceleration; net a = √(a_c² + a_t²).",
        "Level road: v_max = √(μₛrg), independent of the car's mass.",
        "Banked road without friction: tanθ = v²/rg; with friction the safe speed range widens.",
        "Vertical circle (string): v_top ≥ √(gr), v_bottom ≥ √(5gr); T_bottom − T_top = 6mg.",
        "Centrifugal force is a pseudo force that appears only in the rotating frame.",
      ],
      formulae: [
        { label: "Centripetal acceleration", expr: "a = v²/r = ω²r" },
        { label: "Level road", expr: "v_max = √(μₛrg)" },
        { label: "Banking (no friction)", expr: "tanθ = v²/rg" },
        {
          label: "Banking with friction",
          expr: "v_max = √[rg(μₛ + tanθ)/(1 − μₛ tanθ)]",
        },
        { label: "Vertical circle", expr: "v_top(min) = √(gr), v_bottom(min) = √(5gr)", note: "body on a string" },
      ],
      flow: {
        title: "Solving a circular-motion problem",
        steps: [
          { label: "Identify the centre", detail: "Find the circle and the radius r actually traced." },
          { label: "List real forces", detail: "Tension, weight, normal reaction, friction — no 'centripetal force' in the diagram." },
          { label: "Resolve towards the centre", detail: "Net inward component = mv²/r." },
          { label: "Resolve perpendicular", detail: "Usually vertical balance, e.g. N cosθ = mg on a banked road." },
          { label: "Apply the limit", detail: "Friction ≤ μN, tension ≥ 0, to get the extreme speed." },
        ],
      },
      pitfalls: [
        "Do not add a separate 'centripetal force' to the free-body diagram — it is the net of the real forces.",
        "Safe speed on a level road does not depend on mass; options with m in them are traps.",
      ],
      vignette: {
        stem: "A car takes an unbanked curve of radius 25 m. The coefficient of static friction is 0.4 (g = 10 m s⁻²). What is the maximum speed without skidding?",
        answer: "10 m s⁻¹ (36 km h⁻¹)",
        reasoning:
          "Friction supplies mv²/r ≤ μₛmg, so v_max = √(μₛrg) = √(0.4 × 25 × 10) = √100 = 10 m s⁻¹.",
      },
      highYield:
        "Level road √(μrg); banking tanθ = v²/rg; vertical circle top √(gr), bottom √(5gr), tension difference 6mg.",
      checks: [
        {
          q: "A road of radius 10 m is to be banked for a speed of 10 m s⁻¹ without relying on friction (g = 10 m s⁻²). The banking angle is:",
          options: ["30°", "60°", "15°", "45°"],
          answer: 3,
          why: "tanθ = v²/rg = 100/(10 × 10) = 1, so θ = 45°.",
        },
        {
          q: "A stone tied to a string moves in a vertical circle. The difference between tension at the lowest and highest points is:",
          options: ["2mg", "6mg", "4mg", "mg"],
          answer: 1,
          why: "Energy conservation gives v_b² = v_t² + 4gr; combining with the force equations at both points gives T_b − T_t = 6mg.",
        },
      ],
    },
    {
      id: "rotational-motion",
      title: "Rotational motion",
      minutes: 9,
      summary:
        "Torque is to rotation what force is to translation; moment of inertia measures rotational inertia and depends on how mass is spread about the axis; angular momentum is conserved when net external torque is zero.",
      examFocus:
        "Moment of inertia of standard bodies and the parallel/perpendicular axis theorems, angular momentum conservation (skater, collapsing star), rolling without slipping, and which body reaches the bottom of an incline first.",
      mechanism:
        "Moment of inertia I = Σmr² weights each particle by the square of its distance from the axis, so mass far from the axis matters most — a ring has a larger I than a disc of the same mass and radius. Because τ = dL/dt, angular momentum L = Iω stays constant when no external torque acts; pulling the arms in reduces I, so ω must rise. Kinetic energy ½Iω² = L²/2I is not conserved in this case, because the skater does internal work. In rolling without slipping the contact point is momentarily at rest, so v = ωR and the kinetic energy splits into translational and rotational parts. A body with a larger k²/R² ratio puts more of its energy into spinning, so it accelerates less down an incline and arrives later.",
      points: [
        "Torque τ = r × F = rF sinθ; a couple produces rotation without translation.",
        "Equilibrium of a rigid body: ΣF = 0 and Στ = 0 about any point.",
        "Parallel axis theorem: I = I_cm + Md² (any body); perpendicular axis theorem: I_z = I_x + I_y (planar bodies only).",
        "Radius of gyration k: I = Mk².",
        "Angular momentum conserved when τ(ext) = 0: I₁ω₁ = I₂ω₂.",
        "Rolling: total KE = ½mv²(1 + k²/R²); acceleration down an incline a = g sinθ/(1 + k²/R²), independent of mass and radius.",
        "Order of arrival down an incline: solid sphere, then solid cylinder (disc), then hollow sphere, then ring.",
        "Fraction of rolling KE that is rotational = k²/(k² + R²): ½ for a ring, ⅓ for a disc, 2/7 for a solid sphere.",
      ],
      formulae: [
        { label: "Torque–angular momentum", expr: "τ = dL/dt, L = Iω" },
        { label: "Rotational KE", expr: "K = ½Iω² = L²/2I" },
        { label: "Parallel axis", expr: "I = I_cm + Md²" },
        { label: "Perpendicular axis", expr: "I_z = I_x + I_y", note: "laminar bodies only" },
        { label: "Rolling down an incline", expr: "a = g sinθ/(1 + k²/R²)" },
      ],
      table: {
        title: "Moments of inertia of standard bodies (mass M, radius R, length L)",
        columns: ["Body", "Axis", "I", "k²/R²"],
        rows: [
          ["Ring", "Through centre, ⊥ plane", "MR²", "1"],
          ["Disc / solid cylinder", "Through centre, ⊥ plane (cylinder axis)", "½MR²", "1/2"],
          ["Solid sphere", "Diameter", "(2/5)MR²", "2/5"],
          ["Hollow sphere (thin shell)", "Diameter", "(2/3)MR²", "2/3"],
          ["Thin rod", "Through centre, ⊥ rod", "ML²/12", "—"],
          ["Thin rod", "Through one end, ⊥ rod", "ML²/3", "—"],
          ["Ring", "Diameter", "½MR²", "—"],
        ],
      },
      pitfalls: [
        "When angular momentum is conserved, rotational KE is generally not — a skater pulling in her arms gains KE.",
        "The perpendicular axis theorem applies only to flat (laminar) bodies; do not use it for a sphere.",
      ],
      vignette: {
        stem: "A skater spinning at 2 rad s⁻¹ with moment of inertia 6 kg m² pulls her arms in, reducing it to 2 kg m². Find the new angular speed and the change in rotational KE.",
        answer: "6 rad s⁻¹; KE rises from 12 J to 36 J",
        reasoning:
          "I₁ω₁ = I₂ω₂ gives ω₂ = 6 × 2/2 = 6 rad s⁻¹. K₁ = ½ × 6 × 2² = 12 J; K₂ = ½ × 2 × 6² = 36 J. The extra 24 J comes from the work done by her muscles.",
      },
      highYield:
        "Ring MR², disc ½MR², solid sphere (2/5)MR², hollow sphere (2/3)MR², rod about centre ML²/12; smallest k²/R² rolls down fastest.",
      checks: [
        {
          q: "The moment of inertia of a uniform disc about a tangent in its own plane is:",
          options: ["½MR²", "(3/2)MR²", "(5/4)MR²", "¼MR²"],
          answer: 2,
          why: "About a diameter I = ¼MR² (perpendicular axis theorem); the parallel axis theorem adds MR², giving (5/4)MR².",
        },
        {
          q: "A ring, a disc, a solid sphere and a hollow sphere roll from rest down the same incline without slipping. Which reaches the bottom first?",
          options: ["Ring", "Disc", "Hollow sphere", "Solid sphere"],
          answer: 3,
          why: "a = g sinθ/(1 + k²/R²); the solid sphere has the smallest k²/R² (2/5), so the largest acceleration.",
        },
      ],
    },
    {
      id: "gravitation",
      title: "Gravitation and satellites",
      minutes: 8,
      summary:
        "Every pair of masses attracts with F = Gm₁m₂/r²; this one law fixes g at and away from the surface, satellite speeds, escape speed and Kepler's laws.",
      examFocus:
        "Variation of g with height and depth, escape versus orbital speed, energy of a satellite, geostationary orbit, and Kepler's third law ratios.",
      mechanism:
        "At the surface g = GM/R², so g falls as 1/r² once you go above the surface. Going down a mine, the shell above you pulls equally in all directions and cancels, leaving only the inner sphere, whose mass shrinks as r³ — so g falls linearly to zero at the centre. For a circular orbit, gravity provides the centripetal force, GMm/r² = mv²/r, so the orbital speed √(GM/r) is independent of the satellite's mass. To escape, a body needs total energy ≥ 0, i.e. ½mv² ≥ GMm/R, giving v_e = √(2GM/R) = √2 × orbital speed near the surface. Kepler's second law (equal areas in equal times) is angular momentum conservation, because gravity is a central force and exerts no torque about the Sun.",
      points: [
        "G = 6.67 × 10⁻¹¹ N m² kg⁻² — a universal constant; g ≈ 9.8 m s⁻² varies with place.",
        "Height (h ≪ R): g' ≈ g(1 − 2h/R); exact: g' = g R²/(R + h)².",
        "Depth d: g' = g(1 − d/R); g is zero at the centre and maximum at the surface.",
        "Earth's rotation reduces effective g most at the equator and not at all at the poles.",
        "Escape speed from Earth ≈ 11.2 km s⁻¹, independent of the mass of the body and the direction of projection.",
        "Satellite in orbit: KE = GMm/2r, PE = −GMm/r, total E = −GMm/2r (KE : PE : E = 1 : −2 : −1).",
        "Geostationary satellite: period 24 h, equatorial orbit, moving west to east, height about 36,000 km.",
        "Kepler: elliptical orbits with the Sun at a focus; equal areas in equal times; T² ∝ a³.",
      ],
      formulae: [
        { label: "Newton's law of gravitation", expr: "F = Gm₁m₂/r²" },
        { label: "Surface gravity", expr: "g = GM/R²" },
        { label: "Orbital speed", expr: "v₀ = √(GM/r) ≈ √(gR) near the surface" },
        { label: "Escape speed", expr: "vₑ = √(2GM/R) = √(2gR)" },
        { label: "Period of a satellite", expr: "T = 2π√(r³/GM)", note: "T² ∝ r³" },
        { label: "Gravitational PE", expr: "U = −GMm/r" },
      ],
      table: {
        title: "Variation of g",
        columns: ["Situation", "Expression", "Behaviour"],
        rows: [
          ["Height h above surface", "g(R/(R + h))²", "Falls as 1/r²"],
          ["Small height h", "g(1 − 2h/R)", "Linear approximation"],
          ["Depth d below surface", "g(1 − d/R)", "Falls linearly, zero at centre"],
          ["Latitude λ (rotation)", "g − ω²R cos²λ", "Least at equator, g at poles"],
        ],
      },
      pitfalls: [
        "Astronauts in orbit are weightless because they are in free fall, not because gravity is zero there.",
        "Escape speed does not depend on the angle of launch (ignoring air resistance) — only on the planet's M and R.",
      ],
      vignette: {
        stem: "A planet has 8 times the mass and 2 times the radius of Earth. If the escape speed from Earth is 11.2 km s⁻¹, what is it from the planet?",
        answer: "22.4 km s⁻¹",
        reasoning:
          "vₑ = √(2GM/R) ∝ √(M/R) = √(8/2) = 2, so vₑ = 2 × 11.2 = 22.4 km s⁻¹.",
      },
      highYield:
        "vₑ = √2 v₀; satellite KE : PE : E = 1 : −2 : −1; g falls as 1/r² above the surface but linearly below it.",
      checks: [
        {
          q: "At what height above Earth's surface does g become one-fourth of its surface value (R = Earth's radius)?",
          options: ["R/2", "R", "2R", "3R"],
          answer: 1,
          why: "g' = g(R/(R + h))² = g/4 ⇒ R + h = 2R ⇒ h = R.",
        },
        {
          q: "For a satellite in a circular orbit, the ratio of its kinetic energy to its total energy is:",
          options: ["1 : 1", "1 : −2", "2 : −1", "1 : −1"],
          answer: 3,
          why: "KE = GMm/2r and E = −GMm/2r, so KE : E = 1 : −1.",
        },
      ],
    },
    {
      id: "solids-fluids",
      title: "Mechanical properties of solids and fluids",
      minutes: 9,
      summary:
        "Elastic moduli relate stress to strain; in fluids, pressure grows with depth, Bernoulli's principle trades pressure for speed, viscosity resists flow and surface tension shapes drops and capillary rise.",
      examFocus:
        "Elongation of a wire (Y = FL/AΔL), energy stored per unit volume, Bernoulli and continuity, terminal velocity from Stokes' law, excess pressure in drops and bubbles, and capillary rise.",
      mechanism:
        "Within the elastic limit, stress is proportional to strain (Hooke's law), and the constant is the modulus — Young's for length, bulk for volume, shear (rigidity) for shape. In a flowing ideal fluid, the same volume must pass every cross-section per second, so the fluid speeds up where the pipe narrows (A₁v₁ = A₂v₂). Bernoulli's principle is energy conservation per unit volume: where speed rises, pressure must fall, which explains lift on a wing and the low pressure in a constriction. A sphere falling through a viscous fluid gains speed until weight is balanced by buoyancy plus Stokes' drag 6πηrv; this terminal velocity grows as r². Surface tension acts like a stretched membrane, so a curved surface carries an excess pressure inside — 2T/r for a drop, but 4T/r for a soap bubble because a bubble has two surfaces.",
      points: [
        "Young's modulus Y = (F/A)/(ΔL/L); steel has a larger Y than rubber, so steel is more elastic.",
        "Elastic PE per unit volume = ½ × stress × strain; total energy in a stretched wire = ½FΔL.",
        "Pressure at depth h: P = P₀ + ρgh; Pascal's law underlies the hydraulic lift and brakes.",
        "Equation of continuity A₁v₁ = A₂v₂ (incompressible flow); Torricelli's speed of efflux v = √(2gh).",
        "Reynolds number Re = ρvd/η: flow is streamlined for Re below about 1000 and turbulent above about 2000.",
        "Terminal velocity v_t = 2r²(ρ − σ)g/9η ∝ r².",
        "Viscosity of liquids falls with rising temperature; viscosity of gases rises.",
        "Surface tension falls as temperature rises; capillary rise h = 2T cosθ/(rρg) ∝ 1/r; mercury (θ > 90°) shows capillary depression.",
      ],
      formulae: [
        { label: "Young's modulus", expr: "Y = FL/(AΔL)" },
        { label: "Bernoulli", expr: "P + ½ρv² + ρgh = constant", note: "along a streamline, ideal fluid" },
        { label: "Continuity", expr: "A₁v₁ = A₂v₂" },
        { label: "Terminal velocity", expr: "v_t = 2r²(ρ − σ)g/(9η)", note: "ρ = sphere density, σ = fluid density" },
        { label: "Excess pressure", expr: "drop or bubble in liquid: 2T/r; soap bubble in air: 4T/r" },
        { label: "Capillary rise", expr: "h = 2T cosθ/(rρg)" },
      ],
      table: {
        title: "Elastic moduli",
        columns: ["Modulus", "Stress", "Strain", "Applies to"],
        rows: [
          ["Young's (Y)", "Longitudinal F/A", "ΔL/L", "Solids only"],
          ["Bulk (B)", "Pressure change Δp", "−ΔV/V", "Solids, liquids, gases"],
          ["Shear / rigidity (G)", "Tangential F/A", "Angle of shear θ", "Solids only"],
        ],
      },
      pitfalls: [
        "A soap bubble has two surfaces, so its excess pressure is 4T/r, not 2T/r.",
        "Young's modulus is a property of the material — changing the wire's length or area changes the extension, not Y.",
      ],
      vignette: {
        stem: "A steel wire 2 m long with cross-section 1 mm² carries a 10 kg load. Y(steel) = 2 × 10¹¹ N m⁻², g = 10 m s⁻². Find the extension.",
        answer: "1 mm",
        reasoning:
          "ΔL = FL/(AY) = (100 × 2)/(1 × 10⁻⁶ × 2 × 10¹¹) = 200/(2 × 10⁵) = 1 × 10⁻³ m = 1 mm.",
      },
      highYield:
        "Terminal velocity ∝ r²; capillary rise ∝ 1/r; bubble excess pressure 4T/r; faster flow means lower pressure.",
      checks: [
        {
          q: "If the radius of a small sphere falling through a viscous liquid is doubled, its terminal velocity becomes:",
          options: ["Twice", "Half", "Four times", "Eight times"],
          answer: 2,
          why: "v_t = 2r²(ρ − σ)g/9η ∝ r², so doubling r makes it four times.",
        },
        {
          q: "Water flows steadily through a horizontal pipe whose cross-section halves at a constriction. At the constriction:",
          options: [
            "Speed doubles and pressure falls",
            "Speed halves and pressure rises",
            "Speed doubles and pressure rises",
            "Speed and pressure are unchanged",
          ],
          answer: 0,
          why: "Continuity gives v₂ = 2v₁; Bernoulli then requires a lower pressure where the speed is higher.",
        },
      ],
    },
  ],
};
