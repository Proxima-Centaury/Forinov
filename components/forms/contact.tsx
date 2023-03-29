/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { InputInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Select from "../fields/select";
import Button from "../buttons/button";
import Separator from "../separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FormStyles from "../../public/stylesheets/components/Form.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Contact Form */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ContactForm = (pageProps: any) => {
    const { states } = pageProps;
    const { translations } = states;
    return <form className={ FormStyles.form }>
        <div className={ FormStyles.row }>
            <div className={ FormStyles.column }>
                <Input label={ translations["Société"] } type="text" name="company"/>
            </div>
            <div className={ FormStyles.column }>
                <Input label={ translations["Nom Prénom"] } type="text" name="name"/>
            </div>
        </div>
        <div className={ FormStyles.row }>
            <div className={ FormStyles.column }>
                <Input label={ translations["Adresse email"] } type="text" name="email"/>
            </div>
            <div className={ FormStyles.column }>
                <Input label={ translations["Téléphone"] } type="text" name="phone"/>
            </div>
        </div>
        {/* <div
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
        </div> */}
        <div className={ FormStyles.row }>
            <Select placeholder={ translations["Sujet"] }/>
        </div>
        <div className={ FormStyles.row }>
            <textarea name="" id="" cols={30} rows={10} placeholder="Message.." style={{
                border: "var(--border)",
                padding: "1rem",
                resize: "none",
                width: "100%",
            }}></textarea>
        </div>
        <div className={ FormStyles.row }>
            <Button button={ ButtonStyles.callToAction } text={ translations["Envoyer"] }/>
        </div>
        <div className="g-recaptcha" data-sitekey="6LfaUKoUAAAAAFsLxbSyLznUs6BSHeTglvZ8EzOO"/>
    </form>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ContactForm;