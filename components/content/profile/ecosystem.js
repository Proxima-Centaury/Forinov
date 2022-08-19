/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Ecosystem */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileEcosystem = ({ clients, translations }) => {
    const handleView = (event) => seeMoreOrLess(event, translations, ".client", clients, 4);
    if(clients) {
        return <div id="ecosystem" className="profileEcosystem">
            <h3>{ translations["Marché et écosystème"] }</h3>
            <div className="content">
                <p className="label">{ translations["Nos références clients"] + " (" + clients.length + ")" }</p>
                <div className="clients locked">
                    { (clients) ? clients.map((client, key) => <div key={ key } className={ "client" + ((key > 3) ? " d-none" : "")}>
                        <div className="marker"></div>
                        <div className="content">
                            <div className="identity">
                                <Image src={ clients.picture } alt="" sizes="100vw" fill/>
                                <p className="clientName">{ client.name }</p>
                            </div>
                            <Tags tags={ Object.values(client.tags) } main={ true }/>
                        </div>
                    </div>) : null }
                </div>
                { (clients.length > 2) ? <button className="seeMore" onClick={ handleView }>
                    <span>{ translations["Voir plus"] + " (" + (clients.length - 4) + ")" }</span>
                    <i className="fa-solid fa-caret-right"/>
                </button> : null }
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