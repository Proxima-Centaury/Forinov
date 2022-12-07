/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Overview */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOverview = ({ profile, lock, translations }) => {
    if(profile) {
        return <div className="overview">
            <h4>{ translations["En bref"] }</h4>
            <div className="separator"></div>
            <div className="details">
                <p className="label">{ translations["Technologie(s)"] }</p>
                <Tags tags={ Object.entries(profile.TECHNO) } lock={ lock }/>
            </div>
            <div className="details">
                <p className="label">{ translations["Business model"] }</p>
                <Tags tags={ Object.entries(profile.BUSINESSMODEL) } lock={ lock }/>
            </div>
            <div className="details">
                <p className="label">{ translations["Présence"] }</p>
                <Tags tags={ Object.entries(profile.LOCATION) } lock={ lock }/>
            </div>
            <div className="separator"></div>
            <div className="details">
                <p className="label">{ translations["Numéro d'immatriculation"] }</p>
                <p>{ profile.IMMAT }</p>
            </div>
            <div className="separator"></div>
            <div className="details">
                <div className="location">
                    <i className="fa-solid fa-location-dot"/>
                    <span>{ profile.ADDRESS.STREET + ", " + profile.ADDRESS.ZIP + ", " + profile.ADDRESS.TOWN + ", " + profile.ADDRESS.ISO }</span>
                </div>
                <div className="website">
                    <i className="fa-solid fa-thumbtack"/>
                    <a href={ "https://" + profile.WEBSITE } target="blank">{ profile.WEBSITE }</a>
                </div>
                <div className="networks">
                    <a href={ profile.FACEBOOK } target="blank">
                        <i className="fa-brands fa-facebook-f"/>
                    </a>
                    <a href={ profile.TWITTER } target="blank">
                        <i className="fa-brands fa-twitter"/>
                    </a>
                    <a href={ profile.LINKEDIN } target="blank">
                        <i className="fa-brands fa-linkedin"/>
                    </a>
                    <a href={ profile.CRUNCHBASE } target="blank">
                        cb
                    </a>
                </div>
            </div>
        </div>;
    } else {
        return <div className="overview"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOverview;