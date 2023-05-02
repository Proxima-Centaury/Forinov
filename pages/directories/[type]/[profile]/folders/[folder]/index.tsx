/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect, useState, Key } from "react";
import { FoldersInterface } from "../../../../../../typescript/interfaces";
import { formatNameForUrl, formatType } from "../../../../../../scripts/utilities";
import apiInstance from "../../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import EntityCard from '../../../../../../components/cards/entity';
import Button from "../../../../../../components/buttons/button";
import Format from "../../../../../../components/texts/format";
import Carousel from "../../../../../../components/carousels/carousel";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FolderStyles from "../../../../../../public/stylesheets/pages/Folder.module.css";
import ButtonStyles from "../../../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folder */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Folder = (pageProps: FoldersInterface) => {
    const { profile, folders, states, router } = pageProps;
    const { translations } = states;
    let { folder } = router.query;
    folder = folder?.substring(folder.indexOf("_") + 1, folder.length);
    const [ selectedFolder, setSelectedFolder ]: any = useState(null);
    useEffect(() => {
        if(folders.length > 0 && folders.find((check: any) => check.ID === folder)) {
            setSelectedFolder(folders.find((check: any) => check.ID === folder));
        };
    }, [ folders, folder ]);
    return <div id="folder" className="container">
        <div className={ FolderStyles.title }>
            { (selectedFolder) ? <h1>{ selectedFolder.NAME }</h1> : null }
            { (selectedFolder) ? <p>{ selectedFolder.STARTUPS.length + " " + translations["Startups"].toLowerCase() }</p> : null }
        </div>
        <div className={ FolderStyles.description }>
            { (selectedFolder) ? <Format { ...pageProps } content={ selectedFolder.DESCRIPTION }/> : null }
        </div>
        <div className="grid twoColumns">
            { (selectedFolder && selectedFolder.STARTUPS) ? selectedFolder.STARTUPS.map((startup: any, key: Key) => {
                const url = "/directories/startups/categories/" + formatNameForUrl(startup.CATEGORY[0]?.NAME) + "_" + startup.CATEGORY[0]?.ID + "/" + formatNameForUrl(startup.NAME) + "_" + startup.ID;
                return <Link key={ key } href={ url }>
                    <EntityCard { ...pageProps } entity={ startup } type="startup" details/>
                </Link>;
            }) : null }
        </div>
        <Button button={ ButtonStyles.classicLink } href={ router.asPath.substring(0, router.asPath.lastIndexOf("/")) } icon="fa-light fa-arrow-left" text={ translations["Retourner aux dossiers du profil"] }/>
        <div className={ FolderStyles.moreFolders }>
            <p>{ translations["Les autres dossiers de startups public de"] + " " + profile.NAME }</p>
            <Carousel { ...pageProps } component="StartupsFolders" data={ folders }/>
        </div>
    </div>;
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Folder;
export { getServerSideProps };
