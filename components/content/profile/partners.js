/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import EntityCard from "../../cards/entity";
import Button from "../../../components/buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = ({ profile, lock, translations }) => {
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const { INCUBATORS } = profile;
    const partners = INCUBATORS || [];
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".partner", partners, maxVisibleCardsByDefault);
    const buttonsProps = [
        { type: "moreOrLess", action: handleView, text: translations["Voir plus"], count: partners.length - maxVisibleCardsByDefault }
    ];
    if(partners) {
        return <div className="profilePartners">
            <p className="label">{ translations["Nos partenaires"] + " (" + partners.length + ")" }</p>
            <div className={ "partners" + ((lock) ? " locked" : "") }>
                { (partners) ? partners.map((partner, key) => {
                    const props = {
                        entity: partner,
                        type: "partner",
                        index: key + 1,
                        maxVisibleByDefault: maxVisibleCardsByDefault
                    };
                    return <EntityCard key={ key } { ...props }/>;
                }) : null }
            </div>
            { (partners.length > maxVisibleCardsByDefault) ? <Button { ...buttonsProps[0] }/> : null }
        </div>;
    } else {
        return <ProfilePartnersPlaceholder/>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners Placeholder */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartnersPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfilePartners;