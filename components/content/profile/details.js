/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Details */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileDetails = ({ profile, translations }) => {
    if(profile) {
        return <div className="profileDetails">
            <div className="details">
                <div>
                    <p className="label">{ translations["Secteur(s) ciblé(s)"] }</p>
                </div>
                <Tags tags={ Object.entries(profile.TARGETSECTORS) } lock={ true }/>
            </div>
            <div className="separator"></div>
            <div className="details">
                <div>
                    <p className="label">{ translations["Métier(s) ciblé(s)"] }</p>
                </div>
                <Tags tags={ Object.entries(profile.TARGETJOBS) } lock={ true }/>
            </div>
            <div className="separator"></div>
            <div className="details">
                <div>
                    <p className="label">{ translations["Type(s) de partenariat"] }</p>
                </div>
                <Tags tags={ Object.entries(profile.TARGETPARTNERSHIP) } lock={ true }/>
            </div>
        </div>;
    } else {
        return <div className="profileDetails"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileDetails;