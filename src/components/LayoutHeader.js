import React from 'react';

const LayoutHeader = ({ setCurrentPage, setAppLanguage, translations }) => {
  const linkClass =
    "text-gray-200 hover:text-white transition-colors font-medium px-2";

  return (
    <header className="flex flex-wrap justify-between items-center p-4 bg-gray-900 shadow-md rounded-b-2xl gap-3">
      <button
        onClick={() => setCurrentPage('home')}
        className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
      >
        {translations.name}
      </button>
      <nav className="flex flex-wrap space-x-2 md:space-x-4 items-center">
        <button onClick={() => setCurrentPage('home')} className={linkClass}>
          {translations.nav.home}
        </button>
        <button onClick={() => setCurrentPage('cv')} className={linkClass}>
          {translations.nav.skills}
        </button>
        <button onClick={() => setCurrentPage('personalProjects')} className={linkClass}>
          {translations.nav.personalProjects}
        </button>
        <button onClick={() => setCurrentPage('contact')} className={linkClass}>
          {translations.nav.contact}
        </button>

        {translations.social?.github && (
          <a
            href={translations.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} flex items-center gap-1`}
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.05.78 2.11 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56C20.22 21.38 23.5 17.07 23.5 12 23.5 5.73 18.27.5 12 .5z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}

        <select
          onChange={(e) => setAppLanguage(e.target.value)}
          className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-white text-gray-900 border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Language"
        >
          <option value="catalan">Català</option>
          <option value="english">English</option>
          <option value="german">Deutsch</option>
          <option value="spanish">Castellà</option>
          <option value="french">Français</option>
          <option value="italian">Italiano</option>
        </select>
      </nav>
    </header>
  );
};

export default LayoutHeader;
