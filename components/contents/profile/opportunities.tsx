/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Key, useState } from "react";
import { formatNameForUrl } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import OpportunityCard from "../../cards/opportunity";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import OpportunitiesStyles from "../../../public/stylesheets/components/contents/profile/Opportunities.module.css";
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
        <OpportunitiesContent { ...pageProps } opportunities={ online } state="Online"/>
        <OpportunitiesContent { ...pageProps } opportunities={ finished } state="Finished"/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Opportunities ( Content ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunitiesContent = (opportunitiesProps: any) => {
    const { profile, opportunities, states, state }: any = opportunitiesProps;
    const { translations }: any = states;
    const [ expanded, setExpanded ] = useState(true);
    return <>
        <button onClick={ () => setExpanded(!expanded) } data-state={ state }>
            <div className={ OpportunitiesStyles.dot }></div>
            { (state === "Online") ? <span>{ translations["En cours"] + " (" + profile.OPPORTUNITIES.ONLINE + ")" }</span> : null }
            { (state === "Finished") ? <span>{ translations["Terminées"] + " (" + profile.OPPORTUNITIES.FINISHED + ")" }</span> : null }
            <div className="separator"></div>
            <i className={ "fa-solid fa-caret-right" + ((expanded) ? " expanded" : "") }/>
        </button>
        { (opportunities.length > 0) ? <div className={ "grid twoColumns" + ((expanded) ? " expanded" : "") }>
            { opportunities.map((opportunity: any, key: Key) => {
                const url = "/directories/opportunities/categories/" + formatNameForUrl(opportunity.TYPE[0].NAME) + "_" + opportunity.TYPE[0].ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                return <Link key={ key } href={ url }>
                    <OpportunityCard { ...opportunitiesProps } opportunity={ opportunity }/>
                </Link>;
            }) }
        </div> : null }
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOpportunities;