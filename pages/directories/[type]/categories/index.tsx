/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import api from "../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Page */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Directory from "../index";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    return {
        props: {
            locale, locales, defaultLocale,
            filters: await api.getPublicCommons("next", "Landing", language)
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Directory;
export { getServerSideProps };