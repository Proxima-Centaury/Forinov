/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEvent, useState } from "react";
import { ButtonInterface, NavbarInterface, SelectInterface } from "../typescript/interfaces";
import { buildProperties, preventSubmit } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Select from "../components/fields/select";
import Button from "../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import NavbarStyles from "../public/stylesheets/layout/Navbar.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Navbar = ({ states, stateSetters, config }: NavbarInterface) => {
    const { locale, locales, translations }: any = states;
    const { setLocale }: any = stateSetters;
    const { navbar } = config.navigations.unsigned.layout;
    const [ menuState, setMenuState ] = useState(false);
    const selectProps = [ "type", "options", "action", "defaultValue", "source" ];
    const languageSelectValues = [ "Single", locales, setLocale, locale, "locales" ];
    const languageSelectObject = buildProperties(selectProps, languageSelectValues);
    const buttonProps = [ "type", "action", "aria" ];
    const navigationButtonClass = ButtonStyles.navigationButton + ((menuState) ? " " + ButtonStyles.active : "");
    const navigationButtonAction = (event: any) => preventSubmit(event, () => setMenuState(!menuState));
    const navigationButtonValues = [ navigationButtonClass, navigationButtonAction, translations["Bouton du menu de navigation"] ];
    const navigationButtonObject = buildProperties(buttonProps, navigationButtonValues)
    const parentProps = { navbar, translations };
    return <nav className={ NavbarStyles.navbar }>
        <div className={ NavbarStyles.logo }>
            <Link href="/">
                <Image src="/assets/logo.png" alt={ translations["Logo de Forinov"] } width="50" height="50"/>
                <span>Forinov</span>
            </Link>
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
    const showSubMenu = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        const parentMenu = target.closest("." + NavbarStyles.links);
        const subMenu = target.nextElementSibling;
        if(subMenu) {
            if(subMenu.classList.contains(NavbarStyles.show)) {
                subMenu.classList.remove(NavbarStyles.show);
            } else {
                const subMenus = parentMenu?.querySelectorAll("ul");
                subMenus?.forEach((menu) => menu.classList.remove(NavbarStyles.show));
                subMenu.classList.add(NavbarStyles.show);
                window.onclick = (event) => {
                    const targetedElement = event.target as Element;
                    if(targetedElement !== target && targetedElement !== subMenu && !targetedElement.closest("[data-menu='nest']")) {
                        subMenu.classList.remove(NavbarStyles.show);
                    };
                };
            };
        };
    };
    if(navbar) {
        return navbar.map(({ url, text, nesting, nest }: any, key: KeyType) => <li key={ key }>
            { (url) ? <Link href={ url }>{ translations[text] }</Link> : <button onClick={ showSubMenu }>{ translations[text] }</button> }
            { (nesting) ? <ul data-menu="nest">
                { nest.map(({ url, text }: any, key: KeyType) => <li key={ key }>
                    <Link href={ url }>{ translations[text] + ((text.match(/(Comment|How)/)) ? " ?" : "") }</Link>
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