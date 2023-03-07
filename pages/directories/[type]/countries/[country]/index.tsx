/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../../../typescript/interfaces";
import { formatType, match } from "../../../../../scripts/utilities";
import api from "../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../../../components/filters/filters";
import IdenfiticationBanner from "../../../../../components/banners/identification";
import EntityCard from "../../../../../components/cards/entity";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory By Country */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryByCountry = (pageProps: DirectoryInterface) => {
    const { companies, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ search, setSearch ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay } setSearch={ setSearch }/>
        <IdenfiticationBanner { ...pageProps }/>
        { (companies.length > 0) ? <div className={ display }>
            { companies.map((company: any, key: KeyType) => (!search || (search && match(company.NAME, search))) ? <EntityCard key={ key } { ...pageProps } entity={ company } type={ formatType(type) || undefined } details/> : null) }
        </div> : null}
        <div className={ DirectoryStyles.signup }>
            <i className="fa-light fa-eyes"/>
            <p>{ translations["Rejoignez Forinov et profitez de l'ensemble des fonctionnalités de Forinov"] }</p>
            <Link href="/onboarding" className={ ButtonStyles.callToActionNegative }>{ translations["Je m'inscris"] }</Link>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { type, country }: any = query;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    country = country?.substring(country.indexOf("_") + 1, country.length);
    const language = locale?.substring(0, 2);
    const companies = async () => {
        if(type.match(/(startup)/)) {
            return await api.getFilteredStartupsByCountry(country, "next", "Sorbonne", language);
        } else if(type.match(/(corporation|entreprise)/)) {
            return await api.getFilteredCorporationsByCountry(country, "next", "Sorbonne", language);
        } else if(type.match(/(partner|partenaire)/)) {
            return await api.getFilteredPartnersByCountry(country, "next", "Sorbonne", language);
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
export default DirectoryByCountry;
export { getServerSideProps };