/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { seeMoreOrLess, buildProperties, uppercaseFirst, remainingTime } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Tags from "../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import OpportunityStyles from "../../public/stylesheets/components/cards/Opportunity.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityCard = ({ opportunity, index, maxVisibleByDefault, translations }: any) => {
    const {
        opportunity_id,
        opportunity_type,
        opportunity_background,
        opportunity_lang,
        opportunity_name,
        opportunity_privacy,
        remaining_time
    }: any = opportunity;
    return <Link href={ "" } className={ OpportunityStyles.opportunity + ((index > maxVisibleByDefault) ? " hidden" : "") } target="_blank">
        <div className={ OpportunityStyles.background } data-type={ (opportunity_type && opportunity_type.ID) ? opportunity_type.ID : "" }>
            { (opportunity_background) ? <Image src={ opportunity_background } alt={ "Image de fond de l'opportunité " + opportunity_name + "." } width="3840" height="2160"/> : null }
            { (opportunity_lang === "en") ? <div className={ OpportunityStyles.informations }>
                <p>{ translations["Anglais"] }</p>
            </div> : null }
        </div>
        <div className={ OpportunityStyles.content }>
            <div className={ OpportunityStyles.privacy }>
                <i className="fa-light fa-eye"/>
                <p>{ (opportunity_privacy) ? (opportunity_privacy.match(/(ext)/)) ? translations["Externe"] : uppercaseFirst(opportunity_privacy) : translations["Confidentialité non-définie"] }</p>
            </div>
            <h3>{ (opportunity_name) ? uppercaseFirst(opportunity_name) : translations["Nom non-défini"] }</h3>
            <div className={ OpportunityStyles.type } data-type={ (opportunity_type && opportunity_type.ID) ? opportunity_type.ID : "" }>
                <Tags tags={ Object.entries({ "0": opportunity.opportunity_type.NAME }) } main={ true }/>
            </div>
            <div className="separator"></div>
            <div className={ OpportunityStyles.remainingTime }>
                <i className="fa-solid fa-calendar"/>
                <p>{ remainingTime(remaining_time, null, null, translations) }</p>
            </div>
        </div>
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityCard;