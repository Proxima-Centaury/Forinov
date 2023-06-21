/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst, remainingTime } from "../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Tags from "../tags/tags";
import Button from "../buttons/button";
import Format from "../texts/format";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import OpportunityStyles from "../../public/stylesheets/components/cards/Opportunity.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Opportunity Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const OpportunityCard = (opportunityProps: any) => {
    const { opportunity, opportunityLink, carouselItem, details, states } = opportunityProps;
    const { translations } = states;
    return <div className={ OpportunityStyles.card }>
        <div className={ OpportunityStyles.banner } data-opportunity-type={ (opportunity.TYPE) ? opportunity.TYPE[0].ID : "" }>
            { (opportunity.BACKGROUND) ? <Image src={ opportunity.BACKGROUND } alt={ translations["Image d'illustration de l'opportunité : "] + opportunity.TITLE } width="3840" height="2160"/> : null }
            { (opportunity.LANGUAGE === "en") ? <div className={ OpportunityStyles.informations }>
                <p>{ translations["Anglais"] }</p>
            </div> : null }
            { (opportunity.OFFER) ? <h5>{ opportunity.OFFER }</h5> : null }
            { (opportunity.CATCH) ? <p>{ opportunity.CATCH }</p> : null }
            { (opportunityLink && carouselItem) ? <Button button={ ButtonStyles.callToActionNegative } href={ opportunityLink } icon="fa-light fa-eye" text={ translations["Voir plus"] }/> : null }
        </div>
        <div className={ OpportunityStyles.content }>
            { (opportunity.OWNERLOGO) ? <div className={ OpportunityStyles.leftContainer }>
                <Image src={ opportunity.OWNERLOGO } alt={ translations["Logo de l'entreprise "] + opportunity.OWNERNAME } width="64" height="64"/>
            </div> : null }
            <div className={ OpportunityStyles.rightContainer }>
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
                    <h3>{ (opportunity.TITLE) ? opportunity.TITLE : translations["Nom non-défini"] }</h3>
                </div>
                { (opportunity.TYPE) ? <div className={ OpportunityStyles.type } data-opportunity-type={ opportunity.TYPE[0].ID || "" }>
                    <Tags tags={ opportunity.TYPE } main={ true }/>
                </div> : null }
                <div className="separator"></div>
                { (opportunity.REMAINING) ? <div className={ OpportunityStyles.remainingTime }>
                    <i className="fa-light fa-calendar"/>
                    <p>{ remainingTime(opportunity.REMAINING, null, null, translations) }</p>
                </div> : null }
                { (opportunity.FORINOV) ? <div className={ OpportunityStyles.forinovOnly }>
                    <i className="fa-solid fa-users"/>
                    <p>Membres Forinov uniquement</p>
                </div> : null }
                { (details) ? <Format { ...opportunityProps } content={ opportunity.DESCRIPTION }/> : null }
            </div>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default OpportunityCard;