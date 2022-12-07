import {useState, useRef} from 'react'
import styles from './OpportSearchbar.module.css'
import Link from 'next/link'

const OpportSearchbar = (props: any) => {
    const filters = props.filters['CATEGORY']
  const nbPerCategory = {
    } as any;

  const icon = useRef(null);


  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesLength, setSelectedCategoriesLength] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [moreFiltersClicked, setMoreFiltersClicked] = useState(false);

  //Nécessaire sinon bug connu avec le useState
  var tempCards = [];

  let catArray = [];

  for (let catIndex in filters) {
    catArray.push(filters[catIndex]);
  }
    
     //Fonction utilisé pour les click sur les catégories (dropdown ou cartes de catégories)
  const categorieClickHandler = (categorie: string) => {
    console.log(categorie);
    
  };
    
    return (
        <div className="annuaire__searchbar">
            {/* Breadcrumbs */}
            <ul className={styles.links}>
                <li className={props.active === "1" ? styles.link_active : styles.link}>
                    <i className="fa-solid fa-star" style={{
                        marginRight: '0.5rem'
                    }}></i>
                    <span>AAA</span>
                </li>

                <li className={props.active === "2" ? styles.link_active : styles.link}>
                    <i className="fa-solid fa-folder-open" style={{
                        marginRight: '0.5rem'
                    }}></i>
                    <span>BBB</span>
                </li>

                <li className={props.active === "3" ? styles.link_active : styles.link}>
                    <i className="fa-solid fa-file-pen" style={{
                        marginRight: '0.5rem'
                    }}></i>
                    <span>CCC</span>
                </li>
            </ul>

            {/* Searchbar Input */}
            <div className="annuaire__searchbar-wrapper">
                <input
                    type="text"
                    className="annuaire__searchbar-input"
                    placeholder="Rechercher dans les opportunités"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                />
                <button className="annuaire__searchbar-trigger">
                    <i className="fa-solid fa-search"></i>
                </button>
            </div>

            {/* Multiselect */}
        <div className="annuaire__searchbar-multiselect-wrapper">
          <div className="annuaire__searchbar-principal-filters">
            <button
              onClick={(e: any) => {
                let element;
                let list = document.querySelector(
                  ".annuaire__searchbar-select-list"
                ) as HTMLElement;
                e.preventDefault();
                e.target.tagName.toLowerCase() === "button"
                  ? (element = e.target)
                  : e.target.parentElement.tagName.toLowerCase() === "p"
                  ? (element = e.target.parentElement.parentElement)
                  : (element = e.target.parentElement);
                list.style.display === "none"
                  ? (list.style.display = "block")
                  : (list.style.display = "none");
                element.children[1].classList.toggle("fa-caret-up");
              }}
              className="annuaire__searchbar-select"
            >
              <p style={{ margin: 0 }}>
                Catégories{" "}
                {selectedCategories.length > 0 ? (
                  <div className="annuaire__searchbar-select-count">
                    {selectedCategoriesLength}
                  </div>
                ) : null}
              </p>
              <i className="fa-solid fa-caret-down" ref={icon}></i>
            </button>
            <ul
              className="annuaire__searchbar-select-list"
              style={{ display: "none" }}
            >
              {catArray.map((categorie) => {
                return (
                  <button
                    className="annuaire__searchbar-select-list-item"
                    onClick={() => {
                      categorieClickHandler(categorie.ID);
                    }}
                    id={categorie.ID}
                    key={"categorie-" + categorie.ID}
                  >
                    <span className="annuaire__searchbar-select-list-name">
                      {categorie.NAME}
                    </span>
                    <span className="annuaire__searchbar-select-list-count">
                      {nbPerCategory[categorie.NAME]}
                    </span>
                    <div className="annuaire__searchbar-select-list-pastille"></div>
                  </button>
                );
              })}
            </ul>
          </div>
        </div>
        </div>
    )
}

export default OpportSearchbar