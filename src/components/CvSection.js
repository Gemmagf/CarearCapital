import translations from "../translations/translations";
const lang = "catalan";

export default function CvSection() {
  return (
    <section>
      <h2>Formació</h2>
      {translations[lang].education.map((edu, index) => (
        <div key={index}>
          <strong>{edu.degree}</strong> - {edu.university} ({edu.year})
        </div>
      ))}
    </section>
  );
}
