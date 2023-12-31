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
/* Under Development Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface UnderDevelopmentInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface HomeInterface extends BaseInterface {
    landing: any,
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
interface DirectoryInterface extends BaseInterface {
    filters?: any
};
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
/* Products Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ProductsInterface extends ProfileInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Contact Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ContactInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Deals Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface DealsInterface extends BaseInterface {
    filters?: any,
    deals?: any
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NavbarInterface extends BaseInterface {};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar Menu Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface NavbarMenuInterface extends NavbarInterface {
    navbar?: Array<Object>,
    item?: {
        url?: String,
        text?: String,
        nesting?: Boolean,
        nest?: Array<Object>
    },
    reference?: any
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
    notifications?: Number,
    active?: Boolean
    disabled?: Boolean,
    light?: Boolean
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
    limited?: Boolean,
    search?: any
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Loaders Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface LoadersInterface extends BaseInterface {
    version?: Number
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* API Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface APIInterface {
    [key: string]: any
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Error Interface */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
interface ErrorInterface {
    title?: String,
    message?: String,
    image?: String,
    currentPage?: String,
    solutions?: Array<String>
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export type {
    NotFoundInterface,
    ServerErrorInterface,
    UnderDevelopmentInterface,
    HomeInterface,
    LoginInterface,
    OnboardingInterface,
    DirectoryInterface,
    ProfileInterface,
    FoldersInterface,
    ProductsInterface,
    ContactInterface,
    DealsInterface,
    NavbarInterface,
    NavbarMenuInterface,
    FooterInterface,
    InputInterface,
    SelectInterface,
    ButtonInterface,
    LoadersInterface,
    APIInterface,
    ErrorInterface
};