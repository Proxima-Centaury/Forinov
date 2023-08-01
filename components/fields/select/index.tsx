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
import type { SelectType } from "@typescript/types/SelectType";
import type { OptionType, UnkownOptionType } from "@typescript/types/OptionType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { isNode, isString } from "@scripts/typeChecks";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import SelectStyles from "@fields/select/Select.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Select */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Select = (params: SelectType): JSX.Element => {
    const router = useRouter();
    const { locale } = router;
    const selectReference = useRef(null);
    const { action, ariaLabel, defaultValue, defaultValues, dynamic, limited, options, placeholder, search, source } = params;
    const [ selected, setSelected ] = useState<OptionType>({ id: 0, name: "", value: "" });
    const [ selectState, setSelectState ] = useState<boolean>(false);
    const memoBetterOptions = useMemo((): OptionType[] => {
        const betterOptionsBuilder = (options: UnkownOptionType[] | string[]): OptionType[] | boolean => {
            if(!options || options.length <= 0 || (options && !Array.isArray(options))) {
                return false;
            };
            const betterOptions: OptionType[] = [];
            options.map((option: UnkownOptionType | string, key: number) => {
                if(typeof option === "string") {
                    (option.length > 0) ? betterOptions.push({ id: key, name: option, value: option }) : null;
                } else {
                    const optionAsObject = { id: 0, name: "", value: "" };
                    if(typeof option === "object" && !Object(option).hasProperty("ID")) {
                        optionAsObject.id = key;
                    };
                    optionAsObject.name = (isString(option.NAME)) ? option.NAME : "";
                    optionAsObject.value = (isString(option.VALUE)) ? option.VALUE : "";
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
        if(isNode(event.target) && selectReference && selectReference.current) {
            const target = event.target;
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
        memoBetterOptions.map((option: OptionType) => {
            if(defaultValue && option.value === defaultValue) {
                setSelected(option);
            };
        });
    }, [ memoBetterOptions, defaultValue ]);
    return <div className={ SelectStyles.field } ref={ selectReference }>
        <ClassicButton classList="select toggle" icon="fa-solid fa-caret-right" action={ switchSelectState } active={ selectState } ariaLabel={ ariaLabel }/>
        <p className={ SelectStyles.placeholder }>{ memoPlaceholderText }</p>
        <div className={ SelectStyles.options } data-state={ (selectState) ? "visible" : "hidden" }>
            <div className={ SelectStyles.container }>
                { (Array.isArray(memoBetterOptions)) ? memoBetterOptions.map((option: OptionType, key: number) => {
                    const isSelected = (option?.value?.match(/(fr|en)/i)) ? option.value === locale : option.value === selected.value;
                    const params: OptionType = { ...option, action: action, selected: isSelected };
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