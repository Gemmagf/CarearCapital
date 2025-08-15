import translations from "../translations/translations";
const lang = "catalan";

export default function ProjectsSection() {
  return (
    <section>
      <h2>Projectes</h2>
      {translations[lang].projects.map((proj, index) => (
        <div key={index}>
          <h3>{proj.title}</h3>
          <p>{proj.description}</p>
          <a href={proj.link} target="_blank" rel="noreferrer">Veure projecte</a>
        </div>
      ))}
    </section>
  );
}
