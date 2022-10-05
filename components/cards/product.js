/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Product Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProductCard = ({ product, index, maxVisibleByDefault = 4, translations }) => {
    if(product) {
        return <div className={ "product" + ((index > maxVisibleByDefault) ? " hidden" : "")}>
            <div className="banner">
                <p>{ translations["Voir"] }</p>
                { (product.PICTURE) ? <Image src={ product.PICTURE } alt="" width="400" height="128"/> : null}
            </div>
            <div className="content">
                <p className="productType">{ Object.values(product.BUSINESSMODEL).join(" | ") }</p>
                <p className="productName">{ product.NAME }</p>
            </div>
        </div>;
    } else {
        return <ProductCardPlaceholder/>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Product Card Placeholder */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProductCardPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProductCard;