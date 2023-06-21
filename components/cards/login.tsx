/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LoginForm from "../../components/forms/login";
import Button from "../buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LoginStyles from "../../public/stylesheets/components/cards/Login.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Login Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const LoginCard = (loginProps: any) => {
    const { administration, states } = loginProps;
    const { translations } = states;
    return <>
        <div className={ LoginStyles.card }>
            { (!administration) ? <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov"] + " ?" } <Button button={ ButtonStyles.classicLink } href="/onboarding" text={ translations["Inscrivez-vous"] }/> !</p>
            </div> : null }
            <div className={ LoginStyles.body }>
                <LoginForm { ...loginProps } administration={ administration }/>
            </div>
            { (!administration) ? <div className={ LoginStyles.footer }>
                <p>{ translations["Une question, un problème"] + " ?" } <Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["Contactez-nous"] }/> !</p>
                <p>{ translations["Forinov s'engage à respecter vos données"] + "." }</p>
                <p>{ translations["En continuant votre inscription, vous acceptez nos"] } <Button button={ ButtonStyles.classicLink } href="https://fr.forinov.com/files/CGU%20v5.pdf" text={ translations["Conditions générales"].toLowerCase() }/>.</p>
            </div> : null }
        </div>
    </>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default LoginCard;