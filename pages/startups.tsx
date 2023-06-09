/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { HomeInterface } from "../typescript/interfaces";
import apiInstance from "../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import MetaDatas from "../components/seo/metadatas/metadatas";
import Carousel from "../components/carousels/carousel";
import Button from "../components/buttons/button";
import Separator from "../components/separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startups Home */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupsHome = (pageProps: HomeInterface) => {
	const { opportunities, logos, states, accordionsConfigurations, router } = pageProps;
	const { translations } = states;
	const { landings } = accordionsConfigurations;
	return <Fragment>
        <MetaDatas { ...pageProps }/>
		<div id="startups" className="containerFull">
			<div className={ HomeStyles.presentation } data-type="startup">
				<div className="container">
					<div className={ HomeStyles.presentationContent }>
						<h1>{ translations["Développe ton business"] }</h1>
						<p className={ HomeStyles.paragraph }>{ translations["Il n'a jamais été aussi simple pour les startups de trouver des clients, des opportunités (appels à candidatures, etc.) et de développer leurs réseaux"] + " !" }</p>
						<div className={ HomeStyles.presentationLinks }>
							<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Créer mon profil gratuitement"] }/>
						</div>
					</div>
					<Image src={ router.basePath + "/assets/landings/presentation.png" } alt={translations["Illustration de page d'accueil Forinov"]} width="3840" height="2160" priority/>
				</div>
			</div>
			<div className={ HomeStyles.sourcing } data-type="startup">
				<div className="container">
					<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
					<p>{ translations["S'inscrire sur Forinov c'est simple et rapide"] + " !" }</p>
					<Carousel { ...pageProps } component="HowToGetStarted"/>
				</div>
			</div>
			<div className={ HomeStyles.opportunity } data-type="startup">
				<div className="container">
					<h3>{ translations["Les dernières opportunités"] + " :" }</h3>
					<Carousel { ...pageProps } component="LatestOpportunities" data={ opportunities }/>
					<div className={ HomeStyles.actions } data-justify="left">
						<Button button={ ButtonStyles.callToAction } href="/directories/opportunities/categories" text={ translations["Découvrir toutes les opportunités"] }/>
						<Button button={ ButtonStyles.callToActionAlternative } href="/opportunities" text={ translations["Qu'est-ce qu'une opportunité"] + " ?" }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="startup">
				<div className="container">
					<h3>{ translations["Inscrire ma startup sur Forinov"] }</h3>
					<div className={ HomeStyles.badgesList }>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Découvre"] }</h6>
								<p>{ translations["Les appels à candidatures, programmes d'accompagnement, challenges et concours dans"] } <Button button={ ButtonStyles.classicLink } href="/directories/opportunities/categories" text={ translations["L'annuaire d'opportunités"].toLowerCase() }/>.</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Candidate"] }</h6>
								<p>{ translations["Aux opportunités qui te correspondent, les entreprises concernées te répondront directement"] + " !" }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Concrétise"] }</h6>
								<p>{ translations["Ces opportunités en contrats grâce à un suivi simplifié et centralisé de tes échanges et de toutes tes candidatures"] + "." }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="startup">
				<div className="container">
					<h3>{ translations["Ils nous font confiance pour vous trouver"] + " !" }</h3>
					<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
					<h3>{ translations["Et oui, Forinov c'est gratuit pour les startups"] + " !" }</h3>
					<p>{ translations["De l'inscription à la concrétisation, en passant par la prise de contact"] + "." }</p>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["J'en profite dès maintenant"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="startup">
				<div className="container">
					<h3>{ translations["Les réponses à vos questions"] + " :" }</h3>
					<Carousel { ...pageProps } component="StartupAccordions" data={ Object.values(landings.startup) }/>
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
			opportunities: await apiInstance.getLandingOpportunities("next", "Landing", language),
			logos: await apiInstance.getLandingLogos("next", "Landing", language)
		}
	};
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupsHome;
export { getServerSideProps };