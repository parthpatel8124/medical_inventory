import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { "Welcome": "Welcome", "Stock": "Stock" } },
  fr: { translation: { "Welcome": "Bienvenue", "Stock": "Stock" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
