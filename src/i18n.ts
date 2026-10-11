import i18n from "i18next";
import { initReactI18next } from "react-i18next";

let language = "pt";
try {
  const saved = window.localStorage.getItem("i18nextLng");
  if (saved === "pt" || saved === "en") language = saved;
} catch {
  // Language switching still works when browser storage is unavailable.
}

void i18n.use(initReactI18next).init({
  lng: language,
  fallbackLng: "pt",
  supportedLngs: ["pt", "en"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  resources: {
    pt: { common: {
      navigation: { projects: "Projetos", talks: "Palestras", classes: "Aulas", about: "Sobre", contact: "Contato" },
      languageSelector: { label: "Selecionar idioma", pt: "Português", en: "English" },
      footer: "Footer do KET",
      scroll: "Rolagem da página",
    } },
    en: { common: {
      navigation: { projects: "Projects", talks: "Talks", classes: "Classes", about: "About", contact: "Contact" },
      languageSelector: { label: "Select language", pt: "Português", en: "English" },
      footer: "KET footer",
      scroll: "Page scroll",
    } },
  },
});

document.documentElement.lang = language;
i18n.on("languageChanged", (nextLanguage) => {
  document.documentElement.lang = nextLanguage;
  try { window.localStorage.setItem("i18nextLng", nextLanguage); } catch { /* Storage is optional. */ }
});

export default i18n;
