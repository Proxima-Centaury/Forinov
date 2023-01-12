/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import { remainingTime } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import styles from "../../../public/stylesheets/components/OpportunityByID.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Opportunity */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Opportunity = ({ opportunity, states, stateSetters }: any) => {
    const { translations }: any = states;
	const [copied, setCopied] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const categoryLimit = 4;
	console.log(opportunity);
	if (opportunity.ERROR.length > 0) {
		return (
			<div className="container">
				<h1>{translations["Opportunité non existante"]}</h1>
			</div>
		);
	} else {
		return <div className="container">
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
				{opportunity.opportunity_status === "Online" ? (
					<button className="large-callToAction">
						<i className="fa-solid fa-file-lines"></i>
						{translations["Postuler"]}
					</button>
				) : null}
				<h1 className={styles.other_title}>
					{translations["Autres opportunités de"] +
						" " +
						opportunity.opportunity_owner_name}
				</h1>

				<div className={styles.other}>
					{opportunity.others_opportunities.map((opportunity: any, index: any) => {
						return (
							<a
								className={styles.other_card + " lift"}
								href={opportunity.URL}
								key={index}
							>
								<div className={styles.other_card_banner}>
									<Image
										src={opportunity.BACKGROUND}
										alt=""
										width="120"
										height="120"
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
									{/* <div className={styles.other_remaining}>
										<i className="fa-solid fa-calendar"></i>
										{ remainingTime(opportunity.remaining_time, null, null, translations) }
									</div> */}
								</div>
							</a>
						);
					})}
				</div>
		</div>;
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Opportunity;
export { getStaticProps };