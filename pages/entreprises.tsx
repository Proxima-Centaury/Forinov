/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import api from "../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Page */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import CorporatesHome from "./corporates";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);
	return {
		props: {
			locale, locales, defaultLocale,
			opportunities: await api.getLandingOpportunities("next", "Landing", language),
			logos: await api.getLandingLogos("next", "Landing", language)
		}
	};
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default CorporatesHome;
export { getServerSideProps };