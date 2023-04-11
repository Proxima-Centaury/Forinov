/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginForm from "../../components/forms/login";
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginStyles from "../../public/stylesheets/components/cards/Login.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginCard = (loginProps: any) => {
    const { states } = loginProps;
    const { translations } = states;
    return <>
        <div className={ LoginStyles.card }>
            <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov"] + " ?" } <Button button={ ButtonStyles.classicLink } href="/onboarding" text={ translations["Inscrivez-vous"] }/> !</p>
            </div>
            <div className={ LoginStyles.body }>
                <LoginForm { ...loginProps }/>
            </div>
            <div className={ LoginStyles.footer }>
                <p>{ translations["Une question, un problème"] + " ?" } <Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["Contactez-nous"] }/> !</p>
                <p>{ translations["Forinov s'engage à respecter vos données"] + "." }</p>
                <p>{ translations["En continuant votre inscription, vous acceptez nos"] } <Button button={ ButtonStyles.classicLink } href="https://fr.forinov.com/files/CGU%20v5.pdf" text={ translations["Conditions générales"].toLowerCase() }/>.</p>
            </div>
        </div>
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginCard;