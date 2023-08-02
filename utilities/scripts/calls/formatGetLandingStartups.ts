/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { StartupType, UnknownStartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingStartups = (response: UnknownResponseType[]): ResponseType => {
    const startups: UnknownStartupType[] = response || [];
    return {
        request: {},
        response: {
            items: startups.map((startup: UnknownStartupType): StartupType => ({
                id: parseInt(startup?.ID) || 0,
                banner: startup?.BACKGROUND || "",
                category: {
                    id: parseInt(startup?.CATEGORY[0]?.ID) || 0,
                    name: startup?.CATEGORY[0]?.NAME || ""
                },
                description: startup?.COMMENT || "",
                location: {
                    city: startup?.TOWN || "",
                    country: startup?.COUNTRY || ""
                },
                logo: startup?.LOGO || "",
                name: startup?.NAME || "",
                tags: startup?.TAGS?.split(",").filter((tag: string) => tag.trim().length > 0) || [],
                url: ((startup): string => {
                    const startupCategorySegment: string = `${ formatForUrl(startup?.CATEGORY[0]?.NAME) }_${ startup?.CATEGORY[0]?.ID }`;
                    const startupPageSegment: string = `${ formatForUrl(startup?.NAME) }_${ startup?.ID }`;
                    return `/startups/directory/${ startupCategorySegment }/${ startupPageSegment }`;
                })(startup)
            }))
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingStartups };