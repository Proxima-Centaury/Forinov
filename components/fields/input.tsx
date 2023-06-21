/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { FormEventHandler, useState } from "react";
import { InputInterface } from "../../typescript/interfaces";
import { preventSubmit } from "../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import InputStyles from "../../public/stylesheets/components/fields/Input.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Input */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Input = (inputProps: InputInterface) => {
    const { label, type, name, placeholder, action, defaultValue } = inputProps;
    const [ value, setValue ] = useState("");
    const [ visible, setVisible ] = useState(false);
    const getValue: FormEventHandler<HTMLInputElement> = (event) => {
        const target = event.target as HTMLInputElement;
        if(target) {
            const value = target.value;
            setValue(value);
        };
        (action) ? action(event) : value;
    };
    const additionalProps = { name: name?.toString(), placeholder: placeholder?.toString(), onInput: getValue, defaultValue: defaultValue?.toString() };
    return <div className={ InputStyles[type as keyof Object] }>
        <input id={ name + "FieldId" } className={ (value.length > 0) ? InputStyles.filled : "" } type={ (type === "password") ? ((visible) ? "text" : type.toString()) : type?.toString() } { ...additionalProps }/>
        { (label) ? <label htmlFor={ name + "FieldId" }>{ label }</label> : null }
        { (type === "password") ? <button onClick={ (event) => preventSubmit(event as any, () => setVisible(!visible)) }>
            { (visible) ? <i className="fa-eye-slash fa-solid"/> : <i className="fa-eye fa-solid"/> }
        </button> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Input;