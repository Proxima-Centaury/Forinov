/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import LinksStyles from "../../../public/stylesheets/components/contents/opportunity/Links.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity Links */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const OpportunityLinks = ({ states }: any) => {
    const router = useRouter();
    const { translations }: any = states;
    const { domainLocales }: any = router;
    const { domain }: any = domainLocales[0];
    const opportunityUrl = domain + router.asPath;
    const mailToSubject = "?subject=Opportunité Forinov";
    const mailToBody = "&body=Lien vers l'opportunité : " + opportunityUrl;
    return <div className={ LinksStyles.container }>
        <div>
            <Link href={ "mailto:" + mailToSubject + mailToBody + "." } className={ ButtonStyles.callToActionStep }>
                <i className="fa-light fa-chart-network"/>
                <p>{ translations["Partager"] }</p>
            </Link>
            <Link href={ "/" } className={ ButtonStyles.callToActionStep }>
                <i className="fa-light fa-calendar"/>
                <p>{ translations["Ajouter à mon calendrier"] }</p>
            </Link>
            <Link href={ "/directories/opportunities" } className={ ButtonStyles.callToActionStep }>
                <i className="fa-light fa-star"/>
                <p>{ translations["Voir toutes les opportunités"] }</p>
            </Link>
        </div>
        <Link href={ "/login" } className={ ButtonStyles.callToActionWide }>
            <i className="fa-light fa-file-signature"/>
            <p>{ translations["Postuler"] }</p>
        </Link>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityLinks;