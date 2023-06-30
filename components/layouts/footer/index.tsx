/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
import Select from "@fields/select";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TFooterSection } from "@typescript/types/TFooter";
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import FooterStyles from "@layouts/footer/Footer.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Footer */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Footer = (): JSX.Element => {
    const router = useRouter();
    const { locale, locales } =  router;
    const { t } = useTranslation("footer");
    const footer = require("@configurations/footer.json").sections;
    return <footer className={ FooterStyles.footer }>
        <div className="boxedContent">
            <div className={ FooterStyles.sections }>
                <div className={ FooterStyles.section }>
                    <Image src="/assets/logo.ico" alt={ t("footerLogoAlternativeText", { company: "Forinov" }) } width="50" height="50"/>
                    <p>{ t("footerMainText") }</p>
                    <div className={ FooterStyles.socials }>
                        <LinkButton classList="link" href="https://twitter.com/Forinov1" icon="fa-brands fa-twitter" locale={ locale }/>
                        <LinkButton classList="link" href="https://www.linkedin.com/company/forinov" icon="fa-brands fa-linkedin" locale={ locale }/>
                    </div>
                    <LinkButton classList="link" href="/contact" text={ t("footerHelpLink") } locale={ locale }/>
                    <p>© Forinov { new Date().getFullYear() }</p>
                </div>
                { footer.map((section: TFooterSection, key: number) => <div key={ key } className={ FooterStyles.section }>
                    <h6>{ t(section.title) }</h6>
                    <LineSeparator/>
                    { (section.links.length > 0) ? <ul>
                        { section.links.map((link: TButton, key: number) => <li key={ key }>
                            <LinkButton { ...link } text={ t(link?.text || "undefined") } locale={ locale }/>
                        </li>) }
                    </ul> : null }
                </div>) }
            </div>
            <div className={ FooterStyles.sections }>
                <Select options={ locales } defaultValue={ locale }/>
            </div>
        </div>
    </footer>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Footer;