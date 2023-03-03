/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { NotFoundInterface, ButtonInterface } from "../typescript/interfaces";
import { buildButtonProps } from "../scripts/utilities";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Button from "../components/buttons/button";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import NotFoundStyles from "../public/stylesheets/pages/NotFound.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Not Found */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const NotFound = (pageProps: NotFoundInterface) => {
    const { states, router }: any = pageProps;
    const { metadatas, translations }: any = states;
    return <>
        <Head>
            <title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div id="404" className="containerFull">
            <div className={ NotFoundStyles.container }>
                <div className={ NotFoundStyles.notFound }>
                    <h1>404</h1>
                    <p>{ "Oops ! " + translations["La page que vous recherchez, n'existe pas"] + " !" }</p>
                    <Button { ...buildButtonProps(ButtonStyles.classicLink, undefined, undefined, undefined, router.back, translations["Retournez à la page précédente"]) as ButtonInterface }/>
                </div>
            </div>
        </div>
    </>;
};
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default NotFound;
export { getStaticProps };