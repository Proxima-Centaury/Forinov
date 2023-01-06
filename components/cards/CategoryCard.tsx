import styles from "./CategoryCard.module.css";

export default function CategoryCard(props: any) {
  return (
    <div
      className={styles.annuaire__category +" lift"}
      key={props.category.ID}
      onClick={() => {
        props.categorieClickHandler(props.category.ID);
      }}
    >
      <img
        src={props.category.LOGO}
        alt={props.category.ID}
        className={styles.annuaire__category_logo}
      />
      <div className={styles.annuaire__category_count}>{props.category.NB}</div>
      <h1 className={styles.annuaire__category_title}>{props.category.NAME}</h1>
      <div className={styles.annuaire__category_tags}>
        {props.category.SSCAT[0] ? (
          <div className={styles.annuaire__category_tag}>
            {props.category.SSCAT[0].NAME}
          </div>
        ) : null}
        {props.category.SSCAT[1] ? (
          <div className={styles.annuaire__category_tag}>
            {props.category.SSCAT[1].NAME}
          </div>
        ) : null}
        {props.category.SSCAT[2] ? (
          <div className={styles.annuaire__category_tag}>
            {props.category.SSCAT[2].NAME}
          </div>
        ) : null}
      </div>
    </div>
  )
}
