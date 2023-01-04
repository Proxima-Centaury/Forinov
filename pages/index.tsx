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
import Link from "next/link";
import Image from "next/image";
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
/* Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Home = ({ logos, locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;
	const buttonProps = [ "type", "action", "text" ];
	const joinButtonValues = [ ButtonStyles.callToAction, () => false, translations["Rejoindre l'écosystème Forinov"] ];
	const joinButtonObject = buildProperties(buttonProps, joinButtonValues);
	const offersButtonValues = [ ButtonStyles.callToActionAlternative, () => false, translations["Découvrir les offres"] ];
	const offersButtonObject = buildProperties(buttonProps, offersButtonValues);
	const parentProps = { locales, states, stateSetters, config };
	return <>
		<Head>
			<title>Forinov - { translations["Accueil"] }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation }>
				<div>
					<h1>{ translations["Trouver la startup qu'il vous faut"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d’innovation, à chaque startup son Forinov"] + " !" }</p>
					<a href="">{ translations["Voir la vidéo de présentation"] }</a>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.opportunity }>
				<div>
					<h2>{ translations["Lancez-vous"] + " !" }</h2>
					<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
					<Carousel { ...parentProps } component={ "HowToCreateAnOpportunity" }/>
					<div className={ HomeStyles.actions }>
						<Button { ...joinButtonObject as ButtonInterface }/>
						<Button { ...offersButtonObject as ButtonInterface }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.companies }>
				<h2>{ translations["Ils ont utilisé Forinov pour leurs opportunités"] }</h2>
				<Carousel { ...parentProps } component={ "CompaniesLogos" } data={ logos }/>
			</div>
			<div className={ HomeStyles.questions }>
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...parentProps } component={ "AnswersToYourQuestions" }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
			</div>
		</div>
	</>
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { locale, locales, defaultLocale } = context;
	const { endpoint, queries } = config.api;
	const logosPromise = await fetch(endpoint + "?q=" + queries.getLandingLogos + "&type=opportunité&authkey=Landing");
    const logosResponse = await logosPromise.json();
    const formattedCompaniesResponse = Object.values(logosResponse[0].LOGOS);
	return {
		props: {
			locale, locales, defaultLocale,
			logos: formattedCompaniesResponse,
		},
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getServerSideProps };
