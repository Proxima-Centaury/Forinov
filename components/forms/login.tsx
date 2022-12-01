/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import FormStyles from "../../public/stylesheets/components/Form.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Form */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const LoginForm = () => {
    return <form className={ FormStyles.form }>
        <div className={ FormStyles.row }>
            <div className={ FormStyles.column }>
                <Input/>
            </div>
            <div className={ FormStyles.column }>
                <Input/>
            </div>
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