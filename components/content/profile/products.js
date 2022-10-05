/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import ProductCard from "../../cards/product";
import Button from "../../../components/buttons/button";
import { utilities } from "../../../utilities/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Products */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileProducts = ({ products, translations }) => {
    const [ maxVisibleCardsByDefault, setMaxVisibleCardsByDefault ] = useState(2);
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".product", products, maxVisibleCardsByDefault);
    const buttonsProps = [
        { type: "moreOrLess", action: handleView, text: translations["Voir plus"], count: products.length - maxVisibleCardsByDefault }
    ];
    if(products) {
        return <div className="profileProducts">
            <p className="label">{ translations["Nos produits et services"] }</p>
            <div className="products">
                { (products) ? products.map((product, key) => {
                    const props = {
                        product: product,
                        index: key + 1,
                        maxVisibleByDefault: maxVisibleCardsByDefault,
                        translations: translations
                    };
                    return <ProductCard key={ key } { ...props }/>;
                }) : null }
            </div>
            { (products.length > maxVisibleCardsByDefault) ? <Button { ...buttonsProps[0] }/> : null }
        </div>;
    } else {
        return <ProfileProductsPlaceholder/>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Products Placeholder */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileProductsPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileProducts;