import React from 'react';

const CvSection = ({ translations }) => {
  const skills = ['Data Science', 'Machine Learning', 'Product Ownership', 'Agile', 'Tableau', 'Power BI', 'Python', 'SQL'];

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">{translations.title}</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((skill, index) => (
          <span key={index} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-medium shadow-sm">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default CvSection;
