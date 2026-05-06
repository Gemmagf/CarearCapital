import React from 'react';

const HomeSection = ({ translations, hero, setCurrentPage }) => {
  const heroSrc = `${process.env.PUBLIC_URL}${hero || "/images/gemma_hero.jpg"}`;
  const stats = translations.stats || {};

  return (
    <section className="bg-white rounded-2xl border border-gray-100 mx-4 my-6">
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-center max-w-6xl mx-auto px-6 md:px-14 py-14 md:py-20">

        {/* Text column */}
        <div className="order-2 md:order-1 text-center md:text-left">

          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-[1.02]">
            {translations.title}
          </h1>

          {/* Role headline */}
          <p className="text-lg md:text-xl font-medium text-rose-600 mb-7 tracking-wide">
            {translations.roleHeadline}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-700 mb-5 leading-relaxed max-w-2xl">
            {translations.description}
          </p>

          {/* Personal note */}
          {translations.personalNote && (
            <p className="text-sm md:text-base text-gray-600 mb-9 leading-relaxed max-w-2xl">
              {translations.personalNote}
            </p>
          )}

          {/* CTA buttons */}
          {setCurrentPage && (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-12">
              <button
                onClick={() => setCurrentPage('cv')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {translations.ctaCV}
                <span aria-hidden="true">→</span>
              </button>
              <button
                onClick={() => setCurrentPage('personalProjects')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 rounded-full font-semibold hover:bg-rose-50 hover:border-rose-300 hover:-translate-y-0.5 transition-all border border-gray-300"
              >
                {translations.ctaProjects}
              </button>
            </div>
          )}

          {/* Stats strip */}
          <dl className="flex flex-wrap gap-x-10 gap-y-5 justify-center md:justify-start">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-rose-500 font-semibold mb-1">
                {stats.experienceLabel}
              </dt>
              <dd className="font-display text-2xl font-bold text-gray-900">
                {stats.experienceValue}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-rose-500 font-semibold mb-1">
                {stats.projectsLabel}
              </dt>
              <dd className="font-display text-2xl font-bold text-gray-900">
                {stats.projectsValue}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-rose-500 font-semibold mb-1">
                {stats.languagesLabel}
              </dt>
              <dd className="font-display text-2xl font-bold text-gray-900">
                {stats.languagesValue}
              </dd>
            </div>
          </dl>

        </div>

        {/* Photo column */}
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src={heroSrc}
            alt="Gemma Garcia de la Fuente"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover ring-[6px] ring-rose-50 border border-rose-100"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};

export default HomeSection;
