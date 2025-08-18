import React from "react";

const CVSection = ({ translations }) => {
  const { 
    title, subtitle, description, contact, experiences, education, languages,
    contactTitle, experienceTitle, educationTitle, languagesTitle
  } = translations;

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6 text-center">

      {/* Titles */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
        {title}
      </h2>
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
        {subtitle}
      </h3>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
        {description}
      </p>

      {/* Contact - Two Columns */}
      <div className="mb-10 text-left max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{contactTitle}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <ul className="text-gray-700 space-y-1">
            <li><span className="font-semibold">Phone:</span> {contact.phone}</li>
            <li><span className="font-semibold">Email:</span> {contact.email}</li>
          </ul>
          <ul className="text-gray-700 space-y-1">
            <li>
              <span className="font-semibold">LinkedIn:</span> 
              <a href={contact.linkedin} className="text-blue-600 ml-1" target="_blank" rel="noopener noreferrer">
                {contact.linkedin}
              </a>
            </li>
            <li><span className="font-semibold">Location:</span> {contact.location}</li>
          </ul>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-10 text-left max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{experienceTitle}</h4>
        {experiences.map((exp, idx) => (
          <div key={idx} className="mb-6">
            <p className="font-semibold text-gray-900">{exp.role} - {exp.company}, {exp.location}</p>
            <p className="text-gray-600 italic mb-2">{exp.period}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exp.description.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-10 text-left max-w-4xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4">{educationTitle}</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {education.map((edu, i) => <li key={i}>{edu}</li>)}
        </ul>
      </div>

      {/* Languages - Two Columns */}
      <div className="mx-mb-10 text-left max-w-4xl mx-auto">
        <h4 className="text-xl font-semibold mb-2">{languagesTitle}</h4>
        <ul className="text-gray-700 columns-1 md:columns-2 gap-4 space-y-2 max-w-4xl mx-auto text-left">
          {languages.map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>

    </section>
  );
};

export default CVSection;
