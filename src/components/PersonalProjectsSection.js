import React from "react";

const PersonalProjectsSection = ({ translations = {} }) => {
  const {
    title,
    projects = [],
    linkText = "View project",
    repoText = "Code",
    featuredLabel = "Featured",
  } = translations;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-4 my-6 px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-[3px] bg-rose-500 rounded-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-rose-300 hover:-translate-y-1 transition-all duration-200"
            >
              {idx === 0 && (
                <span className="absolute top-3 right-3 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-rose-500 text-white rounded-full shadow-md">
                  {featuredLabel}
                </span>
              )}
              {project.image && (
                <div className="relative w-full aspect-[16/9] bg-gray-900 overflow-hidden border-b border-gray-200">
                  <img
                    src={`${process.env.PUBLIC_URL}${project.image}`}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex flex-col flex-grow p-6">
              {project.tag && (
                <span className="self-start px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.15em] bg-rose-50 text-rose-700 rounded-md mb-4 border border-rose-100">
                  {project.tag}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-grow">
                {project.description}
              </p>
              {project.stack && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-50 text-gray-700 text-xs rounded-md border border-gray-200 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-5 items-center mt-auto pt-4 border-t border-gray-100">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold text-sm"
                  >
                    {linkText} <span aria-hidden="true">→</span>
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium"
                    title={repoText}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.05.78 2.11 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56C20.22 21.38 23.5 17.07 23.5 12 23.5 5.73 18.27.5 12 .5z" />
                    </svg>
                    {repoText}
                  </a>
                )}
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
