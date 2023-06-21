/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ProfileProducts from "../../../components/contents/profile/products";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import GoalsStyles from "../../../public/stylesheets/components/contents/profile/Goals.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Goals */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfileGoals = (goalsProps: any) => {
    const { type, profile, products, states } = goalsProps;
    const { lock, translations } = states;
    const partnerships = (type !== "partner") ? profile.PARTNER_SEARCH || [] : [];
    const domains = profile.STARTUP_SEARCH || [];
    return <div id="goals" className={ GoalsStyles.goals }>
        <h3>{ translations["Objectifs et offres"] }</h3>
        { (type !== "partner") ? <div className={ GoalsStyles.content }>
            <p className={ GoalsStyles.label }>{ translations["Types de collaborations recherchées"] }</p>
            { (partnerships.length > 0) ? <Tags tags={ partnerships } lock={ lock }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div> : null }
        <div className={ GoalsStyles.content }>
            <p className={ GoalsStyles.label }>{ translations["Intérêts par les startups dans les domaines"] }</p>
            { (domains.length > 0) ? <Tags tags={ domains } lock={ lock }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        { (products) ? <ProfileProducts { ...goalsProps }/> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfileGoals;