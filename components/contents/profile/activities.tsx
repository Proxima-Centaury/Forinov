/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import SeeMore from "../../pagination/more";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ActivitiesStyles from "../../../public/stylesheets/components/contents/profile/Activities.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Activities */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfileActivities = (activitiesProps: any) => {
    const { type, activities, states } = activitiesProps;
    const { translations } = states;
    return <div id="newsfeed" className={ ActivitiesStyles.activities } data-profile={ type }>
        <h3>{ translations["Fil d'actualité"] }</h3>
        { (activities.length > 0) ? <SeeMore { ...activitiesProps } list={ activities } type="activities" max={ 5 } display="list"/> : <div className="placeholder">
            <p>{ translations["Aucune activité n'a été effectuée par ce profil"] + "." }</p>
        </div> }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfileActivities;