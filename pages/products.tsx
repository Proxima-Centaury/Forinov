import { GetServerSideProps } from "next";

import api from "../scripts/api";

import ProductCard from "../components/cards/product";

export default function Folder(pageProps: any) {
    const { products, states, stateSetters } = pageProps;
    const { translations } = states;


    return (
        <section className={"container"}>
            {/* FOLDERS */}
            <div className="grid threeColumns">
            {products.map((product: any) => {
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            translations={translations}
                        />
                    )
                })}
            </div>
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
