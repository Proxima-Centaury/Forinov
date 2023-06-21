/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Input from "../fields/input";
import Button from "../buttons/button";
import Separator from "../separators/separator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import FormStyles from "../../public/stylesheets/components/Form.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Login Form */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const LoginForm = (pageProps: any) => {
    const { administration, states } = pageProps;
    const { translations } = states;
    return <form className={ FormStyles.form }>
        { (!administration) ? <div className={ FormStyles.row }>
            <div className={ FormStyles.column }>
                <Input label={ translations["Adresse email"] + " *" } type="email" name="email"/>
            </div>
            <div className={ FormStyles.column }>
                <Input label={ translations["Mot de passe"] + " *" } type="password" name="password"/>
            </div>
        </div> : <div className="list">
            <Input label={ translations["Adresse email"] + " *" } type="email" name="email"/>
            <Input label={ translations["Mot de passe"] + " *" } type="password" name="password"/>
        </div> }
        <div className={ FormStyles.row }>
            <Button button={ ButtonStyles.callToAction } text={ translations["Me connecter"] }/>
        </div>
        <div className={ FormStyles.row }>
            <Button button={ ButtonStyles.callToActionAlternative } href="/onboarding" text={ translations["Créer mon compte"] }/>
        </div>
        <div className={ FormStyles.row }>
            <Button button={ ButtonStyles.classicLink } href="/recover" text={ translations["J'ai oublié mon mot de passe"] + " !" }/>
        </div>
        <Separator { ...pageProps } type="or"/>
        <div className={ FormStyles.row }>
            <Button button={ ButtonStyles.callToActionAlternative } icon="fa-brands fa-google" text={ translations["Me connecter avec"] + " Google" }/>
        </div>
    </form>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default LoginForm;