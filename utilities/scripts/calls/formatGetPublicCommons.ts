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
            corporates: response.CORPORATES_SECTORS.map((sector: any) => ({
                id: parseInt(sector.ID),
                count: parseInt(sector.COUNT),
                logo: sector.LOGO,
                name: sector.NAME
            })),
            opportunities: response.OPPORTUNITIES.map((opportunity: any) => ((parseInt(opportunity.ID) !== 5) ? {
                id: parseInt(opportunity.ID),
                count: parseInt(opportunity.COUNT),
                name: uppercaseFirst(opportunity.NAME)
            } : {
                id: parseInt(opportunity.ID),
                count: parseInt(opportunity.COUNT),
                name: uppercaseFirst(opportunity.NAME),
                deals: {
                    categories: opportunity?.CATEGORIES?.map((category: any) => ({
                        id: parseInt(category.ID),
                        name: uppercaseFirst(category.NAME),
                        subcategories: category.SUBCATEGORIES.map((subcategory: any) => ({
                            id: parseInt(subcategory.ID),
                            name: subcategory.NAME
                        }))
                    })) || null
                }
            })),
            partners: response.PARTNERS_TYPES.map((types: any) => ({
                id: parseInt(types.ID),
                count: parseInt(types.COUNT),
                logo: types.LOGO,
                name: uppercaseFirst(types.NAME)
            })),
            startups: response.CATEGORIES.map((category: any) => ({
                id: parseInt(category.ID),
                count: parseInt(category.COUNT),
                logo: category.LOGO,
                name: uppercaseFirst(category.NAME),
                subcategories: category.SSCAT.map((subcategory: any) => ({
                    id: parseInt(subcategory.ID),
                    name: subcategory.NAME
                }))
            }))
        },
        others: {
            businessmodels: response.BUSINESSMODELS.map((businessmodel: any) => ({
                id: parseInt(businessmodel.ID),
                count: parseInt(businessmodel.COUNT),
                name: businessmodel.NAME
            })),
            targetjobs: response.JOBS.map((job: any) => ({
                id: parseInt(job.ID),
                count: parseInt(job.COUNT),
                name: job.NAME
            })),
            targetsectors: response.SECTORS.map((sector: any) => ({
                id: parseInt(sector.ID),
                count: parseInt(sector.COUNT),
                name: sector.NAME
            })),
            technologies: response.TECHNOLOGIES.map((technology: any) => ({
                id: parseInt(technology.ID),
                count: parseInt(technology.COUNT),
                name: technology.NAME
            }))
        },
        counters: {
            corporates: {
                categories: parseInt(response.CORPORATES_SECTORS.length),
                total: parseInt(response.CORPORATES)
            },
            opportunities: {
                categories: parseInt(response.OPPORTUNITIES.length),
                total: parseInt(response.OPPORTUNITIES_COUNT)
            },
            partners: {
                categories: parseInt(response.PARTNERS_TYPES.length),
                total: parseInt(response.PARTNERS)
            },
            startups: {
                categories: parseInt(response.CATEGORIES.length),
                total: parseInt(response.STARTUPS)
            },
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetPublicCommons };