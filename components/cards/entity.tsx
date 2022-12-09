/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import EntityStyles from "../../public/stylesheets/components/cards/Entity.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Entity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const EntityCard = ({ entity, type, index, maxVisibleByDefault = 3 }: any) => {
    return <div className={ EntityStyles[type] + ((index > maxVisibleByDefault) ? " hidden" : "")}>
        <div className={ EntityStyles.marker }></div>
        <div className={ EntityStyles.content }>
            <div className={ EntityStyles.identity }>
                <img src={ entity.LOGO } alt={ entity.NAME + " logo." }/>
                <p className={ EntityStyles.name }>{ entity.NAME }</p>
            </div>
            { (entity.TAG) ? <Tags tags={ (Array.isArray(entity.TAG)) ? entity.TAG : [ entity.TAG ]  } main={ true }/> : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;