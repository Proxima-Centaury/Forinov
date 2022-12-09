/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import MemberCard from "../../cards/member";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TeamStyles from "../../../public/stylesheets/components/contents/profile/Team.module.css";
import MemberStyles from "../../../public/stylesheets/components/cards/Member.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Team */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileTeam = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(3);
    const { COLLABORATORS } = profile;
    const team = COLLABORATORS || [];
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + MemberStyles.member, team, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], team.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div id="team" className={ TeamStyles.team }>
        <h3>{ translations["L'équipe"] }</h3>
        <div className={ TeamStyles.team }>
            { (team) ? team.map((member: any, key: KeyType) => {
                const props = { member: member, index: key + 1, maxVisibleByDefault: maxVisibleCardsByDefault, translations: translations };
                return <MemberCard key={ key } { ...props }/>;
            }) : null }
        </div>
        { (team.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileTeam;