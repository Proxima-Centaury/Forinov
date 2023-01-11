/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { LoginInterface } from "../../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginForm from "../../components/forms/login";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginStyles from "../../public/stylesheets/components/cards/Login.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginCard = ({ locales, states, stateSetters, config }: LoginInterface) => {
    const { translations }: any = states;
    const parentProps = { locales, states, stateSetters, config };
    return <>
        <div className={ LoginStyles.card }>
            <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov"] + " ?" }&nbsp;<Link href="/onboarding">{ translations["Inscrivez-vous"] }</Link>&nbsp;!</p>
            </div>
            <div className={ LoginStyles.body }>
                <LoginForm { ...parentProps }/>
            </div>
            <div className={ LoginStyles.footer }>
                <div>
                    <p dangerouslySetInnerHTML={ { __html: translations["Une question, un problème"] + " ?" } }/>
                    &nbsp;
                    <Link href="/contact">{ translations["Contactez-nous"] }</Link>
                    .
                </div>
                <p dangerouslySetInnerHTML={ { __html: translations["Forinov s'engage à respecter vos données"] + "." } }/>
                <div>
                    <p dangerouslySetInnerHTML={ { __html: translations["En continuant votre inscription, vous acceptez nos"] } }/>
                    &nbsp;
                    <Link href='/terms'>{ translations["Conditions générales"].toLowerCase() }</Link>
                    .
                </div>
            </div>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginCard;