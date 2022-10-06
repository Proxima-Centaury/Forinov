/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import EntityCard from "../../cards/entity";
import Tags from "../../tags/tags";
import Button from "../../buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystem = ({ profile, lock, translations }) => {
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const { CLIENTS } = profile;
    const { WISHLIST } = profile;
    const clients = CLIENTS || [];
    const wishlist = WISHLIST || [];
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".client", clients, maxVisibleCardsByDefault);
    const buttonsProps = [
        { type: "moreOrLess", action: handleView, text: translations["Voir plus"], count: clients.length - maxVisibleCardsByDefault }
    ];
    if(clients) {
        return <div id="ecosystem" className="profileEcosystem">
            <h3>{ translations["Marché et écosystème"] }</h3>
            <div className="content">
                <p className="label">{ translations["Nos références clients"] + " (" + clients.length + ")" }</p>
                <div className={ "clients" + ((lock) ? " locked" : "") }>
                    { (clients) ? clients.map((client, key) => {
                        const props = {
                            entity: client,
                            type: "client",
                            index: key + 1,
                            maxVisibleByDefault: maxVisibleCardsByDefault
                        };
                        return <EntityCard key={ key } { ...props }/>;
                    }) : null }
                    { (lock) ? <div className="lockedContent">
                        <i className="fa-solid fa-lock"/>
                        <p>{ translations["Consultez les clients de cette startup"] }</p>
                    </div> : null }
                </div>
                { (clients.length > maxVisibleCardsByDefault) ? <Button { ...buttonsProps[0] }/> : null }
                <div className="wishlist">
                    <p className="label">
                        <i className="fa-solid fa-heart-circle-plus"/>
                        { translations["Notre wishlist : ceux dont nous rêvons"] }
                    </p>
                    { (wishlist) ? <Tags tags={ wishlist } alternative={ true } lock={ lock } count={ false }/> : null }
                </div>
            </div>
        </div>;
    } else {
        return <ProfileEcosystemPlaceholder/>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem Placeholder */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystemPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileEcosystem;