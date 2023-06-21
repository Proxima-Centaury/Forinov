/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { GetServerSideProps } from "next";
import { Fragment, useEffect, useRef } from "react";
import Typed from "typed.js";
import { HomeInterface } from "../../typescript/interfaces";
import apiInstance from "../../scripts/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import MetaDatas from "../../components/seo/metadatas/metadatas";
import Button from "../../components/buttons/button";
import Carousel from "../../components/carousels/carousel";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import SolutionsStyles from "../../public/stylesheets/pages/Solutions.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Partner Solutions */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const PartnerSolutions = (pageProps: HomeInterface) => {
	const typedReference = useRef(null);
    const { startups, states, accordionsConfigurations, router } = pageProps;
    const { translations } = states;
	const { solutions } = accordionsConfigurations;
    useEffect(() => {
		const typed = new Typed(typedReference.current, {
			strings: [ "Les Premières.", "Créative Valley.", "MAKE SENSE." ],
			typeSpeed: 50,
			loop: true
		});
		return () => typed.destroy();
	  }, []);
    return <Fragment>
        <MetaDatas { ...pageProps }/>
        <div id="partners" className="containerFull">
            <div className={ SolutionsStyles.presentation } data-type="partner">
                <div className="container">
                    <h1>{ translations["Rejoignez la plus grande communauté d'acteurs innovants et décuplez la force de votre réseau"] + "." }</h1>
                    <div className={ SolutionsStyles.jumbotron }>
                        <div className={ SolutionsStyles.presentationContent }>
                            <p>{ translations["Incubateurs, accélérateurs, Business Angels… Cette communauté est faite pour vous ! À la clé : visibilité de vos offres et de vos startups, gestion de vos appels à candidatures, suivi de votre portefeuille et de votre réseau"] + " !" }</p>
                            <div className={ SolutionsStyles.presentationLinks }>
                                <Button button={ ButtonStyles.oldHome } href="/onboarding" icon="fa-solid fa-arrow-right" text={ translations["M'inscrire sur Forinov"] }/>
                                <Button button={ ButtonStyles.oldHome } href="/contact" icon="fa-solid fa-arrow-right" text={ translations["Demander une démonstration gratuite"] }/>
                                <Button button={ ButtonStyles.oldHome } href="/directories/partners/categories" icon="fa-solid fa-arrow-right" text={ translations["J'accède à l'annuaire des membres"] }/>
                            </div>
                        </div>
                        <Image src={ router.basePath + "/assets/landings/solutions-partners.png" } alt={ translations["Première illustration de la page solutions partenaires"] + "." } width="500" height="500"/>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.banner } data-type="partner">
                <div className="container">
                    <h3>{ translations["De nombreux partenaires ont déjà rejoint la communauté pour apporter plus de valeur à leurs startups et réseau. Pourquoi pas vous"] + " ?" }</h3>
                    <div className="grid threeColumns">
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Faites vivre votre réseau en quelques clics"] }</h5>
                            <p>{ translations["Promouvoir, suivre l'actualité de vos startups ou en découvrir de nouvelles"] + "." }</p>
                            <p>{ translations["Donner de la visibilité à vos offres et animer votre communauté"] + "." }</p>
                            <p>{ translations["Identifier les besoins des entreprises et les mettre en relation avec vos startups"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Recrutez vos futures pépites"] }</h5>
                            <p>{ translations["Diffuser et gérer vos opportunités : appels à candidatures, challenges & concours"] + "." }</p>
                            <p>{ translations["Recevoir des recommandations en fonction de vos préférences"] + "." }</p>
                            <p>{ translations["Simplifiez la gestion de vos demandes et leur suivi"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Simplifiez vos démarches"] }</h5>
                            <p>{ translations["Suivre, gérer et faire grandir mon portefeuille de startups et de partenaires"] + "." }</p>
                            <p>{ translations["Simplifier les échanges avec mon réseau et lui partager des opportunités"] + "." }</p>
                            <p>{ translations["Piloter mon activité et optimiser mon temps"] + "." }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.types } data-type="partner">
                <div className="container">
                    <h3>{ translations["Quel que soit votre métier"] },<br/>{ translations["Forinov est fait pour vous"] + "." }</h3>
                    <p>{ translations["Car chacune et chacun d'entre vous soutient l'innovation"] + " !" }</p>
                    <div className="wrapper" data-justify="center">
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Accélérateurs"] }</h5>
                            <p>{ translations["Vous aidez les pépites à décoller et cherchez à leur proposer toujours plus d'opportunités"] + " !" }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Incubateurs"] }</h5>
                            <p>{ translations["Vous soutenez les jeunes pousses dans leurs premières collaborations et cherchez à leur offrir plus de visibilité"] + " !" }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Investisseurs"] }</h5>
                            <p>{ translations["Vous financez les pépites de demain, souhaitez les aider à développer leur business et cherchez à suivre leur évolution"] + " !" }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Pôles d'innovation & Cie"] }</h5>
                            <p>{ translations["Que vous représentiez une technopole ou un réseau d'acteurs innovants, vous cherchez à leur offrir plus de visibilité et d'opportunités"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Startup studios & Cie"] }</h5>
                            <p>{ translations["Vous souhaitez connecter vos porteurs de projets à leurs futurs clients pour les aider à se développer"] + " !" }</p>
                        </div>
                    </div>
                    <div className={ HomeStyles.actions } data-justify="center">
                        <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Je m'inscris"] }/>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.checklists } data-type="partner">
                <div className="container">
                    <h3>{ translations["Mieux gérer votre réseau de startups et de partenaires"] + " :" }</h3>
                    <div className="grid threeColumns">
                        <div className={ SolutionsStyles.list }>
                            <h5>{ translations["Un réseau social B2B"] }</h5>
                            <ul>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Annuaires de startups et partenaires"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Moteurs de recherche avancés"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Messagerie interne"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Fil d'actualités"] + "." }</span>
                                </li>
                            </ul>
                        </div>
                        <div className={ SolutionsStyles.list }>
                            <h5>{ translations["Une plateforme d'appels à candidatures"] }</h5>
                            <ul>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Éditeur d'appels à candidatures"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Formulaires personnalisés"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Gestion des dossiers de candidatures"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Algorithme de matching"] + "." }</span>
                                </li>
                            </ul>
                        </div>
                        <div className={ SolutionsStyles.list }>
                            <h5>{ translations["Un outil de gestion de portefeuilles"] }</h5>
                            <ul>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Suivi de startups et partenaires"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Gestion de dossiers, Kanban"] + ", etc." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Suivi d'activités (RDV, tâches, documents, etc.)"] + "." }</span>
                                </li>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Dashboards personnalisables"] + "." }</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.typing } data-type="partner">
                <div className="container">
                    <p>{ translations["Découvrez notre communauté de startups"] + " !" }</p>
                    <div className={ SolutionsStyles.animation }>
                        <h3>{ translations["L'innovation a déjà un nom"] + " : " }<span className={ HomeStyles.typed } ref={ typedReference }/></h3>
                    </div>
                </div>
            </div>
            <div className={ HomeStyles.startups } data-type="home">
				<div className="container">
					<h3>{ translations["Nos startups à la une"] + " :" }</h3>
					<Carousel { ...pageProps } component="LatestStartups" data={ startups }/>
					<div className={ HomeStyles.actions } data-justify="left">
						<Button button={ ButtonStyles.callToAction } href="/directories/startups/categories" text={ translations["Accéder à l'annuaire des startups"] }/>
					</div>
				</div>
			</div>
            <div className={ HomeStyles.questions } data-type="partner">
                <div className="container">
                    <h3>{ translations["Les réponses à vos questions"] + " :" }</h3>
                    <Carousel { ...pageProps } component="CorporateAccordions" data={ Object.values(solutions.partner) }/>
                    <div className={ HomeStyles.actions } data-justify="center">
                        <p>{ translations["Vous avez des questions"] + " ? " }<Button button={ ButtonStyles.classicLink } href="/contact" text={ translations["N'hésitez pas à nous contacter"] }/>.</p>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const language = locale?.substring(0, 2);
    return {
        props: {
            locale, locales, defaultLocale,
			startups: await apiInstance.getLandingStartups("next", "Landing", language)
        },
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default PartnerSolutions;
export { getServerSideProps };