/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginForm from "../../components/forms/login";
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginStyles from "../../public/stylesheets/components/cards/Login.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginCard = (pageProps: any) => {
    const { states }: any = pageProps;
    const { translations }: any = states;
    return <>
        <div className={ LoginStyles.card }>
            <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov"] + " ?" } <Link href="/onboarding">{ translations["Inscrivez-vous"] }</Link> !</p>
            </div>
            <div className={ LoginStyles.body }>
                <LoginForm { ...pageProps }/>
            </div>
            <div className={ LoginStyles.footer }>
                <Format { ...pageProps } content={ translations["Une question, un problème ? [Contactez-nous=/contact]"] }/>
                <p>{ translations["Forinov s'engage à respecter vos données"] + "." }</p>
                <Format { ...pageProps } content={ translations["En continuant votre inscription, vous acceptez nos [conditions générales=https://fr.forinov.com/files/CGU%20v5.pdf]"] }/>
            </div>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginCard;