/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst } from "@scripts/uppercaseFirst";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Public Commons */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetPublicCommons = (response: any): object => {
    return {
        categories: {
            corporates: response?.CORPORATES_SECTORS.map((sector: any) => ({
                id: parseInt(sector?.ID) || null,
                count: parseInt(sector?.COUNT) || 0,
                logo: sector?.LOGO || null,
                name: sector?.NAME || null
            })) || null,
            opportunities: response?.OPPORTUNITIES.map((opportunity: any) => ((parseInt(opportunity?.ID) !== 5) ? {
                id: parseInt(opportunity?.ID) || null,
                count: parseInt(opportunity?.COUNT) || 0,
                name: uppercaseFirst(opportunity?.NAME) || null
            } : {
                id: parseInt(opportunity?.ID) || null,
                count: parseInt(opportunity?.COUNT) || 0,
                name: uppercaseFirst(opportunity?.NAME) || null,
                deals: {
                    categories: opportunity?.CATEGORIES.map((category: any) => ({
                        id: parseInt(category?.ID) || null,
                        name: uppercaseFirst(category?.NAME) || null,
                        subcategories: category?.SUBCATEGORIES.map((subcategory: any) => ({
                            id: parseInt(subcategory?.ID) || null,
                            name: subcategory?.NAME || null
                        })) || []
                    })) || []
                }
            })),
            partners: response?.PARTNERS_TYPES.map((types: any) => ({
                id: parseInt(types?.ID) || null,
                count: parseInt(types?.COUNT) || 0,
                logo: types?.LOGO || null,
                name: uppercaseFirst(types?.NAME) || null
            })) || [],
            startups: response?.CATEGORIES.map((category: any) => ({
                id: parseInt(category?.ID) || null,
                count: parseInt(category?.COUNT) || 0,
                logo: category?.LOGO || null,
                name: uppercaseFirst(category?.NAME) || null,
                subcategories: category?.SSCAT.map((subcategory: any) => ({
                    id: parseInt(subcategory?.ID) || null,
                    name: subcategory?.NAME || null
                })) || []
            })) || []
        },
        others: {
            businessmodels: response?.BUSINESSMODELS.map((businessmodel: any) => ({
                id: parseInt(businessmodel?.ID) || null,
                count: parseInt(businessmodel?.COUNT) || 0,
                name: businessmodel?.NAME || null
            })) || [],
            targetjobs: response?.JOBS.map((job: any) => ({
                id: parseInt(job?.ID) || null,
                count: parseInt(job?.COUNT) || 0,
                name: job?.NAME || null
            })) || [],
            targetsectors: response?.SECTORS.map((sector: any) => ({
                id: parseInt(sector?.ID) || null,
                count: parseInt(sector?.COUNT) || 0,
                name: sector?.NAME || null
            })) || [],
            technologies: response?.TECHNOLOGIES.map((technology: any) => ({
                id: parseInt(technology?.ID) || null,
                count: parseInt(technology?.COUNT) || 0,
                name: technology?.NAME || null
            })) || []
        },
        counters: {
            corporates: {
                categories: parseInt(response.CORPORATES_SECTORS.length) || 0,
                total: parseInt(response.CORPORATES) || 0
            },
            opportunities: {
                categories: parseInt(response.OPPORTUNITIES.length) || 0,
                total: parseInt(response.OPPORTUNITIES_COUNT) || 0
            },
            partners: {
                categories: parseInt(response.PARTNERS_TYPES.length) || 0,
                total: parseInt(response.PARTNERS) || 0
            },
            startups: {
                categories: parseInt(response.CATEGORIES.length) || 0,
                total: parseInt(response.STARTUPS) || 0
            },
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetPublicCommons };