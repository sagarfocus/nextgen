import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enNav from './locales/en/navigation.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enServices from './locales/en/services.json';
import enIndustries from './locales/en/industries.json';
import enContact from './locales/en/contact.json';
import enBlog from './locales/en/blog.json';
import enPricing from './locales/en/pricing.json';
import enAutomation from './locales/en/automation.json';
import enLegal from './locales/en/legal.json';
import enPages from './locales/en/pages.json';

import esCommon from './locales/es/common.json';
import esNav from './locales/es/navigation.json';
import esHome from './locales/es/home.json';
import esAbout from './locales/es/about.json';
import esServices from './locales/es/services.json';
import esIndustries from './locales/es/industries.json';
import esContact from './locales/es/contact.json';
import esBlog from './locales/es/blog.json';
import esPricing from './locales/es/pricing.json';
import esAutomation from './locales/es/automation.json';
import esLegal from './locales/es/legal.json';
import esPages from './locales/es/pages.json';

export const SUPPORTED_LANGUAGES = ['en', 'es'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const LANGUAGE_LABELS: Record<SupportedLanguage, { short: string; long: string }> = {
  en: { short: 'EN', long: 'English' },
  es: { short: 'ES', long: 'Español' },
};

const LANG_STORAGE_KEY = 'i18nextLng';

const resources = {
  en: {
    common: enCommon,
    navigation: enNav,
    home: enHome,
    about: enAbout,
    services: enServices,
    industries: enIndustries,
    contact: enContact,
    blog: enBlog,
    pricing: enPricing,
    automation: enAutomation,
    legal: enLegal,
    pages: enPages,
  },
  es: {
    common: esCommon,
    navigation: esNav,
    home: esHome,
    about: esAbout,
    services: esServices,
    industries: esIndustries,
    contact: esContact,
    blog: esBlog,
    pricing: esPricing,
    automation: esAutomation,
    legal: esLegal,
    pages: esPages,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true,
    defaultNS: 'common',
    ns: [
      'common',
      'navigation',
      'home',
      'about',
      'services',
      'industries',
      'contact',
      'blog',
      'pricing',
      'automation',
      'legal',
      'pages',
    ],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: LANG_STORAGE_KEY,
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

const applyHtmlLang = (lng: string) => {
  if (typeof document !== 'undefined') {
    const normalized = (SUPPORTED_LANGUAGES as readonly string[]).includes(lng)
      ? lng
      : DEFAULT_LANGUAGE;
    document.documentElement.setAttribute('lang', normalized);
  }
};

applyHtmlLang(i18n.language || DEFAULT_LANGUAGE);
i18n.on('languageChanged', applyHtmlLang);

export default i18n;
