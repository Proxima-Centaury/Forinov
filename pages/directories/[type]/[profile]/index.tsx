/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment, useEffect } from "react";
import { ProfileInterface } from "../../../../typescript/interfaces";
import apiInstance from "../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import MetaDatas from "../../../../components/seo/metadatas/metadatas";
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../../../public/stylesheets/pages/Profile.module.css";
import NavbarStyles from "../../../../public/stylesheets/layout/Navbar.module.css";
import MenuStyles from "../../../../public/stylesheets/components/menus/Profile.module.css";
import BannerStyles from "../../../../public/stylesheets/components/banners/Banner.module.css";
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Profile */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryProfile = (pageProps: ProfileInterface) => {
    const { profile, opportunity, states, stateSetters, router } = pageProps;
    const { session, lock } = states;
    const { setModal } = stateSetters;
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
                        "[data-type='devtools']",
                        ".modalLayout"
                    ];
                    if(!target.closest(selectors.join(", ")) && lock) {
                        return setModal("register");
                    };
                };
            };
            (lock) ? window.addEventListener("click", showRegisterPopup) : null;
            return () => window.removeEventListener("click", showRegisterPopup);
        };
    });
    if(profile && !opportunity) {
        return <Fragment>
            <MetaDatas { ...pageProps } type={ type } profile={ profile }/>
            <div id="profile" className="container" data-profile={ type.substring(0, type.length - 1) }>
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
                        { (type.match(/(startups)/)) ? <Startup { ...pageProps }/> : null }
                        { (type.match(/(corporates)/)) ? <Corporate { ...pageProps }/> : null }
                        { (type.match(/(partners)/)) ? <Partner { ...pageProps }/> : null }
                    </div>
                </div>
            </div>
        </Fragment>;
    } else if(!profile && opportunity) {
        return <Fragment>
            <MetaDatas { ...pageProps } type={ type } opportunity={ opportunity }/>
            <div id="opportunity" className="container">
                <OpportunityPreview { ...pageProps }/>
                <OpportunityLinks { ...pageProps }/>
            </div>
        </Fragment>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Profile Content */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Startup = (startupProps: any) => {
    const { products, states } = startupProps;
    const { translations } = states;
    return <Fragment>
        <ProfileOffer { ...startupProps }/>
        <ProfileTargets { ...startupProps }/>
        { (products) ? <ProfileProducts { ...startupProps }/> : null }
        <Button button={ ButtonStyles.callToActionWide } icon="fa-light fa-person-chalkboard" text={ translations["Voir le pitch deck"] }/>
        <ProfileEcosystem { ...startupProps }/>
        <ProfilePartners { ...startupProps }/>
        <ProfileTeam { ...startupProps }/>
        <ProfileActivities { ...startupProps }/>
        <ProfileSocials { ...startupProps }/>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporate Profile Content */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Corporate = (corporateProps: any) => {
    const { states } = corporateProps;
    const { translations } = states;
    return <Fragment>
        <ProfileTeam { ...corporateProps }/>
        <ProfileOpportunities { ...corporateProps }/>
        <ProfileGoals { ...corporateProps }/>
        <Button button={ ButtonStyles.callToActionWide } icon="fa-light fa-person-chalkboard" text={ translations["Voir le pitch deck"] }/>
        <ProfileEcosystem { ...corporateProps }/>
        <ProfilePartners { ...corporateProps }/>
        <ProfileActivities { ...corporateProps }/>
        <ProfileSocials { ...corporateProps }/>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Profile Content */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Partner = (partnerProps: any) => {
    const { states } = partnerProps;
    const { translations } = states;
    return <Fragment>
        <ProfileTeam { ...partnerProps }/>
        <ProfileOpportunities { ...partnerProps }/>
        <ProfileGoals { ...partnerProps }/>
        <Button button={ ButtonStyles.callToActionWide } icon="fa-light fa-person-chalkboard" text={ translations["Voir le pitch deck"] }/>
        <ProfileEcosystem { ...partnerProps }/>
        <ProfilePartners { ...partnerProps }/>
        <ProfileActivities { ...partnerProps }/>
        <ProfileSocials { ...partnerProps }/>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { type, profile } = query;
    profile = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default DirectoryProfile;
export { getServerSideProps };