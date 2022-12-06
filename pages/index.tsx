/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import styles from "../public/stylesheets/pages/Index.module.css";
import Head from "next/head";
import trustedBy from "../public/static/trustedBy.json";
import AccordionItem from "../components/accordion/AccordionItem";
import { GetStaticProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Index = ({ locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;

	console.log(translations["Forinov"]);

	return (
		<>
			<Head>
				<title>Index Forinov</title>
				<style>
					{`
		#__next, body {
			overflow: auto !important;
			width: auto !important;
			height: auto !important;
			margin: 0 !important;
			padding: 0 !important;
		}
			
          .container {
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }

          #activeButton {
            background-color: #57595d;
            color: #fff;
		  }

		#collapseCtaActive {
			box-sizing: border-box;
			margin: 0;
			overflow: visible;
			display: inline-block;
			color: #161c2d;
			vertical-align: middle;
			user-select: none;
			border: 1px solid transparent;
			padding: .8125rem 1.25rem;
			transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
			text-transform: uppercase!important;
			border-radius: 50rem;
			background-color: #e7e7e7;
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

          .layout__footer {
            top: 80px;
            padding-right: 12px;
            padding-left: 12px;
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
            margin-top: 50px;
            margin-bottom: 50px;
            margin-left: auto;
            margin-right: auto;
            max-width: 75%;
          }

        `}
				</style>
			</Head>
			<div className={styles.container}>
				<section className={styles.hero}>
					<div className={styles.text}>
						<h1 className={styles.title}>
							{translations["Trouver la Startup qu'il vous faut"]}
						</h1>
						<p className={styles.paragraph}>
							{
								translations[
									"Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d’innovation, à chaque startup son Forinov !"
								]
							}
						</p>
						<button className={styles.toVideo}>
							{translations["Voir la vidéo de présentation"]}
						</button>
					</div>
					<img
						src="/svg/landing.svg"
						className={styles.artwork}
						alt="..."
					></img>
				</section>
			</div>
			<div className={styles.container2}>
				<section className={styles.section2}>
					<h1 className={styles.getStarted}>
						{translations["landing_section2_title"]}
					</h1>
					<h1 className={styles.section2_subtitle}>
						{translations["landing_section2_subtitle"]}
					</h1>
					<div className={styles.steps}>
						<button
							className={styles.step}
							id="activeButton"
							onClick={(e: any) => {
								const element = document.getElementById(
									"#activeButton",
								) as HTMLElement;
								if (element) {
									element!.id = "";
								}
								e.target.id = "activeButton";
								element!.style.transform = "translateX(0)";
							}}
						>
							{translations["landing_carousel_step1"]}
						</button>
						<button
							className={styles.step}
							onClick={(e: any) => {
								const element = document.getElementById(
									"#activeButton",
								) as HTMLElement;
								if (element) {
									element!.id = "";
								}
								e.target.id = "activeButton";
								element!.style.transform = "translateX(0)";
							}}
						>
							{translations["landing_carousel_step2"]}
						</button>
						<button
							className={styles.step}
							onClick={(e: any) => {
								const element = document.getElementById(
									"#activeButton",
								) as HTMLElement;
								if (element) {
									element!.id = "";
								}
								e.target.id = "activeButton";
								element!.style.transform = "translateX(0)";
							}}
						>
							{translations["landing_carousel_step3"]}
						</button>
						<button
							className={styles.step}
							onClick={(e: any) => {
								const element = document.getElementById(
									"#activeButton",
								) as HTMLElement;
								if (element) {
									element!.id = "";
								}
								e.target.id = "activeButton";
								element!.style.transform = "translateX(0)";
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
										(item: any) => {
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
										(item: any) => {
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
										(item: any) => {
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
										(item: any) => {
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
					<div className={styles.ctaWrapper}>
						<button className="callToAction">
							{translations["landing_cta1"]}
						</button>
						<button className="callToActionAlternative">
							{translations["landing_cta2"]}
						</button>
					</div>
					<h1 className={styles.companiesTitle}>
						{translations["landing_companies_title"]}
					</h1>
					<div className={styles.companies}>
						{trustedBy.map((company: any) => {
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
											document.getElementById(company.name)!.style.opacity =
												"1";
										}}
										onMouseLeave={(e) => {
											document.getElementById(company.name)!.style.opacity =
												"0";
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
					<div className={styles.collapseBackground}>
						<h1 className={styles.collapseTitle}>
							{translations["landing_collapse_title"]}
						</h1>
						<div className={styles.collapseCtas}>
							<button
								className={styles.collapseCta}
								id="collapseCtaActive"
								onClick={(e: any) => {
									const object = document.getElementById(
										"accordionCarouselObject",
									) as HTMLObjectElement;

									document.getElementById("collapseCtaActive")!.id =
										"collapseCtaInactive";
									e.target.id = "collapseCtaActive";

									object!.style.transform = "translateX(0%)";
								}}
							>
								{translations["landing_collapse_cta1"]}
							</button>
							<button
								className={styles.collapseCta}
								onClick={(e: any) => {
									const object = document.getElementById(
										"accordionCarouselObject",
									) as HTMLObjectElement;

									document.getElementById("collapseCtaActive")!.id =
										"collapseCtaInactive";
									e.target.id = "collapseCtaActive";

									object!.style.transform = "translateX(-50%)";
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
									{translations["landing_accordion1"].map(
										(item: any, index: any) => {
											return (
												<AccordionItem
													title={item.title}
													content={item.content}
													identifier={index}
													key={index}
												></AccordionItem>
											);
										},
									)}
								</div>
								{/* 2nd accordion */}
								<div className={styles.collapseWrapper}>
									{translations["landing_accordion2"].map(
										(item: any, index: any) => {
											return (
												<AccordionItem
													title={item.title}
													content={item.content}
													identifier={
														index + translations["landing_accordion1"].length
													}
													key={
														index +
														translations["landing_accordion1"].length +
														"-accordion2"
													}
												></AccordionItem>
											);
										},
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({
	props: { ...context },
});
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Index;
export { getStaticProps };
