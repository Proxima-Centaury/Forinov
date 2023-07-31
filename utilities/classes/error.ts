/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import logger from "@classes/logger";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TLog } from "@typescript/types/TLog";
import type { TError } from "@typescript/types/TError";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Error */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Error {
    private _error: TError = { code: 0, message: "" };
    private _lastLog: TLog = { log: "", stack: { cause: "", error: { code: 0, message: "" } }, timestamp: 0 };
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public reportError = (type?: string, sourceParameters?: any): any | boolean => {
        switch(type) {
            case "API":
                return this._generateAPIFeedback(sourceParameters);
            case "DisabledAPI":
                return this._generateDisabledAPIFeedback(sourceParameters);
            case "Call":
                return this._generateCallFeedback(sourceParameters);
            default:
                return false;
        };
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Feedbacks */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _generateAPIFeedback = ({ query, expectedParameters, givenParameters, url }: any): TLog => {
        logger.initiateLog("logAPIError", { query, expectedParameters, givenParameters, url });
        this.setError({ code: 400, message: "Error occured due to missing parameters in client side." });
        this.setLastLog({ log: "", stack: { cause: "", error: this.getError() }, timestamp: new Date().getTime() });
        return this.geLasttLog();
    };
    private _generateDisabledAPIFeedback = ({ query, expectedParameters, givenParameters, url }: any): TLog => {
        logger.initiateLog("logDisabledAPIError", { query, expectedParameters, givenParameters, url });
        this.setError({ code: 400, message: "Error occured due to disabled API class, enable it by using api.setEnabled(true)." });
        this.setLastLog({ log: "", stack: { cause: "", error: this.getError() }, timestamp: new Date().getTime() });
        return this.geLasttLog();
    };
    private _generateCallFeedback = ({ query, expectedParameters, givenParameters, url }: any): TLog => {
        logger.initiateLog("logCallError", { query, expectedParameters, givenParameters, url });
        this.setError({ code: 500, message: "Error occured due to JSON Syntax error on server side." });
        this.setLastLog({ log: "", stack: { cause: "", error: this.getError() }, timestamp: new Date().getTime() });
        return this.geLasttLog();
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getError = (): TError => {
        return this._error;
    };
    public geLasttLog = (): TLog => {
        return this._lastLog;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setError = (error: TError): boolean => {
        if(error) {
            this._error = error;
            return true;
        };
        return false;
    };
    public setLastLog = (lastLog: TLog): boolean => {
        if(lastLog) {
            this._lastLog = lastLog;
            return true;
        };
        return false;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Instance */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const error = new Error();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default error;