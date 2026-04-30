const shared = {
  name: "Gemma Garcia de la Fuente",
  photos: {
    hero: "/images/gemma_hero.jpg",
    portrait: "/images/gemma_portrait.jpg",
  },
  social: {
    github: "https://github.com/Gemmagf",
    linkedin: "https://linkedin.com/in/gemma-garcia-de-la-fuente",
    email: "gemmagdlf@gmail.com",
    phone: "+41 76 269 8038",
    phoneAlt: "+34 637 588 854",
  },
};

const techStack = [
  "Python (Pandas, Streamlit, TensorFlow)",
  "SQL",
  "R",
  "Power BI",
  "Tableau",
  "Google Data Studio / Looker Studio",
  "JavaScript (basics)",
  "Git",
];

// Shared metadata for personal projects — language-agnostic fields.
// Translatable fields (title, description) live in PROJECT_TEXTS below.
const PROJECT_META = [
  {
    id: "cvHunter",
    tag: "AI / HR Tech",
    stack: ["FastAPI", "Claude API", "pgvector", "PostgreSQL", "React", "Docker"],
    link: "https://gemmagf.github.io/cv_HR/#/dashboard",
    repo: "https://github.com/Gemmagf/cv_HR",
  },
  {
    id: "retail",
    tag: "Retail / Data Viz",
    stack: ["Next.js", "TypeScript", "Recharts", "Tailwind", "next-intl"],
    link: "https://retail-lake.vercel.app/fr",
    repo: "https://github.com/Gemmagf/retail",
  },
  {
    id: "logistic",
    tag: "Logistics / SaaS",
    stack: ["TypeScript", "Node.js", "Prisma", "React"],
    link: "https://github.com/Gemmagf/coffe_logic",
    repo: null, // private repo
  },
  {
    id: "pedretes",
    tag: "Workshop Mgmt",
    stack: ["React", "Vercel"],
    link: "https://pedretes-one.vercel.app",
    repo: "https://github.com/Gemmagf/Pedretes",
  },
  {
    id: "dietaripa",
    tag: "Productivity",
    stack: ["React", "Node.js", "Vercel"],
    link: "https://dietaripa.vercel.app",
    repo: "https://github.com/Gemmagf/DietariPa",
  },
  {
    id: "receptes",
    tag: "Web / Cultural",
    stack: ["Vite", "JavaScript", "Tailwind", "Netlify"],
    link: "https://receptescat.netlify.app",
    repo: "https://github.com/Gemmagf/receptes",
  },
  {
    id: "swissMobility",
    tag: "Data Analysis",
    stack: ["Python", "Pandas", "GeoPandas"],
    link: "https://github.com/Gemmagf/CarearCapital/tree/main/projects/SwissMobilityDashboard",
    repo: null,
  },
  {
    id: "portfolio",
    tag: "Portfolio",
    stack: ["React", "Tailwind", "GitHub Pages"],
    link: "https://gemmagf.github.io/CarearCapital/",
    repo: "https://github.com/Gemmagf/CarearCapital",
  },
];

const PROJECT_TEXTS = {
  catalan: {
    cvHunter: {
      title: "CV Hunter — Talent Matching amb IA",
      description:
        "Eina d'HR Tech que ingesta CVs (PDF/DOCX), extreu informació estructurada i fa matching semàntic candidat-vacant amb embeddings vectorials. Usa Claude API per parsing intel·ligent i pgvector per cerca per similitud. Inclou dashboard, importació massiva asíncrona i exportació de fitxes en PDF.",
    },
    retail: {
      title: "Allocation Studio — Retail Inventory",
      description:
        "Demo interactiva per a un Retail Allocation Analyst: dashboard de salut d'estoc, catàleg de productes, recomanador d'allocations amb insights AI, forecasting de demanda i simulador d'escenaris. Multilingüe (7 idiomes) amb dades sintètiques.",
    },
    logistic: {
      title: "Plataforma logística multi-seu",
      description:
        "Plataforma SaaS multi-local per a la gestió operativa de negocis de servei al mercat suís: stocks, comandes, personal i KPIs en una sola eina. Backend i frontend separats amb workspaces, base de dades amb Prisma. Codi privat.",
    },
    pedretes: {
      title: "Pedretes — Gestió de taller artesà",
      description:
        "App web per a la gestió diària d'un petit taller: comandes de clients, seguiment de la producció i inventari de materials. Optimitzada per a treballar amb peces úniques i lots petits.",
    },
    dietaripa: {
      title: "Dietaripa — Planificador de dietes",
      description:
        "Aplicació full-stack per planificar dietes i menús setmanals: registre de receptes, càlcul de macronutrients i generació automàtica de la llista de la compra.",
    },
    receptes: {
      title: "Receptes Catalanes (1080)",
      description:
        "Web amb una col·lecció de 1080 receptes tradicionals catalanes amb cerca i navegació per categoria. Projecte cultural per preservar i difondre el receptari clàssic en català.",
    },
    swissMobility: {
      title: "Swiss Mobility Dashboard",
      description:
        "Notebook que analitza els patrons de mobilitat a Suïssa amb dades oficials de l'OFS: distribució de pendularis per cantó, evolució del transport públic i estimació d'emissions de CO₂. Pas previ a un dashboard Power BI.",
    },
    portfolio: {
      title: "Portfolio Web (aquesta mateixa)",
      description:
        "Web personal multilingüe (6 idiomes) amb React i Tailwind, desplegada automàticament a GitHub Pages. Inclou CV interactiu, secció de projectes i formulari de contacte.",
    },
  },
  spanish: {
    cvHunter: {
      title: "CV Hunter — Talent Matching con IA",
      description:
        "Herramienta de HR Tech que ingesta CVs (PDF/DOCX), extrae información estructurada y realiza matching semántico candidato-vacante con embeddings vectoriales. Usa Claude API para parsing inteligente y pgvector para búsqueda por similitud. Incluye dashboard, importación masiva asíncrona y exportación de fichas en PDF.",
    },
    retail: {
      title: "Allocation Studio — Retail Inventory",
      description:
        "Demo interactiva para un Retail Allocation Analyst: dashboard de salud de stock, catálogo de productos, recomendador de allocations con insights AI, forecasting de demanda y simulador de escenarios. Multilingüe (7 idiomas) con datos sintéticos.",
    },
    logistic: {
      title: "Plataforma logística multi-sede",
      description:
        "Plataforma SaaS multi-local para la gestión operativa de negocios de servicio en el mercado suizo: stocks, pedidos, personal y KPIs en una sola herramienta. Backend y frontend separados con workspaces, base de datos con Prisma. Código privado.",
    },
    pedretes: {
      title: "Pedretes — Gestión de taller artesano",
      description:
        "App web para la gestión diaria de un pequeño taller: pedidos de clientes, seguimiento de la producción e inventario de materiales. Optimizada para trabajar con piezas únicas y lotes pequeños.",
    },
    dietaripa: {
      title: "Dietaripa — Planificador de dietas",
      description:
        "Aplicación full-stack para planificar dietas y menús semanales: registro de recetas, cálculo de macronutrientes y generación automática de la lista de la compra.",
    },
    receptes: {
      title: "Recetas Catalanas (1080)",
      description:
        "Web con una colección de 1080 recetas tradicionales catalanas con búsqueda y navegación por categoría. Proyecto cultural para preservar y difundir el recetario clásico en catalán.",
    },
    swissMobility: {
      title: "Swiss Mobility Dashboard",
      description:
        "Notebook que analiza los patrones de movilidad en Suiza con datos oficiales de OFS: distribución de pendulares por cantón, evolución del transporte público y estimación de emisiones de CO₂. Paso previo a un dashboard Power BI.",
    },
    portfolio: {
      title: "Portfolio Web (esta misma)",
      description:
        "Web personal multilingüe (6 idiomas) con React y Tailwind, desplegada automáticamente en GitHub Pages. Incluye CV interactivo, sección de proyectos y formulario de contacto.",
    },
  },
  english: {
    cvHunter: {
      title: "CV Hunter — AI Talent Matching",
      description:
        "HR-tech tool that ingests CVs (PDF/DOCX), extracts structured data and performs semantic candidate-to-role matching with vector embeddings. Uses the Claude API for smart parsing and pgvector for similarity search. Includes a dashboard, async bulk import and PDF profile export.",
    },
    retail: {
      title: "Allocation Studio — Retail Inventory",
      description:
        "Interactive demo for a Retail Allocation Analyst: stock-health dashboard, product catalog, AI-driven allocation recommender, demand forecasting, and scenario simulator. Multilingual (7 languages) with synthetic data.",
    },
    logistic: {
      title: "Multi-location Logistics Platform",
      description:
        "Multi-location SaaS platform for the operational management of service businesses in the Swiss market: stock, orders, staff and KPIs in one tool. Separate backend/frontend workspaces, database with Prisma. Private codebase.",
    },
    pedretes: {
      title: "Pedretes — Artisan Workshop Manager",
      description:
        "Web app for the day-to-day management of a small workshop: customer orders, production tracking and materials inventory. Tailored for one-of-a-kind pieces and small batches.",
    },
    dietaripa: {
      title: "Dietaripa — Diet Planner",
      description:
        "Full-stack application for weekly diet and menu planning: recipe library, macronutrient calculation and automatic shopping-list generation.",
    },
    receptes: {
      title: "Catalan Recipes (1080)",
      description:
        "Web app featuring 1080 traditional Catalan recipes, with search and category browsing. Cultural project to preserve and share the classic Catalan cookbook.",
    },
    swissMobility: {
      title: "Swiss Mobility Dashboard",
      description:
        "Notebook analyzing Swiss mobility patterns with official OFS data: commuter distribution by canton, public-transport evolution and CO₂ emission estimates. Groundwork for a Power BI dashboard.",
    },
    portfolio: {
      title: "Portfolio Website (this one)",
      description:
        "Multilingual personal site (6 languages) built with React and Tailwind, auto-deployed to GitHub Pages. Includes interactive CV, projects section and contact form.",
    },
  },
  french: {
    cvHunter: {
      title: "CV Hunter — Matching de talents par IA",
      description:
        "Outil HR-tech qui ingère des CV (PDF/DOCX), en extrait des données structurées et effectue un matching sémantique candidat-poste via embeddings vectoriels. Utilise l'API Claude pour le parsing intelligent et pgvector pour la recherche par similarité. Dashboard, import en masse asynchrone et export de fiches en PDF.",
    },
    retail: {
      title: "Allocation Studio — Retail Inventory",
      description:
        "Démo interactive pour un Retail Allocation Analyst : dashboard de santé du stock, catalogue produits, recommandateur d'allocations avec insights IA, prévision de demande et simulateur de scénarios. Multilingue (7 langues) avec données synthétiques.",
    },
    logistic: {
      title: "Plateforme logistique multi-sites",
      description:
        "Plateforme SaaS multi-sites pour la gestion opérationnelle de commerces de service sur le marché suisse : stocks, commandes, équipes et KPI dans un seul outil. Backend et frontend séparés en workspaces, base de données avec Prisma. Code privé.",
    },
    pedretes: {
      title: "Pedretes — Gestion d'atelier artisanal",
      description:
        "App web pour la gestion quotidienne d'un petit atelier : commandes clients, suivi de la production et inventaire des matériaux. Pensée pour les pièces uniques et les petites séries.",
    },
    dietaripa: {
      title: "Dietaripa — Planificateur de régimes",
      description:
        "Application full-stack pour la planification de régimes et de menus hebdomadaires : bibliothèque de recettes, calcul des macronutriments et génération automatique de la liste de courses.",
    },
    receptes: {
      title: "Recettes Catalanes (1080)",
      description:
        "Web app avec 1080 recettes traditionnelles catalanes, recherche et navigation par catégorie. Projet culturel pour préserver et diffuser le recueil classique catalan.",
    },
    swissMobility: {
      title: "Swiss Mobility Dashboard",
      description:
        "Notebook analysant les patterns de mobilité en Suisse à partir de données officielles OFS : pendulaires par canton, évolution des transports publics et estimation des émissions de CO₂. Préalable à un dashboard Power BI.",
    },
    portfolio: {
      title: "Site Portfolio (celui-ci)",
      description:
        "Site personnel multilingue (6 langues) en React et Tailwind, déployé automatiquement sur GitHub Pages. CV interactif, section projets et formulaire de contact.",
    },
  },
  german: {
    cvHunter: {
      title: "CV Hunter — AI Talent Matching",
      description:
        "HR-Tech-Tool, das Lebensläufe (PDF/DOCX) einliest, strukturierte Daten extrahiert und mittels Vektor-Embeddings semantisches Matching zwischen Kandidaten und Rollen durchführt. Nutzt die Claude-API für intelligentes Parsing und pgvector für Ähnlichkeitssuche. Dashboard, asynchroner Bulk-Import und PDF-Export der Profile.",
    },
    retail: {
      title: "Allocation Studio — Retail Inventory",
      description:
        "Interaktive Demo für eine Retail Allocation Analystin: Stock-Health-Dashboard, Produktkatalog, AI-gestützter Allocation-Recommender, Demand Forecasting und Szenario-Simulator. Mehrsprachig (7 Sprachen) mit synthetischen Daten.",
    },
    logistic: {
      title: "Multi-Standort Logistik-Plattform",
      description:
        "Multi-Standort-SaaS-Plattform für das operative Management von Dienstleistungsbetrieben im Schweizer Markt: Bestand, Bestellungen, Personal und KPIs in einem Tool. Getrennte Backend-/Frontend-Workspaces, DB mit Prisma. Privater Quellcode.",
    },
    pedretes: {
      title: "Pedretes — Werkstatt-Management",
      description:
        "Web-App für das Tagesgeschäft einer kleinen Werkstatt: Kundenaufträge, Produktionsverfolgung und Materialinventar. Auf Einzelstücke und Kleinserien ausgelegt.",
    },
    dietaripa: {
      title: "Dietaripa — Diätplaner",
      description:
        "Full-Stack-App zur Planung von Diäten und Wochenmenüs: Rezeptbibliothek, Makronährstoff-Berechnung und automatische Einkaufslisten-Generierung.",
    },
    receptes: {
      title: "Katalanische Rezepte (1080)",
      description:
        "Web-App mit 1080 traditionellen katalanischen Rezepten, Suche und Kategoriedurchsicht. Kulturprojekt zur Bewahrung und Verbreitung des klassischen katalanischen Kochbuchs.",
    },
    swissMobility: {
      title: "Swiss Mobility Dashboard",
      description:
        "Notebook zur Analyse von Mobilitätsmustern in der Schweiz mit offiziellen BFS-Daten: Pendlerverteilung nach Kanton, Entwicklung des ÖV und Schätzung von CO₂-Emissionen. Vorarbeit für ein Power-BI-Dashboard.",
    },
    portfolio: {
      title: "Portfolio-Website (diese)",
      description:
        "Mehrsprachige persönliche Seite (6 Sprachen) mit React und Tailwind, automatisch auf GitHub Pages deployt. Interaktiver Lebenslauf, Projektbereich und Kontaktformular.",
    },
  },
  italian: {
    cvHunter: {
      title: "CV Hunter — Talent Matching con IA",
      description:
        "Strumento HR-tech che ingerisce CV (PDF/DOCX), estrae dati strutturati ed esegue matching semantico candidato-ruolo tramite embeddings vettoriali. Usa l'API Claude per parsing intelligente e pgvector per la ricerca per similarità. Dashboard, import massivo asincrono ed esportazione delle schede in PDF.",
    },
    retail: {
      title: "Allocation Studio — Retail Inventory",
      description:
        "Demo interattiva per una Retail Allocation Analyst: dashboard di stock health, catalogo prodotti, recommender di allocations con insights AI, forecasting della domanda e simulatore di scenari. Multilingue (7 lingue) con dati sintetici.",
    },
    logistic: {
      title: "Piattaforma logistica multi-sede",
      description:
        "Piattaforma SaaS multi-sede per la gestione operativa di attività di servizio nel mercato svizzero: stock, ordini, personale e KPI in un'unica soluzione. Backend e frontend separati in workspaces, database con Prisma. Codice privato.",
    },
    pedretes: {
      title: "Pedretes — Gestione laboratorio artigiano",
      description:
        "App web per la gestione quotidiana di un piccolo laboratorio: ordini clienti, tracciamento della produzione e inventario dei materiali. Pensata per pezzi unici e piccole serie.",
    },
    dietaripa: {
      title: "Dietaripa — Pianificatore di diete",
      description:
        "App full-stack per pianificare diete e menù settimanali: libreria di ricette, calcolo dei macronutrienti e generazione automatica della lista della spesa.",
    },
    receptes: {
      title: "Ricette Catalane (1080)",
      description:
        "Web app con 1080 ricette tradizionali catalane, con ricerca e navigazione per categoria. Progetto culturale per preservare e diffondere il ricettario classico catalano.",
    },
    swissMobility: {
      title: "Swiss Mobility Dashboard",
      description:
        "Notebook che analizza i pattern di mobilità in Svizzera con dati ufficiali OFS: distribuzione dei pendolari per cantone, evoluzione dei trasporti pubblici e stima delle emissioni CO₂. Base per una dashboard Power BI.",
    },
    portfolio: {
      title: "Portfolio Web (questo stesso)",
      description:
        "Sito personale multilingue (6 lingue) con React e Tailwind, pubblicato automaticamente su GitHub Pages. CV interattivo, sezione progetti e form di contatto.",
    },
  },
};

const buildProjects = (lang) =>
  PROJECT_META.map((meta) => ({
    ...meta,
    ...PROJECT_TEXTS[lang][meta.id],
  }));

const translations = {
  catalan: {
    name: shared.name,
    photos: shared.photos,
    social: shared.social,
    nav: {
      home: "Inici",
      personalProjects: "Projectes",
      skills: "Currículum",
      contact: "Contacte",
    },
    home: {
      title: "Hola i gràcies per visitar la meva pàgina!",
      description:
        "Sóc la Gemma, Senior Data Scientist & Product Owner amb més de 4 anys d'experiència construint models que impulsen decisions en marketing, risc i producte. M'apassiona connectar equips de negoci i tècnics, transformar dades en insights accionables i fomentar la col·laboració. La meva trajectòria combina modelatge estadístic, disseny de dashboards, gestió d'stakeholders i ownership de producte en entorns àgils.",
      ctaCV: "Veure currículum",
      ctaProjects: "Veure projectes",
    },
    cv: {
      title: "Currículum",
      subtitle: shared.name,
      headline: "Senior Data Scientist & Product Owner",
      downloadText: "Descarregar CV (PDF)",
      summary:
        "Senior Data Scientist amb una sòlida formació en estadística i més de 4 anys d'experiència construint models que guien decisions en marketing, risc i producte. Especialitzada en regressió, forecasting, disseny de KPIs i en traduir resultats estadístics en estratègia de negoci. Experiència liderant iniciatives transversals i lliurant solucions analítiques escalables en entorns àgils. Apassionada pel marketing science, la inferència causal i la construcció de frameworks de mesura robustos.",
      contactTitle: "Contacte",
      experienceTitle: "Experiència",
      educationTitle: "Formació",
      languagesTitle: "Idiomes",
      techStackTitle: "Tech Stack",
      methodologiesTitle: "Metodologies",
      labels: {
        phone: "Telèfon",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        location: "Ubicació",
      },
      contact: {
        phone: shared.social.phone,
        phoneAlt: shared.social.phoneAlt,
        email: shared.social.email,
        linkedin: shared.social.linkedin,
        github: shared.social.github,
        location: "Zuric 8004, Suïssa",
      },
      experiences: [
        {
          role: "Senior Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zuric, CH",
          period: "Novembre 2022 – Present",
          description: [
            "Lideratge de la visió, desenvolupament i lliurament d'un producte de qualitat de dades de risc.",
            "Product Owner de dues eines crítiques: dashboard de detecció d'anomalies i motor de validació estadística.",
            "Gestió d'un pod cross-functional de 5 persones (IT i negoci) en cicles Agile complets, reduint el temps de projecte en un 50%.",
            "Co-disseny de models de ML (outlier detection, decision trees) per detectar errors crítics de dades.",
            "Refactorització de pipelines Python de detecció d'anomalies millorant escalabilitat, testing i robustesa.",
            "Lideratge de la migració de Tableau a Power BI dins la funció de risc.",
            "Traducció de sortides de models complexos en recomanacions accionables per a stakeholders sèniors.",
            "Iniciatives internes de difusió (web, vídeo, formació) per impulsar adopció i confiança del negoci.",
            "Mentoria d'un becari durant 1,5 anys (onboarding, skills i alineació de projecte).",
          ],
        },
        {
          role: "Business Analyst",
          company: "Google (via Adecco Switzerland)",
          location: "Zuric, CH",
          period: "Abril 2022 – Setembre 2022",
          description: [
            "Construcció d'un dashboard en temps real a Google Data Studio per monitoritzar interaccions d'usuari i conversion funnels d'una nova feature de YouTube.",
            "Definició de mètriques d'èxit i alineació amb Product Manager i equip d'enginyeria.",
            "Presentació d'insights a stakeholders sèniors per guiar el roll-out de la feature.",
          ],
        },
        {
          role: "Data Scientist",
          company: "KH Lloreda (KH-7)",
          location: "Granollers, ES",
          period: "Gener 2021 – Abril 2022",
          description: [
            "Desenvolupament de models de regressió per predir vendes segons inversió en marketing, geografia i timing de campanya.",
            "Integració de dades de SEO, SEM, TV, Instagram, Facebook i Amazon Marketplace en dashboards estratègics.",
            "Anàlisi d'efectivitat de ROI, ROAS i CPA per guiar decisions d'assignació de mitjans.",
            "Optimització de la distribució pressupostària amb insights d'elasticitat de performance.",
            "Avaluació de marketing mix, quantificant contribució de canal i eficiència d'inversió.",
            "Recomanacions estratègiques que van influir en decisions d'inversió i adquisició de clients.",
          ],
        },
        {
          role: "Data Analyst",
          company: "Additius Santa Maria",
          location: "Santa Maria de Palautordera, ES",
          period: "Juliol 2020 – Desembre 2020",
          description: [
            "Aplicació de machine learning per detectar cultius a partir d'imatges per satèl·lit.",
          ],
        },
      ],
      education: [
        "MSc in Financial Management — Universitat Oberta de Catalunya (UOC), 2022–2024",
        "MSc in Data Science — Universitat Oberta de Catalunya (UOC), 2020–2022",
        "BSc in Statistics — Universitat Politècnica de Catalunya (UPC), 2015–2019",
        "BSc in Psychology — Universitat de Barcelona (UB), 2014–2019",
      ],
      languages: [
        "Català (Nativa)",
        "Castellà (Nativa)",
        "Anglès (C1)",
        "Francès (B2)",
        "Italià (B2)",
        "Alemany (B1, en aprenentatge actiu)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "A/B Testing",
        "Detecció d'anomalies",
        "Disseny de dashboards",
        "Disseny de KPIs",
        "Modelatge de regressió",
        "Forecasting",
        "Inferència causal",
      ],
    },
    contact: {
      title: "Contacte",
      description: "Per a col·laboracions o consultes, no dubtis a contactar-me.",
      form: {
        nameLabel: "Nom",
        namePlaceholder: "El teu nom",
        emailLabel: "Email",
        emailPlaceholder: "el.teu.email@exemple.com",
        messageLabel: "Missatge",
        messagePlaceholder: "Escriu el teu missatge aquí...",
        submitButton: "Enviar Missatge",
        sendingText: "Enviant...",
        successText: "Missatge enviat. Gràcies!",
        errorText: "Hi ha hagut un error. Prova-ho de nou o escriu-me a l'email directament.",
      },
    },
    personalProjects: {
      title: "Projectes Personals",
      linkText: "Veure projecte",
      repoText: "Codi font",
      projects: buildProjects("catalan"),
    },
  },

  spanish: {
    name: shared.name,
    photos: shared.photos,
    social: shared.social,
    nav: {
      home: "Inicio",
      personalProjects: "Proyectos",
      skills: "Currículum",
      contact: "Contacto",
    },
    home: {
      title: "¡Hola y gracias por visitar mi página!",
      description:
        "Soy Gemma, Senior Data Scientist & Product Owner con más de 4 años de experiencia construyendo modelos que impulsan decisiones en marketing, riesgo y producto. Me apasiona conectar equipos de negocio y técnicos, transformar datos en insights accionables y fomentar la colaboración. Mi trayectoria combina modelado estadístico, diseño de dashboards, gestión de stakeholders y ownership de producto en entornos ágiles.",
      ctaCV: "Ver currículum",
      ctaProjects: "Ver proyectos",
    },
    cv: {
      title: "Currículum",
      subtitle: shared.name,
      headline: "Senior Data Scientist & Product Owner",
      downloadText: "Descargar CV (PDF)",
      summary:
        "Senior Data Scientist con sólida formación en estadística y más de 4 años de experiencia construyendo modelos que guían decisiones en marketing, riesgo y producto. Especializada en regresión, forecasting, diseño de KPIs y en traducir resultados estadísticos en estrategia de negocio. Experiencia liderando iniciativas transversales y entregando soluciones analíticas escalables en entornos ágiles. Apasionada por el marketing science, la inferencia causal y la construcción de frameworks de medición robustos.",
      contactTitle: "Contacto",
      experienceTitle: "Experiencia",
      educationTitle: "Formación",
      languagesTitle: "Idiomas",
      techStackTitle: "Tech Stack",
      methodologiesTitle: "Metodologías",
      labels: {
        phone: "Teléfono",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        location: "Ubicación",
      },
      contact: {
        phone: shared.social.phone,
        phoneAlt: shared.social.phoneAlt,
        email: shared.social.email,
        linkedin: shared.social.linkedin,
        github: shared.social.github,
        location: "Zúrich 8004, Suiza",
      },
      experiences: [
        {
          role: "Senior Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zúrich, CH",
          period: "Noviembre 2022 – Presente",
          description: [
            "Liderazgo de la visión, desarrollo y entrega de un producto de calidad de datos de riesgo.",
            "Product Owner de dos herramientas críticas: dashboard de detección de anomalías y motor de validación estadística.",
            "Gestión de un pod cross-functional de 5 personas (IT y negocio) en ciclos Agile completos, reduciendo el tiempo de proyecto en un 50%.",
            "Co-diseño de modelos de ML (outlier detection, árboles de decisión) para detectar errores críticos de datos.",
            "Refactorización de pipelines Python de detección de anomalías mejorando escalabilidad, testing y robustez.",
            "Liderazgo de la migración de Tableau a Power BI dentro de la función de riesgo.",
            "Traducción de salidas de modelos complejos en recomendaciones accionables para stakeholders senior.",
            "Iniciativas internas de difusión (web, vídeo, formación) para impulsar adopción y confianza del negocio.",
            "Mentoría de un becario durante 1,5 años (onboarding, skills y alineación de proyecto).",
          ],
        },
        {
          role: "Business Analyst",
          company: "Google (vía Adecco Switzerland)",
          location: "Zúrich, CH",
          period: "Abril 2022 – Septiembre 2022",
          description: [
            "Construcción de un dashboard en tiempo real en Google Data Studio para monitorizar interacciones de usuario y embudos de conversión de una nueva feature de YouTube.",
            "Definición de métricas de éxito y alineación con Product Manager e ingeniería.",
            "Presentación de insights a stakeholders senior para guiar el roll-out de la feature.",
          ],
        },
        {
          role: "Data Scientist",
          company: "KH Lloreda (KH-7)",
          location: "Granollers, ES",
          period: "Enero 2021 – Abril 2022",
          description: [
            "Desarrollo de modelos de regresión para predecir ventas según inversión en marketing, geografía y timing de campaña.",
            "Integración de datos de SEO, SEM, TV, Instagram, Facebook y Amazon Marketplace en dashboards estratégicos.",
            "Análisis de efectividad de ROI, ROAS y CPA para guiar decisiones de asignación de medios.",
            "Optimización de la distribución presupuestaria con insights de elasticidad de performance.",
            "Evaluación de marketing mix, cuantificando contribución de canal y eficiencia de inversión.",
            "Recomendaciones estratégicas que influyeron en decisiones de inversión y adquisición de clientes.",
          ],
        },
        {
          role: "Data Analyst",
          company: "Additius Santa Maria",
          location: "Santa Maria de Palautordera, ES",
          period: "Julio 2020 – Diciembre 2020",
          description: [
            "Aplicación de machine learning para detectar cultivos a partir de imágenes por satélite.",
          ],
        },
      ],
      education: [
        "MSc en Dirección Financiera — Universitat Oberta de Catalunya (UOC), 2022–2024",
        "MSc en Ciencia de Datos — Universitat Oberta de Catalunya (UOC), 2020–2022",
        "Grado en Estadística — Universitat Politècnica de Catalunya (UPC), 2015–2019",
        "Grado en Psicología — Universitat de Barcelona (UB), 2014–2019",
      ],
      languages: [
        "Catalán (Nativo)",
        "Español (Nativo)",
        "Inglés (C1)",
        "Francés (B2)",
        "Italiano (B2)",
        "Alemán (B1, en aprendizaje activo)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "A/B Testing",
        "Detección de anomalías",
        "Diseño de dashboards",
        "Diseño de KPIs",
        "Modelado de regresión",
        "Forecasting",
        "Inferencia causal",
      ],
    },
    contact: {
      title: "Contacto",
      description: "Para colaboraciones o consultas, no dudes en contactarme.",
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        emailLabel: "Email",
        emailPlaceholder: "tu.email@ejemplo.com",
        messageLabel: "Mensaje",
        messagePlaceholder: "Escribe tu mensaje aquí...",
        submitButton: "Enviar Mensaje",
        sendingText: "Enviando...",
        successText: "Mensaje enviado. ¡Gracias!",
        errorText: "Ha habido un error. Inténtalo de nuevo o escríbeme directamente al email.",
      },
    },
    personalProjects: {
      title: "Proyectos Personales",
      linkText: "Ver proyecto",
      repoText: "Código fuente",
      projects: buildProjects("spanish"),
    },
  },

  english: {
    name: shared.name,
    photos: shared.photos,
    social: shared.social,
    nav: {
      home: "Home",
      personalProjects: "Projects",
      skills: "CV",
      contact: "Contact",
    },
    home: {
      title: "Welcome, and thanks for stopping by!",
      description:
        "I'm Gemma, a Senior Data Scientist & Product Owner with over 4 years of experience building decision-driving models across marketing, risk, and product. I love bridging business and technical teams, turning data into actionable insights, and fostering collaboration. My background combines statistical modeling, dashboard design, stakeholder management, and product ownership in agile environments.",
      ctaCV: "See CV",
      ctaProjects: "See projects",
    },
    cv: {
      title: "Curriculum",
      subtitle: shared.name,
      headline: "Senior Data Scientist & Product Owner",
      downloadText: "Download CV (PDF)",
      summary:
        "Senior Data Scientist with a strong foundation in statistics and 4+ years of experience building decision-driving models across marketing, risk, and product domains. Specialized in regression modeling, forecasting, KPI design, and translating complex statistical outputs into business strategy. Experienced leading cross-functional initiatives and delivering scalable analytical solutions in agile environments. Passionate about marketing science, causal inference, and building robust measurement frameworks that optimize investment decisions.",
      contactTitle: "Contact",
      experienceTitle: "Experience",
      educationTitle: "Education",
      languagesTitle: "Languages",
      techStackTitle: "Tech Stack",
      methodologiesTitle: "Methodologies",
      labels: {
        phone: "Phone",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        location: "Location",
      },
      contact: {
        phone: shared.social.phone,
        phoneAlt: shared.social.phoneAlt,
        email: shared.social.email,
        linkedin: shared.social.linkedin,
        github: shared.social.github,
        location: "Zurich 8004, Switzerland",
      },
      experiences: [
        {
          role: "Senior Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zurich, CH",
          period: "November 2022 – Present",
          description: [
            "Led the vision, development and delivery of a risk data quality product.",
            "Product Owner for two critical tools: an anomaly detection dashboard and a statistical validation engine.",
            "Managed a cross-functional pod of 5 (IT and business) through full agile cycles, cutting project time by 50%.",
            "Co-designed ML models (outlier detection, decision trees) to flag critical data errors.",
            "Refactored Python anomaly detection pipelines, improving scalability, testing, and deployment readiness.",
            "Championed the Tableau → Power BI migration across the risk function.",
            "Translated complex model outputs into actionable recommendations for senior stakeholders.",
            "Drove adoption through internal marketing (web, video, training) and hands-on stakeholder enablement.",
            "Mentored an intern over 1.5 years, overseeing onboarding, skill development, and project alignment.",
          ],
        },
        {
          role: "Business Analyst",
          company: "Google (via Adecco Switzerland)",
          location: "Zurich, CH",
          period: "April 2022 – September 2022",
          description: [
            "Built a real-time Google Data Studio dashboard tracking user interactions and conversion funnels for a new YouTube feature.",
            "Defined success metrics and aligned measurement with product and engineering teams.",
            "Presented insights to senior stakeholders to guide feature roll-out.",
          ],
        },
        {
          role: "Data Scientist",
          company: "KH Lloreda (KH-7)",
          location: "Granollers, ES",
          period: "January 2021 – April 2022",
          description: [
            "Developed regression-based sales forecasting models linking marketing spend, geography, and campaign timing to revenue.",
            "Integrated data from SEO, SEM, TV, Instagram, Facebook, and Amazon Marketplace into strategic dashboards.",
            "Conducted ROI, ROAS, and CPA effectiveness analysis to guide media allocation decisions.",
            "Optimized budget distribution across channels using performance elasticity insights.",
            "Supported marketing mix evaluation, quantifying channel contribution and investment efficiency.",
            "Delivered strategic recommendations that shaped campaign investment and customer acquisition strategy.",
          ],
        },
        {
          role: "Data Analyst",
          company: "Additius Santa Maria",
          location: "Santa Maria de Palautordera, ES",
          period: "July 2020 – December 2020",
          description: [
            "Applied machine learning to detect crops from satellite imagery.",
          ],
        },
      ],
      education: [
        "MSc in Financial Management — Universitat Oberta de Catalunya (UOC), 2022–2024",
        "MSc in Data Science — Universitat Oberta de Catalunya (UOC), 2020–2022",
        "BSc in Statistics — Universitat Politècnica de Catalunya (UPC), 2015–2019",
        "BSc in Psychology — Universitat de Barcelona (UB), 2014–2019",
      ],
      languages: [
        "Catalan (Native)",
        "Spanish (Native)",
        "English (C1)",
        "French (B2)",
        "Italian (B2)",
        "German (B1, actively learning)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "A/B Testing",
        "Anomaly Detection",
        "Dashboard Design",
        "KPI Design",
        "Regression Modeling",
        "Forecasting",
        "Causal Inference",
      ],
    },
    contact: {
      title: "Contact",
      description: "For collaborations or inquiries, feel free to reach out.",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "your.email@example.com",
        messageLabel: "Message",
        messagePlaceholder: "Write your message here...",
        submitButton: "Send Message",
        sendingText: "Sending...",
        successText: "Message sent. Thank you!",
        errorText: "Something went wrong. Please try again or email me directly.",
      },
    },
    personalProjects: {
      title: "Personal Projects",
      linkText: "View project",
      repoText: "Source code",
      projects: buildProjects("english"),
    },
  },

  french: {
    name: shared.name,
    photos: shared.photos,
    social: shared.social,
    nav: {
      home: "Accueil",
      personalProjects: "Projets",
      skills: "CV",
      contact: "Contact",
    },
    home: {
      title: "Bienvenue et merci de votre visite !",
      description:
        "Je suis Gemma, Senior Data Scientist & Product Owner avec plus de 4 ans d'expérience à construire des modèles qui orientent les décisions en marketing, risque et produit. Je suis passionnée par le rapprochement des équipes business et techniques, la transformation des données en insights actionnables et la collaboration. Mon parcours combine modélisation statistique, conception de dashboards, gestion des parties prenantes et product ownership en environnement Agile.",
      ctaCV: "Voir le CV",
      ctaProjects: "Voir les projets",
    },
    cv: {
      title: "Curriculum Vitae",
      subtitle: shared.name,
      headline: "Senior Data Scientist & Product Owner",
      downloadText: "Télécharger CV (PDF)",
      summary:
        "Senior Data Scientist dotée d'une solide formation en statistiques et de plus de 4 ans d'expérience à construire des modèles qui orientent les décisions en marketing, risque et produit. Spécialisée en régression, forecasting, conception de KPI et traduction des résultats statistiques en stratégie business. Expérience dans le pilotage d'initiatives transverses et la livraison de solutions analytiques scalables en Agile. Passionnée par la marketing science, l'inférence causale et les frameworks de mesure robustes.",
      contactTitle: "Contact",
      experienceTitle: "Expérience",
      educationTitle: "Formation",
      languagesTitle: "Langues",
      techStackTitle: "Stack Technique",
      methodologiesTitle: "Méthodologies",
      labels: {
        phone: "Téléphone",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        location: "Localisation",
      },
      contact: {
        phone: shared.social.phone,
        phoneAlt: shared.social.phoneAlt,
        email: shared.social.email,
        linkedin: shared.social.linkedin,
        github: shared.social.github,
        location: "Zurich 8004, Suisse",
      },
      experiences: [
        {
          role: "Senior Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zurich, CH",
          period: "Novembre 2022 – Présent",
          description: [
            "Pilotage de la vision, du développement et de la livraison d'un produit de qualité des données de risque.",
            "Product Owner de deux outils critiques : dashboard de détection d'anomalies et moteur de validation statistique.",
            "Gestion d'un pod cross-functional de 5 personnes (IT et métier) en cycles Agile complets, réduisant le time-to-market de 50 %.",
            "Co-conception de modèles ML (outlier detection, arbres de décision) pour détecter les erreurs critiques de données.",
            "Refonte des pipelines Python de détection d'anomalies pour améliorer scalabilité, tests et déploiement.",
            "Pilotage de la migration Tableau → Power BI dans la fonction risque.",
            "Traduction des sorties de modèles complexes en recommandations actionnables pour les stakeholders seniors.",
            "Initiatives internes de communication (web, vidéo, formation) pour favoriser l'adoption et la confiance métier.",
            "Mentorat d'un stagiaire pendant 1,5 an (onboarding, montée en compétences, alignement projet).",
          ],
        },
        {
          role: "Business Analyst",
          company: "Google (via Adecco Switzerland)",
          location: "Zurich, CH",
          period: "Avril 2022 – Septembre 2022",
          description: [
            "Création d'un dashboard temps réel sur Google Data Studio pour suivre les interactions utilisateurs et les funnels de conversion d'une nouvelle feature YouTube.",
            "Définition des métriques de succès et alignement avec les équipes produit et ingénierie.",
            "Présentation des insights aux stakeholders seniors pour guider le roll-out.",
          ],
        },
        {
          role: "Data Scientist",
          company: "KH Lloreda (KH-7)",
          location: "Granollers, ES",
          period: "Janvier 2021 – Avril 2022",
          description: [
            "Développement de modèles de régression pour prévoir les ventes selon l'investissement marketing, la géographie et le timing des campagnes.",
            "Intégration des données SEO, SEM, TV, Instagram, Facebook et Amazon Marketplace dans des dashboards stratégiques.",
            "Analyse ROI, ROAS et CPA pour guider les décisions d'allocation média.",
            "Optimisation de la distribution budgétaire grâce à des insights d'élasticité de performance.",
            "Évaluation du marketing mix, quantifiant la contribution par canal et l'efficacité des investissements.",
            "Recommandations stratégiques influençant les décisions d'investissement et d'acquisition.",
          ],
        },
        {
          role: "Data Analyst",
          company: "Additius Santa Maria",
          location: "Santa Maria de Palautordera, ES",
          period: "Juillet 2020 – Décembre 2020",
          description: [
            "Application du machine learning à la détection de cultures à partir d'imagerie satellite.",
          ],
        },
      ],
      education: [
        "MSc en Gestion Financière — Universitat Oberta de Catalunya (UOC), 2022–2024",
        "MSc en Data Science — Universitat Oberta de Catalunya (UOC), 2020–2022",
        "BSc en Statistiques — Universitat Politècnica de Catalunya (UPC), 2015–2019",
        "BSc en Psychologie — Universitat de Barcelona (UB), 2014–2019",
      ],
      languages: [
        "Catalan (Langue maternelle)",
        "Espagnol (Langue maternelle)",
        "Anglais (C1)",
        "Français (B2)",
        "Italien (B2)",
        "Allemand (B1, en apprentissage actif)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "A/B Testing",
        "Détection d'anomalies",
        "Conception de dashboards",
        "Conception de KPI",
        "Modélisation de régression",
        "Forecasting",
        "Inférence causale",
      ],
    },
    contact: {
      title: "Contact",
      description: "Pour toute collaboration ou question, n'hésitez pas à me contacter.",
      form: {
        nameLabel: "Nom",
        namePlaceholder: "Votre nom",
        emailLabel: "Email",
        emailPlaceholder: "votre.email@example.com",
        messageLabel: "Message",
        messagePlaceholder: "Écrivez votre message ici...",
        submitButton: "Envoyer",
        sendingText: "Envoi en cours...",
        successText: "Message envoyé. Merci !",
        errorText: "Une erreur est survenue. Réessayez ou écrivez-moi directement par email.",
      },
    },
    personalProjects: {
      title: "Projets Personnels",
      linkText: "Voir le projet",
      repoText: "Code source",
      projects: buildProjects("french"),
    },
  },

  german: {
    name: shared.name,
    photos: shared.photos,
    social: shared.social,
    nav: {
      home: "Startseite",
      personalProjects: "Projekte",
      skills: "Lebenslauf",
      contact: "Kontakt",
    },
    home: {
      title: "Willkommen und danke für Ihren Besuch!",
      description:
        "Ich bin Gemma, Senior Data Scientist & Product Owner mit über 4 Jahren Erfahrung im Aufbau von Modellen, die Entscheidungen in Marketing, Risk und Product vorantreiben. Ich verbinde gerne Business- und Tech-Teams, mache aus Daten handlungsleitende Insights und fördere Zusammenarbeit. Mein Hintergrund umfasst statistische Modellierung, Dashboard-Design, Stakeholder-Management und Product Ownership in agilen Umgebungen.",
      ctaCV: "Lebenslauf ansehen",
      ctaProjects: "Projekte ansehen",
    },
    cv: {
      title: "Lebenslauf",
      subtitle: shared.name,
      headline: "Senior Data Scientist & Product Owner",
      downloadText: "Lebenslauf herunterladen (PDF)",
      summary:
        "Senior Data Scientist mit solider statistischer Grundlage und über 4 Jahren Erfahrung im Aufbau entscheidungsrelevanter Modelle in Marketing, Risk und Product. Spezialisiert auf Regression, Forecasting, KPI-Design und die Übersetzung statistischer Ergebnisse in Business-Strategie. Erfahrung in der Leitung bereichsübergreifender Initiativen und in der Bereitstellung skalierbarer Analyselösungen in agilen Umgebungen. Begeistert von Marketing Science, kausaler Inferenz und robusten Messframeworks.",
      contactTitle: "Kontakt",
      experienceTitle: "Erfahrung",
      educationTitle: "Ausbildung",
      languagesTitle: "Sprachen",
      techStackTitle: "Tech Stack",
      methodologiesTitle: "Methoden",
      labels: {
        phone: "Telefon",
        email: "E-Mail",
        linkedin: "LinkedIn",
        github: "GitHub",
        location: "Standort",
      },
      contact: {
        phone: shared.social.phone,
        phoneAlt: shared.social.phoneAlt,
        email: shared.social.email,
        linkedin: shared.social.linkedin,
        github: shared.social.github,
        location: "Zürich 8004, Schweiz",
      },
      experiences: [
        {
          role: "Senior Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zürich, CH",
          period: "November 2022 – Gegenwart",
          description: [
            "Leitung der Vision, Entwicklung und Auslieferung eines Produkts zur Risikodatenqualität.",
            "Product Owner für zwei kritische Tools: Anomalie-Dashboard und statistische Validierungs-Engine.",
            "Steuerung eines cross-funktionalen Pods aus 5 Mitgliedern (IT und Business) in vollen Agile-Zyklen, Projektzeit um 50 % reduziert.",
            "Co-Design von ML-Modellen (Outlier Detection, Decision Trees) zur Erkennung kritischer Datenfehler.",
            "Refactoring von Python-Pipelines zur Anomalieerkennung für mehr Skalierbarkeit, Tests und Deployment-Reife.",
            "Treiber der Migration von Tableau zu Power BI innerhalb der Risk-Funktion.",
            "Übersetzung komplexer Modellergebnisse in handlungsleitende Empfehlungen für Senior-Stakeholder.",
            "Interne Kommunikationsinitiativen (Web, Video, Schulungen) zur Steigerung von Adoption und Vertrauen.",
            "Mentoring eines Praktikanten über 1,5 Jahre (Onboarding, Skill-Aufbau, Projektausrichtung).",
          ],
        },
        {
          role: "Business Analyst",
          company: "Google (via Adecco Switzerland)",
          location: "Zürich, CH",
          period: "April 2022 – September 2022",
          description: [
            "Aufbau eines Echtzeit-Dashboards in Google Data Studio zur Überwachung von User-Interaktionen und Conversion-Funnels eines neuen YouTube-Features.",
            "Definition von Erfolgskennzahlen und Abstimmung mit Produkt- und Engineering-Teams.",
            "Präsentation der Insights an Senior-Stakeholder zur Steuerung des Feature-Rollouts.",
          ],
        },
        {
          role: "Data Scientist",
          company: "KH Lloreda (KH-7)",
          location: "Granollers, ES",
          period: "Januar 2021 – April 2022",
          description: [
            "Entwicklung von Regressionsmodellen zur Umsatzprognose auf Basis von Marketing-Investitionen, Region und Kampagnen-Timing.",
            "Integration von Daten aus SEO, SEM, TV, Instagram, Facebook und Amazon Marketplace in strategische Dashboards.",
            "ROI-, ROAS- und CPA-Analysen zur Steuerung der Media-Allokation.",
            "Optimierung der Budgetverteilung über Kanäle mithilfe von Performance-Elastizitäts-Insights.",
            "Marketing-Mix-Bewertung: Kanalbeitrag und Investitionseffizienz quantifiziert.",
            "Strategische Empfehlungen, die Entscheidungen zu Kampagneninvestitionen und Kundenakquise geprägt haben.",
          ],
        },
        {
          role: "Data Analyst",
          company: "Additius Santa Maria",
          location: "Santa Maria de Palautordera, ES",
          period: "Juli 2020 – Dezember 2020",
          description: [
            "Einsatz von Machine Learning zur Erkennung von Kulturen aus Satellitenbildern.",
          ],
        },
      ],
      education: [
        "MSc in Financial Management — Universitat Oberta de Catalunya (UOC), 2022–2024",
        "MSc in Data Science — Universitat Oberta de Catalunya (UOC), 2020–2022",
        "BSc in Statistik — Universitat Politècnica de Catalunya (UPC), 2015–2019",
        "BSc in Psychologie — Universitat de Barcelona (UB), 2014–2019",
      ],
      languages: [
        "Katalanisch (Muttersprache)",
        "Spanisch (Muttersprache)",
        "Englisch (C1)",
        "Französisch (B2)",
        "Italienisch (B2)",
        "Deutsch (B1, aktiv lernend)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "A/B Testing",
        "Anomalieerkennung",
        "Dashboard-Design",
        "KPI-Design",
        "Regressionsmodellierung",
        "Forecasting",
        "Kausale Inferenz",
      ],
    },
    contact: {
      title: "Kontakt",
      description: "Für Kooperationen oder Anfragen kontaktieren Sie mich gern.",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Ihr Name",
        emailLabel: "E-Mail",
        emailPlaceholder: "ihre.email@example.com",
        messageLabel: "Nachricht",
        messagePlaceholder: "Schreiben Sie hier Ihre Nachricht...",
        submitButton: "Senden",
        sendingText: "Wird gesendet...",
        successText: "Nachricht gesendet. Danke!",
        errorText: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt per E-Mail.",
      },
    },
    personalProjects: {
      title: "Persönliche Projekte",
      linkText: "Projekt ansehen",
      repoText: "Quellcode",
      projects: buildProjects("german"),
    },
  },

  italian: {
    name: shared.name,
    photos: shared.photos,
    social: shared.social,
    nav: {
      home: "Home",
      personalProjects: "Progetti",
      skills: "CV",
      contact: "Contatto",
    },
    home: {
      title: "Benvenuti e grazie per essere passati!",
      description:
        "Sono Gemma, Senior Data Scientist & Product Owner con oltre 4 anni di esperienza nella costruzione di modelli che guidano le decisioni in marketing, rischio e prodotto. Mi appassiona collegare team business e tecnici, trasformare i dati in insights azionabili e favorire la collaborazione. Il mio background combina modellazione statistica, design di dashboard, gestione degli stakeholder e product ownership in ambienti agili.",
      ctaCV: "Vedi CV",
      ctaProjects: "Vedi progetti",
    },
    cv: {
      title: "Curriculum Vitae",
      subtitle: shared.name,
      headline: "Senior Data Scientist & Product Owner",
      downloadText: "Scarica CV (PDF)",
      summary:
        "Senior Data Scientist con solida base statistica e oltre 4 anni di esperienza nella costruzione di modelli che guidano le decisioni in marketing, rischio e prodotto. Specializzata in regressione, forecasting, design di KPI e traduzione di output statistici in strategia di business. Esperienza nella guida di iniziative cross-funzionali e nella consegna di soluzioni analitiche scalabili in ambienti agili. Appassionata di marketing science, inferenza causale e framework di misurazione robusti.",
      contactTitle: "Contatto",
      experienceTitle: "Esperienza",
      educationTitle: "Formazione",
      languagesTitle: "Lingue",
      techStackTitle: "Tech Stack",
      methodologiesTitle: "Metodologie",
      labels: {
        phone: "Telefono",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        location: "Localizzazione",
      },
      contact: {
        phone: shared.social.phone,
        phoneAlt: shared.social.phoneAlt,
        email: shared.social.email,
        linkedin: shared.social.linkedin,
        github: shared.social.github,
        location: "Zurigo 8004, Svizzera",
      },
      experiences: [
        {
          role: "Senior Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zurigo, CH",
          period: "Novembre 2022 – Presente",
          description: [
            "Guida della vision, sviluppo e consegna di un prodotto di qualità dei dati di rischio.",
            "Product Owner di due strumenti critici: dashboard di rilevamento anomalie e motore di validazione statistica.",
            "Gestione di un pod cross-funzionale di 5 persone (IT e business) in cicli Agile completi, riducendo del 50% il tempo di progetto.",
            "Co-progettazione di modelli ML (outlier detection, decision tree) per rilevare errori critici nei dati.",
            "Rifattorizzazione delle pipeline Python di rilevamento anomalie per migliorare scalabilità, testing e deployment.",
            "Guida della migrazione da Tableau a Power BI nella funzione rischio.",
            "Traduzione degli output di modelli complessi in raccomandazioni azionabili per stakeholder senior.",
            "Iniziative interne di comunicazione (web, video, formazione) per aumentare adozione e fiducia del business.",
            "Mentoring di un tirocinante per 1,5 anni (onboarding, sviluppo skill, allineamento del progetto).",
          ],
        },
        {
          role: "Business Analyst",
          company: "Google (via Adecco Switzerland)",
          location: "Zurigo, CH",
          period: "Aprile 2022 – Settembre 2022",
          description: [
            "Creazione di una dashboard in tempo reale su Google Data Studio per monitorare interazioni utente e funnel di conversione di una nuova feature YouTube.",
            "Definizione delle metriche di successo e allineamento con team prodotto e ingegneria.",
            "Presentazione di insights a stakeholder senior per guidare il roll-out della feature.",
          ],
        },
        {
          role: "Data Scientist",
          company: "KH Lloreda (KH-7)",
          location: "Granollers, ES",
          period: "Gennaio 2021 – Aprile 2022",
          description: [
            "Sviluppo di modelli di regressione per prevedere le vendite in funzione di investimento marketing, geografia e timing delle campagne.",
            "Integrazione di dati da SEO, SEM, TV, Instagram, Facebook e Amazon Marketplace in dashboard strategiche.",
            "Analisi ROI, ROAS e CPA per guidare le decisioni di allocazione media.",
            "Ottimizzazione della distribuzione del budget tramite insights di elasticità di performance.",
            "Valutazione del marketing mix, quantificando il contributo per canale e l'efficienza dell'investimento.",
            "Raccomandazioni strategiche che hanno influenzato le decisioni di investimento e acquisizione clienti.",
          ],
        },
        {
          role: "Data Analyst",
          company: "Additius Santa Maria",
          location: "Santa Maria de Palautordera, ES",
          period: "Luglio 2020 – Dicembre 2020",
          description: [
            "Applicazione del machine learning per rilevare colture da immagini satellitari.",
          ],
        },
      ],
      education: [
        "MSc in Gestione Finanziaria — Universitat Oberta de Catalunya (UOC), 2022–2024",
        "MSc in Data Science — Universitat Oberta de Catalunya (UOC), 2020–2022",
        "BSc in Statistica — Universitat Politècnica de Catalunya (UPC), 2015–2019",
        "BSc in Psicologia — Universitat de Barcelona (UB), 2014–2019",
      ],
      languages: [
        "Catalano (Madrelingua)",
        "Spagnolo (Madrelingua)",
        "Inglese (C1)",
        "Francese (B2)",
        "Italiano (B2)",
        "Tedesco (B1, in apprendimento attivo)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "A/B Testing",
        "Rilevamento anomalie",
        "Design di dashboard",
        "Design di KPI",
        "Modellazione di regressione",
        "Forecasting",
        "Inferenza causale",
      ],
    },
    contact: {
      title: "Contatto",
      description: "Per collaborazioni o richieste, sentiti libera/o di contattarmi.",
      form: {
        nameLabel: "Nome",
        namePlaceholder: "Il tuo nome",
        emailLabel: "Email",
        emailPlaceholder: "tuo.email@example.com",
        messageLabel: "Messaggio",
        messagePlaceholder: "Scrivi qui il tuo messaggio...",
        submitButton: "Invia",
        sendingText: "Invio in corso...",
        successText: "Messaggio inviato. Grazie!",
        errorText: "Si è verificato un errore. Riprova o scrivimi direttamente via email.",
      },
    },
    personalProjects: {
      title: "Progetti Personali",
      linkText: "Vedi progetto",
      repoText: "Codice sorgente",
      projects: buildProjects("italian"),
    },
  },
};

export default translations;
