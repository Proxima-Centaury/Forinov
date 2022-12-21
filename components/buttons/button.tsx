/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { ButtonInterface } from "../../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Button */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Button = ({ type, faIcon, faIconClass, url, action, text, count, disabled = false }: ButtonInterface) => {
    const roundedButtonTypes = [
        ButtonStyles.callToActionRoundedIcon,
        ButtonStyles.callToActionAlternativeRoundedIcon
    ];
    const buttonTypes = [
        ButtonStyles.callToAction,
        ButtonStyles.callToActionAlternative,
        ButtonStyles.callToActionNegative,
        ButtonStyles.callToActionWide,
    ];
    if(type === "default") {
        return <button></button>;
    } else if(!url && type === ButtonStyles.moreOrLess) {
        return <button className={ ButtonStyles.moreOrLess + ((disabled) ? " disabled" : "") } onClick={ action }>
            <span>{ text + ((count)  ? " (" + count + ")" : " ") }</span>
            <i className="fa-solid fa-caret-right"/>
        </button>;
    } else if(!url && type === ButtonStyles.moreOrLessAlternative) {
        return <button className={ ButtonStyles.moreOrLessAlternative + ((disabled) ? " disabled" : "") } onClick={ action }>
            <span>{ text + ((count)  ? " (" + count + ")" : " ") }</span>
        </button>;
    } else if(!url && buttonTypes.includes(type)) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action }>
            { (faIcon) ? <i className={ faIconClass }/> : null }
            { text }
        </button>
    } else if(!url && roundedButtonTypes.includes(type)) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action }>
            { (faIcon) ? <i className={ faIconClass }/> : null }
        </button>
    } else if(!url && type === ButtonStyles.closeModal) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action }>
            <i className="fa-light fa-xmark"/>
        </button>
    } else if(!url && type && type.match(ButtonStyles.navigationButton)) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action }>
            <span></span>
            <span></span>
            <span></span>
        </button>;
    } else if(url && buttonTypes.includes(type)) {
        return <Link className={ type + ((disabled) ? " disabled" : "") } href={ url as any }>{ text }</Link>
    } else {
        return <button></button>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Button;