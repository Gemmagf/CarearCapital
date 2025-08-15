import React from "react";

const HomeSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">{translations.name}</h1>
      <p className="text-xl text-gray-700">{translations.homeSection.welcome}</p>
    </section>
  );
};

export default HomeSection;
