/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Html, Head, Main, NextScript } from "next/document";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { LinkHTMLAttributes } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { buildFonts } from "@scripts/buildFonts";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Document */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Document = (): JSX.Element => {
    const fontawesomeProps: LinkHTMLAttributes<HTMLLinkElement> = {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css",
        integrity: "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=:",
        crossOrigin: "anonymous",
        referrerPolicy: "no-referrer"
    };
    const fontsProps: LinkHTMLAttributes<HTMLLinkElement> = {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?" + buildFonts("Nunito Sans", "Open Sans", "Montserrat Alternates", "Roboto") + "&display=swap"
    };
    return <Html>
        <Head>
            <meta name="application-name" content="Forinov"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
            <meta name="apple-mobile-web-app-title" content="Forinov"/>
            <meta name="description" content="Forinov PWA"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="msapplication-config" content="/icons/browserconfig.xml"/>
            <meta name="msapplication-TileColor" content="#2B5797"/>
            <meta name="msapplication-tap-highlight" content="no"/>
            <meta name="theme-color" content="#000000"/>
            <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png"/>
            <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:url" content="https://interface.forinov.net"/>
            <meta name="twitter:title" content="Forinov"/>
            <meta name="twitter:description" content="Best PWA App in the world"/>
            <meta name="twitter:image" content="https://interface.forinov.net/icons/android-chrome-192x192.png"/>
            <meta name="twitter:creator" content="@DavidWShadow"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content="Forinov"/>
            <meta property="og:description" content="Forinov PWA"/>
            <meta property="og:site_name" content="Forinov"/>
            <meta property="og:url" content="https://interface.forinov.net"/>
            <meta property="og:image" content="https://interface.forinov.net/icons/apple-touch-icon.png"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link { ...fontsProps }/>
            <link { ...fontawesomeProps }/>
        </Head>
        <body>
            <Main/>
            <NextScript/>
            <script src="https://kit.fontawesome.com/d095430534.js" crossOrigin="anonymous" async/>
        </body>
    </Html>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Document;