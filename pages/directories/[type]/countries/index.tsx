/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../../typescript/interfaces";
import api from "../../../../scripts/api";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../../components/filters/filters";
import IdenfiticationBanner from "../../../../components/banners/identification";
import CategoryCard from "../../../../components/cards/category";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory By Countries */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryByCountries = (pageProps: DirectoryInterface) => {
    const { filters, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ display, setDisplay ] = useState("grid threeColumns");
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } setDisplay={ setDisplay }/>
        <IdenfiticationBanner { ...pageProps }/>
        { (filters.COUNTRIES) ? <div className={ display }>
            { filters.COUNTRIES.map((filter: any, key: KeyType) => <CategoryCard key={ key } { ...pageProps } category={ filter } display={ display }/>) }
        </div> : null}
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
export default DirectoryByCountries;
export { getServerSideProps };