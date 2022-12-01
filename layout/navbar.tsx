/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { useState } from "react";
import { NavbarInterface } from "../typescript/interfaces";
import { preventSubmit } from "../scripts/utilities";
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
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Navbar = ({ states, stateSetters }: NavbarInterface) => {
    const [ menuState, setMenuState ] = useState(false);
    const { locale, locales, translations }: any = states;
    const { setLocale }: any = stateSetters;
    const { navbar } = config.navigations.unsigned.layout;
    const languageSelectProps = {
        type: "Single",
        version: 1,
        options: locales,
        action: setLocale,
        defaultValue: locale,
        source: "locales"
    };
    const navigationButtonProps = {
        type: ButtonStyles.navigationButton + ((menuState) ? " " + ButtonStyles.active : ""),
        action: (event: any) => preventSubmit(event, () => setMenuState(!menuState))
    };
    const parentProps = { navbar, translations };
    return <nav className={ NavbarStyles.navbar }>
        <div className={ NavbarStyles.logo }>
            <Link href="/"><img src="/assets/logo_full.png"/></Link>
        </div>
        <ul className={ NavbarStyles.links + ((menuState) ? " " + NavbarStyles.show : "") }>
            <NavbarMenu { ...parentProps }/>
        </ul>
        <div className={ NavbarStyles.actions }>
            <Select { ...languageSelectProps }/>
            <Link href="/login"><i className="fa-light fa-user"/></Link>
            <Link href="/register" className={ ButtonStyles.callToAction }>{ translations["M'inscrire"] }</Link>
        </div>
        <Button { ...navigationButtonProps }/>
    </nav>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar ( Menu ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const NavbarMenu = ({ navbar, translations }: any) => {
    if(navbar) {
        return navbar.map(({ url, text, nesting, nest }: any, key: KeyType) => <li key={ key }>
                <Link href={ url }>{ translations[text] }</Link>
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