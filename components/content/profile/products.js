/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import { seeMoreOrLess } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Products */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileProducts = ({ products, translations }) => {
    const handleView = (event) => seeMoreOrLess(event, translations, ".product", products, 2);
    if(products) {
        return <div className="profileProducts">
            <p className="label">{ translations["Nos produits et services"] }</p>
            <div className="products">
                { (products) ? products.map((product, key) => <div key={ key } className={ "product" + ((key > 1) ? " d-none" : "")}>
                    <div className="banner">
                        <p>{ translations["Voir"] }</p>
                        <Image src={ product.PICTURE } alt="" sizes="100vw" fill/>
                    </div>
                    <div className="content">
                        <p className="productType">{ Object.values(product.BUSINESSMODEL).join(" | ") }</p>
                        <p className="productName">{ product.NAME }</p>
                    </div>
                </div>) : null }
            </div>
            { (products.length > 2) ? <button className="seeMore" onClick={ handleView }>
                <span>{ translations["Voir plus"] + " (" + (products.length - 2) + ")" }</span>
                <i className="fa-solid fa-caret-right"/>
            </button> : null }
        </div>;
    } else {
        return <div className="profileProducts"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileProducts;