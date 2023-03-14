/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, Key, MouseEventHandler, useState } from "react";
import { NavbarInterface, NavbarMenuInterface, SelectInterface } from "../typescript/interfaces";
import { selectifyTheOptions, buildProperties, preciseTarget } from "../scripts/utilities";
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
const Navbar = (pageProps: NavbarInterface): JSX.Element => {
    const { states, stateSetters, layoutConfigurations, router } = pageProps;
    const { locale, locales, translations }: any = states;
    const { setLocale }: any = stateSetters;
    const { navbar } = layoutConfigurations.navigations.unsigned.layout;
    const [ menuState, setMenuState ] = useState(false);
    // const selectProps = [ "type", "options", "action", "defaultValue", "source" ];
    // const languageSelectDefaultValue = [ ...selectifyTheOptions(locales, "locales") as Array<any> ]?.filter((option: any) => option.VALUE === locale)[0];
    // const languageSelectValues = [ "Single", locales, setLocale, languageSelectDefaultValue, "locales" ];
    // const languageSelectObject = buildProperties(selectProps, languageSelectValues);
    // TODO Remove select props builder and do the same as the Button component
    const switchMenuState: MouseEventHandler = (event) => {
        event.preventDefault();
        setMenuState(!menuState);
    };
    return <nav className={ NavbarStyles.navbar }>
        <div className={ NavbarStyles.logo }>
            <Link href="/">
                <Image src={ router.basePath + "/assets/logo.png" } alt={ translations["Logo de Forinov"] } width="50" height="50"/>
                <span>forinov</span>
            </Link>
        </div>
        <ul className={ NavbarStyles.links + ((menuState) ? " " + NavbarStyles.show : "") }>
            <NavbarMenu { ...pageProps } navbar={ navbar }/>
        </ul>
        <div className={ NavbarStyles.actions }>
            {/* <Select { ...languageSelectObject as SelectInterface }/> */}
            <Button button={ ButtonStyles.default } href="/login" icon="fa-light fa-user"/>
            <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["M'inscrire"] }/>
        </div>
        <Button button={ ButtonStyles.navigationButton } action={ switchMenuState } active={ menuState }/>
    </nav>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar ( Menu ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const NavbarMenu = (navbarProps: NavbarMenuInterface): JSX.Element => {
    const { navbar, states, router } = navbarProps;
    const { translations }: any = states;
    const showSubMenu: MouseEventHandler = (event) => {
        const target = preciseTarget(event as any);
        const menu = (target) ? target.closest("." + NavbarStyles.links) : null;
        const subMenu = (target) ? target.nextElementSibling : null;
        if(subMenu) {
            if(subMenu.classList.contains(NavbarStyles.show)) {
                subMenu.classList.remove(NavbarStyles.show);
                subMenu.previousElementSibling?.classList.remove(NavbarStyles.active);
            } else {
                const subMenus = menu?.querySelectorAll("ul");
                subMenus?.forEach((subMenu) => subMenu.classList.remove(NavbarStyles.show));
                subMenus?.forEach((subMenu) => subMenu.previousElementSibling?.classList.remove(NavbarStyles.active));
                subMenu.classList.add(NavbarStyles.show);
                subMenu.previousElementSibling?.classList.add(NavbarStyles.active);
                // TODO Handle out of area
            };
        };
    };
    return <Fragment>
        { (navbar && navbar.length > 0) ? navbar.map(({ url, text, nesting, nest }: any, key: Key) => <li key={ key }>
            { (url) ? <Button button={ ButtonStyles.default + ((router.asPath === url) ? " " + NavbarStyles.active : "") } href={ url } text={ translations[text] }/> : <Button button={ ButtonStyles.default } action={ showSubMenu } text={ translations[text] }/> }
            { (nesting) ? <ul data-menu="nest">
                { nest.map(({ url, text }: any, key: KeyType) => <li key={ key }>
                    <Button button={ ButtonStyles.default } href={ url } text={ translations[text] + ((text.match(/(Comment|How)/)) ? " ?" : "") }/>
                </li>) }
            </ul> : null }
        </li>) : null }
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Navbar;