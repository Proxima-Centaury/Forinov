/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
/* Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Home = (pageProps: HomeInterface) => {
	const { logos, states, config }: any = pageProps;
	const { translations }: any = states;
    const title = "Forinov " + translations["Opportunités"] + " - " + translations["Comment ça marche"] + " ?" as String;
	return <>
		<Head>
			<title>{ title }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="opportunity">
				<div>
					<h1>{ translations["Trouver la startup qu'il vous faut"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Postule à des opportunités uniques, rentre en contact avec des entreprises et des partenaires d'innovation, à chaque startup son Forinov"] + " !" }</p>
					<Link href="/">{ translations["Voir la vidéo de présentation"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
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
				<Carousel { ...pageProps } component={ "OpportunityAccordions" } data={ Object.values(config.accordions.landings.opportunity) }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
			</div>
		</div>
	</>
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res, locale, locales, defaultLocale } = context;
	const { endpoint, queries } = config.api;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const logosPromise = await fetch(endpoint + "?q=" + queries.getLandingLogos + "&type=opportunité&authkey=Landing");
    const logosResponse = await logosPromise.json();
    const formattedLogosResponse = Object.values(logosResponse[0].LOGOS);
	return {
		props: {
			locale, locales, defaultLocale,
			production: (req.headers.host?.match("interface.forinov")) ? true : false,
			logos: formattedLogosResponse
		}
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getServerSideProps };