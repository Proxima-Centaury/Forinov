/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import ActivityCard from "../../cards/activity";
import Button from "../../buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivity = ({ activity, translations }) => {
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(3);
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".activity", activity, maxVisibleCardsByDefault);
    const buttonsProps = [
        { type: "moreOrLessAlternative", action: handleView, text: translations["Voir plus"], count: activity.length - maxVisibleCardsByDefault }
    ];
    if(activity) {
        return <div id="newsfeed" className="profileActivity">
            <h3>{ translations["Fil d'actualité"] }</h3>
            <div className="activities">
                { activity.map((event, key) => {
                    const props = {
                        event: event,
                        index: key + 1,
                        maxVisibleByDefault: maxVisibleCardsByDefault
                    };
                    return <ActivityCard key={ key } { ...props }/>;
                }) }
            </div>
            { (activity.length > maxVisibleCardsByDefault) ? <Button { ...buttonsProps[0] }/> : null }
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