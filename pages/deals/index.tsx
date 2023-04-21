/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Key } from "react";
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
    const { filters, router } = pageProps;
    const { category } = router.query;
    const categories = filters?.OPPORTUNITIES.find((category: any) => category.ID === "5").CATEGORIES || [];
    return <div id="deals" className="container">
        <div className={ DealsStyles.categories }>
            { (categories.length > 0) ? categories.map((category: any, key: Key) => {
                const url = "/deals/" + formatNameForUrl(category.NAME) + "_" + category.ID;
                return <Button key={ key } button={ ButtonStyles.default } href={ url } text={ uppercaseFirst(category.NAME.toLowerCase()).toString() } active={ checkMatch(router.asPath, url) }/>;
            }) : null }
        </div>
        <Breadcrumb { ...pageProps }/>
        <div className={ DealsStyles.catch }>
            <h1>LES OFFRES EXCLUSIVES FORINOV</h1>
            <p>Forinov a négocié pour ses membres des deals exclusifs pour que vous ayez accès aux meilleures logiciels et locigiels à des conditions et tarifs imbattables !</p>
        </div>
        { (category) ? <div className={ HomeStyles.actions } data-justify="center">
            { (categories.length > 0) ? categories.map((category: any) => category.SUBCATEGORIES.map((subcategory: any, key: Key) => {
                const url = "/deals/" + formatNameForUrl(category.NAME) + "_" + category.ID + "/" + formatNameForUrl(subcategory.NAME) + "_" + subcategory.ID;
                return <Button key={ key } button={ (checkMatch(router.asPath, url)) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ url } text={ subcategory.NAME } active={ checkMatch(router.asPath, url) }/>;
            })) : null }
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