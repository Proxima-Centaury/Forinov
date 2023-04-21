/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState, Fragment, useEffect, Key, MouseEventHandler } from "react";
import { DirectoryInterface } from "../../../typescript/interfaces";
import { formatType, formatNameForUrl } from "../../../scripts/utilities";
import apiInstance from "../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import MetaDatas from "../../../components/seo/metadatas/metadatas";
import Filters from "../../../components/filters/filters";
import CategoryCard from "../../../components/cards/category";
import EntityCard from "../../../components/cards/entity";
import OpportunityCard from "../../../components/cards/opportunity";
import Pagination from "../../../components/pagination/pagination";
import Button from "../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../public/stylesheets/pages/Directory.module.css";
import FiltersStyles from "../../../public/stylesheets/components/filters/Filters.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Directory = (pageProps: DirectoryInterface) => {
    const { filters, states, router } = pageProps;
    const { locale, translations } = states;
    const { type, category, ui, domain, network, privateFilter, ssid } = router.query;
    const [ search, setSearch ] = useState({ keywords: "", categories: (category) ? category : "", page: 1 });
    const [ results, setResults ] = useState(null || []);
    const [ selects, setSelects ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    const [ informations, setInformations ]: any = useState(null);
    const categoryId = category?.substring(category.indexOf("_") + 1, category.length);
    const categoryName = category?.substring(0, category.indexOf("_"));
    const getTitle = (type: String): String => {
        if(type.match(/(startups)/)) {
            return translations["Startups"];
        } else if(type.match(/(corporates)/)) {
            return translations["Entreprises"];
        } else if(type.match(/(partners)/)) {
            return translations["Partenaires"];
        } else {
            return translations["Opportunités"];
        };
    };
    const gridButtonAction: MouseEventHandler = () => setDisplay("grid threeColumns");
    const listButtonAction: MouseEventHandler = () => setDisplay("list");
    useEffect(() => {
        const fetchResults = async () => {
            const results = await apiInstance.searchEngine(formatType(type), search, network, privateFilter, ssid, locale?.substring(0, 2));
            const formattedResults = results.slice(0, results.length - 1);
            const selects = results[results.length - 1];
            setResults(formattedResults);
            setSelects(selects);
        };
        if(search.keywords.length >= 2 || search.categories.length >= 1 || search["targetsectors" as keyof Object] || search["technologies" as keyof Object] || search["targetjobs" as keyof Object] || search["businessmodel" as keyof Object]) {
            fetchResults();
        } else {
            setResults([]);
            setSelects(null);
        };
    }, [ type, search, locale, network, privateFilter, ssid ]);
    useEffect(() => {
        setSearch({ keywords: "", categories: (categoryId) ? categoryId : "", page: 1 });
        setResults([]);
        setSelects(null);
    }, [ type, categoryId ]);
    return <Fragment>
        <MetaDatas { ...pageProps } type={ type } categoryId={ categoryId || undefined } categoryName={ categoryName || undefined }/>
        <div id="directory" className={ (ui && ui == "false") ? "containerFull" : "container" }>
            <Filters { ...pageProps } title={ getTitle(type) } display={ display } setDisplay={ setDisplay } search={ search } setSearch={ setSearch } setResults={ setResults } setInformations={ setInformations } dynamicFilters={ selects }/>
            <div className={ FiltersStyles.container }>
                <div className={ FiltersStyles.header }>
                    { (type.match(/(startups)/)) ? <i className="fa-light fa-rocket-launch"/> : null }
                    { (type.match(/(corporates)/)) ? <i className="fa-light fa-buildings"/> : null }
                    { (type.match(/(partners)/)) ? <i className="fa-light fa-handshake-simple"/> : null }
                    { (type.match(/(opportunities)/)) ? <i className="fa-light fa-circle-star"/> : null }
                    { (type.match(/(startups)/)) ? <h1>{ getTitle(type) + " ( " }<span>{ ((informations) ? informations.COUNT : filters.STARTUPS) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
                    { (type.match(/(corporates)/)) ? <h1>{ getTitle(type) + " ( " }<span>{ ((informations) ? informations.COUNT : filters.CORPORATES) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
                    { (type.match(/(partners)/)) ? <h1>{ getTitle(type) + " ( " }<span>{ ((informations) ? informations.COUNT : filters.PARTNERS) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
                    { (type.match(/(opportunities)/)) ? <h1>{ getTitle(type) + " ( " }<span>{ ((informations) ? informations.COUNT : filters.OPPORTUNITIES_COUNT) + " " + translations["Résultats"].toLowerCase() }</span>{ " )" }</h1> : null }
                    <div className={ FiltersStyles.displays }>
                        <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ gridButtonAction } icon="fa-light fa-grid-2" active={ display === "grid threeColumns" }/>
                        <Button button={ ButtonStyles.callToActionAlternativeSquaredIcon } action={ listButtonAction } icon="fa-light fa-list" active={ display !== "grid threeColumns" }/>
                        { (ui && ui == "false" && !type.match(/(startups)/)) ? <a className={ ButtonStyles.callToActionAlternativeSquaredIcon } href={ domain + "/account_startup_map.php" } target="_parent">
                            <i className="fa-light fa-map-location-dot"/>
                        </a> : null }
                    </div>
                </div>
                { (ui && ui == "false") ? null : <div className={ FiltersStyles.message }>
                    <p>{ translations["Pour accéder à l'ensemble des annuaires Forinov, inscrivez-vous"] + " :" }</p>
                    <div className={ FiltersStyles.actions }>
                        <Button button={ ButtonStyles.classicLink } href="/login" text={ translations["S'identifier"] }/>
                        <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Je m'inscris"] }/>
                    </div>
                </div> }
            </div>
            { (informations && informations.RESULTSMESSAGE) ? <div className={ DirectoryStyles.message }>
                <i className="fa-light fa-chevron-right"/>
                <p>{ informations.RESULTSMESSAGE }</p>
            </div> : null }
            { (results) ? <Results { ...pageProps } display={ display } results={ results }/> : null }
            { (!results || (Array.isArray(results) && results.length <= 0)) && router.asPath.match(/(\/countries)/) ? <Countries { ...pageProps } display={ display } search={ search }/> : null }
            { (!results || (Array.isArray(results) && results.length <= 0)) && !router.asPath.match(/(\/countries)/) ? <Categories { ...pageProps } display={ display } search={ search } setSearch={ setSearch }/> : null }
            { (informations && informations.PAGES > 0) ? <Pagination { ...pageProps } pages={ informations.PAGES } search={ search } action={ setSearch }/> : null }
            { (ui && ui == "false") ? null : <div className={ DirectoryStyles.signup }>
                <i className="fa-light fa-eyes"/>
                <p>{ translations["Rejoignez Forinov et profitez de l'ensemble des fonctionnalités de Forinov"] }</p>
                <Button button={ ButtonStyles.callToActionNegative } href="/onboarding" text={ translations["Je m'inscris"] }/>
            </div> }
        </div>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Categories */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Categories = (pageProps: any) => {
    const { filters, display, search, setSearch, router }: any = pageProps;
    const { ui, type } = router.query;
    const setCategory = (event: any, value: String) => {
        event.preventDefault();
        return setSearch({ ...search, categories: value.toString() });
    };
    if(ui && ui == "false") {
        return <Fragment>
            { (type.match(/(startups)/)) ? <div className={ display }>
                { filters.CATEGORIES.map((filter: any, key: Key) => <button key={ key } onClick={ (event: any) => setCategory(event, filter.ID) }>
                    <CategoryCard { ...pageProps } category={ filter } display={ display }/>
                </button>) }
            </div> : null}
            { (type.match(/(corporates)/)) ? <div className={ display }>
                { filters.CORPORATES_SECTORS.map((filter: any, key: Key) => <button key={ key } onClick={ (event: any) => setCategory(event, filter.ID) }>
                    <CategoryCard { ...pageProps } category={ filter } display={ display }/>
                </button>) }
            </div> : null}
            { (type.match(/(partners)/)) ? <div className={ display }>
                { filters.PARTNERS_TYPES.map((filter: any, key: Key) => <button key={ key } onClick={ (event: any) => setCategory(event, filter.ID) }>
                    <CategoryCard { ...pageProps } category={ filter } display={ display }/>
                </button>) }
            </div> : null}
            { (type.match(/(opportunities)/)) ? <div className={ display }>
                { filters.OPPORTUNITIES.map((filter: any, key: Key) => (filter.COUNT > 0) ? <button key={ key } onClick={ (event: any) => setCategory(event, filter.ID) }>
                    <CategoryCard { ...pageProps } category={ filter } display={ display }/>
                </button> : null) }
            </div> : null}
        </Fragment>;
    };
    return <Fragment>
        { (type.match(/(startups)/)) ? <div className={ display }>
            { filters.CATEGORIES.map((filter: any, key: Key) => <Link key={ key } href={ "/directories/" + type + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
        { (type.match(/(corporates)/)) ? <div className={ display }>
            { filters.CORPORATES_SECTORS.map((filter: any, key: Key) => <Link key={ key } href={ "/directories/" + type + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
        { (type.match(/(partners)/)) ? <div className={ display }>
            { filters.PARTNERS_TYPES.map((filter: any, key: Key) => <Link key={ key } href={ "/directories/" + type + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link>) }
        </div> : null}
        { (type.match(/(opportunities)/)) ? <div className={ display }>
            { filters.OPPORTUNITIES.map((filter: any, key: Key) => (filter.COUNT > 0) ? <Link key={ key } href={ "/directories/" + type + "/categories/" + formatNameForUrl(filter.NAME) + "_" + filter.ID }>
                <CategoryCard { ...pageProps } category={ filter } display={ display }/>
            </Link> : null) }
        </div> : null}
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Countries */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Countries = (pageProps: any) => {
    const { filters, display, router }: any = pageProps;
    const { ui } = router.query;
    return <Fragment>
        { (filters.COUNTRIES) ? <div className={ display }>
            { filters.COUNTRIES.map((filter: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(filter.NAME) + "_" + filter.ID + ((ui && ui == "false") ? "?ui=false" : "") }>
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
    const { ui, type } = router.query;
    if(ui && ui == "false") {
        return <Fragment>
            { (!type.match(/(opportunities)/) && results.length > 0) ? <div className={ display }>
                { results.map((company: any, key: Key) => <a key={ key } href={ company.URL } target="_blank" rel="noreferrer">
                    <EntityCard { ...pageProps } entity={ company } type={ formatType(type, "en") || undefined } details/>
                </a>) }
            </div> : null}
            { (type.match(/(opportunities)/) && results.length > 0) ? <div className={ display }>
                { results.map((opportunity: any, key: Key) => <a key={ key } href={ opportunity.URL } target="_blank" rel="noreferrer">
                    <OpportunityCard { ...pageProps } opportunity={ opportunity } index={ parseInt(key.toString()) + 1 }/>
                </a>) }
            </div> : null}
        </Fragment>;
    };
    return <Fragment>
        { (!type.match(/(opportunities)/) && results.length > 0) ? <div className={ display }>
            { results.map((company: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(company.NAME) + "_" + company.ID }>
                <EntityCard { ...pageProps } entity={ company } type={ formatType(type, "en") || undefined } details/>
            </Link>) }
        </div> : null}
        { (type.match(/(opportunities)/) && results.length > 0) ? <div className={ display }>
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
            filters: await apiInstance.getPublicCommons("next", "Landing", language)
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Directory;
export { getServerSideProps };