export type Locale = "en" | "tr";

export const ui = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      research: "Research",
      skills: "Skills",
      cv: "View CV",
      contact: "Contact"
    },
    hero: {
      studentBadge: "Final-Year Student",
      motifCode: "WET-LAB // DRUG DESIGN // BIOINFO",
      pretitle: "Personal Academic & Research Portfolio",
      getInTouch: "Get in Touch",
      researchProjects: "Research Projects",
      viewCv: "View CV",
      focusTitle: "Focus & Core Competencies",
      focusId: "01 / SCHEMA",
      seqLevel: "SEQUENCE & STRUCTURE LEVEL",
      connector: "EXPERIMENTAL ASSAY & COMPUTATION",
      analysisSchema: "ANALYSIS SCHEMA",
      schema1: "qPCR & Blotting",
      schema2: "Docking",
      schema3: "TCGA Analysis"
    },
    about: {
      title: "About",
      highlight: "Combining hands-on wet-lab molecular techniques with computational structural biology and cancer bioinformatics.",
      degreeCardTitle: "Academic Degree Programs",
      bachelorDegree: "B.Sc. Molecular Biology & Genetics",
      associateDegree: "A.S. Computer Programming",
      gpaLabel: "GPA",
      pillar1Val: "LMU Klinikum",
      pillar1Cap: "Research Internship",
      pillar2Val: "2 Graduation Theses",
      pillar2Cap: "In Silico / Wet-Lab",
      pillar3Val: "Dual Academic Path",
      pillar3Cap: "Biology + Informatics"
    },
    experience: {
      title: "Experience",
      intro: "Laboratory research internship specializing in cardiovascular pathophysiology and molecular biology protocols at an international research clinic.",
      keyTechniques: "Key Techniques Applied"
    },
    research: {
      title: "Research",
      intro: "Two dedicated bachelor's graduation theses covering structure-based computer-aided drug design and pan-cancer transcriptomic bioinformatic analysis.",
      thesis1Num: "THESIS 01",
      thesis1Badge: "In Silico Drug Design · AutoDock Vina",
      thesis1Desc: "Rational design, molecular docking, and ADME/toxicity profiling of five novel amentoflavone biflavonoid derivatives targeting human CXCR4 (PDB ID: 3ODU).",
      thesis2Num: "THESIS 02",
      thesis2Badge: "Cancer Bioinformatics · TCGA / TIMER2.0",
      thesis2Desc: "Multi-cohort bioinformatic investigation into CXCR4 expression, survival outcomes, and immune cell infiltration in breast, lung, and colorectal cancers.",
      readCaseStudy: "Read Full Thesis Case Study",
      keyHighlights: "Key Highlights & Outcomes"
    },
    skills: {
      title: "Skills",
      intro: "Structured across four core domains: experimental molecular protocols, structure-based drug design, bioinformatic data platforms, and scientific computing."
    },
    contact: {
      title: "Contact",
      intro: "Available for laboratory research internships, graduate student research positions, and computational biology collaborations.",
      emailLabel: "Email Address",
      phoneLabel: "Phone",
      locationLabel: "Location",
      statusLabel: "Status & Availability",
      statusText: "Seeking laboratory internship or research assistant position in molecular biology or biomedical research.",
      sendEmail: "Send Email"
    },
    footer: {
      discipline: "Molecular Biology & Genetics"
    }
  },
  tr: {
    nav: {
      about: "Hakkımda",
      experience: "Deneyim",
      research: "Araştırma",
      skills: "Yetkinlikler",
      cv: "Özgeçmiş (CV)",
      contact: "İletişim"
    },
    hero: {
      studentBadge: "Son Sınıf Öğrencisi",
      motifCode: "ISLAK-LAB // İLAÇ TASARIMI // BİYOİNFORMATİK",
      pretitle: "Kişisel Akademik & Araştırma Portfolyosu",
      getInTouch: "İletişime Geç",
      researchProjects: "Araştırma Projeleri",
      viewCv: "Özgeçmişi İncele",
      focusTitle: "Odak Alanları & Temel Yetkinlikler",
      focusId: "01 / ŞEMA",
      seqLevel: "SEKANS & YAPISAL DÜZEY",
      connector: "DENEYSEL ANALİZ & HESAPLAMA",
      analysisSchema: "ANALİZ ŞEMASI",
      schema1: "qPCR & Blotting",
      schema2: "Kenetlenme (Docking)",
      schema3: "TCGA Analizi"
    },
    about: {
      title: "Hakkımda",
      highlight: "Uygulamalı ıslak laboratuvar moleküler tekniklerini, hesaplamalı yapısal biyoloji ve kanser biyoinformatiği ile harmanlayan araştırma profili.",
      degreeCardTitle: "Akademik Lisans & Önlisans Programları",
      bachelorDegree: "Moleküler Biyoloji ve Genetik Lisansı",
      associateDegree: "Bilgisayar Programcılığı Önlisansı",
      gpaLabel: "GNO",
      pillar1Val: "LMU Klinikum",
      pillar1Cap: "Araştırma Stajı",
      pillar2Val: "2 Mezuniyet Tezi",
      pillar2Cap: "Hesaplamalı / Islak Lab",
      pillar3Val: "Çift Akademik Kulvar",
      pillar3Cap: "Biyoloji + Bilişim"
    },
    experience: {
      title: "Deneyim",
      intro: "Uluslararası bir araştırma kliniğinde kardiyovasküler patofizyoloji ve moleküler biyoloji protokolleri üzerine yürütülen laboratuvar stajı.",
      keyTechniques: "Uygulanan Temel Laboratuvar Teknikleri"
    },
    research: {
      title: "Araştırmalar",
      intro: "Yapı tabanlı bilgisayar destekli ilaç tasarımı ve pan-kanser transkriptomik biyoinformatik analizlerini kapsayan iki tamamlanmış lisans mezuniyet tezi.",
      thesis1Num: "TEZ 01",
      thesis1Badge: "İn Siliko İlaç Tasarımı · AutoDock Vina",
      thesis1Desc: "İnsan CXCR4 reseptörünü (PDB ID: 3ODU) hedefleyen beş özgün amentoflavon biflavonoid türevinin rasyonel tasarımı, moleküler kenetlenmesi ve ADME/toksisite profillemesi.",
      thesis2Num: "TEZ 02",
      thesis2Badge: "Kanser Biyoinformatiği · TCGA / TIMER2.0",
      thesis2Desc: "Meme, akciğer ve kolorektal kanserlerde CXCR4 ekspresyonu, klinik sağkalım sonuçları ve immün hücre infiltrasyonunun çoklu kohortlu biyoinformatik analizi.",
      readCaseStudy: "Detaylı Tez Çalışmasını İncele",
      keyHighlights: "Öne Çıkan Bulgular & Çıktılar"
    },
    skills: {
      title: "Yetkinlikler",
      intro: "Dört ana eksende yapılandırılmış yetkinlikler: Deneysel moleküler protokoller, yapı tabanlı ilaç tasarımı, biyoinformatik veri platformları ve bilimsel programlama."
    },
    contact: {
      title: "İletişim",
      intro: "Laboratuvar stajları, lisansüstü araştırmacı pozisyonları ve hesaplamalı biyoloji iş birlikleri için iletişime geçebilirsiniz.",
      emailLabel: "E-posta Adresi",
      phoneLabel: "Telefon",
      locationLabel: "Konum",
      statusLabel: "Mevcut Durum & Uygunluk",
      statusText: "Moleküler biyoloji veya biyomedikal araştırma ortamında deneysel becerileri derinleştirecek laboratuvar stajı veya araştırmacı pozisyonu arayışında.",
      sendEmail: "E-posta Gönder"
    },
    footer: {
      discipline: "Moleküler Biyoloji ve Genetik"
    }
  }
};
