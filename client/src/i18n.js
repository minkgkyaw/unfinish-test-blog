import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    debug: true,
    ns: ["common", "nav", "login", "register"],
    interpolation: {
      formatSeparator: ",",
      escapeValue: false, // not needed for react as it escapes by default
    },
    lng: ["en", "mm"],
    react: {
      useSuspense: true,
    },
  });

export default i18n;
