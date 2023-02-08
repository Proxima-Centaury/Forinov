/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { FormEventHandler, useState } from "react";
import { InputInterface } from "../../typescript/interfaces";
import { preventSubmit } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import InputStyles from "../../public/stylesheets/components/fields/Input.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Input */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Input = ({ label, type, name, placeholder, version, action, defaultValue }: InputInterface) => {
    const [ value, setValue ] = useState("");
    const [ visible, setVisible ] = useState(false);
    const getValue: FormEventHandler<HTMLInputElement> = (event) => {
        const target = event.target as HTMLInputElement;
        if(target) {
            const value = target.value;
            setValue(value);
        };
        return (action) ? action : value;
    };
    const inputProps = {
        id: name + "FieldId",
        className: (value.length > 0) ? InputStyles.filled : "",
        type: (type === "password") ? ((visible) ? "text" : type) : type,
        name: name,
        placehodler: placeholder,
        onInput: getValue,
        defaultValue: defaultValue
    };
    return <div className={ InputStyles[type] }>
        <input { ...inputProps }/>
        { (label) ? <label htmlFor={ name + "FieldId" }>{ label }</label> : null }
        { (type === "password") ? <button onClick={ (event) => preventSubmit(event as any, () => setVisible(!visible)) }>
            { (visible) ? <i className="fa-eye-slash fa-solid"/> : <i className="fa-eye fa-solid"/> }
        </button> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Input;