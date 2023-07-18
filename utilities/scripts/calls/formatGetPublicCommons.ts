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
            corporates: response[0].CORPORATES_SECTORS.map((sector: any) => ({
                id: parseInt(sector.ID),
                count: parseInt(sector.COUNT),
                logo: sector.LOGO,
                name: sector.NAME
            })),
            opportunities: response[0].OPPORTUNITIES.map((opportunity: any) => ((parseInt(opportunity.ID) !== 5) ? {
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
            partners: response[0].PARTNERS_TYPES.map((types: any) => ({
                id: parseInt(types.ID),
                count: parseInt(types.COUNT),
                logo: types.LOGO,
                name: uppercaseFirst(types.NAME)
            })),
            startups: response[0].CATEGORIES.map((category: any) => ({
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
            businessmodels: response[0].BUSINESSMODELS.map((businessmodel: any) => ({
                id: parseInt(businessmodel.ID),
                count: parseInt(businessmodel.COUNT),
                name: businessmodel.NAME
            })),
            targetjobs: response[0].JOBS.map((job: any) => ({
                id: parseInt(job.ID),
                count: parseInt(job.COUNT),
                name: job.NAME
            })),
            targetsectors: response[0].SECTORS.map((sector: any) => ({
                id: parseInt(sector.ID),
                count: parseInt(sector.COUNT),
                name: sector.NAME
            })),
            technologies: response[0].TECHNOLOGIES.map((technology: any) => ({
                id: parseInt(technology.ID),
                count: parseInt(technology.COUNT),
                name: technology.NAME
            })),
            countries: response[0].COUNTRIES.map((country: any) => ({
                id: parseInt(country.ID),
                code: country.CODE,
                count: parseInt(country.COUNT),
                name: country.NAME,
                regions: country.REGIONS
            }))
        },
        counters: {
            corporates: {
                categories: parseInt(response[0].CORPORATES_SECTORS.length),
                total: parseInt(response[0].CORPORATES)
            },
            opportunities: {
                categories: parseInt(response[0].OPPORTUNITIES.length),
                total: parseInt(response[0].OPPORTUNITIES_COUNT)
            },
            partners: {
                categories: parseInt(response[0].PARTNERS_TYPES.length),
                total: parseInt(response[0].PARTNERS)
            },
            startups: {
                categories: parseInt(response[0].CATEGORIES.length),
                total: parseInt(response[0].STARTUPS)
            },
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetPublicCommons };