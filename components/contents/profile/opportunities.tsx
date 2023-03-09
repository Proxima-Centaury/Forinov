/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties, formatNameForUrl } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
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
const ProfileOpportunities = (pageProps: any) => {
    const { profile, states }: any = pageProps;
    const { translations }: any = states;
    const online = (profile.OPPORTUNITIES.LIST) ? profile.OPPORTUNITIES.LIST.map((opportunity: any) => (opportunity.STATE === "Online") ? opportunity : null).filter((opportunity: any) => opportunity !== null) : [];
    const finished = (profile.OPPORTUNITIES.LIST) ? profile.OPPORTUNITIES.LIST.map((opportunity: any) => (opportunity.STATE === "Finished") ? opportunity : null).filter((opportunity: any) => opportunity !== null) : [];
    return <div id="opportunities" className={ OpportunitiesStyles.opportunities }>
        <h3>{ translations["Opportunités"] }</h3>
        <OpportunitiesContent { ...pageProps } opportunities={ online } state={ "Online" }/>
        <OpportunitiesContent { ...pageProps } opportunities={ finished } state={ "Finished" }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Opportunities ( Content ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunitiesContent = (pageProps: any) => {
    const { profile, opportunities, states, state }: any = pageProps;
    const { translations }: any = states;
    const [ expanded, setExpanded ] = useState(true);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + OpportunityStyles.opportunity, opportunities, 4);
    /* --------------------------- */
    /* Properties */
    /* --------------------------- */
    const buttonProps = [ "type", "action", "text", "count" ];
    /* --------------------------- */
    /* More Or Less Button */
    /* --------------------------- */
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, handleView, translations["Voir plus"], opportunities.length - 4 ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <>
        <button onClick={ () => setExpanded(!expanded) } data-state={ state }>
            <div className={ OpportunitiesStyles.dot }></div>
            { (state === "Online") ? <span>{ translations["En cours"] + " (" + profile.OPPORTUNITIES.ONLINE + ")" }</span> : null }
            { (state === "Finished") ? <span>{ translations["Terminées"] + " (" + profile.OPPORTUNITIES.FINISHED + ")" }</span> : null }
            <div className="separator"></div>
            <i className={ "fa-solid fa-caret-right" + ((expanded) ? " expanded" : "") }/>
        </button>
        { (opportunities.length > 0) ? <div className={ OpportunitiesStyles.list + ((expanded) ? " expanded" : "") + " grid twoColumns" }>
            { opportunities.map((opportunity: any, key: KeyType) => {
                const url = "/directories/opportunities/categories/" + formatNameForUrl(opportunity.TYPE[0].NAME) + "_" + opportunity.TYPE[0].ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                return <Link key={ key } href={ url }>
                    <OpportunityCard { ...pageProps } opportunity={ opportunity } index={ key + 1 } maxVisibleByDefault={ 4 }/>
                </Link>;
            }) }
            { (opportunities.length > 4) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
        </div> : null }
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOpportunities;