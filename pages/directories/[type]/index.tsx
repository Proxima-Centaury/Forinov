/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState, Fragment, useEffect, Key } from "react";
import { DirectoryInterface } from "../../../typescript/interfaces";
import { formatType, formatNameForUrl } from "../../../scripts/utilities";
import api from "../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../components/filters/filters";
import IdenfiticationBanner from "../../../components/banners/identification";
import CategoryCard from "../../../components/cards/category";
import EntityCard from "../../../components/cards/entity";
import OpportunityCard from "../../../components/cards/opportunity";
import Pagination from "../../../components/pagination/pagination";
import Button from "../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Directory = (pageProps: DirectoryInterface) => {
    const { states, router }: any = pageProps;
    const { locale, translations }: any = states;
    const { type } = router.query;
    const [ search, setSearch ] = useState({ keywords: "", categories: "" });
    const [ results, setResults ] = useState(null);
    const [ selects, setSelects ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    const [ informations, setInformations ]: any = useState(null);
    useEffect(() => {
        const fetchResults = async () => {
            const results = await api.searchEngine(formatType(type), search, locale?.substring(0, 2));
            const formattedResults = results.slice(0, results.length - 1);
            const selects = results[results.length - 1];
            setResults(formattedResults);
            setSelects(selects);
        };
        if(search.keywords.length >= 2 || search.categories.length >= 2) {
            fetchResults();
        } else {
            setResults(null);
            setSelects(null);
        };
    }, [ search ]);
    useEffect(() => {
        setSearch({ keywords: "", categories: "" });
        setResults(null);
        setSelects(null);
    }, [ type ]);
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay } search={ search } setSearch={ setSearch } setResults={ setResults } setInformations={ setInformations } dynamicFilters={ selects }/>
        <IdenfiticationBanner { ...pageProps }/>
        { (informations && informations.RESULTSMESSAGE) ? <div className={ DirectoryStyles.message }>
            <i className="fa-light fa-chevron-right"/>
            <p>{ informations.RESULTSMESSAGE }</p>
        </div> : null }
        { (results) ? <Results { ...pageProps } display={ display } results={ results }/> : null }
        { (!results) ? ((router.asPath.match(/(\/countries)/)) ? <Countries { ...pageProps } display={ display } search={ search }/> : <Categories { ...pageProps } display={ display } search={ search }/>) : null }
        { (informations && informations.PAGES > 0) ? <Pagination { ...pageProps } pages={ informations.PAGES }/> : null }
        <div className={ DirectoryStyles.signup }>
            <i className="fa-light fa-eyes"/>
            <p>{ translations["Rejoignez Forinov et profitez de l'ensemble des fonctionnalités de Forinov"] }</p>
            <Button button={ ButtonStyles.callToActionNegative } href="/onboarding" text={ translations["Je m'inscris"] }/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Categories */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Categories = (pageProps: any) => {
    const { filters, display, router }: any = pageProps;
    const { type } = router.query;
    return <Fragment>
        { (type.match(/(startup)/)) ? <div className={ display }>
            { filters.CATEGORIES.map((filter: any, key: Key) => <Link key={ key } href={ router.asPath + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
        { (type.match(/(corporation|entreprise)/)) ? <div className={ display }>
            { filters.SECTORS.map((filter: any, key: Key) => <Link key={ key } href={ router.asPath + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
        { (type.match(/(partner|partenaire)/)) ? <div className={ display }>
            { filters.PARTNERS_TYPES.map((filter: any, key: Key) => <Link key={ key } href={ router.asPath + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
        { (type.match(/(opport)/)) ? <div className={ display }>
            { filters.OPPORTUNITIES.map((filter: any, key: Key) => <Link key={ key } href={ router.asPath + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Countries */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Countries = (pageProps: any) => {
    const { filters, display, router }: any = pageProps;
    return <Fragment>
        { (filters.COUNTRIES) ? <div className={ display }>
            { filters.COUNTRIES.map((filter: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Results */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Results = (pageProps: any) => {
    const { display, results, router }: any = pageProps;
    const { type } = router.query;
    return <Fragment>
        { (!type.match(/(opport)/) && results.length > 0) ? <div className={ display }>
            { results.map((company: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(company.NAME) + "_" + company.ID }>
                <EntityCard { ...pageProps } entity={ company } type={ formatType(type) || undefined } details/>
            </Link>) }
        </div> : null}
        { (type.match(/(opport)/) && results.length > 0) ? <div className={ display }>
            { results.map((opportunity: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID }>
                <OpportunityCard { ...pageProps } opportunity={ opportunity } index={ parseInt(key.toString()) + 1 }/>
            </Link>) }
        </div> : null}
    </Fragment>;
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
export default Directory;
export { getServerSideProps };