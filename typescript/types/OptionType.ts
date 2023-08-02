/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { MouseEventHandler } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Option Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type OptionType = {
    id?: number,
    action?: MouseEventHandler,
    count?: number,
    name?: string,
    selected?: boolean,
    value?: string
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Unknown Option Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type UnknownOptionType = {
    [key: string]: any
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { OptionType, UnknownOptionType };