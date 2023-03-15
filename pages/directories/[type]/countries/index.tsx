/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../../typescript/interfaces";
import { formatNameForUrl, checkMatch } from "../../../../scripts/utilities";
import api from "../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../../components/filters/filters";
import IdenfiticationBanner from "../../../../components/banners/identification";
import CategoryCard from "../../../../components/cards/category";
import Button from "../../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Countries */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryCountries = (pageProps: DirectoryInterface) => {
    const { filters, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ search, setSearch ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay } setSearch={ setSearch }/>
        <IdenfiticationBanner { ...pageProps }/>
        { (filters.COUNTRIES) ? <div className={ display }>
            { filters.COUNTRIES.map((filter: any, key: KeyType) => (!search || (search && checkMatch(filter.NAME, search))) ? <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
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
    const { res, locale, locales, defaultLocale } = context;
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    return {
        props: {
            locale, locales, defaultLocale,
            filters: await api.getPublicCommons("next", "Landing", language)
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default DirectoryCountries;
export { getServerSideProps };