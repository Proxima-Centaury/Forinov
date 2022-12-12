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
const ProfileProducts = ({ products, states }: any) => {
    const { translations }: any = states;
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(2);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + ProductStyles.product, products, maxVisibleCardsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], products.length - maxVisibleCardsByDefault ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div className={ ProductsStyles.products }>
        <p className={ ProductsStyles.label }>{ translations["Nos produits et services"] }</p>
        <div className={ ProductsStyles.list } data-type="list">
            { (products) ? products.map((product: any, key: KeyType) => {
                const cardProps = { product: product, index: key + 1, maxVisibleByDefault: maxVisibleCardsByDefault, translations: translations };
                return <ProductCard key={ key } { ...cardProps }/>;
            }) : null }
        </div>
        { (products.length > maxVisibleCardsByDefault) ? <Button { ...moreOrLessButtonObject as ButtonInterface }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileProducts;