/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import OpportunityCard from "../../cards/opportunity";
import Button from "../../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import OpportunitiesStyles from "../../../public/stylesheets/components/contents/profile/Opportunities.module.css";
import OpportunityStyles from "../../../public/stylesheets/components/cards/Opportunity.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Opportunities */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOpportunities = ({ profile, states }: any) => {
    const { translations }: any = states;
    const { list }: any = profile.opportunities;
    const online = (list) ? list.map((opportunity: any) => (opportunity.opportunity_state === "Online") ? opportunity : null).filter((opportunity: any) => opportunity !== null) : [];
    const finished = (list) ? list.map((opportunity: any) => (opportunity.opportunity_state === "Finished") ? opportunity : null).filter((opportunity: any) => opportunity !== null) : [];
    const counters = { online: profile.opportunities.online, finished: profile.opportunities.finished };
    const parentProps = { counters, states }
    return <div id="opportunities" className={ OpportunitiesStyles.opportunities }>
        <h3>{ translations["Opportunités"] }</h3>
        <OpportunitiesContent { ...parentProps } opportunities={ online } status={ "Online" }/>
        <OpportunitiesContent { ...parentProps } opportunities={ finished } status={ "Finished" }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Opportunities ( Content ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunitiesContent = ({ counters, opportunities, states, status }: any) => {
    const { translations, RGB }: any = states;
    const [ expanded, setExpanded ] = useState(true);
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + OpportunityStyles.opportunity, opportunities, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, handleView, translations["Voir plus"], opportunities.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <>
        <button onClick={ () => setExpanded(!expanded) } data-status={ status }>
            <div className={ OpportunitiesStyles.dot }></div>
            { (status === "Online") ? <span>{ translations["En cours"] + " (" + counters.online + ")" }</span> : null }
            { (status === "Finished") ? <span>{ translations["Terminées"] + " (" + counters.finished + ")" }</span> : null }
            <div className="separator"></div>
            <i className={ "fa-solid fa-caret-right" + ((expanded) ? " expanded" : "") }/>
        </button>
        <div className={ OpportunitiesStyles.list + ((expanded) ? " expanded" : "") } data-type="list">
            { opportunities.map((opportunity: any, key: KeyType) => {
                const index = key + 1;
                const maxVisibleByDefault = maxVisibleCardsByDefault;
                const cardProps = { opportunity, index, maxVisibleByDefault, translations, RGB };
                return <OpportunityCard key={ key } { ...cardProps }/>;
            }) }
            { (opportunities.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
        </div>
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOpportunities;