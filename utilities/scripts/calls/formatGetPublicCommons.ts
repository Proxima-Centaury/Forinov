/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { CategoryType, UnknownCategoryType } from "@typescript/types/CategoryType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst } from "@scripts/uppercaseFirst";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Public Commons */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetPublicCommons = (response: UnknownResponseType): ResponseType => {
    const corporatesCategories = response?.CORPORATES_SECTORS || [];
    const opportunitiesCategories = response?.OPPORTUNITIES || [];
    const partnersCategories = response?.PARTNERS_TYPES || [];
    const startupsCategories = response?.CATEGORIES || [];
    return {
        categories: {
            corporates: corporatesCategories.map((sector: UnknownCategoryType): CategoryType => ({
                id: parseInt(sector?.ID) || 0,
                count: parseInt(sector?.COUNT) || 0,
                logo: sector?.LOGO || "",
                name: sector?.NAME || ""
            })) || null,
            opportunities: opportunitiesCategories.map((opportunity: UnknownCategoryType): CategoryType => ((parseInt(opportunity?.ID) !== 5) ? {
                id: parseInt(opportunity?.ID) || 0,
                count: parseInt(opportunity?.COUNT) || 0,
                name: uppercaseFirst(opportunity?.NAME) || ""
            } : {
                id: parseInt(opportunity?.ID) || 0,
                count: parseInt(opportunity?.COUNT) || 0,
                name: uppercaseFirst(opportunity?.NAME) || "",
                deals: {
                    categories: opportunity?.CATEGORIES?.map((category: UnknownCategoryType): CategoryType => ({
                        id: parseInt(category?.ID) || 0,
                        name: uppercaseFirst(category?.NAME) || "",
                        subcategories: category?.SUBCATEGORIES?.map((subcategory: UnknownCategoryType): CategoryType => ({
                            id: parseInt(subcategory?.ID) || 0,
                            name: subcategory?.NAME || ""
                        })) || []
                    })) || []
                }
            })),
            partners: partnersCategories.map((types: UnknownCategoryType): CategoryType => ({
                id: parseInt(types?.ID) || 0,
                count: parseInt(types?.COUNT) || 0,
                logo: types?.LOGO || "",
                name: uppercaseFirst(types?.NAME) || ""
            })) || [],
            startups: startupsCategories.map((category: UnknownCategoryType): CategoryType => ({
                id: parseInt(category?.ID) || 0,
                count: parseInt(category?.COUNT) || 0,
                logo: category?.LOGO || "",
                name: uppercaseFirst(category?.NAME) || "",
                subcategories: category?.SSCAT?.map((subcategory: UnknownCategoryType): CategoryType => ({
                    id: parseInt(subcategory?.ID) || 0,
                    name: subcategory?.NAME || ""
                })) || []
            })) || []
        },
        // others: {
        //     businessmodels: response?.BUSINESSMODELS?.map((businessmodel: any) => ({
        //         id: parseInt(businessmodel?.ID) || null,
        //         count: parseInt(businessmodel?.COUNT) || 0,
        //         name: businessmodel?.NAME || null
        //     })) || [],
        //     targetjobs: response?.JOBS?.map((job: any) => ({
        //         id: parseInt(job?.ID) || null,
        //         count: parseInt(job?.COUNT) || 0,
        //         name: job?.NAME || null
        //     })) || [],
        //     targetsectors: response?.SECTORS?.map((sector: any) => ({
        //         id: parseInt(sector?.ID) || null,
        //         count: parseInt(sector?.COUNT) || 0,
        //         name: sector?.NAME || null
        //     })) || [],
        //     technologies: response?.TECHNOLOGIES?.map((technology: any) => ({
        //         id: parseInt(technology?.ID) || null,
        //         count: parseInt(technology?.COUNT) || 0,
        //         name: technology?.NAME || null
        //     })) || []
        // },
        counters: {
            corporates: {
                categories: parseInt(response?.CORPORATES_SECTORS?.length) || 0,
                total: parseInt(response?.CORPORATES) || 0
            },
            opportunities: {
                categories: parseInt(response?.OPPORTUNITIES?.length) || 0,
                total: parseInt(response?.OPPORTUNITIES_COUNT) || 0
            },
            partners: {
                categories: parseInt(response?.PARTNERS_TYPES?.length) || 0,
                total: parseInt(response?.PARTNERS) || 0
            },
            startups: {
                categories: parseInt(response?.CATEGORIES?.length) || 0,
                total: parseInt(response?.STARTUPS) || 0
            },
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetPublicCommons };