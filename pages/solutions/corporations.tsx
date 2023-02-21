/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { HomeInterface } from "../../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import SolutionStyles from "../../public/stylesheets/pages/solutions/Solutions.module.css"
import { useRouter } from "next/router";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporation Solutions */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CorporationSolutions = (pageProps: HomeInterface) => {
    const { locales, states, stateSetters, config, opportunities }: any = pageProps;

    const router = useRouter();
    const { metadatas, translations }: any = states;

    return (
        <>
            <Head>
                <title>{metadatas[router.route].title}</title>
                <meta name="description" content={metadatas[router.route].description} />
                <style>
                    {`
                        :root {
                            --page-color: var(--logo-blue-color);
                        }
                    `}
                </style>
            </Head>
            <section className="containerFull" style={{ background: "var(--background-sub-color)" }}>
                <div className={"container " + SolutionStyles.heroContainer}>
                    <h1 className={SolutionStyles.heroTitle}>{translations["Forinov, la solution la plus complète d’open innovation"]}</h1>
                    <p className={SolutionStyles.heroDesc}>
                        {translations["Trouvez et entrez en relation avec les startups qui répondent à vos besoins. Veille, sourcing, appels à projet et gestion de portefeuilles… Autant de solutions qui vous attendent sur Forinov !"]}
                    </p>
                    <div className={SolutionStyles.heroLinks}>
                        <Link
                            href={'/'}
                            className={SolutionStyles.heroLink + ' lift'}
                        >
                            <span>{translations["Je rejoins la communauté"]}</span>
                            <i className='fa-solid fa-arrow-right'></i>
                        </Link>
                        <Link
                            href={'/'}
                            className={SolutionStyles.heroLink + ' lift'}
                        >
                            <span>{translations["Je découvre les offres Pro / Entreprise"]}</span>
                            <i className='fa-solid fa-arrow-right'></i>
                        </Link>
                        <Link
                            href={'/'}
                            className={SolutionStyles.heroLink + ' lift'}
                        >
                            <span>{translations["J'accède à l'annuaire des membres"]}</span>
                            <i className='fa-solid fa-arrow-right'></i>
                        </Link>
                    </div>
                    <Image
                        src="/assets/landings/solutions-corpo-hero.png"
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className={SolutionStyles.heroImg}
                    ></Image>
                </div>
                <div className={SolutionStyles.banner}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle}>{translations["Bien plus qu’une communauté... La plateforme d’open innovation nouvelle génération, connectée à l’écosystème !"]}</h1>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations["Être membre d’un réseau d’acteurs innovants"]}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Identifier et contacter des startups et partenaires innovants. Suivre des profils qualifiés et actualisés, tous domaines confondus. Me connecter et communiquer avec les écosystèmes innovants."]}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations["Trouver des solutions à mes besoins"]}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Recevoir des recommandations en fonction de mes critères de recherche. Communiquer et gérer des opportunités : appels à projets, concours… Centraliser et simplifier le suivi des dossiers de candidatures."]}</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>{translations["Profiter de démarches simplifiées"]}</h3>
                                <p className={SolutionStyles.bannerParagraph}>{translations["Gérer et faire grandir mon portefeuille de startups et partenaires. Simplifier les échanges avec mon réseau et engager mes collaborateurs. Centraliser et piloter mon activité."]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: "5rem" }}>
                    <h1 className={SolutionStyles.coloredTitle}>{translations["Quel que soit votre métier, "]}<br />
                        {translations["Forinov est fait pour vous"]}</h1>
                    <h2 className={SolutionStyles.coloredSubtitle}>tra{translations["Car on est tous concerné par l’innovation !"]}</h2>
                    <div className={SolutionStyles.cardWrapper}>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Gestion de l’innovation"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous cherchez des solutions aux besoins métiers. Vous provoquez et diffusez l’innovation pour préparer l’après-demain."]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Change management"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous concevez et mettez en œuvre les stratégies marketing et communication et cherchez toujours à vous réinventer."]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Communication et marketing"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous concevez et mettez en œuvre les stratégies marketing et communication et cherchez toujours à vous réinventer."]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Ressources humaines"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous attirez et retenez les talents, vous managez la marque employeur et recherchez des solutions innovantes à leur proposer."]}</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>{translations["Direction des achats"]}</h1>
                            <p className={SolutionStyles.cardDesc}>{translations["Vous cherchez à trouver des prestataires et fournisseurs toujours plus innovants. Vous êtes la tête chercheuse des solutions de demain."]}</p>
                        </div>
                    </div>
                    <button className="callToAction" style={{ margin: '2rem auto' }}>Je m&apos;inscris</button>
                </div>
                <div className={SolutionStyles.banner2}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle2} style={{ marginBottom: "2rem" }}>Titre</h1>
                        <div className={SolutionStyles.cardWrapper}>
                            <div className={SolutionStyles.listItem}>
                                <h3 className={SolutionStyles.listItemTitle}>Un réseau social B2B</h3>
                                <ul>
                                    <li>Option 1</li>
                                    <li>Option 2</li>
                                    <li>Option 3</li>
                                </ul>
                            </div>
                            <div className={SolutionStyles.listItem}>
                                <h3 className={SolutionStyles.listItemTitle}>Un réseau social B2B</h3>
                                <ul>
                                    <li>Option 1</li>
                                    <li>Option 2</li>
                                    <li>Option 3</li>
                                </ul>
                            </div>
                            <div className={SolutionStyles.listItem}>
                                <h3 className={SolutionStyles.listItemTitle}>Un réseau social B2B</h3>
                                <ul>
                                    <li>Option 1</li>
                                    <li>Option 2</li>
                                    <li>Option 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={SolutionStyles.greyBanner} style={{ paddingBottom: 0 }}>
                    <div className="container" style={{ position: "relative" }}>
                        <h3 className={SolutionStyles.bannerSubtitle2}>Aujourd’hui, la communauté Forinov c’est</h3>
                        <h2 className={SolutionStyles.bannerTitle2} style={{ width: "50%" }}>1983 startups et des centaines de partenaires qui n’attendent que vous</h2>
                        <Image
                            src="/assets/landings/solutions-corpo-seating.png"
                            alt="Seating"
                            width={1000}
                            height={500}
                            className={SolutionStyles.bannerImgSeatingCorpo}
                        >

                        </Image>
                    </div>
                    <div className={SolutionStyles.banner} style={{ width: "100%", paddingTop: '10rem', borderBottomRightRadius: 0 }}>
                        <div className="container">
                            <h1 className={SolutionStyles.bannerTitle}>Titre</h1>
                            <div className={SolutionStyles.cardWrapper}>
                                <div className={SolutionStyles.solutionsCards}>
                                    {/* 1st card */}
                                    <div className={SolutionStyles.solutionItem}>
                                        <h2 className={SolutionStyles.solutionTitle}>Professionnel</h2>
                                        <p className={SolutionStyles.solutionConstraint}>1 utilisateur</p>
                                        <h1 className={SolutionStyles.solutionPricing}>3 mois gratuit puis 59,99€ par mois</h1>
                                        <button className='callToAction'>Commencer mon essai</button>
                                        <ul className={SolutionStyles.solutionFonctionnalities}>
                                            <li>
                                                <i className='fa-solid fa-search'></i>
                                                <p className={SolutionStyles.solutionFonctionnality}>Recherche avancée</p>
                                            </li>
                                            <div className="spacer"></div>
                                            <li>
                                                <i className='fa-solid fa-search'></i>
                                                <p className={SolutionStyles.solutionFonctionnality}>Recherche avancée</p>
                                            </li>
                                            <div className="spacer"></div>
                                            <li>
                                                <i className='fa-solid fa-search'></i>
                                                <p className={SolutionStyles.solutionFonctionnality}>Recherche avancée</p>
                                            </li>
                                            <div className="spacer"></div>
                                        </ul>
                                        <p className={SolutionStyles.solutionSeeDetails}>Voir le détails</p>
                                    </div>
                                    {/* 2nd card */}
                                    <div className={SolutionStyles.solutionItem}>
                                        <p className={SolutionStyles.solutionLabel}><i className='fa-solid fa-star'></i> Populaire</p>
                                        <h2 className={SolutionStyles.solutionTitle}>Professionnel</h2>
                                        <p className={SolutionStyles.solutionConstraint}>1 utilisateur</p>
                                        <h1 className={SolutionStyles.solutionPricing}>3 mois gratuit puis 59,99€ par mois</h1>
                                        <button className='callToAction'>Commencer mon essai</button>
                                        <ul className={SolutionStyles.solutionFonctionnalities}>
                                            <li>
                                                <i className='fa-solid fa-search'></i>
                                                <p className={SolutionStyles.solutionFonctionnality}>Recherche avancée</p>
                                            </li>
                                            <div className="spacer"></div>
                                            <li>
                                                <i className='fa-solid fa-search'></i>
                                                <p className={SolutionStyles.solutionFonctionnality}>Recherche avancée</p>
                                            </li>
                                            <div className="spacer"></div>
                                            <li>
                                                <i className='fa-solid fa-search'></i>
                                                <p className={SolutionStyles.solutionFonctionnality}>Recherche avancée</p>
                                            </li>
                                            <div className="spacer"></div>
                                        </ul>
                                        <p className={SolutionStyles.solutionSeeDetails}>Voir le détails</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ padding: "5rem 0" }}>
                    <h1 className={SolutionStyles.bannerTitle2} style={{ marginBottom: "2rem" }}>Ils nous font confiance</h1>
                    <div className={SolutionStyles.trusters}>
                        <div className={SolutionStyles.trusterItem}>
                            <div className={SolutionStyles.trusterAvatar}>
                                {/* image */}
                                <div className={SolutionStyles.trusterCompany}></div>
                            </div>

                            <h1 className={SolutionStyles.trusterName}>Gilles Favre</h1>
                            <h2 className={SolutionStyles.trusterJob}>Responsable innovation <br />
                                Groupe Crédit Mutuel-CIC</h2>
                            <p className={SolutionStyles.trusterTalk}>Nous partageons le même constat que les équipes de Forinov : il est urgent de faciliter les relations entre les grandes entreprises et les startups.

                                C’est pourquoi nous avons décidé de leur faire confiance et de les accompagner dès la sortie de leur plateforme. Aujourd’hui Forinov nous permet de centraliser le flux de sollicitations de startups, de découvrir de nouvelles solutions et de suivre, de manière collaborative, nos différents portefeuilles de startups, ce qui est essentiel pour un groupe mutualiste comme le nôtre !</p>
                        </div>

                        <div className={SolutionStyles.trusterItem}>
                            <div className={SolutionStyles.trusterAvatar}>
                                {/* image */}
                                <div className={SolutionStyles.trusterCompany}></div>
                            </div>

                            <h1 className={SolutionStyles.trusterName}>Grégory Fournier
                            </h1>
                            <h2 className={SolutionStyles.trusterJob}>Délégué général <br />
                                Réseau Les Premières</h2>
                            <p className={SolutionStyles.trusterTalk}>Rejoindre Forinov va contribuer au développement de nos entrepreneur·es. C’est un atout précieux pour nos incubées !
                                En plus d’optimiser le suivi de notre accompagnement avec l’ensemble de nos membres, Forinov permet d’apporter plus de visibilité au sein de l’écosystème entrepreneurial et un accès privilégié aux opportunités (appels à projets...).</p>
                        </div>
                    </div>
                </div>
                <div className={SolutionStyles.banner3}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle}>Titre</h1>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                        </div>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                        </div>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                        </div>
                        <h1 className={SolutionStyles.banner3Redirect}>Vous avez des questions ? <Link
                            href="/contact"
                        >
                            N&apos;hésitez pas à nous contacter
                        </Link></h1>
                    </div>
                </div>
            </section>
        </>
    )
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default CorporationSolutions;
export { getServerSideProps };