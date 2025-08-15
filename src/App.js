import LayoutHeader from "./components/LayoutHeader";
import HomeSection from "./components/HomeSection";
import ExperienceSection from "./components/ExperienceSection";
import CvSection from "./components/CvSection";
import LanguagesSection from "./components/LanguagesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { LanguageProvider } from "./translations/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <LayoutHeader />
      <HomeSection />
      <ExperienceSection />
      <CvSection />
      <LanguagesSection />
      <ProjectsSection />
      <ContactSection />
    </LanguageProvider>
  );
}
