/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../typescript/interfaces";
import api from "../../../scripts/api";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../components/filters/filters";
import IdenfiticationBanner from "../../../components/banners/identification";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
import CategoryStyles from "../../../public/stylesheets/components/cards/Category.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Directory = (pageProps: DirectoryInterface) => {
    const { locale, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ display, setDisplay ] = useState("grid threeColumns");
    const filters = [
        { ID: 0, NAME: translations["Catégories"], ROUTE: "/categories" },
        { ID: 0, NAME: translations["Pays"], ROUTE: (locale === "en-US") ? "/countries" : "/pays" },
    ];
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay }/>
        <IdenfiticationBanner { ...pageProps }/>
        <div className={ display }>
            { filters.map((filter: any, key: number) => <Link key={ key } href={ router.asPath + filter.ROUTE } className={ CategoryStyles.category }>
                <i className="fa-light fa-circle-star"/>
                <h4 className={ CategoryStyles.name }>{ filter.NAME }</h4>
            </Link>) }
        </div>
        <div className={ DirectoryStyles.signup }>
            <i className="fa-light fa-eyes"/>
            <p>{ translations["Rejoignez Forinov et profitez de l'ensemble des fonctionnalités de Forinov"] }</p>
            <Link href="/onboarding" className={ ButtonStyles.callToActionNegative }>{ translations["Je m'inscris"] }</Link>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);
    // const companies = async () => {
    //     if(type.match(/(startup)/)) {
    //         return await api.getFilteredStartups("next", "Sorbonne", language);
    //     } else if(type.match(/(corporation|entreprise)/)) {
    //         return await api.getFilteredCorporations("next", "Sorbonne", language);
    //     } else if(type.match(/(partner|partenaire)/)) {
    //         return await api.getFilteredPartners("next", "Sorbonne", language);
    //     };
    // };
    return {
        props: {
            locale, locales, defaultLocale,
            filters: await api.getPublicCommons("next", "Landing", language)
        }
    };
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Directory;
export { getServerSideProps };