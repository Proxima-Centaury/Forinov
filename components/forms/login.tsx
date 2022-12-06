/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { ButtonInterface, InputInterface, LoginInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Button from "../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/Button.module.css";
import FormStyles from "../../public/stylesheets/components/Form.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Form */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginForm = ({ states }: LoginInterface) => {
    const { translations }: any = states;
    const inputProps = [ "label", "type", "name", "placeholder", "version", "action", "defaultValue" ];
    const emailInputValues = [ translations["Adresse email"] + " *", "email", "email", "", 1, undefined, undefined ];
    const emailInputObject = buildProperties(inputProps, emailInputValues);
    const passwordInputValues = [ translations["Mot de passe"] + " *", "password", "password", "", 1, undefined, undefined ];
    const passwordInputObject = buildProperties(inputProps, passwordInputValues);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const loginButtonValues = [ ButtonStyles.callToAction, false, "", "", () => false, translations["Me connecter"], 0 ];
    const loginButtonObject = buildProperties(buttonProps, loginButtonValues);
    const googleButtonValues = [ ButtonStyles.callToActionAlternative, true, "fa-brands fa-google", "", () => false, translations["Me connecter avec"] + " Google", 0 ];
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
            <Link href="/register" className={ ButtonStyles.callToActionAlternative }>{ translations["Créer mon compte"] }</Link>
        </div>
        <div className={ FormStyles.row }>
            <Link href="/password/recover">{ translations["J'ai oublié mon mot de passe"] + " !" }</Link>
        </div>
        <div className="separatorOr">
            <span>{ translations["Ou"] }</span>
        </div>
        <div className={ FormStyles.row }>
            <Button { ...googleButtonObject as ButtonInterface }/>
        </div>
    </form>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginForm;