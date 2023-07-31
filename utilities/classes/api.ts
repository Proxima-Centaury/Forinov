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
    private _enabled: boolean = true;
    private _endpoint: string = configuration.api.endpoint[(process.env.NODE_ENV === "development") ? "development" : "production"];
    // The methods are built automatically based on api.json file's content
    constructor() {
        const queryProperties = Object.entries(configuration.api.calls);
        this.setEndpoint("production");
        queryProperties.map((query: any[]) => {
            Object.defineProperty(this, query[0], { value: async (...parameters: any[]) => {
                const expectedParameters = query[1].parameters;
                const givenParameters = parameters;
                const url = this.getEndpoint() + "?" + this._buildParameters({ query, expectedParameters, givenParameters });
                if(expectedParameters.length !== parameters.length) {
                    return error.reportError("API", { query, expectedParameters, givenParameters, url });
                };
                const response = await this._call({ query, expectedParameters, givenParameters, url });
                return (response.code) ? response : this._formatResponse(query[0], response);
            }, writable: false });
        });
    };
    // The search engine method was created manually because of its conditional and optional parameters
    // But it can still be automated using a JSON parser or by updating the api.json file to specify which parameters are optional
    public searchEngine = async (type: string, filters: any, network?: string, privateFilter?: string, ssid?: string, language?: string) => {
        const query: any[] = [ "getSearchEngine", configuration.api.calls.getSearchEngine ];
        const expectedParameters = Object.keys(filters).map((filter: string) => filter.toUpperCase()).concat(query[1].parameters);
        const givenParameters = Object.values(filters).concat([ type, network, privateFilter, ssid, "next", "Landing", language ]);
        const url: string = this.getEndpoint() + "?" + this._buildParameters({ query, expectedParameters, givenParameters });
        const response = await this._call({ query, expectedParameters, givenParameters, url });
        return (response.code) ? response : this._formatResponse("searchEngine", response);
    };
    private _buildParameters = ({ query, expectedParameters, givenParameters }: any): string => {
        const array: Array<string> = [];
        array.push("q=" + query[1].query);
        expectedParameters?.map((parameter: string, key: number) => array.push(parameter + "=" + givenParameters[key as keyof object]));
        return array.join("&");
    };
    private _call = async ({ query, expectedParameters, givenParameters, url }: any) => {
        if(!this.getEnabled()) {
            return error.reportError("DisabledAPI", { query, expectedParameters, givenParameters, url });
        } else {
            try {
                logger.initiateLog("logAPICall", { query, givenParameters, url });
                const promise = await fetch(url);
                return await promise.json();
            } catch(catchedError: unknown) {
                if(catchedError instanceof Error) {
                    const { cause } = catchedError;
                    const code = cause
                    console.log(cause);
                };
                return error.reportError("Call", { query, expectedParameters, givenParameters, url });
            };
        };
    };
    // This bunch of functions are here to manipulate the structure of each call response to our tastes
    // They can be found under utilities/scripts/calls
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
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Getters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public getEnabled= (): boolean => {
        return this._enabled;
    };
    public getEndpoint = (): string => {
        return this._endpoint;
    };
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    /* Setters */
    /* -------------------------------------------------------------------------------------------------------------------------------------------- */
    public setEnabled = (enabled: true | false): boolean => {
        if(typeof enabled === "boolean") {
            this._enabled = enabled;
            return true;
        };
        return false;
    };
    public setEndpoint = (environment: "production" | "development"): boolean => {
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