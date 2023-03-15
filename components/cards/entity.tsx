/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEventHandler } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { structureTags } from "../../scripts/utilities";
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
    const { entity, type, details, states, stateSetters }: any = pageProps;
    const { session, translations, RGB }: any = states;
    const { setModal }: any = stateSetters;
    const followButtonAction: MouseEventHandler = (event: any) => {
        event.preventDefault();
        (session) ? false : setModal("register");
    };
    return <div className={ EntityStyles[type] } data-rgb={ (RGB) ? "enabled" : "disabled" }>
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
            <Button button={ ButtonStyles.callToActionAlternativeRoundedIcon } action={ followButtonAction } icon="fa-light fa-folder-plus"/>
            <p>{ translations["Suivre"] }</p>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;