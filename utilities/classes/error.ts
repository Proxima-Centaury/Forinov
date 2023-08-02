/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import logger from "@classes/logger";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Interfaces */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ErrorInterface } from "typescript/interfaces/ErrorInterface";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ErrorType } from "@typescript/types/ErrorType";
import type { LogType } from "@typescript/types/LogType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { isLogger } from "@scripts/typeChecks";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Error */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Error implements ErrorInterface {
    private _error: ErrorType = { code: 0, message: "Error found" };
    private _lastLog: LogType = {
        log: "",
        response: {
            cause: "UNKNOWN",
            status: {
                code: 0,
                message: "Error found"
            }
        },
        timestamp: 0,
        type: "error"
    };
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public reportError = (type?: string, sourceParameters?: any): Error => {
        switch(type) {
            case "API" :
                return this._generateAPIFeedback(sourceParameters);
            case "DisabledAPI" :
                return this._generateDisabledAPIFeedback(sourceParameters);
            case "Call ":
                return this._generateCallFeedback(sourceParameters);
            case "NoResponse" :
                return this._generateNoResponseFeedback(null);
            default :
                return this;
        };
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Feedbacks */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _generateAPIFeedback = (sourceParameters: any): Error => {
        const log = logger.initiateLog("logAPIError", sourceParameters);
        this.setError({ code: 400, message: "Error occured due to missing parameters in client side." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ClientError",
                status: { ...this.getError() },
            },
            timestamp: new Date().getTime(),
            type: "error"
        });
        return this;
    };
    private _generateDisabledAPIFeedback = (sourceParameters: any): Error => {
        const log = logger.initiateLog("logDisabledAPIError", sourceParameters);
        this.setError({ code: 400, message: "Error occured due to disabled API class, enable it by using api.setEnabled(true)." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ClientError",
                status: { ...this.getError() },
            },
            timestamp: new Date().getTime(),
            type: "error"
        });
        return this;
    };
    private _generateCallFeedback = (sourceParameters: any): Error => {
        const log = logger.initiateLog("logCallError", sourceParameters);
        this.setError({ code: 500, message: "Error occured due to JSON Syntax error on server side." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ServerSyntaxError",
                status: { ...this.getError() },
            },
            timestamp: new Date().getTime(),
            type: "error"
        });
        return this;
    };
    private _generateNoResponseFeedback = (sourceParameters: any): Error => {
        const log = logger.initiateLog("logNoResponseError", sourceParameters);
        this.setError({ code: 500, message: "Error occured due to lack of response from the server." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ServerNoResponseError",
                status: { ...this.getError() },
            },
            timestamp: new Date().getTime(),
            type: "error"
        });
        return this;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getError = (): ErrorType => {
        return this._error;
    };
    public getLastLog = (): LogType => {
        return this._lastLog;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setError = (error: ErrorType): boolean => {
        if(error) {
            this._error = error;
            return true;
        };
        return false;
    };
    public setLastLog = (lastLog: LogType): boolean => {
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
const error: ErrorInterface = new Error();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default error;
export { Error };