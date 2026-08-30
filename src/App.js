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
const REDESIGN_HASH = "#redesign";

function App() {
  const [appLanguage, setAppLanguage] = useState('catalan');
  const [currentPage, setCurrentPage] = useState('home');
  const [secret, setSecret] = useState(
    typeof window !== 'undefined' && window.location.hash === SECRET_HASH
  );
  const [redesign, setRedesign] = useState(
    typeof window !== 'undefined' && window.location.hash === REDESIGN_HASH
  );

  // React to hash changes (e.g. user navigates back/forward)
  useEffect(() => {
    const onHash = () => {
      setSecret(window.location.hash === SECRET_HASH);
      setRedesign(window.location.hash === REDESIGN_HASH);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Redesign preview (isolated; live site untouched until we swap)
  if (redesign) return <RedesignApp />;

  const t = translations[appLanguage];

  // Secret CV-builder page: hide normal nav, render only the builder
  if (secret) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CvBuilderSection translations={t} currentLanguage={appLanguage} />
      </div>
    );
  }

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
