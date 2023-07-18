/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Search Engine */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatSearchEngine = (response: any): object => {
    if(response.length <= 1) {
        return {
            items: null,
            pagination: response[0]?.INFORMATIONS || null
        };
    };
    return {
        items: [ response[0] ].map((item: any) => ({
            id: parseInt(item.ID),
            banner: item.BACKGROUND,
            category: {
                id: parseInt(item.TYPE[0].ID),
                name: item.TYPE[0].NAME
            },
            countries: [],
            dates: {
                end: item.ENDINGDATE || null,
                start: item.STARTINGDATE || null
            },
            description: item.DESCRIPTION,
            language: item.LANGUAGE,
            owner: {
                logo: item.OWNERLOGO,
                name: item.OWNERNAME
            },
            privacy: item.PRIVACY,
            tags: item.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || null,
            remainingTime: item.REMAINING.split(",").map((value: string) => parseInt(value)),
            title: item.TITLE,
            url: `/directories/opportunities/${ formatForUrl(item.TYPE[0].NAME) }_${ item.TYPE[0].ID }/${ formatForUrl(item.TITLE) }_${ item.ID }`
        })),
        pagination: {
            count: response[1].INFORMATIONS.COUNT,
            limit: response[1].INFORMATIONS.LIMIT,
            message: response[1].INFORMATIONS.RESULTSMESSAGE,
            pages: response[1].INFORMATIONS.PAGES
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatSearchEngine };