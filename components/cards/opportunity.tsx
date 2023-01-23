/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { uppercaseFirst, remainingTime, formatNameForUrl } from "../../scripts/utilities";
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
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityCard = ({ opportunity, index, maxVisibleByDefault, translations, RGB }: any) => {
    const {
        opportunity_id,
        opportunity_author_name,
        opportunity_author_logo,
        opportunity_type,
        opportunity_background,
        opportunity_lang,
        opportunity_name,
        opportunity_privacy,
        remaining_time,
        opportunity_desc
    }: any = opportunity;
    return <Link href={ "/directories/opportunities/" + formatNameForUrl(opportunity_name) + "_" + opportunity_id } className={ OpportunityStyles.opportunity + ((index > maxVisibleByDefault) ? " hidden" : "") } data-card="opportunity" data-index={ index - 1 } data-rgb={ (RGB) ? "enabled" : "disabled" }>
        <div className={ OpportunityStyles.background } data-opportunity-type={ (opportunity_type && opportunity_type.ID) ? opportunity_type.ID : "" }>
            { (opportunity_background) ? <Image src={ opportunity_background } alt={ "Image de fond de l'opportunité " + opportunity_name + "." } width="3840" height="2160"/> : null }
            { (opportunity_lang === "en") ? <div className={ OpportunityStyles.informations }>
                <p>{ translations["Anglais"] }</p>
            </div> : null }
        </div>
        <div className={ OpportunityStyles.content }>
            { (opportunity_author_logo) ? <div className={ OpportunityStyles.right }>
                <Image src={ opportunity_author_logo } width="64" height="64" alt={ opportunity_author_name + " logo." }/>
            </div> : null }
            <div className={ OpportunityStyles.left }>
                <div className={ OpportunityStyles.top }>
                    { (opportunity_author_name) ? <div className={ OpportunityStyles.author }>
                        <p>{ opportunity_author_name }</p>
                    </div> : null }
                    <div className={ OpportunityStyles.privacy }>
                        <i className="fa-light fa-eye"/>
                        <p>{ (opportunity_privacy) ? (opportunity_privacy.match(/(ext)/)) ? translations["Externe"] : uppercaseFirst(opportunity_privacy) : translations["Confidentialité non-définie"] }</p>
                    </div>
                </div>
                <h3>{ (opportunity_name) ? uppercaseFirst(opportunity_name) : translations["Nom non-défini"] }</h3>
                { (opportunity.opportunity_type) ? <div className={ OpportunityStyles.type } data-opportunity-type={ (opportunity_type && opportunity_type.ID) ? opportunity_type.ID : "" }>
                    <Tags tags={ Object.entries({ "0": opportunity.opportunity_type.NAME }) } main={ true }/>
                </div> : null }
                <div className="separator"></div>
                { (remaining_time) ? <div className={ OpportunityStyles.remainingTime }>
                    <i className="fa-solid fa-calendar"/>
                    <p>{ remainingTime(remaining_time, null, null, translations) }</p>
                </div> : null }
                <div className="formattedContent">
                    <p>{ opportunity_desc }</p>
                </div>
            </div>
        </div>
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityCard;