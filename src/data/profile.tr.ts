export const profileTr = {
  name: "Uğur Cem Yıldız",
  title: "MOLEKÜLER BİYOLOJİ VE GENETİK",
  location: "Çekmeköy / İstanbul, Türkiye",
  email: "yugurcem@gmail.com",
  phone: "+90 541 792 8419",
  linkedin: "https://www.linkedin.com/in/ugur-cem-yildiz/",
  profile:
    "LMU Klinikum Münih'te kardiyovasküler araştırma grubunda gerçekleştirdiği uluslararası araştırma stajı kapsamında protein ve RNA düzeyinde analizler yürütmüş, uygulamalı ıslak laboratuvar deneyimine sahip son sınıf Moleküler Biyoloji ve Genetik öğrencisi. Temel moleküler biyoloji tekniklerine (protein izolasyonu, Western blot, RNA izolasyonu, qPCR, immünofloresan) hakim olup, iki lisans mezuniyet tezi aracılığıyla yapı tabanlı ilaç tasarımı ve kanser biyoinformatiği alanlarında hesaplamalı araştırma yetkinliği kazanmıştır. Moleküler biyoloji veya biyomedikal araştırma ortamında deneysel becerilerini derinleştirecek bir laboratuvar stajı veya araştırmacı pozisyonu hedeflemektedir.",

  education: [
    {
      degree: "Moleküler Biyoloji ve Genetik Lisansı",
      institution: "İnönü Üniversitesi, Fen-Edebiyat Fakültesi",
      location: "Malatya, Türkiye",
      dates: "Eyl 2021 – 2027 (beklenen)",
      gpa: "3.33 / 4.00",
      notes: [
        "Hesaplamalı yapısal biyoloji ve kanser biyoinformatiği alanlarında iki ayrı lisans mezuniyet tezi tamamlandı."
      ]
    },
    {
      degree: "Bilgisayar Programcılığı Önlisansı",
      institution: "Anadolu Üniversitesi, Açıköğretim Fakültesi",
      location: "Eskişehir, Türkiye",
      dates: "2025 – 2027 (beklenen)",
      gpa: "3.26 / 4.00",
      notes: [
        "Programlama ve hesaplamalı temelleri güçlendirmek amacıyla lisans eğitimiyle eş zamanlı sürdürülmektedir; ilk yıl tamamlandı."
      ]
    }
  ],

  experience: [
    {
      role: "Erasmus+ Araştırma Stajyeri",
      organization: "LMU Klinikum, Kardiyovasküler Önleme Enstitüsü (IPEK)",
      location: "Münih, Almanya",
      dates: "Tem 2025 – Eyl 2025",
      description: "CXCR4 geninin shRNA aracılı susturulması (knockdown):",
      bullets: [
        "Protein düzeyindeki analizler için protein ekstraksiyonu, BCA protein tayini ve Western blot uygulamaları gerçekleştirildi.",
        "RNA izolasyonu, revers transkripsiyon ve kantitatif PCR (qPCR) ile immünofloresan (IF) boyama çalışmaları yürütüldü.",
        "Yeni nesil dizileme (NGS) veri setleri dahil olmak üzere gen ekspresyon verileri analiz edildi."
      ]
    }
  ],

  researchProjects: [
    {
      title: "Özgün CXCR4 Antagonistleri Olarak Amentoflavon Türevlerinin Yapı Tabanlı Tasarımı ve Hesaplamalı Değerlendirilmesi",
      institution: "İnönü Üniversitesi",
      supervisor: "Dr. Seçil Demiral",
      bullets: [
        "İnsan CXCR4 kristal yapısı (PDB ID: 3ODU) hedeflenerek, yapı tabanlı akılcı ilaç tasarımı iş akışıyla beş özgün amentoflavon türevi modellendi.",
        "AutoDock Vina ile moleküler kenetlenme gerçekleştirildi; Floro-Deoksi-Amentoflavon en umut vadeden aday (−11.9 kcal/mol) olarak FDA onaylı antagonist Plerixafor'dan (−9.4 kcal/mol) daha üstün bağlanma enerjisi sergiledi.",
        "SwissADME ile ADME / ilaç benzerliği ve ProTox-II ile in siliko toksisite profilleri tahmin edildi; BIOVIA Discovery Studio ile ligand–reseptör etkileşimleri analiz edildi.",
        "Seçici deoksijenasyonun, farmakofor açısından kritik Tyr55 amino asidi ile kurduğu yönlendirilmiş hidrojen bağı sayesinde reseptör uyumluluğunu artıran kilit mekanizma olduğu ortaya kondu."
      ]
    },
    {
      title: "CXCR4 Kemokin Reseptörünün Kanser Progresyonu ve Metastazındaki Rolünün Biyoinformatik Olarak İncelenmesi: Ekspresyon, Prognoz ve İmmün İnfiltrasyon",
      institution: "İnönü Üniversitesi",
      supervisor: "Dr. Samet Kocabay",
      bullets: [
        "Meme (BRCA), akciğer (LUAD) ve kolorektal (COAD/READ) kanserlerde TCGA verileri kullanılarak CXCR4 ekspresyonu, genomik değişimleri, klinik prognozu ve immün infiltrasyonu incelendi.",
        "Diferansiyel ekspresyon (GEPIA2), genomik değişimler (cBioPortal), sağkalım eğrileri (Kaplan–Meier Plotter), immün infiltrasyon (TIMER2.0) ve protein–protein etkileşim ağları (STRING) analiz edildi.",
        "Bağlama duyarlı bir prognostik rol tespit edildi: LUAD'da yüksek CXCR4 ekspresyonu, artmış CD8+ T-hücre infiltrasyonu ile ilişkili olarak daha uzun sağkalım ile korele bulundu (p = 0.007)."
      ]
    }
  ],

  skills: {
    molecularWetLab: [
      "DNA/RNA izolasyonu (manuel ve kit bazlı)",
      "PCR",
      "qPCR / Real-Time PCR",
      "cDNA sentezi",
      "Western blot",
      "BCA protein tayini",
      "immünofloresan (IF)",
      "agaroz jel elektroforezi",
      "spektrofotometri ve standart eğriler",
      "hücre sayımı (hemositometre)",
      "kültür besiyeri hazırlama",
      "mitokondri izolasyonu"
    ],
    computationalDrugDesign: [
      "AutoDock Vina",
      "AutoDock Tools",
      "BIOVIA Discovery Studio",
      "SwissADME",
      "ProTox-II",
      "OpenBabel",
      "moleküler kenetlenme (docking)",
      "yapı tabanlı ilaç tasarımı",
      "ADME ve toksisite tahmini"
    ],
    cancerBioinformatics: [
      "GEPIA2",
      "cBioPortal",
      "Kaplan–Meier Plotter",
      "TIMER2.0",
      "STRING",
      "TCGA/GTEx veri analizi",
      "diferansiyel ekspresyon",
      "sağkalım ve immün infiltrasyon analizi"
    ],
    programmingAndData: [
      "Python",
      "R",
      "Linux (biyoinformatik veri analizi temelleri)",
      "Java (temel)"
    ]
  },

  certifications: [
    "Bioinformatics Data Analysis: Python, Linux & R",
    "Cancer Biology 101 (May 2024)",
    "Introduction to Programming with Java (Aug 2020)",
    "Introduction to Information Technologies (Jul 2020)"
  ],
  languages: [
    "Türkçe (Ana dil)",
    "İngilizce (Profesyonel çalışma yetkinliği, B2)"
  ],
  interests: [
    "Kodlama & Algoritmalar",
    "Kitap okuma",
    "Mutfak & Yemek yapma",
    "Bisiklet sürme",
    "Müzik",
    "Seyahat"
  ]
};
