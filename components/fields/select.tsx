/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, Key, useRef, useEffect, MouseEventHandler } from "react";
import { SelectInterface } from "../../typescript/interfaces";
import { bindEventListeners, removeEventListeners, selectifyTheOptions } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import SelectStyles from "../../public/stylesheets/components/fields/Select.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Select = (selectProps: SelectInterface) => {
    const selectReference = useRef(null);
    const { options, action, placeholder, defaultValue, source } = selectProps;
    const [ selectState, setSelectState ] = useState(false);
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    const handleOutOfArea: MouseEventHandler = (event) => {
        if(selectReference && selectReference.current) {
            const current = selectReference.current as HTMLElement;
            if(!current.contains(event.target as HTMLElement)) {
                setSelectState(false);
            };
        };
    };
    useEffect(() => {
        bindEventListeners(document, [ "click" ], handleOutOfArea);
        return () => {
            removeEventListeners(document, [ "click" ], handleOutOfArea);
        };
    }, []);
    return <div className={ SelectStyles.selectField + " " + ((selectState) ? SelectStyles.show : "") } ref={ selectReference }>
        <button className={ SelectStyles.toggleButton } onClick={ () => setSelectState(!selectState) }>
            <i className="fa-solid fa-caret-right"></i>
        </button>
        <p>{ (placeholder && !defaultValue) ? placeholder : (defaultValue) ? defaultValue?.NAME : "" }</p>
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
    const additionalProps = {
        className: SelectStyles.option + " " + ((selected) ? SelectStyles.selected : ""),
        "data-id": option.ID,
        "data-value": option.VALUE,
        onClick: () => (action) ? action(option.VALUE) : undefined
    };
    return <button { ...additionalProps }>
        <span>{ option.NAME }</span>
    </button>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Select;