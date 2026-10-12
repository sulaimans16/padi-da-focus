import type { LearnModule } from "../../learn";

export const geneticsEvolution: LearnModule = {
  slug: "genetics-evolution",
  group: "Biology",
  subject: "Botany",
  title: "Genetics & Evolution",
  icon: "genetics",
  blurb:
    "Mendel's laws and crosses, deviations from Mendelism, chromosomal theory, linkage and sex determination, genetic disorders, DNA structure and replication, transcription and translation, the lac operon, the Human Genome Project, DNA fingerprinting and evolution.",
  objectives: [
    "Learner can predict phenotypic and genotypic ratios of monohybrid, dihybrid and test crosses and solve probability questions on them.",
    "Learner can recognise incomplete dominance, codominance, multiple alleles, pleiotropy and polygenic inheritance from the ratio or example given.",
    "Learner can explain linkage, recombination, sex determination and X-linked inheritance, and classify human genetic disorders as Mendelian or chromosomal.",
    "Learner can describe DNA structure, semiconservative replication, transcription, the genetic code, translation and lac operon regulation in NCERT terms.",
    "Learner can apply evidences of evolution, Darwinian selection, the Hardy–Weinberg principle and the sequence of human evolution to NEET questions.",
  ],
  concepts: [
    {
      id: "mendel-laws",
      title: "Mendel's laws and crosses",
      minutes: 8,
      summary:
        "Mendel's hybridisation experiments on garden pea showed that traits are controlled by paired factors (genes) that segregate into gametes and, for different traits, assort independently.",
      examFocus:
        "F2 phenotypic and genotypic ratios, test-cross ratios, fraction-of-progeny probability questions from a dihybrid cross, and which of the seven pea traits is dominant.",
      mechanism:
        "Each diploid plant carries two copies (alleles) of a gene, one inherited from each parent. During gamete formation the two alleles separate so that each gamete carries only one, which is why a heterozygote Tt makes T and t gametes in equal numbers. Random fusion of these gametes gives 1 TT : 2 Tt : 1 tt, and because the dominant allele masks the recessive one in Tt, the phenotypes appear as 3 tall : 1 dwarf. When two genes lie on different chromosomes, the way one pair of alleles separates does not influence the other, so the 3:1 ratios of each trait multiply to give 9:3:3:1. A test cross with the recessive parent reveals the hidden genotype, because the recessive parent contributes only recessive alleles and lets every allele of the unknown plant show in the progeny.",
      points: [
        "Mendel worked with true-breeding lines of garden pea (Pisum sativum) and chose 7 pairs of contrasting traits.",
        "Monohybrid F2: phenotypic ratio 3:1, genotypic ratio 1:2:1.",
        "Dihybrid F2: phenotypic ratio 9:3:3:1; 16 combinations from 4 types of gametes per parent.",
        "Monohybrid test cross (Tt × tt) gives 1:1; dihybrid test cross (RrYy × rryy) gives 1:1:1:1.",
        "Law of Dominance and Law of Segregation come from monohybrid crosses; the Law of Independent Assortment comes from dihybrid crosses.",
        "Segregation is called the law of purity of gametes: alleles do not blend in the hybrid and a gamete receives only one allele.",
        "The Punnett square, developed by Reginald C. Punnett, is a graphic way to calculate the probability of all genotypes in a cross.",
      ],
      table: {
        title: "Mendel's seven pea traits",
        columns: ["Character", "Dominant", "Recessive"],
        rows: [
          ["Stem height", "Tall", "Dwarf"],
          ["Flower colour", "Violet", "White"],
          ["Flower position", "Axial", "Terminal"],
          ["Pod shape", "Inflated (full)", "Constricted"],
          ["Pod colour", "Green", "Yellow"],
          ["Seed shape", "Round", "Wrinkled"],
          ["Seed colour", "Yellow", "Green"],
        ],
      },
      flow: {
        title: "Working a dihybrid cross",
        steps: [
          { label: "Parents", detail: "RRYY (round yellow) × rryy (wrinkled green)" },
          { label: "F1", detail: "All RrYy, round yellow" },
          { label: "F1 gametes", detail: "RY, Ry, rY, ry in equal proportion" },
          {
            label: "F2 (16 boxes)",
            detail: "9 round yellow : 3 round green : 3 wrinkled yellow : 1 wrinkled green",
          },
        ],
      },
      pitfalls: [
        "Pod colour green is dominant but seed colour green is recessive; students swap them.",
        "Of the 9 round yellow F2 plants only 1 (RRYY) breeds true; true-breeding round yellow is 1/16 of the F2, not 9/16.",
      ],
      vignette: {
        stem: "A tall pea plant of unknown genotype is crossed with a dwarf plant. Of 120 progeny, 62 are tall and 58 are dwarf.",
        answer: "The tall plant is heterozygous (Tt).",
        reasoning:
          "Crossing with the homozygous recessive parent is a test cross. A 1:1 ratio is possible only if the tall parent made T and t gametes equally; a TT parent would have given all tall progeny.",
      },
      highYield: "Monohybrid F2 3:1 (1:2:1), dihybrid F2 9:3:3:1, test crosses 1:1 and 1:1:1:1.",
      checks: [
        {
          q: "In a dihybrid cross RrYy × RrYy, what fraction of the progeny will be wrinkled and yellow?",
          options: ["9/16", "1/16", "3/16", "1/4"],
          answer: 2,
          why: "Wrinkled is 1/4 (rr) and yellow is 3/4 (Y_), so 1/4 × 3/4 = 3/16.",
        },
        {
          q: "Which cross is a test cross?",
          options: ["Tt × Tt", "Tt × tt", "TT × Tt", "TT × TT"],
          answer: 1,
          why: "A test cross mates the organism of unknown genotype with the homozygous recessive parent.",
        },
      ],
    },
    {
      id: "deviations-mendelism",
      title: "Deviations from Mendelian ratios",
      minutes: 8,
      summary:
        "Not every gene shows complete dominance: incomplete dominance, codominance, multiple alleles, pleiotropy and polygenic inheritance all modify the simple Mendelian picture.",
      examFocus:
        "F2 ratio of snapdragon, ABO genotypes and phenotypes from given parents, the number of genotypes with three alleles, PKU as pleiotropy, and skin colour as polygenic inheritance.",
      mechanism:
        "Dominance is not a property of the allele alone but of what its product does. If the normal allele makes a working enzyme and the modified allele makes a non-functional one, a single normal copy may be enough and the trait looks dominant. If one copy makes only half as much pigment, the heterozygote looks intermediate, which is incomplete dominance. If both alleles make distinct, functional products, both show up in the heterozygote, which is codominance, as with the A and B sugars on red blood cells. A single gene product can also feed into several pathways and so affect many traits (pleiotropy), while one trait such as skin colour can be the summed effect of several genes, each adding a little (polygenic inheritance).",
      points: [
        "Incomplete dominance in dog flower (snapdragon, Antirrhinum): RR red, Rr pink, rr white; F2 phenotypic and genotypic ratios are both 1:2:1.",
        "Starch grain size in pea (BB large, Bb intermediate, bb small) shows incomplete dominance even though seed shape (round/wrinkled) shows complete dominance with the same gene.",
        "ABO blood groups: gene I has three alleles IA, IB and i; IA and IB are codominant, both dominant over i.",
        "Three alleles give 6 genotypes and 4 phenotypes (A, B, AB, O).",
        "Multiple alleles can be found only when population studies are made, because one diploid individual carries at most two alleles.",
        "Pleiotropy: phenylketonuria results from mutation in the gene for phenylalanine hydroxylase and shows mental retardation along with reduced hair and skin pigmentation.",
        "Polygenic inheritance: human skin colour controlled by three genes (A, B, C); AABBCC is darkest, aabbcc lightest, intermediates graded by the number of dominant alleles.",
      ],
      table: {
        title: "Telling the deviations apart",
        columns: ["Pattern", "Example", "Key sign"],
        rows: [
          [
            "Incomplete dominance",
            "Snapdragon flower colour",
            "Heterozygote intermediate; F2 1:2:1",
          ],
          ["Codominance", "IA IB → blood group AB", "Both parental phenotypes expressed together"],
          ["Multiple alleles", "IA, IB, i", "More than two alleles in the population"],
          ["Pleiotropy", "Phenylketonuria", "One gene, several phenotypic effects"],
          ["Polygenic", "Skin colour, height", "Several genes, continuous gradation"],
        ],
      },
      pitfalls: [
        "In incomplete dominance the genotypic ratio is not altered; only the phenotypic ratio changes from 3:1 to 1:2:1.",
        "Blood group AB is codominance, not incomplete dominance: the cell carries both A and B sugars, not a blend.",
      ],
      vignette: {
        stem: "A woman of blood group A and a man of blood group B have a first child with blood group O.",
        answer:
          "Parents are IAi and IBi; each later child has a 1/4 chance of each group A, B, AB and O.",
        reasoning:
          "An O child (ii) must receive i from both parents, so both are heterozygous. IAi × IBi gives IAIB, IAi, IBi and ii in equal numbers.",
      },
      highYield:
        "ABO: 3 alleles, 6 genotypes, 4 phenotypes; IA and IB codominant. Snapdragon F2 1:2:1. PKU = pleiotropy.",
      checks: [
        {
          q: "When pink-flowered snapdragons are selfed, the offspring ratio red : pink : white is:",
          options: ["1:2:1", "3:1:0", "9:3:4", "1:1:1"],
          answer: 0,
          why: "Rr × Rr gives RR, Rr, rr in 1:2:1 and each genotype has its own colour because dominance is incomplete.",
        },
        {
          q: "Which genotype cannot be produced by parents IAIB × ii?",
          options: ["IAi", "IBi", "IAIB", "Both IAi and IBi are possible"],
          answer: 2,
          why: "The ii parent gives only i, so every child carries one i; IAIB needs IA and IB from different parents.",
        },
      ],
    },
    {
      id: "chromosomal-theory-linkage-sex",
      title: "Chromosomal theory, linkage and sex determination",
      minutes: 9,
      summary:
        "Genes sit on chromosomes; genes close together on one chromosome tend to be inherited together (linkage), and sex is fixed by specific sex chromosomes or by ploidy.",
      examFocus:
        "Morgan's recombination percentages, why Drosophila is a good model, heterogametic sex in humans, birds and grasshopper, haplodiploidy in honey bee, and X-linked recessive crosses.",
      mechanism:
        "Sutton and Boveri noticed that chromosomes, like Mendel's factors, occur in pairs and segregate at meiosis, and that different pairs orient independently at metaphase I; this parallel became the chromosomal theory of inheritance. But a chromosome carries many genes, so genes lying on the same chromosome cannot assort independently and tend to stay together. Crossing over between homologous chromatids can break such linkages, and the farther apart two genes are, the more often a cross-over falls between them. That is why recombination frequency works as a measure of distance and could be used by Sturtevant to map gene positions. Sex chromosomes are simply a pair that differs in content, so the sex that makes two kinds of gametes (the heterogametic sex) decides the sex of the offspring.",
      points: [
        "Morgan worked on Drosophila melanogaster and coined the terms linkage and recombination.",
        "In Morgan's crosses, yellow body and white eye showed only 1.3% recombination (tightly linked), white eye and miniature wing showed 37.2% (loosely linked).",
        "Drosophila is a useful model: grows on simple synthetic medium, completes its life cycle in about two weeks, a single mating gives many progeny, sexes are clearly different, and many hereditary variations are visible under low-power microscopes.",
        "Henking (1891) traced a nuclear structure he called the X body in insect spermatogenesis.",
        "XO type (grasshopper): male has only one X, so males have one chromosome less than females; XY type (humans, Drosophila): male heterogametic; ZW type (birds): female heterogametic (ZW), male ZZ.",
        "Honey bee shows haplodiploid sex determination: fertilised eggs develop into females (2n = 32), unfertilised eggs develop into males (n = 16) by parthenogenesis; males make sperms by mitosis.",
        "In humans the sperm decides the sex of the child; each pregnancy has a 50% chance of a son or a daughter.",
        "Haemophilia and colour blindness are X-linked recessive: a carrier mother passes the allele to half her sons (affected) and half her daughters (carriers).",
      ],
      table: {
        title: "Sex-determination systems",
        columns: ["Type", "Example", "Female", "Male", "Heterogametic sex"],
        rows: [
          ["XX–XO", "Grasshopper", "XX", "XO", "Male"],
          ["XX–XY", "Humans, Drosophila", "XX", "XY", "Male"],
          ["ZW–ZZ", "Birds", "ZW", "ZZ", "Female"],
          [
            "Haplodiploid",
            "Honey bee",
            "Diploid (2n = 32)",
            "Haploid (n = 16)",
            "Not chromosome-pair based",
          ],
        ],
      },
      pitfalls: [
        "In birds the female (ZW) is heterogametic, so the egg, not the sperm, decides the sex of the chick.",
        "A male honey bee has no father and cannot have sons, but has a grandfather and can have grandsons.",
      ],
      vignette: {
        stem: "A woman with normal vision whose father was colour-blind marries a man with normal vision.",
        answer:
          "Half their sons are expected to be colour-blind; no daughter is expected to be colour-blind, but half are carriers.",
        reasoning:
          "She received her father's affected X, so she is a carrier (XᶜX). Sons get their only X from her (1/2 affected). Daughters get a normal X from the father, so they can be carriers but not affected.",
      },
      highYield:
        "Recombination % ∝ distance between genes; birds ZW female heterogametic; honey bee males haploid from unfertilised eggs.",
      checks: [
        {
          q: "In which organism is the female heterogametic?",
          options: ["Human", "Drosophila", "Grasshopper", "Fowl"],
          answer: 3,
          why: "Birds show ZW–ZZ sex determination; the female makes Z and W eggs.",
        },
        {
          q: "Two genes show 37.2% recombination while another pair shows 1.3%. This means:",
          options: [
            "The 1.3% pair lies on different chromosomes",
            "The 37.2% pair lies farther apart on the chromosome",
            "Both pairs assort independently",
            "The 1.3% pair is never inherited together",
          ],
          answer: 1,
          why: "Higher recombination means more chance of a cross-over between the genes, so they are farther apart; the 1.3% pair is tightly linked.",
        },
      ],
    },
    {
      id: "genetic-disorders",
      title: "Mendelian and chromosomal disorders",
      minutes: 8,
      summary:
        "Mendelian disorders arise from alteration of a single gene and follow Mendelian inheritance, while chromosomal disorders come from absence, excess or abnormal arrangement of whole chromosomes.",
      examFocus:
        "The amino acid change in sickle-cell anaemia, thalassemia genes and chromosomes, karyotypes of Down's, Klinefelter's and Turner's syndromes, and reading pedigree patterns.",
      mechanism:
        "A Mendelian disorder starts with a change in the DNA of one gene, which alters the protein it makes. In sickle-cell anaemia one base substitution changes GAG to GUG in the β-globin gene, so glutamic acid at the sixth position is replaced by valine; the altered haemoglobin polymerises at low oxygen and distorts the red cell into a sickle. Thalassemia is different: the globin is normal in structure but too little of it is made, so it is a quantitative defect while sickle-cell is a qualitative one. Chromosomal disorders begin at meiosis: if homologues or chromatids fail to separate (non-disjunction), a gamete gets one chromosome too many or too few, and the resulting aneuploid zygote has a dosage imbalance of hundreds of genes, which produces a syndrome rather than a single trait.",
      points: [
        "Sickle-cell anaemia is autosomal recessive; HbAHbS heterozygotes are apparently unaffected carriers, and the disease shows only in HbSHbS.",
        "Phenylketonuria is an autosomal recessive inborn error of metabolism; phenylalanine accumulates and is converted to phenylpyruvic acid and other derivatives that damage the brain.",
        "Thalassemia is autosomal recessive; α-thalassemia is controlled by two closely linked genes HBA1 and HBA2 on chromosome 16, β-thalassemia by a single gene HBB on chromosome 11.",
        "Down's syndrome: trisomy of chromosome 21; short stature, small round head, furrowed tongue, partially open mouth, broad palm with a characteristic crease, retarded physical, psychomotor and mental development.",
        "Klinefelter's syndrome: 47, XXY; overall masculine development but with feminine features such as gynaecomastia; sterile.",
        "Turner's syndrome: 45, X0; sterile females with rudimentary ovaries and lack of other secondary sexual characters.",
        "Aneuploidy results from failure of segregation of chromatids during cell division; polyploidy (an increase in whole sets of chromosomes) is often seen in plants.",
      ],
      table: {
        title: "Disorders at a glance",
        columns: ["Disorder", "Type", "Basis"],
        rows: [
          ["Haemophilia", "Mendelian, X-linked recessive", "Defective clotting protein"],
          [
            "Colour blindness",
            "Mendelian, X-linked recessive",
            "Defect in red or green cone function",
          ],
          [
            "Sickle-cell anaemia",
            "Mendelian, autosomal recessive",
            "Glu → Val at position 6 of β-globin",
          ],
          ["Thalassemia", "Mendelian, autosomal recessive", "Reduced synthesis of α or β globin"],
          ["Down's syndrome", "Chromosomal", "Trisomy 21"],
          ["Klinefelter's syndrome", "Chromosomal", "47, XXY"],
          ["Turner's syndrome", "Chromosomal", "45, X0"],
        ],
      },
      pitfalls: [
        "Turner's syndrome has 45 chromosomes (one X missing), not 47; Klinefelter's has the extra X.",
        "Sickle-cell is a qualitative defect (wrong globin); thalassemia is a quantitative defect (too little globin).",
      ],
      vignette: {
        stem: "A child's karyotype shows 47 chromosomes with three copies of chromosome 21. Neither parent is affected.",
        answer: "Down's syndrome caused by non-disjunction during gamete formation in a parent.",
        reasoning:
          "Failure of chromosome 21 to separate at meiosis gives a gamete with two copies; fertilisation with a normal gamete gives trisomy 21.",
      },
      highYield:
        "Sickle-cell: GAG → GUG, Glu → Val at 6th position of β chain. Down 47 (+21), Klinefelter 47 XXY, Turner 45 X0.",
      checks: [
        {
          q: "In sickle-cell anaemia, the substitution in the β-globin chain is:",
          options: [
            "Valine by glutamic acid at the sixth position",
            "Glutamic acid by valine at the sixth position",
            "Glutamic acid by lysine at the first position",
            "Valine by alanine at the sixth position",
          ],
          answer: 1,
          why: "A single base change GAG → GUG replaces glutamic acid with valine at position six.",
        },
        {
          q: "The β-thalassemia gene HBB is located on chromosome:",
          options: ["16", "21", "X", "11"],
          answer: 3,
          why: "β-thalassemia is controlled by HBB on chromosome 11; α-thalassemia genes HBA1 and HBA2 are on chromosome 16.",
        },
      ],
    },
    {
      id: "dna-structure-replication",
      title: "DNA structure, packaging and replication",
      minutes: 9,
      summary:
        "DNA is a right-handed, antiparallel double helix held by complementary base pairing; it is packed on histones and copied semiconservatively.",
      examFocus:
        "Chargaff-based percentage calculations, double-helix dimensions, nucleosome composition, Griffith/Hershey–Chase/Meselson–Stahl experiments, and leading versus lagging strand.",
      mechanism:
        "The two strands run in opposite directions and are joined by hydrogen bonds between a purine on one strand and a pyrimidine on the other, A with T by two bonds and G with C by three. Because pairing is fixed, the sequence of one strand automatically specifies the other, so each strand can act as a template; separating the strands and building a new partner on each gives two molecules that each keep one old strand, which is semiconservative replication. DNA polymerase can add nucleotides only to a free 3′ end, so it works only in the 5′ → 3′ direction. On the template running 3′ → 5′ the new strand grows continuously, but on the other template it must be made in short Okazaki fragments that DNA ligase joins later. The negative phosphate backbone also explains packaging: it wraps around positively charged histones rich in lysine and arginine.",
      points: [
        "Griffith (1928) showed transformation in Streptococcus pneumoniae; Avery, MacLeod and McCarty showed the transforming principle is DNA; Hershey and Chase (1952) used ³²P-labelled DNA and ³⁵S-labelled protein of bacteriophage to show DNA enters the bacterium.",
        "Watson and Crick (1953) proposed the double helix using X-ray diffraction data of Maurice Wilkins and Rosalind Franklin; Chargaff's rule: A = T and G = C.",
        "Pitch of the helix is 3.4 nm with about 10 bp per turn, so the distance between two bp is about 0.34 nm.",
        "Human diploid DNA has 6.6 × 10⁹ bp and would be about 2.2 m long; E. coli DNA has 4.6 × 10⁶ bp.",
        "Nucleosome: about 200 bp of DNA wrapped around a histone octamer; chromatin looks like beads-on-string; loosely packed euchromatin is transcriptionally active, densely packed heterochromatin is inactive.",
        "Meselson and Stahl (1958) proved semiconservative replication by growing E. coli in ¹⁵NH₄Cl, shifting to ¹⁴N medium, and separating DNA by CsCl density gradient centrifugation.",
        "E. coli replicates its 4.6 × 10⁶ bp in about 18 minutes, an average of about 2000 bp per second; deoxyribonucleoside triphosphates act as both substrate and energy source.",
        "Replication starts at a definite origin; in eukaryotes it occurs in the S phase.",
      ],
      table: {
        title: "Key experiments on the genetic material",
        columns: ["Scientist(s)", "Material", "Conclusion"],
        rows: [
          [
            "Griffith",
            "S and R strains of Streptococcus pneumoniae in mice",
            "A transforming principle passes from heat-killed S to live R",
          ],
          [
            "Avery, MacLeod, McCarty",
            "Purified biochemicals from S cells",
            "DNA is the transforming principle",
          ],
          [
            "Hershey and Chase",
            "Bacteriophage with ³²P and ³⁵S",
            "DNA, not protein, is the genetic material",
          ],
          ["Meselson and Stahl", "E. coli with ¹⁵N then ¹⁴N", "Replication is semiconservative"],
        ],
      },
      pitfalls: [
        "Okazaki fragments form on the lagging strand, whose template runs 5′ → 3′; the new DNA is still made 5′ → 3′.",
        "After one generation in ¹⁴N all DNA is hybrid (intermediate density); after two generations it is half hybrid and half light, never any heavy.",
      ],
      vignette: {
        stem: "A double-stranded DNA sample contains 18% adenine. A student needs the percentage of guanine.",
        answer: "32% guanine.",
        reasoning:
          "A = T = 18%, so A + T = 36%. The remaining 64% is G + C, and because G = C each is 32%.",
      },
      highYield:
        "A = T (2 H-bonds), G ≡ C (3 H-bonds); 0.34 nm per bp, 3.4 nm per turn; Meselson–Stahl ¹⁵N → semiconservative.",
      checks: [
        {
          q: "Histone proteins can bind DNA tightly because they are rich in:",
          options: [
            "Lysine and arginine, which are positively charged",
            "Aspartate and glutamate, which are negatively charged",
            "Cysteine, which forms disulphide bonds with DNA",
            "Glycine, which is very small",
          ],
          answer: 0,
          why: "Basic residues lysine and arginine give histones a positive charge that attracts the negatively charged phosphate backbone.",
        },
        {
          q: "In the Hershey–Chase experiment, radioactivity was found inside the bacterial cells when the phage was labelled with:",
          options: ["³⁵S", "¹⁵N", "³²P", "¹⁴C"],
          answer: 2,
          why: "Phosphorus is present in DNA, which entered the bacteria; sulphur labels protein, which stayed outside.",
        },
      ],
    },
    {
      id: "transcription-translation",
      title: "Transcription, genetic code and translation",
      minutes: 9,
      summary:
        "Information flows from DNA to RNA (transcription) and from mRNA to protein (translation), read as non-overlapping triplet codons.",
      examFocus:
        "Template versus coding strand, the three eukaryotic RNA polymerases, capping/tailing/splicing, salient features of the genetic code, stop codons, and tRNA as adapter.",
      mechanism:
        "Only one DNA strand, the template running 3′ → 5′, is copied, so the RNA has the same sequence as the other (coding) strand with U in place of T. In eukaryotes genes are split into exons and non-coding introns, so the first transcript (hnRNA) must be processed: introns are spliced out, a methyl guanosine triphosphate cap is added at the 5′ end and a poly-A tail at the 3′ end, before the mRNA leaves the nucleus. Four bases read in threes give 4³ = 64 codons, enough for 20 amino acids with room for redundancy, which is why the code is degenerate. Amino acids cannot recognise codons themselves, so tRNA acts as the adapter: its anticodon pairs with the codon while its acceptor end carries the matching amino acid, charged using ATP. In bacteria the mRNA needs no processing and translation can begin before transcription ends.",
      points: [
        "A transcription unit has a promoter, a structural gene and a terminator; the promoter lies towards the 5′ end (upstream) of the coding strand.",
        "Bacteria use one DNA-dependent RNA polymerase; the σ (sigma) factor helps initiation and the ρ (rho) factor helps termination.",
        "Eukaryotes: RNA polymerase I makes rRNAs (28S, 18S, 5.8S); RNA polymerase II makes hnRNA (precursor of mRNA); RNA polymerase III makes tRNA, 5S rRNA and snRNAs.",
        "Genetic code: triplet, 61 codons code for amino acids and 3 (UAA, UAG, UGA) are stop codons; unambiguous and specific; degenerate; read without punctuation; nearly universal.",
        "AUG codes for methionine and also acts as the initiator codon.",
        "Gamow suggested a triplet code; Khorana's chemical method synthesised RNA of defined base combinations; Nirenberg's cell-free system helped decipher the code; Severo Ochoa's enzyme (polynucleotide phosphorylase) polymerised RNA without a template.",
        "The ribosome's larger subunit holds the peptide-bond-forming activity; in bacteria 23S rRNA acts as the catalyst (ribozyme).",
        "mRNA also carries untranslated regions (UTRs) at the 5′ and 3′ ends, needed for efficient translation.",
      ],
      flow: {
        title: "From gene to protein in eukaryotes",
        steps: [
          {
            label: "Transcription",
            detail: "RNA polymerase II copies the template strand into hnRNA",
          },
          { label: "Splicing", detail: "Introns removed, exons joined" },
          {
            label: "Capping and tailing",
            detail: "Methyl guanosine triphosphate cap at 5′, adenylate residues added at 3′",
          },
          { label: "Export", detail: "Mature mRNA moves to the cytoplasm" },
          { label: "Initiation", detail: "Ribosome binds mRNA; initiator tRNA reads AUG" },
          {
            label: "Elongation",
            detail: "Charged tRNAs bring amino acids; peptide bonds form codon by codon",
          },
          {
            label: "Termination",
            detail: "A stop codon is reached; release factor frees the polypeptide",
          },
        ],
      },
      pitfalls: [
        "The RNA sequence matches the coding strand (with U for T), not the template strand.",
        "Degenerate means one amino acid has several codons; it does not mean one codon codes for several amino acids (the code is unambiguous).",
      ],
      vignette: {
        stem: "The coding strand of a short bacterial gene reads 5′-ATG GCT TGA-3′.",
        answer: "mRNA is 5′-AUG GCU UGA-3′; it codes Met–Ala and then stops.",
        reasoning:
          "mRNA has the coding-strand sequence with U in place of T. AUG is the start (methionine), GCU codes alanine, and UGA is a stop codon.",
      },
      highYield:
        "Pol I: rRNA; Pol II: hnRNA; Pol III: tRNA, 5S rRNA, snRNA. Stop codons UAA, UAG, UGA; AUG = Met + start.",
      checks: [
        {
          q: "Which is a stop codon?",
          options: ["AUG", "UAG", "UGG", "GUA"],
          answer: 1,
          why: "UAA, UAG and UGA do not code for any amino acid and terminate translation.",
        },
        {
          q: "Tailing of hnRNA in eukaryotes means:",
          options: [
            "Addition of methyl guanosine triphosphate at the 5′ end",
            "Removal of introns",
            "Template-independent addition of adenylate residues at the 3′ end",
            "Joining of Okazaki fragments",
          ],
          answer: 2,
          why: "A poly-A tail is added at the 3′ end without a template; capping occurs at the 5′ end.",
        },
      ],
    },
    {
      id: "lac-operon-genome",
      title: "Lac operon, Human Genome Project and DNA fingerprinting",
      minutes: 8,
      summary:
        "The lac operon shows how bacteria switch genes on only when needed; the Human Genome Project mapped the human DNA sequence, and VNTR polymorphism makes DNA fingerprinting possible.",
      examFocus:
        "Products of i, z, y and a genes, what the inducer does, negative regulation, salient HGP facts, and the steps of DNA fingerprinting.",
      mechanism:
        "In E. coli the genes for using lactose sit together under one promoter and operator, so they are transcribed as one polycistronic mRNA. The i gene makes a repressor all the time; in the absence of lactose the repressor binds the operator and physically blocks RNA polymerase, keeping the operon off and saving energy. When lactose enters, it binds the repressor, changes its shape and prevents it binding the operator, so RNA polymerase can transcribe z, y and a; lactose therefore acts as the inducer. Because a repressor switches the operon off, this is negative regulation. DNA fingerprinting works for a related reason that has nothing to do with expression: non-coding repetitive DNA (such as VNTRs) varies in copy number from person to person, so cutting DNA and probing for these repeats gives a band pattern unique to each individual except identical twins.",
      points: [
        "Lac operon (Jacob and Monod): i gene codes the repressor; z codes β-galactosidase (hydrolyses lactose to galactose and glucose); y codes permease; a codes transacetylase.",
        "Lactose is the substrate for β-galactosidase and also the inducer of the operon; a low basal level of expression is needed for lactose to enter the cell first.",
        "Regulation by the repressor is negative regulation; the lac operon is also under positive regulation, which is beyond NCERT scope.",
        "HGP was launched in 1990 and completed in 2003; human genome contains about 3164.7 million bp.",
        "Average gene size is about 3000 bases; the largest known human gene, dystrophin, has 2.4 million bases; total genes are estimated at about 30,000.",
        "99.9% of nucleotide bases are the same in all people; less than 2% of the genome codes for proteins; chromosome 1 has the most genes (2968) and Y the fewest (231); about 1.4 million SNP locations were identified.",
        "HGP methods: Expressed Sequence Tags and sequence annotation; DNA cloned in BAC and YAC vectors and sequenced with automated sequencers based on Frederick Sanger's method.",
        "DNA fingerprinting was developed by Alec Jeffreys using a satellite DNA (VNTR) probe; VNTR size ranges from 0.1 to 20 kb.",
      ],
      flow: {
        title: "Steps of DNA fingerprinting (Southern blot method)",
        steps: [
          {
            label: "Isolation",
            detail: "DNA extracted from blood, hair root, semen or other cells",
          },
          { label: "Digestion", detail: "Restriction endonucleases cut the DNA" },
          { label: "Electrophoresis", detail: "Fragments separated by size" },
          {
            label: "Blotting",
            detail: "Fragments transferred to nitrocellulose or nylon membrane",
          },
          { label: "Hybridisation", detail: "Labelled VNTR probe binds matching sequences" },
          { label: "Autoradiography", detail: "Band pattern detected on X-ray film" },
        ],
      },
      pitfalls: [
        "The i gene is not 'inhibitor'; it codes the repressor and is itself always expressed (constitutive).",
        "y codes permease and a codes transacetylase; students reverse them.",
      ],
      vignette: {
        stem: "E. coli growing on glucose alone is transferred to a medium where lactose is the only sugar. After a while β-galactosidase activity rises sharply.",
        answer: "Lactose induced the lac operon by inactivating the repressor.",
        reasoning:
          "Lactose binds the repressor so it can no longer sit on the operator; RNA polymerase then transcribes z, y and a, and β-galactosidase is made.",
      },
      highYield:
        "i → repressor; z → β-galactosidase; y → permease; a → transacetylase. Lactose = inducer; repressor control = negative regulation.",
      checks: [
        {
          q: "In the lac operon, the repressor protein is coded by:",
          options: ["z gene", "y gene", "a gene", "i gene"],
          answer: 3,
          why: "The regulatory i gene codes the repressor; z, y and a are structural genes.",
        },
        {
          q: "Which statement about the human genome is correct as per HGP findings?",
          options: [
            "More than 50% of the genome codes for proteins",
            "Chromosome Y has the largest number of genes",
            "About 99.9% of nucleotide bases are identical in all people",
            "The average gene is about 3 million bases long",
          ],
          answer: 2,
          why: "Humans share 99.9% of bases; less than 2% codes for proteins, chromosome 1 has the most genes and the average gene is about 3000 bases.",
        },
      ],
    },
    {
      id: "evolution",
      title: "Origin of life and evolution",
      minutes: 9,
      summary:
        "Life arose by chemical evolution from simple molecules, and natural selection acting on heritable variation explains the diversity seen in fossils, anatomy and molecules; Hardy–Weinberg equilibrium is the baseline against which evolution is measured.",
      examFocus:
        "Miller's experiment, homologous vs analogous organs, industrial melanism, adaptive radiation, Hardy–Weinberg calculations and disturbing factors, types of selection, and the human evolution sequence with brain capacities.",
      mechanism:
        "Darwin's argument rests on observable facts: populations produce more offspring than survive, individuals vary, and much of that variation is heritable. Those variants that survive and reproduce better leave more offspring, so their alleles become more frequent over generations; fitness therefore means reproductive fitness, not strength. Organs built on the same plan but used for different functions (homologous organs) show that species share an ancestor and diverged, while organs that look alike but are built differently (analogous organs) show that similar habitats select similar solutions. Hardy–Weinberg captures the opposite case: in a large, randomly mating population with no migration, mutation, drift or selection, allele frequencies stay constant forever. Any measured change from p² + 2pq + q² therefore tells us that one of these forces is acting, which is the operational meaning of evolution.",
      points: [
        "Oparin and Haldane proposed chemical evolution of life from non-living organic molecules; S.L. Miller (1953) created electric discharge in a closed flask of CH₄, H₂, NH₃ and water vapour at 800°C and obtained amino acids.",
        "Homologous organs show divergent evolution: forelimbs of whales, bats, cheetah and human; vertebrate hearts and brains; thorn of Bougainvillea and tendril of Cucurbita.",
        "Analogous organs show convergent evolution: wings of butterfly and bird, eye of octopus and mammals, flippers of penguins and dolphins, sweet potato (root) and potato (stem).",
        "Industrial melanism in England: after industrialisation, dark-winged Biston betularia moths increased because they were camouflaged on soot-darkened, lichen-free tree trunks.",
        "Adaptive radiation: Darwin's finches of the Galapagos and Australian marsupials; when more than one adaptive radiation occurs in an isolated area, it gives convergent evolution (placental mammals vs Australian marsupials).",
        "Hugo de Vries, working on evening primrose, proposed mutation theory: large, sudden mutations (saltation) cause speciation, unlike Darwin's small directional variations.",
        "Five factors disturb Hardy–Weinberg equilibrium: gene migration (gene flow), genetic drift, mutation, genetic recombination and natural selection; drift that founds a new population gives the founder effect.",
        "Natural selection can be stabilising, directional or disruptive.",
      ],
      formulae: [
        {
          label: "Allele frequencies",
          expr: "p + q = 1",
          note: "p = frequency of dominant allele, q = recessive",
        },
        {
          label: "Hardy–Weinberg genotype frequencies",
          expr: "p² + 2pq + q² = 1",
          note: "p² = AA, 2pq = Aa, q² = aa; holds only in the absence of disturbing factors",
        },
      ],
      table: {
        title: "Sequence of human evolution",
        columns: ["Form", "Time / place", "Key feature"],
        rows: [
          [
            "Dryopithecus, Ramapithecus",
            "About 15 mya",
            "Hairy, walked like gorillas and chimpanzees; Ramapithecus more man-like",
          ],
          [
            "Australopithecines",
            "About 2 mya, East African grasslands",
            "Hunted with stone weapons, ate fruit",
          ],
          [
            "Homo habilis",
            "Africa",
            "First human-like being; brain 650–800 cc; probably did not eat meat",
          ],
          ["Homo erectus", "About 1.5 mya", "Brain about 900 cc; probably ate meat"],
          [
            "Neanderthal man",
            "1,00,000–40,000 years ago, near east and central Asia",
            "Brain about 1400 cc; used hides, buried the dead",
          ],
          ["Homo sapiens", "Arose in Africa", "Modern humans; agriculture about 10,000 years ago"],
        ],
      },
      pitfalls: [
        "Thorn of Bougainvillea and tendril of Cucurbita are homologous (both modified stems), not analogous.",
        "In Hardy–Weinberg problems, q² is the frequency of the recessive phenotype; take its square root to get q before finding carriers (2pq).",
      ],
      vignette: {
        stem: "In a population in Hardy–Weinberg equilibrium, 16% of individuals show a recessive trait.",
        answer: "q = 0.4, p = 0.6; carriers (2pq) = 48%.",
        reasoning:
          "q² = 0.16, so q = 0.4 and p = 1 − 0.4 = 0.6. Heterozygotes = 2 × 0.6 × 0.4 = 0.48, i.e. 48%; homozygous dominant p² = 36%.",
      },
      highYield:
        "p² + 2pq + q² = 1; five disturbing factors: gene flow, drift, mutation, recombination, selection. Homo habilis 650–800 cc, H. erectus 900 cc, Neanderthal 1400 cc.",
      checks: [
        {
          q: "Wings of a butterfly and wings of a bird are an example of:",
          options: [
            "Homologous organs and divergent evolution",
            "Analogous organs and convergent evolution",
            "Vestigial organs",
            "Adaptive radiation",
          ],
          answer: 1,
          why: "They perform the same function but have different structure and origin, so they are analogous and reflect convergent evolution.",
        },
        {
          q: "Which factor does NOT disturb Hardy–Weinberg equilibrium?",
          options: [
            "Genetic drift",
            "Gene flow",
            "Random mating in a large population",
            "Natural selection",
          ],
          answer: 2,
          why: "Random mating in a large population is a condition for equilibrium; drift, gene flow, mutation, recombination and selection change allele frequencies.",
        },
      ],
    },
  ],
};
