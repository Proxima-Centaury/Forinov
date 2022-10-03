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
            <meta charSet="utf-8"/>
            <link rel="stylesheet" href={ href } integrity={ integrity } crossOrigin={ crossOrigin } referrerPolicy={ referrerPolicy }/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Open+Sans&display=swap" rel="stylesheet"/>
            <link rel="icon" href="/assets/logo.png"/>
        </Head>
        <body>
            <Main/>
            <NextScript/>
            <script src="https://kit.fontawesome.com/d095430534.js" crossOrigin="anonymous" async></script>
        </body>
    </Html>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Document;