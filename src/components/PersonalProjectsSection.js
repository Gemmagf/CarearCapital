import React from "react";

const PersonalProjectsSection = ({ translations = {} }) => {
  const { title, projects = [] } = translations; 

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-700 mb-4">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                🔗 {project.link}
              </a>
            )}
            {project.futureIdeas && (
              <p className="text-sm text-gray-500 mt-3">
                <strong>💡 {project.futureIdeas}</strong>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
