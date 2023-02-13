/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ProfileInterface, ButtonInterface } from "../../../../typescript/interfaces";
import { buildProperties } from "../../../../scripts/utilities";
import api from "../../../../scripts/api";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
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
import Head from 'next/head';
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory Id Page */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const DirectoryIdPage = (pageProps: ProfileInterface) => {
    const router = useRouter();
    let { type } = router.query;
    const { profile, products, activities, folders, opportunity, states, stateSetters }: any = pageProps;
    const { session, lock, metadatas }: any = states;
    const { setModal }: any = stateSetters;
    if (type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(entreprise)/)) ? "corporation" : type;
        type = (type.match(/(partenaire)/)) ? "partner" : type;
    };
    useEffect(() => {
        if (profile && !opportunity) {
            let showRegisterPopup = (event: MouseEvent) => {
                event.preventDefault();
                if (lock) {
                    const target = event.target as Element;
                    const selectors = [
                        "." + MenuStyles.menu,
                        "." + ButtonStyles.closeModal,
                        "." + BannerStyles.identificationBanner,
                        "." + BannerStyles.recoverBanner,
                        "." + NavbarStyles.navbar,
                        "[data-type='devtools']"
                    ];
                    if (!target.closest(selectors.join(", "))) {
                        if (lock) {
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
    const parentProps = { type, profile, products, activities, folders, opportunity, states, stateSetters };
    if (profile && !opportunity) {
        console.log(profile)
        const profileTagsString = profile.TAGS.split(",").slice(0, 3).join(", ")
        const metadataComment = profile.COMMENT.substring(0, 20)

        let metadata: JSX.Element = <></>
        console.log("TYPE", type)
        if (type === "startup") {
            metadata = <><title>
                {metadatas["/annuaires/startups/[id]"].title1 + " " + profile.NAME + metadatas["/annuaires/startups/[id]"].title2 + " " + profile.CATEGORY[0].NAME}
            </title>
                <meta name="description" content={metadatas["/annuaires/startups/[id]"].description1 + profile.NAME + metadatas["/annuaires/startups/[id]"].description2 + profile.CATEGORY[0].NAME + ", " + metadataComment + ", " + profileTagsString} /></>
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
                {metadata}
            </Head><div id="profile" className="container">
                {(!session) ? <IdenfiticationBanner {...parentProps} /> : null}
                {(profile.STATE === "WO") ? <RecoverBanner {...parentProps} /> : null}
                <ProfileCard {...parentProps} />
                <div className={ProfileStyles.details}>
                    <div className={ProfileStyles.leftSide}>
                        <div className="sticky">
                            <ProfileMenu {...parentProps} />
                            <ProfileOverview {...parentProps} />
                        </div>
                    </div>
                    <div className={ProfileStyles.content}>
                        {(type === "startup") ? <Startup {...parentProps} /> : null}
                        {(type === "corporation") ? <Corporation {...parentProps} /> : null}
                        {(type === "partner") ? <Partner {...parentProps} /> : null}
                    </div>
                </div>
            </div></>;
    };
    return <>
        <Head>
            <title>
                {metadatas["/annuaires/startups/[id]"].title1 + " " + profile.NAME + " " + metadatas["/annuaires/startups/[id]"].title2}
            </title>
        </Head>
        <div id="opportunity" className="container">
            <OpportunityPreview {...parentProps} />
            <OpportunityLinks {...parentProps} />
        </div></>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Startup = ({ type, profile, products, activities, folders, states, stateSetters }: any) => {
    const { translations }: any = states;
    const buttonProps = ["type", "faIcon", "faIconClass", "url", "action", "text", "count"];
    const pitchDeckButtonValues = [ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <>
        <ProfileOffer {...parentProps} />
        <ProfileTargets {...parentProps} />
        {(products) ? <ProfileProducts {...parentProps} /> : null}
        <Button {...pitchDeckButtonObject as ButtonInterface} />
        <ProfileEcosystem {...parentProps} />
        <ProfilePartners {...parentProps} />
        <ProfileTeam {...parentProps} />
        <ProfileActivities {...parentProps} />
        <ProfileSocials {...parentProps} />
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporation Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Corporation = ({ type, profile, products, activities, folders, states, stateSetters }: any) => {
    const { translations }: any = states;
    const buttonProps = ["type", "faIcon", "faIconClass", "url", "action", "text", "count"];
    const pitchDeckButtonValues = [ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <>
        <ProfileTeam {...parentProps} />
        <ProfileOpportunities {...parentProps} />
        <ProfileGoals {...parentProps} />
        <Button {...pitchDeckButtonObject as ButtonInterface} />
        <ProfileEcosystem {...parentProps} />
        <ProfilePartners {...parentProps} />
        <ProfileActivities {...parentProps} />
        <ProfileSocials {...parentProps} />
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Partner = ({ type, profile, products, activities, folders, states, stateSetters }: any) => {
    const { translations }: any = states;
    const buttonProps = ["type", "faIcon", "faIconClass", "url", "action", "text", "count"];
    const pitchDeckButtonValues = [ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <>
        <ProfileTeam {...parentProps} />
        <ProfileOpportunities {...parentProps} />
        <ProfileGoals {...parentProps} />
        <Button {...pitchDeckButtonObject as ButtonInterface} />
        <ProfileEcosystem {...parentProps} />
        <ProfilePartners {...parentProps} />
        <ProfileActivities {...parentProps} />
        <ProfileSocials {...parentProps} />
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { id, type }: any = query;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    id = id?.substring(id.indexOf("_") + 1, id.length);
    const language = "&lang=" + locale?.substring(0, 2);
    if (!type.match(/(opport)/)) {
        if (type) {
            type = String(type);
            type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
            type = (type.match(/(corporation)/)) ? "entreprise" : type;
            type = (type.match(/(partner)/)) ? "partenaire" : type;
        };
        const profile = await api.getProfile(type, id, "next", "Sorbonne", language);
        if (!profile || (profile && Object.keys(profile).length === 0)) {
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
                profile: profile,
                products: await api.getProducts(type, id, "next", "Sorbonne", language),
                activities: await api.getActivity(type, id, "next", "Sorbonne", language),
                folders: await api.getFolders(type, id, "next", "Sorbonne", language)
            }
        };
    };
    const opportunity = await api.getOpportunity(id, "next", "Sorbonne", language);
    if (!opportunity || (opportunity && opportunity.ERROR)) {
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
export default DirectoryIdPage;
export { getServerSideProps };