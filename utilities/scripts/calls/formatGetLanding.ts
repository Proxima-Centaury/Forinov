/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLanding = (response: any): object => {
    return {
        articles: response.BLOG.map((article: any) => ({
            id: parseInt(article.ID),
            banner: article.PICTURE,
            title: article.NAME,
            url: article.URL
        })),
        categories: {
            startups: response.CATEGORIES.map((category: any) => ({
                id: parseInt(category.ID),
                name: category.NAME,
                url: `/startups/directory/${ formatForUrl(category.NAME) }_${ category.ID }`
            }))
        },
        counters: {
            startups: {
                categories: parseInt(response.COUNTERS.STARTUPSCATEGORIES),
                total: parseInt(response.COUNTERS.STARTUPS)
            }
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLanding };