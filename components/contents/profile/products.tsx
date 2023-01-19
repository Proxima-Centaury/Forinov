/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProductCard from "../../cards/product";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProductsStyles from "../../../public/stylesheets/components/contents/profile/Products.module.css";
import ProductStyles from "../../../public/stylesheets/components/cards/Product.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Products */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileProducts = ({ type, products, states }: any) => {
    const { translations }: any = states;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(2);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + ProductStyles.product, products, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], products.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div className={ ProductsStyles.products }>
        <p className={ ProductsStyles.label }>{ (type === "startup") ? translations["Nos produits et services"] : translations["Nos offres"] }</p>
        <div className={ ProductsStyles.list } data-type="list">
            { (products.length > 0) ? products.map((product: any, key: KeyType) => {
                const index = key + 1;
                const maxVisibleByDefault = maxVisibleCardsByDefault;
                const cardProps = { product, index, maxVisibleByDefault, translations };
                return <ProductCard key={ key } { ...cardProps }/>;
            }) : <div className="placeholder">
                { (type === "startup") ? <p>{ translations["Aucun produit à afficher"] + "." }</p> : null }
                { (type === "corporation") ? <p>{ translations["Aucune offre à afficher"] + "." }</p> : null }
                { (type === "partner") ? <p>{ translations["Aucune offre à afficher"] + "." }</p> : null }
            </div> }
        </div>
        { (products.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileProducts;