/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Fragment, useEffect, useState } from "react";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Breadcrumb from "@contents/breadcrumb";
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
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import DealsStyles from "@pages/deals/Deals.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Deals */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Deals = (params: TPage): JSX.Element => {
    const router = useRouter();
    const { query } = router;
    const { category } = query;
	const { t } = useTranslation("deals");
    const { filters, deals, states } = params;
    const { categories } = filters;
    const { opportunities } = categories;
    const [ subcategories, setSubcategories ] = useState([]);
    // const categoryId = category?.toString().substring(category.indexOf("_") + 1, category.length);
    const dealsCategories = opportunities.find((category: any) => category.id === 5)?.deals.categories || [];
    // useEffect(() => {
    //     if(categories.length > 0 && categoryId) {
    //         setSubcategories(categories.find((category: any) => category.ID === categoryId).SUBCATEGORIES);
    //     };
    //     return () => {
    //         setSubcategories([]);
    //     };
    // }, [ category ]);
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
                            const url = "/deals/" + formatForUrl(name) + "_" + id;
                            const isActive = (router.asPath.match(url)) ? true : false;
                            return <Fragment key={ key }>
                                <LinkButton classList="link borderless" href={ url } text={ name } active={ isActive }/>
                            </Fragment>;
                        }) }
                    </div>
                    <div className={ DealsStyles.catch }>
                        <h1>{ t("dealsTitle") }</h1>
                        <p>{ t("dealsSubtitle") }</p>
                    </div>
				</div>
			</div>
            {/* { (category && subcategories.length > 0) ? <div className={ HomeStyles.actions } data-justify="center">
                { subcategories.map((subcategory: any, key: Key) => {
                    const url = "/deals/" + category + "/" + formatNameForUrl(subcategory.NAME) + "_" + subcategory.ID;
                    return <Button key={ key } button={ (checkMatch(router.asPath, url)) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ url } text={ subcategory.NAME } active={ checkMatch(router.asPath, url) }/>;
                }) }
            </div> : null }
            { (deals && deals.length > 0) ? <div className="grid threeColumns">
                { deals.map((opportunity: any, key: Key) => {
                    if(key < deals.length - 1) {
                        const getUrl = (): String => {
                            const dealCategory = opportunity.DEALCAT[0] || null;
                            const subCategory = opportunity.DEALSUBCAT[0] || null;
                            if(!dealCategory && !subCategory) {
                                return "/deals/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                            } else if(dealCategory && !subCategory) {
                                return "/deals/" + formatNameForUrl(dealCategory.NAME) + "_" + dealCategory.ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                            } else if(dealCategory && subCategory) {
                                return "/deals/" + formatNameForUrl(dealCategory.NAME) + "_" + dealCategory.ID + "/" + formatNameForUrl(subCategory.NAME) + "_" + subCategory.ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                            };
                            return "/deals/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                        };
                        return <Link key={ key } href={ getUrl().toString() }>
                            <OpportunityCard { ...pageProps } opportunity={ opportunity } index={ parseInt(key.toString()) + 1 }/>
                        </Link>;
                    };
                }) }
            </div> : null} */}
        </div>
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async ({ res, query, locale, locales }) => {
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const { category, subcategory } = query;
    const categoryId = category?.toString().substring(category.indexOf("_") + 1, category.length);
    const subcategoryId = subcategory?.toString().substring(subcategory.indexOf("_") + 1, subcategory.length);
    const searchEngineFilters = {
        categories: 5,
        subcategories1: (categoryId) ? parseInt(categoryId) : null,
        subcategories2: (subcategoryId) ? parseInt(subcategoryId) : null
    };
	return {
		props: {
			...(await serverSideTranslations(locale || "fr", [ "common", "navbar", "footer", "deals" ])),
			locales,
            filters: await api.getPublicCommons("next", "Landing", locale),
            deals: await api.searchEngine("opportunities", searchEngineFilters, null, null, null, locale)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Deals;
export { getServerSideProps };