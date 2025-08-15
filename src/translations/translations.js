const translations = {
  catalan: {
    personal: {
      name: "Gemma Garcia de la Fuente",
      title: "Data Scientist i Business Analyst Financera",
      description: "Apassionada per les dades i les finances, amb MSc en Direcció Financera i Comptabilitat. Busco un rol on pugui donar suport a la presa de decisions estratègiques en equips financers.",
      contact: {
        phone: ["+41 76 269 8038", "+34 637 588 854"],
        email: "gemmagdlf@gmail.com",
        linkedin: "http://linkedin.com/in/gemma-garcia-de-la-fuente",
        location: "Zurich 8004"
      }
    },
    experience: [
      {
        role: "Data Scientist & Product Owner",
        company: "UBS Business Solutions AG, Zürich, Suïssa",
        duration: "Novembre 2022 - Present",
        description: [
          "Product Owner de dues eines: dashboard de detecció d'anomalies i motor de validació estadística.",
          "Gestió d’un equip de 5 membres (IT i Business) amb metodologia Agile.",
          "Transició de Tableau a Power BI, millorant rendiment i usabilitat.",
          "Disseny de models ML per detectar errors crítics en dades.",
          "Mentoria d’un becari durant 1,5 anys."
        ]
      },
      {
        role: "Business Analyst",
        company: "Google by Adecco, Zürich",
        duration: "Abril 2022 - Setembre 2022",
        description: [
          "Desenvolupament d’un dashboard en temps real a Google Data Studio.",
          "Col·laboració amb product i enginyeria per definir KPIs.",
          "Presentació d’informes per orientar decisions de llançament de noves funcionalitats."
        ]
      },
      {
        role: "Business Analyst (Controlling Support)",
        company: "KH Lloreda, Granollers, Espanya",
        duration: "Gener 2021 – Abril 2022",
        description: [
          "Creació de dashboards estratègics integrant SEO, SEM, TV, Amazon i social media.",
          "Models de regressió per predir vendes segons geografia, temps i inversions en màrqueting.",
          "Informe d’eficiència de canals i suport en planificació pressupostària."
        ]
      }
    ],
    education: [
      { degree: "MSc en Direcció Financera", university: "UOC", year: "2022–2024" },
      { degree: "MSc en Data Science", university: "UOC", year: "2020–2022" },
      { degree: "BSc en Estadística", university: "UPC", year: "2015–2019" },
      { degree: "BSc en Psicologia", university: "UB", year: "2014–2019" }
    ],
    languages: [
      { language: "Català", level: "Natiu" },
      { language: "Espanyol", level: "Natiu" },
      { language: "Anglès", level: "Fluent" },
      { language: "Francès", level: "Fluent" },
      { language: "Italià", level: "Intermedi" },
      { language: "Alemany", level: "Intermedi - Aprenent actiu" }
    ],
    projects: [
      {
        title: "Anàlisi de Sentiments en Xarxes Socials",
        description: "Projecte personal per analitzar sentiment de tuits amb NLP i models de classificació.",
        link: "https://github.com/tuusuario/sentiment-analysis-project"
      },
      {
        title: "Simulador de Mercat de Valors",
        description: "Simulador d’inversions amb dades històriques i visualitzacions interactives.",
        link: "https://github.com/tuusuario/stock-market-simulator"
      }
    ]
  },
  // Aquí podries afegir castellà i anglès amb la mateixa estructura
};

export default translations;
