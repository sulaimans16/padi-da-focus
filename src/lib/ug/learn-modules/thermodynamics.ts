import type { LearnModule } from "../../learn";

export const thermodynamics: LearnModule = {
  slug: "thermodynamics",
  group: "Physics",
  subject: "Physics",
  title: "Heat, Thermodynamics & Waves",
  icon: "thermostat",
  blurb:
    "Thermal expansion and calorimetry, conduction and radiation, the laws of thermodynamics and its processes, heat engines and refrigerators, kinetic theory of gases, simple harmonic motion, and sound waves including standing waves, beats and the Doppler effect.",
  objectives: [
    "Learner can solve calorimetry problems involving a change of state and relate the linear, areal and volume expansion coefficients.",
    "Learner can apply the first law to isothermal, adiabatic, isobaric and isochoric processes and read work from a P–V diagram.",
    "Learner can find the efficiency of a Carnot engine and the coefficient of performance of a refrigerator.",
    "Learner can use kinetic theory to compute rms speed and apply equipartition to find Cv, Cp and γ.",
    "Learner can analyse SHM, standing waves in strings and pipes, beats and Doppler shifts numerically.",
  ],
  concepts: [
    {
      id: "expansion-calorimetry",
      title: "Thermal expansion and calorimetry",
      minutes: 7,
      summary:
        "Solids and liquids expand on heating in proportion to the temperature rise; in a mixture, heat lost by hot bodies equals heat gained by cold ones, including latent heat for any change of state.",
      examFocus:
        "Relation α : β : γ = 1 : 2 : 3, thermal stress in a clamped rod, temperature scale conversion, anomalous expansion of water, and mixing ice with water to find the final temperature.",
      mechanism:
        "Heating increases the amplitude of atomic vibrations, and because the interatomic potential is asymmetric the average spacing grows, so length increases by ΔL = αLΔT. Area and volume involve two and three lengths, which is why β ≈ 2α and γ ≈ 3α for an isotropic solid. If the rod is clamped so it cannot expand, the walls must compress it by exactly the strain αΔT it would have had, producing a thermal stress YαΔT. During melting or boiling, the heat supplied breaks intermolecular bonds instead of raising the kinetic energy, so the temperature stays constant and Q = mL. Calorimetry is just energy conservation in an insulated system: always check first whether the available heat is enough to complete a change of state.",
      points: [
        "Linear expansion ΔL = αLΔT; β = 2α, γ = 3α for isotropic solids.",
        "Thermal stress in a rod held between rigid supports = YαΔT, independent of length and area.",
        "Water contracts on heating from 0 °C to 4 °C and has maximum density at 4 °C (anomalous expansion), so lakes freeze from the top.",
        "Q = mcΔT without change of state; Q = mL during a change of state at constant temperature.",
        "Specific heat of water ≈ 4186 J kg⁻¹ K⁻¹ (1 cal g⁻¹ °C⁻¹); latent heat of fusion of ice ≈ 3.33 × 10⁵ J kg⁻¹ (80 cal g⁻¹); latent heat of vaporisation of water ≈ 22.6 × 10⁵ J kg⁻¹.",
        "Celsius and Fahrenheit agree at −40°; triple point of water = 273.16 K.",
        "Boiling point rises with pressure (pressure cooker) and falls at high altitude.",
      ],
      formulae: [
        { label: "Linear expansion", expr: "ΔL = αLΔT" },
        { label: "Expansion coefficients", expr: "β = 2α, γ = 3α" },
        { label: "Thermal stress", expr: "σ = YαΔT", note: "rod clamped at both ends" },
        { label: "Sensible heat", expr: "Q = mcΔT" },
        { label: "Latent heat", expr: "Q = mL" },
        { label: "Temperature scales", expr: "C/100 = (F − 32)/180 = (K − 273.15)/100" },
      ],
      table: {
        title: "Fixed points of temperature scales",
        columns: ["Scale", "Ice point", "Steam point", "Divisions"],
        rows: [
          ["Celsius", "0 °C", "100 °C", "100"],
          ["Fahrenheit", "32 °F", "212 °F", "180"],
          ["Kelvin", "273.15 K", "373.15 K", "100"],
        ],
      },
      pitfalls: [
        "Do not assume all the ice melts — compare heat available with heat needed to melt it first.",
        "A temperature difference of 1 °C equals 1 K, but 1.8 °F — convert differences and readings differently.",
      ],
      vignette: {
        stem: "20 g of ice at 0 °C is dropped into 100 g of water at 40 °C in an insulated vessel of negligible heat capacity. Take c(water) = 1 cal g⁻¹ °C⁻¹ and L(fusion) = 80 cal g⁻¹. Find the final temperature.",
        answer: "20 °C",
        reasoning:
          "Melting the ice needs 20 × 80 = 1600 cal, while the water can give up to 100 × 40 = 4000 cal, so all the ice melts. Then 100(40 − T) = 1600 + 20T ⇒ 4000 − 100T = 1600 + 20T ⇒ T = 20 °C.",
      },
      highYield:
        "α : β : γ = 1 : 2 : 3; thermal stress YαΔT; water densest at 4 °C; temperature is constant during a change of state.",
      checks: [
        {
          q: "The temperature at which the Celsius and Fahrenheit readings are equal is:",
          options: ["−40°", "0°", "40°", "−32°"],
          answer: 0,
          why: "Put C = F in C/100 = (F − 32)/180: 180C = 100C − 3200, so C = −40.",
        },
        {
          q: "A metal rod is fixed between two rigid walls and heated by ΔT. The thermal stress developed depends on:",
          options: [
            "Length of the rod",
            "Cross-sectional area",
            "Y, α and ΔT only",
            "Both length and area",
          ],
          answer: 2,
          why: "Prevented strain = αΔT, so stress = YαΔT, independent of the rod's dimensions.",
        },
      ],
    },
    {
      id: "heat-transfer",
      title: "Conduction, radiation and Newton's law of cooling",
      minutes: 7,
      summary:
        "Heat flows by conduction (through matter, without bulk motion), convection (by bulk motion of fluid) and radiation (electromagnetic waves, no medium needed).",
      examFocus:
        "Rate of conduction and equivalent conductivity of slabs in series, Stefan–Boltzmann T⁴ scaling, Wien's displacement law for star colours, and Newton's law of cooling time problems.",
      mechanism:
        "Conduction is driven by a temperature gradient, so the heat current H = KA(T₁ − T₂)/L behaves exactly like an electric current through a resistance L/KA; slabs in series add resistances, slabs in parallel add conductances. Every body above 0 K radiates, and the power rises steeply as T⁴ because both the number and the energy of emitted photons grow with temperature. Wien's law says the peak wavelength shifts to shorter values as temperature rises, which is why a heated iron rod glows red, then orange, then white, and why blue stars are hotter than red ones. A good absorber is also a good emitter, so a black body is both the ideal absorber and the ideal radiator. Newton's law of cooling is the small-temperature-difference approximation of radiative and convective loss, in which the rate of cooling is proportional to the excess temperature over the surroundings.",
      points: [
        "Heat current H = KA(T₁ − T₂)/L; thermal resistance R = L/(KA).",
        "Two slabs of equal thickness in series: K(eq) = 2K₁K₂/(K₁ + K₂).",
        "Convection is natural (density differences) or forced (fans, pumps); sea breeze by day, land breeze by night.",
        "Stefan–Boltzmann: H = eσAT⁴ with σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴; net loss = eσA(T⁴ − Tₛ⁴).",
        "Wien's displacement law λₘT = b, b ≈ 2.9 × 10⁻³ m K.",
        "Good absorbers are good emitters; a perfect black body has e = 1.",
        "Newton's law of cooling: dT/dt = −k(T − Tₛ), valid for small temperature excess.",
      ],
      formulae: [
        { label: "Conduction", expr: "H = KA(T₁ − T₂)/L" },
        { label: "Thermal resistance", expr: "R = L/(KA)", note: "series: add R; parallel: add 1/R" },
        { label: "Stefan–Boltzmann", expr: "H = eσAT⁴" },
        { label: "Wien's law", expr: "λₘT = b ≈ 2.9 × 10⁻³ m K" },
        { label: "Newton's cooling (average form)", expr: "(T₁ − T₂)/t = k[(T₁ + T₂)/2 − Tₛ]" },
      ],
      table: {
        title: "Modes of heat transfer",
        columns: ["Mode", "Needs a medium?", "Mechanism", "Example"],
        rows: [
          ["Conduction", "Yes", "Molecular collisions and free electrons, no bulk flow", "Hot handle of a metal spoon"],
          ["Convection", "Yes (fluid)", "Bulk motion of the fluid", "Sea and land breezes"],
          ["Radiation", "No", "Electromagnetic waves", "Sunlight reaching Earth"],
        ],
      },
      pitfalls: [
        "Use kelvin, not Celsius, in Stefan's law: doubling 27 °C to 54 °C does not double T.",
        "Newton's law gives a rate proportional to the temperature difference, so cooling slows down — equal temperature drops take longer each time.",
      ],
      vignette: {
        stem: "A body cools from 80 °C to 60 °C in 5 minutes in surroundings at 20 °C. Using Newton's law of cooling (average form), how long will it take to cool from 60 °C to 40 °C?",
        answer: "About 8.3 min (25/3 min)",
        reasoning:
          "First interval: 20/5 = k(70 − 20) ⇒ k = 0.08 per min. Second interval: 20/t = 0.08(50 − 20) = 2.4 ⇒ t = 20/2.4 ≈ 8.3 min.",
      },
      highYield:
        "Radiated power ∝ T⁴ (in kelvin); λₘ ∝ 1/T; conduction slabs combine like resistors.",
      checks: [
        {
          q: "If the absolute temperature of a black body is doubled, the power it radiates becomes:",
          options: ["2 times", "4 times", "8 times", "16 times"],
          answer: 3,
          why: "P ∝ T⁴, so (2)⁴ = 16.",
        },
        {
          q: "Two slabs of equal thickness and area, with conductivities K and 2K, are joined in series. The equivalent conductivity is:",
          options: ["3K/2", "4K/3", "3K", "2K/3"],
          answer: 1,
          why: "K(eq) = 2K₁K₂/(K₁ + K₂) = 2 × K × 2K/3K = 4K/3.",
        },
      ],
    },
    {
      id: "first-law-processes",
      title: "First law and thermodynamic processes",
      minutes: 9,
      summary:
        "Heat supplied to a system goes partly into raising its internal energy and partly into work done by it: ΔQ = ΔU + ΔW. Each standard process fixes one of these terms.",
      examFocus:
        "Work in isothermal and adiabatic processes, Q, ΔU and W in an isobaric process, Mayer's relation, P–V diagram areas, and comparing slopes of isothermal and adiabatic curves.",
      mechanism:
        "Internal energy of an ideal gas depends only on temperature, so ΔU = nCvΔT for any process between the same two temperatures — it is a state function. Heat and work, by contrast, depend on the path; the work done by the gas is the area under the curve on a P–V diagram. In an isothermal process ΔU = 0, so all heat supplied becomes work. In an adiabatic process no heat enters, so any work done by the gas comes out of its internal energy and the gas cools; this extra pressure drop makes the adiabatic curve steeper than the isotherm by a factor γ. At constant pressure some of the heat goes into expansion work, so more heat is needed per kelvin than at constant volume — this difference is exactly R per mole (Cp − Cv = R).",
      points: [
        "Zeroth law: bodies each in thermal equilibrium with a third are in equilibrium with each other — the basis of temperature.",
        "First law (NCERT convention): ΔQ = ΔU + ΔW, W = work done by the system.",
        "Internal energy is a state function; heat and work are path functions.",
        "Work = area under the P–V curve; for a cycle, net work = area enclosed (clockwise loop ⇒ positive work by gas).",
        "Isothermal: PV = constant, slope −P/V; adiabatic: PVᵞ = constant, slope −γP/V (steeper).",
        "In adiabatic expansion the gas cools; in adiabatic compression it heats up (diesel engine ignition).",
        "Free expansion of an ideal gas into vacuum: Q = 0, W = 0, so ΔU = 0 and T is unchanged.",
        "Mayer's relation: Cp − Cv = R for one mole of ideal gas.",
      ],
      formulae: [
        { label: "First law", expr: "ΔQ = ΔU + ΔW" },
        { label: "Isothermal work", expr: "W = nRT ln(V₂/V₁)" },
        { label: "Adiabatic", expr: "PVᵞ = constant, TVᵞ⁻¹ = constant" },
        { label: "Adiabatic work", expr: "W = (P₁V₁ − P₂V₂)/(γ − 1) = nR(T₁ − T₂)/(γ − 1)" },
        { label: "Internal energy change", expr: "ΔU = nCvΔT", note: "ideal gas, any process" },
        { label: "Mayer's relation", expr: "Cp − Cv = R" },
      ],
      table: {
        title: "Standard processes for an ideal gas",
        columns: ["Process", "Constant", "W by gas", "ΔU", "Q"],
        rows: [
          ["Isothermal", "T", "nRT ln(V₂/V₁)", "0", "= W"],
          ["Adiabatic", "Q = 0", "nR(T₁ − T₂)/(γ − 1)", "= −W", "0"],
          ["Isochoric", "V", "0", "nCvΔT", "= ΔU"],
          ["Isobaric", "P", "PΔV = nRΔT", "nCvΔT", "nCpΔT"],
          ["Cyclic", "—", "Area of loop", "0", "= W"],
        ],
      },
      pitfalls: [
        "ΔU = nCvΔT holds for every process of an ideal gas, not just isochoric ones.",
        "In an adiabatic process the temperature changes even though no heat flows — adiabatic does not mean isothermal.",
      ],
      vignette: {
        stem: "2 mol of a monatomic ideal gas is heated at constant pressure from 300 K to 350 K. Find W, ΔU and Q (R = 8.3 J mol⁻¹ K⁻¹).",
        answer: "W = 830 J, ΔU = 1245 J, Q = 2075 J",
        reasoning:
          "W = nRΔT = 2 × 8.3 × 50 = 830 J. ΔU = n(3R/2)ΔT = 2 × 12.45 × 50 = 1245 J. Q = ΔU + W = 2075 J (check: nCpΔT = 2 × 20.75 × 50 = 2075 J).",
      },
      highYield:
        "Isothermal ΔU = 0; adiabatic Q = 0; isochoric W = 0; cyclic ΔU = 0; adiabatic slope is γ times the isothermal slope.",
      checks: [
        {
          q: "For a diatomic ideal gas heated at constant pressure, the fraction of the heat supplied that is converted into work is:",
          options: ["2/5", "5/7", "2/7", "3/5"],
          answer: 2,
          why: "W/Q = nRΔT/(nCpΔT) = R/Cp = R/(7R/2) = 2/7.",
        },
        {
          q: "In a complete thermodynamic cycle, which quantity is necessarily zero?",
          options: ["Heat absorbed", "Change in internal energy", "Work done", "Heat rejected"],
          answer: 1,
          why: "Internal energy is a state function; the system returns to its initial state, so ΔU = 0.",
        },
      ],
    },
    {
      id: "second-law-carnot",
      title: "Second law, heat engines and refrigerators",
      minutes: 7,
      summary:
        "No engine can turn heat completely into work and no refrigerator can work without input work; the Carnot engine between two temperatures sets the upper limit of efficiency.",
      examFocus:
        "Carnot efficiency from reservoir temperatures, heat rejected and work done, COP of a refrigerator, the Carnot cycle's four steps, and Kelvin–Planck vs Clausius statements.",
      mechanism:
        "A heat engine takes heat Q₁ from a hot reservoir, converts part of it into work W and must reject the rest Q₂ to a cold reservoir; the second law says Q₂ can never be zero. The Carnot cycle uses only reversible steps — two isothermals and two adiabatics — so no heat flows across a finite temperature difference and nothing is wasted irreversibly. For it, Q₂/Q₁ = T₂/T₁, so the efficiency 1 − T₂/T₁ depends only on the two reservoir temperatures, not on the working substance. A refrigerator is the engine run backwards: work W pumps heat Q₂ out of the cold space and dumps Q₁ = Q₂ + W outside. Its coefficient of performance Q₂/W can be greater than 1, and it falls as the temperature gap grows.",
      points: [
        "Kelvin–Planck: no process can have as its sole result the complete conversion of heat into work.",
        "Clausius: no process can have as its sole result the transfer of heat from a colder to a hotter body.",
        "Efficiency η = W/Q₁ = 1 − Q₂/Q₁ < 1.",
        "Carnot efficiency η = 1 − T₂/T₁ (temperatures in kelvin); 100% would need T₂ = 0 K.",
        "Carnot's theorem: no engine between two given reservoirs is more efficient than a reversible (Carnot) engine.",
        "Refrigerator COP α = Q₂/W; for a Carnot refrigerator α = T₂/(T₁ − T₂).",
        "Lowering the sink temperature raises η more than raising the source temperature by the same amount.",
      ],
      formulae: [
        { label: "Engine efficiency", expr: "η = W/Q₁ = 1 − Q₂/Q₁" },
        { label: "Carnot efficiency", expr: "η = 1 − T₂/T₁" },
        { label: "Energy balance", expr: "Q₁ = Q₂ + W" },
        { label: "Refrigerator COP", expr: "α = Q₂/W = T₂/(T₁ − T₂)", note: "Carnot refrigerator" },
      ],
      flow: {
        title: "The Carnot cycle",
        steps: [
          { label: "Isothermal expansion at T₁", detail: "Gas absorbs Q₁ from the source and does work." },
          { label: "Adiabatic expansion", detail: "Gas cools from T₁ to T₂, doing more work at the cost of internal energy." },
          { label: "Isothermal compression at T₂", detail: "Work is done on the gas and it rejects Q₂ to the sink." },
          { label: "Adiabatic compression", detail: "Gas is heated from T₂ back to T₁, closing the cycle." },
        ],
      },
      pitfalls: [
        "Always convert to kelvin before using 1 − T₂/T₁; using Celsius gives absurd efficiencies.",
        "COP of a refrigerator is not an efficiency and may be much larger than 1.",
      ],
      vignette: {
        stem: "A Carnot engine works between 500 K and 300 K and absorbs 1000 J per cycle from the source. Find its efficiency, the work done and the heat rejected per cycle.",
        answer: "40%, 400 J, 600 J",
        reasoning:
          "η = 1 − 300/500 = 0.4. W = ηQ₁ = 0.4 × 1000 = 400 J. Q₂ = Q₁ − W = 600 J (check: Q₂/Q₁ = T₂/T₁ = 0.6).",
      },
      highYield:
        "Carnot η = 1 − T₂/T₁ (kelvin) depends only on reservoir temperatures; Carnot refrigerator COP = T₂/(T₁ − T₂).",
      checks: [
        {
          q: "A Carnot refrigerator keeps its freezer at −23 °C in a room at 27 °C. Its coefficient of performance is:",
          options: ["5", "6", "0.2", "1.2"],
          answer: 0,
          why: "T₂ = 250 K, T₁ = 300 K: α = 250/(300 − 250) = 5.",
        },
        {
          q: "The efficiency of a Carnot engine depends on:",
          options: [
            "The working substance",
            "The temperatures of source and sink only",
            "The size of the engine",
            "The amount of heat absorbed",
          ],
          answer: 1,
          why: "η = 1 − T₂/T₁ contains only the reservoir temperatures.",
        },
      ],
    },
    {
      id: "kinetic-theory",
      title: "Kinetic theory of gases",
      minutes: 8,
      summary:
        "Gas pressure is the result of molecular impacts; temperature measures the average translational kinetic energy, and equipartition of energy gives the molar specific heats.",
      examFocus:
        "rms speed and its dependence on T and M, the ratio v_rms : v_avg : v_mp, average KE per molecule, degrees of freedom and γ for mono-, di- and polyatomic gases, and mean free path.",
      mechanism:
        "Each molecule bouncing off a wall transfers momentum 2mv, and adding up these impacts over all molecules gives P = (1/3)ρv²(rms). Comparing this with PV = nRT shows that the average translational KE per molecule is (3/2)k_BT — temperature is a direct measure of molecular motion. The law of equipartition says that in thermal equilibrium each quadratic term in the energy (each degree of freedom) carries ½k_BT on average. A monatomic gas has only 3 translational degrees of freedom, while a rigid diatomic adds 2 rotational ones, so its Cv is larger and γ smaller. Lighter molecules move faster at the same temperature because equal average KE means v(rms) ∝ 1/√M.",
      points: [
        "Ideal gas equation PV = nRT = Nk_BT; k_B = 1.38 × 10⁻²³ J K⁻¹; R = 8.314 J mol⁻¹ K⁻¹.",
        "Pressure P = (1/3)nm v²(rms) = (1/3)ρ v²(rms), n = number density.",
        "Average translational KE per molecule = (3/2)k_BT, the same for all gases at the same T.",
        "v(rms) = √(3RT/M) > v(avg) = √(8RT/πM) > v(mp) = √(2RT/M).",
        "Equipartition: ½k_BT per degree of freedom; Cv = (f/2)R, Cp = Cv + R, γ = 1 + 2/f.",
        "Mean free path λ = 1/(√2 πd²n): shorter for bigger molecules and denser gases.",
        "Dalton's law: total pressure of a non-reacting mixture = sum of partial pressures.",
      ],
      formulae: [
        { label: "Kinetic pressure", expr: "P = (1/3)ρ v²(rms)" },
        { label: "rms speed", expr: "v(rms) = √(3RT/M) = √(3k_BT/m)", note: "M in kg mol⁻¹" },
        { label: "Average KE per molecule", expr: "Ē = (3/2)k_BT" },
        { label: "Specific heats", expr: "Cv = (f/2)R, γ = 1 + 2/f" },
        { label: "Mean free path", expr: "λ = 1/(√2 πd²n)" },
      ],
      table: {
        title: "Degrees of freedom and specific heats",
        columns: ["Gas", "f", "Cv", "Cp", "γ"],
        rows: [
          ["Monatomic (He, Ar)", "3", "3R/2", "5R/2", "5/3 ≈ 1.67"],
          ["Diatomic, rigid (O₂, N₂)", "5", "5R/2", "7R/2", "7/5 = 1.4"],
          ["Diatomic with vibration", "7", "7R/2", "9R/2", "9/7 ≈ 1.29"],
          ["Polyatomic, rigid non-linear", "6", "3R", "4R", "4/3 ≈ 1.33"],
        ],
      },
      pitfalls: [
        "At the same temperature all gases have the same average KE per molecule, but not the same rms speed.",
        "A vibrational mode counts as 2 quadratic terms (kinetic + potential), which is why vibrating diatomics have f = 7.",
      ],
      vignette: {
        stem: "At what temperature will the rms speed of hydrogen molecules (M = 2 g mol⁻¹) equal the rms speed of oxygen molecules (M = 32 g mol⁻¹) at 47 °C?",
        answer: "20 K (−253 °C)",
        reasoning:
          "v(rms) ∝ √(T/M), so T(H₂)/2 = 320/32 = 10, giving T(H₂) = 20 K.",
      },
      highYield:
        "v(rms) ∝ √(T/M); average KE = (3/2)k_BT for every gas; γ = 5/3 monatomic, 7/5 diatomic.",
      checks: [
        {
          q: "To double the rms speed of gas molecules, the absolute temperature must be:",
          options: ["Doubled", "Halved", "Made four times", "Made √2 times"],
          answer: 2,
          why: "v(rms) ∝ √T, so v doubles when T is multiplied by 4.",
        },
        {
          q: "The ratio Cp/Cv for a rigid diatomic ideal gas is:",
          options: ["1.67", "1.33", "1.29", "1.4"],
          answer: 3,
          why: "f = 5, so γ = 1 + 2/5 = 7/5 = 1.4.",
        },
      ],
    },
    {
      id: "shm",
      title: "Oscillations and simple harmonic motion",
      minutes: 8,
      summary:
        "SHM occurs whenever the restoring force is proportional to displacement and opposite to it; the motion is sinusoidal with a period set by inertia and stiffness, not by amplitude.",
      examFocus:
        "Velocity and acceleration at a given displacement, energy split between KE and PE, period of spring–mass systems and pendulums (including in lifts), and spring combinations.",
      mechanism:
        "A restoring force F = −kx gives a = −(k/m)x, and the only functions whose second derivative is a negative multiple of themselves are sines and cosines, so x = A sin(ωt + φ) with ω = √(k/m). A stiffer spring pulls back harder and a lighter mass responds faster, so the period 2π√(m/k) falls with k and rises with m — but it does not depend on how far you pull the mass. For a simple pendulum at small angles, the restoring force is mg sinθ ≈ mgθ, which gives T = 2π√(L/g), independent of mass. Energy shuttles between kinetic and potential forms while the total ½kA² stays constant: velocity is maximum at the mean position and acceleration is maximum at the extremes. Anything that changes the effective g — an accelerating lift, or free fall — changes the pendulum's period.",
      points: [
        "Defining condition: a = −ω²x; ω = 2π/T = 2πν.",
        "v = ω√(A² − x²): maximum ωA at the mean position, zero at the extremes.",
        "Acceleration magnitude ω²|x|: zero at the mean position, maximum ω²A at the extremes.",
        "Total energy E = ½kA² = ½mω²A²; KE = PE at x = A/√2.",
        "KE and PE each oscillate with frequency 2ν (period T/2).",
        "Spring–mass T = 2π√(m/k); springs in parallel k = k₁ + k₂, in series 1/k = 1/k₁ + 1/k₂; cutting a spring in half doubles k.",
        "Simple pendulum T = 2π√(L/g), small amplitude; seconds pendulum has T = 2 s (L ≈ 1 m).",
        "In a lift accelerating up, g(eff) = g + a (T decreases); down, g − a; in free fall the pendulum does not oscillate.",
      ],
      formulae: [
        { label: "Displacement", expr: "x = A sin(ωt + φ)" },
        { label: "Velocity", expr: "v = ω√(A² − x²)" },
        { label: "Acceleration", expr: "a = −ω²x" },
        { label: "Spring–mass", expr: "T = 2π√(m/k)" },
        { label: "Simple pendulum", expr: "T = 2π√(L/g)" },
        { label: "Energy", expr: "E = ½mω²A²" },
      ],
      table: {
        title: "SHM at the mean position and at the extremes",
        columns: ["Quantity", "Mean position (x = 0)", "Extreme (x = ±A)"],
        rows: [
          ["Speed", "Maximum, ωA", "Zero"],
          ["Acceleration", "Zero", "Maximum, ω²A"],
          ["Restoring force", "Zero", "Maximum, kA"],
          ["Kinetic energy", "Maximum, ½kA²", "Zero"],
          ["Potential energy", "Zero", "Maximum, ½kA²"],
        ],
      },
      pitfalls: [
        "KE equals PE at x = A/√2, not at x = A/2 (at A/2, PE is only a quarter of the total).",
        "Period of SHM is independent of amplitude; only the maximum speed and energy depend on A.",
      ],
      vignette: {
        stem: "A particle executes SHM with amplitude 5 cm and angular frequency 2 rad s⁻¹. Find its speed and acceleration when it is 3 cm from the mean position.",
        answer: "8 cm s⁻¹; 12 cm s⁻² towards the mean position",
        reasoning:
          "v = ω√(A² − x²) = 2√(25 − 9) = 2 × 4 = 8 cm s⁻¹. |a| = ω²x = 4 × 3 = 12 cm s⁻², directed towards the mean position.",
      },
      highYield:
        "v max at mean (ωA), a max at extremes (ω²A); KE = PE at A/√2; T = 2π√(m/k) and 2π√(L/g).",
      checks: [
        {
          q: "A simple pendulum is suspended in a lift that starts falling freely. Its period:",
          options: ["Doubles", "Becomes zero", "Is unchanged", "Becomes infinite"],
          answer: 3,
          why: "g(eff) = g − g = 0, so T = 2π√(L/0) → ∞; the pendulum does not oscillate.",
        },
        {
          q: "A spring of constant k is cut into two equal halves and the halves are joined in parallel. The new spring constant is:",
          options: ["k", "2k", "4k", "k/2"],
          answer: 2,
          why: "Each half has constant 2k; in parallel 2k + 2k = 4k.",
        },
      ],
    },
    {
      id: "waves-standing",
      title: "Waves, speed of sound and standing waves",
      minutes: 9,
      summary:
        "A wave carries energy without carrying matter; its speed depends on the medium. Reflected waves superpose with incident ones to form standing waves in strings and air columns.",
      examFocus:
        "Wave speed on a string √(T/μ), Laplace's correction, harmonics of strings and open/closed pipes, distance between nodes, and reading v, λ and ν from y = A sin(kx − ωt).",
      mechanism:
        "Wave speed is set by a restoring property over an inertial one: tension over mass per unit length for a string, and elasticity over density for sound. Newton assumed sound compressions are isothermal and got about 280 m s⁻¹; Laplace noted they are so quick that they are adiabatic, replacing P with γP and giving about 331 m s⁻¹ in air at 0 °C. When a wave reflects from a boundary and overlaps itself, certain frequencies form stationary patterns with fixed nodes and antinodes. A string fixed at both ends must have nodes at both ends, so it fits whole numbers of half-wavelengths and supports all harmonics. A pipe closed at one end has a node at the closed end and an antinode at the open end, so it fits odd quarter-wavelengths and supports only odd harmonics.",
      points: [
        "v = νλ; for y = A sin(kx − ωt), k = 2π/λ, ω = 2πν and v = ω/k.",
        "Transverse waves on a string: v = √(T/μ).",
        "Sound in a gas: v = √(γP/ρ) = √(γRT/M); independent of pressure at fixed T, ∝ √T, faster in moist air.",
        "Reflection from a rigid boundary reverses the phase (π change); from an open boundary there is no phase change.",
        "Standing wave: adjacent nodes (or antinodes) are λ/2 apart; node to adjacent antinode is λ/4.",
        "String fixed at both ends and open pipe: νₙ = nv/2L, all harmonics.",
        "Closed pipe: ν = (2n − 1)v/4L, only odd harmonics; its fundamental is half that of an open pipe of the same length.",
      ],
      formulae: [
        { label: "Wave relation", expr: "v = νλ = ω/k" },
        { label: "Speed on a string", expr: "v = √(T/μ)", note: "μ = mass per unit length" },
        { label: "Speed of sound (Laplace)", expr: "v = √(γP/ρ)" },
        { label: "String / open pipe", expr: "νₙ = nv/2L, n = 1, 2, 3 …" },
        { label: "Closed pipe", expr: "ν = (2n − 1)v/4L, n = 1, 2, 3 …" },
      ],
      table: {
        title: "Normal modes",
        columns: ["System", "Ends", "Fundamental", "Harmonics present"],
        rows: [
          ["String", "Node – node", "v/2L", "All (1, 2, 3 …)"],
          ["Open pipe", "Antinode – antinode", "v/2L", "All (1, 2, 3 …)"],
          ["Closed pipe", "Node – antinode", "v/4L", "Odd only (1, 3, 5 …)"],
        ],
      },
      pitfalls: [
        "The first overtone of a closed pipe is the 3rd harmonic, not the 2nd.",
        "Changing the air pressure at constant temperature does not change the speed of sound.",
      ],
      vignette: {
        stem: "A pipe closed at one end is 85 cm long. Taking the speed of sound as 340 m s⁻¹, find its fundamental frequency and its first overtone.",
        answer: "100 Hz and 300 Hz",
        reasoning:
          "ν₁ = v/4L = 340/(4 × 0.85) = 340/3.4 = 100 Hz. Only odd harmonics exist, so the first overtone is 3ν₁ = 300 Hz.",
      },
      highYield:
        "String v = √(T/μ); closed pipe only odd harmonics with fundamental v/4L; nodes λ/2 apart.",
      checks: [
        {
          q: "The tension in a stretched string is made four times. Its fundamental frequency becomes:",
          options: ["Four times", "Twice", "Half", "Unchanged"],
          answer: 1,
          why: "ν = (1/2L)√(T/μ) ∝ √T, so ν doubles.",
        },
        {
          q: "An open pipe and a closed pipe have the same fundamental frequency. The ratio of their lengths L(open) : L(closed) is:",
          options: ["1 : 2", "1 : 1", "2 : 1", "4 : 1"],
          answer: 2,
          why: "v/2L(open) = v/4L(closed) ⇒ L(open) = 2L(closed).",
        },
      ],
    },
    {
      id: "beats-doppler",
      title: "Beats and the Doppler effect",
      minutes: 7,
      summary:
        "Two sounds of slightly different frequency produce a periodic rise and fall of loudness called beats; relative motion of source and observer shifts the frequency heard (Doppler effect).",
      examFocus:
        "Beat frequency, finding an unknown tuning-fork frequency after waxing or filing, apparent frequency for a moving source or observer, and the asymmetry between source and observer motion.",
      mechanism:
        "When two waves of frequencies ν₁ and ν₂ overlap, they drift in and out of step; each time they come back into phase the loudness peaks, which happens |ν₁ − ν₂| times a second. Loading a tuning fork's prongs with wax adds mass and lowers its frequency, while filing removes mass and raises it — so watching whether the beat rate rises or falls tells you which fork is higher. In the Doppler effect a moving source crowds its wavefronts together ahead of it, shortening the wavelength in the medium; a moving observer instead meets wavefronts at a higher rate without changing λ. Because these are physically different, a source moving at speed u does not give the same shift as an observer moving at u. Only the velocity components along the line joining source and observer matter.",
      points: [
        "Beat frequency = |ν₁ − ν₂|; beats are noticeable only when the difference is small.",
        "Waxing (loading) a fork lowers its frequency; filing raises it.",
        "Approaching source or observer ⇒ apparent frequency increases; receding ⇒ decreases.",
        "Moving source changes the wavelength in the medium; moving observer does not.",
        "No Doppler shift when the motion is perpendicular to the line of sight.",
        "Wind blowing along the line adds to the speed of sound in that direction.",
      ],
      formulae: [
        { label: "Beat frequency", expr: "ν(beat) = |ν₁ − ν₂|" },
        {
          label: "Doppler (general)",
          expr: "ν' = ν(v + v₀)/(v − vₛ)",
          note: "v₀ positive towards source, vₛ positive towards observer",
        },
        { label: "Source approaching, observer at rest", expr: "ν' = νv/(v − vₛ)" },
        { label: "Observer approaching, source at rest", expr: "ν' = ν(v + v₀)/v" },
      ],
      flow: {
        title: "Finding an unknown fork frequency from beats",
        steps: [
          { label: "Write both options", detail: "Unknown = known ± beat frequency." },
          { label: "Apply the change", detail: "Waxing lowers the unknown; filing raises it." },
          { label: "Predict new beat rate", detail: "Work out the beat rate each option would now give." },
          { label: "Match the observation", detail: "Keep the option consistent with the reported change in beats." },
        ],
      },
      pitfalls: [
        "Sign convention: speeds that bring source and observer closer always increase the heard frequency — check the answer against this.",
        "A source approaching at u and an observer approaching at u give different apparent frequencies.",
      ],
      vignette: {
        stem: "Fork A (256 Hz) gives 4 beats per second with fork B. When B is loaded with a little wax, the beat rate becomes 6 per second. Find the original frequency of B.",
        answer: "252 Hz",
        reasoning:
          "B is either 260 Hz or 252 Hz. Waxing lowers B. If B were 260 Hz, lowering it would first reduce the beats below 4; since beats rose to 6, B was 252 Hz (now about 250 Hz).",
      },
      highYield:
        "Beats = |ν₁ − ν₂|; wax lowers, filing raises frequency; ν' = ν(v + v₀)/(v − vₛ) for approach.",
      checks: [
        {
          q: "A source emitting 900 Hz moves towards a stationary observer at 34 m s⁻¹. Speed of sound is 340 m s⁻¹. The frequency heard is:",
          options: ["810 Hz", "990 Hz", "1000 Hz", "818 Hz"],
          answer: 2,
          why: "ν' = νv/(v − vₛ) = 900 × 340/306 = 1000 Hz.",
        },
        {
          q: "Two sound waves of frequencies 400 Hz and 404 Hz are sounded together. The number of beats heard per second is:",
          options: ["4", "2", "8", "404"],
          answer: 0,
          why: "Beat frequency = |404 − 400| = 4 per second.",
        },
      ],
    },
  ],
};
