import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common from "./translation/common.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    ro: {
      translation: common,
    },
  },
  lng: "ro",
  fallbackLng: "ro",

  interpolation: {
    escapeValue: false,
  },
});
