/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { formatNameForUrl } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Tags from "../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import CategoryStyles from "../../public/stylesheets/components/cards/Category.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Category Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CategoryCard = (pageProps: any) => {
    const { category, display, states, router }: any = pageProps;
    const { RGB }: any = states;
    const url = router.asPath + "/" + formatNameForUrl(category.NAME) + "_" + category.ID;
    const source = router.basePath + (category.LOGO || "/assets/flags/" + category.CODE.toLowerCase() + ".png");
    return <Link href={ url } className={ CategoryStyles.category } data-rgb={ (RGB) ? "enabled" : "disabled" }>
        { (category.COUNT) ? <div className={ CategoryStyles.count }>
            <p>{ category.COUNT }</p>
        </div> : null }
        { (category.LOGO || category.CODE) ? <Image src={ source } alt={ category.ID } width="80" height="80"/> : <i className="fa-light fa-circle-star"/> }
        <h4 className={ CategoryStyles.name }>{ category.NAME }</h4>
        { (category.SSCAT && category.SSCAT.length > 0) ? <Tags tags={ category.SSCAT } limit={ (display === "list") ? 1 : undefined }/> : null }
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default CategoryCard;