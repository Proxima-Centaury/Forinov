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
const LoginCard = ({ locales, states, stateSetters }: LoginInterface) => {
    const { translations }: any = states;
    const parentProps = { locales, states, stateSetters };
    return <>
        <div className={ LoginStyles.card }>
            <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov ?"] }&nbsp;<Link href="/register">{ translations["Inscrivez-vous"] }</Link>&nbsp;!</p>
            </div>
            <div className={ LoginStyles.body }>
                <LoginForm { ...parentProps }/>
            </div>
            <div className={ LoginStyles.footer }>
                <p dangerouslySetInnerHTML={ { __html: translations["Une question, une problème ? <a href='/contact'>Contactez-nous</a>"] + "." } }/>
                <p dangerouslySetInnerHTML={ { __html: translations["Forinov s'engage à respecter vos données"] + "." } }/>
                <p dangerouslySetInnerHTML={ { __html: translations["En continuant votre inscription, vous acceptez nos <a href='/terms'>conditions générales</a>"] + "." } }/>
            </div>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginCard;