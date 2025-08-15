import { useLanguage } from "../translations/LanguageContext";

export default function LayoutHeader() {
  const { language, changeLanguage } = useLanguage();

  return (
    <header>
      <h1>Portfoli Gemma Garcia</h1>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="catalan">Català</option>
        <option value="spanish">Español</option>
        <option value="english">English</option>
      </select>
    </header>
  );
}
