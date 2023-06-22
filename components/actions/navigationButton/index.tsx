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
/* Navigation Button*/
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const NavigationButton = (buttonProps: TButton): JSX.Element => {
    const { classList, action, active, disabled, tabIndex, ariaLabel } = buttonProps;
    const isActive = (active) ? " " + ActionsStyles.active : "";
    const isDisabled = (disabled) ? " " + ActionsStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ActionsStyles[cssClass as keyof object]).join(" "); 
    const formatedClassList = ActionsStyles.action + " " + nextClasses + isActive + isDisabled;
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