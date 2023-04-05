/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { HomeInterface } from "../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
import Image from "next/image";
import Button from "../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import AboutStyles from "../public/stylesheets/pages/About.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* About */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const About = (pageProps: HomeInterface) => {
    const { states, router } = pageProps;
    const { translations, metadatas } = states;
    return <Fragment>
        <Head>
            <title>{ metadatas[router.asPath].title }</title>
			<meta name="description" content={ metadatas[router.asPath].description }/>
        </Head>
        <div className="containerFull" style={ { background: "var(--background-sub-color)" } }>
            <div className={ "container " + AboutStyles.heroContainer }>
                <h1 className={ AboutStyles.heroTitle }>{ translations["Notre histoire et nos missions chez Forinov"] }</h1>
                <Button button={ ButtonStyles.callToAction } href="/onboarding" text={ translations["Rejoindre Forinov"] }/>
                <Image className={ AboutStyles.heroImg } src={ router.basePath + "/assets/landings/hero-about-img.svg" } alt="" width="500" height="500"/>
            </div>
            <div className={ AboutStyles.banner} >
                <div className={ "container " + AboutStyles.bannerText }>
                    <h1 className={ AboutStyles.title }>{ translations["« Notre mission chez Forinov ? »"] }</h1>
                    <p className={ AboutStyles.paragraph }>{ translations["Mettre en relation des startups, entreprises et partenaires de l'innovation et leur apporter une solution simple et complète pour innover ensemble ! Rien que ça !"] }</p>
                </div>
            </div>
            <div className={ "container " + AboutStyles.descriptionContainer }>
                <p className={ AboutStyles.description }>
                    { translations["about_paragraphs"].map((paragraph: string, key: number) => <Fragment key={ key }>
                        <span>{ paragraph }</span>
                        <br/>
                        <br/>
                    </Fragment>) }
                </p>
                <Image className={ AboutStyles.descriptionImg } src={ router.basePath + "/assets/landings/about-2.svg" } alt="" width="500" height="500"/>
            </div>
            <div className={ "container " + AboutStyles.banner2 }>
                <div className={ "container " + AboutStyles.bannerText2 }>
                    <h1 className={ AboutStyles.title }>{ translations["Toi aussi tu es passionné·e d'innovation ?"] }</h1>
                    <p className={ AboutStyles.paragraph }>{ translations["Nous recherchons des talents"] }</p>
                    <Button button={ ButtonStyles.callToAction } href="/contact" text={ translations["Nous contacter"] }/>
                </div>
            </div>
        </div>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default About;
export { getStaticProps };