import React from 'react';

const LanguageIcon = ({ lang, level, onClick }) => {
  const getLevelText = (lvl) => {
    switch (lvl) {
      case 'native': return 'Natiu';
      case 'c2': return 'C2 - Mestratge';
      case 'c1': return 'C1 - Avançat';
      case 'b2': return 'B2 - Intermedi Alt';
      case 'b1': return 'B1 - Intermedi';
      default: return '';
    }
  };

  // SVG icons for languages (simplified for example)
  const getLanguageSvg = (language) => {
    switch (language.toLowerCase()) {
      case 'català':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
          </svg>
        );
      case 'castellà':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
          </svg>
        );
      case 'anglès':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
          </svg>
        );
      case 'alemany':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-black">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
          </svg>
        );
      case 'francès':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-700">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
          </svg>
        );
      case 'italià':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-500">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6a.75.75 0 00.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div
      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onClick(lang)}
    >
      {getLanguageSvg(lang)}
      <p className="text-lg font-semibold text-gray-800 mt-2">{lang}</p>
      <p className="text-sm text-gray-600">{getLevelText(level)}</p>
    </div>
  );
};

const LanguagesSection = ({ setAppLanguage }) => {
  const languages = [
    { name: 'Català', level: 'native' },
    { name: 'Castellà', level: 'native' },
    { name: 'Anglès', level: 'c2' },
    { name: 'Alemany', level: 'b2' },
    { name: 'Francès', level: 'b1' },
    { name: 'Italià', level: 'b1' },
  ];

  const handleLanguageClick = (lang) => {
    alert(`Canviant l'idioma de l'app a: ${lang}`);
    setAppLanguage(lang.toLowerCase());
  };

  return (
    <section className="p-8 bg-white rounded-2xl shadow-lg mx-4 my-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Idiomes</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {languages.map((lang) => (
          <LanguageIcon key={lang.name} lang={lang.name} level={lang.level} onClick={handleLanguageClick} />
        ))}
      </div>
    </section>
  );
};

export default LanguagesSection;