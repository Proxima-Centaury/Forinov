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
    const { translations }: any = states;
    return <div className={ LinksStyles.container }>
        <div>
            <Link href={ "/" } className={ ButtonStyles.callToActionStep }>
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
        <Link href={ "/" } className={ ButtonStyles.callToActionWide }>
            <i className="fa-light fa-file-signature"/>
            <p>{ translations["Postuler"] }</p>
        </Link>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default OpportunityLinks;