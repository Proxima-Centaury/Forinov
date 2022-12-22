import styles from "../../../public/stylesheets/components/OpportunityByID.module.css";
import { useState, useEffect } from "react";
import translations from "../../../translations.json";

const OpportunityByID = ({ data, apiParameters, states }: any) => {
    const { translations }: any = states;
	const getRemainingTime = (str: String) => {
		var array = str.split(",");
		if (apiParameters.lang === "fr") {
			if (array[0] !== "0") {
				return array[0] + " ans " + array[1] + " mois " + array[2] + " jours";
			} else if (array[1] !== "0") {
				return array[1] + " mois " + array[2] + " jours";
			} else {
				return array[2] + " jours";
			}
		} else if (apiParameters.lang === "en") {
			if (array[0] !== "0") {
				return (
					array[0] + " years " + array[1] + " months " + array[2] + " days"
				);
			} else if (array[1] !== "0") {
				return array[1] + " months " + array[2] + " days";
			} else {
				return array[2] + " days";
			}
		}
	};

	const [copied, setCopied] = useState(false);

	const [showMore, setShowMore] = useState(false);

	const categoryLimit = 4;

	const [catArray, setCatArray] = useState([]);
    
	
    
    useEffect(() => {
        let tempArray: any = [];
        const setTags = () => {
            if (data.opportunity_category) {
                Object.keys(data.opportunity_category).map((key) => {
                    tempArray.push(
                        <li
                            className={styles.tag}
                            key={key}
                        >
                            {data.opportunity_category[key].NAME}
                        </li>,
                    );
                });
                setCatArray(tempArray);
            }
        };
        setTags();
    }, [data.opportunity_category]);


	if (data.ERROR.length > 0) {
		return (
			<div className="container">
				<h1>{translations["Opportunité non existante"]}</h1>
			</div>
		);
	} else {
		return (
			<div className="container">
				<div className={styles.card}>
					<div className={styles.banner}>
						<img
							src={data.opportunity_background}
							alt="Opportunity Background"
						/>
					</div>

					<div className={styles.content}>
						<div className={styles.avatar_wrapper}>
							<div className={styles.avatar}>
								<img
									src={data.opportunity_owner_logo}
									alt="Opportunity Avatar"
								/>
							</div>
						</div>

						<div className={styles.details_wrapper}>
							<h1 className={styles.opportunity_name}>
								<span className={styles.owner_name}>
									{data.opportunity_owner_name} -
								</span>{" "}
								{data.opportunity_name}
							</h1>
							<div
								className={styles.opportunity_type}
								style={
									data.opportunity_type[1].ID.toString() === "1"
										? { backgroundColor: "var(--project-color)" }
										: data.opportunity_type[1].ID.toString() === "2"
										? { backgroundColor: "var(--program-color)" }
										: { backgroundColor: "var(--event-color)" }
								}
							>
								{data.opportunity_type[1].NAME}
							</div>
							<hr className={styles.spacer} />
							<ul className={styles.opportunity_notes}>
								{data.remaining_time === "permanent" ? (
									""
								) : (
									<li>
										{translations["Expire le"] +
											": " +
											data.opportunity_endingdate_display}
									</li>
								)}
								<li>
									{data.remaining_time === "permanent"
										? "Permanent"
										: translations["Restant"] +
										  ": " +
										  getRemainingTime(data.remaining_time)}
								</li>
								{data.opportunity_town ? (
									<li>
										{translations["Localisation"] +
											" : " +
											data.opportunity_town}
									</li>
								) : (
									""
								)}
								<li>
									{" "}
									<i className="fa-solid fa-eye"></i>
									{data.opportunity_privacy.charAt(0).toUpperCase() +
										data.opportunity_privacy.slice(1)}
								</li>
								<li>
									<a href={data.opportunity_url}>
										{translations["Site web"]}
									</a>
								</li>
							</ul>
							<hr className={styles.spacer} />
							<p className={styles.opportunity_desc}>{data.opportunity_desc}</p>
							<hr className={styles.spacer} />
							<b style={{ color: "#1263F" }}>
								{translations["Critères d'éligibilité"]}
							</b>
							<p style={{ marginTop: "0.75rem", color: "#1263F" }}>
								{data.opportunity_eligibility}
							</p>
							<hr className={styles.spacer} />
							<ul className={styles.tags}>
								{catArray.length > categoryLimit && !showMore
									? catArray.slice(0, categoryLimit)
									: catArray}
								{catArray.length >= categoryLimit ? (
									<li
										onClick={() => {
											setShowMore(!showMore);
										}}
										className={styles.show_more}
									>
										{showMore
											? translations["Voir moins"]
											: translations["Voir plus"]}
									</li>
								) : null}
							</ul>
							<ul className={styles.secondary_tags}>
								{data.opportunity_tags.length > 0
									? data.opportunity_tags.split(",").map((tag:any, index:any) => {
											return (
												<li
													key={index}
													className={styles.tag}
												>
													{tag}
												</li>
											);
									  })
									: null}
							</ul>
							<hr className={styles.spacer} />
							<a
								href=""
								className={styles.get_attached_files}
							>
								<i className="fa-solid fa-cloud-arrow-down"></i>
								{
									translations[
										"Télécharger les fichiers attachés"
									]
								}
							</a>
						</div>
					</div>
				</div>
				<div className={styles.actions}>
					<button
						className={styles.item}
						onClick={() => {
							navigator.clipboard.writeText(window.location.href);
							setCopied(true);
							setTimeout(() => {
								setCopied(false);
							}, 2000);
						}}
					>
						<i className="fa-solid fa-share"></i>
						{translations["Partager"]}
						{copied ? (
							<div
								className={styles.tooltip}
								id="shareTooltip"
							>
								{
									translations[
										"Copié dans le presse-papier"
									]
								}
							</div>
						) : null}
					</button>

					<button className={styles.item}>
						<i className="fa-solid fa-calendar"></i>
						{translations["Ajouter à mon calendrier"]}
					</button>

					<button className={styles.item}>
						<i className="fa-solid fa-star"></i>
						{translations["Voir toutes les opportunités"]}
					</button>
				</div>
				{data.opportunity_status === "Online" ? (
					<button className="large-callToAction">
						<i className="fa-solid fa-file-lines"></i>
						{translations["Postuler"]}
					</button>
				) : null}
				<h1 className={styles.other_title}>
					{translations["Autres opportunités de"] +
						" " +
						data.opportunity_owner_name}
				</h1>

				<div className={styles.other}>
					{data.others_opportunities.map((opportunity: any, index: any) => {
						return (
							<a
								className={styles.other_card + " lift"}
								href={opportunity.URL}
								key={index}
							>
								<div className={styles.other_card_banner}>
									<img
										src={opportunity.BACKGROUND}
										alt=""
									/>
								</div>
								<div className={styles.other_card_content}>
									<p className={styles.other_card_visibility}>
										<i className="fa-regular fa-eye"></i>
										{opportunity.PRIVACY}
									</p>
									<h1 className={styles.other_card_title}>
										{opportunity.NAME}
									</h1>
									<div
										className={styles.other_opportunity_type}
										style={
											opportunity.TYPE[1].ID.toString() === "1"
												? { backgroundColor: "var(--project-color)" }
												: opportunity.TYPE[1].ID.toString() === "2"
												? { backgroundColor: "var(--program-color)" }
												: { backgroundColor: "var(--event-color)" }
										}
									>
										{opportunity.TYPE[1].NAME}
									</div>
									<div className={styles.spacer}></div>
									<div className={styles.other_remaining}>
										<i className="fa-solid fa-calendar"></i>
										{opportunity.REMAINING === "permanent"
											? translations["Permanent"]
											: opportunity.REMAINING === "later"
											? translations["Plus tard"]
											: opportunity.REMAINING === "undefined"
											? translations["Non défini"]
											: opportunity.REMAINING === "finished"
											? translations["Terminé"]
											: translations["Fini dans"] +
											  " : " +
											  getRemainingTime(opportunity.REMAINING)}
									</div>
								</div>
							</a>
						);
					})}
				</div>
			</div>
		);
	}
};

export async function getServerSideProps(context: any) {
	const { req, res, query, locales, defaultLocale, locale }: any = context;

	const apiParameters = {
		id: context.query.id,
		authkey: "Sorbonne",
		lang: "fr",
		environment: "dev",
	};

	const url = `https://${apiParameters.environment}.forinov.fr/remote/back/api.php?q=V5_GET_OPPORTUNITY&ID=${apiParameters.id}&authkey=${apiParameters.authkey}&lg=${apiParameters.lang}`;

	const apiRes = await fetch(url);
	const data = await apiRes.json();

	return { props: { data, apiParameters, locales, defaultLocale, locale } };
}

export default OpportunityByID;
