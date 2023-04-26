/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Key, useEffect, useState } from "react";
import { DealsInterface } from "../../typescript/interfaces";
import { checkMatch, formatNameForUrl, uppercaseFirst } from "../../scripts/utilities";
import apiInstance from "../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../../components/buttons/button";
import Breadcrumb from "../../components/menus/breadcrumb";
import OpportunityCard from "../../components/cards/opportunity";
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
    const { filters, states, router } = pageProps;
    const { translations } = states;
    const { category } = router.query;
    const [ subcategories, setSubcategories ] = useState([]);
    const categoryId = category?.substring(category.indexOf("_") + 1, category.length);
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
        <div className="grid twoColumns">

        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    return {
        // redirect: {
        //     destination: "/403",
        //     permanent: false
        // },
        props: {
            locale, locales, defaultLocale,
            filters: await apiInstance.getPublicCommons("next", "Landing", language),
            deals: await apiInstance.searchEngine()
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Deals;
export { getServerSideProps };