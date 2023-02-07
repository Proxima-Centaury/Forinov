/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { FooterInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import FooterStyles from "../public/stylesheets/layout/Footer.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Footer */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Footer = (pageProps: FooterInterface) => {
    const { states, config }: any = pageProps;
    const { translations }: any = states;
    const { footer }: any = config.navigations.common.layout;
    return <footer className={ FooterStyles.footer }>
        <div className={ FooterStyles.section }>
            <Image src="/assets/logo.png" alt="Forinov logo" width="50" height="50"/>
            <p>{ translations["Forinov connecte startups, entreprises et partenaires pour matcher l'offre et le besoin d'innovation."] }</p>
            <div className={ FooterStyles.socials }>
                <a href="https://twitter.com/Forinov1" target="_blank">
                    <i className="fa-brands fa-twitter"/>
                </a>
                <a href="https://www.linkedin.com/company/forinov/" target="_blank">
                    <i className="fa-brands fa-linkedin"/>
                </a>
            </div>
            <Link className={ FooterStyles.contact } href="/contact">{ translations["Aide et support"] }</Link>
            <p>© Forinov { new Date().getFullYear() }</p>
        </div>
        { footer.map(({ text, nesting, nest }: any, key: KeyType) => {
            return <div key={ key } className={ FooterStyles.section }>
                <h6>{ translations[text] }</h6>
                { (nesting) ? <ul>
                    { nest.map(({ url, text }: any, key: KeyType) => <li key={ key }>
                        <Link href={ url }>{ translations[text] }</Link>
                    </li>) }
                </ul> : null }
            </div>;
        }) }
    </footer>;
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Footer;