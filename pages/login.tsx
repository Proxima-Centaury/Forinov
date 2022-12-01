/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { LoginInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LoginStyles from "../public/stylesheets/components/cards/Login.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Login = ({ locales, states, stateSetters }: LoginInterface) => {
    const { translations }: any = states;
    const parentProps = { locales, states, stateSetters };
    return <>
        <Head>
            <title>Forinov - Connexion</title>
        </Head>
        <div className={ LoginStyles.card }>
            <div className={ LoginStyles.head }>
                <h2>{ translations["Accéder à tout Forinov"] }</h2>
                <p>{ translations["Pas encore membre Forinov ?"] }&nbsp;<Link href="/register">{ translations["Inscrivez-vous"] }</Link></p>
                
            </div>
            <div className={ LoginStyles.body }>

            <form className="login__form">
            <Link className="login__google-provider" href="">
                <i className="fa-brands fa-google"></i>
                {translations["Connexion avec Google"]}
            </Link>

            <div className="login__inputs">
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
            </div>
            </form>
            </div>
        </div>
    </>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Login;
export { getStaticProps };