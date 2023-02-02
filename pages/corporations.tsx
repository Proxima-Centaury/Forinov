/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../components/carousels/carousel";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporations Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CorporationsHome = ({ opportunities, logos, locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;
	const parentProps = { locales, states, stateSetters, config };
	const title = "Forinov " + translations["Entreprises"] + " - " + translations["Comment ça marche"] + " ?";
	return <>
		<Head>
			<title>{ title }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="corporation">
				<div>
					<h1>{ translations["Innover plus simplement"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Lancez vos appels à candidatures, trouvez les meilleures solutions, développez et gérez votre réseau de startups et de partenaires en quelques clics"] + "." }</p>
					<Link href="/onboarding">{ translations["Pré-inscription gratuite"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.register } data-type="corporation">
				<div>
					<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
					<Carousel { ...parentProps } component={ "CorporationHowTo" }/>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="corporation">
				<div>
					<h2>{ translations["Ils nous font confiance"] }</h2>
					<Carousel { ...parentProps } component={ "CompaniesLogos" } data={ logos }/>
					<h2>{ translations["Des milliers de startups, d'entreprises et de partenaires vous attendent sur Forinov"] + " !" }</h2>
					<h3>{ translations["Adaptez votre forfait à vos besoins"] + " !" }</h3>
					<div className={ HomeStyles.actions }>
						<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Rejoindre la communauté"] }</Link>
						<Link href="/onboarding" className={ ButtonStyles.callToActionAlternative }>{ translations["Découvrir les offres"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.sourcing } data-type="corporation">
				<div>
					<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
					<p>{ translations["Publiez appels à projets, appels à candidatures et challenges en quelques clics"] }</p>
					<div data-carousel="corporation">
						<Carousel { ...parentProps } component={ "HowToCreateOpportunity" }/>
					</div>
					<div className={ HomeStyles.actions }>
						<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Je publie mon opportunité"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.opportunity } data-type="corporation">
				<div>
					<h4>{ translations["Les dernières oppotunités"] + " :" }</h4>
					<Carousel { ...parentProps } component={ "LatestOpportunities" } data={ opportunities }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/directories/opportunities" className={ ButtonStyles.callToAction }>{ translations["Découvrir toutes les opportunités"] }</Link>
						<Link href="/opportunities" className={ ButtonStyles.callToActionAlternative }>{ translations["Qu'est-ce qu'une opportunité"] + " ?" }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="corporation">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...parentProps } component={ "CorporationAccordions" } data={ Object.values(config.accordions.landings.corporation) }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
			</div>
		</div>
	</>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
	const { endpoint, queries } = config.api;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const logosPromise = await fetch(endpoint + "?q=" + queries.getLandingLogos + "&type=startup&authkey=Landing");
    const logosResponse = await logosPromise.json();
    const formattedLogosResponse = Object.values(logosResponse[0].LOGOS);
	const landingOpportunitiesPromise = await fetch(endpoint + "?q=" + queries.getLandingOpportunities + "&app=next&authkey=Landing");
    const landingOpportunitiesResponse = await landingOpportunitiesPromise.json();
    const formattedLandingOpportunitiesResponse = Object.values(landingOpportunitiesResponse[0].PROJECT);
	return {
		props: {
			locale, locales, defaultLocale,
			logos: formattedLogosResponse,
			opportunities: formattedLandingOpportunitiesResponse
		},
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default CorporationsHome;
export { getServerSideProps };