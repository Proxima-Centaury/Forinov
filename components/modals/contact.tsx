/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Input from "../fields/input";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
import Select from '../fields/select';
import { useEffect, useState } from 'react';
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register Modal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ContactModal = ({ translations, theme }: any) => {
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
    }, [])


    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "5rem",
                gap: "2rem",
            }}
        >
            <div>

                <h1
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                    }}
                >{translations["Contacter Forinov"]}</h1>
                <p style={{
                    opacity: 0.5,
                }}>{translations["Nos équipes vous répondront dans les meilleurs délais !"]}</p>
            </div>
            <Input
                label={translations["Société"]}
                type="text"
                name="company"
                version={1}
                action={() => { }}
                defaultValue=""
                placeholder=""
            ></Input>
            <Input
                label={translations["Nom Prénom"]}
                type="text"
                name="name"
                version={1}
                action={() => { }}
                defaultValue=""
                placeholder=""
            ></Input>
            <Input
                label={"Email"}
                type="text"
                name="email"
                version={1}
                action={() => { }}
                defaultValue=""
                placeholder=""
            ></Input>
            <Input
                label={translations["Téléphone"]}
                type="text"
                name="phone"
                version={1}
                action={() => { }}
                defaultValue=""
                placeholder=""
            ></Input>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <select name="" id=""
                    defaultValue={translations["Sujet"]}
                >
                    <option value="">{translations["Sujet"]}</option>
                    <option value="">Option 2</option>
                    <option value="">Option 3</option>
                </select>
            </div>
            <textarea name="" id="" cols={30} rows={10} placeholder="Message.." style={{
                border: "var(--border)",
                padding: "1rem",
                resize: "none",
                width: "100%",
            }}></textarea>
            <div className="g-recaptcha" data-sitekey="6LfaUKoUAAAAAFsLxbSyLznUs6BSHeTglvZ8EzOO"
                data-theme={theme}
            ></div>
            <button className={ButtonStyles.callToAction}>
                {translations["Envoyer"]}
            </button>
        </div>
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ContactModal;