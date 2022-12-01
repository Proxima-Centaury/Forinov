/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { LoginInterface } from "../../typescript/interfaces";
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
    const emailInputProps = {
        label: translations["Adresse email"] + " *",
        type: "text",
        name: "email",
        placeholder: "",
        version: 1,
        action: undefined,
        defaultValue: undefined
    };
    const passwordInputProps = {
        label: translations["Mot de passe"] + " *",
        type: "text",
        name: "password",
        placeholder: "",
        version: 1,
        action: undefined,
        defaultValue: undefined
    };
    const loginButtonProps = {
        type: ButtonStyles.callToAction,
        faIcon: false,
        faIconClass: "",
        url: "",
        action: () => false,
        text: translations["Me connecter"],
        count: 0
    };
    return <form className={ FormStyles.form }>
        <div className={ FormStyles.row }>
            <div className={ FormStyles.column }>
                <Input { ...emailInputProps }/>
            </div>
            <div className={ FormStyles.column }>
                <Input { ...passwordInputProps }/>
            </div>
        </div>
        <div className={ FormStyles.row }>
            <Button { ...loginButtonProps }/>
        </div>
        <div className={ FormStyles.row }>
            <Link href="/register" className={ ButtonStyles.callToActionAlternative }>{ translations["Créer mon compte"] }</Link>
        </div>
        {/* <div className="login__inputs">
            <input
            type="text"
            className="login__input"
            id="Email"
            name="Email"
            placeholder={translations["Adresse mail *"]}
            required
            />
            <input
            type="password"
            className="login__input"
            id="Password"
            name="Password"
            placeholder={translations["Mot de passe *"]}
            required
            />
        </div>
        <input
            type="submit"
            className="callToAction login__submit  login__signin"
            value={translations["Se connecter"]}
        />
        <input
            type="submit"
            className="callToActionAlternative login__submit login__signup"
            value={translations["Créer son compte"]}
        />

        <Link href="" style={{ marginTop: "2em", marginBottom: "4em" }}>
            {translations["Mot de passe oublié ?"]}
        </Link>

        <div className="login__details">
            <p>
            {translations["Une question, un problème ? "]}
            <Link href="">{translations["Nous contacter"]}</Link>
            </p>
            <p>
            {translations["FORINOV s'engage à respecter vos données."]}
            </p>
            <p>
            {
                translations[
                "En continuant votre inscription, vous acceptez nos "
                ]
            }
            <Link href="">{translations["Conditions Générales"]}</Link>
            ..
            </p>
        </div> */}
    </form>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default LoginForm;