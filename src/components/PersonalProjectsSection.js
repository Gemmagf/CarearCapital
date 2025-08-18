import React from 'react';

const PersonalProjectsSection = () => {
  const personalProjects = [
    {
      id: 1,
      title: 'Anàlisi de Sentiments en Xarxes Socials',
      description: 'Projecte personal per analitzar el sentiment de tuits sobre un tema específic utilitzant NLP i models de classificació. Exploració de llibreries com NLTK i scikit-learn.',
      link: 'https://github.com/tuusuario/sentiment-analysis-project', // Reemplaza con tu link
      futureIdeas: 'Integrar amb APIs d\'altres xarxes socials i desenvolupar un dashboard interactiu en temps real.',
    },
    {
      id: 2,
      title: 'Simulador de Mercat de Valors',
      description: 'Aplicació web per simular inversions en el mercat de valors, permetent als usuaris provar estratègies sense risc real. Ús de dades històriques i visualitzacions amb Plotly.',
      link: 'https://github.com/tuusuario/stock-market-simulator', // Reemplaza con tu link
      futureIdeas: 'Afegir funcionalitats de backtesting d\'estratègies i connexió amb APIs de brokers reals per a dades en viu.',
    },
    // Afegeix més projectes personals aquí
  ];

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Projectes Personals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {personalProjects.map((project) => (
          <div key={project.id} className="bg-gray-50 rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-700 text-base mb-4">{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                Veure Projecte (GitHub)
              </a>
            )}
            <p className="text-gray-600 text-sm mt-4">
              <span className="font-semibold">Idees Futures:</span> {project.futureIdeas}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjectsSection;