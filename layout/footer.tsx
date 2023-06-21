/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { FooterInterface } from "../typescript/interfaces";
import { checkMatch } from "../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Button from "../components/buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import FooterStyles from "../public/stylesheets/layout/Footer.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Footer */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Footer = (pageProps: FooterInterface) => {
    const { states, layoutConfigurations, router }: any = pageProps;
    const { translations }: any = states;
    const { footer }: any = layoutConfigurations.navigations.common.layout;
    return <footer className={ FooterStyles.footer + " grid fourColumns" }>
        <div className={ FooterStyles.section }>
            <Image src={ router.basePath + "/assets/logo.png" } alt={ translations["Logo de l'entreprise du nom de"] + " " + "Forinov" + "." } width="50" height="50"/>
            <p>{ translations["Forinov connecte startups, entreprises et partenaires pour matcher l'offre et le besoin d'innovation."] }</p>
            <div className={ FooterStyles.socials }>
                <a className={ ButtonStyles.default } href="https://twitter.com/Forinov1" target="_blank">
                    <i className="fa-brands fa-twitter"/>
                </a>
                <a className={ ButtonStyles.default } href="https://www.linkedin.com/company/forinov" target="_blank">
                    <i className="fa-brands fa-linkedin"/>
                </a>
            </div>
            <Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["Aide et support"] }/>
            <p>© Forinov { new Date().getFullYear() }</p>
        </div>
        { footer.map(({ text, nesting, nest }: any, key: KeyType) => {
            return <div key={ key } className={ FooterStyles.section }>
                <h6>{ translations[text] }</h6>
                { (nesting) ? <ul>
                    { nest.map(({ url, text }: any, key: KeyType) => <li key={ key }>
                        { (checkMatch(url, "https")) ? <a className={ ButtonStyles.default } href={ url }>{ translations[text] }</a> : <Button button={ ButtonStyles.default } href={ url } text={ translations[text] }/> }
                    </li>) }
                </ul> : null }
            </div>;
        }) }
    </footer>;
}
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Footer;