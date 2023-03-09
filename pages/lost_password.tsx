import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";

import LostPasswordStyles from "../public/stylesheets/pages/LostPassword.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
import Image from 'next/image';
import Input from '../components/fields/input';
import { useEffect } from 'react';



export default function LostPassword(pageProps: HomeInterface) {
    const { states, router }: any = pageProps;
    const { metadatas, translations }: any = states;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        document.body.appendChild(script);
    })
    
    return (
        <div className={LostPasswordStyles.wrapper}>
            <div className={LostPasswordStyles.formContainer}>
                <div>
                    <h1 className={LostPasswordStyles.title}>Récupération du mot de passe</h1>
                    <h6 className={LostPasswordStyles.subtitle}>
                        Un Token de modification vous sera envoyé par email, valide uniquement quelques heures
                    </h6>
                </div>
                <Input
                    type="text"
                    label={translations["Nom Prénom"]}
                    placeholder={""}
                    name="name"
                    version={2}
                    action={() => { }}
                    defaultValue={""}
                ></Input>
                <Input
                    type="email"
                    label={translations["Adresse e-mail"]}
                    placeholder={""}
                    name="email"
                    version={2}
                    action={() => { }}
                    defaultValue={""}
                ></Input>

                <div className="g-recaptcha" data-sitekey="6LfaUKoUAAAAAFsLxbSyLznUs6BSHeTglvZ8EzOO"></div>
                <button className={ButtonStyles.callToAction}>
                    {translations["Recevoir le Token"]}
                </button>
            </div>
            <div className={LostPasswordStyles.image}>
                <Image
                    src={router.basePath + "/assets/lost_password.jpeg"}
                    alt="Lost password"
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    )
}

const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);
    return {
        props: {
            locale, locales, defaultLocale,
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
