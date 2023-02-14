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
    const { title, setDisplay, states }: any = pageProps;
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "action", "aria" ];
    const gridButtonAction = (event: any) => preventSubmit(event, () => setDisplay("grid threeColumns"));
    const gridButtonValues = [ ButtonStyles.callToActionAlternativeSquaredIcon, true, "fa-light fa-grid-2", gridButtonAction, translations["Bouton d'affichage en grille"] ];
    const gridButtonObject = buildProperties(buttonProps, gridButtonValues);
    const listButtonAction = (event: any) => preventSubmit(event, () => setDisplay("list"));
    const listButtonValues = [ ButtonStyles.callToActionAlternativeSquaredIcon, true, "fa-light fa-list", listButtonAction, translations["Bouton d'affichage en liste"] ];
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