/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Key, MouseEventHandler, useEffect, useState } from "react";
import { InputInterface } from "../../typescript/interfaces";
import { buildProperties, uppercaseFirst } from "../../scripts/utilities";
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
    const { title, display, setDisplay, search, setSearch, setInformations, filters, dynamicFilters, states, router }: any = pageProps;
    const { translations }: any = states;
    const { ui, type }: any = router.query;
    const [ dynamicInformations, setDynamicInformations ]: Array<any> = useState(null);
    const [ dynamicFiltersToArray, setDynamicFiltersToArray ]: Array<any> = useState([]);
    const setKeywords = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const keywords = target.value;
        return setSearch({ ...search, keywords: keywords, page: 1 });
    };
    const setCategories = (event: any, values: Array<any>) => {
        event.preventDefault();
        const categories = values.map((option) => option.ID).join("-");
        return setSearch({ ...search, categories: categories });
    };
    const setDynamicFilters = (event: any, values: Array<any>, dynamic: String) => {
        event.preventDefault();
        const dynamicValues = values.map((option) => option.ID).join("-");
        const propName = dynamic.replaceAll(" ", "").toLowerCase();
        const newSearch = search;
        newSearch[propName as keyof Object] = dynamicValues;
        return setSearch({ ...newSearch, page: 1 });
    };
    const inputProps = [ "type", "name", "placeholder", "action" ];
    const searchInputValues = [ "search", "search", translations["Rechercher dans l'annuaire des"] + " " + title, setKeywords ];
    const searchInputObject = buildProperties(inputProps, searchInputValues);
    const gridButtonAction: MouseEventHandler = () => setDisplay("grid threeColumns");
    const listButtonAction: MouseEventHandler = () => setDisplay("list");
    useEffect(() => {
        const informations = (dynamicFilters) ? Object.entries(dynamicFilters).filter((filter) => filter[0] === "INFORMATIONS")[0] : [];
        const filters = (dynamicFilters) ? Object.entries(dynamicFilters).filter((filter) => filter[0] !== "INFORMATIONS") : [];
        setDynamicInformations(informations);
        setDynamicFiltersToArray(filters);
        setInformations(informations[1]);
    }, [ dynamicFilters ]);
    return <div className={ FiltersStyles.container }>
        { (title) ? <div className={ FiltersStyles.header }>
            { (type.match(/(startup)/)) ? <i className="fa-light fa-rocket-launch"/> : null }
            { (type.match(/(corporation|entreprise)/)) ? <i className="fa-light fa-buildings"/> : null }
            { (type.match(/(partner|partenaire)/)) ? <i className="fa-light fa-handshake-simple"/> : null }
            { (type.match(/(opport)/)) ? <i className="fa-light fa-circle-star"/> : null }
            <h1>{ title + " ( " }<span>{ ((dynamicInformations && dynamicInformations[1]) ? dynamicInformations[1].COUNT : filters.STARTUPS) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1>
            <div className={ FiltersStyles.displays }>
                <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ gridButtonAction } icon="fa-light fa-grid-2" active={ display === "grid threeColumns" }/>
                <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ listButtonAction } icon="fa-light fa-list" active={ display !== "grid threeColumns" }/>
            </div>
        </div> : null }
        { (title) ? <div className="separator"/> : null }
        <div className={ FiltersStyles.links }>
            { (ui && ui == "false") ? <a className={ ButtonStyles.classicLink } href="/account_mystartup.php" target="_parent">
                <i className="fa-light fa-folder-open"/>
                <span>Portefeuille</span>
            </a> : null }
            { (ui && ui == "false") ? <a className={ ButtonStyles.classicLink } href="/account_mystartup_ecosystem.php" target="_parent">
                <i className="fa-light fa-globe"/>
                <span>Portefeuille</span>
            </a> : null }
            { (ui && ui == "false") ? <a className={ ButtonStyles.classicLink } href="/account_parametres_statut.php" target="_parent">
                <i className="fa-light fa-file"/>
                <span>Portefeuille</span>
            </a> : null }
        </div>
        <div className={ FiltersStyles.search }>
            <form>
                <Input { ...searchInputObject as InputInterface }/>
                <Button button={ ButtonStyles.callToActionRoundedIcon } action={ listButtonAction } icon="fa-light fa-search"/>
            </form>
        </div>
        <div className={ FiltersStyles.filters + " grid fourColumns" }>
            { (filters) ? <MultipleSelect { ...pageProps } options={ filters.CATEGORIES } action={ setCategories } placeholder={ translations["Catégories"] } defaultValues={ search.categories.split("-") }/> : null }
            { (dynamicFiltersToArray.length > 0) ? dynamicFiltersToArray.map((filter: any, key: Key) => {
                var placeholder = filter[0];
                (filter[0].match(/(sector)/i)) ? placeholder = translations["Secteurs cible"] : null;
                (filter[0].match(/(techno)/i)) ? placeholder = translations["Technologies"] : null;
                (filter[0].match(/(jobs)/i)) ? placeholder = translations["Métiers cible"] : null;
                return <MultipleSelect key={ key } { ...pageProps } options={ filter[1] as any } action={ setDynamicFilters } placeholder={ uppercaseFirst(placeholder).toString() } defaultValues={ search.categories.split("-") } dynamic={ true }/>;
            }) : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;