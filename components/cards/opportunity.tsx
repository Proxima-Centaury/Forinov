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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityCard = ({ opportunity, index, maxVisibleByDefault, translations, RGB }: any) => {
    const ownerLogo = opportunity.opportunity_owner_logo || null;
    const ownerName = opportunity.opportunity_owner_name || null;
    const id = opportunity.opportunity_id || null;
    const title = opportunity.opportunity_name || null;
    const type = opportunity.opportunity_type[0] || null;
    const language = opportunity.opportunity_lang || null;
    const privacy = opportunity.opportunity_privacy || null;
    const description = opportunity.opportunity_desc || null;
    const remainingTimeString = opportunity.remaining_time || null;
    const background = opportunity.opportunity_background || null;
    return <Link href={ "/directories/opportunities/categories/" + formatNameForUrl(type.NAME) + "_" + type.ID + "/" + formatNameForUrl(title) + "_" + id } className={ OpportunityStyles.opportunity + ((index > maxVisibleByDefault) ? " hidden" : "") } data-card="opportunity" data-index={ index - 1 } data-rgb={ (RGB) ? "enabled" : "disabled" }>
        <div className={ OpportunityStyles.background } data-opportunity-type={ type.ID || "" }>
            { (background) ? <Image src={ background } alt={ "Image de fond de l'opportunité " + title + "." } width="3840" height="2160"/> : null }
            { (language === "en") ? <div className={ OpportunityStyles.informations }>
                <p>{ translations["Anglais"] }</p>
            </div> : null }
        </div>
        <div className={ OpportunityStyles.content }>
            { (ownerLogo) ? <div className={ OpportunityStyles.right }>
                <Image src={ ownerLogo } width="64" height="64" alt={ ownerName + " logo." }/>
            </div> : null }
            <div className={ OpportunityStyles.left }>
                <div className={ OpportunityStyles.top }>
                    { (ownerName) ? <div className={ OpportunityStyles.author }>
                        <p>{ ownerName }</p>
                    </div> : null }
                    <div className={ OpportunityStyles.privacy }>
                        <i className="fa-light fa-eye"/>
                        <p>{ (privacy) ? (privacy.match(/(ext)/)) ? translations["Externe"] : uppercaseFirst(privacy) : translations["Confidentialité non-définie"] }</p>
                    </div>
                </div>
                <h3>{ (title) ? uppercaseFirst(title) : translations["Nom non-défini"] }</h3>
                { (type) ? <div className={ OpportunityStyles.type } data-opportunity-type={ type.ID || "" }>
                    <Tags tags={ type } main={ true }/>
                </div> : null }
                <div className="separator"></div>
                { (remainingTimeString) ? <div className={ OpportunityStyles.remainingTime }>
                    <i className="fa-light fa-calendar"/>
                    <p>{ remainingTime(remainingTimeString, null, null, translations) }</p>
                </div> : null }
                <div className="formattedContent">
                    <p>{ description }</p>
                </div>
            </div>
        </div>
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityCard;