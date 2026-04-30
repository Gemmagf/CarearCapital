import React, { useState } from 'react';
import translations from './translations/translations';
import LayoutHeader from './components/LayoutHeader';
import HomeSection from './components/HomeSection';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';
import PersonalProjectsSection from "./components/PersonalProjectsSection";

function App() {
  const [appLanguage, setAppLanguage] = useState('catalan');
  const [currentPage, setCurrentPage] = useState('home');

  const t = translations[appLanguage];

  return (
    <div className="min-h-screen bg-gray-100">
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
