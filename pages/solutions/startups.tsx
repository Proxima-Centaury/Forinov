import styles from '../../public/stylesheets/pages/solutions/Startups.module.css'
import { GetServerSideProps, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export default function Startups({ locales, states, stateSetters, config }: any) {
    const { translations }: any = states;
    const parentProps = { locales, states, stateSetters, config };

    return (
        <section className="containerFull">
            <div className={"container " + styles.heroContainer}>
                <h1 className={styles.heroTitle}>{translations["Les meilleures startups sont sur Forinov, inscrivez-vous gratuitement"]}</h1>
                <p className={styles.heroDesc}>
                    {translations["Vous proposez une solution innovante ? Vous cherchez des clients B2B ? Rejoignez Forinov pour booster votre visibilité et entrer en relation simplement avec des entreprises qui ont besoin de vos solutions pour innover !"]}
                </p>
                <div className={styles.heroLinks}>
                    <Link
                        href={'/'}
                        className={styles.heroLink + ' lift'}
                    >
                        <span>{translations["J'inscris ma startup"]}</span>
                        <i className='fa-solid fa-arrow-right'></i>
                    </Link>
                    <Link
                        href={'/'}
                        className={styles.heroLink + ' lift'}
                    >
                        <span>{translations["J'inscris ma startup"]}</span>
                        <i className='fa-solid fa-arrow-right'></i>
                    </Link>
                    <Link
                        href={'/'}
                        className={styles.heroLink + ' lift'}
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
                    className={styles.heroImg}
                ></Image>
            </div>
            <div className={styles.banner}>
                <div className="container">
                    <h1 className={styles.bannerTitle}>Titre</h1>
                    <div className={styles.bannerBlockWrapper}>
                        <div className={styles.bannerBlock}>
                            <h3 className={styles.bannerSubtitle}>Sous-titre</h3>
                            <p className={styles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                        </div>
                        <div className={styles.bannerBlock}>
                            <h3 className={styles.bannerSubtitle}>Sous-titre</h3>
                            <p className={styles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                        </div>
                        <div className={styles.bannerBlock}>
                            <h3 className={styles.bannerSubtitle}>Sous-titre</h3>
                            <p className={styles.bannerParagraph}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde fuga omnis temporibus nulla a consequuntur at quaerat consectetur magnam, aliquid nesciunt, et incidunt tenetur laboriosam esse fugit, eaque voluptates officiis doloribus aut commodi facere vel ipsum! Qui earum fuga veniam?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
