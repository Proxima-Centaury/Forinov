/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { HomeInterface } from "../typescript/interfaces";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import { Fragment } from "react";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import AboutStyles from "../public/stylesheets/pages/About.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* About */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const About = (pageProps: HomeInterface) => {
    const { states }: any = pageProps;
    const { translations }: any = states;
    return <div className="containerFull" style={ { background: "var(--background-sub-color)" } }>
        <div className={ "container " + AboutStyles.heroContainer }>
            <h1 className={ AboutStyles.heroTitle }>{ translations["Notre histoire et nos missions chez Forinov"] }</h1>
            <button className="callToAction">{ translations["Rejoindre Forinov"] }</button>
            <Image className={ AboutStyles.heroImg } src="/assets/landings/hero-about-img.svg" alt="Picture of the author" width={500} height={500}/>
        </div>
        <div className={ AboutStyles.banner} >
            <div className={ "container " + AboutStyles.bannerText }>
                <h1 className={ AboutStyles.title }>{ translations["« Notre mission chez Forinov ? »"] }</h1>
                <p className={ AboutStyles.paragraph }>{ translations["Mettre en relation des startups, entreprises et partenaires de l’innovation et leur apporter une solution simple et complète pour innover ensemble ! Rien que ça !"] }</p>
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
            <Image className={ AboutStyles.descriptionImg } src="/assets/landings/about-2.svg" alt="Picture of the author" width={ 500 } height={ 500 }/>
        </div>
        <div className={ "container " + AboutStyles.banner2 }>
            <div className={ "container " + AboutStyles.bannerText2 }>
                <h1 className={ AboutStyles.title }>{ translations["Toi aussi tu es passionné·e d’innovation ?"] }</h1>
                <p className={ AboutStyles.paragraph }>{ translations["Nous recherchons des talents"] }</p>
                <button className={ AboutStyles.bannerCta }>{ translations["Nous contacter"] }</button>
            </div>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default About;
export { getStaticProps };