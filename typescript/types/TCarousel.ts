/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TStartup } from "@typescript/types/TStartup";
import type { TOpportunity } from "@typescript/types/TOpportunity";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Carousel Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type TCarousel = {
    classList?: string,
    items?: TStartup[] | TOpportunity[],
    itemsType?: string,
    navigation?: string
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { TCarousel };