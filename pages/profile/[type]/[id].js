/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect } from "react";
import IdenfiticationBanner from "../../../components/banners/identification";
import RecoverBanner from "../../../components/banners/recover";
import ProfileCard from "../../../components/cards/profile";
import ProfileMenu from "../../../components/menus/profile";
import ProfileOverview from "../../../components/content/profile/overview";
import ProfileOffer from "../../../components/content/profile/offer";
import ProfileDetails from "../../../components/content/profile/details";
import ProfileProducts from "../../../components/content/profile/products";
import ProfileEcosystem from "../../../components/content/profile/ecosystem";
import ProfilePartners from "../../../components/content/profile/partners";
import ProfileTeam from "../../../components/content/profile/team";
import ProfileActivity from "../../../components/content/profile/activity";
import Button from "../../../components/buttons/button";
import config from "../../../config.json";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Profile = ({ session, profile, products, activity, lock, translations, setModal }) => {
    const props = { session, profile, products, activity, lock, translations };
    const pitchDeckButtonProps = {
        type: "callToActionWide",
        faIcon: true,
        faIconClass: "fa-solid fa-person-chalkboard",
        text: translations["Voir le pitch deck"]
    };
    useEffect(() => {
        let showRegisterPopup = (event) => {
            event.preventDefault();
            const target = event.target;
            if(!target.closest(".profileMenu") && !target.closest(".closeModal") && !target.closest(".identificationBanner")) {
                if(lock) {
                    return setModal("register");
                };
            };
            return setModal(null);
        };
        (lock) ? window.addEventListener("click", showRegisterPopup) : null;
        return () => window.removeEventListener("click", showRegisterPopup);
    }, []);
    if(profile) {
        return <div id="profile">
            <IdenfiticationBanner { ...props }/>
            { (profile.STATE === "WO") ? <RecoverBanner { ...props }/> : null }
            <ProfileCard { ...props }/>
            <div className="details">
                <div className="leftSide">
                    <ProfileMenu { ...props }/>
                    <ProfileOverview { ...props }/>
                </div>
                <div className="content">
                    <ProfileOffer { ...props }/>
                    <ProfileDetails { ...props }/>
                    { (products) ? <ProfileProducts { ...props }/> : null }
                    <Button { ...pitchDeckButtonProps }/>
                    <ProfileEcosystem { ...props }/>
                    <ProfilePartners { ...props }/>
                    <ProfileTeam { ...props }/>
                    <ProfileActivity { ...props }/>
                </div>
            </div>
        </div>;
    } else {
        return <div id="profile"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps = async ({ req, res, query }) => {
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
            profile: formattedProfileResponse,
            products: formattedProductResponse,
            activity: formattedActivityResponse,
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Profile;
export { getServerSideProps };