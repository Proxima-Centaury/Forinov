/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment, useMemo } from "react";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
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
import type { TPage } from "@typescript/types/TPage";
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
const Deals = (params: TPage): JSX.Element => {
    const router = useRouter();
    const { asPath, query } = router;
    const { category, page } = query;
	const { t } = useTranslation("deals");
    const { filters, deals } = params;
    const { categories } = filters;
    const { opportunities } = categories;
    const dealsCategories = useMemo(() => {
        return opportunities.find((category: any) => category.id === 5)?.deals.categories || [];
    }, [ opportunities ]);
    const dealsSubcategories = useMemo(() => {
        if(category) {
            return dealsCategories.find((subcategory: any) => subcategory.id === extractId(category))?.subcategories || [];
        };
        return [];
    }, [ category, dealsCategories ]);
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
                        { dealsCategories?.map(({ id, name }: any, key: number) => {
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
                    { (dealsSubcategories.length > 0) ? <div className={ DealsStyles.actions } data-flex-justify="center">
                        { dealsSubcategories.map(({ id, name }: any, key: number) => {
                            const url = `/deals/${ category }/${ formatForUrl(name) }_${ id }`;
                            const isActive = (decodeURIComponent(asPath).match(url)) ? true : false;
                            return <Fragment key={ key }>
                                <LinkButton classList="tertiary" href={ url } text={ name } active={ isActive }/>
                            </Fragment>;
                        }) }
                    </div> : null }
                    <Pagination pages={ deals.pagination.pages } page={ page || 1 }>
                        <Grid columns="three" cards={ deals.items } type="deals"/>
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
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const i18next = require("@project/next-i18next.config");
    const { category, subcategory, page } = query;
    const searchEngineFilters = {
        categories: 5,
        subcategories1: (category) ? extractId(category) : null,
        subcategories2: (subcategory) ? extractId(subcategory) : null,
        page: page || 1
    };
	return {
		props: {
			...(await serverSideTranslations(locale || "fr", [ "deals", "navbar", "footer", "common" ], i18next)),
			locales,
            filters: await api.getPublicCommons("next", "Landing", locale),
            deals: await api.searchEngine("opportunite", searchEngineFilters, null, null, null, locale)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Deals;
export { getServerSideProps };