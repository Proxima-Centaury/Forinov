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
/* Startups Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
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
				<div>
					<h1>{ translations["Développe ton business"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Il n'a jamais été aussi simple pour les startups de trouver des clients, des opportunités (appels à projets, appels à candidatures, etc.) et de développer leurs réseaux"] + " !" }</p>
					<Link href="/onboarding">{ translations["Créer mon profil gratuitement"] }</Link>
				</div>
				<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.opportunity } data-type="startup">
				<div>
					<h3>{ translations["Et comment ça marche"] + "?" }</h3>
					<p>{ translations["S'inscrire sur Forinov c'est simple et rapide"] }</p>
					<div data-carousel="startup">
						<Carousel { ...pageProps } component="HowToGetStarted"/>
					</div>
					<h4>{ translations["Les dernières opportunités"] + " :" }</h4>
					<Carousel { ...pageProps } component="LatestOpportunities" data={ opportunities }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/directories/opportunities" className={ ButtonStyles.callToAction }>{ translations["Découvrir toutes les opportunités"] }</Link>
						<Link href="/opportunities" className={ ButtonStyles.callToActionAlternative }>{ translations["Qu'est-ce qu'une opportunité"] + " ?" }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="startup">
				<div>
					<h2>{ translations["Inscrire ma startup sur Forinov"] }</h2>
					<div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<div>
								<h4>{ translations["Découvre"] }</h4>
								<p>{ translations["Les appels à candidatures, programmes d'accompagnement, concours dans"] } <Link href="/directories/opportunities/categories" className={ ButtonStyles.pureLink }>{ translations["L'annuaire d'opportunités"].toLowerCase() }</Link>.</p>
							</div>
						</div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<div>
								<h4>{ translations["Candidate"] }</h4>
								<p>{ translations["Aux opportunités qui te correspondent, les entreprises concernées te répondront directement"] + " !" }</p>
							</div>
						</div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<div>
								<h4>{ translations["Concrétise"] }</h4>
								<p>{ translations["Ces opportunités en contrats grâce à un suivi simplifié et centralisé de tes échanges et de toutes tes candidatures"] + "." }</p>
							</div>
						</div>
						<div className="separator"></div>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.companies }>
				<div>
					<h2>{ translations["Ils nous font confiance pour vous trouver"] + " !" }</h2>
					<Carousel { ...pageProps } component="CompaniesLogos" data={ logos }/>
					<h2>{ translations["Et oui, Forinov c'est gratuit pour les startups"] }</h2>
					<h3>{ translations["De l'inscription à la concrétisation, en passant par la prise de contact"] }</h3>
					<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["J'en profite dès maintenant"] }</Link>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="startup">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...pageProps } component="StartupAccordions" data={ Object.values(landings.startup) }/>
				<p>{ translations["Vous avez des questions"] + " ? " }<Link href="/contact">{ translations["N'hésitez pas à nous contacter"] }</Link>.</p>
			</div>
		</div>
	</>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupsHome;
export { getServerSideProps };