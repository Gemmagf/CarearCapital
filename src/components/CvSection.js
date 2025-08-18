import React from "react";

const CVSection = ({ translations }) => {
  const { 
    title, subtitle, description, contact, experiences, education, languages,
    contactTitle, experienceTitle, educationTitle, languagesTitle
  } = translations;

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{subtitle}</h3>
      <p className="text-lg text-gray-700 mb-6 text-center">{description}</p>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">{contactTitle}</h4>
        <ul className="text-gray-700">
          <li>Phone: {contact.phone}</li>
          <li>Email: {contact.email}</li>
          <li>LinkedIn: <a href={contact.linkedin} className="text-blue-600" target="_blank">{contact.linkedin}</a></li>
          <li>Location: {contact.location}</li>
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">{experienceTitle}</h4>
        {experiences.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold">{exp.role} - {exp.company}, {exp.location}</p>
            <p className="text-gray-600 italic mb-1">{exp.period}</p>
            <ul className="list-disc list-inside text-gray-700">
              {exp.description.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">{educationTitle}</h4>
        <ul className="list-disc list-inside text-gray-700">
          {education.map((edu, i) => <li key={i}>{edu}</li>)}
        </ul>
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-2">{languagesTitle}</h4>
        <ul className="list-disc list-inside text-gray-700">
          {languages.map((lang, i) => <li key={i}>{lang}</li>)}
        </ul>
      </div>
    </section>
  );
};

export default CVSection;
