/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import ProductStyles from "../../public/stylesheets/components/cards/Product.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Product Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProductCard = ({ product, index, maxVisibleByDefault = 4, translations }: any) => {
    return <div className={ ProductStyles.product + ((index > maxVisibleByDefault) ? " hidden" : "")}>
        <div className={ ProductStyles.banner }>
            <p>{ translations["Voir"] }</p>
            { (product.PICTURE) ? <img src={ product.PICTURE } alt={ "Image du produit " + product.NAME }/> : null}
        </div>
        <div className={ ProductStyles.content }>
            <p className={ ProductStyles.type }>{ Object.values(product.BUSINESSMODEL).join(" | ") }</p>
            <p className={ ProductStyles.name }>{ product.NAME }</p>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProductCard;