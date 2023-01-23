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
					<h1>{ translations["Bienvenue sur Forinov"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Sur Forinov, nous regroupons plus de 5000 startups, de quoi trouver votre partenaire de demain"] + " !" }</p>
					<Link href="/onboarding">{ translations["Rejoindre la communauté"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.register } data-type="corporation">
				<div>
					<h3>{ translations["Comment m'inscrire sur Forinov"] + " ?" }</h3>
					<Carousel { ...parentProps } component={ "HowToRegister" }/>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="corporation">
				<div>
					<h2>{ translations["Ils nous font confiance"] }</h2>
					<Carousel { ...parentProps } component={ "CompaniesLogos" } data={ logos }/>
					<h2>{ translations["Rejoignez l'écosystème Forinov plus de 1200 startups vous attendent"] + " !" }</h2>
					<h3>{ translations["Adaptez votre forfait à vos besoins"] + " !" }</h3>
					<div className={ HomeStyles.actions }>
						<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Rejoindre l'écosystème Forinov"] }</Link>
						<Link href="/onboarding" className={ ButtonStyles.callToActionAlternative }>{ translations["Découvrir les offres"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.sourcing } data-type="corporation">
				<div>
					<h3>{ translations["Comment bien débuter sur Forinov"] + " ?" }</h3>
					<p>{ translations["Sourcer des startups"] }</p>
					<div data-carousel="corporation">
						<Carousel { ...parentProps } component={ "HowToGetStarted" }/>
					</div>
					<div className={ HomeStyles.actions }>
						<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Découvrir les avantages de la solution Forinov"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.opportunity } data-type="corporation">
				<div>
					<h4>{ translations["Les dernières oppotunités"] + " :" }</h4>
					<Carousel { ...parentProps } component={ "TheLatestOpportunities" } data={ opportunities }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/directories/opportunities" className={ ButtonStyles.callToAction }>{ translations["Découvrir toutes les opportunités"] }</Link>
						<Link href="/opportunities" className={ ButtonStyles.callToActionAlternative }>{ translations["Qu'est-ce qu'une opportunité"] + " ?" }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="corporation">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...parentProps } component={ "AnswersToYourQuestions" } data={ Object.values(config.accordions.landings.corporation) }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
			</div>
		</div>
	</>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res, locale, locales, defaultLocale } = context;
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
			production: (req.headers.host?.match("interface.forinov")) ? true : false,
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