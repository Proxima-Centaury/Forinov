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
/* Not Found Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NotFoundInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Error Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ServerErrorInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface HomeInterface extends BaseInterface {
    opportunities: any,
    logos: any,
    startups: any
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface LoginInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface RegisterInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ProfileInterface extends BaseInterface {
    profile: any,
    products: any,
    activities: any,
    folders: any,
    opportunity: any
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folders Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface FoldersInterface extends ProfileInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NavbarInterface extends BaseInterface {};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Footer Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface FooterInterface extends BaseInterface {};
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
    count: Number,
    disabled: Boolean,
    aria: String,
    index: Number
};
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
    defaultValue: any,
    source: String
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
/* API Interface */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
interface APIInterface {
    [key: string]: any
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export type {
    NotFoundInterface,
    ServerErrorInterface,
    HomeInterface,
    LoginInterface,
    RegisterInterface,
    ProfileInterface,
    FoldersInterface,
    NavbarInterface,
    FooterInterface,
    InputInterface,
    SelectInterface,
    ButtonInterface,
    OptionInterface,
    APIInterface
};