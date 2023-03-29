/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useEffect, useState } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Input from "../fields/input";
import Select from "../fields/select";
import Separator from "../separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
import ContactForm from "../forms/contact";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register Modal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ContactModal = (modalProps: any) => {
    const { states } = modalProps;
    const { translations, theme } = states;
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
    return <Fragment>
        <div className="header">
            <h6>{ translations["Contacter Forinov"] }</h6>
            <p>{ translations["Nos équipes vous répondront dans les meilleurs délais !"] }</p>
        </div>
        <Separator { ...modalProps }/>
        <ContactForm { ...modalProps }/>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ContactModal;