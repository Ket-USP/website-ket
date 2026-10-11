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
    }, contact: {
      title: "Contato",
      description: "Entre em contato com o KET e acompanhe nossas redes sociais.",
      callToAction: "Vamos conversar!",
      contactMethods: { email: "E-mail", youtube: "YouTube", instagram: "Instagram" },
    }, about: {
      title: "Sobre o grupo",
      advisor: "Orientadora",
      advisorName: "Nome da orientadora",
      members: "Membros do grupo",
      memberName: "Nome do membro {{number}}",
      memberRole: "Curso / função no grupo",
      email: "E-mail",
      emailPlaceholder: "E-mail da orientadora",
      profile: "Perfil acadêmico",
      profilePlaceholder: "Link do perfil acadêmico",
    } },
    en: { common: {
      navigation: { projects: "Projects", talks: "Talks", classes: "Classes", about: "About", contact: "Contact" },
      languageSelector: { label: "Select language", pt: "Português", en: "English" },
      footer: "KET footer",
      scroll: "Page scroll",
    }, contact: {
      title: "Contact",
      description: "Get in touch with KET and follow us on social media.",
      callToAction: "Let's talk!",
      contactMethods: { email: "Email", youtube: "YouTube", instagram: "Instagram" },
    }, about: {
      title: "About the group",
      advisor: "Advisor",
      advisorName: "Advisor name",
      members: "Group members",
      memberName: "Member name {{number}}",
      memberRole: "Degree / role in the group",
      email: "Email",
      emailPlaceholder: "Advisor email",
      profile: "Academic profile",
      profilePlaceholder: "Academic profile link",
    } },
  },
});

document.documentElement.lang = language;
i18n.on("languageChanged", (nextLanguage) => {
  document.documentElement.lang = nextLanguage;
  try { window.localStorage.setItem("i18nextLng", nextLanguage); } catch { /* Storage is optional. */ }
});

export default i18n;
