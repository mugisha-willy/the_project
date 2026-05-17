import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// ✅ Set default language to Kinyarwanda ('rw')
const defaultLanguage = 'rw';

// Check if user has a saved language preference
const savedLanguage = localStorage.getItem('i18nextLng');

// Use saved language if exists, otherwise use default (Kinyarwanda)
const initialLanguage = savedLanguage || defaultLanguage;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'rw',        // ✅ Fallback to Kinyarwanda if translation missing
    lng: initialLanguage,      // ✅ Start with Kinyarwanda by default
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
      // ✅ Don't auto-detect browser language - always use our default
      lookupLocalStorage: 'i18nextLng',
    }
  });

// ✅ If no language is saved, set Kinyarwanda as default
if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'rw');
  i18n.changeLanguage('rw');
}

export default i18n;