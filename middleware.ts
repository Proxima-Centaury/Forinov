/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { NextRequest, NextResponse } from "next/server";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Constants */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const PUBLIC_FILE = /\.(.*)$/;
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Middleware */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const middleware = async (request: NextRequest) => {
    if(request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname.includes("/api/") || PUBLIC_FILE.test(request.nextUrl.pathname)) {
        return;
    };
    if(request.nextUrl.locale === "default") {
        const locale = request.cookies.get("NEXT_LOCALE") || "fr-FR";
        return NextResponse.redirect(new URL(`/${ locale }${ request.nextUrl.pathname }${ request.nextUrl.search }`, request.url));
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default middleware;