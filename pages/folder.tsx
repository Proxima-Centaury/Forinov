import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
import FolderStyles from "../public/stylesheets/pages/Folder.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";

import api from "../scripts/api";

import EntityCard from '../components/cards/entity';

export default function Folder(pageProps: any) {
    const { folder, states, stateSetters } = pageProps;
    const { translations } = states;
    console.log(folder);


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



const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    const folder = await api.getFolders("entreprise", "5", "next", "Landing", language);

    return {
        props: {
            locale, locales, defaultLocale, folder
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
