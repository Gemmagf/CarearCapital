// src/translations/translations.js
const translations = {
  catalan: {
    name: "Nom de la Persona",
    nav: {
      home: "Inici",
      experience: "Experiència",
      personalProjects: "Projectes Personals",
      skills: "CV",
      contact: "Contacte",
    },
    homeSection: {
      welcome: "Benvingut al meu portfolio!",
    },
    projects: [
      {
        title: "Producte de Qualitat de Dades de Risc",
        description: "Lideratge del producte per millorar la qualitat de dades de risc a UBS.",
        image: "https://via.placeholder.com/400x250/4A4A4A/FFFFFF?text=Risk+Data+Quality",
      },
      {
        title: "Dashboard de Detecció d'Anomalies",
        description: "Product Owner d'una eina clau per detectar anomalies en dades crítiques.",
        image: "https://via.placeholder.com/400x250/6B6B6B/FFFFFF?text=Anomaly+Detection",
      },
      {
        title: "Motor de Validació Estadística",
        description: "Gestió d'un motor per validar dades estadísticament, reduint temps de projecte un 50%.",
        image: "https://via.placeholder.com/400x250/8C8C8C/FFFFFF?text=Statistical+Validation",
      },
    ],
    personalProjects: [
      {
        title: "Anàlisi de Sentiments en Xarxes Socials",
        description: "Projecte personal per analitzar el sentiment de tuits amb NLP i models de classificació.",
        link: "https://github.com/tuusuario/sentiment-analysis-project",
        futureIdeas: "Integrar amb altres xarxes socials i crear un dashboard interactiu en temps real.",
      },
      {
        title: "Simulador de Mercat de Valors",
        description: "Aplicació web per simular inversions sense risc real amb visualitzacions amb Plotly.",
        link: "https://github.com/tuusuario/stock-market-simulator",
        futureIdeas: "Afegir backtesting i connexió amb APIs de brokers reals.",
      },
    ],
    experience: [
      {
        company: "UBS",
        role: "Data Product Owner",
        description: "Gestió i desenvolupament de productes de dades de risc.",
      },
      {
        company: "Empresa XYZ",
        role: "Data Analyst",
        description: "Anàlisi de dades i creació de dashboards per a la presa de decisions.",
      },
    ],
    contact: {
      email: "Correu electrònic",
      phone: "Telèfon",
    },
  },

  english: {
    name: "Your Name",
    nav: {
      home: "Home",
      experience: "Experience",
      personalProjects: "Personal Projects",
      skills: "CV",
      contact: "Contact",
    },
    homeSection: {
      welcome: "Welcome to my portfolio!",
    },
    projects: [
      {
        title: "Risk Data Quality Product",
        description: "Led the product to improve risk data quality at UBS.",
        image: "https://via.placeholder.com/400x250/4A4A4A/FFFFFF?text=Risk+Data+Quality",
      },
      {
        title: "Anomaly Detection Dashboard",
        description: "Product Owner of a key tool to detect anomalies in critical data.",
        image: "https://via.placeholder.com/400x250/6B6B6B/FFFFFF?text=Anomaly+Detection",
      },
      {
        title: "Statistical Validation Engine",
        description: "Managed a statistical validation engine, reducing project times by 50%.",
        image: "https://via.placeholder.com/400x250/8C8C8C/FFFFFF?text=Statistical+Validation",
      },
    ],
    personalProjects: [
      {
        title: "Social Media Sentiment Analysis",
        description: "Personal project to analyze tweet sentiment with NLP and classification models.",
        link: "https://github.com/tuusuario/sentiment-analysis-project",
        futureIdeas: "Integrate other social media APIs and create a live interactive dashboard.",
      },
      {
        title: "Stock Market Simulator",
        description: "Web app to simulate stock investments without real risk using Plotly charts.",
        link: "https://github.com/tuusuario/stock-market-simulator",
        futureIdeas: "Add backtesting and connect to real broker APIs.",
      },
    ],
    experience: [
      {
        company: "UBS",
        role: "Data Product Owner",
        description: "Managed and developed risk data products.",
      },
      {
        company: "XYZ Company",
        role: "Data Analyst",
        description: "Data analysis and dashboard creation for decision-making.",
      },
    ],
    contact: {
      email: "Email",
      phone: "Phone",
    },
  },
};

export default translations;
