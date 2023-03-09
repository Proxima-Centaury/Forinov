/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties, checkMatch } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DropdownStyles from "../../public/stylesheets/components/dropdowns/Dropdown.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Dropdown */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Dropdown = (pageProps: any) => {
    const { list, states, router }: any = pageProps;
    const { translations }: any = states;
    const [ open, setOpen ] = useState(false);
    const [ dropdownDisplay, setDropdownDisplay ] = useState("");
    const buttonProps = [ "type", "faIcon", "faIconClass", "action" ];
    const dropdownButtonAction = () => setOpen(!open);
    const dropdownButtonValues = [ ButtonStyles.mask, true, "fa-light fa-chevron-down", dropdownButtonAction ];
    const dropdownButtonObject = buildProperties(buttonProps, dropdownButtonValues);
    return <div className={ DropdownStyles.container } data-open={ open }>
        <div className={ DropdownStyles.display }>
            <p>{ translations["Recherche par"] + " : " }<span>{ dropdownDisplay }</span></p>
            <Button { ...dropdownButtonObject as ButtonInterface }/>
        </div>
        { (list.length > 0) ? <div className={ DropdownStyles.list + ((open) ? " " + DropdownStyles.open : "") }>
            { list.map((link: any, key: number) => {
                const buttonProps = [ "type", "url", "text", "active" ];
                const dropdownLinkValues = [ ButtonStyles.dropdownLink, link.URL, link.NAME, checkMatch(router.asPath, link.URL) ];
                const dropdownLinkObject = buildProperties(buttonProps, dropdownLinkValues);
                (checkMatch(router.asPath, link.URL)) ? setDropdownDisplay(link.NAME) : null;
                return <Button key={ key } { ...dropdownLinkObject as ButtonInterface }/>;
            }) }
        </div> : <DropdownPicker { ...pageProps } open={ open } setDropdownDisplay={ setDropdownDisplay }/> }
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Dropdown Picker */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DropdownPicker = (pageProps: any) => {
    const { dropdown }: any = pageProps;
    switch(dropdown) {
        case "DirectoriesSearchBy":
            return <DirectoriesSearchBy { ...pageProps }/>;
        default:
            return <></>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directories Search By */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoriesSearchBy = (pageProps: any) => {
    const { open, setDropdownDisplay, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const filters = [
        // { ID: 0, NAME: translations["Toutes"], URL: "/all" },
        { ID: 0, NAME: translations["Catégories"], URL: "/directories/" + type + "/categories" },
        { ID: 0, NAME: translations["Pays"], URL: "/directories/" + type + "/countries" },
    ];
    return <div className={ DropdownStyles.list + ((open) ? " " + DropdownStyles.open : "") }>
        { filters.map((link: any, key: number) => {
            const buttonProps = [ "type", "url", "text", "active" ];
            const dropdownLinkValues = [ ButtonStyles.dropdownLink, link.URL, link.NAME, checkMatch(router.asPath, link.URL) ];
            const dropdownLinkObject = buildProperties(buttonProps, dropdownLinkValues);
            (checkMatch(router.asPath, link.URL)) ? setDropdownDisplay(link.NAME) : null;
            return <Button key={ key } { ...dropdownLinkObject as ButtonInterface }/>;
        }) }
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Dropdown;