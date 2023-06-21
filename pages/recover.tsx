/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { HomeInterface } from "../typescript/interfaces";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Input from "../components/fields/input";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LostPasswordStyles from "../public/stylesheets/pages/LostPassword.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Recover */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Recover = (pageProps: HomeInterface) => {
    const { states, router } = pageProps;
    const { translations } = states;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        document.body.appendChild(script);
    })

    //get grecaptcha from localstorage
    const fromStorage = (key: string) => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    }

    //delete grecaptcha from localstorage
    const deleteStored = (key: string) => {
        localStorage.removeItem(key);
    }

    const expiredReCaptcha = () => (fromStorage("_grecaptcha")) ? deleteStored("_grecaptcha") : null;


    const [recaptcha, setRecaptcha] = useState(null);
    const [recaptchaValid, setRecaptchaValid] = useState(false);

    //if grecaptcha in localstorage, set it to state
    useEffect(() => {
        if (fromStorage("_grecaptcha")) {
            //fetch to check if grecaptcha is valid
            const verify = fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=6LfaUKoUAAAAAFsLxbSyLznUs6BSHeTglvZ8EzOO&response=${fromStorage("_grecaptcha")}`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setRecaptchaValid(true);
                    } else {
                        setRecaptchaValid(false);
                    }
                })
                .catch(err => console.log(err));
        }
        expiredReCaptcha();
    })
    return <div className={LostPasswordStyles.wrapper}>
        <div className={LostPasswordStyles.formContainer}>
            <div>
                <h1 className={LostPasswordStyles.title}>Récupération du mot de passe</h1>
                <h6 className={LostPasswordStyles.subtitle}>
                    Un Token de modification vous sera envoyé par email, valide uniquement quelques heures
                </h6>
            </div>
            <Input type="text" label={translations["Nom Prénom"]} name="name"/>
            <Input type="email" label={translations["Adresse e-mail"]} name="email"/>

            <div className="g-recaptcha" data-sitekey="6LfaUKoUAAAAAFsLxbSyLznUs6BSHeTglvZ8EzOO"></div>
            <button className={ButtonStyles.callToAction}>
                {translations["Recevoir le Token"]}
            </button>
        </div>
        <div className={LostPasswordStyles.image}>
            <Image
                src={router.basePath + "/assets/lost_password.jpeg"}
                alt=""
                fill
                style={{
                    objectFit: "cover",
                }}
            />
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: "https://www.forinov.fr/lostpassword.php",
            permanent: false
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Recover;
export { getServerSideProps };
