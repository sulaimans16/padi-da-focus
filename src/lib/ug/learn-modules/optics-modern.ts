import type { LearnModule } from "../../learn";

export const opticsModern: LearnModule = {
  slug: "optics-modern",
  group: "Physics",
  subject: "Physics",
  title: "Optics & Modern Physics",
  icon: "light_mode",
  blurb:
    "Refraction and total internal reflection, mirrors and lenses, prisms and optical instruments, wave optics (Young's double slit, diffraction, polarisation), the photoelectric effect and matter waves, the Bohr atom and hydrogen spectrum, nuclear binding energy, and semiconductor devices with logic gates.",
  objectives: [
    "Learner can apply Snell's law, the critical-angle condition and the mirror, lens and lens-maker's formulae with the Cartesian sign convention.",
    "Learner can find the refractive index of a prism from minimum deviation and the magnifying power of microscopes and telescopes.",
    "Learner can calculate fringe width in Young's experiment, the central maximum width in single-slit diffraction, Brewster's angle and Malus's law intensities.",
    "Learner can use Einstein's photoelectric equation, the de Broglie relation and Bohr's energy levels to solve numericals.",
    "Learner can compute binding energy from mass defect and explain p-n junction devices and the truth tables of basic logic gates.",
  ],
  concepts: [
    {
      id: "refraction-tir",
      title: "Refraction and total internal reflection",
      minutes: 7,
      summary:
        "Light bends at a boundary because its speed changes; going from a denser to a rarer medium beyond the critical angle, all of it is reflected back — total internal reflection.",
      examFocus:
        "Snell's law, apparent depth, critical angle from refractive index, conditions for TIR, and applications such as optical fibres, mirages and the sparkle of diamond.",
      mechanism:
        "Refractive index n = c/v measures how much light slows down in a medium. At a boundary the frequency cannot change (it is set by the source), so the wavelength shortens in the slower medium and the wavefront swings round, giving n₁ sin i = n₂ sin r. Going from a denser to a rarer medium the ray bends away from the normal, so as the angle of incidence grows the refracted ray approaches the surface. At the critical angle C the refracted ray grazes the surface (r = 90°), so sin C = n₂/n₁; beyond C no refracted ray is possible and all the light is reflected. Because nothing is lost to refraction, TIR is far more efficient than reflection from a mirror, which is why optical fibres can carry light over long distances.",
      points: [
        "Snell's law: n₁ sin i = n₂ sin r; n = c/v; ₁n₂ = n₂/n₁.",
        "Frequency is unchanged on refraction; wavelength in a medium λ' = λ/n.",
        "Apparent depth = real depth / n (viewed normally); the object appears raised by d(1 − 1/n).",
        "TIR needs light travelling from denser to rarer medium and angle of incidence > critical angle.",
        "sin C = 1/n (rarer medium air); glass (n ≈ 1.5) C ≈ 42°, water (n ≈ 1.33) C ≈ 49°, diamond (n ≈ 2.42) C ≈ 24.4°.",
        "Applications: optical fibres, totally reflecting prisms, mirage, brilliance of diamond.",
        "Critical angle is larger for red light than violet because n(red) < n(violet).",
      ],
      formulae: [
        { label: "Snell's law", expr: "n₁ sin i = n₂ sin r" },
        { label: "Refractive index", expr: "n = c/v = λ(vacuum)/λ(medium)" },
        { label: "Apparent depth", expr: "d' = d/n" },
        { label: "Critical angle", expr: "sin C = n₂/n₁ = 1/n (into air)" },
      ],
      table: {
        title: "Critical angles (into air)",
        columns: ["Medium", "Refractive index", "Critical angle"],
        rows: [
          ["Water", "≈ 1.33", "≈ 49°"],
          ["Crown glass", "≈ 1.5", "≈ 42°"],
          ["Diamond", "≈ 2.42", "≈ 24.4°"],
        ],
      },
      pitfalls: [
        "TIR is impossible when light goes from a rarer into a denser medium, however large the angle.",
        "Frequency, not wavelength, stays the same when light enters a new medium — colour is set by frequency.",
      ],
      vignette: {
        stem: "A coin lies at the bottom of a tank filled with water (n = 4/3) to a depth of 12 cm. Viewed from directly above, how much does the coin appear to be raised?",
        answer: "3 cm (it appears 9 cm deep)",
        reasoning:
          "Apparent depth = 12/(4/3) = 9 cm. Apparent rise = 12 − 9 = 3 cm, equivalently d(1 − 1/n) = 12 × 1/4 = 3 cm.",
      },
      highYield:
        "sin C = 1/n; TIR needs denser → rarer and i > C; frequency unchanged, λ shrinks to λ/n.",
      checks: [
        {
          q: "The critical angle for light going from a medium of refractive index √2 into air is:",
          options: ["30°", "60°", "45°", "90°"],
          answer: 2,
          why: "sin C = 1/√2, so C = 45°.",
        },
        {
          q: "When light of wavelength 600 nm in air enters glass of refractive index 1.5:",
          options: [
            "Frequency falls and wavelength stays 600 nm",
            "Wavelength becomes 400 nm and frequency is unchanged",
            "Wavelength becomes 900 nm",
            "Both frequency and wavelength fall by 1.5",
          ],
          answer: 1,
          why: "Frequency is fixed by the source; λ' = λ/n = 600/1.5 = 400 nm.",
        },
      ],
    },
    {
      id: "mirrors-lenses",
      title: "Mirrors, lenses and the lens-maker's formula",
      minutes: 9,
      summary:
        "Spherical mirrors and thin lenses form images whose position and size follow from simple formulae once the Cartesian sign convention is applied; lens power adds for lenses in contact.",
      examFocus:
        "Image position and magnification from mirror and lens formulae, lens-maker's formula including a lens placed in a liquid, power of combinations, and refraction at a single spherical surface.",
      mechanism:
        "Every ray from an object point that strikes a mirror or lens is redirected towards (or away from) a single image point when the angles are small (paraxial rays), which is why one formula covers all object positions. For a mirror, the focal length is half the radius of curvature because a ray parallel to the axis is reflected through the point midway between the pole and the centre. A lens bends light at two surfaces, so its focal length depends on both curvatures and on how much the lens material's refractive index exceeds that of its surroundings — the lens-maker's formula. Placing a glass lens in water reduces this excess, so the lens bends light less and its focal length increases. Thin lenses in contact simply add their powers, because each bends the light by an amount proportional to its own power.",
      points: [
        "Cartesian sign convention: distances measured from the pole/optical centre; along the incident light positive; heights above the axis positive.",
        "Mirror formula 1/v + 1/u = 1/f, f = R/2; magnification m = −v/u.",
        "Lens formula 1/v − 1/u = 1/f; magnification m = v/u; negative m means real and inverted.",
        "Lens-maker's formula 1/f = (n₂₁ − 1)(1/R₁ − 1/R₂), n₂₁ = n(lens)/n(medium).",
        "Refraction at a spherical surface: n₂/v − n₁/u = (n₂ − n₁)/R.",
        "Power P = 1/f (f in metres), unit dioptre; convex positive, concave negative.",
        "Thin lenses in contact: P = P₁ + P₂, 1/f = 1/f₁ + 1/f₂.",
        "A glass lens (n = 1.5) in water (n = 1.33) has its focal length increased by about four times.",
      ],
      formulae: [
        { label: "Mirror formula", expr: "1/v + 1/u = 1/f, f = R/2" },
        { label: "Lens formula", expr: "1/v − 1/u = 1/f" },
        { label: "Magnification", expr: "mirror m = −v/u; lens m = v/u" },
        { label: "Lens-maker's formula", expr: "1/f = (n₂₁ − 1)(1/R₁ − 1/R₂)" },
        { label: "Spherical surface", expr: "n₂/v − n₁/u = (n₂ − n₁)/R" },
        { label: "Power", expr: "P = 1/f(m); P = P₁ + P₂ in contact" },
      ],
      table: {
        title: "Images formed by a convex lens",
        columns: ["Object position", "Image position", "Nature and size"],
        rows: [
          ["At infinity", "At F", "Real, inverted, highly diminished"],
          ["Beyond 2F", "Between F and 2F", "Real, inverted, diminished"],
          ["At 2F", "At 2F", "Real, inverted, same size"],
          ["Between F and 2F", "Beyond 2F", "Real, inverted, magnified"],
          ["At F", "At infinity", "Real, inverted, highly magnified"],
          ["Between F and optical centre", "Same side as object", "Virtual, erect, magnified"],
        ],
      },
      pitfalls: [
        "Object distance u is negative for a real object in the Cartesian convention — forgetting this flips the answer.",
        "The mirror formula has a plus sign (1/v + 1/u) while the lens formula has a minus sign (1/v − 1/u).",
      ],
      vignette: {
        stem: "An object is placed 30 cm in front of a convex lens of focal length 20 cm. Find the image position and magnification.",
        answer: "60 cm behind the lens; m = −2 (real, inverted, twice the size)",
        reasoning:
          "u = −30 cm, f = +20 cm. 1/v = 1/f + 1/u = 1/20 − 1/30 = 1/60, so v = +60 cm. m = v/u = 60/(−30) = −2.",
      },
      highYield:
        "Mirror 1/v + 1/u = 1/f, lens 1/v − 1/u = 1/f; lens-maker uses n(lens)/n(medium); powers add in contact.",
      checks: [
        {
          q: "A convex lens of focal length 25 cm is placed in contact with a concave lens of focal length 50 cm. The combination has power:",
          options: ["+6 D", "−2 D", "+2 D", "+0.5 D"],
          answer: 2,
          why: "P = 1/0.25 + 1/(−0.50) = 4 − 2 = +2 D (converging, f = 50 cm).",
        },
        {
          q: "A convex glass lens (n = 1.5) is immersed in water (n = 1.33). Its focal length:",
          options: ["Decreases", "Becomes infinite", "Is unchanged", "Increases"],
          answer: 3,
          why: "n₂₁ − 1 falls from 0.5 to about 0.13, so 1/f falls and f increases (about four times).",
        },
      ],
    },
    {
      id: "prism-instruments",
      title: "Prism, dispersion and optical instruments",
      minutes: 8,
      summary:
        "A prism deviates light by an amount that depends on angle of incidence and colour; at minimum deviation the ray passes symmetrically. Microscopes and telescopes combine lenses to increase the angle an object subtends at the eye.",
      examFocus:
        "Refractive index from minimum deviation, deviation by a thin prism, why violet deviates most, and magnifying power and tube length of microscopes and telescopes.",
      mechanism:
        "Inside a prism the two refraction angles must add to the prism angle, r₁ + r₂ = A, and the total deviation is δ = i + e − A. As i increases, δ first falls and then rises; at the minimum the path is symmetric (i = e, r₁ = r₂ = A/2), which gives the clean formula for n. Because refractive index is slightly larger for shorter wavelengths, violet bends more than red and white light spreads into a spectrum — dispersion. Optical instruments work by enlarging the visual angle: a simple magnifier lets you hold the object closer than the near point (25 cm), a compound microscope first forms a magnified real image with a short-focus objective and then views it with an eyepiece, and a telescope uses a long-focus objective so that magnification f₀/fₑ is large.",
      points: [
        "Prism relations: r₁ + r₂ = A; δ = i + e − A.",
        "At minimum deviation i = e, r = A/2 and n = sin[(A + δₘ)/2]/sin(A/2).",
        "Thin prism (small A): δ = (n − 1)A.",
        "Dispersion: n(violet) > n(red), so violet deviates most and red least.",
        "Simple microscope: m = 1 + D/f (image at near point D = 25 cm), m = D/f (image at infinity).",
        "Compound microscope: m ≈ (L/f₀)(D/fₑ) for the final image at infinity; both objective and eyepiece have short focal lengths.",
        "Astronomical telescope (normal adjustment): m = f₀/fₑ, tube length f₀ + fₑ; the objective has a large focal length and aperture.",
        "Reflecting telescopes avoid chromatic aberration and need only one surface to be ground, and a mirror can be supported from behind.",
      ],
      formulae: [
        { label: "Prism angle", expr: "r₁ + r₂ = A" },
        { label: "Deviation", expr: "δ = i + e − A" },
        { label: "Minimum deviation", expr: "n = sin[(A + δₘ)/2] / sin(A/2)" },
        { label: "Thin prism", expr: "δ = (n − 1)A" },
        { label: "Compound microscope", expr: "m ≈ (L/f₀)(D/fₑ)" },
        { label: "Telescope (normal adjustment)", expr: "m = f₀/fₑ, L = f₀ + fₑ" },
      ],
      table: {
        title: "Optical instruments",
        columns: ["Instrument", "Magnifying power", "Lens requirement"],
        rows: [
          [
            "Simple microscope",
            "1 + D/f (near point) or D/f (infinity)",
            "Short focal length convex lens",
          ],
          [
            "Compound microscope",
            "(L/f₀)(D/fₑ)",
            "Objective and eyepiece both short focus; f₀ < fₑ",
          ],
          [
            "Astronomical telescope",
            "f₀/fₑ",
            "Objective long focus and wide aperture; eyepiece short focus",
          ],
        ],
      },
      pitfalls: [
        "A telescope needs a long-focus objective; a microscope needs a short-focus objective — options swapping these are traps.",
        "Minimum deviation formula uses half-angles: sin[(A + δₘ)/2], not sin(A + δₘ).",
      ],
      vignette: {
        stem: "An equilateral prism (A = 60°) gives a minimum deviation of 30°. Find its refractive index. An astronomical telescope has f₀ = 100 cm and fₑ = 5 cm; find its magnifying power and length in normal adjustment.",
        answer: "n = √2 ≈ 1.41; m = 20, length 105 cm",
        reasoning:
          "n = sin[(60° + 30°)/2]/sin 30° = sin 45°/sin 30° = (1/√2)/(1/2) = √2. Telescope: m = f₀/fₑ = 100/5 = 20, L = f₀ + fₑ = 105 cm.",
      },
      highYield:
        "n = sin[(A + δₘ)/2]/sin(A/2); thin prism δ = (n − 1)A; telescope m = f₀/fₑ; microscope m ≈ (L/f₀)(D/fₑ).",
      checks: [
        {
          q: "A thin prism of angle 5° and refractive index 1.5 produces a deviation of:",
          options: ["7.5°", "2.5°", "5°", "1.5°"],
          answer: 1,
          why: "δ = (n − 1)A = 0.5 × 5° = 2.5°.",
        },
        {
          q: "When white light passes through a glass prism, the colour deviated the most is:",
          options: ["Violet", "Red", "Yellow", "Green"],
          answer: 0,
          why: "Refractive index is greatest for violet (shortest wavelength), so its deviation is largest.",
        },
      ],
    },
    {
      id: "wave-optics",
      title: "Interference, diffraction and polarisation",
      minutes: 9,
      summary:
        "Light behaves as a wave: coherent beams interfere to give bright and dark fringes, a narrow slit spreads light into a diffraction pattern, and transverse waves can be polarised.",
      examFocus:
        "Fringe width in Young's double slit and how it changes with λ, D, d or a medium, intensity ratios, width of the single-slit central maximum, Brewster's law and Malus's law.",
      mechanism:
        "Huygens' principle treats every point on a wavefront as a source of secondary wavelets, which explains reflection and refraction and predicts that light bends round small obstacles. In Young's experiment, two slits illuminated by the same source act as coherent sources with a fixed phase relation; where the path difference is a whole number of wavelengths the waves arrive in step and add, and where it is an odd half-wavelength they cancel. Since path difference = yd/D, fringes are equally spaced by β = λD/d. In single-slit diffraction, pairs of points across the slit cancel when a sinθ = nλ, so the central maximum has angular width 2λ/a and narrows as the slit widens. Polarisation proves light is transverse: a polaroid passes only one direction of E, and at Brewster's angle the reflected light is completely polarised because the reflected and refracted rays are perpendicular.",
      points: [
        "Sustained interference needs coherent sources (constant phase difference), similar amplitudes and closely spaced narrow slits.",
        "YDSE: bright fringes at path difference nλ, dark at (2n − 1)λ/2; fringe width β = λD/d.",
        "Whole apparatus immersed in a medium of index n: β' = β/n.",
        "Resultant intensity I = I₁ + I₂ + 2√(I₁I₂) cosφ; I(max)/I(min) = (√I₁ + √I₂)²/(√I₁ − √I₂)².",
        "Single slit: minima at a sinθ = nλ; central maximum angular width 2λ/a, about twice as wide as the secondary maxima.",
        "Unpolarised light through a polaroid: intensity halves. Malus's law I = I₀cos²θ.",
        "Brewster's law tan i_B = n; at i_B reflected and refracted rays are perpendicular and reflected light is fully plane-polarised.",
      ],
      formulae: [
        { label: "Fringe width", expr: "β = λD/d" },
        { label: "Path difference", expr: "Δx = yd/D; bright: nλ, dark: (2n − 1)λ/2" },
        { label: "Interference intensity", expr: "I = I₁ + I₂ + 2√(I₁I₂) cosφ" },
        { label: "Single slit minima", expr: "a sinθ = nλ; central width 2λD/a on a screen" },
        { label: "Malus's law", expr: "I = I₀cos²θ" },
        { label: "Brewster's law", expr: "tan i_B = n" },
      ],
      table: {
        title: "Interference versus diffraction",
        columns: ["Feature", "Interference (YDSE)", "Single-slit diffraction"],
        rows: [
          [
            "Origin",
            "Superposition from two coherent sources",
            "Superposition of wavelets from one slit",
          ],
          ["Fringe width", "All equal, λD/d", "Central maximum twice as wide as others"],
          ["Intensity", "All bright fringes equally bright", "Falls rapidly away from the centre"],
          ["Condition for dark band", "Path difference (2n − 1)λ/2", "a sinθ = nλ"],
        ],
      },
      pitfalls: [
        "In YDSE, increasing slit separation d decreases fringe width; increasing slit width a in diffraction narrows the central maximum.",
        "Unpolarised light loses half its intensity at the first polaroid — apply Malus's law only after that.",
      ],
      vignette: {
        stem: "In Young's double-slit experiment the slits are 0.5 mm apart, the screen is 1 m away and λ = 600 nm. Find the fringe width. What happens if the apparatus is immersed in water (n = 4/3)?",
        answer: "1.2 mm in air; 0.9 mm in water",
        reasoning:
          "β = λD/d = (600 × 10⁻⁹ × 1)/(0.5 × 10⁻³) = 1.2 × 10⁻³ m = 1.2 mm. In water λ becomes λ/n, so β' = 1.2/(4/3) = 0.9 mm.",
      },
      highYield:
        "β = λD/d; central diffraction width 2λ/a; Brewster tan i_B = n; Malus I = I₀cos²θ; unpolarised → I₀/2.",
      checks: [
        {
          q: "The Brewster angle for a glass of refractive index √3 is:",
          options: ["30°", "45°", "90°", "60°"],
          answer: 3,
          why: "tan i_B = √3, so i_B = 60°.",
        },
        {
          q: "Unpolarised light of intensity I₀ passes through two polaroids whose axes are at 60°. The emergent intensity is:",
          options: ["I₀/8", "I₀/4", "I₀/2", "3I₀/8"],
          answer: 0,
          why: "After the first polaroid I₀/2; after the second (I₀/2)cos²60° = (I₀/2)(1/4) = I₀/8.",
        },
      ],
    },
    {
      id: "photoelectric-dual",
      title: "Photoelectric effect and matter waves",
      minutes: 8,
      summary:
        "Light ejects electrons from a metal only above a threshold frequency, which shows that light energy comes in photons of hν; conversely, moving particles have a wavelength h/p.",
      examFocus:
        "Einstein's equation with work function and stopping potential, effect of intensity vs frequency, the slope of V₀–ν graph, and de Broglie wavelength of electrons accelerated through V.",
      mechanism:
        "If light were a continuous wave, a brighter beam should give electrons more energy and any frequency should work given enough time — but experiments show neither. Einstein's explanation is that light arrives as photons of energy hν, and one photon is absorbed by one electron. The electron must spend the work function φ₀ to escape, so its maximum kinetic energy is hν − φ₀, and below the threshold ν₀ = φ₀/h no single photon has enough energy, however intense the light. Raising intensity only increases the number of photons, so it raises the photocurrent but not the maximum KE or stopping potential. De Broglie reversed the idea: a particle of momentum p has a wavelength λ = h/p, which is significant only for very light particles such as electrons.",
      points: [
        "Photon energy E = hν = hc/λ; hc ≈ 1240 eV nm; photon momentum p = h/λ.",
        "Einstein's equation: K(max) = hν − φ₀ = eV₀.",
        "Threshold frequency ν₀ = φ₀/h; no emission below it, regardless of intensity.",
        "Emission is practically instantaneous (no time lag).",
        "Photocurrent ∝ intensity; stopping potential depends on frequency and metal, not on intensity.",
        "Graph of V₀ against ν is a straight line with slope h/e for every metal; its intercept on the ν-axis is ν₀.",
        "de Broglie: λ = h/p = h/√(2mK); for an electron accelerated through V volts, λ ≈ 1.227/√V nm.",
      ],
      formulae: [
        { label: "Photon energy", expr: "E = hν = hc/λ", note: "hc ≈ 1240 eV nm" },
        { label: "Einstein's equation", expr: "K(max) = hν − φ₀ = eV₀" },
        { label: "Threshold", expr: "φ₀ = hν₀ = hc/λ₀" },
        { label: "de Broglie wavelength", expr: "λ = h/p = h/√(2mK)" },
        { label: "Electron through V", expr: "λ = 1.227/√V nm" },
      ],
      table: {
        title: "Changing the incident light",
        columns: ["Change (above threshold)", "Photocurrent", "K(max) and V₀"],
        rows: [
          ["Increase intensity", "Increases", "Unchanged"],
          ["Increase frequency", "Practically unchanged at same intensity", "Increase linearly"],
          ["Frequency below ν₀", "Zero", "No emission"],
        ],
      },
      pitfalls: [
        "Doubling the frequency does not double K(max), because the work function is subtracted first.",
        "The slope of the V₀–ν graph (h/e) is the same for all metals; only the intercept changes.",
      ],
      vignette: {
        stem: "Light of wavelength 400 nm falls on a metal with work function 2.1 eV. Find the maximum kinetic energy of the photoelectrons and the stopping potential (hc = 1240 eV nm).",
        answer: "1.0 eV; 1.0 V",
        reasoning:
          "Photon energy = 1240/400 = 3.1 eV. K(max) = 3.1 − 2.1 = 1.0 eV, so eV₀ = 1.0 eV and V₀ = 1.0 V.",
      },
      highYield:
        "K(max) = hν − φ₀ = eV₀; intensity controls current, frequency controls K(max); λ(electron) = 1.227/√V nm.",
      checks: [
        {
          q: "The de Broglie wavelength of an electron accelerated from rest through 100 V is about:",
          options: ["1.227 nm", "0.1227 nm", "12.27 nm", "0.01227 nm"],
          answer: 1,
          why: "λ = 1.227/√100 nm = 0.1227 nm.",
        },
        {
          q: "In a photoelectric experiment the intensity of light (above threshold) is doubled at fixed frequency. Then:",
          options: [
            "Stopping potential doubles",
            "Maximum KE doubles",
            "Photocurrent doubles and stopping potential is unchanged",
            "Both photocurrent and stopping potential are unchanged",
          ],
          answer: 2,
          why: "Twice the photons eject twice the electrons, but each photon still has the same hν.",
        },
      ],
    },
    {
      id: "bohr-atom",
      title: "Atoms: Rutherford, Bohr and the hydrogen spectrum",
      minutes: 8,
      summary:
        "Alpha-particle scattering revealed a tiny massive nucleus; Bohr's quantised orbits explain the discrete energy levels and line spectrum of hydrogen.",
      examFocus:
        "Inferences from the Geiger–Marsden experiment, radius and energy of the nth orbit, ionisation energy, wavelength of a spectral line, the series and their regions, and number of possible lines.",
      mechanism:
        "In Rutherford's experiment most alpha particles passed straight through gold foil, but a few were deflected through large angles — possible only if the positive charge and nearly all the mass are packed in a tiny nucleus. A classical orbiting electron should radiate and spiral in, so Bohr postulated stable orbits in which angular momentum is quantised, mvr = nh/2π. Combining this with the Coulomb force as centripetal force gives radii growing as n² and energies Eₙ = −13.6/n² eV for hydrogen. Light is emitted only when the electron jumps between levels, with hν equal to the energy difference, so the spectrum is a set of sharp lines. Transitions ending on n = 1 give the Lyman series in the ultraviolet, ending on n = 2 give the visible Balmer series, and higher end-levels give infrared series.",
      points: [
        "Alpha scattering: most particles undeflected, few deflected through large angles; nuclear size ~10⁻¹⁵ to 10⁻¹⁴ m versus atomic size ~10⁻¹⁰ m.",
        "Bohr's quantisation: mvr = nh/2π.",
        "rₙ = 0.529 n²/Z Å; vₙ ∝ Z/n; Eₙ = −13.6 Z²/n² eV.",
        "Ionisation energy of hydrogen = 13.6 eV; first excitation energy = 10.2 eV.",
        "In an orbit KE = −E and PE = 2E.",
        "1/λ = RZ²(1/n₁² − 1/n₂²), R ≈ 1.097 × 10⁷ m⁻¹.",
        "Series: Lyman (n₁ = 1, UV), Balmer (n₁ = 2, visible), Paschen (3), Brackett (4), Pfund (5) — the last three in the infrared.",
        "Maximum number of lines from level n down to ground: n(n − 1)/2.",
      ],
      formulae: [
        { label: "Angular momentum", expr: "mvr = nh/2π" },
        { label: "Orbit radius", expr: "rₙ = 0.529 n²/Z Å" },
        { label: "Energy levels", expr: "Eₙ = −13.6 Z²/n² eV" },
        { label: "Rydberg formula", expr: "1/λ = RZ²(1/n₁² − 1/n₂²)" },
        { label: "Photon emitted", expr: "hν = E(upper) − E(lower)" },
        {
          label: "Closest approach",
          expr: "r₀ = 2kZe²/K",
          note: "alpha particle of kinetic energy K, head-on",
        },
      ],
      table: {
        title: "Hydrogen spectral series",
        columns: ["Series", "Lower level n₁", "Region"],
        rows: [
          ["Lyman", "1", "Ultraviolet"],
          ["Balmer", "2", "Visible"],
          ["Paschen", "3", "Infrared"],
          ["Brackett", "4", "Infrared"],
          ["Pfund", "5", "Infrared"],
        ],
      },
      pitfalls: [
        "Energy levels crowd together at large n: the gap between n = 1 and 2 (10.2 eV) is far bigger than between 2 and 3 (1.89 eV).",
        "Kinetic energy rises and total energy falls as the electron moves to a lower orbit — KE is not 'used up' in emission.",
      ],
      vignette: {
        stem: "Find the wavelength of the first line of the Balmer series of hydrogen (transition n = 3 → n = 2). Use hc = 1240 eV nm.",
        answer: "About 656 nm (red)",
        reasoning:
          "ΔE = 13.6(1/2² − 1/3²) = 13.6 × 5/36 ≈ 1.89 eV. λ = 1240/1.89 ≈ 656 nm, in the visible red.",
      },
      highYield:
        "Eₙ = −13.6Z²/n² eV, rₙ ∝ n²/Z; Lyman UV, Balmer visible, Paschen IR; lines = n(n − 1)/2.",
      checks: [
        {
          q: "Hydrogen atoms are excited to n = 4. The maximum number of spectral lines in the emission spectrum is:",
          options: ["3", "4", "6", "10"],
          answer: 2,
          why: "n(n − 1)/2 = 4 × 3/2 = 6.",
        },
        {
          q: "The ground-state energy of He⁺ (Z = 2) is:",
          options: ["−13.6 eV", "−27.2 eV", "−3.4 eV", "−54.4 eV"],
          answer: 3,
          why: "E₁ = −13.6Z² = −13.6 × 4 = −54.4 eV.",
        },
      ],
    },
    {
      id: "nuclei",
      title: "Nuclei: mass defect, binding energy, fission and fusion",
      minutes: 8,
      summary:
        "A nucleus weighs less than its separate nucleons; the missing mass is the binding energy, and the shape of the binding-energy-per-nucleon curve explains why heavy nuclei release energy by fission and light ones by fusion.",
      examFocus:
        "Nuclear radius R = R₀A^(1/3) and constant density, binding energy from mass defect using 931.5 MeV per u, the BE/A curve, properties of nuclear force, and fission vs fusion.",
      mechanism:
        "Nucleons are held together by the strong nuclear force, which is very short-ranged (a few femtometres) and much stronger than the electrostatic repulsion between protons at that range. Assembling a nucleus releases energy, so by E = mc² the nucleus has less mass than its free nucleons; this mass defect times c² is the binding energy. Because each nucleon attracts only its nearest neighbours (saturation), the binding energy per nucleon is roughly constant, about 8 MeV, for mid-mass nuclei, with a peak near A ≈ 56. Light nuclei have many surface nucleons with fewer neighbours, and very heavy nuclei suffer large Coulomb repulsion, so both have lower BE/A. Any reaction that moves nuclei towards the peak — splitting a heavy nucleus (fission) or joining light ones (fusion) — increases total binding energy and releases the difference.",
      points: [
        "Nuclear radius R = R₀A^(1/3), R₀ ≈ 1.2 fm; volume ∝ A, so nuclear density (~2.3 × 10¹⁷ kg m⁻³) is the same for all nuclei.",
        "Isotopes: same Z; isobars: same A; isotones: same N.",
        "Mass defect Δm = [Zm_p + (A − Z)m_n] − M(nucleus); BE = Δm c²; 1 u ≈ 931.5 MeV/c².",
        "BE/A peaks at about 8.75 MeV near A = 56 and is roughly 8 MeV for 30 < A < 170.",
        "Nuclear force: short range, attractive, nearly independent of charge (p–p, n–n, n–p alike), saturating.",
        "Fission of ²³⁵U by a slow neutron releases about 200 MeV per event; controlled chain reaction in reactors.",
        "Fusion of light nuclei (e.g. hydrogen into helium) powers the Sun and needs very high temperatures to overcome Coulomb repulsion.",
      ],
      formulae: [
        { label: "Nuclear radius", expr: "R = R₀A^(1/3), R₀ ≈ 1.2 fm" },
        { label: "Mass defect", expr: "Δm = Zm_p + (A − Z)m_n − M" },
        { label: "Binding energy", expr: "BE = Δm c² = Δm(u) × 931.5 MeV" },
        { label: "Q-value", expr: "Q = (Σm(reactants) − Σm(products)) c²" },
      ],
      table: {
        title: "Fission versus fusion",
        columns: ["Feature", "Fission", "Fusion"],
        rows: [
          ["Nuclei involved", "Heavy nucleus splits", "Light nuclei combine"],
          ["Why energy is released", "Products have higher BE/A", "Product has higher BE/A"],
          ["Condition", "Absorption of a (slow) neutron", "Very high temperature and pressure"],
          ["Example", "Nuclear reactor, ²³⁵U", "Energy of the Sun and stars"],
        ],
      },
      pitfalls: [
        "Total binding energy and binding energy per nucleon are different: uranium has a larger total BE than iron but a smaller BE/A.",
        "Nuclear density does not depend on mass number, because R³ ∝ A.",
      ],
      vignette: {
        stem: "Find the binding energy of a helium-4 nucleus. Masses: proton 1.00728 u, neutron 1.00866 u, ⁴He nucleus 4.00151 u; 1 u = 931.5 MeV/c².",
        answer: "About 28.3 MeV (about 7.07 MeV per nucleon)",
        reasoning:
          "Δm = 2(1.00728) + 2(1.00866) − 4.00151 = 4.03188 − 4.00151 = 0.03037 u. BE = 0.03037 × 931.5 ≈ 28.3 MeV; per nucleon 28.3/4 ≈ 7.07 MeV.",
      },
      highYield:
        "R ∝ A^(1/3) so density is constant; BE = Δm × 931.5 MeV; BE/A peaks near A = 56; heavy nuclei fission, light nuclei fuse.",
      checks: [
        {
          q: "The ratio of the nuclear radii of ²¹⁶X and ²⁷Y is:",
          options: ["8 : 1", "2 : 1", "4 : 1", "√8 : 1"],
          answer: 1,
          why: "R ∝ A^(1/3): (216/27)^(1/3) = 8^(1/3) = 2.",
        },
        {
          q: "Energy is released in the fission of a heavy nucleus because:",
          options: [
            "The products have a higher binding energy per nucleon",
            "Mass is created in the process",
            "The products have a lower binding energy per nucleon",
            "Neutrons are converted into protons",
          ],
          answer: 0,
          why: "Moving towards the peak of the BE/A curve increases total binding energy; the difference is released.",
        },
      ],
    },
    {
      id: "semiconductors",
      title: "Semiconductors, p-n junction devices and logic gates",
      minutes: 9,
      summary:
        "Doping a semiconductor creates n-type or p-type material; joining them forms a p-n junction that conducts in one direction, the basis of rectifiers, Zener regulators, LEDs, photodiodes and solar cells. Logic gates process binary signals.",
      examFocus:
        "Band gaps and classification, doping and carrier concentration (nₑnₕ = nᵢ²), forward and reverse bias, rectifier output frequency, which device works in which bias, and truth tables of gates.",
      mechanism:
        "In a semiconductor the band gap is small (about 1 eV), so heat lifts some electrons into the conduction band, leaving holes behind. Adding a pentavalent impurity gives an extra electron per dopant atom (n-type), and a trivalent impurity leaves a hole (p-type); in both cases nₑnₕ = nᵢ² at equilibrium. At a p-n junction, electrons and holes diffuse across and recombine, leaving a depletion layer of fixed ions whose field creates a barrier potential. Forward bias opposes this barrier, narrowing the depletion layer so current rises sharply past the knee voltage; reverse bias widens it, allowing only a tiny minority-carrier current until breakdown. Zener diodes are heavily doped to break down at a sharp, fixed reverse voltage, which is why they regulate voltage; photodiodes are reverse-biased so that light-generated carriers change the small reverse current measurably.",
      points: [
        "Band gap: conductors — bands overlap; semiconductors — Eg < 3 eV (Si ≈ 1.1 eV, Ge ≈ 0.7 eV); insulators — Eg > 3 eV.",
        "n-type: pentavalent donors (P, As, Sb), electrons majority; p-type: trivalent acceptors (B, Al, Ga, In), holes majority. Both are electrically neutral.",
        "Mass-action law: nₑnₕ = nᵢ².",
        "Depletion region and barrier potential (about 0.7 V for Si, 0.3 V for Ge); forward bias lowers the barrier, reverse bias raises it.",
        "Half-wave rectifier output frequency = input frequency; full-wave output frequency = twice input (100 Hz from 50 Hz mains).",
        "Zener diode: reverse biased in breakdown as a voltage regulator. Photodiode: reverse biased. LED: forward biased, photon energy ≈ Eg. Solar cell: no external bias, generates EMF.",
        "Logic gates: AND (Y = A·B), OR (Y = A + B), NOT (Y = Ā), NAND, NOR; NAND and NOR are universal gates.",
      ],
      formulae: [
        { label: "Mass-action law", expr: "nₑnₕ = nᵢ²" },
        { label: "Intrinsic semiconductor", expr: "nₑ = nₕ = nᵢ" },
        { label: "LED / photodiode", expr: "hν ≈ Eg, λ(nm) ≈ 1240/Eg(eV)" },
        { label: "Full-wave rectifier", expr: "ν(output) = 2ν(input)" },
        { label: "Boolean gates", expr: "AND: A·B; OR: A + B; NAND: (A·B)‾; NOR: (A + B)‾" },
      ],
      table: {
        title: "Truth table of basic gates (inputs A, B)",
        columns: ["A", "B", "AND", "OR", "NAND", "NOR"],
        rows: [
          ["0", "0", "0", "0", "1", "1"],
          ["0", "1", "0", "1", "1", "0"],
          ["1", "0", "0", "1", "1", "0"],
          ["1", "1", "1", "1", "0", "0"],
        ],
      },
      pitfalls: [
        "n-type material is not negatively charged — donor ions balance the extra electrons, so it is neutral.",
        "Zener diodes and photodiodes are used in reverse bias, but LEDs are forward biased.",
      ],
      vignette: {
        stem: "Pure silicon at 300 K has nᵢ = 1.5 × 10¹⁶ m⁻³. It is doped with phosphorus so that nₑ = 5 × 10²² m⁻³. Find the hole concentration and the type of semiconductor.",
        answer: "nₕ = 4.5 × 10⁹ m⁻³; n-type",
        reasoning:
          "nₕ = nᵢ²/nₑ = (1.5 × 10¹⁶)²/(5 × 10²²) = 2.25 × 10³²/5 × 10²² = 4.5 × 10⁹ m⁻³. Phosphorus is pentavalent, so electrons are the majority carriers (n-type).",
      },
      highYield:
        "nₑnₕ = nᵢ²; full-wave rectifier doubles frequency; Zener and photodiode in reverse bias, LED forward; NAND and NOR are universal.",
      checks: [
        {
          q: "A full-wave rectifier is fed from 50 Hz mains. The fundamental frequency of the ripple in its output is:",
          options: ["25 Hz", "50 Hz", "200 Hz", "100 Hz"],
          answer: 3,
          why: "Both half-cycles are used, so the output repeats twice per input cycle: 100 Hz.",
        },
        {
          q: "The output of a NAND gate is 0 only when:",
          options: [
            "Both inputs are 1",
            "Both inputs are 0",
            "Either input is 0",
            "Inputs are different",
          ],
          answer: 0,
          why: "NAND = NOT(AND); AND is 1 only for inputs 1, 1, so NAND is 0 only then.",
        },
      ],
    },
  ],
};
