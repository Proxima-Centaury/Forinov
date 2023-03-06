/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface, InputInterface } from "../../typescript/interfaces";
import { buildProperties, buildButtonProps } from "../../scripts/utilities";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Button from "../buttons/button";
import Separator from "../separators/separator";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FormStyles from "../../public/stylesheets/components/Form.module.css";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Form */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginForm = (pageProps: any) => {
    const { states }: any = pageProps;
    const { translations }: any = states;
    const inputProps = [ "label", "type", "name", "action" ];
    const emailInputValues = [ translations["Adresse email"] + " *", "email", "email", undefined ];
    const emailInputObject = buildProperties(inputProps, emailInputValues);
    const passwordInputValues = [ translations["Mot de passe"] + " *", "password", "password", undefined ];
    const passwordInputObject = buildProperties(inputProps, passwordInputValues);
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
            <Button { ...buildButtonProps(translations, "loginSignin") as ButtonInterface }/>
        </div>
        <div className={ FormStyles.row }>
            <Button { ...buildButtonProps(translations, "loginSignupCTA") as ButtonInterface }/>
        </div>
        <div className={ FormStyles.row }>
            <Button { ...buildButtonProps(translations, "loginPasswordRecover") as ButtonInterface } text={ translations["J'ai oublié mon mot de passe"] + " !" }/>
        </div>
        <Separator { ...pageProps } type="or"/>
        <div className={ FormStyles.row }>
            <Button { ...buildButtonProps(translations, "loginGoogle") as ButtonInterface } text={ translations["Me connecter avec"] + " Google" }/>
        </div>
    </form>;
};
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginForm;