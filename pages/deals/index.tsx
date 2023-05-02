/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import { DealsInterface } from "../../typescript/interfaces";
import { checkMatch, formatNameForUrl, uppercaseFirst } from "../../scripts/utilities";
import apiInstance from "../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Breadcrumb from "../../components/menus/breadcrumb";
import OpportunityCard from "../../components/cards/opportunity";
import Button from "../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import DealsStyles from "../../public/stylesheets/pages/Deals.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Deals */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Deals = (pageProps: DealsInterface) => {
    const router = useRouter();
    const { filters, deals, states } = pageProps;
    const { translations } = states;
    const { category } = router.query;
    const [ subcategories, setSubcategories ] = useState([]);
    const categoryId = category?.toString().substring(category.indexOf("_") + 1, category.length);
    const categories = filters?.OPPORTUNITIES.find((category: any) => category.ID === "5").CATEGORIES || [];
    useEffect(() => {
        if(categories.length > 0 && categoryId) {
            setSubcategories(categories.find((category: any) => category.ID === categoryId).SUBCATEGORIES);
        };
        return () => {
            setSubcategories([]);
        };
    }, [ category ]);
    return <div id="deals" className="container">
        <div className={ DealsStyles.categories }>
            { (categories.length > 0) ? categories.map((category: any, key: Key) => {
                const url = "/deals/" + formatNameForUrl(category.NAME) + "_" + category.ID;
                return <Button key={ key } button={ ButtonStyles.default } href={ url } text={ uppercaseFirst(category.NAME.toLowerCase()).toString() } active={ checkMatch(router.asPath, url) }/>;
            }) : null }
        </div>
        <Breadcrumb { ...pageProps }/>
        <div className={ DealsStyles.catch }>
            <h1>{ translations["Les offres exclusives Forinov"] }</h1>
            <p>{ translations["Forinov a négocié pour ses membres des deals exclusifs pour que vous ayez accès aux meilleures logiciels à des conditions et tarifs imbattables"] + " !" }</p>
        </div>
        { (category && subcategories.length > 0) ? <div className={ HomeStyles.actions } data-justify="center">
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
        </div> : null}
    </div>;
};
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