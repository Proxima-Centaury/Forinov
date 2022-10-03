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
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Open+Sans&display=swap" rel="stylesheet"/>
            <link rel="icon" href="/assets/logo.png"/>
            <title>Forinov</title>
        </Head>
        <body>
            <Main/>
            <NextScript/>
            <script src="https://kit.fontawesome.com/d095430534.js" crossorigin="anonymous"></script>
        </body>
    </Html>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Document;