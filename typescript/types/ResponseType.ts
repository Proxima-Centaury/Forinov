/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ArticleType } from "@typescript/types/ArticleType";
import type { CategoryType } from "@typescript/types/CategoryType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Response Type */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
type ResponseType = {
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
    opportunities?: OpportunityType[]
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