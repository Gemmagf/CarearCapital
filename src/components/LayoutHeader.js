import React from 'react';

const LayoutHeader = ({ setCurrentPage, setAppLanguage, translations }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-2xl">
      <h1 className="text-2xl font-bold text-gray-800">{translations.name}</h1>
      <nav className="flex space-x-4 items-center">
        <button onClick={() => setCurrentPage('home')} className="text-gray-600 hover:text-black transition-colors font-medium">{translations.nav.home}</button>
        <button onClick={() => setCurrentPage('cv')} className="text-gray-600 hover:text-black transition-colors font-medium">{translations.nav.skills}</button>
        <button onClick={() => setCurrentPage('personalProjects')} className="text-gray-600 hover:text-black transition-colors font-medium">{translations.nav.personalProjects}</button>
        <button onClick={() => setCurrentPage('contact')} className="text-gray-600 hover:text-black transition-colors font-medium">{translations.nav.contact}</button>
        
        <div className="flex items-center space-x-2 ml-4">
          <span role="img" aria-label="Idioma" className="text-lg">🌐</span>
          <select
            onChange={(e) => setAppLanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white"
          >
            <option value="catalan">Català</option>
            <option value="english">English</option>
            <option value="german">Deutsch</option>
            <option value="spanish">Castellà</option>
            <option value="french">Français</option>
            <option value="italian">Italiano</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default LayoutHeader;
