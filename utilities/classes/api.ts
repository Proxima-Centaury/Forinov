/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import chalk from "chalk";
import error from "@classes/error";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TAPI } from "@typescript/types/TAPI";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatGetPublicCommons } from "@scripts/calls/formatGetPublicCommons";
import { formatGetLanding } from "@scripts/calls/formatGetLanding";
import { formatGetLandingStartups } from "@scripts/calls/formatGetLandingStartups";
import { formatGetLandingOpportunities } from "@scripts/calls/formatGetLandingOpportunities";
import { formatSearchEngine } from "@scripts/calls/formatSearchEngine";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* JSON */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import configuration from "@configurations/api.json";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* API */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class API {
    private _endpoint: string = configuration.api.endpoint[(process.env.NODE_ENV === "development") ? "development" : "production"];
    constructor() {
        const queryProps = Object.entries(configuration.api.calls);
        this.setEndpoint(true);
        queryProps.map((query: any[]) => {
            Object.defineProperty(this, query[0], { value: async (...parameters: any[]) => {
                const expectedParameters = query[1].parameters;
                const givenParameters = parameters;
                const url = this.getEndpoint() + "?" + this.buildParameters(query, parameters, expectedParameters);
                if(expectedParameters.length !== parameters.length) {
                    this.callLogger(query, parameters, url, "red");
                    return error.sendFeedback("api", { query, expectedParameters, givenParameters });
                };
                this.callLogger(query, parameters, url);
                const promise = await fetch(url);
                const response = await promise.json();
                return this.formatResponse(query[0], response);
            }, writable: false });
        });
    };
    searchEngine = async (type?: string, filters?: any, network?: string, privateFilter?: string, ssid?: string, language?: string) => {
        if(!type || !filters) {
            return [];
        };
        const query: any[] = [ "getSearchEngine", configuration.api.calls.getSearchEngine ];
        const parameters = Object.values(filters).concat([ type, network, privateFilter, ssid, "next", "Landing", language ]);
        const expectedParameters = Object.keys(filters).map((filter: string) => filter.toUpperCase()).concat(query[1].parameters);
        const url: string = this.getEndpoint() + "?" + this.buildParameters(query, parameters, expectedParameters);
        this.callLogger(query, parameters, url);
        const promise = await fetch(url);
        const response = await promise.json();
        return this.formatResponse("searchEngine", response);
    };
    formatResponse = (call?: string, response?: any) => {
        if(call === "getPublicCommons") {
            return formatGetPublicCommons(response);
        } else if(call === "getLanding") {
            return formatGetLanding(response);
        } else if(call === "getLandingStartups") {
            return formatGetLandingStartups(response);
        } else if(call === "getLandingOpportunities") {
            return formatGetLandingOpportunities(response);
        } else if(call === "searchEngine") {
            return formatSearchEngine(response);
        };
    };
    buildParameters = (query?: any[], parameters?: any[], expectedParameters?: string[]) => {
        if(query && parameters && expectedParameters) {
            const array: Array<string> = [];
            array.push("q=" + query[1].query);
            expectedParameters?.map((parameter: string, key: number) => array.push(parameter + "=" + parameters[key as keyof object]));
            return array.join("&");
        } else {
            return false;
        };
    };
    callLogger = (query?: any[], parameters?: any[], url?: string, color?: string) => {
        if(query && parameters && url) {
            const logColor = ((color) ? color : "blueBright") as keyof Object;
            const separator = `${ "-".repeat(130) }\n`;
            const callParameters = parameters.map((parameter: string) => typeof parameter).join(", ");
            const action = `[ ${ chalk[logColor]("CALL") } ] => ${ chalk[logColor](query[0]) }(${ callParameters })\n`;
            const calledUrl = `${ chalk[logColor](">") } ${ url }`;
            return console.log(separator + action + calledUrl);
        } else {
            return false;
        };
    };
    getEndpoint = (): string => {
        return this._endpoint;
    };
    setEndpoint = (isProduction: boolean) => {
        const environment: string = (isProduction) ? "production" : "development";
        return this._endpoint = configuration.api.endpoint[environment as keyof object];
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Instance */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const api: TAPI = new API();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default api;