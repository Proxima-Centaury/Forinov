/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment, Key } from "react";
import { formatNameForUrl } from "../../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
import SeeMore from "../../pagination/more";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import PartnersStyles from "../../../public/stylesheets/components/contents/profile/Partners.module.css";
import FolderCard from "../../cards/folder";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Partners */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfilePartners = (partnersProps: any) => {
    const { profile, folders, states, router } = partnersProps;
    const { translations } = states;
    const { type } = router.query;
    return <Fragment>
        <div className={ PartnersStyles.partners }>
            <p className={ PartnersStyles.label }>{ translations["Nos partenaires"] + " (" + (profile.PARTNERS.length || 0) + ")" }</p>
            { (profile.PARTNERS.length > 0) ? <SeeMore { ...partnersProps } list={ profile.PARTNERS } type="entities" max={ 4 } display="grid"/> : null }
        </div>
        { (!type.match(/(startups)/)) ? <p className={ PartnersStyles.label }>{ translations["Dossiers de startups publics"] }</p>: null }
        { (!type.match(/(startups)/) && folders.length > 0) ? <div className="grid twoColumns">
            { folders.map((folder: any, key: Key) => <Link key={ key } href={ router.asPath + "/folders/" + formatNameForUrl(folder.NAME) + "_" + folder.ID }>
                <FolderCard { ...partnersProps } folder={ folder }/>
            </Link>) }
        </div> : (!type.match(/(startups)/)) ? <div className="placeholder">
            <p>{ translations["Aucun dossier de startup à afficher"] + "." }</p>
        </div> : null }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfilePartners;