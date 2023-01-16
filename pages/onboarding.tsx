/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RegisterInterface } from "../typescript/interfaces";
import { redirectTo } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import IframeStyles from "../public/stylesheets/components/Iframe.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Register = ({ states }: RegisterInterface) => {
    const router = useRouter();
    const { locale, session, translations }: any = states;
    useEffect(() => { (session) ? redirectTo("/", router, locale) : null });
    return <>
        <Head>
            <title>Forinov - Onboarding</title>
        </Head>
        <div className="containerFull">
            <div className={ IframeStyles.registerFrame }>
                <p dangerouslySetInnerHTML={ { __html: translations["Si vous souhaitez vous inscrire,<br>rendez-vous <a href='https://onboarding.forinov.net' target='_blank'>ici</a>"] + "." } }/>
                <iframe src="https://onboarding.forinov.net"/>
            </div>
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
export default Register;
export { getStaticProps };