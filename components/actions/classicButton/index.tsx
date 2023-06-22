/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ActionsStyles from "@actions/action.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Classic Button */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ClassicButton = (params: TButton): JSX.Element => {
    const { classList, icon, text, action, notifications, active, disabled, tabIndex, ariaLabel } = params;
    const isActive = (active) ? " " + ActionsStyles.active : "";
    const isDisabled = (disabled) ? " " + ActionsStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ActionsStyles[cssClass as keyof object]).join(" "); 
    const formatedClassList = ActionsStyles.action + " " + nextClasses + isActive + isDisabled;
    const tabIndexValue = (tabIndex) ? tabIndex : 1;
    const actionTrigger: MouseEventHandler = (event) => (action) ? action(event) : null;
    return <button className={ formatedClassList } onClick={ actionTrigger } tabIndex={ tabIndexValue } aria-label={ ariaLabel }>
        { (icon) ? <i className={ icon }/> : null }
        { (text) ? <span>{ text }</span> : null }
        { (notifications && notifications > 0) ? <span className={ ActionsStyles.notifications }>{ notifications }</span> : null }
    </button>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ClassicButton;