/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Opportunities */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingOpportunities = (response: any): object => {
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
        tags: opportunity.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0),
        remainingTime: opportunity.REMAINING.split(",").map((value: string) => parseInt(value)),
        title: opportunity.TITLE,
        url: `/directories/opportunities/${ formatForUrl(opportunity.TYPE[0].NAME) }_${ opportunity.TYPE[0].ID }/${ formatForUrl(opportunity.TITLE) }_${ opportunity.ID }`
    }));
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingOpportunities };