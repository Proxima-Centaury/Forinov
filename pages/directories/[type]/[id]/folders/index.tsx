/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../../../../../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../../../../../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folders */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Folders = ({ profile, folders, states, stateSetters }: any) => {
    return <div id="folders" className="container">

    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query, locale, locales, defaultLocale } = context;
    let { id, type } = query;
    const { endpoint, queries } = config.api;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = "&lang=" + locale?.substring(0, 2);
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(corporation)/)) ? "entreprise" : type;
        type = (type.match(/(partner)/)) ? "partenaire" : type;
    };
    const profilePromise = await fetch(endpoint + "?q=" + queries.getProfile + "&TYPE=" + type + "&PID=" + id + "&app=next&authkey=Sorbonne" + language);
    const profileResponse = await profilePromise.json();
    const formattedProfileResponse = profileResponse[0];
    const foldersPromise = await fetch(endpoint + "?q=" + queries.getFolders + "&TYPE=" + type + "&PID=" + id + "&app=next&authkey=Sorbonne" + language);
    const foldersResponse = await foldersPromise.json();
    const formattedFoldersResponse = foldersResponse.folders;
    if(!formattedProfileResponse || (formattedProfileResponse && Object.keys(formattedProfileResponse).length === 0)) {
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
            production: (req.headers.host?.match("interface.forinov")) ? true : false,
            profile: formattedProfileResponse || null,
            folders: formattedFoldersResponse || null
        }
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Folders;
export { getServerSideProps };