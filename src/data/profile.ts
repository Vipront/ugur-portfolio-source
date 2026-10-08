export const profile = {
  name: "Uğur Cem Yıldız",
  title: "MOLECULAR BIOLOGY & GENETICS",
  location: "Çekmeköy / İstanbul, Türkiye",
  email: "yugurcem@gmail.com",
  phone: "+90 541 792 8419",
  linkedin: "https://www.linkedin.com/in/ugur-cem-yildiz/",
  profile:
    "Final-year Molecular Biology and Genetics student with hands-on wet-lab experience from an international research internship at LMU Klinikum, Munich, where I carried out protein- and RNA-level analyses within a cardiovascular research group. Comfortable across core molecular biology techniques (protein extraction, Western blot, RNA extraction, qPCR, immunofluorescence), complemented by computational research experience in structure-based drug design and cancer bioinformatics through two completed bachelor's theses. Seeking a laboratory internship or research assistant position to deepen experimental skills in a molecular biology or biomedical research setting.",

  education: [
    {
      degree: "B.Sc. in Molecular Biology and Genetics",
      institution: "İnönü University, Faculty of Arts and Sciences",
      location: "Malatya, Türkiye",
      dates: "Sep 2021 – 2027 (expected)",
      gpa: "3.33 / 4.00",
      notes: [
        "Completed two bachelor's graduation theses in computational structural biology and cancer bioinformatics."
      ]
    },
    {
      degree: "Associate Degree in Computer Programming",
      institution: "Anadolu University, Open Education Faculty",
      location: "Eskişehir, Türkiye",
      dates: "2025 – 2027 (expected)",
      gpa: "3.26 / 4.00",
      notes: [
        "Pursued concurrently with the B.Sc. to strengthen programming and computational foundations; first year completed."
      ]
    }
  ],

  experience: [
    {
      role: "Erasmus+ Research Intern",
      organization: "LMU Klinikum, Institute for Cardiovascular Prevention (IPEK)",
      location: "Munich, Germany",
      dates: "Jul 2025 – Sep 2025",
      description: "shRNA-mediated knockdown of CXCR4:",
      bullets: [
        "Performed protein extraction, BCA protein assays, and Western blotting for protein-level analyses.",
        "Carried out RNA extraction, reverse transcription, and quantitative PCR (qPCR), alongside immunofluorescence (IF) staining.",
        "Analyzed gene expression data, including next-generation sequencing (NGS) datasets."
      ]
    }
  ],

  researchProjects: [
    {
      title: "Structure-Based Design and Computational Evaluation of Amentoflavone Derivatives as Novel CXCR4 Antagonists",
      institution: "İnönü University",
      supervisor: "Dr. Seçil Demiral",
      bullets: [
        "Rationally designed five novel amentoflavone derivatives as CXCR4 antagonists using a structure-based drug design workflow against the CXCR4 crystal structure (PDB ID: 3ODU).",
        "Performed molecular docking with AutoDock Vina and identified Fluoro-Deoxy-Amentoflavone as the lead candidate (−11.9 kcal/mol), outperforming the FDA-approved antagonist Plerixafor (−9.4 kcal/mol).",
        "Predicted ADME / drug-likeness (SwissADME) and computational toxicity (ProTox-II), and analyzed protein–ligand interactions with BIOVIA Discovery Studio.",
        "Established selective deoxygenation as the key driver of receptor complementarity via a directed hydrogen bond with the pharmacophore-critical residue Tyr55."
      ]
    },
    {
      title: "A Bioinformatic Investigation into the Role of the CXCR4 Chemokine Receptor in Cancer Progression and Metastasis: Expression, Prognosis, and Immune Infiltration",
      institution: "İnönü University",
      supervisor: "Dr. Samet Kocabay",
      bullets: [
        "Investigated CXCR4 expression, genomic alterations, prognosis, and immune infiltration across breast (BRCA), lung (LUAD), and colorectal (COAD/READ) cancers using TCGA data.",
        "Analyzed differential expression (GEPIA2), genomic alterations (cBioPortal), survival outcomes (Kaplan–Meier Plotter), immune infiltration (TIMER2.0), and protein–protein interaction networks (STRING).",
        "Demonstrated a context-dependent prognostic role: high CXCR4 expression correlated with improved survival in LUAD (p = 0.007), associated with increased CD8+ T-cell infiltration."
      ]
    }
  ],

  skills: {
    molecularWetLab: [
      "DNA/RNA isolation (manual and kit-based)",
      "PCR",
      "qPCR / Real-Time PCR",
      "cDNA synthesis",
      "Western blot",
      "BCA assay",
      "immunofluorescence",
      "agarose gel electrophoresis",
      "spectrophotometry and standard curves",
      "cell counting (hemocytometer)",
      "culture media preparation",
      "mitochondria isolation"
    ],
    computationalDrugDesign: [
      "AutoDock Vina",
      "AutoDock Tools",
      "BIOVIA Discovery Studio",
      "SwissADME",
      "ProTox-II",
      "OpenBabel",
      "molecular docking",
      "structure-based drug design",
      "ADME and toxicity prediction"
    ],
    cancerBioinformatics: [
      "GEPIA2",
      "cBioPortal",
      "Kaplan–Meier Plotter",
      "TIMER2.0",
      "STRING",
      "TCGA/GTEx data analysis",
      "differential expression",
      "survival and immune-infiltration analysis"
    ],
    programmingAndData: [
      "Python",
      "R",
      "Linux (foundational, for bioinformatics data analysis)",
      "Java (foundational)"
    ]
  },

  certifications: [
    "Bioinformatics Data Analysis: Python, Linux & R",
    "Cancer Biology 101 (May 2024)",
    "Introduction to Programming with Java (Aug 2020)",
    "Introduction to Information Technologies (Jul 2020)"
  ],
  languages: [
    "Turkish (Native)",
    "English (Professional working proficiency, B2)"
  ],
  interests: [
    "Coding",
    "reading",
    "cooking",
    "cycling",
    "music",
    "travel"
  ]
};
