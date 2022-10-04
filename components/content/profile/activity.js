/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivityCard from "../../cards/activity";
import Button from "../../buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivity = ({ activity, translations }) => {
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".activity", activity, 2);
    if(activity) {
        return <div id="newsfeed" className="profileActivity">
            <h3>{ translations["Fil d'actualité"] }</h3>
            <div className="activities">
                { activity.map((event, key) => <ActivityCard key={ key } event={ event } index={ key }/>) }
            </div>
            { (activity.length > 2) ? <Button type="moreOrLessAlternative" action={ handleView } text={ translations["Voir plus"] } count={ activity.length - 2 }/> : null }
        </div>;
    } else {
        return <ProfileActivityPlaceholder/>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity Placeholder */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivityPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileActivity;