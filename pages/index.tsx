/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { useEffect } from "react";
import trustedBy from "../public/static/trustedBy.json";
import AccordionItem from "../components/accordion/AccordionItem";
import { HomeInterface, ButtonInterface } from "../typescript/interfaces";
import { buildProperties } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Button from "../components/buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Home = ({ locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;
	const opportunityCreationStepsButtons = [
		translations["Démarrez"],
		translations["Complétez"],
		translations["Diffusez"],
		translations["Profitez"]
	];
	const buttonProps = [ "type", "action", "text" ];
	const setStepButtonActive = (event: any) => {
		const target = event.target.closest("." + ButtonStyles.callToActionStep) as Element;
		const buttons = document.querySelectorAll("." + ButtonStyles.callToActionStep);
		(buttons) ? buttons.forEach((button) => button.classList.remove(ButtonStyles.active)) : null;
		return target.classList.add(ButtonStyles.active);
	};
	useEffect(() => {
		const setFirstStepActive = () => {
			const buttons = document.querySelectorAll("." + ButtonStyles.callToActionStep);
			return (buttons) ? buttons[0].classList.add(ButtonStyles.active) : null;
		};
		setFirstStepActive();
	}, []);
	return <>
		<Head>
			<title>Forinov - { translations["Accueil"] }</title>
		</Head>
		<div className={ HomeStyles.presentation }>
			<div>
				<div>
					<h1>{ translations["Trouver la startup qu'il vous faut"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d’innovation, à chaque startup son Forinov"] + " !" }</p>
					<a href="">{ translations["Voir la vidéo de présentation"] }</a>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160"/>
			</div>
		</div>
		<div className={ HomeStyles.opportunity }>
			<div>
				<h2>{ translations["Lancez-vous"] + " !" }</h2>
				<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
				<div className={ HomeStyles.steps }>
					{ opportunityCreationStepsButtons.map((button: any, key: number) => {
						const stepButtonValues = [ ButtonStyles.callToActionStep, setStepButtonActive, button ];
						const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
						return <>
							<div className="separator"></div>
							<Button key={ key } { ...stepButtonObject as ButtonInterface }/>
						</>;
					}) }
					<div className="separator"></div>
				</div>
				<div className={ HomeStyles.carousel_wrapper}>
					<div className={ HomeStyles.carousel} id="carouselObject">
						<div className={ HomeStyles.carousel_item}>
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
						<div className={HomeStyles.carousel_item}>
							<ul>
								<h1>{translations["landing_carousel_title2"]}</h1>
								{translations["landing_carousel_content1"].map(
									(item:any) => {
										return <li key={"2-" + item}>{item}</li>;
									},
								)}
							</ul>
							<img
								src=""
								alt="carousel item 1 image"
							/>
						</div>
						<div className={HomeStyles.carousel_item}>
							<ul>
								<h1>{translations["landing_carousel_title3"]}</h1>
								{translations["landing_carousel_content1"].map(
									(item:any) => {
										return <li key={"3-" + item}>{item}</li>;
									},
								)}
							</ul>
							<img
								src=""
								alt="carousel item 1 image"
							/>
						</div>
						<div className={HomeStyles.carousel_item}>
							<ul>
								<h1>{translations["landing_carousel_title4"]}</h1>
								{translations["landing_carousel_content1"].map(
									(item:any) => {
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
				<div className={HomeStyles.ctaWrapper}>
					<button className="callToAction">
						{translations["landing_cta1"]}
					</button>
					<button className="callToActionAlternative">
						{translations["landing_cta2"]}
					</button>
				</div>
				<h1 className={HomeStyles.companiesTitle}>
					{translations["landing_companies_title"]}
				</h1>
				<div className={HomeStyles.companies}>
					{trustedBy.map((company, index) => {
						return (
							<a
								style={{
									position: "relative",
								}}
								key={company.name+"-"+index}
							>
								<img
									src={company.image}
									alt={company.name}
									key={company.name}
									className={HomeStyles.companyItem}
									onMouseEnter={(e) => {
										document.getElementById(company.name)!.style.opacity = "1";
									}}
									onMouseLeave={(e) => {
										document.getElementById(company.name)!.style.opacity = "0";
									}}
								/>
								<div
									className={HomeStyles.companyTooltip}
									style={{ opacity: "0" }}
									id={company.name}
								>
									{company.name}
								</div>
							</a>
						);
					})}
				</div>
				<div className={HomeStyles.collapseBackground}>
					<h1 className={HomeStyles.collapseTitle}>
						{translations["landing_collapse_title"]}
					</h1>
					<div className={HomeStyles.collapseCtas}>
						<button
							className={HomeStyles.collapseCta}
							id="collapseCtaActive"
							onClick={(e:any) => {
								const object = document.getElementById(
									"accordionCarouselObject",
								);
								document.getElementById("collapseCtaActive")!.id =
									"collapseCtaInactive";
								e.target.id = "collapseCtaActive";
								object!.style.transform = "translateX(0%)";
							}}
						>
							{translations["landing_collapse_cta1"]}
						</button>
						<button
							className={HomeStyles.collapseCta}
							onClick={(e: any) => {
								const object = document.getElementById(
									"accordionCarouselObject",
								);
								document.getElementById("collapseCtaActive")!.id =
									"collapseCtaInactive";
								e.target.id = "collapseCtaActive";
								object!.style.transform = "translateX(-50%)";
							}}
						>
							{translations["landing_collapse_cta2"]}
						</button>
					</div>
					<div className={HomeStyles.carousel_wrapper}>
						{/* 1st accordion */}
						<div
							className={HomeStyles.accordionCarousel}
							id="accordionCarouselObject"
						>
							<div className={HomeStyles.collapseWrapper}>
								{translations["landing_accordion1"].map(
									(item: any, index: any): any => {
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
							<div className={HomeStyles.collapseWrapper}>
							{translations["landing_accordion2"].map(
									(item: any, index: any) => {
										return (
											<AccordionItem
												title={item.title}
												content={item.content}
												identifier={index + translations["landing_accordion1"].length}
												key={index + translations["landing_accordion1"].length + '-accordion2'}
											></AccordionItem>
										);
									},
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getStaticProps };
