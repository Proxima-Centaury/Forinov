/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Key } from "react";
import { formatNameForUrl } from "../../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/dist/client/link";
import ProductCard from "../../cards/product";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ProductsStyles from "../../../public/stylesheets/components/contents/profile/Products.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Products */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfileProducts = (productsProps: any) => {
    const { products, states, router } = productsProps;
    const { translations } = states;
    const { type } = router.query;
    return <div className={ ProductsStyles.products }>
        <p className={ ProductsStyles.label }>{ (type === "startup") ? translations["Nos produits et services"] : translations["Nos offres"] }</p>
        <div className="grid twoColumns">
            { (products.length > 0) ? products.map((product: any, key: Key) => <Link key={ key } href={ router.asPath + "/products/" + formatNameForUrl(product.NAME) + "_" + product.ID }>
                <ProductCard { ...productsProps } product={ product }/>
            </Link>) : <div className="placeholder" style={ { gridColumn: "span 2" } }>
                { (type.match(/(startups)/)) ? <p>{ translations["Aucun produit à afficher"] + "." }</p> : null }
                { (type.match(/(corporates)/)) ? <p>{ translations["Aucune offre à afficher"] + "." }</p> : null }
                { (type.match(/(partners)/)) ? <p>{ translations["Aucune offre à afficher"] + "." }</p> : null }
            </div> }
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfileProducts;