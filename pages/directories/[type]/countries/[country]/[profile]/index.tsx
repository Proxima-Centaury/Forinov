/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { GetServerSideProps } from "next";
import apiInstance from "../../../../../../scripts/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import DirectoryProfile from "../../../[profile]";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { type, profile }: any = query;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    profile = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = locale?.substring(0, 2);
    if(!type.match(/(opportunities)/)) {
        if(type) {
            type = String(type);
            type = (type.match(/(startups)/)) ? "startup" : type;
            type = (type.match(/(corporates)/)) ? "entreprise" : type;
            type = (type.match(/(partners)/)) ? "partenaire" : type;
        };
        const foundProfile = await apiInstance.getProfile(type, profile, "next", "Sorbonne", language);
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
                products: await apiInstance.getProducts(type, profile, "next", "Sorbonne", language),
                activities: await apiInstance.getActivity(type, profile, "next", "Sorbonne", language),
                folders: await apiInstance.getFolders(type, profile, "next", "Sorbonne", language)
            }
        };
    };
    const opportunity = await apiInstance.getOpportunity(profile, "next", "Sorbonne", language);
    if(!opportunity || (opportunity && opportunity.ERROR)) {
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
            opportunity: opportunity,
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default DirectoryProfile;
export { getServerSideProps };