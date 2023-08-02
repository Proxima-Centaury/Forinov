/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ArticleType } from "@typescript/types/ArticleType";
import type { CategoryType } from "@typescript/types/CategoryType";
import type { LogoType } from "./LogoType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
import type { OptionType } from "@typescript/types/OptionType";
import type { StartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Response Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type ResponseType = {
    request: {
        log?: string,
        response?: {
            cause?: string,
            status?: {
                code?: number,
                message?: string
            }
        },
        timestamp?: number,
        type?: "error" | "log" | "success"
    },
    response: {
        articles?: ArticleType[],
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
        logos?: LogoType[],
        opportunities?: OpportunityType[],
        pagination?: {
            count?: number,
            limit?: number,
            message?: string,
            pages?: number
        },
        startups?: StartupType[],
    }
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Unknown Response Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type UnknownResponseType = {
    [key: string]: any
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export type { ResponseType, UnknownResponseType };