/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import error from "@classes/error";
import logger from "@classes/logger";
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
import { formatGetLandingLogos } from "@scripts/calls/formatGetLandingLogos";
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
        const queryProperties = Object.entries(configuration.api.calls);
        this.setEndpoint("production");
        queryProperties.map((query: any[]) => {
            Object.defineProperty(this, query[0], { value: async (...parameters: any[]) => {
                const expectedParameters = query[1].parameters;
                const givenParameters = parameters;
                const url = this.getEndpoint() + "?" + this._buildParameters({ query, expectedParameters, givenParameters });
                if(expectedParameters.length !== parameters.length) {
                    return error.sendFeedback("api", { query, expectedParameters, givenParameters, url });
                };
                const response = await this._call({ query, expectedParameters, givenParameters, url });
                return (response.code) ? response : this._formatResponse(query[0], response);
            }, writable: false });
        });
    };
    searchEngine = async (type: string, filters: any, network?: string, privateFilter?: string, ssid?: string, language?: string) => {
        const query: any[] = [ "getSearchEngine", configuration.api.calls.getSearchEngine ];
        const expectedParameters = Object.keys(filters).map((filter: string) => filter.toUpperCase()).concat(query[1].parameters);
        const givenParameters = Object.values(filters).concat([ type, network, privateFilter, ssid, "next", "Landing", language ]);
        const url: string = this.getEndpoint() + "?" + this._buildParameters({ query, expectedParameters, givenParameters });
        const response = await this._call({ query, expectedParameters, givenParameters, url });
        return (response.code) ? response : this._formatResponse("searchEngine", response);
    };
    private _buildParameters = ({ query, expectedParameters, givenParameters, url }: any): string => {
        const array: Array<string> = [];
        array.push("q=" + query[1].query);
        expectedParameters?.map((parameter: string, key: number) => array.push(parameter + "=" + givenParameters[key as keyof object]));
        return array.join("&");
    };
    private _call = async ({ query, expectedParameters, givenParameters, url }: any) => {
        try {
            logger.callLog({ query, givenParameters, url });
            const promise = await fetch(url);
            return await promise.json();
        } catch {
            return error.sendFeedback("call", { query, expectedParameters, givenParameters, url });
        };
    };
    private _formatResponse = (call?: string, response?: any) => {
        if(call === "getPublicCommons") {
            return formatGetPublicCommons(response[0]);
        } else if(call === "getLanding") {
            return formatGetLanding(response);
        } else if(call === "getLandingStartups") {
            return formatGetLandingStartups(response);
        } else if(call === "getLandingOpportunities") {
            return formatGetLandingOpportunities(response[0]);
        } else if(call === "getLandingLogos") {
            return formatGetLandingLogos(response[0]);
        } else if(call === "searchEngine") {
            return formatSearchEngine(response);
        };
    };
    getEndpoint = (): string => {
        return this._endpoint;
    };
    setEndpoint = (environment: "production" | "development"): boolean => {
        if(environment.match(/(production|development)/)) {
            this._endpoint = configuration.api.endpoint[environment as keyof object];
            return true;
        };
        return false;
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