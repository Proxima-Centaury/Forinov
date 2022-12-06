/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { FormEventHandler, MouseEventHandler } from "react";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Base Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface BaseInterface {
    locales: Array<String>,
    states: {
        locale: String
    },
    stateSetters: {
        setLocale: Function,
        setLocales: Function
    },
    config: any
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface HomeInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface LoginInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface RegisterInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NavbarInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Footer Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface FooterInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Input Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface InputInterface {
    label: String,
    type: string,
    name: string,
    placeholder: string,
    version: Number,
    action: FormEventHandler<HTMLInputElement>|undefined,
    defaultValue: string|number|undefined
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface SelectInterface {
    type: String,
    version: Number,
    options: Array<Object>,
    action: Function,
    defaultValue: String,
    source: String
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Button Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ButtonInterface {
    type: string,
    faIcon: Boolean,
    faIconClass: string,
    url: String,
    action: MouseEventHandler<HTMLButtonElement>,
    text: String,
    count: Number
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Option Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface OptionInterface extends SelectInterface {
    value: String|Number,
    text: String,
    selected: Boolean
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export type {
    HomeInterface,
    LoginInterface,
    RegisterInterface,
    NavbarInterface,
    FooterInterface,
    InputInterface,
    SelectInterface,
    ButtonInterface,
    OptionInterface
};