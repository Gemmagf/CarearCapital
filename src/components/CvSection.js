import React from 'react';
import translations from '../translations/translations';

const CvSection = ({ lang = 'ca' }) => {
  const t = translations[lang];

  const education = []; // Add your education data here
  const skills = ['Data Science', 'Machine Learning', 'Product Ownership', 'Agile', 'Tableau', 'Power BI', 'Python', 'SQL'];

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">{t.skillsTitle}</h2>

      {education.length > 0 && (
        <div className="mb-10">
          <h3 className="text-3xl font-semibold text-gray-700 mb-6 border-b-2 border-gray-300 pb-2">{t.educationTitle}</h3>
          {education.map((edu) => (
            <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-2xl font-bold text-gray-900">{edu.degree}</h4>
              <p className="text-lg text-gray-700">{edu.institution} <span className="text-gray-500 text-base">({edu.years})</span></p>
              <p className="text-gray-700 mt-2">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3 className="text-3xl font-semibold text-gray-700 mb-6 border-b-2 border-gray-300 pb-2">{t.keySkillsTitle}</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span key={index} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-medium shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CvSection;
