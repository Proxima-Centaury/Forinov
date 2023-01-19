import styles from "../../../../public/stylesheets/pages/AnnuaireOpport.module.css";
import OpportSearchbar from "../../../../components/searchbar/OpportSearchbar";
import Link from "next/link";
import MediumOpportCard from "../../../../components/opport-cards/MediumOpportCard";
import { useRouter } from "next/router";
import PageIndex from "../../../../components/pagination/PageIndex";
import { useGlobalContext } from "../../../../components/context/globalContext";

import { useEffect, useState } from "react";

const AnnuaireOpport = ({ filters, dataOpportunities, states }: any) => {
	const router = useRouter() as any;
	let { type, page } = router.query;


	let opportunities = dataOpportunities[0]["PROJECT"];
	const [opportCards, setOpportCards] = useState<Array<JSX.Element>>([]);

	const [isPage, setIsPage] = useState<boolean>(true);
	const cardPerPage = 20;
	const { translations }: any = states;

	const nbPages = Math.ceil(Object.keys(opportunities).length / cardPerPage);

	//get global context
	const { searchState } = useGlobalContext();

	const [defaultData, setDefaultData] = useState<Array<any>>([
		Object.keys(opportunities).map((opportunity, index) => {
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
		}),
	]);

	const setCards = (
		input: string | null = "",
		categories: Array<string | null> = [],
	) => {
		let tempCards: Array<JSX.Element> = [];
		let tempCardsID: Array<string> = [];

		if (categories.length > 0) {
			Object.keys(opportunities).map((opportunity, index) => {
				const categoriesOpportunity: any = Object.values(
					opportunities[opportunity]["CATEGORIES"],
				);
				categories.forEach((category) => {
					//if input
					if (input === "") {
						if (
							Object.keys(categoriesOpportunity)
								.map((category) => categoriesOpportunity[category]["ID"])
								.includes(category)
						) {
							//if not already in tempCards, push it
							if (!tempCardsID.includes(opportunities[opportunity]["ID"])) {
								tempCardsID.push(opportunities[opportunity]["ID"]);
								tempCards.push(
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
									></MediumOpportCard>,
								);
							}
						}
					} else {
						if (
							Object.keys(categoriesOpportunity)
								.map((category) => categoriesOpportunity[category]["ID"])
								.includes(category) &&
							opportunities[opportunity]["TITLE"]
								.toLowerCase()
								.includes(input!.toLowerCase()) &&
							tempCardsID.includes(opportunities[opportunity]["ID"]) === false
						) {
							tempCardsID.push(opportunities[opportunity]["ID"]);
							tempCards.push(
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
								></MediumOpportCard>,
							);
						}
					}
				});
			});
		} else {
			if (input !== "") {
				Object.keys(opportunities).map((opportunity, index) => {
					if (
						opportunities[opportunity]["TITLE"]
							.toLowerCase()
							.includes(input!.toLowerCase()) &&
						tempCardsID.includes(opportunities[opportunity]["ID"]) === false
					) {
						tempCardsID.push(opportunities[opportunity]["ID"]);
						tempCards.push(
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
							></MediumOpportCard>,
						);
					}
				});
			}
		}
		setOpportCards(tempCards);
	};

	const handleSearchbar = (input: string, categories: Array<string | null>) => {
		setCards(input, categories);
		setIsPage(false);
	};

	const resetSearchbar = () => {
		setOpportCards(defaultData);
		setIsPage(true);
	};

	useEffect(() => {
		setOpportCards(defaultData);
	}, [defaultData]);

	return (
		<div className="container">
			<OpportSearchbar
				active="1"
				filters={filters[0]}
				handleSearchbar={handleSearchbar}
				resetSearchbar={resetSearchbar}
			></OpportSearchbar>
			<div className={styles.typeSelectors}>
				{translations["annuaire_opport_selectors"].map((selector: any) => {
					const selectorToURL = selector
						.toLowerCase()
						.replace(/ /g, "-")
						.replace(/'/g, "-")
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "");

					if (selectorToURL === type) {
						return (
							<Link
								href={"/directories/opportunites/" + selectorToURL + "/"}
								key={selector}
								style={{ margin: "0 !important" }}
							>
								<button className="selectorButtonActive">{selector}</button>
							</Link>
						);
					} else {
						return (
							<Link
								href={"/directories/opportunites/" + selectorToURL + "/"}
								key={selector}
								style={{ margin: "0 !important" }}
							>
								<button className="selectorButton">{selector}</button>
							</Link>
						);
					}
				})}
			</div>
			<div className={styles.opportCardWrapper}>{opportCards}</div>
			{isPage ? (
				<PageIndex
					nbPages={nbPages}
					currentPage={page}
					url={`/directories/opportunites/${type}`}
				></PageIndex>
			) : null}
		</div>
	);
};

export async function getServerSideProps(context: any) {
	const { req, res, query, locales, defaultLocale, locale }: any = context;

	//if page is null or not found redirect to page 1
	if (query.page === undefined || query.page === null || query.page === "0") {
		//router push to page 1
		res.writeHead(302, {
			Location: "/directories/opportunites/" + query.type + "/1",
		});
		res.end();
	}

	const lang: any = locale.split("-")[0];
	const url = require("../../../../public/static/url_trad.json");

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
			"https://dev.forinov.fr/remote/back/api.php?q=LANDING_FULLOPPORTUNITES&authkey=Landing&4",
		);
		dataOpportunities = await fetchOpportunities.json();
	} else {
		const fetchOpportunitiesWithType = await fetch(
			`https://dev.forinov.fr/remote/back/api.php?q=LANDING_FULLOPPORTUNITES&authkey=Landing&type_id=${typeID}&4`,
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
