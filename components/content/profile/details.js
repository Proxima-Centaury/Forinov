/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Details */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileDetails = ({ profile, lock, translations }) => {
    if(profile) {
        return <div className="profileDetails">
            <div className="details">
                <div>
                    <p className="label">{ translations["Secteur(s) ciblé(s)"] }</p>
                </div>
                <Tags tags={ Object.entries(profile.TARGETSECTORS) } lock={ lock }/>
            </div>
            <div className="separator"></div>
            <div className="details">
                <div>
                    <p className="label">{ translations["Métier(s) ciblé(s)"] }</p>
                </div>
                <Tags tags={ Object.entries(profile.TARGETJOBS) } lock={ lock }/>
            </div>
            <div className="separator"></div>
            <div className="details">
                <div>
                    <p className="label">{ translations["Type(s) de partenariat"] }</p>
                </div>
                <Tags tags={ Object.entries(profile.TARGETPARTNERSHIP) } lock={ lock }/>
            </div>
        </div>;
    } else {
        return <ProfileDetailsPlaceholder/>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Details Placeholder */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileDetailsPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileDetails;