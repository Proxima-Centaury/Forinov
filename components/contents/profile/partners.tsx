/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties, formatNameForUrl } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import { Fragment } from "react";
import EntityCard from "../../cards/entity";
import Button from "../../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import PartnersStyles from "../../../public/stylesheets/components/contents/profile/Partners.module.css";
import EntityStyles from "../../../public/stylesheets/components/cards/Entity.module.css";
import FolderStyles from "../../../public/stylesheets/components/cards/Folder.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
import FolderCard from "../../cards/folder";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Partners */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfilePartners = (pageProps: any) => {
    const { profile, folders, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + EntityStyles.partner, profile.PARTNERS, 4);
    /* --------------------------- */
    /* Properties */
    /* --------------------------- */
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], profile.PARTNERS.length - 4 ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    /* --------------------------- */
    /* More Or Less Button */
    /* --------------------------- */
    let eventualFoldersMoreOfLessButtonProps = null;
    if(type !== "startup") {
        const handleView2 = (event: any) => seeMoreOrLess(event, translations, "." + FolderStyles.folder, folders, 2);
        const moreOrLess2ButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView2, translations["Voir plus"], folders.length - 2 ];
        const moreOrLess2ButtonObject = buildProperties(buttonProps, moreOrLess2ButtonValues);
        eventualFoldersMoreOfLessButtonProps = moreOrLess2ButtonObject;
    };
    console.log(profile)
    return <Fragment>
        <div className={ PartnersStyles.partners }>
            <p className={ PartnersStyles.label }>{ translations["Nos partenaires"] + " (" + (profile.PARTNERS.length || 0) + ")" }</p>
            { (profile.PARTNERS.length > 0) ? <div className="grid twoColumns">
                { profile.PARTNERS.map((partner: any, key: KeyType) => {
                    const url = "/directories/partners/" + formatNameForUrl(partner.NAME) + "_" + partner.ID;
                    return <Link key={ key } href={ url }>
                        <EntityCard { ...pageProps } entity={ partner } type="partner" details/>
                    </Link>;
                }) }
            </div> : null }
            { (profile.PARTNERS.length > 4) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
        </div>
        { (!type.match(/(startup)/)) ? <p className={ PartnersStyles.label } style={ { padding: "0px 0px 0px 16px" } }>{ translations["Dossiers de startups publics"] }</p>: null }
        { (!type.match(/(startup)/) && folders.length > 0) ? <div className="grid twoColumns">
            { folders.map((folder: any, key: KeyType) => {
                const type = "folder";
                const index = key + 1;
                const maxVisibleByDefault = 2;
                const cardProps = { folder, type, index, maxVisibleByDefault };
                return <FolderCard key={ key } { ...cardProps }/>;
            }) }
        </div> : (!type.match(/(startup)/)) ? <div className="placeholder">
            <p>{ translations["Aucun dossier de startup à afficher"] + "." }</p>
        </div> : null }
        { (!type.match(/(startup)/) && folders.length > 2) ? <Button { ...eventualFoldersMoreOfLessButtonProps as ButtonInterface }/> : null }
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfilePartners;