/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { ResponseType } from "@typescript/types/ResponseType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { extractId } from "@scripts/extractId";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Deals from "@pages/deals";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async ({ res, query, locale, locales }) => {
    const { category, subcategory, page } = query;
    const filters = {
        categories: 5,
        subcategories1: (category) ? extractId(category) : null,
        subcategories2: (subcategory) ? extractId(subcategory) : null,
        page: page || 1
    };
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const i18next = require("@project/next-i18next.config");
    const getPublicCommons = await api.getPublicCommons("next", "Landing", locale);
    const searchEngine = await api.searchEngine({
        type: "opportunite",
        filters,
        network: null,
        privateFilter: null,
        ssid: null,
        language: locale
    });
    const categories = getPublicCommons.response.filters.opportunities.find((opportunity: any) => opportunity.id === 5).deals.categories || [];
    const subcategories = (category) ? categories.find((subcategory: any) => subcategory.id === extractId(category)).subcategories : [];
    if(getPublicCommons instanceof Error || searchEngine instanceof Error) {
		return {
			redirect: {
				destination: "/500",
				permanent: false
			}
		};
	} else {
        return {
            props: {
                ...(await serverSideTranslations(locale || "fr", [ "deals", "navbar", "footer", "common" ], i18next)),
                locales,
                categories: categories,
                subcategories: subcategories,
                deals: (searchEngine as ResponseType).response.deals,
                pagination: (searchEngine as ResponseType).response.pagination
            }
        };
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Deals;
export { getServerSideProps };