/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface, InputInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Input from "../fields/input";
import Button from "../buttons/button";
import Separator from "../separators/separator";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import FormStyles from "../../public/stylesheets/components/Form.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Form */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginForm = (pageProps: any) => {
    const { states }: any = pageProps;
    const { translations }: any = states;
    const inputProps = [ "label", "type", "name", "action" ];
    const emailInputValues = [ translations["Adresse email"] + " *", "email", "email", undefined ];
    const emailInputObject = buildProperties(inputProps, emailInputValues);
    const passwordInputValues = [ translations["Mot de passe"] + " *", "password", "password", undefined ];
    const passwordInputObject = buildProperties(inputProps, passwordInputValues);
    const buttonProps = [ "type", "faIcon", "faIconClass", "action", "text" ];
    const loginButtonValues = [ ButtonStyles.callToAction, false, "", undefined, translations["Me connecter"] ];
    const loginButtonObject = buildProperties(buttonProps, loginButtonValues);
    const googleButtonValues = [ ButtonStyles.callToActionAlternative, true, "fa-brands fa-google", undefined, translations["Me connecter avec"] + " Google" ];
    const googleButtonObject = buildProperties(buttonProps, googleButtonValues);
    return <form className={ FormStyles.form }>
        <div className={ FormStyles.row }>
            <div className={ FormStyles.column }>
                <Input { ...emailInputObject as InputInterface }/>
            </div>
            <div className={ FormStyles.column }>
                <Input { ...passwordInputObject as InputInterface }/>
            </div>
        </div>
        <div className={ FormStyles.row }>
            <Button { ...loginButtonObject as ButtonInterface }/>
        </div>
        <div className={ FormStyles.row }>
            <Link href="/onboarding" className={ ButtonStyles.callToActionAlternative }>{ translations["Créer mon compte"] }</Link>
        </div>
        <div className={ FormStyles.row }>
            <Link href="/password/recover" className={ ButtonStyles.pureLink }>{ translations["J'ai oublié mon mot de passe"] + " !" }</Link>
        </div>
        <Separator { ...pageProps } type="or"/>
        <div className={ FormStyles.row }>
            <Button { ...googleButtonObject as ButtonInterface }/>
        </div>
    </form>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginForm;