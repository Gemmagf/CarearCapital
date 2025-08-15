import React from "react";

const ExperienceSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">{translations.nav.experience}</h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {translations.experience.map((exp, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900">{exp.role}</h3>
            <p className="text-gray-700 font-medium">{exp.company}</p>
            <p className="text-gray-600 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
