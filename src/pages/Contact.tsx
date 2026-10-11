import { useTranslation } from "react-i18next";
import { FaEnvelope, FaYoutube, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation("contact");

  const contactMethods = [
    {
      title: t("contactMethods.email"),
      description: "ket@icmc.usp.br",
      icon: FaEnvelope,
      href: "mailto:ket@icmc.usp.br",
    },
    {
      title: t("contactMethods.youtube"),
      description: "@KetUSP",
      icon: FaYoutube,
      href: "https://www.youtube.com/@KetUSP",
    },
    {
      title: t("contactMethods.instagram"),
      description: "@ket.usp",
      icon: FaInstagram,
      href: "https://www.instagram.com/ket.usp",
    },
  ];

  return (
    <>
      <section className="pt-12 pb-16 md:pt-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("description")}
            </p>
            <p className="text-2xl font-medium mt-4">
              {t("callToAction")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("https:") ? "_blank" : undefined}
                rel={method.href.startsWith("https:") ? "noopener noreferrer" : undefined}
                className="block rounded-lg md:col-span-2 md:last:col-start-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <div className="flex flex-col items-center p-8 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors">
                  <method.icon size={40} className="mb-4 text-white" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground">{method.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
