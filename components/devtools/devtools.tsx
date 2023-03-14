/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEventHandler, useState, useEffect } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Devtools */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Devtools = ({ states, stateSetters }: any) => {
    const { session, theme, translations, RGB }: any = states;
    const { setSession, setTheme, setRGB }: any = stateSetters;
    const [ hidden, setHidden ] = useState(false);
    const [ themeSwitcherIcon, setThemeSwitcherIcon ] = useState("fa-light fa-moon");
    const [ RGBSwitcherIcon, setRGBSwitcherIcon ] = useState("fa-light fa-lightbulb");
    const switchSessionState: MouseEventHandler = (event) => {
        event.preventDefault();
        setSession(!session);
    };
    const switchThemeState: MouseEventHandler = (event) => {
        event.preventDefault();
        (theme === "light") ? setTheme("dark") : setTheme("light")
    };
    const switchRGBState: MouseEventHandler = (event) => {
        event.preventDefault();
        setRGB(!RGB);
    };
    const switchHiddenState: MouseEventHandler = (event) => {
        event.preventDefault();
        setHidden(!hidden)
    };
    useEffect(() => (theme === "light") ? setThemeSwitcherIcon("fa-light fa-moon") : setThemeSwitcherIcon("fa-light fa-sun"), [ theme ]);
    useEffect(() => (RGB) ? setRGBSwitcherIcon("fa-light fa-lightbulb") : setRGBSwitcherIcon("fa-light fa-lightbulb-on"), [ RGB ]);
    return <div className={ (hidden) ? "closed" : "" } data-type="devtools">
        <p>Devtools</p>
        <div data-type="tooltip" data-tooltip={ translations["Simuler la connexion"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchSessionState } icon="fa-light fa-power-off"/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Changer de theme"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchThemeState } icon={ themeSwitcherIcon }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Voir les erreurs sur la page"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchRGBState } icon="fa-light fa-triangle-exclamation" disabled={ true }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Activer l'éclairage RGB"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchRGBState } icon={ RGBSwitcherIcon }/>
        </div>
        <button title={ translations["Afficher les devtools"] } onClick={ switchHiddenState }>
            <i className="fa-light fa-chevron-down"/>
        </button>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Devtools;