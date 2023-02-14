/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import LoginForm from "../../components/forms/login";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginStyles from "../../public/stylesheets/components/cards/Login.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
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
                <p>{ translations["Pas encore membre Forinov"] + " ?" } <Link href="/onboarding" className={ ButtonStyles.pureLink }>{ translations["Inscrivez-vous"] }</Link> !</p>
            </div>
            <div className={ LoginStyles.body }>
                <LoginForm { ...pageProps }/>
            </div>
            <div className={ LoginStyles.footer }>
                <p>{ translations["Une question, un problème"] + " ?" } <Link href="/onboarding" className={ ButtonStyles.pureLink }>{ translations["Contactez-nous"] }</Link> !</p>
                <p>{ translations["Forinov s'engage à respecter vos données"] + "." }</p>
                <p>{ translations["En continuant votre inscription, vous acceptez nos"] } <Link href="https://fr.forinov.com/files/CGU%20v5.pdf" className={ ButtonStyles.pureLink }>{ translations["Conditions générales"].toLowerCase() }</Link>.</p>
            </div>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginCard;