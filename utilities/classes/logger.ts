/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import chalk from "chalk";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Logger */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Logger {
    private _separator: string = `${ "-".repeat(130) }\n`;
    constructor() {};
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Initiator */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public initiateLog = (log: string, params: any): any | boolean => {
        const logger = this;
        if(typeof logger["_" + log as keyof object] === "function" && params) {
            const method: Function = logger["_" + log as keyof object];
            return method(params);
        };
        return false;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Commons */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _getCommonErrorCoreMessage = ({ query, expectedParameters, givenParameters, url }: any, hiddenParams?: boolean): string => {
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ chalk.red("CALL") } ] => ${ chalk.red(query[0]) }(${ callParameters })\n`;
        const urlLog = `${ chalk.red("> " + url) }\n`;
        let fullLog: string[] = [];
        if(hiddenParams) {
            const errorMessage = `${ chalk.red(">") } Error occured trying to fetch data using ${ query[0] }() call.\n`;
            fullLog = [ action, urlLog, errorMessage ];
        } else {
            const errorMessage = `${ chalk.red(">") } Error occured trying to fetch data using ${ query[0] }() call.\n\n`;
            const expectedParametersMessage = `${ chalk.red("Expected parameters ( names ) :\n") }- ${ expectedParameters.join("\n- ") }\n\n`;
            const givenParametersMessage = `${ chalk.red("Received parameters ( values ) :\n") }- ${ givenParameters.join("\n- ") }\n\n`;
            fullLog = [ action, urlLog, errorMessage, expectedParametersMessage, givenParametersMessage ];
        };
        return fullLog.join("");
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Logs */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _logAPICall = ({ query, givenParameters, url }: any): void => {
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ chalk.blueBright("CALL") } ] => ${ chalk.blueBright(query[0]) }(${ callParameters })\n`;
        const urlLog = `${ chalk.blueBright(">") } ${ url }`;
        const fullLog = [ this.getSeparator(), action, urlLog ];
        console.log(`${ fullLog.join("") }`);
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Error Logs */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    private _logAPIError = ({ query, expectedParameters, givenParameters, url }: any): void => {
        const commonCoreMessage = this._getCommonErrorCoreMessage({ query, expectedParameters, givenParameters, url });
        const errorEndMessage = `${ chalk.red(">") } Please add all needed parameters.`;
        const fullLog = [ this.getSeparator(), commonCoreMessage, errorEndMessage ];
        console.error(`${ fullLog.join("") }`);
    };
    private _logDisabledAPIError = ({ query, expectedParameters, givenParameters, url }: any): void => {
        const commonCoreMessage = this._getCommonErrorCoreMessage({ query, expectedParameters, givenParameters, url }, true);
        const errorEndMessage = `${ chalk.red(">") } Looks like the API class is disabled, enable it by using api.setEnabled(true).`;
        const fullLog = [ this.getSeparator(), commonCoreMessage, errorEndMessage ];
        console.error(`${ fullLog.join("") }`);
    };
    private _logCallError = ({ query, expectedParameters, givenParameters, url }: any): void => {
        const commonCoreMessage = this._getCommonErrorCoreMessage({ query, expectedParameters, givenParameters, url });
        const errorEndMessage = `${ chalk.red(">") } A JSON syntax issue was detected in server side by using these parameters.`;
        const fullLog = [ this.getSeparator(), commonCoreMessage, errorEndMessage ];
        console.error(`${ fullLog.join("") }`);
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getSeparator = (): string => {
        return this._separator;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setSeparator = (separator: string): boolean => {
        if(separator) {
            this._separator = separator;
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