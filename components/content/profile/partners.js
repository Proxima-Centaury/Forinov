/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = ({ partners, translations }) => {
    const handleView = (event) => seeMoreOrLess(event, translations, ".partner", partners, 4);
    if(partners) {
        return <div className="profilePartners">
            <p className="label">{ translations["Nos partenaires"] + " (" + partners.length + ")" }</p>
            <div className="partners locked">
                { (partners) ? partners.map((partner, key) => <div key={ key } className={ "partner" + ((key > 3) ? " d-none" : "")}>
                    <div className="marker"></div>
                    <div className="content">
                        <div className="identity">
                            <Image src={ partner.picture } alt="" sizes="100vw" fill/>
                            <p className="partnerName">{ partner.name }</p>
                        </div>
                        <Tags tags={ Object.values(partner.tags) } main={ true }/>
                    </div>
                </div>) : null }
            </div>
            { (partners.length > 2) ? <button className="seeMore" onClick={ handleView }>
                <span>{ translations["Voir plus"] + " (" + (partners.length - 4) + ")" }</span>
                <i className="fa-solid fa-caret-right"/>
            </button> : null }
        </div>;
    } else {
        return <div className="profilePartners"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfilePartners;