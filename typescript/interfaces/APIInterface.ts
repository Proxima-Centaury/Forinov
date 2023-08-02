/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Error } from "@classes/error";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType } from "@typescript/types/ResponseType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* API Interface */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
interface APIInterface {
    [key: string]: any
    searchEngine: (...params: any[]) => Promise<ResponseType | Error>,
    getEnabled: (...params: any[]) => boolean,
    getEndpoint: (...params: any[]) => string,
    setEnabled: (...params: any[]) => any,
    setEndpoint: (...params: any[]) => any
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { APIInterface };