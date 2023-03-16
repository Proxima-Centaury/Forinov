import { GetServerSideProps } from "next";

import api from "../scripts/api";

import ProductCard from "../components/cards/product";

export default function Folder(pageProps: any) {
    const { products, states, stateSetters } = pageProps;
    const { translations } = states;


    return (
        <section className={"container"}>
            {/* FOLDERS */}
            <div className="grid twoColumns">
            {/* {products.map((product: any) => {
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    )
                })} */}
            </div>
        </section>
    )
}



const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    const products = await api.getProducts("entreprise", "5", "next", "Landing", language);
    console.log(products);
    

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
