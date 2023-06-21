/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { getTranslations, getMetaDatasTranslations, scrollTo, checkMatch } from "../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
import Navbar from "../layout/navbar";
import AuthNavbar from "../layout/authNavbar";
import Transition from "../layout/transition";
import Footer from "../layout/footer";
const Modal = dynamic(() => import("../layout/modal"));
const Devtools = dynamic(() => import("../components/devtools/devtools"));
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* JSON */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import baseConfigurations from "../configurations/config.json";
import apiConfigurations from "../configurations/api.json";
import resourcesConfigurations from "../configurations/resources.json";
import layoutConfigurations from "../configurations/layout.json";
import carouselsConfigurations from "../configurations/carousels.json";
import accordionsConfigurations from "../configurations/accordions.json";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import "../public/stylesheets/base.css";
import "../public/stylesheets/tests.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const { ui } = router.query;
    const [ errors, setErrors ] = useState({});
    const [ locale, setLocale ] = useState(pageProps.locale);
    const [ locales, setLocales ] = useState(pageProps.locales);
    const [ metadatas, setMetadatas ] = useState(getMetaDatasTranslations(locale));
    const [ translations, setTranslations ] = useState(getTranslations(locale));
    const [ session, setSession ] = useState(false);
    const [ theme, setTheme ] = useState(getCookie("forinov_theme_preference") || "light");
    const [ lock, setLock ] = useState(true);
    const [ modal, setModal ] = useState(null);
    const [ RGB, setRGB ] = useState(getCookie("forinov_rgb_preference") || false);
    const [ production, setProduction ] = useState((process.env.NODE_ENV === "development") ? false : true);
    useEffect(() => {
        setMetadatas(getMetaDatasTranslations(locale));
        setTranslations(getTranslations(locale));
    }, [ locale ]);
    useEffect(() => {
        if(!router.query.ui) {
            if(router.pathname !== "/404" && locale !== getCookie("NEXT_LOCALE")) {
                setCookie("NEXT_LOCALE", locale, { sameSite: "strict" });
                router.push("/" + locale + router.asPath, "/" + locale + router.asPath, { locale: locale.toString() });
            };
        };
    });
    useEffect(() => setLock(!session), [ session ]);
    useEffect(() => {
        let applyTheme = () => {
            setCookie("forinov_theme_preference", theme, { sameSite: "strict" });
            const body = document.body;
            const canvas = document.querySelector("canvas#canvas") as HTMLCanvasElement;
            if(canvas) {
                switch(theme) {
                    case "matrix":
                        const ctx = (canvas) ? canvas.getContext("2d") : null;
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん0123456789".repeat(10).split("");
                        const fontSize = 16;
                        const columns = canvas.width / fontSize;
                        let drops: Array<any> = [];
                        for(let i = 0; i < columns; i++) {
                            drops[i] = 1;
                        };
                        const draw = () => {
                            if(ctx) {
                                ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                for(var i = 0; i < drops.length; i++) {
                                    var text = letters[Math.floor(Math.random() * letters.length)];
                                    ctx.fillStyle = "#0F0";
                                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                                    drops[i]++;
                                    if(drops[i] * fontSize > canvas.height && Math.random() > .95) {
                                        drops[i] = 0;
                                    };
                                };
                            };
                        };
                        setInterval(draw, 30);
                        break;
                    default:
                        break;
                };
            };
            return body.setAttribute("data-theme", theme as string);
        }; applyTheme();
        return () => { applyTheme = undefined as any; };
    }, [ theme ]);
    useEffect(() => {
        scrollTo(0, 0);
    }, [ router.route ]);
    useEffect(() => {
        setCookie("forinov_rgb_preference", RGB, { sameSite: "strict" });
    }, [ RGB ])
    useEffect(() => {
        const body = document.body;
        (body) ? body.setAttribute("data-ui", (ui) ? ui.toString() : "true") : null;
    }, [ ui ]);
    pageProps.states = {};
    pageProps.states["errors"] = errors;
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
    pageProps.stateSetters["setErrors"] = setErrors;
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
    return <Fragment>
        <Head>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" href={ router.basePath + "/assets/logo.png" }/>
        </Head>
        { (!checkMatch(router.asPath, "/administration")) ? ((router.query.ui && router.query.ui == "false") ? null : (!session) ? <Navbar { ...pageProps }/> : <AuthNavbar { ...pageProps }/>) : null }
        <Transition { ...pageProps }>
            {/* <Component { ...pageProps }/>
            { (!checkMatch(router.asPath, "/administration")) ? ((router.query.ui && router.query.ui == "false") ? null : <Footer { ...pageProps }/>) : null } */}
        </Transition>
        <Modal { ...pageProps }/>
        { (router.query.ui && router.query.ui == "false") ? null : (!production) ? <Devtools { ...pageProps }/> : null }
        { (router.query.ui && router.query.ui == "false") ? null : (!production) ? <canvas id="canvas"/> : null }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default App;