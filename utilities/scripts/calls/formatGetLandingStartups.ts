/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingStartups = (response: any): object => {
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
        tags: startup.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0),
        url: `/directories/startups/${ formatForUrl(startup.CATEGORY[0].NAME) }_${ startup.CATEGORY[0].ID }/${ formatForUrl(startup.NAME) }_${ startup.ID }`
    }));
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingStartups };