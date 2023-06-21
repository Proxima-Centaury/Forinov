/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Html, Head, Main, NextScript } from "next/document";
import { Fragment, Key, MouseEventHandler, useMemo, useEffect, useState, useRef, LinkHTMLAttributes } from "react";
import { buildFonts } from "@scripts/utilities";
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
        href: "https://fonts.googleapis.com/css2?" + buildFonts("Nunito Sans", "Open Sans", "Montserrat Alternates") + "&display=swap"
    };
    return <Html>
        <Head>
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