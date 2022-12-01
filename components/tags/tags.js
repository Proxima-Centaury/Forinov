/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Tags */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Tags = ({ tags, main = false, alternative = false, lock = false, count = true }) => {
    return <div className={ "tags" + ((lock) ? " locked" : "" ) + ((alternative) ? " alternative" : "" )}>
        { (count) ? tags.map((entry, key) => (key < 3) ? <div key={ key } className={ "tag" + ((main) ? " main" : "") }>
            <p>{ entry[1] }</p>
        </div> : null) : tags.map((entry, key) => <div key={ key } className={ "tag" + ((main) ? " main" : "") }>
            <p>{ entry[1] || entry.NAME }</p>
        </div>) }
        { (count && tags.length > 3) ? <div className="tag">
            <p>{ "+" + (tags.length - 3) }</p>
        </div> : null}
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Tags;