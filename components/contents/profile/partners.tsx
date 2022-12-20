/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityCard from "../../cards/entity";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import PartnersStyles from "../../../public/stylesheets/components/contents/profile/Partners.module.css";
import EntityStyles from "../../../public/stylesheets/components/cards/Entity.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = ({ type, profile, folders, states }: any) => {
    const { translations }: any = states;
    const { PARTNERS } = profile;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const partners = PARTNERS || [];
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + EntityStyles.partner, partners, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], partners.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <>
        <div className={ PartnersStyles.partners } style={ { margin: (type !== "startup") ? "0px" : undefined } }>
            <p className={ PartnersStyles.label }>{ translations["Nos partenaires"] + " (" + partners.length + ")" }</p>
            <div className={ PartnersStyles.list } data-type="list">
                { (partners) ? partners.map((partner: any, key: KeyType) => {
                    const entity = partner;
                    const type = "partner";
                    const index = key + 1;
                    const maxVisibleByDefault = maxVisibleCardsByDefault;
                    const cardProps = { entity, type, index, maxVisibleByDefault };
                    return <EntityCard key={ key } { ...cardProps }/>;
                }) : null }
            </div>
            { (partners.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
        </div>
        { (type !== "startup") ? <p className={ PartnersStyles.label } style={ { padding: "0px 0px 0px 16px" } }>{ translations["Dossiers de startups publics"] }</p>: null }
        { (type !== "startup" && folders) ? <div className={ PartnersStyles.list }>
            { folders.map((partner: any, key: KeyType) => {
                const entity = partner;
                const type = "partner";
                const index = key + 1;
                const maxVisibleByDefault = maxVisibleCardsByDefault;
                const cardProps = { entity, type, index, maxVisibleByDefault };
                return <EntityCard key={ key } { ...cardProps }/>;
            }) }
        </div> : null }
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfilePartners;