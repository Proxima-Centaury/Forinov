/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Opportunities */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingOpportunities = (response: any): object => {
    return Object.values(response.PROJECT).map((opportunity: any) => ({
        id: parseInt(opportunity?.ID) || null,
        banner: opportunity?.BACKGROUND || null,
        category: {
            id: parseInt(opportunity?.TYPE[0]?.ID) || null,
            name: opportunity?.TYPE[0]?.NAME || null
        },
        countries: [],
        dates: {
            end: opportunity?.ENDINGDATE || null,
            start: opportunity?.STARTINGDATE || null
        },
        description: opportunity?.DESCRIPTION || null,
        language: opportunity?.LANGUAGE || null,
        owner: {
            logo: opportunity?.OWNERLOGO || null,
            name: opportunity?.OWNERNAME || null
        },
        privacy: opportunity?.PRIVACY || null,
        tags: opportunity.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || [],
        remainingTime: opportunity?.REMAINING.split(",").map((value: string) => parseInt(value)) || [ 0, 0, 0 ],
        title: opportunity?.TITLE || null,
        url: `/directories/opportunities/${ formatForUrl(opportunity.TYPE[0].NAME) }_${ opportunity.TYPE[0].ID }/${ formatForUrl(opportunity.TITLE) }_${ opportunity.ID }`
    }));
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingOpportunities };