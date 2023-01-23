/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Page */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Profile from "../../../directories/[type]/[id]";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../../../../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { query, locale, locales, defaultLocale } = context;
    let { id, type }: any = query;
    const { endpoint, queries } = config.api;
    id = id?.substring(id.indexOf("_") + 1, id.length);
    if(!type.match(/(opport)/)) {
        if(type) {
            type = String(type);
            type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
            type = (type.match(/(corporation)/)) ? "entreprise" : type;
            type = (type.match(/(partner)/)) ? "partenaire" : type;
        };
        const profilePromise = await fetch(endpoint + "?q=" + queries.getProfile + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
        const profileResponse = await profilePromise.json();
        const formattedProfileResponse = profileResponse[0];
        const productsPromise = await fetch(endpoint + "?q=" + queries.getProducts + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
        const productsResponse = await productsPromise.json();
        const formattedProductsResponse = Object.values(productsResponse[0].PRODUCTS);
        const activitiesPromise = await fetch(endpoint + "?q=" + queries.getActivity + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
        const activitiesResponse = await activitiesPromise.json();
        const formattedActivitiesResponse = Object.values(activitiesResponse[0].EVENTS);
        const foldersPromise = await fetch(endpoint + "?q=" + queries.getFolders + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
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
                profile: formattedProfileResponse || null,
                products: formattedProductsResponse || null,
                activities: formattedActivitiesResponse || null,
                folders: formattedFoldersResponse || null
            }
        };
    };
    const opportunityPromise = await fetch(endpoint + "?q=" + queries.getOpportunity + "&ID=" + id + "&lang=" + locale?.substring(0, 2) + "&authkey=Sorbonne");
    const opportunityResponse = await opportunityPromise.json();
    const formattedOpportunityResponse = opportunityResponse;
    if(!formattedOpportunityResponse) {
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
            opportunity: formattedOpportunityResponse || null,
        }
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Profile;
export { getServerSideProps };