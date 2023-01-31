/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Carousel from "../../carousels/carousel";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LinksStyles from "../../../public/stylesheets/components/contents/opportunity/Links.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Links */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityLinks = ({ opportunity, states }: any) => {
    const router = useRouter();
    const { translations }: any = states;
    const { domainLocales }: any = router;
    const { domain }: any = domainLocales[0];
    const ownerName = opportunity.opportunity_owner_name || null;
    const ics = opportunity.opportunity_ics_url || null;
    const opportunities = Object.values(opportunity.others_opportunities) || null;
    const opportunityUrl = domain + router.asPath;
    const mailToSubject = "?subject=Opportunité Forinov";
    const mailToBody = "&body=Lien vers l'opportunité : " + opportunityUrl;
    console.log(opportunities)
    return <div className={ LinksStyles.container }>
        <div>
            <Link href={ "mailto:" + mailToSubject + mailToBody + "." } className={ ButtonStyles.callToActionStep }>
                <i className="fa-light fa-chart-network"/>
                <p>{ translations["Partager"] }</p>
            </Link>
            { (ics) ? <Link href={ ics } className={ ButtonStyles.callToActionStep }>
                <i className="fa-light fa-calendar"/>
                <p>{ translations["Ajouter à mon calendrier"] }</p>
            </Link> : null }
            <Link href={ "/directories/opportunities" } className={ ButtonStyles.callToActionStep }>
                <i className="fa-light fa-star"/>
                <p>{ translations["Voir toutes les opportunités"] }</p>
            </Link>
        </div>
        <Link href={ "/login" } className={ ButtonStyles.callToActionWide }>
            <i className="fa-light fa-file-signature"/>
            <p>{ translations["Postuler"] }</p>
        </Link>
        <h3>{ translations["Autres opportunités de"] + " " + ownerName }</h3>
        <Carousel states={ states } component={ "LatestOpportunities" } data={ opportunities }/>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityLinks;