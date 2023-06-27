/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import chalk from "chalk";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TAPI } from "@typescript/types/TAPI";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* JSON */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import configuration from "@configurations/api.json";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* API */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
class API {
    endpoint: string = configuration.api.endpoint[(process.env.NODE_ENV === "development") ? "development" : "production"];
    constructor() {
        const queryProps = Object.entries(configuration.api.calls);
        queryProps.map((query: Array<any>) => {
            Object.defineProperty(this, query[0] as PropertyKey, { value: async (...parameters: Array<any>) => {
                const expectedParameters = query[1].parameters;
                if(expectedParameters.length !== parameters.length) {
                    const separator = `${ "-".repeat(100) }\n`;
                    const errorGeneralMessage = `Error occured trying to fetch data using ${ query[0] }() method.\n\n`;
                    const expectedParametersMessage = `Expected parameters :\n- ${ expectedParameters.join("\n- ") }\n\n`;
                    const errorEndMessage = `Please make sure you passed all parameters to the method.`;
                    console.error(`${ separator }${ chalk.red(errorGeneralMessage + expectedParametersMessage + errorEndMessage) }`);
                    return false;
                };
                const buildParameters = () => {
                    const array: Array<string> = [];
                    array.push("q=" + query[1].query);
                    expectedParameters.map((parameter: string, key: number) => array.push(parameter + "=" + parameters[key as keyof object]));
                    return array.join("&");
                };
                const url = this.endpoint + "?" + buildParameters();
                const promise = await fetch(url);
                const response = await promise.json();
                const logTheCall = () => {
                    const separator = `${ "-".repeat(100) }\n`;
                    const callParameters = parameters.map((parameter) => typeof parameter).join(", ");
                    const action = `[ ${ chalk.blueBright("CALL") } ] => ${ chalk.blueBright(query[0]) }(${ callParameters })\n`;
                    const calledUrl = `${ chalk.blueBright(">") } ${ url }`;
                    return separator + action + calledUrl;
                };
                console.log(logTheCall());
                return this.updateFormat(query[0], response);
            }, writable: false });
        });
    };
    async searchEngine(type: string, filters: any, network: string, privateFilter: string, ssid: string, language: string) {
        if(!type || !filters) {
            return [];
        };
        if(type) {
            type = (type.match(/(startups)/)) ? "startup" : type;
            type = (type.match(/(corporates)/)) ? "entreprise" : type;
            type = (type.match(/(partners)/)) ? "partenaire" : type;
            type = (type.match(/(opportunities)/)) ? "opportunite" : type;
        };
        var results = null;
        var url: string = this.endpoint + "?q=SEARCH_FULL&TYPE=" + type;
        const buildUrl = Object.keys(filters).map((filter) => ((filter === "keywords" && filters[filter].length >= 2) || (filter !== "keywords" &&filters[filter])) ? "&" + filter.toUpperCase() + "=" + filters[filter] : null).join("");
        url += buildUrl + ((network) ? "&NETWORK=" + network : "") + ((privateFilter) ? "&PRIVATEFILTER=" + privateFilter : "") + ((ssid) ? "&ssid=" + ssid : "") + "&app=next&authkey=Sorbonne&lang=" + language;
        const call = (url) ? await fetch(url) : null;
        results = (call) ? call.json() : null;
        return results;
    };
    updateFormat = (call: string, response: any) => {
        if(call === "getLanding") {
            return {
                articles: response.BLOG.map((article: any) => ({
                    id: parseInt(article.ID),
                    name: article.NAME,
                    picture: article.PICTURE,
                    url: article.URL
                })),
                categories: {
                    startups: response.CATEGORIES.map((category: any) => ({
                        id: parseInt(category.ID),
                        name: category.NAME,
                        url: `/startups/directory/${ formatForUrl(category.NAME) }_${ category.ID }`
                    }))
                },
                counters: {
                    startups: {
                        categories: parseInt(response.COUNTERS.STARTUPSCATEGORIES),
                        total: parseInt(response.COUNTERS.STARTUPS)
                    }
                }
            };
        } else if(call === "getLandingStartups") {
            return response.map((startup: any) => ({
                id: parseInt(startup.ID),
                banner: startup.BACKGROUND,
                category: {
                    id: parseInt(startup.CATEGORY[0].ID),
                    name: startup.CATEGORY[0].NAME
                },
                description: startup.COMMENT,
                location: {
                    city: startup.TOWN,
                    country: startup.COUNTRY
                },
                logo: startup.LOGO,
                name: startup.NAME,
                tags: startup.TAGS?.split(","),
                url: `/directories/startups/${ formatForUrl(startup.CATEGORY[0].NAME) }_${ startup.CATEGORY[0].ID }/${ formatForUrl(startup.NAME) }_${ startup.ID }`
            }));
        } else if(call === "getLandingOpportunities") {
            return Object.values(response[0].PROJECT).map((opportunity: any) => ({
                id: parseInt(opportunity.ID),
                banner: opportunity.BACKGROUND,
                category: {
                    id: parseInt(opportunity.TYPE[0].ID),
                    name: opportunity.TYPE[0].NAME
                },
                countries: [],
                dates: {
                    end: opportunity.ENDINGDATE || null,
                    start: opportunity.STARTINGDATE || null
                },
                description: opportunity.DESCRIPTION,
                language: opportunity.LANGUAGE,
                owner: {
                    logo: opportunity.OWNERLOGO,
                    name: opportunity.OWNERNAME
                },
                privacy: opportunity.PRIVACY,
                tags: opportunity.TAGS?.split(","),
                remainingTime: opportunity.REMAINING.split(","),
                title: opportunity.TITLE,
                url: `/directories/opportunities/${ formatForUrl(opportunity.TYPE[0].NAME) }_${ opportunity.TYPE[0].ID }/${ formatForUrl(opportunity.TITLE) }_${ opportunity.ID }`
            }));
        };
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
export { API };