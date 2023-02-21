/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
import api from "../scripts/api";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../components/carousels/carousel";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Home = (pageProps: HomeInterface) => {
	const { logos, states, accordionsConfigurations, router }: any = pageProps;
	const { metadatas, translations }: any = states;
	const { landings }: any = accordionsConfigurations;
	return <>
		<Head>
			<title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="opportunity">
				<div className={ HomeStyles.presentationContent }>
					<h1>{ translations["Trouver la startup qu'il vous faut"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d'innovation, à chaque startup son Forinov"] + " !" }</p>
					<div className={ HomeStyles.presentationLinks }>
						<Link className={ ButtonStyles.callToAction } href="/">{ translations["Voir la vidéo de présentation"] }</Link>
					</div>
				</div>
				<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.sourcing } data-type="opportunity">
				<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
				<p>{ translations["Publiez appels à projets, appels à candidatures et challenges en quelques clics"] }</p>
				<Carousel { ...pageProps } component="HowToCreateOpportunity"/>
				<div className={ HomeStyles.actions } data-justify="center">
					<Link className={ ButtonStyles.callToAction } href="/onboarding">{ translations["Rejoindre l'écosystème Forinov"] }</Link>
					<Link className={ ButtonStyles.callToAction } href="/opportunities">{ translations["Découvrir les offres"] }</Link>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="opportunity">
				<h4>{ translations["Ils ont utilisé Forinov pour leurs opportunités"] }</h4>
				<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
			</div>
			<div className={ HomeStyles.questions } data-type="opportunity">
				<h5>{ translations["Les réponses à vos questions"] }</h5>
				<Carousel { ...pageProps } component="OpportunityAccordions" data={ Object.values(landings.opportunity) }/>
				<div className={ HomeStyles.actions } data-justify="center">
					<p>{ translations["Vous avez des questions"] + " ? " }<Link className={ ButtonStyles.pureLink } href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
				</div>
			</div>
		</div>
	</>
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
	const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	return {
		props: {
			locale, locales, defaultLocale,
			logos: await api.getLandingLogos("next", "Landing", language)
		}
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getServerSideProps };