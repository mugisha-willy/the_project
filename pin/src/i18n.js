import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Get saved language or default to 'rw' (Kinyarwanda)
const savedLanguage = localStorage.getItem('i18nextLng') || 'rw';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'rw',
    lng: savedLanguage,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Set default language if none exists
if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'rw');
  i18n.changeLanguage('rw');
}

export default i18n;