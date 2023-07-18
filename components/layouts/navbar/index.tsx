/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Fragment, Key, MouseEventHandler, useMemo, useEffect, useState, useRef } from "react";
// import { NavbarInterface, NavbarMenuInterface, NavbarMenuItemInterface } from "@forinov/typescript/interfaces";
// import { selectifyTheOptions, bindEventListeners, removeEventListeners, getTranslations } from "@forinov/scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
import Image from "next/image";
import Select from "@fields/select";
import ClassicButton from "@buttons/classicButton";
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import NavbarStyles from "@layouts/navbar/Navbar.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Navbar */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Navbar = (): JSX.Element => {
    const router = useRouter();
    const { locale, locales } = router;
    const { t } = useTranslation("navbar");
    const navbar = require("@configurations/navbar.json").menus;
    const menuReference = useRef(null);
    const [ menuState, setMenuState ] = useState(false);
    const switchMenuState: MouseEventHandler = () => setMenuState(!menuState);
    // const handleOutOfArea: MouseEventHandler = (event) => {
    //     const current = (menuReference.current) ? menuReference.current as HTMLElement : null;
    //     const target = (event.target) ? event.target as HTMLElement : null;
    //     if(current && !current.contains(target)) {
    //         setMenuState(false);
    //     };
    // };
    // useEffect(() => {
    //     bindEventListeners(document, [ "click" ], handleOutOfArea);
    //     return () => {
    //         removeEventListeners(document, [ "click" ], handleOutOfArea);
    //     };
    // }, []);
    return <nav className={ NavbarStyles.navbar } ref={ menuReference }>
        <div className="boxedContent">
            <div className={ NavbarStyles.logo }>
                <Link href="/" locale={ locale } tabIndex={ 1 }>
                    <Image src="/assets/logo.ico" alt={ t("") } width="50" height="50"/>
                    <span>forinov</span>
                </Link>
            </div>
            <ul className={ NavbarStyles.links + ((menuState) ? " " + NavbarStyles.show : "") }>
                { navbar.map((menu: any, key: number) => <li key={ key } className={ NavbarStyles.menu }>
                    <ClassicButton classList="ignore" text={ t(menu.title) } tabIndex={ 1 }/>
                    { (menu.links.length > 0) ? <ul className={ NavbarStyles.nestedLinks }>
                        { menu.links.map((link: TButton, key: number) => <li key={ key }>
                            <LinkButton { ...link } text={ t(link?.text || "undefined") } locale={ locale } tabIndex={ -1 }/>
                        </li>) }
                    </ul> : null }
                </li>) }
            </ul>
            <div className={ NavbarStyles.actions }>
                <Select options={ locales } defaultValue={ locale }/>
                <LinkButton classList="primary circled" href="/login" icon="fa-solid fa-user"/>
                <LinkButton classList="primary" href="/onboarding" text={ t("navbarSignUpLink") }/>
            </div>
        </div>
    </nav>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Navbar;