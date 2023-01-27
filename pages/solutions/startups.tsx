import SolutionStyles from '../../public/stylesheets/pages/solutions/Solutions.module.css'
import { GetServerSideProps, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HomeStyles from '../../public/stylesheets/pages/Home.module.css';
import ButtonStyles from '../../public/stylesheets/components/buttons/Button.module.css';
import Carousel from '../../components/carousels/carousel';
import config from "../../config.json";

import Head from 'next/head';


export default function Startups({ locales, states, stateSetters, config, opportunities }: any) {
    const { translations }: any = states;
    const parentProps = { locales, states, stateSetters, config };

    return (
        <>
            <Head>
                <title>Forinov - Solutions pour les startups</title>
                <style>
                    {`
                        :root {
                            --page-color: var(--logo-orange-color);
                        }
                    `}
                </style>
            </Head>
            <section className="containerFull" style={{ background: "var(--background-sub-color)" }}>
                <div className={"container " + SolutionStyles.heroContainer}>
                    <h1 className={SolutionStyles.heroTitle}>{translations["Les meilleures startups sont sur Forinov, inscrivez-vous gratuitement"]}</h1>
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
                        src="/assets/landings/solutions-su.png"
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
                <div className={SolutionStyles.banner2}>
                    <div className="container">
                        <h1 className={SolutionStyles.bannerTitle2}>Titre</h1>
                        <div className={SolutionStyles.bannerBlockWrapper}>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle2}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph2}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle2}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph2}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                            <div className={SolutionStyles.bannerBlock}>
                                <h3 className={SolutionStyles.bannerSubtitle2}>Sous-titre</h3>
                                <p className={SolutionStyles.bannerParagraph2}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={SolutionStyles.banner + ' ' + SolutionStyles.bannerWithImg} style={{ position: 'relative' }}>
                    <div className="container" >
                        <h2 className={SolutionStyles.bannerUnderlineTitle}>DÉCOUVREZ NOTRE COMMUNAUTÉ DE STARTUPS</h2>
                        <h1 className={SolutionStyles.bannerTitle}>L&apos;innovation à déjà un nom, <br /><span>title</span>.</h1>
                        <Image
                            src="/assets/landings/solutions-su-seating.png"
                            alt="Man seating and working on a laptop"
                            width={500}
                            height={500}
                            className={SolutionStyles.bannerImgSeating}
                        >
                        </Image>
                    </div>
                </div>
                <div className={HomeStyles.opportunity} data-type="corporation">
                    <div style={{ background: "var(--background-sub-color)", paddingTop: '15rem' }}>
                        <h4>{translations["Les dernières oppotunités"] + " :"}</h4>
                        <Carousel {...parentProps} component={"TheLatestOpportunities"} data={opportunities} />
                        <div className={HomeStyles.actions} data-align="left">
                            <Link href="/directories/opportunities" className={ButtonStyles.callToAction}>{translations["Découvrir toutes les opportunités"]}</Link>
                            <Link href="/opportunities" className={ButtonStyles.callToActionAlternative}>{translations["Qu'est-ce qu'une opportunité"] + " ?"}</Link>
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
const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale, locales, defaultLocale } = context;
    const { endpoint, queries } = config.api;
    const landingOpportunitiesPromise = await fetch(endpoint + "?q=" + queries.getLandingOpportunities + "&app=next&authkey=Landing");
    const landingOpportunitiesResponse = await landingOpportunitiesPromise.json();
    const formattedLandingOpportunitiesResponse = Object.values(landingOpportunitiesResponse[0].PROJECT);
    return {
        props: {
            locale, locales, defaultLocale,
            opportunities: formattedLandingOpportunitiesResponse
        },
    };
};

export { getServerSideProps };
