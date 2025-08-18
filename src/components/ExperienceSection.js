import React, { useState } from 'react';

const ExperienceSection = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  const experience = [
    {
      id: 1,
      title: 'Data Scientist & Product Owner - UBS Business Solutions AG',
      company: 'UBS Business Solutions AG',
      years: 'Nov 2022 - Actualitat',
      shortDescription: 'Vaig liderar la visió, desenvolupament i entrega d\'un producte de qualitat de dades de risc.',
      detailedDescription: 'En aquest rol, vaig ser responsable de l\'estratègia i execució de productes de dades, incloent un dashboard per a detecció d\'anomalies i un motor de validació estadística. Vaig gestionar un equip àgil de 5 membres (IT i negoci), aconseguint una reducció del 50% en el temps de projecte. Vaig ser clau en la transició de Tableau a Power BI, assegurant l\'adopció interna dels productes de dades.',
    },
    // Pots afegir més experiències aquí
  ];

  const toggleExpand = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">La Meva Experiència Professional</h2>
      <div className="max-w-3xl mx-auto">
        {experience.map((job) => (
          <div key={job.id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleExpand(job.id)}>
            <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-lg text-gray-700">{job.years}</p>
            <p className="text-gray-700 mt-2">{job.shortDescription}</p>
            {expandedJob === job.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600">{job.detailedDescription}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;