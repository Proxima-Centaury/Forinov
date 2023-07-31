/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import chalk from "chalk";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TLog } from "@typescript/types/TLog";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Logger */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Logger {
    private _color: string = "blueBright";
    private _separator: string = `${ "-".repeat(130) }\n`;
    private _chalkz: Function = chalk["blueBright" as keyof object];
    private _lastLog: TLog = { timestamp: 0, log: "" };
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public initiateLog = (log: string, params: any): any | boolean => {
        const logger = this;
        if(typeof logger["_" + log as keyof object] === "function" && params) {
            const method: Function = logger["_" + log as keyof object];
            const methodName: string = "_" + log;
            if(methodName.match(/(Error)/i)) {
                this.setColor("redBright");
            } else {
                this.setColor("blueBright");
            };
            this.setChalkz(chalk[this.getColor() as keyof object]);
            return method(params);
        };
        return false;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Commons */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _getCall = ({ query, givenParameters, url }: any): string => {
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ this._chalkz("CALL") } ] => ${ this._chalkz(query[0]) }(${ callParameters })\n`;
        const urlLog = `${ this._chalkz("> " + url) }` + ((this.getColor().match("red")) ? "\n" : "");
        return [ action, urlLog ].join("");
    };
    private _getCommonErrorCoreMessage = ({ query, expectedParameters, givenParameters, url }: any, hiddenParams?: boolean): string => {
        if(hiddenParams) {
            const errorMessage = `${ this._chalkz(">") } Error occured trying to fetch data using ${ query[0] }() call.\n`;
            return [ this._getCall({ query, givenParameters, url }), errorMessage ].join("");
        } else {
            const errorMessage = `${ this._chalkz(">") } Error occured trying to fetch data using ${ query[0] }() call.\n\n`;
            const expectedParametersMessage = `${ this._chalkz("Expected parameters ( names ) :\n") }- ${ expectedParameters.join("\n- ") }\n\n`;
            const givenParametersMessage = `${ this._chalkz("Received parameters ( values ) :\n") }- ${ givenParameters.join("\n- ") }\n\n`;
            return [ this._getCall({ query, givenParameters, url }), errorMessage, expectedParametersMessage, givenParametersMessage ].join("");
        };
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Logs */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _logAPICall = ({ query, givenParameters, url }: any): TLog => {
        const log: TLog = {
            timestamp: new Date().getTime(),
            log: [ this.getSeparator(), this._getCall({ query, givenParameters, url }) ].join("")
        };
        this.setLastLog(log);
        console.log(`${ this.geLasttLog().log }`);
        return this.geLasttLog();
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Error Logs */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _logAPIError = ({ query, expectedParameters, givenParameters, url }: any): TLog => {
        const commonCoreMessage = this._getCommonErrorCoreMessage({ query, expectedParameters, givenParameters, url });
        const errorEndMessage = `${ this._chalkz(">") } Please add all needed parameters.`;
        const log: TLog = {
            timestamp: new Date().getTime(),
            log: [ this.getSeparator(), commonCoreMessage, errorEndMessage ].join("")
        };
        this.setLastLog(log);
        console.error(`${ this.geLasttLog().log }`);
        return this.geLasttLog();
    };
    private _logDisabledAPIError = ({ query, expectedParameters, givenParameters, url }: any): TLog => {
        const commonCoreMessage = this._getCommonErrorCoreMessage({ query, expectedParameters, givenParameters, url }, true);
        const errorEndMessage = `${ this._chalkz(">") } Looks like the API class is disabled, enable it by using api.setEnabled(true).`;
        const log: TLog = {
            timestamp: new Date().getTime(),
            log: [ this.getSeparator(), commonCoreMessage, errorEndMessage ].join("")
        };
        this.setLastLog(log);
        console.error(`${ this.geLasttLog().log }`);
        return this.geLasttLog();
    };
    private _logCallError = ({ query, expectedParameters, givenParameters, url }: any): TLog => {
        const commonCoreMessage = this._getCommonErrorCoreMessage({ query, expectedParameters, givenParameters, url });
        const errorEndMessage = `${ this._chalkz(">") } A JSON syntax issue was detected in server side by using these parameters.`;
        const log: TLog = {
            timestamp: new Date().getTime(),
            log: [ this.getSeparator(), commonCoreMessage, errorEndMessage ].join("")
        };
        this.setLastLog(log);
        console.error(`${ this.geLasttLog().log }`);
        return this.geLasttLog();
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getColor = (): string => {
        return this._color;
    };
    public getSeparator = (): string => {
        return this._separator;
    };
    public getChalkz = (): Function => {
        return this._chalkz;
    };
    public geLasttLog = (): TLog => {
        return this._lastLog;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setColor = (color: string): boolean => {
        if(color) {
            this._color = color;
            return true;
        };
        return false;
    };
    public setSeparator = (separator: string): boolean => {
        if(separator) {
            this._separator = separator;
            return true;
        };
        return false;
    };
    public setChalkz = (chalkz: Function): boolean => {
        if(chalkz) {
            this._chalkz = chalkz;
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
const logger = new Logger();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default logger;