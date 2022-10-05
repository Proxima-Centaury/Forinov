/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Select = ({ options, setter }) => {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ selectedOption, setSelectedOption ] = useState(options[selectedIndex]);
    const setValue = (event) => {
        const target = event.target;
        const value = target.getAttribute("data-value");
        const index = target.getAttribute("data-index");
        const parent = target.closest(".options");
        const previousOption = parent.querySelector(".active");
        previousOption.classList.remove("active");
        target.classList.add("active");
        return [ setter(value), setSelectedIndex(index) ];
    };
    const showOptions = (event) => {
        const target = event.target;
        const parent = target.closest(".custom");
        parent.querySelector(".options").classList.toggle("show");
        return target;
    };
    useEffect(() => (selectedIndex) ? setSelectedOption(options[selectedIndex]) : undefined, [ selectedIndex, options ]);
    return <div className="select">
        <div className="custom">
            <p className="selected">{ selectedOption.text }</p>
            <button onClick={ showOptions }>
                <i className="fa-light fa-chevron-down"/>
            </button>
            <div className="options">
                { options.map(({ value, text }, key) => {
                    const props = {
                        index: key,
                        value: value,
                        text: text,
                        onClick: setValue
                    };
                    return <Option key={ key } { ...props }/>;
                }) }
            </div>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Select ( Option ) */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Option = ({ index, value, text, onClick, type = "custom" }) => {
    const active = (index === 0) ? "active" : "";
    if(type === "option") {
        return <option data-index={ index } value={ value }>{ text }</option>;
    } else {
        return <button className={ active } data-index={ index } data-value={ value } onClick={ onClick }>{ text }</button>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Select;