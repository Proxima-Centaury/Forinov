/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ArticleType } from "@typescript/types/ArticleType";
import type { CategoryType } from "@typescript/types/CategoryType";
import type { LogType } from "@typescript/types/LogType";
import type { LogoType } from "@typescript/types/LogoType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
import type { ResponseType } from "@typescript/types/ResponseType";
import type { StartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Page Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type PageType = {
    articles?: ArticleType[],
    categories?: {
        startups: CategoryType[],
        opportunities: CategoryType[]
    },
    counters?: any,
    deals?: ResponseType,
    reason?: LogType,
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