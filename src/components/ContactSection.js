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

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all bg-white";

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-4 my-6 px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
            {t.title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-rose-500 rounded-full" />
          <p className="text-base md:text-lg text-gray-700 mt-6">
            {t.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {social.email}
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-full font-medium border border-gray-300 hover:border-rose-300 hover:bg-rose-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
              {t.form.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange("name")}
              className={inputClass}
              placeholder={t.form.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
              {t.form.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange("email")}
              className={inputClass}
              placeholder={t.form.emailPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
              {t.form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange("message")}
              required
              className={`${inputClass} resize-none`}
              placeholder={t.form.messagePlaceholder}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3.5 bg-rose-500 text-white text-base font-semibold rounded-full shadow-md hover:bg-rose-600 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {status === "sending" ? sendingText : t.form.submitButton}
          </button>
          {status === "success" && (
            <p className="text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-center font-medium">
              {successText}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center font-medium">
              {errorText}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
