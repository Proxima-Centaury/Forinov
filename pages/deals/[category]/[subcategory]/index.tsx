/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import apiInstance from "../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Page */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Deals from "../index";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    const { category, subcategory } = query;
    const categoryId = category?.toString().substring(category.indexOf("_") + 1, category.length);
    const subcategoryId = subcategory?.toString().substring(subcategory.indexOf("_") + 1, subcategory.length);
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    return {
        props: {
            locale, locales, defaultLocale,
            filters: await apiInstance.getPublicCommons("next", "Landing", language),
            deals: await apiInstance.searchEngine("opportunities", { categories: 5, subcategories1: categoryId, subcategories2: subcategoryId }, null, null, null, language)
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Deals;
export { getServerSideProps };