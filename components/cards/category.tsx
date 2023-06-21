/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst } from "../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Tags from "../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CategoryStyles from "../../public/stylesheets/components/cards/Category.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Category Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const CategoryCard = (categoryProps: any) => {
    const { category, display, router, states } = categoryProps;
    const { translations } = states;
    return <div className={ CategoryStyles.card }>
        { (category.COUNT) ? <div className={ CategoryStyles.count }>
            <p>{ category.COUNT }</p>
        </div> : null }
        <div className={ CategoryStyles.icon }>
            { (category.LOGO) ? <Image src={ category.LOGO } alt={ translations["Image représentative de la catégorie"] + " " + category.NAME + "." } width="80" height="80"/> : null }
            { (category.CODE) ? <Image src={ router.basePath + "/assets/flags/" + category.CODE.toLowerCase() + ".png" } alt="" width="80" height="80"/> : null }
            { (!category.LOGO && !category.CODE) ? <i className="fa-light fa-circle-star"/> : null }
        </div>
        <h4 className={ CategoryStyles.name }>{ uppercaseFirst(category.NAME).toString() }</h4>
        { (category.SSCAT && category.SSCAT.length > 0) ? <Tags tags={ category.SSCAT } limit={ (display === "list") ? 1 : undefined }/> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default CategoryCard;