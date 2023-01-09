/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Directory */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Directory = ({ data, filters }: any) => {
    const nbPerCategory: any = {};
    const icon = useRef(null);
    const [ selectedCategories, setSelectedCategories ] = useState([]);
    const [ selectedCategoriesLength, setSelectedCategoriesLength ] = useState(0);
    const [ isSelected, setIsSelected ] = useState(false);
    const [ currentInput, setCurrentInput ] = useState("");
    const [ moreFiltersClicked, setMoreFiltersClicked ] = useState(false);
    const [ startupCards, setStartupCards ] = useState([]);
    //Nécessaire sinon bug connu avec le useState
    var tempCards: Array<any> = [];
    //On garde uniquement les catégories du call API
    const categories = filters[0]["CATEGORY"];
    let catArray: Array<any> = [];
    const catCards: Array<any> = [];
    for(let catIndex in categories) {
        catArray.push(categories[catIndex]);
    };
    //On boucle sur les catégories pour construire les cards de catégories (affichée lorsqu'aucune catégorie n'est sélectionnée)
    catArray.forEach((category, key) => {
        nbPerCategory[category.NAME] = category.NB;
        catCards.push(<div className="annuaire__category lift" key={ key } onClick={ () => categorieClickHandler(category.ID) }>
            <Image src={ category.LOGO } alt={ category.ID } className="annuaire__category-logo" width="100" height="100"/>
            <div className="annuaire__category-count">{ category.NB }</div>
            <h1 className="annuaire__category-title">{ category.NAME }</h1>
            <div className="annuaire__category-tags">
                { (category.SSCAT[0]) ? <div className="annuaire__category-tag">
                    { category.SSCAT[0].NAME }
                </div> : null }
                { (category.SSCAT[1]) ? <div className="annuaire__category-tag">
                    { category.SSCAT[1].NAME }
                </div> : null}
                { (category.SSCAT[2]) ? <div className="annuaire__category-tag">
                    { category.SSCAT[2].NAME }
                </div> : null}
            </div>
        </div>);
    });
    //Fonction qui permet de remplir le tableau de cards de startups
    const setCards = (categorie = [], input = "") => {
        //Si au moins une catégorie est sélectionnée
        if(categorie.length > 0) {
            //Si l'input n'est pas vide
            if (input.length > 2) {
            //On boucle sur les startups en regardant si les catégories correspondent ou si l'input correspond avec le nom OU la catégorie
            data.filter((item: any) => {
                if (
                item.categorie_id.toString() === categorie.toString() &&
                item.name.toLowerCase().includes(input.toLowerCase())
                ) {
                tempCards.push(item);
                }
            });
            }
            //Sinon si l'input est vide
            else {
            //On boucle sur les startups en regardant si les catégories correspondent
            data.filter((item: any) => {
                if (item.categorie_id.toString() === categorie.toString()) {
                tempCards.push(item);
                }
            });
            }
        } else {
            //Si aucune catégorie n'est sélectionnée mais que l'input n'est pas vide
            //On boucle sur les startups en regardant si l'input correspond avec le nom OU la catégorie
            data.map((item: any) => {
            if (
                item.name.toLowerCase().includes(input.toLowerCase()) ||
                item.categorie.toLowerCase().includes(input.toLowerCase())
            ) {
                tempCards.push(item);
            }
            });
        };
        //On set la variable avec le tableau temporaires de cards
        setStartupCards(tempCards as never);
    };
    //Fonction utilisé pour les click sur les catégories (dropdown ou cartes de catégories)
    const categorieClickHandler = (categorie: any) => {
        let element = document.getElementById(categorie);
        if(selectedCategories.includes(categorie as never)) {
            if(element) {
                const children1 = element.children[0] as HTMLElement;
                children1.style.color = "#232324";
                const children2 = element.children[2] as HTMLElement;
                children2.style.display = "none";
                for (let i = 0; i < selectedCategories.length; i++) {
                    if (selectedCategories[i] === categorie) {
                    selectedCategories.splice(i, 1);
                    }
                }
            };
        } else {
            if (element) {
                const children1 = element.children[0] as HTMLElement;
                children1.style.color = "#006dff";
                const children2 = element.children[2] as HTMLElement;
                children2.style.display = "block";
            }
            selectedCategories.push(categorie as never);
        }

    //Si plus au moins une catégorie est sélectionnée : on set les cards avec les catégories sélectionnées
    if(selectedCategories.length > 0) {
        setIsSelected(true);
        setSelectedCategoriesLength(selectedCategories.length);
        selectedCategories.forEach((categorie: any) => {
        setCards(categorie);
        console.log(startupCards);
        });
        //Si plus au moins une catégorie est sélectionnée et que l'input n'est pas vide : on set les cards avec les catégories sélectionnées et l'input
        if (currentInput.length > 0) {
        setIsSelected(true);
        setSelectedCategoriesLength(selectedCategories.length);
        selectedCategories.forEach((categorie: any) => {
            setCards(categorie, currentInput);
        });
        }
    } else {
        //Sinon si aucune catégorie n'est sélectionnée mais que l'input n'est pas vide : on set les cards avec l'input
        if (currentInput.length > 0) {
        setIsSelected(true);
        setCards([], currentInput);
        } else {
        //Sinon si aucune catégorie n'est sélectionnée et que l'input est vide : on réinitialise les cards
        setIsSelected(false);
        startupCards.length = 0;
        }
    }
    };

    //Fonction qui permet à chaque changement de l'input de set les cards avec l'input
    const handleSearch = (input: any) => {
    setCurrentInput(input);
    if (selectedCategories.length > 0 && input.length > 2) {
        selectedCategories.forEach((categorie: any) => {
        setCards(categorie, input);
        });
    } else {
        if (input.length > 2) {
        setIsSelected(true);
        setCards([], input);
        } else {
        setIsSelected(false);
        }
    }
    };

    return <div className="container">
        <div className="annuaire__searchbar">
        {/* Title */}
        <div className="annuaire__searchbar-title">
            <i className="fa-solid fa-rocket"></i>
            <h1>Startups ({data.length})</h1>
            <i className="fa-solid fa-caret-down"></i>
        </div>

        {/* Breadcrumbs */}
        <ul className="annuaire__searchbar-breadcrumb">
            <li className="annuaire__searchbar-breadcrumb-item breadcrumb-item-active">
            <i className="fa-solid fa-book"></i>
            <span>Toutes les startups</span>
            </li>

            <li className="annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled">
            <i className="fa-solid fa-heart"></i>
            <span>Portefeuille</span>
            </li>

            <li className="annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled">
            <i className="fa-solid fa-globe"></i>
            <span>Écosystème</span>
            </li>

            <li className="annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled">
            <i className="fa-solid fa-share-from-square"></i>
            <span>Recommandations</span>
            </li>
        </ul>

        {/* Searchbar Input */}
        <div className="annuaire__searchbar-wrapper">
            <input
            type="text"
            className="annuaire__searchbar-input"
            placeholder="Rechercher dans l'annuaire des startups"
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            />
            <button className="annuaire__searchbar-trigger">
            <i className="fa-solid fa-search"></i>
            </button>
        </div>

        {/* Multiselect */}
        <div className="annuaire__searchbar-multiselect-wrapper">
            <div className="annuaire__searchbar-principal-filters">
            <button onClick={ (e) => {
                let element;
                let list = document.querySelector(".annuaire__searchbar-select-list") as HTMLElement;
                e.preventDefault();
                const target = e.target as Element;
                target.tagName.toLowerCase() === "button" ? (element = target)
                    : target.parentElement?.tagName.toLowerCase() === "p"
                    ? (element = target.parentElement.parentElement)
                    : (element = target.parentElement);
                    (list && list.style.display === "none") ? (list.style.display = "block") : (list.style.display = "none");
                    element?.children[1].classList.toggle("fa-caret-up");
                }}
                className="annuaire__searchbar-select"
            >
                <p style={{ margin: 0 }}>
                Catégories{" "}
                {selectedCategories.length > 0 ? (
                    <span className="annuaire__searchbar-select-count">
                    {selectedCategoriesLength}
                    </span>
                ) : null}
                </p>
                <i className="fa-solid fa-caret-down" ref={icon}></i>
            </button>
            <ul
                className="annuaire__searchbar-select-list"
                style={{ display: "none" }}
            >
                {catArray.map((categorie: any) => {
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

            <button className="annuaire__searchbar-select-disabled">
            <p style={{ margin: 0 }}>Sous-catégories</p>
            <i className="fa-solid fa-caret-down"></i>
            </button>

            <button className="annuaire__searchbar-select-disabled">
            <p style={{ margin: 0 }}>Secteurs</p>
            <i className="fa-solid fa-caret-down"></i>
            </button>

            <div className="annuaire__searchbar-additional-select">
            <button className="annuaire__searchbar-select-disabled">
                <p style={{ margin: 0 }}>Technologies</p>
                <i className="fa-solid fa-caret-down"></i>
            </button>

            <button className="annuaire__searchbar-select-disabled">
                <p style={{ margin: 0 }}>Métiers cibles</p>
                <i className="fa-solid fa-caret-down"></i>
            </button>
            </div>
        </div>

        {/* Plus de filtres */}
        <p
            className="annuaire__searchbar-more"
            id="moreFilters"
            onClick={() => {
            if (moreFiltersClicked) {
                const element = document.querySelector(".annuaire__searchbar-additional-select") as HTMLElement;
                element.style.display = "none"
                setMoreFiltersClicked(false);
            } else {
                const element = document.querySelector(".annuaire__searchbar-additional-select") as HTMLElement;
                element.style.display = "flex";
                setMoreFiltersClicked(true);
            }
            }}
        >
            {moreFiltersClicked ? "Moins de filtres" : "Plus de filtres"}
        </p>
        </div>
        {isSelected === false ? (
        <div className="annuaire__categories">{catCards}</div>
        ) : startupCards.length > 0 ? (
        <div className="annuaire__cards">
            {startupCards.map((item: any) => {
            return (
                <Link
                className="annuaire__card lift"
                id={item.id}
                key={item.id}
                href={ "/annuaires/startups/" + item.id }
                >
                <div className="annuaire__card-avatar-wrapper">
                    <div className="annuaire__card-avatar">
                    <Image src={item.logo} alt="Logo" width="100" height="100"/>
                    </div>
                </div>
                <div className="annuaire__card-content-wrapper">
                    <h3 className="annuaire__card-name">{item.name}</h3>
                    <p className="annuaire__card-category">{item.categorie}</p>
                    {Object.keys(item.tags).length > 0 ? (
                    <div className="annuaire__card-tags">
                        {item.tags[0] ? (
                        <p className="annuaire__card-tag">{item.tags[0]}</p>
                        ) : null}
                        {item.tags[1] ? (
                        <p className="annuaire__card-tag">{item.tags[1]}</p>
                        ) : null}
                        {item.tags[2] ? (
                        <p className="annuaire__card-tag">{item.tags[2]}</p>
                        ) : null}
                        {Object.keys(item.tags).length > 3 ? (
                        <p className="annuaire__card-tag">
                            +{Object.keys(item.tags).length - 3}
                        </p>
                        ) : null}
                    </div>
                    ) : null}
                    <p className="annuaire__card-description">{item.comment}</p>
                    <div className="annuaire__card-suivre">
                    <i className="fa-solid fa-folder-open"></i>
                    <p>suivre</p>
                    </div>
                </div>
                </Link>
            );
            })}
        </div>
        ) : (
        <div className="annuaire__no-results">
            <h1>Aucun résultat</h1>
        </div>
        )}
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export async function getServerSideProps(context: any) {
  const { locale, locales, defaultLocale }: any = context;
  // Appel API des données de startups
  const res = await fetch(
    "https://dev.forinov.fr/remote/back/api.php?q=SEARCH_FULLSU&authkey=Landing"
  );
  const data = await res.json();
  // Appel API des données de filtres
  const fetchFilters = await fetch(
    "https://www.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7"
  );
  const filters = await fetchFilters.json();

  // On passe les deux variables au composant via les props
  return { props: { locale, locales, defaultLocale, data, filters } };
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Directory;