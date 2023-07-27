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
            id: parseInt(item?.ID) || null,
            banner: item?.BACKGROUND || null,
            category: {
                id: parseInt(item?.TYPE[0].ID) || null,
                name: item?.TYPE[0].NAME || null
            },
            countries: [],
            dates: {
                end: item?.ENDINGDATE || null,
                start: item?.STARTINGDATE || null
            },
            description: item?.DESCRIPTION || null,
            language: item?.LANGUAGE || null,
            owner: {
                logo: item?.OWNERLOGO || null,
                name: item?.OWNERNAME || null
            },
            privacy: item?.PRIVACY || null,
            tags: item?.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || [],
            remainingTime: item?.REMAINING?.split(",").map((value: string) => parseInt(value)) || [ 0, 0, 0 ],
            title: item?.TITLE || null,
            url: `/directories/opportunities/${ formatForUrl(item?.TYPE[0]?.NAME) }_${ item?.TYPE[0]?.ID }/${ formatForUrl(item?.TITLE) }_${ item?.ID }`
        })),
        pagination: {
            count: response[1]?.INFORMATIONS?.COUNT || 0,
            limit: response[1]?.INFORMATIONS?.LIMIT || 0,
            message: response[1]?.INFORMATIONS?.RESULTSMESSAGE || null,
            pages: response[1]?.INFORMATIONS?.PAGES || 0
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatSearchEngine };