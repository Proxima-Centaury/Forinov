/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Next Config */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/** @type { import('next').NextConfig } */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Config */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [ "www.forinov.fr", "dev.forinov.fr" ],
    },
    i18n: {
        defaultLocale: "fr-FR",
        locales: [ "fr-FR", "en-US" ],
        domains: [
            { domain: "interface.forinov.net", defaultLocale: "fr-FR", locales: [ "fr-BE", "fr-CA" ] }
        ]
    }
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = nextConfig;