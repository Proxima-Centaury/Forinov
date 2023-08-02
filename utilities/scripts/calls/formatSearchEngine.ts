/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { OpportunityType, UnknownOpportunityType } from "@typescript/types/OpportunityType";
import type { StartupType, UnknownStartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Search Engine */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatSearchEngine = (response: UnknownResponseType): ResponseType => {
    const deals = (response instanceof Error) ? [] : [ response[0] ];
    if(response.length <= 1) {
        return {
            request: {},
            response: {
                deals: [],
                pagination: response[0]?.INFORMATIONS || {}
            }
        };
    };
    return {
        request: {},
        response: {
            deals: deals.map((item: UnknownOpportunityType | UnknownStartupType): OpportunityType | StartupType => ({
                id: parseInt(item?.ID) || 0,
                banner: item?.BACKGROUND || "",
                category: {
                    id: parseInt(item?.TYPE[0].ID) || 0,
                    name: item?.TYPE[0].NAME || ""
                },
                countries: [],
                dates: {
                    end: item?.ENDINGDATE || "0000-00-00",
                    start: item?.STARTINGDATE || "0000-00-00"
                },
                description: item?.DESCRIPTION || "",
                language: item?.LANGUAGE || "",
                owner: {
                    logo: item?.OWNERLOGO || "",
                    name: item?.OWNERNAME || ""
                },
                privacy: item?.PRIVACY || "",
                tags: item?.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || [],
                remainingTime: item?.REMAINING?.split(",").map((value: string) => parseInt(value)) || [ 0, 0, 0 ],
                title: item?.TITLE || "",
                url: (() => {
                    const opportunityCategorySegment: string = `${ formatForUrl(item?.TYPE[0]?.NAME) }_${ item?.TYPE[0]?.ID }`;
                    const opportunityPageSegment: string = `${ formatForUrl(item?.TITLE) }_${ item?.ID }`;
                    return `/opportunities/directory/${ opportunityCategorySegment }/${ opportunityPageSegment }`;
                })()
            })),
            pagination: {
                count: response[1]?.INFORMATIONS?.COUNT || 0,
                limit: response[1]?.INFORMATIONS?.LIMIT || 0,
                message: response[1]?.INFORMATIONS?.RESULTSMESSAGE || "",
                pages: response[1]?.INFORMATIONS?.PAGES || 0
            }
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatSearchEngine };