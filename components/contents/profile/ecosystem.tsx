/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityCard from "../../cards/entity";
import Tags from "../../tags/tags";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import EcosystemStyles from "../../../public/stylesheets/components/contents/profile/Ecosystem.module.css";
import EntityStyles from "../../../public/stylesheets/components/cards/Entity.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystem = ({ type, profile, states }: any) => {
    const { lock, translations }: any = states;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const { CLIENTS } = profile;
    const { WISHLIST } = profile;
    const clients = CLIENTS || [];
    const wishlist = WISHLIST || [];
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + EntityStyles.client, clients, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], clients.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div id="ecosystem" className={ EcosystemStyles.ecosystem }>
        <h3>{ (type === "startup") ? translations["Marché et écosystème"] : translations["Écosystème et partenaires"] }</h3>
        { (type === "startup") ? <div className={ EcosystemStyles.content }>
            <p className={ EcosystemStyles.label }>{ translations["Nos références clients"] + " (" + clients.length + ")" }</p>
            <div className={ EcosystemStyles.list + ((lock) ? " locked" : "") } data-type="list">
                { (clients) ? clients.map((client: any, key: KeyType) => {
                    const entity = client;
                    const type = "client";
                    const index = key + 1;
                    const maxVisibleByDefault = maxVisibleCardsByDefault;
                    const cardProps = { entity, type, index, maxVisibleByDefault };
                    return <EntityCard key={ key } { ...cardProps }/>;
                }) : null }
                { (lock) ? <div className="lockedContent">
                    <i className="fa-solid fa-lock"/>
                    <p>{ translations["Consultez les clients de cette startup"] }</p>
                </div> : null }
            </div>
            { (clients.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
            <div className={ EcosystemStyles.wishlist }>
                <p className={ EcosystemStyles.label }>
                    <i className="fa-solid fa-heart-circle-plus"/>
                    { translations["Notre wishlist : ceux dont nous rêvons"] }
                </p>
                { (wishlist) ? <Tags tags={ wishlist } alternative={ true } lock={ lock } count={ false }/> : null }
            </div>
        </div> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileEcosystem;