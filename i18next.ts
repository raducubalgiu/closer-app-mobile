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
    defaultNS: undefined,

    resources: {
      ro: {
        common: require("./locales/ro/common.json"),
      },
      en: {
        common: require("./locales/en/common.json"),
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });
