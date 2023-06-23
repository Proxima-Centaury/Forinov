/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Fragment, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
// import Navbar from "../layout/navbar";
// import AuthNavbar from "../layout/authNavbar";
// import Footer from "../layout/footer";
// const Modal = dynamic(() => import("../layout/modal"));
// const Devtools = dynamic(() => import("../components/devtools/devtools"));
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { scrollTo } from "@scripts/scrollTo";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import "@stylesheets/base.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const router = useRouter();
	const { basePath, asPath, query } = router;
	const { ui } = query;
    const { i18n, t } = useTranslation("common");
    const [ states, setStates ] = useState({
        errors: [],
        session: null,
        language: i18n.language,
        languages: pageProps.locales,
        interface: (ui) ? false : true,
        theme: "light",
        limited: true,
        modal: null,
        production: (process.env.NODE_ENV === "development") ? false : true
    });
    const { session, production } = states;
    useEffect(() => (session) ? setStates((states) => ({ ...states, limited: false })) : undefined, [ session ]);
    useEffect(() => { scrollTo(0, 0) }, [ asPath ]);
    pageProps.states = { ...states };
    pageProps.setStates = setStates;
    return <Fragment>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" href={ `${ basePath }/assets/logo.ico` }/>
        </Head>
        {/* { (!checkMatch(router.asPath, "/administration")) ? ((router.query.ui && router.query.ui == "false") ? null : (!session) ? <Navbar { ...pageProps }/> : <AuthNavbar { ...pageProps }/>) : null } */}
        { (!production) ? <div className="developmentModeIndicator">
            <span className="dot"/>
            <span>{ t("developmentModeIndicator") }</span>
        </div> : null }
        <Component { ...pageProps }/>
        {/* { (!checkMatch(router.asPath, "/administration")) ? ((router.query.ui && router.query.ui == "false") ? null : <Footer { ...pageProps }/>) : null } */}
        {/* <Modal { ...pageProps }/> */}
        {/* { (router.query.ui && router.query.ui == "false") ? null : (!production) ? <Devtools { ...pageProps }/> : null } */}
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default appWithTranslation(App);