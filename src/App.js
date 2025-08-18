import React, { useState } from 'react';
import translations from './translations/translations';
import LayoutHeader from './components/LayoutHeader';
import HomeSection from './components/HomeSection';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';

function App() {
  const [appLanguage, setAppLanguage] = useState('catalan');
  const [currentPage, setCurrentPage] = useState('home');

  const currentTranslations = translations[appLanguage];

  return (
    <div className="min-h-screen bg-gray-100">
      <LayoutHeader
        setCurrentPage={setCurrentPage}
        setAppLanguage={setAppLanguage}
        translations={currentTranslations}
      />

      {currentPage === 'home' && <HomeSection translations={currentTranslations.home} />}
      {currentPage === 'experience' && <HomeSection translations={currentTranslations.experience} />}
      {currentPage === 'personalProjects' && <HomeSection translations={currentTranslations.personalProjects} />}
      {currentPage === 'cv' && <CvSection translations={currentTranslations.cv} />}
      {currentPage === 'contact' && <ContactSection translations={currentTranslations.contact} />}
    </div>
  );
}

export default App;
