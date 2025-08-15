import React, { useState } from "react";
import LayoutHeader from "./components/LayoutHeader";
import HomeSection from "./components/HomeSection";
import ProjectsSection from "./components/ProjectsSection";
import PersonalProjectsSection from "./components/PersonalProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import CvSection from "./components/CvSection";
import ContactSection from "./components/ContactSection";
import translations from "./translations/translations";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [appLanguage, setAppLanguage] = useState("catalan");

  const t = translations[appLanguage];

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeSection translations={t} />;
      case "experience":
        return <ExperienceSection translations={t} />;
      case "personalProjects":
        return <PersonalProjectsSection translations={t} />;
      case "cv":
        return <CvSection translations={t} />;
      case "contact":
        return <ContactSection translations={t} />;
      default:
        return <HomeSection translations={t} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LayoutHeader
        setCurrentPage={setCurrentPage}
        setAppLanguage={setAppLanguage}
        translations={t}
      />
      {renderPage()}
    </div>
  );
};

export default App;
