import React, { useState, useEffect } from 'react';
import translations from './translations/translations';
import LayoutHeader from './components/LayoutHeader';
import HomeSection from './components/HomeSection';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';
import PersonalProjectsSection from "./components/PersonalProjectsSection";
import CvBuilderSection from "./components/CvBuilderSection";
import RedesignApp from "./redesign/RedesignApp";

const SECRET_HASH = "#secret";
const LEGACY_HASH = "#legacy";

// Routing by hash:
//   (default)  → the editorial redesign (public site)
//   #secret    → private CV builder
//   #legacy    → the previous site, kept for reference (also preserved on the `legacy-site` branch)
function App() {
  const [appLanguage, setAppLanguage] = useState('catalan');
  const [currentPage, setCurrentPage] = useState('home');
  const readHash = () => (typeof window !== 'undefined' ? window.location.hash : "");
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    const onHash = () => setHash(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const t = translations[appLanguage];

  if (hash === SECRET_HASH) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CvBuilderSection translations={t} currentLanguage={appLanguage} />
      </div>
    );
  }

  if (hash !== LEGACY_HASH) return <RedesignApp />;

  return (
    <div className="min-h-screen bg-gray-50">
      <LayoutHeader
        setCurrentPage={setCurrentPage}
        setAppLanguage={setAppLanguage}
        translations={t}
      />

      {currentPage === 'home' && (
        <HomeSection
          translations={t.home}
          hero={t.photos?.hero}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === 'cv' && (
        <CvSection
          translations={t.cv}
          photo={t.photos?.portrait}
        />
      )}
      {currentPage === 'personalProjects' && (
        <PersonalProjectsSection translations={t.personalProjects} />
      )}
      {currentPage === 'contact' && (
        <ContactSection translations={t.contact} social={t.social} />
      )}
    </div>
  );
}

export default App;
