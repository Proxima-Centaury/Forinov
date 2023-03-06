/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { OnboardingInterface } from "../typescript/interfaces";
import { redirectTo } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Link from "next/link";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import IframeStyles from "../public/stylesheets/components/Iframe.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Onboarding */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Onboarding = (pageProps: OnboardingInterface) => {
    const { states, router }: any = pageProps;
    const { locale, session, metadatas, translations }: any = states;
    useEffect(() => { (session) ? redirectTo("/", router, locale) : null });
    return <>
        <Head>
            <title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div className="containerFull">
            <div className={ IframeStyles.registerFrame }>
                <p>{ translations["Si vous souhaitez vous inscrire"] },<br/>{ translations["Rendez-vous"].toLowerCase() } <Link className={ ButtonStyles.pureLink } href="https://onboarding.forinov.net">{ translations["Ici"].toLowerCase() }</Link> !</p>
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
export default Onboarding;
export { getStaticProps };