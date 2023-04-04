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
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/buttons/button";
import Carousel from "../../components/carousels/carousel";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import SolutionStyles from "../../public/stylesheets/pages/Solutions.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Solutions */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StartupSolutions = (pageProps: HomeInterface) => {
    const { opportunities, states, router } = pageProps;
    const { metadatas, translations } = states;
    return <Fragment>
        <Head>
            <title>{ metadatas[router.route].title }</title>
			<meta name="description" content={ metadatas[router.route].description }/>
        </Head>
        <div className="containerFull" style={ { background: "var(--background-sub-color)" } }>
            <div className={ HomeStyles.presentation }>
                <h1 className={ SolutionStyles.heroTitle }>{ translations["Les meilleures startups sont sur Forinov, inscrivez-vous gratuitement"] }</h1>
				<div className={ HomeStyles.jumbotron }>
                    <p className={ SolutionStyles.heroDesc }>{ translations["Vous proposez une solution innovante ? Vous cherchez des clients B2B ? Rejoignez Forinov pour booster votre visibilité et entrer en relation simplement avec des entreprises qui ont besoin de vos solutions pour innover !"] }</p>
                    <div className={ SolutionStyles.heroLinks }>
                        <Button button={ ButtonStyles.oldHome } href="/onboarding" icon="fa-solid fa-arrow-right" text={ translations["J'inscris ma startup"] }/>
                        <Button button={ ButtonStyles.oldHome } href="/directories/opportunities/categories" icon="fa-solid fa-arrow-right" text={ translations["Je découvre les opportunités"] }/>
                        <Button button={ ButtonStyles.oldHome } href="/directories/startups/categories" icon="fa-solid fa-arrow-right" text={ translations["J'accède à l'annuaire des membres"] }/>
                    </div>
                    <Image className={ SolutionStyles.heroImg } src={ router.basePath + "/assets/landings/solutions-su.png" } alt="" width="500" height="500"/>
                </div>
            </div>
            <div className={ SolutionStyles.banner }>
                <div className="container">
                    <h1 className={ SolutionStyles.bannerTitle }>{ translations["Pourquoi rejoindre Forinov ?"] }</h1>
                    <div className={ SolutionStyles.bannerBlockWrapper }>
                        <div className={ SolutionStyles.bannerBlock }>
                            <h3 className={ SolutionStyles.bannerSubtitle }>{ translations["Gagner en visibilité"] }</h3>
                            <p className={ SolutionStyles.bannerParagraph }>{ translations["Référencer et promouvoir mes solutions grâce à un profil clair et complet. Être identifié et contacté par des entreprises à la recherche de startups innovantes. Partager mon actualité auprès d’une communauté d’acteurs innovants."] }</p>
                        </div>
                        <div className={ SolutionStyles.bannerBlock }>
                            <h3 className={ SolutionStyles.bannerSubtitle }>{ translations["Candidater à des opportunités concrètes"] }</h3>
                            <p className={ SolutionStyles.bannerParagraph }>{ translations["Postuler aux appels à candidatures d’entreprises et partenaires et être alerté des nouvelles opportunités. Découvrir directement les besoins des entreprises. Centraliser et simplifier le suivi de mes candidatures."] }</p>
                        </div>
                        <div className={ SolutionStyles.bannerBlock }>
                            <h3 className={ SolutionStyles.bannerSubtitle }>{ translations["Accéder aux bons contacts"] }</h3>
                            <p className={ SolutionStyles.bannerParagraph }>{ translations["Identifier et contacter directement les collaborateurs clés des entreprises (directions innovations, responsables métiers…). Simplifier mes échanges grâce à une plateforme collaborative. Centraliser le suivi de mes relations."] }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionStyles.banner2 }>
                <div className="container">
                    <h1 className={ SolutionStyles.bannerTitle2 }>{ translations["Comment faire décoller mon business ?"] }</h1>
                    <div className={ SolutionStyles.bannerBlockWrapper }>
                        <div className={ SolutionStyles.bannerBlock }>
                            <h3 className={ SolutionStyles.bannerSubtitle2 }>1.</h3>
                            <p className={ SolutionStyles.bannerParagraph2 }>{ translations["Je crée mon profil « startup » gratuitement et en quelques clics."] }</p>
                        </div>
                        <div className={ SolutionStyles.bannerBlock }>
                            <h3 className={ SolutionStyles.bannerSubtitle2 }>2.</h3>
                            <p className={ SolutionStyles.bannerParagraph2 }>{ translations["J’accède à la communauté et aux annuaires d’opportunités, d’entreprises et de partenaires."] }</p>
                        </div>
                        <div className={ SolutionStyles.bannerBlock }>
                            <h3 className={ SolutionStyles.bannerSubtitle2 }>3.</h3>
                            <p className={ SolutionStyles.bannerParagraph2 }>{ translations["Je mets en avant mes solutions et partage mon actualité pour améliorer mon référencement."] }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ SolutionStyles.banner + ' ' + SolutionStyles.bannerWithImg } style={ { position: 'relative' } }>
                <div className="container" >
                    <h2 className={ SolutionStyles.bannerUnderlineTitle }>{ translations["DÉCOUVREZ NOTRE COMMUNAUTÉ DE STARTUPS"] }</h2>
                    <h1 className={ SolutionStyles.bannerTitle }>{ translations["L’innovation a déjà un nom"] }, <br /><span>title</span>.</h1>
                    <Image
                        src={router.basePath + "/assets/landings/solutions-su-seating.png"}
                        alt=""
                        width="500"
                        height="500"
                        className={SolutionStyles.bannerImgSeating}
                    >
                    </Image>
                </div>
            </div>
            <div className={HomeStyles.opportunity} data-type="startup" style={{paddingTop: "15rem"}}>
                <h4>{translations["Les dernières opportunités"] + " :"}</h4>
                <Carousel {...pageProps} component="LatestOpportunities" data={opportunities} />
                <div className={HomeStyles.actions} data-justify="left">
                    <Button button={ButtonStyles.callToAction} href="/directories/opportunities/categories" text={translations["Découvrir toutes les opportunités"]} />
                    <Button button={ButtonStyles.callToActionAlternative} href="/opportunities" text={translations["Qu'est-ce qu'une opportunité"] + " ?"} />
                </div>
            </div>
            <div className={SolutionStyles.banner3}>
                <div className="container">
                    <h1 className={SolutionStyles.bannerTitle}>{translations["Les réponses à vos questions"]}</h1>
                    <div className={SolutionStyles.bannerBlockWrapper}>
                        <div className={SolutionStyles.bannerBlock}>
                            <h3 className={SolutionStyles.bannerSubtitle}>{translations["Forinov, est-ce vraiment gratuit pour les startups ?"]}</h3>
                            <p className={SolutionStyles.bannerParagraph}>{translations["Oui ! Car nous cherchons à créer la première communauté des acteurs de l’innovation. Impossible sans les startups : inscris donc les différents membres de ton équipe pour ne rater aucune opportunité ! Prochainement, des options premium seront disponibles pour encore plus de mise en visibilité auprès des entreprises et de nouvelles fonctionnalités exclusives !"]}</p>
                        </div>
                        <div className={SolutionStyles.bannerBlock}>
                            <h3 className={SolutionStyles.bannerSubtitle}>{translations["Quel est l’intérêt de passer par Forinov plutôt qu’un autre canal ?"]}</h3>
                            <p className={SolutionStyles.bannerParagraph}>{translations["Forinov, est-ce vraiment gratuit pour les startups ?"]}</p>
                        </div>
                    </div>
                    <div className={SolutionStyles.bannerBlockWrapper}>
                        <div className={SolutionStyles.bannerBlock}>
                            <h3 className={SolutionStyles.bannerSubtitle}>{translations["Comment me faire repérer par les entreprises ?"]}</h3>
                            <p className={SolutionStyles.bannerParagraph}>{translations["Pour mettre en avant ton profil, mets le à jour régulièrement, publie des nouvelles, ajoute tes entreprises cibles à ta wishlist et suis leurs profils… elles en seront informées ! Pense aussi à préciser tes différents produits et services : ton profil sera plus attractif et notre algorithme de matching fera le reste !"]}</p>
                        </div>
                        <div className={SolutionStyles.bannerBlock}>
                            <h3 className={SolutionStyles.bannerSubtitle}>{translations["Comment puis-je postuler à un appel à projets ?"]}</h3>
                            <p className={SolutionStyles.bannerParagraph}>{translations["Retrouve toutes les opportunités en cours dans l’onglet « Opportunités ». Avec ton profil Forinov, tu seras informé.e directement des appels à projets qui matchent avec ton profil. Pour postuler réponds au questionnaire associé à l’appel, et gagne un temps fou grâce aux nombreuses informations pré-remplies à partir de ton profil !"]}</p>
                        </div>
                    </div>
                    <div className={SolutionStyles.bannerBlockWrapper}>
                        <div className={SolutionStyles.bannerBlock}>
                            <h3 className={SolutionStyles.bannerSubtitle}>{translations["Qui sont les personnes que je peux contacter sur Forinov ?"]}</h3>
                            <p className={SolutionStyles.bannerParagraph}>{translations["Sur Forinov, tu peux retrouver des collaborateurs de grands groupes, de PME mais aussi des contacts clés d’incubateurs, accélérateurs ou structures d’investissement. Du côté des entreprises, il n’y a pas que les responsables innovation inscrits mais aussi les responsables métiers (RH, finance, digital, achat…) : tes clients potentiels sont donc nombreux !"]}</p>
                        </div>
                        <div className={SolutionStyles.bannerBlock}>
                            <h3 className={SolutionStyles.bannerSubtitle}>{translations["Mon profil est-il celui d’une startup ou d’une entreprise ?"]}</h3>
                            <p className={SolutionStyles.bannerParagraph}>{translations["Sur Forinov, nous connectons des startups, des entreprises et des partenaires type incubateurs, accélérateurs. Nous entendons le mot « startups » au sens large du terme ! Toute jeune entreprise porteuse d’une solution innovante est la bienvenue pour répondre aux besoins des grands groupes et PME à la recherche de solutions comme les vôtres !"]}</p>
                        </div>
                    </div>
                    <h1 className={SolutionStyles.banner3Redirect}>{translations["Vous avez des questions ? "]}<Link
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
            opportunities: await api.getLandingOpportunities("next", "Landing", language)
        },
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default StartupSolutions;
export { getServerSideProps };