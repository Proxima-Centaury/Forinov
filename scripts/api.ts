/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import chalk from "chalk";
import { APIInterface } from "../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import apiConfigurations from "../configurations/api.json";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* API */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
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
                console.log("[ " + chalk.blueBright("CALL") + " ]\n" + url);
                switch(query[0]) {
                    case "getPublicCommons":
                        return response[0];
                    case "getLandingOpportunities":
                        return Object.values(response[0].PROJECT);
                    case "getLandingLogos":
                        return Object.values(response[0].LOGOS);
                    case "getProfile":
                        return response[0];
                    case "getActivity":
                        return Object.values(response[0].EVENTS);
                    default :
                        return response;
                };
            }, writable: false });
        });
    };
    async searchEngine(type: String, filters: any, network: String, privateFilter: String, ssid: String, language: String) {
        if(type) {
            type = String(type);
            type = (type.match(/(startups)/)) ? "startup" : type;
            type = (type.match(/(corporates)/)) ? "entreprise" : type;
            type = (type.match(/(partners)/)) ? "partenaire" : type;
            type = (type.match(/(opportunities)/)) ? "opportunite" : type;
        };
        var results = null;
        var url: String = this.endpoint + "?q=SEARCH_FULL&TYPE=" + type;
        const buildUrl = Object.keys(filters).map((filter) => ((filter === "keywords" && filters[filter].length >= 2) || (filter !== "keywords" &&filters[filter])) ? "&" + filter.toUpperCase() + "=" + filters[filter] : null).join("");
        url += buildUrl + ((network) ? "&NETWORK=" + network : "") + ((privateFilter) ? "&PRIVATEFILTER=" + privateFilter : "") + ((ssid) ? "&ssid=" + ssid : "") + "&app=next&authkey=Sorbonne&lang=" + language;
        const call = (url) ? await fetch(url.toString()) : null;
        results = (call) ? call.json() : null;
        return results;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Instance */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const api = new API() as APIInterface;
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default api;