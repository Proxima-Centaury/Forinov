/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
import InfiniteCarousel from "@carousels/infiniteCarousel";
import CustomImage from "@contents/customImage";
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { TPage } from "@typescript/types/PageType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import StartupsStyles from "@pages/startups/Startups.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Startups = (params: TPage): JSX.Element => {
	const { t } = useTranslation("startups");
	const { opportunities, logos } = params;
	return <Fragment>
        <Head>
			<title>{ t("startupsMetaTitle", { company: "Forinov" }) }</title>
			<meta name="description" content={ t("startupsMetaDescription", { company: "Forinov" }) }/>
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
						<p>{ t("startupsHowItWorksText", { company: "Forinov" }) }</p>
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
					<DefaultCarousel items={ opportunities } itemsType="opportunities" navigation="bar"  controls indicators links/>
				</div>
			</div>
            <div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ StartupsStyles.containerTitle }>
						<h3>{ t("startupsBadgesTitle", { company: "Forinov" }) }</h3>
					</div>
					<div className={ StartupsStyles.badges }>
						<div className={ StartupsStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<p>{ t("startupsBadgeTitle1") }</p>
							<p><Trans i18nKey="startupsBadgeText1" t={ t } components={ {
								opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
							} }/></p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ StartupsStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<p>{ t("startupsBadgeTitle2") }</p>
							<p>{ t("startupsBadgeText2") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ StartupsStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<p>{ t("startupsBadgeTitle3") }</p>
							<p>{ t("startupsBadgeText3") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
					</div>
				</div>
			</div>
            <div className={ StartupsStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ StartupsStyles.containerTitle }>
						<h4>{ t("startupsTheyTrustTitle") }</h4>
					</div>
					<InfiniteCarousel items={ logos } itemsType="logos"/>
					<div className={ StartupsStyles.containerTitle }>
						<h5>{ t("startupsFreeTitle", { company: "Forinov" }) }</h5>
						<p>{ t("startupsFreeText") }</p>
						<LinkButton classList="primary" href="/onboarding" text={ t("startupsOnboardingLink") }/>
					</div>
					<div className={ StartupsStyles.containerTitle }>
						<h4>{ t("startupsQuestionsTitle") }</h4>
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
	const i18next = require("@project/next-i18next.config");
	return {
		props: {
			...(await serverSideTranslations(locale || "fr", [ "startups", "navbar", "footer", "common" ], i18next)),
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