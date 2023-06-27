/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ActionStyles from "@actions/Action.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Navigation Button*/
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const NavigationButton = (params: TButton): JSX.Element => {
    const { classList, action, active, disabled, tabIndex, ariaLabel } = params;
    const isActive = (active) ? " " + ActionStyles.active : "";
    const isDisabled = (disabled) ? " " + ActionStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ActionStyles[cssClass as keyof object]).join(" "); 
    const formatedClassList = ActionStyles.action + " " + nextClasses + isActive + isDisabled;
    const tabIndexValue = (tabIndex) ? tabIndex : 1;
    const actionTrigger: MouseEventHandler = (event) => (action) ? action(event) : null;
    return <button className={ formatedClassList } onClick={ actionTrigger } tabIndex={ tabIndexValue } aria-label={ ariaLabel }>
        <span/>
        <span/>
        <span/>
    </button>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default NavigationButton;