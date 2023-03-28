/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DirectoryInterface } from "../../../../typescript/interfaces";
import { formatNameForUrl, formatType, checkMatch } from "../../../../scripts/utilities";
import api from "../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../../components/filters/filters";
import IdenfiticationBanner from "../../../../components/banners/identification";
import EntityCard from "../../../../components/cards/entity";
import OpportunityCard from "../../../../components/cards/opportunity";
import Button from "../../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryStyles from "../../../../public/stylesheets/pages/Directory.module.css";
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Directory = (pageProps: DirectoryInterface) => {
    const { result, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type } = router.query;
    const [ search, setSearch ] = useState(null);
    const [ display, setDisplay ] = useState("grid threeColumns");
    return <div id="directory" className="container">
        <Filters { ...pageProps } title={ type } display={ display } setDisplay={ setDisplay } setSearch={ setSearch }/>
        <IdenfiticationBanner { ...pageProps }/>
        { (!type.match(/(opport)/) && result.length > 0) ? <div className={ display }>
            { result.map((company: any, key: KeyType) => (!search || (search && checkMatch(company.NAME, search))) ? <Link key={ key } href={ router.asPath + formatNameForUrl(company.NAME) + "_" + company.ID }>
                <EntityCard { ...pageProps } entity={ company } type={ formatType(type) || undefined } details/>
            </Link> : null) }
        </div> : null}
        { (type.match(/(opport)/) && result.length > 0) ? <div className={ display }>
            { result.map((opportunity: any, key: KeyType) => (!search || (search && checkMatch(opportunity.TITLE, search))) ? <Link key={ key } href={ router.asPath + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID }>
                <OpportunityCard { ...pageProps } opportunity={ opportunity } index={ key + 1 }/>
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
    let { type }: any = query;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);
    const research = async () => {
        if(type.match(/(startup)/)) {
            return await api.getStartups("next", "Sorbonne", language);
        } else if(type.match(/(corporate|entreprise)/)) {
            return await api.getCorporates("next", "Sorbonne", language);
        } else if(type.match(/(partner|partenaire)/)) {
            return await api.getPartners("next", "Sorbonne", language);
        } else if(type.match(/(opport)/)) {
            return await api.getOpportunities("next", "Sorbonne", language);
        };
    };
    return {
        redirect: {
            destination: "/" + locale + "/404",
            permanent: true
        },
        props: {
            locale, locales, defaultLocale,
            result: await research()
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Directory;
export { getServerSideProps };