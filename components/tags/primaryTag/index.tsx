/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TTag } from "@typescript/types/TTag";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import TagStyles from "@tags/Tag.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Primary Tag */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const PrimaryTag = (params: TTag): JSX.Element => {
    const { tag, color } = params;
    return <p className={ TagStyles.primary + ((color) ? ` ${ TagStyles[color] }` : "") }>{ tag }</p>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default PrimaryTag;