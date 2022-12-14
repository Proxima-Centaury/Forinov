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
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = ({ profile, states }: any) => {
    const { translations }: any = states;
    const { INCUBATORS } = profile;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const partners = INCUBATORS || [];
    const handleView = (event: any) => seeMoreOrLess(event, translations, ".partner", partners, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], partners.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div className={ PartnersStyles.partners }>
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
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfilePartners;