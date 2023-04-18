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
const OpportunityPreview = (opportunityPreviewProps: any) => {
    const { opportunity, states } = opportunityPreviewProps;
    const { translations, RGB } = states;
	const [ lightingState, setLightingState ] = useState("disabled");
    const [ localisations, setLocalisations ] = useState(translations["Localisations"] + " : ");
    const [ countriesCount, setCountriesCount ] = useState("");
    useEffect(() => {
        if(opportunity.COUNTRIES.length > 0 && opportunity.COUNTRIES.length <= 3) {
            setLocalisations(translations["Localisations"] + " : " + opportunity.COUNTRIES.map((country: any) => country.NAME).join(", "));
        } else if(opportunity.COUNTRIES.length <= 0) {
            setLocalisations(translations["Localisations"] + " : " + translations["Non renseigné"]);
        };
        if(opportunity.COUNTRIES.length > 3) {
            setLocalisations(translations["Localisations"] + " : " + opportunity.COUNTRIES.splice(0, 3).map((country: any) => country.NAME).join(", "));
            setCountriesCount(", +" + opportunity.COUNTRIES.length);
        };
    });
	useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [ RGB ]);
    return <div className={ PreviewStyles.opportunityPreview } data-rgb={ lightingState }>
        <div className={ PreviewStyles.background } data-opportunity-type={ opportunity.TYPE[0].ID }>
            { (opportunity.BACKGROUND) ? <Image src={ opportunity.BACKGROUND } alt="" width="3840" height="2160"/> : null }
        </div>
        <div className={ PreviewStyles.identification }>
            <div className={ PreviewStyles.logo }>
                <Image src={ opportunity.OWNERLOGO } alt="" width="120" height="120"/>
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
            { (opportunity.STARTINGDATE && opportunity.REMAINING) ? <div>
                <i className="fa-light fa-calendar"/>
                <p>{ remainingTime(opportunity.REMAINING, opportunity.STARTINGDATE, null, translations) }</p>
            </div> : null }
            <p>{ localisations + ((countriesCount) ? countriesCount : "") }</p>
            { (opportunity.PRIVACY) ? <div>
                { (opportunity.PRIVACY === "Public") ? <i className="fa-light fa-eye"/> : <i className="fa-light fa-eye-slash"/> }
                <p>{ (opportunity.PRIVACY) ? (opportunity.PRIVACY.match(/(ext)/)) ? translations["Externe"] : opportunity.PRIVACY : translations["Non renseigné"] }</p>
            </div> : null }
        </div>
        <div className="separator"/>
        <div className={ PreviewStyles.description }>
            { (opportunity.DESCRIPTION) ? <Format { ...opportunityPreviewProps } content={ opportunity.DESCRIPTION }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        <div className="separator"/>
        <div className={ PreviewStyles.eligibility }>
            <h4 className="mainTitleBold">{ translations["Critères d'éligibilité"] + " :" }</h4>
            { (opportunity.ELIGIBILITY) ? <Format { ...opportunityPreviewProps } content={ opportunity.ELIGIBILITY }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        { (opportunity.CATEGORIES.length > 0 || structureTags(opportunity.TAGS)) ? <Fragment>
            <div className="separator"/>
            <div className={ PreviewStyles.tags }>
                { (opportunity.CATEGORIES.length > 0) ? <Tags tags={ Object.values(opportunity.CATEGORIES) } main={ true }/> : null }
                { (structureTags(opportunity.TAGS)) ? <Tags tags={ structureTags(opportunity.TAGS) }/> : null }
            </div>
        </Fragment> : null }
        <Attachments { ...opportunityPreviewProps } attachments={ opportunity.ATTACHMENTS }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityPreview;