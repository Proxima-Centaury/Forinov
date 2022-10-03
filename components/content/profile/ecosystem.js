/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Tags from "../../tags/tags";
import Button from "../../buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystem = ({ profile, lock, translations }) => {
    const { CLIENTS } = profile;
    const clients = CLIENTS || [];
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".client", clients, 4);
    if(clients) {
        return <div id="ecosystem" className="profileEcosystem">
            <h3>{ translations["Marché et écosystème"] }</h3>
            <div className="content">
                <p className="label">{ translations["Nos références clients"] + " (" + clients.length + ")" }</p>
                <div className={ "clients" + ((lock) ? " locked" : "") }>
                    { (clients) ? clients.map((client, key) => <div key={ key } className={ "client" + ((key > 3) ? " hidden" : "")}>
                        <div className="marker"></div>
                        <div className="content">
                            <div className="identity">
                                <Image src={ client.LOGO } width="48" height="48" alt={ client.NAME + " logo." }/>
                                <p className="clientName">{ client.NAME }</p>
                            </div>
                            { (client.TAG) ? <Tags tags={ (Array.isArray(client.TAG)) ? client.TAG : [ client.TAG ]  } main={ true }/> : null }
                        </div>
                    </div>) : null }
                </div>
                { (clients.length > 2) ? <Button type="moreOrLess" action={ handleView } text={ translations["Voir plus"] } count={ clients.length - 4 }/> : null }
                <p className="label">
                    <i className="fa-solid fa-heart-circle-plus"/>
                    { translations["Notre wishlist : ceux dont nous rêvons"] }
                </p>
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