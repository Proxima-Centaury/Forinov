/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment, useEffect, useState } from "react";
import { HomeInterface } from "../../typescript/interfaces";
import api from "../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import MetaDatas from "../../components/seo/metadatas/metadatas";
import Button from "../../components/buttons/button";
import Carousel from "../../components/carousels/carousel";
import Separator from "../../components/separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import SolutionsStyles from "../../public/stylesheets/pages/Solutions.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporate Solutions */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const CorporateSolutions = (pageProps: HomeInterface) => {
    const { landing, states, accordionsConfigurations, router } = pageProps;
    const { translations, RGB } = states;
	const { solutions } = accordionsConfigurations;
	const [ lightingState, setLightingState ] = useState("disabled");
    const startupsCount: number = landing?.COUNTERS.STARTUPS;
	useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [ RGB ]);
    return <Fragment>
        <MetaDatas { ...pageProps }/>
        <div id="corporates" className="containerFull">
            <div className={ SolutionsStyles.presentation } data-type="corporate">
                <div className="container">
                    <h1>{ translations["Forinov, la solution la plus complète d'open innovation"] + "." }</h1>
                    <div className={ SolutionsStyles.jumbotron }>
                        <div className={ SolutionsStyles.presentationContent }>
                            <p>{ translations["Trouvez et entrez en relation avec les startups qui répondent à vos besoins. Veille, sourcing, appels à projet et gestion de portefeuilles... Autant de solutions qui vous attendent sur Forinov"] + " !" }</p>
                            <div className={ SolutionsStyles.presentationLinks }>
                                <Button button={ ButtonStyles.oldHome } href="/onboarding" icon="fa-solid fa-arrow-right" text={ translations["Je rejoins la communauté"] }/>
                                <Button button={ ButtonStyles.oldHome } href="#plans" icon="fa-solid fa-arrow-right" text={ translations["Je découvre les offres pro / entreprise"] }/>
                                <Button button={ ButtonStyles.oldHome } href="/directories/corporates/categories" icon="fa-solid fa-arrow-right" text={ translations["J'accède à l'annuaire des membres"] }/>
                            </div>
                        </div>
                        <Image src={ router.basePath + "/assets/landings/solutions-corpo-hero.png" } alt="" width="500" height="500"/>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.banner } data-type="corporate">
                <div className="container">
                    <h3>{ translations["Bien plus qu'une communauté... La plateforme d'open innovation nouvelle génération, connectée à l'écosystème"] + " !" }</h3>
                    <div className="grid threeColumns">
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Être membre d'un réseau d'acteurs innovants"] }</h5>
                            <p>{ translations["Identifier et contacter des startups et partenaires innovants"] + "." }</p>
                            <p>{ translations["Suivre des profils qualifiés et actualisés, tous domaines confondus"] + "." }</p>
                            <p>{ translations["Me connecter et communiquer avec les écosystèmes innovants"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Trouver des solutions à mes besoins"] }</h5>
                            <p>{ translations["Recevoir des recommandations en fonction de mes critères de recherche"] + "." }</p>
                            <p>{ translations["Communiquer et gérer des opportunités : appels à candidatures, challenges & concours"] + ", etc." }</p>
                            <p>{ translations["Centraliser et simplifier le suivi des dossiers de candidatures"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.purpose }>
                            <h5>{ translations["Profiter de démarches simplifiées"] }</h5>
                            <p>{ translations["Gérer et faire grandir mon portefeuille de startups et partenaires"] + "." }</p>
                            <p>{ translations["Simplifier les échanges avec mon réseau et engager mes collaborateurs"] + "." }</p>
                            <p>{ translations["Centraliser et piloter mon activité"] + "." }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.types } data-type="corporate">
                <div className="container">
                    <h3>{ translations["Quel que soit votre métier"] },<br/>{ translations["Forinov est fait pour vous"] + "." }</h3>
                    <p>{ translations["Car on est toutes et tous concerné.es par l'innovation"] + " !" }</p>
                    <div className="wrapper" data-justify="center">
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Gestion de l'innovation"] }</h5>
                            <p>{ translations["Vous cherchez des solutions aux besoins métiers. Vous provoquez et diffusez l'innovation pour préparer l'après-demain"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Change management"] }</h5>
                            <p>{ translations["Vous insufflez l'agilité, encouragez le changement et l'acculturation digitale. Vous portez et apportez le changement"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Communication et marketing"] }</h5>
                            <p>{ translations["Vous concevez et mettez en œuvre les stratégies marketing et communication et cherchez toujours à vous réinventer"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Ressources humaines"] }</h5>
                            <p>{ translations["Vous attirez et retenez les talents, vous managez la marque employeur et recherchez des solutions innovantes à leur proposer"] + "." }</p>
                        </div>
                        <div className={ SolutionsStyles.type }>
                            <h5>{ translations["Direction des achats"] }</h5>
                            <p>{ translations["Vous cherchez à trouver des prestataires et fournisseurs toujours plus innovants. Vous êtes la tête chercheuse des solutions de demain"] + "." }</p>
                        </div>
                    </div>
                    <div className={ HomeStyles.actions } data-justify="center">
                        <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Je m'inscris"] }/>
                    </div>
                </div>
            </div>
            <div className={ SolutionsStyles.checklists } data-type="corporate">
                <div className="container">
                    <h3>{ translations["La plateforme la plus complète d'open innovation"] + " :" }</h3>
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
            <div className={ SolutionsStyles.startupsCount } data-type="corporate">
                <div className="container">
                    <p>{ translations["Aujourd'hui, la communauté Forinov c'est"] + " :" }</p>
                    <h3>{ startupsCount + " " + translations["Startups et des centaines de partenaires qui n'attendent que vous"].toLowerCase() + " !" }</h3>
                </div>
            </div>
            <div id="plans" className={ SolutionsStyles.plans } data-type="corporate">
                <div className="container">
                    <h3>{ translations["Choisissez l'offre la plus adaptée pour vous et votre entreprise"] + " :" }</h3>
                    <div className="grid threeColumns">
                        {/* <div className={ SolutionsStyles.plan } data-rgb={ lightingState }>
                            <div className={ SolutionsStyles.head }>
                                <h5>{ translations["Professionnel"] }</h5>
                                <p>{ "1" + " " + translations["Utilisateur"].toLowerCase() }</p>
                            </div>
                            <div className={ SolutionsStyles.price }>
                                <p>{ translations["3 mois gratuit puis 59,99€ par mois"] }</p>
                            </div>
                            <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Commencer mon essai"] }/>
                            <div className={ SolutionsStyles.advantages }>
                                <div className={ SolutionsStyles.advantage }>
                                    <i className="fa-light fa-search"/>
                                    <p>{ translations["Recherche avancée"] }</p>
                                </div>
                                <Separator { ...pageProps }/>
                                <div className={ SolutionsStyles.advantage }>
                                    <i className="fa-light fa-folder-open"/>
                                    <p>{ translations["Quota portefeuille"] + " : 50" }</p>
                                </div>
                                <Separator { ...pageProps }/>
                                <div className={ SolutionsStyles.advantage }>
                                    <i className="fa-light fa-chart-network"/>
                                    <p>{ translations["Appels à candidatures"]  + " : 1"}</p>
                                </div>
                                <Separator { ...pageProps }/>
                            </div>
                            <div className={ HomeStyles.actions } data-justify="center">
                                <Button button={ ButtonStyles.classicLink } href="#" text={ translations["Voir le détail"] }/>
                            </div>
                        </div> */}
                        <div className={ SolutionsStyles.plan + " popular" } data-rgb={ lightingState }>
                            <div className={ SolutionsStyles.tab }>
                                <i className="fa-solid fa-star"/>
                                <p>{ translations["Populaire"] }</p>
                            </div>
                            <div className={ SolutionsStyles.head }>
                                <h5>{ translations["Entreprise"] }</h5>
                                <p>{ translations["Plusieurs utilisateurs"] }</p>
                            </div>
                            <div className={ SolutionsStyles.price }>
                                <p>{ translations["À partir de 300€ par mois"] }</p>
                            </div>
                            <Button button={ ButtonStyles.callToActionNegative } href="/contact" text={ translations["Nous contacter"] }/>
                            <div className={ SolutionsStyles.advantages }>
                                <div className={ SolutionsStyles.advantage }>
                                    <i className="fa-light fa-search"/>
                                    <p>{ translations["Recherche avancée"] }</p>
                                </div>
                                <Separator { ...pageProps }/>
                                <div className={ SolutionsStyles.advantage }>
                                    <i className="fa-light fa-folder-open"/>
                                    <p>{ translations["Portefeuille illimité"] }</p>
                                </div>
                                <Separator { ...pageProps }/>
                                <div className={ SolutionsStyles.advantage }>
                                    <i className="fa-light fa-chart-network"/>
                                    <p>{ translations["Appels à candidatures illimités"] }</p>
                                </div>
                                <Separator { ...pageProps }/>
                            </div>
                            <div className={ HomeStyles.actions } data-justify="center">
                                <Button button={ ButtonStyles.classicLink } href="#" text={ translations["Voir le détail"] }/>
                            </div>
                        </div>
                    </div>
                    <Image src={ router.basePath + "/assets/landings/solutions-corpo-seating.png" } alt="" width="1000" height="500"/>
                </div>
            </div>
            <div className={ HomeStyles.testimonials + " " + SolutionsStyles.testimonials } data-type="corporate">
                <div className="container">
                    <h3>{ translations["Ils nous font confiance"] + " :" }</h3>
                    <Carousel { ...pageProps } component="Testimonials"/>
                </div>
            </div>
            <div className={ HomeStyles.questions } data-type="corporate">
                <div className="container">
                    <h3>{ translations["Les réponses à vos questions"] + " :" }</h3>
					<Carousel { ...pageProps } component="CorporateAccordions" data={ Object.values(solutions.corporate) }/>
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
            landing: await api.getLanding("next", "Landing", language)
        },
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default CorporateSolutions;
export { getServerSideProps };