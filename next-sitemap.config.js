/** @type {import("next-sitemap").IConfig} */
module.exports = {
    sourceDir: "production",
    siteUrl: "https://interface.forinov.net",
    generateRobotsTxt: true,
    exclude: [ "/en-US/*", "/403", "/404", "/500" ],
    alternateRefs: [
        {
            href: "https://interface.forinov.net/fr-FR",
            hreflang: "fr",
        },
        {
            href: "https://interface.forinov.net/en-US",
            hreflang: "en",
        },
    ]
};