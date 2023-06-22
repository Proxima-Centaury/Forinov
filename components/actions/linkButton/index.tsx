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
import ActionsStyles from "@actions/action.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Link Button */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const LinkButton = (buttonProps: TButton): JSX.Element => {
    const { classList, href, icon, text, active, disabled, tabIndex, ariaLabel } = buttonProps;
    const isActive = (active) ? " " + ActionsStyles.active : "";
    const isDisabled = (disabled) ? " " + ActionsStyles.disabled : "";
    const nextClasses = classList?.split(" ").map((cssClass: string) => ActionsStyles[cssClass as keyof object]).join(" "); 
    const formatedClassList = ActionsStyles.action + " " + nextClasses + isActive + isDisabled;
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