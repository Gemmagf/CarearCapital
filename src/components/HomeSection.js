import React from 'react';

const HomeSection = ({ translations, hero, setCurrentPage }) => {
  const heroSrc = `${process.env.PUBLIC_URL}${hero || "/images/gemma.jpg"}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl shadow-lg mx-4 my-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.10),transparent_60%)] pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto p-6 md:p-12">
        <div className="order-2 md:order-1 text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Senior Data Scientist · Zuric
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
            {translations.title}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
            {translations.description}
          </p>
          {setCurrentPage && (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => setCurrentPage('cv')}
                className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition"
              >
                {translations.ctaCV || 'CV'}
              </button>
              <button
                onClick={() => setCurrentPage('personalProjects')}
                className="px-5 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition border border-gray-200 shadow-sm"
              >
                {translations.ctaProjects || 'Projects'}
              </button>
            </div>
          )}
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-300 to-emerald-300 rounded-full blur opacity-40" />
            <img
              src={heroSrc}
              alt="Gemma Garcia de la Fuente"
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl ring-4 ring-white"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
