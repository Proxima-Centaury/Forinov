/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ButtonStyles from "@buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Link Action */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const LinkButton = (params: TButton): JSX.Element => {
    const { classList, href, icon, text, active, disabled, tabIndex, ariaLabel, locale } = params;
    const isActive = (active) ? " " + ButtonStyles.active : "";
    const isDisabled = (disabled) ? " " + ButtonStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ButtonStyles[cssClass]).join(" "); 
    const formatedClassList = ButtonStyles.action + " " + nextClasses + isActive + isDisabled;
    const target = (href?.match(/(http)/)) ? "_blank" : undefined;
    const tabIndexValue = (tabIndex) ? tabIndex : 0;
    const additionalAttributes = { tabIndex: tabIndexValue, "aria-label": ariaLabel };
    return <Link className={ formatedClassList } href={ (href) ? href : "/" } locale={ locale } target={ target } { ...additionalAttributes }>
        { (icon) ? <i className={ icon }/> : null }
        { (text) ? <span>{ text }</span> : null }
    </Link>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default LinkButton;