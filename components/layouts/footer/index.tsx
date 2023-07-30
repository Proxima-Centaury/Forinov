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
import type { TFooter, TFooterSection } from "@typescript/types/TFooter";
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import FooterStyles from "@layouts/footer/Footer.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Footer */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Footer = (params: TFooter): JSX.Element => {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation("footer");
    const footer: TFooterSection[] = require("@configurations/footer.json").sections;
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
                { footer.map((section: TFooterSection, key: number) => <div key={ key } className={ FooterStyles.section }>
                    <h6>{ t(section.title, { company: "Forinov" }) }</h6>
                    <LineSeparator/>
                    { (section.links.length > 0) ? <ul>
                        { section.links.map((link: TButton, key: number) => <li key={ key }>
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