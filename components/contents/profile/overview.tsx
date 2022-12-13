/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import OverviewStyles from "../../../public/stylesheets/components/contents/profile/Overview.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOverview = ({ type, profile, states }: any) => {
    const { translations }: any = states;
    const parentProps = { type, profile, states };
    return <div className={ OverviewStyles.overview }>
        <h4>{ translations["En bref"] }</h4>
        <div className="separator"></div>
        { (type.match(/(startup)/)) ? <Startup { ...parentProps }/> : null }
        { (type.match(/(entreprise|corporation)/)) ? <Corporation { ...parentProps }/> : null }
        { (type.match(/(partenaire|partner)/)) ? <Partner { ...parentProps }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Startup = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <>
        <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Technologie(s)"] }</p>
            <Tags tags={ Object.entries(profile.TECHNO) } lock={ lock }/>
        </div>
        <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Business model"] }</p>
            <Tags tags={ Object.entries(profile.BUSINESSMODEL) } lock={ lock }/>
        </div>
        <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Présence"] }</p>
            <Tags tags={ Object.entries(profile.LOCATION) } lock={ lock }/>
        </div>
        <div className="separator"></div>
        <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Numéro d'immatriculation"] }</p>
            <p>{ profile.IMMAT }</p>
        </div>
        <div className="separator"></div>
        <div className={ OverviewStyles.details }>
            <div className={ OverviewStyles.location }>
                <i className="fa-solid fa-location-dot"/>
                <span>{ profile.ADDRESS.STREET + ", " + profile.ADDRESS.ZIP + ", " + profile.ADDRESS.TOWN + ", " + profile.ADDRESS.ISO }</span>
            </div>
            <div className={ OverviewStyles.website }>
                <i className="fa-solid fa-thumbtack"/>
                <a href={ "https://" + profile.WEBSITE } target="blank">{ profile.WEBSITE }</a>
            </div>
            <div className={ OverviewStyles.networks }>
                <a href={ profile.FACEBOOK } target="_blank">
                    <i className="fa-brands fa-facebook-f"/>
                </a>
                <a href={ profile.TWITTER } target="_blank">
                    <i className="fa-brands fa-twitter"/>
                </a>
                <a href={ profile.LINKEDIN } target="_blank">
                    <i className="fa-brands fa-linkedin"/>
                </a>
                <a href={ profile.CRUNCHBASE } target="_blank">cb</a>
            </div>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporation Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Corporation = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <></>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Partner = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <></>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOverview;