/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect, useState, Key } from "react";
import { FoldersInterface } from "../../../../../../typescript/interfaces";
import { formatNameForUrl } from "../../../../../../scripts/utilities";
import api from "../../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import EntityCard from '../../../../../../components/cards/entity';
import FolderCard from "../../../../../../components/cards/folder";
import Button from "../../../../../../components/buttons/button";
import Format from "../../../../../../components/texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FolderStyles from "../../../../../../public/stylesheets/pages/Folder.module.css";
import ButtonStyles from "../../../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folder */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Folder = (pageProps: FoldersInterface) => {
    const { folders, states, stateSetters, router } = pageProps;
    const { translations } = states;
    let { folder } = router.query;
    folder = folder?.substring(folder.indexOf("_") + 1, folder.length);
    const [ selectedFolder, setSelectedFolder ]: any = useState(null);
    useEffect(() => {
        if(folders.length > 0 && folders.find((check: any) => check.ID === folder)) {
            setSelectedFolder(folders.find((check: any) => check.ID === folder));
        };
    }), [ folders ];
    return <div id="folders" className="container">
        <Button button={ ButtonStyles.classicLink } href={ router.asPath.substring(0, router.asPath.lastIndexOf("/")) } icon="fa-light fa-arrow-left" text={ translations["Retourner aux dossiers du profil"] + " ." }/>
        <div className={ FolderStyles.title }>
            { (selectedFolder) ? <h1>{ selectedFolder.NAME }</h1> : null }
            { (selectedFolder) ? <p>{ selectedFolder.STARTUPS.length + " " + translations["Startups"].toLowerCase() }</p> : null }
        </div>
        <div className={ FolderStyles.description }>
            { (selectedFolder) ? <Format content={ selectedFolder.DESCRIPTION }/> : null }
        </div>
        <div className="grid twoColumns">
            { (selectedFolder && selectedFolder.STARTUPS) ? selectedFolder.STARTUPS.map((startup: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(folder.NAME) + "_" + folder.ID }>
                <EntityCard { ...pageProps } entity={ startup } type="startup" details/>
            </Link>) : null }
        </div>
    </div>;
    return (
        <section className={"container " + FolderStyles.wrapper}>
            <div className={FolderStyles.headers}>
                <h1 className={FolderStyles.title}>Radar Luxe 2022</h1>
                <p className={FolderStyles.subtitle}>4 startups</p>
            </div>
            <span className={FolderStyles.highlitedText}>Le Radar Luxe 2022 est un dossier de presse qui présente les 4 startups sélectionnées par le jury du concours Radar Luxe 2022. Il est disponible en téléchargement ci-dessous.</span>
            <button className={ButtonStyles.callToActionWide}>
                <i className="fa-solid fa-plus"></i>
                <span>{translations["Créer un dossier de startups"]}</span>
            </button>
            {/*  
                CARDS
            */}

            {
                folder.map((item: any, index: number) => {
                    console.log(item);

                    return (<>
                        <h1>{item.name}</h1>
                        <div className="grid twoColumns">{index === 0 && item.startups.map((startup: any) => {
                            return <EntityCard key={'startup-' + startup.id} entity={startup} type="startup" details={true} states={states} stateSetters={stateSetters} />
                        })}</div>
                    </>)
                })
            }
        </section>
    )
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { profile, type }: any = query;
    profile = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = "&lang=" + locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(corporation)/)) ? "entreprise" : type;
        type = (type.match(/(partner)/)) ? "partenaire" : type;
    };
    const foundProfile = await api.getProfile(type, profile, "next", "Sorbonne", language);
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
            folders: await api.getFolders(type, profile, "next", "Sorbonne", language)
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Folder;
export { getServerSideProps };
