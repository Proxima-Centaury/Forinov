/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Key, MouseEventHandler, useEffect, useState } from "react";
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
const Filters = (pageProps: any) => {
    const { title, display, setDisplay, search, setSearch, setInformations, filters, dynamicFilters, states, router } = pageProps;
    const { session, translations } = states;
    const { ui, domain, type, category, user } = router.query;
    const [ dynamicInformations, setDynamicInformations ]: Array<any> = useState([]);
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
    const gridButtonAction: MouseEventHandler = () => setDisplay("grid threeColumns");
    const listButtonAction: MouseEventHandler = () => setDisplay("list");
    useEffect(() => {
        const informations = (dynamicFilters) ? Object.entries(dynamicFilters).filter((filter) => filter[0] === "INFORMATIONS")[0] : [];
        const filters = (dynamicFilters) ? Object.entries(dynamicFilters).filter((filter) => filter[0] !== "INFORMATIONS") : [];
        setDynamicInformations(informations);
        (type.match(/(startup)/)) ? setDynamicFiltersToArray(filters) : setDynamicFiltersToArray([]);
        (setInformations && informations) ? setInformations(informations[1]) : null;
    }, [ dynamicFilters, setInformations, type ]);
    return <div className={ FiltersStyles.container }>
        { (title) ? <div className={ FiltersStyles.header }>
            { (type.match(/(startup)/)) ? <i className="fa-light fa-rocket-launch"/> : null }
            { (type.match(/(corporate|entreprise)/)) ? <i className="fa-light fa-buildings"/> : null }
            { (type.match(/(partner|partenaire)/)) ? <i className="fa-light fa-handshake-simple"/> : null }
            { (type.match(/(opport)/)) ? <i className="fa-light fa-circle-star"/> : null }
            { (type.match(/(startup)/)) ? <h1>{ title + " ( " }<span>{ ((dynamicInformations && dynamicInformations[1]) ? dynamicInformations[1].COUNT : filters.STARTUPS) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
            { (type.match(/(corporate|entreprise)/)) ? <h1>{ title + " ( " }<span>{ ((dynamicInformations && dynamicInformations[1]) ? dynamicInformations[1].COUNT : filters.CORPORATES) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
            { (type.match(/(partner|partenaire)/)) ? <h1>{ title + " ( " }<span>{ ((dynamicInformations && dynamicInformations[1]) ? dynamicInformations[1].COUNT : filters.PARTNERS) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
            { (type.match(/(opport)/)) ? <h1>{ title + " ( " }<span>{ ((dynamicInformations && dynamicInformations[1]) ? dynamicInformations[1].COUNT : filters.OPPORTUNITIES_COUNT) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
            <div className={ FiltersStyles.displays }>
                <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ gridButtonAction } icon="fa-light fa-grid-2" active={ display === "grid threeColumns" }/>
                <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ listButtonAction } icon="fa-light fa-list" active={ display !== "grid threeColumns" }/>
                { (ui && ui == "false") ? <a className={ ButtonStyles.callToActionAlternativeSquaredIcon } href={ domain + "/account_startup_map.php" } target="_parent">
                    <i className="fa-light fa-map-location-dot"/>
                </a> : null }
            </div>
        </div> : null }
        { (title) ? <div className="separator"/> : null }
        <div className={ FiltersStyles.links }>
            { ((session || (ui && ui == "false")) && (user && !user.match(/(startup)/i))) ? <a className={ ButtonStyles.classicLink } href={ domain + "/account_mystartup.php" } target="_parent">
                <i className="fa-light fa-folder-open"/>
                <span>Portefeuille</span>
            </a> : null }
            { ((session || (ui && ui == "false")) && (user && !user.match(/(startup)/i))) ? <a className={ ButtonStyles.classicLink } href={ domain + "/account_mystartup_ecosystem.php" } target="_parent">
                <i className="fa-light fa-globe"/>
                <span>Écosystème</span>
            </a> : null }
            { ((session || (ui && ui == "false")) && (user && !user.match(/(startup)/i))) ? <a className={ ButtonStyles.classicLink } href={ domain + "/account_parametres_statut.php" } target="_parent">
                <i className="fa-light fa-file"/>
                <span>Paramètres relation</span>
            </a> : null }
        </div>
        <div className={ FiltersStyles.search }>
            <form>
                <Input type="search" name="search" placeholder={ translations["Rechercher dans l'annuaire des"] + " " + title } action={ setKeywords }/>
                <Button button={ ButtonStyles.callToActionRoundedIcon } action={ listButtonAction } icon="fa-light fa-search"/>
            </form>
        </div>
        <div className={ FiltersStyles.filters + " grid fourColumns" }>
            { (filters && type.match(/(startup)/)) ? <MultipleSelect { ...pageProps } options={ filters.CATEGORIES } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (filters && type.match(/(corporate|entreprise)/)) ? <MultipleSelect { ...pageProps } options={ filters.SECTORS } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (filters && type.match(/(partner|partenaire)/)) ? <MultipleSelect { ...pageProps } options={ filters.PARTNERS_TYPES } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (filters && type.match(/(opport)/)) ? <MultipleSelect { ...pageProps } options={ filters.OPPORTUNITIES } action={ setCategories } placeholder={ translations["Catégories"] }/> : null }
            { (dynamicFiltersToArray.length > 0) ? dynamicFiltersToArray.map((filter: any, key: Key) => <MultipleSelect key={ key } { ...pageProps } options={ filter[1] as any } action={ setDynamicFilters } placeholder={ uppercaseFirst(filter[0]).toString() } dynamic/>) : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;