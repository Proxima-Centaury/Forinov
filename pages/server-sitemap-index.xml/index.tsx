/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { getServerSideSitemapIndexLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import { formatNameForUrl } from "../../scripts/utilities";
import apiInstance from "../../scripts/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* SiteMap */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const SiteMap = () => {};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { req, locale } = context;
    const language = locale?.substring(0, 2);
    const getUrls = async () => {
        const host = req.headers.host;
        const filters = await apiInstance.getPublicCommons("next", "Landing", language);
        const startupsUrls = [
            host + "/directories/startups",
            host + "/directories/startups/categories"
        ];
        filters.CATEGORIES.map((category: any) => startupsUrls.push(host + "/directories/startups/categories/" + formatNameForUrl(category.NAME) + "_" + category.ID));
        const corporatesUrls = [
            host + "/directories/corporates",
            host + "/directories/corporates/categories"
        ];
        filters.CORPORATES_SECTORS.map((category: any) => corporatesUrls.push(host + "/directories/corporates/categories/" + formatNameForUrl(category.NAME) + "_" + category.ID));
        const partnersUrls = [
            host + "/directories/partners",
            host + "/directories/partners/categories"
        ];
        filters.PARTNERS_TYPES.map((category: any) => partnersUrls.push(host + "/directories/partners/categories/" + formatNameForUrl(category.NAME) + "_" + category.ID));
        const opportunitiesUrls = [
            host + "/directories/opportunities",
            host + "/directories/opportunities/categories"
        ];
        filters.OPPORTUNITIES.map((category: any) => opportunitiesUrls.push(host + "/directories/opportunities/categories/" + formatNameForUrl(category.NAME) + "_" + category.ID));
        return [ ...startupsUrls, ...corporatesUrls, ...partnersUrls, ...opportunitiesUrls ];
    };
    return getServerSideSitemapIndexLegacy(context, await getUrls());
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default SiteMap;
export { getServerSideProps };