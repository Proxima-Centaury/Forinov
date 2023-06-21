/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Key } from "react";
import { formatNameForUrl } from "../../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
import EntityCard from "../../cards/entity";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import EcosystemStyles from "../../../public/stylesheets/components/contents/profile/Ecosystem.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Ecosystem */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfileEcosystem = (ecosystemProps: any) => {
    const { profile, states, router } = ecosystemProps;
    const { lock, translations } = states;
    const { type } = router.query;
    return <div id="ecosystem" className={ EcosystemStyles.ecosystem }>
        <h3>{ (type.match(/(startups)/)) ? translations["Marché et écosystème"] : translations["Écosystème et partenaires"] }</h3>
        { (type.match(/(startups)/)) ? <div className={ EcosystemStyles.content }>
            <p className={ EcosystemStyles.label }>{ translations["Nos références clients"] + " (" + profile.CLIENTS.length + ")" }</p>
            <div className={ "grid twoColumns" + ((lock) ? " locked" : "") }>
                { (profile.CLIENTS.length > 0) ? profile.CLIENTS.map((client: any, key: Key) => <Link key={ key } href={ "/directories/corporates/" + formatNameForUrl(client.NAME) + "_" + client.ID }>
                    <EntityCard { ...ecosystemProps } entity={ client } type="corporate" details/>
                </Link>) : null }
                { (lock) ? <div className="lockedContent">
                    <i className="fa-solid fa-lock"/>
                    <p>{ translations["Consultez les clients de cette startup"] }</p>
                </div> : null }
            </div>
            <div className={ EcosystemStyles.wishlist }>
                <p className={ EcosystemStyles.label }>
                    <i className="fa-solid fa-heart-circle-plus"/>
                    { translations["Notre wishlist : ceux dont nous rêvons"] }
                </p>
                { (profile.WISHLIST) ? <Tags tags={ profile.WISHLIST } alternative={ true } lock={ lock } count={ false }/> : null }
            </div>
        </div> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfileEcosystem;