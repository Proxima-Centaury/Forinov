/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TagsStyles from "../../public/stylesheets/components/tags/Tags.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Tags */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Tags = ({ tags, main = false, alternative = false, lock = false, count = true }: any) => {
    const showOtherTags = (tags: Array<String>, shift: Number) => {
        const otherTags = tags.slice(shift as number, tags.length);
        return otherTags.join(", ");
    };
    const classList = TagsStyles.tag + ((main) ? " " + TagsStyles.main : "");
    return <div className={ TagsStyles.tags + ((lock) ? " locked" : "" ) + ((alternative) ? " " + TagsStyles.alternative : "" )}>
        { (count) ? tags.map((entry: any, key: any) => (key < 3) ? <div key={ key as KeyType } className={ classList } data-type="tooltip" data-tooltip={ entry[1] }>
            <p>{ entry[1] }</p>
        </div> : null) : tags.map((entry: any, key: any) => <div key={ key as KeyType } className={ classList }>
            <p>{ entry[1] || entry.NAME }</p>
        </div>) }
        { (count && tags.length > 3) ? <div className={ classList } data-type="tooltip" data-tooltip={ showOtherTags(tags, 3) }>
            <p>{ "+" + (tags.length - 3) }</p>
        </div> : null}
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Tags;