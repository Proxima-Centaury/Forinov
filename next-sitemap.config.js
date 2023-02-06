/** @type {import("next-sitemap").IConfig} */
module.exports = {
    sourceDir: "production",
    siteUrl: process.env.SITE_URL || "https://interface.forinov.net",
    generateRobotsTxt: true,
    alternateRefs: [
        {
            href: "https://interface.forinov.net/fr-FR",
            hreflang: "fr",
        },
        {
            href: "https://interface.forinov.net/en-EN",
            hreflang: "en",
        },
    ]
};