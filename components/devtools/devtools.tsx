/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
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
    const { session, theme, translations }: any = states;
    const { setSession, setTheme }: any = stateSetters;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const loginButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-power-off", "", () => setSession(!session), "", 0 ];
    const loginButtonObject = buildProperties(buttonProps, loginButtonValues);
    const themeButtonIcon = (theme === "light") ? "fa-light fa-moon" : "fa-light fa-sun";
    const themeButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, themeButtonIcon, "", () => (theme === "light") ? setTheme("dark") : setTheme("light"), "", 0 ];
    const themeButtonObject = buildProperties(buttonProps, themeButtonValues);
    const issuesButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-triangle-exclamation", "", () => false, "", 0 ];
    const issuesButtonObject = buildProperties(buttonProps, issuesButtonValues);
    return <div data-type="devtools">
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
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Devtools;