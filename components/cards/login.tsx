/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface } from "../../typescript/interfaces";
import { buildButtonProps } from "../../scripts/utilities";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
import LoginForm from "../../components/forms/login";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginStyles from "../../public/stylesheets/components/cards/Login.module.css";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Card */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginCard = (pageProps: any) => {
    const { states }: any = pageProps;
    const { translations, RGB }: any = states;
    return <>
        <div className={ LoginStyles.card } data-rgb={ (RGB) ? "enabled" : "disabled" }>
            <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov"] + " ?" } <Button { ...buildButtonProps(translations, "loginSignup") as ButtonInterface }/> !</p>
            </div>
            <div className={ LoginStyles.body }>
                <LoginForm { ...pageProps }/>
            </div>
            <div className={ LoginStyles.footer }>
                <p>{ translations["Une question, un problème"] + " ?" } <Button { ...buildButtonProps(translations, "loginContact") as ButtonInterface }/> !</p>
                <p>{ translations["Forinov s'engage à respecter vos données"] + "." }</p>
                <p>{ translations["En continuant votre inscription, vous acceptez nos"] } <Button { ...buildButtonProps(translations, "loginTerms") as ButtonInterface } text={ translations["Conditions générales"].toLowerCase() }/>.</p>
            </div>
        </div>
    </>;
};
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginCard;