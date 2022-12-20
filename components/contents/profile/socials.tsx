/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivitiesStyles from "../../../public/stylesheets/components/contents/profile/Activities.module.css";
import ActivityStyles from "../../../public/stylesheets/components/cards/Activity.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivities = ({ profile, states }: any) => {
    const { translations }: any = states;
    return <div id="socialsfeed" className={ ActivitiesStyles.activity }>
        <h3>{ translations["Réseaux sociaux"] }</h3>
        <div className={ ActivitiesStyles.list } data-type="list">
            { (profile.TWITTER) ? <TwitterFeed profile={ profile }/> : null }
            { (profile.FACEBOOK) ? <FacebookFeed profile={ profile }/> : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity ( Twitter Feed ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const TwitterFeed = ({ profile }: any) => {
    return <div className={ ActivityStyles.activity }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content }>
            <a className="twitter-timeline" href={ profile.TWITTER } data-height="400">Tweets by Forinov</a>
            <img src={ profile.LOGO } alt={ profile.NAME + " logo." }/>
            <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity ( Facebook Feed ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const FacebookFeed = ({ profile }: any) => {
    const iframeProps = {
        src: "https://www.facebook.com/plugins/page.php?href=" + profile.FACEBOOK + "&tabs=timeline&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=575612094230115",
        frameBorder: "0",
        allowFullScreen: true,
        allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    };
    return <div className={ ActivityStyles.activity }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content } style={ { minHeight: "400px" } }>
            <img src={ profile.LOGO } alt={ profile.NAME + " logo." }/>
            <iframe { ...iframeProps } width="100%" height="100%"></iframe>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileActivities;