/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, Key, MouseEventHandler, useEffect } from "react";
import { SelectInterface } from "../../typescript/interfaces";
import { selectifyTheOptions } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import SelectStyles from "../../public/stylesheets/components/fields/Select.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Multiple Select */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const MultipleSelect = (selectProps: SelectInterface) => {
    const { options, action, placeholder, source, dynamic, router } = selectProps;
    let { category } = router.query;
    category = category?.substring(category.indexOf("_") + 1, category.length);
    const [ selectState, setSelectState ] = useState(false);
    const [ selectedOptions, setSelectedOptions ]: any = useState([]);
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    useEffect(() => {
        const foundOption = options?.find((option: any) => option.ID == category);
        const optionSEO = [];
        (foundOption) ? optionSEO.push(foundOption) : null;
        setSelectedOptions(optionSEO);
    }, [ category ]);
    return <div className={ SelectStyles.selectField + " " + ((selectState) ? SelectStyles.show : "") }>
        <button className={ SelectStyles.toggleButton } onClick={ () => setSelectState(!selectState) }>
            <i className="fa-solid fa-caret-right"></i>
        </button>
        { (placeholder) ? <p className={ SelectStyles.placeholder }>{ placeholder + " : " }{ (selectedOptions?.length <= 0) ? null : <span>{ selectedOptions?.length }</span> }</p> : null }
        <div className={ SelectStyles.options }>
            { (selectifiedOptions.length > 0) ? selectifiedOptions.map((option: any, key: Key) => {
                const isDynamic = (dynamic) ? true : false;
                return <Option key={ key } option={ option } selectedOptions={ selectedOptions } action={ action } ownAction={ setSelectedOptions } dynamic={ (isDynamic) ? placeholder : null }/>;
            }) : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select ( Option ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Option = (optionProps: any) => {
    const { option, selectedOptions, action, ownAction, dynamic }: any = optionProps;
    const selectOption: MouseEventHandler = (event) => {
        if(selectedOptions && selectedOptions.filter((selectedOption: any) => selectedOption.ID === option.ID).length <= 0) {
            selectedOptions.push(option);
            ownAction(selectedOptions);
            if(dynamic) {
                return action(event, selectedOptions, dynamic);
            };
            return action(event, selectedOptions);
        } else {
            const filtered = selectedOptions.filter((selectedOption: any) => selectedOption.ID !== option.ID);
            ownAction(filtered);
            if(dynamic) {
                return action(event, filtered, dynamic);
            };
            return action(event, filtered);
        };
    };
    const additionalProps = {
        className: SelectStyles.option + " " + ((selectedOptions && selectedOptions.filter((selected: any) => selected.ID == option.ID).length > 0) ? SelectStyles.selected : ""),
        "data-id": option.ID,
        "data-value": option.VALUE
    };
    return <button { ...additionalProps } title={ option.NAME } onClick={ selectOption }>
        <span>{ option.NAME }</span>
    </button>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MultipleSelect;