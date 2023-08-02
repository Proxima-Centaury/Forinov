/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Button Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type ButtonType = {
    action?: MouseEventHandler,
    active?: boolean
    ariaLabel?: string,
    children?: JSX.Element,
    classList?: string,
    disabled?: boolean,
    href?: string,
    icon?: string,
    locale?: string,
    notifications?: number,
    tabIndex?: number,
    text?: string
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { ButtonType };