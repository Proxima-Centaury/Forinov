/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { uppercaseFirst, remainingTime } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Tags from "../tags/tags";
import Format from "../texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import OpportunityStyles from "../../public/stylesheets/components/cards/Opportunity.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityCard = (opportunityProps: any) => {
    const { opportunity, states } = opportunityProps;
    const { translations } = states;
    return <div className={ OpportunityStyles.card }>
        <div className={ OpportunityStyles.background } data-opportunity-type={ opportunity.TYPE[0].ID || "" }>
            { (opportunity.BACKGROUND) ? <Image src={ opportunity.BACKGROUND } alt={ "Image de fond de l'opportunité " + opportunity.TITLE + "." } width="3840" height="2160"/> : null }
            { (opportunity.LANGUAGE === "en") ? <div className={ OpportunityStyles.informations }>
                <p>{ translations["Anglais"] }</p>
            </div> : null }
        </div>
        <div className={ OpportunityStyles.content }>
            { (opportunity.OWNERLOGO) ? <div className={ OpportunityStyles.rightContainer }>
                <Image src={ opportunity.OWNERLOGO } width="64" height="64" alt={ opportunity.OWNERNAME + " logo." }/>
            </div> : null }
            <div className={ OpportunityStyles.leftContainer }>
                <div className={ OpportunityStyles.top }>
                    { (opportunity.OWNERNAME) ? <div className={ OpportunityStyles.author }>
                        <p>{ opportunity.OWNERNAME }</p>
                    </div> : null }
                    <div className={ OpportunityStyles.privacy }>
                        <i className="fa-light fa-eye"/>
                        <p>{ (opportunity.PRIVACY) ? (opportunity.PRIVACY.match(/(ext)/)) ? translations["Externe"] : uppercaseFirst(opportunity.PRIVACY) : translations["Confidentialité non-définie"] }</p>
                    </div>
                </div>
                <div className={ OpportunityStyles.title } data-type="tooltip" data-tooltip={ opportunity.TITLE }>
                    <h3>{ (opportunity.TITLE) ? uppercaseFirst(opportunity.TITLE) : translations["Nom non-défini"] }</h3>
                </div>
                { (opportunity.TYPE) ? <div className={ OpportunityStyles.type } data-opportunity-type={ opportunity.TYPE[0].ID || "" }>
                    <Tags tags={ opportunity.TYPE } main={ true }/>
                </div> : null }
                <div className="separator"></div>
                { (opportunity.REMAINING) ? <div className={ OpportunityStyles.remainingTime }>
                    <i className="fa-light fa-calendar"/>
                    <p>{ remainingTime(opportunity.REMAINING, null, null, translations) }</p>
                </div> : null }
                <Format content={ opportunity.DESCRIPTION }/>
            </div>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityCard;