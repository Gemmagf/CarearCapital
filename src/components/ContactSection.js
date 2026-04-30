import React, { useState } from "react";

const ContactSection = ({ translations, social = {} }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!social.email) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${social.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `[Portfolio] Missatge de ${form.name || "(sense nom)"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const t = translations;
  const sendingText = t.form.sendingText || "Enviant...";
  const successText = t.form.successText || "Missatge enviat. Gràcies!";
  const errorText = t.form.errorText || "Hi ha hagut un error. Prova-ho de nou o escriu directament al meu email.";

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        {t.title}
      </h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 text-center">
          {t.description}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              ✉ {social.email}
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-700 text-white rounded-lg font-medium hover:bg-sky-800 transition"
            >
              in LinkedIn
            </a>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              {t.form.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange("name")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
              placeholder={t.form.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              {t.form.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
              placeholder={t.form.emailPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
              {t.form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange("message")}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all resize-none"
              placeholder={t.form.messagePlaceholder}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? sendingText : t.form.submitButton}
          </button>
          {status === "success" && (
            <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
              ✓ {successText}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-center">
              ✗ {errorText}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
