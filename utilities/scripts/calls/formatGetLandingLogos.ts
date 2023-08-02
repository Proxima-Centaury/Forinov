/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { ResponseType, UnknownResponseType } from "@typescript/types/ResponseType";
import type { LogoType, UnknownLogoType } from "@typescript/types/LogoType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Format Get Landing Logos */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const formatGetLandingLogos = (response: UnknownResponseType): ResponseType => {
    const logos: UnknownLogoType[] = Object.values(response?.LOGOS) || [];
    return {
        request: {},
        response: {
            items: logos.map((logo: UnknownLogoType): LogoType => ({
                id: parseInt(logo?.id) || 0,
                logo: logo?.logo || "",
                name: logo?.name || "",
            }))
        }
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { formatGetLandingLogos };