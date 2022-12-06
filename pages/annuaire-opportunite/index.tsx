import React from "react";
import styles from "../../public/stylesheets/pages/AnnuaireOpport.module.css";
import OpportSearchbar from "../../components/searchbar/OpportSearchbar";
import Link from "next/link";
import translations from "../../translations.json";
import MediumOpportCard from "../../components/opport-cards/MediumOpportCard";

const AnnuaireOpport = ({ filters, dataOpportunities }) => {
	const lang = "fr";
	const opportunities = dataOpportunities[0]["PROJECT"];
	const page = 1;
	const cardPerPage = 20;
	console.log(opportunities);

	return (
		<>
			<OpportSearchbar
				active="1"
				filters={filters[0]}
			></OpportSearchbar>
			<div className={styles.typeSelectors}>
				{translations[lang]["annuaire_opport_selectors"].map((selector) => {
					return (
						<Link
							href={"/"}
							key={selector}
						>
							<button className="selectorButton">{selector}</button>
						</Link>
					);
				})}
			</div>
			<div className={styles.opportCardWrapper}>
				{Object.keys(opportunities).map((opportunity, index) => {
					if (index < cardPerPage * page && index >= cardPerPage * (page - 1)) {
						console.log(opportunities[opportunity]["NAME"]);
						return (
							<MediumOpportCard
								key={opportunity["ID"]}
								background={opportunities[opportunity]["BACKGROUND"]}
								title={opportunities[opportunity]["TITLE"]}
								logo={opportunities[opportunity]["LOGO"]}
								company={opportunities[opportunity]["NAME"]}
								type={opportunities[opportunity]["TYPE"]}
								typename={opportunities[opportunity]["TYPE_NAME"]}
							></MediumOpportCard>
						);
					}
				})}
			</div>
		</>
	);
};

export async function getServerSideProps() {
	// Appel API des données de filtres
	const fetchFilters = await fetch(
		"https://dev.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7",
	);
	const filters = await fetchFilters.json();

	const fetchOpportunities = await fetch(
		"https://dev.forinov.fr/remote/back/api.php?q=LANDING_FULLOPPORTUNITES&authkey=Landing&3",
	);
	const dataOpportunities = await fetchOpportunities.json();

	// On passe les deux variables au composant via les props
	return { props: { filters, dataOpportunities } };
}

export default AnnuaireOpport;
