/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLanding = (response: any): object => {
    return {
        articles: response?.BLOG?.map((article: any) => ({
            id: parseInt(article?.ID) || null,
            banner: article?.PICTURE || null,
            title: article?.NAME || null,
            url: article?.URL || null
        })) || [],
        categories: {
            startups: response?.CATEGORIES?.map((category: any) => ({
                id: parseInt(category?.ID) || null,
                name: category?.NAME || null,
                url: `/startups/directory/${ formatForUrl(category?.NAME) }_${ category?.ID }`
            })) || []
        },
        counters: {
            startups: {
                categories: parseInt(response?.COUNTERS?.STARTUPSCATEGORIES) || 0,
                total: parseInt(response?.COUNTERS?.STARTUPS) || 0
            }
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLanding };