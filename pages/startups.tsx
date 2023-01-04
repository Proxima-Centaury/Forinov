/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface, ButtonInterface } from "../typescript/interfaces";
import { buildProperties } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/buttons/button";
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
/* Startups Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupsHome = ({ opportunities, logos, locales, states, stateSetters, config}: HomeInterface) => {
	console.log(logos)
	const { translations }: any = states;
	const buttonProps = [ "type", "action", "text" ];
	const discoverOpportunitiesButtonValues = [ ButtonStyles.callToAction, () => false, translations["Découvrir toutes les opportunités"] ];
	const discoverOpportunitiesButtonObject = buildProperties(buttonProps, discoverOpportunitiesButtonValues);
	const understandOpportunitiesButtonValues = [ ButtonStyles.callToActionAlternative, () => false, translations["Qu'est-ce qu'une opportunité"] + " ?" ];
	const understandOpportunitiesButtonObject = buildProperties(buttonProps, understandOpportunitiesButtonValues);
	const parentProps = { locales, states, stateSetters, config };
	return <>
		<Head>
			<title>Forinov Startups - { translations["Comment ça marche"] + " ?" }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="startup">
				<div>
					<h1>{ translations["Bienvenue sur Forinov"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d’innovation, à chaque startup son Forinov"] + " !" }</p>
					<a href="">{ translations["Rejoindre la communauté"] }</a>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.opportunity } data-type="startup">
				<div>
					<h2>{ translations["Comment postuler à une opportunité"] }</h2>
					<h3>{ translations["Trouver des opportunités, faire grandir sa startup"] + ", etc..." }</h3>
					<div data-carousel="startup">
						<Carousel { ...parentProps } component={ "HowToApplyToAnOpportunity" }/>
					</div>
					<h4>{ translations["Les dernières oppotunités"] + " :" }</h4>
					<Carousel { ...parentProps } component={ "TheLatestOpportunities" } data={ opportunities }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Button { ...discoverOpportunitiesButtonObject as ButtonInterface }/>
						<Button { ...understandOpportunitiesButtonObject as ButtonInterface }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="startup">

			</div>
			<div className={ HomeStyles.companies }>
				<h2>{ translations["Ces entreprises et partenaires utilisent Forinov pour leurs relations startups"] }</h2>
				<Carousel { ...parentProps } component={ "CompaniesLogos" } data={ logos }/>
				<h2>{ translations["Créer mon compte startup gratuitement"] }</h2>
				<h3>{ translations["Et rejoindre une communauté grandissante rassemblant tous les acteurs de l'innovation"].toLowerCase() }</h3>
				<Link href="/register" className={ ButtonStyles.callToAction }>{ translations["Rejoindre la communauté"] }</Link>
			</div>
			<div className={ HomeStyles.questions }>
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...parentProps } component={ "AnswersToYourQuestions" }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
			</div>
		</div>
	</>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { locale, locales, defaultLocale } = context;
	const { endpoint, queries } = config.api;
	const landingOpportunitiesPromise = await fetch(endpoint + "?q=" + queries.getLandingOpportunities + "&app=next&authkey=Landing");
    const landingOpportunitiesResponse = await landingOpportunitiesPromise.json();
    const formattedLandingOpportunitiesResponse = Object.values(landingOpportunitiesResponse[0].PROJECT);
	const logosPromise = await fetch(endpoint + "?q=" + queries.getLandingLogos + "&type=startup&authkey=Landing");
    const logosResponse = await logosPromise.json();
    const formattedCompaniesResponse = Object.values(logosResponse[0].LOGOS);
	return {
		props: {
			locale, locales, defaultLocale,
			opportunities: formattedLandingOpportunitiesResponse,
			logos: formattedCompaniesResponse,
		},
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupsHome;
export { getServerSideProps };