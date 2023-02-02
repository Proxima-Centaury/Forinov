/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties, structureTags } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Tags from "../tags/tags";
import Format from "../texts/format";
import Button from "../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../public/stylesheets/components/cards/Profile.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileCard = ({ type, profile, states, page }: any) => {
    const { session, lock, translations, RGB }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const pdfButtonValues = [ ButtonStyles.callToActionAlternative, true, "fa-light fa-cloud-arrow-down", "", () => false, "PDF", 0 ];
    const pdfButtonObject = buildProperties(buttonProps, pdfButtonValues);
    return <div className={ ProfileStyles.card } data-rgb={ (RGB) ? "enabled" : "disabled" }>
        <div className={ ProfileStyles.banner }>
            <Image src={ profile.BACKGROUND } alt={ "Image de fond de la structure " + profile.NAME } width="3840" height="2160" priority/>
            { (type === "startup" && page !== "landing") ? <StartupActions translations={ translations }/> : null }
            { (type === "corporation" && page !== "landing") ? <CorporationActions translations={ translations }/> : null }
            { (type === "partner" && page !== "landing") ? <PartnerActions translations={ translations }/> : null }
        </div>
        <div className={ ProfileStyles.body }>
            <div className={ ProfileStyles.picture }>
                <Image src={ profile.LOGO } alt="Company background." width="120" height="120"/>
                { (type !== "startup" && (!session || (session && profile.PDF))) ? <Button { ...pdfButtonObject as ButtonInterface }/> : null }
            </div>
            <div className={ ProfileStyles.content }>
                <h3>{ profile.NAME }</h3>
                <div className={ ProfileStyles.informations }>
                    { (profile.ADDRESS) ? <div>
                        <i className="fa-solid fa-location-dot"/>
                        <p>{ ((profile.ADDRESS.TOWN) ? profile.ADDRESS.TOWN + ", " : "") + ((profile.ADDRESS.ISO) ? profile.ADDRESS.ISO : "") }</p>
                    </div> : null }
                    { (profile.WEBSITE) ? <div>
                        <i className="fa-solid fa-link"/>
                        <a href={ "https://" + profile.WEBSITE } target="blank">{ translations["Site internet"] }</a>
                    </div> : null }
                </div>
                <div className={ ProfileStyles.description }>
                    <Format content={ profile.COMMENT }/>
                </div>
                { (profile.CATEGORY.length > 0) ? <Tags tags={ profile.CATEGORY } main={ true }/> : null }
                { (profile.TAGS) ? <Tags tags={ structureTags(profile.TAGS) }/> : null }
                { (type === "startup" && page !== "landing") ? <div className="separator"></div> : null }
                { (type === "startup" && page !== "landing") ? <div className={ ProfileStyles.stats }>
                    { (profile.CREATIONDATE) ? <div>
                        <p className={ ProfileStyles.label }>{ translations["Date de création"] }</p>
                        <div>
                            <p>{ profile.CREATIONDATE.split("-")[2] + "/" + profile.CREATIONDATE.split("-")[1] }</p>
                        </div>
                    </div> : null }
                    { (profile.PEOPLE) ? <div>
                        <p className={ ProfileStyles.label }>{ translations["Effectifs"] }</p>
                        <div>
                            <i className="fa-light fa-user-helmet-safety"/>
                            <p>{ profile.PEOPLE }</p>
                        </div>
                    </div> : null }
                    { (profile.FUNDING) ? <div>
                        <p className={ ProfileStyles.label }>{ translations["Stade levée"] }</p>
                        <div className={ (lock) ? "locked" : "" }>
                            <p>{ profile.FUNDING }</p>
                        </div>
                    </div> : null }
                    { (profile.FUNDS) ? <div>
                        <p className={ ProfileStyles.label }>{ translations["Montant levé"] }</p>
                        <div className={ (lock) ? "locked" : "" }>
                            <p>{ profile.FUNDS + "€" }</p>
                        </div>
                    </div> : null }
                </div> : null }
            </div>
        </div>
        { (profile.STATE === "WO") ? <div className={ ProfileStyles.note }>
            <p>{ translations["Ce compte n'est pas officiel. S'il s'agit de votre startup, n'hésitez pas à récupérer les accès."] }</p>
        </div> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card ( Startup Actions ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupActions = ({ translations }: any) => {
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const followButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-folder-open", "", () => false, "", 0 ];
    const followButtonObject = buildProperties(buttonProps, followButtonValues);
    const contactButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-message", "", () => false, "", 0 ];
    const contactButtonObject = buildProperties(buttonProps, contactButtonValues);
    const parametersButtonValues = [ ButtonStyles.callToActionAlternativeRoundedIcon, true, "fa-solid fa-ellipsis", "", () => false, "", 0 ];
    const parametersButtonObject = buildProperties(buttonProps, parametersButtonValues);
    return <div className={ ProfileStyles.actions }>
        <div>
            <Button { ...followButtonObject as ButtonInterface }/>
            <p>{ translations["Suivre"] }</p>
        </div>
        <div>
            <Button { ...contactButtonObject as ButtonInterface }/>
            <p>{ translations["Contacter"] }</p>
        </div>
        <Button { ...parametersButtonObject as ButtonInterface }/>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card ( Corporation Actions ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CorporationActions = ({ translations }: any) => {
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const wishlistButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-heart-circle-plus", "", () => false, "", 0 ];
    const wishlistButtonObject = buildProperties(buttonProps, wishlistButtonValues);
    const followButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-folder-open", "", () => false, "", 0 ];
    const followButtonObject = buildProperties(buttonProps, followButtonValues);
    return <div className={ ProfileStyles.actions }>
        <div data-type="tooltip" data-tooltip={ translations["Ajouter à ma liste de souhaits"] }>
            <Button { ...wishlistButtonObject as ButtonInterface }/>
            <p>Wishlist</p>
        </div>
        <div>
            <Button { ...followButtonObject as ButtonInterface }/>
            <p>{ translations["Suivre"] }</p>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card ( Partner Actions ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnerActions = ({ translations }: any) => {
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const wishlistButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-heart-circle-plus", "", () => false, "", 0 ];
    const wishlistButtonObject = buildProperties(buttonProps, wishlistButtonValues);
    const followButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-folder-open", "", () => false, "", 0 ];
    const followButtonObject = buildProperties(buttonProps, followButtonValues);
    return <div className={ ProfileStyles.actions }>
        <div data-type="tooltip" data-tooltip={ translations["Ajouter à ma liste de souhaits"] }>
            <Button { ...wishlistButtonObject as ButtonInterface }/>
            <p>Wishlist</p>
        </div>
        <div>
            <Button { ...followButtonObject as ButtonInterface }/>
            <p>{ translations["Suivre"] }</p>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileCard;