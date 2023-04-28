/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ProductsInterface } from "../../../../../../typescript/interfaces";
import apiInstance from "../../../../../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Link from "next/link";
import Tags from "../../../../../../components/tags/tags";
import Button from "../../../../../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProductStyles from "../../../../../../public/stylesheets/pages/Product.module.css";
import ButtonStyles from "../../../../../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Product */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Product = (pageProps: ProductsInterface) => {
    const { products, states, router } = pageProps;
    const { translations } = states;
    let { product } = router.query;
    product = product?.substring(product.indexOf("_") + 1, product.length);
    const [ selectedProduct, setSelectedProduct ]: any = useState(null);
    useEffect(() => {
        if(products.length > 0 && products.find((check: any) => check.ID === product)) {
            setSelectedProduct(products.find((check: any) => check.ID === product));
        };
    }, [ products, product ]);
    return <div id="product" className="container">
        { (selectedProduct) ? <div className={ProductStyles.imageWrapper}>
            { (selectedProduct.PICTURE) ? <Image src={ selectedProduct.PICTURE } alt={ translations["Image du produit"] + " : " + selectedProduct.NAME + "." } width="3840" height="2160"/> : null }
        </div> : null }
        { (selectedProduct) ? <div>
            <h1 className={ ProductStyles.name }>{ selectedProduct.NAME }</h1>
            <div className={ ProductStyles.spacer }></div>
        </div> : null }
        { (selectedProduct) ? <div>
            <p>{ selectedProduct.DESCRIPTION }</p>
        </div> : null }
        { (selectedProduct) ? <div className={ ProductStyles.table }>
            <div className={ ProductStyles.row }>
                <span>{ translations["Maturité"] }</span>
                <Tags tags={ selectedProduct.MATURITY }/>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Modèle économique"] }</span>
                <Tags tags={ selectedProduct.ECONOMICMODEL }/>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Ordre de prix"] }</span>
                <span>{ selectedProduct.PRICE || "??" } €</span>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Clients actuels"] }</span>
                <span>{ selectedProduct.CLIENTS }</span>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Modèle"] }</span>
                <Tags tags={ selectedProduct.BUSINESSMODEL }/>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Technologies"] }</span>
                <Tags tags={ selectedProduct.TECHNOLOGIES }/>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Entreprises Cible"] }</span>
                <Tags tags={ selectedProduct.TARGETCOMPANIES }/>
            </div>
            <div className={ ProductStyles.row }>
                <span>{ translations["Secteurs Cible"] }</span>
                <Tags tags={ selectedProduct.TARGETSECTORS }/>
            </div>
        </div> : null }
        { (selectedProduct) ? <div className={ ProductStyles.actions }>
            <Button button={ ButtonStyles.classicLink } href={ selectedProduct.LINK || "#" } text={ translations["Voir la vidéo de présentation"] }/>
            <Button button={ ButtonStyles.callToAction } href="/login" text={ translations["Faire une demande"] }/>
        </div> : null }
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, query, locale, locales, defaultLocale } = context;
    let { profile, type }: any = query;
    profile = profile?.substring(profile.indexOf("_") + 1, profile.length);
    const language = "&lang=" + locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    if(type) {
        type = String(type);
        type = (type.match(/(startups)/)) ? "startup" : type;
        type = (type.match(/(corporates)/)) ? "entreprise" : type;
        type = (type.match(/(partners)/)) ? "partenaire" : type;
    };
    const foundProfile = await apiInstance.getProfile(type, profile, "next", "Sorbonne", language);
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
            products: await apiInstance.getProducts(type, profile, "next", "Sorbonne", language)
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Product;
export { getServerSideProps };