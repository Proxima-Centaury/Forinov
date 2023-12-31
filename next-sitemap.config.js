/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Next Site Map Configuration */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/** @type {import("next-sitemap").IConfig} */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Configuration */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const nextSiteMapConfiguration = {
    sourceDir: "production",
    siteUrl: "https://interface.forinov.net",
    generateRobotsTxt: true,
    exclude: [ "/en-US/*", "/403", "/404", "/500", "/server-sitemap-index.xml" ],
    alternateRefs: [
        {
            href: "https://interface.forinov.net/fr-FR",
            hreflang: "fr",
        },
        {
            href: "https://interface.forinov.net/en-US",
            hreflang: "en",
        },
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
          "https://interface.forinov.net/server-sitemap-index.xml"
        ]
    }
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
module.exports = nextSiteMapConfiguration;