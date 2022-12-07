/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { useState } from "react";
import { ButtonInterface, NavbarInterface, SelectInterface } from "../typescript/interfaces";
import { buildProperties, preventSubmit } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Select from "../components/fields/select";
import Button from "../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import NavbarStyles from "../public/stylesheets/layout/Navbar.module.css";
import ButtonStyles from "../public/stylesheets/components/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Navbar = ({ states, stateSetters, config }: NavbarInterface) => {
    const [ menuState, setMenuState ] = useState(false);
    const { locale, locales, translations }: any = states;
    const { setLocale }: any = stateSetters;
    const { navbar } = config.navigations.unsigned.layout;
    const selectProps = [ "type", "options", "action", "defaultValue", "source" ];
    const languageSelectValues = [ "Single", locales, setLocale, locale, "locales" ];
    const languageSelectObject = buildProperties(selectProps, languageSelectValues);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const navigationButtonClass = ButtonStyles.navigationButton + ((menuState) ? " " + ButtonStyles.active : "");
    const navigationButtonAction = (event: any) => preventSubmit(event, () => setMenuState(!menuState));
    const navigationButtonValues = [ navigationButtonClass, false, "", "", navigationButtonAction, "", 0 ];
    const navigationButtonObject = buildProperties(buttonProps, navigationButtonValues)
    const parentProps = { navbar, translations };
    return <nav className={ NavbarStyles.navbar }>
        <div className={ NavbarStyles.logo }>
            <Link href="/"><img src="/assets/logo_full.png"/></Link>
        </div>
        <ul className={ NavbarStyles.links + ((menuState) ? " " + NavbarStyles.show : "") }>
            <NavbarMenu { ...parentProps }/>
        </ul>
        <div className={ NavbarStyles.actions }>
            <Select { ...languageSelectObject as SelectInterface }/>
            <Link href="/login"><i className="fa-light fa-user"/></Link>
            <Link href="/register" className={ ButtonStyles.callToAction }>{ translations["M'inscrire"] }</Link>
        </div>
        <Button { ...navigationButtonObject as ButtonInterface }/>
    </nav>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar ( Menu ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const NavbarMenu = ({ navbar, translations }: any) => {
    if(navbar) {
        return navbar.map(({ url, text, nesting, nest }: any, key: KeyType) => <li key={ key }>
            { (url) ? <Link href={ url }>{ translations[text] }</Link> : <p>{ translations[text] }</p> }
            { (nesting) ? <ul>
                { nest.map(({ url, text }: any, key: KeyType) => <li key={ key }>
                    <Link href={ url }>{ translations[text] }</Link>
                </li>) }
            </ul> : null }
        </li>);
    };
    return <></>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Navbar;