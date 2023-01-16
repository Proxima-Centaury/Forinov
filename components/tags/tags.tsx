/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Import */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { uppercaseFirst } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TagsStyles from "../../public/stylesheets/components/tags/Tags.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Tags */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Tags = ({ tags, main = false, alternative = false, lock = false, count = true }: any) => {
    const showOtherTags = (tags: Array<String>, shift: Number) => {
        const otherTags = tags.slice(shift as number, tags.length).map((tag) => uppercaseFirst(tag[1]));
        return otherTags.join("\n");
    };
    const classList = TagsStyles.tag + ((main) ? " " + TagsStyles.main : "");
    return <div className={ TagsStyles.tags + ((lock) ? " locked" : "" ) + ((alternative) ? " " + TagsStyles.alternative : "" )}>
        { (count) ? tags.map((entry: any, key: KeyType) => (parseInt(key) < 3) ? <div key={ key } className={ classList } data-type="tooltip" data-tooltip={ uppercaseFirst(entry[1]) || uppercaseFirst(entry.NAME) }>
            <p>{ uppercaseFirst(entry[1]) as String || uppercaseFirst(entry.NAME) as String }</p>
        </div> : null) : tags.map((entry: any, key: KeyType) => <div key={ key } className={ classList }>
            <p>{ uppercaseFirst(entry[1]) as String || uppercaseFirst(entry.NAME) as String }</p>
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