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
    apiErrorLog = ({ query, expectedParameters, givenParameters, url }: any): void => {
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ chalk.red("CALL") } ] => ${ chalk.red(query[0]) }(${ callParameters })\n`;
        const urlLog = `${ chalk.red("> " + url) }\n`;
        const errorMessage = `${ chalk.red(">") } Error occured trying to fetch data using ${ query[0] }() call.\n\n`;
        const expectedParametersMessage = `${ chalk.red("Expected parameters :\n") }- ${ expectedParameters.join("\n- ") }\n\n`;
        const givenParametersMessage = `${ chalk.red("Received parameters :\n") }- ${ givenParameters.join("\n- ") }\n\n`;
        const errorEndMessage = `${ chalk.red(">") } Please add all needed parameters.`;
        const fullLog = [ this.getSeparator(), action, urlLog, errorMessage, expectedParametersMessage, givenParametersMessage, errorEndMessage ];
        console.error(`${ fullLog.join("") }`);
    };
    callLog = ({ query, expectedParameters, givenParameters, url }: any): void => {
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ chalk.blueBright("CALL") } ] => ${ chalk.blueBright(query[0]) }(${ callParameters })\n`;
        const urlLog = `${ chalk.blueBright(">") } ${ url }`;
        const fullLog = [ this.getSeparator(), action, urlLog ];
        console.log(`${ fullLog.join("") }`);
    };
    callErrorLog = ({ query, expectedParameters, givenParameters, url }: any): void => {
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ chalk.red("CALL") } ] => ${ chalk.red(query[0]) }(${ callParameters })\n`;
        const urlLog = `${ chalk.red("> " + url) }\n`;
        const errorMessage = `${ chalk.red(">") } Error occured trying to fetch data using ${ query[0] }() call.\n\n`;
        const expectedParametersMessage = `${ chalk.red("Expected parameters :\n") }- ${ expectedParameters.join("\n- ") }\n\n`;
        const givenParametersMessage = `${ chalk.red("Received parameters :\n") }- ${ givenParameters.join("\n- ") }\n\n`;
        const errorEndMessage = `${ chalk.red(">") } A JSON syntax issue was detected in server side by using these parameters.`;
        const fullLog = [ this.getSeparator(), action, urlLog, errorMessage, expectedParametersMessage, givenParametersMessage, errorEndMessage ];
        console.error(`${ fullLog.join("") }`);
    };
    getSeparator = (): string => {
        return this._separator;
    };
    setSeparator = (separator: string): boolean => {
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