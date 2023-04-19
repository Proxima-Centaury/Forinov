/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { UnderDevelopmentInterface } from "../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import MetaDatas from "../components/seo/metadatas/metadatas";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import UnderDevelopmentStyles from "../public/stylesheets/pages/UnderDevelopment.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Under Development */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const UnderDevelopment = (pageProps: UnderDevelopmentInterface) => {
    const { states, router } = pageProps;
    const { translations } = states;
    return <Fragment>
        <MetaDatas { ...pageProps }/>
        <div id="403" className="container">
            <div className={ UnderDevelopmentStyles.underDevelopment }>
                <h1>403</h1>
                <p>{ "Oops ! " + translations["La page que vous recherchez, est en cours de développement"] + "." }</p>
                <button onClick={ () => router.back() }>{ translations["Retournez à la page précédente"] + "." }</button>
            </div>
        </div>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default UnderDevelopment;
export { getStaticProps };