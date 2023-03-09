/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { SelectInterface } from "../../typescript/interfaces";
import { selectifyTheOptions, handleOutOfArea } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import SelectStyles from "../../public/stylesheets/components/fields/Select.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Select = ({ type, version, options, action, defaultValue, source }: SelectInterface) => {
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    options = selectifiedOptions;
    const [ selectState, setSelectState ] = useState(false);
    useEffect(() => {
        const closeOptions = () => setSelectState(false);
        const selectSelector = "." + SelectStyles.selectField;
        const selectToggleSelector = "." + SelectStyles.toggleButton;
        window.addEventListener("click", (event) => handleOutOfArea(event, [ selectSelector, selectToggleSelector ], closeOptions))
        return () => window.removeEventListener("click", handleOutOfArea);
    }, []);
    if(options) {
        return <div className={ SelectStyles.selectField + " " + ((selectState) ? SelectStyles.show : "") }>
            <button className={ SelectStyles.toggleButton } onClick={ () => setSelectState(!selectState) }>
                <i className="fa-solid fa-caret-right"></i>
            </button>
            <p>{ defaultValue.NAME }</p>
            <div className={ SelectStyles.options }>
                { (options.length > 0) ? options.map((option: any,index: any) => {
                    const optionAsObject: any = option;
                    const optionProps = { ...optionAsObject, action: action, selected: optionAsObject.VALUE === defaultValue };
                    return <Option { ...optionProps } key={ index + "-optionSelect" } />;
                }) : null }
            </div>
        </div>;
    };
    return <></>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select ( Option ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Option = (option: any) => {
    const { ID, NAME, VALUE, action, selected }: any = option;
    const props = {
        className: SelectStyles.option + " " + ((selected) ? SelectStyles.selected : ""),
        "data-id": ID,
        "data-value": VALUE,
        onClick: () => (action) ? action(VALUE) : undefined
    };
    return <button { ...props }>
        <p>{ NAME }</p>
    </button>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Select;