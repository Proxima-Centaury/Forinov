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
				<div>
					<h1>{ translations["Trouver la startup qu'il vous faut"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d'innovation, à chaque startup son Forinov"] + " !" }</p>
					<Link href="/">{ translations["Voir la vidéo de présentation"] }</Link>
				</div>
				<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.sourcing } data-type="opportunity">
				<div>
					<h3>{ translations["Comment créer une opportunité"] + " ?" }</h3>
					<p>{ translations["Publiez appels à projets, appels à candidatures et challenges en quelques clics"] }</p>
					<div data-carousel="opportunity">
						<Carousel { ...pageProps } component={ "HowToCreateOpportunity" }/>
					</div>
					<div className={ HomeStyles.actions }>
						<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Rejoindre l'écosystème Forinov"] }</Link>
						<Link href="/opportunities" className={ ButtonStyles.callToAction }>{ translations["Découvrir les offres"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.companies }>
				<div>
					<h2>{ translations["Ils ont utilisé Forinov pour leurs opportunités"] }</h2>
					<Carousel { ...pageProps } component={ "CompaniesLogos" } data={ logos }/>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="opportunity">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...pageProps } component={ "OpportunityAccordions" } data={ Object.values(landings.opportunity) }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
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