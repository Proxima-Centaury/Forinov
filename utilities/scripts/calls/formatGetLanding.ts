/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { ArticleType, UnknownArticleType } from "@typescript/types/ArticleType";
import type { CategoryType, UnknownCategoryType } from "@typescript/types/CategoryType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLanding = (response: UnknownResponseType): ResponseType => {
    const articles: UnknownArticleType[] = response?.BLOG || [];
    const categories: UnknownCategoryType[] = response?.CATEGORIES || [];
    return {
        articles: articles.map((article: UnknownArticleType): ArticleType => ({
            id: parseInt(article?.ID) || 0,
            banner: article?.PICTURE || "",
            title: article?.NAME || "",
            url: article?.URL || ""
        })) || [],
        categories: {
            startups: categories.map((category: UnknownCategoryType): CategoryType => ({
                id: parseInt(category?.ID) || 0,
                name: category?.NAME || "",
                url: ((category): string => {
                    const startupCategorySegment: string = `${ formatForUrl(category?.NAME) }_${ category?.ID }`;
                    return `/startups/directory/${ startupCategorySegment }`;
                })(category)
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