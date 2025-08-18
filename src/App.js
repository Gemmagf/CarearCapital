import React, { useState } from 'react';
import CvSection from './components/CvSection';
import ContactSection from './components/ContactSection';

function App() {
  const [lang, setLang] = useState('ca');

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-end p-4 space-x-2">
        <button onClick={() => setLang('ca')} className="px-4 py-2 bg-gray-200 rounded">CA</button>
        <button onClick={() => setLang('en')} className="px-4 py-2 bg-gray-200 rounded">EN</button>
      </div>
      <CvSection lang={lang} />
      <ContactSection lang={lang} />
    </div>
  );
}

export default App;
