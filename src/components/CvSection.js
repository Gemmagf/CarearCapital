import React from "react";

const CvSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{translations.nav.skills}</h2>
      <p className="text-gray-700">Aquí podries afegir el teu CV o habilitats clau.</p>
    </section>
  );
};

export default CvSection;
