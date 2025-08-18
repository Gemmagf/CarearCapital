import React from 'react';

const ContactSection = () => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contacte</h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 text-center">
          Per a col·laboracions o consultes, no dubtis en contactar-me.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
              placeholder="El teu nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
              placeholder="el.teu.email@exemple.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Missatge</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all resize-none"
              placeholder="Escriu el teu missatge aquí..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors transform hover:scale-105"
          >
            Enviar Missatge
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          <p>Connecta amb mi:</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://linkedin.com/in/gemma-garcia-de-la-fuente" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-lg">LinkedIn</a>
            {/* Pots afegir més enllaços aquí, com GitHub, etc. */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;