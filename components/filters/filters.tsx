/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface, InputInterface } from "../../typescript/interfaces";
import { selectifyTheOptions, buildProperties, preventSubmit } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Select from "../fields/select";
import Button from "../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import FiltersStyles from "../../public/stylesheets/components/filters/Filters.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Filters */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Filters = (pageProps: any) => {
    const { title, display, setDisplay, states }: any = pageProps;
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "action", "aria", "active" ];
    const gridButtonAction = (event: any) => preventSubmit(event, () => setDisplay("grid threeColumns"));
    const gridButtonClass = ButtonStyles.callToActionAlternativeSquaredIcon;
    const gridButtonActive = (display === "grid threeColumns") ? true : false;
    const gridButtonValues = [ gridButtonClass, true, "fa-light fa-grid-2", gridButtonAction, translations["Bouton d'affichage en grille"], gridButtonActive ];
    const gridButtonObject = buildProperties(buttonProps, gridButtonValues);
    const listButtonAction = (event: any) => preventSubmit(event, () => setDisplay("list"));
    const listButtonClass = ButtonStyles.callToActionAlternativeSquaredIcon;
    const listButtonActive = (display === "list") ? true : false;
    const listButtonValues = [ listButtonClass, true, "fa-light fa-list", listButtonAction, translations["Bouton d'affichage en liste"], listButtonActive ];
    const listButtonObject = buildProperties(buttonProps, listButtonValues);
    const inputProps = [ "type", "name", "placeholder", "version", "action" ];
    const searchInputValues = [ "search", "search", translations[""], 1, undefined ];
    const searchInputObject = buildProperties(inputProps, searchInputValues);
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
            <form>
                <Input { ...searchInputObject as InputInterface }/>
            </form>
        </div>
        <div className={ FiltersStyles.filters }>

        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Filters;