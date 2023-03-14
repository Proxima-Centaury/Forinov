/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import EntityCard from "../../cards/entity";
import Tags from "../../tags/tags";
import Button from "../../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import EcosystemStyles from "../../../public/stylesheets/components/contents/profile/Ecosystem.module.css";
import EntityStyles from "../../../public/stylesheets/components/cards/Entity.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystem = (pageProps: any) => {
    const { profile, states, router }: any = pageProps;
    const { lock, translations }: any = states;
    const { type }: any = router.query;
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + EntityStyles.client, profile.CLIENTS, 4);
    /* --------------------------- */
    /* Properties */
    /* --------------------------- */
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    /* --------------------------- */
    /* More Or Less Button */
    /* --------------------------- */
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], (type.match(/(startup)/)) ? profile.CLIENTS.length - 4 : 0 ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div id="ecosystem" className={ EcosystemStyles.ecosystem }>
        <h3>{ (type.match(/(startup)/)) ? translations["Marché et écosystème"] : translations["Écosystème et partenaires"] }</h3>
        { (type.match(/(startup)/)) ? <div className={ EcosystemStyles.content }>
            <p className={ EcosystemStyles.label }>{ translations["Nos références clients"] + " (" + profile.CLIENTS.length + ")" }</p>
            <div className={ EcosystemStyles.list + ((lock) ? " locked" : "") } data-type="list">
                { (profile.CLIENTS.length > 0) ? profile.CLIENTS.map((client: any, key: KeyType) => {
                    const url = "/";
                    return <Link key={ key } href={ url }>
                        <EntityCard { ...pageProps } entity={ client } index={ key + 1 } maxVisibleByDefault={ 4 }/>
                    </Link>;
                }) : null }
                { (lock) ? <div className="lockedContent">
                    <i className="fa-solid fa-lock"/>
                    <p>{ translations["Consultez les clients de cette startup"] }</p>
                </div> : null }
            </div>
            { (profile.CLIENTS.length > 4) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileEcosystem;