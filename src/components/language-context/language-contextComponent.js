import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from './translations.json';

const LanguageContext = createContext();

// German is the default for a first visit. Once a visitor picks a language,
// that choice is remembered in their browser for later visits.
const DEFAULT_LANGUAGE = 'de';
const STORAGE_KEY = 'dcv-language';

const savedLanguage = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return translations[saved] ? saved : DEFAULT_LANGUAGE;
  } catch (e) {
    return DEFAULT_LANGUAGE;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(savedLanguage);

  const toggleLanguage = (next) => {
    const chosen = translations[next] ? next : language === 'en' ? 'de' : 'en';
    setLanguage(chosen);
    try {
      window.localStorage.setItem(STORAGE_KEY, chosen);
    } catch (e) {
      // Private browsing: the choice just lasts for this visit.
    }
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
