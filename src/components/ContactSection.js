import React from "react";

const ContactSection = ({ translations }) => {
  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">{translations.nav.contact}</h2>
      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold">{translations.contact.email}:</span> example@email.com
        </p>
        <p>
          <span className="font-semibold">{translations.contact.phone}:</span> +34 600 000 000
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
