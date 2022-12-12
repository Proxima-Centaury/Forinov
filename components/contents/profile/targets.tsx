/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TargetsStyles from "../../../public/stylesheets/components/contents/profile/Targets.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Targets */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileTargets = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <div className={ TargetsStyles.targets }>
        <div className={ TargetsStyles.details }>
            <div>
                <p className={ TargetsStyles.label }>{ translations["Secteur(s) ciblé(s)"] }</p>
            </div>
            <Tags tags={ Object.entries(profile.TARGETSECTORS) } lock={ lock }/>
        </div>
        <div className="separator"></div>
        <div className={ TargetsStyles.details }>
            <div>
                <p className={ TargetsStyles.label }>{ translations["Métier(s) ciblé(s)"] }</p>
            </div>
            <Tags tags={ Object.entries(profile.TARGETJOBS) } lock={ lock }/>
        </div>
        <div className="separator"></div>
        <div className={ TargetsStyles.details }>
            <div>
                <p className={ TargetsStyles.label }>{ translations["Type(s) de partenariat"] }</p>
            </div>
            <Tags tags={ Object.entries(profile.TARGETPARTNERSHIP) } lock={ lock }/>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileTargets;