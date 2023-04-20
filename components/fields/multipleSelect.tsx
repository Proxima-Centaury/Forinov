/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, Key, MouseEventHandler, useEffect, useRef } from "react";
import { SelectInterface } from "../../typescript/interfaces";
import { bindEventListeners, removeEventListeners, selectifyTheOptions, uppercaseFirst } from "../../scripts/utilities";
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
    const { options, action, placeholder, source, dynamic, limited, search, states, stateSetters, router } = selectProps;
    const { translations } = states;
    const { setModal } = stateSetters;
    const { category } = router.query;
    const [ selectState, setSelectState ] = useState(false);
    const [ selectedOptions, setSelectedOptions ] = useState([]);
    const categoryId = category?.substring(category.indexOf("_") + 1, category.length);
    const selectifiedOptions = selectifyTheOptions(options, source) as Array<Object>;
    const placeholderToSearchFilter = (): String => {
        let filterName = "";
        if(placeholder?.match(/(secteurs)/i)) {
            filterName = "targetsectors";
        } else if(placeholder?.match(/(technologies)/i)) {
            filterName = "technologies";
        } else if(placeholder?.match(/(métiers)/i)) {
            filterName = "targetjobs";
        } else if(placeholder?.match(/(business)/i)) {
            filterName = "businessmodel";
        } else {
            filterName = placeholder?.replaceAll(" ", "").toLowerCase() || "";
        };
        return filterName;
    };
    const selectAllHandler: MouseEventHandler = (event) => {
        if(selectedOptions.length > 0) {
            setSelectedOptions([]);
            if(dynamic) {
                return (action) ? action(event, [], placeholder) : null;
            };
            return (action) ? action(event, []) : null;
        } else {
            setSelectedOptions(selectifiedOptions as any);
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
                return setSelectState(false);
            };
        };
    };
    useEffect(() => {
        if(selectedOptions.length <= 0) {
            if(!dynamic && search.categories && search.categories.split("-").length > 0) {
                search.categories.split("-").map((option: any) => {
                    if(option) {
                        if(options && options.filter((selectedOption: any) => selectedOption.ID === option.toString()).length > 0) {
                            setSelectedOptions(options.filter((selectedOption: any) => selectedOption.ID === option.toString()) as any);
                        };
                    };
                });
            } else if(dynamic) {
                const filterName = placeholderToSearchFilter();
                const filterValues = search[filterName as keyof Object] || "";
                const filterValuesToArray = filterValues.split("-");
                filterValuesToArray.map((option: any) => {
                    if(option) {
                        if(options && options.filter((selectedOption: any) => selectedOption.ID === option.toString()).length > 0) {
                            setSelectedOptions(options.filter((selectedOption: any) => selectedOption.ID === option.toString()) as any);
                        };
                    };
                });
            };
        };
    });
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
        <button className={ SelectStyles.toggleButton } onClick={ () => (limited) ? setModal("register") : setSelectState(!selectState) }>
            <i className="fa-solid fa-caret-right"/>
        </button>
        { (placeholder) ? <p className={ SelectStyles.placeholder }>{ placeholder + " : " }{ (selectedOptions?.length <= 0) ? null : <span>{ selectedOptions?.length }</span> }</p> : null }
        <div className={ SelectStyles.options }>
            <Button button={ SelectStyles.option } { ...additionalProps } action={ selectAllHandler }/>
            { (selectifiedOptions.length > 0) ? selectifiedOptions.map((option: any, key: Key) => {
                const isDynamic = (dynamic) ? true : false;
                return (!option.COUNT || option.COUNT && option.COUNT > 0) ? <Option key={ key } option={ option } selectedOptions={ selectedOptions } action={ action } ownAction={ setSelectedOptions } dynamic={ (isDynamic) ? placeholder : null }/> : null;
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
    return <Button button={ SelectStyles.option + " " + ((selectedOptions && selectedOptions.filter((selected: any) => selected.ID == option.ID).length > 0) ? SelectStyles.selected : "") } action={ selectOption } text={ uppercaseFirst(option.NAME).toString() }/>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MultipleSelect;