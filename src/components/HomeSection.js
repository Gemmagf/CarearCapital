import React from 'react';

const HomeSection = ({ setCurrentPage }) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-8 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg mx-4 my-6">
      <img
        src="https://via.placeholder.com/150" // Reemplaza con la URL de tu foto
        alt="La teva Foto Professional"
        className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg"
      />
      <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        Hola! Sóc <span className="text-gray-700">Gemma García de la Fuente</span>
      </h2>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl">
        Data Scientist & Product Owner amb més de 4 anys d'experiència transformant dades en solucions impactants.
        Explora els meus projectes i la meva trajectòria professional.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentPage('personalProjects')}
          className="px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105"
        >
          Explorar Projectes
        </button>
        <button
          onClick={() => setCurrentPage('cv')}
          className="px-8 py-3 bg-white text-gray-800 text-lg font-semibold rounded-full shadow-lg border border-gray-800 hover:bg-gray-100 transition-all transform hover:scale-105"
        >
          El meu Perfil
        </button>
      </div>
    </section>
  );
};

export default HomeSection;