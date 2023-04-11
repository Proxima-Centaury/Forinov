/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { HomeInterface } from "../typescript/interfaces";
import api from "../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Carousel from "../components/carousels/carousel";
import Button from "../components/buttons/button";
import Separator from "../components/separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partners Home */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnersHome = (pageProps: HomeInterface) => {
	const { startups, logos, states, accordionsConfigurations, router } = pageProps;
	const { metadatas, translations } = states;
	const { landings } = accordionsConfigurations;
	return <Fragment>
		<Head>
			<title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="partner">
				<div className="container">
					<div className={ HomeStyles.presentationContent }>
						<h1>{ translations["Développez votre réseau"] }</h1>
						<p className={ HomeStyles.paragraph }>{ translations["Partagez vos appels à candidatures, contactez les meilleures startups et partenaires ! Faites vous connaitre au sein de l'écosystème. Forinov est la solution qui fait grandir votre réseau"] + " !" }</p>
						<div className={ HomeStyles.presentationLinks }>
							<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Rejoindre la communauté"] }/>
						</div>
					</div>
					<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="" width="3840" height="2160" priority/>
				</div>
			</div>
			<div className={ HomeStyles.register } data-type="partner">
				<div className="container">
					<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
					<Carousel { ...pageProps } component="PartnerHowTo"/>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="partner">
				<div className="container">
					<h3>{ translations["Ils nous font confiance"] + " :" }</h3>
					<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
					<h3>{ translations["Rejoignez l'écosystème Forinov plus de 1200 startups vous attendent"] + " !" }</h3>
					<p>{ translations["Adaptez votre forfait à vos besoins"] + " !" }</p>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Rejoindre l'écosystème Forinov"] }/>
						<Button button={ ButtonStyles.callToActionAlternative } href="/onboarding" text={ translations["Découvrir les offres"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="partner">
				<div className="container">
					<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
					<div className={ HomeStyles.badgesList }>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Publication"] }</h6>
								<p>{ translations["Je créé mon opportunité (critères d'éligibilité, solutions recherchées, etc.) et le formulaire de candidature pour les startups"] + "." }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Évaluation"] }</h6>
								<p>{ translations["Je reçois et évalue des candidatures de startups (notations, commentaires, etc.) et partage avec mes collaborateurs"] + "." }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Prise de contacts"] }</h6>
								<p>{ translations["Je contacte les startups retenues via messagerie sécurisée. Je simplifie le suivi de mes projets en interne et avec mes partenaires externes"] + "." }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
					</div>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Je lance mon opportunité"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.startups } data-type="partner">
				<div className="container">
					<h3>{ translations["Nos startups à la une"] + " :" }</h3>
					<Carousel { ...pageProps } component="LatestStartups" data={ startups }/>
					<div className={ HomeStyles.actions } data-justify="left">
						<Button button={ ButtonStyles.callToAction } href="/directories/startups/categories" text={ translations["Accéder à l'annuaire des startups"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="partner">
				<div className="container">
					<h3>{ translations["Les réponses à vos questions"] }</h3>
					<Carousel { ...pageProps } component="PartnerAccordions" data={ Object.values(landings.partner) }/>
					<div className={ HomeStyles.actions } data-justify="center">
						<p>{ translations["Vous avez des questions"] + " ? " }<Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["N'hésitez pas à nous contacter"] }/>.</p>
					</div>
				</div>
			</div>
		</div>
	</Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const language = locale?.substring(0, 2);
	return {
		props: {
			locale, locales, defaultLocale,
			startups: await api.getLandingStartups("next", "Landing", language),
			logos: await api.getLandingLogos("next", "Landing", language)
		}
	};
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default PartnersHome;
export { getServerSideProps };