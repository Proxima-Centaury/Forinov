/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { Html, Head, Main, NextScript } from "next/document";
import config from "../config.json";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Document */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
function Document() {
    const { href, integrity, crossOrigin, referrerPolicy } = config.fontawesome;
    return <Html>
        <Head>
            <link rel="stylesheet" href={ href } integrity={ integrity } crossOrigin={ crossOrigin } referrerPolicy={ referrerPolicy }/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Open+Sans&display=swap" rel="stylesheet"/>
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Document;