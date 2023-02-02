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
    const sectors = profile.TARGETSECTORS || [];
    const jobs = profile.TARGETJOBS || [];
    const partnerships = profile.TARGETPARTNERSHIP || [];
    return <div className={ TargetsStyles.targets }>
        <div className={ TargetsStyles.details }>
            <div>
                <p className={ TargetsStyles.label }>{ translations["Secteur(s) ciblé(s)"] }</p>
            </div>
            { (sectors.length > 0) ? <Tags tags={ sectors } lock={ lock }/> : null }
        </div>
        <div className="separator"></div>
        <div className={ TargetsStyles.details }>
            <div>
                <p className={ TargetsStyles.label }>{ translations["Métier(s) ciblé(s)"] }</p>
            </div>
            { (jobs.length > 0) ? <Tags tags={ jobs } lock={ lock }/> : null }
        </div>
        <div className="separator"></div>
        <div className={ TargetsStyles.details }>
            <div>
                <p className={ TargetsStyles.label }>{ translations["Type(s) de partenariat"] }</p>
            </div>
            { (partnerships.length > 0) ? <Tags tags={ partnerships } lock={ lock }/> : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileTargets;