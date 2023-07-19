/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import logger from "@classes/logger";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
// import { TError } from "@typescript/types/TError";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Error */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Error {
    private _errors: any[] = [ { code: null, message: null } ];
    constructor() {};
    sendFeedback = (type?: string, sourceParameters?: any): any | boolean => {
        switch(type) {
            case "api":
                return this.generateApiFeedback(sourceParameters);
            case "call":
                return this.generateCallFeedback(sourceParameters);
            default:
                return false;
        };
    };
    generateApiFeedback = ({ query, expectedParameters, givenParameters, url }: any) => {
        logger.apiErrorLog({ query, expectedParameters, givenParameters, url });
        this.setErrors([ { code: 400, message: "Error occured due to missing parameters in client side" } ]);
        return { code: 400, errors: this.getErrors() };
    };
    generateCallFeedback = ({ query, expectedParameters, givenParameters, url }: any) => {
        logger.callErrorLog({ query, expectedParameters, givenParameters, url });
        this.setErrors([ { code: 500, message: "Error occured due to JSON Syntax error on server side" } ]);
        return { code: 500, errors: this.getErrors() };
    };
    getErrors = (): any[] => {
        return this._errors;
    };
    setErrors = (...errors: any[]): boolean => {
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