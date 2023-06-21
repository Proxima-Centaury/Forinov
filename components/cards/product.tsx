/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst } from "../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ProductStyles from "../../public/stylesheets/components/cards/Product.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Product Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProductCard = (productProps: any) => {
    const { product, states, router } = productProps;
    const { translations } = states;
    return <div className={ ProductStyles.card }>
        <div className={ ProductStyles.banner }>
            <p>{ translations["Voir"] }</p>
            { (product.PICTURE) ? <Image src={ product.PICTURE } alt={ translations["Image du produit"] + " " + uppercaseFirst(product.NAME.toLowerCase()).toString() + "." } width="1440" height="720"/> : null }
            { (!product.PICTURE) ? <Image src={ router.basePath + "/assets/placeholders/product.jpg" } alt={ translations["Image du produit"] + " " + uppercaseFirst(product.NAME.toLowerCase()).toString() + "." } width="1440" height="720"/> : null }
        </div>
        <div className={ ProductStyles.content }>
            <p className={ ProductStyles.type }>{ product.ECONOMICMODEL.map((model: any) => model.NAME).join(" | ") }</p>
            <p className={ ProductStyles.name }>{ uppercaseFirst(product.NAME.toLowerCase()).toString() }</p>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProductCard;