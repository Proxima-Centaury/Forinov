/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../tags/tags";
import Format from "../texts/format";
import Button from "../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../public/stylesheets/components/cards/Profile.module.css";
import ButtonStyles from "../../public/stylesheets/components/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileCard = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const followButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-folder-open", "", () => false, "", 0 ];
    const followButtonObject = buildProperties(buttonProps, followButtonValues);
    const contactButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-message", "", () => false, "", 0 ];
    const contactButtonObject = buildProperties(buttonProps, contactButtonValues);
    const parametersButtonValues = [ ButtonStyles.callToActionAlternativeRoundedIcon, true, "fa-solid fa-ellipsis", "", () => false, "", 0 ];
    const parametersButtonObject = buildProperties(buttonProps, parametersButtonValues);
    return <div className={ ProfileStyles.card } data-type="full">
        <div className={ ProfileStyles.banner }>
            <img src={ profile.BACKGROUND } alt=""/>
            <div className={ ProfileStyles.actions }>
                <div>
                    <Button { ...followButtonObject as ButtonInterface }/>
                    <p>{ translations["Suivre"] }</p>
                </div>
                <div>
                    <Button { ...contactButtonObject as ButtonInterface }/>
                    <p>{ translations["Contacter"] }</p>
                </div>
                <Button { ...parametersButtonObject as ButtonInterface }/>
            </div>
        </div>
        <div className={ ProfileStyles.body }>
            <div className={ ProfileStyles.picture }>
                <img src={ profile.LOGO } alt="Company background."/>
            </div>
            <div className={ ProfileStyles.content }>
                <h3>{ profile.NAME }</h3>
                <div className={ ProfileStyles.informations }>
                    <div>
                        <i className="fa-solid fa-location-dot"/>
                        <p>{ profile.ADDRESS.TOWN + ", " + profile.ADDRESS.ISO }</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-link"/>
                        <a href={ "https://" + profile.WEBSITE } target="blank">{ translations["Site internet"] }</a>
                    </div>
                </div>
                <div className={ ProfileStyles.description }>
                    <Format content={ profile.COMMENT }/>
                </div>
                <Tags tags={ Object.entries(profile.CATEGORY) } main={ true }/>
                <Tags tags={ Object.entries(profile.TAGS) }/>
                <div className="separator"></div>
                <div className={ ProfileStyles.stats }>
                    <div>
                        <p className={ ProfileStyles.label }>{ translations["Date de création"] }</p>
                        <p>{ profile.CREATIONDATE.split("-")[2] + "/" + profile.CREATIONDATE.split("-")[1] }</p>
                    </div>
                    <div>
                        <p className={ ProfileStyles.label }>{ translations["Effectif"] }</p>
                        <p>{ profile.PEOPLE }</p>
                    </div>
                    <div>
                        <p className={ ProfileStyles.label }>{ translations["Stade levé"] }</p>
                        <p className={ (lock) ? "locked" : "" }>{ profile.FUNDING }</p>
                    </div>
                    <div>
                        <p className={ ProfileStyles.label }>{ translations["Montant levé"] }</p>
                        <p className={ (lock) ? "locked" : "" }>{ profile.FUNDS + "€" }</p>
                    </div>
                </div>
            </div>
        </div>
        { (profile.STATE === "WO") ? <div className={ ProfileStyles.note }>
            <p>{ translations["Ce compte n’est pas officiel. S’il s’agit de votre startup, n’hésitez pas à récupérer les accès."] }</p>
        </div> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileCard;