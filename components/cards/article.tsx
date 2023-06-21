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
import ArticleStyles from "../../public/stylesheets/components/cards/Article.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Article Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ArticleCard = (articleProps: any) => {
    const { article, states } = articleProps;
    const { translations } = states;
    return <div className={ArticleStyles.card}>
        <div className={ArticleStyles.banner}>
            {(article.PICTURE) ? <Image src={article.PICTURE} alt={translations["Image de l'article de blog titré : "] + article.NAME} width="3840" height="2160" /> : null}
            <a className={ButtonStyles.callToActionNegative} href={article.URL} target="_blank">
                <i className="fa-light fa-eye" />
                <span>{translations["Voir plus"]}</span>
            </a>
        </div>
        <div className={ArticleStyles.content}>
            <div className={ArticleStyles.container}>
                <div className={ArticleStyles.title} data-type="tooltip" data-tooltip={article.NAME}>
                    <h3>{(article.NAME) ? uppercaseFirst(article.NAME) : translations["Nom non-défini"]}</h3>
                </div>
            </div>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ArticleCard;