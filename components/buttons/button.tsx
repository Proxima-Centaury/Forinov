/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { ButtonInterface } from "../../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Button */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Button = ({ type, faIcon, faIconClass, url, action, text, count }: ButtonInterface) => {
    const roundedButtonTypes = [
        ButtonStyles.callToActionRoundedIcon,
        ButtonStyles.callToActionAlternativeRoundedIcon
    ];
    const buttonTypes = [
        ButtonStyles.callToAction,
        ButtonStyles.callToActionAlternative,
        ButtonStyles.callToActionNegative,
    ];
    if(type === "default") {
        return <button></button>;
    } else if(!url && type === "moreOrLess") {
        return <button className="seeMore" onClick={ action }>
            <span>{ text + ((count)  ? " (" + count + ")" : " ") }</span>
            <i className="fa-solid fa-caret-right"/>
        </button>;
    } else if(!url && type === "moreOrLessAlternative") {
        return <button className="seeMoreAlternative" onClick={ action }>
            <span>{ text + ((count)  ? " (" + count + ")" : " ") }</span>
        </button>;
    } else if(!url && buttonTypes.includes(type)) {
        return <button className={ type } onClick={ action }>
            { (faIcon) ? <span className={ ButtonStyles.icon }>
                <i className={ faIconClass }/>
            </span> : null }
            <p>{ text }</p>
        </button>
    } else if(!url && roundedButtonTypes.includes(type)) {
        return <button className={ type } onClick={ action }>
            { (faIcon) ? <span className={ ButtonStyles.icon }>
                <i className={ faIconClass }/>
            </span> : null }
        </button>
    } else if(!url && type === "closeModal") {
        return <button className={ type } onClick={ action }>
            <i className="fa-light fa-xmark"/>
        </button>
    } else if(!url && type && type.match(ButtonStyles.navigationButton)) {
        return <button className={ type } onClick={ action }>
            <span></span>
            <span></span>
            <span></span>
        </button>;
    } else if(url && buttonTypes.includes(type)) {
        return <Link className={ type } href={ url as any }>{ text }</Link>
    } else {
        return <button></button>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Button;