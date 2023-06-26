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
import ActionStyles from "@actions/Action.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Link Button */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const LinkButton = (params: TButton): JSX.Element => {
    const { classList, href, icon, text, active, disabled, tabIndex, ariaLabel } = params;
    const isActive = (active) ? " " + ActionStyles.active : "";
    const isDisabled = (disabled) ? " " + ActionStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ActionStyles[cssClass as keyof object]).join(" "); 
    const formatedClassList = ActionStyles.action + " " + nextClasses + isActive + isDisabled;
    const tabIndexValue = (tabIndex) ? tabIndex : 1;
    const target = (href?.match(/(http)/)) ? "_blank" : undefined;
    return <Link className={ formatedClassList } href={ (href) ? href : "/" } tabIndex={ tabIndexValue } aria-label={ ariaLabel } target={ target }>
        { (icon) ? <i className={ icon }/> : null }
        { (text) ? <span>{ text }</span> : null }
    </Link>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default LinkButton;