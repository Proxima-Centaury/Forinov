/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ProfileInterface, ButtonInterface } from "../../../../typescript/interfaces";
import { beautifyTheLogs, buildProperties } from "../../../../scripts/utilities";
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
import Button from "../../../../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../../../../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../../../public/stylesheets/pages/Profile.module.css";
import NavbarStyles from "../../../../public/stylesheets/layout/Navbar.module.css";
import MenuStyles from "../../../../public/stylesheets/components/menus/Profile.module.css";
import BannerStyles from "../../../../public/stylesheets/components/banners/Banner.module.css";
import ButtonStyles from "../../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Profile = ({ profile, products, activities, folders, states, stateSetters }: ProfileInterface) => {
    const router = useRouter();
    const { session, lock }: any = states;
    const { setModal }: any = stateSetters;
    let { type } = router.query;
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(entreprise)/)) ? "corporation" : type;
        type = (type.match(/(partenaire)/)) ? "partner" : type;
    };
    useEffect(() => {
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
    });
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <div id="profile" className="container">
        { (!session) ? <IdenfiticationBanner { ...parentProps }/> : null }
        { (profile.STATE === "WO") ? <RecoverBanner { ...parentProps }/> : null }
        <ProfileCard { ...parentProps }/>
        <div className={ ProfileStyles.details }>
            <div className={ ProfileStyles.leftSide }>
                <div className="sticky">
                    <ProfileMenu { ...parentProps }/>
                    <ProfileOverview { ...parentProps }/>
                </div>
            </div>
            <div className={ ProfileStyles.content }>
                { (type === "startup") ? <Startup { ...parentProps }/> : null }
                { (type === "corporation") ? <Corporation { ...parentProps }/> : null }
                { (type === "partner") ? <Partner { ...parentProps }/> : null }
            </div>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Startup = ({ type, profile, products, activities, folders, states, stateSetters }: any) => {
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const pitchDeckButtonValues = [ ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0 ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <>
        <ProfileOffer { ...parentProps }/>
        <ProfileTargets { ...parentProps }/>
        { (products) ? <ProfileProducts { ...parentProps }/> : null }
        <Button { ...pitchDeckButtonObject as ButtonInterface }/>
        <ProfileEcosystem { ...parentProps }/>
        <ProfilePartners { ...parentProps }/>
        <ProfileTeam { ...parentProps }/>
        <ProfileActivities { ...parentProps }/>
        <ProfileSocials { ...parentProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporation Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Corporation = ({ type, profile, products, activities, folders, states, stateSetters }: any) => {
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const pitchDeckButtonValues = [ ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0 ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <>
        <ProfileTeam { ...parentProps }/>
        <ProfileOpportunities { ...parentProps }/>
        <ProfileGoals { ...parentProps }/>
        <Button { ...pitchDeckButtonObject as ButtonInterface }/>
        <ProfileEcosystem { ...parentProps }/>
        <ProfilePartners { ...parentProps }/>
        <ProfileActivities { ...parentProps }/>
        <ProfileSocials { ...parentProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Profile Content */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Partner = ({ type, profile, products, activities, folders, states, stateSetters }: any) => {
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const pitchDeckButtonValues = [ ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0 ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    const parentProps = { type, profile, products, activities, folders, states, stateSetters };
    return <>
        <ProfileTeam { ...parentProps }/>
        <ProfileOpportunities { ...parentProps }/>
        <ProfileGoals { ...parentProps }/>
        <Button { ...pitchDeckButtonObject as ButtonInterface }/>
        <ProfileEcosystem { ...parentProps }/>
        <ProfilePartners { ...parentProps }/>
        <ProfileActivities { ...parentProps }/>
        <ProfileSocials { ...parentProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { query, locale, locales, defaultLocale } = context;
    let { id, type }: any = query;
    const { endpoint, queries } = config.api;
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(corporation)/)) ? "entreprise" : type;
        type = (type.match(/(partner)/)) ? "partenaire" : type;
    };
    id = id?.substring(id.indexOf("_") + 1, id.length);
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
    beautifyTheLogs("[CALL] PROFILE : " + endpoint + "?q=" + queries.getProfile + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    beautifyTheLogs("[CALL] PRODUCTS : " + endpoint + "?q=" + queries.getProducts + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    beautifyTheLogs("[CALL] ACTIVITIES : " + endpoint + "?q=" + queries.getActivity + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    beautifyTheLogs("[CALL] FOLDERS : " + endpoint + "?q=" + queries.getFolders + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Profile;
export { getServerSideProps };