import { GetServerSideProps } from "next";

import api from "../scripts/api";

import FolderCard from "../components/cards/folder";

export default function Folder(pageProps: any) {
    const { folders, states, stateSetters } = pageProps;
    const { translations } = states;
    console.log(folders);


    return (
        <section className={"container"}>
            {/* FOLDERS */}
            <div className="grid twoColumns">
                {folders.map((folder: any) => {
                    return (
                        <FolderCard
                            key={folder.id}
                            folder={folder}
                        />
                    )
                })}
            </div>
        </section>
    )
}



const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    const folders = await api.getFolders("entreprise", "5", "next", "Landing", language);

    return {
        props: {
            locale, locales, defaultLocale, folders
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
