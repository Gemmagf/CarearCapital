import React from 'react';

const HomeSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6 text-center">
     {/* Títol */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
        {translations.title}
      </h2>
      {/* Photo */}
      <div className="mt-8 flex justify-center">
        <img
          src="/images/gemma.jpg"              // <-- path inside /public
          alt="Gemma García"
          className="w-60 h-60 rounded-full object-cover shadow-lg mb-8 ring-4 ring-gray-200"
          loading="lazy"
        />
      </div>
      
      {/* Descripció */}
      <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto text-center">
        {translations.description}
      </p>
     


    </section>
  );
};

export default HomeSection;
