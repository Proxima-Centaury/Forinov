/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Tags from "../tags/tags";
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileCard = ({ profile, lock, translations }) => {
    if(profile) {
        return <div className="profileCard cardBackground" data-type="full">
            <div className="banner">
                <Image src={ profile.BACKGROUND } alt="" width="1000" height="192"/>
                <div className="actions">
                    <div>
                        <button className="callToActionRoundedIcon">
                            <i className="fa-light fa-folder-open"/>
                        </button>
                        <p>{ translations["Suivre"] }</p>
                    </div>
                    <div>
                        <button className="callToActionRoundedIcon">
                            <i className="fa-light fa-message"/>
                        </button>
                        <p>{ translations["Contacter"] }</p>
                    </div>
                    <button className="callToActionAlternativeRoundedIcon">
                        <i className="fa-solid fa-ellipsis"/>
                    </button>
                </div>
            </div>
            <div className="body">
                <div className="picture">
                    <Image src={ profile.LOGO } alt="" width="120" height="120"/>
                </div>
                <div className="content">
                    <h3>{ profile.NAME }</h3>
                    <div className="informations">
                        <div>
                            <i className="fa-solid fa-location-dot"/>
                            <p>{ profile.ADDRESS.TOWN + ", " + profile.ADDRESS.ISO }</p>
                        </div>
                        <div>
                            <i className="fa-solid fa-link"/>
                            <a href={ "https://" + profile.WEBSITE } target="blank">{ translations["Site internet"] }</a>
                        </div>
                    </div>
                    <div className="description">
                        <Format content={ profile.COMMENT }/>
                    </div>
                    <Tags tags={ Object.entries(profile.CATEGORY) } main={ true }/>
                    <Tags tags={ Object.entries(profile.TAGS) }/>
                    <div className="separator"></div>
                    <div className="stats">
                        <div className="creationDate">
                            <p className="label">{ translations["Date de création"] }</p>
                            <p>{ profile.CREATIONDATE.split("-")[2] + "/" + profile.CREATIONDATE.split("-")[1] }</p>
                        </div>
                        <div className="workers">
                            <p className="label">{ translations["Effectif"] }</p>
                            <p>{ profile.PEOPLE }</p>
                        </div>
                        <div className="funding">
                            <p className="label">{ translations["Stade levé"] }</p>
                            <p className={ (lock) ? "locked" : "" }>{ profile.FUNDING }</p>
                        </div>
                        <div className="budget">
                            <p className="label">{ translations["Montant levé"] }</p>
                            <p className={ (lock) ? "locked" : "" }>{ profile.FUNDS + "€" }</p>
                        </div>
                    </div>
                </div>
            </div>
            { (profile.STATE === "WO") ? <div className="note">
                <p>{ translations["Ce compte n’est pas officiel. S’il s’agit de votre startup, n’hésitez pas à récupérer les accès."] }</p>
            </div> : null }
        </div>;
    } else {
        return <div className="profileCard cardBackground" data-type="full"></div>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileCard;