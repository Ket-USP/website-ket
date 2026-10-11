import { useTranslation } from "react-i18next";

const Contact = () => {
    const { t } = useTranslation();
    return (
        <>
            <h1>{t("navigation.contact")}</h1>

        </>
    )
}

export default Contact;
