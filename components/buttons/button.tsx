/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { MouseEventHandler, useEffect, useState } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Button */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Button = (buttonProps: ButtonInterface): JSX.Element => {
    const { button, href, action, icon, text, notifications, active, disabled, light } = buttonProps;
	const [ lightingState, setLightingState ] = useState("disabled");
    const actionTrigger: MouseEventHandler = (event) => {
        event.preventDefault();
        (action) ? action(event) : null;
    };
    const classList = button + ((active) ? " " + ButtonStyles.active : "") + ((disabled) ? " disabled" : "");
	useEffect(() => (light && !disabled) ? setLightingState("enabled") : setLightingState("disabled"), [ light, disabled ]);
    if(button === ButtonStyles.navigationButton) {
        return <button className={ classList } onClick={ actionTrigger } data-rgb={ lightingState }>
            <span></span>
            <span></span>
            <span></span>
        </button>;
    } else if(button === ButtonStyles.closeModal) {
        return <button className={ classList } onClick={ actionTrigger } data-rgb={ lightingState }>
            <i className="fa-light fa-xmark"/>
        </button>
    } else if(href) {
        return <Link className={ classList } href={ (href) ? href.toString() : "/" } data-rgb={ lightingState }>
            { (icon) ? <i className={ icon.toString() }/> : null }
            { (text) ? <span>{ text }</span> : null }
        </Link>;
    } else {
        return <button className={ classList } onClick={ actionTrigger } data-rgb={ lightingState }>
            { (icon) ? <i className={ icon.toString() }/> : null }
            { (text) ? <span>{ text }</span> : null }
            { (notifications && notifications > 0) ? <span className={ ButtonStyles.notifications }>{ notifications.toString() }</span> : null }
        </button>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Button;