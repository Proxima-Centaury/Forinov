/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../typescript/interfaces";
import { checkMatch } from "../../../scripts/utilities";
import api from "../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../components/filters/filters";
import IdenfiticationBanner from "../../../components/banners/identification";
import CategoryCard from "../../../components/cards/category";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Type */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryType = (pageProps: DirectoryInterface) => {
    const { states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ search, setSearch ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    const filters = [
        // { ID: 0, NAME: translations["Toutes"], URL: "/all" },
        { ID: 0, NAME: translations["Catégories"], URL: "/directories/" + type + "/categories" },
        { ID: 0, NAME: translations["Pays"], URL: "/directories/" + type + "/countries" },
    ];
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay } setSearch={ setSearch } filters={ filters }/>
        <IdenfiticationBanner { ...pageProps }/>
        <div className={ display }>
            { filters.map((filter: any, key: number) => (!search || (search && checkMatch(filter.NAME, search))) ? <Link key={ key } href={ filter.URL }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link> : null) }
        </div>
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
export default DirectoryType;
export { getServerSideProps };