/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = ({ profile, lock, translations }) => {
    const { INCUBATORS } = profile;
    const partners = INCUBATORS || [];
    const handleView = (event) => seeMoreOrLess(event, translations, ".partner", partners, 2);
    if(partners) {
        return <div className="profilePartners">
            <p className="label">{ translations["Nos partenaires"] + " (" + partners.length + ")" }</p>
            <div className={ "partners" + ((lock) ? " locked" : "") }>
                { (partners) ? partners.map((partner, key) => <div key={ key } className={ "partner" + ((key > 3) ? " hidden" : "") }>
                    <div className="marker"></div>
                    <div className="content">
                        <div className="identity">
                            <Image src={ partner.LOGO } width="48" height="48" alt={ partner.NAME + " logo." }/>
                            <p className="partnerName">{ partner.NAME }</p>
                        </div>
                        { (partner.TAG) ? <Tags tags={ (Array.isArray(partner.TAG)) ? partner.TAG : [ partner.TAG ] } main={ true }/> : null }
                    </div>
                </div>) : null }
            </div>
            { (partners.length > 4) ? <button className="seeMore" onClick={ handleView }>
                <span>{ translations["Voir plus"] + " (" + (partners.length - 3) + ")" }</span>
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