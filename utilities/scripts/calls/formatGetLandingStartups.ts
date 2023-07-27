/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingStartups = (response: any): object => {
    return response.map((startup: any) => ({
        id: parseInt(startup?.ID) || null,
        banner: startup?.BACKGROUND || null,
        category: {
            id: parseInt(startup?.CATEGORY[0]?.ID) || null,
            name: startup?.CATEGORY[0]?.NAME || null
        },
        description: startup?.COMMENT || null,
        location: {
            city: startup?.TOWN || null,
            country: startup?.COUNTRY || null
        },
        logo: startup?.LOGO || null,
        name: startup?.NAME || null,
        tags: startup?.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || [],
        url: `/directories/startups/${ formatForUrl(startup?.CATEGORY[0]?.NAME) }_${ startup?.CATEGORY[0]?.ID }/${ formatForUrl(startup?.NAME) }_${ startup?.ID }`
    }));
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingStartups };