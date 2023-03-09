/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface, InputInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Button from "../buttons/button";
import Dropdown from "../dropdowns/dropdown";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FiltersStyles from "../../public/stylesheets/components/filters/Filters.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Filters */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Filters = (pageProps: any) => {
    const { title, display, setDisplay, setSearch, filters, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const inputProps = [ "type", "name", "placeholder" ];
    const searchInputValues = [ "search", "search", translations["Rechercher dans l'annuaire des"] + " " + title ];
    const searchInputObject = buildProperties(inputProps, searchInputValues);
    const buttonProps = [ "type", "faIcon", "faIconClass", "action", "aria", "active" ];
    const gridButtonAction = () => setDisplay("grid threeColumns");
    const gridButtonActive = (display === "grid threeColumns") ? true : false;
    const gridButtonValues = [ ButtonStyles.callToActionAlternativeSquaredIcon, true, "fa-light fa-grid-2", gridButtonAction, translations["Bouton d'affichage en grille"], gridButtonActive ];
    const gridButtonObject = buildProperties(buttonProps, gridButtonValues);
    const listButtonAction = () => setDisplay("list");
    const listButtonActive = (display === "list") ? true : false;
    const listButtonValues = [ ButtonStyles.callToActionAlternativeSquaredIcon, true, "fa-light fa-list", listButtonAction, translations["Bouton d'affichage en liste"], listButtonActive ];
    const listButtonObject = buildProperties(buttonProps, listButtonValues);
    const searchButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-search", undefined, translations["Bouton de recherche dans l'annuaire"] ];
    const searchButtonObject = buildProperties(buttonProps, searchButtonValues);
    const filterTheCards = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value;
        return setSearch(search);
    };
    return <div className={ FiltersStyles.container }>
        { (title) ? <div className={ FiltersStyles.header }>
            { (type.match(/(startup)/)) ? <i className="fa-light fa-rocket-launch"/> : null }
            { (type.match(/(corporation|entreprise)/)) ? <i className="fa-light fa-buildings"/> : null }
            { (type.match(/(partner|partenaire)/)) ? <i className="fa-light fa-handshake-simple"/> : null }
            { (type.match(/(opport)/)) ? <i className="fa-light fa-circle-star"/> : null }
            <h1>{ title }</h1>
            <div className={ FiltersStyles.displays }>
                <Button { ...gridButtonObject as ButtonInterface }/>
                <Button { ...listButtonObject as ButtonInterface }/>
            </div>
        </div> : null }
        { (title) ? <div className="separator"/> : null }
        <div className={ FiltersStyles.links }>
            
        </div>
        <div className={ FiltersStyles.search }>
            <form onSubmit={ filterTheCards }>
                <Input { ...searchInputObject as InputInterface }/>
                <Button { ...searchButtonObject as ButtonInterface }/>
            </form>
        </div>
        <div className={ FiltersStyles.filters }>
            <Dropdown { ...pageProps } list={ filters || [] }/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;