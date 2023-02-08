/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { FoldersInterface } from "../../../../../typescript/interfaces";
import api from "../../../../../scripts/api";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Filters from "../../../../../components/filters/filters";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folders */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Folders = (pageProps: FoldersInterface) => {
    const { states, router }: any = pageProps;
    const { translations }: any = states;
    return <div id="folders" className="container">
        <Link href={ router.asPath.replace(/(\/folders|\/dossiers)/, "") } className={ ButtonStyles.classicLink }>
            <i className="fa-light fa-arrow-left"/>
            <p>{ translations["Retourner au profil"] + "." }</p>
        </Link>
        <Filters { ...pageProps }/>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { id, type }: any = query;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    id = id?.substring(id.indexOf("_") + 1, id.length);
    const language = "&lang=" + locale?.substring(0, 2);
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(corporation)/)) ? "entreprise" : type;
        type = (type.match(/(partner)/)) ? "partenaire" : type;
    };
    const profile = await api.getProfile(type, id, "next", "Sorbonne", language);
    if(!profile || (profile && Object.keys(profile).length === 0)) {
        return {
            redirect: {
                destination: "/" + locale + "/404",
                permanent: false
            }
        };
    };
    return {
        props: {
            locale, locales, defaultLocale,
            profile: profile,
            folders: await api.getFolders(type, id, "next", "Sorbonne", language)
        }
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Folders;
export { getServerSideProps };