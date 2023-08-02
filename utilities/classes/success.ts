/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import logger from "@classes/logger";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Interfaces */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { SuccessInterface } from "typescript/interfaces/SuccessInterface";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { SuccessType } from "@typescript/types/SuccessType";
import type { LogType } from "@typescript/types/LogType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { isLogger } from "@scripts/typeChecks";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Success */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Success implements SuccessInterface {
    private _success: SuccessType = { code: 0, message: "No error found" };
    private _lastLog: LogType = {
        log: "",
        response: {
            cause: "UNKNOWN",
            status: {
                code: 0,
                message: "No error found"
            }
        },
        timestamp: 0,
        type: "success"
    };
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public reportSuccess = (type?: string, sourceParameters?: any): Success => {
        switch(type) {
            case "API" :
                return this._generateAPIFeedback(sourceParameters);
            case "EnabledAPI" :
                return this._generateEnabledAPIFeedback(sourceParameters);
            case "Call":
                return this._generateCallFeedback(sourceParameters);
            case "Response" :
                return this._generateResponseFeedback(null);
            default :
                return this;
        };
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Feedbacks */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _generateAPIFeedback = (sourceParameters: any): Success => {
        const log = logger.initiateLog("logAPISuccess", sourceParameters);
        this.setSuccess({ code: 200, message: "Success, all parameters were passed to the call in client side." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ClientSuccess",
                status: { ...this.getSuccess() },
            },
            timestamp: new Date().getTime(),
            type: "success"
        });
        return this;
    };
    private _generateEnabledAPIFeedback = (sourceParameters: any): Success => {
        const log = logger.initiateLog("logEnabledAPISuccess", sourceParameters);
        this.setSuccess({ code: 200, message: "Success, API class is enabled." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ClientSuccess",
                status: { ...this.getSuccess() },
            },
            timestamp: new Date().getTime(),
            type: "success"
        });
        return this;
    };
    private _generateCallFeedback = (sourceParameters: any): Success => {
        const log = logger.initiateLog("logCallSuccess", sourceParameters);
        this.setSuccess({ code: 200, message: "Success, the server has sent a correct JSON response." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ServerSyntaxSuccess",
                status: { ...this.getSuccess() },
            },
            timestamp: new Date().getTime(),
            type: "success"
        });
        return this;
    };
    private _generateResponseFeedback = (sourceParameters: any): Success => {
        const log = logger.initiateLog("logResponseSuccess", sourceParameters);
        this.setSuccess({ code: 200, message: "Success, the client was able to reach the server." });
        this.setLastLog({
            log: (isLogger(log)) ? log.getLastMessage() : "",
            response: {
                cause: "ServerResponseSuccess",
                status: { ...this.getSuccess() },
            },
            timestamp: new Date().getTime(),
            type: "success"
        });
        return this;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getSuccess = (): SuccessType => {
        return this._success;
    };
    public getLastLog = (): LogType => {
        return this._lastLog;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setSuccess = (success: SuccessType): boolean => {
        if(success) {
            this._success = success;
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
const success: SuccessInterface = new Success();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default success;
export { Success };