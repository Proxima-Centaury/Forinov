/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Carousel from "../../carousels/carousel";
import Button from "../../buttons/button";
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
            <Button button={ ButtonStyles.callToActionStep } href={ "mailto:" + mailToSubject + mailToBody + "." } icon="fa-light fa-chart-network" text={ translations["Partager"] }/>
            { (opportunity.ICS) ? <Button button={ ButtonStyles.callToActionStep } href={ opportunity.ICS } icon="fa-light fa-calendar" text={ translations["Ajouter à mon calendrier"] }/> : null }
            <Button button={ ButtonStyles.callToActionStep } href="/directories/opportunities/categories" icon="fa-light fa-star" text={ translations["Voir toutes les opportunités"] }/>
        </div>
        <Button button={ ButtonStyles.callToActionWide } href="/login" icon="fa-light fa-file-signature" text={ translations["Postuler"] }/>
        <h3>{ translations["Autres opportunités de"] + " " + opportunity.OWNERNAME }</h3>
        <Carousel states={ states } component="LatestOpportunities" data={ opportunity.MOREOPPORTUNITIES }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityLinks;