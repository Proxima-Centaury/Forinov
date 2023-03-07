/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivitiesStyles from "../../../public/stylesheets/components/contents/profile/Activities.module.css";
import ActivityStyles from "../../../public/stylesheets/components/cards/Activity.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivities = ({ type, profile, states }: any) => {
    const { translations }: any = states;
    return <div id="socialsfeed" className={ ActivitiesStyles.activities } data-profile={ type }>
        <h3>{ translations["Réseaux sociaux"] }</h3>
        <div className={ ActivitiesStyles.list } data-type="list">
            { (profile.TWITTER) ? <TwitterFeed profile={ profile }/> : <div className={ ActivityStyles.activity }>
                <div className={ ActivityStyles.marker }></div>
                <div className={ ActivityStyles.content }>
                    <Image src={ profile.LOGO } alt={ profile.NAME + " logo." } width="50" height="50"/>
                    <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-twitter"/></p>
                    <p>{ translations["Aucun profil renseigné"] + "." }</p>
                </div>
            </div> }
            { (profile.FACEBOOK) ? <FacebookFeed profile={ profile }/> : <div className={ ActivityStyles.activity }>
                <div className={ ActivityStyles.marker }></div>
                <div className={ ActivityStyles.content }>
                    <Image src={ profile.LOGO } alt={ profile.NAME + " logo." } width="50" height="50"/>
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
const TwitterFeed = ({ profile }: any) => {
    return <div className={ ActivityStyles.activity }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content }>
            <Image src={ profile.LOGO } alt={ profile.NAME + " logo." } width="50" height="50"/>
            <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-twitter"/></p>
            <a className="twitter-timeline" href={ profile.TWITTER } data-height="400">Tweets by Forinov</a>
            <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity ( Facebook Feed ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const FacebookFeed = ({ profile }: any) => {
    const iframeProps = {
        src: "https://www.facebook.com/plugins/page.php?href=" + profile.FACEBOOK + "&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=575612094230115",
        frameBorder: "0",
        allowFullScreen: true,
        allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    };
    return <div className={ ActivityStyles.activity }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content } style={ { minHeight: "400px" } }>
            <Image src={ profile.LOGO } alt={ profile.NAME + " logo." } width="50" height="50"/>
            <p className={ ActivityStyles.user }>{ profile.NAME }<i className="fa-brands fa-facebook-f"/></p>
            <iframe { ...iframeProps }></iframe>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileActivities;