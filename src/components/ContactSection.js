import React from "react";

const ContactSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        {translations.title}
      </h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 text-center">
          {translations.description}
        </p>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              {translations.form.nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
              placeholder={translations.form.namePlaceholder}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              {translations.form.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all"
              placeholder={translations.form.emailPlaceholder}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              {translations.form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 transition-all resize-none"
              placeholder={translations.form.messagePlaceholder}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors transform hover:scale-105"
          >
            {translations.form.submitButton}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
