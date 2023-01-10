/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
const Home = ({ logos, startups, locales, states, stateSetters, config }: HomeInterface) => {
	const { translations }: any = states;
	const parentProps = { locales, states, stateSetters, config };
	return <>
		<Head>
            <meta name="description" content={ translations["Forinov est le réseau social de l'Open innovation qui connecte startups, entreprises et partenaires pour faciliter leur collaboration. Forinov optimise veille, sourcing, gestion du portefeuille de start ups et de partenaires. (accélérateurs, incubateurs, …)"] + "." }/>
			<title>{ translations["Forinov, le réseau social de l'Open Innovation"] }</title>
		</Head>
		<div className="containerFull">
			<div className={ HomeStyles.presentation }>
				<div>
					<h1>{ translations["Rejoignez le plus grand réseau social des acteurs de l'innovation"] }</h1>
					<p className={ HomeStyles.paragraph }>{ translations["Forinov est la plateforme qui connecte startups, entreprises et partenaires pour matcher le besoin avec l'offre d'innovation"] + "." }</p>
					<p className={ HomeStyles.paragraph }>{ translations["Découvrez et contactez les meilleures startups sur Forinov pour transformer vos bonnes idées en projets concrets"] + " !" }</p>
					<Link href="/directories/startups">{ translations["Trouvez des startups"] }</Link>
					<Link href="/directories/corporations">{ translations["Découvrez les entreprises membres"] }</Link>
					<Link href="/directories/partners">{ translations["Découvrez les partenaires"] }</Link>
					<Link href="/directories/opportunities">{ translations["Postulez aux opportunités en cours"] }</Link>
				</div>
				<Image src="/assets/landings/presentation.png" alt="Illustration" width="3840" height="2160" priority/>
			</div>
            <div className={ HomeStyles.onboarding }>
                <div>
                    <h3>{ translations["Pourquoi rejoindre Forinov"] + " ?" }</h3>
                    <p>{ translations["Des profils adaptés à vos besoins"] }</p>
                </div>
            </div>
        </div>
	</>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Properties */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { locale, locales, defaultLocale } = context;
	const { endpoint, queries } = config.api;
	const logosPromise = await fetch(endpoint + "?q=" + queries.getLandingLogos + "&type=startup&authkey=Landing");
    const logosResponse = await logosPromise.json();
    const formattedLogosResponse = Object.values(logosResponse[0].LOGOS);
	const startupsPromise = await fetch(endpoint + "?q=" + queries.getLandingStartups + "&app=next&authkey=Landing");
    const startupsResponse = await startupsPromise.json();
    const formattedStartupsResponse = startupsResponse;
	return {
		props: {
			locale, locales, defaultLocale,
			logos: formattedLogosResponse,
			startups: formattedStartupsResponse,
		},
	};
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Home;
export { getServerSideProps };