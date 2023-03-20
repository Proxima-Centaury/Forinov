/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, Key, MouseEventHandler, useEffect, useRef } from "react";
import { SelectInterface } from "../../typescript/interfaces";
import { bindEventListeners, removeEventListeners, selectifyTheOptions } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Component */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import SelectStyles from "../../public/stylesheets/components/fields/Select.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Multiple Select */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const MultipleSelect = (selectProps: SelectInterface) => {
    const selectReference = useRef(null);
    const { options, action, placeholder, source, dynamic, states, router } = selectProps;
    const { translations } = states;
    let { category } = router.query;
    category = category?.substring(category.indexOf("_") + 1, category.length);
    const [ selectState, setSelectState ] = useState(false);
    const [ selectedOptions, setSelectedOptions ]: any = useState([]);
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    const selectAllHandler: MouseEventHandler = (event) => {
        if(selectedOptions.length > 0) {
            setSelectedOptions([]);
            if(dynamic) {
                return (action) ? action(event, [], placeholder) : null;
            };
            return (action) ? action(event, []) : null;
        } else {
            setSelectedOptions(selectifiedOptions);
            if(dynamic) {
                return (action) ? action(event, selectifiedOptions, placeholder) : null;
            };
            return (action) ? action(event, selectifiedOptions) : null;
        };
    };
    const handleOutOfArea: MouseEventHandler = (event) => {
        if(selectReference && selectReference.current) {
            const current = selectReference.current as HTMLElement;
            if(!current.contains(event.target as HTMLElement)) {
                setSelectState(false);
            };
        };
    };
    useEffect(() => {
        const foundOption = options?.find((option: any) => option.ID == category);
        const optionSEO = [];
        (!dynamic && foundOption) ? optionSEO.push(foundOption) : null;
        setSelectedOptions(optionSEO);
    }, [ category ]);
    useEffect(() => {
        bindEventListeners(document, [ "click" ], handleOutOfArea);
        return () => {
            removeEventListeners(document, [ "click" ], handleOutOfArea);
        };
    }, []);
    const additionalProps = {
        icon: (selectedOptions.length > 0) ? "fa-light fa-xmark" : "fa-light fa-check",
        text: (selectedOptions.length > 0) ? translations["Tout désélectionner"] : translations["Tout sélectionner"]
    };
    return <div className={ SelectStyles.selectField + " " + ((selectState) ? SelectStyles.show : "") } ref={ selectReference }>
        <button className={ SelectStyles.toggleButton } onClick={ () => setSelectState(!selectState) }>
            <i className="fa-solid fa-caret-right"/>
        </button>
        { (placeholder) ? <p className={ SelectStyles.placeholder }>{ placeholder + " : " }{ (selectedOptions?.length <= 0) ? null : <span>{ selectedOptions?.length }</span> }</p> : null }
        <div className={ SelectStyles.options }>
            <Button button={ SelectStyles.option } { ...additionalProps } action={ selectAllHandler }/>
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
                return (action) ? action(event, selectedOptions, dynamic) : null;
            };
            return (action) ? action(event, selectedOptions) : null;
        } else {
            const filtered = selectedOptions.filter((selectedOption: any) => selectedOption.ID !== option.ID);
            ownAction(filtered);
            if(dynamic) {
                return (action) ? action(event, filtered, dynamic) : null;
            };
            return (action) ? action(event, filtered) : null;
        };
    };
    return <Button button={ SelectStyles.option + " " + ((selectedOptions && selectedOptions.filter((selected: any) => selected.ID == option.ID).length > 0) ? SelectStyles.selected : "") } action={ selectOption } text={ option.NAME }/>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MultipleSelect;