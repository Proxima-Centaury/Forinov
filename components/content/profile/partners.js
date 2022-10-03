/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityCard from "../../cards/entity";
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
                { (partners) ? partners.map((partner, key) => <EntityCard key={ key } entity={ partner } type="partner" index={ key }/>) : null }
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