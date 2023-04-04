/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import SolutionStyles from "../../public/stylesheets/pages/Solutions.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Solutions */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnerSolutions = (pageProps: HomeInterface) => {
    const { states, router } = pageProps;
    const { metadatas, translations } = states;
    return (
        <>
            <Head>

                <title>{metadatas[router.route].title}</title>
                <meta name="description" content={metadatas[router.route].description} />
                <style>
                    {`
                        :root {
                            --page-color: #38BF84;
                        }
                    `}
                </style>
            </Head>
            <section className="containerFull" style={{ background: "var(--background-sub-color)" }}>
                <div className={"container " + SolutionStyles.heroContainer}>
                    <h1 className={SolutionStyles.heroTitle}>{translations["Rejoignez la plus grande communauté d’acteurs innovants et décuplez la force de votre réseau"]}</h1>
                    <p className={SolutionStyles.heroDesc}>
                        {translations["Incubateurs, accélérateurs, Business Angels…Cette communauté est faite pour vous ! A la clé : visibilité de vos offres et de vos startups, gestion de vos appels à candidatures, suivi de votre portefeuille et de votre réseau !"]}
                    </p>
                    <div className={SolutionStyles.heroLinks}>
                        <Button button={ ButtonStyles.oldHome } href="/onboarding" icon="fa-solid fa-arrow-right" text={ translations["M'inscrire sur Forinov"] }/>
                        <Button button={ ButtonStyles.oldHome } href="/contact" icon="fa-solid fa-arrow-right" text={ translations["Demander une démonstration gratuite"] }/>
                        <Button button={ ButtonStyles.oldHome } href="/directories/partners/categories" icon="fa-solid fa-arrow-right" text={ translations["J'accède à l'annuaire des membres"] }/>
                    </div>
                    <Image
                        src={router.basePath + "/assets/landings/solutions-partners.png"}
                        alt=""
                        width="500"
                        height="500"
                        className={SolutionStyles.heroImg}
                    ></Image>
                </div>
                <div className={SolutionStyles.banner}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle}>{translations["De nombreux partenaires ont déjà rejoint la communauté pour apporter plus de valeur à leurs startups et réseau. Pourquoi pas vous ?"]}</h1>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations["Faites vivre votre réseau en quelques clics"]}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Promouvoir, suivre l’actualité de vos startups ou en découvrir de nouvelles. Donner de la visibilité à vos offres et animer votre communauté. Identifier les besoins des entreprises et les mettre en relation avec vos startups."]}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations["Recrutez vos futures pépites"]}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Diffuser et gérer vos opportunités : appels à candidatures, challenges... Recevoir des recommandations en fonction de vos préférences. Simplifiez la gestion de vos demandes et leur suivi."]}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations["Simplifiez vos démarches"]}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Suivre, gérer et faire grandir mon portefeuille de startups et de partenaires. Simplifier les échanges avec mon réseau et lui partager des opportunités. Piloter mon activité et optimiser mon temps."]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: "5rem" }}>
                    <h1 className={SolutionStyles.coloredTitle}>{translations["Quel que soit votre métier"]}, <br />
                    {translations["Forinov est fait pour vous"]}</h1>
                    <h2 className={SolutionStyles.coloredSubtitle}>{translations["Car chacun d’entre vous soutient l’innovation !"]}</h2>
                    <div className={SolutionStyles.cardWrapper}>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Accélérateurs"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous aidez les pépites à décoller et cherchez à leur proposer toujours plus d’opportunités !"]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Incubateurs"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous soutenez les jeunes pousses dans leurs premières collaborations et cherchez à leur offrir plus de visibilité !"]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Investisseurs"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous financez les pépites de demain, souhaitez les aider à développer leur business et cherchez à suivre leur évolution !"]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Pôles d’innovation & Cie"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Que vous représentiez une technopole ou un réseau d’acteurs innovants, vous cherchez à leur offrir plus de visibilité et d’opportunités."]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Startup studios & Cie"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous souhaitez connecter vos porteurs de projets à leurs futurs clients pour les aider à se développer !"]}</p>
                        </div>
                    </div>
                    <div className={ HomeStyles.actions } data-justify="center">
                        <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Je m'inscris"] }/>
                    </div>
                </div>
                <div className={SolutionStyles.banner2}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle2} style={{ marginBottom: "2rem" }}>{ translations["Mieux gérer votre réseau de startups et de partenaires"] }</h1>
                        <div className={SolutionStyles.cardWrapper}>
                        <div className={SolutionStyles.listItem}>
                                <h3 className={SolutionStyles.listItemTitle}>{translations["Un réseau social B2B"]}</h3>
                                <ul>
                                    <li><i className="fa-light fa-check"/>{translations["Annuaires de startups et partenaires."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Moteurs de recherche avancés."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Messagerie interne."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Fil d’actualités."]}</li>
                                </ul>
                            </div>
                            <div className={SolutionStyles.listItem}>
                                <h3 className={SolutionStyles.listItemTitle}>{translations["Une plateforme d’appels à projets"]}</h3>
                                <ul>
                                    <li><i className="fa-light fa-check"/>{translations["Éditeur d’appels à projets."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Formulaires personnalisés."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Gestion des dossiers de candidatures."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Algorithme de matching."]}</li>
                                </ul>
                            </div>
                            <div className={SolutionStyles.listItem}>
                                <h3 className={SolutionStyles.listItemTitle}>{translations["Un outil de gestion de portefeuilles"]}</h3>
                                <ul>
                                    <li><i className="fa-light fa-check"/>{translations["Suivi de startups et partenaires."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Gestion de dossiers, Kanban..."]}</li>
                                    <li><i className="fa-light fa-check"/>{translations["Suivi d’activités (RDV, tâches, documents...)."]}</li>
                                    <li><i className="fa-light fa-check"/>{ translations["Dashboards personnalisables"] + "." }</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* 
                
                        ------------------------
                        |                      |
                        |   SECTION A LA UNE   |
                        |                      |
                        ------------------------
                */}
                </div>
                <div className={SolutionStyles.banner + ' ' + SolutionStyles.bannerWithImg} style={{ position: 'relative', marginBottom: "10rem" }}>
                    <div className="container">
                        <h2 className={SolutionStyles.bannerUnderlineTitle}>{translations["DÉCOUVREZ NOTRE COMMUNAUTÉ DE STARTUPS"]}</h2>
                        <h1 className={SolutionStyles.bannerTitle}>{translations["L’innovation a déjà un nom"]},<br /><span>title</span>.</h1>
                        <Image
                            src={router.basePath + "/assets/landings/solutions-partners-seating.png"}
                            alt=""
                            width="500"
                            height="500"
                            className={SolutionStyles.bannerImgSeating}
                        >
                        </Image>
                    </div>
                </div>
                <div className={SolutionStyles.banner3}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle}>{translations['Les réponses à vos questions']}</h1>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations['Pourquoi publier un appel à projet sur Forinov ?']}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Forinov vous permet de diffuser vos besoins et opportunités (appels à projets, concours…) en quelques clics. Vous pouvez créer vos formulaires personnalisés et centraliser la gestion des candidatures (notations, commentaires). Les startups gagnent un temps précieux en suivant le statut de leur candidature (et donc vous sollicitent moins). Les + pour vous : nous vous aidons dans le sourcing de startups, en invitant notamment les startups qui ne seraient pas encore sur Forinov."]}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations['Quelle valeur ajoutée pour mes startups ?']}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations['Sur Forinov, votre réseau de startups et d’alumnis gagne en visibilité, accède à des mises en relation privilégiées avec des collaborateurs clés de grands groupes, PME et investisseurs, et surtout construit un profil unique visible par tous ! Fini donc les mille et une fiches à mettre à jour constamment : Forinov centralise toutes ces informations et s’en sert même pour rendre les candidatures de vos startups plus rapides !']}</p>
                            </div>
                        </div>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations['Comment puis-je inviter mes startups à s’inscrire sur Forinov ?']}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations['Un lien simple vous permettra d’inviter votre startups. Nos équipes sont également disponibles pour faire ces invitations afin de centraliser, sur une unique plateforme, l’ensemble de vos startups et alumnis. Fini les « simples » CRM, Forinov est avant tout une communauté d’acteurs innovants et un outil de gestion de votre portefeuille !']}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations['Puis-je faire des recommandations entre mes startups et des entreprises ?']}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations['Forinov est aussi fait pour ça ! Si certains profils de votre réseau semblent correspondre aux recherches des entreprises inscrites, n’hésitez pas à pousser leurs profils! La messagerie interne et les profils détaillés des collaborateurs vous permettront de simplifier vos démarches et de mettre en relation vos startups avec les bonnes personnes !']}</p>
                            </div>
                        </div>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations['Comment puis-je mettre en avant mes startups sur Forinov ?']}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations['Rien de plus simple, il vous suffit de créer des dossiers publics et d’y ajouter vos startups et/ou alumni. Ces dossiers seront directement accessibles depuis votre profil. Cela représente une vraie vitrine pour vos startups. Vous pouvez également créer des dossiers privés que vous partagez uniquement avec vos partenaires de manière à les aider dans l’identification de startups qui correspondent aux besoins qu’ils expriment. Le vrai plus ? Plus besoin de demander à vos startups leur nouveau logo ou leur dernier pitch, tout est mis à jour automatiquement à partir de leurs profils !']}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations['Toutes les informations sont-elles publiques ?']}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations['Non, vous disposez d’espaces totalement privés et réservés à vous et vos collaborateurs pour y partager, par exemple, vos compte rendus de RDV, vos avis et commentaires… Seuls les utilisateurs habilités sur votre compte ont accès à ces informations confidentielles.']}</p>
                            </div>
                        </div>
                        <h1 className={SolutionStyles.banner3Redirect}>{translations["Vous avez des questions ?"]} <Link
                            href="/contact"
                        >
                            {translations["N'hésitez pas à nous contacter"]}
                        </Link></h1>
                    </div>
                </div>
            </section>
        </>
    )
}
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
        },
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default PartnerSolutions;
export { getServerSideProps };