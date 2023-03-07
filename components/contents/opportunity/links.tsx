/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Carousel from "../../carousels/carousel";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import LinksStyles from "../../../public/stylesheets/components/contents/opportunity/Links.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Links */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityLinks = (pageProps: any) => {
    const { opportunity, states, router }: any = pageProps;
    const { translations }: any = states;
    const { domainLocales }: any = router;
    const { domain }: any = domainLocales[0];
    const opportunityUrl = domain + router.asPath;
    const mailToSubject = "?subject=Opportunité Forinov";
    const mailToBody = "&body=Lien vers l'opportunité : " + opportunityUrl;
    return <div className={ LinksStyles.container }>
        <div className={ LinksStyles.actions }>
            <Link className={ ButtonStyles.callToActionStep } href={ "mailto:" + mailToSubject + mailToBody + "." }>
                <i className="fa-light fa-chart-network"/>
                <p>{ translations["Partager"] }</p>
            </Link>
            { (opportunity.ICS) ? <Link className={ ButtonStyles.callToActionStep } href={ opportunity.ICS }>
                <i className="fa-light fa-calendar"/>
                <p>{ translations["Ajouter à mon calendrier"] }</p>
            </Link> : null }
            <Link className={ ButtonStyles.callToActionStep } href="/directories/opportunities">
                <i className="fa-light fa-star"/>
                <p>{ translations["Voir toutes les opportunités"] }</p>
            </Link>
        </div>
        <Link className={ ButtonStyles.callToActionWide } href="/login">
            <i className="fa-light fa-file-signature"/>
            <p>{ translations["Postuler"] }</p>
        </Link>
        <h3>{ translations["Autres opportunités de"] + " " + opportunity.OWNERNAME }</h3>
        <Carousel states={ states } component="LatestOpportunities" data={ opportunity.MOREOPPORTUNITIES }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityLinks;