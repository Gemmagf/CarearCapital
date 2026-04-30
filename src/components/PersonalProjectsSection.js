import React from "react";

const PersonalProjectsSection = ({ translations = {} }) => {
  const {
    title,
    projects = [],
    linkText = "View project",
    repoText = "Code",
  } = translations;

  return (
    <section className="p-6 md:p-10 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              {project.tag && (
                <span className="self-start px-2 py-0.5 text-xs font-semibold uppercase tracking-wide bg-blue-100 text-blue-800 rounded-full mb-3">
                  {project.tag}
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>
              {project.stack && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-3 items-center mt-auto">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline"
                  >
                    {linkText} →
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {repoText} ⎇
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
