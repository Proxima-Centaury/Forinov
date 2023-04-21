/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment, Key, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { HomeInterface } from "../typescript/interfaces";
import { formatNameForUrl } from "../scripts/utilities";
import apiInstance from "../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import MetaDatas from "../components/seo/metadatas/metadatas";
import Carousel from "../components/carousels/carousel";
import Format from "../components/texts/format";
import Button from "../components/buttons/button";
import Separator from "../components/separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Home */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Home = (pageProps: HomeInterface) => {
	const typedReference = useRef(null);
	const { landing, startups, opportunities, states, router } = pageProps;
	const { translations, RGB } = states;
	const [ lightingState, setLightingState ] = useState("disabled");
	const structures: Array<String> = [ "Startup", "Grand groupe", "ETI", "PME", "Incubateur", "Accélérateur", "Pépinière", "Fond d'investissement", "Business angel", "Structure d'investissement" ];
	useEffect(() => {
		const typed = new Typed(typedReference.current, {
			strings: [
				translations["Plus de 1500 startups innovantes à l'international"] + ".",
				translations["Des centaines d'entreprises à la recherche de solutions"] + ".",
				translations["Autant de partenaires au coeur du réseau des acteurs de l'innovation"] + "."
			],
			typeSpeed: 50,
			loop: true
		});
		return () => typed.destroy();
	});
	useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [ RGB ]);
	return <Fragment>
		<MetaDatas { ...pageProps }/>
		<div id="home" className="containerFull">
			<div className={ HomeStyles.presentation } data-type="home">
				<div className="container">
					<h1>{ translations["Rejoignez le plus grand réseau social des acteurs de l'innovation"] + " !" }</h1>
					<div className={ HomeStyles.jumbotron }>
						<div className={ HomeStyles.presentationContent }>
							<p className={ HomeStyles.paragraph }>{ translations["Forinov est la plateforme qui connecte startups, entreprises et partenaires pour matcher le besoin avec l'offre d'innovation"] + "." }</p>
							<p className={ HomeStyles.paragraph }>{ translations["Découvrez et contactez les meilleures startups sur Forinov pour transformer vos bonnes idées en projets concrets"] + " !" }</p>
							<div className={ HomeStyles.presentationLinks }>
								<Button button={ ButtonStyles.oldHome } href="/directories/startups/categories" icon="fa-light fa-arrow-right" text={ translations["Trouvez des startups"] }/>
								<Button button={ ButtonStyles.oldHome } href="/directories/corporates/categories" icon="fa-light fa-arrow-right" text={ translations["Découvrez les entreprises membres"] }/>
								<Button button={ ButtonStyles.oldHome } href="/directories/partners/categories" icon="fa-light fa-arrow-right" text={ translations["Découvrez les partenaires"] }/>
								<Button button={ ButtonStyles.oldHome } href="/directories/opportunities/categories" icon="fa-light fa-arrow-right" text={ translations["Postulez aux opportunités en cours"] }/>
							</div>
						</div>
						<Image src={ router.basePath + "/assets/landings/presentation.png" } alt="" width="3840" height="2160" priority/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.onboarding } data-type="home">
				<div className="container">
					<h3>{ translations["Pourquoi rejoindre Forinov"] + " ?" }</h3>
					<p>{ translations["Des profils adaptés à vos besoins"] + "." }</p>
					<div className={ HomeStyles.types }>
						<div className={ HomeStyles.type } data-type="startup" data-rgb={ lightingState }>
							<div className={ HomeStyles.head }>
								<i className="fa-light fa-rocket-launch"/>
								<div>
									<h5>{ translations["Startup"] }</h5>
									<p>{ translations["Entreprises innovantes, etc."] }</p>
								</div>
							</div>
							<div className={ HomeStyles.body }>
								<Format { ...pageProps } content={ translations["Accédez à plus <b>d'opportunités</b> (appels à candidatures, concours, etc.)"] + "." }/>
								<Format { ...pageProps } content={ translations["Gagnez en <b>visibilité</b> et faites <b>matcher</b> vos solutions avec le besoin des entreprises"] + "." }/>
								<Format { ...pageProps } content={ translations["Entrez en <b>contact direct</b> avec les décideurs et remportez des <b>contrats</b>"] + "." }/>
							</div>
							<div className={ HomeStyles.footer }>
								<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Créer mon compte"] }/>
								<Button button={ ButtonStyles.classicLink } href="/startups" text={ translations["En savoir plus"] }/>
							</div>
						</div>
						<div className={ HomeStyles.type } data-type="corporate" data-rgb={ lightingState }>
							<div className={ HomeStyles.head }>
								<i className="fa-light fa-buildings"/>
								<div>
									<h5>{ translations["Entreprise"] }</h5>
									<p>{ translations["PME, ETI, Grand Groupe, etc."] }</p>
								</div>
							</div>
							<div className={ HomeStyles.body }>
								<Format { ...pageProps } content={ translations["Optimisez votre <b>veille</b> et <bsourcing</b> de l'innovation (startups, incubateurs, etc.)"] + "." }/>
								<Format { ...pageProps } content={ translations["Trouvez des <b>solutions concrètes</b> en partageant vos <b>appels à candidatures</b> et vos besoins en terme d'innovation"] + "." }/>
								<Format { ...pageProps } content={ translations["Centralisez le suivi de vos <b>relations</b> entre <b>collaborateurs</b> et partagez-le avec <b>votre réseau</b> de startups et de partenaires"] + "." }/>
							</div>
							<div className={ HomeStyles.footer }>
								<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Créer mon compte"] }/>
								<Button button={ ButtonStyles.classicLink } href="/corporates" text={ translations["En savoir plus"] }/>
							</div>
						</div>
						<div className={ HomeStyles.type } data-type="partner" data-rgb={ lightingState }>
							<div className={ HomeStyles.head }>
								<i className="fa-light fa-handshake-simple"/>
								<div>
									<h5>{ translations["Partenaire"] }</h5>
									<p>{ translations["Incubateurs, Investisseurs, etc."] }</p>
								</div>
							</div>
							<div className={ HomeStyles.body }>
								<Format { ...pageProps } content={ translations["Apportez <b>visibilité</b> et <b>opportunités</b> à votre réseau de startups et d'entreprises"] + "." }/>
								<Format { ...pageProps } content={ translations["Gérez vos <b>appels à candidatures</b> et partagez vos <b>opportunités</b>"] + "." }/>
								<Format { ...pageProps } content={ translations["Simplifiez le <b>suivi de votre portefeuille</b> de startups (gestion du dealflow, suivi des mises en relation, etc.)"] + "." }/>
							</div>
							<div className={ HomeStyles.footer }>
								<Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Créer mon compte"] }/>
								<Button button={ ButtonStyles.classicLink } href="/partners" text={ translations["En savoir plus"] }/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.badges } data-type="home">
				<div className="container">
					<h3>{ translations["Plus qu'une communauté, la solution la plus complète pour faire décoller l'open innovation"] + "." }</h3>
					<div className={ HomeStyles.badgesList }>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Connecter les acteurs"] }</h6>
								<p>{ translations["Réunir les profils clés de l'open innovation dans un but : co-construire le monde de demain"] + " !" }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-star"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Créer des opportunités"] }</h6>
								<p>{ translations["Matcher en un clic le besoin des entreprises avec les solutions de startups et échanger directement avec les bons interlocuteurs"] + "." }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
						<div className={ HomeStyles.badge }>
							<i className="fa-light fa-hand-holding-seedling"/>
							<div className={ HomeStyles.content }>
								<h6>{ translations["Encourager l'innovation"] }</h6>
								<p>{ translations["Engager les collaborateurs et leur permettre de trouver des solutions concrètes à leurs besoins métiers"] + "." }</p>
							</div>
						</div>
						<Separator { ...pageProps }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.startups } data-type="home">
				<div className="container">
					<h3>{ translations["Nos dernières startups inscrites"] + " :" }</h3>
					<Carousel { ...pageProps } component="LatestStartups" data={ startups }/>
					<div className={ HomeStyles.actions } data-justify="left">
						<Button button={ ButtonStyles.callToAction } href="/directories/startups/categories" text={ translations["Accéder à l'annuaire des startups"] }/>
					</div>
				</div>
			</div>
			{ (landing.CATEGORIES.length > 0) ? <div className={ HomeStyles.startups } data-type="home">
				<div className="container">
					<h3>{ translations["Trouvez votre pépite parmi"] + " " + landing.COUNTERS.STARTUPS + " " + translations["Startups réparties en"].toLowerCase() + " " + landing.COUNTERS.STARTUPSCATEGORIES + " " + translations["Catégories"].toLowerCase() + " :" }</h3>
					<div className={ HomeStyles.startupsCategories }>
						{ landing.CATEGORIES.map((category: any, key: Key) => {
							const url = "/directories/startups/categories/" + formatNameForUrl(category.NAME) + "_"  + category.ID;
							return <Button key={ key } button={ ButtonStyles.callToActionOldGrey } href={ url } text={ category.NAME }/>;
						}) }
					</div>
					<div className={ HomeStyles.actions } data-justify="center">
						<Button button={ ButtonStyles.callToAction } href="/directories/startups/categories" text={ translations["Accéder à l'annuaire des startups"] }/>
					</div>
				</div>
			</div> : null }
			<div className={ HomeStyles.opportunity } data-type="home">
				<div className="container">
					<h3>{ translations["Les dernières opportunités"] + " :" }</h3>
					<Carousel { ...pageProps } component="LatestOpportunities" data={ opportunities }/>
					<div className={ HomeStyles.actions } data-justify="left">
						<Button button={ ButtonStyles.callToAction } href="/directories/opportunities/categories" text={ translations["Découvrir toutes les opportunités"] }/>
						<Button button={ ButtonStyles.callToActionAlternative } href="/opportunities" text={ translations["Qu'est-ce qu'une opportunité"] + " ?" }/>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.typing } data-type="home">
				<div className="container">
					<p>{ translations["Forinov aujourd'hui"] }</p>
					<div className={ HomeStyles.animation }>
						<h3 id="homeTyped" className={ HomeStyles.typed } ref={ typedReference }/>
					</div>
				</div>
			</div>
			{ (structures.length > 0) ? <div className={ HomeStyles.structures } data-type="home">
				<div className="container">
					<h3>{ translations["Tous les acteurs de l'innovation sont sur Forinov, qu'attendez-vous pour les rejoindre"] + " ?" }</h3>
					<p>{ translations["Je représente ou travail pour un/une"] + "..." }</p>
					<div className={ HomeStyles.structuresCategories }>
						{ structures.map((structure: any, key: Key) => {
							const url = "/onboarding";
							return <Button key={ key } button={ ButtonStyles.callToActionOldGrey } href={ url } text={ structure }/>;
						}) }
					</div>
				</div>
			</div> : null }
			<div className={ HomeStyles.testimonials } data-type="home">
				<div className="container">
					<h3>{ translations["Ils nous font confiance"] + " :" }</h3>
					<Carousel { ...pageProps } component="Testimonials"/>
				</div>
			</div>
			<div className={ HomeStyles.blog } data-type="home">
				<div className="container">
					<h3>{ translations["Le blog Forinov"] + " :" }</h3>
					<Carousel { ...pageProps } component="ForinovBlog" data={ landing.BLOG }/>
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
			landing: await apiInstance.getLanding("next", "Landing", language),
			opportunities: await apiInstance.getLandingOpportunities("next", "Landing", language),
			startups: await apiInstance.getLandingStartups("next", "Landing", language)
		}
	};
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getServerSideProps };