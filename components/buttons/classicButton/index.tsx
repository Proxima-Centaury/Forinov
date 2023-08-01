/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { ButtonType } from "@typescript/types/ButtonType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ButtonStyles from "@buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Classic Action */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ClassicButton = (params: ButtonType): JSX.Element => {
    const { action, active, ariaLabel, children, classList, disabled, href, icon, locale, notifications, tabIndex, text } = params;
    const isActive = (active) ? " " + ButtonStyles.active : "";
    const isDisabled = (disabled) ? " " + ButtonStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ButtonStyles[cssClass]).join(" "); 
    const formatedClassList = ButtonStyles.action + " " + nextClasses + isActive + isDisabled;
    const tabIndexValue = (tabIndex) ? tabIndex : 0;
    const actionTrigger: MouseEventHandler = (event) => (action) ? action(event) : null;
    return <button className={ formatedClassList } onClick={ actionTrigger } tabIndex={ tabIndexValue } aria-label={ ariaLabel }>
        { (icon) ? <i className={ icon }/> : null }
        { (text) ? <span>{ text }</span> : null }
        { (notifications && notifications > 0) ? <span className={ ButtonStyles.notifications }>{ notifications }</span> : null }
    </button>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ClassicButton;