import { useTranslation } from "react-i18next";
import { GroupIntroduction } from "../components/about/GroupIntroduction";
import { AdvisorSection } from "../components/about/AdvisorSection";
import { MembersSection } from "../components/about/MembersSection";
import { members } from "../data/members";

// Edite aqui o texto do grupo e os dados da orientadora.
const groupDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien at justo tincidunt interdum. Integer porta, lorem eget tincidunt consequat, purus sapien facilisis justo, ut fermentum neque magna a nulla. Curabitur euismod, nisl vel egestas tincidunt, urna neque dignissim augue, vitae suscipit justo velit ac ipsum. Donec quis lacus at erat posuere volutpat. Praesent convallis libero vitae risus tincidunt, ac malesuada lectus pellentesque.";

const advisor = {
  name: "Krissia de Zawadzki",
  photo: "/images/Krissia.jpg",
  description: "Krissia de Zawadzki é professora doutora no Instituto de Física de São Carlos da USP, onde se formou em Física Computacional e concluiu o mestrado e o doutorado. Com experiência de pesquisa no Brasil e no exterior, atua em informação quântica, matéria condensada e computação quântica, desenvolvendo métodos numéricos para estudar sistemas fortemente correlacionados.",
  contacts: [
    { label: "Site Pessoal", value: "Conheça", href: "https://krissia-zawadzki.owlstown.net/" },
    { label: "Perfil acadêmico", value: "Pesquisas", href: "https://scholar.google.com/citations?user=zGY2NOkAAAAJ&hl=pt-BR" },
  ],
};

export default function About() {
  const { t } = useTranslation("about");

  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 pt-12 pb-16 md:px-8 md:pt-16">
      <GroupIntroduction title={t("title")} description={groupDescription} />
      <AdvisorSection
        title={t("advisor")}
        name={advisor.name}
        photo={advisor.photo}
        description={advisor.description}
        contacts={advisor.contacts}
      />
      <MembersSection title={t("members")} members={members} />
    </div>
  );
}
