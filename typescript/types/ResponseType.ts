/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ArticleType } from "@typescript/types/ArticleType";
import type { CategoryType } from "@typescript/types/CategoryType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
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
        categories?: {
            corporates?: CategoryType[],
            opportunities?: CategoryType[],
            partners?: CategoryType[],
            startups?: CategoryType[]
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
        opportunities?: OpportunityType[],
        items?: OpportunityType[] | StartupType[],
        pagination?: {
            count?: number,
            limit?: number,
            message?: string,
            pages?: number
        }
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