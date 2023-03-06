/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { FooterInterface, ButtonInterface } from "../typescript/interfaces";
import { buildButtonProps } from "../scripts/utilities";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Button from "../components/buttons/button";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FooterStyles from "../public/stylesheets/layout/Footer.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Footer */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Footer = (pageProps: FooterInterface) => {
    const { states, layoutConfigurations, router }: any = pageProps;
    const { translations }: any = states;
    const { footer }: any = layoutConfigurations.navigations.common.layout;
    return <footer className={ FooterStyles.footer + " grid fourColumns" }>
        <div className={ FooterStyles.section }>
            <Image src={ router.basePath + "/assets/logo.png" } alt="Forinov logo" width="50" height="50"/>
            <p>{ translations["Forinov connecte startups, entreprises et partenaires pour matcher l'offre et le besoin d'innovation."] }</p>
            <div className={ FooterStyles.socials }>
                <Button { ...buildButtonProps(translations, "footerTwitter") as ButtonInterface }/>
                <Button { ...buildButtonProps(translations, "footerLinkedin") as ButtonInterface }/>
            </div>
                <Button { ...buildButtonProps(translations, "footerContact") as ButtonInterface }/>
            <p>© Forinov { new Date().getFullYear() }</p>
        </div>
        { footer.map(({ text, nesting, nest }: any, key: KeyType) => {
            return <div key={ key } className={ FooterStyles.section }>
                <h6>{ translations[text] }</h6>
                { (nesting) ? <ul>
                    { nest.map(({ url, text }: any, key: KeyType) => <li key={ key }>
                        {/* <Button { ...buildButtonProps(undefined, undefined, undefined, url, undefined, translations[text]) as ButtonInterface }/> */}
                        <Button { ...buildButtonProps(translations, "footerLink") as ButtonInterface } url={ url } text={ translations[text] }/>
                    </li>) }
                </ul> : null }
            </div>;
        }) }
    </footer>;
}
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Footer;