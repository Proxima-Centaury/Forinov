/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useMemo, useRef, useEffect, useState } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Option from "@fields/select/option";
import ClassicButton from "@buttons/classicButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TSelect } from "@typescript/types/TSelect";
import type { TOption, TUnkownOption } from "@typescript/types/TOption";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { isNode } from "@scripts/isNode";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import SelectStyles from "@fields/select/Select.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Select */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Select = (params: TSelect): JSX.Element => {
    const router = useRouter();
    const { locale } = router;
    const selectReference = useRef(null);
    const { options, placeholder, action, defaultValue, ariaLabel } = params;
    const [ selected, setSelected ] = useState<TOption>({ id: 0, name: "", value: "" });
    const [ selectState, setSelectState ] = useState<boolean>(false);
    const memoBetterOptions = useMemo((): TOption[] => {
        const betterOptionsBuilder = (options: TUnkownOption[] | string[]): TOption[] | boolean => {
            if(!options || options.length <= 0 || (options && !Array.isArray(options))) {
                return false;
            };
            const betterOptions: TOption[] = [];
            options.map((option: TUnkownOption | string, key: number) => {
                if(typeof option === "string") {
                    (option.length > 0) ? betterOptions.push({ id: key, name: option, value: option }) : null;
                } else {
                    const optionAsObject = { id: 0, name: "", value: "" };
                    if(typeof option === "object" && !Object(option).hasProperty("ID")) {
                        optionAsObject.id = key;
                    };
                    optionAsObject.name = option.NAME;
                    optionAsObject.value = option.VALUE;
                    betterOptions.push(optionAsObject);
                };
            });
            return betterOptions;
        };
        const updatedOptions = (options) ? betterOptionsBuilder(options) : false;
        return (Array.isArray(updatedOptions)) ? updatedOptions : [ { id: 0, name: "undefined", value: "undefined" } ];
    }, [ options ]);
    const memoPlaceholderText = useMemo((): string => {
        if(placeholder && !selected.name) {
            return (placeholder.match(/^(fr|en)$/i)) ? placeholder.toUpperCase() : placeholder;
        } else if(!placeholder && selected.name) {
            return (selected.name.match(/^(fr|en)$/i)) ? selected.name.toUpperCase() : selected.name;
        } else {
            return "";
        };
    }, [ placeholder, selected ]);
    const switchSelectState = () => setSelectState(!selectState);
    const handleOutOfArea = (event: MouseEvent) => {
        const target = isNode(event.target);
        if(selectReference && selectReference.current) {
            const current: HTMLElement = selectReference.current;
            if(!current.contains(target)) {
                setSelectState(false);
            };
        };
    };
    useEffect(() => {
        document.addEventListener("click", handleOutOfArea);
        return () => {
            document.removeEventListener("click", handleOutOfArea);
        };
    }, []);
    useEffect(() => {
        memoBetterOptions.map((option: TOption) => {
            if(defaultValue && option.value === defaultValue) {
                setSelected(option);
            };
        });
    }, [ memoBetterOptions, defaultValue ]);
    return <div className={ SelectStyles.field } ref={ selectReference }>
        <ClassicButton classList="select toggle" icon="fa-solid fa-caret-right" action={ switchSelectState } active={ selectState }/>
        <p className={ SelectStyles.placeholder }>{ memoPlaceholderText }</p>
        <div className={ SelectStyles.options } data-state={ (selectState) ? "visible" : "hidden" }>
            <div className={ SelectStyles.container }>
                { (Array.isArray(memoBetterOptions)) ? memoBetterOptions.map((option: TUnkownOption, key: number) => {
                    const isSelected = (option.value.match(/(fr|en)/i)) ? option.value === locale : option.value === selected.value;
                    const params: TOption = { ...option, action: action, selected: isSelected };
                    return <Option key={ key } { ...params }/>;
                }) : null }
            </div>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Select;