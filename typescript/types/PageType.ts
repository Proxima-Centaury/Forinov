/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { LogoType } from "@typescript/types/LogoType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
import type { ResponseType } from "@typescript/types/ResponseType";
import type { StartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Page Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type PageType = {
    deals?: ResponseType,
    filters?: ResponseType,
    landing?: ResponseType,
    locale?: string,
    logos?: LogoType[],
    opportunities?: OpportunityType[],
    startups?: StartupType[],
    states?: unknown
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { PageType };