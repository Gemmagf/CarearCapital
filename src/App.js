import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import HomeSection from './components/HomeSection';
import ExperienceSection from './components/ExperienceSection';
import LanguagesSection from './components/LanguagesSection';
import PersonalProjectsSection from './components/PersonalProjectsSection';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';

// Objeto de traducciones
const translations = {
  catalan: {
    name: 'Gemma García de la Fuente',
    nav: {
      home: 'Inici',
      experience: 'Experiència',
      personalProjects: 'Projectes Personals',
      skills: 'Habilitats',
      contact: 'Contacte',
    },
    home: {
      greeting: 'Hola! Sóc',
      title: 'Gemma García de la Fuente',
      description: 'Data Scientist & Product Owner amb més de 4 anys d\'experiència transformant dades en solucions impactants. Explora els meus projectes i la meva trajectòria professional.',
      exploreProjects: 'Explorar Projectes',
      myProfile: 'El meu Perfil',
    },
    experience: {
      title: 'La Meva Experiència Professional',
      job1: {
        title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
        company: 'UBS Business Solutions AG',
        years: 'Nov 2022 - Actualitat',
        shortDescription: 'Vaig liderar la visió, desenvolupament i entrega d\'un producte de qualitat de dades de risc.',
        detailedDescription: 'En aquest rol, vaig ser responsable de l\'estratègia i execució de productes de dades, incloent un dashboard per a detecció d\'anomalies i un motor de validació estadística. Vaig gestionar un equip àgil de 5 membres (IT i negoci), aconseguint una reducció del 50% en el temps de projecte. Vaig ser clau en la transició de Tableau a Power BI, assegurant l\'adopció interna dels productes de dades.',
      },
    },
    languages: {
      title: 'Idiomes',
      native: 'Natiu',
      c2: 'C2 - Mestratge',
      c1: 'C1 - Avançat',
      b2: 'B2 - Intermedi Alt',
      b1: 'B1 - Intermedi',
      alert: (lang) => `Canviant l'idioma de l'app a: ${lang}`,
    },
    personalProjects: {
      title: 'Projectes Personals',
      project1: {
        title: 'Anàlisi de Sentiments en Xarxes Socials',
        description: 'Projecte personal per analitzar el sentiment de tuits sobre un tema específic utilitzant NLP i models de classificació. Exploració de llibreries com NLTK i scikit-learn.',
        linkText: 'Veure Projecte (GitHub)',
        futureIdeas: 'Integrar amb APIs d\'altres xarxes socials i desenvolupar un dashboard interactiu en temps real.',
      },
      project2: {
        title: 'Simulador de Mercat de Valors',
        description: 'Aplicació web per simular inversions en el mercat de valors, permetent als usuaris provar estratègies sense risc real. Ús de dades històriques i visualitzacions amb Plotly.',
        linkText: 'Veure Projecte (GitHub)',
        futureIdeas: 'Afegir funcionalitats de backtesting d\'estratègies i connexió amb APIs de brokers reals per a dades en viu.',
      },
    },
    skills: {
      title: 'Habilitats i Formació',
      experienceTitle: 'Experiència',
      educationTitle: 'Formació',
      keySkillsTitle: 'Habilitats Clau',
    },
    contact: {
      title: 'Contacte',
      intro: 'Per a col·laboracions o consultes, no dubtis en contactar-me.',
      nameLabel: 'Nom',
      namePlaceholder: 'El teu nom',
      emailLabel: 'Email',
      emailPlaceholder: 'el.teu.email@exemple.com',
      messageLabel: 'Missatge',
      messagePlaceholder: 'Escriu el teu missatge aquí...',
      sendButton: 'Enviar Missatge',
      connectWithMe: 'Connecta amb mi:',
    },
  },
  spanish: {
    name: 'Gemma García de la Fuente',
    nav: {
      home: 'Inicio',
      experience: 'Experiencia',
      personalProjects: 'Proyectos Personales',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    home: {
      greeting: '¡Hola! Soy',
      title: 'Gemma García de la Fuente',
      description: 'Data Scientist & Product Owner con más de 4 años de experiencia transformando datos en soluciones impactantes. Explora mis proyectos y mi trayectoria profesional.',
      exploreProjects: 'Explorar Proyectos',
      myProfile: 'Mi Perfil',
    },
    experience: {
      title: 'Mi Experiencia Profesional',
      job1: {
        title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
        company: 'UBS Business Solutions AG',
        years: 'Nov 2022 - Actualidad',
        shortDescription: 'Lideré la visión, desarrollo y entrega de un producto de calidad de datos de riesgo.',
        detailedDescription: 'En este rol, fui responsable de la estrategia y ejecución de productos de datos, incluyendo un dashboard para detección de anomalías y un motor de validación estadística. Gestioné un equipo ágil de 5 miembros (IT y negocio), logrando una reducción del 50% en el tiempo de proyecto. Fui clave en la transición de Tableau a Power BI, asegurando la adopción interna de los productos de datos.',
      },
    },
    languages: {
      title: 'Idiomas',
      native: 'Nativo',
      c2: 'C2 - Maestría',
      c1: 'C1 - Avanzado',
      b2: 'B2 - Intermedio Alto',
      b1: 'B1 - Intermedio',
      alert: (lang) => `Cambiando el idioma de la app a: ${lang}`,
    },
    personalProjects: {
      title: 'Proyectos Personales',
      project1: {
        title: 'Análisis de Sentimientos en Redes Sociales',
        description: 'Proyecto personal para analizar el sentimiento de tweets sobre un tema específico utilizando NLP y modelos de clasificación. Exploración de librerías como NLTK y scikit-learn.',
        linkText: 'Ver Proyecto (GitHub)',
        futureIdeas: 'Integrar con APIs de otras redes sociales y desarrollar un dashboard interactivo en tiempo real.',
      },
      project2: {
        title: 'Simulador de Mercado de Valores',
        description: 'Aplicación web para simular inversiones en el mercado de valores, permitiendo a los usuarios probar estrategias sin riesgo real. Uso de datos históricos y visualizaciones con Plotly.',
        linkText: 'Ver Proyecto (GitHub)',
        futureIdeas: 'Añadir funcionalidades de backtesting de estrategias y conexión con APIs de brokers reales para datos en vivo.',
      },
    },
    skills: {
      title: 'Habilidades y Formación',
      experienceTitle: 'Experiencia',
      educationTitle: 'Formación',
      keySkillsTitle: 'Habilidades Clave',
    },
    contact: {
      title: 'Contacto',
      intro: 'Para colaboraciones o consultas, no dudes en contactarme.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Email',
      emailPlaceholder: 'tu.email@ejemplo.com',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje aquí...',
      sendButton: 'Enviar Mensaje',
      connectWithMe: 'Conecta conmigo:',
    },
  },
  english: {
    name: 'Gemma García de la Fuente',
    nav: {
      home: 'Home',
      experience: 'Experience',
      personalProjects: 'Personal Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    home: {
      greeting: 'Hello! I\'m',
      title: 'Gemma García de la Fuente',
      description: 'Data Scientist & Product Owner with over 4 years of experience transforming data into impactful solutions. Explore my projects and professional journey.',
      exploreProjects: 'Explore Projects',
      myProfile: 'My Profile',
    },
    experience: {
      title: 'My Professional Experience',
      job1: {
        title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
        company: 'UBS Business Solutions AG',
        years: 'Nov 2022 - Present',
        shortDescription: 'Led the vision, development, and delivery of a risk data quality product.',
        detailedDescription: 'In this role, I was responsible for the strategy and execution of data products, including a dashboard for anomaly detection and a statistical validation engine. I managed an agile team of 5 members (IT and business), achieving a 50% reduction in project time. I was key in the transition from Tableau to Power BI, ensuring internal adoption of data products.',
      },
    },
    languages: {
      title: 'Languages',
      native: 'Native',
      c2: 'C2 - Mastery',
      c1: 'C1 - Advanced',
      b2: 'B2 - Upper Intermediate',
      b1: 'B1 - Intermediate',
      alert: (lang) => `Changing app language to: ${lang}`,
    },
    personalProjects: {
      title: 'Personal Projects',
      project1: {
        title: 'Social Media Sentiment Analysis',
        description: 'Personal project to analyze the sentiment of tweets on a specific topic using NLP and classification models. Exploration of libraries like NLTK and scikit-learn.',
        linkText: 'View Project (GitHub)',
        futureIdeas: 'Integrate with other social media APIs and develop a real-time interactive dashboard.',
      },
      project2: {
        title: 'Stock Market Simulator',
        description: 'Web application to simulate stock market investments, allowing users to test strategies without real risk. Use of historical data and visualizations with Plotly.',
        linkText: 'View Project (GitHub)',
        futureIdeas: 'Add strategy backtesting functionalities and connect with real broker APIs for live data.',
      },
    },
    skills: {
      title: 'Skills and Education',
      experienceTitle: 'Experience',
      educationTitle: 'Education',
      keySkillsTitle: 'Key Skills',
    },
    contact: {
      title: 'Contact',
      intro: 'For collaborations or inquiries, feel free to contact me.',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your.email@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Write your message here...',
      sendButton: 'Send Message',
      connectWithMe: 'Connect with me:',
    },
  },
  german: {
    name: 'Gemma García de la Fuente',
    nav: {
      home: 'Startseite',
      experience: 'Erfahrung',
      personalProjects: 'Persönliche Projekte',
      skills: 'Fähigkeiten',
      contact: 'Kontakt',
    },
    home: {
      greeting: 'Hallo! Ich bin',
      title: 'Gemma García de la Fuente',
      description: 'Data Scientist & Product Owner mit über 4 Jahren Erfahrung in der Umwandlung von Daten in wirkungsvolle Lösungen. Entdecken Sie meine Projekte und meinen beruflichen Werdegang.',
      exploreProjects: 'Projekte erkunden',
      myProfile: 'Mein Profil',
    },
    experience: {
      title: 'Meine Berufserfahrung',
      job1: {
        title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
        company: 'UBS Business Solutions AG',
        years: 'Nov 2022 - Heute',
        shortDescription: 'Ich leitete die Vision, Entwicklung und Bereitstellung eines Produkts zur Risikodatenqualität.',
        detailedDescription: 'In dieser Rolle war ich verantwortlich für die Strategie und Ausführung von Datenprodukten, einschließlich eines Dashboards zur Anomalieerkennung und einer statistischen Validierungs-Engine. Ich leitete ein agiles Team von 5 Mitgliedern (IT und Business) und erreichte eine Projektzeitverkürzung von 50%. Ich war maßgeblich am Übergang von Tableau zu Power BI beteiligt und stellte die interne Akzeptanz der Datenprodukte sicher.',
      },
    },
    languages: {
      title: 'Sprachen',
      native: 'Muttersprache',
      c2: 'C2 - Beherrschung',
      c1: 'C1 - Fortgeschritten',
      b2: 'B2 - Oberstufe',
      b1: 'B1 - Mittelstufe',
      alert: (lang) => `App-Sprache ändern zu: ${lang}`,
    },
    personalProjects: {
      title: 'Persönliche Projekte',
      project1: {
        title: 'Stimmungsanalyse in sozialen Medien',
        description: 'Persönliches Projekt zur Analyse der Stimmung von Tweets zu einem bestimmten Thema mithilfe von NLP- und Klassifizierungsmodellen. Erkundung von Bibliotheken wie NLTK und scikit-learn.',
        linkText: 'Projekt ansehen (GitHub)',
        futureIdeas: 'Integration mit anderen Social-Media-APIs und Entwicklung eines interaktiven Echtzeit-Dashboards.',
      },
      project2: {
        title: 'Börsensimulator',
        description: 'Webanwendung zur Simulation von Börseninvestitionen, die es Benutzern ermöglicht, Strategien ohne echtes Risiko zu testen. Verwendung historischer Daten und Visualisierungen mit Plotly.',
        linkText: 'Projekt ansehen (GitHub)',
        futureIdeas: 'Hinzufügen von Strategie-Backtesting-Funktionen und Verbindung mit echten Broker-APIs für Live-Daten.',
      },
    },
    skills: {
      title: 'Fähigkeiten und Ausbildung',
      experienceTitle: 'Erfahrung',
      educationTitle: 'Ausbildung',
      keySkillsTitle: 'Schlüsselqualifikationen',
    },
    contact: {
      title: 'Kontakt',
      intro: 'Für Kooperationen oder Anfragen können Sie mich gerne kontaktieren.',
      nameLabel: 'Name',
      namePlaceholder: 'Ihr Name',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'ihre.email@beispiel.com',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Schreiben Sie hier Ihre Nachricht...',
      sendButton: 'Nachricht senden',
      connectWithMe: 'Verbinden Sie sich mit mir:',
    },
  },
  french: {
    name: 'Gemma García de la Fuente',
    nav: {
      home: 'Accueil',
      experience: 'Expérience',
      personalProjects: 'Projets Personnels',
      skills: 'Compétences',
      contact: 'Contact',
    },
    home: {
      greeting: 'Bonjour! Je suis',
      title: 'Gemma García de la Fuente',
      description: 'Data Scientist & Product Owner avec plus de 4 ans d\'expérience dans la transformation des données en solutions percutantes. Explorez mes projets et mon parcours professionnel.',
      exploreProjects: 'Explorer les projets',
      myProfile: 'Mon profil',
    },
    experience: {
      title: 'Mon Expérience Professionnelle',
      job1: {
        title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
        company: 'UBS Business Solutions AG',
        years: 'Nov 2022 - Présent',
        shortDescription: 'J\'ai dirigé la vision, le développement et la livraison d\'un produit de qualité des données de risque.',
        detailedDescription: 'Dans ce rôle, j\'étais responsable de la stratégie et de l\'exécution des produits de données, y compris un tableau de bord pour la détection d\'anomalies et un moteur de validation statistique. J\'ai géré une équipe agile de 5 membres (IT et business), réalisant une réduction de 50% du temps de projet. J\'ai joué un rôle clé dans la transition de Tableau à Power BI, assurant l\'adoption interne des produits de données.',
      },
    },
    languages: {
      title: 'Langues',
      native: 'Langue maternelle',
      c2: 'C2 - Maîtrise',
      c1: 'C1 - Avancé',
      b2: 'B2 - Intermédiaire Supérieur',
      b1: 'B1 - Intermédiaire',
      alert: (lang) => `Changement de la langue de l'application à : ${lang}`,
    },
    personalProjects: {
      title: 'Projets Personnels',
      project1: {
        title: 'Analyse des sentiments sur les réseaux sociaux',
        description: 'Projet personnel pour analyser le sentiment des tweets sur un sujet spécifique à l\'aide de modèles NLP et de classification. Exploration de bibliothèques comme NLTK et scikit-learn.',
        linkText: 'Voir le projet (GitHub)',
        futureIdeas: 'Intégrer avec d\'autres API de réseaux sociaux et développer un tableau de bord interactif en temps réel.',
      },
      project2: {
        title: 'Simulateur de marché boursier',
        description: 'Application web pour simuler des investissements boursiers, permettant aux utilisateurs de tester des stratégies sans risque réel. Utilisation de données historiques et de visualisations avec Plotly.',
        linkText: 'Voir le projet (GitHub)',
        futureIdeas: 'Ajouter des fonctionnalités de backtesting de stratégie et se connecter aux API de courtiers réels pour des données en direct.',
      },
    },
    skills: {
      title: 'Compétences et Formation',
      experienceTitle: 'Expérience',
      educationTitle: 'Formation',
      keySkillsTitle: 'Compétences clés',
    },
    contact: {
      title: 'Contact',
      intro: 'Pour des collaborations ou des demandes de renseignements, n\'hésitez pas à me contacter.',
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom',
      emailLabel: 'E-mail',
      emailPlaceholder: 'votre.email@exemple.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Écrivez votre message ici...',
      sendButton: 'Envoyer le message',
      connectWithMe: 'Connectez-vous avec moi :',
    },
  },
  italian: {
    name: 'Gemma García de la Fuente',
    nav: {
      home: 'Home',
      experience: 'Esperienza',
      personalProjects: 'Progetti Personali',
      skills: 'Competenze',
      contact: 'Contatto',
    },
    home: {
      greeting: 'Ciao! Sono',
      title: 'Gemma García de la Fuente',
      description: 'Data Scientist & Product Owner con oltre 4 anni di esperienza nella trasformazione dei dati in soluzioni di impatto. Esplora i miei progetti e il mio percorso professionale.',
      exploreProjects: 'Esplora Progetti',
      myProfile: 'Il mio Profilo',
    },
    experience: {
      title: 'La Mia Esperienza Professionale',
      job1: {
        title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
        company: 'UBS Business Solutions AG',
        years: 'Nov 2022 - Presente',
        shortDescription: 'Ho guidato la visione, lo sviluppo e la consegna di un prodotto di qualità dei dati di rischio.',
        detailedDescription: 'In questo ruolo, sono stata responsabile della strategia e dell\'esecuzione dei prodotti dati, inclusa una dashboard per il rilevamento delle anomalie e un motore di validazione statistica. Ho gestito un team agile di 5 membri (IT e business), ottenendo una riduzione del 50% del tempo di progetto. Sono stata fondamentale nella transizione da Tableau a Power BI, garantendo l\'adozione interna dei prodotti dati.',
      },
    },
    languages: {
      title: 'Lingue',
      native: 'Madrelingua',
      c2: 'C2 - Padronanza',
      c1: 'C1 - Avanzato',
      b2: 'B2 - Intermedio Superiore',
      b1: 'B1 - Intermedio',
      alert: (lang) => `Cambio lingua app a: ${lang}`,
    },
    personalProjects: {
      title: 'Progetti Personali',
      project1: {
        title: 'Analisi del sentiment sui social media',
        description: 'Progetto personale per analizzare il sentiment dei tweet su un argomento specifico utilizzando NLP e modelli di classificazione. Esplorazione di librerie come NLTK e scikit-learn.',
        linkText: 'Vedi Progetto (GitHub)',
        futureIdeas: 'Integrare con altre API di social media e sviluppare una dashboard interattiva in tempo reale.',
      },
      project2: {
        title: 'Simulatore di mercato azionario',
        description: 'Applicazione web per simulare investimenti nel mercato azionario, consentendo agli utenti di testare strategie senza rischio reale. Utilizzo di dati storici e visualizzazioni con Plotly.',
        linkText: 'Vedi Progetto (GitHub)',
        futureIdeas: 'Aggiungere funzionalità di backtesting delle strategie e connettersi con API di broker reali per dati in tempo reale.',
      },
    },
    skills: {
      title: 'Competenze e Formazione',
      experienceTitle: 'Esperienza',
      educationTitle: 'Istruzione',
      keySkillsTitle: 'Competenze chiave',
    },
    contact: {
      title: 'Contatto',
      intro: 'Per collaborazioni o richieste, non esitare a contattarmi.',
      nameLabel: 'Nome',
      namePlaceholder: 'Il tuo nome',
      emailLabel: 'Email',
      emailPlaceholder: 'la.tua.email@esempio.com',
      messageLabel: 'Messaggio',
      messagePlaceholder: 'Scrivi qui il tuo messaggio...',
      sendButton: 'Invia Messaggio',
      connectWithMe: 'Connettiti con me:',
    },
  },
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [appLanguage, setAppLanguage] = useState('catalan'); // Estado para el idioma de la app

  // Asegurarse de que currentTranslations siempre tenga un valor por defecto
  const currentTranslations = translations[appLanguage] || translations.catalan;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeSection setCurrentPage={setCurrentPage} translations={currentTranslations.home} />;
      case 'experience':
        return <ExperienceSection translations={currentTranslations.experience} />;
      case 'languages':
        return <LanguagesSection setAppLanguage={setAppLanguage} translations={currentTranslations.languages} />;
      case 'personalProjects':
        return <PersonalProjectsSection translations={currentTranslations.personalProjects} />;
      case 'cv':
        return <CvSection translations={currentTranslations.skills} />;
      case 'contact':
        return <ContactSection translations={currentTranslations.contact} />;
      default:
        return <HomeSection setCurrentPage={setCurrentPage} translations={currentTranslations.home} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <LayoutHeader setCurrentPage={setCurrentPage} setAppLanguage={setAppLanguage} translations={currentTranslations} />
      <main className="container mx-auto p-4">
        {renderPage()}
        {/* La secció d'idiomes es pot mostrar en una pàgina separada o com a part del CV */}
        {currentPage !== 'languages' && <LanguagesSection setAppLanguage={setAppLanguage} translations={currentTranslations.languages} />}
      </main>
    </div>
  );
};

export default App;