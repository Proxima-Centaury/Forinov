/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Key } from "react";
import { ProductsInterface } from "../../../../../typescript/interfaces";
import { formatNameForUrl } from "../../../../../scripts/utilities";
import api from "../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import ProductCard from "../../../../../components/cards/product";
import Button from "../../../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProductsStyles from "../../../../../public/stylesheets/pages/Products.module.css";
import ButtonStyles from "../../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Products */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Products = (pageProps: ProductsInterface) => {
    const { products, states, router } = pageProps;
    const { translations } = states;
    return <div id="products" className="container">
        <div className={ ProductsStyles.title }>
            <h1>{ translations["Offres et produits"] }</h1>
            <p>{ products.length + " " + translations["Offres et/ou produits"].toLowerCase() }</p>
        </div>
        <div className="grid twoColumns">
            { (products) ? products.map((product: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(product.NAME) + "_" + product.ID }>
                <ProductCard { ...pageProps } product={ product }/>
            </Link>) : null }
        </div>
        <Button button={ ButtonStyles.classicLink } href={ router.asPath.substring(0, router.asPath.lastIndexOf("/")) } icon="fa-light fa-arrow-left" text={ translations["Retourner au profil"] }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Rendering */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { profile, type }: any = query;
    profile = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = "&lang=" + locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
        type = (type.match(/(corporate)/)) ? "entreprise" : type;
        type = (type.match(/(partner)/)) ? "partenaire" : type;
    };
    const foundProfile = await api.getProfile(type, profile, "next", "Sorbonne", language);
    if(!foundProfile || (foundProfile && Object.keys(foundProfile).length === 0)) {
        return {
            redirect: {
                destination: "/" + locale + "/404",
                permanent: false
            }
        };
    };
    return {
        props: {
            locale, locales, defaultLocale,
            profile: foundProfile,
            products: await api.getProducts(type, profile, "next", "Sorbonne", language)
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Products;
export { getServerSideProps };
