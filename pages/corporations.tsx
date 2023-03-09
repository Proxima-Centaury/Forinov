/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
import api from "../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../components/carousels/carousel";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporations Home */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const CorporationsHome = (pageProps: HomeInterface) => {
	const { opportunities, logos, states, accordionsConfigurations, router }: any = pageProps;
	const { metadatas, translations }: any = states;
	const { landings }: any = accordionsConfigurations;
	return <>
		<Head>
			<title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="corporation">
				<div className={ HomeStyles.presentationContent }>
					<h1>{ translations["Innover plus simplement"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Lancez vos appels à candidatures, trouvez les meilleures solutions, développez et gérez votre réseau de startups et de partenaires en quelques clics"] + "." }</p>
					<div className={ HomeStyles.presentationLinks }>
						<Link className={ ButtonStyles.callToAction } href="/onboarding">{ translations["Pré-inscription gratuite"] }</Link>
					</div>
				</div>
				<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.register } data-type="corporation">
				<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
				<Carousel { ...pageProps } component="CorporationHowTo"/>
			</div>
			<div className={ HomeStyles.companies } data-type="corporation">
				<h4>{ translations["Ils nous font confiance"] }</h4>
				<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
				<h4>{ translations["Des milliers de startups, d'entreprises et de partenaires vous attendent sur Forinov"] + " !" }</h4>
				<p>{ translations["Adaptez votre forfait à vos besoins"] + " !" }</p>
				<div className={ HomeStyles.actions } data-justify="center">
					<Link className={ ButtonStyles.callToAction } href="/onboarding">{ translations["Rejoindre la communauté"] }</Link>
					<Link className={ ButtonStyles.callToActionAlternative } href="/onboarding">{ translations["Découvrir les offres"] }</Link>
				</div>
			</div>
			<div className={ HomeStyles.sourcing } data-type="corporation">
				<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
				<p>{ translations["Publiez appels à projets, appels à candidatures et challenges en quelques clics"] }</p>
				<Carousel { ...pageProps } component="HowToCreateOpportunity"/>
				<div className={ HomeStyles.actions } data-justify="center">
					<Link className={ ButtonStyles.callToAction } href="/onboarding">{ translations["Je publie mon opportunité"] }</Link>
				</div>
			</div>
			<div className={ HomeStyles.opportunity } data-type="corporation">
				<h4>{ translations["Les dernières opportunités"] + " :" }</h4>
				<Carousel { ...pageProps } component="LatestOpportunities" data={ opportunities }/>
				<div className={ HomeStyles.actions } data-justify="left">
					<Link className={ ButtonStyles.callToAction } href="/directories/opportunities">{ translations["Découvrir toutes les opportunités"] }</Link>
					<Link className={ ButtonStyles.callToActionAlternative } href="/opportunities">{ translations["Qu'est-ce qu'une opportunité"] + " ?" }</Link>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="corporation">
				<h5>{ translations["Les réponses à vos questions"] }</h5>
				<Carousel { ...pageProps } component="CorporationAccordions" data={ Object.values(landings.corporation) }/>
				<div className={ HomeStyles.actions } data-justify="center">
					<p>{ translations["Vous avez des questions"] + " ? " }<Link className={ ButtonStyles.pureLink } href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
				</div>
			</div>
		</div>
	</>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default CorporationsHome;
export { getServerSideProps };