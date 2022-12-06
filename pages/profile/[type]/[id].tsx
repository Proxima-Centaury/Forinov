/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProfileInterface } from "../../../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import IdenfiticationBanner from "../../../components/banners/identification";
import RecoverBanner from "../../../components/banners/recover";
import ProfileCard from "../../../components/cards/profile";
// import ProfileMenu from "../../../components/menus/profile";
// import ProfileOverview from "../../../components/content/profile/overview";
// import ProfileOffer from "../../../components/content/profile/offer";
// import ProfileDetails from "../../../components/content/profile/details";
// import ProfileProducts from "../../../components/content/profile/products";
// import ProfileEcosystem from "../../../components/content/profile/ecosystem";
// import ProfilePartners from "../../../components/content/profile/partners";
// import ProfileTeam from "../../../components/content/profile/team";
// import ProfileActivity from "../../../components/content/profile/activity";
// import Button from "../../../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../../../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Profile = ({ profile, products, activity, states, stateSetters, status }: ProfileInterface) => {
    const router = useRouter();
    const { locale, translations }: any = states;
    const pitchDeckButtonProps = {
        type: "callToActionWide",
        faIcon: true,
        faIconClass: "fa-solid fa-person-chalkboard",
        text: translations["Voir le pitch deck"]
    };
    // useEffect(() => {
    //     let showRegisterPopup = (event) => {
    //         event.preventDefault();
    //         const target = event.target;
    //         if(!target.closest(".profileMenu") && !target.closest(".closeModal") && !target.closest(".identificationBanner")) {
    //             if(lock) {
    //                 return setModal("register");
    //             };
    //         };
    //         return setModal(null);
    //     };
    //     (lock) ? window.addEventListener("click", showRegisterPopup) : null;
    //     return () => window.removeEventListener("click", showRegisterPopup);
    // }, []);
    const parentProps = { translations };
    if(profile) {
        return <div id="profile">
            <IdenfiticationBanner { ...parentProps }/>
            { (profile.STATE === "WO") ? <RecoverBanner { ...parentProps }/> : null }
            <ProfileCard { ...parentProps }/>
            {/* <div className="details">
                <div className="leftSide">
                    <ProfileMenu { ...parentProps }/>
                    <ProfileOverview { ...parentProps }/>
                </div>
                <div className="content">
                    <ProfileOffer { ...parentProps }/>
                    <ProfileDetails { ...parentProps }/>
                    { (products) ? <ProfileProducts { ...parentProps }/> : null }
                    <Button { ...pitchDeckButtonparentProps }/>
                    <ProfileEcosystem { ...parentProps }/>
                    <ProfilePartners { ...parentProps }/>
                    <ProfileTeam { ...parentProps }/>
                    <ProfileActivity { ...parentProps }/>
                </div>
            </div> */}
        </div>;
    } else {
        router.push("/404", "/404", { locale: locale.toString() });
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
    const { id, type } = query;
    const { endpoint, queries } = config.api;
    const profilePromise = await fetch(endpoint + "?q=" + queries.getProfile + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    const profileResponse = await profilePromise.json();
    const formattedProfileResponse = profileResponse[0];
    const productPromise = await fetch(endpoint + "?q=" + queries.getProducts + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    const productResponse = await productPromise.json();
    const formattedProductResponse = Object.values(productResponse[0].PRODUCTS);
    const activityPromise = await fetch(endpoint + "?q=" + queries.getActivity + "&TYPE=" + type + "&PID=" + id + "&authkey=Sorbonne");
    const activityResponse = await activityPromise.json();
    const formattedActivityResponse = Object.values(activityResponse[0].EVENTS);
    return {
        props: {
            locale, locales, defaultLocale,
            profile: formattedProfileResponse || null,
            products: formattedProductResponse || null,
            activity: formattedActivityResponse || null
        }
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Profile;
export { getServerSideProps };