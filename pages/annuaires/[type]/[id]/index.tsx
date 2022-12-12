/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { ProfileInterface, ButtonInterface } from "../../../../typescript/interfaces";
import { buildProperties } from "../../../../scripts/utilities";
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
import ProfileActivities from "../../../../components/contents/profile/activities";
import ProfileSocials from "../../../../components/contents/profile/socials";
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
const Profile = ({ profile, products, activities, states, stateSetters }: ProfileInterface) => {
    const { lock, translations }: any = states;
    const { setModal }: any = stateSetters;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const pitchDeckButtonValues = [ ButtonStyles.callToActionWide, true, "fa-solid fa-person-chalkboard", "", () => false, translations["Voir le pitch deck"], 0 ];
    const pitchDeckButtonObject = buildProperties(buttonProps, pitchDeckButtonValues);
    useEffect(() => {
        let showRegisterPopup = (event: MouseEvent) => {
            event.preventDefault();
            const target = event.target as Element;
            const selectors = "." + MenuStyles.menu + ",." + ButtonStyles.closeModal + ",." + BannerStyles.identificationBanner + ",." + BannerStyles.recoverBanner + ",." + NavbarStyles.navbar;
            if(!target.closest(selectors)) {
                if(lock) {
                    return setModal("register");
                };
            };
            return setModal(null);
        };
        (lock) ? window.addEventListener("click", showRegisterPopup) : null;
        return () => window.removeEventListener("click", showRegisterPopup);
    });
    const parentProps = { profile, products, activities, states, stateSetters };
    return <div id="profile" className="container">
        <IdenfiticationBanner { ...parentProps }/>
        { (profile.STATE === "WO") ? <RecoverBanner { ...parentProps }/> : null }
        <ProfileCard { ...parentProps }/>
        <div className={ ProfileStyles.details }>
            <div className={ ProfileStyles.leftSide }>
                <ProfileMenu { ...parentProps }/>
                <ProfileOverview { ...parentProps }/>
            </div>
            <div className={ ProfileStyles.content }>
                <ProfileOffer { ...parentProps }/>
                <ProfileTargets { ...parentProps }/>
                { (products) ? <ProfileProducts { ...parentProps }/> : null }
                <Button { ...pitchDeckButtonObject as ButtonInterface }/>
                <ProfileEcosystem { ...parentProps }/>
                <ProfilePartners { ...parentProps }/>
                <ProfileTeam { ...parentProps }/>
                <ProfileActivities { ...parentProps }/>
                <ProfileSocials { ...parentProps }/>
            </div>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { id, type } = query;
    const { endpoint, queries } = config.api;
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
    };
    res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
    const profilePromise = await fetch(endpoint + "?q=" + queries.getProfile + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    const profileResponse = await profilePromise.json();
    const formattedProfileResponse = profileResponse[0];
    const productPromise = await fetch(endpoint + "?q=" + queries.getProducts + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    const productResponse = await productPromise.json();
    const formattedProductResponse = Object.values(productResponse[0].PRODUCTS);
    const activitiesPromise = await fetch(endpoint + "?q=" + queries.getActivity + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    const activitiesResponse = await activitiesPromise.json();
    const formattedActivitiesResponse = Object.values(activitiesResponse[0].EVENTS);
    if(!formattedProfileResponse) {
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
            products: formattedProductResponse || null,
            activities: formattedActivitiesResponse || null
        }
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Profile;
export { getServerSideProps };