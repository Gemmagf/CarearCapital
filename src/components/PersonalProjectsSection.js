import React from "react";

const PersonalProjectsSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">{translations.nav.personalProjects}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {translations.personalProjects.map((project, index) => (
          <div key={index} className="bg-gray-50 rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-700 text-base mb-4">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
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
