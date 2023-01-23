/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties, preventSubmit } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Devtools */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Devtools = ({ states, stateSetters }: any) => {
    const { session, theme, translations, RGB }: any = states;
    const { setSession, setTheme, setRGB }: any = stateSetters;
    const [ hidden, setHidden ] = useState(false);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count", "disabled" ];
    const loginButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-power-off", "", () => setSession(!session), "", 0 ];
    const loginButtonObject = buildProperties(buttonProps, loginButtonValues);
    const themeButtonIcon = (theme === "light") ? "fa-light fa-moon" : "fa-light fa-sun";
    const themeButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, themeButtonIcon, "", () => (theme === "light") ? setTheme("dark") : setTheme("light"), "", 0 ];
    const themeButtonObject = buildProperties(buttonProps, themeButtonValues);
    const issuesButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-triangle-exclamation", "", () => false, "", 0, true ];
    const issuesButtonObject = buildProperties(buttonProps, issuesButtonValues);
    const RGBButtonIcon = (RGB) ? "fa-light fa-lightbulb" : "fa-light fa-lightbulb-on";
    const RGBButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, RGBButtonIcon, "", () => setRGB(!RGB), "", 0 ];
    const RGBButtonObject = buildProperties(buttonProps, RGBButtonValues);
    return <div className={ (hidden) ? "closed" : "" } data-type="devtools">
        <p>Devtools</p>
        <div data-type="tooltip" data-tooltip={ translations["Simuler la connexion"] }>
            <Button { ...loginButtonObject as ButtonInterface }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Changer de theme"] }>
            <Button { ...themeButtonObject as ButtonInterface }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Voir les erreurs sur la page"] }>
            <Button { ...issuesButtonObject as ButtonInterface }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Activer l'éclairage RGB"] }>
            <Button { ...RGBButtonObject as ButtonInterface }/>
        </div>
        <button title={ translations["Afficher les devtools"] } onClick={ (event) => preventSubmit(event as any, () => setHidden(!hidden)) }>
            <i className="fa-light fa-chevron-down"/>
        </button>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Devtools;