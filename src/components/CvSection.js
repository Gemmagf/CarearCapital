import React from "react";

const SectionTitle = ({ children }) => (
  <h4 className="relative font-display text-3xl font-bold text-gray-900 mb-7 pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-rose-500">
    {children}
  </h4>
);

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
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-4 my-6 overflow-hidden">

      {/* Hero band */}
      <div className="bg-white px-6 md:px-12 py-12 md:py-16 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 max-w-5xl mx-auto">
          {photoSrc && (
            <img
              src={photoSrc}
              alt={subtitle}
              className="mx-auto md:mx-0 mb-6 md:mb-0 w-40 h-40 md:w-52 md:h-52 rounded-full object-cover ring-4 ring-rose-50 border border-rose-100"
            />
          )}
          <div className="text-center md:text-left flex-1">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.05]">
              {title}
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mt-3">
              {subtitle}
            </h3>
            {headline && (
              <p className="text-base md:text-lg text-rose-600 font-medium mt-2 tracking-wide">
                {headline}
              </p>
            )}
            <a
              href={`${process.env.PUBLIC_URL}/CV_Gemma_Garcia.pdf`}
              download
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloadText}
            </a>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12 md:py-16 max-w-5xl mx-auto">

        {/* Summary */}
        {summary && (
          <p className="text-base md:text-lg text-gray-700 mb-14 leading-relaxed">
            {summary}
          </p>
        )}

        {/* Contact */}
        <div className="mb-14">
          <SectionTitle>{contactTitle}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-gray-700">
            <p><span className="font-semibold text-gray-900">{labels.phone}:</span> {contact.phone}{contact.phoneAlt ? ` / ${contact.phoneAlt}` : ""}</p>
            <p>
              <span className="font-semibold text-gray-900">{labels.email}:</span>{" "}
              <a href={`mailto:${contact.email}`} className="text-rose-600 hover:text-rose-700 hover:underline">{contact.email}</a>
            </p>
            <p><span className="font-semibold text-gray-900">{labels.location}:</span> {contact.location}</p>
            <p>
              <span className="font-semibold text-gray-900">{labels.linkedin}:</span>{" "}
              <a href={contact.linkedin} className="text-rose-600 hover:text-rose-700 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/gemma-garcia-de-la-fuente
              </a>
            </p>
            {contact.github && (
              <p>
                <span className="font-semibold text-gray-900">{labels.github}:</span>{" "}
                <a href={contact.github} className="text-rose-600 hover:text-rose-700 hover:underline" target="_blank" rel="noopener noreferrer">
                  github.com/Gemmagf
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Experience — timeline with rose dots */}
        <div className="mb-14">
          <SectionTitle>{experienceTitle}</SectionTitle>
          <div className="space-y-7">
            {experiences.map((exp, idx) => (
              <article key={idx} className="relative pl-7 border-l-2 border-rose-100 hover:border-rose-300 transition-colors">
                <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-rose-500 rounded-full ring-4 ring-white" />
                <p className="font-bold text-gray-900 text-lg">{exp.role}</p>
                <p className="text-gray-700 font-medium">{exp.company} · {exp.location}</p>
                <p className="text-sm text-rose-500 font-medium mt-0.5 mb-3 tracking-wide">{exp.period}</p>
                <ul className="list-disc list-outside ml-5 text-gray-700 space-y-1.5 text-[15px] leading-relaxed marker:text-rose-300">
                  {exp.description.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-14">
          <SectionTitle>{educationTitle}</SectionTitle>
          <ul className="space-y-2.5 text-gray-700">
            {education.map((edu, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-rose-400 rounded-full flex-shrink-0" />
                <span>{edu}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        {techStack && (
          <div className="mb-14">
            <SectionTitle>{techStackTitle}</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t, i) => (
                <span key={i} className="px-3.5 py-1.5 bg-white text-gray-800 rounded-full text-sm border border-rose-200 font-medium hover:bg-rose-50 hover:border-rose-300 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Methodologies */}
        {methodologies && (
          <div className="mb-14">
            <SectionTitle>{methodologiesTitle}</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {methodologies.map((m, i) => (
                <span key={i} className="px-3.5 py-1.5 bg-rose-50 text-rose-800 rounded-full text-sm border border-rose-200 font-medium hover:bg-rose-100 transition-colors">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        <div>
          <SectionTitle>{languagesTitle}</SectionTitle>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-gray-700">
            {languages.map((lang, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-2.5 bg-rose-50/60 border border-rose-100 rounded-xl">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                {lang}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default CvSection;
