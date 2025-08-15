import translations from "../translations/translations";
const lang = "catalan";

export default function ContactSection() {
  const { phone, email, linkedin, location } = translations[lang].personal.contact;
  return (
    <section>
      <h2>Contacte</h2>
      <p>Telèfon: {phone.join(" / ")}</p>
      <p>Email: {email}</p>
      <p>LinkedIn: <a href={linkedin}>{linkedin}</a></p>
      <p>Ubicació: {location}</p>
    </section>
  );
}
