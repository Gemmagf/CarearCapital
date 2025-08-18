import React from 'react';
import translations from '../translations/translations';

const ContactSection = ({ lang = 'ca' }) => {
  const t = translations[lang];

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">{t.contactTitle}</h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 text-center">{t.contactText}</p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">{t.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">{t.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">{t.message}</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder={t.messagePlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors transform hover:scale-105"
          >
            {t.sendButton}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600">
          <p>{t.connectWithMe}</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://linkedin.com/in/gemma-garcia-de-la-fuente" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors text-lg">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
