/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { FormEventHandler } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Base Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface BaseInterface {
    locales?: Array<String>,
    states?: any,
    stateSetters?: any,
    baseConfigurations?: any,
    apiConfigurations?: any,
    resourcesConfigurations?: any,
    layoutConfigurations?: any,
    carouselsConfigurations?: any,
    accordionsConfigurations?: any,
    router?: any,
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Not Found Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NotFoundInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Error Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ServerErrorInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface HomeInterface extends BaseInterface {
    opportunities: any,
    logos: any,
    startups: any
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface LoginInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Onboarding Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface OnboardingInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface DirectoryInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ProfileInterface extends BaseInterface {
    profile: any,
    products: any,
    activities: any,
    folders: any,
    opportunity: any
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folders Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface FoldersInterface extends ProfileInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NavbarInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar Menu Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NavbarMenuInterface extends NavbarInterface {
    navbar?: Array<Object>
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Footer Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface FooterInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Button Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ButtonInterface {
    button?: String,
    href?: String,
    action?: Function,
    icon?: String,
    text?: String,
    active?: Boolean
    disabled?: Boolean
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Input Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface InputInterface {
    label?: String,
    type?: String,
    name?: String,
    placeholder?: String,
    action?: FormEventHandler<HTMLInputElement>|undefined,
    defaultValue?: String|Number|undefined
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface SelectInterface extends BaseInterface {
    options?: Array<Object>,
    action?: Function,
    placeholder?: String,
    defaultValue?: any,
    defaultValues?: Array<any>,
    source?: String,
    dynamic?: Boolean,
    search?: any
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* API Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface APIInterface {
    [key: string]: any
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export type {
    NotFoundInterface,
    ServerErrorInterface,
    HomeInterface,
    LoginInterface,
    OnboardingInterface,
    DirectoryInterface,
    ProfileInterface,
    FoldersInterface,
    NavbarInterface,
    NavbarMenuInterface,
    FooterInterface,
    InputInterface,
    SelectInterface,
    ButtonInterface,
    APIInterface
};