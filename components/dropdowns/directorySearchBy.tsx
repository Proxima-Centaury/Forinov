/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
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
/* Directory Search By Dropdown */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectorySearchByDropdown = (pageProps: any) => {
    const { states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const [ open, setOpen ] = useState(false);
    const buttonProps = [ "type", "faIcon", "faIconClass", "action" ];
    const dropdownButtonAction = () => setOpen(!open);
    const dropdownButtonValues = [ ButtonStyles.mask, true, "fa-light fa-chevron-down", dropdownButtonAction ];
    const dropdownButtonObject = buildProperties(buttonProps, dropdownButtonValues);
    const filters = [
        // { ID: 0, NAME: translations["Toutes"], URL: "/all" },
        { ID: 0, NAME: translations["Catégories"], URL: "/directories/" + type + "/categories" },
        { ID: 0, NAME: translations["Pays"], URL: "/directories/" + type + "/countries" },
    ];
    const activeFilter = () => filters.map((link: any) => (checkMatch(router.asPath, link.URL)) ? link.NAME : null).filter((link: any) => link !== null)[0];
    return <div className={ DropdownStyles.container } data-open={ open }>
        <div className={ DropdownStyles.display }>
            <p>{ translations["Recherche par"] + " : " }<span>{ activeFilter() }</span></p>
            <Button { ...dropdownButtonObject as ButtonInterface }/>
        </div>
        { (filters.length > 0) ? <div className={ DropdownStyles.list + ((open) ? " " + DropdownStyles.open : "") }>
            { filters.map((link: any, key: number) => {
                const buttonProps = [ "type", "url", "text", "active" ];
                const dropdownLinkValues = [ ButtonStyles.dropdownLink, link.URL, link.NAME, checkMatch(router.asPath, link.URL) ];
                const dropdownLinkObject = buildProperties(buttonProps, dropdownLinkValues);
                return <Button key={ key } { ...dropdownLinkObject as ButtonInterface }/>;
            }) }
        </div> : null }
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default DirectorySearchByDropdown;