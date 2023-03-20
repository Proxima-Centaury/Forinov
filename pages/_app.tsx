/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { getTranslations, getMetadatasTranslations, scrollTo } from "../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Navbar from "../layout/navbar";
import AuthNavbar from "../layout/authNavbar";
import Transition from "../layout/transition";
import Modal from "../layout/modal";
import Footer from "../layout/footer";
import Devtools from "../components/devtools/devtools";
import { GlobalContext } from "../components/context/globalContext";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import baseConfigurations from "../configurations/config.json";
import apiConfigurations from "../configurations/api.json";
import resourcesConfigurations from "../configurations/resources.json";
import layoutConfigurations from "../configurations/layout.json";
import carouselsConfigurations from "../configurations/carousels.json";
import accordionsConfigurations from "../configurations/accordions.json";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import "../public/stylesheets/base.css";
import "../public/stylesheets/components/annuaire_searchbar.css";
import "../public/stylesheets/pages/annuaire_su.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* App */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [ locale, setLocale ] = useState(pageProps.locale);
    const [ locales, setLocales ] = useState(pageProps.locales);
    const [ metadatas, setMetadatas ] = useState(getMetadatasTranslations(locale));
    const [ translations, setTranslations ] = useState(getTranslations(locale));
    const [ session, setSession ] = useState(false);
    const [ theme, setTheme ] = useState(getCookie("forinov_theme_preference") || "light");
    const [ lock, setLock ] = useState(true);
    const [ modal, setModal ] = useState(null);
    const [ RGB, setRGB ] = useState(false);
    const [ production, setProduction ] = useState((process.env.NODE_ENV === "development") ? false : true);
    useEffect(() => {
        setMetadatas(getMetadatasTranslations(locale));
        setTranslations(getTranslations(locale));
    }, [ locale ]);
    useEffect(() => {
        if(router.pathname !== "/404" && locale !== getCookie("NEXT_LOCALE")) {
            setCookie("NEXT_LOCALE", locale, { sameSite: "strict" });
            router.push("/" + locale + router.asPath, "/" + locale + router.asPath, { locale: locale.toString() });
        };
    });
    useEffect(() => setLock(!session), [ session ]);
    useEffect(() => {
        let applyTheme = () => {
            setCookie("forinov_theme_preference", theme, { sameSite: "strict" });
            const body = document.body;
            return body.setAttribute("data-theme", theme as string);
        }; applyTheme();
        return () => { applyTheme = () => false };
    }, [ theme ]);
    useEffect(() => scrollTo(0, 0) as any, [ router.route ]);
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
    pageProps.baseConfigurations = baseConfigurations;
    pageProps.apiConfigurations = apiConfigurations;
    pageProps.resourcesConfigurations = resourcesConfigurations;
    pageProps.layoutConfigurations = layoutConfigurations;
    pageProps.carouselsConfigurations = carouselsConfigurations;
    pageProps.accordionsConfigurations = accordionsConfigurations;
    pageProps.router = router;
    return <>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Forinov</title>
            <link rel="icon" href={ router.basePath + "/assets/logo.png" }/>
        </Head>
        { (router.query.ui && router.query.ui == "false") ? null : (!session) ? <Navbar { ...pageProps }/> : <AuthNavbar { ...pageProps }/> }
        <Transition>
            <GlobalContext>
                <Component { ...pageProps }/>
            </GlobalContext>
            { (router.query.ui && router.query.ui == "false") ? null : <Footer { ...pageProps }/> }
        </Transition>
        <Modal { ...pageProps }/>
        { (router.query.ui && router.query.ui == "false") ? null : (!production) ? <Devtools { ...pageProps }/> : null }
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;