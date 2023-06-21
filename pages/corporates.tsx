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
/* Corporates Home */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const CorporatesHome = (pageProps: HomeInterface) => {
	const { opportunities, logos, states, accordionsConfigurations, router } = pageProps;
	const { translations } = states;
	const { landings } = accordionsConfigurations;
	return <Fragment>
        <MetaDatas { ...pageProps }/>
		<div id="corporates" className="containerFull">
			<div className={ HomeStyles.presentation } data-type="corporate">
				<div className="container">
					<div className={ HomeStyles.presentationContent }>
						<h1>{ translations["Innover plus simplement"] }</h1>
						<p className={ HomeStyles.paragraph }>{ translations["Lancez vos appels à candidatures, trouvez les meilleures solutions, développez et gérez votre réseau de startups et de partenaires en quelques clics"] + "." }</p>
						<div className={ HomeStyles.presentationLinks }>
							<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Pré-inscription gratuite"] }/>
						</div>
					</div>
					<Image src={router.basePath + "/assets/landings/presentation.png"} alt={translations["Illustration de page d'accueil Forinov"]} width="3840" height="2160" priority/>
				</div>
			</div>
			<div className={ HomeStyles.register } data-type="corporate">
				<div className="container">
					<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
					<Carousel { ...pageProps } component="CorporateHowTo"/>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="corporate">
				<div className="container">
					<h3>{ translations["Ils nous font confiance"] + " :" }</h3>
					<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
					<h3>{ translations["Des milliers de startups, d'entreprises et de partenaires vous attendent sur Forinov"] + " !" }</h3>
					<p>{ translations["Adaptez votre forfait à vos besoins"] + " !" }</p>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Rejoindre la communauté"] }/>
						<Button button={ ButtonStyles.callToActionAlternative } href="/solutions/corporates#plans" text={ translations["Découvrir les offres"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.sourcing } data-type="corporate">
				<div className="container">
					<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
					<p>{ translations["Publiez appels à candidatures, appels à candidatures et challenges en quelques clics"] + " !" }</p>
					<Carousel { ...pageProps } component="HowToCreateOpportunity"/>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Je publie mon opportunité"] }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.opportunity } data-type="corporate">
				<div className="container">
					<h3>{ translations["Les dernières opportunités"] + " :" }</h3>
					<Carousel { ...pageProps } component="LatestOpportunities" data={ opportunities }/>
					<div className={ HomeStyles.actions } data-justify="left">
						<Button button={ ButtonStyles.callToAction } href="/directories/opportunities/categories" text={ translations["Découvrir toutes les opportunités"] }/>
						<Button button={ ButtonStyles.callToActionAlternative } href="/opportunities" text={ translations["Qu'est-ce qu'une opportunité"] + " ?" }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="corporate">
				<div className="container">
					<h3>{ translations["Les réponses à vos questions"] + " :" }</h3>
					<Carousel { ...pageProps } component="CorporateAccordions" data={ Object.values(landings.corporate) }/>
					<div className={ HomeStyles.actions } data-justify="center">
						<p>{ translations["Vous avez des questions"] + " ? " }<Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["N'hésitez pas à nous contacter"] }/>.</p>
					</div>
				</div>
			</div>
		</div>
	</Fragment>;
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
			opportunities: await apiInstance.getLandingOpportunities("next", "Landing", language),
			logos: await apiInstance.getLandingLogos("next", "Landing", language)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default CorporatesHome;
export { getServerSideProps };