/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment, useEffect, useRef } from "react";
import Typed from "typed.js";
import { HomeInterface } from "../../typescript/interfaces";
import api from "../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Button from "../../components/buttons/button";
import Carousel from "../../components/carousels/carousel";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import SolutionsStyles from "../../public/stylesheets/pages/Solutions.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Solutions */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupSolutions = (pageProps: HomeInterface) => {
	const typedReference = useRef(null);
    const { opportunities, states, accordionsConfigurations, router } = pageProps;
    const { metadatas, translations } = states;
	const { solutions } = accordionsConfigurations;
    useEffect(() => {
		const typed = new Typed(typedReference.current, {
			strings: [ "APPCRAFT EVENTS.", "CAMILEIA.", "LiberKeys." ],
			typeSpeed: 50,
			loop: true
		});
		return () => typed.destroy();
	  }, []);
    return <Fragment>
        <Head>
            <title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div id="startups" className="containerFull">
            <div className={ SolutionsStyles.presentation } data-type="startup">
                <div className="container">
                    <h1>{ translations["Les meilleures startups sont sur Forinov, inscrivez-vous gratuitement"] + "." }</h1>
                    <div className={ SolutionsStyles.jumbotron }>
                        <div className={ SolutionsStyles.presentationContent }>
                            <p>{ translations["Vous proposez une solution innovante ? Vous cherchez des clients B2B ? Rejoignez Forinov pour booster votre visibilité et entrer en relation simplement avec des entreprises qui ont besoin de vos solutions pour innover"] + " !" }</p>
                            <div className={ SolutionsStyles.presentationLinks }>
                                <Button button={ ButtonStyles.oldHome } href="/onboarding" icon="fa-solid fa-arrow-right" text={ translations["J'inscris ma startup"] }/>
                                <Button button={ ButtonStyles.oldHome } href="/directories/opportunities/categories" icon="fa-solid fa-arrow-right" text={ translations["Je découvre les opportunités"] }/>
                                <Button button={ ButtonStyles.oldHome } href="/directories/startups/categories" icon="fa-solid fa-arrow-right" text={ translations["J'accède à l'annuaire des membres"] }/>
                            </div>
                        </div>
                        <Image src={ router.basePath + "/assets/landings/solutions-su.png" } alt="" width="500" height="500"/>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.banner } data-type="startup">
                <div className="container">
                    <h3>{ translations["Pourquoi rejoindre Forinov"] + " ?" }</h3>
                    <div className="grid threeColumns">
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Gagner en visibilité"] }</h5>
                            <p>{ translations["Référencer et promouvoir mes solutions grâce à un profil clair et complet"] + "." }</p>
                            <p>{ translations["Être identifié et contacté par des entreprises à la recherche de startups innovantes"] + "." }</p>
                            <p>{ translations["Partager mon actualité auprès d'une communauté d'acteurs innovants"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Candidater à des opportunités concrètes"] }</h5>
                            <p>{ translations["Postuler aux appels à candidatures d'entreprises et partenaires et être alerté des nouvelles opportunités"] + "." }</p>
                            <p>{ translations["Découvrir directement les besoins des entreprises"] + "." }</p>
                            <p>{ translations["Centraliser et simplifier le suivi de mes candidatures"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Accéder aux bons contacts"] }</h5>
                            <p>{ translations["Identifier et contacter directement les collaborateurs clés des entreprises (directions innovations, responsables métiers, etc.)"] + "." }</p>
                            <p>{ translations["Simplifier mes échanges grâce à une plateforme collaborative"] + "." }</p>
                            <p>{ translations["Centraliser le suivi de mes relations"] + "." }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.howTo } data-type="startup">
                <div className="container">
                    <h3>{ translations["Comment faire décoller mon business"] + " ?" }</h3>
                    <div className="grid threeColumns">
                        <div className={ SolutionsStyles.step }>
                            <h5>1</h5>
                            <p>{ translations["Je crée mon profil \"startup\" gratuitement et en quelques clics"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.step }>
                            <h5>2</h5>
                            <p>{ translations["J'accède à la communauté et aux annuaires d'opportunités, d'entreprises et de partenaires"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.step }>
                            <h5>3</h5>
                            <p>{ translations["Je mets en avant mes solutions et partage mon actualité pour améliorer mon référencement"] + "." }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.typing } data-type="startup">
                <div className="container">
                    <p>{ translations["Découvrez notre communauté de startups"] + " !" }</p>
                    <div className={ SolutionsStyles.animation }>
                        <h3>{ translations["L'innovation a déjà un nom"] + " : " }<span className={ HomeStyles.typed } ref={ typedReference }/></h3>
                    </div>
                </div>
            </div>
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
            {/* <div className={SolutionsStyles.banner3}>
                <div className="container">
                    <h1 className={SolutionsStyles.bannerTitle}>{translations["Les réponses à vos questions"]}</h1>
                    <div className={SolutionsStyles.bannerBlockWrapper}>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Forinov, est-ce vraiment gratuit pour les startups ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Oui ! Car nous cherchons à créer la première communauté des acteurs de l'innovation. Impossible sans les startups : inscris donc les différents membres de ton équipe pour ne rater aucune opportunité ! Prochainement, des options premium seront disponibles pour encore plus de mise en visibilité auprès des entreprises et de nouvelles fonctionnalités exclusives !"]}</p>
                        </div>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Quel est l'intérêt de passer par Forinov plutôt qu'un autre canal ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Forinov, est-ce vraiment gratuit pour les startups ?"]}</p>
                        </div>
                    </div>
                    <div className={SolutionsStyles.bannerBlockWrapper}>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Comment me faire repérer par les entreprises ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Pour mettre en avant ton profil, mets le à jour régulièrement, publie des nouvelles, ajoute tes entreprises cibles à ta wishlist et suis leurs profils… elles en seront informées ! Pense aussi à préciser tes différents produits et services : ton profil sera plus attractif et notre algorithme de matching fera le reste !"]}</p>
                        </div>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Comment puis-je postuler à un appel à candidatures ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Retrouve toutes les opportunités en cours dans l'onglet <b>Opportunités</b>. Avec ton profil Forinov, tu seras informé.e directement des appels à candidatures qui matchent avec ton profil. Pour postuler réponds au questionnaire associé à l'appel, et gagne un temps fou grâce aux nombreuses informations pré-remplies à partir de ton profil"]}</p>
                        </div>
                    </div>
                    <div className={SolutionsStyles.bannerBlockWrapper}>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Qui sont les personnes que je peux contacter sur Forinov ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Sur Forinov, tu peux retrouver des collaborateurs de grands groupes, de PME mais aussi des contacts clés d'incubateurs, accélérateurs ou structures d'investissement. Du côté des entreprises, il n'y a pas que les responsables innovation inscrits mais aussi les responsables métiers (RH, finance, digital, achat…) : tes clients potentiels sont donc nombreux !"]}</p>
                        </div>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Mon profil est-il celui d'une startup ou d'une entreprise ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Sur Forinov, nous connectons des startups, des entreprises et des partenaires type incubateurs, accélérateurs. Nous entendons le mot « startups » au sens large du terme ! Toute jeune entreprise porteuse d'une solution innovante est la bienvenue pour répondre aux besoins des grands groupes et PME à la recherche de solutions comme les vôtres !"]}</p>
                        </div>
                    </div>
                    <h1 className={SolutionsStyles.banner3Redirect}>{translations["Vous avez des questions ? "]}<Link
                        href="/contact"
                    >
                        {translations["N'hésitez pas à nous contacter"]}
                    </Link></h1>
                </div>
            </div> */}
            <div className={ HomeStyles.questions } data-type="startup">
                <div className="container">
                    <h3>{ translations["Les réponses à vos questions"] + " :" }</h3>
					<Carousel { ...pageProps } component="CorporateAccordions" data={ Object.values(solutions.startup) }/>
                    <div className={ HomeStyles.actions } data-justify="center">
						<p>{ translations["Vous avez des questions"] + " ? " }<Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["N'hésitez pas à nous contacter"] }/>.</p>
					</div>
                </div>
            </div>
        </div>
    </Fragment>
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
            opportunities: await api.getLandingOpportunities("next", "Landing", language)
        },
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupSolutions;
export { getServerSideProps };