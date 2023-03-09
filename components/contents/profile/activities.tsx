/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivityCard from "../../cards/activity";
import Button from "../../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivitiesStyles from "../../../public/stylesheets/components/contents/profile/Activities.module.css";
import ActivityStyles from "../../../public/stylesheets/components/cards/Activity.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activities */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivities = ({ type, activities, states }: any) => {
    const { translations }: any = states;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(3);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + ActivityStyles.activity, activities, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLessAlternative, false, "", "", handleView, translations["Voir plus"], activities.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div id="newsfeed" className={ ActivitiesStyles.activities } data-profile={ type }>
        <h3>{ translations["Fil d'actualité"] }</h3>
        { (activities.length > 0) ? <div className={ ActivitiesStyles.list } data-type="list">
            { activities.map((event: any, key: KeyType) => {
                const index = key + 1;
                const maxVisibleByDefault = maxVisibleCardsByDefault;
                const cardProps = { event, index, maxVisibleByDefault };
                return <ActivityCard key={ key } { ...cardProps }/>;
            }) }
        </div> : <div className="placeholder">
            <p>{ translations["Aucune activité n'a été effectuée par ce profil"] + "." }</p>
        </div> }
        { (activities.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileActivities;