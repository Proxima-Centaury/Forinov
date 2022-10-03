/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../../buttons/button";
import { utilities } from "../../../utilities/utilities";
import EntityCard from "../../cards/entity";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystem = ({ profile, lock, translations }) => {
    const { CLIENTS } = profile;
    const { WISHLIST } = profile;
    const clients = CLIENTS || [];
    const wishlist = WISHLIST || [];
    console.log(wishlist)
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".client", clients, 4);
    if(clients) {
        return <div id="ecosystem" className="profileEcosystem">
            <h3>{ translations["Marché et écosystème"] }</h3>
            <div className="content">
                <p className="label">{ translations["Nos références clients"] + " (" + clients.length + ")" }</p>
                <div className={ "clients" + ((lock) ? " locked" : "") }>
                    { (clients) ? clients.map((client, key) => <EntityCard key={ key } entity={ client } type="client" index={ key }/>) : null }
                </div>
                { (clients.length > 2) ? <Button type="moreOrLess" action={ handleView } text={ translations["Voir plus"] } count={ clients.length - 4 }/> : null }
                <p className="label">
                    <i className="fa-solid fa-heart-circle-plus"/>
                    { translations["Notre wishlist : ceux dont nous rêvons"] }
                </p>
                { (wishlist) ? <Tags tags={ wishlist } alternative={ true } count={ false }/> : null }
            </div>
        </div>;
    } else {
        return <div className="profileEcosystem"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileEcosystem;