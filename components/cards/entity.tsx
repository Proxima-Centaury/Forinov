/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface } from "../../typescript/interfaces";
import { structureTags, buildProperties } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Tags from "../tags/tags";
import Button from "../buttons/button";
import Format from "../texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityStyles from "../../public/stylesheets/components/cards/Entity.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Entity Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const EntityCard = (pageProps: any) => {
    const { entity, type, index, details, maxVisibleByDefault, states, stateSetters }: any = pageProps;
    const { session, translations, RGB }: any = states;
    const { setModal }: any = stateSetters;
    /* --------------------------- */
    /* Properties */
    /* --------------------------- */
    const buttonProps = [ "type", "faIcon", "faIconClass", "action", "text" ];
    /* --------------------------- */
    /* Follow Button */
    /* --------------------------- */
    const followButtonAction = (event: any) => {
        event.preventDefault();
        return (session) ? false : setModal("register")
    };
    const followButtonClass = ButtonStyles.callToActionAlternativeRoundedIcon;
    const followButtonValues = [ followButtonClass, true, "fa-light fa-folder-plus", followButtonAction ];
    const followButtonObject = buildProperties(buttonProps, followButtonValues);
    return <div className={ EntityStyles[type] + ((index > maxVisibleByDefault) ? " hidden" : "")} data-rgb={ (RGB) ? "enabled" : "disabled" }>
        <div className={ EntityStyles.marker }></div>
        <div className={ EntityStyles.content }>
            <div className={ EntityStyles.head }>
                <div className={ EntityStyles.identity }>
                    <div className={ EntityStyles.branding }>
                        <Image src={ entity.LOGO } alt={ "Logo de la structure " + entity.NAME + "." } width="55" height="55"/>
                        <p className={ EntityStyles.name }>{ entity.NAME }</p>
                    </div>
                    { (entity.CATEGORY) ? <Tags tags={ entity.CATEGORY } main={ true } limit={ 1 }/> : null }
                </div>
                { (entity.TECHNOLOGIES || entity.TAGS) ? <Tags tags={ entity.TECHNOLOGIES || structureTags(entity.TAGS) } limit={ 2 }/> : null }
            </div>
            { (details) ? <div className={ EntityStyles.description }>
                <Format content={ entity.DESCRIPTION || translations["Non renseigné"] }/>
            </div> : null }
        </div>
        <div className={ EntityStyles.follow }>
            <Button { ...followButtonObject as ButtonInterface }/>
            <p>{ translations["Suivre"] }</p>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;