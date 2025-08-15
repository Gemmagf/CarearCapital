import translations from "../translations/translations";
const lang = "catalan";

export default function LanguagesSection() {
  return (
    <section>
      <h2>Idiomes</h2>
      <ul>
        {translations[lang].languages.map((l, index) => (
          <li key={index}>{l.language}: {l.level}</li>
        ))}
      </ul>
    </section>
  );
}
