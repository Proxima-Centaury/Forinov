/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Fragment, useMemo, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Navbar from "@layouts/navbar";
import Footer from "@layouts/footer";
// const Modal = dynamic(() => import("../layout/modal"));
import ClassicButton from "@buttons/classicButton";
import Tooltip from "@tooltips/defaultTooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
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
	const { asPath, query } = router;
	const { ui } = query;
    const [ states, setStates ] = useState({
        errors: [],
        session: null,
        interface: (ui) ? false : true,
        theme: "light",
        limited: true,
        modal: null,
        production: (process.env.NODE_ENV === "development") ? false : true
    });
    const memorizedStates = useMemo(() => ({ ...states }), [ states ]);
    useEffect(() => { scrollTo(0, 0) }, [ asPath ]);
    pageProps.states = { ...memorizedStates };
    pageProps.setStates = setStates;
    return <Fragment>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" href="/assets/logo.ico"/>
        </Head>
        <Navbar/>
        <Component { ...pageProps }/>
        <Footer/>
        {/* { (!checkMatch(router.asPath, "/administration")) ? ((router.query.ui && router.query.ui == "false") ? null : <Footer { ...pageProps }/>) : null } */}
        {/* <Modal { ...pageProps }/> */}
        {/* { (router.query.ui && router.query.ui == "false") ? null : (!production) ? <Devtools { ...pageProps }/> : null } */}
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default appWithTranslation(App);