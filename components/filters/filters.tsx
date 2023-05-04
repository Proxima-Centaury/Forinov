/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, Key, useEffect, useState } from "react";
import { uppercaseFirst } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Button from "../buttons/button";
import MultipleSelect from "../fields/multipleSelect";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FiltersStyles from "../../public/stylesheets/components/filters/Filters.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Filters */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Filters = (filtersProps: any): JSX.Element => {
    const { title, search, setSearch, setInformations, filters, dynamicFilters, states, router } = filtersProps;
    const { session, translations } = states;
    const { type, category, ui, user } = router.query;
    const [ dynamicFiltersToArray, setDynamicFiltersToArray ]: Array<any> = useState([]);
    const categoryId = category?.substring(category.indexOf("_") + 1, category.length);
    const setKeywords = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const keywords = target.value;
        return setSearch({ ...search, keywords: keywords, page: 1 });
    };
    const setCategories = (event: any, values: Array<any>) => {
        event.preventDefault();
        const categories = values.map((option) => option.ID).join("-");
        return (categories.length <= 0) ? setSearch({ keywords: "", categories: (categoryId) ? categoryId : "", page: 1 }) : setSearch({ ...search, categories: categories, page: 1 });
    };
    const setDynamicFilters = (event: any, values: Array<any>, dynamic: String) => {
        event.preventDefault();
        const dynamicValues = values.map((option) => option.ID).join("-");
        const propName = dynamic.replaceAll(" ", "").toLowerCase();
        const newSearch = search;
        newSearch[propName as keyof Object] = dynamicValues;
        return setSearch({ ...newSearch, page: 1 });
    };
    const setBaseFilters = (event: any, values: Array<any>, dynamic: String) => {
        event.preventDefault();
        const baseValues = values.map((option) => option.ID).join("-");
        let propName = "";
        if(dynamic.match(/(secteurs)/i)) {
            propName = "targetsectors";
        } else if(dynamic.match(/(technologies)/i)) {
            propName = "technologies";
        } else if(dynamic.match(/(métiers)/i)) {
            propName = "targetjobs";
        } else if(dynamic.match(/(business)/i)) {
            propName = "businessmodel";
        } else {
            propName = dynamic.replaceAll(" ", "").toLowerCase();
        };
        const newSearch = search;
        newSearch[propName as keyof Object] = baseValues;
        return setSearch({ ...newSearch, page: 1 });
    };
    useEffect(() => {
        const informations = (dynamicFilters) ? Object.entries(dynamicFilters).filter((filter) => filter[0] === "INFORMATIONS")[0] : [];
        const filters = (dynamicFilters) ? Object.entries(dynamicFilters).filter((filter) => filter[0] !== "INFORMATIONS") : [];
        (type.match(/(startups)/)) ? setDynamicFiltersToArray(filters) : setDynamicFiltersToArray([]);
        (setInformations && informations) ? setInformations(informations[1]) : null;
    }, [ dynamicFilters, setInformations, type ]);
    return <div className={ FiltersStyles.container }>
        <Links { ...filtersProps }/>
        <div className={ FiltersStyles.search }>
            <form>
                <Input type="search" name="search" placeholder={ translations["Rechercher dans l'annuaire des"] + " " + title.toLowerCase() } action={ setKeywords }/>
                <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-search"/>
            </form>
        </div>
        <div className={ FiltersStyles.filters + " grid fourColumns" }>
            { (filters && type.match(/(startups)/)) ? <MultipleSelect { ...filtersProps } options={ filters.CATEGORIES } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (filters && type.match(/(corporates)/)) ? <MultipleSelect { ...filtersProps } options={ filters.CORPORATES_SECTORS } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (filters && type.match(/(partners)/)) ? <MultipleSelect { ...filtersProps } options={ filters.PARTNERS_TYPES } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (filters && type.match(/(opportunities)/)) ? <MultipleSelect { ...filtersProps } options={ filters.OPPORTUNITIES } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (dynamicFiltersToArray.length > 0) ? dynamicFiltersToArray.map((filter: any, key: Key) => <MultipleSelect key={ key } { ...filtersProps } options={ filter[1] as any } action={ setDynamicFilters } placeholder={ uppercaseFirst(filter[0]).toString() } dynamic limited={ (session || user) ? false : true }/>) : null }
            { (type.match(/(startups)/) && dynamicFiltersToArray.length <= 0) ? <MultipleSelect { ...filtersProps } options={ filters.SECTORS } action={ setBaseFilters } placeholder={ translations["Secteurs cibles"] } dynamic limited={ (session || user) ? false : true }/> : null }
            { (type.match(/(startups)/) && dynamicFiltersToArray.length <= 0) ? <MultipleSelect { ...filtersProps } options={ filters.TECHNOLOGIES } action={ setBaseFilters } placeholder={ translations["Technologies"] } dynamic limited={ (session || user) ? false : true }/> : null }
            { (type.match(/(startups)/) && dynamicFiltersToArray.length <= 0) ? <MultipleSelect { ...filtersProps } options={ filters.JOBS } action={ setBaseFilters } placeholder={ translations["Métiers cibles"] } dynamic limited={ (session || user) ? false : true }/> : null }
            { (type.match(/(startups)/) && dynamicFiltersToArray.length <= 0) ? <MultipleSelect { ...filtersProps } options={ filters.BUSINESSMODELS } action={ setBaseFilters } placeholder={ translations["Business model"] } dynamic limited={ (session || user) ? false : true }/> : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Links */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Links = (linksProps: any): JSX.Element => {
    const { states, router } = linksProps;
    const { session, translations } = states;
    const { type, ui, user, domain, network } = router.query;
    if(type.match(/(startups)/)) {
        return <div className={ FiltersStyles.links }>
            { (!network) ? <a className={ ButtonStyles.classicLink + " " + FiltersStyles.active } href={ (session || user) ? domain + "/account_startup.php" : router.basePath + "/directories/startups" } target="_parent">
                <i className="fa-light fa-search"/>
                <span>{ translations["Toutes les startups"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_mystartup.php" : "" } target="_parent">
                <i className="fa-light fa-folder-open"/>
                <span>{ translations["Portefeuille"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_mystartup_ecosystem.php" : "" } target="_parent">
                <i className="fa-light fa-globe"/>
                <span>{ translations["Écosystème"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_parametres_statut.php" : "" } target="_parent">
                <i className="fa-light fa-gear"/>
                <span>{ translations["Paramètres relation"] }</span>
            </a> : null }
        </div>;
    } else if(type.match(/(corporates)/)) {
        return <div className={ FiltersStyles.links }>
            { (!network) ? <a className={ ButtonStyles.classicLink + " " + FiltersStyles.active } href={ (session || user) ? domain + "/account_entreprise.php" : router.basePath + "/directories/corporates" } target="_parent">
                <i className="fa-light fa-search"/>
                <span>{ translations["Toutes les entreprises"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_myentreprise.php" : "" } target="_parent">
                <i className="fa-light fa-folder-open"/>
                <span>{ translations["Portefeuille"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_myentreprisestats.php" : "" } target="_parent">
                <i className="fa-light fa-chart-pie"/>
                <span>{ translations["Statistiques"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_myentrepriselinked.php" : "" } target="_parent">
                <i className="fa-light fa-link"/>
                <span>{ translations["Comptes liés"] }</span>
            </a> : null }
        </div>;
    } else if(type.match(/(partners)/)) {
        return <div className={ FiltersStyles.links }>
            { (!network) ? <a className={ ButtonStyles.classicLink + " " + FiltersStyles.active } href={ (session || user) ? domain + "/account_incubateur.php" : router.basePath + "/directories/partners" } target="_parent">
                <i className="fa-light fa-search"/>
                <span>{ translations["Tous les partenaires"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_myincubateur.php" : "" } target="_parent">
                <i className="fa-light fa-folder-open"/>
                <span>{ translations["Portefeuille"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_myincubateurstats.php" : "" } target="_parent">
                <i className="fa-light fa-chart-pie"/>
                <span>{ translations["Statistiques"] }</span>
            </a> : null }
        </div>;
    } else if(type.match(/(opportunities)/)) {
        return <div className={ FiltersStyles.links }>
            { (!network) ? <a className={ ButtonStyles.classicLink + " " + FiltersStyles.active } href={ (session || user) ? domain + "/account_projects.php" : router.basePath + "/directories/opportunities" } target="_parent">
                <i className="fa-light fa-search"/>
                <span>{ translations["Toutes les opportunités"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_form_templates.php" : "" } target="_parent">
                <i className="fa-light fa-scroll"/>
                <span>{ translations["Formulaires"] }</span>
            </a> : null }
            { (!network) ? <a className={ ButtonStyles.classicLink + ((session || user) ? "" : " " + FiltersStyles.disabled) } href={ (session || user) ? domain + "/account_parametres_evaluation.php" : "" } target="_parent">
                <i className="fa-light fa-gear"/>
                <span>{ translations["Paramètres"] }</span>
            </a> : null }
        </div>;
    };
    return <Fragment/>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;