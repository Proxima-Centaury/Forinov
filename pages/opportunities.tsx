/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { HomeInterface } from "../typescript/interfaces";
import apiInstance from "../scripts/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import MetaDatas from "../components/seo/metadatas/metadatas";
import Carousel from "../components/carousels/carousel";
import Button from "../components/buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Home */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Home = (pageProps: HomeInterface) => {
	const { logos, states, accordionsConfigurations, router } = pageProps;
	const { translations } = states;
	const { landings } = accordionsConfigurations;
	return <Fragment>
		<MetaDatas { ...pageProps }/>
		<div id="opportunities" className="containerFull">
			<div className={ HomeStyles.presentation } data-type="opportunity">
				<div className="container">
					<div className={ HomeStyles.presentationContent }>
						<h1>{ translations["Trouver la startup qu'il vous faut"] }</h1>
						<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d'innovation, à chaque startup son Forinov"] + " !" }</p>
						<div className={ HomeStyles.presentationLinks }>
							<Button button={ ButtonStyles.callToAction } href="/" text={ translations["Voir la vidéo de présentation"] }/>
						</div>
					</div>
					<Image src={ router.basePath + "/assets/landings/presentation.png" } alt={ translations["Illustration de page d'accueil Forinov"] } width="3840" height="2160" priority/>
				</div>
			</div>
			<div className={ HomeStyles.sourcing } data-type="opportunity">
				<div className="container">
					<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
					<p>{ translations["Publiez appels à candidatures, appels à candidatures et challenges en quelques clics"] + " !" }</p>
					<Carousel { ...pageProps } component="HowToCreateOpportunity"/>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Rejoindre l'écosystème Forinov"] }/>
						<Button button={ ButtonStyles.callToAction } href="/solutions/corporates#plans" text={ translations["Découvrir les offres"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="opportunity">
				<div className="container">
					<h3>{ translations["Ils ont utilisé Forinov pour leurs opportunités"] + " :" }</h3>
					<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="opportunity">
				<div className="container">
					<h3>{ translations["Les réponses à vos questions"] + " :" }</h3>
					<Carousel { ...pageProps } component="OpportunityAccordions" data={ Object.values(landings.opportunity) }/>
					<div className={ HomeStyles.actions } data-justify="center">
						<p>{ translations["Vous avez des questions"] + " ? " }<Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["N'hésitez pas à nous contacter"] }/>.</p>
					</div>
				</div>
			</div>
		</div>
	</Fragment>
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const language = locale?.substring(0, 2);
	return {
		props: {
			locale, locales, defaultLocale,
			logos: await apiInstance.getLandingLogos("next", "Landing", language)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Home;
export { getServerSideProps };