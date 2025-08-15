import translations from "../translations/translations";
const lang = "catalan";

export default function ExperienceSection() {
  return (
    <section>
      <h2>Experiència</h2>
      {translations[lang].experience.map((exp, index) => (
        <div key={index}>
          <h3>{exp.role} - {exp.company}</h3>
          <span>{exp.duration}</span>
          <ul>
            {exp.description.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
