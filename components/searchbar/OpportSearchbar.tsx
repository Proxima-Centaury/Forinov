import { useState, useRef } from "react";
import styles from "./OpportSearchbar.module.css";
import Link from "next/link";

import { useGlobalContext } from "../context/globalContext";

const OpportSearchbar = (props: any) => {
	const filters = props.filters["CATEGORY"];
	const nbPerCategory = {} as any;
	const { searchState } = useGlobalContext();

	const icon = useRef(null);

	const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
		[],
	);

	const handleInput = (e: any) => {
		searchState.search = e.target.value;
		setInputState(e.target.value);
		if (e.target.value.length > 2 || selectedCategories.length > 0) {
			if (e.target.value.length > 2) {
				props.handleSearchbar(e.target.value, selectedCategories);
			}
		} else if (e.target.value.length === 0 && selectedCategories.length === 0) {
			props.resetSearchbar();
		}
	};

	const [inputState, setInputState] = useState<string>("");
	const [selectedCategoriesLength, setSelectedCategoriesLength] = useState(0);

	//Nécessaire sinon bug connu avec le useState

	let catArray = [];

	for (let catIndex in filters) {
		catArray.push(filters[catIndex]);
	}

	//Fonction utilisé pour les click sur les catégories (dropdown ou cartes de catégories)
	const categorieClickHandler = (categorie: string, element: any) => {
		//Ajoute la catégorie au tableau des catégories sélectionnées si elle n'y est pas, sinon la supprime
		if (selectedCategories.includes(categorie)) {
			const index = selectedCategories.indexOf(categorie);
			selectedCategories.splice(index, 1);
		} else {
			selectedCategories.push(categorie);
		}
		setSelectedCategories(selectedCategories);
		setSelectedCategoriesLength(selectedCategories.length);

		//On build les cartes grâce aux fonctions en props
		if (selectedCategories.length > 0) {
			if (inputState.length > 2) {
				props.handleSearchbar(inputState, selectedCategories);
			} else {
				props.handleSearchbar("", selectedCategories);
			}
		} else {
			if (inputState.length > 2) {
				props.handleSearchbar(inputState, selectedCategories);
			} else {
				props.resetSearchbar();
			}
		}

		//On gère les éléments du DOM pour un feedback user
    //si l'attribut data-selected est false
    if (element.getAttribute("data-selected") === "false") { 
      element.children[0].style.color = "#006dff";
      element.children[2].style.display = "block";
      element.setAttribute("data-selected", "true");
    } else {
      element.children[0].removeAttribute("style");
      element.children[2].removeAttribute("style");
      element.setAttribute("data-selected", "false");
    }
	};

	return (
		<div className="annuaire__searchbar">
			{/* Breadcrumbs */}
			<ul className={styles.links}>
				<li className={props.active === "1" ? styles.link_active : styles.link}>
					<i
						className="fa-solid fa-star"
						style={{
							marginRight: "0.5rem",
						}}
					></i>
					<span>AAA</span>
				</li>

				<li className={props.active === "2" ? styles.link_active : styles.link}>
					<i
						className="fa-solid fa-folder-open"
						style={{
							marginRight: "0.5rem",
						}}
					></i>
					<span>BBB</span>
				</li>

				<li className={props.active === "3" ? styles.link_active : styles.link}>
					<i
						className="fa-solid fa-file-pen"
						style={{
							marginRight: "0.5rem",
						}}
					></i>
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
						handleInput(e);
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
								".annuaire__searchbar-select-list",
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
						<div style={{ margin: 0, display: "flex" }}>
							Catégories{" "}
							{selectedCategories.length > 0 ? (
								<span className="annuaire__searchbar-select-count">
									{selectedCategoriesLength}
								</span>
							) : null}
						</div>
						<i
							className="fa-solid fa-caret-down"
							ref={icon}
						></i>
					</button>
					<ul
						className="annuaire__searchbar-select-list"
						style={{ display: "none" }}
					>
						{catArray.map((categorie) => {
							return (
								<button
									className="annuaire__searchbar-select-list-item"
									onClick={(e) => {
										categorieClickHandler(categorie.ID, e.target);
									}}
									id={categorie.ID}
                  key={"categorie-" + categorie.ID}
                  data-selected="false"
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
	);
};

export default OpportSearchbar;
