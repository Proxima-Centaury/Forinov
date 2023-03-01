/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { ProfileInterface, ButtonInterface } from "../../../../typescript/interfaces";
import { buildProperties } from "../../../../scripts/utilities";
import api from "../../../../scripts/api";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import IdenfiticationBanner from "../../../../components/banners/identification";
import RecoverBanner from "../../../../components/banners/recover";
import ProfileCard from "../../../../components/cards/profile";
import ProfileMenu from "../../../../components/menus/profile";
import ProfileOverview from "../../../../components/contents/profile/overview";
import ProfileOffer from "../../../../components/contents/profile/offer";
import ProfileTargets from "../../../../components/contents/profile/targets";
import ProfileProducts from "../../../../components/contents/profile/products";
import ProfileEcosystem from "../../../../components/contents/profile/ecosystem";
import ProfilePartners from "../../../../components/contents/profile/partners";
import ProfileTeam from "../../../../components/contents/profile/team";
import ProfileOpportunities from "../../../../components/contents/profile/opportunities";
import ProfileActivities from "../../../../components/contents/profile/activities";
import ProfileSocials from "../../../../components/contents/profile/socials";
import ProfileGoals from "../../../../components/contents/profile/goals";
import OpportunityPreview from "../../../../components/contents/opportunity/preview";
import OpportunityLinks from "../../../../components/contents/opportunity/links";
import Button from "../../../../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../../../public/stylesheets/pages/Profile.module.css";
import NavbarStyles from "../../../../public/stylesheets/layout/Navbar.module.css";
import MenuStyles from "../../../../public/stylesheets/components/menus/Profile.module.css";
import BannerStyles from "../../../../public/stylesheets/components/banners/Banner.module.css";
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Profile */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryProfile = (pageProps: ProfileInterface) => {
    const { profile, opportunity, states, stateSetters, router }: any = pageProps;
    const { session, lock, metadatas }: any = states;
    const { setModal }: any = stateSetters;
    const { type } = router.query;
    useEffect(() => {
        if(profile && !opportunity) {
            let showRegisterPopup = (event: MouseEvent) => {
                event.preventDefault();
                if(lock) {
                    const target = event.target as Element;
                    const selectors = [
                        "." + MenuStyles.menu,
                        "." + ButtonStyles.closeModal,
                        "." + BannerStyles.identificationBanner,
                        "." + BannerStyles.recoverBanner,
                        "." + NavbarStyles.navbar,
                        "[data-type='devtools']"
                    ];
                    if(!target.closest(selectors.join(", "))) {
                        if(lock) {
                            return setModal("register");
                        };
                    };
                    return setModal(null);
                };
            };
            (lock) ? window.addEventListener("click", showRegisterPopup) : null;
            return () => window.removeEventListener("click", showRegisterPopup);
        };
    });
    if(profile && !opportunity) {
        const profileTagsString = profile.TAGS.split(",").slice(0, 3).join(", ")
        const metadataComment = profile.COMMENT.substring(0, 20)
        let metadata: JSX.Element = <></>
        if (type === "startup") {
            metadata = <><title>
                {metadatas["/annuaires/startups/[id]"].title1 + " " + profile.NAME + metadatas["/annuaires/startups/[id]"].title2 + " " + profile.CATEGORY[0].NAME}
            </title>
                <meta name="description" content={metadatas["/annuaires/startups/[id]"].description1 + profile.NAME + metadatas["/annuaires/startups/[id]"].description2 + profile.CATEGORY[0].NAME + ", " + metadataComment + ", " + profileTagsString}/></>
        } else if (type === "corporation") {
            metadata =
                <><title>
                    {metadatas["/annuaires/corporations/[id]"].title1 + " " + profile.NAME + metadatas["/annuaires/corporations/[id]"].title2 + " " + profile.CATEGORY[0] + metadatas["/annuaires/corporations/[id]"].title3}
                </title>
                    <meta name="description" content={metadatas["/annuaires/corporations/[id]"].description1 + profile.NAME +
                        metadatas["/annuaires/corporations/[id]"].description2 + profile.NAME +
                        metadatas["/annuaires/corporations/[id]"].description3 + profile.NAME +
                        metadatas["/annuaires/corporations/[id]"].description4 + profile.NAME +
                        metadatas["/annuaires/corporations/[id]"].description5 + profile.NAME
                    }
                /></>
        } else if (type === "partner") { 
            <><title>
                    {metadatas["/annuaires/partners/[id]"].title1 + profile.NAME + metadatas["/annuaires/partners/[id]"].title2 + profile.CATEGORY[0]}
                </title>
                    <meta name="description" content={metadatas["/annuaires/partners/[id]"].description1 + profile.NAME +
                        metadatas["/annuaires/partners/[id]"].description2 + profile.NAME +
                        metadatas["/annuaires/partners/[id]"].description3 + profile.NAME +
                        metadatas["/annuaires/partners/[id]"].description4
                    }
                /></>
        }
        return <>
            <Head>
                { metadata }
            </Head>
            <div id="profile" className="container">
                { (!session) ? <IdenfiticationBanner { ...pageProps }/> : null }
                { (profile.STATE === "WO") ? <RecoverBanner { ...pageProps }/> : null} 
                <ProfileCard { ...pageProps }/>
                <div className={ ProfileStyles.details }>
                    <div className={ ProfileStyles.leftSide }>
                        <div className="sticky">
                            <ProfileMenu { ...pageProps }/>
                            <ProfileOverview { ...pageProps }/>
                        </div>
                    </div>
                    <div className={ ProfileStyles.content }>
                        { (type.match(/(startup)/)) ? <Startup { ...pageProps }/> : null }
                        { (type.match(/(corporation|entreprise)/)) ? <Corporation { ...pageProps }/> : null }
                        { (type.match(/(partner|partenaire)/)) ? <Partner { ...pageProps }/> : null }
                    </div>
                </div>
            </div>
        </>;
    };
    return <>
        <Head>
            <title>{ opportunity.TITLE }</title>
            <meta name="description" content={ opportunity.DESCRIPTION }/>
        </Head>
        <div id="opportunity" className="container">
            <OpportunityPreview { ...pageProps }/>
            <OpportunityLinks { ...pageProps }/>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Startup = (pageProps: any) => {
    const { products, states }: any = pageProps;
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "text" ];
    const pitchDeckButtonValues = [ ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", translations["Voir le pitch deck"] ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    return <>
        <ProfileOffer { ...pageProps }/>
        <ProfileTargets { ...pageProps }/>
        { (products) ? <ProfileProducts { ...pageProps }/> : null }
        <Button {...pitchDeckButtonObject as ButtonInterface}/>
        <ProfileEcosystem { ...pageProps }/>
        <ProfilePartners { ...pageProps }/>
        <ProfileTeam { ...pageProps }/>
        <ProfileActivities { ...pageProps }/>
        <ProfileSocials { ...pageProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporation Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Corporation = (pageProps: any) => {
    const { states }: any = pageProps;
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "text" ];
    const pitchDeckButtonValues = [ ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", translations["Voir le pitch deck"] ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    return <>
        <ProfileTeam { ...pageProps }/>
        <ProfileOpportunities { ...pageProps }/>
        <ProfileGoals { ...pageProps }/>
        <Button {...pitchDeckButtonObject as ButtonInterface}/>
        <ProfileEcosystem { ...pageProps }/>
        <ProfilePartners { ...pageProps }/>
        <ProfileActivities { ...pageProps }/>
        <ProfileSocials { ...pageProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Partner = (pageProps: any) => {
    const { states }: any = pageProps;
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "text" ];
    const pitchDeckButtonValues = [ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", translations["Voir le pitch deck"] ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    return <>
        <ProfileTeam { ...pageProps }/>
        <ProfileOpportunities { ...pageProps }/>
        <ProfileGoals { ...pageProps }/>
        <Button {...pitchDeckButtonObject as ButtonInterface}/>
        <ProfileEcosystem { ...pageProps }/>
        <ProfilePartners { ...pageProps }/>
        <ProfileActivities { ...pageProps }/>
        <ProfileSocials { ...pageProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { type, profile }: any = query;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    profile = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = locale?.substring(0, 2);
    if(!type.match(/(opport)/)) {
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
                products: await api.getProducts(type, profile, "next", "Sorbonne", language),
                activities: await api.getActivity(type, profile, "next", "Sorbonne", language),
                folders: await api.getFolders(type, profile, "next", "Sorbonne", language)
            }
        };
    };
    const opportunity = await api.getOpportunity(profile, "next", "Sorbonne", language);
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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default DirectoryProfile;
export { getServerSideProps };