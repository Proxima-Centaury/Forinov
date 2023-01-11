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
/* Partners Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnersHome = ({ logos, startups, locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;
	const parentProps = { locales, states, stateSetters, config };
	return <>
		<Head>
			<title>Forinov { translations["Partenaires"] } - { translations["Comment ça marche"] + " ?" }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="partner">
				<div>
					<h1>{ translations["Bienvenue sur Forinov"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Rejoignez le nouveau réseau social de l'Open Innovation pour trouver les startups phares de demain"] + "." }</p>
					<Link href="/onboarding">{ translations["Rejoindre la communauté"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.register } data-type="partner">
				<div>
					<h3>{ translations["Comment m'inscrire sur Forinov"] + " ?" }</h3>
					<Carousel { ...parentProps } component={ "HowToRegister" }/>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="partner">
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
			<div className={ HomeStyles.badges } data-type="partner">
				<h2>{ translations["Comment créer une opportunité"] + " ?" }</h2>
				<div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-chart-network"/>
						<div>
							<h4>{ translations["Complétez"] }</h4>
							<p>{ translations["Complétez les informations spécifiques de votre opportunité"] }</p>
						</div>
					</div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-badge-check"/>
						<div>
							<h4>{ translations["Sourcez"] }</h4>
							<p>{ translations["Recevez les candidatures des startups déjà inscrites ou sourcées par nos équipes"] }</p>
						</div>
					</div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-gauge-high"/>
						<div>
							<h4>{ translations["Évaluez"] }</h4>
							<p>{ translations["Trouvez la startup de l'innovation qui correspond à vos besoins"] }</p>
						</div>
					</div>
					<div className="separator"></div>
				</div>
				<Link href="/" className={ ButtonStyles.callToAction }>{ translations["Découvrir le fonctionnement complet"] }</Link>
			</div>
			<div className={ HomeStyles.startups } data-type="partner">
				<div>
					<h4>{ translations["Nos startups à la une"] + " :" }</h4>
					<Carousel { ...parentProps } component={ "PartnersStartups" } data={ startups }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/" className={ ButtonStyles.callToAction }>{ translations["Accéder à l'annuaire des startups"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="partner">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...parentProps } component={ "AnswersToYourQuestions" } data={ Object.values(config.accordions.landings.partner) }/>
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
	const logosPromise = await fetch(endpoint + "?q=" + queries.getLandingLogos + "&type=startup&authkey=Landing");
    const logosResponse = await logosPromise.json();
    const formattedLogosResponse = Object.values(logosResponse[0].LOGOS);
	const startupsPromise = await fetch(endpoint + "?q=" + queries.getLandingStartups + "&app=next&authkey=Landing");
    const startupsResponse = await startupsPromise.json();
    const formattedStartupsResponse = startupsResponse;
	return {
		props: {
			locale, locales, defaultLocale,
			logos: formattedLogosResponse,
			startups: formattedStartupsResponse,
		},
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default PartnersHome;
export { getServerSideProps };