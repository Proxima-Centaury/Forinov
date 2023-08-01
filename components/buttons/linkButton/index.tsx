/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ButtonType } from "@typescript/types/ButtonType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ButtonStyles from "@buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Link Action */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const LinkButton = (params: ButtonType): JSX.Element => {
    const { action, active, ariaLabel, children, classList, disabled, href, icon, locale, notifications, tabIndex, text } = params;
    const isActive = (active) ? " " + ButtonStyles.active : "";
    const isDisabled = (disabled) ? " " + ButtonStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ButtonStyles[cssClass]).join(" "); 
    const formatedClassList = ButtonStyles.action + " " + nextClasses + isActive + isDisabled;
    const target = (href?.match(/(http)/)) ? "_blank" : undefined;
    const tabIndexValue = (tabIndex) ? tabIndex : 0;
    const additionalAttributes = { tabIndex: tabIndexValue, "aria-label": ariaLabel };
    return <Link className={ formatedClassList } href={ (href) ? href : "/" } locale={ locale } target={ target } { ...additionalAttributes }>
        { (!children && icon) ? <i className={ icon }/> : null }
        { (!children && text) ? <span>{ text }</span> : null }
        { (children && !text) ? <span>{ children }</span> : null }
    </Link>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default LinkButton;