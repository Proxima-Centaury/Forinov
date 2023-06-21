/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment, useState } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import SeeMore from "../../pagination/more";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import OpportunitiesStyles from "../../../public/stylesheets/components/contents/profile/Opportunities.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Opportunities */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfileOpportunities = (opportunitiesProps: any) => {
    const { profile, states } = opportunitiesProps;
    const { translations } = states;
    const online = (profile.OPPORTUNITIES.LIST) ? profile.OPPORTUNITIES.LIST.map((opportunity: any) => (opportunity.STATE === "Online") ? opportunity : null).filter((opportunity: any) => opportunity !== null) : [];
    const finished = (profile.OPPORTUNITIES.LIST) ? profile.OPPORTUNITIES.LIST.map((opportunity: any) => (opportunity.STATE === "Finished") ? opportunity : null).filter((opportunity: any) => opportunity !== null) : [];
    return <div id="opportunities" className={ OpportunitiesStyles.container }>
        <h3>{ translations["Opportunités"] }</h3>
        <OpportunitiesContent { ...opportunitiesProps } opportunities={ online } state="Online"/>
        <OpportunitiesContent { ...opportunitiesProps } opportunities={ finished } state="Finished"/>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Opportunities ( Content ) */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const OpportunitiesContent = (opportunitiesProps: any) => {
    const { profile, opportunities, states, state } = opportunitiesProps;
    const { translations } = states;
    const [ expanded, setExpanded ] = useState(true);
    return <Fragment>
        <button onClick={ () => setExpanded(!expanded) } data-state={ state }>
            <div className={ OpportunitiesStyles.dot }></div>
            { (state === "Online") ? <span>{ translations["En cours"] + " (" + profile.OPPORTUNITIES.ONLINE + ")" }</span> : null }
            { (state === "Finished") ? <span>{ translations["Terminées"] + " (" + profile.OPPORTUNITIES.FINISHED + ")" }</span> : null }
            <div className="separator"></div>
            <i className={ "fa-solid fa-caret-right" + ((expanded) ? " expanded" : "") }/>
        </button>
        <div className={ OpportunitiesStyles.opportunities + ((expanded) ? " expanded" : "") }>
            { (opportunities.length > 0) ? <SeeMore { ...opportunitiesProps } list={ opportunities } type="opportunities" max={ 4 } display="grid"/> : null }
        </div>
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfileOpportunities;