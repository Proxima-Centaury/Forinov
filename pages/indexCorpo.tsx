import React from "react";
import Head from "next/head";
import styles from "../public/stylesheets/pages/indexCorpo.module.css";
import translations from "../translations.json";
import trustedBy from "../public/static/trustedBy.json";
import AccordionItem from "../components/accordion/AccordionItem";
import Link from "next/link";

export default function indexCorpo({
	dataOpports,
	locales,
	states,
	stateSetters,
	config,
}: any) {
	const { translations }: any = states;
	const lang = "fr";
	let lastOpports = dataOpports[0]["PROJECT"];
	return (
		<>
			<Head>
				<title>Index Forinov</title>
				<style>
					{`


#activeButton {
	background-color: #006DFF;
	color: #fff;
	border: 2px solid #F8F7F6;
}

  #collapseCtaActive {
	box-sizing: border-box;
	margin: 0;
	overflow: visible;
	display: inline-block;
	color: #006DFF;
	vertical-align: middle;
	user-select: none;
	border: 1px solid transparent;
	padding: .8125rem 1.25rem;
	transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	text-transform: uppercase!important;
	border-radius: 50rem;
	background-color: #b2d1ff;
	font-family: "Open Sans", sans-serif;
	font-size: 0.875rem;
	font-weight: 600;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 1.25px;
	text-align: center;
	cursor: pointer;
         }       `}
				</style>
			</Head>
			<div className="containerFull">
				<div className={styles.container}>
					<div className={styles.hero}>
						<div className={styles.text}>
							<h1 className={styles.title}>
								{translations["index_corpo_hero"]}
							</h1>
							<p className={styles.paragraph}>
								{translations["index_corpo_hero_text"]}
							</p>
							<button className={styles.toVideo}>
								{translations["index_corpo_hero_cta"]}
							</button>
						</div>
						<img
							className={styles.artwork}
							src="https://standalone.forinov.net/landing/assets/img/photos/landing-su.png"
							alt="Hero rocket Artwork"
						/>
					</div>
				</div>
				<div className={styles.container2}>
					<section className={styles.section2}>
						<h1 className={styles.getStarted}>
							{translations["landing_section2_title"]}
						</h1>
						<div className={styles.steps}>
							<button
								className={styles.step}
								id="activeButton"
								onClick={(e) => {
									if (document.querySelector("#activeButton")) {
										document.querySelector("#activeButton").id = "";
									}
									e.target.id = "activeButton";
									document.querySelector("#carouselObject").style.transform =
										"translateX(0)";
								}}
							>
								{translations["landing_carousel_step1"]}
							</button>
							<button
								className={styles.step}
								onClick={(e) => {
									if (document.querySelector("#activeButton")) {
										document.querySelector("#activeButton").id = "";
									}
									e.target.id = "activeButton";
									document.querySelector("#carouselObject").style.transform =
										"translateX(-25%)";
								}}
							>
								{translations["landing_carousel_step2"]}
							</button>
							<button
								className={styles.step}
								onClick={(e) => {
									if (document.querySelector("#activeButton")) {
										document.querySelector("#activeButton").id = "";
									}
									e.target.id = "activeButton";
									document.querySelector("#carouselObject").style.transform =
										"translateX(-50%)";
								}}
							>
								{translations["landing_carousel_step3"]}
							</button>
							<button
								className={styles.step}
								onClick={(e) => {
									if (document.querySelector("#activeButton")) {
										document.querySelector("#activeButton").id = "";
									}
									e.target.id = "activeButton";
									document.querySelector("#carouselObject").style.transform =
										"translateX(-75%)";
								}}
							>
								{translations["landing_carousel_step4"]}
							</button>
						</div>
						<div className={styles.carousel_wrapper}>
							<div
								className={styles.carousel}
								id="carouselObject"
							>
								<div className={styles.carousel_item}>
									<ul>
										<h1>{translations["landing_carousel_title1"]}</h1>
										{translations["landing_carousel_content1"].map(
											(item) => {
												return <li key={"1-" + item}>{item}</li>;
											},
										)}
									</ul>
									<img
										src=""
										alt="carousel item 1 image"
									/>
								</div>
								<div className={styles.carousel_item}>
									<ul>
										<h1>{translations["landing_carousel_title2"]}</h1>
										{translations["landing_carousel_content1"].map(
											(item) => {
												return <li key={"2-" + item}>{item}</li>;
											},
										)}
									</ul>
									<img
										src=""
										alt="carousel item 1 image"
									/>
								</div>
								<div className={styles.carousel_item}>
									<ul>
										<h1>{translations["landing_carousel_title3"]}</h1>
										{translations["landing_carousel_content1"].map(
											(item) => {
												return <li key={"3-" + item}>{item}</li>;
											},
										)}
									</ul>
									<img
										src=""
										alt="carousel item 1 image"
									/>
								</div>
								<div className={styles.carousel_item}>
									<ul>
										<h1>{translations["landing_carousel_title4"]}</h1>
										{translations["landing_carousel_content1"].map(
											(item) => {
												return <li key={"4-" + item}>{item}</li>;
											},
										)}
									</ul>
									<img
										src=""
										alt="carousel item 1 image"
									/>
								</div>
							</div>
						</div>
						<h1 className={styles.companiesTitle}>
							{translations["landing_companies_title"]}
						</h1>
						<div className={styles.companies}>
							{trustedBy.map((company) => {
								return (
									<a
										style={{
											position: "relative",
										}}
										key={company}
									>
										<img
											src={company.image}
											alt={company.name}
											key={company.name}
											className={styles.companyItem}
											onMouseEnter={(e) => {
												document.getElementById(company.name).style.opacity = "1";
											}}
											onMouseLeave={(e) => {
												document.getElementById(company.name).style.opacity = "0";
											}}
										/>
										<div
											className={styles.companyTooltip}
											style={{ opacity: "0" }}
											id={company.name}
										>
											{company.name}
										</div>
									</a>
								);
							})}
						</div>
						<h1 className={styles.companiesTitle}>
							{translations["index_corpo_cta_title"]}
						</h1>
						<h4 className={styles.subtitle}>
							{translations["index_corpo_cta_title"]}
						</h4>
						<div className={styles.ctaWrapper}>
							<button className="callToAction">
								{translations["landing_cta1"]}
							</button>
							<button className="callToActionAlternative">
								{translations["landing_cta2"]}
							</button>
						</div>
					</section>
				</div>
				<div className={styles.container3}>
					<section className={styles.section3}>
						<h1 className={styles.timelineTitle}>
							{translations["index_corpo_timeline_title"]}
						</h1>
						<p className={styles.timelineText}>
							{translations["index_corpo_timeline_text"]}
						</p>
						<div className={styles.timeline}>
							<div className={styles.timelineItem}>
								<img
									src=""
									alt=""
								/>
								<div className={styles.tlItemContent}>
									<h1>{translations["index_corpo_timeline_title1"]}</h1>
									<p>{translations["index_corpo_timeline_text1"]}</p>
								</div>
								<div className={styles.tlStep}>
									<i className="fa-solid fa-chevron-down"></i>
								</div>
							</div>
							<div className={styles.timelineItem}>
								<div className={styles.tlItemContent}>
									<h1>{translations["index_corpo_timeline_title2"]}</h1>
									<p>{translations["index_corpo_timeline_text2"]}</p>
								</div>
								<img
									src=""
									alt=""
								/>
								<div className={styles.tlStep}>
									<i className="fa-solid fa-chevron-down"></i>
								</div>
							</div>
							<div className={styles.timelineItem}>
								<img
									src=""
									alt=""
								/>
								<div className={styles.tlItemContent}>
									<h1>{translations["index_corpo_timeline_title3"]}</h1>
									<p>{translations["index_corpo_timeline_text3"]}</p>
								</div>
								<div className={styles.tlStepComplete}>
									<i className="fa-solid fa-check"></i>
								</div>
							</div>
						</div>
					</section>
				</div>
				<section className={styles.section4}>
					<h1 className={styles.collapseTitle}>
						{translations["lastopportunities"]}
					</h1>
					<div className={styles.lastOps}>
						<div className={styles.innerSlider}>
							{Object.keys(lastOpports).map((opport, index) => {
								return (
									<div
										className={styles.card}
										key={index + "-" + lastOpports[opport]["NAME"]}
									>
										<div className={styles.cardBanner}>
											<img
												src={lastOpports[opport].BACKGROUND}
												alt=""
											/>
											<Link href={lastOpports[opport]["LINK"]}>
												<span className={styles.opportCTA + " callToAction"}>
													{translations["Postuler"]}
												</span>
											</Link>
										</div>
										<div className={styles.cardContent}>
											<div className={styles.cardAvatarWrapper}>
												<img
													src={lastOpports[opport]["LOGO"]}
													alt=""
													className={styles.cardAvatar}
												/>
											</div>
											<div className={styles.cardDetails}>
												<span className={styles.suName}>
													{lastOpports[opport]["NAME"]}
												</span>
												<span className={styles.opportVisibility}>
													<i className="fa-regular fa-eye"></i>
													{lastOpports[opport]["VISIBILITY"]}
												</span>
												<h1 className={styles.opportTitle}>
													{lastOpports[opport]["TITLE"]}
												</h1>
												<div
													className={styles.opportType}
													style={
														lastOpports[opport]["TYPE"].toString() === "1"
															? { backgroundColor: "var(--project-color))" }
															: lastOpports[opport]["TYPE"].toString() === "2"
															? { backgroundColor: "var(--program-color))" }
															: { backgroundColor: "var(--event-color))" }
													}
												>
													{lastOpports[opport]["TYPE_NAME"]}
												</div>
												<span className={styles.opportRemaining}>
													<i className="fa-regular fa-calendar"></i>
													{lastOpports[opport]["REMAINING"]}{" "}
													{translations["jours_restant"]}
												</span>
												<p className={styles.opportDescription}>
													{lastOpports[opport]["DESCRIPTION"]}
												</p>
											</div>
										</div>
									</div>
								);
							})}
							<div className={styles.joinCard}>
								<h1>{translations["index_corpo_lastops_card_title"]}</h1>
								<Link
									href="/"
									className="callToAction"
								>
									<span>
										{translations["index_corpo_lastops_card_cta"]}
									</span>
								</Link>
							</div>
						</div>
					</div>
					{/* */}
					<div className={styles.collapseBackground}>
						<h1 className={styles.collapseTitle}>
							{translations["landing_collapse_title"]}
						</h1>
						<div className={styles.collapseCtas}>
							<button
								className={styles.collapseCta}
								id="collapseCtaActive"
								onClick={(e) => {
									const object = document.getElementById(
										"accordionCarouselObject",
									);
									document.getElementById("collapseCtaActive").id =
										"collapseCtaInactive";
									e.target.id = "collapseCtaActive";
									object.style.transform = "translateX(0%)";
								}}
							>
								{translations["landing_collapse_cta1"]}
							</button>
							<button
								className={styles.collapseCta}
								onClick={(e) => {
									const object = document.getElementById(
										"accordionCarouselObject",
									);
									document.getElementById("collapseCtaActive").id =
										"collapseCtaInactive";
									e.target.id = "collapseCtaActive";
									object.style.transform = "translateX(-50%)";
								}}
							>
								{translations["landing_collapse_cta2"]}
							</button>
						</div>
						<div className={styles.carousel_wrapper}>
							{/* 1st accordion */}
							<div
								className={styles.accordionCarousel}
								id="accordionCarouselObject"
							>
								<div className={styles.collapseWrapper}>
									{translations["corpo_accordion1"].map((item, index) => {
										return (
											<AccordionItem
												title={item.title}
												content={item.content}
												identifier={index}
												color="#B2D1FF"
												textColor="#006DFF"
												key={index + "-accordion1"}
											></AccordionItem>
										);
									})}
								</div>
								{/* 2nd accordion */}
								<div className={styles.collapseWrapper}>
									{translations["corpo_accordion2"].map((item, index) => {
										return (
											<AccordionItem
												title={item.title}
												content={item.content}
												identifier={
													index + translations["corpo_accordion1"].length
												}
												color="#B2D1FF"
												textColor="#006DFF"
												key={
													index +
													translations["corpo_accordion1"].length +
													"-accordion2"
												}
											></AccordionItem>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

export async function getServerSideProps(context: any) {
	
	const { req, res, query, locales, defaultLocale, locale }: any = context;


	const apiRes = await fetch(
		`https://www.forinov.fr/remote/back/api.php?q=LANDING_OPPORTUNITES&authkey=Landing&1`,
	);
	const dataOpports = await apiRes.json();

	return {
		props: {
			dataOpports,
			locales,
			defaultLocale,
			locale,
		},
	};
}
