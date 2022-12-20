/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
// import { ButtonInterface } from "../../../typescript/interfaces";
// import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileProducts from "../../../components/contents/profile/products";
import Tags from "../../tags/tags";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import GoalsStyles from "../../../public/stylesheets/components/contents/profile/Goals.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Goals */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileGoals = ({ type, profile, products, activities, states, stateSetters }: any) => {
    const { translations }: any = states;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(3);
    // const handleView = (event: any) => seeMoreOrLess(event, translations, "." + MemberStyles.member, team, maxVisibleCardsByDefault);
    // const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    // const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], team.length - maxVisibleCardsByDefault ];
    // const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    const parentProps = { type, profile, products, activities, states, stateSetters };
    return <div id="goals" className={ GoalsStyles.goals }>
        <h3>{ translations["Objectifs et offres"] }</h3>
        <div className={ GoalsStyles.content }>
            <p className={ GoalsStyles.label }>{ translations["Types de collaborations recherchées"] }</p>
            { (profile.PARTNER_SEARCH) ? <Tags tags={ Object.entries(profile.PARTNER_SEARCH) }/> : null }
        </div>
        <div className={ GoalsStyles.content }>
            <p className={ GoalsStyles.label }>{ translations["Intérêts par les startups dans les domaines"] }</p>
            { (profile.STARTUP_SEARCH) ? <Tags tags={ Object.entries(profile.STARTUP_SEARCH) }/> : null }
        </div>
        { (products) ? <ProfileProducts { ...parentProps }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileGoals;