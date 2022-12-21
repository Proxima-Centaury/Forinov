/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { NotFoundInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import NotFoundStyles from "../public/stylesheets/pages/NotFound.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* NotFound */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const NotFound = ({ states }: NotFoundInterface) => {
    const { translations }: any = states;
    return <>
        <Head>
            <title>Forinov - 404</title>
        </Head>
        <div id="404" className="container">
            <div className={ NotFoundStyles.notFound }>
                <h1>404</h1>
                <p>{ translations["La page que vous recherchez, n'existe pas"] + " !" }</p>
                <button onClick={ () => window.history.go(-1) }>{ translations["Retournez à la page précédente"] + "." }</button>
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
export default NotFound;
export { getStaticProps };