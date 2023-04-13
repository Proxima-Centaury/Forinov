/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { structureTags } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Tags from "../tags/tags";
import Format from "../texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityStyles from "../../public/stylesheets/components/cards/Entity.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Entity Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const EntityCard = (entityProps: any) => {
    const { entity, type, details, states } = entityProps;
    const { translations } = states;
    return <div className={ EntityStyles[type] }>
        <div className={ EntityStyles.marker }></div>
        <div className={ EntityStyles.content }>
            <div className={ EntityStyles.head }>
                <div className={ EntityStyles.identity }>
                    <div className={ EntityStyles.branding }>
                        <Image src={ entity.LOGO } alt="" width="55" height="55"/>
                        <p className={ EntityStyles.name }>{ entity.NAME }</p>
                    </div>
                    { (type.match(/(startups)/)) ? ((entity.CATEGORY && entity.CATEGORY.length > 0) ? <Tags tags={ entity.CATEGORY } main={ true } limit={ 1 }/> : <Tags tags={ structureTags(translations["Non catégorisée"]) } main={ true } limit={ 1 }/>) : null }
                    { (type.match(/(corporates)/)) ? ((entity.CATEGORY && entity.CATEGORY.length > 0) ? <Tags tags={ entity.CATEGORY } main={ true } limit={ 1 }/> : <Tags tags={ structureTags(translations["Non catégorisée"]) } main={ true } limit={ 1 }/>) : null }
                    { (type.match(/(partners)/)) ? ((entity.CATEGORY && entity.CATEGORY.length > 0) ? <Tags tags={ entity.CATEGORY } main={ true } limit={ 1 }/> : <Tags tags={ structureTags(translations["Non catégorisée"]) } main={ true } limit={ 1 }/>) : null }
                </div>
                { (type.match(/(startups)/) && entity.TECHNOLOGIES.length > 0) ? <Tags tags={ entity.TECHNOLOGIES } limit={ 2 }/> : null }
                { (type.match(/(startups)/) && entity.TECHNOLOGIES.length <= 0) ? <Tags tags={ structureTags(translations["Non définies"] + ".") } limit={ 2 }/> : null }
            </div>
            { (details) ? <div className={ EntityStyles.description }>
                <Format { ...entityProps } content={ entity.DESCRIPTION || translations["Non renseigné"] + "." }/>
            </div> : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;