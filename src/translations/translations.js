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
    id: "swissGov",
    tag: "Governance / Public Data Analytics",
    stack: ["Python", "Pandas", "Plotly", "Streamlit", "Folium"],
    link: "https://gemmagf.github.io/swiss-governance-dashboard/dashboard_real.html",
    repo: "https://github.com/Gemmagf/swiss-governance-dashboard",
  },
  {
    id: "sensorlab",
    tag: "Industrial / Chemical Process Analytics",
    stack: ["Python", "scikit-learn", "PyTorch", "XGBoost", "SHAP", "Streamlit"],
    link: "https://sensorlab.streamlit.app",
    repo: "https://github.com/Gemmagf/sensorlab",
    cvOnly: true, // available in CV Builder dropdown; hidden from public Projects section
  },
  {
    id: "labm",
    tag: "Marketing Science / Scale ML",
    stack: ["Python", "PyMC", "ArviZ", "SciPy", "PySpark", "Streamlit", "pytest"],
    link: "https://labm-app.streamlit.app",
    repo: "https://github.com/Gemmagf/LabM",
  },
  {
    id: "farma",
    tag: "Causal Inference / Pharma RWD",
    stack: ["Python", "scikit-learn", "DoWhy", "EconML", "SHAP", "Streamlit"],
    link: "https://farma-rwd-causal-lab.streamlit.app",
    repo: "https://github.com/Gemmagf/farma",
  },
  {
    id: "cvHunter",
    tag: "AI / HR Tech",
    stack: ["FastAPI", "Claude API", "pgvector", "PostgreSQL", "React", "Docker"],
    link: "https://gemmagf.github.io/cv_HR/#/dashboard",
    repo: "https://github.com/Gemmagf/cv_HR",
  },
  {
    id: "retail",
    tag: "Supply Chain / Forecasting",
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
    id: "rovello",
    tag: "Computer Vision / Nature",
    stack: ["PyTorch", "ConvNeXt-Tiny", "iNaturalist", "Apple MPS", "React"],
    link: "https://gemmagf.github.io/Rovello/",
    repo: "https://github.com/Gemmagf/Rovello",
  },
  {
    id: "aleman",
    tag: "AI / Language",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude API", "OpenAI"],
    link: "https://gemmagf.github.io/aleman/demo/",
    repo: "https://github.com/Gemmagf/aleman",
  },
  {
    id: "xina",
    tag: "Language / PWA",
    stack: ["HTML", "CSS", "JavaScript", "PWA"],
    link: "https://gemmagf.github.io/xina/",
    repo: "https://github.com/Gemmagf/xina",
  },
  {
    id: "receptes",
    tag: "Web / Cultural",
    stack: ["Vite", "JavaScript", "Tailwind", "Netlify"],
    link: "https://receptescat.netlify.app",
    repo: "https://github.com/Gemmagf/receptes",
  },
  {
    id: "zuriKreislauf",
    tag: "Energy / Process Analytics",
    stack: ["Python", "statsmodels", "scikit-learn", "Streamlit"],
    link: "https://zuri-kreislauf.streamlit.app",
    repo: "https://github.com/Gemmagf/zuri-kreislauf",
  },
  {
    id: "trackerLab",
    tag: "Consumer Insights / Marketing Science",
    stack: ["Python", "statsmodels", "scikit-learn", "PyMC", "Streamlit"],
    link: "https://tracker-lab.streamlit.app",
    repo: "https://github.com/Gemmagf/tracker-lab",
  },
];

const PROJECT_TEXTS = {
  catalan: {
    swissGov: {
      title: "Swiss Governance Dashboard — Cockpit de dades cantonals",
      description:
        "Cockpit de governança que converteix 32 indicadors públics oficials (educació, mobilitat, energia, aigua, habitatge, residus, qualitat de l'aire) dels 26 cantons suïssos en suport a la decisió. Només dades certificades (BFS, BAFU, opendata.swiss, Swisstopo, 2015–2024), amb forecasting probabilístic, simulació d'escenaris fins al 2035, rànquings cantonals i alertes d'anomalies. Cada xifra és traçable a la seva font.",
    },
    sensorlab: {
      title: "Sensorlab — Industrial Sensor Anomaly & RUL Lab",
      description:
        "Pipeline end-to-end de detection-diagnosis-RUL sobre el benchmark Tennessee Eastman (TEP, 41 sensors · 21 fault scenarios): tres detectors comparats (Hotelling T²/Q · IsolationForest · LSTM autoencoder amb AUROC 0,93), classificador XGBoost amb atribució SHAP per fault, RUL amb quantile gradient boosting i CoxPH, i capa de decisió cost-aware que transforma scores en accions 'intervene/schedule/wait' denominades en CHF. Production-grade: 11 mòduls pytest, GitHub Actions CI (Python 3.11+3.12), ruff-clean, paquet hatchling.",
    },
    labm: {
      title: "LabM — Marketing Science & Scale ML Portfolio",
      description:
        "Portfoli combinat de marketing science causal i data engineering a escala industrial, construït localment en un MacBook de 32 GB sense cloud spend. Lab 01: MMM bayesià en PyMC sobre el dataset Robyn — ROI incremental per canal amb CIs del 90 % i un optimitzador SciPy SLSQP que proposa una reassignació amb +31,5 M€ d'uplift a budget constant. Lab 02: pipeline PySpark de CTR-prediction sobre 195,8 M files reals de Criteo (AUC 0,766; log-loss −11,3 % vs baseline); 4 rondes d'OutOfMemory resoltes materialitzant el split a disc. 20 tests pytest, incloent integration tests amb Spark.",
    },
    farma: {
      title: "Pharma RWD Causal Lab — Pipeline d'Inferència Causal",
      description:
        "Pipeline end-to-end d'inferència causal sobre dades públiques d'UCI (cohort RHC, n=5.735, també replicat al demo de MIMIC-IV): cinc estimadors complementaris (naïve, PSM via DoWhy, AIPW cross-fitted, EconML LinearDRLearner) amb anàlisi de sensibilitat E-value i inspecció de propensity amb SHAP. Replica Connors et al. (1996); el matching 1:1 redueix el desequilibri |SMD| de 33 a 1 de 53 covariables. Production-grade: 36 tests pytest, GitHub Actions CI i dashboard Streamlit per a exploració what-if en viu.",
    },
    cvHunter: {
      title: "CV Hunter — Talent Matching amb IA",
      description:
        "Eina d'HR Tech que ingesta CVs (PDF/DOCX), extreu informació estructurada i fa matching semàntic candidat-vacant amb embeddings vectorials. Usa Claude API per parsing intel·ligent i pgvector per cerca per similitud. Inclou dashboard, importació massiva asíncrona i exportació de fitxes en PDF.",
    },
    retail: {
      title: "Supply Chain Lab — Demand Forecasting",
      description:
        "Demo end-to-end construïda específicament per modelar les decisions diàries d'un equip d'allocation retail: dashboard de salut d'estoc, catàleg de productes, recomanador d'allocations amb IA, forecasting de demanda a nivell de SKU i simulador d'escenaris what-if. Next.js, TypeScript, Recharts, Tailwind sobre dades sintètiques però realistes; multilingüe (7 idiomes). Mostra, en una sola eina, com les sortides del forecasting es tradueixen en decisions concretes d'allocation entre botigues i canals.",
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
    rovello: {
      title: "Rovelló — Classificador de bolets",
      description:
        "Classificador d'espècies de bolets per Catalunya i Suïssa: ConvNeXt-Tiny fine-tuned sobre 44.000 imatges research-grade d'iNaturalist amb 1.035 espècies. Aconsegueix 73,4% Top-1 / 89,8% Top-5 al test set independent — competitiu per a fine-grained visual classification a aquesta escala. Entrenat localment ~52h en Apple M4 (MPS) amb MixUp, RandAugment, label smoothing i WeightedRandomSampler. Inclou diccionari d'espècies, tips comestible-vs-tòxic i mapa de zones i temporades.",
    },
    aleman: {
      title: "Alemany — App d'aprenentatge amb IA",
      description:
        "Plataforma per aprendre alemany pensada per al dia a dia a Suïssa. Usa Claude i OpenAI per generar exercicis i feedback personalitzats. Auth i persistència amb Supabase, frontend Next.js + TypeScript.",
    },
    xina: {
      title: "瑾曼学 — Xinès per al viatge",
      description:
        "PWA mobile-first per aprendre els bàsics del xinès mandarí abans d'un viatge: vocabulari essencial, frases clau, pinyin i caràcters. Instal·lable al mòbil i funciona offline.",
    },
    receptes: {
      title: "Receptes Catalanes (1080)",
      description:
        "Web amb una col·lecció de 1080 receptes tradicionals catalanes amb cerca i navegació per categoria. Projecte cultural per preservar i difondre el receptari clàssic en català.",
    },
    zuriKreislauf: {
      title: "Züri-Kreislauf — Waste-to-Energy Analytics de Zúric",
      description:
        "Forecasting, monitoratge d'eficiència de procés i capa de decisió CHF/tCO2eq per a la planta KVA Hagenholz, amb dades obertes de la Stadt Zürich. Hotelling T²/Q + IsolationForest detecten una aturada real de turbina de 8 mesos (~CHF 18,8M · ~9.000 tCO2eq). SARIMA validat contra baseline naive; pytest, CI i dashboard Streamlit bilingüe.",
    },
    trackerLab: {
      title: "Tracker Lab — Consumer Tracker Analytics",
      description:
        "Simulador d'un brand tracker global (30 mercats · onades mensuals · ~72 KPIs) amb tres anàlisis: control estadístic de procés per separar senyal de soroll mostral; test d'invariància de mesura (configural/mètric/escalar) entre 30 mercats amb scorecard de comparabilitat; i screening causal de drivers (Lasso + bayesià jeràrquic) per distingir els KPIs que prediuen volum i quota de les mètriques de vanitat.",
    },
  },
  spanish: {
    swissGov: {
      title: "Swiss Governance Dashboard — Cockpit de datos cantonales",
      description:
        "Cockpit de gobernanza que convierte 32 indicadores públicos oficiales (educación, movilidad, energía, agua, vivienda, residuos, calidad del aire) de los 26 cantones suizos en soporte a la decisión. Solo datos certificados (BFS, BAFU, opendata.swiss, Swisstopo, 2015–2024), con forecasting probabilístico, simulación de escenarios hasta 2035, rankings cantonales y alertas de anomalías. Cada cifra es trazable a su fuente.",
    },
    sensorlab: {
      title: "Sensorlab — Industrial Sensor Anomaly & RUL Lab",
      description:
        "Pipeline end-to-end de detection-diagnosis-RUL sobre el benchmark Tennessee Eastman (TEP, 41 sensores · 21 escenarios de fault): tres detectores comparados (Hotelling T²/Q · IsolationForest · LSTM autoencoder con AUROC 0,93), clasificador XGBoost con atribución SHAP por fault, RUL con quantile gradient boosting y CoxPH, y capa de decisión cost-aware que transforma scores en acciones 'intervene/schedule/wait' denominadas en CHF. Production-grade: 11 módulos pytest, GitHub Actions CI (Python 3.11+3.12), ruff-clean, paquete hatchling.",
    },
    labm: {
      title: "LabM — Marketing Science & Scale ML Portfolio",
      description:
        "Portafolio combinado de marketing science causal e ingeniería de datos a escala industrial, construido localmente en un MacBook de 32 GB sin gasto en cloud. Lab 01: MMM bayesiano en PyMC sobre el dataset Robyn — ROI incremental por canal con CIs del 90 % y un optimizador SciPy SLSQP que propone una reasignación con +31,5 M€ de uplift a presupuesto constante. Lab 02: pipeline PySpark de CTR-prediction sobre 195,8 M filas reales de Criteo (AUC 0,766; log-loss −11,3 % vs baseline); 4 rondas de OutOfMemory resueltas materializando el split a disco. 20 tests pytest, incluyendo integration tests con Spark.",
    },
    farma: {
      title: "Pharma RWD Causal Lab — Pipeline de Inferencia Causal",
      description:
        "Pipeline end-to-end de inferencia causal sobre datos públicos de UCI (cohorte RHC, n=5.735, también replicado en el demo de MIMIC-IV): cinco estimadores complementarios (naïve, PSM vía DoWhy, AIPW cross-fitted, EconML LinearDRLearner) con análisis de sensibilidad E-value e inspección de propensity con SHAP. Replica Connors et al. (1996); el matching 1:1 reduce el desequilibrio |SMD| de 33 a 1 de 53 covariables. Production-grade: 36 tests pytest, GitHub Actions CI y dashboard Streamlit para exploración what-if en vivo.",
    },
    cvHunter: {
      title: "CV Hunter — Talent Matching con IA",
      description:
        "Herramienta de HR Tech que ingesta CVs (PDF/DOCX), extrae información estructurada y realiza matching semántico candidato-vacante con embeddings vectoriales. Usa Claude API para parsing inteligente y pgvector para búsqueda por similitud. Incluye dashboard, importación masiva asíncrona y exportación de fichas en PDF.",
    },
    retail: {
      title: "Supply Chain Lab — Demand Forecasting",
      description:
        "Demo end-to-end construida específicamente para modelar las decisiones diarias de un equipo de allocation retail: dashboard de salud de stock, catálogo de productos, recomendador de allocations con IA, forecasting de demanda a nivel de SKU y simulador de escenarios what-if. Next.js, TypeScript, Recharts, Tailwind sobre datos sintéticos pero realistas; multilingüe (7 idiomas). Muestra, en una sola herramienta, cómo las salidas del forecasting se traducen en decisiones concretas de allocation entre tiendas y canales.",
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
    rovello: {
      title: "Rovelló — Clasificador de setas",
      description:
        "Clasificador de especies de setas para Cataluña y Suiza: ConvNeXt-Tiny fine-tuned sobre 44.000 imágenes research-grade de iNaturalist con 1.035 especies. Alcanza 73,4% Top-1 / 89,8% Top-5 en el test set independiente — competitivo para fine-grained visual classification a esta escala. Entrenado localmente ~52h en Apple M4 (MPS) con MixUp, RandAugment, label smoothing y WeightedRandomSampler. Incluye diccionario de especies, tips comestible-vs-tóxico y mapa de zonas y temporadas.",
    },
    aleman: {
      title: "Alemán — App de aprendizaje con IA",
      description:
        "Plataforma para aprender alemán pensada para el día a día en Suiza. Usa Claude y OpenAI para generar ejercicios y feedback personalizados. Auth y persistencia con Supabase, frontend Next.js + TypeScript.",
    },
    xina: {
      title: "瑾曼学 — Chino para el viaje",
      description:
        "PWA mobile-first para aprender lo básico del chino mandarín antes de un viaje: vocabulario esencial, frases clave, pinyin y caracteres. Instalable en el móvil y funciona offline.",
    },
    receptes: {
      title: "Recetas Catalanas (1080)",
      description:
        "Web con una colección de 1080 recetas tradicionales catalanas con búsqueda y navegación por categoría. Proyecto cultural para preservar y difundir el recetario clásico en catalán.",
    },
    zuriKreislauf: {
      title: "Züri-Kreislauf — Waste-to-Energy Analytics de Zúrich",
      description:
        "Forecasting, monitorización de eficiencia de proceso y capa de decisión CHF/tCO2eq para la planta KVA Hagenholz, con datos abiertos de la Stadt Zürich. Hotelling T²/Q + IsolationForest detectan una parada real de turbina de 8 meses (~CHF 18,8M · ~9.000 tCO2eq). SARIMA validado contra baseline naive; pytest, CI y dashboard Streamlit bilingüe.",
    },
    trackerLab: {
      title: "Tracker Lab — Consumer Tracker Analytics",
      description:
        "Simulador de un brand tracker global (30 mercados · oleadas mensuales · ~72 KPIs) con tres análisis: control estadístico de proceso para separar señal de ruido muestral; test de invariancia de medida (configural/métrico/escalar) entre 30 mercados con scorecard de comparabilidad; y screening causal de drivers (Lasso + bayesiano jerárquico) para distinguir los KPIs que predicen volumen y cuota de las métricas de vanidad.",
    },
  },
  english: {
    swissGov: {
      title: "Swiss Governance Dashboard — Cantonal Data Cockpit",
      description:
        "Governance cockpit turning 32 official public indicators (education, mobility, energy, water, housing, waste, air quality) across all 26 Swiss cantons into decision support. Certified data only (BFS, BAFU, opendata.swiss, Swisstopo, 2015–2024), with probabilistic forecasting, scenario simulation to 2035, cantonal rankings and anomaly alerts. Every figure is traceable to its source.",
    },
    sensorlab: {
      title: "Sensorlab — Industrial Sensor Anomaly & RUL Lab",
      description:
        "End-to-end detection-diagnosis-RUL pipeline on the Tennessee Eastman benchmark (TEP, 41 sensors · 21 fault scenarios): three detectors compared (Hotelling T²/Q · IsolationForest · LSTM autoencoder reaching AUROC 0.93), XGBoost classifier with SHAP per-fault attribution, RUL via quantile gradient boosting + CoxPH, and a cost-aware decision layer that maps detector scores onto 'intervene/schedule/wait' actions denominated in CHF. Production-grade: 11 pytest modules, GitHub Actions CI (Python 3.11+3.12), ruff-clean, hatchling-built package.",
    },
    labm: {
      title: "LabM — Marketing Science & Scale ML Portfolio",
      description:
        "Combined portfolio of causal marketing science and industrial-scale data engineering, built locally on a 32 GB MacBook with zero cloud spend. Lab 01: Bayesian MMM in PyMC on the Robyn dataset — incremental per-channel ROI with 90% credible intervals plus a SciPy SLSQP optimiser proposing a reallocation with +€31.5M uplift at unchanged budget. Lab 02: PySpark CTR-prediction pipeline on 195.8M real Criteo ad-impression rows (AUC 0.766; log-loss −11.3% vs baseline); four OutOfMemory rounds resolved by materialising the split to disk. 20 pytest tests, including Spark-backed integration tests.",
    },
    farma: {
      title: "Pharma RWD Causal Lab — Causal Inference Pipeline",
      description:
        "End-to-end causal inference pipeline on public ICU data (RHC cohort, n=5,735, also replicated on MIMIC-IV demo): five complementary estimators (naïve, PSM via DoWhy, cross-fitted AIPW, EconML LinearDRLearner) with E-value sensitivity and SHAP-based propensity inspection. Replicates Connors et al. (1996); 1:1 matching cuts |SMD| imbalance from 33 to 1 of 53 covariates. Production-grade: 36 pytest tests, GitHub Actions CI and a Streamlit dashboard for live what-if exploration.",
    },
    cvHunter: {
      title: "CV Hunter — AI Talent Matching",
      description:
        "HR-tech tool that ingests CVs (PDF/DOCX), extracts structured data and performs semantic candidate-to-role matching with vector embeddings. Uses the Claude API for smart parsing and pgvector for similarity search. Includes a dashboard, async bulk import and PDF profile export.",
    },
    retail: {
      title: "Supply Chain Lab — Demand Forecasting",
      description:
        "End-to-end demo built specifically to model the daily decisions of a retail allocation team: stock-health dashboard, product catalogue, AI-driven allocation recommender, SKU-level demand forecasting and what-if scenario simulator. Next.js, TypeScript, Recharts, Tailwind on synthetic but realistic retail data; multilingual (7 languages). Shows, in one tool, how forecasting outputs translate into concrete allocation decisions across stores and channels.",
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
    rovello: {
      title: "Rovelló — Mushroom Classifier",
      description:
        "Mushroom species classifier for Catalonia and Switzerland: ConvNeXt-Tiny fine-tuned on 44k research-grade iNaturalist images across 1,035 species. Reaches 73.4% Top-1 / 89.8% Top-5 accuracy on an independent test set — competitive for fine-grained visual classification at this scale. Trained locally in ~52h on Apple M4 (MPS) with MixUp, RandAugment, label smoothing and WeightedRandomSampler. Ships with a species dictionary, edible-vs-toxic verification tips and a map of typical regions and seasons.",
    },
    aleman: {
      title: "German — AI-powered Learning app",
      description:
        "Platform to learn German tailored to daily life in Switzerland. Uses Claude and OpenAI to generate personalised exercises and feedback. Auth and persistence with Supabase, Next.js + TypeScript frontend.",
    },
    xina: {
      title: "瑾曼学 — Mandarin for travel",
      description:
        "Mobile-first PWA to learn the basics of Mandarin Chinese before a trip: essential vocabulary, key phrases, pinyin and characters. Installable on mobile and works offline.",
    },
    receptes: {
      title: "Catalan Recipes (1080)",
      description:
        "Web app featuring 1080 traditional Catalan recipes, with search and category browsing. Cultural project to preserve and share the classic Catalan cookbook.",
    },
    zuriKreislauf: {
      title: "Züri-Kreislauf — Zurich Waste-to-Energy Analytics",
      description:
        "Forecasting, process-efficiency monitoring and a CHF/tCO2eq decision layer for Zurich's KVA Hagenholz plant, on Stadt Zürich open data. Hotelling T²/Q + IsolationForest automatically flag a real 8-month turbine outage (~CHF 18.8M · ~9,000 tCO2eq). SARIMA validated against a naive baseline; pytest, CI and a bilingual Streamlit dashboard.",
    },
    trackerLab: {
      title: "Tracker Lab — Consumer Tracker Analytics",
      description:
        "A simulated global brand tracker (30 markets · monthly waves · ~72 KPIs) with three analyses: statistical process control to separate signal from sampling noise; configural/metric/scalar measurement-invariance testing across 30 markets with a per-market comparability scorecard; and a confounder-controlled driver screen (Lasso + hierarchical Bayesian) separating KPIs that predict volume and share from vanity metrics.",
    },
  },
  french: {
    swissGov: {
      title: "Swiss Governance Dashboard — Cockpit de données cantonales",
      description:
        "Cockpit de gouvernance qui transforme 32 indicateurs publics officiels (éducation, mobilité, énergie, eau, logement, déchets, qualité de l'air) des 26 cantons suisses en aide à la décision. Uniquement des données certifiées (BFS, BAFU, opendata.swiss, Swisstopo, 2015–2024), avec prévision probabiliste, simulation de scénarios jusqu'en 2035, classements cantonaux et alertes d'anomalies. Chaque chiffre est traçable à sa source.",
    },
    sensorlab: {
      title: "Sensorlab — Industrial Sensor Anomaly & RUL Lab",
      description:
        "Pipeline end-to-end détection-diagnostic-RUL sur le benchmark Tennessee Eastman (TEP, 41 capteurs · 21 scénarios de défaut) : trois détecteurs comparés (Hotelling T²/Q · IsolationForest · autoencodeur LSTM atteignant AUROC 0,93), classifieur XGBoost avec attribution SHAP par défaut, RUL via quantile gradient boosting + CoxPH, et couche de décision cost-aware qui traduit les scores en actions 'intervene/schedule/wait' en CHF. Production-grade : 11 modules pytest, GitHub Actions CI (Python 3.11+3.12), ruff-clean, package hatchling.",
    },
    labm: {
      title: "LabM — Marketing Science & Scale ML Portfolio",
      description:
        "Portfolio combiné de marketing science causal et d'ingénierie de données à l'échelle industrielle, construit localement sur un MacBook 32 Go sans dépense cloud. Lab 01 : MMM bayésien en PyMC sur le dataset Robyn — ROI incrémental par canal avec IC à 90 % et un optimiseur SciPy SLSQP proposant une réaffectation avec +31,5 M€ d'uplift à budget constant. Lab 02 : pipeline PySpark de CTR-prediction sur 195,8 M lignes réelles de Criteo (AUC 0,766 ; log-loss −11,3 % vs baseline) ; 4 rounds de OutOfMemory résolus en matérialisant le split sur disque. 20 tests pytest, incluant des integration tests Spark.",
    },
    farma: {
      title: "Pharma RWD Causal Lab — Pipeline d'Inférence Causale",
      description:
        "Pipeline d'inférence causale de bout en bout sur des données publiques d'USI (cohorte RHC, n=5 735, également répliqué sur le demo MIMIC-IV) : cinq estimateurs complémentaires (naïf, PSM via DoWhy, AIPW cross-fitted, EconML LinearDRLearner) avec analyse de sensibilité E-value et inspection de propensity via SHAP. Réplique Connors et al. (1996) ; le matching 1:1 réduit le déséquilibre |SMD| de 33 à 1 sur 53 covariables. Production-grade : 36 tests pytest, CI GitHub Actions et dashboard Streamlit pour l'exploration what-if en direct.",
    },
    cvHunter: {
      title: "CV Hunter — Matching de talents par IA",
      description:
        "Outil HR-tech qui ingère des CV (PDF/DOCX), en extrait des données structurées et effectue un matching sémantique candidat-poste via embeddings vectoriels. Utilise l'API Claude pour le parsing intelligent et pgvector pour la recherche par similarité. Dashboard, import en masse asynchrone et export de fiches en PDF.",
    },
    retail: {
      title: "Supply Chain Lab — Demand Forecasting",
      description:
        "Démo de bout en bout conçue spécifiquement pour modéliser les décisions quotidiennes d'une équipe d'allocation retail : dashboard de santé du stock, catalogue produits, recommandateur d'allocations par IA, prévision de demande au niveau SKU et simulateur de scénarios what-if. Next.js, TypeScript, Recharts, Tailwind sur des données synthétiques mais réalistes ; multilingue (7 langues). Montre, en un seul outil, comment les sorties de prévision se traduisent en décisions concrètes d'allocation entre magasins et canaux.",
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
    rovello: {
      title: "Rovelló — Classifieur de champignons",
      description:
        "Classifieur d'espèces de champignons pour la Catalogne et la Suisse : ConvNeXt-Tiny fine-tuné sur 44 000 images research-grade d'iNaturalist sur 1 035 espèces. Atteint 73,4 % Top-1 / 89,8 % Top-5 sur le test set indépendant — compétitif pour la classification visuelle fine-grained à cette échelle. Entraîné localement en ~52 h sur Apple M4 (MPS) avec MixUp, RandAugment, label smoothing et WeightedRandomSampler. Dictionnaire d'espèces, conseils comestible-vs-toxique et carte des zones et saisons inclus.",
    },
    aleman: {
      title: "Allemand — App d'apprentissage par IA",
      description:
        "Plateforme pour apprendre l'allemand pensée pour le quotidien en Suisse. Utilise Claude et OpenAI pour générer exercices et feedback personnalisés. Auth et persistance avec Supabase, frontend Next.js + TypeScript.",
    },
    xina: {
      title: "瑾曼学 — Mandarin pour voyager",
      description:
        "PWA mobile-first pour apprendre les bases du chinois mandarin avant un voyage : vocabulaire essentiel, phrases clés, pinyin et caractères. Installable sur mobile et fonctionne hors ligne.",
    },
    receptes: {
      title: "Recettes Catalanes (1080)",
      description:
        "Web app avec 1080 recettes traditionnelles catalanes, recherche et navigation par catégorie. Projet culturel pour préserver et diffuser le recueil classique catalan.",
    },
    zuriKreislauf: {
      title: "Züri-Kreislauf — Waste-to-Energy Analytics de Zurich",
      description:
        "Prévision, suivi de l'efficacité du procédé et couche de décision CHF/tCO2eq pour l'usine KVA Hagenholz, sur données ouvertes de la Stadt Zürich. Hotelling T²/Q + IsolationForest détectent un arrêt réel de turbine de 8 mois (~CHF 18,8M · ~9 000 tCO2eq). SARIMA validé contre un baseline naïf ; pytest, CI et dashboard Streamlit bilingue.",
    },
    trackerLab: {
      title: "Tracker Lab — Consumer Tracker Analytics",
      description:
        "Simulateur d'un brand tracker global (30 marchés · vagues mensuelles · ~72 KPIs) avec trois analyses : maîtrise statistique des procédés pour séparer le signal du bruit d'échantillonnage ; tests d'invariance de mesure (configural/métrique/scalaire) sur 30 marchés avec scorecard de comparabilité ; et screening causal de drivers (Lasso + bayésien hiérarchique) distinguant les KPIs qui prédisent volume et part des métriques de vanité.",
    },
  },
  german: {
    swissGov: {
      title: "Swiss Governance Dashboard — Kantonales Datencockpit",
      description:
        "Governance-Cockpit, das 32 offizielle öffentliche Indikatoren (Bildung, Mobilität, Energie, Wasser, Wohnen, Abfall, Luftqualität) über alle 26 Schweizer Kantone in Entscheidungsunterstützung verwandelt. Ausschliesslich zertifizierte Daten (BFS, BAFU, opendata.swiss, Swisstopo, 2015–2024), mit probabilistischem Forecasting, Szenariosimulation bis 2035, Kantonsrankings und Anomalie-Warnungen. Jede Zahl ist bis zur Quelle nachvollziehbar.",
    },
    sensorlab: {
      title: "Sensorlab — Industrial Sensor Anomaly & RUL Lab",
      description:
        "End-to-End Detection-Diagnose-RUL-Pipeline auf dem Tennessee Eastman Benchmark (TEP, 41 Sensoren · 21 Fault-Szenarien): drei Detektoren verglichen (Hotelling T²/Q · IsolationForest · LSTM-Autoencoder mit AUROC 0,93), XGBoost-Klassifikator mit SHAP-Attribution je Fault, RUL über Quantile Gradient Boosting + CoxPH, und eine kostenbewusste Entscheidungs-Schicht, die Scores in CHF-denominierte 'intervene/schedule/wait'-Aktionen übersetzt. Production-grade: 11 pytest-Module, GitHub Actions CI (Python 3.11+3.12), ruff-clean, hatchling-Paket.",
    },
    labm: {
      title: "LabM — Marketing Science & Scale ML Portfolio",
      description:
        "Kombiniertes Portfolio aus kausaler Marketing Science und industriellem Data Engineering, lokal auf einem 32 GB MacBook ohne Cloud-Spend gebaut. Lab 01: Bayessches MMM in PyMC auf dem Robyn-Datensatz — inkrementeller Kanal-ROI mit 90 % Credible Intervals plus SciPy SLSQP-Optimierer, der eine Umverteilung mit +31,5 Mio. € Uplift bei unverändertem Budget vorschlägt. Lab 02: PySpark CTR-Prediction-Pipeline auf 195,8 Mio. echten Criteo-Impression-Rows (AUC 0,766; Log-Loss −11,3 % vs Baseline); vier OOM-Runden gelöst durch Materialisierung des Splits auf Disk. 20 pytest-Tests, inkl. Spark-basierter Integration-Tests.",
    },
    farma: {
      title: "Pharma RWD Causal Lab — Causal-Inference-Pipeline",
      description:
        "End-to-End-Causal-Inference-Pipeline auf öffentlichen ICU-Daten (RHC-Kohorte, n=5.735, ebenfalls auf dem MIMIC-IV-Demo repliziert): fünf komplementäre Schätzer (naiv, PSM via DoWhy, cross-fitted AIPW, EconML LinearDRLearner) mit E-value-Sensitivitätsanalyse und SHAP-basierter Propensity-Inspektion. Repliziert Connors et al. (1996); 1:1-Matching reduziert die |SMD|-Ungleichgewichtung von 33 auf 1 von 53 Kovariaten. Production-grade: 36 pytest-Tests, GitHub Actions CI und ein Streamlit-Dashboard für Live-What-if-Exploration.",
    },
    cvHunter: {
      title: "CV Hunter — AI Talent Matching",
      description:
        "HR-Tech-Tool, das Lebensläufe (PDF/DOCX) einliest, strukturierte Daten extrahiert und mittels Vektor-Embeddings semantisches Matching zwischen Kandidaten und Rollen durchführt. Nutzt die Claude-API für intelligentes Parsing und pgvector für Ähnlichkeitssuche. Dashboard, asynchroner Bulk-Import und PDF-Export der Profile.",
    },
    retail: {
      title: "Supply Chain Lab — Demand Forecasting",
      description:
        "End-to-End-Demo, speziell entwickelt, um die täglichen Entscheidungen eines Retail-Allocation-Teams abzubilden: Stock-Health-Dashboard, Produktkatalog, KI-gestützter Allocation-Recommender, Demand Forecasting auf SKU-Ebene und What-if-Szenario-Simulator. Next.js, TypeScript, Recharts, Tailwind auf synthetischen, aber realistischen Daten; mehrsprachig (7 Sprachen). Zeigt in einem einzigen Tool, wie Forecasting-Ergebnisse in konkrete Allocation-Entscheidungen über Filialen und Kanäle hinweg übersetzt werden.",
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
    rovello: {
      title: "Rovelló — Pilz-Klassifikator",
      description:
        "Klassifikator für Pilzarten in Katalonien und der Schweiz: ConvNeXt-Tiny fine-tuned auf 44.000 research-grade Bildern von iNaturalist über 1.035 Arten. Erreicht 73,4% Top-1 / 89,8% Top-5 Accuracy auf einem unabhängigen Test-Set — kompetitiv für Fine-Grained Visual Classification in dieser Grössenordnung. Lokal in ~52h auf Apple M4 (MPS) trainiert mit MixUp, RandAugment, Label Smoothing und WeightedRandomSampler. Inklusive Arten-Wörterbuch, Tipps essbar-vs-giftig und Karte typischer Regionen und Saisonzeiten.",
    },
    aleman: {
      title: "Deutsch — KI-gestützte Lern-App",
      description:
        "Plattform zum Deutschlernen, zugeschnitten auf den Alltag in der Schweiz. Nutzt Claude und OpenAI, um personalisierte Übungen und Feedback zu generieren. Auth und Persistenz mit Supabase, Frontend mit Next.js + TypeScript.",
    },
    xina: {
      title: "瑾曼学 — Mandarin für die Reise",
      description:
        "Mobile-First-PWA, um vor einer Reise die Grundlagen des Mandarin-Chinesisch zu lernen: essenzielles Vokabular, Schlüsselphrasen, Pinyin und Schriftzeichen. Auf dem Smartphone installierbar und offline nutzbar.",
    },
    receptes: {
      title: "Katalanische Rezepte (1080)",
      description:
        "Web-App mit 1080 traditionellen katalanischen Rezepten, Suche und Kategoriedurchsicht. Kulturprojekt zur Bewahrung und Verbreitung des klassischen katalanischen Kochbuchs.",
    },
    zuriKreislauf: {
      title: "Züri-Kreislauf — Waste-to-Energy Analytics für Zürich",
      description:
        "Forecasting, Prozesseffizienz-Monitoring und eine CHF/tCO2eq-Entscheidungsschicht für die KVA Hagenholz, auf Basis offener Daten der Stadt Zürich. Hotelling T²/Q + IsolationForest erkennen einen realen 8-monatigen Turbinenausfall (~CHF 18,8 Mio. · ~9.000 tCO2eq). SARIMA gegen eine naive Baseline validiert; pytest, CI und zweisprachiges Streamlit-Dashboard.",
    },
    trackerLab: {
      title: "Tracker Lab — Consumer Tracker Analytics",
      description:
        "Simulierter globaler Brand Tracker (30 Märkte · monatliche Wellen · ~72 KPIs) mit drei Analysen: statistische Prozesskontrolle zur Trennung von Signal und Stichprobenrauschen; Messinvarianz-Tests (konfigural/metrisch/skalar) über 30 Märkte mit Vergleichbarkeits-Scorecard; und ein konfounder-kontrolliertes Treiber-Screening (Lasso + hierarchisch bayessch), das KPIs mit echter Volumen- und Share-Vorhersage von Vanity-Metriken trennt.",
    },
  },
  italian: {
    swissGov: {
      title: "Swiss Governance Dashboard — Cockpit di dati cantonali",
      description:
        "Cockpit di governance che trasforma 32 indicatori pubblici ufficiali (istruzione, mobilità, energia, acqua, abitazioni, rifiuti, qualità dell'aria) dei 26 cantoni svizzeri in supporto decisionale. Solo dati certificati (BFS, BAFU, opendata.swiss, Swisstopo, 2015–2024), con forecasting probabilistico, simulazione di scenari fino al 2035, ranking cantonali e alert di anomalie. Ogni cifra è tracciabile alla sua fonte.",
    },
    sensorlab: {
      title: "Sensorlab — Industrial Sensor Anomaly & RUL Lab",
      description:
        "Pipeline end-to-end detection-diagnosis-RUL sul benchmark Tennessee Eastman (TEP, 41 sensori · 21 scenari di fault): tre rilevatori a confronto (Hotelling T²/Q · IsolationForest · LSTM autoencoder con AUROC 0,93), classificatore XGBoost con attribuzione SHAP per fault, RUL tramite quantile gradient boosting + CoxPH, e uno strato decisionale cost-aware che traduce gli score in azioni 'intervene/schedule/wait' denominate in CHF. Production-grade: 11 moduli pytest, GitHub Actions CI (Python 3.11+3.12), ruff-clean, pacchetto hatchling.",
    },
    labm: {
      title: "LabM — Marketing Science & Scale ML Portfolio",
      description:
        "Portfolio combinato di marketing science causale e data engineering su scala industriale, costruito localmente su un MacBook 32 GB senza spese cloud. Lab 01: MMM bayesiano in PyMC sul dataset Robyn — ROI incrementale per canale con CI al 90 % e un optimizer SciPy SLSQP che propone una riallocazione con +31,5 M€ di uplift a budget invariato. Lab 02: pipeline PySpark di CTR-prediction su 195,8 M righe reali di Criteo (AUC 0,766; log-loss −11,3 % vs baseline); 4 round di OutOfMemory risolti materializzando lo split su disco. 20 test pytest, inclusi integration test con Spark.",
    },
    farma: {
      title: "Pharma RWD Causal Lab — Pipeline di Inferenza Causale",
      description:
        "Pipeline di inferenza causale end-to-end su dati pubblici di ICU (coorte RHC, n=5.735, replicato anche sul demo MIMIC-IV): cinque stimatori complementari (naïve, PSM via DoWhy, AIPW cross-fitted, EconML LinearDRLearner) con analisi di sensibilità E-value e ispezione di propensity con SHAP. Replica Connors et al. (1996); il matching 1:1 riduce lo sbilanciamento |SMD| da 33 a 1 su 53 covariate. Production-grade: 36 test pytest, GitHub Actions CI e dashboard Streamlit per l'esplorazione what-if in tempo reale.",
    },
    cvHunter: {
      title: "CV Hunter — Talent Matching con IA",
      description:
        "Strumento HR-tech che ingerisce CV (PDF/DOCX), estrae dati strutturati ed esegue matching semantico candidato-ruolo tramite embeddings vettoriali. Usa l'API Claude per parsing intelligente e pgvector per la ricerca per similarità. Dashboard, import massivo asincrono ed esportazione delle schede in PDF.",
    },
    retail: {
      title: "Supply Chain Lab — Demand Forecasting",
      description:
        "Demo end-to-end costruita specificamente per modellare le decisioni quotidiane di un team di allocation retail: dashboard di stock health, catalogo prodotti, recommender di allocations con IA, forecasting della domanda a livello SKU e simulatore di scenari what-if. Next.js, TypeScript, Recharts, Tailwind su dati sintetici ma realistici; multilingue (7 lingue). Mostra, in un unico strumento, come gli output del forecasting si traducono in decisioni concrete di allocation tra negozi e canali.",
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
    rovello: {
      title: "Rovelló — Classificatore di funghi",
      description:
        "Classificatore di specie di funghi per Catalogna e Svizzera: ConvNeXt-Tiny fine-tuned su 44.000 immagini research-grade di iNaturalist con 1.035 specie. Raggiunge 73,4% Top-1 / 89,8% Top-5 sul test set indipendente — competitivo per la fine-grained visual classification a questa scala. Addestrato localmente in ~52h su Apple M4 (MPS) con MixUp, RandAugment, label smoothing e WeightedRandomSampler. Include dizionario di specie, consigli commestibile-vs-tossico e mappa di zone e stagioni.",
    },
    aleman: {
      title: "Tedesco — App di apprendimento con IA",
      description:
        "Piattaforma per imparare il tedesco pensata per la vita quotidiana in Svizzera. Usa Claude e OpenAI per generare esercizi e feedback personalizzati. Auth e persistenza con Supabase, frontend Next.js + TypeScript.",
    },
    xina: {
      title: "瑾曼学 — Mandarino per il viaggio",
      description:
        "PWA mobile-first per imparare le basi del cinese mandarino prima di un viaggio: vocabolario essenziale, frasi chiave, pinyin e caratteri. Installabile sul cellulare e funziona offline.",
    },
    receptes: {
      title: "Ricette Catalane (1080)",
      description:
        "Web app con 1080 ricette tradizionali catalane, con ricerca e navigazione per categoria. Progetto culturale per preservare e diffondere il ricettario classico catalano.",
    },
    zuriKreislauf: {
      title: "Züri-Kreislauf — Waste-to-Energy Analytics di Zurigo",
      description:
        "Forecasting, monitoraggio dell'efficienza di processo e layer decisionale CHF/tCO2eq per l'impianto KVA Hagenholz, su dati aperti della Stadt Zürich. Hotelling T²/Q + IsolationForest rilevano un fermo reale di turbina di 8 mesi (~CHF 18,8M · ~9.000 tCO2eq). SARIMA validato contro baseline naive; pytest, CI e dashboard Streamlit bilingue.",
    },
    trackerLab: {
      title: "Tracker Lab — Consumer Tracker Analytics",
      description:
        "Simulatore di un brand tracker globale (30 mercati · wave mensili · ~72 KPI) con tre analisi: controllo statistico di processo per separare segnale e rumore campionario; test di invarianza di misura (configurale/metrico/scalare) su 30 mercati con scorecard di comparabilità; e screening causale dei driver (Lasso + bayesiano gerarchico) per distinguere i KPI che predicono volume e quota dalle metriche di vanità.",
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
      roleHeadline: "Senior Data Scientist & Product Owner",
      description:
        "Sóc la Gemma, Senior Data Scientist & Product Owner amb més de 4 anys d'experiència construint models que impulsen decisions en marketing, risc i producte. M'apassiona connectar equips de negoci i tècnics, transformar dades en insights accionables i fomentar la col·laboració. La meva trajectòria combina modelatge estadístic, disseny de dashboards, gestió d'stakeholders i ownership de producte en entorns àgils.",
      personalNote:
        "Resolc problemes amb creativitat i em moc bé en l'ambigüitat. M'encanta treballar en equip i gaudeixo implementant noves tecnologies i solucions amb IA i automatització. Em complemento amb perfils més orientats al detall. Parlo 6 idiomes — crec que les millors idees surten quan cadascú s'expressa en la seva llengua materna.",
      ctaCV: "Veure currículum",
      ctaProjects: "Veure projectes",
      stats: {
        experienceLabel: "Experiència",
        experienceValue: "Més de 4 anys",
        projectsLabel: "Projectes",
        projectsValue: "11 publicats",
        languagesLabel: "Idiomes",
        languagesValue: "6 parlats",
      },
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
        location: "Zuric 8064, Suïssa",
      },
      experiences: [
        {
          role: "Data & Analytics Specialist",
          company: "UBS Business Solutions AG – CAO & Risk Integration Office",
          location: "Zuric, CH",
          period: "Gener 2026 – Present",
          description: [
            "Construcció d'insights analítics que donen suport a la presa de decisions del management.",
            "Disseny i simplificació de models de dades per millorar la governança i la usabilitat.",
            "Automatització de reporting manual i ús d'eines d'IA i analytics per augmentar productivitat i escalabilitat.",
          ],
        },
        {
          role: "Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zuric, CH",
          period: "Novembre 2022 – Desembre 2025",
          description: [
            "Lideratge de la visió, desenvolupament i lliurament d'un producte de qualitat de dades de risc.",
            "Product Owner de dues eines crítiques: dashboard de detecció d'anomalies i motor de validació estadística.",
            "Gestió d'un pod cross-functional de 5 persones (IT i negoci) en cicles Agile complets, reduint el temps de projecte en un 50%.",
            "Lideratge de la migració de Tableau a Power BI dins la funció de risc.",
            "Traducció de sortides de models complexos en recomanacions accionables per a stakeholders sèniors.",
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
            "Avaluació de marketing mix, quantificant contribució de canal i eficiència d'inversió.",
            "Recomanacions estratègiques que van influir en decisions d'inversió i adquisició de clients.",
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
        "Anglès (Fluid)",
        "Francès (Fluid)",
        "Italià (Intermedi)",
        "Alemany (Intermedi)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "Disseny d'experiments",
        "Detecció d'anomalies",
        "Detecció d'outliers",
        "Disseny de dashboards",
        "Disseny de KPIs",
        "Modelatge de regressió",
        "Forecasting de vendes",
        "Anàlisi de ROI / ROAS / CPA",
        "Avaluació de marketing mix",
        "Gestió de stakeholders",
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
      featuredLabel: "Destacat",
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
      roleHeadline: "Senior Data Scientist & Product Owner",
      description:
        "Soy Gemma, Senior Data Scientist & Product Owner con más de 4 años de experiencia construyendo modelos que impulsan decisiones en marketing, riesgo y producto. Me apasiona conectar equipos de negocio y técnicos, transformar datos en insights accionables y fomentar la colaboración. Mi trayectoria combina modelado estadístico, diseño de dashboards, gestión de stakeholders y ownership de producto en entornos ágiles.",
      personalNote:
        "Resuelvo problemas con creatividad y me muevo bien en la ambigüedad. Me encanta el trabajo en equipo y disfruto implementando nuevas tecnologías y soluciones con IA y automatización. Me complemento con perfiles más orientados al detalle. Hablo 6 idiomas — creo que las mejores ideas surgen cuando cada uno se expresa en su lengua materna.",
      ctaCV: "Ver currículum",
      ctaProjects: "Ver proyectos",
      stats: {
        experienceLabel: "Experiencia",
        experienceValue: "Más de 4 años",
        projectsLabel: "Proyectos",
        projectsValue: "11 publicados",
        languagesLabel: "Idiomas",
        languagesValue: "6 hablados",
      },
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
        location: "Zúrich 8064, Suiza",
      },
      experiences: [
        {
          role: "Data & Analytics Specialist",
          company: "UBS Business Solutions AG – CAO & Risk Integration Office",
          location: "Zúrich, CH",
          period: "Enero 2026 – Presente",
          description: [
            "Construcción de insights analíticos que apoyan la toma de decisiones del management.",
            "Diseño y simplificación de modelos de datos para mejorar la gobernanza y la usabilidad.",
            "Automatización de reporting manual y uso de herramientas de IA y analytics para aumentar productividad y escalabilidad.",
          ],
        },
        {
          role: "Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zúrich, CH",
          period: "Noviembre 2022 – Diciembre 2025",
          description: [
            "Liderazgo de la visión, desarrollo y entrega de un producto de calidad de datos de riesgo.",
            "Product Owner de dos herramientas críticas: dashboard de detección de anomalías y motor de validación estadística.",
            "Gestión de un pod cross-functional de 5 personas (IT y negocio) en ciclos Agile completos, reduciendo el tiempo de proyecto en un 50%.",
            "Liderazgo de la migración de Tableau a Power BI dentro de la función de riesgo.",
            "Traducción de salidas de modelos complejos en recomendaciones accionables para stakeholders senior.",
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
            "Evaluación de marketing mix, cuantificando contribución de canal y eficiencia de inversión.",
            "Recomendaciones estratégicas que influyeron en decisiones de inversión y adquisición de clientes.",
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
        "Inglés (Fluido)",
        "Francés (Fluido)",
        "Italiano (Intermedio)",
        "Alemán (Intermedio)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "Diseño de experimentos",
        "Detección de anomalías",
        "Detección de outliers",
        "Diseño de dashboards",
        "Diseño de KPIs",
        "Modelado de regresión",
        "Forecasting de ventas",
        "Análisis de ROI / ROAS / CPA",
        "Evaluación de marketing mix",
        "Gestión de stakeholders",
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
      featuredLabel: "Destacado",
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
      roleHeadline: "Senior Data Scientist & Product Owner",
      description:
        "I'm Gemma, a Senior Data Scientist & Product Owner with over 4 years of experience building decision-driving models across marketing, risk, and product. I love bridging business and technical teams, turning data into actionable insights, and fostering collaboration. My background combines statistical modeling, dashboard design, stakeholder management, and product ownership in agile environments.",
      personalNote:
        "I solve problems creatively and feel at home in ambiguity. I love teamwork and enjoy implementing new technologies and solutions with AI and automation. I pair best with more detail-oriented teammates. I speak 6 languages — I believe the best ideas surface when people express themselves in their mother tongue.",
      ctaCV: "See CV",
      ctaProjects: "See projects",
      stats: {
        experienceLabel: "Experience",
        experienceValue: "4+ years",
        projectsLabel: "Projects",
        projectsValue: "11 published",
        languagesLabel: "Languages",
        languagesValue: "6 spoken",
      },
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
        location: "Zurich 8064, Switzerland",
      },
      experiences: [
        {
          role: "Data & Analytics Specialist",
          company: "UBS Business Solutions AG – CAO & Risk Integration Office",
          location: "Zurich, CH",
          period: "January 2026 – Present",
          description: [
            "Build analytical insights that support management decision-making.",
            "Design and simplify data models to improve governance and usability.",
            "Automate manual reporting and leverage AI and analytics tools to increase productivity and scalability.",
          ],
        },
        {
          role: "Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zurich, CH",
          period: "November 2022 – December 2025",
          description: [
            "Led the vision, development and delivery of a risk data quality product.",
            "Product Owner for two critical tools: an anomaly detection dashboard and a statistical validation engine.",
            "Managed a cross-functional pod of 5 (IT and business) through full agile cycles, cutting project time by 50%.",
            "Championed the Tableau to Power BI migration across the risk function.",
            "Translated complex model outputs into actionable recommendations for senior stakeholders.",
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
            "Supported marketing mix evaluation, quantifying channel contribution and investment efficiency.",
            "Delivered strategic recommendations that shaped campaign investment and customer acquisition strategy.",
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
        "English (Fluent)",
        "French (Fluent)",
        "Italian (Intermediate)",
        "German (Intermediate)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "Experiment Design",
        "Anomaly Detection",
        "Outlier Detection",
        "Dashboard Design",
        "KPI Design",
        "Regression Modeling",
        "Sales Forecasting",
        "ROI / ROAS / CPA Analysis",
        "Marketing Mix Evaluation",
        "Stakeholder Management",
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
      featuredLabel: "Featured",
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
      roleHeadline: "Senior Data Scientist & Product Owner",
      description:
        "Je suis Gemma, Senior Data Scientist & Product Owner avec plus de 4 ans d'expérience à construire des modèles qui orientent les décisions en marketing, risque et produit. Je suis passionnée par le rapprochement des équipes business et techniques, la transformation des données en insights actionnables et la collaboration. Mon parcours combine modélisation statistique, conception de dashboards, gestion des parties prenantes et product ownership en environnement Agile.",
      personalNote:
        "Je résous les problèmes avec créativité et je suis à l'aise dans l'ambiguïté. J'adore le travail en équipe et j'apprécie de mettre en œuvre de nouvelles technologies et solutions avec l'IA et l'automatisation. Je me complète avec des profils plus orientés détail. Je parle 6 langues — je crois que les meilleures idées émergent quand chacun s'exprime dans sa langue maternelle.",
      ctaCV: "Voir le CV",
      ctaProjects: "Voir les projets",
      stats: {
        experienceLabel: "Expérience",
        experienceValue: "Plus de 4 ans",
        projectsLabel: "Projets",
        projectsValue: "11 publiés",
        languagesLabel: "Langues",
        languagesValue: "6 parlées",
      },
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
        location: "Zurich 8064, Suisse",
      },
      experiences: [
        {
          role: "Data & Analytics Specialist",
          company: "UBS Business Solutions AG – CAO & Risk Integration Office",
          location: "Zurich, CH",
          period: "Janvier 2026 – Présent",
          description: [
            "Construction d'insights analytiques qui soutiennent la prise de décision du management.",
            "Conception et simplification de modèles de données pour améliorer la gouvernance et l'usabilité.",
            "Automatisation du reporting manuel et utilisation d'outils d'IA et d'analytics pour accroître productivité et scalabilité.",
          ],
        },
        {
          role: "Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zurich, CH",
          period: "Novembre 2022 – Décembre 2025",
          description: [
            "Pilotage de la vision, du développement et de la livraison d'un produit de qualité des données de risque.",
            "Product Owner de deux outils critiques : dashboard de détection d'anomalies et moteur de validation statistique.",
            "Gestion d'un pod cross-functional de 5 personnes (IT et métier) en cycles Agile complets, réduisant le time-to-market de 50 %.",
            "Pilotage de la migration Tableau vers Power BI dans la fonction risque.",
            "Traduction des sorties de modèles complexes en recommandations actionnables pour les stakeholders seniors.",
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
            "Évaluation du marketing mix, quantifiant la contribution par canal et l'efficacité des investissements.",
            "Recommandations stratégiques influençant les décisions d'investissement et d'acquisition.",
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
        "Anglais (Courant)",
        "Français (Courant)",
        "Italien (Intermédiaire)",
        "Allemand (Intermédiaire)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "Conception d'expériences",
        "Détection d'anomalies",
        "Détection d'outliers",
        "Conception de dashboards",
        "Conception de KPI",
        "Modélisation de régression",
        "Prévision des ventes",
        "Analyse ROI / ROAS / CPA",
        "Évaluation du marketing mix",
        "Gestion des stakeholders",
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
      featuredLabel: "Mis en avant",
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
      roleHeadline: "Senior Data Scientist & Product Owner",
      description:
        "Ich bin Gemma, Senior Data Scientist & Product Owner mit über 4 Jahren Erfahrung im Aufbau von Modellen, die Entscheidungen in Marketing, Risk und Product vorantreiben. Ich verbinde gerne Business- und Tech-Teams, mache aus Daten handlungsleitende Insights und fördere Zusammenarbeit. Mein Hintergrund umfasst statistische Modellierung, Dashboard-Design, Stakeholder-Management und Product Ownership in agilen Umgebungen.",
      personalNote:
        "Ich löse Probleme kreativ und fühle mich in Ambiguität wohl. Ich liebe Teamarbeit und setze gerne neue Technologien und Lösungen mit KI und Automatisierung um. Ich ergänze mich am besten mit detailorientierteren Profilen. Ich spreche 6 Sprachen — ich glaube, die besten Ideen entstehen, wenn jeder in seiner Muttersprache spricht.",
      ctaCV: "Lebenslauf ansehen",
      ctaProjects: "Projekte ansehen",
      stats: {
        experienceLabel: "Erfahrung",
        experienceValue: "Über 4 Jahre",
        projectsLabel: "Projekte",
        projectsValue: "11 veröffentlicht",
        languagesLabel: "Sprachen",
        languagesValue: "6 gesprochen",
      },
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
        location: "Zürich 8064, Schweiz",
      },
      experiences: [
        {
          role: "Data & Analytics Specialist",
          company: "UBS Business Solutions AG – CAO & Risk Integration Office",
          location: "Zürich, CH",
          period: "Januar 2026 – Gegenwart",
          description: [
            "Aufbau analytischer Insights zur Unterstützung von Management-Entscheidungen.",
            "Design und Vereinfachung von Datenmodellen zur Verbesserung von Governance und Usability.",
            "Automatisierung manuellen Reportings und Einsatz von KI- und Analytics-Tools für mehr Produktivität und Skalierbarkeit.",
          ],
        },
        {
          role: "Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zürich, CH",
          period: "November 2022 – Dezember 2025",
          description: [
            "Leitung der Vision, Entwicklung und Auslieferung eines Produkts zur Risikodatenqualität.",
            "Product Owner für zwei kritische Tools: Anomalie-Dashboard und statistische Validierungs-Engine.",
            "Steuerung eines cross-funktionalen Pods aus 5 Mitgliedern (IT und Business) in vollen Agile-Zyklen, Projektzeit um 50 % reduziert.",
            "Treiber der Migration von Tableau zu Power BI innerhalb der Risk-Funktion.",
            "Übersetzung komplexer Modellergebnisse in handlungsleitende Empfehlungen für Senior-Stakeholder.",
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
            "Marketing-Mix-Bewertung: Kanalbeitrag und Investitionseffizienz quantifiziert.",
            "Strategische Empfehlungen, die Entscheidungen zu Kampagneninvestitionen und Kundenakquise geprägt haben.",
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
        "Englisch (Fliessend)",
        "Französisch (Fliessend)",
        "Italienisch (Mittelstufe)",
        "Deutsch (Mittelstufe)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "Experiment-Design",
        "Anomalieerkennung",
        "Outlier Detection",
        "Dashboard-Design",
        "KPI-Design",
        "Regressionsmodellierung",
        "Umsatzprognose",
        "ROI / ROAS / CPA-Analyse",
        "Marketing-Mix-Bewertung",
        "Stakeholder-Management",
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
      featuredLabel: "Hervorgehoben",
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
      roleHeadline: "Senior Data Scientist & Product Owner",
      description:
        "Sono Gemma, Senior Data Scientist & Product Owner con oltre 4 anni di esperienza nella costruzione di modelli che guidano le decisioni in marketing, rischio e prodotto. Mi appassiona collegare team business e tecnici, trasformare i dati in insights azionabili e favorire la collaborazione. Il mio background combina modellazione statistica, design di dashboard, gestione degli stakeholder e product ownership in ambienti agili.",
      personalNote:
        "Risolvo problemi con creatività e mi sento a mio agio nell'ambiguità. Adoro il lavoro in team e mi piace implementare nuove tecnologie e soluzioni con IA e automazione. Mi completo al meglio con profili più orientati al dettaglio. Parlo 6 lingue — credo che le idee migliori emergano quando ognuno si esprime nella propria lingua madre.",
      ctaCV: "Vedi CV",
      ctaProjects: "Vedi progetti",
      stats: {
        experienceLabel: "Esperienza",
        experienceValue: "Oltre 4 anni",
        projectsLabel: "Progetti",
        projectsValue: "11 pubblicati",
        languagesLabel: "Lingue",
        languagesValue: "6 parlate",
      },
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
        location: "Zurigo 8064, Svizzera",
      },
      experiences: [
        {
          role: "Data & Analytics Specialist",
          company: "UBS Business Solutions AG – CAO & Risk Integration Office",
          location: "Zurigo, CH",
          period: "Gennaio 2026 – Presente",
          description: [
            "Costruzione di insight analitici a supporto delle decisioni del management.",
            "Progettazione e semplificazione di modelli di dati per migliorare governance e usabilità.",
            "Automazione del reporting manuale e utilizzo di strumenti di IA e analytics per aumentare produttività e scalabilità.",
          ],
        },
        {
          role: "Data Scientist & Product Owner",
          company: "UBS Business Solutions AG",
          location: "Zurigo, CH",
          period: "Novembre 2022 – Dicembre 2025",
          description: [
            "Guida della vision, sviluppo e consegna di un prodotto di qualità dei dati di rischio.",
            "Product Owner di due strumenti critici: dashboard di rilevamento anomalie e motore di validazione statistica.",
            "Gestione di un pod cross-funzionale di 5 persone (IT e business) in cicli Agile completi, riducendo del 50% il tempo di progetto.",
            "Guida della migrazione da Tableau a Power BI nella funzione rischio.",
            "Traduzione degli output di modelli complessi in raccomandazioni azionabili per stakeholder senior.",
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
            "Valutazione del marketing mix, quantificando il contributo per canale e l'efficienza dell'investimento.",
            "Raccomandazioni strategiche che hanno influenzato le decisioni di investimento e acquisizione clienti.",
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
        "Inglese (Fluente)",
        "Francese (Fluente)",
        "Italiano (Intermedio)",
        "Tedesco (Intermedio)",
      ],
      techStack,
      methodologies: [
        "Agile (Scrum)",
        "Design degli esperimenti",
        "Rilevamento anomalie",
        "Rilevamento outlier",
        "Design di dashboard",
        "Design di KPI",
        "Modellazione di regressione",
        "Previsione vendite",
        "Analisi ROI / ROAS / CPA",
        "Valutazione del marketing mix",
        "Gestione degli stakeholder",
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
      featuredLabel: "In evidenza",
      projects: buildProjects("italian"),
    },
  },
};

// ---------------------------------------------------------------------------
// CV VARIANTS
// Each variant re-angles the same factual CV for a family of roles: it swaps the
// summary, reorders education (so the most relevant degrees lead) and reorders
// methodologies. Nothing here invents facts — every item also exists in cv.*.
// Applied by CvBuilderSection via applyCvVariant(); `null`/absent fields fall
// back to the base CV. Currently authored for English output only.
// ---------------------------------------------------------------------------
export const CV_VARIANTS = [
  {
    id: "",
    label: "— Base (general) —",
  },
  {
    id: "consumer",
    label: "Consumer Insights & Marketing Science",
    summary:
      "Senior Data Scientist with a background in statistics and psychology and 4+ years turning measurement into business decisions. Specialised in consumer and marketing measurement, KPI framework design, and translating complex data into clear strategic recommendations for senior stakeholders. Experienced defining success metrics across markets and channels, evaluating marketing mix and channel contribution, and leading cross-functional delivery in global organisations.",
    education: [
      "BSc in Statistics — Universitat Politècnica de Catalunya (UPC), 2015–2019",
      "BSc in Psychology — Universitat de Barcelona (UB), 2014–2019",
      "MSc in Data Science — Universitat Oberta de Catalunya (UOC), 2020–2022",
      "MSc in Financial Management — Universitat Oberta de Catalunya (UOC), 2022–2024",
    ],
    methodologies: [
      "KPI Design",
      "Experiment Design",
      "Marketing Mix Evaluation",
      "ROI / ROAS / CPA Analysis",
      "Regression Modeling",
      "Sales Forecasting",
      "Stakeholder Management",
      "Dashboard Design",
      "Agile (Scrum)",
    ],
  },
  {
    id: "industrial",
    label: "Industrial & Process Analytics",
    summary:
      "Senior Data Scientist with a strong foundation in statistics and 4+ years building decision-driving models in regulated, data-critical environments. Specialised in anomaly and outlier detection, statistical validation, and turning model outputs into operational decisions. Experienced refactoring production Python pipelines for scalability and testing, and leading cross-functional delivery as Product Owner in agile environments.",
    methodologies: [
      "Anomaly Detection",
      "Outlier Detection",
      "Experiment Design",
      "Regression Modeling",
      "Forecasting",
      "KPI Design",
      "Dashboard Design",
      "Stakeholder Management",
      "Agile (Scrum)",
    ],
  },
  {
    id: "dataeng",
    label: "Data / Analytics Engineering",
    summary:
      "Senior Data Scientist with 4+ years bridging business needs and technical delivery. Strong in SQL, Python and Power BI — led a Tableau to Power BI migration across a risk function and refactored production Python data pipelines for scalability, testing and deployment readiness. Experienced as Product Owner translating business requirements into data products for cross-functional teams.",
    methodologies: [
      "Dashboard Design",
      "KPI Design",
      "Data Quality & Validation",
      "Anomaly Detection",
      "Regression Modeling",
      "Stakeholder Management",
      "Agile (Scrum)",
    ],
  },
];

// Merge a variant onto a language's cv object. Unknown/empty id → unchanged.
export function applyCvVariant(cv, variantId) {
  if (!cv || !variantId) return cv;
  const v = CV_VARIANTS.find((x) => x.id === variantId);
  if (!v) return cv;
  return {
    ...cv,
    ...(v.summary ? { summary: v.summary } : {}),
    ...(v.education ? { education: v.education } : {}),
    ...(v.methodologies ? { methodologies: v.methodologies } : {}),
  };
}

export default translations;
