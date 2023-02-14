/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { getTranslations, getMetadataTranslations, scrollTo } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Navbar from "../layout/navbar";
import AuthNavbar from "../layout/authNavbar";
import Transition from "../layout/transition";
import Modal from "../layout/modal";
import Footer from "../layout/footer";
import Devtools from "../components/devtools/devtools";
import { GlobalContext } from "../components/context/globalContext";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import "../public/stylesheets/base.css";
import "../public/stylesheets/components/annuaire_searchbar.css";
import "../public/stylesheets/pages/annuaire_su.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* App */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [locale, setLocale] = useState(pageProps.locale);
    const [locales, setLocales] = useState(pageProps.locales);
    const [metadatas, setMetadatas] = useState(getMetadataTranslations(locale));
    const [translations, setTranslations] = useState(getTranslations(locale));
    const [session, setSession] = useState(false);
    const [theme, setTheme] = useState(getCookie("forinov_theme_preference") || "light");
    const [lock, setLock] = useState(true);
    const [modal, setModal] = useState(null);
    const [RGB, setRGB] = useState(false);
    const [production, setProduction] = useState((process.env.NODE_ENV === "development") ? false : true);
    useEffect(() => setMetadatas(getMetadataTranslations(locale)), [locale]);
    useEffect(() => setTranslations(getTranslations(locale)), [locale]);
    useEffect(() => {
        let refresh = null;
        if (router.pathname !== "/404" && locale !== getCookie("NEXT_LOCALE")) {
            setCookie("NEXT_LOCALE", locale);
            refresh = router.push("/" + locale + router.asPath, "/" + locale + router.asPath, { locale: locale.toString() }) as any;
        };
        return () => refresh = undefined;
    });
    useEffect(() => setLock(!session), [session]);
    useEffect(() => {
        setCookie("forinov_theme_preference", theme as String);
        const body = document.body;
        body.setAttribute("data-theme", theme as string);
    }, [theme]);
    useEffect(() => { scrollTo(0, 0) }, [router.route]);
    pageProps.states = {};
    pageProps.states["locale"] = locale;
    pageProps.states["locales"] = locales;
    pageProps.states["metadatas"] = metadatas;
    pageProps.states["translations"] = translations;
    pageProps.states["session"] = session;
    pageProps.states["theme"] = theme;
    pageProps.states["lock"] = lock;
    pageProps.states["modal"] = modal;
    pageProps.states["RGB"] = RGB;
    pageProps.states["production"] = production;
    pageProps.stateSetters = {};
    pageProps.stateSetters["setLocale"] = setLocale;
    pageProps.stateSetters["setLocales"] = setLocales;
    pageProps.stateSetters["setMetadatas"] = setMetadatas;
    pageProps.stateSetters["setTranslations"] = setTranslations;
    pageProps.stateSetters["setSession"] = setSession;
    pageProps.stateSetters["setTheme"] = setTheme;
    pageProps.stateSetters["setLock"] = setLock;
    pageProps.stateSetters["setModal"] = setModal;
    pageProps.stateSetters["setRGB"] = setRGB;
    pageProps.stateSetters["setProduction"] = setProduction;
    pageProps.config = config;
    pageProps.router = router;
    return <>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Forinov</title>
            <link rel="icon" href={ router.basePath + "/assets/logo.png" }/>
        </Head>
        {(!session) ? <Navbar {...pageProps} /> : <AuthNavbar {...pageProps} />}
        <Transition>
            <GlobalContext>
                <Component {...pageProps} />
            </GlobalContext>
            <Footer {...pageProps} />
        </Transition>
        <Modal {...pageProps} />
        {(!production) ? <Devtools {...pageProps} /> : null}
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;