import React from "react";
import Head from "next/head";
import styles from "../public/stylesheets/pages/indexStartup.module.css";
import translations from "../translations.json";
import AccordionItem from "../components/accordion/AccordionItem";
import Link from "next/link";

const indexStartup = ({
	dataOpports,
	dataSu,
	locales,
	states,
	stateSetters,
	config,
}: any) => {
	let lang = "fr";
	const { translations }: any = states;
	let lastOpports = dataOpports[0]["PROJECT"];
	return (
		<>
			<Head>
				<title>Index Forinov</title>
				<style>
					{`
          #activeButton {
            background-color: #57595d;
            color: #fff;
          }

		  #collapseCtaActive {
			box-sizing: border-box;
			margin: 0;
			overflow: visible;
			display: inline-block;
			color: #fe6a28;
			vertical-align: middle;
			user-select: none;
			border: 1px solid transparent;
			padding: .8125rem 1.25rem;
			transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
			text-transform: uppercase!important;
			border-radius: 50rem;
			background-color: #ffefe6;
			font-family: "Open Sans", sans-serif;
			font-size: 0.875rem;
			font-weight: 600;
			font-stretch: normal;
			font-style: normal;
			line-height: normal;
			letter-spacing: 1.25px;
			text-align: center;
			cursor: pointer;
		}
        `}
				</style>
			</Head>
			<div className={styles.container}>
				<div className={styles.hero}>
					<div className={styles.text}>
						<h1 className={styles.title}>
							{translations["index_startup_hero"]}
						</h1>
						<p className={styles.paragraph}>
							{translations["index_startup_hero_text"]}
						</p>
						<button className={styles.toVideo}>
							{translations["index_startup_hero_cta"]}
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
				<div className={styles.section2}>
					<h1 className={styles.timelineTitle}>
						{translations["index_startup_timeline_title"]}
					</h1>
					<p className={styles.timelineText}>
						{translations["index_startup_timeline_text"]}
					</p>
					<div className={styles.timeline}>
						<div className={styles.timelineItem}>
							<img
								src=""
								alt=""
							/>
							<div className={styles.tlItemContent}>
								<h1>{translations["index_startup_timeline_title1"]}</h1>
								<p>{translations["index_startup_timeline_text1"]}</p>
							</div>
							<div className={styles.tlStep}>
								<i className="fa-solid fa-chevron-down"></i>
							</div>
						</div>
						<div className={styles.timelineItem}>
							<div className={styles.tlItemContent}>
								<h1>{translations["index_startup_timeline_title2"]}</h1>
								<p>{translations["index_startup_timeline_text2"]}</p>
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
								<h1>{translations["index_startup_timeline_title3"]}</h1>
								<p>{translations["index_startup_timeline_text3"]}</p>
							</div>
							<div className={styles.tlStepComplete}>
								<i className="fa-solid fa-check"></i>
							</div>
						</div>
					</div>
					<h1 className={styles.lastOpsTitle}>Les dernières oppotunités:</h1>
					<div className={styles.lastOps}>
						<div className={styles.innerSlider}>
							{Object.keys(lastOpports).map((opport, index) => {
								console.log(index + "-" + lastOpports[opport]["ID"]);
								return (
									<div
										className={styles.card}
										key={index + "-" + lastOpports[opport]["ID"]}
									>
										<div className={styles.cardBanner}>
											<img
												src={lastOpports[opport].BACKGROUND}
												alt=""
											/>
											<Link href="/">
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
								<h1>{translations["index_corpo_ops_title"]}</h1>
								<Link href={"/"}>
									<p className="callToAction">
										{translations["index_corpo_ops_cta"]}
									</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.wrapper3}>
					<div className={styles.section3}>
						<h1 className={styles.section3Title}>
							{translations["index_startup_section3_title"]}
						</h1>
						<div className={styles.dots}>
							<div className={styles.dot}>
								<i className="fa-solid fa-circle-nodes"></i>
								<div className={styles.dotContent}>
									<h1 className={styles.dotTitle}>
										{translations["index_startup_dot_title1"]}
									</h1>
									<p className={styles.dotText}>
										{translations["index_startup_dot_text1"]}
									</p>
								</div>
							</div>
							<div className={styles.dot}>
								<i className="fa-solid fa-check"></i>
								<div className={styles.dotContent}>
									<h1 className={styles.dotTitle}>
										{translations["index_startup_dot_title2"]}
									</h1>
									<p className={styles.dotText}>
										{translations["index_startup_dot_text2"]}
									</p>
								</div>
							</div>
							<div className={styles.dot}>
								<i className="fa-solid fa-infinity"></i>
								<div className={styles.dotContent}>
									<h1 className={styles.dotTitle}>
										{translations["index_startup_dot_title3"]}
									</h1>
									<p className={styles.dotText}>
										{translations["index_startup_dot_text3"]}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={styles.section2}
					style={{ borderRadius: "0" }}
				>
					<h1 className={styles.companiesTitle}>
						{translations["landing_companies_title"]}
					</h1>
					<div className={styles.companies}>
						{dataSu.map((company, index) => {
							return (
								<div key={company["ID"]}>
									<Link
										href="/"
										style={{
											position: "relative",
										}}
									>
										<img
											src={company.logo}
											alt={company.name}
											key={index + "-" + company.id}
											className={styles.companyItem}
											onMouseEnter={(e) => {
												document.getElementById(company.name).style.opacity =
													"1";
											}}
											onMouseLeave={(e) => {
												document.getElementById(company.name).style.opacity =
													"0";
											}}
										/>
									</Link>

									<div
										className={styles.companyTooltip}
										style={{ opacity: "0" }}
										id={company.name}
									>
										{company.name}
									</div>
								</div>
							);
						})}
					</div>
					<div>
						<h1 className={styles.timelineTitle}>
							{translations["index_startup_join_title"]}
						</h1>
						<p className={styles.timelineText}>
							{translations["index_startup_join_text"]}
						</p>
						<button
							className="callToAction"
							style={{ margin: "5rem auto" }}
						>
							{translations["index_startup_join_cta"]}
						</button>
					</div>
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
									{translations["startup_accordion1"].map((item, index) => {
										return (
											<AccordionItem
												title={item.title}
												content={item.content}
												identifier={index}
												color="#ffefe6"
												textColor="#fe6a28"
												key={index + "-accordion1"}
											></AccordionItem>
										);
									})}
								</div>
								{/* 2nd accordion */}
								<div className={styles.collapseWrapper}>
									{translations["startup_accordion2"].map((item, index) => {
										return (
											<AccordionItem
												title={item.title}
												content={item.content}
												identifier={
													index + translations["startup_accordion1"].length
												}
												color="#ffefe6"
												textColor="#fe6a28"
												key={
													index +
													translations["startup_accordion1"].length +
													"-accordion2"
												}
											></AccordionItem>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { req, res, query, locales, defaultLocale, locale }: any = context;

	const opportRes = await fetch(
		`https://www.forinov.fr/remote/back/api.php?q=LANDING_OPPORTUNITES&authkey=Landing&1`,
	);
	const dataOpports = await opportRes.json();

	const res2 = await fetch(
		`https://www.forinov.fr/remote/back/api.php?q=LANDING_SU&authkey=Landing`,
	);

	const dataSu = await res2.json();

	return {
		props: {
			dataOpports,
			dataSu,
			locales,
			defaultLocale,
			locale,
		},
	};
}

export default indexStartup;
