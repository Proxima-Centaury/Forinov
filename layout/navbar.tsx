/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEvent, useState } from "react";
import { ButtonInterface, NavbarInterface, SelectInterface } from "../typescript/interfaces";
import { selectifyTheOptions, buildProperties, preventSubmit } from "../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Select from "../components/fields/select";
import Button from "../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import NavbarStyles from "../public/stylesheets/layout/Navbar.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Navbar = (pageProps: NavbarInterface) => {
    const { states, stateSetters, layoutConfigurations, router }: any = pageProps;
    const { locale, locales, translations }: any = states;
    const { setLocale }: any = stateSetters;
    const { navbar } = layoutConfigurations.navigations.unsigned.layout;
    const [ menuState, setMenuState ] = useState(false);
    const selectProps = [ "type", "options", "action", "defaultValue", "source" ];
    const languageSelectDefaultValue = [ ...selectifyTheOptions(locales, "locales") as Array<any> ]?.filter((option: any) => option.VALUE === locale)[0];
    const languageSelectValues = [ "Single", locales, setLocale, languageSelectDefaultValue, "locales" ];
    const languageSelectObject = buildProperties(selectProps, languageSelectValues);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "aria" ];
    const navigationButtonClass = ButtonStyles.navigationButton + ((menuState) ? " " + ButtonStyles.active : "");
    const navigationButtonAction = (event: any) => preventSubmit(event, () => setMenuState(!menuState));
    const navigationButtonValues = [ navigationButtonClass, false, undefined, undefined, navigationButtonAction, undefined, translations["Bouton du menu de navigation"] ];
    const navigationButtonObject = buildProperties(buttonProps, navigationButtonValues);
    const loginButtonValues = [ ButtonStyles.default, true, "fa-light fa-user", "/login", undefined, undefined, undefined ];
    const loginButtonObject = buildProperties(buttonProps, loginButtonValues);
    const signupButtonValues = [ ButtonStyles.callToAction, false, undefined, "/onboarding", undefined, translations["M'inscrire"], undefined ];
    const signupButtonObject = buildProperties(buttonProps, signupButtonValues);
    return <nav className={ NavbarStyles.navbar }>
        <div className={ NavbarStyles.logo }>
            <Link href="/">
                <Image src={ router.basePath + "/assets/logo.png" } alt={ translations["Logo de Forinov"] } width="50" height="50"/>
                <span>forinov</span>
            </Link>
        </div>
        <ul className={ NavbarStyles.links + ((menuState) ? " " + NavbarStyles.show : "") }>
            <NavbarMenu { ...pageProps } navbar={  navbar }/>
        </ul>
        <div className={ NavbarStyles.actions }>
            <Select { ...languageSelectObject as SelectInterface }/>
            <Button { ...loginButtonObject as ButtonInterface }/>
            <Button { ...signupButtonObject as ButtonInterface }/>
        </div>
        <Button { ...navigationButtonObject as ButtonInterface }/>
    </nav>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar ( Menu ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const NavbarMenu = (pageProps: any) => {
    const { navbar, states }: any = pageProps;
    const { translations }: any = states;
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Navbar;