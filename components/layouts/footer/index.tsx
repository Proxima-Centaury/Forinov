/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CustomImage from "@contents/customImage";
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { FooterType, FooterSectionType } from "@typescript/types/FooterType";
import type { ButtonType } from "@typescript/types/ButtonType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import FooterStyles from "@layouts/footer/Footer.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Footer */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Footer = (params: FooterType): JSX.Element => {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation("footer");
    const footer: FooterSectionType[] = require("@configurations/footer.json").sections;
    return <footer className={ FooterStyles.footer }>
        <div className="boxedContent">
            <div className={ `${ FooterStyles.sections } grid fourColumns` }>
                <div className={ FooterStyles.section }>
                    <CustomImage src="/assets/logo.ico" alt={ t("footerLogoAlternativeText", { company: "Forinov" }) }/>
                    <p>{ t("footerMainText", { company: "Forinov" }) }</p>
                    <div className={ FooterStyles.socials }>
                        <LinkButton classList="link" href="https://twitter.com/Forinov1" icon="fa-brands fa-twitter" locale={ locale } ariaLabel={ t("footerTwitterLinkAriaLabel", { company: "Forinov" }) }/>
                        <LinkButton classList="link" href="https://www.linkedin.com/company/forinov" icon="fa-brands fa-linkedin" locale={ locale } ariaLabel={ t("footerLinkedInLinkAriaLabel", { company: "Forinov" }) }/>
                    </div>
                    <LinkButton classList="link" href="/contact" text={ t("footerHelpLink") } locale={ locale }/>
                    <p>© Forinov { new Date().getFullYear() }</p>
                </div>
                { footer.map((section: FooterSectionType, key: number) => <div key={ key } className={ FooterStyles.section }>
                    <p>{ t(section.title, { company: "Forinov" }) }</p>
                    <LineSeparator/>
                    { (section) ? <ul>
                        { section?.links?.map((link: ButtonType, key: number) => <li key={ key }>
                            <LinkButton { ...link } text={ t(link?.text || "undefined") } locale={ locale }/>
                        </li>) }
                    </ul> : null }
                </div>) }
            </div>
        </div>
    </footer>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Footer;