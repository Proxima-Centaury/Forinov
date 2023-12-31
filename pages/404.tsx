/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { NotFoundInterface } from "../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import MetaDatas from "../components/seo/metadatas/metadatas";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import NotFoundStyles from "../public/stylesheets/pages/NotFound.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Not Found */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const NotFound = (pageProps: NotFoundInterface) => {
    const { states, router } = pageProps;
    const { translations } = states;
    return <Fragment>
        <MetaDatas { ...pageProps }/>
        <div id="404" className="container">
            <div className={ NotFoundStyles.notFound }>
                <h1>404</h1>
                <p>{ "Oops ! " + translations["La page que vous recherchez, n'existe pas"] + " !" }</p>
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
export default NotFound;
export { getStaticProps };