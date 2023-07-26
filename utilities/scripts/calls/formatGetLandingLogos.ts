/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Logos */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingLogos = (response: any): object => {
    return Object.values(response.LOGOS).map((logo: any) => ({
        id: parseInt(logo.id),
        logo: logo.logo,
        name: logo.name,
    }));
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingLogos };