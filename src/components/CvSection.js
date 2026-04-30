import React from "react";

const CvSection = ({ translations, photo }) => {
  const {
    title, subtitle, headline, summary,
    contact, experiences, education, languages, techStack, methodologies,
    contactTitle, experienceTitle, educationTitle, languagesTitle,
    techStackTitle, methodologiesTitle,
    labels = {}, downloadText,
  } = translations;

  const photoSrc = photo ? `${process.env.PUBLIC_URL}${photo}` : null;

  return (
    <section className="p-6 md:p-10 bg-white rounded-2xl shadow-lg mx-4 my-6">

      <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-10 max-w-5xl mx-auto">
        {photoSrc && (
          <img
            src={photoSrc}
            alt={subtitle}
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-md ring-4 ring-blue-50 mx-auto md:mx-0 mb-6 md:mb-0"
          />
        )}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {title}
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mt-2">
            {subtitle}
          </h3>
          {headline && (
            <p className="text-base md:text-lg text-blue-700 font-medium mt-1">
              {headline}
            </p>
          )}
          <a
            href={`${process.env.PUBLIC_URL}/CV_Gemma_Garcia.pdf`}
            download
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloadText || "Descarregar CV (PDF)"}
          </a>
        </div>
      </div>

      {summary && (
        <p className="text-base md:text-lg text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed">
          {summary}
        </p>
      )}

      <div className="mb-10 max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{contactTitle}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <ul className="space-y-1">
            <li><span className="font-semibold">{labels.phone}:</span> {contact.phone}{contact.phoneAlt ? ` / ${contact.phoneAlt}` : ""}</li>
            <li>
              <span className="font-semibold">{labels.email}:</span>{" "}
              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
            </li>
            <li><span className="font-semibold">{labels.location}:</span> {contact.location}</li>
          </ul>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">{labels.linkedin}:</span>{" "}
              <a href={contact.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/gemma-garcia-de-la-fuente
              </a>
            </li>
            {contact.github && (
              <li>
                <span className="font-semibold">{labels.github}:</span>{" "}
                <a href={contact.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  github.com/Gemmagf
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mb-10 max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{experienceTitle}</h4>
        {experiences.map((exp, idx) => (
          <div key={idx} className="mb-6">
            <p className="font-semibold text-gray-900">{exp.role} — {exp.company}, {exp.location}</p>
            <p className="text-gray-600 italic mb-2">{exp.period}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exp.description.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-10 max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{educationTitle}</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {education.map((edu, i) => <li key={i}>{edu}</li>)}
        </ul>
      </div>

      {techStack && (
        <div className="mb-10 max-w-4xl mx-auto">
          <h4 className="text-2xl font-semibold mb-4">{techStackTitle}</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-100">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {methodologies && (
        <div className="mb-10 max-w-4xl mx-auto">
          <h4 className="text-2xl font-semibold mb-4">{methodologiesTitle}</h4>
          <div className="flex flex-wrap gap-2">
            {methodologies.map((m, i) => (
              <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-100">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-semibold mb-2">{languagesTitle}</h4>
        <ul className="text-gray-700 columns-1 md:columns-2 gap-4 space-y-2">
          {languages.map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>

    </section>
  );
};

export default CvSection;
