/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { formatNameForUrl, structureTags } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Link from "next/link";
import Tags from "../tags/tags";
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityStyles from "../../public/stylesheets/components/cards/Entity.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Entity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const EntityCard = (pageProps: any) => {
    const { entity, type, index, details, maxVisibleByDefault, states, router }: any = pageProps;
    const { RGB }: any = states;
    return <Link href={ router.asPath + "/" + formatNameForUrl(entity.NAME) + "_" + entity.ID } className={ EntityStyles[type] + ((index > maxVisibleByDefault) ? " hidden" : "")} data-rgb={ (RGB) ? "enabled" : "disabled" }>
        <div className={ EntityStyles.marker }></div>
        <div className={ EntityStyles.content }>
            <div className={ EntityStyles.head }>
                <div className={ EntityStyles.identity }>
                    <div className={ EntityStyles.branding }>
                        <Image src={ entity.LOGO } alt={ "Logo de la structure " + entity.NAME + "." } width="55" height="55"/>
                        <p className={ EntityStyles.name }>{ entity.NAME }</p>
                    </div>
                    { (entity.TAG || entity.CATEGORY) ? <Tags tags={ structureTags(entity.TAG) || entity.CATEGORY } main={ true }/> : null }
                </div>
                { (entity.TECHNOLOGIES) ? <Tags tags={ entity.TECHNOLOGIES } limit={ 2 }/> : null }
            </div>
            { (details) ? <div className={ EntityStyles.description }>
                <Format content={ entity.DESCRIPTION }/>
            </div> : null }
        </div>
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;