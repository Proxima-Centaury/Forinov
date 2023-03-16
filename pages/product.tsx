import { GetServerSideProps } from "next";

import api from "../scripts/api";

import ProductStyles from "../public/stylesheets/pages/Product.module.css";

export default function Folder(pageProps: any) {
    const { products, states, stateSetters } = pageProps;
    const { translations } = states;

    const product = products[0];
    console.log(product);
    

    return (
        <section className={"container"}>
            
        </section>
    )
}



const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    const products = await api.getProducts("entreprise", "5", "next", "Sorbonne", language);

    return {
        props: {
            locale, locales, defaultLocale, products
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
