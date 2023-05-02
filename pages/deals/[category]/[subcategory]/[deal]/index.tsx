/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { formatType } from "../../../../../scripts/utilities";
import apiInstance from "../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Page */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import DirectoryProfile from "../../../../directories/[type]/[profile]";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { res, query, locale, locales, defaultLocale } = context;
    const { type, profile, deal } = query;
    const typeReference = formatType(type, "fr");
    const profileReference = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const dealReference = deal?.substring(deal.indexOf("_") + 1, deal.length);
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    if(type && !type.match(/(opportunities)/)) {
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
                products: await apiInstance.getProducts(typeReference, profileReference, "next", "Sorbonne", language),
                activities: await apiInstance.getActivity(typeReference, profileReference, "next", "Sorbonne", language),
                folders: await apiInstance.getFolders(typeReference, profileReference, "next", "Sorbonne", language)
            }
        };
    };
    const opportunity = await apiInstance.getOpportunity(dealReference, "next", "Sorbonne", language);
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
            opportunity: opportunity
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default DirectoryProfile;
export { getServerSideProps };