import translations from "../translations/translations";
const lang = "catalan";

export default function HomeSection() {
  const { name, title, description } = translations[lang].personal;
  return (
    <section>
      <h1>{name}</h1>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
