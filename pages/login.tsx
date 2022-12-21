/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginInterface } from "../typescript/interfaces";
import { redirectTo } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import LoginCard from "../components/cards/login";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Login */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Login = ({ locales, states, stateSetters, config }: LoginInterface) => {
    const router = useRouter();
    const { locale, session, translations }: any = states;
    useEffect(() => { (session) ? redirectTo("/", router, locale) : null });
    const parentProps = { locales, states, stateSetters, config };
    return <>
        <Head>
            <title>Forinov - { translations["Connexion"] }</title>
        </Head>
        <div className="container">
            <LoginCard { ...parentProps }/>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Login;
export { getStaticProps };