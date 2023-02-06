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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Solutions */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnerSolutions = (pageProps: HomeInterface) => {
    const { locales, states, stateSetters, config, opportunities }: any = pageProps;
    const { translations }: any = states;
    return (
        <>
            <Head>
                <title>Forinov - Solutions pour les entreprises</title>
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
                    <h1 className={SolutionStyles.heroTitle}>{translations["Forinov, la solution la plus complète d’open innovation"]}</h1>
                    <p className={SolutionStyles.heroDesc}>
                        {translations["Vous proposez une solution innovante ? Vous cherchez des clients B2B ? Rejoignez Forinov pour booster votre visibilité et entrer en relation simplement avec des entreprises qui ont besoin de vos solutions pour innover !"]}
                    </p>
                    <div className={SolutionStyles.heroLinks}>
                        <Link
                            href={'/'}
                            className={SolutionStyles.heroLink + ' lift'}
                        >
                            <span>{translations["J'inscris ma startup"]}</span>
                            <i className='fa-solid fa-arrow-right'></i>
                        </Link>
                        <Link
                            href={'/'}
                            className={SolutionStyles.heroLink + ' lift'}
                        >
                            <span>{translations["J'inscris ma startup"]}</span>
                            <i className='fa-solid fa-arrow-right'></i>
                        </Link>
                        <Link
                            href={'/'}
                            className={SolutionStyles.heroLink + ' lift'}
                        >
                            <span>{translations["J'inscris ma startup"]}</span>
                            <i className='fa-solid fa-arrow-right'></i>
                        </Link>
                    </div>
                    <Image
                        src="/assets/landings/solutions-partners.png"
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className={SolutionStyles.heroImg}
                    ></Image>
                </div>
                <div className={SolutionStyles.banner}>
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
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: "5rem" }}>
                    <h1 className={SolutionStyles.coloredTitle}>Quel que soit votre métier, <br />
                        Forinov est fait pour vous</h1>
                    <h2 className={SolutionStyles.coloredSubtitle}>Car on est tous concerné par l’innovation !</h2>
                    <div className={SolutionStyles.cardWrapper}>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>Card Title</h1>
                            <p className={SolutionStyles.cardDesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis voluptatum beatae autem impedit possimus voluptatibus dicta ullam similique corporis laudantium?</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>Card Title</h1>
                            <p className={SolutionStyles.cardDesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis voluptatum beatae autem impedit possimus voluptatibus dicta ullam similique corporis laudantium?</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>Card Title</h1>
                            <p className={SolutionStyles.cardDesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis voluptatum beatae autem impedit possimus voluptatibus dicta ullam similique corporis laudantium?</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>Card Title</h1>
                            <p className={SolutionStyles.cardDesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis voluptatum beatae autem impedit possimus voluptatibus dicta ullam similique corporis laudantium?</p>
                        </div>
                        <div className={SolutionStyles.card}>
                            <h1 className={SolutionStyles.cardTitle}>Card Title</h1>
                            <p className={SolutionStyles.cardDesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis voluptatum beatae autem impedit possimus voluptatibus dicta ullam similique corporis laudantium?</p>
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
                        <h2 className={SolutionStyles.bannerUnderlineTitle}>DÉCOUVREZ NOTRE COMMUNAUTÉ DE STARTUPS</h2>
                        <h1 className={SolutionStyles.bannerTitle}>L&apos;innovation à déjà un nom, <br /><span>title</span>.</h1>
                        <Image
                            src="/assets/landings/solutions-partners-seating.png"
                            alt="Man seating and working on a laptop"
                            width={500}
                            height={500}
                            className={SolutionStyles.bannerImgSeating}
                        >
                        </Image>
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
export default PartnerSolutions;
export { getServerSideProps };