/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { OpportunityType, UnknownOpportunityType } from "@typescript/types/OpportunityType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Opportunities */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingOpportunities = (response: UnknownResponseType): ResponseType => {
    const opportunities: UnknownOpportunityType[] = (response instanceof Error) ? [] : Object.values(response.PROJECT);
    return {
        request: {},
        response: {
            opportunities: opportunities.map((opportunity: UnknownOpportunityType): OpportunityType => ({
                id: parseInt(opportunity?.ID) || 0,
                banner: opportunity?.BACKGROUND || "",
                category: {
                    id: parseInt(opportunity?.TYPE[0]?.ID) || 0,
                    name: opportunity?.TYPE[0]?.NAME || ""
                },
                countries: [],
                dates: {
                    end: opportunity?.ENDINGDATE || "0000-00-00",
                    start: opportunity?.STARTINGDATE || "0000-00-00"
                },
                description: opportunity?.DESCRIPTION || "",
                language: opportunity?.LANGUAGE || "",
                owner: {
                    logo: opportunity?.OWNERLOGO || "",
                    name: opportunity?.OWNERNAME || ""
                },
                privacy: opportunity?.PRIVACY || "",
                tags: opportunity?.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || [],
                remainingTime: opportunity?.REMAINING.split(",").map((value: string) => parseInt(value)) || [ 0, 0, 0 ],
                title: opportunity?.TITLE || "",
                url: ((opportunity): string => {
                    const opportunityCategorySegment: string = `${ formatForUrl(opportunity?.TYPE[0]?.NAME) }_${ opportunity?.TYPE[0]?.ID }`;
                    const opportunityPageSegment: string = `${ formatForUrl(opportunity?.TITLE) }_${ opportunity?.ID }`;
                    return `/opportunities/directory/${ opportunityCategorySegment }/${ opportunityPageSegment }`;
                })(opportunity)
            }))
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingOpportunities };