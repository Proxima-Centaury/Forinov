/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, useEffect } from "react";
import { structureTags } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Tags from "../tags/tags";
import Format from "../texts/format";
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../public/stylesheets/components/cards/Profile.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileCard = (profileProps: any) => {
    const { profile, definedType, page, states, router } = profileProps;
    const { session, lock, translations } = states;
    const { type } = router.query;
    const [ profileType, setProfileType ] = useState("");
    useEffect(() => (!type) ? setProfileType(definedType) : setProfileType(type), [ type, definedType ]);
    return <div className={ ProfileStyles.card }>
        <div className={ ProfileStyles.banner }>
            <Image src={ profile.BACKGROUND } alt={ "Image de fond de la structure " + profile.NAME } width="3840" height="2160" priority/>
            { (profileType.match(/(startup)/) && page !== "landing") ? <StartupActions translations={ translations }/> : null }
            { (profileType.match(/(corporation|entreprise)/) && page !== "landing") ? <CorporationActions translations={ translations }/> : null }
            { (profileType.match(/(partner|partenaire)/) && page !== "landing") ? <PartnerActions translations={ translations }/> : null }
        </div>
        <div className={ ProfileStyles.body }>
            <div className={ ProfileStyles.picture }>
                <Image src={ profile.LOGO } alt="Company background." width="120" height="120"/>
                { (type !== "startup" && (!session || (session && profile.PDF)) && page !== "landing") ? <Button button={ ButtonStyles.callToActionAlternative } href={ profile.PDF } icon="fa-light fa-cloud-arrow-down" text="PDF"/> : null }
            </div>
            <div className={ ProfileStyles.content }>
                <h3>{ profile.NAME }</h3>
                { ((profile.ADDRESS && (profile.ADDRESS.TOWN || profile.ADDRESS.ISO)) || profile.WEBSITE) ? <div className={ ProfileStyles.informations }>
                    { (profile.ADDRESS.TOWN || profile.ADDRESS.ISO) ? <div>
                        <i className="fa-solid fa-location-dot"/>
                        <p>{ ((profile.ADDRESS.TOWN) ? profile.ADDRESS.TOWN + ", " : "") + ((profile.ADDRESS.ISO) ? profile.ADDRESS.ISO : "") }</p>
                    </div> : null }
                    { (profile.WEBSITE) ? <div>
                        <i className="fa-solid fa-link"/>
                        <a href={ "https://" + profile.WEBSITE } target="blank">{ translations["Site internet"] }</a>
                    </div> : null }
                </div> : null }
                { (profile.COMMENT) ? <Format content={ profile.COMMENT }/> : null }
                { (profile.CATEGORY.length > 0) ? <Tags tags={ profile.CATEGORY } main={ true }/> : null }
                { (profile.TAGS) ? <Tags tags={ structureTags(profile.TAGS) } limit={ 2 }/> : null }
                { (profileType.match(/(startup)/) && page !== "landing") ? <div className="separator"></div> : null }
                { (profileType.match(/(startup)/) && page !== "landing") ? <div className={ ProfileStyles.stats }>
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
            <p>{ translations["Ce compte n'est pas officiel. S'il s'agit de votre compte, n'hésitez pas à récupérer les accès."] }</p>
        </div> : null }
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card ( Startup Actions ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupActions = ({ translations }: any) => {
    return <div className={ ProfileStyles.actions }>
        <div>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-folder-open"/>
            <p>{ translations["Suivre"] }</p>
        </div>
        <div>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-message"/>
            <p>{ translations["Contacter"] }</p>
        </div>
        <Button button={ ButtonStyles.callToActionAlternativeRoundedIcon } icon="fa-light fa-ellipsis"/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card ( Corporation Actions ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const CorporationActions = ({ translations }: any) => {
    return <div className={ ProfileStyles.actions }>
        <div data-type="tooltip" data-tooltip={ translations["Ajouter à ma liste de souhaits"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-heart-circle-plus"/>
            <p>Wishlist</p>
        </div>
        <div>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-folder-open"/>
            <p>{ translations["Suivre"] }</p>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Card ( Partner Actions ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnerActions = ({ translations }: any) => {
    return <div className={ ProfileStyles.actions }>
        <div data-type="tooltip" data-tooltip={ translations["Ajouter à ma liste de souhaits"] }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-heart-circle-plus"/>
            <p>Wishlist</p>
        </div>
        <div>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-folder-open"/>
            <p>{ translations["Suivre"] }</p>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileCard;