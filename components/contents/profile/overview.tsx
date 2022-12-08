/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../../public/stylesheets/components/contents/profile/Overview.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Overview */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOverview = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <div className={ ProfileStyles.overview }>
        <h4>{ translations["En bref"] }</h4>
        <div className="separator"></div>
        <div className={ ProfileStyles.details }>
            <p className={ ProfileStyles.label }>{ translations["Technologie(s)"] }</p>
            <Tags tags={ Object.entries(profile.TECHNO) } lock={ lock }/>
        </div>
        <div className={ ProfileStyles.details }>
            <p className={ ProfileStyles.label }>{ translations["Business model"] }</p>
            <Tags tags={ Object.entries(profile.BUSINESSMODEL) } lock={ lock }/>
        </div>
        <div className={ ProfileStyles.details }>
            <p className={ ProfileStyles.label }>{ translations["Présence"] }</p>
            <Tags tags={ Object.entries(profile.LOCATION) } lock={ lock }/>
        </div>
        <div className="separator"></div>
        <div className={ ProfileStyles.details }>
            <p className={ ProfileStyles.label }>{ translations["Numéro d'immatriculation"] }</p>
            <p>{ profile.IMMAT }</p>
        </div>
        <div className="separator"></div>
        <div className={ ProfileStyles.details }>
            <div className={ ProfileStyles.location }>
                <i className="fa-solid fa-location-dot"/>
                <span>{ profile.ADDRESS.STREET + ", " + profile.ADDRESS.ZIP + ", " + profile.ADDRESS.TOWN + ", " + profile.ADDRESS.ISO }</span>
            </div>
            <div className={ ProfileStyles.website }>
                <i className="fa-solid fa-thumbtack"/>
                <a href={ "https://" + profile.WEBSITE } target="blank">{ profile.WEBSITE }</a>
            </div>
            <div className={ ProfileStyles.networks }>
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
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOverview;