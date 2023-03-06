/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface, ButtonInterface } from "../typescript/interfaces";
import { buildButtonProps } from "../scripts/utilities";
import api from "../scripts/api";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Button from "../components/buttons/button";
import Carousel from "../components/carousels/carousel";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startups Home */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupsHome = (pageProps: HomeInterface) => {
	const { opportunities, logos, states, accordionsConfigurations, router }: any = pageProps;
	const { metadatas, translations }: any = states;
	const { landings }: any = accordionsConfigurations;
	return <>
		<Head>
			<title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="startup">
				<div className={ HomeStyles.presentationContent }>
					<h1>{ translations["Développe ton business"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Il n'a jamais été aussi simple pour les startups de trouver des clients, des opportunités (appels à projets, appels à candidatures, etc.) et de développer leurs réseaux"] + " !" }</p>
					<div className={ HomeStyles.presentationLinks }>
						<Button { ...buildButtonProps(translations, "homeSignup") as ButtonInterface } text={ translations["Créer mon profil gratuitement"] }/>
					</div>
				</div>
				<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.sourcing } data-type="startup">
				<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
				<p>{ translations["S'inscrire sur Forinov c'est simple et rapide"] }</p>
				<Carousel { ...pageProps } component="HowToGetStarted"/>
			</div>
			{ (opportunities.length > 0) ? <div className={ HomeStyles.opportunity } data-type="startup">
				<h4>{ translations["Les dernières opportunités"] + " :" }</h4>
				<Carousel { ...pageProps } component="LatestOpportunities" data={ opportunities }/>
				<div className={ HomeStyles.actions } data-justify="left">
					<Button { ...buildButtonProps(translations, "homeFindOpportunities") as ButtonInterface } text={ translations["Découvrir toutes les opportunités"] }/>
					<Button { ...buildButtonProps(translations, "homeOppportunities") as ButtonInterface } text={ translations["Qu'est-ce qu'une opportunité"] + " ?" }/>
				</div>
			</div> : null }
			<div className={ HomeStyles.badges } data-type="startup">
				<h3>{ translations["Inscrire ma startup sur Forinov"] }</h3>
				<div className={ HomeStyles.badgesList }>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-chart-network"/>
						<div className={ HomeStyles.content }>
							<h6>{ translations["Découvre"] }</h6>
							<p>{ translations["Les appels à candidatures, programmes d'accompagnement, concours dans"] } <Button { ...buildButtonProps(translations, "homeOppportunitiesCategories") as ButtonInterface }/>.</p>
						</div>
					</div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-badge-check"/>
						<div className={ HomeStyles.content }>
							<h6>{ translations["Candidate"] }</h6>
							<p>{ translations["Aux opportunités qui te correspondent, les entreprises concernées te répondront directement"] + " !" }</p>
						</div>
					</div>
					<div className="separator"></div>
					<div className={ HomeStyles.badge }>
						<i className="fa-light fa-gauge-high"/>
						<div className={ HomeStyles.content }>
							<h6>{ translations["Concrétise"] }</h6>
							<p>{ translations["Ces opportunités en contrats grâce à un suivi simplifié et centralisé de tes échanges et de toutes tes candidatures"] + "." }</p>
						</div>
					</div>
					<div className="separator"></div>
				</div>
			</div>
			{ (logos.length > 0) ? <div className={ HomeStyles.companies } data-type="startup">
				<h4>{ translations["Ils nous font confiance pour vous trouver"] + " !" }</h4>
				<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
				<h4>{ translations["Et oui, Forinov c'est gratuit pour les startups"] }</h4>
				<p>{ translations["De l'inscription à la concrétisation, en passant par la prise de contact"] }</p>
				<div className={ HomeStyles.actions } data-justify="center">
					<Button { ...buildButtonProps(translations, "homeSignup") as ButtonInterface } text={ translations["J'en profite dès maintenant"] }/>
				</div>
			</div> :  null }
			<div className={ HomeStyles.questions } data-type="startup">
				<h5>{ translations["Les réponses à vos questions"] }</h5>
				<Carousel { ...pageProps } component="StartupAccordions" data={ Object.values(landings.startup) }/>
				<div className={ HomeStyles.actions } data-justify="center">
					<p>{ translations["Vous avez des questions"] + " ? " }<Button { ...buildButtonProps(translations, "homeContact") as ButtonInterface }/>.</p>
				</div>
			</div>
		</div>
	</>;
};
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);
	return {
		props: {
			locale, locales, defaultLocale,
			opportunities: await api.getLandingOpportunities("next", "Landing", language),
			logos: await api.getLandingLogos("next", "Landing", language)
		}
	};
};
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupsHome;
export { getServerSideProps };