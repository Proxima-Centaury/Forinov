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
import type { PageType } from "@typescript/types/PageType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import OpportunitiesStyles from "@pages/opportunities/Opportunities.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Startups = (params: PageType): JSX.Element => {
	const { t } = useTranslation("opportunities");
	const { opportunities, logos } = params;
	return <Fragment>
        <Head>
			<title>{ t("opportunitiesMetaTitle", { company: "Forinov" }) }</title>
			<meta name="description" content={ t("opportunitiesMetaDescription", { company: "Forinov" }) }/>
		</Head>
		<div data-page="opportunities">
			<div className={ OpportunitiesStyles.mainContainer }>
				<div className="boxedContent">
                    <div className={ OpportunitiesStyles.containerTitle }>
						<h1>{ t("opportunitiesHeaderTitle") }</h1>
					</div>
                    <div className={ OpportunitiesStyles.header }>
						<div className={ OpportunitiesStyles.headerLeftContainer }>
                        <div className={ OpportunitiesStyles.headerParagraphs }>
								<p>{ t("opportunitiesHeaderParagraph") }</p>
							</div>
							<div className={ OpportunitiesStyles.headerActions }>
                                <LinkButton classList="primary" href="/onboarding" text={ t("opportunitiesHeaderJoinLink") }/>
							</div>
						</div>
						<div className={ OpportunitiesStyles.headerRightContainer }>
							<CustomImage src="/assets/home.gif" alt={ t("aboutHeaderIllustrationAlt") }/>
						</div>
					</div>
				</div>
			</div>
            <div className={ OpportunitiesStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ OpportunitiesStyles.containerTitle }>
						<h2>{ t("opportunitiesHowItWorksTitle") }</h2>
						<p>{ t("opportunitiesHowItWorksText", { company: "Forinov" }) }</p>
					</div>
					<div className={ OpportunitiesStyles.howItWorks }>
						<div className={ OpportunitiesStyles.howItWorksStep }>
							<div className={ OpportunitiesStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/opportunities/step_1.png" alt={ t("") }/>
							</div>
							<div className={ OpportunitiesStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ OpportunitiesStyles.howItWorksStepText }>
								<p>{ t("opportunitiesHowItWorksStepTitle1") }</p>
								<p><Trans i18nKey="opportunitiesHowItWorksStepText1" t={ t } components={ {
									onboarding: <LinkButton classList="link noUppercase" href="/onboarding"/>
								} }/></p>
							</div>
						</div>
						<div className={ OpportunitiesStyles.howItWorksStep }>
							<div className={ OpportunitiesStyles.howItWorksStepText }>
								<p>{ t("opportunitiesHowItWorksStepTitle2") }</p>
								<p><Trans i18nKey="opportunitiesHowItWorksStepText2" t={ t } components={ {
									startupsDirectory: <LinkButton classList="link noUppercase" href="/startups/directory"/>,
									opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
								} }/></p>
							</div>
							<div className={ OpportunitiesStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ OpportunitiesStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/opportunities/step_2.png" alt={ t("") }/>
							</div>
						</div>
						<div className={ OpportunitiesStyles.howItWorksStep }>
							<div className={ OpportunitiesStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/opportunities/step_3.png" alt={ t("") }/>
							</div>
							<div className={ OpportunitiesStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-check"/>
							</div>
							<div className={ OpportunitiesStyles.howItWorksStepText }>
								<p>{ t("opportunitiesHowItWorksStepTitle3") }</p>
								<p>{ t("opportunitiesHowItWorksStepText3") }</p>
							</div>
						</div>
					</div>
					<div className={ OpportunitiesStyles.containerTitle }>
						<h3>{ t("opportunitiesLatestOpportunitiesTitle") }</h3>
					</div>
					<DefaultCarousel items={ opportunities } itemsType="opportunities" navigation="bar"  controls indicators links/>
				</div>
			</div>
            <div className={ OpportunitiesStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ OpportunitiesStyles.containerTitle }>
						<h3>{ t("opportunitiesBadgesTitle", { company: "Forinov" }) }</h3>
					</div>
					<div className={ OpportunitiesStyles.badges }>
						<div className={ OpportunitiesStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<p>{ t("opportunitiesBadgeTitle1") }</p>
							<p><Trans i18nKey="opportunitiesBadgeText1" t={ t } components={ {
								opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
							} }/></p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ OpportunitiesStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<p>{ t("opportunitiesBadgeTitle2") }</p>
							<p>{ t("opportunitiesBadgeText2") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ OpportunitiesStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<p>{ t("opportunitiesBadgeTitle3") }</p>
							<p>{ t("opportunitiesBadgeText3") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
					</div>
				</div>
			</div>
            <div className={ OpportunitiesStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ OpportunitiesStyles.containerTitle }>
						<h4>{ t("opportunitiesTheyTrustTitle") }</h4>
					</div>
					<InfiniteCarousel items={ logos } itemsType="logos"/>
					<div className={ OpportunitiesStyles.containerTitle }>
						<h5>{ t("opportunitiesFreeTitle", { company: "Forinov" }) }</h5>
						<p>{ t("opportunitiesFreeText") }</p>
						<LinkButton classList="primary" href="/onboarding" text={ t("opportunitiesOnboardingLink") }/>
					</div>
					<div className={ OpportunitiesStyles.containerTitle }>
						<h4>{ t("opportunitiesQuestionsTitle") }</h4>
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
	const getOpportunities = await api.getLandingOpportunities("next", "Landing", locale);
	const getLogos = await api.getLandingLogos("next", "Landing", locale);
	if(getOpportunities instanceof Error || getLogos instanceof Error) {
		return {
			redirect: {
				destination: "/500",
				permanent: false
			}
		};
	} else {
        return {
            props: {
                ...(await serverSideTranslations(locale || "fr", [ "opportunities", "navbar", "footer", "common" ], i18next)),
                locales,
				opportunities: getOpportunities.response.opportunities,
				logos: getLogos.response.logos
            }
        };
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Startups;
export { getServerSideProps };