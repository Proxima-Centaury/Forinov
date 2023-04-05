/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { HomeInterface } from "../../typescript/interfaces";
import api from "../../scripts/api";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/buttons/button";
import Carousel from "../../components/carousels/carousel";
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
    const { landing, states, router } = pageProps;
    const { metadatas, translations } = states;
    const startupsCount: number = landing?.COUNTERS.STARTUPS;
    return <Fragment>
        <Head>
            <title>{ metadatas[router.route].title }</title>
            <meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div className="containerFull">
            <div className={ SolutionsStyles.presentation } data-type="corporate">
                <div className="container">
                    <h1>{ translations["Forinov, la solution la plus complète d'open innovation"] }</h1>
                    <div className={ SolutionsStyles.jumbotron }>
                        <div className={ SolutionsStyles.presentationContent }>
                            <p>{ translations["Trouvez et entrez en relation avec les startups qui répondent à vos besoins. Veille, sourcing, appels à projet et gestion de portefeuilles... Autant de solutions qui vous attendent sur Forinov"] + " !" }</p>
                            <div className={ SolutionsStyles.presentationLinks }>
                                <Button button={ ButtonStyles.oldHome } href="/onboarding" icon="fa-solid fa-arrow-right" text={ translations["Je rejoins la communauté"] }/>
                                <Button button={ ButtonStyles.oldHome } href="#offers" icon="fa-solid fa-arrow-right" text={ translations["Je découvre les offres pro / entreprise"] }/>
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
                            <p>{ translations["Communiquer et gérer des opportunités : appels à projets, challenges & concours"] + ", etc." }</p>
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
                    <h3>{ translations["Quel que soit votre métier"] },<br/>{ translations["Forinov est fait pour vous"] }</h3>
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
            <div className={ SolutionsStyles.checklists }>
                <div className="container">
                    <h3>{ translations["La plateforme la plus complète d'open innovation"] }</h3>
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
                            <h5>{ translations["Une plateforme d'appels à projets"] }</h5>
                            <ul>
                                <li>
                                    <i className="fa-light fa-check"/>
                                    <span>{ translations["Éditeur d'appels à projets"] + "." }</span>
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
            <div className={SolutionsStyles.greyBanner} style={{ paddingBottom: 0 }}>
                <div className="container" style={{ position: "relative" }}>
                    <h3 className={SolutionsStyles.bannerSubtitle2}>{translations["Aujourd'hui, la communauté Forinov c'est"]}</h3>
                    <h2 className={SolutionsStyles.bannerTitle2} style={{ width: "50%" }}>{startupsCount + translations[" startups et des centaines de partenaires qui n'attendent que vous"]}</h2>
                    <Image
                        src={router.basePath + "/assets/landings/solutions-corpo-seating.png"}
                        alt=""
                        width="1000"
                        height="500"
                        className={SolutionsStyles.bannerImgSeatingCorpo}
                    >

                    </Image>
                </div>
                <div className={SolutionsStyles.banner} style={{ width: "100%", paddingTop: '10rem', borderBottomRightRadius: 0 }}>
                    <div id="offers" className="container">
                        <h1 className={SolutionsStyles.bannerTitle}>{translations["Choisissez l'offre la plus adaptée pour vous et votre entreprise"]}</h1>
                        <div className={SolutionsStyles.cardWrapper}>
                            <div className={SolutionsStyles.solutionsCards}>
                                {/* 1st card */}
                                <div className={SolutionsStyles.solutionItem}>
                                    <h2 className={SolutionsStyles.solutionTitle}>{translations["Professionnel"]}</h2>
                                    <p className={SolutionsStyles.solutionConstraint}>{translations["1 utilisateur"]}</p>
                                    <h1 className={SolutionsStyles.solutionPricing}>{translations["3 mois gratuit puis 59,99€ par mois"]}</h1>
                                    <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Commencer mon essai"] }/>
                                    <ul className={SolutionsStyles.solutionFonctionnalities}>
                                        <li>
                                            <i className='fa-light fa-search'></i>
                                            <p className={SolutionsStyles.solutionFonctionnality}>{translations["Recherche avancée"]}</p>
                                        </li>
                                        <div className="spacer"></div>
                                        <li>
                                            <i className='fa-light fa-folder'></i>
                                            <p className={SolutionsStyles.solutionFonctionnality}>{translations["Quota portefeuille : 50"]}</p>
                                        </li>
                                        <div className="spacer"></div>
                                        <li>
                                            <i className='fa-light fa-chart-network'></i>
                                            <p className={SolutionsStyles.solutionFonctionnality}>{translations["Appel à projets : 1"]}</p>
                                        </li>
                                        <div className="spacer"></div>
                                    </ul>
                                    <p className={SolutionsStyles.solutionSeeDetails}>{translations["Voir le détails"]}</p>
                                </div>
                                {/* 2nd card */}
                                <div className={SolutionsStyles.solutionItem}>
                                    <p className={SolutionsStyles.solutionLabel}><i className='fa-solid fa-star'></i>{translations[" Populaire"]}</p>
                                    <h2 className={SolutionsStyles.solutionTitle}>{translations["Entreprise"]}</h2>
                                    <p className={SolutionsStyles.solutionConstraint}>{translations["MULTI-UTILISATEURS"]}</p>
                                    <h1 className={SolutionsStyles.solutionPricing}>{translations["À partir de 300€ par mois"]}</h1>
                                    <Button button={ ButtonStyles.callToAction } href="/contact" text={ translations["Nous contacter"] }/>
                                    <ul className={SolutionsStyles.solutionFonctionnalities}>
                                        <li>
                                            <i className='fa-solid fa-search'></i>
                                            <p className={SolutionsStyles.solutionFonctionnality}>{translations["Recherche avancée"]}</p>
                                        </li>
                                        <div className="spacer"></div>
                                        <li>
                                            <i className='fa-solid fa-search'></i>
                                            <p className={SolutionsStyles.solutionFonctionnality}>{translations["Recherche avancée"]}</p>
                                        </li>
                                        <div className="spacer"></div>
                                        <li>
                                            <i className='fa-solid fa-search'></i>
                                            <p className={SolutionsStyles.solutionFonctionnality}>{translations["Recherche avancée"]}</p>
                                        </li>
                                        <div className="spacer"></div>
                                    </ul>
                                    <p className={SolutionsStyles.solutionSeeDetails}>{translations["Voir le détails"]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={HomeStyles.testimonials} data-type="home">
                <h4>{translations["Ils nous font confiance"]}</h4>
                <Carousel {...pageProps} component="Testimonials" />
            </div>
            <div className={SolutionsStyles.banner3}>
                <div className="container">
                    <h1 className={SolutionsStyles.bannerTitle}>{translations["Les réponses à vos questions"]}</h1>
                    <div className={SolutionsStyles.bannerBlockWrapper}>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Pourquoi publier un appel à projet sur Forinov ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Forinov vous permet de diffuser vos besoins et opportunités (appels à projets, concours…) en quelques clics. Vous pouvez créer vos formulaires personnalisés et centraliser la gestion des candidatures (notations, commentaires). Les startups gagnent un temps précieux en suivant le statut de leur candidature (et donc vous sollicitent moins). Les + pour vous : nous vous aidons dans le sourcing de startups, en invitant notamment les startups qui ne seraient pas encore sur Forinov."]}</p>
                        </div>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Toutes les informations sont-elles publiques ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Non, vous disposez d'espaces totalement privés et réservés à vous et vos collaborateurs pour y partager, par exemple, vos compte rendus de RDV, vos avis et commentaires… Seuls les utilisateurs habilités sur votre compte ont accès à ces informations confidentielles."]}</p>
                        </div>
                    </div>
                    <div className={SolutionsStyles.bannerBlockWrapper}>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["Quels sont les avantages de Forinov pour mon équipe ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Fini les reportings fastidieux et obsolètes au bout d'un mois ! Les forces de Forinov : la centralisation des recherches, la possibilité de partager certains dossiers de votre portefeuille avec vos collaborateurs et surtout la mise à jour des fiches par les startups elles-mêmes ! Votre collaborateur a rencontré une startup il y a quelques mois et n'a pas donné suite ? Découvrez pourquoi sans avoir à remonter dans ses mails !"]}</p>
                        </div>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["D'où viennent les données et comment sont-elles mises à jour ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Les utilisateurs mettent à jour leur propre profil ce qui permet d'avoir l'information directement à la source est d'être informé des dernières actualités. Pour les startups c'est l'occasion d'être en visibilité non pas d'une entreprise mais de tout un écosystème. Pour vous, c'est un gain de temps précieux : plus besoin de créer et mettre à jour des fiches, il vous suffit de les suivre pour les ajouter à votre portefeuille. Vous pourrez ensuite gérer le suivi de vos relations (RDV, notes…)"]}</p>
                        </div>
                    </div>
                    <div className={SolutionsStyles.bannerBlockWrapper}>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["J'ai déjà un CRM de startups, qu'est-ce que Forinov m'apporte de plus ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Les équipes de Forinov s'occupent d'inviter gratuitement les startups de votre CRM. L'avantage ? Vous n'aurez plus à actualiser les données tous les mois car la startup s'occupe de tout ! Forinov vous donne donc accès à des données en temps réel, et à un reporting automatisé !"]}</p>
                        </div>
                        <div className={SolutionsStyles.bannerBlock}>
                            <h3 className={SolutionsStyles.bannerSubtitle}>{translations["En quoi Forinov permet d'éviter la sur-sollicitation ?"]}</h3>
                            <p className={SolutionsStyles.bannerParagraph}>{translations["Avec votre profil personnalisé et complet, vous indiquez précisément ce que vous recherchez sur Forinov, mais aussi ce que vous ne cherchez pas. Vous pouvez aussi suivre des profils de startups : elles en sont informées et ne cherchent donc pas à vous repartager et à vous vendre leurs produits, car vous y avez accès en quelques clics. Les appels à projets sont le signal pour elles que vous recherchez une technologie bien précise !"]}</p>
                        </div>
                    </div>
                    <h1 className={SolutionsStyles.banner3Redirect}>{translations["Vous avez des questions ?"]} <Link
                        href="/contact"
                    >
                        {translations["N'hésitez pas à nous contacter"]}
                    </Link></h1>
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