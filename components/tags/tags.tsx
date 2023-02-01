/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TagsStyles from "../../public/stylesheets/components/tags/Tags.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Tags */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Tags = ({ tags, main = false, alternative = false, lock = false, count = true }: any) => {
    const showOtherTags = (tags: Array<String>, shift: Number) => {
        const otherTags = tags.slice(shift as number, tags.length).map((tag: any) => tag[1] || tag.NAME);
        return otherTags.join("\n");
    };
    const tagText = (tag: any) => (tag.NAME) ? tag.NAME : false;
    const checkTags = (tags: Array<any>) => (tags.length > 0 && tags.map((tag: any) => tagText(tag)).filter((tag) => typeof tag !== "boolean").length > 0);
    const classList = TagsStyles.tag + ((main) ? " " + TagsStyles.main : "");
    return (checkTags(tags)) ? <div className={ TagsStyles.tags + ((lock) ? " locked" : "" ) + ((alternative) ? " " + TagsStyles.alternative : "" )}>
        { (count) ? tags.map((tag: any, key: KeyType) => (parseInt(key) < 3 && tagText(tag)) ? <div key={ key } className={ classList } data-type="tooltip" data-tooltip={ tagText(tag) }>
            <p>{ (tagText(tag)) as String }</p>
        </div> : null) : tags.map((tag: any, key: KeyType) => (tagText(tag)) ? <div key={ key } className={ classList }>
            <p>{ (tagText(tag)) as String }</p>
        </div> : null) }
        { (count && tags.length > 3) ? <div className={ classList } data-type="tooltip" data-tooltip={ showOtherTags(tags, 3) }>
            <p>{ "+" + (tags.length - 3) }</p>
        </div> : null}
    </div> : null;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Tags;