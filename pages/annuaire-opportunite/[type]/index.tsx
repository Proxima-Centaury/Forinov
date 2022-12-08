import styles from "../../../public/stylesheets/pages/AnnuaireOpport.module.css";
import OpportSearchbar from "../../../components/searchbar/OpportSearchbar";
import Link from "next/link";
import MediumOpportCard from "../../../components/opport-cards/MediumOpportCard";
import PageIndex from "../../../components/pagination/PageIndex";
import { useRouter } from "next/router";
import urlTranslations from "../../../public/static/url_trad.json";

const AnnuaireOpport = ({ filters, dataOpportunities, states }: any) => {
	const lang = "fr";
	const opportunities = dataOpportunities[0]["PROJECT"];
	const page = 1;
	const cardPerPage = 20;
	const { translations }: any = states;
	const nbPages = Math.ceil(Object.keys(opportunities).length / cardPerPage);

	const router = useRouter() as any;

	const { type } = router.query;

	return (
		<div className="container">
			<OpportSearchbar
				active="1"
				filters={filters[0]}
			></OpportSearchbar>
			<div className={styles.typeSelectors}>
				{translations["annuaire_opport_selectors"].map((selector: any) => {
					const selectorToURL = selector
						.toLowerCase()
						.replace(/ /g, "-")
						.replace(/'/g, "-")
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "");
					console.log(selectorToURL);

					if (selectorToURL === type) {
						return (
							<Link
								href={"/annuaire-opportunite/" + selectorToURL}
								key={selector}
								style={{ margin: "0 !important" }}
							>
								<button className="selectorButtonActive">{selector}</button>
							</Link>
						);
					} else {
						return (
							<Link
								href={"/annuaire-opportunite/" + selectorToURL}
								key={selector}
								style={{ margin: "0 !important" }}
							>
								<button className="selectorButton">{selector}</button>
							</Link>
						);
					}
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
			<PageIndex
				nbPages={nbPages}
				currentPage={page}
				url={`/annuaire-opportunite/${type}`}
			></PageIndex>
		</div>
	);
};

export async function getServerSideProps(context: any) {
	const { req, res, query, locales, defaultLocale, locale }: any = context;

	const lang: any = locale.split("-")[0];
	const url = require("../../../public/static/url_trad.json");

	const { type }: any = query;
	let typeID: string | null;
	let dataOpportunities: any;

	if (type === url[lang]["tout"]) {
		typeID = null;
	} else if (type === url[lang]["appels-a-candidature"]) {
		typeID = "1";
	} else if (type === url[lang]["programme-d-accompagnement"]) {
		typeID = "2";
	} else if (type === url[lang]["challenges-ou-concours"]) {
		typeID = "3";
	} else if (type === url[lang]["evenements"]) {
		typeID = "4";
	} else if (type === url[lang]["offres-exclusives"]) {
		typeID = "5";
	} else {
		typeID = null;
	}

	if (typeID === null) {
		const fetchOpportunities = await fetch(
			"https://dev.forinov.fr/remote/back/api.php?q=LANDING_FULLOPPORTUNITES&authkey=Landing&3",
		);
		dataOpportunities = await fetchOpportunities.json();
	} else {
		const fetchOpportunitiesWithType = await fetch(
			`https://dev.forinov.fr/remote/back/api.php?q=LANDING_FULLOPPORTUNITES&authkey=Landing&type_id=${typeID}&3`,
		);
		dataOpportunities = await fetchOpportunitiesWithType.json();
	}

	// Appel API des données de filtres
	const fetchFilters = await fetch(
		"https://dev.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7",
	);
	const filters = await fetchFilters.json();

	// On passe les deux variables au composant via les props
	return {
		props: { filters, dataOpportunities, locales, defaultLocale, locale },
	};
}
export default AnnuaireOpport;
