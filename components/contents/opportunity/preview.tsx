/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, useEffect } from "react";
import { remainingTime } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Format from "../../texts/format";
import Tags from "../../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import PreviewStyles from "../../../public/stylesheets/components/contents/opportunity/Preview.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Preview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityPreview = ({ opportunity, states }: any) => {
    const { translations }: any = states;
    return <div className={ PreviewStyles.opportunityPreview }>
        <div className={ PreviewStyles.background }>
            { (opportunity.opportunity_background) ? <Image src={ opportunity.opportunity_background } width="3840" height="2160" alt={ translations["Bannière d'opportunité"] }/> : null }
        </div>
        <div className={ PreviewStyles.identification }>
            <div className={ PreviewStyles.logo }>
                <Image src={ opportunity.opportunity_owner_logo } width="120" height="120" alt={ translations["Logo d'entreprise"] }/>
            </div>
            <div className={ PreviewStyles.data }>
                <h3>{ opportunity.opportunity_owner_name + " — " }<span>{ opportunity.opportunity_name }</span></h3>
                <div className="opportunityType">
                    <span>{ (opportunity.opportunity_type) ? opportunity.opportunity_type[1].NAME : translations["Non-défini"] }</span>
                </div>
            </div>
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.informations }>
            { (opportunity.opportunity_endingdate) ? <p>{ translations["Expire le"] + " " + opportunity.opportunity_endingdate_display }</p> : null }
            <div style={ { margin: "0px 16px 0px 0px !important" } }>
                <i className="fa-light fa-calendar"/>
                <p>{ remainingTime(opportunity.remaining_time, opportunity.opportunity_startingdate, null, translations) }</p>
            </div>
            { (opportunity.opportunity_countries && opportunity.opportunity_countries.length <= 3) ? <p>{ translations["Localisation"] + " : " + ((opportunity.opportunity_countries)) ? opportunity.opportunity_countries.join(", ") : translations["Non-défini"] }</p> : null }
            { (opportunity.opportunity_countries && opportunity.opportunity_countries.length > 3) ? <p>{ translations["Localisation"] + " : " + ((opportunity.opportunity_countries)) ? opportunity.opportunity_countries.splice(0, 3).join(", ") + ", +" + opportunity.opportunity_countries.length : translations["Non-défini"] }</p> : null }
            { (opportunity.opportunity_privacy) ? <div>
                { (opportunity.opportunity_privacy === "Public") ? <i className="fa-light fa-eye"/> : <i className="fa-light fa-eye-slash"/> }
                <p>{ (opportunity.opportunity_privacy) ? (opportunity.opportunity_privacy.match(/(ext)/)) ? translations["Externe"] : opportunity.opportunity_privacy : translations["Non-défini"] }</p>
            </div> : null }
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.description }>
            <Format content={ opportunity.opportunity_desc }/>
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.eligibility }>
            <h4 className="mainTitleBold">{ translations["Critères d'éligibilité"] + " :" }</h4>
            <Format content={ opportunity.opportunity_eligibility }/>
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.tags }>
            { (opportunity.opportunity_category) ? <Tags tags={ Object.values(opportunity.opportunity_category) } main={ true }/> : null }
            { (opportunity.opportunity_tags) ? <Tags tags={ opportunity.opportunity_tags.split(",") }/> : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityPreview;