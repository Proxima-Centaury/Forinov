/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface, InputInterface } from "../../typescript/interfaces";
import { selectifyTheOptions, buildProperties } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Select from "../fields/select";
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FiltersStyles from "../../public/stylesheets/components/filters/Filters.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Filters */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Filters = (pageProps: any) => {
    const { title, display, setDisplay, setSearch, states }: any = pageProps;
    const { translations }: any = states;
    /* --------------------------- */
    /* Properties */
    /* --------------------------- */
    const buttonProps = [ "type", "faIcon", "faIconClass", "action", "aria", "active" ];
    const inputProps = [ "type", "name", "placeholder" ];
    /* --------------------------- */
    /* Grid Display Button */
    /* --------------------------- */
    const gridButtonAction = () => setDisplay("grid threeColumns");
    const gridButtonClass = ButtonStyles.callToActionAlternativeSquaredIcon;
    const gridButtonActive = (display === "grid threeColumns") ? true : false;
    const gridButtonValues = [ gridButtonClass, true, "fa-light fa-grid-2", gridButtonAction, translations["Bouton d'affichage en grille"], gridButtonActive ];
    const gridButtonObject = buildProperties(buttonProps, gridButtonValues);
    /* --------------------------- */
    /* List Display Button */
    /* --------------------------- */
    const listButtonAction = () => setDisplay("list");
    const listButtonClass = ButtonStyles.callToActionAlternativeSquaredIcon;
    const listButtonActive = (display === "list") ? true : false;
    const listButtonValues = [ listButtonClass, true, "fa-light fa-list", listButtonAction, translations["Bouton d'affichage en liste"], listButtonActive ];
    const listButtonObject = buildProperties(buttonProps, listButtonValues);
    /* --------------------------- */
    /* Search Button */
    /* --------------------------- */
    const searchButtonAction = () => false;
    const searchButtonClass = ButtonStyles.callToActionRoundedIcon;
    const searchButtonValues = [ searchButtonClass, true, "fa-light fa-search", searchButtonAction, translations["Bouton de recherche dans l'annuaire"] ];
    const searchButtonObject = buildProperties(buttonProps, searchButtonValues);
    /* --------------------------- */
    /* Search Input */
    /* --------------------------- */
    const searchInputValues = [ "search", "search", translations["Rechercher dans l'annuaire"] + " " + title ];
    const searchInputObject = buildProperties(inputProps, searchInputValues);
    /* --------------------------- */
    /* Filter Function */
    /* --------------------------- */
    const filterTheCards = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value;
        return setSearch(search);
    };
    return <div className={ FiltersStyles.container }>
        { (title) ? <div className={ FiltersStyles.header }>
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

        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;