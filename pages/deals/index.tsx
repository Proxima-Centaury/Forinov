/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Breadcrumb from "@contents/breadcrumb";
import Grid from "@contents/grid";
import Pagination from "@pagination";
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { PageType } from "@typescript/types/PageType";
import type { ResponseType } from "@typescript/types/ResponseType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
import { extractId } from "@scripts/extractId";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import DealsStyles from "@pages/deals/Deals.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Deals */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Deals = (params: PageType): JSX.Element => {
    const router = useRouter();
    const { asPath, query } = router;
    const { category, page } = query;
	const { t } = useTranslation("deals");
    const { categories, subcategories, deals, pagination } = params;
    return <Fragment>
        <Head>
			<title>{ t("dealsMetaTitle") }</title>
			<meta name="description" content={ t("dealsMetaDescription") }/>
		</Head>
        <div data-page="deals">
            <div className={ DealsStyles.mainContainer }>
				<div className="boxedContent">
                    <Breadcrumb/>
                    <div className={ DealsStyles.categories }>
                        { categories?.map(({ id, name }: any, key: number) => {
                            const url = `/deals/${ formatForUrl(name) }_${ id }`;
                            const isActive = (decodeURIComponent(asPath).match(url)) ? true : false;
                            return <Fragment key={ key }>
                                <LinkButton classList="octonary sharp" href={ url } text={ name } active={ isActive }/>
                            </Fragment>;
                        }) }
                    </div>
                    <div className={ DealsStyles.catch }>
                        <h1>{ t("dealsTitle", { company: "Forinov" }) }</h1>
                        <p>{ t("dealsSubtitle", { company: "Forinov" }) }</p>
                    </div>
                    { (subcategories.length > 0) ? <div className={ DealsStyles.actions } data-flex-justify="center">
                        { subcategories.map(({ id, name }: any, key: number) => {
                            const url = `/deals/${ category }/${ formatForUrl(name) }_${ id }`;
                            const isActive = (decodeURIComponent(asPath).match(url)) ? true : false;
                            return <Fragment key={ key }>
                                <LinkButton classList="tertiary" href={ url } text={ name } active={ isActive }/>
                            </Fragment>;
                        }) }
                    </div> : null }
                    <Pagination pages={ pagination?.pages } page={ page || 1 }>
                        <Grid columns="three" cards={ deals } type="deals"/>
                    </Pagination>
				</div>
			</div>
        </div>
    </Fragment>;
};
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