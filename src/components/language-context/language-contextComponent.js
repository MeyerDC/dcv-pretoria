import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from './translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = (next) => {
    setLanguage((prev) => (translations[next] ? next : prev === 'en' ? 'de' : 'en'));
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
