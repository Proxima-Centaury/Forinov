/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TTooltip } from "@typescript/types/TTooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* TDefault ooltip */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const DefaultTooltip = (params: TTooltip): JSX.Element => {
    const { children, tooltip, direction } = params;
    return <div data-type="tooltip" data-tooltip={ tooltip } data-direction={ direction || "top" }>
        { children }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default DefaultTooltip;