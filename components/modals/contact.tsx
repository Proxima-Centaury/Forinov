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
import { useEffect } from 'react';
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register Modal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ContactModal = ({ translations }: any) => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        document.body.appendChild(script);
    })

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
                <div className="g-recaptcha" data-sitekey="6LfaUKoUAAAAAFsLxbSyLznUs6BSHeTglvZ8EzOO"></div>
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