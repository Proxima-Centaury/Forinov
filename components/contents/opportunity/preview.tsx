/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { remainingTime } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Link from "next/link";
import Format from "../../texts/format";
import Tags from "../../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../../../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import PreviewStyles from "../../../public/stylesheets/components/contents/opportunity/Preview.module.css";
import OpportunityStyles from "../../../public/stylesheets/components/cards/Opportunity.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Preview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityPreview = ({ opportunity, states }: any) => {
    const { translations, RGB }: any = states;
    const ownerLogo = opportunity.opportunity_owner_logo || null;
    const ownerName = opportunity.opportunity_owner_name || null;
    const title = opportunity.opportunity_name || null;
    const type = opportunity.opportunity_type || null;
    const category = opportunity.opportunity_category || null;
    const tags = (opportunity.opportunity_tags) ? opportunity.opportunity_tags.split(",").map((tag: any, key: KeyType) => ({ ID: key, NAME: tag })) : null;
    const privacy = opportunity.opportunity_privacy || null;
    const description = opportunity.opportunity_desc || null;
    const eligibility = opportunity.opportunity_eligibility || null;
    const attachments = Object.values(opportunity.opportunity_attachments) || null;
    const startingDate = opportunity.opportunity_startingdate || null;
    const endingDate = opportunity.opportunity_endingdate || null;
    const endingDateDisplay = opportunity.opportunity_endingdate_display || null;
    const remainingTimeString = opportunity.remaining_time || null;
    const countries = (opportunity.opportunity_country) ? Object.values(opportunity.opportunity_country).map((country: any) => country.NAME) : null;
    const background = opportunity.opportunity_background || null;
    console.log(attachments)
    return <div className={ PreviewStyles.opportunityPreview }>
        <div className={ PreviewStyles.background } data-opportunity-type={ type[0].ID || "" } data-rgb={ (RGB) ? "enabled" : "disabled" }>
            { (background) ? <Image src={ background } width="3840" height="2160" alt={ translations["Bannière d'opportunité"] + "." }/> : null }
        </div>
        <div className={ PreviewStyles.identification }>
            <div className={ PreviewStyles.logo }>
                <Image src={ ownerLogo } width="120" height="120" alt={ translations["Logo d'entreprise"] + "." }/>
            </div>
            <div className={ PreviewStyles.data }>
                <h3>{ ownerName + " — " }<span>{ title }</span></h3>
                <div className={ OpportunityStyles.type } data-opportunity-type={ type[0].ID || "" }>
                    <Tags tags={ type } main={ true }/>
                </div>
            </div>
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.informations }>
            { (endingDate) ? <p>{ translations["Expire le"] + " " + endingDateDisplay }</p> : null }
            { (startingDate && remainingTimeString) ? <div style={ { margin: "0px 16px 0px 0px !important" } }>
                <i className="fa-light fa-calendar"/>
                <p>{ remainingTime(remainingTimeString, startingDate, null, translations) }</p>
            </div> : null }
            { (countries && countries.length <= 3) ? <p>{ translations["Localisations"] + " : " + ((countries) ? countries.join(", ") : translations["Non-défini"]) }</p> : null }
            { (countries && countries.length > 3) ? <p>{ translations["Localisations"] + " : " + ((countries) ? countries.splice(0, 3).join(", ") + ", +" + countries.length : translations["Non-défini"]) }</p> : null }
            { (privacy) ? <div>
                { (privacy === "Public") ? <i className="fa-light fa-eye"/> : <i className="fa-light fa-eye-slash"/> }
                <p>{ (privacy) ? (privacy.match(/(ext)/)) ? translations["Externe"] : privacy : translations["Non-défini"] }</p>
            </div> : null }
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.description }>
            { (description) ? <Format content={ description }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.eligibility }>
            <h4 className="mainTitleBold">{ translations["Critères d'éligibilité"] + " :" }</h4>
            { (eligibility) ? <Format content={ eligibility }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        <div className="separator"></div>
        <div className={ PreviewStyles.tags }>
            { (category) ? <Tags tags={ Object.values(category) } main={ true }/> : null }
            { (tags) ? <Tags tags={ tags }/> : null }
        </div>
        { (attachments.length > 0) ? <div className="separator"></div> : null }
        { (attachments.length > 0) ? <div className={ PreviewStyles.attachments }>
            { attachments.map(({ name, url, size }: any, key: number) => <Link key={ key } href={ config.host + url } className={ ButtonStyles.classicLink } target={ "_blank" }>
                <i className="fa-light fa-cloud-download"/>
                <p>{ name }</p>
            </Link>) }
        </div> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityPreview;