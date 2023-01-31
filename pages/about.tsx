import React from 'react'
import { GetStaticProps } from 'next'
import { HomeInterface } from '../typescript/interfaces';
import styles from '../public/stylesheets/pages/About.module.css'
import Image from 'next/image';

export default function About({ locales, states, stateSetters, config }: HomeInterface) {
  const { translations }: any = states;
  const parentProps = { locales, states, stateSetters, config };
  return (
    <section className='containerFull' style={{ background: "var(--background-sub-color)" }}>
      <div className={"container " + styles.heroContainer}>
        <h1 className={styles.heroTitle}>{translations["Notre histoire et nos missions chez Forinov"]}</h1>
        <button className='callToAction'>{translations["Rejoindre Forinov"]}</button>
        <Image
          src="/assets/landings/hero-about-img.svg"
          alt="Picture of the author"
          width={500}
          height={500}
          className={styles.heroImg}
        ></Image>
      </div>
      <div className={styles.banner}>
        <div className={"container " + styles.bannerText}>
          <h1 className={styles.title}>{translations["« Notre mission chez Forinov ? »"]}</h1>
          <p className={styles.paragraph}>{translations["Mettre en relation des startups, entreprises et partenaires de l’innovation et leur apporter une solution simple et complète pour innover ensemble ! Rien que ça !"]}</p>
        </div>
      </div>
      <div className={'container ' + styles.descriptionContainer}>
        <p className={styles.description}>
          {translations["about_paragraphs"].map((paragraph: string, index: number) => (
            <>
              <span key={index}>{paragraph}</span>
              <br />
              <br />
            </>
          ))}
        </p>
        <Image
          src="/assets/landings/about-2.svg"
          alt="Picture of the author"
          width={500}
          height={500}
          className={styles.descriptionImg}
        />
      </div>
      <div className={"container "+styles.banner2}>
        <div className={"container " + styles.bannerText2}>
          <h1 className={styles.title}>{translations["Toi aussi tu es passionné·e d’innovation ?"]}</h1>
          <p className={styles.paragraph}>{translations["Nous recherchons des talents"]}</p>
          <button className={styles.bannerCta}>{translations["Nous contacter"]}</button>
        </div>
      </div>
    </section>
  )
}

const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });

export { getStaticProps };