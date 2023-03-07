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
const OpportunityCard = (pageProps: any) => {
    const { opportunity, index, maxVisibleByDefault, states }: any = pageProps;
    const { translations, RGB }: any = states;
    const opportunityClass = OpportunityStyles.opportunity + ((index > maxVisibleByDefault) ? " hidden" : "");
    const opportunityBackgroundAlt = "Image de fond de l'opportunité " + opportunity.TITLE + ".";
    const opportunityPrivacy = (opportunity.PRIVACY.match(/(ext)/)) ? translations["Externe"] : uppercaseFirst(opportunity.PRIVACY);
    return <div className={ opportunityClass } data-index={ index - 1 } data-rgb={ (RGB) ? "enabled" : "disabled" }>
        <div className={ OpportunityStyles.background } data-opportunity-type={ opportunity.TYPE[0].ID || "" }>
            { (opportunity.BACKGROUND) ? <Image src={ opportunity.BACKGROUND } alt={ opportunityBackgroundAlt } width="3840" height="2160"/> : null }
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
                        <p>{ (opportunity.PRIVACY) ? opportunityPrivacy : translations["Confidentialité non-définie"] }</p>
                    </div>
                </div>
                <h3>{ (opportunity.TITLE) ? uppercaseFirst(opportunity.TITLE) : translations["Nom non-défini"] }</h3>
                { (opportunity.TYPE) ? <div className={ OpportunityStyles.type } data-opportunity-type={ opportunity.TYPE[0].ID || "" }>
                    <Tags tags={ opportunity.TYPE } main={ true }/>
                </div> : null }
                <div className="separator"></div>
                { (opportunity.REMAINING) ? <div className={ OpportunityStyles.remainingTime }>
                    <i className="fa-light fa-calendar"/>
                    <p>{ remainingTime(opportunity.REMAINING, null, null, translations) }</p>
                </div> : null }
                <p>{ opportunity.DESCRIPTION }</p>
            </div>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityCard;