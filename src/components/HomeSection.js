import React from 'react';

const HomeSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{translations.title}</h2>
      {/* Photo below title & description */}
      <div className="mt-8 flex justify-center">
        <img
          src="/images/gemma.jpg"              // <-- path inside /public
          alt="Gemma García"
          className="w-60 h-60 rounded-full object-cover shadow-lg mb-8 ring-4 ring-gray-200"
          loading="lazy"
        />
      </div>
      
      <p className="text-lg text-gray-700">{translations.description}</p>
    </section>
  );
};

export default HomeSection;
