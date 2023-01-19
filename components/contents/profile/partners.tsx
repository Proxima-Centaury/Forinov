/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment } from "react";
import EntityCard from "../../cards/entity";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import PartnersStyles from "../../../public/stylesheets/components/contents/profile/Partners.module.css";
import EntityStyles from "../../../public/stylesheets/components/cards/Entity.module.css";
import FolderStyles from "../../../public/stylesheets/components/cards/Folder.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
import FolderCard from "../../cards/folder";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = ({ type, profile, folders, states }: any) => {
    const { translations }: any = states;
    const { PARTNERS } = profile;
    const partners = PARTNERS || [];
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(4);
    const [ maxVisibleFoldersByDefault, setMaxVisibleFolderByDefault ] = useState(2);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + EntityStyles.partner, partners, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], partners.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    let eventualFoldersMoreOfLessButtonProps = null;
    if(type !== "startup") {
        const handleView2 = (event: any) => seeMoreOrLess(event, translations, "." + FolderStyles.folder, folders, maxVisibleFoldersByDefault);
        const moreOrLess2ButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView2, translations["Voir plus"], folders.length - maxVisibleFoldersByDefault ];
        const moreOrLess2ButtonObject = buildProperties(buttonProps, moreOrLess2ButtonValues);
        eventualFoldersMoreOfLessButtonProps = moreOrLess2ButtonObject;
    };
    return <Fragment>
        <div className={ PartnersStyles.partners } style={ { margin: (type !== "startup") ? "0px" : undefined } }>
            <p className={ PartnersStyles.label }>{ translations["Nos partenaires"] + " (" + (partners.length || 0) + ")" }</p>
            { (partners.length > 0) ? <div className={ PartnersStyles.list } data-type="list">
                { partners.map((partner: any, key: KeyType) => {
                    const entity = partner;
                    const type = "partner";
                    const index = key + 1;
                    const maxVisibleByDefault = maxVisibleCardsByDefault;
                    const cardProps = { entity, type, index, maxVisibleByDefault };
                    return <EntityCard key={ key } { ...cardProps }/>;
                }) }
            </div> : null }
            { (partners.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
        </div>
        { (type !== "startup") ? <p className={ PartnersStyles.label } style={ { padding: "0px 0px 0px 16px" } }>{ translations["Dossiers de startups publics"] }</p>: null }
        { (type !== "startup" && folders.length > 0) ? <div className={ PartnersStyles.list } data-type="list">
            { folders.map((folder: any, key: KeyType) => {
                const type = "folder";
                const index = key + 1;
                const maxVisibleByDefault = maxVisibleFoldersByDefault;
                const cardProps = { folder, type, index, maxVisibleByDefault };
                return <FolderCard key={ key } { ...cardProps }/>;
            }) }
        </div> : <div className="placeholder">
            <p>{ translations["Aucun dossier de startup à afficher"] + "." }</p>
        </div> }
        { (type !== "startup" && folders.length > maxVisibleFoldersByDefault) ? <Button { ...eventualFoldersMoreOfLessButtonProps as ButtonInterface }/> : null }
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfilePartners;