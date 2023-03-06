/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import chalk from "chalk";
import { APIInterface } from "../typescript/interfaces";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import apiConfigurations from "../configurations/api.json";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* API */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**
* This is a ```class```.
* @class API
* @returns
* - ```void``` ( nothing ).
* ---
* @note This class is used to fetch data from external API.
*/
class API {
    endpoint: String = apiConfigurations.api.endpoint;
    language: String = "";
    constructor() {
        const queryProps = Object.entries(apiConfigurations.api.calls);
        queryProps.map((query: Array<any>) => {
            Object.defineProperty(this, query[0] as PropertyKey, { value: async (...parameters: Array<any>) => {
                const expectedParameters = query[1].parameters;
                if(expectedParameters.length !== parameters.length) {
                    const errorGeneralMessage = "Error occured trying to fetch data using " + query[0] + "() method.\n\n";
                    const expectedParametersMessage = "Expected parameters :\n-" + expectedParameters.join("\n-") + "\n\n";
                    const errorEndMessage = "Please make sure you passed all parameters to the method.";
                    console.error(chalk.red(errorGeneralMessage + expectedParametersMessage + errorEndMessage));
                    return false;
                };
                const buildParameters = () => {
                    const array: Array<String> = [];
                    array.push("q=" + query[1].query);
                    expectedParameters.map((parameter: String, key: KeyType) => array.push(parameter + "=" + parameters[key as keyof Object]));
                    return array.join("&");
                };
                const url = this.endpoint + "?" + buildParameters();
                const promise = await fetch(url);
                const response = await promise.json();
                console.error("\n" + "[ " + chalk.blueBright("CALL") + " ]\n" + chalk.blueBright(">") + " " + url);
                switch(query[0]) {
                    case "getPublicCommons":
                        return response[0];
                    case "getLandingOpportunities":
                        return Object.values(response[0].PROJECT);
                    case "getLandingLogos":
                        return Object.values(response[0].LOGOS);
                    case "getProfile":
                        return response[0];
                    case "getProducts":
                        return Object.values(response[0].PRODUCTS);
                    case "getActivity":
                        return Object.values(response[0].EVENTS);
                    case "getFolders":
                        return response.folders;
                    default :
                        return response;
                };
            }, writable: false });
        });
    };
};
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Instance */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const api = new API() as APIInterface;
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default api;