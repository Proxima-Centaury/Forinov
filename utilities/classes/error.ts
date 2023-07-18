/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import chalk from "chalk";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
// import { TError } from "@typescript/types/TError";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Error */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class Error {
    constructor() {};
    sendFeedback = (type?: string, sourceParameters?: any) => {
        switch(type) {
            case "api":
                return this.generateApiFeedback(sourceParameters);
            default:
                return false;
        };
    };
    generateApiFeedback = ({ query, expectedParameters, givenParameters }: any) => {
        const separator = `${ "-".repeat(130) }\n`;
        const callParameters = givenParameters.map((parameter: string) => typeof parameter).join(", ");
        const action = `[ ${ chalk.red("CALL") } ] => ${ chalk.red(query[0]) }(${ callParameters })\n`;
        const errorGeneralMessage = `${ chalk.red(">") } Error occured trying to fetch data using ${ query[0] }() call.\n\n`;
        const expectedParametersMessage = `${ chalk.red("Expected parameters :\n") }- ${ expectedParameters.join("\n- ") }\n\n`;
        const givenParametersMessage = `${ chalk.red("Received parameters :\n") }- ${ givenParameters.join("\n- ") }\n\n`;
        const errorEndMessage = `${ chalk.red(">") } Full url of the api call can be found right after this message.`
        console.error(`${ separator }${ action + errorGeneralMessage + expectedParametersMessage + givenParametersMessage + errorEndMessage }`);
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