/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/dist/client/router";
import { getProperAlt } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Script from "next/script";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivitiesStyles from "../../../public/stylesheets/components/contents/profile/Activities.module.css";
import ActivityStyles from "../../../public/stylesheets/components/cards/Activity.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivities = (activitiesProps: any) => {
    const router = useRouter();
    const { profile, states } = activitiesProps;
    const { translations } = states;
    const { type } = router.query;
    return <div id="socialsfeed" className={ ActivitiesStyles.activities }>
        <h3>{ translations["Réseaux sociaux"] }</h3>
        <div className="list">
            { (profile.TWITTER) ? <TwitterFeed { ...activitiesProps }/> : <div className={ ActivityStyles.card }>
                <div className={ ActivityStyles.marker }></div>
                <div className={ ActivityStyles.content }>
                    <Image src={ profile.LOGO } alt={ getProperAlt((type) ? type.toString() : "", translations) + " " + profile.NAME + "." } width="50" height="50"/>
                    <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-twitter"/></p>
                    <p>{ translations["Aucun profil renseigné"] + "." }</p>
                </div>
            </div> }
            { (profile.FACEBOOK) ? <FacebookFeed { ...activitiesProps }/> : <div className={ ActivityStyles.card }>
                <div className={ ActivityStyles.marker }></div>
                <div className={ ActivityStyles.content }>
                    <Image src={ profile.LOGO } alt={ getProperAlt((type) ? type.toString() : "", translations) + " " + profile.NAME + "." } width="50" height="50"/>
                    <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-facebook-f"/></p>
                    <p>{ translations["Aucun profil renseigné"] + "." }</p>
                </div>
            </div> }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity ( Twitter Feed ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const TwitterFeed = (twitterFeedProps: any) => {
    const router = useRouter();
    const { profile, states } = twitterFeedProps;
    const { translations } = states;
    const { type } = router.query;
    return <div className={ ActivityStyles.card }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content }>
            <Image src={ profile.LOGO } alt={ getProperAlt((type) ? type.toString() : "", translations) + " " + profile.NAME + "." } width="50" height="50"/>
            <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-twitter"/></p>
            <a className="twitter-timeline" href={ profile.TWITTER } data-height="400">Tweets by Forinov</a>
            <Script async defer crossOrigin="anonymous" src="https://platform.twitter.com/widgets.js"/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity ( Facebook Feed ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const FacebookFeed = (facebookFeedProps: any) => {
    const router = useRouter();
    const { profile, states } = facebookFeedProps;
    const { translations } = states;
    const { type } = router.query;
    // const iframeProps = {
    //     src: "https://www.facebook.com/plugins/page.php?href=" + profile.FACEBOOK + "&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=575612094230115",
    //     frameBorder: "0",
    //     allowFullScreen: true,
    //     allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    // };
    return <div className={ ActivityStyles.card }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content } style={ { minHeight: "400px" } }>
            <Image src={ profile.LOGO } alt={ getProperAlt((type) ? type.toString() : "", translations) + " " + profile.NAME + "." } width="50" height="50"/>
            <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-facebook-f"/></p>
            {/* <iframe { ...iframeProps }></iframe> */}
            <div id="fb-root"></div>
            <div className="fb-page" data-href={ ((!profile.FACEBOOK.includes("https://")) ? "https://" : "") + profile.FACEBOOK.replaceAll("http://", "") } data-tabs="timeline">
                <blockquote cite={ ((!profile.FACEBOOK.includes("https://")) ? "https://" : "") + profile.FACEBOOK.replaceAll("http://", "") } className="fb-xfbml-parse-ignore">
                    <a href={ ((!profile.FACEBOOK.includes("https://")) ? "https://" : "") + profile.FACEBOOK.replaceAll("http://", "") }>Facebook</a>
                </blockquote>
            </div>
            <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v16.0&appId=575612094230115&autoLogAppEvents=1" nonce="50ttticx"/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileActivities;