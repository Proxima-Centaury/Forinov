/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useEffect, useState } from "react";
import { remainingTime, structureTags } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Format from "../../texts/format";
import Tags from "../../tags/tags";
import Attachments from "../../attachments/attachments";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import PreviewStyles from "../../../public/stylesheets/components/contents/opportunity/Preview.module.css";
import OpportunityStyles from "../../../public/stylesheets/components/cards/Opportunity.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Preview */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityPreview = (pageProps: any) => {
    const { opportunity, states } = pageProps;
    const { translations, RGB } = states;
	const [ lightingState, setLightingState ] = useState("disabled");
    const backgroundAlt = translations["Bannière d'opportunité"] + ".";
    const countries = opportunity.COUNTRIES;
    const localisationsText = translations["Localisations"] + " : ";
    const countriesList = localisationsText + countries.join(", ");
    const countriesCount = localisationsText + countries.splice(0, 3).join(", ") + ", +" + countries.length;
	useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [ RGB ]);
    return <div className={ PreviewStyles.opportunityPreview } data-rgb={ lightingState }>
        <div className={ PreviewStyles.background } data-opportunity-type={ opportunity.TYPE[0].ID }>
            { (opportunity.BACKGROUND) ? <Image src={ opportunity.BACKGROUND } width="3840" height="2160" alt={ backgroundAlt }/> : null }
        </div>
        <div className={ PreviewStyles.identification }>
            <div className={ PreviewStyles.logo }>
                <Image src={ opportunity.OWNERLOGO } width="120" height="120" alt={ translations["Logo d'entreprise"] + "." }/>
            </div>
            <div className={ PreviewStyles.data }>
                <h3>{ opportunity.OWNERNAME + " — " }<span>{ opportunity.TITLE }</span></h3>
                <div className={ OpportunityStyles.type } data-opportunity-type={ opportunity.TYPE[0].ID }>
                    <Tags tags={ opportunity.TYPE } main={ true }/>
                </div>
            </div>
        </div>
        <div className="separator"/>
        <div className={ PreviewStyles.informations }>
            { (opportunity.ENDINGDATE) ? <p>{ translations["Expire le"] + " " + opportunity.ENDINGDATEDISPLAY }</p> : null }
            { (opportunity.STARTINGDATE && opportunity.REMAINING) ? <div>
                <i className="fa-light fa-calendar"/>
                <p>{ remainingTime(opportunity.REMAINING, opportunity.STARTINGDATE, null, translations) }</p>
            </div> : null }
            { (countries.length > 0 && countries.length <= 3) ? <p>{ countriesList }</p> : <p>{ localisationsText + translations["Non renseigné"] }</p> }
            { (countries.length > 3) ? <p>{ countriesCount }</p> : null }
            { (opportunity.PRIVACY) ? <div>
                { (opportunity.PRIVACY === "Public") ? <i className="fa-light fa-eye"/> : <i className="fa-light fa-eye-slash"/> }
                <p>{ (opportunity.PRIVACY) ? (opportunity.PRIVACY.match(/(ext)/)) ? translations["Externe"] : opportunity.PRIVACY : translations["Non renseigné"] }</p>
            </div> : null }
        </div>
        <div className="separator"/>
        <div className={ PreviewStyles.description }>
            { (opportunity.DESCRIPTION) ? <Format content={ opportunity.DESCRIPTION }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        <div className="separator"/>
        <div className={ PreviewStyles.eligibility }>
            <h4 className="mainTitleBold">{ translations["Critères d'éligibilité"] + " :" }</h4>
            { (opportunity.ELIGIBILITY) ? <Format content={ opportunity.ELIGIBILITY }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        { (opportunity.CATEGORIES.length > 0 || structureTags(opportunity.TAGS)) ? <Fragment>
            <div className="separator"/>
            <div className={ PreviewStyles.tags }>
                { (opportunity.CATEGORIES.length > 0) ? <Tags tags={ Object.values(opportunity.CATEGORIES) } main={ true }/> : null }
                { (structureTags(opportunity.TAGS)) ? <Tags tags={ structureTags(opportunity.TAGS) }/> : null }
            </div>
        </Fragment> : null }
        <Attachments { ...pageProps } attachments={ opportunity.ATTACHMENTS }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityPreview;