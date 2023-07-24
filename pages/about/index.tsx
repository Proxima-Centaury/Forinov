/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
import Image from "next/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import DefaultCarousel from "@carousels/defaultCarousel";
import Testimonials from "@contents/testimonials";
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { TPage } from "@typescript/types/TPage";
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import AboutStyles from "@pages/about/About.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* About */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const About = (params: TPage): JSX.Element => {
	const { t } = useTranslation("about");
	return <Fragment>
		<Head>
			<title>{ t("aboutMetaTitle") }</title>
			<meta name="description" content={ t("aboutMetaDescription") }/>
		</Head>
		<div data-page="about">
			<div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
                    <div className={ AboutStyles.containerTitle }>
						<h1>{ t("aboutHeaderTitle") }</h1>
					</div>
                    <div className={ AboutStyles.header }>
						<div className={ AboutStyles.headerLeftContainer }>
							<div className={ AboutStyles.headerActions }>
                                <LinkButton classList="septary bigger narrow shadow scale" href="/onboarding" icon="fa-solid fa-arrow-right" text={ t("aboutHeaderJoinLink") }/>
							</div>
						</div>
						<div className={ AboutStyles.headerRightContainer }>
							<Image src="/assets/home.gif" alt={ t("aboutHeaderIllustrationAlt") } fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder="blur" blurDataURL="/assets/home.gif"/>
						</div>
					</div>
				</div>
			</div>
            <div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">

				</div>
			</div>
            <div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ AboutStyles.containerTitle }>
						<h3>{ t("aboutOurMissionTitle") }</h3>
						<p>{ t("aboutOurMissionText") }</p>
					</div>
				</div>
			</div>
            <div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ AboutStyles.storySection }>
						<div className={ AboutStyles.story }>
							<i className="fa-solid fa-quote-left"/>
							<p>{ t("aboutStorySectionText1") }</p>
							<p>{ t("aboutStorySectionText2") }</p>
							<p>{ t("aboutStorySectionText3") }</p>
							<p>{ t("aboutStorySectionText4") }</p>
							<p>{ t("aboutStorySectionText5") }</p>
							<p>{ t("aboutStorySectionText6") }</p>
							<i className="fa-solid fa-quote-right"/>
						</div>
						<div className={ AboutStyles.storyPicture }>
							<Image src="/assets/about/about.png" alt={ t("aboutStorySectionIllustrationAlt") } fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder="blur" blurDataURL="/assets/about/about.png"/>
						</div>
					</div>
				</div>
			</div>
            <div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ AboutStyles.containerTitle }>
						<h3>{ t("aboutRecruitmentTitle") }</h3>
						<p>{ t("aboutRecruitmentText") }</p>
						<LinkButton classList="primary" href="/contact" text={ t("aboutRecruitmentLink") }/>
					</div>
				</div>
			</div>
			<div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">

				</div>
			</div>
			<div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">

				</div>
			</div>
		</div>
	</Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async ({ res, locale, locales }) => {
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	return {
		props: {
			...(await serverSideTranslations(locale || "fr", [ "common", "navbar", "footer", "about" ], require("@project/next-i18next.config"))),
			locales
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default About;
export { getServerSideProps };