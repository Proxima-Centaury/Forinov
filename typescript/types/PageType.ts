/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ArticleType } from "@typescript/types/ArticleType";
import type { CategoryType } from "@typescript/types/CategoryType";
import type { LogType } from "@typescript/types/LogType";
import type { LogoType } from "@typescript/types/LogoType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
import type { OptionType } from "@typescript/types/OptionType";
import type { StartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Page Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type PageType = {
    articles?: ArticleType[],
    categories: CategoryType[],
    counters?: {
        corporates?: {
            categories?: number,
            total?: number
        },
        opportunities?: {
            categories?: number,
            total?: number
        },
        partners?: {
            categories?: number,
            total?: number
        },
        startups?: {
            categories?: number,
            total?: number
        }
    },
    deals?: OpportunityType[],
    filters?: {
        businessModels?: OptionType[],
        corporates?: CategoryType[],
        opportunities?: CategoryType[],
        partners?: CategoryType[],
        startups?: CategoryType[],
        targetJobs?: OptionType[],
        targetSectors?: OptionType[],
        technologies?: OptionType[]
    },
    locale?: string,
    logos?: LogoType[],
    opportunities?: OpportunityType[],
    pagination?: {
        count?: number,
        limit?: number,
        message?: string,
        pages?: number
    },
    reason?: LogType,
    subcategories: CategoryType[],
    startups?: StartupType[],
    states?: unknown
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { PageType };