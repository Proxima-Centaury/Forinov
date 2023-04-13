/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEventHandler, useState, useEffect } from "react";
import errorsHandlerInstance from "../../scripts/errors";
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
const Devtools = (devtoolsProps: any) => {
    const { states, stateSetters, router } = devtoolsProps;
    const { errors, session, theme, translations, RGB } = states;
    const { setErrors, setSession, setTheme, setModal, setRGB } = stateSetters;
    const [ hidden, setHidden ] = useState(false);
    const [ themeSwitcherIcon, setThemeSwitcherIcon ] = useState("fa-light fa-moon");
    const [ themeTopicSwitcherIcon, setThemeTopicSwitcherIcon ] = useState("fa-light fa-moon");
    const [ RGBSwitcherIcon, setRGBSwitcherIcon ] = useState("fa-light fa-lightbulb");
    const [ errorsCount, setErrorsCount ] = useState(0);
    const switchSessionState: MouseEventHandler = (event) => {
        event.preventDefault();
        setSession(!session);
    };
    const switchThemeState: MouseEventHandler = (event) => {
        event.preventDefault();
        (theme === "light") ? setTheme("dark") : setTheme("light");
    };
    const switchThemeTopic: MouseEventHandler = (event) => {
        event.preventDefault();
        (theme !== "matrix") ? setTheme("matrix") : setTheme("dark");
    };
    const showPageErrors: MouseEventHandler = (event) => {
        event.preventDefault();
        setModal("errors");
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
    useEffect(() => (theme !== "matrix") ? setThemeTopicSwitcherIcon("fa-light fa-phone-volume") : setThemeTopicSwitcherIcon("fa-light fa-phone-hangup"), [ theme ]);
    useEffect(() => (RGB) ? setRGBSwitcherIcon("fa-light fa-lightbulb") : setRGBSwitcherIcon("fa-light fa-lightbulb-on"), [ RGB ]);
    useEffect(() => {
        const errorHandlerResponse: any = errorsHandlerInstance.startCheckings(router.asPath);
        setErrors(errorHandlerResponse.errors);
    }, [ router.asPath ]);
    useEffect(() => {
        setErrorsCount(Object.keys(errors).length);
    }, [ errors ]);
    return <div className={ (hidden) ? "closed" : "" } data-type="devtools">
        <p>Devtools</p>
        <div data-type="tooltip" data-tooltip={ translations["Simuler la connexion"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchSessionState } icon="fa-light fa-power-off" light={ RGB }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Changer de theme"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchThemeState } icon={ themeSwitcherIcon } light={ RGB }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Plonger au sein de la matrice"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchThemeTopic } icon={ themeTopicSwitcherIcon } light={ RGB }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Voir les erreurs sur la page"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ showPageErrors } icon="fa-light fa-triangle-exclamation" notifications={ errorsCount } light={ RGB }/>
        </div>
        <div data-type="tooltip" data-tooltip={ translations["Activer l'éclairage RGB"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ switchRGBState } icon={ RGBSwitcherIcon } light={ RGB }/>
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