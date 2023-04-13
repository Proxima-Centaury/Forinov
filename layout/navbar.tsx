/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, Key, MouseEventHandler, useEffect, useRef, useState } from "react";
import { NavbarInterface, NavbarMenuInterface } from "../typescript/interfaces";
import { selectifyTheOptions, bindEventListeners, removeEventListeners } from "../scripts/utilities";
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
    const menuReference = useRef(null);
    const { states, stateSetters, layoutConfigurations, router } = pageProps;
    const { locale, locales, translations } = states;
    const { setLocale } = stateSetters;
    const { navbar } = layoutConfigurations.navigations.unsigned.layout;
    const [ menuState, setMenuState ] = useState(false);
    const languageSelectDefaultValue = [ ...selectifyTheOptions(locales, "locales") as Array<any> ]?.filter((option: any) => option.VALUE === locale)[0];
    const switchMenuState: MouseEventHandler = () => setMenuState(!menuState);
    const handleOutOfArea: MouseEventHandler = (event) => {
        if(menuReference && menuReference.current) {
            const current = menuReference.current as HTMLElement;
            if(!current.contains(event.target as HTMLElement)) {
                setMenuState(false);
            };
        };
    };
    useEffect(() => {
        bindEventListeners(document, [ "click" ], handleOutOfArea);
        return () => {
            removeEventListeners(document, [ "click" ], handleOutOfArea);
        };
    }, []);
    return <nav className={ NavbarStyles.navbar } ref={ menuReference }>
        <div className={ NavbarStyles.logo }>
            <Link href="/">
                <Image src={ router.basePath + "/assets/logo.png" } alt="" width="50" height="50"/>
                <span>forinov</span>
            </Link>
        </div>
        <ul className={ NavbarStyles.links + ((menuState) ? " " + NavbarStyles.show : "") }>
            <NavbarMenu { ...pageProps } navbar={ navbar }/>
        </ul>
        <div className={ NavbarStyles.actions }>
            <Select options={ locales } action={ setLocale } defaultValue={ languageSelectDefaultValue } source="locales"/>
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
    const itemReference = useRef(null);
    const { navbar } = navbarProps;
    return <Fragment>
        { (navbar && navbar.length > 0) ? navbar.map((item: any, key: Key) => <li key={ key } ref={ itemReference }>
            { (item) ? <NavbarMenuItem { ...navbarProps } item={ item } reference={ itemReference }/> : null }
        </li>) : null }
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar ( Menu Item ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const NavbarMenuItem = (navbarProps: NavbarMenuInterface): JSX.Element => {
    const { item, reference, states, router } = navbarProps;
    const { translations } = states;
    const [ itemState, setItemState ] = useState(false);
    const switchItemState: MouseEventHandler = () => setItemState(!itemState);
    const handleOutOfArea: MouseEventHandler = (event) => {
        if(reference && reference.current) {
            const current = reference.current as HTMLElement;
            if(!current.contains(event.target as HTMLElement)) {
                setItemState(false);
            };
        };
    };
    useEffect(() => {
        bindEventListeners(document, [ "click" ], handleOutOfArea);
        return () => {
            removeEventListeners(document, [ "click" ], handleOutOfArea);
        };
    }, []);
    return <Fragment>
        { (item?.url) ? <Button button={ ButtonStyles.default + ((router.asPath === item?.url) ? " " + NavbarStyles.active : "") } href={ item?.url } text={ (item?.text) ? translations[item?.text as keyof Object] : "" }/> : null }
        { (!item?.url) ? <Button button={ ButtonStyles.default } action={ switchItemState } text={ (item?.text) ? translations[item?.text as keyof Object] : "" }/> : null }
        <ul className={ ((itemState) ? " " + NavbarStyles.show : "") } data-menu="nest">
            { (item?.nest) ? item?.nest.map(({ url, text }: any, key: Key) => <li key={ key }>
                <Button button={ ButtonStyles.default + ((router.asPath === url) ? " " + NavbarStyles.active : "") } href={ url } text={ translations[text] + ((text.match(/(Comment|How)/)) ? " ?" : "") }/>
            </li>) : null }
        </ul>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Navbar;