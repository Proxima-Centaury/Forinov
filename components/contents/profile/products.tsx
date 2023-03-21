/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, Key } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties, formatNameForUrl } from "../../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/dist/client/link";
import ProductCard from "../../cards/product";
import Button from "../../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProductsStyles from "../../../public/stylesheets/components/contents/profile/Products.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Products */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileProducts = (productsProps: any) => {
    const { type, products, states, router } = productsProps;
    const { translations } = states;
    return <div className={ ProductsStyles.products }>
        <p className={ ProductsStyles.label }>{ (type === "startup") ? translations["Nos produits et services"] : translations["Nos offres"] }</p>
        <div className={ ProductsStyles.list } data-type="list">
            { (products.length > 0) ? products.map((product: any, key: Key) => <Link key={ key } href={ router.asPath + "/" + formatNameForUrl(product.NAME) + "_" + product.ID }>
                <ProductCard { ...productsProps } product={ product }/>
            </Link>) : <div className="placeholder">
                { (type === "startup") ? <p>{ translations["Aucun produit à afficher"] + "." }</p> : null }
                { (type === "corporation") ? <p>{ translations["Aucune offre à afficher"] + "." }</p> : null }
                { (type === "partner") ? <p>{ translations["Aucune offre à afficher"] + "." }</p> : null }
            </div> }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileProducts;