/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { GetServerSideProps } from "next";
import { Key } from "react";
import { FoldersInterface } from "../../../../../typescript/interfaces";
import { formatNameForUrl, formatType } from "../../../../../scripts/utilities";
import apiInstance from "../../../../../scripts/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
import FolderCard from "../../../../../components/cards/folder";
import Button from "../../../../../components/buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import FoldersStyles from "../../../../../public/stylesheets/pages/Folders.module.css";
import ButtonStyles from "../../../../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Folders */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Folders = (pageProps: FoldersInterface) => {
    const { folders, states, router }: any = pageProps;
    const { translations }: any = states;
    return <div id="folders" className="container">
        <div className={ FoldersStyles.title }>
            <h1>{ translations["Dossiers de startups"] }</h1>
            <p>{ folders.length + " " + translations["Dossiers"].toLowerCase() }</p>
        </div>
        <div className="grid twoColumns">
            { (folders) ? folders.map((folder: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(folder.NAME) + "_" + folder.ID }>
                <FolderCard { ...pageProps } folder={ folder }/>
            </Link>) : null }
        </div>
        <Button button={ ButtonStyles.classicLink } href={ router.asPath.substring(0, router.asPath.lastIndexOf("/")) } icon="fa-light fa-arrow-left" text={ translations["Retourner au profil"] }/>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { res, query, locale, locales, defaultLocale } = context;
    const { type, profile } = query;
    const typeReference = formatType(type, "fr");
    const profileReference = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const foundProfile = await apiInstance.getProfile(typeReference, profileReference, "next", "Sorbonne", language);
    if(!foundProfile || (foundProfile && Object.keys(foundProfile).length === 0)) {
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
            profile: foundProfile,
            folders: await apiInstance.getFolders(typeReference, profileReference, "next", "Sorbonne", language)
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Folders;
export { getServerSideProps };