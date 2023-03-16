import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

i18next
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ro",
    supportedLngs: ["ro", "en"],
    ns: [],
    defaultNS: "common",

    resources: {
      ro: {
        common: require("./locales/ro/common.json"),
        professions: require("./locales/ro/professions.json"),
        businesses: require("./locales/ro/businesses.json"),
      },
      en: {
        common: require("./locales/en/common.json"),
        professions: require("./locales/en/professions.json"),
        businesses: require("./locales/en/businesses.json"),
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });
