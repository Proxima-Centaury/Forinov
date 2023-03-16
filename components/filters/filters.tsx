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
    const { title, display, setDisplay, search, setSearch, filters, dynamicFilters, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const [ dynamicFiltersToArray, setDynamicFiltersToArray ]: Array<any> = useState([]);
    const setKeywords = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const keywords = target.value;
        return setSearch({ ...search, keywords: keywords });
    };
    const setCategories = (event: any, values: Array<any>) => {
        event.preventDefault();
        const categories = values.map((option) => option.ID).join("-");
        return setSearch({ ...search, categories: categories });
    };
    const setDynamicFilters = (event: any, values: Array<any>, dynamic: String) => {
        event.preventDefault();
        const dynamicValues = values.map((option) => option.ID).join("-");
        switch(dynamic) {
            case "Sectors":
                return setSearch({ ...search, sectors: dynamicValues });
            case "Technologies":
                return setSearch({ ...search, technologies: dynamicValues });
            case "Jobs":
                return setSearch({ ...search, jobs: dynamicValues });
            case "Business model":
                return setSearch({ ...search, businessModel: dynamicValues });
        }
    };
    const inputProps = [ "type", "name", "placeholder", "action" ];
    const searchInputValues = [ "search", "search", translations["Rechercher dans l'annuaire des"] + " " + title, setKeywords ];
    const searchInputObject = buildProperties(inputProps, searchInputValues);
    const gridButtonAction: MouseEventHandler = () => setDisplay("grid threeColumns");
    const listButtonAction: MouseEventHandler = () => setDisplay("list");
    useEffect(() => { setDynamicFiltersToArray((dynamicFilters) ? Object.entries(dynamicFilters) : []) }, [ dynamicFilters ])
    return <div className={ FiltersStyles.container }>
        { (title) ? <div className={ FiltersStyles.header }>
            { (type.match(/(startup)/)) ? <i className="fa-light fa-rocket-launch"/> : null }
            { (type.match(/(corporation|entreprise)/)) ? <i className="fa-light fa-buildings"/> : null }
            { (type.match(/(partner|partenaire)/)) ? <i className="fa-light fa-handshake-simple"/> : null }
            { (type.match(/(opport)/)) ? <i className="fa-light fa-circle-star"/> : null }
            <h1>{ title }</h1>
            <div className={ FiltersStyles.displays }>
                <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ gridButtonAction } icon="fa-light fa-grid-2" active={ display === "grid threeColumns" }/>
                <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ listButtonAction } icon="fa-light fa-list" active={ display !== "grid threeColumns" }/>
            </div>
        </div> : null }
        { (title) ? <div className="separator"/> : null }
        <div className={ FiltersStyles.links }>
            
        </div>
        <div className={ FiltersStyles.search }>
            <form>
                <Input { ...searchInputObject as InputInterface }/>
                <Button button={ ButtonStyles.callToActionRoundedIcon } action={ listButtonAction } icon="fa-light fa-search"/>
            </form>
        </div>
        <div className={ FiltersStyles.filters + " grid fourColumns" }>
            <MultipleSelect options={ filters.CATEGORIES } action={ setCategories } placeholder={ translations["Catégories"] } defaultValues={ search.categories.split("-") }/>
            { (dynamicFiltersToArray.length > 0) ? dynamicFiltersToArray.map((filter: any, key: Key) => {
                return <MultipleSelect key={ key } options={ filter[1] as any } action={ setDynamicFilters } placeholder={ uppercaseFirst(filter[0]).toString() } defaultValues={ search.categories.split("-") } dynamic={ true }/>;
            }) : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;