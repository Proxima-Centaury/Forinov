/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import api from "@classes/api";
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
import DefaultCarousel from "@carousels/defaultCarousel";
import CustomImage from "@contents/customImage";
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { TPage } from "@typescript/types/TPage";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import StartupsStyles from "@pages/startups/Startups.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Startups = (params: TPage): JSX.Element => {
    const router = useRouter();
	const { t } = useTranslation("startups");
	const { opportunities, logos } = params;
	return <Fragment>
        <Head>
			<title>{ t("startupsMetaTitle") }</title>
			<meta name="description" content={ t("startupsMetaDescription") }/>
		</Head>
		<div data-page="startups">
			<div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
                    <div className={ StartupsStyles.containerTitle }>
						<h1>{ t("startupsHeaderTitle") }</h1>
					</div>
                    <div className={ StartupsStyles.header }>
						<div className={ StartupsStyles.headerLeftContainer }>
                        <div className={ StartupsStyles.headerParagraphs }>
								<p>{ t("startupsHeaderParagraph") }</p>
							</div>
							<div className={ StartupsStyles.headerActions }>
                                <LinkButton classList="primary" href="/onboarding" text={ t("startupsHeaderJoinLink") }/>
							</div>
						</div>
						<div className={ StartupsStyles.headerRightContainer }>
							<CustomImage src="/assets/home.gif" alt={ t("aboutHeaderIllustrationAlt") }/>
						</div>
					</div>
				</div>
			</div>
            <div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ StartupsStyles.containerTitle }>
						<h2>{ t("startupsHowItWorksTitle") }</h2>
						<p>{ t("startupsHowItWorksText") }</p>
					</div>
					<div className={ StartupsStyles.howItWorks }>
						<div className={ StartupsStyles.howItWorksStep }>
							<div className={ StartupsStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/startups/step_1.png" alt={ t("") }/>
							</div>
							<div className={ StartupsStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ StartupsStyles.howItWorksStepText }>
								<p>{ t("startupsHowItWorksStepTitle1") }</p>
								<p><Trans i18nKey="startupsHowItWorksStepText1" t={ t } components={ {
									onboarding: <LinkButton classList="link noUppercase" href="/onboarding"/>
								} }/></p>
							</div>
						</div>
						<div className={ StartupsStyles.howItWorksStep }>
							<div className={ StartupsStyles.howItWorksStepText }>
								<p>{ t("startupsHowItWorksStepTitle2") }</p>
								<p><Trans i18nKey="startupsHowItWorksStepText2" t={ t } components={ {
									corporatesDirectory: <LinkButton classList="link noUppercase" href="/corporates/directory"/>,
									opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
								} }/></p>
							</div>
							<div className={ StartupsStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ StartupsStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/startups/step_2.png" alt={ t("") }/>
							</div>
						</div>
						<div className={ StartupsStyles.howItWorksStep }>
							<div className={ StartupsStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/startups/step_3.png" alt={ t("") }/>
							</div>
							<div className={ StartupsStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-check"/>
							</div>
							<div className={ StartupsStyles.howItWorksStepText }>
								<p>{ t("startupsHowItWorksStepTitle3") }</p>
								<p>{ t("startupsHowItWorksStepText3") }</p>
							</div>
						</div>
					</div>
					<div className={ StartupsStyles.containerTitle }>
						<h3>{ t("startupsLatestOpportunitiesTitle") }</h3>
					</div>
					<DefaultCarousel items={ opportunities } itemsType="opportunities" navigation="bar" links/>
				</div>
			</div>
            <div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ StartupsStyles.containerTitle }>
						<h3>{ t("aboutOurMissionTitle") }</h3>
						<p>{ t("aboutOurMissionText") }</p>
					</div>
				</div>
			</div>
            <div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ StartupsStyles.storySection }>
						<div className={ StartupsStyles.story }>
							<i className="fa-solid fa-quote-left"/>
							<p>{ t("aboutStorySectionText1") }</p>
							<p>{ t("aboutStorySectionText2") }</p>
							<p>{ t("aboutStorySectionText3") }</p>
							<p>{ t("aboutStorySectionText4") }</p>
							<p>{ t("aboutStorySectionText5") }</p>
							<p>{ t("aboutStorySectionText6") }</p>
							<i className="fa-solid fa-quote-right"/>
						</div>
						<div className={ StartupsStyles.storyPicture }>
							<CustomImage src="/assets/about/about.png" alt={ t("aboutStorySectionIllustrationAlt") }/>
						</div>
					</div>
				</div>
			</div>
            <div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ StartupsStyles.containerTitle }>
						<h3>{ t("aboutRecruitmentTitle") }</h3>
						<p>{ t("aboutRecruitmentText") }</p>
						<LinkButton classList="primary" href="/contact" text={ t("aboutRecruitmentLink") }/>
					</div>
				</div>
			</div>
			<div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">

				</div>
			</div>
			<div className={ StartupsStyles.mainContainer }>
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
			...(await serverSideTranslations(locale || "fr", [ "common", "navbar", "footer", "startups" ], require("@project/next-i18next.config"))),
			locales,
			landing: await api.getLanding("next", "Landing", locale),
			opportunities: await api.getLandingOpportunities("next", "Landing", locale),
			logos: await api.getLandingLogos("next", "Landing", locale)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Startups;
export { getServerSideProps };