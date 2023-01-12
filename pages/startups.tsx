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
/* Startups Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupsHome = ({ opportunities, logos, locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;
	const parentProps = { locales, states, stateSetters, config };
	const title = "Forinov Startups - " + translations["Comment ça marche"] + " ?" as String;
	return <>
		<Head>
			<title>{ title }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="startup">
				<div>
					<h1>{ translations["Bienvenue sur Forinov"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d'innovation, à chaque startup son Forinov"] + " !" }</p>
					<Link href="/onboarding">{ translations["Rejoindre la communauté"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.opportunity } data-type="startup">
				<div>
					<h3>{ translations["Comment postuler à une opportunité"] }</h3>
					<p>{ translations["Trouver des opportunités, faire grandir sa startup"] + ", etc..." }</p>
					<div data-carousel="startup">
						<Carousel { ...parentProps } component={ "HowToApplyToAnOpportunity" }/>
					</div>
					<h4>{ translations["Les dernières oppotunités"] + " :" }</h4>
					<Carousel { ...parentProps } component={ "TheLatestOpportunities" } data={ opportunities }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/directories/opportunities" className={ ButtonStyles.callToAction }>{ translations["Découvrir toutes les opportunités"] }</Link>
						<Link href="/opportunities" className={ ButtonStyles.callToActionAlternative }>{ translations["Qu'est-ce qu'une opportunité"] + " ?" }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="startup">
				<h2>{ translations["Inscrire ma startup sur Forinov"] }</h2>
				<div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-chart-network"/>
						<div>
							<h4>{ translations["Complétez"] }</h4>
							<p>{ translations["Je renseigne les informations de ma startup et je crée mon profil de membre"] }</p>
						</div>
					</div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-badge-check"/>
						<div>
							<h4>{ translations["Validez"] }</h4>
							<p>{ translations["Ton profil sera vérifié et validé par nos équipes dans les plus bref délais"] }</p>
						</div>
					</div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-gauge-high"/>
						<div>
							<h4>{ translations["Profitez"] }</h4>
							<p>{ translations["J'accède GRATUITEMENT à toutes les opportunités ainsi qu'aux annuaires de Forinov"] }</p>
						</div>
					</div>
					<div className="separator"></div>
				</div>
			</div>
			<div className={ HomeStyles.companies }>
				<div>
					<h2>{ translations["Ces entreprises et partenaires utilisent Forinov pour leurs relations startups"] }</h2>
					<Carousel { ...parentProps } component={ "CompaniesLogos" } data={ logos }/>
					<h2>{ translations["Créer mon compte startup gratuitement"] }</h2>
					<h3>{ translations["Et rejoindre une communauté grandissante rassemblant tous les acteurs de l'innovation"].toLowerCase() }</h3>
					<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Rejoindre la communauté"] }</Link>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="startup">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...parentProps } component={ "AnswersToYourQuestions" } data={ Object.values(config.accordions.landings.startup) }/>
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
    const formattedLogosResponse = Object.values(logosResponse[0].LOGOS);
	return {
		props: {
			locale, locales, defaultLocale,
			opportunities: formattedLandingOpportunitiesResponse,
			logos: formattedLogosResponse,
		},
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupsHome;
export { getServerSideProps };