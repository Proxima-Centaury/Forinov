/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { NextRequest, NextResponse } from "next/server";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Constants */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const PUBLIC_FILE = /\.(.*)$/;
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Middleware */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const middleware = async (request: NextRequest) => {
    const basePath = (process.env.NODE_ENV === "production") ? "/" : "/dev";
    const acceptedLanguages = request.headers.get("Accept-Language")?.split(",");
    const filtered = acceptedLanguages?.map((language, key) => (key % 2 === 1) ? language : null).filter((language) => language !== null);
    const languages = filtered?.map((language) => language?.substring(0, language.indexOf(";")));
    if(request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname.includes("/api/") || PUBLIC_FILE.test(request.nextUrl.pathname)) {
        return;
    };
    const urlLocale = request.cookies.get("forinov/i18next")?.toString() || request.nextUrl.locale;
    if(!languages?.includes(urlLocale)) {
        request.cookies.set("forinov/i18next", "fr");
        return NextResponse.redirect(new URL(`${ basePath }/fr${ request.nextUrl.pathname }${ request.nextUrl.search }`, request.url));
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default middleware;