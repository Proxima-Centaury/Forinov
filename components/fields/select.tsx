/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect, useState, Key } from "react";
import { SelectInterface } from "../../typescript/interfaces";
import { selectifyTheOptions, handleOutOfArea } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import SelectStyles from "../../public/stylesheets/components/fields/Select.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Select = (selectProps: SelectInterface) => {
    const { type, options, action, defaultValue, source } = selectProps;
    const [ selectState, setSelectState ] = useState(false);
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    // useEffect(() => {
    //     const closeOptions = () => setSelectState(false);
    //     const selectSelector = "." + SelectStyles.selectField;
    //     const selectToggleSelector = "." + SelectStyles.toggleButton;
    //     window.addEventListener("click", (event) => handleOutOfArea(event, [ selectSelector, selectToggleSelector ], closeOptions))
    //     return () => window.removeEventListener("click", handleOutOfArea);
    // }, []);
    return <div className={ SelectStyles.selectField + " " + ((selectState) ? SelectStyles.show : "") }>
        <button className={ SelectStyles.toggleButton } onClick={ () => setSelectState(!selectState) }>
            <i className="fa-solid fa-caret-right"></i>
        </button>
        <p>{ (defaultValue) ? defaultValue?.NAME : "" }</p>
        <div className={ SelectStyles.options }>
            { (selectifiedOptions.length > 0) ? selectifiedOptions.map((option: any, key: Key) => <Option key={ key } option={ option } action={ action } selected={ option.VALUE === defaultValue.VALUE }/>) : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select ( Option ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Option = (optionProps: any) => {
    const { option, action, selected }: any = optionProps;
    const props = {
        className: SelectStyles.option + " " + ((selected) ? SelectStyles.selected : ""),
        "data-id": option.ID,
        "data-value": option.VALUE,
        onClick: () => (action) ? action(option.VALUE) : undefined
    };
    return <button { ...props }>
        <p>{ option.NAME }</p>
    </button>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Select;