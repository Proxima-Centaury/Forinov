import styles from "../../../public/stylesheets/pages/AnnuaireOpport.module.css";
import OpportSearchbar from "../../../components/searchbar/OpportSearchbar";
import Link from "next/link";
import MediumOpportCard from "../../../components/opport-cards/MediumOpportCard";
import { useRouter } from "next/router";

const AnnuaireOpport = ({ filters, dataOpportunities, states }: any) => {
	const lang = "fr";
	const opportunities = dataOpportunities[0]["PROJECT"];
	const page = 1;
	const cardPerPage = 20;
	const { translations }: any = states

	const router = useRouter() as any;
	const {type} = router.query

	console.log(type);

	switch (type) { 
		case "1":
			console.log("1");
			break;
		case "2":
			console.log("2");
			break;
		case "3":
			console.log("3");
			break;
		case "4":
			console.log("4");
			break;
		case "5":
			console.log("5");
			break;
	}
	

	return (
		<>
			<OpportSearchbar
				active="1"
				filters={filters[0]}
			></OpportSearchbar>
			<div className={styles.typeSelectors}>
				{translations["annuaire_opport_selectors"].map((selector: any) => {
					return (
						<Link
							href={"/"}
							key={selector}
							style={{ margin: "0 !important" }}
						>
							<button className="selectorButton">{selector}</button>
						</Link>
					);
				})}
			</div>
			<div className={styles.opportCardWrapper}>
				{Object.keys(opportunities).map((opportunity, index) => {
					if (index < cardPerPage * page && index >= cardPerPage * (page - 1)) {
						return (
							<MediumOpportCard
								key={opportunities[opportunity]["ID"]}
								background={opportunities[opportunity]["BACKGROUND"]}
								title={opportunities[opportunity]["TITLE"]}
								logo={opportunities[opportunity]["LOGO"]}
								company={opportunities[opportunity]["NAME"]}
								type={opportunities[opportunity]["TYPE"]}
								typename={opportunities[opportunity]["TYPE_NAME"]}
								remaining={opportunities[opportunity]["REMAINING"]}
								translations={translations}
							></MediumOpportCard>
						);
					}
				})}
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	
	const { req, res, query, locales, defaultLocale, locale }: any = context

	console.log(locale.split("-")[0]);
	


	switch (query.type) { 
		case query.type === translations["url_appel-a-projets"]:
		
	}
	

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
	return { props: { filters, dataOpportunities, locales, defaultLocale, locale } };
}
export default AnnuaireOpport;
