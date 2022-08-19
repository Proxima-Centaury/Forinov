/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Format from "../../texts/format";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Offer */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOffer = ({ profile, lock, translations }) => {
    if(profile) {
        return <div id="offer" className="profileOffer">
            <h3>{ translations["Notre offre"] }</h3>
            <div className={ "content" + ((lock) ? " locked gradient" : "") }>
                <p className="label">{ translations["Ce que nous apportons aux entreprises"] }</p>
                <Format content={ profile.OURVALUE }/>
                <div className="lockedContent">
                    <i className="fa-solid fa-lock"/>
                    <p>{ translations["Rejoignez Forinov, accédez à l’intégralité des profils, rentrez en contact et lancez des partenariats"] }</p>
                </div>
            </div>
        </div>;
    } else {
        return <div className="profileOffer"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOffer;