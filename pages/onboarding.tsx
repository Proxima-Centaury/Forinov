/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { OnboardingInterface } from "../typescript/interfaces";
import { redirectTo } from "../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Button from "../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import IframeStyles from "../public/stylesheets/components/Iframe.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Onboarding */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Onboarding = (pageProps: OnboardingInterface) => {
    const { states, router } = pageProps;
    const { locale, session, metadatas, translations } = states;
    useEffect(() => { (session) ? redirectTo("/", router, locale) : null });
    return <>
        <Head>
            <title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div id="onboarding" className="containerFull">
            <div className={ IframeStyles.registerFrame }>
                <p>{ translations["Si vous souhaitez vous inscrire"] },<br/>{ translations["Rendez-vous"].toLowerCase() } <Button button={ ButtonStyles.classicLink } href="https://onboarding.forinov.net" text={ translations["Ici"].toLowerCase() }/> !</p>
                <iframe src="https://onboarding.forinov.net"/>
            </div>
        </div>
    </>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context: any) => {
    return {
        redirect: {
            destination: "https://onboarding.forinov.net",
            permanent: false
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Onboarding;
export { getServerSideProps };