/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getTranslations } from "../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../config.json";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import "../public/stylesheets/base.css";
// import "../public/stylesheets/navbar.css";
// import "../public/stylesheets/footer.css";
// import "../public/stylesheets/pages.css";
// import "../public/stylesheets/components.css";
// import "../public/stylesheets/widgets.css";
// import "../public/stylesheets/components/annuaire_searchbar.css"
// import "../public/stylesheets/pages/login.css"
// import "../public/stylesheets/pages/annuaire_su.css"
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const App = ({ Component, pageProps }: AppProps) => {
    const [ locale, setLocale ] = useState(pageProps.locale);
    const [ locales, setLocales ] = useState(pageProps.locales);
    const [ translations, setTranslations ] = useState(getTranslations(locale));
    const [ session, setSession ] = useState(false);
    const [ lock, setLock ] = useState(true);
    const [ modal, setModal ] = useState(null);
    useEffect(() => setTranslations(getTranslations(locale)), [ locale ]);
    pageProps.states = {};
    pageProps.states["locale"] = locale;
    pageProps.states["locales"] = locales;
    pageProps.states["translations"] = translations;
    pageProps.states["session"] = session;
    pageProps.states["lock"] = lock;
    pageProps.states["modal"] = modal;
    pageProps.stateSetters = {};
    pageProps.stateSetters["setLocale"] = setLocale;
    pageProps.stateSetters["setLocales"] = setLocales;
    pageProps.stateSetters["setTranslations"] = setTranslations;
    pageProps.stateSetters["setSession"] = setSession;
    pageProps.stateSetters["setLock"] = setLock;
    pageProps.stateSetters["setModal"] = setModal;
    pageProps.config = {};
    pageProps.config["locales"] = config.locales;
    return <>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Forinov</title>
            <link rel="icon" href="/assets/logo.png"/>
        </Head>
        <Navbar { ...pageProps }/>
        <div className="container">
            {/* <Component { ...pageProps }/> */}
            {/* <Footer { ...pageProps }/> */}
        </div>
        {/* <Modal { ...pageProps }/> */}
    </>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;