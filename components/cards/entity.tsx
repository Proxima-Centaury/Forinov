/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { formatNameForUrl } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Link from "next/link";
import Tags from "../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityStyles from "../../public/stylesheets/components/cards/Entity.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Entity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const EntityCard = ({ entity, type, index, maxVisibleByDefault = 3 }: any) => {
    const tags = Object.entries(entity.TAG) || [];
    console.log(entity)
    return <Link href={ "/directories/partners/" + formatNameForUrl(entity.NAME) + "_" + entity.ID } className={ EntityStyles[type] + ((index > maxVisibleByDefault) ? " hidden" : "")}>
        <div className={ EntityStyles.marker }></div>
        <div className={ EntityStyles.content }>
            <div className={ EntityStyles.identity }>
                <Image src={ entity.LOGO } alt={ "Logo de la structure " + entity.NAME + "." } width="55" height="55"/>
                <p className={ EntityStyles.name }>{ entity.NAME }</p>
            </div>
            { (tags.length > 0) ? <Tags tags={ tags } main={ true }/> : null }
        </div>
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;