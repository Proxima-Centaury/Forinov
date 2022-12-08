/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Format from "../../texts/format";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../../public/stylesheets/components/contents/profile/Offer.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Offer */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOffer = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <div id="offer" className={ ProfileStyles.offer }>
        <h3>{ translations["Notre offre"] }</h3>
        <div className={ ProfileStyles.content + ((lock) ? " locked gradient" : "") }>
            <p className={ ProfileStyles.label }>{ translations["Ce que nous apportons aux entreprises"] }</p>
            <Format content={ profile.OURVALUE }/>
            { (lock) ? <div className="lockedContent">
                <i className="fa-solid fa-lock"/>
                <p>{ translations["Rejoignez Forinov, accédez à l’intégralité des profils, rentrez en contact et lancez des partenariats"] }</p>
            </div> : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOffer;