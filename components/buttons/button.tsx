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
const Button = ({ type, faIcon, faIconClass, url, action, text, count, disabled = false, aria, index }: ButtonInterface) => {
    const roundedButtonTypes = [
        ButtonStyles.callToActionRoundedIcon,
        ButtonStyles.callToActionAlternativeRoundedIcon,
        ButtonStyles.callToActionSquaredIcon,
        ButtonStyles.callToActionAlternativeSquaredIcon
    ];
    const buttonTypes = [
        ButtonStyles.callToAction,
        ButtonStyles.callToActionAlternative,
        ButtonStyles.callToActionNegative,
        ButtonStyles.callToActionStep,
        ButtonStyles.callToActionWide,
    ];
    if(type === "default") {
        return <button aria-label={ aria as string }>{ text }</button>;
    } else if(!url && type === ButtonStyles.moreOrLess) {
        return <button className={ ButtonStyles.moreOrLess + ((disabled) ? " disabled" : "") } onClick={ action } aria-label={ aria as string }>
            <span>{ text + ((count)  ? " (" + count + ")" : " ") }</span>
            <i className="fa-solid fa-caret-right"/>
        </button>;
    } else if(!url && type === ButtonStyles.moreOrLessAlternative) {
        return <button className={ ButtonStyles.moreOrLessAlternative + ((disabled) ? " disabled" : "") } onClick={ action } aria-label={ aria as string }>
            <span>{ text + ((count)  ? " (" + count + ")" : " ") }</span>
        </button>;
    } else if(!url && buttonTypes.includes(type)) {
        const dataIndex = (type === ButtonStyles.callToActionStep) ? index : undefined;
        const classList = () => {
            if(index <= 0 && type === ButtonStyles.callToActionStep) {
                return type + " " + ButtonStyles.active + ((disabled) ? " disabled" : "")
            };
            return type + ((disabled) ? " disabled" : "");
        };
        return <button className={ classList() } onClick={ action } aria-label={ aria as string } data-index={ dataIndex }>
            { (faIcon) ? <i className={ faIconClass }/> : null }
            { text }
        </button>
    } else if(!url && roundedButtonTypes.includes(type)) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action } aria-label={ aria as string }>
            { (faIcon) ? <i className={ faIconClass }/> : null }
        </button>
    } else if(!url && type === ButtonStyles.closeModal) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action } aria-label={ aria as string }>
            <i className="fa-light fa-xmark"/>
        </button>
    } else if(!url && type && type.match(ButtonStyles.navigationButton)) {
        return <button className={ type + ((disabled) ? " disabled" : "") } onClick={ action } aria-label={ aria as string }>
            <span></span>
            <span></span>
            <span></span>
        </button>;
    } else if(url && buttonTypes.includes(type)) {
        return <Link className={ type + ((disabled) ? " disabled" : "") } href={ url as any } aria-label={ aria as string }>{ text }</Link>
    } else {
        return <button aria-label={ aria as string }>{ text }</button>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Button;