/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { SelectInterface, OptionInterface } from "../../typescript/interfaces";
import { SelectOption } from "../../typescript/types";
import { selectifyTheOptions, handleOutOfArea } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import SelectStyles from "../../public/stylesheets/components/fields/Select.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Select = ({ type, version, options, action, defaultValue, source }: SelectInterface) => {
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    options = selectifiedOptions;
    const [ selectState, setSelectState ] = useState(false);
    const [ defaultSelected, setDefaultSelected ]: any = useState(() => options.filter((option: any) => option.value === defaultValue)[0]);
    const [ defaultSelectedAsObject, setDefaultSelectedAsObject ]: any = useState(null);
    const condition = !defaultSelectedAsObject || (defaultSelectedAsObject && defaultSelectedAsObject.value !== defaultValue);
    useEffect(() => setDefaultSelected(() => options.filter((option: any) => option.value === defaultValue)[0]), [ defaultValue ]);
    useEffect(() => (condition) ? setDefaultSelectedAsObject(defaultSelected) : undefined, [ defaultSelected ]);
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
            <p>{ (defaultSelectedAsObject) ? defaultSelectedAsObject.text : defaultSelected.text }</p>
            <div className={ SelectStyles.options }>
                { (options.length > 0) ? options.map((option: any) => {
                    const optionAsObject: SelectOption = option;
                    const optionProps = {
                        type,
                        version,
                        options,
                        ...optionAsObject,
                        action: action,
                        selected: optionAsObject.value === defaultValue,
                        defaultValue,
                        source
                    };
                    return <Option { ...optionProps }/>;
                }) : null }
            </div>
        </div>;
    };
    return <></>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select ( Option ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Option = ({ value, text, action, selected }: OptionInterface) => {
    const props = {
        className: SelectStyles.option + " " + ((selected) ? SelectStyles.selected : ""),
        "data-value": value,
        onClick: () => (action) ? action(value) : undefined
    };
    return <button { ...props }>
        <p>{ text }</p>
    </button>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Select;