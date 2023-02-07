/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
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
/* Partners Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnersHome = (pageProps: HomeInterface) => {
    const router = useRouter();
	const { startups, logos, states, config }: any = pageProps;
	const { metadatas, translations }: any = states;
	return <>
		<Head>
			<title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation } data-type="partner">
				<div>
					<h1>{ translations["Développez votre réseau"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Partagez vos appels à candidatures, contactez les meilleures startups et partenaires ! Faites vous connaitre au sein de l'écosystème. Forinov est la solution qui fait grandir votre réseau"] + " !" }</p>
					<Link href="/onboarding">{ translations["Rejoindre la communauté"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
			<div className={ HomeStyles.register } data-type="partner">
				<div>
					<h3>{ translations["Et comment ça marche"] + " ?" }</h3>
					<Carousel { ...pageProps } component={ "PartnerHowTo" }/>
				</div>
			</div>
			<div className={ HomeStyles.companies } data-type="partner">
				<div>
					<h2>{ translations["Ils nous font confiance"] }</h2>
					<Carousel { ...pageProps } component={ "CompaniesLogos" } data={ logos }/>
					<h2>{ translations["Rejoignez l'écosystème Forinov plus de 1200 startups vous attendent"] + " !" }</h2>
					<h3>{ translations["Adaptez votre forfait à vos besoins"] + " !" }</h3>
					<div className={ HomeStyles.actions }>
						<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Rejoindre l'écosystème Forinov"] }</Link>
						<Link href="/onboarding" className={ ButtonStyles.callToActionAlternative }>{ translations["Découvrir les offres"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="partner">
				<div>
					<h2>{ translations["Comment créer une opportunité"] + " ?" }</h2>
					<div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<div>
								<h4>{ translations["Publication"] }</h4>
								<p>{ translations["Je créé mon opportunité (critères d'éligibilité, solutions recherchées, etc.) et le formulaire de candidature pour les startups"] + "." }</p>
							</div>
						</div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<div>
								<h4>{ translations["Évaluation"] }</h4>
								<p>{ translations["Je reçois et évalue des candidatures de startups (notations, commentaires, etc.) et partage avec mes collaborateurs"] + "." }</p>
							</div>
						</div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<div>
								<h4>{ translations["Prise de contacts"] }</h4>
								<p>{ translations["Je contacte les startups retenues via messagerie sécurisée. Je simplifie le suivi de mes projets en interne et avec mes partenaires externes"] + "." }</p>
							</div>
						</div>
						<div className="separator"></div>
					</div>
					<Link href="/" className={ ButtonStyles.callToAction }>{ translations["Je lance mon opportunité"] }</Link>
				</div>
			</div>
			<div className={ HomeStyles.startups } data-type="partner">
				<div>
					<h4>{ translations["Nos startups à la une"] + " :" }</h4>
					<Carousel { ...pageProps } component={ "LatestStartups" } data={ startups }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/" className={ ButtonStyles.callToAction }>{ translations["Accéder à l'annuaire des startups"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.questions } data-type="partner">
				<h2>{ translations["Les réponses à vos questions"] }</h2>
				<Carousel { ...pageProps } component={ "PartnerAccordions" } data={ Object.values(config.accordions.landings.partner) }/>
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
	const language = locale?.substring(0, 2);
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	return {
		props: {
			locale, locales, defaultLocale,
			startups: await api.getLandingStartups("next", "Landing", language),
			logos: await api.getLandingLogos("next", "Landing", language)
		}
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default PartnersHome;
export { getServerSideProps };