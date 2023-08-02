/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { CategoryType, UnknownCategoryType } from "@typescript/types/CategoryType";
import type { OptionType, UnknownOptionType } from "@typescript/types/OptionType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst } from "@scripts/uppercaseFirst";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Public Commons */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetPublicCommons = (response: UnknownResponseType): ResponseType => {
    const corporatesCategories = (response instanceof Error) ? [] : response.CORPORATES_SECTORS;
    const opportunitiesCategories = (response instanceof Error) ? [] : response.OPPORTUNITIES;
    const partnersCategories = (response instanceof Error) ? [] : response.PARTNERS_TYPES;
    const startupsCategories = (response instanceof Error) ? [] : response.CATEGORIES;
    const businessModelsFilter = (response instanceof Error) ? [] : response.BUSINESSMODELS;
    const targetJobsFilter = (response instanceof Error) ? [] : response.JOBS;
    const targetSectorsFilter = (response instanceof Error) ? [] : response.SECTORS;
    const technologiesFilter = (response instanceof Error) ? [] : response.TECHNOLOGIES;
    return {
        request: {},
        response: {
            filters: {
                businessModels: businessModelsFilter.map((businessModel: UnknownOptionType): OptionType => ({
                    id: parseInt(businessModel?.ID) || 0,
                    count: parseInt(businessModel?.COUNT) || 0,
                    name: businessModel?.NAME || ""
                })) || [],
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
                })) || [],
                targetJobs: targetJobsFilter.map((job: UnknownOptionType): OptionType => ({
                    id: parseInt(job?.ID) || 0,
                    count: parseInt(job?.COUNT) || 0,
                    name: job?.NAME || ""
                })) || [],
                targetSectors: targetSectorsFilter.map((sector: UnknownOptionType): OptionType => ({
                    id: parseInt(sector?.ID) || 0,
                    count: parseInt(sector?.COUNT) || 0,
                    name: sector?.NAME || ""
                })) || [],
                technologies: technologiesFilter.map((technology: UnknownOptionType): OptionType => ({
                    id: parseInt(technology?.ID) || 0,
                    count: parseInt(technology?.COUNT) || 0,
                    name: technology?.NAME || ""
                })) || []
            },
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
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetPublicCommons };