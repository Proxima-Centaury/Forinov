/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import MemberCard from "../../cards/member";
import Button from "../../../components/buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Team */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileTeam = ({ profile, translations }) => {
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(3);
    const { COLLABORATORS } = profile;
    const team = COLLABORATORS || [];
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".member", team, 3);
    const buttonsProps = [
        { type: "moreOrLessAlternative", action: handleView, text: translations["Voir plus"], count: team.length - maxVisibleCardsByDefault }
    ];
    if(profile) {
        return <div id="team" className="profileTeam">
            <h3>{ translations["L'équipe"] }</h3>
            <div className="team">
                { (team) ? team.map((member, key) => {
                    const props = {
                        member: member,
                        index: key + 1,
                        maxVisibleByDefault: maxVisibleCardsByDefault,
                        translations: translations
                    };
                    return <MemberCard key={ key } { ...props }/>;
                }) : null }
            </div>
            { (team.length > 2) ? <Button { ...buttonsProps[0] }/> : null }
        </div>;
    } else {
        return <ProfileTeamPlaceholder/>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Team Placeholder */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileTeamPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileTeam;