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
import Format from "../components/texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Home = (pageProps: HomeInterface) => {
	const { startups, opportunities, states }: any = pageProps;
	const { translations }: any = states;
	const title = translations["Forinov, le réseau social de l'open innovation"] as String;

	console.log(locales)
	const meta = require("../public/static/meta/meta_" + states.locale.split("-")[0] + ".json");

	return <>
		<Head>
            <meta name="description" content={ translations["Forinov est le réseau social de l'open innovation qui connecte startups, entreprises et partenaires pour faciliter leur collaboration. Forinov optimise veille, sourcing, gestion du portefeuille de start ups et de partenaires. (accélérateurs, incubateurs, …)"] + "." }/>
			<title>{ title }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation }>
				<div>
					<h1>{ translations["Rejoignez le plus grand réseau social des acteurs de l'innovation"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Forinov est la plateforme qui connecte startups, entreprises et partenaires pour matcher le besoin avec l'offre d'innovation"] + "." }</p>
					<p className={ HomeStyles.paragraph }>{ translations["Découvrez et contactez les meilleures startups sur Forinov pour transformer vos bonnes idées en projets concrets"] + " !" }</p>
					<Link href="/directories/startups">{ translations["Trouvez des startups"] }<i className="fa-light fa-arrow-right"/></Link>
					<Link href="/directories/corporations">{ translations["Découvrez les entreprises membres"] }<i className="fa-light fa-arrow-right"/></Link>
					<Link href="/directories/partners">{ translations["Découvrez les partenaires"] }<i className="fa-light fa-arrow-right"/></Link>
					<Link href="/directories/opportunities">{ translations["Postulez aux opportunités en cours"] }<i className="fa-light fa-arrow-right"/></Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
            <div className={ HomeStyles.onboarding }>
                <div>
                    <h3>{ translations["Pourquoi rejoindre Forinov"] + " ?" }</h3>
                    <p>{ translations["Des profils adaptés à vos besoins"] }</p>
					<div className={ HomeStyles.types }>
						<div className={ HomeStyles.type } data-type="startup">
							<div className={ HomeStyles.head }>
								<i className="fa-light fa-rocket-launch"/>
								<div>
									<h5>{ translations["Startup"] }</h5>
									<p>{ translations["Entreprises innovantes, etc."] }</p>
								</div>
							</div>
							<div className={ HomeStyles.body }>
								<Format content={ translations["Accédez à plus <b>d'opportunités</b> (appels à projets, concours, etc.)"] }/>
								<Format content={ translations["Gagnez en <b>visibilité</b> et faites <b>matcher</b> vos solutions avec le besoin des entreprises"] }/>
								<Format content={ translations["Entrez en <b>contact direct</b> avec les décideurs et remportez des <b>contrats</b>"] }/>
							</div>
							<div className={ HomeStyles.footer }>
								<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Créer mon compte"] }</Link>
								<Link href="/startups">{ translations["En savoir plus"] }</Link>
							</div>
						</div>
						<div className={ HomeStyles.type } data-type="corporation">
							<div className={ HomeStyles.head }>
								<i className="fa-light fa-buildings"/>
								<div>
									<h5>{ translations["Entreprise"] }</h5>
									<p>{ translations["PME, ETI, Grand Groupe, etc."] }</p>
								</div>
							</div>
							<div className={ HomeStyles.body }>
								<Format content={ translations["Optimisez votre <b>veille</b> et <bsourcing</b> de l'innovation (startups, incubateurs, etc.)"] }/>
								<Format content={ translations["Trouvez des <b>solutions concrètes</b> en partageant vos <b>appels à projets</b> et vos besoins en terme d'innovation"] }/>
								<Format content={ translations["Centralisez le suivi de vos <b>relations</b> entre <b>collaborateurs</b> et partagez-le avec <b>votre réseau</b> de startups et de partenaires"] }/>
							</div>
							<div className={ HomeStyles.footer }>
								<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Créer mon compte"] }</Link>
								<Link href="/corporations">{ translations["En savoir plus"] }</Link>
							</div>
						</div>
						<div className={ HomeStyles.type } data-type="partner">
							<div className={ HomeStyles.head }>
								<i className="fa-light fa-handshake-simple"/>
								<div>
									<h5>{ translations["Partenaire"] }</h5>
									<p>{ translations["Incubateurs, Investisseurs, etc."] }</p>
								</div>
							</div>
							<div className={ HomeStyles.body }>
								<Format content={ translations["Apportez <b>visibilité</b> et <b>opportunités</b> à votre réseau de startups et d'entreprises"] }/>
								<Format content={ translations["Gérez vos <b>appels à candidatures</b> et partagez vos <b>opportunités</b>"] }/>
								<Format content={ translations["Simplifiez le <b>suivi de votre portefeuille</b> de startups (gestion du dealflow, suivi des mises en relation, etc.)"] }/>
							</div>
							<div className={ HomeStyles.footer }>
								<Link href="/onboarding" className={ ButtonStyles.callToAction }>{ translations["Créer mon compte"] }</Link>
								<Link href="/partners">{ translations["En savoir plus"] }</Link>
							</div>
						</div>
					</div>
                </div>
            </div>
			<div className={ HomeStyles.badges }>
				<div>
					<h2>{ translations["Plus qu'une communauté, la solution la plus complète pour faire décoller l'open innovation"] }</h2>
					<div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<div>
								<h4>{ translations["Connecter les acteurs"] }</h4>
								<p>{ translations["Réunir les profils clés de l'open innovation dans un but : co-construire le monde de demain"] + " !" }</p>
							</div>
						</div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-star"/>
							<div>
								<h4>{ translations["Créer des opportunités"] }</h4>
								<p>{ translations["Matcher en un clic le besoin des entreprises avec les solutions de startups et échanger directement avec les bons interlocuteurs"] + "." }</p>
							</div>
						</div>
						<div className="separator"></div>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-hand-holding-seedling"/>
							<div>
								<h4>{ translations["Encourager l'innovation"] }</h4>
								<p>{ translations["Engager les collaborateurs et leur permettre de trouver des solutions concrètes à leurs besoins métiers"] + "." }</p>
							</div>
						</div>
						<div className="separator"></div>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.startups }>
				<div>
					<h4>{ translations["Nos dernières startups inscrites"] + " :" }</h4>
					<Carousel { ...pageProps } component={ "LatestStartups" } data={ startups }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/directories/startups" className={ ButtonStyles.callToAction }>{ translations["Accéder à l'annuaire des startups"] }</Link>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.opportunity }>
				<div>
					<h4>{ translations["Les dernières oppotunités"] + " :" }</h4>
					<Carousel { ...pageProps } component={ "LatestOpportunities" } data={ opportunities }/>
					<div className={ HomeStyles.actions } data-align="left">
						<Link href="/directories/opportunities" className={ ButtonStyles.callToAction }>{ translations["Découvrir toutes les opportunités"] }</Link>
						<Link href="/opportunities" className={ ButtonStyles.callToActionAlternative }>{ translations["Qu'est-ce qu'une opportunité"] + " ?" }</Link>
					</div>
				</div>
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
			startups: await api.getLandingStartups("next", "Landing", language)
		}
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getServerSideProps };