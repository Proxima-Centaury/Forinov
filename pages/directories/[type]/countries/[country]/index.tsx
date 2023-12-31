/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../../../typescript/interfaces";
import { formatNameForUrl, formatType, checkMatch } from "../../../../../scripts/utilities";
import apiInstance from "../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../../../components/filters/filters";
import IdenfiticationBanner from "../../../../../components/banners/identification";
import EntityCard from "../../../../../components/cards/entity";
import Button from "../../../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Country */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryCountry = (pageProps: DirectoryInterface) => {
    const { companies, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ search, setSearch ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay } setSearch={ setSearch }/>
        <IdenfiticationBanner { ...pageProps }/>
        { (companies.length > 0) ? <div className={ display }>
            { companies.map((company: any, key: KeyType) => (!search || (search && checkMatch(company.NAME, search))) ? <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(company.NAME) + "_" + company.ID }>
                <EntityCard { ...pageProps } entity={ company } type={ formatType(type, "en") || undefined } details/>
            </Link> : null) }
        </div> : null}
        <div className={ DirectoryStyles.signup }>
            <i className="fa-light fa-eyes"/>
            <p>{ translations["Rejoignez Forinov et profitez de l'ensemble des fonctionnalités de Forinov"] }</p>
            <Button button={ ButtonStyles.callToActionNegative } href="/onboarding" text={ translations["Je m'inscris"] }/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { type, country }: any = query;
    country = country?.substring(country.indexOf("_") + 1, country.length);
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const companies = async () => {
        if(type.match(/(startups)/)) {
            return await apiInstance.getFilteredStartupsByCountry(country, "next", "Sorbonne", language);
        } else if(type.match(/(corporates)/)) {
            return await apiInstance.getFilteredCorporatesByCountry(country, "next", "Sorbonne", language);
        } else if(type.match(/(partners)/)) {
            return await apiInstance.getFilteredPartnersByCountry(country, "next", "Sorbonne", language);
        };
    };
    return {
        props: {
            locale, locales, defaultLocale,
            companies: await companies()
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default DirectoryCountry;
export { getServerSideProps };