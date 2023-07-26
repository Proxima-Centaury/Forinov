/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import logger from "@classes/logger";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Error */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Error {
    private _errors: any[] = [ { code: null, message: null } ];
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public sendFeedback = (type?: string, sourceParameters?: any): any | boolean => {
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
    private _generateAPIFeedback = ({ query, expectedParameters, givenParameters, url }: any) => {
        logger.initiateLog("logAPIError", { query, expectedParameters, givenParameters, url });
        this.setErrors([ { code: 400, message: "Error occured due to missing parameters in client side." } ]);
        return { code: 400, errors: this.getErrors() };
    };
    private _generateDisabledAPIFeedback = ({ query, expectedParameters, givenParameters, url }: any) => {
        logger.initiateLog("logCallError", { query, expectedParameters, givenParameters, url });
        this.setErrors([ { code: 400, message: "Error occured due to disabled API class, enable it by using api.setEnabled(true)." } ]);
        return { code: 400, errors: this.getErrors() };
    };
    private _generateCallFeedback = ({ query, expectedParameters, givenParameters, url }: any) => {
        logger.initiateLog("logDisabledAPIError", { query, expectedParameters, givenParameters, url });
        this.setErrors([ { code: 500, message: "Error occured due to JSON Syntax error on server side." } ]);
        return { code: 500, errors: this.getErrors() };
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getErrors = (): any[] => {
        return this._errors;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setErrors = (...errors: any[]): boolean => {
        if(errors.length > 0) {
            this._errors = errors;
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