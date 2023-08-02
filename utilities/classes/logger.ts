/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import chalk from "chalk";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Interfaces */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { LoggerInterface } from "typescript/interfaces/LoggerInterface";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Logger */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Logger implements LoggerInterface {
    private _color: string = "blueBright";
    private _separator: string = `${ "-".repeat(130) }\n`;
    private _chalkz: Function = chalk["blueBright" as keyof object];
    private _lastMessage: string = "";
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public initiateLog = (log: string, params: any): Logger => {
        const logger = this;
        if(typeof logger["_" + log as keyof object] === "function") {
            const method: Function = logger["_" + log as keyof object];
            const methodName: string = "_" + log;
            if(methodName.match(/(Error)/i)) {
                this.setColor("redBright");
            } else {
                this.setColor("blueBright");
            };
            this.setChalkz(chalk[this.getColor() as keyof object]);
            return (params) ? method(params) : method();
        };
        return this;
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
    private _getCommonFetchErrorCoreMessage = ({ query, expectedParameters, givenParameters, url }: any, hiddenParams?: boolean): string => {
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
    private _logResponseMetaData = ({}): Logger => {
        console.log(this.getLastMessage());
        return this;
    };
    private _logAPICall = ({ query, givenParameters, url }: any): Logger => {
        const commonCoreMessage = this._getCommonFetchErrorCoreMessage({ query, givenParameters, url });
        this.setLastMessage([ this.getSeparator(), commonCoreMessage ].join(""));
        console.log(this.getLastMessage());
        return this;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Error Logs */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _logAPIError = ({ query, expectedParameters, givenParameters, url }: any): Logger => {
        const commonCoreMessage = this._getCommonFetchErrorCoreMessage({ query, expectedParameters, givenParameters, url });
        const errorEndMessage = `${ this._chalkz(">") } Please add all needed parameters.`;
        this.setLastMessage([ this.getSeparator(), commonCoreMessage, errorEndMessage ].join(""));
        console.log(this.getLastMessage());
        return this;
    };
    private _logDisabledAPIError = ({ query, expectedParameters, givenParameters, url }: any): Logger => {
        const commonCoreMessage = this._getCommonFetchErrorCoreMessage({ query, expectedParameters, givenParameters, url }, true);
        const errorEndMessage = `${ this._chalkz(">") } Looks like the API class is disabled, enable it by using api.setEnabled(true).`;
        this.setLastMessage([ this.getSeparator(), commonCoreMessage, errorEndMessage ].join(""));
        console.log(this.getLastMessage());
        return this;
    };
    private _logCallError = ({ query, expectedParameters, givenParameters, url }: any): Logger => {
        const commonCoreMessage = this._getCommonFetchErrorCoreMessage({ query, expectedParameters, givenParameters, url });
        const errorEndMessage = `${ this._chalkz(">") } A JSON syntax issue was detected in server side by using these parameters.`;
        this.setLastMessage([ this.getSeparator(), commonCoreMessage, errorEndMessage ].join(""));
        console.log(this.getLastMessage());
        return this;
    };
    private _logNoResponseError = (): Logger => {
        const action = `[ ${ this._chalkz("SERVER") } ] => ${ this._chalkz("Connection to server failed") }\n`;
        const errorEndMessage = `${ this._chalkz(">") } The client was not able to reach the server.`;
        this.setLastMessage([ this.getSeparator(), action, errorEndMessage ].join(""));
        console.log(this.getLastMessage());
        return this;
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
    public getLastMessage = (): string => {
        return this._lastMessage;
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
    public setLastMessage = (message: string): boolean => {
        if(message) {
            this._lastMessage = message;
            return true;
        };
        return false;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Instance */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const logger: LoggerInterface = new Logger();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default logger;
export { Logger };