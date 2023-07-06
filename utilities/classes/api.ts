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
import { formatForUrl } from "@scripts/formatForUrl";
import { uppercaseFirst } from "@scripts/uppercaseFirst";
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
        // this.setEndpoint(true);
        queryProps.map((query: any[]) => {
            Object.defineProperty(this, query[0], { value: async (...parameters: any[]) => {
                console.time("Execution time");
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
        console.log(this);
    };
    getEndpoint = (): string => {
        return this._endpoint;
    };
    setEndpoint = (isProduction: boolean) => {
        const environment: string = (isProduction) ? "production" : "development";
        return this._endpoint = configuration.api.endpoint[environment as keyof object];
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
    searchEngine = async (type?: string, filters?: any, network?: string, privateFilter?: string, ssid?: string, language?: string) => {
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
        var url: string = this.getEndpoint() + "?q=SEARCH_FULL&TYPE=" + type;
        const buildUrl = Object.keys(filters).map((filter) => ((filter === "keywords" && filters[filter].length >= 2) || (filter !== "keywords" &&filters[filter])) ? "&" + filter.toUpperCase() + "=" + filters[filter] : null).join("");
        url += buildUrl + ((network) ? "&NETWORK=" + network : "") + ((privateFilter) ? "&PRIVATEFILTER=" + privateFilter : "") + ((ssid) ? "&ssid=" + ssid : "") + "&app=next&authkey=Sorbonne&lang=" + language;
        const call = (url) ? await fetch(url) : null;
        results = (call) ? call.json() : null;
        return results;
    };
    formatResponse = (call?: string, response?: any) => {
        let formattedResponse = null;
        if(call === "getPublicCommons") {
            formattedResponse = {
                categories: {
                    corporates: response[0].CORPORATES_SECTORS.map((sector: any) => ({
                        id: parseInt(sector.ID),
                        count: parseInt(sector.COUNT),
                        logo: sector.LOGO,
                        name: sector.NAME
                    })),
                    opportunities: response[0].OPPORTUNITIES.map((opportunity: any) => ({
                        id: parseInt(opportunity.ID),
                        count: parseInt(opportunity.COUNT),
                        name: uppercaseFirst(opportunity.NAME),
                        deals: {
                            categories: opportunity?.CATEGORIES?.map((category: any) => ({
                                id: parseInt(category.ID),
                                count: parseInt(category.COUNT),
                                name: uppercaseFirst(category.NAME)
                            })) || null
                        }
                    })),
                    partners: response[0].PARTNERS_TYPES.map((types: any) => ({
                        id: parseInt(types.ID),
                        count: parseInt(types.COUNT),
                        logo: types.LOGO,
                        name: uppercaseFirst(types.NAME)
                    })),
                    startups: response[0].CATEGORIES.map((category: any) => ({
                        id: parseInt(category.ID),
                        count: parseInt(category.COUNT),
                        logo: category.LOGO,
                        name: uppercaseFirst(category.NAME),
                        subcategories: category.SSCAT.map((subcategory: any) => ({
                            id: parseInt(subcategory.ID),
                            name: subcategory.NAME
                        }))
                    }))
                },
                others: {
                    businessmodels: response[0].BUSINESSMODELS.map((businessmodel: any) => ({
                        id: parseInt(businessmodel.ID),
                        count: parseInt(businessmodel.COUNT),
                        name: businessmodel.NAME
                    })),
                    targetjobs: response[0].JOBS.map((job: any) => ({
                        id: parseInt(job.ID),
                        count: parseInt(job.COUNT),
                        name: job.NAME
                    })),
                    targetsectors: response[0].SECTORS.map((sector: any) => ({
                        id: parseInt(sector.ID),
                        count: parseInt(sector.COUNT),
                        name: sector.NAME
                    })),
                    technologies: response[0].TECHNOLOGIES.map((technology: any) => ({
                        id: parseInt(technology.ID),
                        count: parseInt(technology.COUNT),
                        name: technology.NAME
                    })),
                    countries: response[0].COUNTRIES.map((country: any) => ({
                        id: parseInt(country.ID),
                        code: country.CODE,
                        count: parseInt(country.COUNT),
                        name: country.NAME,
                        regions: country.REGIONS
                    }))
                },
                counters: {
                    corporates: {
                        categories: parseInt(response[0].CORPORATES_SECTORS.length),
                        total: parseInt(response[0].CORPORATES)
                    },
                    opportunities: {
                        categories: parseInt(response[0].OPPORTUNITIES.length),
                        total: parseInt(response[0].OPPORTUNITIES_COUNT)
                    },
                    partners: {
                        categories: parseInt(response[0].PARTNERS_TYPES.length),
                        total: parseInt(response[0].PARTNERS)
                    },
                    startups: {
                        categories: parseInt(response[0].CATEGORIES.length),
                        total: parseInt(response[0].STARTUPS)
                    },
                }
            };
        } else if(call === "getLanding") {
            formattedResponse = {
                articles: response.BLOG.map((article: any) => ({
                    id: parseInt(article.ID),
                    banner: article.PICTURE,
                    title: article.NAME,
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
            formattedResponse = response.map((startup: any) => ({
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
                tags: startup.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0),
                url: `/directories/startups/${ formatForUrl(startup.CATEGORY[0].NAME) }_${ startup.CATEGORY[0].ID }/${ formatForUrl(startup.NAME) }_${ startup.ID }`
            }));
        } else if(call === "getLandingOpportunities") {
            formattedResponse = Object.values(response[0].PROJECT).map((opportunity: any) => ({
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
                tags: opportunity.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0),
                remainingTime: opportunity.REMAINING.split(",").map((value: string) => parseInt(value)),
                title: opportunity.TITLE,
                url: `/directories/opportunities/${ formatForUrl(opportunity.TYPE[0].NAME) }_${ opportunity.TYPE[0].ID }/${ formatForUrl(opportunity.TITLE) }_${ opportunity.ID }`
            }));
        };
        console.timeEnd("Execution time");
        return formattedResponse;
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