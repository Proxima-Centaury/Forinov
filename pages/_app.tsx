/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { getTranslations } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Navbar from "../layout/navbar";
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
    const [ locale, setLocale ] = useState(pageProps.locale);
    const [ locales, setLocales ] = useState(pageProps.locales);
    const [ translations, setTranslations ] = useState(getTranslations(locale));
    const [ session, setSession ] = useState(false);
    const [ theme, setTheme ] = useState(getCookie("forinov_theme_preference") || "light");
    const [ lock, setLock ] = useState(true);
    const [ modal, setModal ] = useState(null);
    useEffect(() => setTranslations(getTranslations(locale)), [ locale ]);
    useEffect(() => {
        setCookie("NEXT_LOCALE", locale);
        if(router.pathname !== "/404") {
            router.push("/" + locale + router.asPath, "/" + locale + router.asPath, { locale: locale.toString() });
        };
    }, [ locale, router ]);
    useEffect(() => setLock(!session), [ session ]);
    useEffect(() => {
        setCookie("forinov_theme_preference", theme as String);
        const body = document.body;
        body.setAttribute("data-theme", theme as string);
    }, [ theme ]);
    pageProps.states = {};
    pageProps.states["locale"] = locale;
    pageProps.states["locales"] = locales;
    pageProps.states["translations"] = translations;
    pageProps.states["session"] = session;
    pageProps.states["theme"] = theme;
    pageProps.states["lock"] = lock;
    pageProps.states["modal"] = modal;
    pageProps.stateSetters = {};
    pageProps.stateSetters["setLocale"] = setLocale;
    pageProps.stateSetters["setLocales"] = setLocales;
    pageProps.stateSetters["setTranslations"] = setTranslations;
    pageProps.stateSetters["setSession"] = setSession;
    pageProps.stateSetters["setTheme"] = setTheme;
    pageProps.stateSetters["setLock"] = setLock;
    pageProps.stateSetters["setModal"] = setModal;
    pageProps.config = config;
    return <>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Forinov</title>
            <link rel="icon" href="/assets/logo.png"/>
        </Head>
        { (!session) ? <Navbar { ...pageProps }/> : null }
        <Transition>
            <GlobalContext>
                <Component { ...pageProps }/>
            </GlobalContext>
            <Footer { ...pageProps }/>
        </Transition>
        <Modal { ...pageProps }/>
        <Devtools { ...pageProps }/>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;