/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { HomeInterface } from "../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Blog */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Blog = (pageProps: HomeInterface) => {
    return <Fragment>
        {/* <Head>
            <title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div id="login" className="container">
            <LoginCard { ...pageProps }/>
        </div> */}
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context: any) => {
    return {
        redirect: {
            destination: "https://www.forinov.com/blog/",
            permanent: false
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Blog;
export { getServerSideProps };