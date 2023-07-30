/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CustomImage from "@contents/customImage";
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { TPage } from "@typescript/types/TPage";
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
			<title>{ t("aboutMetaTitle", { company: "Forinov" }) }</title>
			<meta name="description" content={ t("aboutMetaDescription", { company: "Forinov" }) }/>
		</Head>
		<div data-page="about">
			<div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
                    <div className={ AboutStyles.containerTitle }>
						<h1>{ t("aboutHeaderTitle", { company: "Forinov" }) }</h1>
					</div>
                    <div className={ AboutStyles.header }>
						<div className={ AboutStyles.headerLeftContainer }>
							<div className={ AboutStyles.headerActions }>
                                <LinkButton classList="septenary bigger narrow shadow scale" href="/onboarding" icon="fa-solid fa-arrow-right" text={ t("aboutHeaderJoinLink", { company: "Forinov" }) }/>
							</div>
						</div>
						<div className={ AboutStyles.headerRightContainer }>
							<CustomImage src="/assets/about/about_1.png" alt={ t("aboutHeaderIllustrationAlt") }/>
						</div>
					</div>
				</div>
			</div>
            <div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ AboutStyles.containerTitle }>
						<h3>{ t("aboutOurMissionTitle", { company: "Forinov" }) }</h3>
						<p>{ t("aboutOurMissionText") }</p>
					</div>
				</div>
			</div>
            <div className={ AboutStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ AboutStyles.storySection }>
						<div className={ AboutStyles.story }>
							<i className="fa-solid fa-quote-left"/>
							<p>{ t("aboutStorySectionText1", { company: "Forinov" }) }</p>
							<p>{ t("aboutStorySectionText2") }</p>
							<p>{ t("aboutStorySectionText3") }</p>
							<p>{ t("aboutStorySectionText4") }</p>
							<p>{ t("aboutStorySectionText5") }</p>
							<p>{ t("aboutStorySectionText6", { company: "Forinov" }) }</p>
							<i className="fa-solid fa-quote-right"/>
						</div>
						<div className={ AboutStyles.storyPicture }>
							<CustomImage src="/assets/about/about_2.png" alt={ t("aboutStorySectionIllustrationAlt") }/>
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
			...(await serverSideTranslations(locale || "fr", [ "about", "navbar", "footer", "common" ], require("@project/next-i18next.config"))),
			locales
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default About;
export { getServerSideProps };